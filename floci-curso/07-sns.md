# Módulo 07 — SNS (Simple Notification Service)

> **Objetivo**: entender el patrón publish/subscribe y practicar SNS en Floci, incluida la integración con SQS para fan-out.

Tiempo estimado: 1 a 1.5 horas. Necesitás haber terminado el módulo de SQS.

---

## 1. ¿Qué es SNS?

**Amazon SNS** es un servicio de **mensajería pub/sub** (publish/subscribe).

Mientras SQS es una **cola** (un productor, varios consumidores que se reparten el trabajo, cada mensaje lo procesa uno solo), SNS es un **broadcaster** (un publicador, varios subscriptores, cada mensaje le llega a **todos**).

```
SQS:                     SNS:
[productor]              [publisher]
    ↓                        ↓
  [cola]                  [topic]
   ↓ ↓ ↓                  ↙ ↓ ↘
 W1 W2 W3              S1 S2 S3
(uno lo procesa)     (todos lo reciben)
```

### Cuándo usás SNS

- Notificar a varios sistemas que pasó un evento.
- Mandar mensajes a usuarios (SMS, email, push).
- Triggear varios procesos paralelos desde un solo evento.

### Cuándo usás SQS

- Cuando un solo worker (o grupo de workers idénticos) debe procesar cada mensaje.
- Cuando necesitás buffer / desacoplamiento.

### Cuándo usás SNS + SQS (fan-out)

Cuando un solo evento debe llegar a varios servicios distintos, y cada servicio necesita un buffer propio.

---

## 2. Conceptos clave

### 2.1 — Topics

Un **topic** es el "canal" donde se publican los mensajes. Lo identificás por un ARN tipo:

```
arn:aws:sns:us-east-1:000000000000:mi-topic
```

### 2.2 — Subscriptions

Cada topic puede tener **N subscriptions**. Cada subscription dice "cuando un mensaje se publique acá, mandalo a esta otra cosa". Los protocolos soportados:

| Protocolo  | A dónde va el mensaje                       |
|------------|---------------------------------------------|
| `sqs`      | A una cola SQS                              |
| `lambda`   | Invoca una función Lambda                   |
| `http`/`https` | POST a un endpoint HTTP                 |
| `email`    | Email plano                                 |
| `email-json` | Email con cuerpo JSON                     |
| `sms`      | SMS a un número de teléfono                 |
| `application` | Mobile push (iOS/Android)                |

En Floci están implementados `sqs`, `lambda`, `http/https`.

### 2.3 — Publicar mensajes

`Publish` manda un mensaje a un topic, que automáticamente se reenvía a todas las subscriptions.

### 2.4 — Filter policies

Una subscription puede tener un **filter policy** que define qué mensajes le interesan. Si el mensaje no matchea, no se lo manda.

Ejemplo: solo quiero los mensajes donde el atributo `tipo` sea `"urgente"`.

### 2.5 — FIFO topics

Igual que SQS, SNS también tiene topics FIFO (sufijo `.fifo`). Soportan orden estricto y deduplication. Solo pueden tener subscriptions a colas SQS FIFO.

### 2.6 — Subscribe confirmation

Cuando creás una subscription a un endpoint HTTP, SNS le manda primero un mensaje de confirmación al endpoint. El endpoint tiene que responder con un GET a una URL específica para confirmar. Esto previene que alguien te use como spam-bot.

Las subscriptions a SQS y Lambda dentro de la misma cuenta no requieren confirmación.

### 2.7 — Message attributes

Igual que SQS, los mensajes pueden tener atributos tipados que se usan para filter policies.

### 2.8 — Patrón de fan-out (importante para el examen)

```
                                  ┌→ [cola-billing] → [worker billing]
[checkout API] → [topic Pedidos] ─┼→ [cola-email]   → [worker email]
                                  └→ [cola-stock]   → [worker stock]
```

Un solo publish dispara tres procesamientos independientes. Cada uno tiene su propia cola con su propio buffer.

---

## 3. Cómo lo emula Floci

Floci implementa **13 operaciones de SNS**:

