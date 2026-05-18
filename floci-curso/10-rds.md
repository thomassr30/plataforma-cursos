# Módulo 10 — RDS (Relational Database Service)

> **Objetivo**: entender qué es RDS, las distintas opciones de bases de datos relacionales en AWS, y practicar la creación y conexión a una instancia RDS en Floci.

Tiempo estimado: 1 a 1.5 horas.

---

## 1. ¿Qué es RDS?

**Amazon RDS** es un servicio de **bases de datos relacionales managed**. AWS se ocupa de:

- Instalar y mantener el motor (PostgreSQL, MySQL, etc.).
- Aplicar parches de seguridad.
- Backups automáticos.
- Replicación, alta disponibilidad.
- Monitoreo.
- Escalado vertical (cambiar el tamaño de la instancia).

Vos solo te ocupás de:

- Diseñar el schema.
- Cargar los datos.
- Optimizar las queries.

### Motores soportados en AWS real

- **PostgreSQL**
- **MySQL**
- **MariaDB**
- **Oracle**
- **Microsoft SQL Server**
- **Amazon Aurora** (compatible con PostgreSQL y MySQL, optimizado por AWS)

Floci soporta **PostgreSQL** y **MySQL**.

### ¿Cuándo usás RDS vs DynamoDB?

| RDS                            | DynamoDB                          |
|--------------------------------|-----------------------------------|
| Datos relacionales con joins   | Acceso por clave, sin joins       |
| Schema rígido                  | Schema flexible                   |
| Queries ad-hoc con SQL         | Patrones de acceso conocidos      |
| Transacciones complejas        | Transacciones limitadas           |
| Escalado vertical (a un punto) | Escalado horizontal infinito      |
| Costo predecible               | Costo proporcional al uso         |

> 👉 Si venís de Node.js con SQL (PostgreSQL/MySQL), RDS te va a resultar familiar. DynamoDB requiere repensar el modelo.

---

## 2. Conceptos clave

### 2.1 — DB Instances

Una **DB instance** es una máquina dedicada a tu base de datos. La caracterizás por:

- **Engine**: postgres, mysql, etc.
- **Instance class**: tamaño (CPU + RAM), ej. `db.t3.micro`, `db.r6g.large`.
- **Storage type**: gp3 (SSD general), io2 (alto IOPS), magnetic (deprecado).
- **Storage size**: en GB. Puede crecer automáticamente.

### 2.2 — Backups

RDS hace dos tipos de backup:

- **Automated backups**: backup completo diario + transaction logs. Retención de 7 a 35 días. Te permite restore "point-in-time" a cualquier minuto en la ventana de retención.
- **Manual snapshots**: snapshots que vos disparás. No expiran hasta que los borrás.

### 2.3 — Multi-AZ (alta disponibilidad)

Configurás la DB para que tenga una **réplica síncrona** en otra Availability Zone. Si la primaria falla, RDS hace failover automático a la réplica.

Importante:

- La réplica **no es para leer** (está en stand-by).
- Cuesta el doble (dos instancias).

### 2.4 — Read replicas

Réplicas asíncronas para **distribuir carga de lectura**. Pueden estar en otra región. No son para failover, son para performance.

### 2.5 — Maintenance window

Una ventana de tiempo (ej.: domingos 3 a 5 AM) en la que AWS aplica parches. Configurable.

### 2.6 — Security: VPC, security groups, IAM auth

En AWS real:

- Las DB instances viven en una **VPC** privada (no son públicas por defecto).
- Los **security groups** controlan qué IPs pueden conectarse.
- **IAM authentication**: en lugar de password, usar tokens temporales generados con tus credenciales IAM. Más seguro, sin passwords hardcoded.

### 2.7 — Parameter groups

Configuración de parámetros del motor (ej.: `max_connections`, `shared_buffers`). Agrupados en "parameter groups" que aplicás a una o varias instancias.

### 2.8 — Aurora (mención especial)

Aurora es la "RDS de AWS optimizada por AWS". Características:

- Hasta **5x más rápida** que MySQL estándar y **3x** que PostgreSQL.
- Storage auto-scaling de 10 GB a 128 TB.
- Hasta 15 read replicas con replicación de milisegundos.
- **Aurora Serverless**: escala a cero, ideal para cargas intermitentes.

Floci no emula Aurora.

---

## 3. Cómo lo emula Floci

Esta es una de las features más interesantes de Floci: cuando creás una instancia RDS, **levanta un contenedor Docker real con PostgreSQL o MySQL**. No es un mock — es la base de datos de verdad, accesible por JDBC/cualquier cliente SQL.

Implementa **14 operaciones de RDS**, suficientes para:

