# Módulo 02 — Setup del entorno

> **Objetivo**: dejar Floci corriendo en tu máquina, AWS CLI instalado y configurado, y haber hecho tu primer comando exitoso contra Floci.

Tiempo estimado: 30 a 45 minutos si no tenés Docker instalado todavía, 10 minutos si ya lo tenés.

---

## Prerequisitos

- **Docker Desktop** instalado y corriendo (Windows/Mac) o **Docker Engine + Compose** (Linux).
- **Una terminal** que entiendas (Git Bash, PowerShell, Terminal de Mac, bash de Linux).
- **4 GB de RAM libres** mínimo (Floci usa muy poco, pero los servicios que levantan contenedores reales —Lambda, RDS, ECS— sí consumen).
- **Permisos para escribir** en la carpeta donde vas a trabajar.

---

## 1. Verificar Docker

Abrí una terminal y corré:

```bash
docker --version
docker compose version
```

Deberías ver algo como:

```
Docker version 27.x.x
Docker Compose version v2.30.x
```

Si te dice "comando no encontrado":

- **Windows / Mac**: instalá Docker Desktop desde https://www.docker.com/products/docker-desktop
- **Linux**: seguí la guía oficial para tu distro: https://docs.docker.com/engine/install/

Verificá que Docker está **corriendo**:

```bash
docker ps
```

Si te tira un error tipo "Cannot connect to the Docker daemon", abrí Docker Desktop (o arrancá el servicio en Linux: `sudo systemctl start docker`).

---

## 2. Instalar AWS CLI

El AWS CLI es la herramienta oficial de Amazon para hablar con AWS desde la terminal. Floci entiende los mismos comandos.

### Windows

Descargá el instalador desde:

```
https://awscli.amazonaws.com/AWSCLIV2.msi
```

Y ejecutalo. Reabrí la terminal.

### Mac

```bash
brew install awscli
```

O bajá el `.pkg` desde https://awscli.amazonaws.com/AWSCLIV2.pkg

### Linux

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### Verificar

```bash
aws --version
```

Tenés que ver algo como:

```
aws-cli/2.17.0 Python/3.x ...
```

> 👉 Si te dice `aws-cli/1.x.x`, **actualizalo a v2**. La v1 está vieja y va a tener problemas con algunos comandos modernos.

---

## 3. Configurar credenciales falsas

AWS CLI necesita credenciales para funcionar, aunque sean falsas. Corré:

```bash
aws configure
```

Y respondé:

```
AWS Access Key ID [None]: test
AWS Secret Access Key [None]: test
Default region name [None]: us-east-1
Default output format [None]: json
```

Esto crea dos archivos en tu home:

- `~/.aws/credentials` — con las credenciales.
- `~/.aws/config` — con la región y formato.

En Windows están en `C:\Users\<vos>\.aws\`.

> 💡 Si más adelante tenés que usar AWS real, vas a usar perfiles separados con `aws configure --profile produccion`. No vamos a usar eso en el curso.

---

## 4. Levantar Floci

### Opción A: usando el `docker-compose.yml` del curso

Si ya tenés la carpeta del curso (`floci-curso/`), abrila en la terminal y corré:

```bash
cd C:/Thomas/Cursos/Cursos-Platform/floci-curso
docker compose up -d
```

El `-d` significa "detached" (en background). Si querés ver los logs en vivo, omitilo o corré después:

```bash
docker compose logs -f
```

Para parar:

```bash
docker compose down
```

### Opción B: con `docker run` directo (sin compose)

```bash
docker run -d \
  --name floci \
  -p 4566:4566 \
  -v "$(pwd)/data:/app/data" \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e FLOCI_STORAGE_MODE=persistent \
  hectorvent/floci:latest
