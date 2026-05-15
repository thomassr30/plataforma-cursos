import type { ModuleData } from "@/types/course";

export const m9: ModuleData = {
  slug: "m9",
  number: 9,
  title: "Management, Monitoring y Governance",
  icon: "📊",
  intro:
    "Cuando tu app está corriendo en AWS, necesitas herramientas para observar (CloudWatch), auditar (CloudTrail), gobernar (Config, Organizations), automatizar (CloudFormation, Systems Manager) y recibir recomendaciones (Trusted Advisor). Este módulo te las cubre.",
  totalActivities: 3,
  blocks: [
    // ============================================
    // SECCIÓN 1: CloudWatch
    // ============================================
    { kind: "h3", text: "📊 1. Amazon CloudWatch" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> CloudWatch es la solución de <strong>observabilidad</strong> de AWS. Centraliza métricas, logs, alarmas y dashboards. La línea de defensa entre 'todo bien' y 'incidente'.",
    },
    {
      kind: "table",
      headers: ["Componente", "Para qué"],
      rows: [
        ["CloudWatch Metrics", "Métricas de AWS y custom"],
        ["CloudWatch Logs", "Centraliza logs de apps, servicios, OS"],
        ["CloudWatch Alarms", "Alertas basadas en umbrales de métricas"],
        ["CloudWatch Dashboards", "Visualización custom de métricas"],
        ["CloudWatch Events / EventBridge", "Eventos del estado de recursos AWS"],
        ["CloudWatch Synthetics", "Canaries que prueban endpoints periódicamente"],
        ["CloudWatch RUM", "Monitoreo real de usuarios en frontend"],
        ["CloudWatch Container Insights", "Métricas y logs de ECS/EKS"],
        ["X-Ray", "Distributed tracing (separado pero relacionado)"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Métricas de EC2 por defecto:</strong> CPU, network, disk I/O, status checks. La <strong>memoria NO</strong> es métrica default; necesitas instalar el CloudWatch Agent para reportarla.",
    },

    // ============================================
    // SECCIÓN 2: CloudTrail
    // ============================================
    { kind: "h3", text: "📜 2. AWS CloudTrail" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> CloudTrail registra <strong>TODAS las llamadas API</strong> ejecutadas en tu cuenta AWS. Esencial para <strong>auditoría, compliance, troubleshooting</strong> y forensics.",
    },
    {
      kind: "list",
      items: [
        "Registra <strong>quién, qué, cuándo, desde dónde</strong>",
        "Por defecto: <strong>90 días</strong> de event history",
        "Para retención mayor: crear un <strong>trail</strong> que exporta a S3",
        "Soporta <strong>multi-region</strong> y <strong>multi-account</strong>",
        "Eventos tipos: <strong>Management Events</strong>, <strong>Data Events</strong>, <strong>Insights Events</strong>",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 CloudWatch vs CloudTrail (PREGUNTA CLÁSICA):</strong><br/>" +
        "• <strong>CloudWatch</strong>: MÉTRICAS y LOGS (performance, errores, salud)<br/>" +
        "• <strong>CloudTrail</strong>: AUDITORÍA de llamadas API (quién hizo qué)",
    },

    // ============================================
    // SECCIÓN 3: AWS Config
    // ============================================
    { kind: "h3", text: "⚙️ 3. AWS Config" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Config rastrea <strong>cambios de configuración</strong> de tus recursos AWS y evalúa contra <strong>reglas</strong> de compliance. Te dice: <em>'¿está mi infraestructura como debe estar?'</em>",
    },
    {
      kind: "list",
      items: [
        "<strong>Snapshot</strong> de configuración de cada recurso a lo largo del tiempo",
        "<strong>Config Rules</strong>: reglas administradas o custom (ej. 's3-bucket-encryption-enabled')",
        "<strong>Compliance dashboard</strong>: te dice qué recursos no cumplen",
        "<strong>Auto-remediation</strong>: puede arreglar automáticamente",
      ],
    },

    // ============================================
    // SECCIÓN 4: Trusted Advisor
    // ============================================
    { kind: "h3", text: "🌟 4. AWS Trusted Advisor" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Trusted Advisor es como tu <strong>consultor AWS automatizado</strong>. Revisa tu cuenta y te da recomendaciones en <strong>5 categorías</strong>.",
    },
    {
      kind: "table",
      headers: ["Categoría", "Ejemplos de checks"],
      rows: [
        ["Cost Optimization", "EC2 sub-utilizadas, idle RDS, unused EBS"],
        ["Performance", "High latency, service limits cerca de máximos"],
        ["Security", "IAM access keys sin rotar, S3 buckets públicos, MFA en root"],
        ["Fault Tolerance", "Sin Multi-AZ, single point of failure, sin backups"],
        ["Service Limits", "Cuotas cerca del máximo"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Importante:</strong> el acceso COMPLETO a Trusted Advisor requiere plan de soporte <strong>Business o Enterprise</strong>. Basic y Developer tienen acceso limitado (solo algunos checks de Security y Service Limits).",
    },

    // ============================================
    // SECCIÓN 5: CloudFormation y CDK
    // ============================================
    { kind: "h3", text: "📝 5. Infrastructure as Code (IaC)" },
    {
      kind: "table",
      headers: ["Herramienta", "Descripción"],
      rows: [
        ["CloudFormation", "IaC declarativa nativa de AWS (JSON/YAML)"],
        ["CDK (Cloud Development Kit)", "IaC con lenguajes (TS, Python, Java, etc.) — compila a CloudFormation"],
        ["SAM (Serverless Application Model)", "CFN especializado para serverless (Lambda, API Gateway)"],
        ["AWS Service Catalog", "Catálogo de templates pre-aprobados para self-service"],
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Beneficios IaC:</strong><br/>" +
        "• Reproducibilidad (mismo entorno dev/staging/prod)<br/>" +
        "• Versionado (git)<br/>" +
        "• Rollback fácil<br/>" +
        "• Code reviews para infraestructura<br/>" +
        "• Documentación automática",
    },

    // ============================================
    // SECCIÓN 6: Systems Manager
    // ============================================
    { kind: "h3", text: "🔧 6. AWS Systems Manager (SSM)" },
    {
      kind: "info",
      html:
        "<strong>Systems Manager</strong> es un conjunto de herramientas para <strong>gestionar operaciones</strong> en tus recursos AWS y on-prem.",
    },
    {
      kind: "table",
      headers: ["Capability", "Para qué"],
      rows: [
        ["Session Manager", "SSH/RDP sin abrir puertos (vía consola/CLI)"],
        ["Run Command", "Ejecutar comandos en muchas EC2 a la vez"],
        ["Patch Manager", "Automatizar parches de OS"],
        ["Parameter Store", "Almacén jerárquico de parámetros y secretos básicos"],
        ["Automation", "Playbooks para tareas repetitivas"],
        ["Inventory", "Inventario de software/hardware de tus VMs"],
        ["Maintenance Windows", "Ventanas de mantenimiento programado"],
      ],
    },

    // ============================================
    // SECCIÓN 7: AWS Health Dashboards
    // ============================================
    { kind: "h3", text: "💚 7. AWS Health Dashboard" },
    {
      kind: "table",
      headers: ["Dashboard", "Qué muestra"],
      rows: [
        ["AWS Health Dashboard (Service Health)", "Estado general de servicios AWS por región (público)"],
        ["Personal Health Dashboard (PHD)", "Eventos que afectan TUS recursos específicamente"],
      ],
    },

    // ============================================
    // SECCIÓN 8: Tabla maestra
    // ============================================
    { kind: "h3", text: "🎯 8. Tabla rápida de servicios management" },
    {
      kind: "table",
      headers: ["Necesidad", "Servicio"],
      rows: [
        ["Métricas, logs, alarmas", "CloudWatch"],
        ["Auditoría de API calls", "CloudTrail"],
        ["Inventario y compliance de config", "Config"],
        ["Recomendaciones (cost, security, perf)", "Trusted Advisor"],
        ["IaC declarativa", "CloudFormation"],
        ["IaC con lenguajes", "CDK"],
        ["Gestión operativa centralizada", "Systems Manager"],
        ["Setup multi-cuenta automatizado", "Control Tower"],
        ["Catálogo self-service de templates", "Service Catalog"],
        ["Estado de servicios AWS y eventos", "Health Dashboard"],
      ],
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m9_matching",
      pairs: [
        { en: "CloudWatch", es: "Métricas, logs, alarmas" },
        { en: "CloudTrail", es: "Auditoría de API calls" },
        { en: "Config", es: "Inventario y compliance" },
        { en: "Trusted Advisor", es: "Recomendaciones 5 categorías" },
        { en: "CloudFormation", es: "IaC declarativa" },
        { en: "CDK", es: "IaC con lenguajes" },
        { en: "Systems Manager", es: "Gestión operativa centralizada" },
        { en: "Health Dashboard", es: "Estado de servicios y eventos" },
      ],
    },

    // ============================================
    // QUIZ FINAL
    // ============================================
    {
      kind: "quiz",
      key: "m9_quiz",
      questions: [
        {
          q: "Para registrar TODAS las llamadas API en AWS (auditoría):",
          options: ["CloudWatch", "CloudTrail", "Config", "Trusted Advisor"],
          correct: 1,
          explanation:
            "CloudTrail audita TODAS las API calls. Quién, qué, cuándo, desde dónde. Esencial para compliance, forensics y troubleshooting.",
        },
        {
          q: "Para alertar cuando CPU de EC2 supera 80%:",
          options: ["CloudTrail", "CloudWatch Alarms", "Config", "Health Dashboard"],
          correct: 1,
          explanation:
            "CloudWatch Alarms se basan en métricas. CloudTrail es auditoría, Config es configuración, Health es estado del servicio.",
        },
        {
          q: "La métrica de MEMORIA en EC2 NO está por defecto. Para verla necesitas:",
          options: [
            "Nada, está por defecto",
            "Instalar CloudWatch Agent",
            "Cambiar el tipo de instancia",
            "Es imposible",
          ],
          correct: 1,
          explanation:
            "Las métricas default de EC2 NO incluyen memoria, disk usage. Necesitas instalar el CloudWatch Agent para reportar métricas detalladas del OS guest.",
        },
        {
          q: "Para evaluar si un bucket S3 cumple la regla 'no-public':",
          options: ["CloudWatch", "AWS Config", "CloudTrail", "Inspector"],
          correct: 1,
          explanation:
            "AWS Config tiene reglas (managed o custom) que evalúan compliance. Ej: 's3-bucket-public-read-prohibited'. Te dice qué cumple y qué no.",
        },
        {
          q: "Recomendaciones automáticas de cost, security, fault tolerance:",
          options: ["CloudWatch", "Trusted Advisor", "Config", "Macie"],
          correct: 1,
          explanation:
            "Trusted Advisor analiza tu cuenta y da recomendaciones en 5 categorías. Acceso completo requiere Business/Enterprise Support.",
        },
        {
          q: "IaC declarativa nativa de AWS (JSON/YAML):",
          options: ["CDK", "CloudFormation", "Terraform", "OpsWorks"],
          correct: 1,
          explanation:
            "CloudFormation es la IaC nativa de AWS con templates JSON/YAML. CDK te permite usar lenguajes (TS, Python) que compilan a CloudFormation.",
        },
        {
          q: "Para SSH a EC2 sin abrir el puerto 22:",
          options: ["VPN obligatoria", "Systems Manager Session Manager", "Solo IPs públicas", "Cloud Trail"],
          correct: 1,
          explanation:
            "SSM Session Manager te da acceso shell a EC2 SIN abrir puertos ni gestionar SSH keys. Todo vía la consola AWS, con logging en CloudTrail.",
        },
        {
          q: "Para gestionar parches de OS en flotas grandes de EC2:",
          options: [
            "Manual en cada uno",
            "Systems Manager Patch Manager",
            "Lambda manual",
            "Cron en cada VM",
          ],
          correct: 1,
          explanation:
            "Patch Manager automatiza parches en flotas de EC2 (Linux/Windows) y on-prem. Define maintenance windows y baselines.",
        },
        {
          q: "Para ver si AWS tiene un outage en tu región:",
          options: ["CloudWatch", "AWS Health Dashboard", "Config", "Cost Explorer"],
          correct: 1,
          explanation:
            "AWS Health Dashboard (public) muestra estado de servicios por región. Personal Health Dashboard muestra eventos específicos a tu cuenta.",
        },
        {
          q: "Para automatizar el setup de cuentas multi-account con best practices:",
          options: ["IAM solo", "AWS Control Tower", "Trusted Advisor", "Systems Manager"],
          correct: 1,
          explanation:
            "Control Tower automatiza landing zones: crea cuentas, configura SSO, CloudTrail, Config, guardrails. Best practices preempaquetadas.",
        },
      ],
    },
  ],
};
