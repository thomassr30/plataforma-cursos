# Módulo 11 — KMS y Secrets Manager

> **Objetivo**: entender cómo se manejan claves de encriptación y secretos en AWS, y practicarlos en Floci.

Tiempo estimado: 1 a 1.5 horas.

---

## 1. ¿Qué es KMS?

**AWS Key Management Service** es el servicio centralizado para administrar **claves de encriptación**. Casi todos los servicios de AWS (S3, EBS, RDS, DynamoDB, Secrets Manager, etc.) pueden usar KMS para encriptar datos en reposo.

### ¿Por qué KMS y no encriptar a mano?

- **Claves nunca salen de KMS**: encriptás/desencriptás vía la API, la clave maestra nunca aparece en tu código.
- **Rotación automática**: las claves se pueden rotar sin tener que re-encriptar todo.
- **Auditoría**: cada uso de la clave queda en CloudTrail.
- **Integración**: la mayoría de los servicios AWS la usan transparentemente.

---

## 2. Conceptos clave de KMS

### 2.1 — KMS keys (antes CMK — Customer Master Keys)

Las claves maestras administradas en KMS. Hay tres tipos:

| Tipo                  | Quién la administra      | Cuándo usarla                      |
|-----------------------|--------------------------|------------------------------------|
| **AWS owned keys**    | AWS, invisible para vos  | Default cuando un servicio dice "encriptar". |
| **AWS managed keys**  | AWS, visible en tu cuenta | Default ligeramente más visible.   |
| **Customer managed**  | Vos                      | Cuando necesitás control total: políticas custom, rotación a demanda, audit. |

### 2.2 — Symmetric vs Asymmetric

- **Symmetric**: la misma clave encripta y desencripta (AES-256). El default y más común. **Nunca salen de KMS**.
- **Asymmetric**: par clave pública + privada (RSA, ECC). Útil para firmas digitales o cuando un cliente que no tiene credenciales AWS necesita encriptar para vos.

### 2.3 — Data keys (envelope encryption)

KMS está diseñada para encriptar **datos chicos** (hasta 4 KB). Para datos grandes (un archivo de 1 GB) se usa **envelope encryption**:

1. KMS genera una **data key** (clave simétrica).
2. Esa data key encripta tu archivo.
3. KMS te devuelve la data key encriptada con la KMS key maestra.
4. Vos guardás: archivo encriptado + data key encriptada.
5. Para desencriptar: pedís a KMS que desencripte la data key (4 KB), después usás la data key plana para desencriptar el archivo localmente.

Ventaja: rapidez (el grueso del trabajo es local con AES-256) + seguridad (la clave maestra nunca sale).

### 2.4 — Aliases

Nombres legibles para tus claves (`alias/mi-clave-rds`). Útiles porque los IDs reales son UUIDs feos.

### 2.5 — Key policies

Cada KMS key tiene una **resource policy** que define quién la puede usar. Distinta a las IAM policies normales — la KMS key tiene la suya.

### 2.6 — Rotación

Las customer managed keys pueden rotarse automáticamente cada año. La rotación no rompe nada: la KMS key viejas sigue desencriptando cosas viejas, la nueva encripta lo nuevo.

---

## 3. ¿Qué es Secrets Manager?

**AWS Secrets Manager** es el lugar correcto para guardar **secretos** (passwords, API keys, tokens, conexión strings). Características:

- Encripta los secretos con KMS automáticamente.
- **Rotación automática** (con una Lambda que rota la password).
- Auditoría con CloudTrail.
- Integración nativa con RDS, Aurora, Redshift, etc.

### Cuándo usás Secrets Manager vs Parameter Store

| Caso                                | Solución                          |
|-------------------------------------|-----------------------------------|
| Password de RDS                     | Secrets Manager (con rotación)    |
| API key de un servicio externo      | Secrets Manager                   |
| Endpoint de tu servicio interno     | Parameter Store (no es secreto)   |
| Configuración no sensible           | Parameter Store                   |

**Diferencias clave**:

- **Parameter Store** (SSM): más barato (gratis hasta cierto límite), simple, sin rotación nativa.
- **Secrets Manager**: paga, con rotación, integración con RDS.

---

## 4. Cómo lo emula Floci

### KMS

Floci implementa **15 operaciones de KMS**:

- ✅ Crear, listar, describir keys.
- ✅ Encrypt / Decrypt / ReEncrypt.
- ✅ Sign / Verify (asimétricas).
- ✅ Generate data keys.
- ✅ Aliases.

Limitación: **el cifrado real es nominal**. Floci acepta los algoritmos pero la encriptación que devuelve no es criptográficamente segura — es para practicar las APIs, no para proteger datos reales.

### Secrets Manager

Floci implementa **10 operaciones**:

- ✅ Create, get, update, delete secrets.
- ✅ Versioning de secretos.
- ✅ Resource policies.
- ✅ Tagging.

Limitación: la **rotación automática** no se ejecuta (necesitaría una Lambda en cron, no implementado).

### SSM Parameter Store

Floci implementa **12 operaciones**:

