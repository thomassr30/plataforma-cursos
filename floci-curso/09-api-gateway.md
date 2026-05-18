# Módulo 09 — API Gateway

> **Objetivo**: aprender a exponer APIs HTTP/REST en AWS, conectarlas a Lambdas, y dejar lista una API completa serverless en Floci.

Tiempo estimado: 1.5 a 2 horas. Necesitás haber terminado el módulo de Lambda.

---

## 1. ¿Qué es API Gateway?

**Amazon API Gateway** es el servicio que te permite **publicar APIs HTTP/REST** sin tener que administrar un servidor web. Pensalo como un nginx managed con superpoderes: autenticación, throttling, logs, transformaciones, integraciones con AWS, todo configurable sin escribir código.

### El stack serverless típico

```
[Cliente] → [API Gateway] → [Lambda] → [DynamoDB / S3 / etc.]
```

Vos solo escribís la Lambda. API Gateway recibe el HTTP, lo convierte en un evento JSON, lo manda a la Lambda. La Lambda devuelve JSON, API Gateway lo convierte en HTTP response y lo manda al cliente.

### Tipos de API en AWS

| Tipo                 | Para qué                                  | Cuándo elegirlo                     |
|----------------------|-------------------------------------------|-------------------------------------|
| **REST API**         | Features completas, más caro              | APIs con autenticación compleja, transformaciones, WAF |
| **HTTP API (v2)**    | Más simple, más rápido, **70% más barato**| El default para Lambdas             |
| **WebSocket API**    | Conexiones bidireccionales                | Chats, notificaciones real-time     |

> 💡 Si arrancás un proyecto nuevo y no tenés requisitos especiales, **usá HTTP API**. Es más simple y más barato.

Floci soporta **REST API** y **HTTP API**. WebSocket no está soportado.

---

## 2. Conceptos clave

### 2.1 — Resources y methods

Una **resource** es un path (`/usuarios`, `/usuarios/{id}`). Cada resource puede tener varios **methods** (GET, POST, PUT, DELETE, etc.).

```
/                          GET
/usuarios                  GET, POST
/usuarios/{id}             GET, PUT, DELETE
/usuarios/{id}/ordenes     GET, POST
```

### 2.2 — Integration

Cada method dice "cuando me llamen, hacé X". X puede ser:

- **AWS_PROXY (Lambda proxy)**: pasarle el request a una Lambda como evento.
- **AWS**: invocar otro servicio AWS (S3, DynamoDB) directamente.
- **HTTP_PROXY**: reenviar la request a un endpoint HTTP existente.
- **MOCK**: devolver una respuesta hardcoded sin invocar nada.

El más usado por lejos es **Lambda proxy**.

### 2.3 — Stages

Una vez configurada tu API, no es accesible inmediatamente. Tenés que **deployarla** a un **stage**. Stages típicos: `dev`, `staging`, `prod`. Cada uno tiene su propia URL.

URL típica de AWS real:

```
https://abc123.execute-api.us-east-1.amazonaws.com/prod/usuarios
```

En Floci:

```
http://localhost:4566/restapis/<api-id>/prod/_user_request_/usuarios
```

(Sí, es feo. Por eso muchos usan HTTP API que no tiene ese prefijo.)

### 2.4 — Authorizers

API Gateway puede autenticar requests antes de pasarlos a tu backend:

- **IAM authorizer**: la request tiene que estar firmada con SigV4 (típico para APIs internas).
- **Cognito authorizer**: validar un JWT de Cognito.
- **Lambda authorizer (custom)**: una Lambda que decide si la request pasa o no.
- **JWT authorizer** (solo HTTP API): validar JWT contra un issuer (OIDC).
- **None**: público.

### 2.5 — Throttling y caching

API Gateway puede:

- **Limitar el rate** de requests por usuario / API.
- **Cachear** responses para no invocar la Lambda en cada request idéntica.

Floci no implementa throttling ni caching reales.

### 2.6 — Mapping templates (solo REST API)

Te permiten **transformar** el request body o headers antes de pasarlo al backend. Útil cuando tu backend espera un formato distinto al que mandó el cliente.

### 2.7 — CORS

API Gateway maneja CORS por configuración (no tenés que tocarlo en la Lambda). Configurás headers permitidos, métodos, origins, y API Gateway responde a las preflights OPTIONS automáticamente.

