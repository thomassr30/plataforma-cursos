# Módulo 03 — IAM (Identity and Access Management)

> **Objetivo**: entender el modelo de identidades y permisos de AWS, y practicarlo en Floci. IAM es la base conceptual de toda la seguridad en AWS y entra muchísimo en el examen.

Tiempo estimado: 1.5 a 2 horas.

---

## 1. ¿Qué es IAM?

IAM es el servicio de **control de acceso** de AWS. Responde a dos preguntas:

1. **¿Quién sos?** (autenticación)
2. **¿Qué podés hacer?** (autorización)

Cada vez que alguien (o algo) intenta hacer una operación en AWS, IAM revisa si esa identidad tiene permisos para hacerla. Si no los tiene, le devuelve un `AccessDenied`.

### Por qué es crítico

Configurar mal IAM es una de las causas más comunes de incidentes de seguridad en la nube. Casos típicos:

- Un bucket de S3 público que filtra datos sensibles.
- Credenciales con permisos de admin que terminan en un repo de GitHub.
- Una Lambda que puede borrar la base de datos de producción porque "es más fácil así".

El examen Cloud Practitioner te toma estos conceptos. Tenés que conocer las cuatro entidades, los principios de menor privilegio, y la diferencia entre policies basadas en identidad y basadas en recurso.

---

## 2. Las cuatro entidades de IAM

### 2.1 — Users (usuarios)

Una **identidad humana** o de una aplicación específica. Cada user tiene:

- Un **nombre** (`thomas`, `deploy-bot`).
- Opcionalmente, una **contraseña** para login en la consola.
- Opcionalmente, **access keys** (`AKIA…` + `secret`) para el AWS CLI o SDK.
- Pertenece a una **cuenta de AWS** (no a una región — IAM es global).

> 👉 Buena práctica: cada persona tiene su propio user. Nadie comparte credenciales.

### 2.2 — Groups (grupos)

Una **colección de users** a los que les asignás las mismas policies. No es una identidad por sí mismo: los grupos no pueden hacer nada, solo organizan permisos.

Ejemplo: el grupo `Developers` tiene la policy `DeveloperAccess`. Cualquier user que metas adentro hereda esa policy.

### 2.3 — Roles (roles)

Una **identidad temporal** que cualquier entidad (un user, un servicio, una Lambda, una EC2) puede **asumir** para hacer algo puntual. Los roles son la forma "correcta" de dar permisos a:

- Servicios de AWS (ej.: una Lambda que necesita escribir en S3 — le asignás un role).
- Aplicaciones externas (ej.: un sistema CI/CD que necesita deployar — asume un role con `AssumeRoleWithWebIdentity`).
- Usuarios de otras cuentas.

**Diferencia clave con users**: un role no tiene credenciales permanentes. Cuando alguien lo asume, le entregan credenciales temporales que expiran (default: 1 hora).

### 2.4 — Policies (políticas)

Un **documento JSON** que describe qué acciones están permitidas o denegadas. Las policies se atan a users, groups o roles.

