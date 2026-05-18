# Módulo 05 — DynamoDB

> **Objetivo**: entender qué es una base de datos NoSQL, cómo se modela en DynamoDB, y practicar las operaciones más comunes en Floci.

Tiempo estimado: 2 a 2.5 horas. Este módulo es más denso porque DynamoDB tiene un modelo distinto al SQL clásico.

---

## 1. ¿Qué es DynamoDB?

**Amazon DynamoDB** es una base de datos **NoSQL** totalmente administrada (managed) de AWS. Tiene latencias de **milisegundos** a cualquier escala, sin que vos tengas que preocuparte por servidores, parches, ni escalado.

Es **clave-valor + documento**:

- **Clave-valor**: cada ítem se identifica por una clave única.
- **Documento**: el valor puede ser un JSON anidado.

### ¿Por qué NoSQL?

En una base SQL (PostgreSQL, MySQL) tenés tablas con esquema fijo y joins. Esto va bien hasta que tu app tiene millones de usuarios y los joins se vuelven el cuello de botella.

NoSQL renuncia a algunas cosas (joins, transacciones complejas, esquema rígido) a cambio de **escalar horizontalmente** sin esfuerzo. DynamoDB puede manejar millones de operaciones por segundo y petabytes de datos sin que te enteres.

### Casos de uso típicos

- Sesiones de usuario.
- Carritos de compra.
- Leaderboards (rankings) de juegos.
- Catálogos de productos.
- Logs de eventos.
- IoT (millones de mediciones por minuto).

### Cuándo NO usar DynamoDB

- Cuando necesitás **joins complejos** entre muchas tablas.
- Cuando los **patrones de acceso cambian todo el tiempo** y son ad-hoc.
- Cuando preferís SQL por el equipo que ya tenés.

---

## 2. Conceptos clave

### 2.1 — Tablas, ítems y atributos

| Concepto SQL    | Equivalente DynamoDB     |
|-----------------|--------------------------|
| Tabla           | Tabla                    |
| Fila / Row      | **Item**                 |
| Columna         | **Attribute**            |
| Schema rígido   | Schema flexible          |

Un **item** en DynamoDB es un conjunto de atributos. Cada item puede tener **diferentes** atributos — no hay esquema fijo más allá de la clave primaria.

Ejemplo de tabla `Productos`:

```
{ "id": "p001", "nombre": "iPhone", "precio": 1000, "color": "negro" }
{ "id": "p002", "nombre": "Camiseta", "precio": 25, "talles": ["S","M","L"] }
{ "id": "p003", "nombre": "Libro", "precio": 15 }
```

Los items tienen distintas estructuras y eso es válido.

### 2.2 — Clave primaria (Primary Key)

Cada tabla tiene una clave primaria, que puede ser de dos tipos:

#### Simple (partition key)

Solo una atributo. Ejemplo: `id`.

```
{ "id": "p001", ... }
{ "id": "p002", ... }
```

Cada `id` tiene que ser único.

#### Compuesta (partition key + sort key)

Dos atributos. Los items se agrupan por `partition key` y dentro de cada grupo se ordenan por `sort key`.

Ejemplo: tabla `Mensajes` con `conversacion_id` (partition) + `timestamp` (sort).

```
{ "conversacion_id": "abc", "timestamp": "2025-01-01T10:00", "texto": "Hola" }
{ "conversacion_id": "abc", "timestamp": "2025-01-01T10:01", "texto": "Qué tal" }
{ "conversacion_id": "xyz", "timestamp": "2025-01-01T11:00", "texto": "Buenas" }
```

Podés pedir "todos los mensajes de la conversación `abc`" eficientemente, porque están físicamente juntos.

> 👉 La elección de la clave primaria es **lo más importante** en DynamoDB. Si la elegís mal, te vas a topar con problemas de performance que en SQL no existen.

### 2.3 — Índices secundarios

A veces querés consultar por algo que no es la clave primaria. Para eso están los índices:

#### Global Secondary Index (GSI)

Te permite consultar por otros atributos. Es como una tabla nueva indexada distinto. Puede tener partition key y sort key totalmente diferentes a la tabla original.