- ✅ Topics Standard y FIFO.
- ✅ Subscriptions a SQS, Lambda, HTTP/HTTPS.
- ✅ Publish y PublishBatch.
- ✅ Filter policies.
- ✅ Tagging.

Limitaciones:

- ❌ Email, SMS, mobile push no se entregan a destinos reales (lógico — no podés mandar SMS desde tu laptop).
- Si subscribís un email, podés ver la "publicación" en los logs de Floci pero no llega a un email real.

---

## 4. Laboratorio práctico

### Lab 1 — Crear un topic

```bash
TOPIC_ARN=$(aws sns create-topic --name mi-topic --query TopicArn --output text)
echo "Topic creado: $TOPIC_ARN"
```

Listar topics:

```bash
aws sns list-topics
```

### Lab 2 — Publicar un mensaje sin subscribers

```bash
aws sns publish \
  --topic-arn "$TOPIC_ARN" \
  --message "Hola mundo SNS" \
  --subject "Test"
```

El mensaje se publica pero como nadie está subscripto, se descarta. No genera error.

### Lab 3 — Suscribir una cola SQS

Vamos a hacer el patrón fan-out clásico. Primero, las colas:

```bash
COLA1=$(aws sqs create-queue --queue-name cola-billing --query QueueUrl --output text)
COLA2=$(aws sqs create-queue --queue-name cola-email --query QueueUrl --output text)

# ARNs
ARN_COLA1=$(aws sqs get-queue-attributes --queue-url "$COLA1" \
  --attribute-names QueueArn --query 'Attributes.QueueArn' --output text)

ARN_COLA2=$(aws sqs get-queue-attributes --queue-url "$COLA2" \
  --attribute-names QueueArn --query 'Attributes.QueueArn' --output text)

echo "Cola billing: $ARN_COLA1"
echo "Cola email: $ARN_COLA2"
```

Subscribirlas al topic:

```bash
aws sns subscribe \
  --topic-arn "$TOPIC_ARN" \
  --protocol sqs \
  --notification-endpoint "$ARN_COLA1"

aws sns subscribe \
  --topic-arn "$TOPIC_ARN" \
  --protocol sqs \
  --notification-endpoint "$ARN_COLA2"
```

Verificar:

```bash
aws sns list-subscriptions-by-topic --topic-arn "$TOPIC_ARN"
```

### Lab 4 — Publicar y ver el fan-out

```bash
aws sns publish \
  --topic-arn "$TOPIC_ARN" \
  --message '{"pedidoId":"123","total":1500}' \
  --subject "Nuevo pedido"
```

Mirá que llegó a las dos colas:

```bash
aws sqs receive-message --queue-url "$COLA1" --max-number-of-messages 5
aws sqs receive-message --queue-url "$COLA2" --max-number-of-messages 5
```

Vas a ver que el mismo mensaje llegó a las dos. **El cuerpo del mensaje SQS no es el body que mandaste**, sino un sobre JSON con metadata de SNS:

```json
{
  "Type": "Notification",
  "MessageId": "...",
  "TopicArn": "...",
  "Subject": "Nuevo pedido",
  "Message": "{\"pedidoId\":\"123\",\"total\":1500}",
  ...
}
```

Tu worker tiene que parsear ese sobre y sacar `Message`.

### Lab 5 — Filter policy

Quiero que la cola de billing **solo** reciba pedidos urgentes.

Obtener el ARN de la subscription:

```bash
SUB_ARN=$(aws sns list-subscriptions-by-topic --topic-arn "$TOPIC_ARN" \
  --query 'Subscriptions[?Endpoint==`'$ARN_COLA1'`].SubscriptionArn' --output text)
echo $SUB_ARN
```

Aplicar el filter policy:

```bash
aws sns set-subscription-attributes \
  --subscription-arn "$SUB_ARN" \
  --attribute-name FilterPolicy \
  --attribute-value '{"tipo": ["urgente"]}'
```

Publicar dos mensajes, uno con el atributo `tipo=urgente` y otro sin:

