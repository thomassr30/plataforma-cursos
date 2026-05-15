import type { ModuleData } from "@/types/course";

export const m3: ModuleData = {
  slug: "m3",
  number: 3,
  title: "Responsabilidad Compartida y Well-Architected Framework",
  icon: "🏗️",
  intro:
    "Dos frameworks que SIEMPRE aparecen en el examen: el Modelo de Responsabilidad Compartida (quién asegura qué) y el Well-Architected Framework (los 6 pilares de buen diseño en AWS). Dominarlos es la base de seguridad y arquitectura en la nube.",
  totalActivities: 3,
  blocks: [
    // ============================================
    // SECCIÓN 1: Modelo de Responsabilidad Compartida
    // ============================================
    { kind: "h3", text: "🤝 1. Shared Responsibility Model" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> En AWS, la seguridad es una responsabilidad <strong>compartida</strong>. AWS y el cliente cada uno tienen sus partes. NUNCA es 100% del proveedor ni 100% del cliente.",
    },
    { kind: "h4", text: "Regla mnemotécnica CRÍTICA" },
    {
      kind: "successBox",
      html:
        "<strong>AWS asegura LA INFRAESTRUCTURA DEL cloud</strong> (security OF the cloud)<br/>" +
        "<strong>Cliente asegura LO QUE PONE EN el cloud</strong> (security IN the cloud)",
    },
    { kind: "h4", text: "Responsabilidad de AWS (security OF the cloud)" },
    {
      kind: "list",
      items: [
        "<strong>Datacenter físico</strong>: seguridad de las instalaciones, acceso, energía",
        "<strong>Hardware</strong>: servidores, red, storage físico",
        "<strong>Hipervisor / Virtualización</strong>",
        "<strong>Red global de AWS</strong> y backbone",
        "<strong>Software de servicios gestionados</strong> (RDS, DynamoDB, Lambda, etc.)",
      ],
    },
    { kind: "h4", text: "Responsabilidad del Cliente (security IN the cloud)" },
    {
      kind: "list",
      items: [
        "<strong>Datos del cliente</strong> (siempre del cliente, en cualquier servicio)",
        "<strong>Configuración de seguridad</strong>: IAM users, roles, policies, security groups, NACLs",
        "<strong>Encriptación del lado cliente y data integrity</strong>",
        "<strong>Identidad y gestión de acceso</strong>",
        "<strong>Networking</strong> (configuración de VPC, firewalls)",
        "<strong>Sistema operativo y aplicaciones</strong> (en IaaS como EC2)",
        "<strong>Patches del OS guest</strong> (en EC2)",
      ],
    },
    { kind: "h4", text: "Tabla por tipo de servicio" },
    {
      kind: "table",
      headers: ["Capa", "EC2 (IaaS)", "RDS (PaaS)", "S3 (Storage)", "Lambda (FaaS)"],
      rows: [
        ["Hardware/Red/DC", "AWS", "AWS", "AWS", "AWS"],
        ["Virtualización", "AWS", "AWS", "AWS", "AWS"],
        ["OS", "Cliente", "AWS", "AWS", "AWS"],
        ["Patching OS", "Cliente", "AWS", "AWS", "AWS"],
        ["Datos", "Cliente", "Cliente", "Cliente", "Cliente"],
        ["IAM / acceso", "Cliente", "Cliente", "Cliente", "Cliente"],
        ["Encriptación", "Cliente (opt-in)", "Cliente (opt-in)", "Cliente (opt-in)", "Cliente (opt-in)"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Patrón del examen:</strong> Si la pregunta dice <em>'¿quién es responsable del patch del OS en EC2?'</em> → <strong>cliente</strong>. <em>'¿Quién es responsable del patch del OS en RDS?'</em> → <strong>AWS</strong> (es PaaS, RDS gestiona el OS).",
    },

    // ============================================
    // SECCIÓN 2: Well-Architected Framework
    // ============================================
    { kind: "h3", text: "🏛️ 2. AWS Well-Architected Framework (6 pilares)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> El Well-Architected Framework es una guía de <strong>best practices</strong> publicada por AWS, organizada en <strong>6 pilares</strong>. Pregunta clásica del examen: identificar cuál pilar aplica a un escenario.",
    },
    {
      kind: "table",
      headers: ["Pilar", "Sigla EN", "Pregunta clave"],
      rows: [
        ["1. Operational Excellence", "OE", "¿Cómo operamos y mejoramos sistemas?"],
        ["2. Security", "SEC", "¿Cómo protegemos información, sistemas e identidades?"],
        ["3. Reliability", "REL", "¿Cómo aseguramos que el sistema funcione cuando se espera?"],
        ["4. Performance Efficiency", "PERF", "¿Cómo usamos eficientemente los recursos?"],
        ["5. Cost Optimization", "COST", "¿Cómo evitamos costos innecesarios?"],
        ["6. Sustainability", "SUS", "¿Cómo minimizamos el impacto ambiental?"],
      ],
    },

    // ============================================
    // SECCIÓN 3: Cada pilar a fondo
    // ============================================
    { kind: "h3", text: "🔧 3. Los 6 pilares explicados" },
    { kind: "h4", text: "Pilar 1: Operational Excellence" },
    {
      kind: "list",
      items: [
        "Automatizar cambios y operaciones",
        "Hacer cambios pequeños y reversibles",
        "Aprender de fallos (post-mortems sin culpables)",
        "Servicios típicos: <strong>CloudFormation, CloudWatch, Systems Manager</strong>",
      ],
    },
    { kind: "h4", text: "Pilar 2: Security" },
    {
      kind: "list",
      items: [
        "Implementar una base de identidades fuerte (IAM, MFA)",
        "Aplicar least privilege",
        "Encriptar en tránsito y reposo",
        "Trazabilidad (CloudTrail, GuardDuty)",
        "Automatizar respuesta a incidentes",
        "Servicios: <strong>IAM, KMS, GuardDuty, Inspector, Shield, WAF, Macie</strong>",
      ],
    },
    { kind: "h4", text: "Pilar 3: Reliability" },
    {
      kind: "list",
      items: [
        "Recuperación automática de fallos",
        "Probar procedimientos de recuperación",
        "Escalar horizontalmente",
        "Dejar de adivinar capacidad (usar autoscaling)",
        "Manage change in automation",
        "Servicios: <strong>Auto Scaling, ELB, Route 53, RDS Multi-AZ, CloudFormation</strong>",
      ],
    },
    { kind: "h4", text: "Pilar 4: Performance Efficiency" },
    {
      kind: "list",
      items: [
        "Democratizar tecnologías avanzadas (usar managed services)",
        "Ir global en minutos",
        "Usar arquitecturas serverless",
        "Experimentar con frecuencia",
        "Considerar afinidad mecánica (qué corre dónde)",
        "Servicios: <strong>Lambda, CloudFront, ElastiCache, Aurora, DynamoDB</strong>",
      ],
    },
    { kind: "h4", text: "Pilar 5: Cost Optimization" },
    {
      kind: "list",
      items: [
        "Adoptar modelo de consumo (pago por uso)",
        "Medir eficiencia general",
        "Reducir gasto en datacenter heavy lifting",
        "Analizar y atribuir el gasto (tags, Cost Explorer)",
        "Usar managed services para reducir TCO",
        "Servicios: <strong>Cost Explorer, Budgets, Trusted Advisor, Compute Optimizer, Savings Plans</strong>",
      ],
    },
    { kind: "h4", text: "Pilar 6: Sustainability (añadido en 2021)" },
    {
      kind: "list",
      items: [
        "Comprender impacto ambiental",
        "Establecer objetivos de sostenibilidad",
        "Maximizar utilización",
        "Adoptar hardware más eficiente",
        "Usar servicios gestionados",
        "Reducir downstream impact de tus cargas",
      ],
    },

    // ============================================
    // SECCIÓN 4: Well-Architected Tool
    // ============================================
    { kind: "h3", text: "🔧 4. AWS Well-Architected Tool" },
    {
      kind: "info",
      html:
        "AWS provee una <strong>herramienta gratuita</strong> en la consola: el <strong>Well-Architected Tool</strong>. Revisas tus workloads contra los 6 pilares respondiendo cuestionarios. Te genera un reporte con áreas de mejora.",
    },

    // ============================================
    // SECCIÓN 5: AWS Cloud Adoption Framework
    // ============================================
    { kind: "h3", text: "🗺️ 5. AWS Cloud Adoption Framework (CAF)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> El <strong>CAF</strong> es una guía de AWS para planificar adopción cloud organizacionalmente. Tiene <strong>6 perspectivas</strong>.",
    },
    {
      kind: "table",
      headers: ["Perspectiva", "Foco"],
      rows: [
        ["Business", "Valor de negocio, ROI"],
        ["People", "Roles, skills, cultura"],
        ["Governance", "Riesgos, compliance, costos"],
        ["Platform", "Servicios, arquitectura, infra"],
        ["Security", "Postura de seguridad"],
        ["Operations", "Day-to-day operations, soporte"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Diferencia clave:</strong><br/>" +
        "• <strong>Well-Architected</strong>: enfoque en <em>arquitectura</em> de workloads (6 pilares técnicos)<br/>" +
        "• <strong>CAF</strong>: enfoque en <em>adopción organizacional</em> de cloud (6 perspectivas de negocio + tecnología)",
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m3_matching",
      pairs: [
        { en: "Operational Excellence", es: "Cómo operamos y mejoramos sistemas" },
        { en: "Security", es: "Cómo protegemos info e identidades" },
        { en: "Reliability", es: "Sistema funciona cuando se espera" },
        { en: "Performance Efficiency", es: "Uso eficiente de recursos" },
        { en: "Cost Optimization", es: "Evitar costos innecesarios" },
        { en: "Sustainability", es: "Impacto ambiental reducido" },
        { en: "Security OF the cloud", es: "Responsabilidad de AWS" },
        { en: "Security IN the cloud", es: "Responsabilidad del cliente" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m3_fill",
      items: [
        { text: "AWS asegura la seguridad ___ el cloud.", answer: "OF", es: "OF / DEL" },
        { text: "Cliente asegura la seguridad ___ el cloud.", answer: "IN", es: "IN / EN" },
        { text: "Well-Architected tiene ___ pilares.", answer: "6", es: "6" },
        { text: "El sexto pilar añadido en 2021 es ___.", answer: "Sustainability", es: "Sustainability" },
        { text: "CAF (Cloud Adoption Framework) tiene ___ perspectivas.", answer: "6", es: "6" },
      ],
    },

    // ============================================
    // QUIZ FINAL
    // ============================================
    {
      kind: "quiz",
      key: "m3_quiz",
      questions: [
        {
          q: "Según el modelo de Responsabilidad Compartida, AWS es responsable de:",
          options: [
            "TODA la seguridad incluyendo IAM",
            "Security OF the cloud: infraestructura, hardware, virtualización",
            "Solo seguridad física",
            "Nada, todo es del cliente",
          ],
          correct: 1,
          explanation:
            "AWS asegura la infra (security OF the cloud). El cliente asegura sus datos, configuración, identidades, OS guest en EC2 (security IN the cloud).",
        },
        {
          q: "¿Quién es responsable del patching del OS en EC2?",
          options: ["AWS", "Cliente", "Ambos", "Ninguno"],
          correct: 1,
          explanation:
            "EC2 es IaaS. El cliente gestiona el OS guest, incluyendo parches. En PaaS como RDS, AWS gestiona el OS.",
        },
        {
          q: "¿Quién es responsable del patching del OS subyacente en RDS?",
          options: ["AWS", "Cliente", "Ambos", "Compute Engine"],
          correct: 0,
          explanation:
            "RDS es PaaS administrado: AWS gestiona el OS, motor de BD, backups, parches. El cliente solo gestiona schema y datos.",
        },
        {
          q: "¿Quién es siempre responsable de los DATOS del cliente?",
          options: ["AWS", "El cliente, sin importar el servicio", "Ambos", "Depende del SLA"],
          correct: 1,
          explanation:
            "Los DATOS son SIEMPRE responsabilidad del cliente, en cualquier servicio. AWS no accede ni gestiona el contenido de tus datos.",
        },
        {
          q: "El Well-Architected Framework tiene cuántos pilares:",
          options: ["4", "5", "6", "10"],
          correct: 2,
          explanation:
            "Son 6 pilares: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability.",
        },
        {
          q: "El pilar 'Reliability' se enfoca en:",
          options: [
            "Costo",
            "Que el sistema funcione cuando se espera (incluye recovery)",
            "Performance",
            "Seguridad",
          ],
          correct: 1,
          explanation:
            "Reliability cubre disponibilidad, recuperación de fallos, escalado automático, capacidad. Servicios: ELB, Auto Scaling, Route 53, Multi-AZ.",
        },
        {
          q: "¿Cuál pilar fue añadido al Well-Architected en 2021?",
          options: ["Operational Excellence", "Security", "Sustainability", "Reliability"],
          correct: 2,
          explanation:
            "Sustainability fue el 6º pilar añadido en 2021, reconociendo la importancia de reducir impacto ambiental al diseñar workloads cloud.",
        },
        {
          q: "Una empresa quiere reducir TCO eligiendo servicios serverless y optimizando uso:",
          options: ["Operational Excellence", "Cost Optimization", "Performance Efficiency", "Reliability"],
          correct: 1,
          explanation:
            "Cost Optimization: adoptar pago por consumo, medir eficiencia, usar managed services. Servicios: Savings Plans, Cost Explorer, Compute Optimizer.",
        },
        {
          q: "Cloud Adoption Framework (CAF) tiene cuántas perspectivas:",
          options: ["4", "5", "6", "7"],
          correct: 2,
          explanation:
            "CAF tiene 6 perspectivas: Business, People, Governance, Platform, Security, Operations.",
        },
        {
          q: "Para auto-evaluar arquitectura contra los 6 pilares:",
          options: ["Trusted Advisor", "Well-Architected Tool", "Compute Optimizer", "Cost Explorer"],
          correct: 1,
          explanation:
            "AWS Well-Architected Tool (gratuito en consola) te guía con cuestionarios sobre los 6 pilares y genera reportes con mejoras.",
        },
        {
          q: "Una empresa quiere mejorar cómo opera, automatiza, e itera. ¿Pilar?",
          options: ["Operational Excellence", "Cost Optimization", "Security", "Reliability"],
          correct: 0,
          explanation:
            "Operational Excellence: automatizar cambios, monitorear, aprender de fallos. Servicios: CloudFormation, CloudWatch, Systems Manager.",
        },
      ],
    },
  ],
};
