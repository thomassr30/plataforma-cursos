import type { ModuleData } from "@/types/course";

export const m1: ModuleData = {
  slug: "m1",
  number: 1,
  title: "Introducción a AWS y Floci",
  icon: "☁️",
  intro:
    "Antes de tocar Floci conviene entender qué problema resuelve. AWS es la plataforma cloud líder con más de 200 servicios. Floci es un emulador local open-source (MIT) que implementa la API de 26 servicios AWS, ideal para aprender y desarrollar sin gastar dinero ni necesitar internet.",
  totalActivities: 2,
  blocks: [
    // ============================================
    // 1. Cloud computing
    // ============================================
    { kind: "h3", text: "📖 1. ¿Qué es la nube?" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> entrega <em>on-demand</em> de recursos IT (cómputo, almacenamiento, bases de datos, red) a través de internet, con modelo de pago por uso.<br/><br/>" +
        "En lugar de comprar servidores físicos, los <strong>alquilás</strong> por hora, minuto o uso. El proveedor (AWS, GCP, Azure) se encarga del datacenter, hardware, red y mantenimiento.",
    },
    { kind: "h4", text: "Modelos de servicio (CRÍTICO para examen)" },
    {
      kind: "table",
      headers: ["Modelo", "Qué te entrega el proveedor", "Ejemplo AWS"],
      rows: [
        ["IaaS", "Infraestructura: VMs, red, storage. Vos administrás el SO", "EC2, EBS, VPC"],
        ["PaaS", "Plataforma con runtime gestionado. Vos subís solo el código", "Elastic Beanstalk, RDS, Lambda"],
        ["SaaS", "Software listo para usar", "Amazon WorkMail, Gmail, Salesforce"],
      ],
    },

    // ============================================
    // 2. AWS
    // ============================================
    { kind: "h3", text: "🏢 2. ¿Qué es AWS?" },
    {
      kind: "paragraph",
      html:
        "<strong>Amazon Web Services</strong> es la plataforma cloud de Amazon. Líder global con ~32% del mercado y más de <strong>200 servicios</strong>. Empezó en 2006 con S3 y EC2.",
    },
    { kind: "h4", text: "Conceptos centrales" },
    {
      kind: "list",
      items: [
        "<strong>Region</strong>: área geográfica (us-east-1, eu-west-1, sa-east-1). Cada región es independiente",
        "<strong>Availability Zone (AZ)</strong>: datacenter aislado dentro de una región (mínimo 3 por región)",
        "<strong>Edge Locations</strong>: PoPs globales para CDN y baja latencia (600+)",
        "<strong>Servicios globales</strong>: IAM, Route 53, CloudFront — no viven en una región específica",
      ],
    },
    { kind: "h4", text: "Modelo de responsabilidad compartida" },
    {
      kind: "info",
      html:
        "<strong>AWS</strong> cuida la seguridad <strong>DE</strong> la nube (hardware, datacenter, red física, hipervisor).<br/>" +
        "<strong>Cliente</strong> cuida la seguridad <strong>EN</strong> la nube (IAM, encriptación, parches del SO en EC2, datos).<br/><br/>" +
        "<em>Pregunta frecuente del examen:</em> aplicar parches al SO de una EC2 → responsabilidad del cliente. Aplicar parches al hardware físico → AWS.",
    },

    // ============================================
    // 3. Problemas de usar AWS real para aprender
    // ============================================
    { kind: "h3", text: "💸 3. Por qué emular AWS localmente" },
    {
      kind: "list",
      items: [
        "<strong>Costo:</strong> Free Tier tiene límites; un recurso olvidado puede generar facturas inesperadas",
        "<strong>Internet requerido:</strong> sin conexión, no se puede practicar",
        "<strong>Feedback lento:</strong> crear/borrar recursos en AWS real toma minutos, en local segundos",
        "<strong>Riesgo:</strong> errores en una cuenta real pueden borrar datos productivos",
      ],
    },

    // ============================================
    // 4. Floci
    // ============================================
    { kind: "h3", text: "🧱 4. ¿Qué es Floci?" },
    {
      kind: "info",
      html:
        "<strong>Floci</strong> es un emulador local de AWS open-source con licencia MIT. Implementa la API de 26 servicios y corre en Docker. Es la alternativa libre a LocalStack (cuya edición Community ahora requiere auth token y no recibe actualizaciones de seguridad desde marzo 2026).",
    },
    { kind: "h4", text: "Floci vs LocalStack Community" },
    {
      kind: "table",
      headers: ["Aspecto", "Floci", "LocalStack Community"],
      rows: [
        ["Auth token requerido", "No", "Sí (desde marzo 2026)"],
        ["Actualizaciones de seguridad", "Activas", "Congeladas"],
        ["Tiempo de arranque", "~24 ms", "~3.3 s"],
        ["Memoria en idle", "~13 MiB", "~143 MiB"],
        ["Tamaño imagen Docker", "~90 MB", "~1 GB"],
        ["Licencia", "MIT", "Restringida"],
      ],
    },
    { kind: "h4", text: "Servicios cubiertos por Floci" },
    {
      kind: "list",
      items: [
        "<strong>Almacenamiento:</strong> S3 (versioning, Object Lock, pre-signed URLs)",
        "<strong>Bases de datos:</strong> DynamoDB, RDS (PostgreSQL/MySQL reales), ElastiCache",
        "<strong>Mensajería:</strong> SQS, SNS, EventBridge, Kinesis",
        "<strong>Compute:</strong> Lambda (containers Docker reales), ECS",
        "<strong>APIs:</strong> API Gateway REST y HTTP v2",
        "<strong>Identidad:</strong> IAM, STS, Cognito",
        "<strong>Seguridad:</strong> KMS, Secrets Manager, ACM",
        "<strong>Observabilidad:</strong> CloudWatch Logs y Metrics",
        "<strong>IaC:</strong> CloudFormation, Step Functions",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Floci no emula EC2.</strong> No tiene sentido emular máquinas virtuales completas en local: para eso ya está Docker. Floci se enfoca en servicios <em>managed</em>.",
    },

    // ============================================
    // 5. Diferencias clave con AWS real
    // ============================================
    { kind: "h3", text: "⚠️ 5. Diferencias clave con AWS real" },
    {
      kind: "table",
      headers: ["Tema", "AWS real", "Floci"],
      rows: [
        ["Credenciales", "Reales, secretos críticos", "Cualquier string ('test'/'test') funciona"],
        ["Endpoint", "s3.amazonaws.com, etc.", "http://localhost:4566 para todo"],
        ["Region", "Importa para latencia y costos", "Nominal, no afecta nada"],
        ["Costo", "Variable, hay que vigilarlo", "$0"],
        ["HA / Multi-AZ", "Sí", "No (un único contenedor)"],
        ["Networking (VPC, SG)", "Real", "No aplica (todo es localhost)"],
        ["Encriptación en reposo", "Real (FIPS 140-2)", "Nominal"],
      ],
    },
    {
      kind: "info",
      html:
        "Lo que aprendas en Floci te sirve para entender conceptos y practicar comandos. Para ciertos temas (redes, IAM enforcement, alta disponibilidad real, costos) hay que pasar a AWS real eventualmente.",
    },

    // ============================================
    // 6. Quiz
    // ============================================
    { kind: "h3", text: "🎯 Test del módulo 1" },
    {
      kind: "quiz",
      key: "m1_quiz",
      questions: [
        {
          q: "¿Cuál es la principal diferencia entre IaaS y PaaS?",
          options: [
            "IaaS es más barato",
            "IaaS entrega infraestructura y vos administrás el SO; PaaS abstrae el SO",
            "PaaS solo sirve para aplicaciones web",
            "No hay diferencia",
          ],
          correct: 1,
          explanation:
            "IaaS te da los bloques crudos (VM, red, storage) y vos manejás OS y software. PaaS gestiona toda la plataforma y vos solo subís código.",
        },
        {
          q: "Según el modelo de responsabilidad compartida, ¿quién aplica parches al SO de una EC2?",
          options: ["AWS", "El cliente", "Es compartido 50/50", "Depende de la región"],
          correct: 1,
          explanation:
            "En IaaS el cliente es responsable del SO. AWS solo gestiona el hardware, la virtualización y el datacenter físico.",
        },
        {
          q: "¿Por qué Floci no requiere credenciales reales de AWS?",
          options: [
            "Es un emulador local; no hay un servicio central de IAM contra el que validar",
            "Genera credenciales automáticamente",
            "AWS las regala",
            "Usa una API pública",
          ],
          correct: 0,
          explanation:
            "Floci corre en tu máquina y acepta cualquier access key/secret. Esto es válido SOLO en local; en AWS real las credenciales son críticas.",
        },
        {
          q: "¿Cuál de estos servicios NO emula Floci?",
          options: ["S3", "Lambda", "EC2", "DynamoDB"],
          correct: 2,
          explanation:
            "Floci no emula EC2: para máquinas virtuales completas se usa Docker directo. Floci se centra en servicios managed.",
        },
        {
          q: "¿En qué puerto escucha Floci por defecto?",
          options: ["80", "443", "4566", "8080"],
          correct: 2,
          explanation: "Puerto 4566 — el mismo que históricamente usa LocalStack, por compatibilidad de configuración.",
        },
        {
          q: "¿Cuál es la diferencia principal entre una Region y una Availability Zone?",
          options: [
            "No hay diferencia",
            "Una Region contiene varias AZs (datacenters separados con baja latencia entre sí)",
            "Las AZs son más grandes que las Regions",
            "Las AZs son globales",
          ],
          correct: 1,
          explanation:
            "Region = área geográfica con varias AZs. Cada AZ es un datacenter independiente. Esta separación es la base para alta disponibilidad.",
        },
      ],
    },
  ],
};
