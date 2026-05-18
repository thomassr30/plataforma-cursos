# Módulo 06 — SQS (Simple Queue Service)

> **Objetivo**: entender qué son las colas de mensajes, para qué se usan, y practicar SQS en Floci.

Tiempo estimado: 1 a 1.5 horas.

---

## 1. ¿Qué es SQS?

**Amazon SQS** es el servicio de **colas de mensajes** de AWS. Una cola es una estructura tipo "lista de pendientes": un proceso escribe mensajes en una punta y otro los lee en la otra.

### ¿Para qué sirve una cola?

Pensá una tienda online. Cuando un usuario hace check-out, el sistema tiene que:

1. Cobrar la tarjeta.
2. Reducir stock.
3. Mandar email de confirmación.
4. Generar la factura.
5. Notificar al depósito para que arme el pedido.

Si hacés todo eso **síncrono** en una sola request HTTP:

- Si falla el mailing, el cobro queda en el aire.
- El usuario espera segundos a que termine todo.
- Si el servicio de facturación está lento, toda la app se cae.

Con una cola, **separás** la operación crítica (el cobro) del resto. Cobrás, metés un mensaje "cobrar OK, hay que mandar mail, facturar, etc." en la cola, y devolvés OK al usuario en milisegundos. Workers separados leen la cola y procesan en su tiempo.

### Beneficios

- **Desacoplamiento**: el productor y el consumidor no se conocen directamente.
- **Resiliencia**: si el consumidor está caído, los mensajes esperan en la cola hasta que vuelva.
- **Buffer**: si el productor genera más rápido de lo que el consumidor procesa, la cola amortigua.
- **Escalado horizontal**: podés agregar más workers para procesar la cola en paralelo.

---

## 2. Conceptos clave

### 2.1 — Tipos de cola: Standard vs FIFO

| Característica       | Standard                          | FIFO                                       |
|----------------------|-----------------------------------|--------------------------------------------|
| Orden                | Best-effort (puede llegar desordenado) | Estricto (First In First Out)         |
| Duplicados           | Puede entregar el mismo mensaje >1 vez | Exactamente una vez                  |
| Throughput           | Casi ilimitado                    | 300 msg/s por grupo (3000 con batching)   |
| Nombre               | `mi-cola`                         | `mi-cola.fifo` (sufijo obligatorio)        |
| Caso de uso          | Cuando el orden no importa        | Cuando el orden y la unicidad importan     |

> 💡 Las FIFO son más restrictivas. Solo usalas si **realmente** necesitás orden estricto o sin duplicados (ej.: transacciones financieras).

### 2.2 — Productores y consumidores

- **Productor**: el que mete mensajes. Usa `SendMessage`.
- **Consumidor**: el que los procesa. Usa `ReceiveMessage` y después `DeleteMessage`.

### 2.3 — Polling

SQS no "empuja" mensajes hacia el consumidor; el consumidor los pide (polling). Hay dos modos:

- **Short polling**: si la cola está vacía, devuelve inmediato.
- **Long polling**: espera hasta N segundos a que aparezca un mensaje. **Más eficiente** y **más barato** (menos llamadas vacías).

Recomendación: usar long polling con `WaitTimeSeconds=20`.

### 2.4 — Visibility timeout

Cuando un consumidor lee un mensaje, SQS lo **oculta** al resto de los consumidores durante un período (default: 30 segundos). Si el consumidor llama a `DeleteMessage` antes de que se acabe ese período, el mensaje desaparece. Si no, el mensaje vuelve a estar visible y otro consumidor lo puede leer.

Esto sirve para:

- Evitar que dos workers procesen el mismo mensaje a la vez.
- Permitir reintentos automáticos si un worker se cae a mitad del procesamiento.

> ⚠️ Si tu procesamiento tarda más que el visibility timeout, otro worker va a empezar a procesar el mismo mensaje. Configurá el visibility timeout a más que el tiempo máximo de procesamiento.

### 2.5 — Dead Letter Queue (DLQ)

Una cola "papelera" donde van los mensajes que **fallaron** N veces. Útil para:

- Aislar mensajes problemáticos sin que bloqueen el resto.
- Investigar después qué falló.
- Reprocesar manualmente cuando se arregla el bug.

