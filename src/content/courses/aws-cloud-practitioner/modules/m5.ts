import type { ModuleData } from "@/types/course";

export const m5: ModuleData = {
  slug: "m5",
  number: 5,
  title: "Storage en AWS: S3, EBS, EFS, FSx",
  icon: "💾",
  intro:
    "AWS tiene los 3 tipos de storage: objeto (S3), bloque (EBS), y archivos (EFS, FSx). Más servicios de archivado (Glacier) y migración (Snow Family, Storage Gateway). En el examen, saber cuál usar para cada caso es crucial.",
  totalActivities: 4,
  blocks: [
    // ============================================
    // SECCIÓN 1: Tipos de Storage
    // ============================================
    { kind: "h3", text: "📦 1. Los 3 Tipos de Storage" },
    {
      kind: "table",
      headers: ["Tipo", "Definición", "Servicios AWS"],
      rows: [
        ["Object Storage", "Archivos como objetos accesibles por API/URL", "S3, Glacier"],
        ["Block Storage", "Disco virtual, montado a una VM (como un disco)", "EBS, Instance Store"],
        ["File Storage", "Filesystem accesible vía NFS/SMB", "EFS (NFS), FSx (varios)"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Para examen:</strong> <em>'Compartir archivos entre EC2'</em> → file storage (EFS). <em>'Disco para una EC2'</em> → block (EBS). <em>'Imágenes, videos, backups, contenido web'</em> → object (S3).",
    },

    // ============================================
    // SECCIÓN 2: S3
    // ============================================
    { kind: "h3", text: "📦 2. Amazon S3 (Simple Storage Service)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> S3 es el servicio de <strong>object storage</strong> más usado del mundo. Almacena <strong>cualquier cantidad de datos</strong> con durabilidad de <strong>11 nueves (99.999999999%)</strong> y disponibilidad típica de 99.99%. Lanzado en 2006 (uno de los primeros servicios de AWS).",
    },
    { kind: "h4", text: "Conceptos clave" },
    {
      kind: "list",
      items: [
        "<strong>Bucket</strong>: contenedor de objetos, nombre ÚNICO globalmente",
        "<strong>Object</strong>: archivo dentro del bucket (key + valor + metadata)",
        "<strong>Region</strong>: el bucket vive en una región (aunque el namespace es global)",
        "<strong>Objects size</strong>: hasta <strong>5 TB</strong> por objeto",
        "<strong>Multipart upload</strong>: requerido para objetos >100MB (recomendado)",
      ],
    },
    { kind: "h4", text: "Storage Classes (CRÍTICO para examen)" },
    {
      kind: "table",
      headers: ["Clase", "Acceso", "Min. retention", "Disponibilidad", "Caso típico"],
      rows: [
        ["S3 Standard", "Frecuente", "—", "99.99%", "Apps web, contenido caliente"],
        ["S3 Intelligent-Tiering", "Variable (mueve auto)", "—", "99.9%", "Patrones desconocidos"],
        ["S3 Standard-IA", "Mensual", "30 días", "99.9%", "Backups, archivos recientes"],
        ["S3 One Zone-IA", "Mensual, 1 AZ", "30 días", "99.5%", "Datos reproducibles, menos crítico"],
        ["S3 Glacier Instant Retrieval", "Trimestral, ms", "90 días", "99.9%", "Archivado con acceso rápido"],
        ["S3 Glacier Flexible Retrieval", "Anual, min-h", "90 días", "99.99%", "Backups, compliance"],
        ["S3 Glacier Deep Archive", "Anual, 12h", "180 días", "99.99%", "Compliance, archivo histórico"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Tip examen:</strong> Si la pregunta dice <em>'patrones de acceso desconocidos o variables'</em> → <strong>Intelligent-Tiering</strong>. <em>'Más barato, archivado histórico, retrieval lento ok'</em> → <strong>Glacier Deep Archive</strong>. <em>'Acceso esporádico pero quiero retrieval rápido'</em> → <strong>Glacier Instant Retrieval</strong>.",
    },
    { kind: "h4", text: "Características adicionales" },
    {
      kind: "list",
      items: [
        "<strong>Versioning</strong>: mantén múltiples versiones (protección contra delete accidental)",
        "<strong>Lifecycle Policies</strong>: mueve/elimina objetos automáticamente",
        "<strong>Cross-Region Replication (CRR)</strong>: réplica a otra región",
        "<strong>Same-Region Replication (SRR)</strong>: réplica en la misma región",
        "<strong>Object Lock</strong>: bloquea borrado/modificación (compliance, WORM)",
        "<strong>S3 Transfer Acceleration</strong>: usa CloudFront para subir más rápido",
        "<strong>Presigned URLs</strong>: acceso temporal a objetos privados",
        "<strong>Server-side encryption</strong>: SSE-S3, SSE-KMS, SSE-C",
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Casos de uso de S3:</strong><br/>" +
        "• Sitios web estáticos (con CloudFront)<br/>" +
        "• Backups y archivado<br/>" +
        "• Data lake (con Athena, Glue, Redshift Spectrum)<br/>" +
        "• Distribución de software<br/>" +
        "• Storage para apps (uploads de usuarios)<br/>" +
        "• Disaster recovery",
    },

    // ============================================
    // SECCIÓN 3: EBS
    // ============================================
    { kind: "h3", text: "💿 3. EBS - Elastic Block Store" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> EBS provee <strong>discos virtuales persistentes</strong> que se montan a instancias EC2 como si fueran discos físicos. Sobrevive al reinicio/terminación de la VM. Se replica dentro de una AZ.",
    },
    { kind: "h4", text: "Tipos de volúmenes EBS" },
    {
      kind: "table",
      headers: ["Tipo", "Tecnología", "Uso típico"],
      rows: [
        ["gp3 (default)", "SSD general", "Casi todo: web servers, BD medianas"],
        ["gp2", "SSD general (legacy)", "Igual gp3 pero IOPS atadas a tamaño"],
        ["io2 / io2 Block Express", "SSD provisioned IOPS", "BD críticas, alta performance"],
        ["st1", "HDD throughput", "Big data, logs, streaming"],
        ["sc1", "HDD cold", "Storage infrecuente, máximo ahorro"],
      ],
    },
    { kind: "h4", text: "Características importantes" },
    {
      kind: "list",
      items: [
        "<strong>Atado a UNA AZ</strong>: el volumen vive en una AZ específica",
        "<strong>Snapshots</strong>: backup incremental a S3",
        "<strong>Multi-Attach</strong>: en io1/io2, un volumen a varias EC2 (cluster aware)",
        "<strong>Encriptación</strong> con KMS, sin impacto significativo en performance",
      ],
    },

    // ============================================
    // SECCIÓN 4: EFS
    // ============================================
    { kind: "h3", text: "📁 4. EFS - Elastic File System" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> EFS es un <strong>NFS (Network File System) administrado</strong>, accesible desde múltiples EC2 simultáneamente. Escala automáticamente. Solo Linux.",
    },
    { kind: "h4", text: "Storage Classes de EFS" },
    {
      kind: "table",
      headers: ["Clase", "Cuándo"],
      rows: [
        ["EFS Standard", "Acceso frecuente, multi-AZ"],
        ["EFS Standard-IA", "Acceso infrecuente"],
        ["EFS One Zone", "Una AZ, más barato"],
        ["EFS One Zone-IA", "Una AZ + acceso infrecuente, lo más barato"],
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo usar EFS:</strong><br/>" +
        "• Compartir archivos entre múltiples EC2<br/>" +
        "• Filesystems POSIX compartidos<br/>" +
        "• Big data on Linux<br/>" +
        "• CMS (WordPress, Drupal) en cluster",
    },

    // ============================================
    // SECCIÓN 5: FSx
    // ============================================
    { kind: "h3", text: "🗃️ 5. Amazon FSx" },
    {
      kind: "info",
      html: "FSx es una <strong>familia</strong> de filesystems administrados especializados:",
    },
    {
      kind: "table",
      headers: ["Variante", "Para qué"],
      rows: [
        ["FSx for Windows File Server", "SMB/CIFS para Windows: home dirs, perfiles"],
        ["FSx for Lustre", "HPC, ML training, processing masivo paralelo"],
        ["FSx for NetApp ONTAP", "Compatible con NetApp on-prem (multi-protocolo)"],
        ["FSx for OpenZFS", "Filesystems ZFS administrados"],
      ],
    },

    // ============================================
    // SECCIÓN 6: Storage Gateway y Snow
    // ============================================
    { kind: "h3", text: "🌉 6. Storage híbrido y migración masiva" },
    {
      kind: "table",
      headers: ["Servicio", "Para qué"],
      rows: [
        ["Storage Gateway", "Puente entre on-prem y AWS (S3 File Gateway, Volume Gateway, Tape Gateway)"],
        ["DataSync", "Transferencia automatizada de archivos on-prem ↔ AWS"],
        ["Snow Family", "Dispositivos FÍSICOS para mover volúmenes grandes"],
      ],
    },
    { kind: "h4", text: "Snow Family detallada" },
    {
      kind: "table",
      headers: ["Dispositivo", "Capacidad", "Caso típico"],
      rows: [
        ["Snowcone", "8 TB", "Edge, sitios pequeños, IoT"],
        ["Snowball Edge", "Hasta 80 TB", "Migración de datos, edge computing"],
        ["Snowmobile", "100 PB (camión)", "Exabytes: migración masiva de datacenter"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Para examen:</strong> Si dice <em>'mover petabytes con baja conectividad'</em> → Snowball/Snowmobile. <em>'NFS on-prem que ve S3'</em> → File Gateway. <em>'transferencia continua programada'</em> → DataSync.",
    },

    // ============================================
    // SECCIÓN 7: Tabla maestra
    // ============================================
    { kind: "h3", text: "🎯 7. Tabla maestra de decisión" },
    {
      kind: "table",
      headers: ["Necesidad", "Servicio"],
      rows: [
        ["Archivos no estructurados (imágenes, videos, backups)", "S3"],
        ["Disco persistente para UNA EC2", "EBS"],
        ["Disco súper rápido EFÍMERO en EC2", "Instance Store"],
        ["NFS compartido entre EC2 Linux", "EFS"],
        ["SMB compartido para Windows EC2", "FSx for Windows"],
        ["HPC / ML training filesystem", "FSx for Lustre"],
        ["Archivado más barato, retrieval 12h ok", "S3 Glacier Deep Archive"],
        ["Patrones de acceso desconocidos", "S3 Intelligent-Tiering"],
        ["Mover petabytes desde on-prem", "Snowball / Snowmobile"],
        ["Backup centralizado de múltiples servicios", "AWS Backup"],
      ],
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m5_matching",
      pairs: [
        { en: "S3", es: "Object storage" },
        { en: "EBS", es: "Block storage para UNA EC2" },
        { en: "EFS", es: "NFS compartido (Linux)" },
        { en: "FSx for Windows", es: "SMB para Windows" },
        { en: "Glacier Deep Archive", es: "Lo más barato, retrieval 12h" },
        { en: "Snowmobile", es: "Camión físico 100 PB" },
        { en: "Storage Gateway", es: "Hybrid storage on-prem ↔ AWS" },
        { en: "Intelligent-Tiering", es: "Mueve objetos automáticamente entre clases" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m5_fill",
      items: [
        { text: "S3 tiene durabilidad de ___ nueves.", answer: "11", es: "11" },
        { text: "EBS está limitado a ___ AZ.", answer: "una", es: "una" },
        { text: "Para compartir archivos entre Linux EC2: ___", answer: "EFS", es: "EFS" },
        { text: "Tamaño máximo de objeto S3: ___ TB.", answer: "5", es: "5" },
        { text: "Storage class más barata de S3: Glacier ___ Archive.", answer: "Deep", es: "Deep" },
      ],
    },

    // ============================================
    // QUIZ FINAL
    // ============================================
    {
      kind: "quiz",
      key: "m5_quiz",
      questions: [
        {
          q: "S3 ofrece durabilidad de:",
          options: ["3 nueves (99.9%)", "9 nueves (99.999999%)", "11 nueves (99.999999999%)", "5 nueves (99.999%)"],
          correct: 2,
          explanation:
            "S3 ofrece 11 nueves de durabilidad (99.999999999%). En la práctica significa que la pérdida de un objeto es virtualmente imposible.",
        },
        {
          q: "Necesitas archivar 200 TB de logs con compliance y acceso ocasional (1x al año):",
          options: ["S3 Standard", "S3 Standard-IA", "Glacier Flexible Retrieval", "Glacier Deep Archive"],
          correct: 3,
          explanation:
            "Deep Archive es la clase más barata. Mínimo 180 días, retrieval hasta 12h. Ideal para compliance y archivos históricos.",
        },
        {
          q: "Para compartir un filesystem entre múltiples EC2 Linux:",
          options: ["EBS", "EFS", "S3 montado con FUSE", "Instance Store"],
          correct: 1,
          explanation:
            "EFS es NFS administrado, escala automáticamente, accesible desde múltiples EC2 Linux simultáneamente.",
        },
        {
          q: "Una empresa tiene 200 EC2 Windows con perfiles de usuario compartidos:",
          options: ["EFS", "FSx for Windows File Server", "S3", "EBS Multi-Attach"],
          correct: 1,
          explanation:
            "FSx for Windows provee SMB/CIFS administrado, ideal para Active Directory y perfiles de usuario Windows.",
        },
        {
          q: "Para mover 500 TB sin saturar internet:",
          options: ["VPN", "Direct Connect", "Snowball Edge", "Solo S3 Transfer Acceleration"],
          correct: 2,
          explanation:
            "Snowball Edge es un dispositivo físico de hasta 80 TB que se envía al cliente. Para volúmenes mayores, Snowmobile (camión, 100 PB).",
        },
        {
          q: "Una app sube imágenes que pueden ser recreadas. ¿Storage class más barata pero arriesgando 1 AZ?",
          options: ["Standard", "Standard-IA", "One Zone-IA", "Glacier"],
          correct: 2,
          explanation:
            "One Zone-IA guarda en UNA sola AZ (no replica multi-AZ). Más barato, pero si la AZ se pierde, pierdes los datos. Para datos reproducibles.",
        },
        {
          q: "Para ML training con filesystem de alta performance (HPC):",
          options: ["EFS Standard", "FSx for Lustre", "S3 directo", "EBS gp2"],
          correct: 1,
          explanation:
            "FSx for Lustre está optimizado para HPC, ML training, genómica: throughput muy alto y baja latencia.",
        },
        {
          q: "Storage que sobrevive al apagado de EC2:",
          options: ["Instance Store", "EBS o EFS", "Solo RAM", "Cache"],
          correct: 1,
          explanation:
            "EBS y EFS son persistentes. Instance Store es EFÍMERO (se pierde al stop/terminate).",
        },
        {
          q: "Para que S3 mueva automáticamente objetos a clases más baratas según uso:",
          options: ["Solo Standard", "S3 Intelligent-Tiering", "Glacier directo", "Replicar manualmente"],
          correct: 1,
          explanation:
            "Intelligent-Tiering monitorea acceso y mueve objetos automáticamente entre clases (Standard, IA, Archive). Ideal para patrones desconocidos.",
        },
        {
          q: "Para permitir acceso temporal a un objeto privado de S3 via URL:",
          options: ["Hacer el bucket público", "Presigned URL", "VPC peering", "ACM cert"],
          correct: 1,
          explanation:
            "Presigned URLs dan acceso temporal a objetos privados (con tiempo de expiración). Patrón seguro para uploads/downloads autorizados.",
        },
        {
          q: "Para bloquear el borrado de objetos por compliance (WORM):",
          options: ["IAM solo", "S3 Object Lock", "Versioning solo", "Glacier"],
          correct: 1,
          explanation:
            "S3 Object Lock implementa WORM (Write Once Read Many). Cumple SEC 17a-4, FINRA, CFTC. Compliance regulatorio.",
        },
        {
          q: "Para subir archivos grandes a S3 con mayor rendimiento desde lejos:",
          options: [
            "Solo HTTP",
            "S3 Transfer Acceleration (usa CloudFront)",
            "Glacier directo",
            "EFS",
          ],
          correct: 1,
          explanation:
            "S3 Transfer Acceleration usa la red de edge locations de CloudFront para subir archivos más rápido. Útil para usuarios globales lejos del bucket.",
        },
      ],
    },
  ],
};
