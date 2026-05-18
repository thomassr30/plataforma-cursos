import type { GlossaryEntry } from "@/types/course";

export const glossary: GlossaryEntry[] = [
  // Floci & emuladores
  { en: "Floci", es: "Emulador local open-source de AWS (MIT), corre en Docker en puerto 4566", cat: "Floci" },
  { en: "LocalStack", es: "Alternativa a Floci; desde 2026 su edición Community requiere auth token", cat: "Floci" },
  { en: "MinIO", es: "Emulador local solo de S3, compatible con su API", cat: "Floci" },
  { en: "Endpoint URL", es: "URL al que apunta el AWS CLI/SDK; en Floci es http://localhost:4566", cat: "Floci" },
  { en: "host.docker.internal", es: "Hostname para que un contenedor acceda al host; usado dentro de Lambdas en Floci", cat: "Floci" },

  // Fundamentos
  { en: "AWS", es: "Amazon Web Services, plataforma cloud líder mundial", cat: "Fundamentos" },
  { en: "Cloud Computing", es: "Entrega on-demand de recursos IT vía internet con pago por uso", cat: "Fundamentos" },
  { en: "IaaS", es: "Infrastructure as a Service: VMs, red, storage (ej. EC2)", cat: "Fundamentos" },
  { en: "PaaS", es: "Platform as a Service: plataforma con runtime gestionado (ej. Elastic Beanstalk)", cat: "Fundamentos" },
  { en: "SaaS", es: "Software as a Service: software listo (Gmail, Salesforce)", cat: "Fundamentos" },
  { en: "Region", es: "Área geográfica de AWS (us-east-1, eu-west-1, etc.)", cat: "Fundamentos" },
  { en: "Availability Zone", es: "Datacenter independiente dentro de una región", cat: "Fundamentos" },
  { en: "Shared Responsibility Model", es: "AWS cuida la nube; el cliente cuida lo que está en la nube", cat: "Fundamentos" },

  // IAM
  { en: "IAM", es: "Identity and Access Management: servicio de identidades y permisos", cat: "IAM" },
  { en: "IAM User", es: "Identidad permanente con credenciales fijas", cat: "IAM" },
  { en: "IAM Group", es: "Conjunto de users que comparten policies", cat: "IAM" },
  { en: "IAM Role", es: "Identidad asumible que entrega credenciales temporales", cat: "IAM" },
  { en: "Policy", es: "Documento JSON con permisos (Allow/Deny sobre Action/Resource)", cat: "IAM" },
  { en: "Trust Policy", es: "Define qué entidades pueden asumir un role", cat: "IAM" },
  { en: "ARN", es: "Amazon Resource Name: identificador único de cada recurso AWS", cat: "IAM" },
  { en: "STS", es: "Security Token Service: emite credenciales temporales (AssumeRole)", cat: "IAM" },
  { en: "Least Privilege", es: "Principio: otorgar los permisos mínimos necesarios", cat: "IAM" },

  // S3
  { en: "S3", es: "Simple Storage Service: almacenamiento de objetos", cat: "S3" },
  { en: "Bucket", es: "Contenedor de objetos en S3 (nombre globalmente único en AWS real)", cat: "S3" },
  { en: "Object Key", es: "Identificador de un objeto dentro de un bucket (puede tener '/')", cat: "S3" },
  { en: "Versioning", es: "Conservar versiones anteriores al sobrescribir o borrar objetos", cat: "S3" },
  { en: "Pre-signed URL", es: "URL firmada con tus credenciales para dar acceso temporal sin auth", cat: "S3" },
  { en: "Object Lock", es: "Bloqueo de objetos para compliance (GOVERNANCE/COMPLIANCE)", cat: "S3" },
  { en: "S3 Standard", es: "Storage class por defecto, acceso frecuente", cat: "S3" },
  { en: "S3 Glacier Deep Archive", es: "Storage class más barata, recuperación 12h, archivos legales", cat: "S3" },
  { en: "forcePathStyle", es: "Opción del SDK para usar URLs path-style (necesario con Floci)", cat: "S3" },

  // DynamoDB
  { en: "DynamoDB", es: "Base de datos NoSQL key-value + document managed", cat: "DynamoDB" },
  { en: "Partition Key", es: "Clave de particionamiento; primer componente de la primary key", cat: "DynamoDB" },
  { en: "Sort Key", es: "Segunda parte de la clave compuesta; ordena items con misma partition", cat: "DynamoDB" },
  { en: "GSI", es: "Global Secondary Index: índice con cualquier partition/sort key, creable después", cat: "DynamoDB" },
  { en: "LSI", es: "Local Secondary Index: misma partition key, distinta sort key, solo al crear", cat: "DynamoDB" },
  { en: "Query", es: "Lectura eficiente de items con misma partition key", cat: "DynamoDB" },
  { en: "Scan", es: "Lectura completa de la tabla; cara y desaconsejada", cat: "DynamoDB" },
  { en: "RCU", es: "Read Capacity Unit: 1 lectura/seg de item ≤ 4 KB (strongly consistent)", cat: "DynamoDB" },
  { en: "WCU", es: "Write Capacity Unit: 1 escritura/seg de item ≤ 1 KB", cat: "DynamoDB" },
  { en: "TTL", es: "Time To Live: borrado automático de items al expirar", cat: "DynamoDB" },
  { en: "Streams", es: "Cambios en la tabla expuestos como stream para Lambda/replicación", cat: "DynamoDB" },

  // SQS / SNS
  { en: "SQS", es: "Simple Queue Service: colas de mensajes managed", cat: "Mensajería" },
  { en: "Standard Queue", es: "Cola SQS con throughput alto, orden best-effort, posibles duplicados", cat: "Mensajería" },
  { en: "FIFO Queue", es: "Cola SQS con orden estricto y exactly-once; nombre debe terminar en .fifo", cat: "Mensajería" },
  { en: "Visibility Timeout", es: "Tiempo que un mensaje queda oculto tras ser leído", cat: "Mensajería" },
  { en: "DLQ", es: "Dead Letter Queue: cola para mensajes que fallaron N veces", cat: "Mensajería" },
  { en: "Long Polling", es: "ReceiveMessage espera hasta N seg por mensajes; más eficiente que short polling", cat: "Mensajería" },
  { en: "SNS", es: "Simple Notification Service: pub/sub managed", cat: "Mensajería" },
  { en: "Topic", es: "Canal pub/sub al que se publica y los subscriptores reciben", cat: "Mensajería" },
  { en: "Subscription", es: "Vínculo entre un topic SNS y un destino (SQS, Lambda, HTTP, email)", cat: "Mensajería" },
  { en: "Fan-out", es: "Patrón SNS+SQS: un publish llega a varias colas independientes", cat: "Mensajería" },
  { en: "Filter Policy", es: "Filtro en una subscription para recibir solo mensajes que matchean atributos", cat: "Mensajería" },

  // Lambda / API Gateway
  { en: "Lambda", es: "Functions as a Service: ejecutas código sin gestionar servidores", cat: "Compute" },
  { en: "Runtime", es: "Entorno de ejecución de una Lambda (nodejs20.x, python3.12, etc.)", cat: "Compute" },
  { en: "Handler", es: "Punto de entrada del código de la Lambda (ej. index.handler)", cat: "Compute" },
  { en: "Execution Role", es: "IAM role que define qué puede hacer la Lambda", cat: "Compute" },
  { en: "Cold Start", es: "Primera invocación tras inactividad; tarda más que un warm start", cat: "Compute" },
  { en: "Event Source Mapping", es: "Vínculo que hace que Lambda procese mensajes de SQS/Kinesis/Streams", cat: "Compute" },
  { en: "Provisioned Concurrency", es: "Mantener N entornos calientes para evitar cold starts", cat: "Compute" },
  { en: "Function URL", es: "Endpoint HTTPS directo de Lambda sin API Gateway", cat: "Compute" },
  { en: "API Gateway", es: "Servicio para publicar APIs HTTP/REST sin servidor", cat: "Compute" },
  { en: "REST API", es: "Tipo de API en API Gateway con features completos", cat: "Compute" },
  { en: "HTTP API v2", es: "Tipo de API en API Gateway, simple y ~70% más barata", cat: "Compute" },
  { en: "Stage", es: "Despliegue nombrado de una API (dev, staging, prod)", cat: "Compute" },
  { en: "Lambda Proxy Integration", es: "Integración que pasa el request HTTP completo como evento a la Lambda", cat: "Compute" },

  // RDS
  { en: "RDS", es: "Relational Database Service: bases relacionales managed", cat: "RDS" },
  { en: "Aurora", es: "RDS optimizada por AWS, hasta 5x más rápida que MySQL estándar", cat: "RDS" },
  { en: "Multi-AZ", es: "Réplica síncrona en otra AZ con failover automático (HA, no para leer)", cat: "RDS" },
  { en: "Read Replica", es: "Réplica asíncrona para distribuir carga de lectura", cat: "RDS" },
  { en: "IAM Database Authentication", es: "Conectarse a la DB con tokens IAM en vez de password", cat: "RDS" },
  { en: "Automated Backup", es: "Backup diario + transaction logs con point-in-time recovery", cat: "RDS" },
  { en: "DB Snapshot", es: "Backup manual on-demand que no expira", cat: "RDS" },

  // KMS / Secrets
  { en: "KMS", es: "Key Management Service: claves de encriptación managed", cat: "Seguridad" },
  { en: "KMS Key", es: "Clave maestra administrada por KMS; nunca sale del servicio si es simétrica", cat: "Seguridad" },
  { en: "Data Key", es: "Clave simétrica generada por KMS para encriptación local de datos grandes", cat: "Seguridad" },
  { en: "Envelope Encryption", es: "Encriptar datos con data key local, y la data key con KMS key maestra", cat: "Seguridad" },
  { en: "Customer Managed Key", es: "KMS key creada y administrada por el cliente", cat: "Seguridad" },
  { en: "Secrets Manager", es: "Servicio para guardar secretos con rotación automática", cat: "Seguridad" },
  { en: "SSM Parameter Store", es: "Almacén de configuración (SecureString opcional con KMS)", cat: "Seguridad" },

  // CloudWatch
  { en: "CloudWatch", es: "Servicio de observabilidad: logs, métricas, alarms, dashboards", cat: "Observabilidad" },
  { en: "Log Group", es: "Namespace de logs, usualmente uno por aplicación/servicio", cat: "Observabilidad" },
  { en: "Log Stream", es: "Fuente continua de logs dentro de un log group", cat: "Observabilidad" },
  { en: "Metric Filter", es: "Regla que cuenta matches en logs y los expone como métrica", cat: "Observabilidad" },
  { en: "Alarm", es: "Disparador basado en una métrica; típicamente notifica vía SNS", cat: "Observabilidad" },

  // CloudFormation
  { en: "CloudFormation", es: "Servicio de Infrastructure as Code nativo de AWS", cat: "IaC" },
  { en: "Template", es: "Archivo YAML/JSON que describe los recursos AWS a crear", cat: "IaC" },
  { en: "Stack", es: "Instancia desplegada de un template", cat: "IaC" },
  { en: "Change Set", es: "Preview de los cambios antes de aplicar un update", cat: "IaC" },
  { en: "Drift Detection", es: "Detecta cambios out-of-band respecto al estado declarado", cat: "IaC" },
  { en: "SAM", es: "Serverless Application Model: extensión de CloudFormation para serverless", cat: "IaC" },
  { en: "CDK", es: "Cloud Development Kit: define infra en TS/Python/Java; genera CloudFormation", cat: "IaC" },
];