```

### Verificar que arrancó

```bash
curl http://localhost:4566/_health
```

Deberías recibir un JSON tipo:

```json
{"status":"ok"}
```

Si te tira "Connection refused", esperá 5 segundos y reintentá (en el primer arranque Floci tarda unos segundos en levantar todo, aunque después es casi instantáneo).

---

## 5. La trampa del `--endpoint-url`

AWS CLI por defecto manda los comandos a los endpoints reales de AWS. Para que vayan a Floci, hay **dos formas** de decírselo:

### Forma 1: agregar `--endpoint-url` en cada comando

```bash
aws s3 ls --endpoint-url http://localhost:4566
```

Funciona, pero es tedioso escribirlo cada vez.

### Forma 2 (recomendada): variable de entorno `AWS_ENDPOINT_URL`

Desde la versión 2.13 del CLI, podés exportar:

```bash
export AWS_ENDPOINT_URL=http://localhost:4566
```

(En Windows PowerShell: `$env:AWS_ENDPOINT_URL = "http://localhost:4566"`)
(En Windows CMD: `set AWS_ENDPOINT_URL=http://localhost:4566`)

Y a partir de ahí, **todos los comandos `aws` apuntan a Floci automáticamente**, sin agregar nada.

> ⚠️ Si abrís una terminal nueva, perdés la variable. Te conviene guardarla en tu `~/.bashrc`, `~/.zshrc`, o en el perfil de PowerShell.

> 💡 Otra opción es crear un alias permanente: `alias floci='aws --endpoint-url http://localhost:4566'`. Después usás `floci s3 ls` y listo.

En el resto del curso voy a **asumir que tenés la variable `AWS_ENDPOINT_URL` exportada**. Si no la tenés, agregá `--endpoint-url http://localhost:4566` a cada comando.

---

## 6. Tu primer comando

Probemos algo simple: listar buckets de S3 (debería estar vacío).

```bash
aws s3 ls
```

Si todo está bien, no devuelve nada. **Eso es buena señal** — significa que Floci respondió correctamente con "no hay buckets".

Si te dice algo como "Could not connect to the endpoint URL", verificá:

1. `AWS_ENDPOINT_URL` está exportada (`echo $AWS_ENDPOINT_URL`).
2. Floci está corriendo (`docker ps | grep floci`).

Probemos crear un bucket:

```bash
aws s3 mb s3://mi-primer-bucket
```

Output esperado:

```
make_bucket: mi-primer-bucket
```

Y listemos de nuevo:

```bash
aws s3 ls
```

Tenés que ver:

```
2026-05-18 21:30:00 mi-primer-bucket
```

🎉 Tu primer recurso "en AWS". Falso, pero real al mismo tiempo.

Borralo para dejar limpio:

```bash
aws s3 rb s3://mi-primer-bucket
```

---

## 7. Setup del SDK de Node.js (opcional para este módulo)

Si querés tener todo listo para los ejemplos de Node.js que aparecen más adelante, creá una carpeta de scratch:

```bash
mkdir -p ~/floci-labs
cd ~/floci-labs
npm init -y
npm install @aws-sdk/client-s3 @aws-sdk/client-dynamodb @aws-sdk/client-sqs @aws-sdk/client-sns @aws-sdk/client-lambda
```

> 💡 Los paquetes `@aws-sdk/client-*` son los SDK v3 de AWS para Node.js. Cada servicio tiene su propio paquete (a diferencia del SDK v2, que era un solo monolito).

Un script de prueba (`hello.js`):

```js
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
  credentials: { accessKeyId: "test", secretAccessKey: "test" },
  forcePathStyle: true, // 👈 importante para S3 en Floci
});

const result = await s3.send(new ListBucketsCommand({}));
console.log(result.Buckets);
```

Para correrlo, agregá `"type": "module"` en tu `package.json` y después:

```bash
node hello.js
```

Si todo funciona, vas a ver `[]` (lista vacía) o los buckets que tengas.

---

## 8. Comandos de Floci que te van a salvar

Acordate de estos, te van a servir todo el curso:

