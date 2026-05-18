# Módulo 08 — Lambda

> **Objetivo**: entender qué es serverless, cómo funcionan las funciones Lambda, y practicar deploy + invocación + triggers en Floci.

Tiempo estimado: 2 a 2.5 horas. Es uno de los módulos más prácticos del curso.

---

## 1. ¿Qué es Lambda?

**AWS Lambda** es el servicio de **funciones serverless** de AWS. Subís código (una función), AWS lo corre cuando lo necesitás, y le pagás solo por el tiempo de ejecución (con precisión de milisegundos).

"Serverless" no significa "sin servidores". Significa que **vos no administrás los servidores**. AWS se encarga de:

- Tener un servidor disponible cuando llega una petición.
- Escalar a 1000 servidores en paralelo si llegan 1000 peticiones simultáneas.
- Apagar todo cuando no hay tráfico.
- Aplicar parches al SO.

Vos solo escribís la función.

### ¿Por qué Lambda es atractivo?

- **Pagás solo por uso real**, no por tener servidores prendidos.
- **Escala automáticamente** a casi cualquier carga.
- **No administrás infraestructura**.
- **Loop de feedback rápido**: subiste código, ya está corriendo.

### Limitaciones

- **Tiempo máximo de ejecución**: 15 minutos. Si tu tarea tarda más, no sirve.
- **Memoria máxima**: 10 GB.
- **Cold starts**: la primera invocación después de un período de inactividad tarda más (la función arranca desde cero).
- **Stateless**: cada invocación es independiente. No hay disco persistente entre invocaciones (excepto `/tmp` efímero).
- **Tamaño del paquete**: hasta 250 MB descomprimido (más con container images).

### Casos de uso típicos

- APIs HTTP (con API Gateway delante).
- Procesar eventos de S3 (resize imágenes cuando alguien sube algo).
- Procesar mensajes de SQS.
- Cron jobs / scheduled tasks (con EventBridge Scheduler).
- Backend de chatbots, Alexa skills, etcétera.

---

## 2. Conceptos clave

### 2.1 — Runtime

El "entorno" en el que corre tu función. Lambda soporta:

- Node.js (varias versiones: 18, 20, 22…).
- Python.
- Java.
- .NET.
- Go.
- Ruby.
- Custom runtimes (cualquier ejecutable Linux).
- Container images (Docker hasta 10 GB).

Vamos a usar **Node.js 20**.

### 2.2 — Handler

El punto de entrada de tu función. Si tu archivo se llama `index.js` y exporta una función `handler`, el handler es `index.handler`.

```js
// index.js
export const handler = async (event, context) => {
  console.log("Recibí:", event);
  return { statusCode: 200, body: "Hola" };
};
```

### 2.3 — Event y context

Cada invocación recibe:

- **event**: los datos de entrada. Pueden venir de:
  - Una request HTTP (vía API Gateway).
  - Un objeto subido a S3.
  - Un mensaje de SQS.
  - Una invocación directa con `aws lambda invoke`.
  - Etcétera.
- **context**: metadata de la ejecución (request ID, tiempo restante, función name).

### 2.4 — Modelos de invocación

| Modelo            | Cómo funciona                            | Ejemplos                       |
|-------------------|------------------------------------------|--------------------------------|
| **Sincrónico**    | El caller espera y recibe la respuesta   | API Gateway, invocación CLI    |
| **Asincrónico**   | El caller "fire and forget"              | S3 events, SNS                 |
| **Event source mapping** | Lambda pollea continuamente       | SQS, DynamoDB Streams, Kinesis |

### 2.5 — Execution role (importante)

Cada Lambda tiene un **role IAM** atachado: define qué puede hacer la función (leer S3, escribir DynamoDB, mandar SNS, etc.). Lo creamos en el módulo 03.

### 2.6 — Environment variables

Configuración que pasás a la función sin hardcodearla en el código.

### 2.7 — Cold start vs warm start

- **Cold start**: AWS arranca un nuevo entorno de ejecución (descarga tu código, levanta el runtime, ejecuta inicializadores). Tarda más (cientos de ms a varios segundos según runtime).
- **Warm start**: el entorno ya está vivo de invocaciones anteriores y se reutiliza. Tarda poco.

Para mitigar cold starts existe **Provisioned Concurrency**: AWS mantiene N entornos calientes 24/7 (cobra por ellos).

### 2.8 — Versions y aliases

Cada vez que actualizás el código, podés publicar una **versión** inmutable. Y podés crear **aliases** (nombres mutables que apuntan a una versión, ej.: `prod`, `staging`). Esto te permite hacer despliegues blue/green.

### 2.9 — Layers