Se configura con un **redrive policy**: "si un mensaje se intentó procesar N veces sin éxito, mandalo a la DLQ".

### 2.6 — Message attributes

Además del cuerpo (un string), un mensaje puede tener atributos tipados (string, número, binary). Útil para filtros o metadata.

### 2.7 — Retención

Por defecto, los mensajes que nadie consume se quedan en la cola **4 días**. Máximo: **14 días**. Después se pierden.

### 2.8 — Batches

Podés mandar/recibir hasta 10 mensajes por request, bajando el costo y la latencia. Comandos: `SendMessageBatch`, `DeleteMessageBatch`.

---

## 3. Cómo lo emula Floci

Floci implementa **17 operaciones de SQS**:

- ✅ Cola Standard y FIFO.
- ✅ Long polling.
- ✅ Visibility timeout.
- ✅ DLQ con redrive policy.
- ✅ Batches.
- ✅ Message attributes.
- ✅ Tagging.

Funciona prácticamente idéntico a AWS real.

---

## 4. Laboratorio práctico

### Lab 1 — Crear una cola Standard

```bash
aws sqs create-queue --queue-name mi-cola
```

Output:

```json
{
  "QueueUrl": "http://localhost:4566/000000000000/mi-cola"
}
```

> 👉 **Guardá el QueueUrl**. Lo vas a necesitar para todas las operaciones siguientes. Vas a poder guardarlo en una variable:

```bash
QUEUE_URL=$(aws sqs create-queue --queue-name mi-cola --query QueueUrl --output text)
echo $QUEUE_URL
```

Listar colas:

```bash
aws sqs list-queues
```

### Lab 2 — Enviar mensajes

```bash
aws sqs send-message \
  --queue-url "$QUEUE_URL" \
  --message-body "Hola, soy el primer mensaje"

aws sqs send-message \
  --queue-url "$QUEUE_URL" \
  --message-body "Segundo mensaje"

aws sqs send-message \
  --queue-url "$QUEUE_URL" \
  --message-body "Tercero"
```

Verificar cuántos mensajes hay:

```bash
aws sqs get-queue-attributes \
  --queue-url "$QUEUE_URL" \
  --attribute-names ApproximateNumberOfMessages
```

### Lab 3 — Recibir y procesar mensajes

```bash
aws sqs receive-message \
  --queue-url "$QUEUE_URL" \
  --max-number-of-messages 10 \
  --wait-time-seconds 5
```

Vas a ver algo así:

```json
{
  "Messages": [
    {
      "MessageId": "...",
      "ReceiptHandle": "...",
      "MD5OfBody": "...",
      "Body": "Hola, soy el primer mensaje"
    }
  ]
}
```

> 💡 El **ReceiptHandle** es como el "ticket" que necesitás para borrar ese mensaje específico. Es distinto al MessageId.

Borrar un mensaje (necesitás el ReceiptHandle):

```bash
RECEIPT_HANDLE="<el receipt handle del paso anterior>"

aws sqs delete-message \
  --queue-url "$QUEUE_URL" \
  --receipt-handle "$RECEIPT_HANDLE"
```

### Lab 4 — Visibility timeout en acción

Mandá un mensaje y leélo, pero **no lo borres**:

```bash
aws sqs send-message --queue-url "$QUEUE_URL" --message-body "Test visibility"

aws sqs receive-message --queue-url "$QUEUE_URL"
```

Volvé a leer inmediatamente:

```bash
aws sqs receive-message --queue-url "$QUEUE_URL"
```

No te devuelve nada porque el mensaje está oculto. Esperá 30 segundos y reintenta:

```bash
sleep 30
aws sqs receive-message --queue-url "$QUEUE_URL"
```

Aparece de nuevo.

### Lab 5 — Crear una DLQ y configurar redrive

Crear la DLQ:

```bash
DLQ_URL=$(aws sqs create-queue --queue-name mi-cola-dlq --query QueueUrl --output text)

# Necesitamos el ARN de la DLQ
DLQ_ARN=$(aws sqs get-queue-attributes \
  --queue-url "$DLQ_URL" \
  --attribute-names QueueArn \
  --query 'Attributes.QueueArn' \
  --output text)
echo $DLQ_ARN
```

