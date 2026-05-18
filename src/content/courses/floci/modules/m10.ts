import type { ModuleData } from "@/types/course";

export const m10: ModuleData = {
  slug: "m10",
  number: 10,
  title: "RDS · Relational Database Service",
  icon: "🗃️",
  intro:
    "RDS es el servicio de bases de datos relacionales managed de AWS. Soporta PostgreSQL, MySQL, MariaDB, Oracle, SQL Server y Aurora. Floci emula PostgreSQL y MySQL levantando contenedores Docker reales.",
  totalActivities: 2,
  blocks: [
    // 1. Qué es
    { kind: "h3", text: "🏛️ 1. ¿Qué es RDS?" },
    {
      kind: "info",
      html:
        "<strong>RDS</strong> = bases de datos relacionales <em>managed</em>. AWS se ocupa de:" +
        "<ul><li>Instalar y mantener el motor</li>" +
        "<li>Aplicar parches de seguridad</li>" +
        "<li>Backups automáticos</li>" +
        "<li>Replicación y alta disponibilidad</li>" +
        "<li>Monitoreo</li>" +
        "<li>Escalado vertical</li></ul>" +
        "Vos te ocupás de: schema, datos, queries, optimización.",
    },

    // 2. Motores
    { kind: "h3", text: "🔧 2. Motores soportados" },
    {
      kind: "list",
      items: [
        "PostgreSQL",
        "MySQL",
        "MariaDB",
        "Oracle",
        "Microsoft SQL Server",
        "<strong>Amazon Aurora</strong>: optimizado por AWS, hasta 5x más rápido que MySQL estándar y 3x que PostgreSQL",
      ],
    },
    {
      kind: "info",
      html: "<strong>Floci soporta PostgreSQL y MySQL.</strong> No emula Aurora ni Oracle/SQL Server.",
    },

    // 3. RDS vs DynamoDB
    { kind: "h3", text: "🆚 3. RDS vs DynamoDB (examen)" },
    {
      kind: "table",
      headers: ["RDS / Aurora", "DynamoDB"],
      rows: [
        ["Datos relacionales con joins", "Acceso por clave, sin joins"],
        ["Schema rígido", "Schema flexible"],
        ["Queries ad-hoc con SQL", "Patrones de acceso conocidos"],
        ["Transacciones complejas", "Transacciones limitadas (100 items)"],
        ["Escalado vertical (hasta cierto punto)", "Escalado horizontal infinito"],
        ["Costo predecible", "Costo proporcional al uso"],
      ],
    },

    // 4. Multi-AZ y Read Replicas
    { kind: "h3", text: "🛡️ 4. Multi-AZ y Read Replicas (examen CRÍTICO)" },
    {
      kind: "info",
      html:
        "<strong>Multi-AZ (Alta disponibilidad):</strong>" +
        "<ul><li>Réplica <em>sincrónica</em> en otra AZ</li>" +
        "<li>Failover automático si falla la primaria</li>" +
        "<li><strong>NO es para leer</strong> (la réplica está en standby)</li>" +
        "<li>Cuesta el doble (dos instancias)</li></ul>" +
        "<strong>Read Replicas:</strong>" +
        "<ul><li>Réplicas <em>asíncronas</em></li>" +
        "<li>Distribuyen <strong>carga de lectura</strong></li>" +
        "<li>Pueden estar en otra región (cross-region)</li>" +
        "<li>NO son para failover</li></ul>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Pregunta típica del examen:</strong> ¿Multi-AZ es para leer? <strong>NO</strong>. Para HA. Si querés escalar lectura → Read Replicas.",
    },

    // 5. Backups
    { kind: "h3", text: "💾 5. Backups" },
    {
      kind: "list",
      items: [
        "<strong>Automated backups:</strong> diarios + transaction logs. Retención 7 a 35 días. Permite point-in-time recovery",
        "<strong>Manual snapshots:</strong> on-demand, no expiran",
      ],
    },

    // 6. Lab CLI
    { kind: "h3", text: "🧪 6. Laboratorio en Floci" },
    {
      kind: "info",
      html:
        "<strong>Crear instancia PostgreSQL:</strong>" +
        "<pre><code>aws rds create-db-instance \\\n" +
        "  --db-instance-identifier mi-postgres \\\n" +
        "  --db-instance-class db.t3.micro \\\n" +
        "  --engine postgres \\\n" +
        "  --master-username admin \\\n" +
        "  --master-user-password password123 \\\n" +
        "  --allocated-storage 20 \\\n" +
        "  --db-name miapp</code></pre>" +
        "<strong>Ver el endpoint:</strong>" +
        "<pre><code>aws rds describe-db-instances \\\n" +
        "  --db-instance-identifier mi-postgres</code></pre>" +
        "<strong>Conectar con psql:</strong>" +
        "<pre><code>psql -h localhost -p 5432 -U admin -d miapp</code></pre>",
    },

    // 7. Bonus Node
    { kind: "h3", text: "📜 7. Bonus Node.js con pg" },
    {
      kind: "info",
      html:
        "<pre><code>import { Client } from 'pg';\n\n" +
        "const client = new Client({\n" +
        "  host: 'localhost',\n" +
        "  port: 5432,\n" +
        "  user: 'admin',\n" +
        "  password: 'password123',\n" +
        "  database: 'miapp',\n" +
        "});\n\n" +
        "await client.connect();\n" +
        "const result = await client.query('SELECT NOW()');\n" +
        "console.log(result.rows);\n" +
        "await client.end();</code></pre>",
    },

    // 8. Anti-patrones
    { kind: "h3", text: "⚠️ 8. Anti-patrones (examen)" },
    {
      kind: "list",
      items: [
        "<strong>Lambdas que abren conexión nueva en cada invocación:</strong> agotan el pool. Solución: RDS Proxy",
        "<strong>RDS sin Multi-AZ en producción:</strong> si falla la AZ, te quedás sin DB",
        "<strong>Passwords en código o env vars:</strong> usar Secrets Manager",
        "<strong>Security groups abiertos al mundo (0.0.0.0/0):</strong> la DB debe ser privada",
      ],
    },

    // Quiz
    { kind: "h3", text: "🎯 Test del módulo 10" },
    {
      kind: "quiz",
      key: "m10_quiz",
      questions: [
        {
          q: "Diferencia principal entre RDS estándar y Aurora:",
          options: [
            "Aurora solo soporta MySQL",
            "Aurora es la versión optimizada por AWS, hasta 5x más rápida y con storage auto-scaling",
            "RDS es más nuevo",
            "No hay diferencia",
          ],
          correct: 1,
          explanation: "Aurora es compatible con MySQL/PostgreSQL pero está optimizada por AWS para más velocidad y elasticidad.",
        },
        {
          q: "¿Para qué sirve Multi-AZ en RDS?",
          options: [
            "Distribuir lecturas",
            "Alta disponibilidad: réplica sincrónica con failover automático",
            "Reducir costos",
            "Encriptar",
          ],
          correct: 1,
          explanation: "Multi-AZ = HA. La réplica está en standby, no se usa para leer.",
        },
        {
          q: "Diferencia entre Multi-AZ y Read Replicas:",
          options: [
            "Multi-AZ es para HA (failover); Read Replicas para distribuir lectura",
            "Son sinónimos",
            "Read Replicas son sincrónicas",
            "Multi-AZ no existe",
          ],
          correct: 0,
          explanation: "Multi-AZ = HA. Read Replicas = escalar lectura. Conceptos distintos que a veces se confunden.",
        },
        {
          q: "¿Cuál NO soporta Floci?",
          options: ["PostgreSQL", "MySQL", "Oracle", "Floci no soporta ningún motor real"],
          correct: 2,
          explanation: "Floci soporta PostgreSQL y MySQL reales. Oracle y SQL Server no.",
        },
        {
          q: "Equipo necesita datos relacionales con joins y queries ad-hoc. Recomendás:",
          options: ["DynamoDB", "S3", "RDS o Aurora", "SQS"],
          correct: 2,
          explanation: "RDS/Aurora para SQL con joins. DynamoDB no soporta joins.",
        },
        {
          q: "Forma más segura de guardar la password de la DB:",
          options: [
            "En el código",
            "Variable de entorno de la Lambda",
            "En Secrets Manager, recuperándola en runtime",
            "En un .env del repo",
          ],
          correct: 2,
          explanation: "Secrets Manager: rotación automática, auditoría, integración nativa con RDS.",
        },
      ],
    },
  ],
};
