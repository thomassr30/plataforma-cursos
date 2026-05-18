import type { ModuleData } from "@/types/course";

export const m14: ModuleData = {
  slug: "m14",
  number: 14,
  title: "Proyecto Integrador · API Serverless completa",
  icon: "🏗️",
  intro:
    "Llegó el momento de integrar todo. Vamos a diseñar y entender una API de procesamiento de pedidos que usa IAM + S3 + DynamoDB + SQS + SNS + Lambda + API Gateway + CloudWatch + CloudFormation. Es la arquitectura serverless event-driven más típica de AWS.",
  totalActivities: 2,
  blocks: [
    // 1. Arquitectura
    { kind: "h3", text: "🗺️ 1. La arquitectura" },
    {
      kind: "info",
      html:
        "<pre><code>                                       ┌──────────────┐\n" +
        "[Cliente] → HTTPS → [API Gateway] →│   Lambda     │\n" +
        "                                   │   API        │\n" +
        "                                   └──────┬───────┘\n" +
        "                                          │\n" +
        "                       ┌──────────────────┼──────────────────┐\n" +
        "                       │                  │                  │\n" +
        "                       ▼                  ▼                  ▼\n" +
        "                ┌────────────┐    ┌────────────┐     ┌────────────┐\n" +
        "                │ DynamoDB   │    │ SNS topic  │     │   S3       │\n" +
        "                │ (Pedidos)  │    │            │     │  (recibos) │\n" +
        "                └────────────┘    └─────┬──────┘     └────────────┘\n" +
        "                                        │\n" +
        "                       ┌────────────────┼────────────────┐\n" +
        "                       ▼                                 ▼\n" +
        "                ┌────────────┐                    ┌────────────┐\n" +
        "                │ SQS:       │                    │ SQS:       │\n" +
        "                │ cola-email │                    │ cola-stock │\n" +
        "                └─────┬──────┘                    └─────┬──────┘\n" +
        "                      ▼                                 ▼\n" +
        "                ┌────────────┐                    ┌────────────┐\n" +
        "                │ Lambda     │                    │ Lambda     │\n" +
        "                │ Email      │                    │ Stock      │\n" +
        "                └────────────┘                    └────────────┘</code></pre>",
    },

    // 2. Flujo
    { kind: "h3", text: "🔄 2. Flujo de datos" },
    {
      kind: "list",
      items: [
        "<strong>POST /pedidos</strong>: cliente crea un pedido → API Gateway → Lambda API",
        "Lambda API hace 3 cosas en paralelo: guarda el pedido en DynamoDB, sube recibo a S3, publica evento en SNS",
        "SNS hace <strong>fan-out</strong> a dos colas SQS independientes",
        "Lambda Email lee de su cola y simula mandar email",
        "Lambda Stock lee de su cola y descuenta inventario",
        "<strong>GET /pedidos</strong> y <strong>GET /pedidos/{id}</strong>: consultas directas a DynamoDB",
      ],
    },

    // 3. Recursos necesarios
    { kind: "h3", text: "📦 3. Recursos a crear" },
    {
      kind: "table",
      headers: ["Recurso", "Servicio", "Cantidad"],
      rows: [
        ["pedidos-pedidos", "DynamoDB Table", "1"],
        ["pedidos-recibos", "S3 Bucket", "1"],
        ["pedidos-eventos", "SNS Topic", "1"],
        ["pedidos-cola-email, pedidos-cola-stock", "SQS Queues", "2"],
        ["Subscripciones SQS al topic", "SNS Subscriptions", "2"],
        ["pedidos-api-role, pedidos-worker-role", "IAM Roles", "2"],
        ["pedidos-api, pedidos-email, pedidos-stock", "Lambda Functions", "3"],
        ["pedidos-api (HTTP API)", "API Gateway v2", "1"],
        ["Event source mappings SQS→Lambda", "Lambda ESM", "2"],
      ],
    },

    // 4. CloudFormation template
    { kind: "h3", text: "📐 4. Estrategia de deploy" },
    {
      kind: "info",
      html:
        "Se separa en dos capas:" +
        "<ol><li><strong>Infraestructura base con CloudFormation</strong>: DynamoDB, S3, SNS, SQS, subscripciones, IAM roles. Todo declarativo en <code>template.yaml</code>.</li>" +
        "<li><strong>Lambdas + API Gateway con CLI</strong>: porque empaquetar zips de Lambdas dentro de un template tiene fricciones que se resuelven con SAM o un bucket de artifacts (queda para un curso siguiente).</li></ol>",
    },

    // 5. Snippet de la Lambda API
    { kind: "h3", text: "💡 5. La Lambda API en Node.js (extracto)" },
    {
      kind: "info",
      html:
        "<pre><code>exports.handler = async (event) => {\n" +
        "  const method = event.requestContext.http.method;\n\n" +
        "  if (method === 'POST') {\n" +
        "    const data = JSON.parse(event.body || '{}');\n" +
        "    const pedido = {\n" +
        "      id: randomUUID(),\n" +
        "      ...data,\n" +
        "      total: calcularTotal(data.items),\n" +
        "      creadoEn: new Date().toISOString(),\n" +
        "    };\n\n" +
        "    // Operaciones en paralelo\n" +
        "    await Promise.all([\n" +
        "      ddb.send(new PutCommand({ TableName: TABLE, Item: pedido })),\n" +
        "      s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: `recibos/${pedido.id}.txt`, Body: generarRecibo(pedido) })),\n" +
        "      sns.send(new PublishCommand({ TopicArn: TOPIC, Message: JSON.stringify(pedido) })),\n" +
        "    ]);\n\n" +
        "    return respond(201, pedido);\n" +
        "  }\n" +
        "  // ... GET handlers\n" +
        "};</code></pre>",
    },

    // 6. Checklist
    { kind: "h3", text: "✅ 6. Checklist de verificación" },
    {
      kind: "list",
      items: [
        "Stack CloudFormation creado: <code>aws cloudformation describe-stacks</code>",
        "Tabla DynamoDB existe: <code>aws dynamodb describe-table</code>",
        "Bucket S3 existe: <code>aws s3 ls</code>",
        "Topic SNS existe + colas subscriptas: <code>aws sns list-subscriptions-by-topic</code>",
        "Tres Lambdas existen: <code>aws lambda list-functions</code>",
        "Event source mappings creadas: <code>aws lambda list-event-source-mappings</code>",
        "HTTP API responde a curl",
      ],
    },

    // 7. Por qué este diseño
    { kind: "h3", text: "🎓 7. Decisiones de diseño (importante)" },
    {
      kind: "list",
      items: [
        "<strong>Fan-out con SNS:</strong> permite agregar más consumidores sin modificar la API",
        "<strong>SQS entre SNS y workers:</strong> cada worker tiene su buffer y reintentos automáticos",
        "<strong>Roles separados:</strong> API tiene permisos amplios (escribe en todo); workers solo leen SQS y escriben logs (least privilege)",
        "<strong>S3 para recibos:</strong> texto plano, simple, barato. En producción sería PDF",
        "<strong>DynamoDB para pedidos:</strong> latencia milisegundo, escalado infinito si crece",
        "<strong>CloudWatch Logs automático</strong> en las tres Lambdas para debugging",
      ],
    },

    // 8. Diferencias con AWS real
    { kind: "h3", text: "⚠️ 8. Adaptaciones para producción" },
    {
      kind: "list",
      items: [
        "<strong>Autenticación:</strong> agregar Cognito + JWT authorizer en la API",
        "<strong>DLQ</strong> en las colas para mensajes problemáticos",
        "<strong>Encriptación en reposo con KMS</strong> en S3 y DynamoDB",
        "<strong>Secrets Manager</strong> para credenciales externas (Stripe, SendGrid)",
        "<strong>RDS Proxy</strong> si la API consulta una base relacional",
        "<strong>WAF</strong> delante de API Gateway",
        "<strong>X-Ray</strong> para tracing distribuido",
      ],
    },

    // Quiz
    { kind: "h3", text: "🎯 Test del proyecto integrador" },
    {
      kind: "quiz",
      key: "m14_quiz",
      questions: [
        {
          q: "¿Por qué la arquitectura usa SNS+SQS en lugar de invocar directamente a las Lambdas de email y stock?",
          options: [
            "Es más barato",
            "Desacopla la API de los workers, da buffer y reintentos automáticos, y permite agregar consumidores sin tocar la API",
            "Es obligatorio en AWS",
            "Los workers no pueden recibir HTTP",
          ],
          correct: 1,
          explanation:
            "El fan-out con SNS+SQS desacopla, da resiliencia (visibility timeout, reintentos), buffer y extensibilidad (agregar nuevos consumers sin modificar el publisher).",
        },
        {
          q: "Las Lambdas worker tienen un role DISTINTO al de la Lambda API. ¿Por qué?",
          options: [
            "Por costos",
            "Principio de least privilege: workers solo necesitan leer SQS, no escribir en DynamoDB ni S3",
            "Es un bug",
            "Para usar otra región",
          ],
          correct: 1,
          explanation: "Least privilege. Dar a cada Lambda solo los permisos que necesita reduce el blast radius si una credencial se compromete.",
        },
        {
          q: "El cuerpo del mensaje SQS que llega a Lambda Email es:",
          options: [
            "El body crudo que publicó la API",
            "Un sobre JSON de SNS con metadata + el mensaje original en el campo Message",
            "Solo el ID del pedido",
            "Está encriptado",
          ],
          correct: 1,
          explanation:
            "Cuando SNS publica a SQS, el mensaje viene envuelto en un sobre JSON SNS. El consumer tiene que parsear ese sobre.",
        },
        {
          q: "¿Cuál de estos NO es un recurso que crea el template CloudFormation del proyecto?",
          options: [
            "DynamoDB Table",
            "S3 Bucket",
            "SNS Topic",
            "EC2 Instance",
          ],
          correct: 3,
          explanation: "El proyecto es serverless: no usa EC2. Compute es Lambda. Storage es S3/DynamoDB. Mensajería SNS/SQS.",
        },
        {
          q: "¿Para producción real, qué agregarías?",
          options: [
            "Autenticación (Cognito + JWT)",
            "DLQ en las colas",
            "Secrets Manager para keys de terceros",
            "Todos los anteriores",
          ],
          correct: 3,
          explanation: "En producción real se agrega auth, DLQ, secrets management, WAF, X-Ray, encriptación KMS, alertas CloudWatch, etc.",
        },
      ],
    },
  ],
};
