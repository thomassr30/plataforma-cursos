import type { ModuleData } from "@/types/course";

export const m10: ModuleData = {
  slug: "m10",
  number: 10,
  title: "Costos, Pricing, Billing y Soporte",
  icon: "💰",
  intro:
    "Una de las áreas que MÁS aparece en el examen es entender cómo se factura en GCP, cómo optimizar costos y qué nivel de soporte conviene. Aquí dominarás todo: jerarquía, descuentos, billing, presupuestos, support tiers y sustentabilidad.",
  totalActivities: 3,
  blocks: [
    // ============================================
    // SECCIÓN 1: Jerarquía de Recursos
    // ============================================
    { kind: "h3", text: "🏛️ 1. Jerarquía de Recursos en GCP" },
    {
      kind: "info",
      html:
        "<strong>Orden jerárquico de arriba a abajo:</strong><br/><br/>" +
        "🏢 <strong>Organization</strong> (raíz)<br/>" +
        "&nbsp;&nbsp;&nbsp;└── 📁 <strong>Folders</strong> (opcionales, pueden anidarse)<br/>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📦 <strong>Projects</strong> (donde viven los recursos)<br/>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 🖥️ <strong>Resources</strong> (VMs, BDs, buckets, etc.)",
    },
    { kind: "h4", text: "Detalles de cada nivel" },
    {
      kind: "list",
      items: [
        "<strong>Organization</strong>: el nodo raíz, asociado a un dominio (ej. miempresa.com)",
        "<strong>Folders</strong>: para organizar por departamento, ambiente (dev/prod), etc.",
        "<strong>Projects</strong>: contenedor de TODOS los recursos. Cada proyecto tiene su propio billing, IAM, APIs habilitadas",
        "<strong>Resources</strong>: VMs, BDs, buckets, etc.",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Herencia de IAM y políticas:</strong> las policies se <strong>heredan</strong> hacia abajo. Una policy en Organization aplica a TODOS los folders/projects/resources. Una en Folder aplica a todo lo que está debajo. Útil para governance.",
    },

    // ============================================
    // SECCIÓN 2: Modelos de pricing
    // ============================================
    { kind: "h3", text: "💵 2. Modelos de Pricing" },
    { kind: "h4", text: "Pay-as-you-go (uso a demanda)" },
    {
      kind: "paragraph",
      html:
        "El modelo por defecto. Pagas por <strong>segundo</strong> de uso (sí, segundos, no horas). Sin compromiso. Sin descuento.",
    },
    { kind: "h4", text: "Sustained Use Discounts (SUDs)" },
    {
      kind: "info",
      html:
        "<strong>Descuento AUTOMÁTICO</strong> en Compute Engine cuando una VM corre más del 25% del mes. Hasta <strong>30% off</strong> sin acción del cliente.",
    },
    { kind: "h4", text: "Committed Use Discounts (CUDs)" },
    {
      kind: "info",
      html:
        "<strong>Compromiso de 1 o 3 años</strong> a cambio de descuento. Tipos:<br/>" +
        "• <strong>Resource-based CUDs</strong>: comprometés vCPUs/memoria específicos (hasta 70% off)<br/>" +
        "• <strong>Spend-based CUDs</strong>: comprometés gasto en $/hora (más flexible)",
    },
    { kind: "h4", text: "Spot VMs (antes Preemptible)" },
    {
      kind: "info",
      html:
        "VMs hasta <strong>91% más baratas</strong> que estándar. GCP puede terminarlas con 30s de aviso si necesita capacidad. Sin tiempo máximo (Preemptible tenía 24h). Ideales para batch tolerante a interrupciones.",
    },
    { kind: "h4", text: "Free Tier" },
    {
      kind: "list",
      items: [
        "<strong>$300 USD de crédito</strong> al registrarte (90 días)",
        "<strong>Always Free</strong>: algunos servicios tienen tier gratuito permanente (Cloud Run 2M requests/mes, GCS 5GB, BigQuery 1TB de queries/mes, etc.)",
      ],
    },
    {
      kind: "table",
      headers: ["Descuento", "Cómo", "Caso típico"],
      rows: [
        ["SUDs", "Automático por uso >25% del mes", "Cargas que corren la mayor parte del mes"],
        ["CUDs 1-3 años", "Compromiso de uso, hasta 70% off", "Cargas estables y predecibles"],
        ["Spot VMs", "Hasta 91% off, terminables", "Batch, workloads fault-tolerant"],
        ["Free Tier", "Crédito inicial + Always Free", "Pruebas, proyectos pequeños"],
      ],
    },

    // ============================================
    // SECCIÓN 3: Cloud Billing
    // ============================================
    { kind: "h3", text: "📊 3. Cloud Billing" },
    {
      kind: "list",
      items: [
        "<strong>Billing accounts</strong> agrupan proyectos para facturación",
        "<strong>Cost Reports</strong> con filtros por proyecto, servicio, label, región",
        "<strong>Budgets & Alerts</strong>: notificaciones automáticas a 50%/90%/100% del presupuesto",
        "<strong>Export a BigQuery</strong>: analizar billing en detalle con SQL",
        "<strong>Recommender</strong>: Google sugiere optimizaciones (right-sizing, idle resources, CUDs)",
        "<strong>Active Assist</strong>: recomendaciones proactivas",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Para evitar facturas sorpresa:</strong><br/>" +
        "1. Configura <strong>Budgets & Alerts</strong> al crear el proyecto<br/>" +
        "2. Activa alertas a 50%, 75%, 90%<br/>" +
        "3. Usa <strong>Quotas</strong> para limitar recursos<br/>" +
        "4. Revisa <strong>Recommender</strong> semanalmente",
    },

    // ============================================
    // SECCIÓN 4: Quotas y Organization Policies
    // ============================================
    { kind: "h3", text: "🛂 4. Quotas y Organization Policies" },
    { kind: "h4", text: "Quotas" },
    {
      kind: "paragraph",
      html:
        "<strong>Quotas</strong> son límites de recursos por proyecto/región/servicio. Hay dos tipos: <strong>rate quotas</strong> (requests por minuto) y <strong>allocation quotas</strong> (cantidad total).",
    },
    { kind: "h4", text: "Organization Policies" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Org Policies imponen restricciones a nivel <strong>organización</strong> (heredables). Ejemplos típicos en el examen:",
    },
    {
      kind: "list",
      items: [
        "Restringir regiones permitidas (compliance, data residency)",
        "Bloquear IPs públicas en VMs",
        "Restringir tipos de máquina permitidos",
        "Forzar VPC Service Controls",
        "Bloquear creación de service accounts externas",
      ],
    },

    // ============================================
    // SECCIÓN 5: Soporte
    // ============================================
    { kind: "h3", text: "🆘 5. Niveles de Google Cloud Customer Care" },
    {
      kind: "table",
      headers: ["Plan", "SLA", "Características", "Cuándo"],
      rows: [
        ["Basic", "—", "Docs, comunidad, billing support. GRATIS.", "Pruebas, dev"],
        ["Standard", "Horario laboral", "Casos no críticos, P3/P4", "Cargas no críticas"],
        ["Enhanced", "24/7, 1h respuesta P1", "Casos críticos, soporte técnico", "Producción crítica"],
        ["Premium", "24/7, 15min respuesta P1", "TAM dedicado, soporte arquitectónico", "Enterprise crítico"],
      ],
    },

    // ============================================
    // SECCIÓN 6: Sustentabilidad
    // ============================================
    { kind: "h3", text: "🌿 6. Sustentabilidad" },
    {
      kind: "list",
      items: [
        "<strong>Carbono-neutral desde 2007</strong>",
        "<strong>Match 100% del consumo con energía renovable</strong> desde 2017",
        "<strong>Objetivo 2030</strong>: operar con <strong>100% energía libre de carbono 24/7</strong> (no solo netear)",
        "<strong>Carbon Footprint dashboard</strong>: ver emisiones de tu uso de GCP",
        "<strong>Active Assist</strong>: recomendaciones que ahorran costo Y carbono",
        "Algunas regiones tienen <strong>menor huella de carbono</strong> (ej. Finland, Iowa, Oregon)",
      ],
    },

    // ============================================
    // SECCIÓN 7: Resource hierarchy + IAM en práctica
    // ============================================
    { kind: "h3", text: "🎯 7. Caso práctico: cómo organizar una empresa en GCP" },
    {
      kind: "info",
      html:
        "<strong>Estructura típica recomendada:</strong><br/><br/>" +
        "🏢 Org: miempresa.com<br/>" +
        "&nbsp;&nbsp;📁 Folder: dev<br/>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;📦 Proj: app-frontend-dev<br/>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;📦 Proj: app-backend-dev<br/>" +
        "&nbsp;&nbsp;📁 Folder: staging<br/>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;📦 Proj: app-frontend-stg<br/>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;📦 Proj: app-backend-stg<br/>" +
        "&nbsp;&nbsp;📁 Folder: prod<br/>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;📦 Proj: app-frontend-prod<br/>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;📦 Proj: app-backend-prod<br/>" +
        "&nbsp;&nbsp;📁 Folder: shared (network, security, billing)<br/>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;📦 Proj: shared-vpc<br/>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;📦 Proj: logging-and-monitoring",
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m10_matching",
      pairs: [
        { en: "SUD", es: "Descuento AUTOMÁTICO por uso continuo" },
        { en: "CUD 3 años", es: "Hasta 70% off con compromiso" },
        { en: "Spot VMs", es: "Hasta 91% off, terminables" },
        { en: "Free Tier", es: "$300 + Always Free de algunos servicios" },
        { en: "Org Policy", es: "Restricciones a nivel organización" },
        { en: "Quotas", es: "Límites por proyecto/región" },
        { en: "Premium Support", es: "TAM dedicado, 24/7" },
        { en: "Basic Support", es: "Gratis, docs y comunidad" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m10_fill",
      items: [
        { text: "Descuento por compromiso 3 años: ___", answer: "CUD", es: "CUD" },
        { text: "VMs hasta 91% off: ___ VMs", answer: "Spot", es: "Spot" },
        { text: "Jerarquía: Org → ___ → Projects → Resources", answer: "Folders", es: "Folders" },
        { text: "Plan de soporte con TAM dedicado: ___", answer: "Premium", es: "Premium" },
        { text: "Objetivo 2030: ___% energía libre de carbono 24/7", answer: "100", es: "100" },
      ],
    },

    // ============================================
    // QUIZ FINAL
    // ============================================
    {
      kind: "quiz",
      key: "m10_quiz",
      questions: [
        {
          q: "Una carga 24/7 estable y predecible. ¿Mejor descuento?",
          options: ["Spot VMs", "Committed Use Discount 3 años", "Sustained Use Discount solo", "Sin descuento"],
          correct: 1,
          explanation:
            "CUDs ofrecen hasta 70% off con compromiso 1-3 años. Ideal para cargas conocidas y estables. Spot es para batch tolerante a interrupciones.",
        },
        {
          q: "Workload de batch que tolera interrupciones, quieres ahorro máximo:",
          options: ["Compute Engine standard", "CUD", "Spot VMs (hasta 91% off)", "Sole-tenant"],
          correct: 2,
          explanation:
            "Spot VMs ofrecen hasta 91% off. GCP puede terminarlas con 30s de aviso. Para batch tolerante (procesamiento de datos, render, ML training) es ideal.",
        },
        {
          q: "La jerarquía correcta de recursos es:",
          options: [
            "Project > Folder > Org",
            "Org > Folders > Projects > Resources",
            "Resources > Project > Org",
            "Folder > Org > Project",
          ],
          correct: 1,
          explanation:
            "Organization (raíz) → Folders (opcionales) → Projects → Resources. Las policies IAM se heredan hacia abajo.",
        },
        {
          q: "Una empresa quiere garantizar que solo se usen regiones europeas (data residency):",
          options: [
            "IAM granular",
            "Organization Policy con restricción de location",
            "Quotas",
            "Budgets",
          ],
          correct: 1,
          explanation:
            "Org Policies imponen restricciones a nivel organización (regiones permitidas, no IPs públicas, etc.). Heredadas a todos los folders/projects.",
        },
        {
          q: "Para evitar facturas sorpresa, ¿qué configurar?",
          options: ["Solo Quotas", "Budgets & Alerts en Cloud Billing", "Org Policy", "Cloud Logging"],
          correct: 1,
          explanation:
            "Budgets permiten definir presupuestos y alertas a 50%/75%/90%/100% del gasto. Pueden incluso disparar acciones automáticas vía Pub/Sub.",
        },
        {
          q: "Para soporte 24/7 con SLAs estrictos y TAM dedicado:",
          options: ["Basic", "Standard", "Enhanced", "Premium"],
          correct: 3,
          explanation:
            "Premium incluye TAM (Technical Account Manager) dedicado, soporte arquitectónico, 15 min SLA en P1. Para enterprise crítico.",
        },
        {
          q: "El objetivo de sustentabilidad de Google para 2030 es:",
          options: [
            "Reducir emisiones 50%",
            "Carbono-neutral (ya logrado en 2007)",
            "100% energía libre de carbono 24/7",
            "Plantar 1M árboles",
          ],
          correct: 2,
          explanation:
            "Google ya es carbono-neutral desde 2007 y matchea 100% renovable desde 2017. Su objetivo 2030 es operar con energía libre de carbono 24/7 (no solo netear con compras).",
        },
        {
          q: "Quotas de GCP se usan para:",
          options: [
            "Aplicar descuentos",
            "Limitar recursos por proyecto/región (prevenir errores costosos)",
            "Migrar BDs",
            "Asegurar la red",
          ],
          correct: 1,
          explanation:
            "Quotas limitan cuántos recursos puedes crear (vCPUs por región, requests por minuto, etc.). Sirven para control de costos y multi-tenancy.",
        },
        {
          q: "Recommender en Cloud Billing sugiere:",
          options: [
            "Solo dashboards",
            "Optimizaciones (right-sizing, recursos idle, CUDs)",
            "Cambios de IAM",
            "Solo logs",
          ],
          correct: 1,
          explanation:
            "Recommender analiza tu uso y sugiere ahorros: VMs sobre-aprovisionadas, recursos sin usar, oportunidades de CUDs. Parte de Active Assist.",
        },
        {
          q: "Una startup probando GCP sin compromiso:",
          options: [
            "Premium Support obligatorio",
            "Enhanced 24/7",
            "Basic Support + Free Tier ($300 + Always Free)",
            "Sin opción",
          ],
          correct: 2,
          explanation:
            "Basic Support es gratis y el Free Tier ($300 crédito + Always Free de servicios como Cloud Run, GCS, BigQuery) permite probar GCP sin costo.",
        },
        {
          q: "Para exportar facturación detallada y analizarla:",
          options: [
            "Excel manual",
            "Export de Billing a BigQuery",
            "Cloud Run",
            "Cloud DNS",
          ],
          correct: 1,
          explanation:
            "Cloud Billing puede exportar datos detallados a BigQuery. Después puedes analizar con SQL, visualizar con Looker, alertar con Cloud Monitoring.",
        },
        {
          q: "Carbon Footprint dashboard sirve para:",
          options: [
            "Optimizar latencia",
            "Ver emisiones de carbono de tu uso de GCP",
            "Crear VMs",
            "Migrar datos",
          ],
          correct: 1,
          explanation:
            "Carbon Footprint dashboard te muestra las emisiones GHG (scope 1, 2, 3) atribuibles a tu uso de GCP, por proyecto/servicio/región.",
        },
      ],
    },
  ],
};
