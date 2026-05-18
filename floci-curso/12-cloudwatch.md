# Módulo 12 — CloudWatch Logs

> **Objetivo**: entender cómo se centralizan los logs en AWS, cómo Lambda escribe ahí automáticamente, y practicar consultas en Floci.

Tiempo estimado: 45 minutos a 1 hora.

---

## 1. ¿Qué es CloudWatch?

**Amazon CloudWatch** es el servicio de **observabilidad** de AWS. Tiene varias partes:

- **CloudWatch Logs**: logs centralizados de tus aplicaciones y servicios AWS.
- **CloudWatch Metrics**: métricas numéricas (CPU, requests, errores, lo que quieras).
- **CloudWatch Alarms**: alertas basadas en métricas (mandar SNS si la CPU pasa X%).
- **CloudWatch Dashboards**: panels visuales.
- **CloudWatch Synthetics**: pings automáticos a tus endpoints.
- **CloudWatch RUM**: telemetría del navegador.
- **X-Ray**: distributed tracing.

En este módulo nos enfocamos en **Logs**, que es lo más cotidiano y lo que Floci emula.

### ¿Por qué logs centralizados?

En una app de un servidor, los logs viven en `/var/log/`. Cuando tenés 50 servidores (o 5000 Lambdas), ir a cada uno a buscar es imposible. Necesitás un lugar único donde:

- Todos los logs aparecen automáticamente.
- Podés buscar por patrón.
- Podés correlacionar entre servicios.
- Tenés retención configurable.

CloudWatch Logs es eso.

---

## 2. Conceptos clave

### 2.1 — Log groups

Un **log group** es un namespace de logs. Típicamente uno por aplicación o servicio:

- `/aws/lambda/mi-funcion`
- `/aws/api-gateway/mi-api`
- `/myapp/produccion/api`

### 2.2 — Log streams

Adentro de un log group hay varios **log streams**. Cada stream es una "fuente" continua de logs. Para una Lambda, hay un stream por contenedor (típicamente uno por concurrent execution).

### 2.3 — Log events

Cada evento es un mensaje con un timestamp y un cuerpo (texto o JSON).

### 2.4 — Retention

Configurable por log group: 1 día, 1 semana, 1 mes, 1 año, "para siempre". Más días = más costo.

### 2.5 — Filters

Buscar mensajes que matchean un patrón. Soporta:

- Texto literal: `ERROR`.
- JSON filter: `{ $.level = "error" }`.
- Métrica filter: contar matches y emitir como CloudWatch Metric.

### 2.6 — Insights

CloudWatch Logs Insights es un lenguaje de query potente para analizar logs (estilo SQL). Útil para investigaciones después de un incidente.

### 2.7 — Lambda → CloudWatch Logs automático

Cuando Lambda corre, `console.log()` escribe en CloudWatch Logs automáticamente. **No tenés que configurar nada**, solo asegurarte de que el role tenga permisos (la policy `AWSLambdaBasicExecutionRole` los incluye).

---

## 3. Cómo lo emula Floci

Floci implementa **14 operaciones de CloudWatch Logs**:

- ✅ Crear, listar, borrar log groups y streams.
- ✅ Ingestión de log events.
- ✅ Filtros y queries básicas.
- ✅ Retention configurable.

También implementa **5 operaciones de CloudWatch Metrics** (custom metrics).

Limitaciones:

- ❌ Insights con su sintaxis específica puede no estar completo.
- ❌ Alarms y SNS triggers de alarms — limitados.
- ❌ Logs encriptados con KMS — nominales.

---

## 4. Laboratorio práctico

### Lab 1 — Crear log group y stream manualmente

```bash
aws logs create-log-group --log-group-name /mi-app/api
aws logs create-log-stream \
  --log-group-name /mi-app/api \
  --log-stream-name servidor-1
```

Listar:

```bash
aws logs describe-log-groups
aws logs describe-log-streams --log-group-name /mi-app/api
```

### Lab 2 — Mandar log events

