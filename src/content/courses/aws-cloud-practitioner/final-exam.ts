import type { QuizQuestion } from "@/types/course";

// 50 preguntas estilo AWS Certified Cloud Practitioner (CLF-C02)
// Distribución según dominios oficiales:
// Domain 1: Cloud Concepts (24%) → ~12 preguntas
// Domain 2: Security and Compliance (30%) → ~15 preguntas
// Domain 3: Cloud Technology and Services (34%) → ~17 preguntas
// Domain 4: Billing, Pricing and Support (12%) → ~6 preguntas
export const finalExam: QuizQuestion[] = [
  // ============ DOMINIO 1: Cloud Concepts ============
  {
    q: "¿Cuál es uno de los principales beneficios FINANCIEROS de migrar a AWS?",
    options: [
      "Eliminar todos los costos de IT",
      "Convertir CapEx (gasto de capital) en OpEx (gasto operativo)",
      "Pagar lo mismo cada mes sin importar uso",
      "Comprar servidores virtualizados",
    ],
    correct: 1,
    explanation:
      "AWS te permite cambiar inversión inicial en hardware (CapEx) por pago basado en uso (OpEx). Esto mejora cash flow y elimina riesgo de capital.",
  },
  {
    q: "¿Cuál de las siguientes es una ventaja del cloud computing según AWS?",
    options: [
      "Garantía de cero costos",
      "Beneficios masivos de economías de escala (massive economies of scale)",
      "Hardware comprado por el cliente",
      "Uso solo en una región",
    ],
    correct: 1,
    explanation:
      "Uno de los 6 beneficios oficiales de AWS: gracias a su escala, AWS negocia mejores precios y traslada esos ahorros a los clientes (continuous price reductions).",
  },
  {
    q: "Una empresa quiere lift-and-shift de sus VMs a AWS. ¿Modelo apropiado?",
    options: ["SaaS", "IaaS (Compute Engine... perdón, EC2)", "PaaS", "FaaS"],
    correct: 1,
    explanation:
      "IaaS (EC2 en AWS) ofrece máquinas virtuales donde puedes correr el OS y software como en on-prem. Es el modelo natural para lift-and-shift.",
  },
  {
    q: "AWS aplica un modelo conocido como:",
    options: ["Pay-as-you-grow", "Pay-as-you-go", "Pre-pay only", "Bundle annual"],
    correct: 1,
    explanation:
      "AWS sigue el modelo Pay-as-you-go: pagas por uso. Sin compromiso obligatorio. Hay descuentos opcionales (Reserved, Savings Plans, Spot).",
  },
  {
    q: "¿Cuál NO es uno de los 6 beneficios oficiales del cloud según AWS?",
    options: [
      "Trade fixed expense for variable expense",
      "Increase speed and agility",
      "Go global in minutes",
      "Guarantee zero outages",
    ],
    correct: 3,
    explanation:
      "Los 6 beneficios oficiales son: trade fixed for variable expense, massive economies of scale, stop guessing capacity, increase speed and agility, stop spending money on data centers, go global in minutes. NINGUNO promete cero outages.",
  },
  {
    q: "El concepto 'elasticity' en el cloud se refiere a:",
    options: [
      "Comprar servidores nuevos",
      "Capacidad de escalar arriba o abajo automáticamente según demanda",
      "Eliminar todos los costos",
      "Solo escalar hacia arriba",
    ],
    correct: 1,
    explanation:
      "Elasticidad = escalar automáticamente arriba y abajo según demanda real. Se logra con Auto Scaling Groups, Lambda, DynamoDB on-demand, etc.",
  },
  {
    q: "Si una empresa quiere su propia infraestructura sin compartir con nadie:",
    options: ["Public Cloud", "Hybrid Cloud", "Private Cloud", "Multi-Cloud"],
    correct: 2,
    explanation:
      "Private Cloud = infra dedicada a una sola organización (en su DC o en uno del proveedor). Útil para regulación estricta.",
  },
  {
    q: "Un escenario donde una empresa usa on-prem + AWS simultáneamente se llama:",
    options: ["Public", "Private", "Hybrid", "Edge"],
    correct: 2,
    explanation:
      "Hybrid Cloud combina on-prem y cloud público trabajando juntos (ej. AWS Outposts, Storage Gateway, Direct Connect).",
  },

  // ============ DOMINIO 2: Security & Compliance ============
  {
    q: "Según el modelo de Responsabilidad Compartida, AWS es responsable de:",
    options: [
      "TODA la seguridad incluyendo configuración del cliente",
      "La seguridad DEL cloud (hardware, hipervisor, red física)",
      "Solo la seguridad física del datacenter",
      "Nada, el cliente es responsable de todo",
    ],
    correct: 1,
    explanation:
      "AWS asegura 'EL cloud' (infraestructura: HW, red, datacenter, hipervisor). El cliente asegura 'EN el cloud' (configuración, datos, IAM, app).",
  },
  {
    q: "¿Cuál es responsabilidad EXCLUSIVA del cliente en EC2?",
    options: [
      "Mantener el hipervisor",
      "Patch del sistema operativo guest",
      "Seguridad física del datacenter",
      "Network ACL del datacenter",
    ],
    correct: 1,
    explanation:
      "En EC2 (IaaS), el cliente es responsable del OS guest (parches, antivirus, configuración). AWS mantiene la capa de virtualización y abajo.",
  },
  {
    q: "Para dar permisos a un usuario para acceder solo a S3 read:",
    options: ["AWS Organizations", "IAM con policy granular", "Security Group", "Network ACL"],
    correct: 1,
    explanation:
      "IAM es el servicio de control de acceso. Las policies definen qué acciones puede ejecutar una identidad sobre qué recursos.",
  },
  {
    q: "Best practice de IAM:",
    options: [
      "Dar AdministratorAccess a todos",
      "Habilitar MFA en cuenta root y usar least privilege",
      "Usar la cuenta root para todo",
      "Compartir credenciales entre usuarios",
    ],
    correct: 1,
    explanation:
      "Best practices: NO usar la cuenta root, habilitar MFA, aplicar least privilege, usar roles en vez de access keys, rotar credenciales.",
  },
  {
    q: "Para proteger una app web pública contra DDoS sin pagar extra:",
    options: ["AWS WAF", "AWS Shield Standard (gratis y automático)", "Inspector", "Macie"],
    correct: 1,
    explanation:
      "AWS Shield Standard se activa AUTOMÁTICAMENTE para todos los clientes AWS sin costo. Shield Advanced (pago) ofrece protección más sofisticada con SLA.",
  },
  {
    q: "Para detectar amenazas continuamente usando ML:",
    options: ["GuardDuty", "WAF", "IAM", "S3"],
    correct: 0,
    explanation:
      "Amazon GuardDuty analiza logs (VPC Flow, CloudTrail, DNS) con ML para detectar amenazas (criptominería, compromiso de instancias, etc.).",
  },
  {
    q: "Para descubrir y proteger PII en S3:",
    options: ["GuardDuty", "Macie", "Inspector", "Detective"],
    correct: 1,
    explanation:
      "Amazon Macie usa ML para descubrir datos sensibles (PII, tarjetas, salud) en buckets S3 y alerta sobre exposición.",
  },
  {
    q: "Para gestionar centralmente múltiples cuentas AWS:",
    options: ["IAM solo", "AWS Organizations", "Security Hub", "CloudWatch"],
    correct: 1,
    explanation:
      "AWS Organizations permite centralizar gestión de múltiples cuentas: SCPs, consolidated billing, control de servicios permitidos.",
  },
  {
    q: "Service Control Policy (SCP) es:",
    options: [
      "Lo mismo que IAM Policy",
      "Política a nivel Organization que LIMITA los máximos permisos posibles",
      "Política de red",
      "Encripta datos",
    ],
    correct: 1,
    explanation:
      "SCPs definen los permisos MÁXIMOS para una cuenta/OU. Funcionan como guardarraíles: un usuario nunca tendrá más permisos que lo que el SCP permite.",
  },
  {
    q: "Para almacenar passwords de BD de forma segura con rotación automática:",
    options: ["Parameter Store", "Secrets Manager", "S3 encriptado", "DynamoDB"],
    correct: 1,
    explanation:
      "Secrets Manager almacena secretos con encriptación, rotación automática (integrada con RDS) y control de acceso vía IAM.",
  },
  {
    q: "Para auditar TODAS las llamadas API en AWS:",
    options: ["CloudWatch", "CloudTrail", "Config", "GuardDuty"],
    correct: 1,
    explanation:
      "AWS CloudTrail registra TODAS las llamadas API (quien hizo qué, cuándo, desde dónde). Es esencial para auditoría y compliance.",
  },
  {
    q: "Para certificados SSL/TLS gratuitos:",
    options: ["KMS", "Certificate Manager (ACM)", "Shield", "WAF"],
    correct: 1,
    explanation:
      "AWS Certificate Manager (ACM) provee certificados públicos GRATUITOS para usar con CloudFront, ALB, API Gateway. Renovación automática.",
  },
  {
    q: "Para llaves criptográficas en hardware certificado FIPS 140-2 Level 3:",
    options: ["KMS estándar", "CloudHSM", "Secrets Manager", "Parameter Store"],
    correct: 1,
    explanation:
      "CloudHSM provee HSM dedicados certificados FIPS 140-2 Level 3. Más caro que KMS pero requerido para ciertos compliance.",
  },
  {
    q: "Compliance certifications de AWS están disponibles en:",
    options: ["S3 abierto", "AWS Artifact (portal de reportes)", "CloudWatch", "Solo bajo NDA"],
    correct: 1,
    explanation:
      "AWS Artifact es el portal donde descargas reportes SOC, ISO, PCI DSS, HIPAA, FedRAMP, etc. para tus propias auditorías.",
  },
  {
    q: "Para análisis automatizado de vulnerabilidades en EC2/containers:",
    options: ["Inspector", "Macie", "Detective", "Config"],
    correct: 0,
    explanation:
      "Amazon Inspector escanea continuamente EC2, container images y Lambda buscando CVEs y configuraciones inseguras.",
  },

  // ============ DOMINIO 3: Cloud Technology & Services ============
  {
    q: "Para correr una función serverless que reacciona a un upload en S3:",
    options: ["EC2", "Lambda", "ECS", "EKS"],
    correct: 1,
    explanation:
      "Lambda es FaaS event-driven. S3 puede triggerizar una Lambda cuando se sube un objeto. Patrón clásico serverless.",
  },
  {
    q: "Para correr containers sin gestionar servidores:",
    options: ["EC2 con Docker", "ECS o EKS con Fargate", "Lambda", "Elastic Beanstalk"],
    correct: 1,
    explanation:
      "Fargate es la opción serverless para containers. ECS-Fargate o EKS-Fargate corren containers sin que tú gestiones EC2.",
  },
  {
    q: "Para object storage con durabilidad de 11 nueves:",
    options: ["EBS", "EFS", "S3", "Instance Store"],
    correct: 2,
    explanation:
      "S3 ofrece 99.999999999% (11 nueves) de durabilidad. Es el servicio de object storage de AWS.",
  },
  {
    q: "Para archivado a largo plazo con retrieval en 12h (más barato):",
    options: ["S3 Standard", "S3 IA", "S3 Glacier Flexible Retrieval", "S3 Glacier Deep Archive"],
    correct: 3,
    explanation:
      "S3 Glacier Deep Archive es la clase MÁS barata. Mínimo 180 días, retrieval estándar de hasta 12 horas. Ideal para compliance y archivado histórico.",
  },
  {
    q: "Para storage de bloques persistente para EC2:",
    options: ["S3", "EBS", "Glacier", "Instance Store"],
    correct: 1,
    explanation:
      "EBS (Elastic Block Store) provee discos persistentes adjuntos a una EC2. Instance Store es EFÍMERO (se pierde al apagar).",
  },
  {
    q: "Para filesystem NFS compartido entre múltiples EC2:",
    options: ["EBS", "EFS", "S3", "Instance Store"],
    correct: 1,
    explanation:
      "EFS (Elastic File System) ofrece NFS administrado, escalable automáticamente, compartido entre múltiples EC2.",
  },
  {
    q: "Una empresa quiere mover petabytes de datos a AWS sin saturar internet:",
    options: ["VPN", "Direct Connect", "Snowmobile (camión físico)", "Storage Transfer"],
    correct: 2,
    explanation:
      "AWS Snow Family incluye Snowmobile (camión de 100PB), Snowball (45TB) y Snowcone (8TB). Para volúmenes muy grandes, físico vence a internet.",
  },
  {
    q: "Para BD relacional administrada compatible con MySQL/PostgreSQL:",
    options: ["DynamoDB", "RDS o Aurora", "Redshift", "Neptune"],
    correct: 1,
    explanation:
      "RDS soporta MySQL/PostgreSQL/MariaDB/Oracle/SQL Server. Aurora es el motor propio de AWS, compatible con MySQL/PostgreSQL pero 5x más rápido.",
  },
  {
    q: "Para BD NoSQL key-value serverless con latencia <10ms:",
    options: ["RDS", "Aurora", "DynamoDB", "Redshift"],
    correct: 2,
    explanation:
      "DynamoDB es NoSQL key-value/documental, serverless, escala automáticamente, latencia sub-10ms. Ideal para apps modernas.",
  },
  {
    q: "Para data warehouse a escala petabyte con queries SQL:",
    options: ["DynamoDB", "RDS", "Redshift", "S3 solamente"],
    correct: 2,
    explanation:
      "Amazon Redshift es el data warehouse de AWS, optimizado para analytics SQL a escala petabyte (similar a BigQuery en GCP).",
  },
  {
    q: "Para cache in-memory (Redis o Memcached):",
    options: ["DynamoDB DAX", "ElastiCache", "S3", "Aurora"],
    correct: 1,
    explanation:
      "ElastiCache es el cache in-memory administrado de AWS, ofrece Redis y Memcached.",
  },
  {
    q: "Para DNS administrado con health checks y routing policies:",
    options: ["CloudFront", "Route 53", "API Gateway", "ELB"],
    correct: 1,
    explanation:
      "Amazon Route 53 es DNS administrado con health checks, geolocation, latency-based, weighted, failover y otros routing policies.",
  },
  {
    q: "Para CDN global que cachea contenido cerca del usuario:",
    options: ["Route 53", "CloudFront", "Direct Connect", "API Gateway"],
    correct: 1,
    explanation:
      "Amazon CloudFront es la CDN global de AWS, con +600 edge locations. Reduce latencia y descarga de origen.",
  },
  {
    q: "Para conexión privada dedicada entre on-prem y AWS:",
    options: ["VPN", "Direct Connect", "VPC Peering", "Transit Gateway"],
    correct: 1,
    explanation:
      "AWS Direct Connect es conexión física dedicada (1Gbps, 10Gbps, 100Gbps). VPN es sobre internet, más barato pero menos consistente.",
  },
  {
    q: "Para conectar muchas VPCs y conexiones híbridas en un solo hub:",
    options: ["VPC Peering", "Transit Gateway", "Internet Gateway", "NAT Gateway"],
    correct: 1,
    explanation:
      "Transit Gateway es el hub que escala VPC interconnections. VPC Peering no es transitivo y se vuelve complejo con muchas VPCs.",
  },
  {
    q: "Para crear, publicar y monetizar APIs HTTP/REST/WebSocket:",
    options: ["CloudFront", "Route 53", "API Gateway", "ELB"],
    correct: 2,
    explanation:
      "Amazon API Gateway maneja autenticación, rate limiting, monetización, transformaciones de payload. Se integra con Lambda, EC2, etc.",
  },
  {
    q: "Para monitoreo (métricas, logs, alarmas) de tus recursos AWS:",
    options: ["CloudTrail", "CloudWatch", "Config", "Trusted Advisor"],
    correct: 1,
    explanation:
      "CloudWatch monitorea: métricas, logs, alarmas, dashboards. CloudTrail audita llamadas API. Config rastrea cambios de configuración.",
  },
  {
    q: "Para inventario, configuración y compliance de recursos:",
    options: ["CloudWatch", "CloudTrail", "AWS Config", "AWS Health"],
    correct: 2,
    explanation:
      "AWS Config rastrea cambios de configuración de recursos y evalúa compliance contra reglas.",
  },
  {
    q: "Para IaC declarativa de AWS (JSON/YAML):",
    options: ["CloudFormation", "Terraform", "OpsWorks", "Systems Manager"],
    correct: 0,
    explanation:
      "AWS CloudFormation es la IaC nativa de AWS con templates JSON/YAML. CDK te permite usar lenguajes de programación que compilan a CloudFormation.",
  },
  {
    q: "Para mensajería pub/sub (notificaciones a múltiples suscriptores):",
    options: ["SQS", "SNS", "EventBridge", "Step Functions"],
    correct: 1,
    explanation:
      "SNS (Simple Notification Service) es pub/sub. SQS es cola (un consumidor procesa por mensaje). EventBridge es event bus con reglas.",
  },

  // ============ DOMINIO 4: Billing, Pricing & Support ============
  {
    q: "Una carga predecible 24/7 por 3 años. ¿Mejor opción de pricing?",
    options: ["On-Demand", "Reserved Instance 3 años o Savings Plan", "Spot", "Sin descuento"],
    correct: 1,
    explanation:
      "Reserved Instance o Compute Savings Plan a 3 años ofrecen hasta 72% off por compromiso. Ideal para cargas estables.",
  },
  {
    q: "Workload batch que tolera interrupciones, máximo ahorro:",
    options: ["On-Demand", "Reserved Instance", "Spot Instance (hasta 90% off)", "Dedicated Host"],
    correct: 2,
    explanation:
      "Spot Instances cuestan hasta 90% menos que On-Demand. AWS puede recuperarlas con 2 min de aviso. Ideal para batch, render, CI/CD, big data.",
  },
  {
    q: "Recomendaciones automáticas sobre costo, performance, security, fault tolerance, service limits:",
    options: ["CloudWatch", "Trusted Advisor", "Config", "Cost Explorer"],
    correct: 1,
    explanation:
      "AWS Trusted Advisor revisa tu cuenta y da recomendaciones en 5 categorías. Acceso completo requiere Business o Enterprise Support.",
  },
  {
    q: "Para establecer un presupuesto y recibir alertas si lo superas:",
    options: ["Cost Explorer", "AWS Budgets", "CloudWatch", "Trusted Advisor"],
    correct: 1,
    explanation:
      "AWS Budgets permite definir budgets (costo, uso, RI, Savings Plans) con alertas cuando se superan thresholds.",
  },
  {
    q: "Para soporte con TAM (Technical Account Manager) dedicado:",
    options: ["Basic", "Developer", "Business", "Enterprise"],
    correct: 3,
    explanation:
      "Enterprise Support incluye TAM dedicado, IEM (Infrastructure Event Management), 15min P1 response, Concierge billing team.",
  },
  {
    q: "Cost Explorer permite:",
    options: [
      "Solo establecer límites",
      "Visualizar y analizar costos pasados, identificar tendencias y proyectar",
      "Eliminar facturas",
      "Solo billing reports",
    ],
    correct: 1,
    explanation:
      "Cost Explorer ofrece visualizaciones gráficas de costos pasados, breakdown por servicio/región/tag, y proyecciones de costo futuro.",
  },
];
