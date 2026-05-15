import type { ModuleData } from "@/types/course";

export const m1: ModuleData = {
  slug: "m1",
  number: 1,
  title: "Fundamentos del Cloud Computing y AWS",
  icon: "☁️",
  intro:
    "AWS es el líder global del cloud (más de 200 servicios, 32 regiones, 100+ AZs). Pero antes de entrar a los servicios, hay que dominar los fundamentos: qué es realmente el cloud, los modelos de servicio (IaaS/PaaS/SaaS), los 6 beneficios oficiales según AWS, deployment models y por qué AWS específicamente.",
  totalActivities: 4,
  blocks: [
    // ============================================
    // SECCIÓN 1: Qué es el cloud computing
    // ============================================
    { kind: "h3", text: "📖 1. ¿Qué es el Cloud Computing? (Definición de AWS)" },
    {
      kind: "info",
      html:
        "<strong>Definición oficial de AWS:</strong><br/><br/>" +
        "Cloud Computing es la entrega <strong>on-demand</strong> de poder de cómputo, almacenamiento de bases de datos, aplicaciones y otros recursos IT a través de internet con un <strong>modelo de pago por uso</strong>. Permite acceder a tecnología desde un proveedor cloud, en lugar de comprar, poseer y mantener servidores y datacenters físicos.",
    },
    { kind: "h4", text: "Las 6 ventajas oficiales del Cloud Computing (CRÍTICO para examen)" },
    {
      kind: "table",
      headers: ["Ventaja", "Qué significa"],
      rows: [
        ["Trade fixed expense for variable expense", "Pasas de CapEx (compra de servers) a OpEx (pagas por uso)"],
        ["Benefit from massive economies of scale", "AWS negocia mejores precios y los traslada al cliente"],
        ["Stop guessing capacity", "Escalas según necesidad real, sin sobre-aprovisionar"],
        ["Increase speed and agility", "Nuevos recursos en minutos, no semanas"],
        ["Stop spending money running and maintaining datacenters", "AWS gestiona la infra física"],
        ["Go global in minutes", "Despliega en regiones globales con clicks"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Tip de examen:</strong> Estas 6 ventajas SALEN literal en preguntas. Memorízalas. Si una opción dice <em>'eliminar todos los costos'</em> o <em>'garantizar 100% uptime'</em> → NO es una ventaja oficial.",
    },

    // ============================================
    // SECCIÓN 2: IaaS, PaaS, SaaS
    // ============================================
    { kind: "h3", text: "🧱 2. Los 3 Modelos de Servicio Cloud" },
    { kind: "h4", text: "IaaS - Infrastructure as a Service" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Bloques fundamentales de infraestructura virtualizada (compute, storage, network). Tú gestionas OS, runtime, app y datos. AWS gestiona hardware, virtualización, datacenter.<br/><br/>" +
        "<strong>Ejemplo en AWS:</strong> EC2 (VMs), EBS (discos), VPC (red).",
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo usar IaaS:</strong><br/>" +
        "• Necesitas control granular del OS y runtime<br/>" +
        "• Lift-and-shift de cargas legacy<br/>" +
        "• Aplicaciones con requisitos especiales (GPU, OS específico)<br/>" +
        "• Software con licencias por hardware",
    },
    { kind: "h4", text: "PaaS - Platform as a Service" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> AWS gestiona toda la infraestructura subyacente y la plataforma (OS, runtime, escalado). Tú solo subes el código.<br/><br/>" +
        "<strong>Ejemplo en AWS:</strong> Elastic Beanstalk, AWS App Runner, RDS, Lambda (FaaS).",
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo usar PaaS:</strong><br/>" +
        "• Apps web/API con runtime estándar<br/>" +
        "• Quieres velocidad de despliegue<br/>" +
        "• No quieres gestionar OS ni escalado",
    },
    { kind: "h4", text: "SaaS - Software as a Service" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Software completo entregado vía internet. No gestionas nada.<br/><br/>" +
        "<strong>Ejemplos:</strong> Amazon WorkMail, WorkDocs, Chime; externos: Salesforce, Office 365, Workspace, Zoom.",
    },
    { kind: "h4", text: "Comparación de capas (CRÍTICO)" },
    {
      kind: "table",
      headers: ["Capa", "On-prem", "IaaS", "PaaS", "SaaS"],
      rows: [
        ["Aplicaciones", "Cliente", "Cliente", "Cliente", "AWS"],
        ["Datos", "Cliente", "Cliente", "Cliente", "Cliente (siempre)"],
        ["Runtime", "Cliente", "Cliente", "AWS", "AWS"],
        ["OS", "Cliente", "Cliente", "AWS", "AWS"],
        ["Virtualización", "Cliente", "AWS", "AWS", "AWS"],
        ["Hardware", "Cliente", "AWS", "AWS", "AWS"],
      ],
    },

    // ============================================
    // SECCIÓN 3: Deployment Models
    // ============================================
    { kind: "h3", text: "🌐 3. Modelos de Despliegue (Deployment Models)" },
    {
      kind: "table",
      headers: ["Modelo", "Descripción", "Cuándo usarlo"],
      rows: [
        ["Cloud (Public)", "Todo en AWS (u otro proveedor cloud)", "Apps nuevas, máxima elasticidad"],
        ["Hybrid", "Mezcla on-prem + cloud", "Empresas con legacy que mantienen on-prem"],
        ["On-Premises (Private cloud)", "Datacenter propio virtualizado", "Compliance estricto, baja latencia local"],
      ],
    },
    { kind: "h4", text: "Hybrid en AWS" },
    {
      kind: "list",
      items: [
        "<strong>AWS Outposts</strong>: hardware AWS en TU datacenter",
        "<strong>VMware Cloud on AWS</strong>: VMware nativo en AWS",
        "<strong>Storage Gateway</strong>: storage on-prem ↔ S3/EBS",
        "<strong>Direct Connect</strong>: conexión privada dedicada",
      ],
    },

    // ============================================
    // SECCIÓN 4: CapEx vs OpEx
    // ============================================
    { kind: "h3", text: "💰 4. CapEx vs OpEx: el cambio financiero" },
    {
      kind: "table",
      headers: ["Aspecto", "On-prem (CapEx)", "Cloud (OpEx)"],
      rows: [
        ["Cuándo pagas", "Adelantado (compra)", "Mensualmente, por uso"],
        ["Capacidad", "Sobre-aprovisionada", "Elástica"],
        ["Tiempo a producir", "Semanas/meses", "Minutos"],
        ["Riesgo", "Te quedas con HW aún sin usar", "Cancelas cuando quieras"],
        ["Aprobación financiera", "Comité, capital", "Operacional, ágil"],
      ],
    },

    // ============================================
    // SECCIÓN 5: Por qué AWS específicamente
    // ============================================
    { kind: "h3", text: "🏆 5. ¿Por qué AWS?" },
    {
      kind: "list",
      items: [
        "<strong>Mayor cobertura global</strong>: 32 regiones, 100+ AZs, 600+ edge locations (2024)",
        "<strong>200+ servicios</strong> en computación, storage, BD, ML, IoT, etc.",
        "<strong>Marketplace</strong> con miles de soluciones third-party",
        "<strong>Maduro</strong>: AWS empezó en 2006 (S3, EC2); la plataforma cloud más madura del mercado",
        "<strong>Mayor cuota de mercado</strong> (≈30-32% global, líder histórico)",
        "<strong>Ecosistema enorme</strong>: partners, comunidad, certificaciones",
        "<strong>Innovación continua</strong>: ~2000-3000 nuevos features/servicios por año",
      ],
    },

    // ============================================
    // SECCIÓN 6: Concepto de elasticidad
    // ============================================
    { kind: "h3", text: "🎈 6. Elasticidad y Escalabilidad" },
    {
      kind: "info",
      html:
        "<strong>Scalability</strong>: capacidad de un sistema para manejar más carga.<br/>" +
        "<strong>Elasticity</strong>: capacidad de escalar AUTOMÁTICAMENTE arriba y abajo según demanda real.<br/><br/>" +
        "<strong>Vertical scaling</strong>: hacer el servidor más grande (más CPU/RAM). Tiene límite.<br/>" +
        "<strong>Horizontal scaling</strong>: agregar más servidores. Casi ilimitado, base del cloud moderno.",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 En AWS:</strong> Auto Scaling Groups + Elastic Load Balancing dan elasticidad horizontal automática. Lambda y Fargate son elásticos por naturaleza (escalan a 0 y a miles).",
    },

    // ============================================
    // SECCIÓN 7: High Availability vs Fault Tolerance
    // ============================================
    { kind: "h3", text: "🛡️ 7. Disponibilidad, Fault Tolerance y Disaster Recovery" },
    {
      kind: "table",
      headers: ["Concepto", "Definición"],
      rows: [
        ["High Availability (HA)", "Mantener el servicio funcionando con mínimo downtime (ej. multi-AZ)"],
        ["Fault Tolerance", "Continuar funcionando aunque falle un componente (ej. réplicas activo-activo)"],
        ["Disaster Recovery (DR)", "Plan para recuperarse de un desastre mayor (ej. multi-region)"],
        ["RPO (Recovery Point Objective)", "Cuántos datos puedes perder (en tiempo)"],
        ["RTO (Recovery Time Objective)", "Cuánto tiempo puedes estar caído"],
      ],
    },
    {
      kind: "info",
      html:
        "<strong>💡 Estrategias DR en AWS (de menos a más caro):</strong><br/>" +
        "1. <strong>Backup & Restore</strong>: backups, recovery lento. RTO/RPO horas-días.<br/>" +
        "2. <strong>Pilot Light</strong>: infra mínima encendida, se escala en disaster.<br/>" +
        "3. <strong>Warm Standby</strong>: infra reducida funcionando, se escala.<br/>" +
        "4. <strong>Multi-Site Active-Active</strong>: dos sitios activos. Cero downtime.",
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m1_matching",
      pairs: [
        { en: "IaaS", es: "VMs y red virtualizada (EC2)" },
        { en: "PaaS", es: "Plataforma gestionada (Elastic Beanstalk)" },
        { en: "SaaS", es: "Software listo (WorkMail, Salesforce)" },
        { en: "CapEx", es: "Inversión adelantada en activos" },
        { en: "OpEx", es: "Gasto operativo mensual" },
        { en: "Hybrid", es: "On-prem + Cloud combinados" },
        { en: "Elasticity", es: "Escalar arriba y abajo automáticamente" },
        { en: "HA", es: "Mínimo downtime con multi-AZ" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m1_fill",
      items: [
        { text: "EC2 es ___ (modelo de servicio).", answer: "IaaS", es: "IaaS" },
        { text: "Elastic Beanstalk es ___ .", answer: "PaaS", es: "PaaS" },
        { text: "WorkMail es ___ .", answer: "SaaS", es: "SaaS" },
        { text: "Cloud convierte CapEx en ___ .", answer: "OpEx", es: "OpEx" },
        { text: "El servicio para hybrid on-prem ↔ AWS de hardware es ___ ", answer: "Outposts", es: "Outposts" },
        { text: "Una de las 6 ventajas: 'Go ___ in minutes'", answer: "global", es: "global" },
      ],
    },

    // ============================================
    // QUIZ FINAL
    // ============================================
    {
      kind: "quiz",
      key: "m1_quiz",
      questions: [
        {
          q: "¿Cuál NO es una de las 6 ventajas oficiales del cloud según AWS?",
          options: [
            "Trade fixed expense for variable expense",
            "Stop guessing capacity",
            "Guarantee 100% uptime",
            "Go global in minutes",
          ],
          correct: 2,
          explanation:
            "AWS NUNCA garantiza 100% uptime (es imposible). Las 6 ventajas oficiales son: trade fixed for variable, economies of scale, stop guessing capacity, increase speed/agility, stop spending on datacenters, go global in minutes.",
        },
        {
          q: "EC2 corresponde a qué modelo de servicio:",
          options: ["SaaS", "PaaS", "IaaS", "FaaS"],
          correct: 2,
          explanation: "EC2 (Elastic Compute Cloud) son máquinas virtuales = IaaS. Tú gestionas OS y arriba.",
        },
        {
          q: "Una empresa quiere correr Kubernetes pero no gestionar nodos:",
          options: ["EC2 + Docker manual", "EKS con Fargate", "Lambda solo", "S3"],
          correct: 1,
          explanation:
            "EKS (Kubernetes administrado) + Fargate (serverless para containers) = K8s sin gestionar nodos. Mejor de ambos mundos.",
        },
        {
          q: "Si una empresa quiere mantener parte de sus apps en su datacenter Y usar AWS:",
          options: ["Cloud público puro", "Hybrid cloud", "Solo SaaS", "Solo IaaS"],
          correct: 1,
          explanation:
            "Hybrid cloud combina on-prem y AWS. AWS Outposts, Storage Gateway, Direct Connect son habilitadores de hybrid.",
        },
        {
          q: "Elasticidad significa:",
          options: [
            "Comprar más servidores manualmente",
            "Escalar ARRIBA y ABAJO automáticamente según demanda",
            "Solo escalar hacia arriba",
            "Eliminar costos",
          ],
          correct: 1,
          explanation:
            "Elasticidad = escalar en ambas direcciones automáticamente. Auto Scaling, Lambda, DynamoDB on-demand, Fargate la implementan.",
        },
        {
          q: "Una empresa migra para reducir gasto en datacenters y servidores físicos. ¿Qué beneficio refleja?",
          options: [
            "Trade fixed expense for variable expense",
            "Stop spending money running and maintaining data centers",
            "Increase speed and agility",
            "Todas las anteriores",
          ],
          correct: 3,
          explanation:
            "Todas son beneficios reales del cloud. La migración impacta múltiples áreas: ya no compras HW (variable), no mantienes DC (stop spending), y ganas agilidad.",
        },
        {
          q: "Vertical scaling significa:",
          options: [
            "Agregar más servidores",
            "Hacer el servidor más grande (más CPU/RAM)",
            "Borrar servidores",
            "Mover a otra región",
          ],
          correct: 1,
          explanation:
            "Vertical scaling = aumentar el tamaño de UNA máquina. Horizontal scaling = agregar más máquinas. Cloud favorece horizontal.",
        },
        {
          q: "RTO significa:",
          options: [
            "Recovery Time Objective: tiempo aceptable de downtime",
            "Random Test Outage",
            "Real Time Operation",
            "Resource Type Object",
          ],
          correct: 0,
          explanation:
            "RTO = Recovery Time Objective: cuánto tiempo puede estar caído tu servicio antes de causar daño. RPO = cuántos datos puedes perder.",
        },
        {
          q: "AWS Outposts permite:",
          options: [
            "Solo correr Lambda",
            "Tener hardware AWS en tu datacenter propio (hybrid)",
            "Migración a S3",
            "Sólo CDN",
          ],
          correct: 1,
          explanation:
            "AWS Outposts es hardware AWS físico que se instala en TU datacenter. Habilita hybrid cloud con consistencia de servicios AWS.",
        },
        {
          q: "Una estrategia DR donde mantienes infra mínima encendida y la escalas en disaster se llama:",
          options: ["Backup & Restore", "Pilot Light", "Warm Standby", "Multi-Site Active-Active"],
          correct: 1,
          explanation:
            "Pilot Light = infraestructura crítica mínima encendida (BD, configuraciones). En disaster, escalas el resto. Balance entre costo y RTO.",
        },
      ],
    },
  ],
};
