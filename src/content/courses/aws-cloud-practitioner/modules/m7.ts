import type { ModuleData } from "@/types/course";

export const m7: ModuleData = {
  slug: "m7",
  number: 7,
  title: "Networking en AWS: VPC, Route 53, CloudFront, ELB",
  icon: "🌐",
  intro:
    "El networking es el sistema circulatorio de tu cuenta AWS. Aquí veremos VPC (red privada), Route 53 (DNS), CloudFront (CDN), ELB (balanceadores), Direct Connect (conexión privada) y más. Es uno de los temas más preguntados del examen.",
  totalActivities: 3,
  blocks: [
    // ============================================
    // SECCIÓN 1: VPC
    // ============================================
    { kind: "h3", text: "🌐 1. VPC - Virtual Private Cloud" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Una VPC es una <strong>red privada virtual aislada</strong> dentro de AWS. Es <strong>regional</strong>: una VPC vive en una sola región (a diferencia de GCP donde es global). Defines IPs, subnets, routing, firewalls.",
    },
    { kind: "h4", text: "Componentes de una VPC" },
    {
      kind: "table",
      headers: ["Componente", "Qué es"],
      rows: [
        ["Subnet", "Subdivisión de IPs dentro de UNA AZ (pública o privada)"],
        ["Internet Gateway (IGW)", "Salida a internet desde subnets públicas"],
        ["NAT Gateway", "Permite a subnets privadas SALIR a internet (no entrar)"],
        ["Route Table", "Reglas de enrutamiento"],
        ["Security Group", "Firewall a nivel de ENI (instancia), STATEFUL"],
        ["Network ACL (NACL)", "Firewall a nivel de SUBNET, STATELESS"],
        ["VPC Endpoint", "Acceso privado a servicios AWS sin pasar por internet"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Security Group vs NACL (PREGUNTA CLÁSICA):</strong><br/>" +
        "• <strong>Security Group</strong>: nivel instancia. STATEFUL (si permites IN, OUT está implícito). Solo allow rules.<br/>" +
        "• <strong>NACL</strong>: nivel subnet. STATELESS (debes permitir IN y OUT). Permite allow Y deny.",
    },

    // ============================================
    // SECCIÓN 2: Conectividad
    // ============================================
    { kind: "h3", text: "🔗 2. Conectividad: VPN, Direct Connect, Peering" },
    {
      kind: "table",
      headers: ["Servicio", "Tipo", "Caso típico"],
      rows: [
        ["VPC Peering", "Conexión 1:1 entre VPCs", "Conectar dos VPCs (no transitivo)"],
        ["Transit Gateway", "Hub central", "Múltiples VPCs + on-prem en un solo hub"],
        ["VPN (Site-to-Site)", "IPsec sobre internet", "Conexión barata on-prem ↔ AWS"],
        ["Direct Connect", "Fibra física dedicada", "Alto bandwidth, baja latencia, predecible"],
        ["Direct Connect Gateway", "Conectar DC a múltiples VPCs", "DX a varias regiones"],
        ["PrivateLink / VPC Endpoint", "Acceso privado a servicios", "Acceder a S3, DynamoDB sin internet"],
      ],
    },

    // ============================================
    // SECCIÓN 3: Route 53
    // ============================================
    { kind: "h3", text: "🌍 3. Amazon Route 53" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Route 53 es el <strong>DNS administrado</strong> de AWS, altamente disponible y escalable. También permite registrar dominios.",
    },
    { kind: "h4", text: "Routing Policies (CRÍTICO examen)" },
    {
      kind: "table",
      headers: ["Policy", "Qué hace"],
      rows: [
        ["Simple", "Una respuesta para un nombre"],
        ["Weighted", "Distribuye tráfico por % entre múltiples destinos (A/B testing)"],
        ["Latency-based", "Dirige a la región con menor latencia"],
        ["Failover", "Activo/pasivo: si activo falla, pasa al pasivo"],
        ["Geolocation", "Por país/continente del usuario"],
        ["Geoproximity", "Por distancia geográfica"],
        ["Multivalue Answer", "Hasta 8 IPs con health checks"],
      ],
    },

    // ============================================
    // SECCIÓN 4: CloudFront
    // ============================================
    { kind: "h3", text: "⚡ 4. Amazon CloudFront (CDN)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> CloudFront es el <strong>CDN global</strong> de AWS. Cachea contenido en <strong>+600 edge locations</strong> para reducir latencia y bandwidth desde origen.",
    },
    {
      kind: "list",
      items: [
        "Soporta cualquier origen (S3, EC2, ALB, on-prem)",
        "<strong>HTTPS</strong> con ACM gratis",
        "Integración con <strong>WAF</strong> y <strong>Shield</strong>",
        "<strong>Lambda@Edge</strong> y <strong>CloudFront Functions</strong>: lógica en el edge",
        "<strong>Signed URLs / Signed Cookies</strong>: contenido privado controlado",
      ],
    },

    // ============================================
    // SECCIÓN 5: Global Accelerator
    // ============================================
    { kind: "h3", text: "🚀 5. AWS Global Accelerator" },
    {
      kind: "info",
      html:
        "Servicio que <strong>mejora latencia y disponibilidad</strong> de apps globales usando la red privada AWS y <strong>Anycast IPs</strong> fijas. Diferente de CloudFront (no es CDN; no cachea).",
    },
    {
      kind: "table",
      headers: ["Característica", "CloudFront", "Global Accelerator"],
      rows: [
        ["Tipo", "CDN (cachea contenido)", "Aceleración de red (no cachea)"],
        ["Caso", "Web, video, static assets", "Apps TCP/UDP, gaming, IoT, VoIP"],
        ["IPs", "Cambia frecuentemente", "Anycast IPs fijas"],
      ],
    },

    // ============================================
    // SECCIÓN 6: ELB
    // ============================================
    { kind: "h3", text: "⚖️ 6. Elastic Load Balancing (ELB)" },
    {
      kind: "table",
      headers: ["Tipo", "Capa", "Cuándo"],
      rows: [
        ["Application LB (ALB)", "L7 (HTTP/HTTPS)", "Apps web, microservicios, host/path routing"],
        ["Network LB (NLB)", "L4 (TCP/UDP)", "Ultra-baja latencia, IoT, gaming"],
        ["Gateway LB (GLB)", "L3", "Despliegue de virtual appliances (firewalls, IDS)"],
        ["Classic LB (CLB)", "L4+L7 legacy", "Solo compatibilidad (deprecated)"],
      ],
    },

    // ============================================
    // SECCIÓN 7: Tabla maestra
    // ============================================
    { kind: "h3", text: "🎯 7. Tabla maestra" },
    {
      kind: "table",
      headers: ["Necesidad", "Servicio"],
      rows: [
        ["Red privada", "VPC"],
        ["DNS administrado", "Route 53"],
        ["CDN global", "CloudFront"],
        ["Aceleración de red TCP/UDP", "Global Accelerator"],
        ["Balanceador HTTP/HTTPS", "ALB"],
        ["Balanceador TCP baja latencia", "NLB"],
        ["Conexión privada con on-prem dedicada", "Direct Connect"],
        ["VPN barata IPsec", "Site-to-Site VPN"],
        ["Hub para muchas VPCs", "Transit Gateway"],
        ["Acceder S3 sin internet", "VPC Endpoint (Gateway)"],
        ["WAF para tu app", "AWS WAF + CloudFront/ALB"],
      ],
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m7_matching",
      pairs: [
        { en: "VPC", es: "Red privada regional" },
        { en: "Security Group", es: "Firewall instance STATEFUL" },
        { en: "NACL", es: "Firewall subnet STATELESS" },
        { en: "Route 53", es: "DNS administrado" },
        { en: "CloudFront", es: "CDN global" },
        { en: "Global Accelerator", es: "Aceleración red Anycast" },
        { en: "ALB", es: "Balanceador HTTP L7" },
        { en: "NLB", es: "Balanceador TCP L4 baja latencia" },
        { en: "Direct Connect", es: "Fibra dedicada con AWS" },
        { en: "Transit Gateway", es: "Hub central de redes" },
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
          q: "Security Group es STATEFUL. ¿Qué significa?",
          options: [
            "Es lo mismo que NACL",
            "Si permites tráfico entrante, el de salida se permite automáticamente",
            "Solo permite TCP",
            "Solo en una región",
          ],
          correct: 1,
          explanation:
            "Stateful = recuerda la conexión. Si dejas entrar tráfico, deja salir respuesta automáticamente. NACL es stateless: debes configurar ambas direcciones.",
        },
        {
          q: "Network ACL es:",
          options: [
            "Firewall a nivel instancia",
            "Firewall a nivel SUBNET, stateless, allow/deny",
            "DNS",
            "VPN",
          ],
          correct: 1,
          explanation:
            "NACL filtra tráfico a nivel subnet, stateless. Permite reglas allow Y deny. Security Group solo allow, stateful, a nivel instancia.",
        },
        {
          q: "Para conexión dedicada de fibra entre on-prem y AWS:",
          options: ["VPN", "Direct Connect", "VPC Peering", "Transit Gateway"],
          correct: 1,
          explanation:
            "Direct Connect es fibra física dedicada (1, 10, 100 Gbps). VPN es sobre internet, más barato pero menos consistente.",
        },
        {
          q: "Para conectar 20 VPCs + on-prem en un hub central:",
          options: ["VPC Peering uno a uno", "Transit Gateway", "Internet Gateway", "NAT Gateway"],
          correct: 1,
          explanation:
            "Transit Gateway es hub-and-spoke. Conecta múltiples VPCs y conexiones on-prem (VPN/Direct Connect) en un punto central.",
        },
        {
          q: "Para que subnets privadas accedan a internet (descargar paquetes) sin ser expuestas:",
          options: ["IGW", "NAT Gateway", "VPC Endpoint", "Route 53"],
          correct: 1,
          explanation:
            "NAT Gateway permite OUTBOUND a internet (instalar paquetes, llamar APIs) pero NO permite tráfico entrante desde internet.",
        },
        {
          q: "Para acceder a S3 desde VPC sin pasar por internet:",
          options: ["Internet Gateway", "NAT Gateway", "VPC Endpoint Gateway", "Direct Connect"],
          correct: 2,
          explanation:
            "VPC Endpoint Gateway (S3 y DynamoDB) provee acceso privado a estos servicios sin pasar por internet. Más seguro y barato.",
        },
        {
          q: "CDN global para cachear assets de sitio web:",
          options: ["Route 53", "CloudFront", "Direct Connect", "ELB"],
          correct: 1,
          explanation:
            "CloudFront es el CDN global de AWS, +600 edge locations. Cachea HTML, JS, CSS, imágenes, videos cerca del usuario.",
        },
        {
          q: "Balanceador L7 con routing por path (/api vs /admin):",
          options: ["NLB", "ALB", "CLB", "GLB"],
          correct: 1,
          explanation:
            "Application Load Balancer (ALB) opera en L7 (HTTP/HTTPS). Permite routing por host, path, headers, query string.",
        },
        {
          q: "Routing policy de Route 53 para A/B testing (10%/90%):",
          options: ["Simple", "Weighted", "Latency-based", "Failover"],
          correct: 1,
          explanation:
            "Weighted routing distribuye tráfico por porcentajes. Ideal para A/B testing, canary deploys, división por capacidad.",
        },
        {
          q: "Routing policy para dirigir usuario a la región más cercana:",
          options: ["Simple", "Weighted", "Latency-based", "Failover"],
          correct: 2,
          explanation:
            "Latency-based routing dirige al endpoint con MENOR latencia desde la ubicación del usuario, usando mediciones de Route 53.",
        },
        {
          q: "Para apps TCP/UDP que necesitan IPs fijas y aceleración global:",
          options: ["CloudFront", "Global Accelerator", "Route 53", "Direct Connect"],
          correct: 1,
          explanation:
            "Global Accelerator usa la red privada AWS y Anycast IPs fijas. Para apps TCP/UDP (gaming, IoT, VoIP). CloudFront es para HTTP.",
        },
      ],
    },
  ],
};
