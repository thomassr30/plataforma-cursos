import type { ModuleData } from "@/types/course";

export const m1: ModuleData = {
  slug: "m1",
  number: 1,
  title: "Fundamentos del Cloud Computing y Google Cloud",
  icon: "☁️",
  intro:
    "Dominar los fundamentos es la diferencia entre 'haber oído de la nube' y entender realmente cómo funciona. Aquí veremos definiciones formales, casos de uso reales, cuándo elegir cada modelo, las características diferenciales de Google Cloud y cómo está estructurada su infraestructura global.",
  totalActivities: 4,
  blocks: [
    // ============================================
    // SECCIÓN 1: Definición de Cloud Computing
    // ============================================
    { kind: "h3", text: "📖 1. ¿Qué es el Cloud Computing? (Definición formal)" },
    {
      kind: "info",
      html:
        "<strong>Definición NIST (estándar de la industria):</strong><br/><br/>" +
        "El cloud computing es un <strong>modelo</strong> que permite el acceso ubicuo, conveniente y bajo demanda a través de la red a un <strong>pool compartido de recursos computacionales configurables</strong> (redes, servidores, almacenamiento, aplicaciones, servicios) que pueden ser rápidamente <strong>aprovisionados y liberados</strong> con mínimo esfuerzo de gestión o interacción con el proveedor.",
    },
    { kind: "h4", text: "Las 5 características esenciales del cloud (NIST)" },
    {
      kind: "table",
      headers: ["Característica", "Significado real"],
      rows: [
        ["On-demand self-service", "Provisionas recursos cuando quieras, sin esperar aprobaciones humanas"],
        ["Broad network access", "Accedes desde cualquier dispositivo a través de la red"],
        ["Resource pooling", "Los recursos físicos se comparten entre múltiples clientes (multi-tenancy)"],
        ["Rapid elasticity", "Escalas hacia arriba o abajo en minutos o segundos, según demanda"],
        ["Measured service", "Pagas exactamente por lo que consumes; todo se mide"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 ¿Por qué importa esto?</strong> En el examen pueden preguntarte qué características hacen 'cloud' a un servicio. Una infraestructura on-premise virtualizada NO es cloud si te falta self-service o pago-por-uso. Estas 5 características son el ADN del cloud.",
    },
    { kind: "h4", text: "¿Qué problemas resuelve el cloud?" },
    {
      kind: "list",
      items: [
        "<strong>Capacidad sobre-aprovisionada o insuficiente</strong>: ¿Compras servidores para tu pico de Black Friday? El resto del año están vacíos. ¿Compras solo para el promedio? Caes en el pico.",
        "<strong>Time to market lento</strong>: pedir un servidor on-prem puede tomar semanas. En cloud, minutos.",
        "<strong>CapEx alto</strong>: comprar hardware requiere capital. Cloud convierte ese gasto en operacional (OpEx).",
        "<strong>Mantenimiento</strong>: parches, hardware, datacenter… son trabajo invisible. El cloud delega esto al proveedor.",
        "<strong>Innovación lenta</strong>: experimentar con ML, GPUs, BD globales en on-prem es carísimo. En cloud, es un click.",
      ],
    },

    // ============================================
    // SECCIÓN 2: IaaS — Definición completa
    // ============================================
    { kind: "h3", text: "🏗️ 2. IaaS — Infrastructure as a Service" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> IaaS es un modelo en el que el proveedor cloud te entrega los <strong>bloques fundamentales de infraestructura virtualizada</strong> — máquinas virtuales (VMs), almacenamiento por bloques, redes virtuales, balanceadores — y tú gestionas todo lo de arriba: el sistema operativo, los parches, el runtime, las aplicaciones y los datos.",
    },
    { kind: "h4", text: "¿Qué incluye típicamente IaaS?" },
    {
      kind: "list",
      items: [
        "<strong>Compute virtualizado</strong>: VMs con diferentes tamaños de CPU/RAM",
        "<strong>Storage</strong>: discos persistentes, almacenamiento de objetos",
        "<strong>Networking</strong>: redes virtuales (VPC), firewalls, IPs públicas",
        "<strong>Identidad</strong>: gestión de cuentas y permisos básicos",
      ],
    },
    { kind: "h4", text: "¿Quién gestiona qué? (modelo capas)" },
    {
      kind: "table",
      headers: ["Capa", "On-prem", "IaaS", "PaaS", "SaaS"],
      rows: [
        ["Aplicaciones", "Cliente", "Cliente", "Cliente", "Proveedor"],
        ["Datos", "Cliente", "Cliente", "Cliente", "Proveedor"],
        ["Runtime", "Cliente", "Cliente", "Proveedor", "Proveedor"],
        ["Middleware", "Cliente", "Cliente", "Proveedor", "Proveedor"],
        ["Sistema Operativo", "Cliente", "Cliente", "Proveedor", "Proveedor"],
        ["Virtualización", "Cliente", "Proveedor", "Proveedor", "Proveedor"],
        ["Servidores", "Cliente", "Proveedor", "Proveedor", "Proveedor"],
        ["Storage físico", "Cliente", "Proveedor", "Proveedor", "Proveedor"],
        ["Red física", "Cliente", "Proveedor", "Proveedor", "Proveedor"],
      ],
    },
    { kind: "h4", text: "Casos de uso REALES de IaaS" },
    {
      kind: "list",
      items: [
        "<strong>Migrar (lift & shift) aplicaciones legacy</strong> que esperan un OS específico (Windows con licencia, Linux Red Hat)",
        "<strong>Cargas con requisitos especiales</strong>: necesitas GPU para ML, kernel personalizado, software propietario",
        "<strong>Cumplir compliance</strong> que exige instancia dedicada (sole-tenant nodes)",
        "<strong>Entornos de desarrollo</strong> donde el dev necesita acceso root",
        "<strong>Bases de datos auto-administradas</strong> (cuando no quieres usar el servicio gestionado)",
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo SÍ usar IaaS:</strong><br/>" +
        "• Cuando necesitas <strong>control granular</strong> del sistema operativo o stack<br/>" +
        "• Cuando migras <strong>software heredado</strong> que no puede correr en PaaS<br/>" +
        "• Cuando tienes <strong>licencias específicas por hardware</strong><br/>" +
        "• Cuando necesitas <strong>GPUs/TPUs</strong> o configuraciones especiales",
    },
    {
      kind: "tip",
      html:
        "<strong>❌ Cuándo NO usar IaaS:</strong><br/>" +
        "• Si tu app es web/API estándar (mejor PaaS)<br/>" +
        "• Si no quieres parchear el OS ni gestionar escalado manualmente<br/>" +
        "• Si tu carga es event-driven simple (mejor Cloud Functions)",
    },
    { kind: "h4", text: "Ejemplo de IaaS en Google Cloud" },
    {
      kind: "paragraph",
      html:
        "<strong>Compute Engine</strong> es el IaaS de GCP. Puedes elegir tipos de máquina (general, optimized for compute, memory, GPU), discos (SSD/HDD/Local SSD), redes y firewall. Cobro por segundo de uso. También existen <strong>Sole-Tenant Nodes</strong> (servidor físico dedicado para licencias o compliance) y <strong>Spot VMs</strong> (hasta 91% off, pueden terminarse).",
    },

    // ============================================
    // SECCIÓN 3: PaaS
    // ============================================
    { kind: "h3", text: "🛠️ 3. PaaS — Platform as a Service" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> PaaS es un modelo en el que el proveedor gestiona la <strong>infraestructura subyacente Y el runtime/plataforma</strong> (sistema operativo, web server, middleware, escalado). Tú solo subes tu <strong>código</strong> y los datos. Te abstrae completamente del 'cómo se corre' y te deja enfocado en construir la aplicación.",
    },
    { kind: "h4", text: "Características de PaaS" },
    {
      kind: "list",
      items: [
        "<strong>Sin gestión de OS</strong>: el proveedor parchea, actualiza, mantiene",
        "<strong>Auto-escalado</strong>: la plataforma decide cuándo crear más instancias",
        "<strong>Stack pre-configurado</strong>: lenguajes, runtimes y librerías listos",
        "<strong>Integraciones</strong>: BD, mensajería, monitoreo vienen integrados",
        "<strong>Despliegue simplificado</strong>: <code>gcloud app deploy</code> y listo",
      ],
    },
    { kind: "h4", text: "Casos de uso REALES de PaaS" },
    {
      kind: "list",
      items: [
        "<strong>Apps web tradicionales</strong>: e-commerce, blogs, dashboards",
        "<strong>APIs REST/GraphQL</strong> con tráfico variable",
        "<strong>Backends móviles</strong>",
        "<strong>Microservicios</strong> en containers (Cloud Run)",
        "<strong>Equipos pequeños</strong> que no tienen un SRE dedicado",
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo SÍ usar PaaS:</strong><br/>" +
        "• App web/API que se ajusta a runtimes estándar (Python, Node, Java, Go, .NET)<br/>" +
        "• Quieres <strong>velocidad de despliegue</strong> y mínima gestión<br/>" +
        "• Tráfico variable que necesita <strong>auto-scaling</strong><br/>" +
        "• Pequeño/mediano equipo sin ops dedicado",
    },
    {
      kind: "tip",
      html:
        "<strong>❌ Cuándo NO usar PaaS:</strong><br/>" +
        "• Si necesitas instalar software no estándar a nivel OS<br/>" +
        "• Si tu carga requiere GPU/TPU especiales<br/>" +
        "• Si tu app está <strong>fuertemente acoplada</strong> al filesystem local (PaaS suele ser stateless)<br/>" +
        "• Si tu lenguaje/runtime no está soportado",
    },
    { kind: "h4", text: "Ejemplos de PaaS en Google Cloud" },
    {
      kind: "table",
      headers: ["Servicio", "Ideal para"],
      rows: [
        ["App Engine Standard", "Apps web tradicionales con escala a cero"],
        ["Cloud Run", "Containers HTTP/gRPC con pay-per-request"],
        ["Cloud Functions", "Funciones event-driven (FaaS)"],
        ["Cloud SQL", "BD relacional gestionada (es Database PaaS)"],
        ["Firebase Hosting", "Frontend estático con CDN global"],
      ],
    },

    // ============================================
    // SECCIÓN 4: SaaS
    // ============================================
    { kind: "h3", text: "🎁 4. SaaS — Software as a Service" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> SaaS es software <strong>completo y funcionando</strong> que consumes vía navegador o API. No gestionas nada — ni hardware, ni OS, ni la aplicación. Solo te creas una cuenta, configuras y usas. Pagas por usuario/mes o por uso.",
    },
    { kind: "h4", text: "Características de SaaS" },
    {
      kind: "list",
      items: [
        "<strong>Acceso multi-dispositivo</strong> (web, móvil, APIs)",
        "<strong>Multi-tenancy</strong>: muchos clientes comparten la infraestructura",
        "<strong>Updates automáticos</strong>: el proveedor lanza nuevas versiones",
        "<strong>Modelo de suscripción</strong>: pago recurrente, no licencia perpetua",
      ],
    },
    { kind: "h4", text: "Ejemplos populares de SaaS" },
    {
      kind: "vocab",
      items: [
        { word: "Google Workspace", meaning: "Gmail, Drive, Docs, Meet" },
        { word: "Microsoft 365", meaning: "Outlook, Word, Excel, Teams" },
        { word: "Salesforce", meaning: "CRM" },
        { word: "HubSpot", meaning: "Marketing y ventas" },
        { word: "Slack", meaning: "Mensajería corporativa" },
        { word: "Dropbox", meaning: "Almacenamiento personal" },
        { word: "Zoom", meaning: "Videoconferencias" },
        { word: "Atlassian Jira", meaning: "Gestión de proyectos" },
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo SÍ usar SaaS:</strong><br/>" +
        "• El problema ya está resuelto por el mercado (email, CRM, ERP)<br/>" +
        "• Quieres <strong>cero gestión técnica</strong><br/>" +
        "• Buscas <strong>time-to-value</strong> inmediato",
    },

    // ============================================
    // SECCIÓN 5: Comparación práctica
    // ============================================
    { kind: "h3", text: "⚖️ 5. La analogía de la pizza (clásica)" },
    {
      kind: "table",
      headers: ["Modelo", "Analogía", "Tú haces", "Otros hacen"],
      rows: [
        ["On-prem", "Pizza hecha en casa", "Comprar ingredientes, cocinar, lavar platos", "Nada"],
        ["IaaS", "Pizza para llevar", "Calentar el horno, cocinar la pizza", "Te dan masa y salsa"],
        ["PaaS", "Pizza a domicilio", "Solo comerla en tu mesa", "La cocinan y la traen"],
        ["SaaS", "Comer fuera (restaurante)", "Solo elegir y pagar", "Todo lo demás"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Regla del examen:</strong> Si la pregunta dice <em>'necesita el menor esfuerzo operativo'</em> → mira a SaaS o PaaS. Si dice <em>'necesita acceso al OS o control granular'</em> → IaaS.",
    },

    // ============================================
    // SECCIÓN 6: Modelos de despliegue (deployment models)
    // ============================================
    { kind: "h3", text: "🌐 6. Modelos de despliegue: Public, Private, Hybrid, Multi-cloud" },
    {
      kind: "table",
      headers: ["Modelo", "Descripción", "Caso típico"],
      rows: [
        [
          "Public Cloud",
          "Infraestructura del proveedor, compartida (multi-tenant). Pago por uso.",
          "Startups, e-commerce, SaaS, casi cualquier nueva app",
        ],
        [
          "Private Cloud",
          "Infra dedicada a una sola organización (en su DC o un DC del proveedor).",
          "Gobierno, banca con compliance estricta",
        ],
        [
          "Hybrid Cloud",
          "Mezcla on-prem + cloud público, conectados.",
          "Empresas en transición, cargas sensibles on-prem + procesamiento en cloud",
        ],
        [
          "Multi-cloud",
          "Usar varios proveedores cloud simultáneamente (GCP + AWS).",
          "Evitar vendor lock-in, redundancia, optimizar costos por servicio",
        ],
      ],
    },
    {
      kind: "info",
      html:
        "<strong>💡 En Google Cloud:</strong> el servicio para gestionar consistentemente cargas en on-prem + GCP + otras nubes se llama <strong>Anthos</strong>. Es la apuesta de Google para escenarios híbridos y multi-cloud.",
    },

    // ============================================
    // SECCIÓN 7: Beneficios económicos y operativos
    // ============================================
    { kind: "h3", text: "💰 7. CapEx vs OpEx en detalle" },
    {
      kind: "info",
      html:
        "<strong>CapEx (Capital Expenditure):</strong> dinero gastado en <strong>activos</strong> (servidores, datacenters, hardware de red). Se deprecia con los años. Requiere planeación y aprobación de capital. Si la inversión sale mal, el activo igual debe pagarse.",
    },
    {
      kind: "info",
      html:
        "<strong>OpEx (Operational Expenditure):</strong> gasto <strong>operativo recurrente</strong> (mensual, basado en uso). El cloud convierte CapEx en OpEx. Esto cambia la conversación con el CFO: 'no inviertas $10M en servidores, paga $200K/mes y escala según ingresos'.",
    },
    {
      kind: "table",
      headers: ["Aspecto", "CapEx (on-prem)", "OpEx (cloud)"],
      rows: [
        ["Pago", "Adelantado, grande", "Mensual, escalado"],
        ["Riesgo", "Quedas atado al activo", "Cancelas cuando quieras"],
        ["Tiempo a producir", "Semanas/meses", "Minutos"],
        ["Aprobación financiera", "Comité, lenta", "Tarjeta de crédito si se quiere"],
        ["Predictibilidad", "Alta (sabes lo que pagaste)", "Variable según uso (puede sorprender)"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>⚠️ Cuidado:</strong> el OpEx variable también es riesgo si no controlas costos. Por eso GCP ofrece <strong>Budgets, Alerts y Recommender</strong> (lo veremos en el Módulo 10).",
    },

    // ============================================
    // SECCIÓN 8: Estructura de Google Cloud
    // ============================================
    { kind: "h3", text: "🗺️ 8. Estructura global de Google Cloud" },
    {
      kind: "table",
      headers: ["Concepto", "Definición"],
      rows: [
        ["Región", "Área geográfica con varias zonas (ej. us-central1, europe-west1, southamerica-east1)"],
        ["Zona", "Datacenter dentro de una región. Cada región tiene 3+ zonas independientes (us-central1-a, b, c)"],
        ["Multi-region", "Configuración que replica datos entre varias regiones (ej. para BigQuery, GCS multi-region)"],
        ["Edge / PoP", "Puntos de presencia globales para CDN y baja latencia"],
        ["Network", "Una de las redes privadas más grandes del mundo, fibra propia entre datacenters"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Importante para examen:</strong><br/>" +
        "• Las <strong>zonas</strong> son independientes (HW, energía, red) dentro de la región → alta disponibilidad<br/>" +
        "• Las <strong>regiones</strong> aíslan grandes desastres (huracanes, terremotos)<br/>" +
        "• Para apps críticas: despliega en <strong>varias zonas</strong> (zonal redundancy)<br/>" +
        "• Para apps globales: despliega en <strong>varias regiones</strong> (geo redundancy)",
    },

    // ============================================
    // SECCIÓN 9: Por qué Google Cloud específicamente
    // ============================================
    { kind: "h3", text: "🏆 9. ¿Por qué Google Cloud? Diferenciadores reales" },
    {
      kind: "list",
      items: [
        "<strong>Misma infra que Google.com, YouTube, Gmail</strong>: probada a escala planetaria",
        "<strong>Red privada global</strong>: una de las más grandes del mundo, fibra propia, baja latencia entre regiones",
        "<strong>Sustentabilidad</strong>: carbono-neutral desde 2007, objetivo de 100% energía libre de carbono 24/7 para 2030",
        "<strong>Liderazgo en datos e IA</strong>: BigQuery (data warehouse petabyte-scale), Vertex AI, modelos Gemini, TensorFlow",
        "<strong>Open source friendly</strong>: Kubernetes, TensorFlow, Apache Beam, Go nacieron en Google",
        "<strong>Pricing transparente</strong>: descuentos automáticos (Sustained Use Discounts), sin compromiso obligatorio para descuentos básicos",
        "<strong>Confidential Computing</strong>: encriptación incluso en uso (RAM)",
        "<strong>Anthos</strong>: gestión consistente híbrida y multi-cloud",
      ],
    },
    {
      kind: "info",
      html:
        "<strong>💡 Caso real:</strong> Spotify migró desde on-prem a Google Cloud para aprovechar BigQuery (analytics de toda su música) y Dataflow (procesamiento de eventos). Twitter usa GCP para data warehouse. Snap (Snapchat) corre en GCP. PayPal usa Google Cloud para innovación en pagos.",
    },

    // ============================================
    // SECCIÓN 10: Términos para el examen
    // ============================================
    { kind: "h3", text: "🎯 10. Términos que SIEMPRE aparecen en el examen" },
    {
      kind: "table",
      headers: ["Término", "Definición rápida"],
      rows: [
        ["Multi-tenancy", "Múltiples clientes comparten la misma infraestructura física"],
        ["Single-tenancy", "Infra dedicada a un solo cliente (caro pero más control)"],
        ["Elasticidad", "Capacidad de escalar arriba/abajo automáticamente"],
        ["Resiliencia", "Capacidad de recuperarse de fallos sin downtime"],
        ["Latencia", "Tiempo entre request y respuesta"],
        ["Throughput", "Cantidad de operaciones por segundo"],
        ["Time-to-value", "Tiempo desde la decisión hasta producir valor"],
        ["Vendor lock-in", "Quedar atado a un proveedor (multi-cloud mitiga esto)"],
        ["TCO (Total Cost of Ownership)", "Costo total a lo largo del ciclo de vida"],
        ["SLA / SLO / SLI", "Compromiso / objetivo / indicador de fiabilidad"],
      ],
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m1_matching_models",
      pairs: [
        { en: "IaaS", es: "Infraestructura virtualizada (Compute Engine)" },
        { en: "PaaS", es: "Plataforma con runtime gestionado (App Engine, Cloud Run)" },
        { en: "SaaS", es: "Software listo (Workspace, Salesforce)" },
        { en: "FaaS", es: "Function as a Service (Cloud Functions)" },
        { en: "DBaaS", es: "Database as a Service (Cloud SQL, Spanner)" },
        { en: "CaaS", es: "Container as a Service (Cloud Run, GKE)" },
      ],
    },
    {
      kind: "matching",
      key: "m1_matching_deployment",
      pairs: [
        { en: "Public Cloud", es: "Multi-tenant en proveedor externo" },
        { en: "Private Cloud", es: "Dedicada para una sola organización" },
        { en: "Hybrid Cloud", es: "On-prem + cloud público" },
        { en: "Multi-cloud", es: "Varios proveedores cloud simultáneamente" },
        { en: "Edge Computing", es: "Procesamiento cerca del usuario final" },
        { en: "Multi-region", es: "Datos replicados entre regiones" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m1_fill",
      items: [
        { text: "Compute Engine es ___ (modelo en 4 letras).", answer: "IaaS", es: "IaaS" },
        { text: "Cloud Run y App Engine son ___ .", answer: "PaaS", es: "PaaS" },
        { text: "Gmail es ejemplo de ___ .", answer: "SaaS", es: "SaaS" },
        { text: "El cloud convierte CapEx en ___.", answer: "OpEx", es: "OpEx" },
        { text: "La plataforma híbrida y multi-cloud de Google es ___.", answer: "Anthos", es: "Anthos" },
        { text: "Cada región de GCP tiene como mínimo ___ zonas.", answer: "3", es: "3" },
      ],
    },

    // ============================================
    // QUIZ FINAL DEL MÓDULO
    // ============================================
    {
      kind: "quiz",
      key: "m1_quiz",
      questions: [
        {
          q: "Según NIST, ¿cuál de estas NO es una característica esencial del cloud?",
          options: ["On-demand self-service", "Multi-tenant físico obligatorio", "Rapid elasticity", "Measured service"],
          correct: 1,
          explanation:
            "Las 5 características NIST son: on-demand self-service, broad network access, resource pooling, rapid elasticity y measured service. 'Multi-tenant físico obligatorio' no está en la lista (aunque sí existe multi-tenancy en muchos servicios cloud).",
        },
        {
          q: "Una empresa quiere migrar su software legacy de Windows con licencia específica POR HARDWARE. ¿Qué modelo usar?",
          options: ["SaaS", "PaaS", "IaaS con Sole-tenant Nodes", "Cloud Functions"],
          correct: 2,
          explanation:
            "Si la licencia exige hardware dedicado (no compartido), necesitas Sole-Tenant Nodes en Compute Engine (IaaS). PaaS y SaaS comparten infraestructura.",
        },
        {
          q: "¿Cuál es la principal ventaja FINANCIERA del cloud?",
          options: [
            "Eliminar TODO costo",
            "Convertir CapEx (inversión de capital) en OpEx (gasto operativo)",
            "Pagar lo mismo todos los meses",
            "Tener servidores propios virtualizados",
          ],
          correct: 1,
          explanation:
            "El cloud convierte la inversión inicial (CapEx) en pago variable mensual (OpEx). Esto mejora cash flow, reduce riesgo de capital y permite escalar según ingresos reales.",
        },
        {
          q: "Una app pequeña con tráfico esporádico y nadie quiere gestionar servidores. ¿Modelo?",
          options: ["IaaS", "PaaS (App Engine, Cloud Run)", "Sole-tenant", "Bare metal"],
          correct: 1,
          explanation:
            "PaaS abstrae el OS y escalado. App Engine Standard o Cloud Run escalan a cero, perfectos para tráfico variable sin gestión operativa.",
        },
        {
          q: "Una zona de GCP es:",
          options: [
            "Una región entera",
            "Un datacenter independiente dentro de una región",
            "Un país",
            "Un continente",
          ],
          correct: 1,
          explanation:
            "Una zona es un datacenter independiente (energía, HW, red) dentro de una región. Cada región tiene 3+ zonas para alta disponibilidad.",
        },
        {
          q: "Para máxima alta disponibilidad de una app crítica, lo recomendado es:",
          options: [
            "Una sola zona",
            "Múltiples zonas dentro de UNA región",
            "Múltiples regiones",
            "Solo on-prem",
          ],
          correct: 2,
          explanation:
            "Multi-region da la mayor disponibilidad (sobrevive a desastres regionales). Multi-zone es buena pero solo sobrevive a fallos de zona. Single-zone es el mínimo.",
        },
        {
          q: "Hybrid cloud es:",
          options: [
            "Usar dos proveedores cloud",
            "On-prem + cloud público integrados",
            "Solo cloud privado",
            "Solo cloud público en dos regiones",
          ],
          correct: 1,
          explanation:
            "Hybrid combina on-prem y cloud público trabajando juntos. Usar dos proveedores cloud distintos se llama multi-cloud.",
        },
        {
          q: "¿Cuál es la apuesta de Google Cloud para gestión consistente híbrida y multi-cloud?",
          options: ["Compute Engine", "Anthos", "Cloud Run", "Cloud Functions"],
          correct: 1,
          explanation:
            "Anthos permite gestionar workloads Kubernetes consistentemente en GCP, on-prem y otras nubes (AWS, Azure).",
        },
        {
          q: "El objetivo de sustentabilidad de Google Cloud para 2030 es:",
          options: [
            "Carbono-neutral",
            "100% energía libre de carbono 24/7",
            "Reducir 50% emisiones",
            "Plantar 1M de árboles",
          ],
          correct: 1,
          explanation:
            "Google es carbono-neutral desde 2007. Su objetivo para 2030 es operar con 100% energía libre de carbono 24/7 (no solo netear emisiones).",
        },
        {
          q: "Salesforce es ejemplo de:",
          options: ["IaaS", "PaaS", "SaaS", "FaaS"],
          correct: 2,
          explanation:
            "Salesforce es SaaS: software de CRM listo para usar vía web, sin gestionar nada de la infraestructura.",
        },
        {
          q: "Una característica del cloud es 'measured service'. ¿Qué significa?",
          options: [
            "Te miden la velocidad de internet",
            "Te facturan por uso, todo se mide",
            "Solo pagas suscripción fija",
            "El proveedor mide tu satisfacción",
          ],
          correct: 1,
          explanation:
            "Measured service = tu uso se mide y se factura. Pagas exactamente por los recursos consumidos (segundos, GB, requests, etc.).",
        },
        {
          q: "Una empresa quiere salir de un solo proveedor cloud para reducir dependencia. ¿Estrategia?",
          options: ["Solo on-prem", "Single cloud", "Multi-cloud", "Private cloud"],
          correct: 2,
          explanation:
            "Multi-cloud reduce vendor lock-in usando varios proveedores. Anthos de Google facilita esta estrategia para cargas Kubernetes.",
        },
      ],
    },
  ],
};
