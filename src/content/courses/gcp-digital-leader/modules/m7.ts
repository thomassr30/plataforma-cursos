import type { ModuleData } from "@/types/course";

export const m7: ModuleData = {
  slug: "m7",
  number: 7,
  title: "Networking en Google Cloud",
  icon: "🌐",
  intro:
    "La red privada de Google es una de las más grandes del mundo, con fibra propia conectando regiones, y +180 puntos de presencia. Entender VPC, balanceadores, CDN y conexiones híbridas es clave para diseñar apps escalables y seguras.",
  totalActivities: 3,
  blocks: [
    // ============================================
    // SECCIÓN 1: VPC
    // ============================================
    { kind: "h3", text: "🌐 1. VPC — Virtual Private Cloud" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Una VPC es una <strong>red privada virtual</strong> en Google Cloud. A diferencia de AWS o Azure, la VPC de GCP es <strong>global</strong>: una sola VPC puede tener subredes en CUALQUIER región. Esto simplifica muchísimo arquitecturas multi-región.",
    },
    { kind: "h4", text: "Conceptos clave" },
    {
      kind: "list",
      items: [
        "<strong>VPC</strong>: red privada (global)",
        "<strong>Subnet</strong>: rango de IPs dentro de una región (regional)",
        "<strong>Firewall rules</strong>: control granular de tráfico (allow/deny por puerto, IP, etiqueta)",
        "<strong>Routes</strong>: rutas para enviar tráfico",
        "<strong>Cloud Router</strong>: enrutamiento dinámico con BGP",
      ],
    },
    { kind: "h4", text: "Tipos de VPCs" },
    {
      kind: "table",
      headers: ["Tipo", "Descripción"],
      rows: [
        ["Auto mode", "GCP crea subnets automáticamente en cada región"],
        ["Custom mode", "Tú defines exactamente las subnets (recomendado producción)"],
        ["Shared VPC", "Una VPC central compartida entre proyectos"],
        ["VPC Peering", "Conectar dos VPCs entre sí (transitivo NO)"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Shared VPC vs VPC Peering:</strong><br/>" +
        "• <strong>Shared VPC</strong>: una organización quiere centralizar red. Un proyecto 'host' comparte la VPC con varios proyectos 'service'.<br/>" +
        "• <strong>VPC Peering</strong>: conectar dos VPCs entre proyectos diferentes o empresas distintas.",
    },

    // ============================================
    // SECCIÓN 2: Balanceadores
    // ============================================
    { kind: "h3", text: "⚖️ 2. Cloud Load Balancing" },
    {
      kind: "paragraph",
      html:
        "GCP tiene varios balanceadores según necesidad. Lo CRUCIAL del examen es saber cuál usar en cada escenario.",
    },
    {
      kind: "table",
      headers: ["Balanceador", "Capa", "Scope", "Caso típico"],
      rows: [
        ["Global External HTTP(S) LB", "L7 (HTTP)", "Global", "Web/API global con CDN, cross-region failover"],
        ["Regional External HTTP(S) LB", "L7", "Regional", "Web regional"],
        ["Internal HTTP(S) LB", "L7", "Regional", "Microservicios internos vía HTTP"],
        ["TCP/SSL Proxy LB", "L4", "Global", "Tráfico TCP/SSL no-HTTP global"],
        ["Network LB", "L4", "Regional", "TCP/UDP pass-through (sin proxy)"],
        ["Internal TCP/UDP LB", "L4", "Regional", "Tráfico interno TCP/UDP"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Regla clave:</strong><br/>" +
        "• Necesitas <strong>distribución global con SSL termination, CDN, header routing</strong> → <strong>Global External HTTP(S) LB</strong><br/>" +
        "• Solo dentro de tu VPC → <strong>Internal LB</strong><br/>" +
        "• Pass-through TCP/UDP regional → <strong>Network LB</strong>",
    },

    // ============================================
    // SECCIÓN 3: Cloud CDN
    // ============================================
    { kind: "h3", text: "⚡ 3. Cloud CDN" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Cloud CDN cachea contenido en los <strong>+180 PoPs (Points of Presence)</strong> globales de Google, sirviendo a los usuarios desde el más cercano. Resultado: <strong>latencia más baja</strong>, <strong>menor egress</strong> (más barato) y <strong>menor carga</strong> en los servidores origen.",
    },
    { kind: "h4", text: "¿Cuándo usar Cloud CDN?" },
    {
      kind: "list",
      items: [
        "Sitios web con contenido estático (CSS, JS, imágenes)",
        "Videos y streaming",
        "Descargas de software",
        "APIs con respuestas cacheables",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Network Service Tiers:</strong><br/>" +
        "• <strong>Premium Tier</strong>: usa la red privada de Google end-to-end. Más rápido, baja latencia, global.<br/>" +
        "• <strong>Standard Tier</strong>: usa internet pública desde la región. Más barato. Solo regional.",
    },

    // ============================================
    // SECCIÓN 4: Conexiones híbridas
    // ============================================
    { kind: "h3", text: "🔗 4. Conexiones entre on-prem y GCP" },
    {
      kind: "table",
      headers: ["Servicio", "Conexión", "Bandwidth", "Uso típico"],
      rows: [
        ["Cloud VPN HA", "IPsec sobre internet", "Hasta 3 Gbps por túnel", "Bajo costo, cargas medianas"],
        ["Cloud Interconnect Dedicated", "Fibra física dedicada", "10 / 100 Gbps", "Alto volumen, baja latencia"],
        ["Cloud Interconnect Partner", "Vía partner ISP", "50 Mbps a 50 Gbps", "Flexibilidad, partner network"],
        ["Cross-Cloud Interconnect", "Conexión directa con AWS/Azure/Oracle", "Variable", "Multi-cloud sin internet"],
        ["Direct Peering", "Peering directo con Google", "Variable", "Acceso a APIs/servicios públicos"],
        ["Carrier Peering", "Vía carrier", "Variable", "Acceso a APIs vía carrier"],
      ],
    },

    // ============================================
    // SECCIÓN 5: Cloud Armor
    // ============================================
    { kind: "h3", text: "🛡️ 5. Cloud Armor: protección web" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Cloud Armor es el <strong>WAF</strong> (Web Application Firewall) y servicio de <strong>protección DDoS</strong> de GCP. Funciona delante del Global HTTP(S) LB.",
    },
    {
      kind: "list",
      items: [
        "<strong>Protección DDoS automática</strong> (basada en años de defender google.com)",
        "<strong>Reglas WAF</strong>: protección OWASP Top 10 (SQL injection, XSS, etc.)",
        "<strong>Rate limiting</strong>: limitar requests por IP/key",
        "<strong>Geo-based blocking</strong>: bloquear países específicos",
        "<strong>Bot management</strong> (con reCAPTCHA Enterprise)",
      ],
    },

    // ============================================
    // SECCIÓN 6: Otros servicios
    // ============================================
    { kind: "h3", text: "🧰 6. Otros servicios de networking" },
    {
      kind: "table",
      headers: ["Servicio", "Para qué"],
      rows: [
        ["Cloud DNS", "DNS administrado de alta disponibilidad (privado y público)"],
        ["Cloud NAT", "Permite a VMs sin IP pública salir a internet"],
        ["Private Google Access", "VMs sin IP pública acceden a APIs de Google"],
        ["VPC Service Controls", "Perímetros lógicos contra exfiltración de datos"],
        ["Cloud IDS", "Detección de intrusiones administrada"],
        ["Network Connectivity Center", "Gestión central de conectividad híbrida"],
        ["Service Directory", "Service discovery"],
      ],
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m7_matching",
      pairs: [
        { en: "VPC", es: "Red privada global" },
        { en: "Subnet", es: "Rango de IPs regional" },
        { en: "Global HTTP(S) LB", es: "Balanceador L7 global" },
        { en: "Cloud CDN", es: "Caché global en +180 PoPs" },
        { en: "Cloud VPN HA", es: "IPsec sobre internet" },
        { en: "Cloud Interconnect", es: "Fibra dedicada o partner" },
        { en: "Cloud Armor", es: "WAF + DDoS protection" },
        { en: "Cloud NAT", es: "Salida a internet sin IP pública" },
        { en: "Cloud DNS", es: "DNS administrado" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m7_fill",
      items: [
        { text: "Red privada global: ___", answer: "VPC", es: "VPC" },
        { text: "Para protección DDoS: ___ ___", answer: "Cloud Armor", es: "Cloud Armor" },
        { text: "Cache global edge: ___ ___", answer: "Cloud CDN", es: "Cloud CDN" },
        { text: "VPN IPsec: Cloud ___", answer: "VPN", es: "VPN" },
        { text: "Fibra dedicada: Cloud ___", answer: "Interconnect", es: "Interconnect" },
      ],
    },

    // ============================================
    // QUIZ FINAL
    // ============================================
    {
      kind: "quiz",
      key: "m7_quiz",
      questions: [
        {
          q: "Empresa quiere conexión dedicada de fibra 10 Gbps con su DC:",
          options: ["Cloud VPN HA", "Cloud Interconnect Dedicated", "Direct Peering", "Carrier Peering"],
          correct: 1,
          explanation:
            "Cloud Interconnect Dedicated ofrece fibra física directa (10/100 Gbps). Es la opción de mayor bandwidth y menor latencia.",
        },
        {
          q: "App web global con CDN, SSL y header routing:",
          options: ["Network LB", "Internal HTTP(S) LB", "Global External HTTP(S) LB", "TCP Proxy"],
          correct: 2,
          explanation:
            "Global External HTTP(S) LB ofrece distribución global, SSL termination, integración con Cloud CDN y enrutamiento por contenido.",
        },
        {
          q: "Para proteger una app contra DDoS y SQL injection:",
          options: ["Cloud DNS", "Cloud NAT", "Cloud Armor", "Cloud VPN"],
          correct: 2,
          explanation:
            "Cloud Armor combina protección DDoS (gracias a la experiencia defendiendo google.com) y reglas WAF (OWASP).",
        },
        {
          q: "VMs sin IP pública necesitan instalar paquetes desde internet:",
          options: ["Cloud VPN", "Cloud NAT", "Cloud Armor", "Cloud DNS"],
          correct: 1,
          explanation:
            "Cloud NAT permite a VMs sin IP pública salir a internet de forma controlada, sin exponerlas.",
        },
        {
          q: "Compartir una sola VPC entre varios proyectos de una organización:",
          options: ["VPC Peering", "Shared VPC", "Cloud VPN", "Network LB"],
          correct: 1,
          explanation:
            "Shared VPC permite que una organización centralice la red y la comparta con proyectos 'service'. Útil para governance.",
        },
        {
          q: "Conectar dos VPCs entre sí (mismo o distintos proyectos):",
          options: ["Shared VPC", "VPC Peering", "Cloud VPN", "Cloud Interconnect"],
          correct: 1,
          explanation:
            "VPC Peering conecta dos VPCs por su red privada. NO es transitivo (si A-B y B-C peerean, A no ve C automáticamente).",
        },
        {
          q: "Para detección de intrusiones administrada:",
          options: ["Cloud Armor", "Cloud IDS", "Cloud DNS", "Cloud NAT"],
          correct: 1,
          explanation:
            "Cloud IDS (Intrusion Detection System) es la solución administrada de Google para detectar malware, exfiltración, intrusiones.",
        },
        {
          q: "Network Service Tier Premium significa:",
          options: [
            "Solo internet pública",
            "Usar la red privada global de Google end-to-end",
            "Más caro sin beneficio",
            "Solo regional",
          ],
          correct: 1,
          explanation:
            "Premium Tier usa la red privada global. Latencia más baja, mejor disponibilidad, sale del datacenter más cercano al usuario.",
        },
        {
          q: "Para empresa multi-cloud que quiere conexión directa entre GCP y AWS (sin internet):",
          options: ["Cloud VPN", "Cross-Cloud Interconnect", "Cloud CDN", "Direct Peering"],
          correct: 1,
          explanation:
            "Cross-Cloud Interconnect provee conexión directa entre Google Cloud y AWS/Azure/Oracle sin pasar por internet pública.",
        },
        {
          q: "Para evitar exfiltración de datos desde BigQuery/GCS por usuarios autorizados:",
          options: [
            "Firewall rules",
            "VPC Service Controls",
            "Cloud DNS",
            "IAM solamente",
          ],
          correct: 1,
          explanation:
            "VPC Service Controls crea perímetros lógicos alrededor de servicios gestionados (BigQuery, GCS) para impedir exfiltración aunque IAM esté correctamente configurado.",
        },
      ],
    },
  ],
};