---

## 3. Cómo lo emula Floci

Floci implementa:

- **24 operaciones de REST API**.
- **16 operaciones de HTTP API v2**.

Cubre:

- ✅ Resources, methods, stages.
- ✅ Lambda proxy integration.
- ✅ AWS integration (a otros servicios).
- ✅ MOCK integration.
- ✅ JWT authorizers (HTTP API).
- ✅ Custom domain names (a nivel API).

Limitaciones:

- ❌ Sin throttling real.
- ❌ Sin caching real.
- ❌ WebSocket no soportado.
- ❌ CloudWatch metrics de la API no se exponen igual que en AWS real.

---

## 4. Laboratorio práctico — REST API + Lambda

Vamos a crear una API REST simple con una sola ruta `GET /hello` que invoca una Lambda.

### Lab 1 — Crear la Lambda

```bash
mkdir lambda-api && cd lambda-api

cat > index.js <<'EOF'
exports.handler = async (event) => {
  const nombre = event.queryStringParameters?.nombre || "mundo";
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mensaje: `Hola, ${nombre}`,
      timestamp: new Date().toISOString(),
    }),
  };
};
EOF

zip function.zip index.js

aws lambda create-function \
  --function-name api-hello \
  --runtime nodejs20.x \
  --role arn:aws:iam::000000000000:role/lambda-basic-role \
  --handler index.handler \
  --zip-file fileb://function.zip
```

### Lab 2 — Crear la REST API

```bash
# Crear el "rest API"
API_ID=$(aws apigateway create-rest-api --name MiAPI --query id --output text)
echo "API_ID: $API_ID"

# Obtener el resource root (/)
ROOT_ID=$(aws apigateway get-resources --rest-api-id "$API_ID" \
  --query 'items[?path==`/`].id' --output text)
echo "ROOT_ID: $ROOT_ID"

# Crear el resource /hello
HELLO_ID=$(aws apigateway create-resource \
  --rest-api-id "$API_ID" \
  --parent-id "$ROOT_ID" \
  --path-part "hello" \
  --query id --output text)
echo "HELLO_ID: $HELLO_ID"

# Crear el method GET en /hello, sin autenticación
aws apigateway put-method \
  --rest-api-id "$API_ID" \
  --resource-id "$HELLO_ID" \
  --http-method GET \
  --authorization-type NONE
```

### Lab 3 — Conectar el method a la Lambda

```bash
# El URI de invocación Lambda tiene un formato específico
LAMBDA_URI="arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:000000000000:function:api-hello/invocations"

aws apigateway put-integration \
  --rest-api-id "$API_ID" \
  --resource-id "$HELLO_ID" \
  --http-method GET \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri "$LAMBDA_URI"
```

> 💡 Notá que `--integration-http-method` es **POST**, aunque el método público sea GET. Eso es porque API Gateway siempre invoca Lambda con POST (es la API de Lambda invoke).

Darle permisos a API Gateway para invocar la Lambda:

```bash
aws lambda add-permission \
  --function-name api-hello \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-1:000000000000:$API_ID/*/*"
```

### Lab 4 — Deployarla a un stage

```bash
aws apigateway create-deployment \
  --rest-api-id "$API_ID" \
  --stage-name dev
```

### Lab 5 — Probarla

```bash
URL="http://localhost:4566/restapis/$API_ID/dev/_user_request_/hello"
echo "URL: $URL"

curl "$URL"
curl "$URL?nombre=thomas"
```

Vas a recibir:

```json
{"mensaje":"Hola, thomas","timestamp":"2026-05-18T..."}
```

---

## 5. Laboratorio práctico — HTTP API (más simple)

Vamos a hacer lo mismo pero con HTTP API v2, que es mucho más conciso.

### Lab 6 — Crear HTTP API integrada a Lambda

Una HTTP API se puede crear con una sola llamada que ya configura todo:

```bash
HTTP_API_ID=$(aws apigatewayv2 create-api \
  --name MiHTTPAPI \
  --protocol-type HTTP \
  --target arn:aws:lambda:us-east-1:000000000000:function:api-hello \
  --query ApiId --output text)
echo "HTTP_API_ID: $HTTP_API_ID"

# Permisos para que la API invoque la Lambda
aws lambda add-permission \
  --function-name api-hello \
  --statement-id apigatewayv2-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-1:000000000000:$HTTP_API_ID/*/*"
```

