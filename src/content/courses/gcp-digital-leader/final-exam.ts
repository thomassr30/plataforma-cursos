import type { QuizQuestion } from "@/types/course";

// 50 preguntas estilo Google Cloud Digital Leader (2026)
// Cubre los 5 dominios oficiales:
// 1. Digital transformation with Google Cloud
// 2. Innovating with data and Google Cloud
// 3. Infrastructure and application modernization
// 4. Trust and security with Google Cloud
// 5. Scaling with Google Cloud operations

export const finalExam: QuizQuestion[] = [
  // ============ DOMINIO 1: Transformación Digital ============
  {
    q: "Una empresa tradicional quiere modernizarse aprovechando la nube. ¿Cuál es el PRIMER beneficio de adoptar cloud computing frente al modelo on-premise?",
    options: [
      "Garantía de eliminar todos los costos",
      "Conversión de CapEx (gastos de capital) en OpEx (gastos operativos)",
      "Eliminar completamente la necesidad de equipos de TI",
      "Asegurar disponibilidad del 100% sin esfuerzo",
    ],
    correct: 1,
    explanation:
      "Una de las ventajas más importantes del cloud es convertir el gasto en capital (servidores, infraestructura) en gasto operativo recurrente y predecible, pagando por lo que se usa.",
  },
  {
    q: "¿Cuál de los siguientes NO es uno de los tres modelos principales de servicio cloud?",
    options: ["IaaS", "PaaS", "DBaaS", "SaaS"],
    correct: 2,
    explanation:
      "Los tres modelos principales son IaaS (Infraestructura), PaaS (Plataforma) y SaaS (Software). 'DBaaS' (Database as a Service) es una subcategoría dentro de PaaS, no un modelo principal.",
  },
  {
    q: "Una empresa quiere migrar rápido sus VMs sin rediseñar nada. ¿Qué estrategia de migración debería usar?",
    options: ["Refactor", "Lift and Shift (Rehost)", "Rebuild", "Replatform"],
    correct: 1,
    explanation:
      "Lift and Shift (Rehost) es la estrategia más rápida: mover las VMs tal cual sin cambios. Es el primer paso típico antes de optimizar para cloud.",
  },
  {
    q: "Una empresa quiere reescribir su app monolítica a microservicios cloud-native. ¿Qué estrategia es?",
    options: ["Lift and Shift", "Replatform", "Rip and Replace (Refactor)", "Retire"],
    correct: 2,
    explanation:
      "Rip and Replace / Refactor implica reescribir la aplicación aprovechando capacidades cloud-native. Es la más costosa pero da mayores beneficios a largo plazo.",
  },
  {
    q: "Un cliente pregunta cuál es la diferencia entre IaaS y SaaS. ¿Qué le explicas?",
    options: [
      "IaaS y SaaS son lo mismo",
      "IaaS da infraestructura virtualizada (VMs, red); SaaS da software listo para usar",
      "IaaS solo funciona en GCP; SaaS solo en AWS",
      "SaaS requiere más gestión que IaaS",
    ],
    correct: 1,
    explanation:
      "IaaS da los bloques básicos de infraestructura (Compute Engine = VMs). SaaS entrega aplicaciones completas listas para usar (Workspace, Gmail).",
  },

  // ============ DOMINIO 2: Datos e Innovación ============
  {
    q: "Una empresa retail quiere analizar petabytes de datos de ventas con SQL. ¿Qué servicio recomiendas?",
    options: ["Cloud SQL", "Bigtable", "BigQuery", "Firestore"],
    correct: 2,
    explanation:
      "BigQuery es el data warehouse serverless de Google: SQL estándar, analítica a escala de petabytes, sin gestionar infraestructura.",
  },
  {
    q: "Una aplicación móvil necesita una BD escalable con sync en tiempo real y modelo documental. ¿Qué eliges?",
    options: ["Cloud SQL", "Firestore", "Bigtable", "Cloud Spanner"],
    correct: 1,
    explanation:
      "Firestore es NoSQL documental, serverless, con sincronización en tiempo real ideal para apps móviles/web.",
  },
  {
    q: "Una BD relacional global, transaccional, con consistencia fuerte y escala horizontal:",
    options: ["Cloud SQL", "Cloud Spanner", "AlloyDB", "Bigtable"],
    correct: 1,
    explanation:
      "Cloud Spanner ofrece BD relacional con escalado horizontal global y consistencia fuerte. Único en su categoría.",
  },
  {
    q: "Para almacenar archivos no estructurados (imágenes, backups, videos):",
    options: ["Cloud Storage", "Bigtable", "Cloud SQL", "Persistent Disk"],
    correct: 0,
    explanation:
      "Cloud Storage es object storage: ideal para archivos no estructurados, alta durabilidad y disponibilidad.",
  },
  {
    q: "¿Qué clase de Cloud Storage usarías para archivos accedidos máximo una vez al año?",
    options: ["Standard", "Nearline", "Coldline", "Archive"],
    correct: 3,
    explanation:
      "Archive es la clase más barata, ideal para backup a largo plazo con acceso muy esporádico. Mínimo 365 días de retención.",
  },
  {
    q: "Para procesamiento streaming y batch unificado (Apache Beam):",
    options: ["Dataproc", "Dataflow", "Pub/Sub", "Cloud Composer"],
    correct: 1,
    explanation:
      "Dataflow es el servicio serverless para procesamiento batch y streaming basado en Apache Beam.",
  },
  {
    q: "Para correr Apache Spark y Hadoop administrados:",
    options: ["Dataflow", "Dataproc", "BigQuery", "Bigtable"],
    correct: 1,
    explanation: "Dataproc es Spark/Hadoop como servicio administrado en GCP.",
  },
  {
    q: "Para mensajería asíncrona con desacople entre microservicios:",
    options: ["Pub/Sub", "Cloud SQL", "BigQuery", "Spanner"],
    correct: 0,
    explanation:
      "Pub/Sub es la plataforma de mensajería publish/subscribe globalmente escalable de GCP.",
  },
  {
    q: "Para dashboards y visualización profesional con modelado de datos:",
    options: ["Looker Studio", "Looker", "BigQuery", "Vertex AI"],
    correct: 1,
    explanation:
      "Looker es la plataforma BI enterprise con LookML (modelo semántico). Looker Studio (antes Data Studio) es la versión gratuita más simple.",
  },
  {
    q: "Para entrenar un modelo de ML sin código a partir de tus datos:",
    options: ["AutoML", "Cloud Run", "Bigtable", "Compute Engine"],
    correct: 0,
    explanation:
      "AutoML te permite entrenar modelos custom de Visión, NLP o Tabular sin escribir código.",
  },
  {
    q: "Para servicios de IA pre-entrenados (visión, voz, traducción) vía API:",
    options: ["Vertex AI Workbench", "Las APIs de IA de Google (Vision, Speech, Translation)", "BigQuery ML", "Dataflow"],
    correct: 1,
    explanation:
      "Google ofrece APIs pre-entrenadas para casos comunes: Vision AI, Speech-to-Text, Translation AI, Document AI, etc.",
  },
  {
    q: "Plataforma unificada de Google para todo el ciclo de ML (entrenar, desplegar, monitorear):",
    options: ["Vertex AI", "AutoML solo", "BigQuery ML solo", "AI Platform (legacy)"],
    correct: 0,
    explanation:
      "Vertex AI unifica todas las herramientas de ML de Google: entrenamiento, AutoML, Workbench, Pipelines, Model Registry, Endpoints, monitoreo.",
  },
  {
    q: "Una empresa quiere entrenar un modelo sobre datos que ya están en BigQuery, sin moverlos. ¿Qué usa?",
    options: ["BigQuery ML", "Vertex AI sin datos", "Compute Engine + Spark", "Cloud Functions"],
    correct: 0,
    explanation:
      "BigQuery ML permite entrenar modelos directamente con SQL sobre los datos que ya están en BigQuery, sin mover datos.",
  },

  // ============ DOMINIO 3: Modernización de Infraestructura ============
  {
    q: "Una empresa quiere correr un container y solo pagar por las requests que recibe. ¿Qué servicio elige?",
    options: ["Compute Engine", "GKE Standard", "Cloud Run", "App Engine Flex"],
    correct: 2,
    explanation:
      "Cloud Run ejecuta containers serverless: escala a cero cuando no hay tráfico y solo se paga por las requests que se procesan.",
  },
  {
    q: "Una app event-driven simple que reacciona a un upload en Cloud Storage:",
    options: ["GKE", "Cloud Functions", "App Engine Standard", "Compute Engine"],
    correct: 1,
    explanation:
      "Cloud Functions son funciones serverless ideales para arquitecturas event-driven (FaaS). Se disparan por eventos.",
  },
  {
    q: "Una empresa con un equipo experto en Kubernetes quiere correr microservicios en GCP:",
    options: ["Compute Engine", "GKE (Google Kubernetes Engine)", "App Engine", "Cloud Functions"],
    correct: 1,
    explanation: "GKE es Kubernetes administrado, ideal para equipos que dominan k8s y necesitan portabilidad.",
  },
  {
    q: "Una empresa con cargas en on-prem, AWS y GCP que quiere gestionarlas unificadamente:",
    options: ["Solo GKE", "Anthos (plataforma híbrida/multi-cloud)", "Cloud Run", "App Engine"],
    correct: 1,
    explanation:
      "Anthos extiende GKE a on-prem y otras nubes para una experiencia consistente multi-cloud.",
  },
  {
    q: "App Engine Standard es ideal para:",
    options: [
      "Apps web con tráfico variable que necesitan auto-scale a cero",
      "Cargas con GPU intensivas",
      "Sistemas legacy que requieren acceso root",
      "Bases de datos transaccionales",
    ],
    correct: 0,
    explanation:
      "App Engine Standard escala automáticamente desde 0 a miles de instancias. Pagas por uso, sin gestionar servidores.",
  },
  {
    q: "Para una carga que requiere licencia específica de Windows en un servidor físico dedicado:",
    options: ["Compute Engine con sole-tenant nodes", "App Engine Standard", "Cloud Run", "GKE"],
    correct: 0,
    explanation:
      "Sole-tenant nodes ofrecen servidores físicos dedicados (no compartidos) ideales para licencias por hardware o compliance.",
  },
  {
    q: "¿Qué opción tiene MÁS gestión por parte del usuario?",
    options: ["Cloud Run", "App Engine", "Compute Engine", "Cloud Functions"],
    correct: 2,
    explanation:
      "Compute Engine es IaaS: tú gestionas OS, parches, configuración. Cloud Run, App Engine y Cloud Functions son más administrados.",
  },
  {
    q: "Una empresa quiere correr Spark clusters efímeros: levantarlos, procesar, apagarlos:",
    options: ["Dataproc", "Dataflow", "GKE", "Cloud Run"],
    correct: 0,
    explanation:
      "Dataproc puede crear clusters Spark/Hadoop on-demand, ejecutar el job y eliminarlos. Pagas solo por el tiempo de uso.",
  },
  {
    q: "El concepto de 'serverless' significa:",
    options: [
      "No hay servidores en absoluto",
      "El cliente no gestiona servidores; el proveedor escala automáticamente",
      "Es siempre gratis",
      "Solo funciona con HTTP",
    ],
    correct: 1,
    explanation:
      "Serverless no significa 'sin servidores' literalmente. Significa que el proveedor abstrae completamente la gestión de servidores.",
  },

  // ============ DOMINIO 4: Confianza y Seguridad ============
  {
    q: "El modelo de Responsabilidad Compartida en GCP dice que Google es responsable de:",
    options: [
      "TODA la seguridad incluyendo configuración del cliente",
      "La seguridad de la infraestructura (HW, red física, hipervisor)",
      "Solo la seguridad física del datacenter",
      "Nada — el cliente es responsable de todo",
    ],
    correct: 1,
    explanation:
      "Google es responsable de la seguridad DEL cloud (infraestructura, HW, red). El cliente es responsable de la seguridad EN el cloud (configuración, datos, accesos).",
  },
  {
    q: "Para dar permisos granulares a un usuario sobre un proyecto:",
    options: ["VPC", "IAM", "Cloud DNS", "BigQuery ML"],
    correct: 1,
    explanation:
      "IAM (Identity and Access Management) controla 'quién puede hacer qué sobre qué recurso' en GCP.",
  },
  {
    q: "Una empresa quiere encriptar sus datos con llaves QUE ELLA gestiona, no Google:",
    options: ["Encriptación por defecto", "CMEK (Customer-Managed Encryption Keys)", "CSEK", "Sin encriptación"],
    correct: 1,
    explanation:
      "CMEK (Cloud KMS) permite usar llaves que el cliente gestiona, manteniendo el control sobre rotación, acceso y desactivación.",
  },
  {
    q: "El enfoque 'Zero Trust' de Google se llama:",
    options: ["BeyondCorp", "Cloud Armor", "VPC Service Controls", "Cloud Identity"],
    correct: 0,
    explanation:
      "BeyondCorp es la implementación de Zero Trust de Google: nunca confíes basándote solo en la red, siempre verifica identidad y dispositivo.",
  },
  {
    q: "Para almacenar passwords, API keys y otros secretos:",
    options: ["Cloud Storage", "Secret Manager", "Cloud SQL", "Variables de entorno en texto plano"],
    correct: 1,
    explanation:
      "Secret Manager es el servicio dedicado para almacenar y rotar secretos con control de acceso vía IAM.",
  },
  {
    q: "Para proteger una app pública contra DDoS y ataques web:",
    options: ["Cloud CDN", "Cloud Armor (WAF + DDoS protection)", "Cloud DNS", "VPC peering"],
    correct: 1,
    explanation:
      "Cloud Armor ofrece WAF (Web Application Firewall) y protección DDoS para apps expuestas vía Cloud Load Balancing.",
  },
  {
    q: "Para crear perímetros de seguridad que impidan exfiltración de datos:",
    options: ["IAM solo", "VPC Service Controls", "Cloud DNS", "Cloud KMS"],
    correct: 1,
    explanation:
      "VPC Service Controls crea perímetros lógicos alrededor de recursos sensibles (BigQuery, GCS) para mitigar exfiltración.",
  },
  {
    q: "Para gestionar centralmente postura de seguridad y vulnerabilidades en GCP:",
    options: ["Security Command Center", "Cloud Build", "Cloud Run", "Cloud Logging"],
    correct: 0,
    explanation:
      "Security Command Center es el centro unificado para visualizar y gestionar la postura de seguridad y los hallazgos.",
  },
  {
    q: "¿Cuál es la diferencia entre Cloud Identity y Workspace?",
    options: [
      "Son lo mismo",
      "Cloud Identity es solo IdP; Workspace incluye Gmail, Drive, Docs, etc.",
      "Workspace es solo IdP",
      "Cloud Identity es exclusivo de AWS",
    ],
    correct: 1,
    explanation:
      "Cloud Identity es un IdP independiente. Workspace incluye Cloud Identity más todas las apps de productividad de Google.",
  },

  // ============ DOMINIO 5: Operaciones, Escala y Costo ============
  {
    q: "Para centralizar logs de todas tus apps en GCP:",
    options: ["Cloud Logging", "Cloud Storage", "Cloud SQL", "BigQuery"],
    correct: 0,
    explanation:
      "Cloud Logging (parte de Cloud Operations Suite) centraliza logs estructurados y permite búsqueda, alertas y exportación.",
  },
  {
    q: "Para alertar cuando la latencia de tu API supera 500ms:",
    options: ["Cloud Logging", "Cloud Monitoring (con alert policies)", "Cloud Trace", "Cloud Storage"],
    correct: 1,
    explanation:
      "Cloud Monitoring permite definir métricas y alert policies para notificar cuando un umbral se cruza.",
  },
  {
    q: "El SLA es:",
    options: [
      "Lo mismo que SLO",
      "Compromiso contractual con el cliente, con penalización si se incumple",
      "Una métrica interna",
      "Un dashboard",
    ],
    correct: 1,
    explanation:
      "SLA (Service Level Agreement) es un acuerdo formal con el cliente, con penalizaciones si no se cumple. SLO es interno.",
  },
  {
    q: "Una organización quiere reservar capacidad por 3 años a cambio de descuento:",
    options: ["Sustained Use Discount", "Committed Use Discount", "Spot VMs", "Preemptible VMs"],
    correct: 1,
    explanation:
      "Los Committed Use Discounts (CUDs) ofrecen hasta 70% de descuento a cambio de compromiso de uso de 1 o 3 años.",
  },
  {
    q: "VMs muy baratas (hasta 91% off) pero que pueden terminarse en cualquier momento:",
    options: ["Spot VMs", "Standard VMs", "Sole-tenant", "AlloyDB"],
    correct: 0,
    explanation:
      "Spot VMs ofrecen el mayor descuento pero GCP puede recuperarlas cuando necesite capacidad. Ideales para cargas tolerantes a interrupciones.",
  },
  {
    q: "Para evitar gastar más de lo planeado en GCP:",
    options: [
      "Configurar Budgets y Alerts en Cloud Billing",
      "Apagar todo manualmente cada noche",
      "Solicitar reembolsos después",
      "No hay forma de controlar el gasto",
    ],
    correct: 0,
    explanation:
      "Cloud Billing permite definir presupuestos y alertas por porcentaje gastado, e incluso disparar acciones automáticas (con Cloud Functions).",
  },
  {
    q: "La jerarquía correcta de recursos en GCP es:",
    options: [
      "Project > Folder > Organization",
      "Organization > Folders > Projects > Resources",
      "Resources > Projects > Organization",
      "Folder > Project > Organization > Resources",
    ],
    correct: 1,
    explanation:
      "La jerarquía es: Organization (nodo raíz) → Folders → Projects → Resources. Las políticas se heredan hacia abajo.",
  },
  {
    q: "Para limitar a la organización a usar solo regiones europeas:",
    options: ["Quotas", "Organization Policy con restricciones de location", "IAM", "VPC"],
    correct: 1,
    explanation:
      "Organization Policies imponen restricciones a nivel organización, ej. limitar regiones permitidas (data residency).",
  },
  {
    q: "Para mover petabytes desde un datacenter on-prem a GCS:",
    options: [
      "Storage Transfer Service por internet siempre",
      "Transfer Appliance (dispositivo físico) o Cloud Interconnect dedicado",
      "Copiar manualmente por FTP",
      "Cloud Functions",
    ],
    correct: 1,
    explanation:
      "Para volúmenes muy grandes, Transfer Appliance es un dispositivo físico que envías a Google. Para flujos continuos, Cloud Interconnect.",
  },
  {
    q: "Para migrar continuamente una BD on-prem a Cloud SQL con mínima interrupción:",
    options: ["Migrate for Compute Engine", "Database Migration Service", "Cloud Functions", "Cloud Run"],
    correct: 1,
    explanation:
      "Database Migration Service (DMS) hace migraciones continuas (CDC) de BDs hacia Cloud SQL y AlloyDB.",
  },
  {
    q: "Para tener un soporte 24/7 con Technical Account Manager:",
    options: ["Basic", "Standard", "Enhanced", "Premium"],
    correct: 3,
    explanation:
      "Premium Support incluye TAM dedicado, 24/7 con SLAs estrictos, recomendado para cargas críticas enterprise.",
  },
  {
    q: "Para una empresa que recién empieza a evaluar GCP sin compromiso:",
    options: ["Premium Support", "Enhanced", "Standard", "Basic + free tier"],
    correct: 3,
    explanation:
      "Basic Support (gratis) + el free tier permite explorar GCP sin costo. Se actualiza el plan cuando se necesite soporte profesional.",
  },
  {
    q: "Para un equipo SRE, la métrica de fiabilidad medida se llama:",
    options: ["SLO", "SLI", "SLA", "MTTR"],
    correct: 1,
    explanation:
      "SLI (Service Level Indicator) es lo que se mide (ej. latencia, error rate). SLO es el objetivo basado en SLIs.",
  },
  {
    q: "Tu BD principal está al 85% de CPU. ¿Primera acción?",
    options: [
      "Migrar a otra nube",
      "Revisar Cloud Monitoring para entender el patrón y considerar escalar verticalmente o leer réplicas",
      "Apagar la BD",
      "Borrar logs",
    ],
    correct: 1,
    explanation:
      "Antes de actuar, investiga la causa con Cloud Monitoring. Luego escala (vertical, read replicas, caching) o optimiza queries.",
  },
];
