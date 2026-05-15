import type { ModuleData } from "@/types/course";

export const m8: ModuleData = {
  slug: "m8",
  number: 8,
  title: "Seguridad, Identidad y Compliance en AWS",
  icon: "🔒",
  intro:
    "Seguridad es el dominio MÁS pesado del examen (30%). Aquí veremos IAM (identidades y permisos), KMS (encriptación), Shield/WAF (protección DDoS y app), GuardDuty/Inspector/Macie (threat detection) y muchos más.",
  totalActivities: 4,
  blocks: [
    // ============================================
    // SECCIÓN 1: IAM
    // ============================================
    { kind: "h3", text: "🔑 1. IAM - Identity and Access Management" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> IAM controla <strong>quién puede hacer qué sobre qué recurso</strong> en AWS. Es <strong>GLOBAL</strong> y <strong>gratuito</strong>. Cimiento de toda la seguridad en AWS.",
    },
    { kind: "h4", text: "Componentes IAM" },
    {
      kind: "table",
      headers: ["Componente", "Qué es"],
      rows: [
        ["IAM User", "Identidad para una persona o app (con credenciales)"],
        ["IAM Group", "Grupo de users (asignas permisos a un grupo)"],
        ["IAM Role", "Identidad temporal asumida por servicios/users"],
        ["IAM Policy", "JSON: define qué acciones sobre qué recursos (Allow/Deny)"],
        ["Federated User", "User externo (Active Directory, Google, etc.) con SSO"],
      ],
    },
    { kind: "h4", text: "Best Practices de IAM (PREGUNTA CLÁSICA)" },
    {
      kind: "list",
      items: [
        "❌ <strong>NO usar la cuenta root</strong> para operaciones diarias",
        "✅ <strong>Habilitar MFA</strong> en la cuenta root y users privilegiados",
        "✅ Aplicar <strong>least privilege</strong>",
        "✅ Usar <strong>grupos</strong> para asignar permisos colectivamente",
        "✅ Usar <strong>roles</strong> en vez de access keys cuando sea posible",
        "✅ <strong>Rotar credenciales</strong> regularmente",
        "✅ Auditar con <strong>CloudTrail</strong> y <strong>IAM Access Analyzer</strong>",
        "✅ Usar <strong>SSO / IAM Identity Center</strong> para múltiples cuentas",
      ],
    },

    // ============================================
    // SECCIÓN 2: AWS Organizations
    // ============================================
    { kind: "h3", text: "🏢 2. AWS Organizations" },
    {
      kind: "info",
      html:
        "<strong>Organizations</strong> permite gestionar múltiples cuentas AWS como una sola entidad. Beneficios: <strong>consolidated billing</strong>, <strong>SCPs</strong>, descuentos compartidos (CUDs/RIs), aplicación de políticas centralizada.",
    },
    {
      kind: "list",
      items: [
        "<strong>Management Account</strong>: la cuenta raíz que gestiona",
        "<strong>Member Accounts</strong>: cuentas hijas",
        "<strong>OUs (Organizational Units)</strong>: agrupar cuentas",
        "<strong>SCPs (Service Control Policies)</strong>: definen MÁXIMO permitido en cuentas/OUs",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 IAM Policy vs SCP:</strong><br/>" +
        "• <strong>IAM Policy</strong> da permisos a un user/role.<br/>" +
        "• <strong>SCP</strong> define los MÁXIMOS permisos posibles en una cuenta. SCP NO da permisos; los LIMITA.",
    },
    { kind: "h4", text: "AWS Control Tower" },
    {
      kind: "paragraph",
      html:
        "<strong>Control Tower</strong> automatiza el setup de landing zones multi-cuenta con best practices: SSO, CloudTrail, Config, guardrails, etc. Ideal para empresas que arrancan con muchas cuentas.",
    },

    // ============================================
    // SECCIÓN 3: Encriptación
    // ============================================
    { kind: "h3", text: "🔐 3. Encriptación en AWS" },
    { kind: "h4", text: "KMS - Key Management Service" },
    {
      kind: "info",
      html:
        "<strong>KMS</strong> gestiona llaves criptográficas. Integrado con prácticamente todos los servicios AWS (S3, EBS, RDS, etc.). FIPS 140-2 Level 2.",
    },
    {
      kind: "list",
      items: [
        "<strong>AWS Managed Keys</strong>: AWS gestiona la llave (default)",
        "<strong>Customer Managed Keys (CMK)</strong>: tú creas y gestionas con control total",
        "<strong>Imported Key Material</strong>: trae tu propia llave",
        "<strong>Automatic Rotation</strong>: rotación anual automática para CMKs",
      ],
    },
    { kind: "h4", text: "CloudHSM" },
    {
      kind: "paragraph",
      html:
        "<strong>CloudHSM</strong> provee módulos hardware (HSM) dedicados, certificación <strong>FIPS 140-2 Level 3</strong>. Más caro que KMS, requerido para ciertos compliance estrictos.",
    },
    { kind: "h4", text: "Secrets Manager vs Parameter Store" },
    {
      kind: "table",
      headers: ["", "Secrets Manager", "Parameter Store (Systems Manager)"],
      rows: [
        ["Propósito", "Almacenar secretos (passwords, API keys)", "Almacén jerárquico de parámetros"],
        ["Rotación automática", "✅ Sí (integrada con RDS)", "❌ No nativa"],
        ["Costo", "$ por secreto/mes", "Gratis (estándar) o pequeño costo (advanced)"],
        ["Caso típico", "Passwords con rotación automática", "Config y secretos simples"],
      ],
    },
    { kind: "h4", text: "Certificate Manager (ACM)" },
    {
      kind: "paragraph",
      html:
        "<strong>ACM</strong> provee certificados SSL/TLS <strong>GRATUITOS</strong> para usar con CloudFront, ALB, API Gateway. Renovación automática.",
    },

    // ============================================
    // SECCIÓN 4: Protección de tráfico
    // ============================================
    { kind: "h3", text: "🛡️ 4. AWS Shield, WAF y Firewall Manager" },
    { kind: "h4", text: "Shield Standard vs Advanced" },
    {
      kind: "table",
      headers: ["Característica", "Shield Standard", "Shield Advanced"],
      rows: [
        ["Costo", "GRATIS (automático)", "$3000/mes + protección"],
        ["Protección DDoS", "Network/transport (L3/L4)", "L3, L4, L7 sofisticada"],
        ["SLA con créditos", "❌", "✅"],
        ["DDoS Response Team", "❌", "✅ DRT 24/7"],
        ["WAF incluido", "❌", "✅"],
      ],
    },
    { kind: "h4", text: "AWS WAF (Web Application Firewall)" },
    {
      kind: "list",
      items: [
        "Filtra <strong>tráfico HTTP malicioso</strong> antes de llegar a la app",
        "Reglas: SQL injection, XSS, IP blocklists, rate limiting, geo blocking",
        "Se integra con <strong>CloudFront, ALB, API Gateway, AppSync</strong>",
        "Reglas administradas por AWS (managed rule groups)",
      ],
    },
    { kind: "h4", text: "AWS Firewall Manager" },
    {
      kind: "paragraph",
      html: "Gestiona <strong>centralmente</strong> políticas de WAF, Shield Advanced, Security Groups, Network Firewall en TODA la Organization.",
    },

    // ============================================
    // SECCIÓN 5: Threat Detection
    // ============================================
    { kind: "h3", text: "🔍 5. Threat Detection y Compliance" },
    {
      kind: "table",
      headers: ["Servicio", "Para qué"],
      rows: [
        ["GuardDuty", "Threat detection continuo con ML (VPC Flow, CloudTrail, DNS logs)"],
        ["Inspector", "Análisis de vulnerabilidades en EC2, containers, Lambda"],
        ["Macie", "Detecta PII en S3 con ML"],
        ["Detective", "Investigación de incidentes (visualiza relaciones)"],
        ["Security Hub", "Dashboard CENTRAL de hallazgos de seguridad"],
        ["Audit Manager", "Audita continuamente compliance contra frameworks"],
        ["Artifact", "Portal donde descargas reportes de compliance (SOC, ISO, PCI)"],
        ["AWS Config", "Inventario, configuración, evaluación contra reglas"],
        ["CloudTrail", "Auditoría de TODAS las llamadas API"],
        ["Network Firewall", "Firewall administrado para VPC (L3-L7)"],
      ],
    },

    // ============================================
    // SECCIÓN 6: Mapeo a categorías
    // ============================================
    { kind: "h3", text: "🎯 6. Mapa rápido de servicios de seguridad" },
    {
      kind: "table",
      headers: ["Necesidad", "Servicio"],
      rows: [
        ["Gestión de usuarios y permisos", "IAM"],
        ["Múltiples cuentas centralizadas", "AWS Organizations"],
        ["Setup automatizado multi-cuenta", "Control Tower"],
        ["Llaves criptográficas", "KMS"],
        ["HSM dedicado FIPS 140-2 Level 3", "CloudHSM"],
        ["Secretos con rotación", "Secrets Manager"],
        ["Certificados SSL/TLS gratis", "Certificate Manager (ACM)"],
        ["DDoS automático", "Shield Standard"],
        ["DDoS avanzado + SLA + DRT", "Shield Advanced"],
        ["WAF para apps web", "AWS WAF"],
        ["Threat detection con ML", "GuardDuty"],
        ["Vulnerabilidades EC2/containers", "Inspector"],
        ["PII en S3", "Macie"],
        ["Audit de API calls", "CloudTrail"],
        ["Compliance reports", "Artifact"],
        ["Dashboard central de seguridad", "Security Hub"],
        ["Inventario y compliance de recursos", "Config"],
      ],
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m8_matching",
      pairs: [
        { en: "IAM", es: "Identidades y permisos (global)" },
        { en: "Organizations", es: "Multi-cuenta + SCPs" },
        { en: "KMS", es: "Llaves criptográficas" },
        { en: "Secrets Manager", es: "Secretos con rotación automática" },
        { en: "ACM", es: "Certificados SSL/TLS gratis" },
        { en: "Shield", es: "Protección DDoS" },
        { en: "WAF", es: "Web Application Firewall" },
        { en: "GuardDuty", es: "Threat detection con ML" },
        { en: "Macie", es: "Detecta PII en S3" },
        { en: "CloudTrail", es: "Auditoría de API calls" },
        { en: "Artifact", es: "Compliance reports" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m8_fill",
      items: [
        { text: "Gestión de identidades y permisos: ___", answer: "IAM", es: "IAM" },
        { text: "Threat detection con ML: ___", answer: "GuardDuty", es: "GuardDuty" },
        { text: "Detectar PII en S3: ___", answer: "Macie", es: "Macie" },
        { text: "Certificados SSL/TLS gratuitos: ___", answer: "ACM", es: "ACM" },
        { text: "WAF + DDoS L7: ___ Advanced", answer: "Shield", es: "Shield" },
      ],
    },

    // ============================================
    // QUIZ FINAL
    // ============================================
    {
      kind: "quiz",
      key: "m8_quiz",
      questions: [
        {
          q: "Best practice de IAM:",
          options: [
            "Usar cuenta root para todo",
            "Habilitar MFA, least privilege, evitar root, usar roles",
            "Compartir credenciales",
            "Solo usar access keys",
          ],
          correct: 1,
          explanation:
            "Best practices: MFA habilitado, least privilege, NO usar root para operaciones diarias, usar roles en vez de access keys, rotar credenciales.",
        },
        {
          q: "Para gestionar múltiples cuentas AWS centralizadamente:",
          options: ["IAM solo", "AWS Organizations", "Solo Trusted Advisor", "Cost Explorer"],
          correct: 1,
          explanation:
            "AWS Organizations centraliza gestión de cuentas: consolidated billing, SCPs, descuentos compartidos, políticas centralizadas.",
        },
        {
          q: "SCP (Service Control Policy) hace:",
          options: [
            "DA permisos a usuarios",
            "LIMITA los máximos permisos posibles en cuenta/OU",
            "Encripta datos",
            "DNS routing",
          ],
          correct: 1,
          explanation:
            "SCPs definen los MÁXIMOS permisos posibles. Un user nunca podrá hacer más que lo permitido por el SCP de su cuenta. NO da permisos, los LIMITA.",
        },
        {
          q: "Para certificados SSL gratuitos con renovación automática:",
          options: ["KMS", "Certificate Manager (ACM)", "Secrets Manager", "Shield"],
          correct: 1,
          explanation:
            "ACM provee certificados públicos GRATIS para CloudFront, ALB, API Gateway, con renovación automática.",
        },
        {
          q: "Para passwords de RDS con rotación automática:",
          options: [
            "Parameter Store estándar",
            "Secrets Manager",
            "IAM",
            "Variables de entorno",
          ],
          correct: 1,
          explanation:
            "Secrets Manager está integrado con RDS para rotar credenciales automáticamente sin downtime. Parameter Store no rota nativamente.",
        },
        {
          q: "Protección DDoS automática y gratuita:",
          options: ["Shield Advanced", "Shield Standard", "WAF", "GuardDuty"],
          correct: 1,
          explanation:
            "Shield Standard se activa AUTOMÁTICAMENTE para todos los clientes AWS, sin costo. Shield Advanced ($3000/mes) ofrece protección más sofisticada.",
        },
        {
          q: "Para bloquear SQL injection y XSS en tu app web:",
          options: ["GuardDuty", "Macie", "AWS WAF", "Shield Standard"],
          correct: 2,
          explanation:
            "AWS WAF tiene reglas para OWASP Top 10 (SQL injection, XSS, etc.). Se integra con CloudFront, ALB, API Gateway.",
        },
        {
          q: "Para detectar threats con machine learning analizando logs:",
          options: ["Inspector", "GuardDuty", "Macie", "Detective"],
          correct: 1,
          explanation:
            "GuardDuty analiza VPC Flow Logs, CloudTrail, DNS logs con ML para detectar comportamientos sospechosos (criptominería, escaneo, etc.).",
        },
        {
          q: "Para análisis de vulnerabilidades en EC2 y containers:",
          options: ["Macie", "Inspector", "GuardDuty", "WAF"],
          correct: 1,
          explanation:
            "Amazon Inspector escanea continuamente EC2, ECR images y Lambda buscando CVEs y configuraciones inseguras.",
        },
        {
          q: "Para descubrir datos personales (PII) en S3:",
          options: ["GuardDuty", "Macie", "Inspector", "Config"],
          correct: 1,
          explanation:
            "Amazon Macie usa ML para descubrir y clasificar datos sensibles (PII, tarjetas, salud) en buckets S3 y alertar sobre exposición.",
        },
        {
          q: "Portal donde descargas reportes SOC, ISO, PCI:",
          options: ["CloudTrail", "Security Hub", "Artifact", "Config"],
          correct: 2,
          explanation:
            "AWS Artifact es el portal de compliance reports. Descargas docs SOC 1/2/3, ISO 27001, PCI DSS, HIPAA, FedRAMP, etc.",
        },
        {
          q: "Para auditar TODAS las llamadas API en AWS:",
          options: ["CloudWatch", "CloudTrail", "Config", "Trusted Advisor"],
          correct: 1,
          explanation:
            "CloudTrail registra TODAS las llamadas API (quién, qué, cuándo, desde dónde). Es fundamental para auditoría y compliance.",
        },
      ],
    },
  ],
};