La HTTP API ya se "deploya" automáticamente en un default stage llamado `$default`. La URL es:

```
http://localhost:4566/restapis/<api-id>/hello   # depende del config exacto de Floci
```

> 👉 Las URLs exactas para HTTP API en Floci pueden variar levemente respecto a REST. Si algo no responde, mirá `aws apigatewayv2 get-api --api-id $HTTP_API_ID` y los logs de Floci.

### Lab 7 — Definir rutas específicas

Por defecto, la HTTP API creada con `--target` manda **todo** al backend (catch-all). Vamos a ser más específicos:

```bash
# Crear una integración explícita
INT_ID=$(aws apigatewayv2 create-integration \
  --api-id "$HTTP_API_ID" \
  --integration-type AWS_PROXY \
  --integration-uri "arn:aws:lambda:us-east-1:000000000000:function:api-hello" \
  --payload-format-version "2.0" \
  --query IntegrationId --output text)

# Crear una ruta GET /hello
aws apigatewayv2 create-route \
  --api-id "$HTTP_API_ID" \
  --route-key "GET /hello" \
  --target "integrations/$INT_ID"
```

Probar:

```bash
curl "http://localhost:4566/_aws/execute-api/$HTTP_API_ID/hello"
```

(El path exacto depende de cómo Floci serva las HTTP APIs; verificá con `aws apigatewayv2 get-stages --api-id $HTTP_API_ID`.)

### Lab 8 — Limpiar todo

```bash
# REST API
aws apigateway delete-rest-api --rest-api-id "$API_ID"

# HTTP API
aws apigatewayv2 delete-api --api-id "$HTTP_API_ID"

# Lambda
aws lambda delete-function --function-name api-hello
```

---

## 6. Bonus Node.js — Backend CRUD completo

Vamos a hacer un CRUD de usuarios con Lambda + DynamoDB + API Gateway. Este es el patrón "serverless API" más típico de AWS.

### Estructura del proyecto

```
crud-api/
├── index.js
├── package.json
└── deploy.sh
```

### `index.js`

```js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  DeleteCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const { randomUUID } = require("node:crypto");

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    endpoint: process.env.FLOCI_ENDPOINT || "http://host.docker.internal:4566",
    region: "us-east-1",
    credentials: { accessKeyId: "test", secretAccessKey: "test" },
  })
);

const TABLE = "Usuarios";

function respond(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  const method = event.httpMethod || event.requestContext?.http?.method;
  const path = event.pathParameters?.id;

  try {
    if (method === "GET" && !path) {
      // Listar
      const result = await ddb.send(new ScanCommand({ TableName: TABLE }));
      return respond(200, result.Items);
    }

    if (method === "GET" && path) {
      // Buscar uno
      const result = await ddb.send(
        new GetCommand({ TableName: TABLE, Key: { id: path } })
      );
      if (!result.Item) return respond(404, { error: "no existe" });
      return respond(200, result.Item);
    }

    if (method === "POST") {
      // Crear
      const data = JSON.parse(event.body || "{}");
      const item = { id: randomUUID(), ...data, creadoEn: new Date().toISOString() };
      await ddb.send(new PutCommand({ TableName: TABLE, Item: item }));
      return respond(201, item);
    }

    if (method === "DELETE" && path) {
      await ddb.send(new DeleteCommand({ TableName: TABLE, Key: { id: path } }));
      return respond(204, null);
    }

    return respond(405, { error: "Método no soportado" });
  } catch (err) {
    console.error(err);
    return respond(500, { error: err.message });
  }
};
```

### Setup y deploy

```bash
mkdir crud-api && cd crud-api
npm init -y
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb

# (pegá el index.js)
zip -r function.zip index.js node_modules package.json

# Tabla
aws dynamodb create-table \
  --table-name Usuarios \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

# Darle permisos al role de Lambda para DynamoDB
aws iam attach-role-policy \
  --role-name lambda-basic-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess

# Lambda
aws lambda create-function \
  --function-name crud-usuarios \
  --runtime nodejs20.x \
  --role arn:aws:iam::000000000000:role/lambda-basic-role \
  --handler index.handler \
  --zip-file fileb://function.zip

# HTTP API con catch-all
API_ID=$(aws apigatewayv2 create-api \
  --name CrudAPI \
  --protocol-type HTTP \
  --target arn:aws:lambda:us-east-1:000000000000:function:crud-usuarios \
  --query ApiId --output text)

aws lambda add-permission \
  --function-name crud-usuarios \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-1:000000000000:$API_ID/*/*"

echo "API ID: $API_ID"
```

