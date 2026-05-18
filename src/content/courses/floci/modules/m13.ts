import type { ModuleData } from "@/types/course";

export const m13: ModuleData = {
  slug: "m13",
  number: 13,
  title: "CloudFormation · Infrastructure as Code",
  icon: "📐",
  intro:
    "CloudFormation es el servicio nativo de IaC de AWS. Describís la infraestructura en un archivo YAML/JSON y CloudFormation se encarga de crear, actualizar y borrar los recursos en el orden correcto. Es la base de SAM y CDK.",
  totalActivities: 2,
  blocks: [
    // 1. IaC
    { kind: "h3", text: "📜 1. ¿Qué es Infrastructure as Code?" },
    {
      kind: "info",
      html:
        "<strong>IaC:</strong> describir la infraestructura en archivos versionables que se pueden reproducir y modificar declarativamente. Beneficios:" +
        "<ul><li><strong>Reproducibilidad</strong>: misma infra en cualquier región/cuenta</li>" +
        "<li><strong>Versionado</strong>: la infra vive en git, con historial y code review</li>" +
        "<li><strong>Documentación</strong>: el template ES la documentación</li>" +
        "<li><strong>Rollback automático</strong> si algo falla</li>" +
        "<li><strong>Menos drift</strong>: lo que se crea a mano se desvía del estado declarado</li></ul>",
    },

    // 2. Alternativas
    { kind: "h3", text: "🆚 2. Alternativas a CloudFormation" },
    {
      kind: "table",
      headers: ["Herramienta", "Características"],
      rows: [
        ["CloudFormation", "Nativo AWS, YAML/JSON, AWS-only"],
        ["AWS SAM", "Extensión de CloudFormation para serverless, más conciso"],
        ["AWS CDK", "Infra en TS/Python/Java; genera CloudFormation"],
        ["Terraform", "Multi-cloud, HCL, el más popular fuera de AWS"],
        ["Pulumi", "Como CDK pero multi-cloud"],
      ],
    },

    // 3. Estructura template
    { kind: "h3", text: "📋 3. Estructura de un template" },
    {
      kind: "info",
      html:
        "<pre><code>AWSTemplateFormatVersion: '2010-09-09'\n" +
        "Description: Mi stack\n\n" +
        "Parameters:\n" +
        "  EnvironmentName:\n" +
        "    Type: String\n" +
        "    Default: dev\n\n" +
        "Resources:\n" +
        "  MiBucket:\n" +
        "    Type: AWS::S3::Bucket\n" +
        "    Properties:\n" +
        "      BucketName: !Sub '${EnvironmentName}-bucket'\n\n" +
        "Outputs:\n" +
        "  BucketName:\n" +
        "    Value: !Ref MiBucket</code></pre>",
    },

    // 4. Conceptos
    { kind: "h3", text: "🧠 4. Conceptos clave" },
    {
      kind: "list",
      items: [
        "<strong>Template:</strong> archivo YAML/JSON declarativo",
        "<strong>Stack:</strong> instancia desplegada de un template",
        "<strong>Resources:</strong> recursos AWS a crear (cada uno con logical ID + tipo + properties)",
        "<strong>Parameters:</strong> inputs configurables al deploy",
        "<strong>Outputs:</strong> valores que el stack expone",
        "<strong>Change set:</strong> preview de cambios antes de aplicar",
        "<strong>Drift detection:</strong> detecta cambios out-of-band",
      ],
    },

    // 5. Intrinsic functions
    { kind: "h3", text: "🔧 5. Intrinsic functions" },
    {
      kind: "table",
      headers: ["Función", "Para qué"],
      rows: [
        ["!Ref X", "Identificador principal del recurso X (nombre/ID)"],
        ["!GetAtt X.Arn", "Atributo específico (ej. ARN, endpoint)"],
        ["!Sub '${X}-bucket'", "Substitución de variables"],
        ["!Join [',', [a, b, c]]", "Concatenar"],
        ["!If [Cond, A, B]", "Condicional"],
      ],
    },

    // 6. Lab
    { kind: "h3", text: "🧪 6. Laboratorio en Floci" },
    {
      kind: "info",
      html:
        "<strong>stack-bucket.yaml:</strong>" +
        "<pre><code>AWSTemplateFormatVersion: '2010-09-09'\n" +
        "Resources:\n" +
        "  MiBucket:\n" +
        "    Type: AWS::S3::Bucket\n" +
        "    Properties:\n" +
        "      BucketName: bucket-cf-curso\n" +
        "      VersioningConfiguration:\n" +
        "        Status: Enabled\n" +
        "Outputs:\n" +
        "  BucketName:\n" +
        "    Value: !Ref MiBucket</code></pre>" +
        "<strong>Comandos:</strong>" +
        "<pre><code>aws cloudformation create-stack \\\n" +
        "  --stack-name mi-stack \\\n" +
        "  --template-body file://stack-bucket.yaml\n\n" +
        "aws cloudformation describe-stacks --stack-name mi-stack\n\n" +
        "# Actualizar (CloudFormation hace diff)\n" +
        "aws cloudformation update-stack \\\n" +
        "  --stack-name mi-stack \\\n" +
        "  --template-body file://stack-bucket.yaml\n\n" +
        "# Borrar todo lo del stack\n" +
        "aws cloudformation delete-stack --stack-name mi-stack</code></pre>",
    },

    // 7. Buenas prácticas
    { kind: "h3", text: "✅ 7. Buenas prácticas" },
    {
      kind: "list",
      items: [
        "<strong>Separar templates por dominio</strong> (networking, datos, compute)",
        "<strong>Usar Parameters</strong> para diferencias entre ambientes",
        "<strong>Outputs con Export</strong> para compartir entre stacks",
        "<strong>DeletionPolicy: Retain</strong> en recursos críticos (DynamoDB tables, S3)",
        "<strong>Tags</strong> en todos los recursos (Owner, Environment, Project)",
      ],
    },

    // Quiz
    { kind: "h3", text: "🎯 Test del módulo 13" },
    {
      kind: "quiz",
      key: "m13_quiz",
      questions: [
        {
          q: "¿Qué es Infrastructure as Code?",
          options: [
            "Programación de UIs",
            "Describir infraestructura en archivos versionables y reproducibles",
            "Hardware programable",
            "Otro nombre para Docker",
          ],
          correct: 1,
          explanation: "IaC = infra declarativa, versionable, reproducible. Reduce errores y drift.",
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
          explanation: "Rollback automático: una de las ventajas más fuertes vs scripts manuales.",
        },
        {
          q: "Diferencia entre !Ref y !GetAtt:",
          options: [
            "Son sinónimos",
            "!Ref da identificador principal; !GetAtt da atributos específicos (ARN, endpoint)",
            "!GetAtt solo sirve con S3",
            "!Ref está deprecado",
          ],
          correct: 1,
          explanation: "!Ref devuelve el name/ID principal. !GetAtt te permite obtener atributos según el tipo de recurso.",
        },
        {
          q: "Ventaja de un change set:",
          options: [
            "Acelera el deploy",
            "Muestra qué va a cambiar antes de aplicar",
            "Reduce el costo",
            "Crea backups",
          ],
          correct: 1,
          explanation: "Change set = preview de cambios. Esencial en producción.",
        },
        {
          q: "Para desplegar la misma infra en dev y prod con diferencias mínimas:",
          options: [
            "Dos templates separados",
            "Un template con Parameters; desplegar cada ambiente como un stack distinto",
            "Crear todo a mano",
            "Solo Terraform lo permite",
          ],
          correct: 1,
          explanation: "Parámetros + un mismo template, varios stacks. Patrón estándar.",
        },
        {
          q: "Diferencia entre CloudFormation y SAM:",
          options: [
            "Son lo mismo",
            "SAM es una extensión de CloudFormation con sintaxis más concisa para serverless",
            "SAM es de otra empresa",
            "CloudFormation es serverless",
          ],
          correct: 1,
          explanation: "SAM = sugar syntax sobre CloudFormation para Lambda + API Gateway + DynamoDB.",
        },
      ],
    },
  ],
};