Capas reutilizables de código/dependencias compartidas entre funciones. Ej.: si tenés 10 Lambdas que usan la misma librería, en lugar de incluirla en cada paquete podés ponerla en un Layer.

---

## 3. Cómo lo emula Floci

Floci implementa **25 operaciones de Lambda**. Cuando creás una función:

1. Floci recibe el código zip.
2. Lo descomprime en un volumen.
3. Cuando alguien invoca la función, **levanta un contenedor Docker real** con la imagen oficial del runtime (`public.ecr.aws/lambda/nodejs:20`).
4. Mantiene un "warm pool" de contenedores para evitar cold starts en invocaciones seguidas.

Por eso necesitás montar `/var/run/docker.sock` en el docker-compose del curso — Floci usa el Docker del host para levantar contenedores hijos.

### Lo que soporta

- ✅ Crear / update / delete / invoke funciones.
- ✅ Function URLs.
- ✅ Aliases y versions.
- ✅ Environment variables.
- ✅ Event source mappings desde SQS, Kinesis, DynamoDB Streams.
- ✅ Async invoke con destinos (DLQ).
- ✅ Logs en CloudWatch.

### Limitaciones

- ❌ No emula límites reales de memoria/CPU/timeout (en local podés "engañar" al sistema fácilmente).
- ❌ No hay Provisioned Concurrency real.
- ❌ Layers funcionan con limitaciones.

---

## 4. Laboratorio práctico

### Lab 1 — Crear una función básica

#### Paso 1: el código

Creá una carpeta `lambda-hello/`:

```bash
mkdir lambda-hello
cd lambda-hello
```

`index.js`:

```js
exports.handler = async (event) => {
  console.log("Event recibido:", JSON.stringify(event));
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hola desde Lambda en Floci",
      input: event,
    }),
  };
};
```

> ⚠️ Estoy usando CommonJS (`exports.handler`) en lugar de ESM. AWS Lambda soporta ambos, pero CJS evita configuraciones extra.

#### Paso 2: zip del código

```bash
zip function.zip index.js
```

#### Paso 3: rol IAM (deberías tenerlo del módulo 03)

Si no lo tenés, creálo ahora:

```bash
cat > trust-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Service": "lambda.amazonaws.com"},
    "Action": "sts:AssumeRole"
  }]
}
EOF

aws iam create-role \
  --role-name lambda-basic-role \
  --assume-role-policy-document file://trust-policy.json

aws iam attach-role-policy \
  --role-name lambda-basic-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

#### Paso 4: crear la función

```bash
aws lambda create-function \
  --function-name mi-hello \
  --runtime nodejs20.x \
  --role arn:aws:iam::000000000000:role/lambda-basic-role \
  --handler index.handler \
  --zip-file fileb://function.zip
```

> 💡 `fileb://` (no `file://`) le dice al CLI que es contenido binario.

Verificá:

```bash
aws lambda list-functions
aws lambda get-function --function-name mi-hello
```

### Lab 2 — Invocar la función

```bash
aws lambda invoke \
  --function-name mi-hello \
  --payload '{"nombre":"thomas"}' \
  --cli-binary-format raw-in-base64-out \
  respuesta.json

cat respuesta.json
```

Vas a ver:

```json
{"statusCode":200,"body":"{\"message\":\"Hola desde Lambda en Floci\",\"input\":{\"nombre\":\"thomas\"}}"}
```

> 💡 `--cli-binary-format raw-in-base64-out` evita que el CLI te tire un warning sobre el payload. Es necesario en AWS CLI v2.

### Lab 3 — Actualizar el código

Modificá `index.js`:

```js
exports.handler = async (event) => {
  const nombre = event.nombre || "desconocido";
  return {
    statusCode: 200,
    body: `Hola ${nombre}, son las ${new Date().toISOString()}`,
  };
};
```

Re-zippear y actualizar:

```bash
zip function.zip index.js

aws lambda update-function-code \
  --function-name mi-hello \
  --zip-file fileb://function.zip
```

Invocar de nuevo:

```bash
aws lambda invoke \
  --function-name mi-hello \
  --payload '{"nombre":"thomas"}' \
  --cli-binary-format raw-in-base64-out \
  respuesta.json
cat respuesta.json
```

### Lab 4 — Variables de entorno

```bash
aws lambda update-function-configuration \
  --function-name mi-hello \
  --environment "Variables={MENSAJE_FIJO=Saludos cordiales}"
```

Modificá la función para usarla:

```js
exports.handler = async (event) => {
  const nombre = event.nombre || "desconocido";
  const mensaje = process.env.MENSAJE_FIJO || "Hola";
  return { statusCode: 200, body: `${mensaje} ${nombre}` };
};
```