- ✅ Crear/borrar/describir instancias.
- ✅ PostgreSQL y MySQL reales.
- ✅ IAM auth (generación de tokens, validación con SigV4).
- ✅ Snapshots (a nivel API, sin restore real avanzado).

Limitaciones:

- ❌ Multi-AZ no aplica (todo es local).
- ❌ Read replicas no aplican.
- ❌ Backups continuos no aplican.
- ❌ Aurora no emulado.

### Cómo conectarte

Cuando creás una instancia, Floci te da un **endpoint** y un puerto. Conectás cualquier cliente PostgreSQL/MySQL con eso.

---

## 4. Laboratorio práctico

### Lab 1 — Crear una instancia PostgreSQL

```bash
aws rds create-db-instance \
  --db-instance-identifier mi-postgres \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password password123 \
  --allocated-storage 20 \
  --db-name miapp
```

Floci tarda unos segundos en levantar el contenedor. Esperá y verificá:

```bash
aws rds describe-db-instances --db-instance-identifier mi-postgres
```

Buscá el `Endpoint`:

```json
{
  "DBInstances": [
    {
      "Endpoint": {
        "Address": "localhost",
        "Port": 5432
      },
      ...
    }
  ]
}
```

> 💡 El puerto puede variar. Floci asigna uno libre. Mirá el output.

### Lab 2 — Conectarte con `psql`

Si tenés `psql` instalado:

```bash
psql -h localhost -p 5432 -U admin -d miapp
# (te pide password: password123)
```

Una vez dentro:

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  creado_en TIMESTAMP DEFAULT NOW()
);

INSERT INTO usuarios (nombre, email) VALUES
  ('Thomas', 'thomas@example.com'),
  ('Ana', 'ana@example.com');

SELECT * FROM usuarios;
```

Salir: `\q`.

### Lab 3 — Conectarte con `mysql`

Si preferís MySQL, podés crear otra instancia:

```bash
aws rds create-db-instance \
  --db-instance-identifier mi-mysql \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password password123 \
  --allocated-storage 20 \
  --db-name miapp
```

```bash
mysql -h localhost -P 3306 -u admin -p miapp
```

### Lab 4 — Listar instancias y snapshots

```bash
aws rds describe-db-instances
aws rds describe-db-snapshots
```

### Lab 5 — Crear un snapshot manual

```bash
aws rds create-db-snapshot \
  --db-instance-identifier mi-postgres \
  --db-snapshot-identifier mi-postgres-backup-1
```

### Lab 6 — Borrar la instancia

```bash
aws rds delete-db-instance \
  --db-instance-identifier mi-postgres \
  --skip-final-snapshot
```

> 💡 En AWS real, `--skip-final-snapshot` es peligroso porque borrás todo sin backup. Para producción usás `--final-db-snapshot-identifier <nombre>`.

---

## 5. Bonus Node.js — Conectar a RDS desde Node

`db-app.js`:

```js
import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "admin",
  password: "password123",
  database: "miapp",
});

await client.connect();

// Crear tabla si no existe
await client.query(`
  CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    precio NUMERIC(10, 2),
    creado_en TIMESTAMP DEFAULT NOW()
  );
`);

// Insertar
const insertResult = await client.query(
  `INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *`,
  ["iPhone 15", 1000]
);
console.log("Insertado:", insertResult.rows[0]);

// Consultar
const all = await client.query("SELECT * FROM productos");
console.log("Productos:", all.rows);

await client.end();
```

```bash
npm install pg
node db-app.js
```

Para MySQL sería con `mysql2`:

```bash
npm install mysql2
```

```js
import mysql from "mysql2/promise";

const conn = await mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "admin",
  password: "password123",
  database: "miapp",
});

const [rows] = await conn.execute("SELECT 1+1 AS suma");
console.log(rows);

await conn.end();
```

---

## 6. Bonus — RDS desde una Lambda

Una Lambda que se conecta a RDS para hacer una query.

```js
// index.js
const { Client } = require("pg");

