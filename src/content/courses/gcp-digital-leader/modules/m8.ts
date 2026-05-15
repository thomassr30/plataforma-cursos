import type { ModuleData } from "@/types/course";

export const m8: ModuleData = {
  slug: "m8",
  number: 8,
  title: "Seguridad, Identidad y Compliance",
  icon: "🔒",
  intro:
    "La seguridad en cloud sigue el modelo de Responsabilidad Compartida. Google asegura la infraestructura; tú aseguras la configuración. Aquí veremos IAM, encriptación, Zero Trust (BeyondCorp), Cloud Armor, VPC SC, Security Command Center y los principios fundamentales.",
  totalActivities: 3,
  blocks: [
    // ============================================
    // SECCIÓN 1: Modelo de Responsabilidad Compartida
    // ============================================
    { kind: "h3", text: "🤝 1. Modelo de Responsabilidad Compartida (CRÍTICO)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> En el cloud, Google y el cliente comparten la responsabilidad de seguridad. La línea exacta DEPENDE del servicio: en IaaS, el cliente tiene más responsabilidad; en SaaS, casi nada.",
    },
    { kind: "h4", text: "Quién asegura qué (en general)" },
    {
      kind: "table",
      headers: ["Capa", "On-prem", "IaaS", "PaaS", "SaaS"],
      rows: [
        ["Datos del cliente", "Cliente", "Cliente", "Cliente", "Cliente"],
        ["Acceso y configuración", "Cliente", "Cliente", "Cliente", "Cliente"],
        ["Aplicación", "Cliente", "Cliente", "Cliente", "Google"],
        ["Sistema operativo", "Cliente", "Cliente", "Google", "Google"],
        ["Virtualización", "Cliente", "Google", "Google", "Google"],
        ["Hardware, red, DC físico", "Cliente", "Google", "Google", "Google"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Regla nemotécnica:</strong><br/>" +
        "• <strong>Google asegura EL cloud</strong> (hardware, red, hipervisor, datacenter físico)<br/>" +
        "• <strong>Cliente asegura EN el cloud</strong> (datos, configuración, IAM, app)",
    },

    // ============================================
    // SECCIÓN 2: IAM
    // ============================================
    { kind: "h3", text: "🔑 2. IAM — Identity and Access Management" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> IAM responde a la pregunta <strong>'¿quién puede hacer qué sobre qué recurso?'</strong>. Es el control central de acceso en Google Cloud.",
    },
    { kind: "h4", text: "Conceptos clave" },
    {
      kind: "table",
      headers: ["Concepto", "Qué es"],
      rows: [
        ["Member / Principal", "Identidad: usuario, grupo, service account, dominio Workspace"],
        ["Role", "Conjunto de permisos (ej. roles/storage.objectViewer)"],
        ["Permission", "Acción concreta (ej. storage.objects.get)"],
        ["Resource", "Sobre qué se aplica (proyecto, bucket, etc.)"],
        ["Policy", "Vínculo: identidad ↔ rol ↔ recurso"],
      ],
    },
    { kind: "h4", text: "Tipos de roles" },
    {
      kind: "table",
      headers: ["Tipo", "Descripción", "Recomendación"],
      rows: [
        ["Basic", "Owner, Editor, Viewer. Muy amplios.", "Evitar en producción"],
        ["Predefined", "Granulares por servicio (ej. storage.admin)", "Usar siempre que sea posible"],
        ["Custom", "Tú defines exactamente qué permisos", "Cuando los predefinidos no encajan"],
      ],
    },
    { kind: "h4", text: "Service Accounts" },
    {
      kind: "paragraph",
      html:
        "Las <strong>service accounts</strong> son identidades para que <strong>aplicaciones/servicios</strong> autentiquen (no usuarios humanos). Ejemplo: una VM que necesita escribir en GCS usa una service account.",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Best practices IAM:</strong><br/>" +
        "• <strong>Least privilege</strong>: el mínimo permiso necesario<br/>" +
        "• Usar <strong>grupos</strong> en vez de asignar a usuarios individuales<br/>" +
        "• Evitar roles <strong>Basic</strong> (Owner/Editor) en producción<br/>" +
        "• Rotar credenciales de service accounts<br/>" +
        "• Auditar con <strong>Cloud Audit Logs</strong>",
    },

    // ============================================
    // SECCIÓN 3: Identidad
    // ============================================
    { kind: "h3", text: "👤 3. Cloud Identity y Workspace" },
    {
      kind: "table",
      headers: ["Característica", "Cloud Identity", "Workspace"],
      rows: [
        ["Es un IdP", "✅ Sí", "✅ Sí (incluye Cloud Identity)"],
        ["SSO, 2FA", "✅", "✅"],
        ["Gmail, Drive, Docs, Meet", "❌", "✅"],
        ["Precio", "Gratis (Cloud Identity Free) o pago", "Pago"],
        ["Caso típico", "Solo identidad para GCP", "Productividad + identidad"],
      ],
    },

    // ============================================
    // SECCIÓN 4: BeyondCorp (Zero Trust)
    // ============================================
    { kind: "h3", text: "🚪 4. BeyondCorp: Zero Trust de Google" },
    {
      kind: "info",
      html:
        "<strong>Zero Trust:</strong> nunca confíes basado solo en la red. Verifica <strong>identidad + dispositivo + contexto</strong> en CADA request. No hay 'red interna confiable'.<br/><br/>" +
        "<strong>BeyondCorp Enterprise</strong> es la implementación de Google: acceso a apps internas vía <strong>IAP (Identity-Aware Proxy)</strong> sin VPN tradicional.",
    },
    {
      kind: "list",
      items: [
        "<strong>Sin VPN</strong>: el usuario accede a apps internas via web autenticada",
        "<strong>Device trust</strong>: solo dispositivos verificados acceden",
        "<strong>Context-aware</strong>: ubicación, hora, sistema operativo",
        "<strong>Granular</strong>: cada app tiene su política",
      ],
    },

    // ============================================
    // SECCIÓN 5: Encriptación
    // ============================================
    { kind: "h3", text: "🔐 5. Encriptación en GCP" },
    {
      kind: "paragraph",
      html: "<strong>Todo en GCP se encripta por defecto</strong>, en reposo y en tránsito. NO necesitas hacer nada para eso.",
    },
    { kind: "h4", text: "Opciones de encriptación por nivel de control" },
    {
      kind: "table",
      headers: ["Modelo", "Quién gestiona la llave", "Cuándo usarlo"],
      rows: [
        ["Default Encryption", "Google", "La mayoría de casos"],
        ["CMEK (Customer-Managed Encryption Keys)", "Cliente vía Cloud KMS", "Compliance, regulación"],
        ["CSEK (Customer-Supplied Encryption Keys)", "Cliente provee la llave en cada operación", "Máximo control, complejo"],
        ["Cloud HSM", "Llaves en hardware FIPS 140-2 Level 3", "Compliance estricto"],
        ["Confidential Computing", "Encriptación EN USO (RAM)", "Datos ultra-sensibles en memoria"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 ¿Cuándo CMEK vs CSEK?</strong><br/>" +
        "• <strong>CMEK</strong>: tú gestionas la llave en Cloud KMS, pero Google la usa internamente. Más fácil de operar.<br/>" +
        "• <strong>CSEK</strong>: tú proveés la llave en cada request. Google NO la almacena. Más control pero mucho más complejo.",
    },

    // ============================================
    // SECCIÓN 6: Herramientas de seguridad
    // ============================================
    { kind: "h3", text: "🛡️ 6. Herramientas clave de seguridad" },
    {
      kind: "table",
      headers: ["Herramienta", "Para qué"],
      rows: [
        ["Security Command Center", "Centro UNIFICADO: postura, vulnerabilidades, amenazas, compliance"],
        ["VPC Service Controls", "Perímetros lógicos anti-exfiltración (alrededor de BigQuery, GCS, etc.)"],
        ["Cloud Armor", "WAF + DDoS (delante del Global LB)"],
        ["Secret Manager", "Almacenar y rotar passwords, API keys"],
        ["Cloud KMS", "Gestión de llaves criptográficas"],
        ["Cloud HSM", "Llaves en hardware certificado"],
        ["Cloud DLP", "Detección/protección de PII (Personally Identifiable Information)"],
        ["Cloud IDS", "Detección de intrusiones"],
        ["reCAPTCHA Enterprise", "Protección contra bots"],
        ["Google SecOps (Chronicle)", "SIEM/SOAR para detección y respuesta a amenazas"],
        ["Assured Workloads", "Compliance regulatorio (FedRAMP, IL4, etc.)"],
      ],
    },

    // ============================================
    // SECCIÓN 7: Compliance
    // ============================================
    { kind: "h3", text: "📜 7. Compliance y Certificaciones" },
    {
      kind: "paragraph",
      html:
        "Google Cloud tiene la mayoría de certificaciones globales. Algunas que SUELEN aparecer en el examen:",
    },
    {
      kind: "list",
      items: [
        "<strong>ISO 27001/27017/27018</strong>: gestión de seguridad de la información",
        "<strong>SOC 1, 2, 3</strong>: controles de auditoría",
        "<strong>PCI DSS</strong>: pagos con tarjeta",
        "<strong>HIPAA</strong>: salud (USA)",
        "<strong>GDPR</strong>: protección de datos (UE)",
        "<strong>FedRAMP</strong>: gobierno USA",
        "<strong>FINMA, BaFin</strong>: regulaciones bancarias europeas",
      ],
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m8_matching",
      pairs: [
        { en: "IAM", es: "Quién hace qué sobre qué" },
        { en: "BeyondCorp", es: "Zero Trust de Google" },
        { en: "CMEK", es: "Llaves gestionadas por cliente" },
        { en: "VPC Service Controls", es: "Perímetros anti-exfiltración" },
        { en: "Security Command Center", es: "Centro unificado de seguridad" },
        { en: "Cloud DLP", es: "Detección de PII" },
        { en: "Cloud KMS", es: "Gestión de llaves" },
        { en: "Cloud HSM", es: "Llaves en hardware FIPS 140-2 L3" },
        { en: "Confidential Computing", es: "Encriptación en USO (RAM)" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m8_fill",
      items: [
        { text: "Principio: mínimo privilegio = least ___", answer: "privilege", es: "privilege" },
        { text: "Zero Trust de Google = ___", answer: "BeyondCorp", es: "BeyondCorp" },
        { text: "Llaves del cliente en KMS = ___", answer: "CMEK", es: "CMEK" },
        { text: "Detectar PII en logs/datos = Cloud ___", answer: "DLP", es: "DLP" },
        { text: "Centro unificado de seguridad = Security ___ ___", answer: "Command Center", es: "Command Center" },
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
          q: "El modelo de Responsabilidad Compartida dice que Google es responsable de:",
          options: [
            "TODA la seguridad",
            "La infraestructura (HW, red, hipervisor, DC físico)",
            "La configuración del cliente",
            "Las contraseñas",
          ],
          correct: 1,
          explanation:
            "Google asegura 'EL cloud': infraestructura física, hipervisor, red. El cliente asegura 'EN el cloud': datos, configuración, IAM, app.",
        },
        {
          q: "Mejor práctica IAM:",
          options: [
            "Dar Owner a todos para facilitar",
            "Aplicar least privilege con roles predefinidos o custom",
            "Usar solo roles Basic",
            "Sin auditoría",
          ],
          correct: 1,
          explanation:
            "Least privilege con roles predefinidos (granulares) es la mejor práctica. Los roles Basic (Owner, Editor) son demasiado amplios.",
        },
        {
          q: "Encriptación por defecto en GCP:",
          options: [
            "Solo en BigQuery",
            "Solo en tránsito",
            "Reposo Y tránsito automáticamente, sin configuración",
            "Solo si compras add-on",
          ],
          correct: 2,
          explanation:
            "Todo dato en GCP está encriptado en reposo y en tránsito por defecto. CMEK/CSEK son para mayor control sobre las llaves.",
        },
        {
          q: "Para almacenar passwords y API keys de forma segura:",
          options: ["Variables de entorno en texto plano", "Secret Manager", "Cloud Storage abierto", "Texto en código"],
          correct: 1,
          explanation:
            "Secret Manager es el servicio dedicado para secretos: encriptación, rotación, IAM granular, audit logs.",
        },
        {
          q: "Para implementar Zero Trust con apps internas accesibles sin VPN:",
          options: [
            "Cloud VPN",
            "Identity-Aware Proxy (IAP) + BeyondCorp",
            "Cloud DNS",
            "Cloud NAT",
          ],
          correct: 1,
          explanation:
            "IAP autentica cada request a apps internas (sin VPN). BeyondCorp Enterprise extiende esto con device trust y context-aware access.",
        },
        {
          q: "Para evitar exfiltración de BigQuery aún con IAM correctamente configurado:",
          options: ["Quitar IAM", "VPC Service Controls", "Cloud DNS", "Solo Org Policy"],
          correct: 1,
          explanation:
            "VPC Service Controls crea perímetros alrededor de servicios gestionados. Aunque un usuario autorizado intente sacar datos, el perímetro lo bloquea.",
        },
        {
          q: "Compliance que exige FIPS 140-2 Level 3 para llaves:",
          options: ["Cloud KMS solo", "Cloud HSM", "Secret Manager", "Default encryption"],
          correct: 1,
          explanation:
            "Cloud HSM provee módulos hardware certificados FIPS 140-2 Level 3. Cloud KMS es software (Level 1).",
        },
        {
          q: "Para detectar y enmascarar PII en logs y datasets:",
          options: ["Cloud DLP", "Cloud Armor", "Cloud Logging solo", "BigQuery"],
          correct: 0,
          explanation:
            "Cloud DLP (Data Loss Prevention) identifica datos sensibles (nombres, emails, tarjetas, etc.) y los enmascara, tokeniza o redacta.",
        },
        {
          q: "Una empresa quiere encriptar datos EN USO (RAM cifrada):",
          options: [
            "Imposible en cloud",
            "Confidential Computing (Confidential VMs)",
            "Cloud Storage Encryption",
            "Cloud DNS",
          ],
          correct: 1,
          explanation:
            "Confidential Computing encripta RAM mediante AMD SEV / Intel TDX. Protege datos en uso, no solo en reposo y tránsito.",
        },
        {
          q: "Centro UNIFICADO para gestionar postura de seguridad:",
          options: [
            "Cloud Logging",
            "Security Command Center (SCC)",
            "IAM solamente",
            "Cloud Run",
          ],
          correct: 1,
          explanation:
            "Security Command Center consolida postura de seguridad, vulnerabilidades, amenazas, compliance en un solo lugar.",
        },
        {
          q: "Cloud Identity Free incluye:",
          options: [
            "Gmail y Drive",
            "Identity Provider básico (gratis), sin productividad",
            "Sin SSO",
            "Solo en USA",
          ],
          correct: 1,
          explanation:
            "Cloud Identity Free es un IdP gratuito para gestionar identidades en GCP. NO incluye Gmail/Drive (eso es Workspace).",
        },
      ],
    },
  ],
};