Ejemplo: tabla `Usuarios` con clave primaria `id`. Si querés buscar por `email`, creás un GSI con `email` como partition key.

#### Local Secondary Index (LSI)

Te permite usar **la misma partition key** pero **una sort key distinta**. Útil para ordenar el mismo conjunto de items por otro atributo. Solo se puede crear al momento de crear la tabla.

### 2.4 — Operaciones: GetItem, Query, Scan

| Operación   | Qué hace                                                        | Costo |
|-------------|-----------------------------------------------------------------|-------|
| **GetItem** | Busca **un** item por clave primaria completa                   | Barato (1 unidad) |
| **Query**   | Busca items que comparten la misma partition key                | Eficiente |
| **Scan**    | Lee **toda** la tabla                                           | ⚠️ Caro |

**Regla de oro**: si te encontrás haciendo Scan, probablemente tu modelo de datos está mal pensado. En DynamoDB, casi todo se resuelve con Query.

### 2.5 — Capacity modes (entra en el examen)

DynamoDB tiene dos modos de facturación:

#### Provisioned

Vos decís cuántas **read capacity units** (RCU) y **write capacity units** (WCU) querés. Pagás por la capacidad reservada, uses o no uses.

- **1 RCU** = 1 lectura fuertemente consistente por segundo de un item de hasta 4 KB.
- **1 WCU** = 1 escritura por segundo de un item de hasta 1 KB.

Tiene **auto-scaling** opcional.

#### On-Demand

Pagás por request, sin reservar nada. Más caro por unidad pero ideal para tráfico impredecible.

### 2.6 — Streams

**DynamoDB Streams** captura cada cambio (insert, update, delete) en una tabla y los expone como un stream. Útil para:

- Triggear Lambdas cuando algo cambia.
- Replicar a otra base de datos.
- Auditoría.

### 2.7 — TTL (Time To Live)

Podés marcar un atributo como TTL: cuando su valor (timestamp Unix) pasa, DynamoDB borra el item automáticamente. Ideal para datos efímeros (sesiones, caches, OTPs).

### 2.8 — Transacciones

DynamoDB soporta transacciones limitadas (hasta 100 items) con `TransactWriteItems` y `TransactGetItems`. ACID-compliant pero con escala restringida vs una DB SQL.

### 2.9 — Consistency models

- **Eventually consistent** (default): leés y puede que veas una escritura reciente o no. Más barato.
- **Strongly consistent**: leés y siempre ves la última escritura. Cuesta el doble en RCU.

---

## 3. Cómo lo emula Floci

Floci implementa **22 operaciones de DynamoDB + 5 de DynamoDB Streams**. Soporta:

- ✅ Tablas simples y compuestas.
- ✅ GSIs y LSIs.
- ✅ Query, Scan, GetItem, PutItem, UpdateItem, DeleteItem.
- ✅ Transacciones (TransactWriteItems, TransactGetItems).
- ✅ Batch operations.
- ✅ TTL (atributo configurado).
- ✅ Streams con shard iterators.
- ✅ Triggers de Lambda desde streams.

Diferencias con AWS real:

- **No hay billing**: ni provisioned ni on-demand cobran nada acá.
- **No hay auto-scaling**: no aplica.
- **No hay backups automáticos**: no aplica (los datos están en el volumen de Floci).
- **No hay encriptación en reposo real**: las opciones se aceptan, pero los datos están en claro en el filesystem.

---

## 4. Laboratorio práctico

### Lab 1 — Crear una tabla simple

Vamos a hacer una tabla `Productos` con clave primaria simple `id`.

```bash
aws dynamodb create-table \
  --table-name Productos \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

> 💡 `HASH` = partition key. `S` = String. Otros tipos: `N` (Number), `B` (Binary).

Verificá que existe:

```bash
aws dynamodb list-tables
aws dynamodb describe-table --table-name Productos
```

### Lab 2 — Insertar items

```bash
aws dynamodb put-item \
  --table-name Productos \
  --item '{
    "id": {"S": "p001"},
    "nombre": {"S": "iPhone 15"},
    "precio": {"N": "1000"},
    "stock": {"N": "5"}
  }'