exports.handler = async (event) => {
  const client = new Client({
    host: process.env.DB_HOST || "host.docker.internal",
    port: 5432,
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "password123",
    database: process.env.DB_NAME || "miapp",
  });

  await client.connect();
  const result = await client.query("SELECT NOW()");
  await client.end();

  return {
    statusCode: 200,
    body: JSON.stringify({ ahora: result.rows[0].now }),
  };
};
```

> ⚠️ En producción real, **no** ponés la password como env var ni en código. Usás Secrets Manager o IAM auth.

---

## 7. Anti-patrones (importante para el examen)

- ❌ **Lambdas que abren una conexión nueva en cada invocación**: cada cold start abre y cierra conexiones, satura la DB. Solución: connection pooling (RDS Proxy en AWS real).
- ❌ **DBs RDS sin Multi-AZ en producción**: si falla la AZ, te quedás sin DB.
- ❌ **Passwords en código o repos**: usá Secrets Manager.
- ❌ **Sin backups manuales** además de los automated: si necesitás guardar un estado mucho tiempo, hacé snapshots manuales.
- ❌ **Security groups abiertos al mundo (0.0.0.0/0)**: la DB debe ser privada.

---

## 8. RDS vs Aurora vs DynamoDB (resumen para el examen)

| Cuándo elegir cada uno |
|------------------------|
| **RDS** estándar: PostgreSQL/MySQL clásico, cargas moderadas, equipos que ya saben SQL. |
| **Aurora**: cargas más exigentes, querés mejor performance/scaling sin cambiar SQL. |
| **Aurora Serverless**: cargas intermitentes o impredecibles. |
| **DynamoDB**: alta escala, datos clave-valor, latencia milisegundos predecible, sin joins. |

---

## 9. Diferencias clave con AWS real

| Aspecto                  | AWS real                          | Floci                             |
|--------------------------|-----------------------------------|-----------------------------------|
| Motor                    | Real (PostgreSQL/MySQL/etc.)      | Real (PostgreSQL/MySQL)           |
| Multi-AZ                 | Sí                                | No aplica                         |
| Read replicas            | Sí                                | No                                |
| Automated backups        | Sí                                | No                                |
| Encriptación en reposo   | Sí                                | No                                |
| Aurora                   | Sí                                | No                                |
| VPC / Security groups    | Obligatorios                      | No aplica                         |
| Connection limits        | Por instance class                | Por contenedor                    |

---

## Quiz del módulo 10

**1.** ¿Cuál es la principal diferencia entre RDS y Aurora?

a) Aurora solo soporta MySQL.
b) Aurora es la versión optimizada por AWS, hasta 5x más rápida y con storage auto-scaling.
c) RDS es más nuevo.
d) No hay diferencia.

**2.** ¿Para qué sirve la opción Multi-AZ en RDS?

a) Para distribuir lecturas.
b) Para alta disponibilidad: réplica síncrona en otra AZ con failover automático.
c) Para reducir costos.
d) Para encriptar.

**3.** ¿Cuál es la diferencia entre Multi-AZ y Read Replicas?

a) Las read replicas son síncronas, Multi-AZ es asíncrono.
b) Multi-AZ es para HA (failover); read replicas son para distribuir carga de lectura.
c) No hay diferencia.
d) Read replicas solo funcionan en Aurora.

**4.** ¿Cuál de los siguientes motores **NO** soporta Floci?

a) PostgreSQL
b) MySQL
c) Oracle
d) Floci no soporta ningún motor real.

**5.** Un equipo necesita guardar datos relacionales con joins complejos y queries ad-hoc. ¿Qué servicio les recomendarías?

a) DynamoDB
b) S3
c) RDS (o Aurora)
d) SQS

**6.** Anti-patrón típico de Lambda + RDS:

a) Usar la misma DB para todas las funciones.
b) Abrir una conexión nueva en cada invocación, agotando las conexiones de la DB.
c) Usar PostgreSQL en lugar de MySQL.
d) Conectarse desde la misma región.

**7.** ¿Cuál es la forma más segura de guardar la password de la DB?

a) En el código.
b) En una variable de entorno con `aws lambda update-function-configuration`.
c) En Secrets Manager, recuperándola en runtime.
d) En un archivo `.env` en el repo.

---

### Respuestas

1. **b**. Aurora es compatible con MySQL/PostgreSQL pero está optimizada por AWS — más rápida y más elástica.
2. **b**. Multi-AZ = HA. Hay una réplica sincrónica en otra AZ; si falla la primaria, AWS hace failover.
3. **b**. Multi-AZ es para HA (no para leer). Read replicas son para distribuir lectura (no son failover).
4. **c**. Floci soporta PostgreSQL y MySQL. Oracle y SQL Server no están soportados.
5. **c**. RDS o Aurora. SQL clásico es el patrón para joins y queries ad-hoc. DynamoDB sería forzar el modelo.
6. **b**. Lambdas con conexiones efímeras son uno de los anti-patrones más comunes. RDS Proxy (en AWS real) lo mitiga.
7. **c**. Secrets Manager. Las env vars son mejores que el código pero menos seguras que Secrets Manager (no se rotan, no se auditan).

---

## Resumen

- RDS = bases de datos relacionales managed.
- Floci soporta PostgreSQL y MySQL reales (no mocks).
- Conectás cualquier cliente SQL al endpoint/puerto que te devuelve `describe-db-instances`.
- En AWS real, usar **Multi-AZ** para HA y **read replicas** para escalar lectura.
- En Lambda, evitar abrir conexiones por invocación.

Siguiente: [`11-kms-secrets.md`](./11-kms-secrets.md).