Estructura básica:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::mi-bucket/*"
    }
  ]
}
```

Lectura: "permitir leer objetos del bucket `mi-bucket`".

#### Tipos de policy

- **Managed policies**: pre-creadas por AWS (ej.: `AmazonS3ReadOnlyAccess`). Las podés usar tal cual.
- **Customer managed**: las creás vos en tu cuenta.
- **Inline**: viven dentro de un user/group/role específico (no se reutilizan).

#### Identity-based vs Resource-based policies

| Tipo               | Se atan a…           | Ejemplo                                    |
|--------------------|----------------------|--------------------------------------------|
| Identity-based     | Users, groups, roles | "Este user puede leer S3"                  |
| Resource-based     | Recursos             | "Este bucket permite acceso público a /imgs" |

---

## 3. Cómo evalúa IAM una petición

Cuando un user hace `aws s3 get-object …`, IAM ejecuta este algoritmo:

1. ¿Hay alguna policy que **deniegue** explícitamente esa acción? → **DENY**.
2. ¿Hay alguna policy que **permita** explícitamente esa acción? → **ALLOW**.
3. Si no hay ni `Allow` ni `Deny` → **DENY** (por defecto, todo está prohibido).

> 💡 **Deny gana siempre**. Si una policy te permite algo y otra te lo niega, el resultado es Deny.

### Principio de menor privilegio

Concepto clave del examen: **dar solo los permisos mínimos necesarios para hacer el trabajo**. Si una Lambda solo necesita leer de un bucket, no le des `s3:*`. Dale `s3:GetObject` sobre ese bucket específico.

---

## 4. ARNs — la forma de identificar cosas en AWS

ARN = **Amazon Resource Name**. Cada recurso de AWS tiene uno. Formato:

```
arn:aws:<servicio>:<region>:<account-id>:<recurso>
```

Ejemplos:

```
arn:aws:s3:::mi-bucket                          # bucket de S3 (S3 no tiene region ni account-id en el ARN)
arn:aws:s3:::mi-bucket/foto.jpg                 # objeto dentro de un bucket
arn:aws:iam::000000000000:user/thomas           # un user IAM
arn:aws:iam::000000000000:role/lambda-role      # un role
arn:aws:lambda:us-east-1:000000000000:function:mi-funcion
arn:aws:dynamodb:us-east-1:000000000000:table/Productos
```

En Floci, el account-id por defecto es `000000000000` (doce ceros), salvo que lo cambies con `FLOCI_DEFAULT_ACCOUNT_ID`.

---

## 5. Cómo lo emula Floci

Floci implementa **65+ operaciones de IAM** y 7 de STS. Tenés:

- Users, groups, roles, policies, instance profiles, access keys.
- AssumeRole, AssumeRoleWithWebIdentity, AssumeRoleWithSAML, GetSessionToken, GetFederationToken.

### Cosas a tener en cuenta

- **Floci no valida las policies cuando hacés operaciones reales**. Es decir: podés crear un user sin permisos, y aun así ese user va a poder hacer todo si lo usás como credencial. Esto es porque Floci no tiene un servicio de autenticación real — acepta cualquier credencial.
- Las policies se **guardan** y se **listan** correctamente. Sirven para practicar la sintaxis y los conceptos, pero el "enforcement" no es estricto.
- Las **credenciales temporales de STS** (con `AssumeRole`) las podés generar y son aceptadas.

Esto significa que **podés practicar todos los comandos de IAM**, pero para realmente ver `AccessDenied` cuando una policy es restrictiva, tendrías que ir a AWS real. No es un problema para aprender los conceptos — es exactamente lo mismo que pasa cuando estudiás SQL y nadie te impide hacer queries: el motor las acepta igual.

---

## 6. Laboratorio práctico

Asegurate de tener Floci corriendo y `AWS_ENDPOINT_URL` exportada:

```bash
echo $AWS_ENDPOINT_URL
# debería imprimir: http://localhost:4566
```

### Lab 1 — Crear un user

```bash
aws iam create-user --user-name thomas
```

Output:

```json
{
    "User": {
        "Path": "/",
        "UserName": "thomas",
        "UserId": "AIDA...",
        "Arn": "arn:aws:iam::000000000000:user/thomas",
        "CreateDate": "2026-05-18T..."
    }
}
```

Listemos los users:

```bash
aws iam list-users
```

### Lab 2 — Crear un grupo y meter el user adentro

```bash
aws iam create-group --group-name Developers
aws iam add-user-to-group --user-name thomas --group-name Developers
```

Verificá los miembros:

```bash
aws iam get-group --group-name Developers
```

### Lab 3 — Crear una policy custom

Creá un archivo `policy-s3-readonly.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::mi-bucket",
        "arn:aws:s3:::mi-bucket/*"
      ]
    }
  ]
}
```

Subila a IAM:

```bash
aws iam create-policy \
  --policy-name S3ReadOnlyMiBucket \
  --policy-document file://policy-s3-readonly.json
```

Output (anotate el ARN, lo vas a necesitar):

```json
{
  "Policy": {
    "PolicyName": "S3ReadOnlyMiBucket",
    "Arn": "arn:aws:iam::000000000000:policy/S3ReadOnlyMiBucket",
    ...
  }
}
```

Atachala al grupo:

```bash
aws iam attach-group-policy \
  --group-name Developers \
  --policy-arn arn:aws:iam::000000000000:policy/S3ReadOnlyMiBucket
```

### Lab 4 — Crear un role para Lambda

Las Lambdas necesitan asumir roles para tener permisos. El "trust policy" define quién puede asumir el role.

`trust-policy-lambda.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Creá el role:

```bash
aws iam create-role \
  --role-name lambda-s3-reader \
  --assume-role-policy-document file://trust-policy-lambda.json
```

Atachale la policy de S3 que creaste antes:

```bash
aws iam attach-role-policy \
  --role-name lambda-s3-reader \
  --policy-arn arn:aws:iam::000000000000:policy/S3ReadOnlyMiBucket
```

Y la policy managed para que la Lambda pueda escribir logs en CloudWatch:

```bash
aws iam attach-role-policy \
  --role-name lambda-s3-reader \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

Verificá:

```bash
aws iam list-attached-role-policies --role-name lambda-s3-reader
```

> 👉 Este role lo vas a reutilizar en el módulo de Lambda. **Guardá su ARN**: `arn:aws:iam::000000000000:role/lambda-s3-reader`.

### Lab 5 — Crear access keys para un user

```bash
aws iam create-access-key --user-name thomas
```

Output:

```json
{
  "AccessKey": {
    "UserName": "thomas",
    "AccessKeyId": "AKIA...",
    "SecretAccessKey": "...",
    "Status": "Active",
    "CreateDate": "..."
  }
}
```

> ⚠️ En AWS real, esto es información **crítica**. El `SecretAccessKey` se muestra **una sola vez** y nunca más se puede recuperar. Si lo perdés, tenés que generar uno nuevo. En Floci da igual, pero acostumbrate a la disciplina desde ya.

### Lab 6 — Asumir un role (STS)

Probemos `AssumeRole` para obtener credenciales temporales:

```bash
aws sts assume-role \
  --role-arn arn:aws:iam::000000000000:role/lambda-s3-reader \
  --role-session-name mi-sesion-prueba
```

Output:

```json
{
  "Credentials": {
    "AccessKeyId": "ASIA...",
    "SecretAccessKey": "...",
    "SessionToken": "...",
    "Expiration": "..."
  },
  "AssumedRoleUser": {
    "AssumedRoleId": "...",
    "Arn": "arn:aws:sts::000000000000:assumed-role/lambda-s3-reader/mi-sesion-prueba"
  }
}
```

Esas son **credenciales temporales** (en AWS real durarían 1 hora). Las podrías usar exportándolas:

```bash
export AWS_ACCESS_KEY_ID="ASIA..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_SESSION_TOKEN="..."
```

Y todos los comandos posteriores van con esa identidad.

### Lab 7 — Limpieza

```bash
# Quitar policies del role
aws iam detach-role-policy --role-name lambda-s3-reader \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam detach-role-policy --role-name lambda-s3-reader \
  --policy-arn arn:aws:iam::000000000000:policy/S3ReadOnlyMiBucket

# Borrar el role
aws iam delete-role --role-name lambda-s3-reader

# Quitar policy del grupo
aws iam detach-group-policy --group-name Developers \
  --policy-arn arn:aws:iam::000000000000:policy/S3ReadOnlyMiBucket

# Sacar el user del grupo
aws iam remove-user-from-group --user-name thomas --group-name Developers

# Borrar el grupo
aws iam delete-group --group-name Developers

# Borrar las access keys del user (necesitás el id de la key)
aws iam list-access-keys --user-name thomas
aws iam delete-access-key --user-name thomas --access-key-id AKIA...

# Borrar el user
aws iam delete-user --user-name thomas

# Borrar la policy
aws iam delete-policy --policy-arn arn:aws:iam::000000000000:policy/S3ReadOnlyMiBucket
```

> 💡 En AWS real hay un orden estricto para borrar: no podés borrar un user si tiene access keys, no podés borrar una policy si está atachada a algo, etcétera. Floci es menos estricto, pero igual conviene acostumbrarse al orden.

---

## 7. Bonus Node.js — Crear un user desde código

`crear-user.js`:

```js
import {
  IAMClient,
  CreateUserCommand,
  ListUsersCommand,
} from "@aws-sdk/client-iam";

const iam = new IAMClient({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
  credentials: { accessKeyId: "test", secretAccessKey: "test" },
});

// Crear un user
const created = await iam.send(
  new CreateUserCommand({ UserName: "node-user" })
);
console.log("Creado:", created.User.Arn);

// Listar
const list = await iam.send(new ListUsersCommand({}));
console.log("Users existentes:", list.Users.map((u) => u.UserName));
```

```bash
npm install @aws-sdk/client-iam
node crear-user.js
```

---

## 8. Buenas prácticas que entran en el examen

- **No usar la root account para tareas diarias**. La root es la cuenta con el email con la que se creó AWS. Solo se usa para tareas excepcionales (cambiar plan, cerrar la cuenta). Para todo lo demás, creás un user IAM con permisos de admin.
- **MFA en todo**. La root y cualquier user con privilegios debe tener Multi-Factor Authentication activado.
- **Rotación de credenciales**. Las access keys se rotan cada cierto tiempo (90 días es lo típico).
- **No hardcodear credenciales** en el código ni subirlas a git. En su lugar:
  - En EC2: usar **instance profiles** (un role atachado a la EC2).
  - En Lambda: usar el **role de ejecución** de la función.
  - En tu máquina: usar `~/.aws/credentials` o variables de entorno.
- **Principio de menor privilegio**. Cada vez que escribís una policy, preguntate si podrías dar menos permisos.
- **Auditar accesos**. Servicios como AWS CloudTrail registran cada llamada a la API. (Floci no implementa CloudTrail.)

---

## 9. Diferencias clave con AWS real

| Aspecto                       | AWS real                          | Floci                                  |
|-------------------------------|-----------------------------------|----------------------------------------|
| Enforcement de policies       | Estricto                          | Acepta cualquier credencial            |
| MFA                           | Soportado y recomendado           | No aplica                              |
| Auditoría (CloudTrail)        | Disponible                        | No emulado                             |
| Federación con SAML/OIDC      | Soportado                         | Las APIs responden, pero sin validación real |
| Account-id                    | Único por cuenta                  | `000000000000` (configurable)          |

---

## Quiz del módulo 03

**1.** ¿Cuál de las siguientes entidades **NO** puede tener policies atachadas?

a) User
b) Group
c) Role
d) Region

**2.** Si un user tiene una policy que le permite `s3:GetObject` y otra que le niega `s3:GetObject`, ¿qué pasa?

a) Se aplica la que se creó primero.
b) Se aplica la más permisiva (puede leer).
c) Se aplica el deny (no puede leer).
d) Error de configuración.

**3.** ¿Cuál es la principal diferencia entre un user y un role?

a) Los roles tienen contraseña, los users no.
b) Los users tienen credenciales permanentes; los roles entregan credenciales temporales cuando alguien los asume.
c) No hay diferencia, son sinónimos.
d) Los roles solo existen en regiones específicas.

**4.** ¿Para qué sirve el "trust policy" de un role?

a) Define qué acciones puede ejecutar el role.
b) Define quién (qué entidad) puede asumir el role.
c) Encripta las credenciales del role.
d) Lista los recursos que el role puede usar.

**5.** ¿Cuál es la forma correcta de dar permisos a una Lambda para leer un bucket de S3?

a) Hardcodear credenciales de un IAM user en el código de la Lambda.
b) Hacer público el bucket.
c) Crear un role para la Lambda y atacharle una policy con permiso `s3:GetObject` sobre ese bucket.
d) Dar permisos `s3:*` a la cuenta entera.

**6.** ¿Qué significa "principio de menor privilegio"?

a) Asignar permisos solo a usuarios menores de edad.
b) Otorgar los permisos mínimos necesarios para cumplir una tarea.
c) Restringir el acceso a la consola web.
d) Crear roles en lugar de users.

**7.** Un ARN como `arn:aws:s3:::mi-bucket/foto.jpg` apunta a:

a) Un user IAM.
b) Un objeto dentro de un bucket de S3.
c) Una región de AWS.
d) Una policy.

---

### Respuestas

1. **d**. Region no es una entidad IAM. Users, groups y roles sí pueden tener policies.
2. **c**. Deny gana siempre.
3. **b**. Los users son identidades permanentes; los roles son asumibles y entregan credenciales temporales.
4. **b**. El trust policy define el "principal" — qué entidades pueden asumir el role.
5. **c**. Roles + policies. Nunca hardcodear credenciales en código.
6. **b**. Menor privilegio = mínimos permisos necesarios.
7. **b**. Es un ARN de S3 que apunta al objeto `foto.jpg` dentro del bucket `mi-bucket`.

---

## Resumen

- IAM controla quién puede hacer qué en AWS.
- Las cuatro entidades son: **users**, **groups**, **roles**, **policies**.
- Los **users** son identidades permanentes con credenciales fijas.
- Los **roles** son asumibles y entregan credenciales temporales — la forma correcta de dar permisos a servicios y aplicaciones.
- Las **policies** son JSON con `Effect`, `Action`, `Resource`.
- **Deny gana siempre**.
- **ARN** identifica cada recurso de AWS unívocamente.
- **Principio de menor privilegio**: dar lo mínimo necesario.

Siguiente: [`04-s3.md`](./04-s3.md).
