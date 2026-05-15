import type { ModuleData } from "@/types/course";

export const m6: ModuleData = {
  slug: "m6",
  number: 6,
  title: "Databases en AWS: RDS, Aurora, DynamoDB, Redshift",
  icon: "🗄️",
  intro:
    "AWS tiene una BD para CADA caso de uso: relacional regional, relacional cloud-native, NoSQL key-value, NoSQL documental, grafos, data warehouse, time-series, ledger. Saber elegir es crucial.",
  totalActivities: 3,
  blocks: [
    // ============================================
    // SECCIÓN 1: BD Relacionales
    // ============================================
    { kind: "h3", text: "🗄️ 1. RDS - Relational Database Service" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> RDS es BD relacional <strong>administrada</strong>. Soporta 6 motores: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, y <strong>Aurora</strong> (motor propio AWS).",
    },
    { kind: "h4", text: "Características clave" },
    {
      kind: "list",
      items: [
        "<strong>Multi-AZ</strong>: réplica síncrona standby en otra AZ (HA, failover automático)",
        "<strong>Read Replicas</strong>: hasta 5-15 réplicas asíncronas para escalar lecturas",
        "<strong>Backups automáticos</strong>: hasta 35 días, point-in-time recovery",
        "<strong>Encriptación</strong> en reposo y tránsito con KMS",
        "<strong>Maintenance windows</strong>: AWS aplica parches",
        "Escalable verticalmente (más CPU/RAM); horizontalmente solo lecturas",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Diferencia clave:</strong><br/>" +
        "• <strong>Multi-AZ</strong> = HA (failover si falla la AZ primaria)<br/>" +
        "• <strong>Read Replicas</strong> = escalado de lecturas (no es HA en sí)",
    },

    // ============================================
    // SECCIÓN 2: Aurora
    // ============================================
    { kind: "h3", text: "🚀 2. Amazon Aurora" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Aurora es la BD relacional cloud-native de AWS, compatible con <strong>MySQL y PostgreSQL</strong>. Hasta <strong>5x más rápida</strong> que MySQL estándar, <strong>3x más rápida</strong> que PostgreSQL. Storage auto-escala hasta 128 TB.",
    },
    { kind: "h4", text: "Características diferenciadoras" },
    {
      kind: "list",
      items: [
        "<strong>Replicación a 6 copias en 3 AZs</strong> (vs 2 en RDS estándar)",
        "Hasta <strong>15 Aurora Replicas</strong> con failover en segundos",
        "<strong>Aurora Serverless v2</strong>: escala automáticamente, paga por uso",
        "<strong>Aurora Global Database</strong>: réplica cross-region con <1s lag",
        "<strong>Storage compartido</strong> entre instancias (no se replica entre cada)",
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo usar Aurora vs RDS:</strong><br/>" +
        "• <strong>Aurora</strong>: necesitas mejor performance, cargas críticas, escala global<br/>" +
        "• <strong>RDS estándar</strong>: compatibilidad exacta (Oracle, SQL Server), costo más bajo, cargas regulares",
    },

    // ============================================
    // SECCIÓN 3: DynamoDB
    // ============================================
    { kind: "h3", text: "🧱 3. DynamoDB" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> DynamoDB es BD <strong>NoSQL serverless</strong>, key-value y documental. Latencia <strong>single-digit milliseconds</strong>. Escala automáticamente a millones de requests/segundo.",
    },
    {
      kind: "list",
      items: [
        "<strong>Serverless</strong>: sin gestionar servidores",
        "<strong>On-demand</strong> o <strong>Provisioned</strong> capacity",
        "<strong>Global Tables</strong>: multi-region, multi-master",
        "<strong>DynamoDB Accelerator (DAX)</strong>: cache in-memory (microsegundos)",
        "<strong>Streams</strong>: trigger Lambda en cambios",
        "Ideal para: catálogos, sesiones, IoT, gaming, leaderboards",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Cuándo NO usar DynamoDB:</strong> queries complejas con JOINs (NoSQL no soporta). Para eso, RDS/Aurora.",
    },

    // ============================================
    // SECCIÓN 4: Redshift
    // ============================================
    { kind: "h3", text: "📊 4. Amazon Redshift" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Redshift es el <strong>data warehouse</strong> para analytics SQL a escala <strong>petabyte</strong>. Columnar storage + parallelism masivo. Compite con BigQuery y Snowflake.",
    },
    {
      kind: "list",
      items: [
        "<strong>Redshift Serverless</strong>: sin gestionar clusters, paga por uso",
        "<strong>Redshift Spectrum</strong>: queries SQL sobre datos en S3 sin cargarlos",
        "<strong>RA3 nodes</strong>: storage separado del compute (auto-escala)",
        "<strong>Federated queries</strong>: BD operacionales sin moverlas",
        "Mejor para OLAP (analytics), no OLTP (transacciones)",
      ],
    },

    // ============================================
    // SECCIÓN 5: Otras BDs especializadas
    // ============================================
    { kind: "h3", text: "🎯 5. Otras BDs especializadas" },
    {
      kind: "table",
      headers: ["Servicio", "Tipo", "Caso típico"],
      rows: [
        ["ElastiCache", "In-memory (Redis/Memcached)", "Cache, sesiones, leaderboards"],
        ["Neptune", "Graph database", "Redes sociales, fraude, knowledge graphs"],
        ["DocumentDB", "Documental (compatible MongoDB)", "Apps que usaban MongoDB"],
        ["Keyspaces", "Wide-column (compatible Cassandra)", "Migrar Cassandra"],
        ["Timestream", "Time-series", "IoT, métricas, sensores"],
        ["QLDB (Quantum Ledger DB)", "Ledger inmutable", "Audit trails, financial records"],
        ["MemoryDB for Redis", "Redis durable (con persistencia)", "BD primaria en memoria"],
      ],
    },

    // ============================================
    // SECCIÓN 6: Database Migration Service
    // ============================================
    { kind: "h3", text: "🚚 6. Database Migration Service (DMS)" },
    {
      kind: "info",
      html:
        "<strong>DMS</strong> migra BDs a AWS (o entre BDs en AWS) con <strong>mínimo downtime</strong>. Soporta migraciones <strong>homogéneas</strong> (MySQL→MySQL) y <strong>heterogéneas</strong> (Oracle→PostgreSQL) usando el <strong>Schema Conversion Tool (SCT)</strong>.",
    },

    // ============================================
    // SECCIÓN 7: Guía de decisión
    // ============================================
    { kind: "h3", text: "🎯 7. ¿Qué BD elijo?" },
    {
      kind: "table",
      headers: ["Necesidad", "Servicio"],
      rows: [
        ["Relacional regional gestionada (MySQL/Postgres/Oracle/SQL Server)", "RDS"],
        ["Relacional cloud-native (más rápido, escala automática)", "Aurora"],
        ["NoSQL key-value/documental serverless", "DynamoDB"],
        ["Cache in-memory", "ElastiCache"],
        ["Data warehouse analytics SQL", "Redshift"],
        ["Graphs (relaciones)", "Neptune"],
        ["Apps que usan MongoDB", "DocumentDB"],
        ["Time-series (IoT, métricas)", "Timestream"],
        ["Audit/ledger inmutable", "QLDB"],
        ["Migrar BD a AWS", "DMS + SCT"],
      ],
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m6_matching",
      pairs: [
        { en: "RDS", es: "Relacional administrada (6 motores)" },
        { en: "Aurora", es: "Relacional cloud-native (MySQL/PostgreSQL)" },
        { en: "DynamoDB", es: "NoSQL serverless key-value" },
        { en: "Redshift", es: "Data warehouse petabyte" },
        { en: "ElastiCache", es: "Cache in-memory" },
        { en: "Neptune", es: "Graph database" },
        { en: "DocumentDB", es: "Compatible MongoDB" },
        { en: "Timestream", es: "Time-series IoT" },
        { en: "DMS", es: "Migración de BDs" },
      ],
    },

    // ============================================
    // QUIZ FINAL
    // ============================================
    {
      kind: "quiz",
      key: "m6_quiz",
      questions: [
        {
          q: "Una app móvil con catálogo y latencia <10ms:",
          options: ["RDS MySQL", "Aurora", "DynamoDB", "Redshift"],
          correct: 2,
          explanation:
            "DynamoDB ofrece latencia sub-10ms, escala automática, serverless. Ideal para apps modernas con alto QPS.",
        },
        {
          q: "BD relacional con HA y failover automático:",
          options: ["RDS Multi-AZ", "RDS Read Replica", "DynamoDB", "S3"],
          correct: 0,
          explanation:
            "Multi-AZ provee réplica síncrona en otra AZ con failover automático. Read Replicas escalan lecturas pero no son HA en sí.",
        },
        {
          q: "Quieres una BD relacional con mejor performance y costos balanceados:",
          options: ["RDS Oracle", "Aurora MySQL/PostgreSQL", "DynamoDB", "Redshift"],
          correct: 1,
          explanation:
            "Aurora compatible MySQL/PostgreSQL ofrece 5x performance vs MySQL estándar. Replicación a 6 copias, escala storage automáticamente.",
        },
        {
          q: "Data warehouse SQL para analytics a escala petabyte:",
          options: ["RDS", "DynamoDB", "Redshift", "Aurora"],
          correct: 2,
          explanation:
            "Redshift es el data warehouse de AWS. Columnar storage, MPP (parallel processing), optimizado para OLAP.",
        },
        {
          q: "Para detectar fraude analizando relaciones entre cuentas:",
          options: ["RDS", "Neptune (graph DB)", "DynamoDB", "Timestream"],
          correct: 1,
          explanation:
            "Neptune es graph database, ideal para modelar relaciones (fraude, redes sociales, recomendaciones, knowledge graphs).",
        },
        {
          q: "Cache distribuido para sesiones de usuario:",
          options: ["DynamoDB", "ElastiCache (Redis)", "RDS", "Aurora"],
          correct: 1,
          explanation:
            "ElastiCache es Redis/Memcached administrado. Latencia sub-milisegundo. Para cache, sesiones, leaderboards.",
        },
        {
          q: "App existente usa MongoDB, quieres migrarla a AWS managed:",
          options: ["DynamoDB", "DocumentDB", "RDS", "Neptune"],
          correct: 1,
          explanation:
            "DocumentDB es compatible con MongoDB. Permite migrar apps existentes sin cambiar el código que usa drivers de MongoDB.",
        },
        {
          q: "Para mantener un registro inmutable de transacciones (audit):",
          options: ["QLDB", "RDS", "DynamoDB", "Aurora"],
          correct: 0,
          explanation:
            "QLDB (Quantum Ledger DB) es BD ledger inmutable y verificable. Cada cambio se registra criptográficamente. Para audit, financial records.",
        },
        {
          q: "Para migrar Oracle a PostgreSQL en AWS:",
          options: [
            "Migración manual con dump",
            "Database Migration Service + Schema Conversion Tool",
            "Solo cambiar driver",
            "DynamoDB",
          ],
          correct: 1,
          explanation:
            "Para migración heterogénea (motor distinto), usar DMS + SCT (Schema Conversion Tool). SCT convierte el schema; DMS migra los datos.",
        },
        {
          q: "Una BD para datos de sensores IoT (millones de puntos por segundo):",
          options: ["RDS", "DynamoDB", "Timestream", "S3"],
          correct: 2,
          explanation:
            "Timestream está diseñada para time-series: IoT, métricas, telemetría. Optimizada para escrituras masivas y queries por timestamp.",
        },
      ],
    },
  ],
};