aws dynamodb put-item \
  --table-name Productos \
  --item '{
    "id": {"S": "p002"},
    "nombre": {"S": "Camiseta"},
    "precio": {"N": "25"},
    "talles": {"L": [{"S": "S"}, {"S": "M"}, {"S": "L"}]}
  }'
```

Notá la sintaxis de tipos de DynamoDB:

- `{"S": "..."}` → String
- `{"N": "..."}` → Number (siempre como string, lo parsea DynamoDB)
- `{"L": [...]}` → List
- `{"M": {...}}` → Map (objeto anidado)
- `{"BOOL": true}` → Boolean
- `{"NULL": true}` → Null

### Lab 3 — Leer items

#### GetItem (por clave primaria)

```bash
aws dynamodb get-item \
  --table-name Productos \
  --key '{"id": {"S": "p001"}}'
```

#### Scan (todos los items)

```bash
aws dynamodb scan --table-name Productos
```

#### Query con filtros

Scan con filtro (no es eficiente, pero a veces sirve):

```bash
aws dynamodb scan \
  --table-name Productos \
  --filter-expression "precio > :p" \
  --expression-attribute-values '{":p": {"N": "100"}}'
```

### Lab 4 — Update item

```bash
aws dynamodb update-item \
  --table-name Productos \
  --key '{"id": {"S": "p001"}}' \
  --update-expression "SET stock = :s, ultimaActualizacion = :u" \
  --expression-attribute-values '{
    ":s": {"N": "3"},
    ":u": {"S": "2026-05-18"}
  }' \
  --return-values ALL_NEW
```

### Lab 5 — Delete item

```bash
aws dynamodb delete-item \
  --table-name Productos \
  --key '{"id": {"S": "p002"}}'
```

### Lab 6 — Tabla con clave compuesta

Vamos a hacer una tabla `Mensajes` con `conversacionId` (partition) + `timestamp` (sort).

```bash
aws dynamodb create-table \
  --table-name Mensajes \
  --attribute-definitions \
    AttributeName=conversacionId,AttributeType=S \
    AttributeName=timestamp,AttributeType=S \
  --key-schema \
    AttributeName=conversacionId,KeyType=HASH \
    AttributeName=timestamp,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST
```

Insertar algunos mensajes:

```bash
for i in 1 2 3 4 5; do
  aws dynamodb put-item \
    --table-name Mensajes \
    --item "{
      \"conversacionId\": {\"S\": \"chat-1\"},
      \"timestamp\": {\"S\": \"2026-05-18T10:0$i:00\"},
      \"texto\": {\"S\": \"Mensaje $i\"}
    }"
done
```

Query: traer todos los mensajes de `chat-1`:

```bash
aws dynamodb query \
  --table-name Mensajes \
  --key-condition-expression "conversacionId = :c" \
  --expression-attribute-values '{":c": {"S": "chat-1"}}'
```

Query con rango de sort key:

```bash
aws dynamodb query \
  --table-name Mensajes \
  --key-condition-expression "conversacionId = :c AND #ts BETWEEN :ini AND :fin" \
  --expression-attribute-names '{"#ts": "timestamp"}' \
  --expression-attribute-values '{
    ":c": {"S": "chat-1"},
    ":ini": {"S": "2026-05-18T10:02:00"},
    ":fin": {"S": "2026-05-18T10:04:00"}
  }'
```

> 💡 `timestamp` es palabra reservada en DynamoDB, por eso usamos `#ts` como alias.

### Lab 7 — Crear un GSI

Imaginá que en `Productos` querés buscar también por `nombre`. Creamos un GSI.

Primero necesitamos declarar el atributo:

```bash
aws dynamodb update-table \
  --table-name Productos \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
    AttributeName=nombre,AttributeType=S \
  --global-secondary-index-updates '[
    {
      "Create": {
        "IndexName": "NombreIndex",
        "KeySchema": [{"AttributeName":"nombre","KeyType":"HASH"}],
        "Projection": {"ProjectionType":"ALL"}
      }
    }
  ]'
```

Esperá un par de segundos a que se cree y luego:

