import type { ModuleData } from "@/types/course";

export const m4: ModuleData = {
  slug: "m4",
  number: 4,
  title: "Compute en AWS: EC2, Lambda, ECS, EKS, Fargate",
  icon: "💻",
  intro:
    "AWS ofrece la familia más amplia de servicios de compute del mercado: VMs (EC2), containers (ECS/EKS/Fargate), serverless (Lambda), PaaS (Elastic Beanstalk), VPS simple (Lightsail) y batch. Saber cuándo usar cada uno es clave para el examen.",
  totalActivities: 4,
  blocks: [
    // ============================================
    // SECCIÓN 1: EC2 a fondo
    // ============================================
    { kind: "h3", text: "🖥️ 1. EC2 - Elastic Compute Cloud" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> EC2 es el servicio IaaS estrella de AWS. Te da <strong>máquinas virtuales</strong> (instancias) con OS, almacenamiento y red personalizables. Lanzado en 2006, es el corazón histórico de AWS.",
    },
    { kind: "h4", text: "Conceptos clave" },
    {
      kind: "list",
      items: [
        "<strong>Instance</strong>: una VM en EC2",
        "<strong>AMI (Amazon Machine Image)</strong>: plantilla que define el OS y software inicial",
        "<strong>Instance Type</strong>: familia y tamaño (CPU, RAM, red, storage)",
        "<strong>EBS</strong>: discos persistentes adjuntos a la instancia",
        "<strong>Instance Store</strong>: disco físico de la VM, EFÍMERO (se pierde al apagar)",
        "<strong>Security Group</strong>: firewall a nivel de instancia",
        "<strong>Key Pair</strong>: par de llaves para SSH/RDP",
      ],
    },
    { kind: "h4", text: "Familias de Instance Types (resumen)" },
    {
      kind: "table",
      headers: ["Familia", "Optimizada para", "Ejemplos casos"],
      rows: [
        ["T (T3, T4g)", "Burstable, general-purpose", "Web servers, dev, apps con tráfico variable"],
        ["M (M5, M6i)", "General, balance CPU/RAM", "Apps medianas, BD pequeñas"],
        ["C (C5, C6i)", "Compute optimized", "HPC, batch processing, ML inference"],
        ["R (R5, R6i)", "Memory optimized", "BD in-memory, SAP HANA, Redis"],
        ["X (X1, X2)", "Memoria ultra alta", "SAP HANA grande, in-memory enormes"],
        ["I (I3, I4i)", "Storage NVMe local", "BD NoSQL, data warehouses"],
        ["D, H", "Storage HDD para big data", "Hadoop, distributed storage"],
        ["G, P, Inf", "GPU/aceleradores ML", "Training, inferencia, gráficos"],
      ],
    },
    { kind: "h4", text: "Opciones de pricing de EC2" },
    {
      kind: "table",
      headers: ["Tipo", "Descripción", "Mejor para"],
      rows: [
        ["On-Demand", "Pago por hora/segundo sin compromiso", "Cargas impredecibles, pruebas"],
        ["Reserved Instance (RI)", "Compromiso 1-3 años, hasta 72% off", "Cargas estables conocidas"],
        ["Savings Plan", "Compromiso $/hora flexible 1-3 años", "Cargas variables pero predecibles"],
        ["Spot Instance", "Hasta 90% off, terminables con 2min aviso", "Batch, render, CI/CD, fault-tolerant"],
        ["Dedicated Host", "Servidor físico dedicado", "Licencias por hardware (Windows, Oracle)"],
        ["Dedicated Instance", "VM en hardware dedicado pero gestionado por AWS", "Aislamiento físico"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Para examen:</strong> <em>'24/7 carga predecible 3 años'</em> → RI o Savings Plan 3 años. <em>'Batch tolerante a interrupciones, máximo ahorro'</em> → Spot. <em>'Licencia Microsoft por core físico'</em> → Dedicated Host.",
    },

    // ============================================
    // SECCIÓN 2: Auto Scaling y Load Balancing
    // ============================================
    { kind: "h3", text: "📈 2. Auto Scaling y Load Balancing" },
    { kind: "h4", text: "Auto Scaling Groups (ASG)" },
    {
      kind: "info",
      html:
        "Un <strong>ASG</strong> es un grupo de instancias EC2 que se escala automáticamente según métricas (CPU, requests, custom). Mantiene tu app saludable: si una instancia falla, ASG la reemplaza.",
    },
    {
      kind: "list",
      items: [
        "<strong>Min, Max, Desired</strong>: límites y tamaño objetivo",
        "<strong>Launch Template</strong>: plantilla para nuevas instancias",
        "<strong>Scaling Policies</strong>: cuándo escalar (target tracking, step, scheduled)",
        "<strong>Health Checks</strong>: detecta y reemplaza instancias unhealthy",
      ],
    },
    { kind: "h4", text: "Elastic Load Balancing (ELB)" },
    {
      kind: "table",
      headers: ["Tipo", "Capa", "Uso típico"],
      rows: [
        ["Application LB (ALB)", "L7 (HTTP/HTTPS)", "Web apps, microservicios, routing por path/host"],
        ["Network LB (NLB)", "L4 (TCP/UDP)", "Ultra-baja latencia, IoT, gaming"],
        ["Gateway LB (GLB)", "L3 (IP)", "Despliegue de aplicaciones de red (firewalls, IDS)"],
        ["Classic LB (CLB)", "L4 + L7 legacy", "Solo compatibilidad (no usar en nuevos)"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Patrón clásico de HA:</strong> ELB (distribuye tráfico) + ASG (escala instancias) + Multi-AZ (resiliencia) + RDS Multi-AZ (BD HA).",
    },

    // ============================================
    // SECCIÓN 3: Lambda
    // ============================================
    { kind: "h3", text: "⚡ 3. AWS Lambda (Serverless / FaaS)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Lambda ejecuta tu código <strong>sin gestionar servidores</strong>. Subes una función, defines un trigger, y AWS la ejecuta cuando ocurre el evento. <strong>Pagas solo por invocaciones + tiempo de ejecución</strong>.",
    },
    {
      kind: "list",
      items: [
        "Lenguajes: Python, Node.js, Java, .NET, Go, Ruby (y custom runtimes)",
        "<strong>Timeout máximo</strong>: 15 minutos por invocación",
        "<strong>Memoria</strong>: 128 MB hasta 10 GB (CPU asignada proporcionalmente)",
        "<strong>Trigger</strong>: S3, DynamoDB, SQS, API Gateway, EventBridge, ALB, etc.",
        "<strong>Free Tier</strong>: 1M requests/mes y 400,000 GB-segundos gratis siempre",
        "<strong>Concurrencia</strong>: escala automáticamente a miles paralelas",
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo usar Lambda:</strong><br/>" +
        "• Tareas event-driven (procesar archivo subido, mensaje en cola)<br/>" +
        "• Backend API simple (con API Gateway)<br/>" +
        "• Cron jobs (con EventBridge Scheduler)<br/>" +
        "• Glue code para conectar servicios<br/>" +
        "• Tareas cortas (<15min)",
    },
    {
      kind: "tip",
      html:
        "<strong>❌ Cuándo NO usar Lambda:</strong><br/>" +
        "• Tareas >15 minutos (timeout)<br/>" +
        "• Cargas con cold start sensible (aunque hay <em>provisioned concurrency</em>)<br/>" +
        "• Apps que requieren state persistente local",
    },

    // ============================================
    // SECCIÓN 4: Containers - ECS, EKS, Fargate
    // ============================================
    { kind: "h3", text: "🐳 4. Containers: ECS, EKS y Fargate" },
    { kind: "h4", text: "ECS - Elastic Container Service" },
    {
      kind: "info",
      html:
        "Orquestador propietario de AWS. Define tareas con <strong>Task Definitions</strong> (Docker image + recursos) y las corres en clusters. Fácil de aprender, integrado con todo AWS.",
    },
    { kind: "h4", text: "EKS - Elastic Kubernetes Service" },
    {
      kind: "info",
      html:
        "<strong>Kubernetes administrado</strong>. AWS gestiona el control plane (master). Tú gestionas los worker nodes (o usas Fargate). Para equipos que conocen K8s y quieren portabilidad.",
    },
    { kind: "h4", text: "Fargate - Serverless para containers" },
    {
      kind: "info",
      html:
        "Fargate es un <strong>compute engine serverless</strong> para containers, usado por ECS y EKS. <strong>No gestionas EC2</strong>; AWS asigna capacidad según los containers que pides.",
    },
    {
      kind: "table",
      headers: ["Opción", "Quién gestiona EC2", "Cuándo usar"],
      rows: [
        ["ECS con EC2 launch type", "Tú", "Control granular, ahorro con Spot/RI"],
        ["ECS con Fargate", "AWS (serverless)", "Sin gestión de infra, pay-per-use"],
        ["EKS con EC2 nodes", "Tú", "K8s con control sobre nodos"],
        ["EKS con Fargate", "AWS (serverless)", "K8s sin gestionar nodos"],
      ],
    },

    // ============================================
    // SECCIÓN 5: Otros servicios compute
    // ============================================
    { kind: "h3", text: "📦 5. Otros servicios de Compute" },
    {
      kind: "table",
      headers: ["Servicio", "Tipo", "Cuándo usar"],
      rows: [
        ["Lightsail", "VPS simplificado", "Apps pequeñas, blogs WordPress, precio fijo mensual"],
        ["Elastic Beanstalk", "PaaS de AWS", "App web con runtime conocido, sin gestionar infra"],
        ["App Runner", "Container/Code PaaS", "Containers o repo Git → app web auto-deploy"],
        ["Batch", "Batch processing a escala", "Jobs paralelos de procesamiento masivo (genómica, render)"],
        ["Outposts", "AWS on-prem", "Hybrid con consistencia de servicios"],
        ["Wavelength", "AWS en 5G", "Ultra-baja latencia móvil"],
      ],
    },

    // ============================================
    // SECCIÓN 6: Guía de decisión
    // ============================================
    { kind: "h3", text: "🎯 6. Guía rápida de decisión" },
    {
      kind: "info",
      html:
        "<strong>Pregúntate en este orden:</strong><br/><br/>" +
        "1️⃣ ¿Función pequeña reactiva a evento? → <strong>Lambda</strong><br/>" +
        "2️⃣ ¿Container HTTP? → <strong>App Runner</strong> o <strong>ECS Fargate</strong><br/>" +
        "3️⃣ ¿App web simple con código? → <strong>Elastic Beanstalk</strong><br/>" +
        "4️⃣ ¿Microservicios complejos con K8s? → <strong>EKS</strong><br/>" +
        "5️⃣ ¿VPS simple, precio fijo? → <strong>Lightsail</strong><br/>" +
        "6️⃣ ¿Control total, GPU, licencia HW, OS custom? → <strong>EC2</strong><br/>" +
        "7️⃣ ¿Batch masivo paralelo? → <strong>AWS Batch</strong>",
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m4_matching",
      pairs: [
        { en: "EC2", es: "VMs IaaS" },
        { en: "Lambda", es: "FaaS event-driven" },
        { en: "ECS", es: "Orquestador AWS propio para containers" },
        { en: "EKS", es: "Kubernetes administrado" },
        { en: "Fargate", es: "Serverless para containers" },
        { en: "Lightsail", es: "VPS simple precio fijo" },
        { en: "Elastic Beanstalk", es: "PaaS para apps web" },
        { en: "Batch", es: "Jobs paralelos masivos" },
        { en: "Spot Instance", es: "Hasta 90% off, terminable" },
        { en: "Reserved Instance", es: "Compromiso 1-3 años, hasta 72% off" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m4_fill",
      items: [
        { text: "VMs IaaS de AWS: ___", answer: "EC2", es: "EC2" },
        { text: "FaaS event-driven: ___", answer: "Lambda", es: "Lambda" },
        { text: "Kubernetes administrado: ___", answer: "EKS", es: "EKS" },
        { text: "Containers serverless: ___", answer: "Fargate", es: "Fargate" },
        { text: "PaaS de AWS: Elastic ___", answer: "Beanstalk", es: "Beanstalk" },
        { text: "Plantilla para EC2: ___", answer: "AMI", es: "AMI" },
        { text: "Storage efímero de EC2: ___ Store", answer: "Instance", es: "Instance" },
      ],
    },

    // ============================================
    // QUIZ FINAL
    // ============================================
    {
      kind: "quiz",
      key: "m4_quiz",
      questions: [
        {
          q: "Una empresa quiere correr una función que reacciona cuando se sube un archivo a S3:",
          options: ["EC2", "Lambda con trigger S3", "ECS", "Lightsail"],
          correct: 1,
          explanation:
            "Lambda + trigger S3 es el patrón clásico event-driven. Sin servidores, escala automáticamente, pay-per-invocation.",
        },
        {
          q: "Una carga 24/7 predecible por 3 años:",
          options: ["On-Demand", "Reserved Instance 3 años o Savings Plan", "Spot", "Lightsail"],
          correct: 1,
          explanation:
            "RI o Compute Savings Plan a 3 años ofrecen hasta 72% off. Para cargas estables, máximo ahorro con compromiso.",
        },
        {
          q: "Batch de procesamiento que tolera interrupciones, máximo ahorro:",
          options: ["On-Demand", "Reserved Instance", "Spot (hasta 90% off)", "Dedicated Host"],
          correct: 2,
          explanation:
            "Spot ofrece hasta 90% off. AWS puede terminarlas con 2 min de aviso. Para batch, render, big data, ML training es ideal.",
        },
        {
          q: "Licencia software exige instancia en hardware dedicado:",
          options: ["On-Demand", "Spot", "Dedicated Host", "Lambda"],
          correct: 2,
          explanation:
            "Dedicated Host: tienes un servidor físico dedicado. Útil para licencias que se pagan por core físico (Windows Server, Oracle, SQL Server).",
        },
        {
          q: "Para correr Kubernetes sin gestionar nodos:",
          options: ["ECS solo", "EKS con Fargate", "EC2 manual", "Lightsail"],
          correct: 1,
          explanation:
            "EKS (Kubernetes) + Fargate (serverless para containers) = K8s sin gestionar EC2 nodes. Tú solo te enfocas en tus pods.",
        },
        {
          q: "Una app web tradicional con tráfico variable, equipo pequeño sin DevOps:",
          options: ["EC2 manual", "Elastic Beanstalk", "EKS", "Batch"],
          correct: 1,
          explanation:
            "Elastic Beanstalk es PaaS: subes el código, AWS hace deploy con load balancer, auto scaling, monitoring. Ideal para equipos pequeños.",
        },
        {
          q: "Para hospedar un blog WordPress simple con precio fijo mensual:",
          options: ["EC2", "Lambda", "Lightsail", "Batch"],
          correct: 2,
          explanation:
            "Lightsail es VPS simplificado con precio fijo mensual. Incluye instancia + storage + transferencia. Ideal para apps pequeñas predecibles.",
        },
        {
          q: "Timeout máximo de Lambda:",
          options: ["1 minuto", "5 minutos", "15 minutos", "Sin límite"],
          correct: 2,
          explanation:
            "Lambda tiene timeout máximo de 15 minutos por invocación. Para tareas más largas, usa AWS Batch, ECS/Fargate, o Step Functions.",
        },
        {
          q: "Instance Store en EC2 es:",
          options: ["Storage persistente", "Storage EFÍMERO (se pierde al apagar)", "Network storage", "Cloud storage"],
          correct: 1,
          explanation:
            "Instance Store es disco FÍSICO de la VM. Se pierde al detener/terminar. Para persistencia usa EBS o S3.",
        },
        {
          q: "Una empresa con expertise K8s quiere portabilidad multi-cloud:",
          options: ["ECS", "EKS", "Lambda", "Beanstalk"],
          correct: 1,
          explanation:
            "EKS es Kubernetes administrado. K8s es estándar abierto, portable a otras nubes (GKE, AKS). ECS es propietario AWS.",
        },
        {
          q: "Para batch processing masivo paralelo de genómica:",
          options: ["Lambda solo", "AWS Batch", "Lightsail", "Beanstalk"],
          correct: 1,
          explanation:
            "AWS Batch orquesta jobs batch en paralelo. Decide automáticamente capacidad (Spot, EC2) y orden. Ideal para HPC, genómica, render.",
        },
        {
          q: "Para una app cuyo costo debe ser MUY predecible (precio fijo mensual):",
          options: ["EC2 On-Demand", "Spot", "Lightsail", "Lambda"],
          correct: 2,
          explanation:
            "Lightsail tiene precio fijo mensual ($3.50 a $160 según plan). Ideal para pequeños proyectos donde quieres saber exactamente cuánto pagarás.",
        },
      ],
    },
  ],
};
