import type { ModuleData } from "@/types/course";

export const m3: ModuleData = {
  slug: "m3",
  number: 3,
  title: "IAM · Identity and Access Management",
  icon: "🔐",
  intro:
    "IAM es el servicio de identidades y permisos de AWS. Controla quién puede hacer qué. Es la base conceptual de toda la seguridad en AWS y aparece masivamente en el examen Cloud Practitioner.",
  totalActivities: 2,
  blocks: [
    // 1. Qué es IAM
    { kind: "h3", text: "🛡️ 1. ¿Qué es IAM?" },
    {
      kind: "info",
      html:
        "<strong>Identity and Access Management</strong> responde a dos preguntas:<br/>" +
        "1. <strong>¿Quién sos?</strong> (autenticación)<br/>" +
        "2. <strong>¿Qué podés hacer?</strong> (autorización)<br/><br/>" +
        "Cada operación contra AWS pasa por IAM. Sin permisos → AccessDenied.",
    },

    // 2. Las 4 entidades
    { kind: "h3", text: "👥 2. Las 4 entidades de IAM" },
    {
      kind: "table",
      headers: ["Entidad", "Qué es", "Cuándo se usa"],
      rows: [
        ["User", "Identidad humana o de app, credenciales permanentes", "Usuario de la empresa"],
        ["Group", "Colección de users con policies compartidas", "Equipo: 'Developers', 'Admins'"],
        ["Role", "Identidad asumible, entrega credenciales temporales", "Lambdas, EC2, servicios AWS, federación"],
        ["Policy", "Documento JSON con permisos (Allow/Deny)", "Atachada a user/group/role"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 User vs Role:</strong> los users tienen credenciales permanentes (access keys). Los roles no — se <em>asumen</em> y entregan credenciales temporales que expiran (default 1 hora). Para servicios y CI/CD siempre se usan roles.",
    },

    // 3. Anatomía de una policy
    { kind: "h3", text: "📄 3. Anatomía de una policy" },
    {
      kind: "info",
      html:
        "<pre><code>{\n" +
        '  "Version": "2012-10-17",\n' +
        '  "Statement": [\n' +
        "    {\n" +
        '      "Effect": "Allow",\n' +
        '      "Action": "s3:GetObject",\n' +
        '      "Resource": "arn:aws:s3:::mi-bucket/*"\n' +
        "    }\n" +
        "  ]\n" +
        "}</code></pre>" +
        "Componentes: <strong>Effect</strong> (Allow/Deny), <strong>Action</strong> (qué operación), <strong>Resource</strong> (sobre qué), opcionalmente <strong>Condition</strong> y <strong>Principal</strong>.",
    },

    // 4. Evaluación
    { kind: "h3", text: "⚖️ 4. Cómo evalúa IAM una petición" },
    {
      kind: "list",
      items: [
        "1. ¿Hay alguna policy que <strong>deniegue</strong> explícitamente? → DENY",
        "2. ¿Hay alguna policy que <strong>permita</strong> explícitamente? → ALLOW",
        "3. Si no hay ni Allow ni Deny → DENY (default deny)",
      ],
    },
    {
      kind: "tip",
      html: "<strong>💡 Regla de oro:</strong> Deny gana siempre. Si una policy te permite algo y otra te lo niega, el resultado es Deny.",
    },

    // 5. ARN
    { kind: "h3", text: "🔖 5. ARN — Amazon Resource Name" },
    {
      kind: "info",
      html:
        "Cada recurso AWS tiene un ARN único. Formato:" +
        "<pre><code>arn:aws:&lt;servicio&gt;:&lt;region&gt;:&lt;account-id&gt;:&lt;recurso&gt;</code></pre>" +
        "Ejemplos:" +
        "<pre><code>arn:aws:s3:::mi-bucket\n" +
        "arn:aws:iam::000000000000:user/thomas\n" +
        "arn:aws:lambda:us-east-1:000000000000:function:mi-funcion\n" +
        "arn:aws:dynamodb:us-east-1:000000000000:table/Productos</code></pre>",
    },

    // 6. Principio de menor privilegio
    { kind: "h3", text: "🎯 6. Principio de menor privilegio" },
    {
      kind: "successBox",
      html:
        "<strong>Least Privilege:</strong> otorgar los <em>permisos mínimos necesarios</em>. Si una Lambda solo necesita leer un bucket, dale <code>s3:GetObject</code> sobre ESE bucket, no <code>s3:*</code>.<br/><br/>" +
        "Es el concepto de seguridad más importante que toman en el examen.",
    },

    // 7. Lab con AWS CLI
    { kind: "h3", text: "🧪 7. Laboratorio en Floci" },
    {
      kind: "info",
      html:
        "<strong>Crear un user, un grupo y meter el user adentro:</strong>" +
        "<pre><code>aws iam create-user --user-name thomas\n" +
        "aws iam create-group --group-name Developers\n" +
        "aws iam add-user-to-group \\\n" +
        "  --user-name thomas --group-name Developers</code></pre>" +
        "<strong>Crear policy custom (file://policy.json) y atacharla al grupo:</strong>" +
        "<pre><code>aws iam create-policy \\\n" +
        "  --policy-name S3ReadOnly \\\n" +
        "  --policy-document file://policy.json\n\n" +
        "aws iam attach-group-policy \\\n" +
        "  --group-name Developers \\\n" +
        "  --policy-arn arn:aws:iam::000000000000:policy/S3ReadOnly</code></pre>",
    },
    {
      kind: "info",
      html:
        "<strong>Crear un role asumible por Lambda (trust-policy.json):</strong>" +
        "<pre><code>{\n" +
        '  "Version": "2012-10-17",\n' +
        '  "Statement": [{\n' +
        '    "Effect": "Allow",\n' +
        '    "Principal": { "Service": "lambda.amazonaws.com" },\n' +
        '    "Action": "sts:AssumeRole"\n' +
        "  }]\n" +
        "}</code></pre>" +
        "<pre><code>aws iam create-role \\\n" +
        "  --role-name lambda-basic-role \\\n" +
        "  --assume-role-policy-document file://trust-policy.json\n\n" +
        "aws iam attach-role-policy \\\n" +
        "  --role-name lambda-basic-role \\\n" +
        "  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole</code></pre>",
    },

    // 8. STS
    { kind: "h3", text: "🎫 8. STS — Security Token Service" },
    {
      kind: "info",
      html:
        "STS emite credenciales temporales. La operación clave es <code>AssumeRole</code>:" +
        "<pre><code>aws sts assume-role \\\n" +
        "  --role-arn arn:aws:iam::000000000000:role/lambda-basic-role \\\n" +
        "  --role-session-name mi-sesion</code></pre>" +
        "Devuelve <code>AccessKeyId</code>, <code>SecretAccessKey</code> y <code>SessionToken</code> que duran (en AWS real) 1 hora.",
    },

    // 9. Buenas prácticas
    { kind: "h3", text: "✅ 9. Buenas prácticas (examen)" },
    {
      kind: "list",
      items: [
        "<strong>No usar la root account</strong> para tareas diarias",
        "<strong>MFA</strong> activado en root y users privilegiados",
        "<strong>Rotar credenciales</strong> cada 90 días",
        "<strong>Nunca hardcodear credenciales</strong> en código ni subirlas a git",
        "EC2 → <strong>instance profile</strong>, Lambda → <strong>execution role</strong>",
        "<strong>Auditar</strong> con CloudTrail",
      ],
    },

    // 10. Diferencias con AWS real
    { kind: "h3", text: "⚠️ 10. Floci vs AWS real" },
    {
      kind: "info",
      html:
        "<strong>Floci NO valida policies</strong> al hacer operaciones reales: acepta cualquier credencial. Sirve para practicar la sintaxis y los conceptos, pero el enforcement estricto solo lo vas a ver en AWS real. CloudTrail tampoco está emulado.",
    },

    // Quiz
    { kind: "h3", text: "🎯 Test del módulo 3" },
    {
      kind: "quiz",
      key: "m3_quiz",
      questions: [
        {
          q: "Si un user tiene una policy Allow y otra Deny sobre la misma acción, ¿qué resultado da IAM?",
          options: ["Allow (más permisivo)", "Deny (gana siempre)", "Error", "Depende del orden"],
          correct: 1,
          explanation: "Regla fundamental de IAM: Deny gana siempre, sin importar el orden ni cuántos Allows haya.",
        },
        {
          q: "¿Cuál es la principal diferencia entre un user y un role?",
          options: [
            "Los roles tienen contraseña, los users no",
            "Los users tienen credenciales permanentes; los roles entregan credenciales temporales al asumirlos",
            "Son sinónimos",
            "Los roles solo existen en us-east-1",
          ],
          correct: 1,
          explanation:
            "Los users tienen access keys fijas. Los roles son asumibles y entregan credenciales temporales. Para servicios/CI/CD siempre se usan roles.",
        },
        {
          q: "Para que GitHub Actions deploye en AWS, la forma recomendada es:",
          options: [
            "Crear un user IAM y poner sus access keys como secret de GitHub",
            "Configurar OIDC + AssumeRoleWithWebIdentity, sin credenciales long-lived",
            "Compartir la password root",
            "Hacer la cuenta pública",
          ],
          correct: 1,
          explanation:
            "OIDC permite que GitHub Actions asuma un role en AWS sin guardar access keys permanentes en secrets. Es el estándar moderno de CI/CD.",
        },
        {
          q: "¿Para qué sirve el trust policy de un role?",
          options: [
            "Define qué acciones puede ejecutar el role",
            "Define qué entidades pueden asumir el role",
            "Encripta las credenciales",
            "Lista los recursos accesibles",
          ],
          correct: 1,
          explanation:
            "El trust policy define el Principal: qué servicio/cuenta/usuario puede invocar AssumeRole sobre ese role.",
        },
        {
          q: "Forma correcta de dar permisos a una Lambda para leer S3:",
          options: [
            "Hardcodear credenciales en el código",
            "Hacer el bucket público",
            "Crear un role para la Lambda con una policy s3:GetObject sobre ese bucket",
            "Dar s3:* a la cuenta entera",
          ],
          correct: 2,
          explanation: "Roles + policies de least privilege. Es la única forma correcta y la que toman en el examen.",
        },
        {
          q: "¿Qué significa el principio de menor privilegio?",
          options: [
            "Asignar permisos solo a usuarios menores de edad",
            "Otorgar los permisos mínimos necesarios para cumplir la tarea",
            "Restringir el acceso a la consola web",
            "Crear roles en lugar de users",
          ],
          correct: 1,
          explanation: "Least privilege: dar lo justo y necesario. Concepto central del examen Cloud Practitioner.",
        },
      ],
    },
  ],
};
