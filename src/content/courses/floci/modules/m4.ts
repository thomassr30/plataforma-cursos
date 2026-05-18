import type { ModuleData } from "@/types/course";

export const m4: ModuleData = {
  slug: "m4",
  number: 4,
  title: "S3 · Simple Storage Service",
  icon: "🪣",
  intro:
    "S3 es el servicio de almacenamiento de objetos de AWS. Uno de los servicios más usados: hosting estático, backups, data lakes, archivos de usuarios. Tenés que conocer storage classes, versioning, pre-signed URLs y bucket policies.",
  totalActivities: 2,
  blocks: [
    // 1. ¿Qué es?
    { kind: "h3", text: "📦 1. ¿Qué es S3?" },
    {
      kind: "info",
      html:
        "<strong>Simple Storage Service</strong> es almacenamiento de <strong>objetos</strong> (no de archivos ni de bloques). Cada objeto se identifica por:" +
        "<ul><li><strong>Bucket</strong>: contenedor (nombre globalmente único en AWS real)</li>" +
        "<li><strong>Key</strong>: ruta dentro del bucket (puede contener '/' pero S3 es plano internamente)</li></ul>" +
        "Aunque la key tenga slashes, S3 <em>no tiene carpetas reales</em>. La consola te las muestra para comodidad.",
    },
    { kind: "h4", text: "Tipos de almacenamiento" },
    {
      kind: "table",
      headers: ["Tipo", "Cómo accedés", "Ejemplos"],
      rows: [
        ["Archivo (file)", "Por path en filesystem", "NTFS, NFS, AWS EFS"],
        ["Bloque (block)", "Como un disco rígido", "AWS EBS, iSCSI"],
        ["Objeto (object)", "Por API HTTP", "AWS S3, Google Cloud Storage"],
      ],
    },

    // 2. Storage classes
    { kind: "h3", text: "💰 2. Storage classes (CRÍTICO examen)" },
    {
      kind: "table",
      headers: ["Storage class", "Para qué", "Latencia", "Costo"],
      rows: [
        ["S3 Standard", "Acceso frecuente, default", "ms", "$$$"],
        ["S3 Standard-IA", "Acceso poco frecuente", "ms", "$$"],
        ["S3 One Zone-IA", "IA en una sola AZ, más barato", "ms", "$$"],
        ["S3 Intelligent-Tiering", "AWS elige por patrón de acceso", "ms", "$$$"],
        ["S3 Glacier Instant", "Archivos con acceso ocasional", "ms", "$"],
        ["S3 Glacier Flexible", "Backups, recuperación minutos a horas", "min-h", "$"],
        ["S3 Glacier Deep Archive", "Compliance, 7+ años", "12 h", "$"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 En Floci</strong> las storage classes se aceptan nominalmente pero todo se guarda igual (no hay tiering real). Para el examen igual hay que conocerlas: <em>Deep Archive es la más barata, recuperación 12 h</em>.",
    },

    // 3. Versioning
    { kind: "h3", text: "🔄 3. Versioning" },
    {
      kind: "info",
      html:
        "Si activás versioning, S3 guarda versiones anteriores al sobrescribir o borrar.<br/>" +
        "Beneficios: recuperar archivos sobrescritos por error, mantener histórico, undo de borrados (<strong>delete marker</strong>).<br/><br/>" +
        "<strong>No se puede desactivar</strong> una vez activado, solo se puede <em>suspender</em>.",
    },

    // 4. Pre-signed URLs
    { kind: "h3", text: "🔗 4. Pre-signed URLs" },
    {
      kind: "info",
      html:
        "URL firmada con tus credenciales que permite a alguien <strong>sin permisos</strong> acceder a un objeto durante un tiempo limitado.<br/><br/>" +
        "<strong>Caso típico:</strong> el frontend sube fotos a S3 directamente. Tu backend genera un URL PUT firmado, lo manda al frontend, el frontend sube directo (sin pasar por tu servidor).",
    },

    // 5. Object Lock
    { kind: "h3", text: "🔒 5. Object Lock" },
    {
      kind: "table",
      headers: ["Modo", "Comportamiento"],
      rows: [
        ["GOVERNANCE", "Usuarios con permisos especiales pueden eliminar el lock"],
        ["COMPLIANCE", "Nadie puede eliminar el lock, ni siquiera root"],
      ],
    },

    // 6. Bucket policy
    { kind: "h3", text: "📜 6. Bucket policies" },
    {
      kind: "info",
      html:
        "<strong>Bucket policy</strong> (recomendada, JSON tipo IAM) vs <strong>ACL</strong> (legacy, casi en desuso).<br/><br/>" +
        "Ejemplo: bucket público para lectura (sitio estático):" +
        "<pre><code>{\n" +
        '  "Version": "2012-10-17",\n' +
        '  "Statement": [{\n' +
        '    "Effect": "Allow",\n' +
        '    "Principal": "*",\n' +
        '    "Action": "s3:GetObject",\n' +
        '    "Resource": "arn:aws:s3:::mi-bucket/*"\n' +
        "  }]\n" +
        "}</code></pre>",
    },

    // 7. Lab CLI
    { kind: "h3", text: "🧪 7. Laboratorio en Floci" },
    {
      kind: "info",
      html:
        "<pre><code># Crear bucket\n" +
        "aws s3 mb s3://mi-curso\n\n" +
        "# Subir un archivo\n" +
        "echo 'Hola Floci' > saludo.txt\n" +
        "aws s3 cp saludo.txt s3://mi-curso/\n\n" +
        "# Listar\n" +
        "aws s3 ls s3://mi-curso/\n\n" +
        "# Sync de una carpeta entera\n" +
        "aws s3 sync ./sitio s3://mi-curso/sitio/\n\n" +
        "# Pre-signed URL válido 1 hora\n" +
        "aws s3 presign s3://mi-curso/saludo.txt --expires-in 3600\n\n" +
        "# Activar versioning\n" +
        "aws s3api put-bucket-versioning \\\n" +
        "  --bucket mi-curso \\\n" +
        "  --versioning-configuration Status=Enabled</code></pre>",
    },

    // 8. Bonus Node
    { kind: "h3", text: "📜 8. Bonus Node.js" },
    {
      kind: "info",
      html:
        "<pre><code>import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';\n" +
        "import { getSignedUrl } from '@aws-sdk/s3-request-presigner';\n\n" +
        "const s3 = new S3Client({\n" +
        "  endpoint: 'http://localhost:4566',\n" +
        "  region: 'us-east-1',\n" +
        "  credentials: { accessKeyId: 'test', secretAccessKey: 'test' },\n" +
        "  forcePathStyle: true,\n" +
        "});\n\n" +
        "await s3.send(new PutObjectCommand({\n" +
        "  Bucket: 'mi-bucket',\n" +
        "  Key: 'hello.txt',\n" +
        "  Body: 'Hola desde Node',\n" +
        "}));</code></pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 forcePathStyle: true</strong> es obligatorio con Floci. AWS real usa virtual-hosted style (<code>bucket.s3.amazonaws.com</code>); Floci usa path style (<code>localhost:4566/bucket</code>).",
    },

    // 9. Diferencias con AWS real
    { kind: "h3", text: "⚠️ 9. Floci vs AWS real" },
    {
      kind: "table",
      headers: ["Aspecto", "AWS real", "Floci"],
      rows: [
        ["Nombre global de bucket", "Único en todo el planeta", "Local a tu instancia"],
        ["Storage classes", "Costos y latencias reales", "Solo nominales"],
        ["Transfer Acceleration", "Disponible", "No"],
        ["Replicación cross-region", "Disponible", "No"],
        ["Encriptación SSE-S3/KMS", "Real (FIPS 140-2)", "Nominal"],
      ],
    },

    // Quiz
    { kind: "h3", text: "🎯 Test del módulo 4" },
    {
      kind: "quiz",
      key: "m4_quiz",
      questions: [
        {
          q: "¿S3 tiene carpetas reales?",
          options: ["Sí, son obligatorias", "Sí, pero opcionales", "No, las 'carpetas' son solo prefijos en las keys", "Sí, pero solo en algunas regiones"],
          correct: 2,
          explanation: "S3 es plano. Las 'carpetas' son solo cómo la consola y los clientes representan keys con / adentro.",
        },
        {
          q: "¿Cuál es el tamaño máximo de un objeto en S3?",
          options: ["5 MB", "5 GB", "5 TB", "Sin límite"],
          correct: 2,
          explanation: "5 TB por objeto. Más grande que eso requiere multipart o dividir en varios objetos.",
        },
        {
          q: "Si activás versioning y 'borrás' un objeto, ¿qué ocurre?",
          options: [
            "Se borra para siempre",
            "Se crea un delete marker y la versión anterior queda recuperable",
            "Se replica a otra región",
            "S3 pide confirmación",
          ],
          correct: 1,
          explanation:
            "Con versioning, borrar agrega un delete marker que oculta el objeto, pero las versiones anteriores siguen ahí.",
        },
        {
          q: "¿Para qué sirve un pre-signed URL?",
          options: [
            "Acelerar descargas",
            "Encriptar contenido",
            "Permitir a alguien sin credenciales acceder a un objeto durante un tiempo limitado",
            "Hacer backups",
          ],
          correct: 2,
          explanation: "URL firmada con tus credenciales que delega acceso temporal sin necesidad de credenciales propias.",
        },
        {
          q: "¿Cuál es la storage class más barata para datos que casi nunca se leen?",
          options: ["S3 Standard", "S3 Standard-IA", "S3 Glacier Deep Archive", "S3 Intelligent-Tiering"],
          correct: 2,
          explanation: "Deep Archive — la más barata, pero recuperación de hasta 12 horas.",
        },
        {
          q: "En el SDK de Node.js para Floci, ¿qué opción es crítica?",
          options: ["useFloci: true", "forcePathStyle: true", "localMode: true", "Ninguna"],
          correct: 1,
          explanation: "Floci no soporta virtual-hosted style. forcePathStyle: true es necesario.",
        },
      ],
    },
  ],
};