```bash
# Ver si Floci está corriendo
docker ps | grep floci

# Ver logs en vivo
docker compose logs -f floci

# Reiniciar Floci (sin perder datos si tenés persistencia)
docker compose restart floci

# Apagar Floci pero conservar datos
docker compose down

# Apagar Floci y borrar TODO (volúmenes incluidos)
docker compose down -v

# Borrar la carpeta de datos manualmente (cuando querés empezar de cero)
rm -rf ./data
```

---

## 9. Troubleshooting típico

### "Cannot connect to the endpoint URL"

- Floci no está corriendo. `docker ps` lo confirma.
- `AWS_ENDPOINT_URL` no está exportada en esta terminal.
- Estás usando `https://` en lugar de `http://` (Floci no expone TLS por defecto).

### "InvalidAccessKeyId"

- Esto pasa cuando un comando hace una validación estricta. Suele ser raro en Floci. Si pasa, verificá que `~/.aws/credentials` exista y tenga valores (cualquier string sirve).

### "Connection refused" justo después de levantar Floci

- Esperá 3 a 5 segundos. El primer arranque tarda un poco. Para validar:

```bash
curl http://localhost:4566/_health
```

### Lambda no levanta contenedores

- El volumen `/var/run/docker.sock` no está montado.
- Estás en Windows con Docker Desktop y el path es distinto. Revisá la doc oficial de Floci.

### La carpeta `./data` se llena de cosas raras

- Es normal. Floci persiste el estado ahí. Si querés limpiar, parálo y borrá la carpeta:

```bash
docker compose down
rm -rf ./data
```

---

## Quiz del módulo 02

**1.** ¿Cuál es el puerto por defecto en el que escucha Floci?

a) 80
b) 443
c) 4566
d) 8080

**2.** ¿Qué variable de entorno usás para que el AWS CLI apunte a Floci sin tener que escribir `--endpoint-url` en cada comando?

a) `AWS_REGION`
b) `AWS_ENDPOINT_URL`
c) `AWS_FLOCI_URL`
d) `AWS_LOCAL`

**3.** Si Floci está corriendo pero `aws s3 ls` da "Could not connect", ¿cuál es la causa más probable?

a) Tus credenciales son inválidas.
b) Te falta exportar `AWS_ENDPOINT_URL` o pasar `--endpoint-url`.
c) AWS está caído.
d) Floci no soporta S3.

**4.** ¿Por qué el `docker-compose.yml` del curso monta `/var/run/docker.sock`?

a) Para guardar logs.
b) Para que Floci pueda levantar contenedores Docker reales (Lambda, RDS, ECS).
c) Para que Floci pueda comunicarse con AWS real.
d) Para acelerar el arranque.

**5.** ¿Qué pasa con tus datos si hacés `docker compose down` (sin `-v`)?

a) Se borran todos.
b) Se conservan en la carpeta `./data` y aparecen al volver a levantar Floci.
c) Se sincronizan con AWS real.
d) Se exportan a un backup automático.

---

### Respuestas

1. **c**. 4566.
2. **b**. `AWS_ENDPOINT_URL`, soportada por el AWS CLI v2.13+.
3. **b**. El CLI por defecto apunta a AWS real; si no le decís dónde está Floci, te tira "Could not connect" porque sí está intentando llegar a Amazon.
4. **b**. Lambda, RDS, ElastiCache y ECS levantan contenedores Docker reales para emularse, y para eso Floci necesita acceso al daemon de Docker del host.
5. **b**. `docker compose down` para los contenedores pero no toca los volúmenes. La carpeta `./data` queda con todo. Para borrar todo, usás `docker compose down -v` o eliminás la carpeta a mano.

---

## Resumen

- Necesitás Docker y AWS CLI v2 instalados.
- Configurás credenciales falsas con `aws configure` (cualquier string sirve).
- Levantás Floci con `docker compose up -d`.
- Exportás `AWS_ENDPOINT_URL=http://localhost:4566` para que el CLI hable con Floci.
- Tu primer comando: `aws s3 mb s3://mi-primer-bucket`.

Siguiente: [`03-iam.md`](./03-iam.md).