```bash
aws dynamodb query \
  --table-name Productos \
  --index-name NombreIndex \
  --key-condition-expression "nombre = :n" \
  --expression-attribute-values '{":n": {"S": "iPhone 15"}}'
```

### Lab 8 — TTL

Activar TTL en una tabla:

```bash
aws dynamodb update-time-to-live \
  --table-name Productos \
  --time-to-live-specification "Enabled=true, AttributeName=expira"
```

Insertar un item que expira en 60 segundos (timestamp Unix):

```bash
TTL=$(($(date +%s) + 60))
aws dynamodb put-item \
  --table-name Productos \
  --item "{
    \"id\": {\"S\": \"temporal\"},
    \"nombre\": {\"S\": \"Item efímero\"},
    \"expira\": {\"N\": \"$TTL\"}
  }"
```

> ⚠️ En AWS real, el TTL no es exacto. Puede tomar hasta 48 horas en borrar. En Floci la implementación puede ser distinta — verificá los logs.

### Lab 9 — Limpieza

```bash
aws dynamodb delete-table --table-name Productos
aws dynamodb delete-table --table-name Mensajes
```

---

## 5. Bonus Node.js — CRUD completo con DynamoDB

`ddb-app.js`:

```js
import {
  DynamoDBClient,
  CreateTableCommand,
  DeleteTableCommand,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  QueryCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
  credentials: { accessKeyId: "test", secretAccessKey: "test" },
});

// El "DocumentClient" te abstrae los tipos {"S": ...}, {"N": ...}
const ddb = DynamoDBDocumentClient.from(client);

const TABLE = "NodeUsuarios";

// 1. Crear tabla
await client.send(
  new CreateTableCommand({
    TableName: TABLE,
    AttributeDefinitions: [{ AttributeName: "email", AttributeType: "S" }],
    KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
    BillingMode: "PAY_PER_REQUEST",
  })
);
console.log("Tabla creada");

// 2. Put (insertar)
await ddb.send(
  new PutCommand({
    TableName: TABLE,
    Item: {
      email: "thomas@example.com",
      nombre: "Thomas",
      activo: true,
      tags: ["dev", "nodejs"],
      meta: { ciudad: "Buenos Aires", edad: 30 },
    },
  })
);
console.log("Usuario insertado");

// 3. Get
const got = await ddb.send(
  new GetCommand({
    TableName: TABLE,
    Key: { email: "thomas@example.com" },
  })
);
console.log("Get:", got.Item);

// 4. Update
await ddb.send(
  new UpdateCommand({
    TableName: TABLE,
    Key: { email: "thomas@example.com" },
    UpdateExpression: "SET nombre = :n, activo = :a",
    ExpressionAttributeValues: {
      ":n": "Thomas Soto",
      ":a": false,
    },
  })
);
console.log("Actualizado");

// 5. Re-leer
const re = await ddb.send(
  new GetCommand({
    TableName: TABLE,
    Key: { email: "thomas@example.com" },
  })
);
console.log("Después del update:", re.Item);

// 6. Delete item
await ddb.send(
  new DeleteCommand({
    TableName: TABLE,
    Key: { email: "thomas@example.com" },
  })
);
console.log("Item borrado");

// 7. Borrar tabla
await client.send(new DeleteTableCommand({ TableName: TABLE }));
console.log("Tabla eliminada");
```

```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
node ddb-app.js
```

> 💡 `@aws-sdk/lib-dynamodb` te da el `DocumentClient`, que oculta la sintaxis `{"S": ...}`. **Usalo siempre** en Node — sin él el código se vuelve insoportable.

---

## 6. Single-Table Design (concepto avanzado)

En DynamoDB la mejor práctica (controvertida) es meter **toda tu app en una sola tabla**, modelando los distintos tipos de entidades con prefijos en la clave.

Ejemplo:

```
PK              | SK                | tipo     | otros atributos
----------------+-------------------+----------+----------------
USER#123        | METADATA          | usuario  | email, nombre
USER#123        | ORDER#001         | orden    | total, fecha
USER#123        | ORDER#002         | orden    | total, fecha
ORDER#001       | METADATA          | orden    | usuarioId, items
ORDER#001       | ITEM#a            | item     | producto, cant
```