### Probarla

Adaptá la URL al formato que use tu Floci. Algo así:

```bash
BASE="http://localhost:4566/_aws/execute-api/$API_ID"

# Crear
curl -X POST "$BASE/usuarios" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Thomas","email":"thomas@example.com"}'

# Listar
curl "$BASE/usuarios"

# Buscar uno (reemplazá el id)
curl "$BASE/usuarios/<id-real>"

# Borrar
curl -X DELETE "$BASE/usuarios/<id-real>"
```

---

## 7. Diferencias clave con AWS real

| Aspecto                | AWS real                          | Floci                              |
|------------------------|-----------------------------------|------------------------------------|
| URL formato            | `*.execute-api.<region>.amazonaws.com` | `localhost:4566/restapis/...`  |
| Throttling             | Real                              | No aplica                          |
| Caching                | Real                              | No aplica                          |
| WAF integration        | Disponible                        | No                                 |
| Cognito authorizers    | Reales                            | Aceptados parcialmente             |
| WebSocket APIs         | Disponibles                       | No soportadas                      |
| Custom domains + TLS   | Disponibles                       | Solo nominales                     |

---

## Quiz del módulo 09

**1.** ¿Cuál es la diferencia principal entre REST API y HTTP API en API Gateway?

a) HTTP API solo soporta GET.
b) HTTP API es más simple, más rápida y más barata; REST API tiene más features (autorizadores avanzados, WAF, transformaciones).
c) REST API es más nuevo.
d) No hay diferencia.

**2.** ¿Cuál es el método HTTP que API Gateway usa para invocar una Lambda?

a) GET
b) PUT
c) POST (siempre, sin importar el método público).
d) DELETE

**3.** En el patrón serverless típico, ¿qué hace API Gateway?

a) Procesa toda la lógica de negocio.
b) Recibe el HTTP, lo convierte en evento JSON y se lo pasa a la Lambda.
c) Almacena los datos.
d) Reemplaza a la base de datos.

**4.** ¿Para qué sirve un stage en API Gateway?

a) Para encriptar la API.
b) Para separar entornos (dev, staging, prod) cada uno con su URL.
c) Para reducir el costo.
d) Para hacer caching.

**5.** ¿Cuál es la forma recomendada de autorizar requests en una HTTP API moderna?

a) Hardcodear un token en cada request.
b) JWT authorizer apuntado a un issuer OIDC.
c) Hacer la API pública.
d) Validar la IP del cliente.

**6.** ¿Por qué API Gateway necesita una **permission** explícita en la Lambda?

a) Para encriptar.
b) Porque IAM no permite que cualquier servicio invoque cualquier Lambda; tenés que autorizarlo con un resource-based policy en la Lambda.
c) Para reducir cold starts.
d) Para configurar CORS.

---

### Respuestas

1. **b**. HTTP API es la opción moderna, simple, ~70% más barata. REST API tiene más features y se usa cuando los necesitás.
2. **c**. POST siempre. El método público (GET, PUT, etc.) está en `event.httpMethod`, pero la invocación a Lambda internamente es POST.
3. **b**. API Gateway es el "convertidor" HTTP↔evento.
4. **b**. Stages = entornos. Cada uno tiene su URL y su configuración.
5. **b**. JWT authorizer es la opción moderna y declarativa. Cognito o cualquier OIDC sirven.
6. **b**. Las Lambdas tienen resource-based policies que controlan quién las puede invocar. API Gateway tiene que estar en esa lista.

---

## Resumen

- API Gateway expone HTTP/REST sin servidor.
- **REST API** = features completas. **HTTP API** = simple, barata, default.
- Patrón: cliente → API Gateway → Lambda → datos.
- Cada method tiene una **integration** (Lambda proxy lo más común).
- Tenés que **deployar** a un **stage** para que sea accesible.
- API Gateway necesita permission explícita en la Lambda (`lambda:InvokeFunction`).

Siguiente: [`10-rds.md`](./10-rds.md).