Configurar la cola original para que mande a la DLQ después de 3 reintentos fallidos:

```bash
aws sqs set-queue-attributes \
  --queue-url "$QUEUE_URL" \
  --attributes "{\"RedrivePolicy\":\"{\\\"deadLetterTargetArn\\\":\\\"$DLQ_ARN\\\",\\\"maxReceiveCount\\\":\\\"3\\\"}\"}"
```

> 💡 Esa sintaxis con escapes es horrible. Para evitarla, podés meter el JSON en un archivo. Es una de las cosas que el AWS CLI hace incómodas.

### Lab 6 — Cola FIFO con grupos

Las colas FIFO tienen que terminar en `.fifo` y necesitan dos atributos extra al mandar mensajes: `MessageGroupId` y opcional `MessageDeduplicationId`.

```bash
aws sqs create-queue \
  --queue-name pedidos.fifo \
  --attributes FifoQueue=true,ContentBasedDeduplication=true
```

```bash
FIFO_URL=$(aws sqs get-queue-url --queue-name pedidos.fifo --query QueueUrl --output text)

aws sqs send-message \
  --queue-url "$FIFO_URL" \
  --message-body "Pedido 1" \
  --message-group-id "usuario-thomas"

aws sqs send-message \
  --queue-url "$FIFO_URL" \
  --message-body "Pedido 2" \
  --message-group-id "usuario-thomas"

aws sqs send-message \
  --queue-url "$FIFO_URL" \
  --message-body "Pedido 1" \
  --message-group-id "usuario-thomas"
```

El tercer mensaje **no se inserta** porque tiene el mismo contenido que el primero (ContentBasedDeduplication detecta duplicados por hash).

```bash
aws sqs receive-message --queue-url "$FIFO_URL" --max-number-of-messages 10
```

Vas a recibir Pedido 1 y Pedido 2 **en orden**, sin el duplicado.

### Lab 7 — Limpieza

```bash
aws sqs delete-queue --queue-url "$QUEUE_URL"
aws sqs delete-queue --queue-url "$DLQ_URL"
aws sqs delete-queue --queue-url "$FIFO_URL"
```

---

## 5. Bonus Node.js — Productor y consumidor

`sqs-producer.js`:

```js
import {
  SQSClient,
  CreateQueueCommand,
  SendMessageCommand,
} from "@aws-sdk/client-sqs";

const sqs = new SQSClient({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
  credentials: { accessKeyId: "test", secretAccessKey: "test" },
});

const { QueueUrl } = await sqs.send(
  new CreateQueueCommand({ QueueName: "node-cola" })
);
console.log("Cola:", QueueUrl);

for (let i = 1; i <= 5; i++) {
  await sqs.send(
    new SendMessageCommand({
      QueueUrl,
      MessageBody: JSON.stringify({
        type: "pedido",
        numero: i,
        timestamp: Date.now(),
      }),
    })
  );
  console.log(`Enviado mensaje ${i}`);
}
```

`sqs-consumer.js`:

```js
import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
  GetQueueUrlCommand,
} from "@aws-sdk/client-sqs";

const sqs = new SQSClient({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
  credentials: { accessKeyId: "test", secretAccessKey: "test" },
});

const { QueueUrl } = await sqs.send(
  new GetQueueUrlCommand({ QueueName: "node-cola" })
);

console.log("Consumiendo... Ctrl+C para parar");

while (true) {
  const result = await sqs.send(
    new ReceiveMessageCommand({
      QueueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20, // long polling
    })
  );

  if (!result.Messages || result.Messages.length === 0) {
    console.log("Cola vacía, esperando...");
    continue;
  }

  for (const msg of result.Messages) {
    const body = JSON.parse(msg.Body);
    console.log("Procesando:", body);

    // Simular procesamiento
    await new Promise((r) => setTimeout(r, 200));

    // Borrar el mensaje
    await sqs.send(
      new DeleteMessageCommand({
        QueueUrl,
        ReceiptHandle: msg.ReceiptHandle,
      })
    );
    console.log(`Mensaje ${msg.MessageId} procesado`);
  }
}
```

Corré en dos terminales separadas:

```bash
node sqs-producer.js
# en otra terminal:
node sqs-consumer.js
```