```bash
zip function.zip index.js
aws lambda update-function-code --function-name mi-hello --zip-file fileb://function.zip

aws lambda invoke \
  --function-name mi-hello \
  --payload '{"nombre":"thomas"}' \
  --cli-binary-format raw-in-base64-out respuesta.json
cat respuesta.json
```

### Lab 5 — Function URL (HTTP endpoint directo)

Lambda puede recibir requests HTTP sin pasar por API Gateway, usando **Function URLs**:

```bash
aws lambda create-function-url-config \
  --function-name mi-hello \
  --auth-type NONE
```

Obtené la URL:

```bash
aws lambda get-function-url-config --function-name mi-hello
```

Probá:

```bash
curl "<la function url>?nombre=thomas"
```

### Lab 6 — Event source mapping desde SQS

Vamos a hacer que cuando llegue un mensaje a una cola, la Lambda lo procese automáticamente.

Crear la cola:

```bash
COLA=$(aws sqs create-queue --queue-name cola-lambda --query QueueUrl --output text)

COLA_ARN=$(aws sqs get-queue-attributes \
  --queue-url "$COLA" \
  --attribute-names QueueArn \
  --query 'Attributes.QueueArn' \
  --output text)
echo $COLA_ARN
```

Darle permisos a la Lambda para leer de SQS:

```bash
aws iam attach-role-policy \
  --role-name lambda-basic-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole
```

Modificar la función para procesar mensajes:

```js
exports.handler = async (event) => {
  for (const record of event.Records || []) {
    console.log("Mensaje recibido:", record.body);
    // Acá iría tu lógica real
  }
  return { batchItemFailures: [] };
};
```

```bash
zip function.zip index.js
aws lambda update-function-code --function-name mi-hello --zip-file fileb://function.zip
```

Crear el event source mapping:

```bash
aws lambda create-event-source-mapping \
  --function-name mi-hello \
  --event-source-arn "$COLA_ARN" \
  --batch-size 5
```

Mandar mensajes a la cola:

```bash
for i in 1 2 3; do
  aws sqs send-message --queue-url "$COLA" --message-body "Mensaje $i"
done
```

Ver los logs de la Lambda:

```bash
aws logs describe-log-streams \
  --log-group-name /aws/lambda/mi-hello

aws logs tail /aws/lambda/mi-hello --follow
```

### Lab 7 — Versions y aliases

Publicar una versión inmutable:

```bash
aws lambda publish-version \
  --function-name mi-hello \
  --description "Primer release"
```

Output incluye un `Version: "1"`.

Crear un alias que apunte a esa versión:

```bash
aws lambda create-alias \
  --function-name mi-hello \
  --name prod \
  --function-version 1
```

Ahora podés invocar el alias en lugar de la versión cruda:

```bash
aws lambda invoke \
  --function-name mi-hello:prod \
  --payload '{"nombre":"alias"}' \
  --cli-binary-format raw-in-base64-out respuesta.json
cat respuesta.json
```

### Lab 8 — Limpieza

```bash
aws lambda delete-function --function-name mi-hello

aws lambda list-event-source-mappings --function-name mi-hello \
  --query 'EventSourceMappings[].UUID' --output text | \
  xargs -I {} aws lambda delete-event-source-mapping --uuid {}

aws sqs delete-queue --queue-url "$COLA"

aws iam detach-role-policy --role-name lambda-basic-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam detach-role-policy --role-name lambda-basic-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole

aws iam delete-role --role-name lambda-basic-role
```

---

## 5. Bonus Node.js — Función Lambda que usa DynamoDB

Caso real: una Lambda que cuando recibe un evento, guarda un registro en DynamoDB.

`index.js`:

```js
const {
  DynamoDBClient,
} = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    // 👇 dentro de una Lambda que corre en Floci, el endpoint es el container interno
    endpoint: process.env.FLOCI_ENDPOINT || "http://host.docker.internal:4566",
    region: "us-east-1",
    credentials: { accessKeyId: "test", secretAccessKey: "test" },
  })
);

exports.handler = async (event) => {
  const item = {
    id: `evt-${Date.now()}`,
    payload: event,
    fecha: new Date().toISOString(),
  };

  await ddb.send(
    new PutCommand({
      TableName: "Eventos",
      Item: item,
    })
  );

  console.log("Guardado:", item.id);
  return { statusCode: 200, body: item.id };
};
```

> ⚠️ Detalle importante: cuando una Lambda corre dentro del contenedor de Floci, **no puede usar `localhost:4566`** para hablar con Floci, porque `localhost` desde el contenedor es el contenedor mismo. Tenés que usar `host.docker.internal:4566` (Mac/Windows) o el nombre del servicio si estás en docker-compose.

Empaquetar con dependencias:

