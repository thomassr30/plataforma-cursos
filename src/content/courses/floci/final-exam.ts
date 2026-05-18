import type { QuizQuestion } from "@/types/course";

// Examen final integrador del curso de Floci.
// 40 preguntas que mezclan todos los servicios y conceptos vistos en los 15 módulos.
// Estilo CLF-C02: foco en conceptos, casos de uso y diferencias entre servicios.
export const finalExam: QuizQuestion[] = [
  // ============ Fundamentos cloud ============
  {
    q: "¿Cuál de los modelos de servicio cloud le da al cliente la mayor responsabilidad sobre el sistema operativo?",
    options: ["SaaS", "PaaS", "IaaS", "FaaS"],
    correct: 2,
    explanation:
      "IaaS entrega infraestructura cruda (VMs, red, storage) y el cliente administra el SO. PaaS abstrae el SO, SaaS entrega software listo, FaaS son funciones.",
  },
  {
    q: "Según el modelo de responsabilidad compartida de AWS, ¿quién es responsable de la seguridad física del datacenter?",
    options: ["El cliente", "AWS", "El cliente solo en us-east-1", "Es compartido al 50%"],
    correct: 1,
    explanation:
      "AWS es responsable de la seguridad DE la nube (hardware, datacenters, red física). El cliente es responsable de la seguridad EN la nube.",
  },
  {
    q: "Una empresa quiere que sus datos nunca salgan de Brasil por regulaciones. ¿Qué concepto AWS aplica?",
    options: ["Edge locations", "Regiones (region selection)", "Availability Zones", "Outposts"],
    correct: 1,
    explanation:
      "Las Regiones definen dónde viven físicamente los datos. Para residencia de datos en un país, se elige una región dentro de ese país.",
  },
  {
    q: "¿Cuál es la diferencia entre una Region y una Availability Zone?",
    options: [
      "No hay diferencia",
      "Una Region contiene varias AZs físicamente separadas con red rápida entre ellas",
      "Las Regions son más chicas que las AZs",
      "Las AZs están en el espacio",
    ],
    correct: 1,
    explanation:
      "Una Region es un área geográfica compuesta por varias AZs (datacenters independientes con baja latencia entre sí, típicamente < 2 ms RTT).",
  },

  // ============ IAM ============
  {
    q: "¿Qué entidad IAM se usa para dar permisos a una Lambda?",
    options: [
      "Un IAM user con credenciales hardcodeadas en el código",
      "Un role IAM atachado a la función",
      "MFA",
      "Una bucket policy",
    ],
    correct: 1,
    explanation:
      "Las Lambdas usan execution roles. Nunca hardcodear credenciales: es la práctica recomendada y aparece en muchas preguntas del examen.",
  },
  {
    q: "Si un user tiene una policy Allow y otra Deny sobre la misma acción, ¿qué pasa?",
    options: ["Allow gana", "Deny gana", "Error", "Se elige aleatoriamente"],
    correct: 1,
    explanation: "En IAM, Deny gana siempre, sin importar el orden de evaluación.",
  },
  {
    q: "¿Cuál es la mejor práctica para la cuenta root de AWS?",
    options: [
      "Usarla para tareas diarias",
      "Activar MFA y usarla solo para tareas excepcionales; crear users IAM con permisos de admin para el día a día",
      "Borrarla después de crear la cuenta",
      "Compartirla entre el equipo",
    ],
    correct: 1,
    explanation:
      "La root debe quedar reservada para tareas que solo ella puede hacer (cambio de plan, cierre de cuenta). Día a día se usan users IAM.",
  },
  {
    q: "Para que GitHub Actions deploye en AWS, ¿cuál es la forma recomendada?",
    options: [
      "Crear un IAM user y poner las access keys como secret de GitHub",
      "Configurar OIDC entre GitHub y AWS, y que GitHub Actions asuma un role con AssumeRoleWithWebIdentity",
      "Hacer la cuenta pública",
      "Compartir la password root",
    ],
    correct: 1,
    explanation:
      "OIDC + AssumeRoleWithWebIdentity evita credenciales long-lived en secrets. Es el estándar moderno para CI/CD con AWS.",
  },

  // ============ S3 ============
  {
    q: "¿Cuál es el tamaño máximo de un objeto en S3?",
    options: ["100 MB", "5 GB", "5 TB", "Ilimitado"],
    correct: 2,
    explanation: "5 TB por objeto. Para objetos grandes se usa multipart upload.",
  },
  {
    q: "Una empresa quiere que un bucket sea legible públicamente para hostear un sitio estático. ¿Qué configura?",
    options: [
      "Hace el bucket público desde la consola sin más",
      "Crea una bucket policy que permita s3:GetObject a Principal: '*' sobre arn:aws:s3:::bucket/*",
      "Pone los archivos en una carpeta llamada public/",
      "Cambia la región",
    ],
    correct: 1,
    explanation:
      "La forma correcta es una bucket policy explícita. En AWS real además hay que desactivar el 'Block Public Access' del bucket.",
  },
  {
    q: "¿Para qué se usa S3 Glacier Deep Archive?",
    options: [
      "Datos de acceso frecuente",
      "Datos que casi nunca se leen pero hay que conservar muchos años (compliance), con la tarifa más baja",
      "Servir como CDN",
      "Encriptar",
    ],
    correct: 1,
    explanation:
      "Deep Archive es la storage class más barata, con recuperación de hasta 12 horas. Ideal para archivos legales o regulatorios.",
  },
  {
    q: "¿Qué garantiza el versioning en un bucket de S3?",
    options: [
      "Que cada bucket está versionado",
      "Que las versiones anteriores de un objeto se conservan al sobrescribirlo o borrarlo",
      "Que el contenido se encripta",
      "Que se replica a otra región",
    ],
    correct: 1,
    explanation:
      "Versioning conserva todas las versiones. 'Borrar' crea un delete marker pero las versiones siguen accesibles.",
  },

  // ============ DynamoDB ============
  {
    q: "¿Cuál de estas operaciones es más cara en DynamoDB?",
    options: ["GetItem", "Query", "Scan", "PutItem"],
    correct: 2,
    explanation:
      "Scan recorre toda la tabla y consume capacidad proporcional al tamaño total. Es la operación que más conviene evitar en un buen modelado.",
  },
  {
    q: "Si tu tabla tiene clave compuesta user_id (partition) + timestamp (sort), ¿cómo traés todos los registros de un usuario eficientemente?",
    options: ["Scan con filtro", "Query por user_id", "GetItem", "No se puede"],
    correct: 1,
    explanation:
      "Query con partition key es eficiente: trae todos los items con esa partition sin recorrer la tabla entera.",
  },
  {
    q: "¿Cuándo elegirías DynamoDB sobre RDS?",
    options: [
      "Cuando necesitás joins entre varias tablas",
      "Cuando necesitás latencias predecibles de milisegundos a escala masiva con patrones de acceso conocidos",
      "Cuando solo querés guardar archivos",
      "Cuando necesitás schema rígido",
    ],
    correct: 1,
    explanation:
      "DynamoDB brilla en alta escala con patrones de acceso bien definidos. Para joins y queries ad-hoc, RDS es mejor.",
  },

  // ============ SQS / SNS ============
  {
    q: "¿Cuál es la diferencia principal entre SQS Standard y SQS FIFO?",
    options: [
      "FIFO es gratis",
      "FIFO garantiza orden estricto y exactly-once; Standard es best-effort y at-least-once",
      "Standard solo está en us-east-1",
      "No hay diferencia",
    ],
    correct: 1,
    explanation:
      "FIFO entrega en orden y sin duplicados, con throughput limitado. Standard escala más pero puede entregar fuera de orden o duplicar.",
  },
  {
    q: "¿Qué es el patrón 'fan-out' en AWS?",
    options: [
      "Un patrón de UI",
      "Un topic SNS con varias colas SQS subscriptas, cada una con procesamiento independiente del mismo evento",
      "Lambda invocándose a sí misma",
      "DynamoDB con GSIs",
    ],
    correct: 1,
    explanation:
      "Fan-out: 1 publish a SNS → N colas SQS. Cada cola tiene su consumer independiente. Patrón clásico para eventos de dominio.",
  },
  {
    q: "Un mensaje SQS se lee pero el consumer crashea sin borrarlo. ¿Qué pasa?",
    options: [
      "Se pierde",
      "Después del visibility timeout, vuelve a estar visible y otro consumer puede leerlo",
      "Se duplica para siempre",
      "SQS manda un email",
    ],
    correct: 1,
    explanation:
      "El visibility timeout esconde el mensaje temporalmente; si no se borra, vuelve a aparecer. Esto da reintento automático ante fallos.",
  },
  {
    q: "¿Cuál es el caso de uso de una Dead Letter Queue (DLQ)?",
    options: [
      "Encolar mensajes urgentes",
      "Recibir mensajes que fallaron N veces para investigarlos sin que bloqueen el resto",
      "Borrar mensajes viejos",
      "Encriptar mensajes",
    ],
    correct: 1,
    explanation: "La DLQ aísla mensajes problemáticos para análisis posterior, evitando que bloqueen la cola principal.",
  },

  // ============ Lambda ============
  {
    q: "¿Cuál es el tiempo máximo de ejecución de una Lambda?",
    options: ["30 segundos", "5 minutos", "15 minutos", "Sin límite"],
    correct: 2,
    explanation: "Lambda tiene un timeout máximo de 15 minutos. Para tareas más largas se usa Fargate, EC2 o Step Functions.",
  },
  {
    q: "¿Qué es un cold start?",
    options: [
      "Cuando la Lambda falla",
      "La invocación que arranca un nuevo entorno de ejecución desde cero, más lenta que las invocaciones subsiguientes",
      "Una Lambda que corre de noche",
      "Una función que se cae",
    ],
    correct: 1,
    explanation:
      "El primer request después de inactividad arranca un nuevo container con runtime + código. Las subsiguientes reutilizan el contexto caliente (warm).",
  },
  {
    q: "Para mitigar cold starts en producción, ¿qué se usa?",
    options: ["Provisioned Concurrency", "Aumentar el timeout", "Cambiar la región", "Borrar el role"],
    correct: 0,
    explanation: "Provisioned Concurrency mantiene N entornos calientes 24/7. Cuesta extra pero elimina cold starts en esa ventana.",
  },
  {
    q: "¿Cómo le das permiso a una Lambda para leer una tabla DynamoDB?",
    options: [
      "Hardcodeando credenciales",
      "Atachando una IAM policy con dynamodb:GetItem sobre esa tabla al execution role de la Lambda",
      "Haciendo la tabla pública",
      "Creando un user nuevo",
    ],
    correct: 1,
    explanation: "Roles + policies. Es la única forma correcta de dar permisos a servicios AWS.",
  },

  // ============ API Gateway ============
  {
    q: "¿Cuál es la diferencia entre REST API y HTTP API en API Gateway?",
    options: [
      "HTTP API es más simple y ~70% más barata; REST API tiene más features avanzados",
      "No hay diferencia",
      "REST API es más nueva",
      "HTTP API solo soporta GET",
    ],
    correct: 0,
    explanation:
      "HTTP API v2 es la opción moderna y económica. REST API tiene features avanzados (transformaciones, WAF, throttling fino) que rara vez se necesitan.",
  },
  {
    q: "¿Por qué API Gateway necesita una permission explícita en la Lambda que invoca?",
    options: [
      "Para encriptar",
      "Las Lambdas tienen resource-based policies; API Gateway debe estar autorizada explícitamente",
      "Para acelerar el deploy",
      "No hace falta",
    ],
    correct: 1,
    explanation: "lambda:InvokeFunction debe estar habilitado desde el principal apigateway.amazonaws.com para esa API.",
  },
  {
    q: "Forma recomendada de autenticar requests en una HTTP API moderna:",
    options: ["Hacer la API pública", "JWT authorizer apuntando a un issuer OIDC (Cognito, Auth0)", "Validar la IP", "Token hardcoded"],
    correct: 1,
    explanation: "JWT authorizer + OIDC issuer es el estándar moderno: declarativo, sin código custom.",
  },

  // ============ RDS ============
  {
    q: "Una app necesita datos relacionales con joins frecuentes. ¿Qué servicio?",
    options: ["DynamoDB", "RDS o Aurora", "S3", "SQS"],
    correct: 1,
    explanation: "RDS/Aurora para SQL clásico con joins. DynamoDB no soporta joins de forma directa.",
  },
  {
    q: "¿Para qué sirve Multi-AZ en RDS?",
    options: [
      "Para distribuir lectura",
      "Para alta disponibilidad: réplica síncrona en otra AZ con failover automático",
      "Para reducir costos",
      "Para encriptar",
    ],
    correct: 1,
    explanation: "Multi-AZ es HA, no es para leer. La réplica está en standby y solo se promueve si falla la primaria.",
  },
  {
    q: "Diferencia entre Multi-AZ y Read Replicas:",
    options: [
      "Multi-AZ es para HA (failover); Read Replicas para distribuir lectura",
      "Son sinónimos",
      "Read Replicas solo en us-east-1",
      "Multi-AZ no existe",
    ],
    correct: 0,
    explanation: "Multi-AZ = HA. Read Replicas = escalar lectura. Conceptos distintos que a veces se confunden.",
  },

  // ============ KMS / Secrets ============
  {
    q: "Una app necesita guardar la password de su DB. ¿Dónde?",
    options: ["En el código", "En Secrets Manager", "En S3 público", "En la wiki del equipo"],
    correct: 1,
    explanation: "Secrets Manager. Soporta rotación automática, auditoría con CloudTrail e integración nativa con RDS.",
  },
  {
    q: "¿Qué es envelope encryption?",
    options: [
      "Encriptar dos veces seguidas",
      "Encriptar los datos con una data key local y guardar esa data key encriptada con la KMS key maestra",
      "Encriptar emails",
      "Encriptar solo el sobre",
    ],
    correct: 1,
    explanation:
      "Envelope encryption permite encriptar datos grandes (>4 KB) sin enviarlos a KMS: la KMS key encripta la data key, la data key encripta los datos.",
  },

  // ============ CloudWatch ============
  {
    q: "¿Cómo escribe logs una Lambda en CloudWatch?",
    options: [
      "Hay que llamar a una API explícitamente",
      "console.log y similares van automáticamente, siempre que el role tenga AWSLambdaBasicExecutionRole",
      "No escribe en CloudWatch",
      "Solo con un flag especial",
    ],
    correct: 1,
    explanation: "Lambda → CloudWatch Logs es automático. Solo necesitás los permisos básicos del execution role.",
  },
  {
    q: "Para alertar cuando hay muchos errores en logs, ¿qué se arma?",
    options: [
      "Una cola SQS",
      "Metric filter + alarm + SNS topic (que después puede mandar a email, Slack, PagerDuty, etc.)",
      "Una tabla DynamoDB",
      "Un bucket S3",
    ],
    correct: 1,
    explanation: "Pipeline canónico: filter cuenta matches → metric → alarm → SNS notifica.",
  },

  // ============ CloudFormation ============
  {
    q: "¿Qué es Infrastructure as Code?",
    options: [
      "Programación de UIs",
      "Describir infraestructura en archivos declarativos versionables y reproducibles",
      "Hardware programable",
      "Otro nombre para Docker",
    ],
    correct: 1,
    explanation: "IaC = describir infra como código que puede revisarse, versionarse y reproducirse.",
  },
  {
    q: "¿Qué pasa si CloudFormation falla a mitad de un deploy?",
    options: [
      "Hay que limpiar a mano",
      "Hace rollback automático al estado anterior",
      "AWS cobra el doble",
      "Los recursos quedan colgados",
    ],
    correct: 1,
    explanation: "El rollback automático es una de las ventajas más fuertes de CloudFormation frente a scripts manuales.",
  },
  {
    q: "Diferencia entre !Ref y !GetAtt en CloudFormation:",
    options: [
      "Son lo mismo",
      "!Ref devuelve el ID/nombre principal del recurso; !GetAtt devuelve atributos específicos como ARN o endpoint",
      "!GetAtt solo sirve con S3",
      "!Ref está deprecado",
    ],
    correct: 1,
    explanation:
      "!Ref es la referencia 'genérica' al recurso. !GetAtt te permite obtener atributos específicos según el tipo de recurso.",
  },

  // ============ Floci-specific ============
  {
    q: "¿Cuál es el endpoint por defecto al que apuntás el AWS CLI para que use Floci?",
    options: ["http://localhost:80", "http://localhost:4566", "http://localhost:8080", "https://floci.amazonaws.com"],
    correct: 1,
    explanation: "Floci escucha en el puerto 4566 (mismo que LocalStack para compatibilidad de configuración).",
  },
  {
    q: "Cuando una Lambda corre dentro de Floci y necesita hablar con otro servicio Floci, ¿qué endpoint usa?",
    options: [
      "http://localhost:4566 (igual que desde el host)",
      "http://host.docker.internal:4566 o el nombre del servicio en docker-compose; localhost dentro del container es el container mismo",
      "https://aws.amazon.com",
      "http://127.0.0.1",
    ],
    correct: 1,
    explanation:
      "Detalle crítico: dentro del container, localhost se refiere al container. Para llegar al host (donde corre Floci) hay que usar host.docker.internal.",
  },
  {
    q: "¿Cuál de estos servicios NO está cubierto por Floci?",
    options: ["S3", "Lambda", "EC2", "DynamoDB"],
    correct: 2,
    explanation:
      "Floci no emula EC2 (no tiene sentido emular VMs completas en local; para eso ya tenés Docker). Sí emula servicios managed: S3, Lambda, DynamoDB, etc.",
  },
];
