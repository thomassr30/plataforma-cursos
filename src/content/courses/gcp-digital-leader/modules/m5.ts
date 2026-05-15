import type { ModuleData } from "@/types/course";

export const m5: ModuleData = {
  slug: "m5",
  number: 5,
  title: "Datos y Analytics — BigQuery, Dataflow, Pub/Sub, Looker",
  icon: "📊",
  intro:
    "Google es la empresa de datos por excelencia. La pila analítica de GCP es de las más completas y rápidas del mundo. En este módulo dominarás el ciclo completo: ingesta → procesamiento → almacenamiento → análisis → activación.",
  totalActivities: 3,
  blocks: [
    // ============================================
    // SECCIÓN 1: Pipeline moderno
    // ============================================
    { kind: "h3", text: "🌊 1. El Pipeline de Datos Moderno" },
    {
      kind: "paragraph",
      html:
        "Todo flujo de datos profesional pasa por 4-5 etapas. Memoriza estas etapas y los servicios típicos en GCP: esto sale en el examen como 'arrastra servicios al diagrama'.",
    },
    {
      kind: "table",
      headers: ["Etapa", "Qué hace", "Servicios GCP típicos"],
      rows: [
        ["Ingesta", "Capturar datos desde origen", "Pub/Sub, Storage Transfer, Datastream, Cloud Functions"],
        ["Procesamiento", "Transformar, enriquecer, limpiar", "Dataflow, Dataproc, Cloud Functions"],
        ["Almacenamiento", "Guardar para consulta", "BigQuery, GCS, Bigtable, Cloud SQL"],
        ["Análisis y BI", "Consultas, dashboards", "BigQuery, Looker, Looker Studio"],
        ["Activación", "Usar resultados (ML, alertas)", "Vertex AI, Cloud Functions, APIs externas"],
      ],
    },

    // ============================================
    // SECCIÓN 2: BigQuery a fondo
    // ============================================
    { kind: "h3", text: "🔵 2. BigQuery: el corazón de los datos en GCP" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> BigQuery es un <strong>data warehouse serverless</strong> diseñado para analytics a escala. Procesa <strong>petabytes</strong> con SQL estándar en segundos, sin gestionar nada de infraestructura. Su arquitectura separa <strong>storage</strong> (Colossus) de <strong>compute</strong> (Dremel), permitiendo escalar cada uno independientemente.",
    },
    { kind: "h4", text: "Características clave" },
    {
      kind: "list",
      items: [
        "<strong>SQL estándar</strong>: ANSI SQL 2011, casi sin diferencias con PostgreSQL",
        "<strong>Serverless</strong>: cero infraestructura. Solo SQL.",
        "<strong>Escala automática</strong>: las queries usan miles de cores en paralelo",
        "<strong>Federated queries</strong>: consultar datos en GCS, Cloud SQL, Spanner SIN moverlos",
        "<strong>BigQuery Omni</strong>: consultar datos en AWS S3 y Azure Blob SIN moverlos",
        "<strong>BigQuery ML</strong>: entrenar modelos con SQL (regresión, clasificación, clustering, time series, etc.)",
        "<strong>BI Engine</strong>: cache in-memory para dashboards sub-segundo",
        "<strong>Materialized Views</strong>: vistas pre-computadas que se actualizan automáticamente",
        "<strong>Authorized views</strong>: compartir datos con control granular",
      ],
    },
    { kind: "h4", text: "Modelos de pricing de BigQuery" },
    {
      kind: "table",
      headers: ["Modelo", "Cómo cobra", "Cuándo conviene"],
      rows: [
        ["On-demand", "Por TB procesado por query ($6.25/TB aprox.)", "Uso esporádico, equipos pequeños"],
        ["Flat-rate", "Slots reservados (mensual o anual)", "Uso predecible y alto"],
        ["Edition (Standard/Enterprise/Plus)", "Pricing modernizado por edición", "Diferentes capacidades"],
        ["Storage", "Activo ($0.02/GB) o Long-term ($0.01/GB)", "Storage histórico"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Tip de costo en examen:</strong> Si BigQuery procesa muchos TB y el costo es alto, las soluciones son: (1) <strong>particionar</strong> tablas por fecha, (2) <strong>cluster</strong> por columnas frecuentes, (3) usar <strong>SELECT con columnas específicas</strong> (NO SELECT *), (4) considerar <strong>flat-rate</strong>.",
    },
    { kind: "h4", text: "Casos de uso REALES de BigQuery" },
    {
      kind: "list",
      items: [
        "<strong>Data warehouse corporativo</strong>: consolidar datos de todas las fuentes",
        "<strong>Customer 360</strong>: visión unificada del cliente",
        "<strong>Análisis de marketing</strong>: atribución, LTV, churn",
        "<strong>Análisis de logs</strong>: terabytes de logs operacionales",
        "<strong>Reportes financieros</strong>: dashboards en tiempo casi real",
        "<strong>ML directamente</strong>: BigQuery ML para predicciones",
      ],
    },

    // ============================================
    // SECCIÓN 3: Pub/Sub
    // ============================================
    { kind: "h3", text: "📨 3. Pub/Sub: mensajería async global" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Pub/Sub es un sistema de <strong>mensajería publish/subscribe</strong> escalable globalmente. Productores publican mensajes a <em>topics</em>; consumidores se suscriben y reciben los mensajes. Desacopla completamente productor y consumidor.",
    },
    { kind: "h4", text: "Conceptos clave" },
    {
      kind: "list",
      items: [
        "<strong>Topic</strong>: canal donde se publican mensajes",
        "<strong>Subscription</strong>: cola por la que un consumidor recibe los mensajes",
        "<strong>Pull</strong>: el consumidor pide mensajes activamente",
        "<strong>Push</strong>: Pub/Sub envía mensajes a un endpoint HTTP",
        "<strong>At-least-once</strong> delivery: garantiza que el mensaje llegue (puede llegar 2+ veces, debes idempotencia)",
        "<strong>Exactly-once</strong>: disponible en modo especial",
      ],
    },
    { kind: "h4", text: "Casos de uso de Pub/Sub" },
    {
      kind: "list",
      items: [
        "<strong>Ingesta de eventos</strong>: clicks, logs, IoT",
        "<strong>Streaming a BigQuery</strong>: vía Dataflow",
        "<strong>Microservicios desacoplados</strong>: orden → notificación, factura, envío",
        "<strong>Fan-out</strong>: un evento → varios consumidores (analítica, audit, notificación)",
        "<strong>Webhooks confiables</strong>: con reintentos automáticos",
      ],
    },
    { kind: "h4", text: "Pub/Sub Lite" },
    {
      kind: "paragraph",
      html:
        "Variante <strong>regional, más barata, con capacidad reservada</strong> (no global como Pub/Sub estándar). Para casos donde no necesitas globalidad y quieres ahorrar.",
    },

    // ============================================
    // SECCIÓN 4: Dataflow
    // ============================================
    { kind: "h3", text: "🔄 4. Dataflow: procesamiento serverless" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Dataflow es un servicio <strong>serverless</strong> para procesar datos en <strong>batch (lote)</strong> y <strong>streaming (tiempo real)</strong> usando el mismo modelo de programación: <strong>Apache Beam</strong>. Tú escribes el pipeline una vez, corre en batch o streaming según necesites.",
    },
    { kind: "h4", text: "¿Por qué Dataflow?" },
    {
      kind: "list",
      items: [
        "<strong>Mismo código batch y streaming</strong>",
        "<strong>Escala automáticamente</strong>",
        "<strong>Optimizado por Google</strong>: usa Shuffle Service, Streaming Engine",
        "<strong>Plantillas listas</strong>: GCS → BigQuery, Pub/Sub → BigQuery, etc.",
        "<strong>Pago por uso</strong>: solo pagas por los recursos consumidos durante el job",
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo usar Dataflow:</strong><br/>" +
        "• ETL/ELT batch o streaming<br/>" +
        "• Pipelines Pub/Sub → BigQuery<br/>" +
        "• Transformaciones complejas<br/>" +
        "• No quieres gestionar clusters",
    },

    // ============================================
    // SECCIÓN 5: Dataproc
    // ============================================
    { kind: "h3", text: "🐘 5. Dataproc: Spark y Hadoop administrados" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Dataproc es Apache <strong>Spark y Hadoop</strong> administrados. Crea clusters en segundos, ejecuta jobs y elimínalos. Ideal para migrar cargas Spark/Hadoop existentes desde on-prem.",
    },
    {
      kind: "table",
      headers: ["Característica", "Dataflow", "Dataproc"],
      rows: [
        ["Modelo", "Apache Beam", "Spark / Hadoop / Hive / Presto"],
        ["Gestión", "100% serverless", "Cluster (crear/borrar)"],
        ["Mejor para", "Pipelines nuevos batch+streaming", "Migración lift-and-shift de Spark/Hadoop"],
        ["Pricing", "Por uso de pipeline", "Por uso del cluster"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Regla en examen:</strong><br/>" +
        "• <em>'Cargas Spark/Hadoop existentes'</em> → <strong>Dataproc</strong><br/>" +
        "• <em>'Pipeline nuevo, batch y streaming'</em> → <strong>Dataflow</strong>",
    },

    // ============================================
    // SECCIÓN 6: Looker y Looker Studio
    // ============================================
    { kind: "h3", text: "📊 6. Looker y Looker Studio (BI)" },
    {
      kind: "table",
      headers: ["Característica", "Looker (enterprise)", "Looker Studio (antes Data Studio)"],
      rows: [
        ["Costo", "Licencia (no barata)", "Gratuito"],
        ["Modelo semántico", "✅ LookML (modelo centralizado)", "❌ No"],
        ["Governance", "Fuerte: definiciones únicas", "Más flexible/menos governance"],
        ["Embedding", "Sí, en apps propias", "Sí, vía iframe"],
        ["Caso típico", "BI corporativo enterprise", "Dashboards rápidos y simples"],
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo Looker:</strong> empresa grande, múltiples equipos, necesitas que las métricas se definan UNA vez y todos las usen consistentemente (LookML).<br/><br/>" +
        "<strong>✅ Cuándo Looker Studio:</strong> dashboards rápidos, equipos pequeños, ahorrar costo.",
    },

    // ============================================
    // SECCIÓN 7: Otros servicios clave
    // ============================================
    { kind: "h3", text: "🧭 7. Otros servicios del ecosistema datos" },
    {
      kind: "table",
      headers: ["Servicio", "Para qué"],
      rows: [
        ["Cloud Composer", "Apache Airflow administrado: orquestar pipelines complejos (DAGs)"],
        ["Data Catalog", "Metadata y descubrimiento de datos"],
        ["Dataplex", "Gobierno unificado de data lakes/warehouses/marts"],
        ["Datastream", "Change Data Capture (CDC): replicación continua desde BDs operacionales"],
        ["Data Fusion", "ETL visual con conectores"],
        ["Storage Transfer Service", "Transferir datos desde otras nubes a GCS"],
        ["BigQuery Data Transfer Service", "Cargar datos de SaaS (Salesforce, YouTube, etc.) a BQ"],
        ["Cloud Spanner Migration Tool", "Migrar a Spanner"],
      ],
    },

    // ============================================
    // SECCIÓN 8: Arquitectura típica
    // ============================================
    { kind: "h3", text: "🏗️ 8. Arquitectura típica de analytics moderno en GCP" },
    {
      kind: "info",
      html:
        "<strong>Patrón recomendado por Google:</strong><br/><br/>" +
        "1️⃣ <strong>Pub/Sub</strong>: ingesta eventos (clicks, IoT, etc.)<br/>" +
        "2️⃣ <strong>Dataflow</strong>: procesa stream/batch, limpia, enriquece<br/>" +
        "3️⃣ <strong>BigQuery</strong>: almacena para analytics<br/>" +
        "4️⃣ <strong>Looker / Looker Studio</strong>: visualización<br/>" +
        "5️⃣ <strong>Vertex AI / BigQuery ML</strong>: predicciones<br/>" +
        "6️⃣ <strong>Cloud Composer</strong>: orquesta todo (opcional)<br/>" +
        "7️⃣ <strong>Dataplex</strong>: governance",
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m5_matching",
      pairs: [
        { en: "BigQuery", es: "Data warehouse SQL serverless" },
        { en: "Pub/Sub", es: "Mensajería async global" },
        { en: "Dataflow", es: "Procesamiento batch+streaming serverless" },
        { en: "Dataproc", es: "Spark/Hadoop administrado" },
        { en: "Looker", es: "BI enterprise con LookML" },
        { en: "Looker Studio", es: "Dashboards gratuitos rápidos" },
        { en: "Cloud Composer", es: "Apache Airflow administrado" },
        { en: "Datastream", es: "CDC desde BDs operacionales" },
        { en: "Dataplex", es: "Gobierno de datos unificado" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m5_fill",
      items: [
        { text: "Para analytics a escala: ___", answer: "BigQuery", es: "BigQuery" },
        { text: "Para mensajería async global: ___ /___", answer: "Pub/Sub", es: "Pub/Sub" },
        { text: "Para procesamiento serverless batch+stream: ___", answer: "Dataflow", es: "Dataflow" },
        { text: "Para Spark/Hadoop administrados: ___", answer: "Dataproc", es: "Dataproc" },
        { text: "Airflow administrado: Cloud ___", answer: "Composer", es: "Composer" },
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
          q: "Tu empresa tiene 100TB de datos históricos y quiere correr queries SQL para BI. ¿Servicio?",
          options: ["Cloud SQL", "BigQuery", "Spanner", "Bigtable"],
          correct: 1,
          explanation:
            "BigQuery está hecho para analytics a escala. Cloud SQL es para cargas transaccionales pequeñas/medianas. Spanner para transaccional global. Bigtable para wide-column.",
        },
        {
          q: "Una empresa tiene jobs Spark en on-prem que quiere migrar. ¿Servicio en GCP?",
          options: ["Dataflow", "Dataproc", "BigQuery", "Cloud Composer"],
          correct: 1,
          explanation:
            "Dataproc es Spark/Hadoop administrado. Ideal para migrar cargas existentes (lift-and-shift). Dataflow es Beam (mejor para pipelines nuevos).",
        },
        {
          q: "Quieres procesar 10 millones de eventos/día en tiempo real y guardarlos en BigQuery:",
          options: [
            "Cloud Functions cada evento (muy caro)",
            "Pub/Sub → Dataflow → BigQuery",
            "Compute Engine con scripts",
            "Solo BigQuery directo",
          ],
          correct: 1,
          explanation:
            "El patrón clásico: Pub/Sub ingesta, Dataflow procesa en streaming, escribe a BigQuery. Es escalable, sin gestión, y eficiente.",
        },
        {
          q: "Para desacoplar microservicios con un sistema de mensajes:",
          options: ["Cloud SQL", "Pub/Sub", "BigQuery", "Firestore"],
          correct: 1,
          explanation:
            "Pub/Sub es mensajería async publish/subscribe. Desacopla totalmente productores y consumidores. Escala globalmente.",
        },
        {
          q: "BigQuery cobra principalmente por:",
          options: ["Número de tablas", "Bytes procesados por query (on-demand) o slots (flat-rate)", "Cantidad de usuarios", "Solo storage"],
          correct: 1,
          explanation:
            "BigQuery on-demand cobra por TB procesado por query. Flat-rate cobra por slots reservados. Plus storage por GB activo o long-term.",
        },
        {
          q: "Dashboards profesionales con governance fuerte y modelo semántico:",
          options: ["Looker Studio", "Looker", "Excel", "Cloud Monitoring"],
          correct: 1,
          explanation:
            "Looker tiene LookML para definir métricas centralizadamente. Looker Studio es más simple y gratis pero sin modelo semántico fuerte.",
        },
        {
          q: "Para orquestar pipelines complejos con dependencias (DAGs):",
          options: ["Cloud Composer (Airflow)", "Pub/Sub solo", "BigQuery", "Cloud Functions"],
          correct: 0,
          explanation:
            "Cloud Composer es Apache Airflow administrado. Ideal para orquestar pipelines con muchas dependencias (extraer, transformar, validar, cargar, notificar).",
        },
        {
          q: "Tu BD operacional debe replicarse continuamente a BigQuery:",
          options: ["Manual export", "Datastream (CDC)", "Cloud SQL solo", "Solo Looker"],
          correct: 1,
          explanation:
            "Datastream hace CDC (Change Data Capture): captura cambios en BDs (MySQL, PostgreSQL, Oracle) y los replica continuamente a BigQuery o GCS.",
        },
        {
          q: "Una empresa quiere consultar datos que están en AWS S3 sin moverlos a GCP:",
          options: ["Imposible", "BigQuery Omni", "Cloud SQL", "Dataflow"],
          correct: 1,
          explanation:
            "BigQuery Omni permite consultar datos en AWS S3 y Azure Blob desde BigQuery sin moverlos. Útil en escenarios multi-cloud.",
        },
        {
          q: "BigQuery ML permite:",
          options: [
            "Solo visualizar datos",
            "Entrenar modelos ML directamente con SQL en BigQuery",
            "Subir modelos TensorFlow externos",
            "Solo limpiar datos",
          ],
          correct: 1,
          explanation:
            "BigQuery ML te permite crear y consultar modelos ML usando SQL estándar (regresión, clasificación, clustering, time series, recomendación). Ideal para analistas SQL.",
        },
      ],
    },
  ],
};