```bash
mkdir lambda-ddb
cd lambda-ddb
npm init -y
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
# pegá el index.js
zip -r function.zip index.js node_modules package.json
```

Crear tabla y función:

```bash
# Crear la tabla primero
aws dynamodb create-table \
  --table-name Eventos \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

# Lambda
aws lambda create-function \
  --function-name eventos-handler \
  --runtime nodejs20.x \
  --role arn:aws:iam::000000000000:role/lambda-basic-role \
  --handler index.handler \
  --zip-file fileb://function.zip

# Invocar
aws lambda invoke \
  --function-name eventos-handler \
  --payload '{"tipo":"login","usuario":"thomas"}' \
  --cli-binary-format raw-in-base64-out respuesta.json
cat respuesta.json

# Ver el registro
aws dynamodb scan --table-name Eventos
```

---

## 6. Diferencias clave con AWS real

| Aspecto                | AWS real                          | Floci                              |
|------------------------|-----------------------------------|------------------------------------|
| Cold start             | 100ms a varios segundos           | Más rápido (no hay tanto overhead) |
| Memoria / CPU          | Limitada a lo configurado         | Limitada por tu máquina            |
| Timeout                | Estricto (max 15 min)             | Configurable, sin enforcement estricto |
| Concurrencia           | Hasta 1000 por región (configurable) | Limitada por Docker en tu host  |
| Pricing                | Por GB-segundo                    | $0                                 |
| Provisioned concurrency| Disponible                        | No aplica                          |
| X-Ray tracing          | Disponible                        | No                                 |

---

## Quiz del módulo 08

**1.** ¿Qué significa "serverless"?

a) No hay servidores.
b) Vos no administrás los servidores; los administra el proveedor.
c) Es gratis.
d) Solo se ejecuta en el frontend.

**2.** ¿Cuál es el tiempo máximo de ejecución de una Lambda?

a) 30 segundos
b) 5 minutos
c) 15 minutos
d) 1 hora

**3.** Una Lambda necesita escribir en DynamoDB. ¿Cuál es la forma correcta de darle permisos?

a) Hardcodear credenciales en el código.
b) Atachar una policy de DynamoDB al execution role de la Lambda.
c) Hacer la tabla pública.
d) Crear un usuario IAM y poner las credenciales en variables de entorno.

**4.** ¿Qué es un "cold start"?

a) Una invocación que falla.
b) La primera invocación después de un período de inactividad, que tarda más.
c) Una Lambda que corre en otra región.
d) Una función que solo corre de noche.

**5.** ¿Cuál de estos NO es un trigger típico de Lambda?

a) Subida de archivo a S3.
b) Mensaje en cola SQS.
c) Request HTTP vía API Gateway.
d) Update en una columna específica de RDS.

**6.** ¿Para qué se usan los aliases de Lambda?

a) Para encriptar el código.
b) Para crear nombres como `prod`/`staging` que apuntan a versiones inmutables, facilitando blue/green deployments.
c) Para compartir código entre funciones.
d) Para reducir cold starts.

**7.** ¿Qué archivo y handler usaría una Lambda con `index.js` que exporta `module.exports.miFuncion`?

a) `index.miFuncion`
b) `miFuncion.index`
c) `lambda.miFuncion`
d) Solo `miFuncion`

---

### Respuestas

1. **b**. Serverless = sin gestión de servidores por tu parte. Los servidores existen, pero el proveedor te los abstrae.
2. **c**. 15 minutos. Si necesitás más, usás Step Functions, Fargate o EC2.
3. **b**. Roles + policies. **Nunca** hardcodear credenciales en código.
4. **b**. Cold start = el entorno arranca desde cero. Tarda más que un warm start.
5. **d**. Lambda no tiene triggers nativos desde RDS (sí desde DynamoDB Streams). Para reaccionar a cambios en RDS necesitás CDC o polling propio.
6. **b**. Aliases apuntan a versiones inmutables. Útiles para entornos (`prod`, `staging`) y blue/green.
7. **a**. `<nombre-archivo>.<nombre-export>`. `index.miFuncion`.

---

## Resumen

- Lambda = funciones serverless, pagás por ejecución.
- Subís un zip con tu código, definís el handler.
- Cada función tiene un **execution role** con sus permisos.
- Modelos de invocación: sincrónico, asincrónico, event source mapping.
- **Cold starts** son la principal pega de Lambda.
- En Floci, las Lambdas corren en contenedores Docker reales — necesitás `docker.sock`.
- En código que corre dentro de una Lambda en Floci, el endpoint para otros servicios es `host.docker.internal:4566`, **no** `localhost`.

Siguiente: [`09-api-gateway.md`](./09-api-gateway.md).
