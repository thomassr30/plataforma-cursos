import type { ModuleData } from "@/types/course";

export const m5: ModuleData = {
  slug: "m5",
  number: 5,
  title: "DynamoDB · Base de datos NoSQL",
  icon: "🗄️",
  intro:
    "DynamoDB es la base de datos NoSQL clave-valor + documento de AWS. Totalmente managed, con latencias de milisegundos a cualquier escala. Tenés que conocer claves primarias, índices, capacity modes y la diferencia con RDS.",
  totalActivities: 2,
  blocks: [
    // 1. Qué es
    { kind: "h3", text: "📚 1. ¿Qué es DynamoDB?" },
    {
      kind: "info",
      html:
        "<strong>DynamoDB</strong> es NoSQL <em>clave-valor + documento</em>. Maneja millones de operaciones por segundo y petabytes de datos sin que vos gestiones servidores ni hagas escalado manual.",
    },
    { kind: "h4", text: "SQL vs DynamoDB (vocabulario)" },
    {
      kind: "table",
      headers: ["Concepto SQL", "Equivalente DynamoDB"],
      rows: [
        ["Tabla", "Tabla"],
        ["Fila / Row", "Item"],
        ["Columna", "Attribute"],
        ["Schema rígido", "Schema flexible (items pueden tener distintos atributos)"],
      ],
    },

    // 2. Claves primarias
    { kind: "h3", text: "🔑 2. Clave primaria" },
    {
      kind: "info",
      html:
        "<strong>Simple (partition key):</strong> solo un atributo. Ejemplo: <code>id</code>. Cada valor único.<br/><br/>" +
        "<strong>Compuesta (partition + sort):</strong> dos atributos. Items se agrupan por partition y se ordenan por sort.<br/>" +
        "Ejemplo: tabla <code>Mensajes</code> con <code>conversacion_id</code> (partition) + <code>timestamp</code> (sort) → traer todos los mensajes de una conversación en orden, eficientemente.",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 La elección de la clave primaria es lo más importante.</strong> Si la elegís mal, te vas a topar con problemas de performance que en SQL no existen.",
    },

    // 3. Operaciones
    { kind: "h3", text: "📖 3. Operaciones de lectura" },
    {
      kind: "table",
      headers: ["Operación", "Qué hace", "Costo"],
      rows: [
        ["GetItem", "Busca UN item por clave primaria completa", "Barato (1 unidad)"],
        ["Query", "Trae items con la misma partition key", "Eficiente"],
        ["Scan", "Lee TODA la tabla", "⚠️ Caro, evitar"],
      ],
    },

    // 4. Índices
    { kind: "h3", text: "🗂️ 4. Índices secundarios" },
    {
      kind: "table",
      headers: ["Tipo", "Característica", "Cuándo se crea"],
      rows: [
        ["GSI (Global)", "Cualquier partition/sort key distintas a la tabla", "En cualquier momento"],
        ["LSI (Local)", "Misma partition key, sort distinta", "Solo al crear la tabla"],
      ],
    },

    // 5. Capacity modes
    { kind: "h3", text: "💰 5. Capacity modes (examen)" },
    {
      kind: "info",
      html:
        "<strong>Provisioned:</strong> reservás RCUs (Read Capacity Units) y WCUs (Write Capacity Units). Pagás por capacidad reservada, uses o no uses.<br/>" +
        "<strong>On-Demand:</strong> pagás por request. Ideal para tráfico impredecible.<br/><br/>" +
        "<strong>1 RCU</strong> = 1 lectura strongly consistent/seg de item ≤ 4 KB.<br/>" +
        "<strong>1 WCU</strong> = 1 escritura/seg de item ≤ 1 KB.",
    },

    // 6. TTL, Streams, transacciones
    { kind: "h3", text: "🧰 6. Otras features" },
    {
      kind: "list",
      items: [
        "<strong>TTL:</strong> atributo con timestamp Unix; DynamoDB borra el item al expirar. Útil para sesiones, caches, OTPs",
        "<strong>Streams:</strong> cambios (insert/update/delete) expuestos como stream → trigger Lambdas",
        "<strong>Transacciones:</strong> TransactWriteItems / TransactGetItems, hasta 100 items, ACID",
        "<strong>Consistency:</strong> eventual (default) o strongly consistent (doble RCU)",
      ],
    },

    // 7. Lab CLI
    { kind: "h3", text: "🧪 7. Laboratorio en Floci" },
    {
      kind: "info",
      html:
        "<strong>Crear tabla simple:</strong>" +
        "<pre><code>aws dynamodb create-table \\\n" +
        "  --table-name Productos \\\n" +
        "  --attribute-definitions AttributeName=id,AttributeType=S \\\n" +
        "  --key-schema AttributeName=id,KeyType=HASH \\\n" +
        "  --billing-mode PAY_PER_REQUEST</code></pre>" +
        "<strong>Insertar item:</strong>" +
        "<pre><code>aws dynamodb put-item --table-name Productos \\\n" +
        "  --item '{\n" +
        '    "id": {"S": "p001"},\n' +
        '    "nombre": {"S": "iPhone"},\n' +
        '    "precio": {"N": "1000"}\n' +
        "  }'</code></pre>" +
        "<strong>Get / Query / Scan:</strong>" +
        "<pre><code>aws dynamodb get-item --table-name Productos \\\n" +
        "  --key '{\"id\": {\"S\": \"p001\"}}'\n\n" +
        "aws dynamodb scan --table-name Productos</code></pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Tipos en DynamoDB:</strong> <code>{S}</code> String, <code>{N}</code> Number (siempre como string), <code>{L}</code> List, <code>{M}</code> Map, <code>{BOOL}</code> Boolean, <code>{NULL}</code> Null.",
    },

    // 8. Bonus Node
    { kind: "h3", text: "📜 8. Bonus Node.js con DocumentClient" },
    {
      kind: "info",
      html:
        "<pre><code>import { DynamoDBClient } from '@aws-sdk/client-dynamodb';\n" +
        "import { DynamoDBDocumentClient, PutCommand, GetCommand }\n" +
        "  from '@aws-sdk/lib-dynamodb';\n\n" +
        "const ddb = DynamoDBDocumentClient.from(\n" +
        "  new DynamoDBClient({\n" +
        "    endpoint: 'http://localhost:4566',\n" +
        "    region: 'us-east-1',\n" +
        "    credentials: { accessKeyId: 'test', secretAccessKey: 'test' },\n" +
        "  })\n" +
        ");\n\n" +
        "// El DocumentClient oculta la sintaxis {S: ...}\n" +
        "await ddb.send(new PutCommand({\n" +
        "  TableName: 'Productos',\n" +
        "  Item: { id: 'p001', nombre: 'iPhone', precio: 1000 },\n" +
        "}));</code></pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Usar siempre DocumentClient en Node.</strong> Sin él, el código se llena de <code>{\"S\": \"...\"}, {\"N\": \"...\"}</code> y se vuelve insoportable.",
    },

    // Quiz
    { kind: "h3", text: "🎯 Test del módulo 5" },
    {
      kind: "quiz",
      key: "m5_quiz",
      questions: [
        {
          q: "¿Cuál de estas operaciones es más cara en DynamoDB?",
          options: ["GetItem", "Query", "Scan", "PutItem"],
          correct: 2,
          explanation: "Scan recorre toda la tabla y cuesta proporcional al tamaño total.",
        },
        {
          q: "Diferencia entre GSI y LSI:",
          options: [
            "Los GSI son más rápidos",
            "Los LSI mantienen la misma partition key y solo cambian la sort key; los GSI son más flexibles",
            "No hay diferencia",
            "Los LSI son globales",
          ],
          correct: 1,
          explanation:
            "LSI: misma partition, sort distinta, solo al crear la tabla. GSI: cualquier partition/sort, creable después.",
        },
        {
          q: "Tu tabla tiene clave primaria simple 'id'. Querés buscar por 'email'. ¿Qué hacés?",
          options: [
            "Hacer Scan",
            "Crear un GSI con email como partition key",
            "Migrar a clave compuesta",
            "DynamoDB lo hace automáticamente",
          ],
          correct: 1,
          explanation: "Un GSI con email como partition key permite hacer Query por email eficientemente.",
        },
        {
          q: "Unidad de capacidad para escrituras en modo provisioned:",
          options: ["RCU", "WCU", "DCU", "IOPS"],
          correct: 1,
          explanation: "WCU = Write Capacity Unit. 1 WCU = 1 escritura/seg de item ≤ 1 KB.",
        },
        {
          q: "¿Para qué sirve TTL?",
          options: [
            "Encriptar el item",
            "Que DynamoDB borre el item automáticamente al expirar",
            "Crear backups",
            "Indicar último acceso",
          ],
          correct: 1,
          explanation: "TTL = borrado automático cuando el timestamp expira. Ideal para sesiones, caches, OTPs.",
        },
        {
          q: "En modo eventually consistent, al leer un item recién escrito:",
          options: [
            "Siempre lo ves",
            "Puede que veas la versión vieja o la nueva",
            "Tira error",
            "Lo devuelve encriptado",
          ],
          correct: 1,
          explanation:
            "Eventually consistent = lectura puede no ver la última escritura. Strongly consistent garantiza ver lo último pero cuesta el doble en RCU.",
        },
      ],
    },
  ],
};
