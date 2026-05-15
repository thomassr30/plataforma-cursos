import type { ModuleData } from "@/types/course";

export const m2: ModuleData = {
  slug: "m2",
  number: 2,
  title: "AWS Global Infrastructure",
  icon: "🌍",
  intro:
    "AWS opera la infraestructura cloud más grande del mundo: 32 regiones, 100+ Availability Zones, 600+ edge locations. Entender este modelo es CRÍTICO porque casi toda decisión arquitectónica depende de él: dónde poner las cosas, cómo lograr HA, qué latencia tener.",
  totalActivities: 3,
  blocks: [
    // ============================================
    // SECCIÓN 1: Regiones
    // ============================================
    { kind: "h3", text: "🗺️ 1. AWS Regions" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Una <strong>Region</strong> es un área geográfica con MÚLTIPLES Availability Zones independientes. Cada región es completamente <strong>aislada</strong> de las demás (servicios, datos, identidades). Esto es por diseño para fault tolerance y compliance.",
    },
    {
      kind: "list",
      items: [
        "Ejemplos: <code>us-east-1</code> (N. Virginia), <code>eu-west-1</code> (Ireland), <code>sa-east-1</code> (São Paulo)",
        "Mínimo <strong>3 AZs</strong> por región (algunas tienen hasta 6)",
        "<strong>32 regiones</strong> globales en 2024 (anunciadas)",
        "Cada región es UN datacenter conceptual con MÚLTIPLES físicos (las AZs)",
      ],
    },
    { kind: "h4", text: "¿Cómo elegir una región? (CRÍTICO examen)" },
    {
      kind: "table",
      headers: ["Factor", "Por qué importa"],
      rows: [
        ["Latencia", "Más cerca del usuario = menor latencia"],
        ["Compliance / Data residency", "Algunos países exigen que los datos no salgan (GDPR, regulaciones bancarias)"],
        ["Disponibilidad de servicios", "No todos los servicios están en todas las regiones (especialmente nuevos)"],
        ["Pricing", "Los precios varían entre regiones (us-east-1 suele ser la más barata)"],
        ["Sustentabilidad", "Algunas regiones usan más renovables"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Tip examen:</strong> Si la pregunta dice <em>'la empresa europea exige que sus datos NO salgan de la UE'</em> → elige <strong>una región europea</strong> (eu-west-1, eu-central-1, etc.). Si dice <em>'minimizar latencia para usuarios en Asia'</em> → región de Asia Pacífico.",
    },

    // ============================================
    // SECCIÓN 2: Availability Zones
    // ============================================
    { kind: "h3", text: "🏢 2. Availability Zones (AZs)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Una AZ es <strong>uno o más datacenters físicos</strong> dentro de una región, con energía, refrigeración y red <strong>independientes</strong>. Están separadas físicamente (kilómetros) pero conectadas con <strong>fibra de alta velocidad y baja latencia</strong>.",
    },
    {
      kind: "list",
      items: [
        "Cada región tiene <strong>3+ AZs</strong>",
        "Identificadas: <code>us-east-1a</code>, <code>us-east-1b</code>, <code>us-east-1c</code>",
        "Diseñadas para <strong>fallar independientemente</strong>",
        "Latencia inter-AZ: ~1-2 ms",
        "AWS recomienda desplegar en <strong>al menos 2 AZs</strong> para alta disponibilidad",
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Best practice CRÍTICA:</strong> SIEMPRE deploya en MÚLTIPLES AZs (Multi-AZ). Es la base de High Availability en AWS. Servicios como RDS, ELB, Auto Scaling Groups soportan Multi-AZ nativamente.",
    },

    // ============================================
    // SECCIÓN 3: Edge Locations
    // ============================================
    { kind: "h3", text: "⚡ 3. Edge Locations y Regional Edge Caches" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Son <strong>Points of Presence (PoPs)</strong> distribuidos globalmente para servir contenido CACHEADO cerca del usuario. <strong>600+</strong> edge locations.",
    },
    {
      kind: "list",
      items: [
        "Usadas por <strong>CloudFront</strong> (CDN), <strong>Route 53</strong> (DNS), <strong>AWS Shield</strong>, <strong>Global Accelerator</strong>",
        "Mucho más numerosas que las regiones",
        "Reducen latencia y descargan tráfico del origen",
        "<strong>Regional Edge Caches</strong>: cache intermedio entre origen y edges",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Diferencia AZ vs Edge Location:</strong><br/>" +
        "• <strong>AZ</strong>: datacenter completo donde CORRES tus recursos (EC2, RDS, etc.)<br/>" +
        "• <strong>Edge Location</strong>: PoP donde se CACHEA contenido (no corres apps allí)",
    },

    // ============================================
    // SECCIÓN 4: Local Zones, Wavelength, Outposts
    // ============================================
    { kind: "h3", text: "🌐 4. Extensiones de Infraestructura" },
    {
      kind: "table",
      headers: ["Servicio", "Definición", "Caso de uso"],
      rows: [
        [
          "AWS Local Zones",
          "Extensión de región MÁS CERCA del usuario (ej. Los Angeles, Miami)",
          "Apps que requieren ultra-baja latencia para usuarios locales",
        ],
        [
          "AWS Wavelength",
          "AWS dentro de redes 5G de operadoras (Verizon, KDDI, etc.)",
          "Apps móviles que requieren <10ms (AR/VR, gaming, autos autónomos)",
        ],
        [
          "AWS Outposts",
          "Hardware AWS instalado en TU datacenter",
          "Apps que requieren on-prem por compliance/latencia pero con consistencia AWS",
        ],
        [
          "AWS Snow Family",
          "Dispositivos físicos para mover/computar datos en remotos",
          "Sitios sin internet, edge computing extremo",
        ],
      ],
    },

    // ============================================
    // SECCIÓN 5: Cómo elegir
    // ============================================
    { kind: "h3", text: "🎯 5. Decisiones típicas de infraestructura" },
    { kind: "h4", text: "Escenario 1: app global con baja latencia" },
    {
      kind: "paragraph",
      html: "Desplegar en <strong>varias regiones</strong> + <strong>CloudFront</strong> para CDN + <strong>Route 53</strong> con geolocation routing.",
    },
    { kind: "h4", text: "Escenario 2: app crítica con HA" },
    {
      kind: "paragraph",
      html: "Una región + desplegar en <strong>3 AZs</strong> con <strong>Auto Scaling</strong> y <strong>ELB</strong> + <strong>RDS Multi-AZ</strong>.",
    },
    { kind: "h4", text: "Escenario 3: data residency en Europa" },
    {
      kind: "paragraph",
      html: "Elegir una región europea (eu-west-1, eu-central-1) + <strong>NO replicar fuera</strong> + <strong>S3 Object Lock</strong> si compliance lo exige.",
    },
    { kind: "h4", text: "Escenario 4: app con ultra-baja latencia para móvil 5G" },
    {
      kind: "paragraph",
      html: "<strong>Wavelength Zones</strong> + edge computing dentro de la red del operador.",
    },

    // ============================================
    // SECCIÓN 6: Servicios globales vs regionales
    // ============================================
    { kind: "h3", text: "🌐 6. Servicios GLOBALES vs REGIONALES" },
    {
      kind: "info",
      html:
        "Algunos servicios son <strong>globales</strong> (un solo endpoint mundial) y otros son <strong>regionales</strong> (un endpoint por región).",
    },
    {
      kind: "table",
      headers: ["Tipo", "Ejemplos"],
      rows: [
        ["Servicios GLOBALES", "IAM, Route 53, CloudFront, WAF, Organizations, Shield"],
        ["Servicios REGIONALES", "EC2, S3 (los buckets viven en una región), RDS, VPC, Lambda, DynamoDB"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>⚠️ Cuidado con S3:</strong> aunque parece global por su URL, los <strong>buckets viven en una región específica</strong>. Solo el namespace de nombres es global.",
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m2_matching",
      pairs: [
        { en: "Region", es: "Área geográfica con múltiples AZs" },
        { en: "Availability Zone", es: "Datacenter independiente dentro de una región" },
        { en: "Edge Location", es: "PoP para cache (CloudFront, Route 53)" },
        { en: "Local Zone", es: "Extensión de región más cerca del usuario" },
        { en: "Wavelength", es: "AWS en redes 5G de operadoras" },
        { en: "Outposts", es: "Hardware AWS en tu datacenter" },
        { en: "Snow Family", es: "Dispositivos físicos para datos" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m2_fill",
      items: [
        { text: "Mínimo de AZs por región: ___", answer: "3", es: "3" },
        { text: "Para CDN global: ___ Locations", answer: "Edge", es: "Edge" },
        { text: "AWS en redes 5G: ___", answer: "Wavelength", es: "Wavelength" },
        { text: "Hardware AWS en tu DC: ___", answer: "Outposts", es: "Outposts" },
        { text: "IAM y Route 53 son servicios ___", answer: "globales", es: "globales" },
      ],
    },

    // ============================================
    // QUIZ FINAL
    // ============================================
    {
      kind: "quiz",
      key: "m2_quiz",
      questions: [
        {
          q: "Una AZ es:",
          options: [
            "Una región entera",
            "Un grupo de datacenters físicos independientes dentro de UNA región",
            "Un país",
            "Un edge location",
          ],
          correct: 1,
          explanation:
            "Cada AZ son uno o más datacenters físicamente separados con energía/red propios, conectados con fibra de alta velocidad a las otras AZs de la misma región.",
        },
        {
          q: "Para alta disponibilidad de una app crítica, lo recomendado es:",
          options: [
            "Una sola AZ",
            "Mínimo 2 AZs en la misma región",
            "Solo edge locations",
            "Solo Outposts",
          ],
          correct: 1,
          explanation:
            "Multi-AZ es la práctica estándar de HA en AWS. Si una AZ falla, las otras siguen funcionando. Lo soportan ELB, Auto Scaling, RDS, etc.",
        },
        {
          q: "Una empresa europea exige que los datos NUNCA salgan de la UE:",
          options: [
            "Cualquier región global",
            "Region europea (eu-west-1, eu-central-1, etc.)",
            "Solo us-east-1",
            "Solo edge locations",
          ],
          correct: 1,
          explanation:
            "Para compliance de data residency, elige una región del territorio requerido. AWS no replica datos entre regiones automáticamente.",
        },
        {
          q: "CloudFront usa principalmente:",
          options: ["Regiones", "Availability Zones", "Edge Locations", "Outposts"],
          correct: 2,
          explanation:
            "CloudFront es la CDN de AWS y usa los +600 Edge Locations para servir contenido cacheado lo más cerca posible del usuario.",
        },
        {
          q: "Para una app que necesita <10ms para usuarios móviles en 5G:",
          options: ["CloudFront solo", "AWS Wavelength", "Una sola AZ", "Snow Family"],
          correct: 1,
          explanation:
            "AWS Wavelength coloca recursos de cómputo y storage DENTRO de las redes 5G de operadoras (Verizon, KDDI, etc.). Casos: AR/VR, gaming, vehículos autónomos.",
        },
        {
          q: "Una empresa quiere AWS en su datacenter para latencia local + compliance:",
          options: ["Solo Outposts", "Local Zones", "Snowball", "Direct Connect"],
          correct: 0,
          explanation:
            "AWS Outposts es hardware físico AWS instalado en tu datacenter. Permite correr servicios AWS localmente con la misma API.",
        },
        {
          q: "¿Cuál es un servicio GLOBAL en AWS?",
          options: ["EC2", "S3 bucket", "IAM", "RDS"],
          correct: 2,
          explanation:
            "IAM es global: los usuarios, grupos y roles funcionan en todas las regiones. EC2, S3 buckets, RDS son regionales.",
        },
        {
          q: "Una empresa quiere mover 500 TB de un sitio sin internet:",
          options: ["VPN", "Direct Connect", "Snowball Edge (Snow Family)", "S3 Transfer"],
          correct: 2,
          explanation:
            "AWS Snowball Edge (parte de Snow Family) es un dispositivo físico que se envía al cliente, se llena con datos y se devuelve. Ideal para sitios sin buena conectividad o volúmenes grandes.",
        },
        {
          q: "Latencia inter-AZ es típicamente:",
          options: ["~100ms", "~1-2ms", "~50ms", "0ms"],
          correct: 1,
          explanation:
            "Las AZs están conectadas con fibra de muy alta velocidad. Latencia <2ms permite replicación síncrona (como RDS Multi-AZ).",
        },
        {
          q: "Local Zones se diferencian de Edge Locations en que:",
          options: [
            "Son lo mismo",
            "En Local Zones CORRES recursos (EC2, RDS); en Edge Locations solo HAY CACHE",
            "Edge Locations son más rápidas",
            "Local Zones no existen",
          ],
          correct: 1,
          explanation:
            "Local Zones son extensiones de regiones donde puedes correr workloads (EC2, EBS, RDS) cerca de poblaciones. Edge Locations son solo cache (CloudFront, Route 53).",
        },
      ],
    },
  ],
};