Con un Query de `PK=USER#123` traés al usuario y todas sus órdenes de un solo golpe. Te ahorra joins y requests.

No te angusties si esto suena raro al principio — es un cambio de paradigma. Buscá "DynamoDB single-table design Rick Houlihan" cuando quieras profundizar.

---

## 7. Diferencias clave con AWS real

| Aspecto                     | AWS real                          | Floci                            |
|-----------------------------|-----------------------------------|----------------------------------|
| Throughput limits           | Reales (RCUs / WCUs)              | Sin límites                      |
| Auto-scaling                | Disponible                        | No aplica                        |
| Backups continuos (PITR)    | Disponibles                       | No                               |
| Global tables (multi-region)| Disponibles                       | No                               |
| Encriptación en reposo      | Sí                                | Aceptado, no real                |
| Cost analytics              | Disponible                        | No aplica                        |

---

## Quiz del módulo 05

**1.** ¿Cuál es la operación más cara de DynamoDB en términos de costo?

a) GetItem
b) Query
c) Scan
d) PutItem

**2.** ¿Qué diferencia hay entre un GSI y un LSI?

a) Los GSI son más rápidos.
b) Los LSI solo permiten cambiar la sort key, manteniendo la misma partition key.
c) No hay diferencia.
d) Los LSI son globales.

**3.** ¿Qué pasa si tu tabla tiene clave primaria simple `id` y querés buscar por `email`?

a) Tenés que hacer Scan, no hay alternativa.
b) Podés crear un GSI con `email` como partition key.
c) DynamoDB lo hace automáticamente.
d) Tenés que migrar a una clave compuesta.

**4.** ¿Cuál es la unidad de capacidad para escrituras en modo provisioned?

a) RCU (Read Capacity Unit)
b) WCU (Write Capacity Unit)
c) DCU (Data Capacity Unit)
d) IOPS

**5.** ¿Para qué sirve un atributo TTL en DynamoDB?

a) Para encriptar el item.
b) Para que DynamoDB borre el item automáticamente cuando expire.
c) Para crear backups.
d) Para indicar el último acceso.

**6.** En modo "eventually consistent", ¿qué puede pasar al leer un item que acabás de escribir?

a) Siempre lo vas a ver.
b) Puede que veas la versión vieja o la nueva, depende.
c) Va a tirar error.
d) Te lo devuelve encriptado.

**7.** ¿Cuál es la mejor práctica para modelar una app en DynamoDB?

a) Una tabla por entidad, como en SQL.
b) Single-Table Design: toda la app en una tabla, modelando con prefijos en la clave.
c) Tablas con joins.
d) Usar siempre Scan.

---

### Respuestas

1. **c**. Scan recorre toda la tabla y cuesta proporcional al tamaño total. Las otras operaciones cuestan según la cantidad de items que leen.
2. **b**. Los LSI mantienen la misma partition key y solo cambian la sort key. Solo se crean al momento de crear la tabla. Los GSI son flexibles (cualquier clave) y se pueden crear/borrar después.
3. **b**. Un GSI con `email` como partition key te permite Query por email.
4. **b**. WCU = Write Capacity Unit. 1 WCU = 1 escritura/segundo de un item de hasta 1 KB.
5. **b**. TTL borra el item cuando el timestamp pasa. Útil para sesiones, caches, OTPs.
6. **b**. Eventually consistent significa que la lectura puede ver una versión ligeramente vieja. Para garantía total usás strongly consistent (cuesta el doble).
7. **b**. Single-Table Design es la práctica recomendada por AWS para DynamoDB, aunque tiene curva de aprendizaje alta.

---

## Resumen

- DynamoDB es NoSQL clave-valor + documento, totalmente managed.
- La **clave primaria** puede ser simple (partition) o compuesta (partition + sort).
- **Get/Query** son baratos, **Scan** es caro.
- **GSI** te permite Query por atributos que no son la clave primaria.
- **TTL** borra items automáticamente.
- **Streams** triggean Lambdas cuando hay cambios.
- En Node, usá `@aws-sdk/lib-dynamodb` para evitar la sintaxis verbose `{"S": ...}`.

Siguiente: [`06-sqs.md`](./06-sqs.md).
