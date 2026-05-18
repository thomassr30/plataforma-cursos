import type { ModuleData } from "@/types/course";

export const m6: ModuleData = {
  slug: "m6",
  number: 6,
  title: "SQS · Simple Queue Service",
  icon: "📨",
  intro:
    "SQS es el servicio de colas de mensajes managed de AWS. Permite desacoplar productores y consumidores, agregar resiliencia y escalar horizontalmente. Conceptos clave para el examen: Standard vs FIFO, visibility timeout y DLQ.",
  totalActivities: 2,
  blocks: [
    // 1. Qué es
    { kind: "h3", text: "📬 1. ¿Qué es SQS y para qué sirve?" },
    {
      kind: "info",
      html:
        "<strong>SQS</strong> es una cola de mensajes: un productor escribe en una punta y un consumidor lee en la otra. Beneficios:" +
        "<ul><li><strong>Desacoplamiento:</strong> productor y consumidor no se conocen directamente</li>" +
        "<li><strong>Resiliencia:</strong> si el consumidor cae, los mensajes esperan en la cola</li>" +
        "<li><strong>Buffer:</strong> amortigua diferencias de velocidad entre productores y consumidores</li>" +
        "<li><strong>Escalado:</strong> agregar más workers para procesar en paralelo</li></ul>",
    },

    // 2. Standard vs FIFO
    { kind: "h3", text: "🆚 2. Standard vs FIFO (examen)" },
    {
      kind: "table",
      headers: ["Característica", "Standard", "FIFO"],
      rows: [
        ["Orden", "Best-effort (puede llegar desordenado)", "Estricto"],
        ["Duplicados", "Posibles (at-least-once)", "Exactly-once"],
        ["Throughput", "Casi ilimitado", "300 msg/s por grupo (3000 con batching)"],
        ["Naming", "mi-cola", "mi-cola.fifo (sufijo obligatorio)"],
        ["Caso de uso", "Orden no crítico", "Transacciones financieras, eventos secuenciales"],
      ],
    },

    // 3. Visibility timeout
    { kind: "h3", text: "👁️ 3. Visibility timeout" },
    {
      kind: "info",
      html:
        "Cuando un consumidor lee un mensaje, SQS lo <strong>oculta</strong> al resto durante un período (default 30 seg).<br/>" +
        "Si el consumidor llama a <code>DeleteMessage</code> dentro de ese tiempo, el mensaje desaparece.<br/>" +
        "Si no (porque crasheó), el mensaje vuelve a estar visible y otro consumer lo procesa. Esto da <strong>reintento automático ante fallos</strong>.",
    },
    {
      kind: "tip",
      html:
        "<strong>⚠️ Configurá el visibility timeout a más que el tiempo máximo de procesamiento.</strong> Si tu Lambda tarda 60 seg y el timeout es 30 seg, vas a tener procesamiento doble.",
    },

    // 4. Long polling y DLQ
    { kind: "h3", text: "⏱️ 4. Long polling y DLQ" },
    {
      kind: "info",
      html:
        "<strong>Long polling:</strong> ReceiveMessage espera hasta N segundos por mensajes (default <code>WaitTimeSeconds=20</code>). Más eficiente y barato que short polling.<br/><br/>" +
        "<strong>Dead Letter Queue (DLQ):</strong> cola para mensajes que fallaron N veces. Se configura con un <em>redrive policy</em>. Útil para aislar mensajes problemáticos sin que bloqueen el resto.",
    },

    // 5. Otras features
    { kind: "h3", text: "🧰 5. Otras features" },
    {
      kind: "list",
      items: [
        "<strong>Batches:</strong> SendMessageBatch / DeleteMessageBatch (hasta 10 mensajes por request)",
        "<strong>Message attributes:</strong> metadata tipada (String/Number/Binary)",
        "<strong>Retención:</strong> default 4 días, máximo 14",
        "<strong>Encriptación en reposo:</strong> con KMS",
      ],
    },

    // 6. Lab CLI
    { kind: "h3", text: "🧪 6. Laboratorio en Floci" },
    {
      kind: "info",
      html:
        "<pre><code># Crear cola y guardar el URL\n" +
        "QUEUE_URL=$(aws sqs create-queue \\\n" +
        "  --queue-name mi-cola \\\n" +
        "  --query QueueUrl --output text)\n\n" +
        "# Enviar\n" +
        "aws sqs send-message \\\n" +
        "  --queue-url $QUEUE_URL \\\n" +
        "  --message-body 'Hola SQS'\n\n" +
        "# Recibir (long polling 5 seg)\n" +
        "aws sqs receive-message \\\n" +
        "  --queue-url $QUEUE_URL \\\n" +
        "  --max-number-of-messages 10 \\\n" +
        "  --wait-time-seconds 5\n\n" +
        "# Borrar mensaje (necesita ReceiptHandle)\n" +
        "aws sqs delete-message \\\n" +
        "  --queue-url $QUEUE_URL \\\n" +
        "  --receipt-handle $RECEIPT_HANDLE</code></pre>",
    },
    {
      kind: "info",
      html:
        "<strong>Cola FIFO con dedup por contenido:</strong>" +
        "<pre><code>aws sqs create-queue \\\n" +
        "  --queue-name pedidos.fifo \\\n" +
        "  --attributes FifoQueue=true,ContentBasedDeduplication=true</code></pre>",
    },

    // 7. Bonus Node
    { kind: "h3", text: "📜 7. Bonus Node.js — consumer con long polling" },
    {
      kind: "info",
      html:
        "<pre><code>import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand }\n" +
        "  from '@aws-sdk/client-sqs';\n\n" +
        "const sqs = new SQSClient({ /* ... */ });\n\n" +
        "while (true) {\n" +
        "  const result = await sqs.send(new ReceiveMessageCommand({\n" +
        "    QueueUrl,\n" +
        "    MaxNumberOfMessages: 10,\n" +
        "    WaitTimeSeconds: 20, // long polling\n" +
        "  }));\n\n" +
        "  for (const msg of result.Messages || []) {\n" +
        "    console.log('Procesando:', msg.Body);\n" +
        "    await sqs.send(new DeleteMessageCommand({\n" +
        "      QueueUrl, ReceiptHandle: msg.ReceiptHandle,\n" +
        "    }));\n" +
        "  }\n" +
        "}</code></pre>",
    },

    // Quiz
    { kind: "h3", text: "🎯 Test del módulo 6" },
    {
      kind: "quiz",
      key: "m6_quiz",
      questions: [
        {
          q: "Principal ventaja de usar una cola SQS:",
          options: [
            "Las colas son más rápidas que las bases de datos",
            "Desacoplar productores y consumidores, permitiendo procesamiento asíncrono",
            "Encriptar datos",
            "Reducir tamaño de mensajes",
          ],
          correct: 1,
          explanation: "Desacoplamiento es el punto central de las colas: el productor no espera al consumidor.",
        },
        {
          q: "Diferencia entre Standard y FIFO:",
          options: [
            "FIFO garantiza orden estricto y exactly-once; Standard es best-effort y at-least-once",
            "FIFO es más rápida",
            "Standard tiene más features",
            "FIFO solo existe en us-east-1",
          ],
          correct: 0,
          explanation:
            "FIFO = orden + exactly-once, con throughput limitado. Standard = best-effort de orden + at-least-once, pero escala mucho más.",
        },
        {
          q: "Un consumidor lee un mensaje pero no lo borra dentro del visibility timeout. ¿Qué pasa?",
          options: [
            "El mensaje se pierde",
            "Vuelve a estar visible para que otro consumer lo lea",
            "Se duplica para siempre",
            "SQS bloquea al consumidor",
          ],
          correct: 1,
          explanation: "Después del visibility timeout, el mensaje reaparece. Esto da reintento automático ante fallos del consumer.",
        },
        {
          q: "¿Para qué sirve una DLQ?",
          options: [
            "Borrar mensajes automáticamente",
            "Mensajes que fallaron N veces para investigarlos sin bloquear el resto",
            "Mensajes urgentes",
            "Cifrar mensajes",
          ],
          correct: 1,
          explanation: "La DLQ aísla mensajes problemáticos. Se configura con un redrive policy (maxReceiveCount).",
        },
        {
          q: "Diferencia entre short polling y long polling:",
          options: [
            "Short polling es más caro porque hace más llamadas vacías",
            "Long polling es más caro",
            "No hay diferencia",
            "Long polling solo en FIFO",
          ],
          correct: 0,
          explanation:
            "Short polling devuelve inmediato y si la cola está vacía no trae nada. Long polling espera y reduce el costo.",
        },
        {
          q: "Una cola FIFO requiere:",
          options: [
            "Solo letras minúsculas",
            "Sufijo .fifo en el nombre",
            "Empezar con fifo-",
            "Nada especial",
          ],
          correct: 1,
          explanation: "Convención obligatoria: el nombre de las colas FIFO termina en .fifo.",
        },
      ],
    },
  ],
};
