import type { ModuleData } from "@/types/course";

export const m15: ModuleData = {
  slug: "m15",
  number: 15,
  title: "Cierre del curso y siguientes pasos",
  icon: "🎓",
  intro:
    "Llegaste al final. Este módulo resume lo aprendido, te ayuda a decidir cuándo migrar de Floci a AWS real, y te marca los próximos pasos para profundizar.",
  totalActivities: 1,
  blocks: [
    // 1. Lo que practicaste
    { kind: "h3", text: "📚 1. Lo que pasaste durante el curso" },
    {
      kind: "successBox",
      html:
        "Tocaste con las manos los servicios más importantes del Cloud Practitioner:" +
        "<ul><li>Fundamentos de cloud, regiones, AZs, shared responsibility</li>" +
        "<li>IAM: users, groups, roles, policies, STS, least privilege</li>" +
        "<li>S3: buckets, objetos, versioning, pre-signed URLs, storage classes</li>" +
        "<li>DynamoDB: NoSQL, claves, índices, capacity modes, streams</li>" +
        "<li>SQS, SNS y patrón fan-out event-driven</li>" +
        "<li>Lambda + API Gateway: stack serverless completo</li>" +
        "<li>RDS: PostgreSQL/MySQL real en Floci</li>" +
        "<li>KMS, Secrets Manager y Parameter Store</li>" +
        "<li>CloudWatch Logs + Metrics + Alarms</li>" +
        "<li>CloudFormation: Infrastructure as Code</li>" +
        "<li>Proyecto integrador serverless completo</li></ul>",
    },

    // 2. Floci vs AWS real
    { kind: "h3", text: "⚖️ 2. ¿Cuándo migrar a AWS real?" },
    {
      kind: "table",
      headers: ["Caso", "Floci sirve", "Necesitás AWS real"],
      rows: [
        ["Aprender y practicar comandos", "✅", ""],
        ["Probar arquitecturas locally", "✅", ""],
        ["Tests de integración en CI/CD", "✅", ""],
        ["Validar IAM real (enforcement)", "", "✅"],
        ["Probar Multi-AZ y failover real", "", "✅"],
        ["Performance / load testing", "", "✅"],
        ["Storage classes con Glacier real", "", "✅"],
        ["Encriptación FIPS 140-2 validada", "", "✅"],
        ["Cross-region replication", "", "✅"],
        ["Producción", "", "✅"],
      ],
    },

    // 3. Patrones que te sirven en cualquier app
    { kind: "h3", text: "🧠 3. Patrones que te llevás" },
    {
      kind: "list",
      items: [
        "<strong>Roles para servicios, no users:</strong> nunca hardcodear credenciales",
        "<strong>Least privilege:</strong> mínimo necesario en cada policy",
        "<strong>Stateless</strong>: aplicaciones que no guardan estado en el server",
        "<strong>Event-driven con SQS/SNS:</strong> desacoplamiento + resiliencia",
        "<strong>Async > sync</strong> donde se pueda: mejor UX y mejor resiliencia",
        "<strong>IaC desde el día uno:</strong> nada manual en producción",
        "<strong>Logs estructurados (JSON)</strong> para que sean queryables",
        "<strong>Métricas custom</strong> para visibilidad de negocio",
      ],
    },

    // 4. Siguientes certificaciones
    { kind: "h3", text: "🎯 4. Siguientes pasos" },
    {
      kind: "info",
      html:
        "<strong>Rendir el examen Cloud Practitioner</strong> si querés certificar. Costo ~$100 USD. Online o presencial.<br/><br/>" +
        "<strong>Próximos niveles oficiales:</strong>" +
        "<ul><li><strong>AWS Solutions Architect Associate</strong>: el siguiente nivel natural. Mucho más técnico</li>" +
        "<li><strong>AWS Developer Associate</strong>: enfocado a desarrolladores y DevOps</li>" +
        "<li><strong>AWS SysOps Administrator Associate</strong>: enfocado a operaciones</li></ul>",
    },

    // 5. Stack siguiente
    { kind: "h3", text: "🔧 5. Tecnologías para complementar" },
    {
      kind: "list",
      items: [
        "<strong>Terraform o AWS CDK</strong>: alternativas modernas a CloudFormation, ampliamente usadas en la industria",
        "<strong>AWS SAM</strong>: especializado para apps serverless, reduce mucho boilerplate",
        "<strong>Step Functions</strong>: orquestación de Lambdas en workflows complejos",
        "<strong>EventBridge</strong>: el bus de eventos moderno, reemplazo de SNS para muchos casos",
        "<strong>Cognito</strong>: autenticación managed con JWT",
        "<strong>X-Ray</strong>: distributed tracing",
      ],
    },

    // 6. Floci como herramienta diaria
    { kind: "h3", text: "🛠️ 6. Floci en tu día a día" },
    {
      kind: "info",
      html:
        "Floci te queda como herramienta para:" +
        "<ul><li><strong>Tests automatizados</strong>: en tu pipeline CI/CD, mucho más rápidos y baratos que ir a AWS real</li>" +
        "<li><strong>Desarrollo local</strong>: levantás Floci, desarrollás contra él, después deployás a AWS</li>" +
        "<li><strong>Demos y prototipos</strong>: sin sustos en la factura</li>" +
        "<li><strong>Onboarding</strong>: nuevos miembros del equipo pueden ensuciarse las manos sin acceso a la cuenta de prod</li></ul>",
    },

    // 7. Recursos
    { kind: "h3", text: "📖 7. Recursos para profundizar" },
    {
      kind: "list",
      items: [
        "<strong>Documentación oficial de AWS:</strong> docs.aws.amazon.com — exhaustiva, en español, gratis",
        "<strong>AWS Well-Architected Framework:</strong> 6 pilares para diseñar buenas arquitecturas cloud",
        "<strong>Repositorio de Floci:</strong> github.com/floci-io/floci — para reportar bugs o contribuir",
        "<strong>AWS Skill Builder:</strong> cursos oficiales gratuitos",
        "<strong>Adrian Cantrill, Stephane Maarek:</strong> instructores referentes para certificaciones AWS",
      ],
    },

    // 8. Cierre
    { kind: "h3", text: "🎉 8. Cierre" },
    {
      kind: "successBox",
      html:
        "Acabás de pasar del modo <em>'estudiar AWS'</em> al modo <em>'vivir AWS'</em>. La diferencia es enorme. Los conceptos del Cloud Practitioner ahora tienen anclajes prácticos: cuando alguien diga 'fan-out', vos vas a pensar en tu cola-email y cola-stock del proyecto integrador, no en una definición memorizada.<br/><br/>" +
        "Cuando estés listo, andá al <strong>examen final integrador</strong> del curso — 40 preguntas que mezclan todo. Después, si te animás, el examen oficial CLF-C02 te va a parecer manejable.<br/><br/>" +
        "Suerte. ☁️",
    },

    // Quiz final corto
    { kind: "h3", text: "🎯 Quiz de cierre" },
    {
      kind: "quiz",
      key: "m15_quiz",
      questions: [
        {
          q: "¿Para qué casos Floci NO es suficiente y necesitás AWS real?",
          options: [
            "Practicar comandos del CLI",
            "Validar IAM enforcement, performance real, Multi-AZ failover, y producción",
            "Aprender los conceptos",
            "Tests de integración en CI",
          ],
          correct: 1,
          explanation:
            "Floci sirve para aprender y desarrollar. Para validar comportamiento real de IAM, performance, alta disponibilidad y, por supuesto, para producción, hay que pasar a AWS real.",
        },
        {
          q: "Buena práctica que te llevás del curso:",
          options: [
            "Hardcodear credenciales para que vaya más rápido",
            "Roles + least privilege para servicios; nunca credenciales en código",
            "Hacer todo desde la consola web",
            "No usar IaC porque agrega complejidad",
          ],
          correct: 1,
          explanation:
            "Roles + least privilege es el patrón estándar. Hardcodear credenciales es uno de los anti-patrones más graves en seguridad cloud.",
        },
        {
          q: "Siguiente certificación natural después de Cloud Practitioner:",
          options: [
            "Solutions Architect Professional",
            "Solutions Architect Associate, Developer Associate o SysOps Associate",
            "Hay que reempezar",
            "DevOps Professional",
          ],
          correct: 1,
          explanation:
            "Después del Practitioner viene el nivel Associate. Solutions Architect es el más popular pero hay tres variantes según perfil.",
        },
        {
          q: "Floci como herramienta diaria es útil para:",
          options: [
            "Reemplazar AWS real en producción",
            "Tests CI/CD, desarrollo local, demos, onboarding",
            "Procesar millones de requests/s",
            "Storage de archivos críticos",
          ],
          correct: 1,
          explanation:
            "Floci es excelente para entornos de desarrollo y testing. Para producción siempre AWS real (u otro cloud provider).",
        },
      ],
    },
  ],
};
