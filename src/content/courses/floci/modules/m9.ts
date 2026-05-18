import type { ModuleData } from "@/types/course";

export const m9: ModuleData = {
  slug: "m9",
  number: 9,
  title: "API Gateway",
  icon: "🌐",
  intro:
    "API Gateway permite exponer APIs HTTP/REST sin administrar servidores. Es el componente que recibe requests HTTP, las convierte en eventos y las pasa a tu Lambda (o a otros servicios). Junto con Lambda forma el stack serverless típico.",
  totalActivities: 2,
  blocks: [
    // 1. Stack serverless
    { kind: "h3", text: "🏗️ 1. El stack serverless típico" },
    {
      kind: "info",
      html:
        "<pre><code>[Cliente] → [API Gateway] → [Lambda] → [DynamoDB / S3 / etc.]</code></pre>" +
        "API Gateway recibe el HTTP, lo convierte en evento JSON, lo manda a la Lambda. La Lambda devuelve JSON, API Gateway lo convierte en HTTP response.",
    },

    // 2. Tipos
    { kind: "h3", text: "🆚 2. Tipos de API (examen)" },
    {
      kind: "table",
      headers: ["Tipo", "Para qué", "Cuándo elegirlo"],
      rows: [
        ["REST API", "Features completas, más caro", "Autenticación compleja, WAF, transformaciones"],
        ["HTTP API (v2)", "Más simple, más rápida, ~70% más barata", "El default para Lambda"],
        ["WebSocket API", "Conexiones bidireccionales", "Chats, notificaciones real-time"],
      ],
    },
    {
      kind: "tip",
      html: "<strong>💡 Para proyectos nuevos sin requisitos especiales: HTTP API.</strong> Más simple y más barata.",
    },

    // 3. Resources y methods
    { kind: "h3", text: "📂 3. Resources y methods" },
    {
      kind: "info",
      html:
        "Una <strong>resource</strong> es un path. Cada resource tiene métodos (GET, POST, etc.):" +
        "<pre><code>/                          GET\n" +
        "/usuarios                  GET, POST\n" +
        "/usuarios/{id}             GET, PUT, DELETE\n" +
        "/usuarios/{id}/ordenes     GET, POST</code></pre>",
    },

    // 4. Integration
    { kind: "h3", text: "🔌 4. Integration types" },
    {
      kind: "list",
      items: [
        "<strong>AWS_PROXY (Lambda proxy):</strong> el más usado. Pasa el request completo como evento a la Lambda",
        "<strong>AWS:</strong> invoca otro servicio AWS directamente (DynamoDB, S3) sin Lambda",
        "<strong>HTTP_PROXY:</strong> reenvía a un endpoint HTTP existente",
        "<strong>MOCK:</strong> devuelve respuesta hardcoded sin invocar nada",
      ],
    },

    // 5. Stages y authorizers
    { kind: "h3", text: "🚀 5. Stages y authorizers" },
    {
      kind: "info",
      html:
        "<strong>Stages:</strong> entornos de deploy (<code>dev</code>, <code>staging</code>, <code>prod</code>). Cada uno tiene su URL.<br/><br/>" +
        "<strong>Authorizers:</strong>" +
        "<ul><li><strong>IAM:</strong> request firmada con SigV4</li>" +
        "<li><strong>Cognito:</strong> JWT de Cognito User Pool</li>" +
        "<li><strong>Lambda authorizer:</strong> función custom que decide si pasa</li>" +
        "<li><strong>JWT authorizer</strong> (HTTP API): JWT contra issuer OIDC</li>" +
        "<li><strong>None:</strong> público</li></ul>",
    },

    // 6. Lab CLI - HTTP API
    { kind: "h3", text: "🧪 6. Laboratorio: HTTP API + Lambda" },
    {
      kind: "info",
      html:
        "<strong>Crear HTTP API con catch-all a una Lambda (1 sola llamada):</strong>" +
        "<pre><code>HTTP_API_ID=$(aws apigatewayv2 create-api \\\n" +
        "  --name MiAPI \\\n" +
        "  --protocol-type HTTP \\\n" +
        "  --target arn:aws:lambda:us-east-1:000000000000:function:mi-hello \\\n" +
        "  --query ApiId --output text)</code></pre>" +
        "<strong>Dar permiso a API Gateway para invocar la Lambda:</strong>" +
        "<pre><code>aws lambda add-permission \\\n" +
        "  --function-name mi-hello \\\n" +
        "  --statement-id apigateway-invoke \\\n" +
        "  --action lambda:InvokeFunction \\\n" +
        "  --principal apigateway.amazonaws.com \\\n" +
        "  --source-arn \"arn:aws:execute-api:us-east-1:000000000000:$HTTP_API_ID/*/*\"</code></pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Permission obligatoria.</strong> Las Lambdas tienen <em>resource-based policies</em>: API Gateway necesita estar explícitamente autorizado a invocarlas. Es uno de los puntos más comunes de error.",
    },

    // 7. Detalle: método de invocación
    { kind: "h3", text: "🔄 7. Detalle: cómo invoca API Gateway a Lambda" },
    {
      kind: "info",
      html:
        "API Gateway siempre invoca Lambda con <strong>HTTP POST</strong>, sin importar qué método pidió el cliente. El método real del cliente está en <code>event.httpMethod</code> (REST) o <code>event.requestContext.http.method</code> (HTTP v2).",
    },

    // Quiz
    { kind: "h3", text: "🎯 Test del módulo 9" },
    {
      kind: "quiz",
      key: "m9_quiz",
      questions: [
        {
          q: "Diferencia entre REST API y HTTP API:",
          options: [
            "HTTP API solo soporta GET",
            "HTTP API es más simple, más rápida y ~70% más barata; REST API tiene más features",
            "REST API es más nueva",
            "No hay diferencia",
          ],
          correct: 1,
          explanation: "HTTP API v2 es la opción moderna y económica. REST API tiene features avanzados (WAF, transformaciones).",
        },
        {
          q: "¿Qué método HTTP usa API Gateway para invocar Lambda?",
          options: ["GET", "PUT", "POST (siempre)", "DELETE"],
          correct: 2,
          explanation: "Siempre POST internamente, sin importar el método público. El método del cliente queda en el evento.",
        },
        {
          q: "En el stack serverless, ¿qué hace API Gateway?",
          options: [
            "Procesa toda la lógica de negocio",
            "Recibe el HTTP, lo convierte en evento JSON y se lo pasa a la Lambda",
            "Almacena datos",
            "Reemplaza la base de datos",
          ],
          correct: 1,
          explanation: "API Gateway es el conversor HTTP ↔ evento. La lógica de negocio vive en la Lambda.",
        },
        {
          q: "¿Para qué sirve un stage?",
          options: [
            "Encriptar la API",
            "Separar entornos (dev/staging/prod) cada uno con su URL",
            "Reducir el costo",
            "Hacer caching",
          ],
          correct: 1,
          explanation: "Stages = entornos. Cada uno tiene URL y configuración independientes.",
        },
        {
          q: "Forma recomendada de autorizar requests en HTTP API moderna:",
          options: [
            "Hardcodear token en cada request",
            "JWT authorizer apuntando a un issuer OIDC",
            "Hacer la API pública",
            "Validar la IP",
          ],
          correct: 1,
          explanation: "JWT authorizer + OIDC issuer (Cognito, Auth0, etc.) es el estándar moderno y declarativo.",
        },
        {
          q: "¿Por qué API Gateway necesita una permission explícita en la Lambda?",
          options: [
            "Para encriptar",
            "Las Lambdas tienen resource-based policies; API Gateway debe estar explícitamente autorizado",
            "Para reducir cold starts",
            "Para configurar CORS",
          ],
          correct: 1,
          explanation: "lambda:InvokeFunction debe estar habilitado desde apigateway.amazonaws.com para esa API específica.",
        },
      ],
    },
  ],
};
