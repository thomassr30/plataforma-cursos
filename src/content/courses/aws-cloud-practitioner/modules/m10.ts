import type { ModuleData } from "@/types/course";

export const m10: ModuleData = {
  slug: "m10",
  number: 10,
  title: "Billing, Pricing, Support y Migración",
  icon: "💰",
  intro:
    "El último módulo cubre la otra cara: cómo se cobra en AWS, cómo optimizar costos, qué nivel de soporte conviene y cómo migrar workloads a AWS. Es el 12% del examen pero las preguntas son directas y ganarlas es fácil con buena preparación.",
  totalActivities: 3,
  blocks: [
    // ============================================
    // SECCIÓN 1: Modelos de pricing
    // ============================================
    { kind: "h3", text: "💵 1. Modelos de Pricing en AWS" },
    { kind: "h4", text: "Los 3 fundamentos del pricing de AWS" },
    {
      kind: "list",
      items: [
        "<strong>Pay-as-you-go</strong>: solo pagas por lo que usas, sin compromiso obligatorio",
        "<strong>Save when you reserve</strong>: descuentos por compromiso (Reserved Instances, Savings Plans)",
        "<strong>Pay less by using more</strong>: tiers por volumen (S3, transferencia, etc.)",
      ],
    },
    { kind: "h4", text: "Opciones de pricing para Compute (EC2 y compatibles)" },
    {
      kind: "table",
      headers: ["Modelo", "Descripción", "Descuento típico"],
      rows: [
        ["On-Demand", "Pago por hora/segundo, sin compromiso", "0% (precio base)"],
        ["Reserved Instance (RI) 1 año", "Compromiso 1 año, paga upfront/partial/no", "Hasta 40-45%"],
        ["Reserved Instance (RI) 3 años", "Compromiso 3 años", "Hasta 72%"],
        ["Compute Savings Plan", "Compromiso $/hora flexible (cualquier región/familia)", "Hasta 66%"],
        ["EC2 Instance Savings Plan", "Compromiso a familia específica", "Hasta 72%"],
        ["Spot Instance", "Hasta 90% off, terminables con 2min aviso", "Hasta 90%"],
        ["Dedicated Host", "Servidor físico dedicado (licencias)", "Precio más alto"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Cómo elegir:</strong><br/>" +
        "• <strong>Carga 24/7 estable + 3 años</strong> → RI 3 años All Upfront (máximo descuento)<br/>" +
        "• <strong>Carga predecible flexible</strong> → Compute Savings Plan<br/>" +
        "• <strong>Batch tolerante</strong> → Spot<br/>" +
        "• <strong>Carga impredecible / testing</strong> → On-Demand<br/>" +
        "• <strong>Licencia por hardware</strong> → Dedicated Host",
    },

    // ============================================
    // SECCIÓN 2: AWS Free Tier
    // ============================================
    { kind: "h3", text: "🎁 2. AWS Free Tier" },
    {
      kind: "info",
      html: "AWS ofrece tres tipos de Free Tier:",
    },
    {
      kind: "table",
      headers: ["Tipo", "Qué incluye"],
      rows: [
        ["12 meses gratis", "750h EC2 t2.micro/t3.micro al mes, 5GB S3, 750h RDS, etc."],
        ["Always Free", "Lambda 1M requests/mes, DynamoDB 25GB, CloudWatch 10 métricas..."],
        ["Free Trials", "Períodos de prueba por servicio (ej. Inspector 90 días)"],
      ],
    },

    // ============================================
    // SECCIÓN 3: Gestión de Costos
    // ============================================
    { kind: "h3", text: "📊 3. Herramientas de gestión de costos" },
    {
      kind: "table",
      headers: ["Herramienta", "Para qué"],
      rows: [
        ["AWS Pricing Calculator", "Estimar costos ANTES de desplegar"],
        ["AWS Cost Explorer", "Analizar costos pasados y proyectados visualmente"],
        ["AWS Budgets", "Establecer presupuestos con alertas por correo/SNS"],
        ["Cost and Usage Report (CUR)", "Reporte detallado exportable a S3 (luego BI con Athena/QuickSight)"],
        ["Cost Allocation Tags", "Atribuir costos por proyecto/departamento/cliente con tags"],
        ["AWS Compute Optimizer", "Recomendaciones de right-sizing automatizadas"],
        ["Savings Plans / RI recommendations", "Sugiere cuánto comprometer para ahorrar"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Tip examen:</strong> Si la pregunta dice <em>'estimar costos antes de desplegar'</em> → <strong>Pricing Calculator</strong>. <em>'Analizar costos pasados'</em> → <strong>Cost Explorer</strong>. <em>'Recibir alerta cuando supere $1000'</em> → <strong>AWS Budgets</strong>.",
    },

    // ============================================
    // SECCIÓN 4: AWS Support Plans
    // ============================================
    { kind: "h3", text: "🆘 4. AWS Support Plans (CRÍTICO)" },
    {
      kind: "table",
      headers: ["Plan", "Costo", "Acceso", "Tiempo respuesta P1", "TAM"],
      rows: [
        ["Basic", "GRATIS", "Docs, foros, AWS Health Dashboard", "—", "❌"],
        ["Developer", "Desde $29/mes", "Email business hours, casos no críticos", "12-24h", "❌"],
        ["Business", "Desde $100/mes", "24/7 email/phone/chat, todos los servicios", "1h", "❌"],
        ["Enterprise On-Ramp", "Desde $5500/mes", "24/7 con acceso parcial a TAM", "30 min", "Parcial"],
        ["Enterprise", "Desde $15,000/mes", "TAM dedicado, IEM, soporte arquitectónico", "15 min", "✅ Dedicado"],
      ],
    },
    { kind: "h4", text: "Otros beneficios de Enterprise Support" },
    {
      kind: "list",
      items: [
        "<strong>TAM (Technical Account Manager) dedicado</strong>",
        "<strong>IEM (Infrastructure Event Management)</strong>: ayuda con eventos grandes (Black Friday, lanzamientos)",
        "<strong>Concierge Team</strong>: equipo de billing/account",
        "<strong>Well-Architected Reviews</strong>",
        "<strong>Operations Reviews</strong>",
        "<strong>Acceso a toda la información de Trusted Advisor</strong>",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Para examen:</strong><br/>" +
        "• <em>'Necesita TAM dedicado'</em> → <strong>Enterprise</strong><br/>" +
        "• <em>'Acceso 24/7 con SLA pero sin TAM'</em> → <strong>Business</strong><br/>" +
        "• <em>'Empresa pequeña haciendo pruebas'</em> → <strong>Basic</strong> (gratis)<br/>" +
        "• <em>'Necesita acceso completo a Trusted Advisor'</em> → <strong>Business o Enterprise</strong>",
    },

    // ============================================
    // SECCIÓN 5: AWS Marketplace
    // ============================================
    { kind: "h3", text: "🏪 5. AWS Marketplace" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> AWS Marketplace es un <strong>catálogo digital</strong> donde compras software de <strong>terceros</strong> (ISVs) para usar en AWS. Pago centralizado por tu factura AWS.",
    },
    {
      kind: "list",
      items: [
        "Software como AMIs, containers, SaaS",
        "Pricing: hourly, annual, BYOL (Bring Your Own License), free",
        "Pago se incluye en tu factura AWS (consolidado)",
        "Ejemplos: firewalls (Palo Alto), MongoDB Atlas, Databricks, Datadog",
      ],
    },

    // ============================================
    // SECCIÓN 6: AWS Partner Network
    // ============================================
    { kind: "h3", text: "🤝 6. AWS Partner Network (APN)" },
    {
      kind: "list",
      items: [
        "<strong>Consulting Partners</strong>: empresas que ayudan a diseñar/migrar/operar en AWS",
        "<strong>Technology Partners</strong>: ISVs con productos certificados",
        "<strong>Niveles</strong>: Select, Advanced, Premier",
        "Útil para empresas que necesitan expertise externa",
      ],
    },

    // ============================================
    // SECCIÓN 7: Migración
    // ============================================
    { kind: "h3", text: "🚚 7. Servicios de Migración a AWS" },
    { kind: "h4", text: "Las 7 Rs (variante AWS de migración)" },
    {
      kind: "table",
      headers: ["Estrategia", "Otro nombre", "Qué hace"],
      rows: [
        ["1. Retire", "—", "Eliminar lo que ya no se usa"],
        ["2. Retain", "Revisit", "Mantener on-prem por ahora"],
        ["3. Rehost", "Lift & Shift", "Mover tal cual a EC2"],
        ["4. Relocate", "Hypervisor-level lift", "VMware → VMware Cloud on AWS"],
        ["5. Repurchase", "Drop & Shop", "Reemplazar por SaaS"],
        ["6. Replatform", "Lift, Tinker & Shift", "Pequeñas optimizaciones"],
        ["7. Refactor / Re-architect", "—", "Reescribir cloud-native"],
      ],
    },
    { kind: "h4", text: "Servicios de migración" },
    {
      kind: "table",
      headers: ["Servicio", "Para qué"],
      rows: [
        ["AWS Migration Hub", "Dashboard central de migraciones"],
        ["Application Migration Service (MGN)", "Lift-and-shift de servidores a EC2"],
        ["Application Discovery Service", "Descubrir servidores on-prem para planificar"],
        ["Database Migration Service (DMS)", "Migrar BDs con mínimo downtime"],
        ["Schema Conversion Tool (SCT)", "Convertir esquemas heterogéneos"],
        ["DataSync", "Transferir archivos on-prem ↔ AWS continuamente"],
        ["Snow Family", "Dispositivos físicos para volúmenes grandes"],
        ["AWS Mainframe Modernization", "Modernizar mainframes a AWS"],
      ],
    },

    // ============================================
    // SECCIÓN 8: Sustainability
    // ============================================
    { kind: "h3", text: "🌿 8. Sustainability en AWS" },
    {
      kind: "list",
      items: [
        "AWS objetivo: <strong>100% energía renovable para 2025</strong>",
        "Más eficiente que datacenters on-prem (3.6x según Amazon)",
        "<strong>Customer Carbon Footprint Tool</strong>: ver tus emisiones",
        "Sustainability es el <strong>6º pilar</strong> del Well-Architected",
      ],
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m10_matching",
      pairs: [
        { en: "On-Demand", es: "Pago por uso sin compromiso" },
        { en: "RI 3 años", es: "Compromiso 3 años, hasta 72% off" },
        { en: "Savings Plan", es: "Compromiso $/hora flexible" },
        { en: "Spot Instance", es: "Hasta 90% off, terminable" },
        { en: "Pricing Calculator", es: "Estimar costos antes" },
        { en: "Cost Explorer", es: "Analizar costos pasados" },
        { en: "AWS Budgets", es: "Alertas por presupuesto" },
        { en: "Enterprise Support", es: "TAM dedicado, 15 min P1" },
        { en: "Business Support", es: "24/7, 1h P1, sin TAM" },
        { en: "Trusted Advisor (completo)", es: "Business o Enterprise" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m10_fill",
      items: [
        { text: "Workload predecible 3 años: ___", answer: "RI", es: "RI" },
        { text: "Batch tolerante, máximo ahorro: ___ Instance", answer: "Spot", es: "Spot" },
        { text: "Plan de soporte con TAM dedicado: ___", answer: "Enterprise", es: "Enterprise" },
        { text: "Estimar costos antes: AWS Pricing ___", answer: "Calculator", es: "Calculator" },
        { text: "Presupuesto con alertas: AWS ___", answer: "Budgets", es: "Budgets" },
        { text: "Mover BDs a AWS: Database Migration ___", answer: "Service", es: "Service" },
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
          q: "Carga 24/7 estable y predecible por 3 años:",
          options: ["On-Demand", "Reserved Instance 3 años o Savings Plan", "Spot", "Sin descuento"],
          correct: 1,
          explanation:
            "RI 3 años (All Upfront para máximo descuento) o Compute Savings Plan 3 años ofrecen hasta 72% off. Ideal para cargas estables.",
        },
        {
          q: "Batch que tolera interrupciones, máximo ahorro:",
          options: ["RI", "Spot Instance (hasta 90%)", "On-Demand", "Dedicated Host"],
          correct: 1,
          explanation:
            "Spot Instances ofrecen hasta 90% off. AWS puede terminarlas con 2 min de aviso. Para batch, render, ML training, CI/CD.",
        },
        {
          q: "Para estimar el costo de un nuevo proyecto ANTES de desplegar:",
          options: ["Cost Explorer", "AWS Pricing Calculator", "Budgets", "Trusted Advisor"],
          correct: 1,
          explanation:
            "Pricing Calculator (anteriormente Simple Monthly Calculator) estima costos basado en configuración planeada. Cost Explorer es para costos pasados.",
        },
        {
          q: "Para recibir alerta cuando el gasto mensual supera $5000:",
          options: ["Cost Explorer solo", "AWS Budgets con alerta", "Trusted Advisor", "CloudWatch"],
          correct: 1,
          explanation:
            "AWS Budgets permite establecer presupuestos (costo, uso, RI, Savings Plans) con alertas por email/SNS al cruzar umbrales.",
        },
        {
          q: "Para acceder a TODOS los checks de Trusted Advisor:",
          options: ["Basic Support", "Developer Support", "Business o Enterprise Support", "Free Tier"],
          correct: 2,
          explanation:
            "Trusted Advisor completo (5 categorías, todos los checks) requiere plan Business o Enterprise. Basic/Developer tienen acceso limitado.",
        },
        {
          q: "Plan de soporte con Technical Account Manager dedicado:",
          options: ["Basic", "Developer", "Business", "Enterprise"],
          correct: 3,
          explanation:
            "Enterprise Support incluye TAM dedicado, IEM, 15 min response P1, Concierge billing, Well-Architected Reviews. Para enterprise crítico.",
        },
        {
          q: "Una empresa quiere consolidar facturación de 50 cuentas AWS:",
          options: ["IAM", "AWS Organizations (consolidated billing)", "Cost Explorer solo", "Trusted Advisor"],
          correct: 1,
          explanation:
            "AWS Organizations ofrece consolidated billing, descuentos por volumen compartidos entre cuentas, gestión centralizada con SCPs.",
        },
        {
          q: "Para migrar VMs on-prem a EC2 lift-and-shift:",
          options: [
            "Manual con AMI",
            "Application Migration Service (MGN)",
            "Lambda",
            "Snow Family solo",
          ],
          correct: 1,
          explanation:
            "Application Migration Service (anteriormente CloudEndure) automatiza lift-and-shift de servidores físicos/virtuales a EC2 con mínimo downtime.",
        },
        {
          q: "Para mover 200 TB on-prem a AWS sin saturar internet:",
          options: ["VPN", "Direct Connect", "Snowball Edge", "DataSync por internet"],
          correct: 2,
          explanation:
            "Snowball Edge (parte de Snow Family) es dispositivo físico para volúmenes grandes. Para 100PB+ existe Snowmobile (camión).",
        },
        {
          q: "AWS Marketplace permite:",
          options: [
            "Solo descargar AWS CLI",
            "Comprar software de terceros (ISVs) para usar en AWS",
            "Solo AWS support",
            "Solo IAM",
          ],
          correct: 1,
          explanation:
            "AWS Marketplace es catálogo de software third-party (firewalls, BDs, herramientas DevOps, SaaS). Pago consolidado en tu factura AWS.",
        },
        {
          q: "Una startup haciendo prueba de concepto SIN compromiso:",
          options: [
            "Enterprise Support obligatorio",
            "On-Demand + Free Tier + Basic Support",
            "Reserved Instances",
            "Dedicated Hosts",
          ],
          correct: 1,
          explanation:
            "Para experimentar: On-Demand pricing (sin compromiso) + Free Tier ($300 sería de GCP — AWS tiene Free Tier siempre disponible para muchos servicios) + Basic Support (gratis).",
        },
        {
          q: "Sustainability es el 6º pilar de:",
          options: ["Cloud Adoption Framework", "Well-Architected Framework", "Solo Operations", "No existe"],
          correct: 1,
          explanation:
            "Sustainability se añadió en 2021 como 6º pilar del Well-Architected Framework: reducir impacto ambiental al diseñar workloads.",
        },
      ],
    },
  ],
};
