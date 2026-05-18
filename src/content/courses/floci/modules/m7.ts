import type { ModuleData } from "@/types/course";

export const m7: ModuleData = {
  slug: "m7",
  number: 7,
  title: "SNS · Simple Notification Service",
  icon: "📡",
  intro:
    "SNS es el servicio pub/sub de AWS. Un publisher manda un mensaje a un topic y todos los subscriptores lo reciben. Junto con SQS implementa el patrón fan-out, una de las arquitecturas event-driven más comunes.",
  totalActivities: 2,
  blocks: [
    // 1. SNS vs SQS
    { kind: "h3", text: "🆚 1. SNS vs SQS" },
    {
      kind: "info",
      html:
        "<strong>SQS</strong> es una <em>cola</em> (un mensaje → un consumidor que lo procesa).<br/>" +
        "<strong>SNS</strong> es un <em>broadcaster pub/sub</em> (un mensaje → todos los subscriptores lo reciben).",
    },
    {
      kind: "table",
      headers: ["Aspecto", "SNS", "SQS"],
      rows: [
        ["Modelo", "Pub/Sub (1-a-muchos)", "Cola (1-a-1 por mensaje)"],
        ["Consumidores reciben", "Todos los subs el mismo msg", "Uno solo por mensaje"],
        ["Pull o push", "Push", "Pull (polling)"],
        ["Retención sin consumer", "El mensaje se descarta", "Hasta 14 días"],
        ["Filter policies", "Sí", "No"],
        ["Caso típico", "Eventos / notificaciones", "Tareas / trabajo a procesar"],
      ],
    },

    // 2. Conceptos
    { kind: "h3", text: "📚 2. Topics y subscriptions" },
    {
      kind: "info",
      html:
        "<strong>Topic</strong>: canal donde se publican los mensajes. ARN tipo <code>arn:aws:sns:us-east-1:000000000000:mi-topic</code>.<br/><br/>" +
        "Cada topic puede tener <strong>N subscriptions</strong>. Protocolos:" +
        "<ul><li><strong>sqs</strong> — a una cola SQS</li>" +
        "<li><strong>lambda</strong> — invoca una función</li>" +
        "<li><strong>http</strong> / <strong>https</strong> — POST a endpoint</li>" +
        "<li><strong>email</strong>, <strong>sms</strong>, <strong>application</strong> (mobile push) — solo en AWS real</li></ul>",
    },

    // 3. Fan-out
    { kind: "h3", text: "📤 3. Patrón Fan-out (CRÍTICO examen)" },
    {
      kind: "info",
      html:
        "<pre><code>                            ┌→ [cola-billing] → [worker]\n" +
        "[evento] → [topic SNS] ─┼→ [cola-email]   → [worker]\n" +
        "                            └→ [cola-stock]   → [worker]</code></pre>" +
        "Un solo <code>Publish</code> dispara N procesamientos independientes. Cada cola tiene su buffer y su consumer.",
    },

    // 4. Filter policies
    { kind: "h3", text: "🎯 4. Filter policies" },
    {
      kind: "info",
      html:
        "Una subscription puede tener un <strong>filter policy</strong> que define qué mensajes le interesan según message attributes. Los que no matchean no se le entregan.<br/><br/>" +
        "Ejemplo: solo mensajes con <code>tipo=urgente</code>:" +
        "<pre><code>{\n" +
        '  "tipo": ["urgente"]\n' +
        "}</code></pre>",
    },

    // 5. Lab CLI
    { kind: "h3", text: "🧪 5. Laboratorio en Floci" },
    {
      kind: "info",
      html:
        "<strong>Crear topic + colas + subscripciones:</strong>" +
        "<pre><code># Topic\n" +
        "TOPIC_ARN=$(aws sns create-topic \\\n" +
        "  --name pedidos --query TopicArn --output text)\n\n" +
        "# Cola SQS\n" +
        "QUEUE_URL=$(aws sqs create-queue \\\n" +
        "  --queue-name cola-email --query QueueUrl --output text)\n\n" +
        "# ARN de la cola\n" +
        "QUEUE_ARN=$(aws sqs get-queue-attributes \\\n" +
        "  --queue-url $QUEUE_URL \\\n" +
        "  --attribute-names QueueArn \\\n" +
        "  --query 'Attributes.QueueArn' --output text)\n\n" +
        "# Suscribir la cola al topic\n" +
        "aws sns subscribe \\\n" +
        "  --topic-arn $TOPIC_ARN \\\n" +
        "  --protocol sqs \\\n" +
        "  --notification-endpoint $QUEUE_ARN\n\n" +
        "# Publicar\n" +
        "aws sns publish \\\n" +
        "  --topic-arn $TOPIC_ARN \\\n" +
        "  --message '{\"pedidoId\":\"123\"}'</code></pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Cuando SNS publica en SQS, la cola NO recibe el body crudo</strong> — recibe un <em>sobre JSON</em> con metadata SNS y el body original en el campo <code>Message</code>. Tu consumer tiene que parsear ese sobre.",
    },

    // 6. Casos de uso
    { kind: "h3", text: "💼 6. Casos de uso reales" },
    {
      kind: "list",
      items: [
        "<strong>Alarmas:</strong> CloudWatch Alarm → SNS → PagerDuty + Slack + email",
        "<strong>Eventos de dominio:</strong> UserCreated → SNS fan-out → billing, email, analytics",
        "<strong>Pipelines event-driven:</strong> SNS → Lambda → SNS → Lambda (sin Step Functions)",
      ],
    },

    // Quiz
    { kind: "h3", text: "🎯 Test del módulo 7" },
    {
      kind: "quiz",
      key: "m7_quiz",
      questions: [
        {
          q: "Principal diferencia entre SNS y SQS:",
          options: [
            "SNS es más rápido",
            "SQS guarda mensajes; SNS los reenvía a todos los subscriptores",
            "SNS solo manda emails",
            "No hay diferencia",
          ],
          correct: 1,
          explanation: "SNS es pub/sub (un mensaje → muchos suscriptores). SQS es cola (un mensaje → un consumidor).",
        },
        {
          q: "En fan-out SNS+SQS, al publicar un mensaje:",
          options: [
            "Solo lo recibe un subscriber al azar",
            "Cada cola subscripta recibe una copia",
            "El mensaje se borra inmediatamente",
            "Hay que pagar a cada cola",
          ],
          correct: 1,
          explanation: "Cada subscription recibe su propia copia. Esa es la esencia del fan-out.",
        },
        {
          q: "¿Para qué sirve un filter policy?",
          options: [
            "Encriptar mensajes",
            "Que la subscription reciba solo mensajes que cumplen ciertas condiciones",
            "Borrar mensajes viejos",
            "Configurar la región",
          ],
          correct: 1,
          explanation: "Filter policies filtran por message attributes. Solo los matches llegan a esa subscription.",
        },
        {
          q: "Si SNS publica en una cola SQS, ¿qué recibe la cola?",
          options: [
            "Solo el body original",
            "Un sobre JSON con metadata SNS y el body original en el campo Message",
            "Un email",
            "Una notificación push",
          ],
          correct: 1,
          explanation: "El mensaje viene envuelto en un sobre SNS. Tu consumer tiene que parsearlo y extraer el Message original.",
        },
        {
          q: "Caso de uso típico de SNS:",
          options: [
            "Almacenar archivos",
            "Notificar a varios sistemas cuando pasa un evento (eventos / alarmas)",
            "Reemplazar bases de datos",
            "Acelerar consultas SQL",
          ],
          correct: 1,
          explanation: "Notificaciones, eventos de dominio, alertas, pub/sub general.",
        },
      ],
    },
  ],
};
