import type { ModuleData } from "@/types/course";

export const m8: ModuleData = {
  slug: "m8",
  number: 8,
  title: "Lambda · Funciones Serverless",
  icon: "λ",
  intro:
    "Lambda es el servicio de Functions as a Service (FaaS) de AWS. Subís código, AWS lo ejecuta cuando hace falta y pagás solo por el tiempo de ejecución. Es la base de la arquitectura serverless en AWS.",
  totalActivities: 2,
  blocks: [
    // 1. Qué es serverless
    { kind: "h3", text: "💡 1. ¿Qué es serverless?" },
    {
      kind: "info",
      html:
        "<strong>Serverless</strong> no significa 'sin servidores'. Significa que <em>vos no administrás los servidores</em>. AWS se encarga de:" +
        "<ul><li>Tener un servidor disponible al recibir una petición</li>" +
        "<li>Escalar a 1000 servidores si hay 1000 peticiones en paralelo</li>" +
        "<li>Apagar todo cuando no hay tráfico</li>" +
        "<li>Aplicar parches al SO</li></ul>",
    },

    // 2. Características
    { kind: "h3", text: "📊 2. Características clave (examen)" },
    {
      kind: "list",
      items: [
        "<strong>Tiempo máximo de ejecución:</strong> 15 minutos",
        "<strong>Memoria máxima:</strong> 10 GB (y CPU escala proporcional)",
        "<strong>Tamaño del paquete:</strong> hasta 250 MB descomprimido (o container images hasta 10 GB)",
        "<strong>Stateless:</strong> cada invocación es independiente (solo /tmp efímero)",
        "<strong>Pricing:</strong> pagás por GB-segundo + por request",
      ],
    },

    // 3. Runtime y handler
    { kind: "h3", text: "⚙️ 3. Runtime y handler" },
    {
      kind: "info",
      html:
        "<strong>Runtime:</strong> entorno de ejecución. Node.js, Python, Java, .NET, Go, Ruby, custom runtimes o container images.<br/><br/>" +
        "<strong>Handler:</strong> punto de entrada. Si tu archivo es <code>index.js</code> y exporta <code>handler</code>, el handler es <code>index.handler</code>." +
        "<pre><code>// index.js\n" +
        "exports.handler = async (event, context) => {\n" +
        "  console.log('Recibí:', event);\n" +
        "  return { statusCode: 200, body: 'Hola' };\n" +
        "};</code></pre>",
    },

    // 4. Modelos de invocación
    { kind: "h3", text: "🔄 4. Modelos de invocación" },
    {
      kind: "table",
      headers: ["Modelo", "Cómo funciona", "Ejemplos"],
      rows: [
        ["Sincrónico", "El caller espera la respuesta", "API Gateway, CLI invoke"],
        ["Asincrónico", "Fire-and-forget", "S3 events, SNS"],
        ["Event Source Mapping", "Lambda pollea continuamente", "SQS, DynamoDB Streams, Kinesis"],
      ],
    },

    // 5. Execution role
    { kind: "h3", text: "🔐 5. Execution role" },
    {
      kind: "successBox",
      html:
        "Cada Lambda tiene un <strong>execution role IAM</strong> que define qué puede hacer (leer S3, escribir DynamoDB, etc.). Lo creamos en el módulo de IAM. <strong>Nunca</strong> hardcodear credenciales — siempre roles.",
    },

    // 6. Cold start
    { kind: "h3", text: "❄️ 6. Cold start vs Warm start" },
    {
      kind: "info",
      html:
        "<strong>Cold start:</strong> AWS arranca un nuevo entorno (descarga código, levanta runtime, ejecuta inicializadores). Cientos de ms a varios segundos.<br/>" +
        "<strong>Warm start:</strong> entorno reutilizado. Rápido.<br/><br/>" +
        "<strong>Mitigación: Provisioned Concurrency</strong> mantiene N entornos calientes 24/7 (cobra extra).",
    },

    // 7. Versions y aliases
    { kind: "h3", text: "🏷️ 7. Versions y aliases" },
    {
      kind: "info",
      html:
        "<strong>Version:</strong> snapshot inmutable del código.<br/>" +
        "<strong>Alias:</strong> nombre mutable que apunta a una version (<code>prod</code>, <code>staging</code>).<br/><br/>" +
        "Permiten deploys blue/green: cambiar el alias <code>prod</code> de la version 5 a la 6 sin downtime.",
    },

    // 8. Lab CLI
    { kind: "h3", text: "🧪 8. Laboratorio en Floci" },
    {
      kind: "info",
      html:
        "<strong>1. Código:</strong>" +
        "<pre><code>// index.js\n" +
        "exports.handler = async (event) => {\n" +
        "  const nombre = event.nombre || 'mundo';\n" +
        "  return { statusCode: 200, body: 'Hola ' + nombre };\n" +
        "};</code></pre>" +
        "<strong>2. Empaquetar y crear:</strong>" +
        "<pre><code>zip function.zip index.js\n\n" +
        "aws lambda create-function \\\n" +
        "  --function-name mi-hello \\\n" +
        "  --runtime nodejs20.x \\\n" +
        "  --role arn:aws:iam::000000000000:role/lambda-basic-role \\\n" +
        "  --handler index.handler \\\n" +
        "  --zip-file fileb://function.zip</code></pre>" +
        "<strong>3. Invocar:</strong>" +
        "<pre><code>aws lambda invoke \\\n" +
        "  --function-name mi-hello \\\n" +
        "  --payload '{\"nombre\":\"thomas\"}' \\\n" +
        "  --cli-binary-format raw-in-base64-out \\\n" +
        "  respuesta.json\n\n" +
        "cat respuesta.json</code></pre>",
    },

    // 9. Event source mapping
    { kind: "h3", text: "🔗 9. Event source mapping desde SQS" },
    {
      kind: "info",
      html:
        "Para que Lambda procese mensajes de una cola automáticamente:" +
        "<pre><code>aws lambda create-event-source-mapping \\\n" +
        "  --function-name mi-hello \\\n" +
        "  --event-source-arn $COLA_ARN \\\n" +
        "  --batch-size 5</code></pre>" +
        "El role de la Lambda necesita <code>AWSLambdaSQSQueueExecutionRole</code>.",
    },

    // 10. Floci específico
    { kind: "h3", text: "⚠️ 10. Detalle clave en Floci" },
    {
      kind: "info",
      html:
        "Cuando una Lambda corre <em>dentro</em> de Floci, no puede usar <code>http://localhost:4566</code> para hablar con otros servicios Floci, porque <code>localhost</code> es el contenedor de la Lambda. Hay que usar:" +
        "<pre><code>http://host.docker.internal:4566</code></pre>" +
        "(Mac/Windows) o el nombre del servicio en docker-compose (Linux).",
    },

    // Quiz
    { kind: "h3", text: "🎯 Test del módulo 8" },
    {
      kind: "quiz",
      key: "m8_quiz",
      questions: [
        {
          q: "¿Qué significa 'serverless'?",
          options: [
            "No hay servidores",
            "Vos no administrás los servidores; los administra el proveedor",
            "Es gratis",
            "Solo corre en el frontend",
          ],
          correct: 1,
          explanation: "Serverless = sin gestión de servidores por parte del cliente. Los servidores existen, los administra el proveedor.",
        },
        {
          q: "Tiempo máximo de ejecución de una Lambda:",
          options: ["30 segundos", "5 minutos", "15 minutos", "1 hora"],
          correct: 2,
          explanation: "15 minutos máximo. Para más tiempo, Step Functions, Fargate o EC2.",
        },
        {
          q: "Lambda necesita escribir en DynamoDB. Forma correcta:",
          options: [
            "Hardcodear credenciales",
            "Atachar una policy de DynamoDB al execution role",
            "Hacer la tabla pública",
            "Crear un user y poner credenciales en env vars",
          ],
          correct: 1,
          explanation: "Roles + policies. Nunca credenciales hardcoded.",
        },
        {
          q: "¿Qué es un cold start?",
          options: [
            "Una invocación que falla",
            "La primera invocación tras inactividad, que arranca un nuevo entorno desde cero",
            "Lambda que corre en otra región",
            "Función que solo corre de noche",
          ],
          correct: 1,
          explanation: "Cold start = nuevo container. Warm = reutiliza el contexto caliente.",
        },
        {
          q: "Para mitigar cold starts en producción:",
          options: ["Provisioned Concurrency", "Aumentar timeout", "Cambiar región", "Borrar el role"],
          correct: 0,
          explanation: "Provisioned Concurrency mantiene N entornos calientes. Cuesta extra pero elimina cold starts.",
        },
        {
          q: "Si tu archivo es index.js y exporta module.exports.miFuncion, el handler es:",
          options: ["index.miFuncion", "miFuncion.index", "lambda.miFuncion", "Solo miFuncion"],
          correct: 0,
          explanation: "Formato: <archivo>.<export>. index.miFuncion.",
        },
      ],
    },
  ],
};
