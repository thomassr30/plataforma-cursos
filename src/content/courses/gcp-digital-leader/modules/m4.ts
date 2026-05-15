import type { ModuleData } from "@/types/course";

export const m4: ModuleData = {
  slug: "m4",
  number: 4,
  title: "Storage y Bases de Datos en GCP",
  icon: "💾",
  intro:
    "Elegir storage y BD es crítico. Una mala elección cuesta dinero y rendimiento. GCP tiene ~10 servicios distintos: object storage, file storage, BD relacional (regional o global), NoSQL documental, wide-column, in-memory, data warehouse. Aquí aprenderás CUÁNDO usar cada uno con casos reales.",
  totalActivities: 4,
  blocks: [
    // ============================================
    // SECCIÓN 1: Cloud Storage
    // ============================================
    { kind: "h3", text: "📦 1. Cloud Storage (Object Storage)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Cloud Storage es un servicio de <strong>almacenamiento de objetos</strong>: archivos binarios (imágenes, videos, PDFs, backups, modelos ML, datasets) accedidos vía HTTP/API. NO es un filesystem; es key-value gigante.<br/><br/>" +
        "<strong>Durabilidad:</strong> 11 nueves (99.999999999%). Pérdida de un archivo casi imposible.",
    },
    { kind: "h4", text: "Conceptos clave" },
    {
      kind: "list",
      items: [
        "<strong>Bucket</strong>: contenedor de objetos (nombre único globalmente)",
        "<strong>Object</strong>: archivo dentro de un bucket",
        "<strong>Location</strong>: dónde vive el bucket (regional, dual-region, multi-region)",
        "<strong>Storage Class</strong>: nivel de acceso/precio (Standard, Nearline, Coldline, Archive)",
      ],
    },
    { kind: "h4", text: "Storage Classes (CRÍTICO para examen)" },
    {
      kind: "table",
      headers: ["Clase", "Acceso típico", "Mín. retención", "Precio storage", "Precio retrieval"],
      rows: [
        ["Standard", "Frecuente (varias veces al mes)", "0 días", "Más caro", "Más barato"],
        ["Nearline", "Mensual", "30 días", "Medio", "Medio"],
        ["Coldline", "Trimestral", "90 días", "Barato", "Más caro"],
        ["Archive", "Anual / compliance", "365 días", "Muy barato", "Mucho más caro"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Regla del costo:</strong> A medida que <em>bajas la temperatura</em> (Standard → Archive), el storage es más barato pero las <em>operaciones</em> (retrieval, listing) son más caras. Si vas a acceder mucho a un archivo Archive, te sale más caro que tenerlo en Standard. Calcula bien.",
    },
    { kind: "h4", text: "Lifecycle Rules" },
    {
      kind: "paragraph",
      html:
        "Puedes definir reglas para <strong>mover automáticamente</strong> objetos entre clases. Ejemplo: <em>'Si un objeto tiene >30 días, pásalo a Nearline. Si >90, a Coldline. Si >365, a Archive.'</em>",
    },
    { kind: "h4", text: "Casos de uso de Cloud Storage" },
    {
      kind: "list",
      items: [
        "<strong>Backups y disaster recovery</strong>",
        "<strong>Assets de sitios web</strong> (imágenes, JS, CSS) con Cloud CDN delante",
        "<strong>Datasets de ML</strong> para entrenar modelos",
        "<strong>Data lake</strong> (Cloud Storage + BigQuery)",
        "<strong>Distribución de software</strong> (binarios, paquetes)",
        "<strong>User-generated content</strong> (fotos de perfil, uploads)",
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo usar Cloud Storage:</strong><br/>" +
        "• Archivos no estructurados (imágenes, videos, docs)<br/>" +
        "• Backups de larga duración<br/>" +
        "• Data lake para analytics<br/>" +
        "• Distribución pública o privada de archivos",
    },

    // ============================================
    // SECCIÓN 2: Storage para VMs
    // ============================================
    { kind: "h3", text: "💿 2. Persistent Disk, Local SSD y Filestore" },
    {
      kind: "table",
      headers: ["Servicio", "Tipo", "Caso típico"],
      rows: [
        ["Persistent Disk (PD)", "Bloques persistentes para VMs", "Discos de sistema, BDs auto-gestionadas"],
        ["Hyperdisk", "Nueva gen, IOPS/throughput independiente", "Cargas exigentes"],
        ["Local SSD", "SSD físico de la VM (efímero)", "Caches, scratch space, BD temporal"],
        ["Filestore", "NFS administrado (filesystem)", "Apps que requieren filesystem compartido entre VMs"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>⚠️ Local SSD se PIERDE</strong> cuando apagas o reinicias la VM. No es para datos críticos. Sí para caches y scratch.",
    },

    // ============================================
    // SECCIÓN 3: BD Relacionales
    // ============================================
    { kind: "h3", text: "🗄️ 3. Bases de Datos Relacionales" },
    { kind: "h4", text: "Cloud SQL" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Cloud SQL es BD relacional <strong>administrada</strong> compatible con MySQL, PostgreSQL y SQL Server. Google se encarga de backups, parches, replicación, alta disponibilidad. Tú te enfocas en tu schema.",
    },
    {
      kind: "list",
      items: [
        "<strong>Escala vertical</strong> (más CPU/RAM al servidor), no horizontal infinita",
        "Hasta <strong>~64 vCPUs y 624 GB RAM</strong> por instancia",
        "Soporta <strong>read replicas</strong> para distribuir lecturas",
        "<strong>HA</strong>: réplica en otra zona de la misma región (failover automático)",
        "Backups automáticos y point-in-time recovery (PITR)",
      ],
    },
    { kind: "h4", text: "Cloud Spanner" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Cloud Spanner es una BD relacional <strong>globalmente distribuida</strong> con <strong>consistencia fuerte</strong> y <strong>escala horizontal</strong>. Es única en su categoría: SQL + globalidad + transacciones ACID. Usado por Google internamente para servicios como AdWords.",
    },
    {
      kind: "list",
      items: [
        "<strong>99.999%</strong> de SLA en configuración multi-region (5 minutos al año de downtime)",
        "Escala <strong>horizontalmente</strong> agregando nodos",
        "<strong>SQL estándar</strong> (similar a PostgreSQL)",
        "Caro pero único: usado por bancos y empresas globales",
      ],
    },
    { kind: "h4", text: "AlloyDB" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> BD compatible con PostgreSQL, optimizada para cargas <strong>transaccionales + analíticas</strong>. 4x más rápida que PostgreSQL estándar en transaccional, 100x en analytics. Es la apuesta de Google para reemplazar Oracle y SQL Server en empresas.",
    },
    { kind: "h4", text: "Cómo elegir entre las tres" },
    {
      kind: "table",
      headers: ["Necesidad", "Recomendación"],
      rows: [
        ["BD relacional regional típica", "Cloud SQL"],
        ["BD relacional global con consistencia fuerte", "Cloud Spanner"],
        ["BD relacional con cargas transac + analytics intensas", "AlloyDB"],
        ["Migración desde Oracle/SQL Server", "AlloyDB o Cloud SQL"],
        ["Sistema bancario global multi-continente", "Cloud Spanner"],
      ],
    },

    // ============================================
    // SECCIÓN 4: NoSQL
    // ============================================
    { kind: "h3", text: "🧱 4. Bases de Datos NoSQL" },
    { kind: "h4", text: "Firestore" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Firestore es BD NoSQL <strong>documental serverless</strong>, con sincronización en tiempo real, ideal para apps móviles y web modernas (sucesor de Datastore).",
    },
    {
      kind: "list",
      items: [
        "<strong>Documentos</strong> organizados en colecciones (parecido a MongoDB)",
        "<strong>Sync en tiempo real</strong>: cambios se propagan a clientes conectados",
        "<strong>Offline-first</strong>: SDKs móviles funcionan sin internet",
        "<strong>Escala automáticamente</strong>, sin gestionar instancias",
        "Modos: <strong>Native</strong> (recomendado) o <strong>Datastore</strong> (legacy)",
      ],
    },
    { kind: "h4", text: "Bigtable" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Bigtable es BD NoSQL <strong>wide-column</strong> diseñada para enormes volúmenes con baja latencia. Es la misma tecnología detrás de Google Search, Maps, Analytics.",
    },
    {
      kind: "list",
      items: [
        "<strong>Petabytes</strong> de datos sin sudar",
        "Latencia <strong>< 10ms</strong>",
        "Ideal para: <strong>IoT, time series, telemetría, finanzas, analytics</strong>",
        "Soporta interfaz HBase",
      ],
    },
    { kind: "h4", text: "Memorystore" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Memorystore es <strong>cache in-memory administrado</strong> con Redis o Memcached. Latencia sub-milisegundo. Usado para acelerar apps.",
    },
    {
      kind: "list",
      items: [
        "<strong>Redis</strong>: estructuras complejas, persistencia opcional, ideal para apps",
        "<strong>Memcached</strong>: más simple, solo cache key-value",
        "Casos: sesiones, cache de queries, leaderboards, rate limiting",
      ],
    },

    // ============================================
    // SECCIÓN 5: BigQuery
    // ============================================
    { kind: "h3", text: "📊 5. BigQuery (Data Warehouse)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> BigQuery es un <strong>data warehouse serverless</strong> diseñado para analytics a escala de <strong>petabytes</strong>. Usa SQL estándar, separa storage de compute, y escala automáticamente.",
    },
    {
      kind: "list",
      items: [
        "<strong>Serverless</strong>: cero gestión de infra",
        "<strong>SQL estándar</strong>: si sabes SQL, sabes BigQuery",
        "<strong>Federated queries</strong>: consulta datos en GCS, Cloud SQL, Spanner sin moverlos",
        "<strong>BigQuery ML</strong>: entrena modelos directamente con SQL",
        "<strong>BigQuery Omni</strong>: consultar datos en AWS y Azure sin moverlos",
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo usar BigQuery:</strong><br/>" +
        "• Analytics y BI a escala (cualquier volumen)<br/>" +
        "• Data warehouse central<br/>" +
        "• ML con datos ya almacenados<br/>" +
        "• Reportes ejecutivos con queries en segundos",
    },
    {
      kind: "tip",
      html:
        "<strong>❌ NO uses BigQuery para:</strong> transacciones rápidas (OLTP). BigQuery es OLAP (analytics). Para transacciones rápidas usa Cloud SQL, Spanner o Firestore.",
    },

    // ============================================
    // SECCIÓN 6: Tabla maestra de decisión
    // ============================================
    { kind: "h3", text: "🎯 6. Tabla maestra de decisión: ¿qué BD/storage uso?" },
    {
      kind: "table",
      headers: ["Necesito...", "Servicio"],
      rows: [
        ["Almacenar archivos (imágenes, videos, backups)", "Cloud Storage"],
        ["Filesystem compartido NFS entre VMs", "Filestore"],
        ["BD relacional regional gestionada (MySQL/Postgres)", "Cloud SQL"],
        ["BD relacional global con consistencia fuerte", "Cloud Spanner"],
        ["PostgreSQL acelerado con analytics", "AlloyDB"],
        ["NoSQL documental con sync tiempo real (app móvil)", "Firestore"],
        ["NoSQL wide-column gran escala (IoT, time series)", "Bigtable"],
        ["Cache in-memory (Redis/Memcached)", "Memorystore"],
        ["Data warehouse SQL para analytics", "BigQuery"],
        ["Storage muy frío (>1 año)", "Cloud Storage Archive"],
      ],
    },

    // ============================================
    // SECCIÓN 7: Pricing y consideraciones
    // ============================================
    { kind: "h3", text: "💵 7. Consideraciones de pricing" },
    {
      kind: "list",
      items: [
        "<strong>Cloud Storage</strong>: pagas storage + operaciones + egress",
        "<strong>Cloud SQL</strong>: pagas instancia (CPU/RAM/disco) + I/O + backups",
        "<strong>Spanner</strong>: pagas nodos + storage (caro pero escalable)",
        "<strong>BigQuery</strong>: pagas storage + queries (on-demand por bytes leídos) o flat-rate (slots reservados)",
        "<strong>Bigtable</strong>: pagas nodos + storage",
        "<strong>Firestore</strong>: pagas reads/writes/deletes + storage + network",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 BigQuery on-demand:</strong> cobra por TB procesado. Particionar tablas y usar SELECT específicos (no SELECT *) reduce costo dramáticamente.",
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m4_matching",
      pairs: [
        { en: "Cloud Storage", es: "Object storage no estructurado" },
        { en: "Filestore", es: "NFS administrado" },
        { en: "Cloud SQL", es: "Relacional regional (MySQL/Postgres)" },
        { en: "Cloud Spanner", es: "Relacional global, consistencia fuerte" },
        { en: "AlloyDB", es: "PostgreSQL acelerado" },
        { en: "Firestore", es: "NoSQL documental sync tiempo real" },
        { en: "Bigtable", es: "Wide-column, IoT, time series" },
        { en: "Memorystore", es: "Cache Redis/Memcached" },
        { en: "BigQuery", es: "Data warehouse SQL" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m4_fill",
      items: [
        { text: "Archivos accedidos cada >1 año: clase Cloud Storage ___", answer: "Archive", es: "Archive" },
        { text: "BD relacional GLOBAL con consistencia fuerte: Cloud ___", answer: "Spanner", es: "Spanner" },
        { text: "Para analytics a petabytes: ___", answer: "BigQuery", es: "BigQuery" },
        { text: "Cache in-memory: ___", answer: "Memorystore", es: "Memorystore" },
        { text: "Wide-column para IoT: ___", answer: "Bigtable", es: "Bigtable" },
        { text: "NFS gestionado: ___", answer: "Filestore", es: "Filestore" },
      ],
    },

    // ============================================
    // QUIZ FINAL DEL MÓDULO
    // ============================================
    {
      kind: "quiz",
      key: "m4_quiz",
      questions: [
        {
          q: "Una empresa quiere guardar 50TB de logs históricos a los que accederá quizás una vez al año por compliance:",
          options: ["Cloud Storage Standard", "Cloud Storage Nearline", "Cloud Storage Coldline", "Cloud Storage Archive"],
          correct: 3,
          explanation:
            "Archive es la clase más barata para storage. Mínimo 365 días. Ideal para datos accedidos esporádicamente o nunca (compliance). Si accedes más seguido, te conviene Coldline o Nearline.",
        },
        {
          q: "Sistema bancario operando en múltiples continentes con transacciones consistentes:",
          options: ["Cloud SQL multi-region", "Cloud Spanner", "Firestore", "Bigtable"],
          correct: 1,
          explanation:
            "Cloud Spanner es ÚNICO: relacional global con consistencia fuerte y escala horizontal. SLA 99.999% multi-region. Ideal para finanzas globales.",
        },
        {
          q: "App móvil con catálogo de productos, búsqueda y sync entre dispositivos:",
          options: ["Bigtable", "Firestore", "Cloud SQL", "BigQuery"],
          correct: 1,
          explanation:
            "Firestore es NoSQL documental con sync en tiempo real, ideal para apps móviles/web. Funciona offline, sincroniza al volver online.",
        },
        {
          q: "Millones de sensores IoT enviando lecturas cada segundo. ¿BD?",
          options: ["Cloud SQL", "Firestore", "Bigtable", "Spanner"],
          correct: 2,
          explanation:
            "Bigtable es wide-column, optimizada para escrituras masivas y queries por timestamp. Ideal para IoT, telemetría y time series a gran escala.",
        },
        {
          q: "Para analytics SQL sobre 200 TB de datos históricos:",
          options: ["Cloud SQL", "Spanner", "BigQuery", "Bigtable"],
          correct: 2,
          explanation:
            "BigQuery está diseñado para analytics a escala (petabyte-scale). SQL estándar, serverless, separa storage de compute.",
        },
        {
          q: "Migración desde Oracle a GCP con queries transaccionales y analíticas en una sola BD:",
          options: ["Cloud SQL básico", "AlloyDB", "Firestore", "Spanner"],
          correct: 1,
          explanation:
            "AlloyDB está optimizado para cargas mixtas transaccionales + analíticas. Es la respuesta de Google para migrar de Oracle/SQL Server.",
        },
        {
          q: "App con sesiones de usuario que requiere sub-milisegundo de latencia:",
          options: ["Cloud SQL", "BigQuery", "Memorystore (Redis)", "Bigtable"],
          correct: 2,
          explanation:
            "Memorystore (Redis) es cache in-memory con latencia sub-milisegundo. Perfecto para sesiones, rate limiting, leaderboards.",
        },
        {
          q: "Varias VMs necesitan acceder al mismo filesystem compartido (NFS):",
          options: ["Persistent Disk", "Local SSD", "Filestore", "Cloud Storage FUSE"],
          correct: 2,
          explanation:
            "Filestore es NFS administrado. Persistent Disk se monta a UNA VM. Local SSD es efímero. Cloud Storage no es POSIX filesystem real.",
        },
        {
          q: "La durabilidad de Cloud Storage es:",
          options: ["99% (2 nueves)", "99.9% (3 nueves)", "99.999999999% (11 nueves)", "100%"],
          correct: 2,
          explanation:
            "Cloud Storage ofrece 11 nueves de durabilidad (99.999999999%). En la práctica significa que la pérdida de un objeto es virtualmente imposible.",
        },
        {
          q: "Una aplicación financiera necesita transacciones ACID en una sola región. Performance moderado.",
          options: ["BigQuery", "Cloud SQL", "Spanner", "Bigtable"],
          correct: 1,
          explanation:
            "Cloud SQL ofrece ACID en una región, simple y económico. Spanner es overkill (es para escenarios globales y caro). BigQuery no es transaccional.",
        },
        {
          q: "Local SSD es ideal para:",
          options: ["Datos críticos persistentes", "Cache y scratch space (efímero)", "Backups", "Long-term storage"],
          correct: 1,
          explanation:
            "Local SSD se pierde al apagar/reiniciar la VM. NO es persistente. Es ideal para caches, scratch, BD temporal de alta performance.",
        },
        {
          q: "Lifecycle rule típica para optimizar costos de Cloud Storage:",
          options: [
            "Borrar todo después de 30 días",
            "Mover de Standard → Nearline → Coldline → Archive según edad",
            "Solo usar Standard",
            "Solo Archive",
          ],
          correct: 1,
          explanation:
            "Las lifecycle rules permiten mover automáticamente objetos a clases más baratas según edad. Es el patrón estándar para optimizar costos.",
        },
      ],
    },
  ],
};