```bash
aws sns publish \
  --topic-arn "$TOPIC_ARN" \
  --message "Pedido urgente" \
  --message-attributes '{
    "tipo": {"DataType":"String","StringValue":"urgente"}
  }'

aws sns publish \
  --topic-arn "$TOPIC_ARN" \
  --message "Pedido normal" \
  --message-attributes '{
    "tipo": {"DataType":"String","StringValue":"normal"}
  }'
```

Chequear las colas:

```bash
aws sqs receive-message --queue-url "$COLA1" --max-number-of-messages 5
aws sqs receive-message --queue-url "$COLA2" --max-number-of-messages 5
```

La cola billing solo recibe el urgente, la de email recibe los dos.

### Lab 6 — Limpiar

```bash
aws sns delete-topic --topic-arn "$TOPIC_ARN"
aws sqs delete-queue --queue-url "$COLA1"
aws sqs delete-queue --queue-url "$COLA2"
```

---

## 5. Bonus Node.js — Publisher y consumer del patrón fan-out

`sns-fanout-setup.js`:

```js
import {
  SNSClient,
  CreateTopicCommand,
  SubscribeCommand,
} from "@aws-sdk/client-sns";
import {
  SQSClient,
  CreateQueueCommand,
  GetQueueAttributesCommand,
} from "@aws-sdk/client-sqs";

const opts = {
  endpoint: "http://localhost:4566",
  region: "us-east-1",
  credentials: { accessKeyId: "test", secretAccessKey: "test" },
};

const sns = new SNSClient(opts);
const sqs = new SQSClient(opts);

// 1. Crear topic
const { TopicArn } = await sns.send(
  new CreateTopicCommand({ Name: "pedidos" })
);
console.log("Topic:", TopicArn);

// 2. Crear dos colas y obtener ARNs
async function createQueue(name) {
  const { QueueUrl } = await sqs.send(new CreateQueueCommand({ QueueName: name }));
  const { Attributes } = await sqs.send(
    new GetQueueAttributesCommand({
      QueueUrl,
      AttributeNames: ["QueueArn"],
    })
  );
  return { QueueUrl, QueueArn: Attributes.QueueArn };
}

const billing = await createQueue("node-billing");
const email = await createQueue("node-email");

// 3. Subscribirlas al topic
await sns.send(
  new SubscribeCommand({
    TopicArn,
    Protocol: "sqs",
    Endpoint: billing.QueueArn,
  })
);

await sns.send(
  new SubscribeCommand({
    TopicArn,
    Protocol: "sqs",
    Endpoint: email.QueueArn,
  })
);

console.log("Setup completo.");
console.log("Billing URL:", billing.QueueUrl);
console.log("Email URL:", email.QueueUrl);
console.log("Topic ARN:", TopicArn);
```

`sns-publish.js`:

```js
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const sns = new SNSClient({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
  credentials: { accessKeyId: "test", secretAccessKey: "test" },
});

const TopicArn = process.env.TOPIC_ARN;
if (!TopicArn) {
  console.error("Definí TOPIC_ARN en el entorno");
  process.exit(1);
}

for (let i = 1; i <= 5; i++) {
  await sns.send(
    new PublishCommand({
      TopicArn,
      Message: JSON.stringify({ pedidoId: i, total: 100 * i }),
      Subject: `Pedido ${i}`,
    })
  );
  console.log(`Publicado pedido ${i}`);
}
```

```bash
node sns-fanout-setup.js
# anotar el Topic ARN que imprime y exportarlo
export TOPIC_ARN="<el ARN>"
node sns-publish.js
```

Después podés leer de ambas colas con el consumer del módulo SQS y vas a ver que cada mensaje llegó a las dos.

---

## 6. Patrones de uso reales

### Notificaciones de incidente

Una alarma de CloudWatch publica en un topic. El topic notifica:

- A un endpoint HTTP de PagerDuty (paginar al ingeniero on-call).
- A una cola SQS que un worker lee y manda Slack.
- A un email del equipo de operaciones.

### Eventos de dominio en microservicios

Cuando se crea un usuario:

- SNS publica `UserCreated`.
- El servicio de billing crea una cuenta.
- El servicio de email manda welcome.
- El servicio de analytics registra la conversión.