```bash
TIMESTAMP=$(date +%s%3N)  # epoch en milisegundos

aws logs put-log-events \
  --log-group-name /mi-app/api \
  --log-stream-name servidor-1 \
  --log-events "[
    {\"timestamp\": $TIMESTAMP, \"message\": \"App iniciada\"},
    {\"timestamp\": $((TIMESTAMP+100)), \"message\": \"Request GET /usuarios\"},
    {\"timestamp\": $((TIMESTAMP+200)), \"message\": \"ERROR: timeout en DB\"}
  ]"
```

### Lab 3 — Leer log events

```bash
aws logs get-log-events \
  --log-group-name /mi-app/api \
  --log-stream-name servidor-1
```

### Lab 4 — Filter (buscar errores)

```bash
aws logs filter-log-events \
  --log-group-name /mi-app/api \
  --filter-pattern "ERROR"
```

### Lab 5 — Tail (modo live)

```bash
aws logs tail /mi-app/api --follow
```

Te quedás mirando los logs en vivo. Si en otra terminal mandás más events, los vas a ver aparecer.

### Lab 6 — Configurar retention

```bash
aws logs put-retention-policy \
  --log-group-name /mi-app/api \
  --retention-in-days 7
```

### Lab 7 — Logs de Lambda (automáticos)

Si tenés la Lambda `mi-hello` del módulo 08 todavía creada:

```bash
aws lambda invoke \
  --function-name mi-hello \
  --payload '{}' \
  --cli-binary-format raw-in-base64-out /dev/null

aws logs tail /aws/lambda/mi-hello
```

Vas a ver los `console.log` que tenga la función.

Si la borraste, recreala (módulo 08 lab 1) y volvé acá.

### Lab 8 — Limpieza

```bash
aws logs delete-log-group --log-group-name /mi-app/api
```

---

## 5. Bonus Node.js — Escribir logs custom

`logs-app.js`:

```js
import {
  CloudWatchLogsClient,
  CreateLogGroupCommand,
  CreateLogStreamCommand,
  PutLogEventsCommand,
  FilterLogEventsCommand,
} from "@aws-sdk/client-cloudwatch-logs";

const logs = new CloudWatchLogsClient({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
  credentials: { accessKeyId: "test", secretAccessKey: "test" },
});

const GROUP = "/node-app/eventos";
const STREAM = "main";

// Crear group y stream (ignorar si ya existen)
try {
  await logs.send(new CreateLogGroupCommand({ logGroupName: GROUP }));
} catch (err) {
  if (err.name !== "ResourceAlreadyExistsException") throw err;
}

try {
  await logs.send(
    new CreateLogStreamCommand({
      logGroupName: GROUP,
      logStreamName: STREAM,
    })
  );
} catch (err) {
  if (err.name !== "ResourceAlreadyExistsException") throw err;
}

// Mandar varios eventos
const now = Date.now();
await logs.send(
  new PutLogEventsCommand({
    logGroupName: GROUP,
    logStreamName: STREAM,
    logEvents: [
      { timestamp: now, message: "App iniciada" },
      { timestamp: now + 50, message: JSON.stringify({ level: "info", msg: "user-login", userId: 1 }) },
      { timestamp: now + 100, message: JSON.stringify({ level: "error", msg: "db-timeout", duration: 3000 }) },
    ],
  })
);
console.log("Eventos enviados");

// Filtrar para encontrar errores
const filtered = await logs.send(
  new FilterLogEventsCommand({
    logGroupName: GROUP,
    filterPattern: "error",
  })
);
console.log("Eventos con 'error':", filtered.events?.length || 0);
filtered.events?.forEach((e) => console.log(" -", e.message));
```

```bash
npm install @aws-sdk/client-cloudwatch-logs
node logs-app.js
```

---

## 6. Patrones reales

### Logs estructurados (JSON)

En lugar de:

```js
console.log("user logged in: " + userId);
```

Usá JSON:

```js
console.log(JSON.stringify({
  level: "info",
  event: "user-login",
  userId: userId,
  timestamp: new Date().toISOString(),
}));
```

Ventaja: podés filtrar por campos específicos (`{ $.event = "user-login" }`) en lugar de matchear texto.

### Correlación con request IDs