- ✅ Put, get, list, delete parámetros.
- ✅ Versionado.
- ✅ Labels.
- ✅ SecureString (con KMS).
- ✅ Tagging.

---

## 5. Laboratorio práctico — KMS

### Lab 1 — Crear una clave

```bash
KEY_INFO=$(aws kms create-key \
  --description "Clave para el curso de Floci" \
  --key-usage ENCRYPT_DECRYPT)

echo "$KEY_INFO"

KEY_ID=$(echo "$KEY_INFO" | python3 -c "import sys, json; print(json.load(sys.stdin)['KeyMetadata']['KeyId'])")
echo "KEY_ID: $KEY_ID"
```

Si no tenés Python a mano, usá `jq` o copiá el `KeyId` del output a mano.

### Lab 2 — Crear un alias

```bash
aws kms create-alias \
  --alias-name alias/mi-clave \
  --target-key-id "$KEY_ID"
```

### Lab 3 — Encriptar y desencriptar texto

```bash
# Encriptar (el output viene en base64)
CIFRADO=$(aws kms encrypt \
  --key-id alias/mi-clave \
  --plaintext "Hola mundo secreto" \
  --query CiphertextBlob \
  --output text)
echo "Cifrado: $CIFRADO"

# Desencriptar
echo "$CIFRADO" | base64 -d > cifrado.bin

aws kms decrypt \
  --ciphertext-blob fileb://cifrado.bin \
  --query Plaintext \
  --output text | base64 -d
```

Te tiene que devolver "Hola mundo secreto".

> ⚠️ Acordate: en Floci esto es **nominal**, no encriptación real. En AWS real esto te garantiza confidencialidad.

### Lab 4 — Generar una data key

```bash
aws kms generate-data-key \
  --key-id alias/mi-clave \
  --key-spec AES_256
```

Output incluye:

- `Plaintext`: la data key en claro (base64). Usalo localmente.
- `CiphertextBlob`: la misma data key encriptada con la KMS key. Guardalo.

Después, para recuperarla, mandás a `decrypt` el `CiphertextBlob` y KMS te devuelve la versión plana.

### Lab 5 — Listar y borrar claves

```bash
aws kms list-keys
aws kms list-aliases

# Borrar la clave (requiere un waiting period en AWS real de 7-30 días; en Floci es inmediato)
aws kms schedule-key-deletion --key-id "$KEY_ID" --pending-window-in-days 7
```

---

## 6. Laboratorio práctico — Secrets Manager

### Lab 6 — Crear un secreto

```bash
aws secretsmanager create-secret \
  --name miapp/db/password \
  --description "Password de la DB de mi app" \
  --secret-string '{"username":"admin","password":"super-secret-123"}'
```

### Lab 7 — Leer el secreto

```bash
aws secretsmanager get-secret-value \
  --secret-id miapp/db/password
```

Output:

```json
{
  "ARN": "arn:aws:secretsmanager:us-east-1:000000000000:secret:miapp/db/password-XXXXXX",
  "Name": "miapp/db/password",
  "VersionId": "...",
  "SecretString": "{\"username\":\"admin\",\"password\":\"super-secret-123\"}",
  "CreatedDate": "..."
}
```

El `SecretString` es la cadena que pusiste — parseala como JSON.

### Lab 8 — Actualizar el secreto

```bash
aws secretsmanager put-secret-value \
  --secret-id miapp/db/password \
  --secret-string '{"username":"admin","password":"nueva-password-456"}'
```

Listar versiones:

```bash
aws secretsmanager list-secret-version-ids --secret-id miapp/db/password
```

### Lab 9 — Borrar (con recovery window)

```bash
aws secretsmanager delete-secret \
  --secret-id miapp/db/password \
  --recovery-window-in-days 7
```

> 💡 En AWS real, los secretos no se borran al instante: quedan 7-30 días en "deletion scheduled" para que puedas recuperarlos. Por eso `--recovery-window-in-days`. Si querés borrarlo ya, agregá `--force-delete-without-recovery` (peligroso).

---

## 7. Laboratorio práctico — Parameter Store

### Lab 10 — Parámetros simples

```bash
# Crear
aws ssm put-parameter \
  --name "/miapp/api/url" \
  --value "https://api.example.com" \
  --type String

# Leer
aws ssm get-parameter --name "/miapp/api/url"

# Update
aws ssm put-parameter \
  --name "/miapp/api/url" \
  --value "https://api-v2.example.com" \
  --type String \
  --overwrite
```

### Lab 11 — Parámetros encriptados (SecureString)

```bash
aws ssm put-parameter \
  --name "/miapp/api/token" \
  --value "token-secreto-abc123" \
  --type SecureString \
  --key-id alias/mi-clave
```

Para leerlo desencriptado:

```bash
aws ssm get-parameter \
  --name "/miapp/api/token" \
  --with-decryption
```

### Lab 12 — Listar por path

```bash
aws ssm get-parameters-by-path --path "/miapp/" --recursive
```

---

## 8. Bonus Node.js — App que usa Secrets Manager

`app-secrets.js`:

```js
import {
  SecretsManagerClient,
  GetSecretValueCommand,
  CreateSecretCommand,
} from "@aws-sdk/client-secrets-manager";

const sm = new SecretsManagerClient({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
  credentials: { accessKeyId: "test", secretAccessKey: "test" },
});

const SECRET_NAME = "node/api/keys";

// Crear (ignorar si ya existe)
try {
  await sm.send(
    new CreateSecretCommand({
      Name: SECRET_NAME,
      SecretString: JSON.stringify({
        stripeKey: "sk_test_abc",
        sendgridKey: "SG.xyz",
      }),
    })
  );
  console.log("Secreto creado");
} catch (err) {
  if (err.name !== "ResourceExistsException") throw err;
  console.log("Secreto ya existía");
}

// Leer
const result = await sm.send(
  new GetSecretValueCommand({ SecretId: SECRET_NAME })
);
const secrets = JSON.parse(result.SecretString);
console.log("Stripe key:", secrets.stripeKey);
console.log("Sendgrid key:", secrets.sendgridKey);
```

```bash
npm install @aws-sdk/client-secrets-manager
node app-secrets.js
```

---

## 9. Patrones de uso

### App que se conecta a RDS

1. Al deploy, creás un secreto con `{username, password, host, port, dbname}`.
2. La Lambda **en el cold start** lee el secreto y se conecta.
3. Cacheás la conexión entre invocaciones.
4. Cuando la password rota, la Lambda detecta error de auth, vuelve a leer el secreto, vuelve a conectarse.

### Multi-tenant config

Parámetros tipo `/tenant/{id}/feature_flags` en Parameter Store. La app lee según el tenant.

### Tokens de API de terceros

Token de Stripe, SendGrid, Twilio → cada uno en Secrets Manager con rotación cada 90 días.

---

## 10. Diferencias clave con AWS real

| Aspecto                  | AWS real                          | Floci                          |
|--------------------------|-----------------------------------|--------------------------------|
| Encriptación real        | Sí, FIPS 140-2 validated          | Nominal                        |
| Rotación automática      | Funciona con Lambda rotator       | No se ejecuta                  |
| HSM (CloudHSM)           | Disponible                        | No                             |
| Cross-account key sharing| Disponible                        | No aplica                      |
| Customer-managed CMKs    | Reales                            | Aceptadas                      |

---

## Quiz del módulo 11

**1.** ¿Qué es envelope encryption?

a) Una técnica de marketing.
b) Encriptar la clave de datos con una clave maestra; útil cuando los datos son más grandes que el límite de KMS.
c) Usar dos KMS keys al mismo tiempo.
d) Encriptar dos veces seguidas.

**2.** ¿Cuál es la diferencia entre Secrets Manager y Parameter Store?

a) Parameter Store es más caro.
b) Secrets Manager tiene rotación automática integrada; Parameter Store no.
c) Solo Secrets Manager funciona en multi-AZ.
d) No hay diferencia.

**3.** ¿Cuál es la forma recomendada de guardar la password de la DB que usa una Lambda?

a) En el código.
b) En una env var del Lambda.
c) En Secrets Manager y leerla en runtime.
d) En un archivo `secrets.txt` en S3 público.

**4.** Si una KMS key tiene activada la rotación automática, ¿qué pasa cuando rota?

a) Los datos viejos quedan ilegibles.
b) AWS re-encripta todo automáticamente.
c) La key vieja sigue desencriptando lo viejo; la nueva encripta lo nuevo.
d) La rotación rompe la app.

**5.** ¿Cuándo usás Parameter Store en lugar de Secrets Manager?

a) Para passwords.
b) Para configuración no sensible (URLs, feature flags), donde no necesitás rotación.
c) Para datos médicos.
d) Para claves de API externas.

**6.** Una `KMS key` simétrica:

a) Tiene una pública y una privada.
b) Usa una sola clave para encrypt + decrypt; nunca sale de KMS.
c) Sirve solo para firmar.
d) Es asimétrica.

---

### Respuestas

1. **b**. Envelope encryption = encriptar tus datos con una data key local, y guardar esa data key encriptada con KMS. Soluciona el límite de 4 KB.
2. **b**. Secrets Manager tiene rotación nativa con Lambdas que cambian la password. Parameter Store es más barato pero sin rotación.
3. **c**. Secrets Manager es la respuesta canónica para passwords.
4. **c**. La rotación no rompe nada — la key viejo está disponible para desencriptar, la nueva encripta.
5. **b**. Parameter Store para config no sensible. Secrets Manager para secretos.
6. **b**. Symmetric KMS keys nunca salen de AWS KMS.

---

## Resumen

- **KMS**: claves de encriptación administradas. Casi todos los servicios AWS la usan.
- **Envelope encryption**: data key encriptada con KMS key, para datos grandes.
- **Secrets Manager**: secretos con rotación automática y auditoría.
- **Parameter Store**: config simple, más barato, sin rotación nativa.
- En Floci, todo funciona a nivel API pero la encriptación es nominal.

Siguiente: [`12-cloudwatch.md`](./12-cloudwatch.md).