Cada servicio tiene su cola SQS y procesa a su ritmo.

### Trigger de Lambdas en cadena

SNS → Lambda → SNS → Lambda → … Patrón de workflow event-driven sin Step Functions.

---

## 7. SNS vs SQS — cuadro comparativo

| Aspecto                | SNS                          | SQS                           |
|------------------------|------------------------------|-------------------------------|
| Modelo                 | Pub/Sub (uno-a-muchos)       | Cola (uno-a-uno por mensaje)  |
| Consumidores reciben   | Todos los subs el mismo msg  | Uno solo por mensaje          |
| Pull o push            | Push                         | Pull (polling)                |
| Retención si nadie consume | El mensaje se descarta   | Se queda hasta 14 días        |
| Filter policies        | Sí                           | No                            |
| Caso típico            | Eventos / notificaciones     | Tareas / trabajo a procesar   |

---

## 8. Diferencias clave con AWS real

| Aspecto                | AWS real                          | Floci             |
|------------------------|-----------------------------------|-------------------|
| Email, SMS, push       | Entrega real                      | No se entrega     |
| HTTP/HTTPS             | Entrega real con confirmación     | Entrega local     |
| Cross-account          | Soportado                         | No aplica         |

---

## Quiz del módulo 07

**1.** ¿Cuál es la principal diferencia entre SNS y SQS?

a) SNS es más rápido.
b) SQS guarda mensajes; SNS los reenvía a todos los subscriptores.
c) SNS solo manda emails.
d) No hay diferencia.

**2.** En el patrón fan-out con SNS + SQS, ¿qué pasa cuando publicás un mensaje en el topic?

a) Solo lo recibe un subscriber al azar.
b) Cada cola subscripta recibe una copia del mensaje.
c) El mensaje se borra inmediatamente.
d) Tenés que pagarle a cada cola.

**3.** ¿Para qué sirve un filter policy en una subscription?

a) Para encriptar los mensajes.
b) Para que la subscription solo reciba mensajes que cumplen ciertas condiciones.
c) Para borrar mensajes viejos.
d) Para configurar la región.

**4.** Si subscribís una cola SQS a un topic SNS y publicás un mensaje, ¿qué ve la cola cuando recibe el mensaje?

a) Solo el body original.
b) Un sobre JSON que contiene el body original como string en el campo `Message`.
c) Un email.
d) Una notificación push.

**5.** ¿Cuál es el caso de uso típico de SNS?

a) Almacenar archivos.
b) Notificar a varios sistemas cuando pasa un evento.
c) Reemplazar a una base de datos.
d) Acelerar consultas SQL.

**6.** ¿Necesita confirmación una subscription de SQS a un topic SNS en la misma cuenta?

a) Sí, siempre.
b) No, si están en la misma cuenta es automática.
c) Sí, pero solo en producción.
d) Depende de la región.

---

### Respuestas

1. **b**. SNS es pub/sub; reenvía mensajes a todos los subscriptores. SQS es una cola; cada mensaje lo procesa un consumidor.
2. **b**. Fan-out: cada subscripción recibe su propia copia.
3. **b**. Filter policy filtra mensajes según atributos. Solo los que matchean llegan a esa subscription.
4. **b**. El mensaje en la cola SQS viene "envuelto" en un sobre con metadata de SNS. Tu código tiene que parsear el sobre y extraer el `Message` original.
5. **b**. Notificaciones / eventos / pub-sub.
6. **b**. Subs intra-cuenta a SQS y Lambda son automáticas. Las HTTP/email/SMS sí requieren confirmación.

---

## Resumen

- SNS es pub/sub: un publish llega a todos los subscriptores del topic.
- Subscriptores típicos en Floci: SQS, Lambda, HTTP/HTTPS.
- **Fan-out**: SNS topic → varias colas SQS, cada una con su consumer independiente.
- **Filter policies** filtran qué mensajes recibe cada subscription.
- Los mensajes SNS→SQS llegan en un sobre JSON, no como body crudo.

Siguiente: [`08-lambda.md`](./08-lambda.md).