---

## 6. Patrones de uso reales

### Procesamiento asíncrono de tareas pesadas

```
[API] → [cola] → [worker que genera PDFs]
```

La API devuelve "PDF en camino" inmediato. El worker genera el PDF en segundo plano.

### Fan-out con SNS + SQS

```
              ┌→ [cola A] → [worker billing]
[evento] → [topic SNS] ┼→ [cola B] → [worker email]
              └→ [cola C] → [worker analytics]
```

Un solo evento llega a varios consumidores independientes. Lo vemos en el módulo de SNS.

### Buffer entre microservicios

```
[Servicio rápido] → [cola] → [Servicio lento]
```

Si el rápido genera más de lo que el lento procesa, la cola absorbe la diferencia.

---

## 7. Diferencias clave con AWS real

| Aspecto                    | AWS real             | Floci             |
|----------------------------|----------------------|-------------------|
| Throughput                 | Real, casi ilimitado | Limitado por la máquina |
| Costo                      | Por request          | $0                |
| Latencia                   | ~5 ms                | <1 ms (localhost) |
| Mensajería cross-region    | Sí                   | No aplica         |

Funcionalmente, SQS en Floci se comporta como AWS real.

---

## Quiz del módulo 06

**1.** ¿Cuál es la principal ventaja de usar una cola SQS?

a) Las colas son más rápidas que las bases de datos.
b) Desacoplar productores y consumidores, permitiendo procesamiento asíncrono.
c) Encriptar los datos.
d) Reducir el tamaño de los mensajes.

**2.** ¿Cuál es la diferencia entre una cola Standard y una FIFO?

a) FIFO garantiza orden estricto y unicidad, Standard no.
b) FIFO es más rápida.
c) Standard tiene más features.
d) FIFO solo existe en us-east-1.

**3.** ¿Qué pasa si un consumidor lee un mensaje pero no lo borra dentro del visibility timeout?

a) El mensaje se pierde.
b) El mensaje vuelve a estar visible y otro consumidor lo puede leer.
c) El mensaje se duplica.
d) SQS bloquea al consumidor.

**4.** ¿Para qué sirve una Dead Letter Queue (DLQ)?

a) Para borrar mensajes automáticamente.
b) Para mensajes que fallaron N veces, así no bloquean el resto y se pueden investigar.
c) Para mensajes urgentes.
d) Para cifrar mensajes.

**5.** ¿Cuál es la diferencia entre short polling y long polling?

a) Short polling es más caro porque hace más llamadas vacías.
b) Long polling es más caro.
c) No hay diferencia.
d) Long polling solo funciona en colas FIFO.

**6.** ¿Cuánto tiempo se quedan los mensajes en una cola por defecto?

a) 1 hora
b) 1 día
c) 4 días
d) Para siempre

**7.** ¿Qué nombre necesita una cola FIFO?

a) Solo letras minúsculas.
b) Tiene que terminar en `.fifo`.
c) Tiene que empezar con `fifo-`.
d) No importa.

---

### Respuestas

1. **b**. Desacoplar es el punto central de las colas. Permite que el productor no espere al consumidor.
2. **a**. FIFO = orden estricto + exactly-once. Standard = best-effort de orden + at-least-once.
3. **b**. Después del visibility timeout, el mensaje vuelve a aparecer para que otro consumidor lo procese. Esto da reintento automático.
4. **b**. La DLQ aísla mensajes problemáticos.
5. **a**. Short polling devuelve inmediato y si la cola está vacía no hay mensaje. Te termina costando más en llamadas. Long polling espera y reduce el costo.
6. **c**. 4 días por defecto, máximo 14 días.
7. **b**. Las colas FIFO tienen que terminar en `.fifo`.

---

## Resumen

- SQS es una cola de mensajes managed.
- **Standard** = throughput alto, orden best-effort, posibles duplicados.
- **FIFO** = orden estricto, exactly-once, throughput limitado.
- **Visibility timeout** evita doble procesamiento y permite reintentos.
- **DLQ** para mensajes problemáticos.
- **Long polling** > short polling (más eficiente y barato).
- Patrón clásico: **fan-out con SNS + SQS** (próximo módulo).

Siguiente: [`07-sns.md`](./07-sns.md).
