import type { ModuleData } from "@/types/course";

export const m12: ModuleData = {
  slug: "m12",
  number: 12,
  title: "CloudWatch · Logs y Métricas",
  icon: "📊",
  intro:
    "CloudWatch es el servicio de observabilidad de AWS. Centraliza logs, métricas y alarms. En arquitecturas serverless es esencial: las Lambdas escriben automáticamente en CloudWatch Logs y se monitorean con métricas y alarmas.",
  totalActivities: 2,
  blocks: [
    // 1. Qué incluye CloudWatch
    { kind: "h3", text: "👀 1. ¿Qué incluye CloudWatch?" },
    {
      kind: "list",
      items: [
        "<strong>CloudWatch Logs:</strong> logs centralizados",
        "<strong>CloudWatch Metrics:</strong> métricas numéricas",
        "<strong>CloudWatch Alarms:</strong> alertas basadas en métricas",
        "<strong>CloudWatch Dashboards:</strong> panels visuales",
        "<strong>CloudWatch Synthetics:</strong> pings automáticos a endpoints",
        "<strong>CloudWatch Insights:</strong> query potente sobre logs",
        "<strong>X-Ray:</strong> distributed tracing",
      ],
    },

    // 2. Logs
    { kind: "h3", text: "📝 2. CloudWatch Logs: estructura" },
    {
      kind: "info",
      html:
        "<strong>Log group:</strong> namespace de logs (típicamente uno por app/servicio). Ej: <code>/aws/lambda/mi-funcion</code>.<br/>" +
        "<strong>Log stream:</strong> fuente continua de logs dentro de un log group.<br/>" +
        "<strong>Log event:</strong> cada mensaje con timestamp y body.",
    },

    // 3. Lambda → CloudWatch
    { kind: "h3", text: "λ 3. Lambda → CloudWatch Logs (automático)" },
    {
      kind: "successBox",
      html:
        "Cuando una Lambda corre, todos los <code>console.log</code>, <code>console.error</code>, etc. van a CloudWatch Logs automáticamente.<br/><br/>" +
        "Lo único que necesitás es que el role tenga la policy <code>AWSLambdaBasicExecutionRole</code>. No hay que llamar a ninguna API.",
    },

    // 4. Logs estructurados
    { kind: "h3", text: "🎨 4. Logs estructurados (buena práctica)" },
    {
      kind: "info",
      html:
        "En lugar de:" +
        "<pre><code>console.log('user logged in: ' + userId);</code></pre>" +
        "Usar JSON:" +
        "<pre><code>console.log(JSON.stringify({\n" +
        "  level: 'info',\n" +
        "  event: 'user-login',\n" +
        "  userId: userId,\n" +
        "  timestamp: new Date().toISOString(),\n" +
        "}));</code></pre>" +
        "Ventaja: filtrar por campos (<code>{ $.event = 'user-login' }</code>) en lugar de matchear texto.",
    },

    // 5. Retention
    { kind: "h3", text: "⏰ 5. Retention" },
    {
      kind: "info",
      html:
        "Configurable por log group: 1 día, 1 semana, 1 mes, 1 año, indefinida.<br/>" +
        "<strong>Más retention = más costo.</strong> Para logs de aplicación, 30-90 días suele alcanzar.",
    },

    // 6. Alarms pipeline
    { kind: "h3", text: "🚨 6. Pipeline de alerting (examen)" },
    {
      kind: "info",
      html:
        "<pre><code>[Logs] → [Metric Filter] → [Métrica] → [Alarm] → [SNS] → [Email/Slack/PagerDuty]</code></pre>" +
        "<ol><li><strong>Metric filter</strong>: regla que cuenta cuántos eventos matchean un patrón y los expone como métrica</li>" +
        "<li><strong>Alarm</strong>: 'si la métrica supera X durante Y minutos, disparar'</li>" +
        "<li><strong>SNS</strong>: notificar a humanos o sistemas</li></ol>",
    },

    // 7. Lab
    { kind: "h3", text: "🧪 7. Laboratorio en Floci" },
    {
      kind: "info",
      html:
        "<strong>Logs manuales:</strong>" +
        "<pre><code># Crear log group y stream\n" +
        "aws logs create-log-group --log-group-name /mi-app/api\n" +
        "aws logs create-log-stream \\\n" +
        "  --log-group-name /mi-app/api \\\n" +
        "  --log-stream-name servidor-1\n\n" +
        "# Mandar eventos\n" +
        "TS=$(date +%s%3N)\n" +
        "aws logs put-log-events \\\n" +
        "  --log-group-name /mi-app/api \\\n" +
        "  --log-stream-name servidor-1 \\\n" +
        "  --log-events \"[{\\\"timestamp\\\": $TS, \\\"message\\\": \\\"Hola log\\\"}]\"\n\n" +
        "# Tail live\n" +
        "aws logs tail /mi-app/api --follow\n\n" +
        "# Filtrar errores\n" +
        "aws logs filter-log-events \\\n" +
        "  --log-group-name /mi-app/api \\\n" +
        "  --filter-pattern 'ERROR'</code></pre>",
    },
    {
      kind: "info",
      html:
        "<strong>Métricas custom:</strong>" +
        "<pre><code>aws cloudwatch put-metric-data \\\n" +
        "  --namespace 'MiApp' \\\n" +
        "  --metric-name 'Pedidos' \\\n" +
        "  --value 1 \\\n" +
        "  --unit Count</code></pre>",
    },

    // Quiz
    { kind: "h3", text: "🎯 Test del módulo 12" },
    {
      kind: "quiz",
      key: "m12_quiz",
      questions: [
        {
          q: "¿Cómo escriben logs las Lambdas en CloudWatch?",
          options: [
            "Llamando a la API explícitamente",
            "console.log va automáticamente, siempre que el role tenga permisos",
            "Lambdas no escriben en CloudWatch",
            "Solo si activás un trigger",
          ],
          correct: 1,
          explanation: "Lambda → CloudWatch Logs es automático. Solo necesitás AWSLambdaBasicExecutionRole.",
        },
        {
          q: "¿Qué es un log stream?",
          options: [
            "Un canal de TV",
            "Una fuente continua de logs dentro de un log group",
            "Una alarma",
            "Una métrica",
          ],
          correct: 1,
          explanation: "Log group > log stream > log events. El stream es una fuente continua.",
        },
        {
          q: "Ventaja de logs en JSON:",
          options: [
            "Pesan menos",
            "Podés filtrar por campos específicos en lugar de matchear texto",
            "AWS los encripta",
            "No tienen ventajas",
          ],
          correct: 1,
          explanation: "JSON permite filter patterns sobre campos: { $.level = 'error' }.",
        },
        {
          q: "¿Para qué sirve la retention de un log group?",
          options: [
            "Encriptar",
            "Definir cuánto tiempo se guardan los logs antes de borrarse",
            "Acelerar la API",
            "Reducir el costo de red",
          ],
          correct: 1,
          explanation: "Retention controla cuánto se conservan. Más tiempo = más costo.",
        },
        {
          q: "Equipo quiere alertar si hay > 10 errores en 5 min. ¿Cómo lo arma?",
          options: [
            "Una Lambda que se invoque sola",
            "Metric filter sobre logs + alarm + SNS",
            "Una cola SQS",
            "Una tabla DynamoDB",
          ],
          correct: 1,
          explanation: "Pipeline canónico: filter cuenta matches → métrica → alarm → SNS notifica.",
        },
      ],
    },
  ],
};
