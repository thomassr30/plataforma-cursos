import type { ModuleData } from "@/types/course";

export const m2: ModuleData = {
  slug: "m2",
  number: 2,
  title: "Setup del entorno",
  icon: "⚙️",
  intro:
    "Para usar Floci necesitás Docker, AWS CLI v2 y un par de variables de entorno. Este módulo te deja todo instalado, configurado y con tu primer comando ejecutado contra Floci.",
  totalActivities: 2,
  blocks: [
    // ============================================
    // 1. Prerequisitos
    // ============================================
    { kind: "h3", text: "📋 1. Prerequisitos" },
    {
      kind: "list",
      items: [
        "<strong>Docker Desktop</strong> (Windows/Mac) o Docker Engine + Compose (Linux)",
        "<strong>AWS CLI v2</strong> (no v1)",
        "Una <strong>terminal</strong> (Git Bash, PowerShell, Terminal de Mac, bash)",
        "<strong>4 GB de RAM libres</strong> mínimo (más si vas a usar Lambda, RDS o ECS, que levantan contenedores reales)",
      ],
    },

    // ============================================
    // 2. Verificar Docker
    // ============================================
    { kind: "h3", text: "🐳 2. Verificar Docker" },
    {
      kind: "info",
      html:
        "Verificá que Docker esté instalado y corriendo:" +
        "<pre><code>docker --version\n" +
        "docker compose version\n" +
        "docker ps</code></pre>" +
        "Si <code>docker ps</code> falla con <em>'Cannot connect to the Docker daemon'</em>, abrí Docker Desktop o iniciá el servicio con <code>sudo systemctl start docker</code>.",
    },

    // ============================================
    // 3. Instalar AWS CLI
    // ============================================
    { kind: "h3", text: "📥 3. Instalar AWS CLI v2" },
    {
      kind: "info",
      html:
        "<strong>Mac:</strong><pre><code>brew install awscli</code></pre>" +
        "<strong>Linux:</strong><pre><code>curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o awscliv2.zip\n" +
        "unzip awscliv2.zip\n" +
        "sudo ./aws/install</code></pre>" +
        "<strong>Windows:</strong> descargar el MSI desde <code>https://awscli.amazonaws.com/AWSCLIV2.msi</code> y reabrir terminal.<br/><br/>" +
        "Verificar:<pre><code>aws --version</code></pre>" +
        "Tiene que mostrar <code>aws-cli/2.x.x</code>. Si muestra v1, actualizar.",
    },

    // ============================================
    // 4. Configurar credenciales falsas
    // ============================================
    { kind: "h3", text: "🔑 4. Configurar credenciales" },
    {
      kind: "info",
      html:
        "Floci no valida credenciales, pero el CLI necesita que existan. Ejecutar:" +
        "<pre><code>aws configure</code></pre>" +
        "Y responder:<pre><code>AWS Access Key ID [None]: test\n" +
        "AWS Secret Access Key [None]: test\n" +
        "Default region name [None]: us-east-1\n" +
        "Default output format [None]: json</code></pre>",
    },

    // ============================================
    // 5. Docker Compose para Floci
    // ============================================
    { kind: "h3", text: "📦 5. Levantar Floci con Docker Compose" },
    {
      kind: "info",
      html:
        "Archivo <code>docker-compose.yml</code> recomendado:" +
        "<pre><code>services:\n" +
        "  floci:\n" +
        "    image: hectorvent/floci:latest\n" +
        "    container_name: floci\n" +
        "    ports:\n" +
        "      - '4566:4566'\n" +
        "    environment:\n" +
        "      - FLOCI_STORAGE_MODE=persistent\n" +
        "      - FLOCI_STORAGE_PERSISTENT_PATH=/app/data\n" +
        "      - FLOCI_DEFAULT_REGION=us-east-1\n" +
        "      - FLOCI_DEFAULT_ACCOUNT_ID=000000000000\n" +
        "    volumes:\n" +
        "      - ./data:/app/data\n" +
        "      - /var/run/docker.sock:/var/run/docker.sock\n" +
        "    restart: unless-stopped</code></pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 ¿Por qué montar /var/run/docker.sock?</strong> Lambda, RDS, ECS y ElastiCache en Floci levantan <em>contenedores Docker reales</em>. Para hacerlo, Floci necesita acceso al daemon de Docker del host.",
    },
    {
      kind: "info",
      html:
        "Arrancar y verificar:" +
        "<pre><code># Levantar en background\n" +
        "docker compose up -d\n\n" +
        "# Ver logs en vivo\n" +
        "docker compose logs -f\n\n" +
        "# Health check\n" +
        "curl http://localhost:4566/_health</code></pre>" +
        "El healthcheck debe devolver <code>{\"status\":\"ok\"}</code>.",
    },

    // ============================================
    // 6. Apuntar el CLI a Floci
    // ============================================
    { kind: "h3", text: "🎯 6. Que el CLI hable con Floci" },
    {
      kind: "info",
      html:
        "Por defecto el CLI manda los comandos a los endpoints reales de AWS. Para redirigirlos a Floci hay dos formas:<br/><br/>" +
        "<strong>Opción 1 — flag por comando (tedioso):</strong>" +
        "<pre><code>aws s3 ls --endpoint-url http://localhost:4566</code></pre>" +
        "<strong>Opción 2 (recomendada) — variable de entorno:</strong>" +
        "<pre><code># Linux/Mac\n" +
        "export AWS_ENDPOINT_URL=http://localhost:4566\n\n" +
        "# PowerShell\n" +
        "$env:AWS_ENDPOINT_URL = 'http://localhost:4566'</code></pre>" +
        "A partir de ahí <em>todos</em> los comandos <code>aws</code> apuntan a Floci automáticamente.",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Persistencia:</strong> guardá la variable en <code>~/.bashrc</code>, <code>~/.zshrc</code> o el perfil de PowerShell para que sobreviva al cerrar la terminal.",
    },

    // ============================================
    // 7. Primer comando
    // ============================================
    { kind: "h3", text: "🚀 7. Primer comando contra Floci" },
    {
      kind: "info",
      html:
        "<pre><code># Listar buckets (debería ser vacío)\n" +
        "aws s3 ls\n\n" +
        "# Crear un bucket\n" +
        "aws s3 mb s3://mi-primer-bucket\n\n" +
        "# Confirmar\n" +
        "aws s3 ls\n\n" +
        "# Borrar\n" +
        "aws s3 rb s3://mi-primer-bucket</code></pre>",
    },

    // ============================================
    // 8. Troubleshooting
    // ============================================
    { kind: "h3", text: "🔧 8. Problemas frecuentes" },
    {
      kind: "table",
      headers: ["Error", "Causa probable", "Solución"],
      rows: [
        ["Could not connect to endpoint", "AWS_ENDPOINT_URL no exportada", "echo $AWS_ENDPOINT_URL para verificar"],
        ["Connection refused (arranque)", "Floci tarda 3-5 seg en levantar", "Esperar y reintentar /_health"],
        ["Lambda no levanta containers", "docker.sock no montado", "Revisar volumes en docker-compose.yml"],
        ["InvalidAccessKeyId", "~/.aws/credentials inexistente", "Reejecutar aws configure"],
      ],
    },

    // ============================================
    // 9. Bonus Node.js
    // ============================================
    { kind: "h3", text: "📜 9. Bonus: SDK de Node.js" },
    {
      kind: "info",
      html:
        "Si vas a usar el SDK de Node, instalar los paquetes necesarios:" +
        "<pre><code>npm init -y\n" +
        "npm install @aws-sdk/client-s3 @aws-sdk/client-dynamodb \\\n" +
        "  @aws-sdk/client-sqs @aws-sdk/client-sns \\\n" +
        "  @aws-sdk/client-lambda</code></pre>" +
        "Configuración de cliente que vas a repetir en todo el curso:" +
        "<pre><code>import { S3Client } from '@aws-sdk/client-s3';\n\n" +
        "const s3 = new S3Client({\n" +
        "  endpoint: 'http://localhost:4566',\n" +
        "  region: 'us-east-1',\n" +
        "  credentials: { accessKeyId: 'test', secretAccessKey: 'test' },\n" +
        "  forcePathStyle: true, // necesario con Floci\n" +
        "});</code></pre>",
    },

    // ============================================
    // 10. Quiz
    // ============================================
    { kind: "h3", text: "🎯 Test del módulo 2" },
    {
      kind: "quiz",
      key: "m2_quiz",
      questions: [
        {
          q: "¿Qué variable de entorno usás para que el AWS CLI apunte a Floci sin --endpoint-url en cada comando?",
          options: ["AWS_REGION", "AWS_ENDPOINT_URL", "AWS_FLOCI_URL", "AWS_LOCAL"],
          correct: 1,
          explanation:
            "AWS_ENDPOINT_URL es soportada por AWS CLI v2.13+. Una vez exportada, todos los comandos AWS apuntan a Floci automáticamente.",
        },
        {
          q: "Floci corre pero aws s3 ls da 'Could not connect'. ¿Causa más probable?",
          options: [
            "Tus credenciales son inválidas",
            "Falta exportar AWS_ENDPOINT_URL o pasar --endpoint-url",
            "AWS está caído",
            "Floci no soporta S3",
          ],
          correct: 1,
          explanation:
            "Sin endpoint configurado, el CLI intenta llegar a AWS real y falla. Las credenciales falsas no son el problema en Floci.",
        },
        {
          q: "¿Por qué el docker-compose monta /var/run/docker.sock?",
          options: [
            "Para guardar logs",
            "Para que Floci pueda levantar contenedores Docker reales (Lambda, RDS, ECS)",
            "Para acelerar el arranque",
            "Para conectarse a AWS real",
          ],
          correct: 1,
          explanation:
            "Lambda, ElastiCache, RDS y ECS levantan contenedores Docker reales. Por eso Floci necesita acceso al daemon Docker del host.",
        },
        {
          q: "¿Qué pasa con tus datos si hacés docker compose down (sin -v)?",
          options: [
            "Se borran todos",
            "Se conservan en ./data y aparecen al volver a levantar Floci",
            "Se sincronizan con AWS real",
            "Se exportan a un backup automático",
          ],
          correct: 1,
          explanation:
            "compose down para los contenedores pero no toca volúmenes. Solo con -v o borrando ./data se pierden los datos.",
        },
        {
          q: "Health check correcto para verificar que Floci está vivo:",
          options: [
            "curl http://localhost:4566/_health",
            "curl https://floci.amazonaws.com",
            "docker logs floci | grep ok",
            "aws ec2 describe-instances",
          ],
          correct: 0,
          explanation:
            "Floci expone un endpoint /_health que devuelve {\"status\":\"ok\"} cuando el servicio está listo.",
        },
      ],
    },
  ],
};