Cada request HTTP tiene un ID único (en API Gateway → Lambda viene en `event.requestContext.requestId`). Inclueílo en todos los logs de esa request, así podés trazarla de punta a punta.

### Alarms

Configurás un metric filter "contar `ERROR` en estos logs" y una alarm "si > 10 errores en 5 minutos, mandá SNS". El SNS te despierta vía PagerDuty.

---

## 7. CloudWatch Metrics (mención)

Aunque no es el foco, sepamos:

- **Métricas standard**: AWS las publica solas (CPU de EC2, requests de API Gateway, errores de Lambda, etc.).
- **Custom metrics**: las publicás vos con `aws cloudwatch put-metric-data`.
- **Resolution**: 1 minuto (standard) o 1 segundo (high resolution).
- **Retention**: 15 meses, con resolución decreciente.

Ejemplo:

```bash
aws cloudwatch put-metric-data \
  --namespace "MiApp" \
  --metric-name "Pedidos" \
  --value 1 \
  --unit Count
```

---

## 8. Diferencias clave con AWS real

| Aspecto                | AWS real                          | Floci                       |
|------------------------|-----------------------------------|-----------------------------|
| Retención              | Real, hasta 10 años               | Aceptada nominalmente       |
| Insights queries       | Lenguaje completo                 | Soporte parcial             |
| Encriptación con KMS   | Real                              | Nominal                     |
| Alarms a SNS           | Reales                            | Limitadas                   |
| Subscription filters → Lambda | Reales                     | Limitadas                   |
| Costo por GB ingerido  | Real                              | $0                          |

---

## Quiz del módulo 12

**1.** ¿Cómo escriben logs las Lambdas en CloudWatch?

a) Necesitás llamar a la API de CloudWatch Logs manualmente.
b) `console.log` (y similares) van a CloudWatch automáticamente, siempre que el role tenga permisos.
c) Lambdas no escriben logs en CloudWatch.
d) Solo escriben si configurás un trigger.

**2.** ¿Qué es un log stream?

a) Un canal de TV.
b) Una fuente continua de logs dentro de un log group.
c) Una alarma.
d) Una métrica.

**3.** ¿Cuál es la ventaja de usar logs en JSON?

a) Pesan menos.
b) Podés filtrar por campos específicos en lugar de matchear texto.
c) AWS los encripta automáticamente.
d) No tienen ventajas.

**4.** ¿Para qué sirve la retention de un log group?

a) Para encriptar.
b) Para definir cuánto tiempo se guardan los logs antes de borrarse.
c) Para definir cuánto tarda la API en responder.
d) Para reducir costos de red.

**5.** ¿Qué es un metric filter?

a) Un filtro de búsqueda.
b) Una regla que cuenta cuántos log events matchean un patrón y los expone como métrica CloudWatch.
c) Una alarma.
d) Un tipo de log group.

**6.** Un equipo quiere alertar si hay más de 10 errores en 5 minutos en sus Lambdas. ¿Qué armaría?

a) Una nueva Lambda que se invoque a sí misma.
b) Un metric filter sobre los logs + alarma de CloudWatch + SNS topic con su email/SMS.
c) Una cola SQS.
d) Una tabla DynamoDB.

---

### Respuestas

1. **b**. Lambda + CloudWatch Logs es automático. `console.log` → CloudWatch.
2. **b**. Log stream = stream/fuente continua dentro de un group.
3. **b**. JSON permite filtrar por campos: `{ $.level = "error" }`.
4. **b**. Retention = cuánto se conservan los logs.
5. **b**. Metric filter cuenta matches y los publica como métrica.
6. **b**. Metric filter + alarm + SNS. Es el flujo canónico de alertas en AWS.

---

## Resumen

- CloudWatch Logs centraliza logs de todos los servicios.
- **Log groups** > **log streams** > **events**.
- **Lambda → CloudWatch Logs es automático** (con permisos correctos).
- **JSON logs** > logs texto plano: mejor filtrabilidad.
- **Metric filters + alarms + SNS** = pipeline clásico de alerting.

Siguiente: [`13-cloudformation.md`](./13-cloudformation.md).
