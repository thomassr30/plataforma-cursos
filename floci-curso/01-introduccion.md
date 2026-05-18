# Módulo 01 — Introducción a AWS y a Floci

> **Objetivo del módulo**: que termines entendiendo qué es AWS, qué es la nube en general, qué problema resuelve Floci, y por qué te conviene practicar en local antes de tocar AWS de verdad.

Este módulo es 100% teórico. No vas a ejecutar comandos. En el módulo 02 instalás todo y empezás a tocar Floci. Si ya tenés clarísimo qué es AWS, podés saltar a la sección **"¿Qué es Floci?"**.

---

## 1. ¿Qué es la nube?

"La nube" (cloud) es una manera elegante de decir **"la computadora de otro"**. Cuando alquilás un servidor en AWS, Google Cloud o Azure, lo que hacés es pagar por usar recursos físicos (CPU, RAM, disco, red) que están en un datacenter de esa empresa, en algún lugar del mundo.

Antes de la nube, si una empresa quería tener su sitio web online, tenía que:

1. Comprar servidores físicos (caros).
2. Tener un lugar con aire acondicionado, energía estable y conexión a internet.
3. Contratar gente que mantenga el hardware.
4. Estimar cuánta capacidad iba a necesitar **antes** de saberlo, y comprar demás "por las dudas".

La nube cambió eso. Hoy podés:

- Levantar un servidor en 30 segundos.
- Pagarlo por hora, por minuto o por uso.
- Apagarlo cuando no lo necesitás.
- Escalar a 1000 servidores idénticos en minutos si te explota el tráfico.

### Modelos de servicio (esto entra en el examen)

| Modelo | Qué te da el proveedor                          | Ejemplos                          |
|--------|--------------------------------------------------|-----------------------------------|
| IaaS   | Infraestructura (servidores, red, almacenamiento)| AWS EC2, S3                       |
| PaaS   | Plataforma para correr tu código sin gestionar el SO | AWS Elastic Beanstalk, App Runner |
| SaaS   | Software listo para usar                         | Gmail, Slack, Notion              |

### Modelos de despliegue

- **Public cloud**: AWS, GCP, Azure. La infra es del proveedor y vos la alquilás.
- **Private cloud**: la infra es tuya, en tu propio datacenter.
- **Hybrid cloud**: una mezcla.

---

## 2. ¿Qué es AWS?

**Amazon Web Services** es la plataforma de cloud computing de Amazon. Es la más grande del mundo (más o menos un tercio del mercado). Tiene más de **200 servicios** que cubren prácticamente cualquier cosa que puedas hacer con una computadora: cómputo, almacenamiento, bases de datos, redes, machine learning, IoT, blockchain, etcétera.

### Conceptos centrales de AWS

#### Regiones

AWS divide el mundo en **regiones** geográficas (`us-east-1` en Virginia, `eu-west-1` en Irlanda, `sa-east-1` en San Pablo, etcétera). Cuando creás un recurso, tenés que elegir en qué región vive.

- Cada región es **independiente**: si se cae us-east-1, eu-west-1 sigue funcionando.
- Los datos no salen de la región a menos que vos lo configures.
- Hay servicios "globales" (IAM, CloudFront, Route 53) que no viven en una región específica.

#### Availability Zones (AZ)

Cada región está compuesta por varias **Availability Zones**: datacenters físicamente separados pero con red rápida entre sí. Sirve para alta disponibilidad: si se cae una AZ, las otras siguen.

> 👉 En Floci no hay regiones ni AZs reales — todo corre en tu máquina. Pero los comandos te piden la región igual, por compatibilidad.

#### El modelo de responsabilidad compartida

Esto entra muchísimo en el examen. AWS define qué cuida AWS y qué cuidás vos:

| AWS se encarga de…             | Vos te encargás de…                              |
|--------------------------------|--------------------------------------------------|
| Seguridad **DE la** nube       | Seguridad **EN la** nube                         |
| Hardware físico                | Configurar IAM correctamente                     |
| Red física                     | Encriptar tus datos                              |
| Hipervisor                     | Aplicar parches a tu SO (cuando aplica)          |
| Datacenters                    | Controlar quién accede a qué                     |
| Servicios "managed"            | Cómo usás esos servicios                         |

Frase mnemónica: **AWS cuida la nube. Vos cuidás lo que está en la nube.**

#### Pricing y free tier

AWS te cobra por:

- Lo que **usás** (tiempo de CPU, GB de almacenamiento, tráfico de red).
- Lo que **tenés encendido aunque no uses** (un EC2 prendido cobra aunque nadie lo use).
- Lo que **transferís** (sacar datos de AWS suele tener costo).

AWS tiene **Free Tier**: una capa gratuita para que pruebes algunos servicios sin pagar, **pero**:

- Tiene límites (ej.: 750 horas/mes de un EC2 t2.micro).
- Algunas cosas son gratis "siempre", otras solo los primeros 12 meses.
- Si te pasás del límite, **te cobran sin avisar**.

Es muy común que alguien estudie AWS, se olvide un recurso prendido, y a fin de mes tenga una factura inesperada.

### ¿Cómo se interactúa con AWS?

Hay cuatro formas principales:

1. **Consola web** — la GUI, en https://console.aws.amazon.com.
2. **AWS CLI** — comandos en la terminal (`aws s3 ls`, `aws ec2 describe-instances`).
3. **SDKs** — librerías para tu lenguaje favorito (Node, Python, Java, Go, etcétera).
4. **Infrastructure as Code** — descripciones en texto (CloudFormation, Terraform, CDK) que crean los recursos por vos.

En este curso vas a usar sobre todo **AWS CLI** y, cuando ayude, el **SDK de Node.js**.

---

## 3. El problema: AWS cuesta plata y tiene fricciones

Cuando estás estudiando o experimentando, AWS tiene tres problemas que duelen:

### Problema 1 — Cuesta plata

Aunque exista el Free Tier, dejarse prendido un servicio puede costar **mucho** dinero. Hay historias clásicas de gente que se olvidó un cluster de NAT Gateways encendido y a fin de mes recibió una factura de USD 500. Para alguien que está aprendiendo, eso es un golpe duro.

### Problema 2 — Necesitás internet

Si te vas a una cabaña sin wifi, no podés tocar AWS. Si tu conexión es lenta, cada `aws s3 cp` se hace eterno.

### Problema 3 — Loop de feedback lento

Crear un recurso en AWS, probarlo, borrarlo, recrearlo… puede tomar minutos cada vez. En local, esos minutos son segundos.

---

## 4. La solución: emuladores locales de AWS

Existen varias herramientas que **emulan** la API de AWS en tu propia máquina. Levantás un contenedor Docker, apuntás tu AWS CLI a `http://localhost:4566` en vez de a `https://amazonaws.com`, y todo "como si fuera" AWS.

Las principales son:

### LocalStack

El emulador histórico. Bastante completo. Tiene una versión Community gratis y una Pro pagada. **Problema importante**: desde marzo de 2026, la versión Community **requiere un auth token** y **no recibe más actualizaciones de seguridad**. Esto rompe muchos flujos.

### Floci

El protagonista de este curso. Open-source, **MIT**, **sin auth token**, sin features pagas, sin sorpresas.

- Arranca en **~24 milisegundos** (LocalStack tarda ~3 segundos).
- Usa **~13 MiB de RAM** en idle (LocalStack ~143 MiB).
- La imagen Docker pesa **~90 MB** (LocalStack ~1 GB).
- Soporta **26 servicios** de AWS, varios de ellos con más cobertura que LocalStack Community.

Floci está escrito en **Java** (Quarkus + GraalVM para el binario nativo).

### MinIO

Solo emula **S3**. Si únicamente necesitás eso, MinIO es más liviano todavía. Pero no te sirve para SQS, Lambda, DynamoDB, etcétera.

### Moto

Una librería de **Python** para mockear AWS adentro de tests unitarios. No es un servicio que corra aparte, es código que reemplaza a boto3 en tiempo de test.

---

## 5. ¿Qué es Floci exactamente?

Floci es un **servidor HTTP** que escucha en el puerto `4566` y entiende los protocolos de la API de AWS. Cuando vos hacés:

```bash
aws s3 mb s3://mi-bucket --endpoint-url http://localhost:4566
```

el AWS CLI manda una petición HTTP a `localhost:4566` con el mismo formato que mandaría a `s3.amazonaws.com`. Floci la recibe, la procesa, y responde **como respondería AWS**. El CLI no se entera de la diferencia.

### Servicios que soporta Floci

26 servicios al momento de escribir esto:

- **Almacenamiento**: S3 (con versioning, Object Lock, pre-signed URLs).
- **Bases de datos**: DynamoDB, RDS (PostgreSQL/MySQL reales en contenedores), ElastiCache (Redis/Valkey).
- **Mensajería**: SQS, SNS, EventBridge, Kinesis.
- **Compute**: Lambda (contenedores Docker reales), ECS.
- **APIs**: API Gateway REST y HTTP v2.
- **Identidad**: IAM, STS, Cognito.
- **Seguridad**: KMS, Secrets Manager, ACM.
- **Observabilidad**: CloudWatch Logs, CloudWatch Metrics.
- **Orquestación**: Step Functions, CloudFormation.
- **Otros**: SSM Parameter Store, SES, OpenSearch.

### Arquitectura interna

Floci internamente clasifica sus servicios en tres tipos:

1. **Stateless**: SSM, SQS, SNS, IAM, STS, KMS, etcétera. Viven en memoria del proceso Floci, o se persisten en disco si configurás `FLOCI_STORAGE_MODE=persistent`.
2. **Stateful**: S3, DynamoDB. Igual que los anteriores en cuanto a almacenamiento, pero con manejo más cuidado de versiones.
3. **Container services**: Lambda, ElastiCache, RDS, ECS. **Levantan contenedores Docker reales** cuando los usás. Por eso el `docker-compose.yml` del curso monta `/var/run/docker.sock`.

### Diferencias con AWS real que tenés que tener en mente

- **Credenciales**: cualquier string funciona. `test`/`test` está bien. **Esto es solo en local; en AWS real las credenciales son secretos críticos.**
- **Regiones**: las pedís igual, pero no cambian nada.
- **Costos**: cero.
- **Performance**: limitada por tu máquina.
- **Networking**: no hay VPCs ni security groups ni todo lo que tiene que ver con redes virtuales — todo es `localhost`.
- **Algunos servicios tienen cobertura parcial** de operaciones. Si un comando muy específico no funciona, puede ser que Floci no lo implemente aún.

---

## 6. ¿Por qué Floci es bueno para complementar Cloud Practitioner?

El examen CLF-C02 te toma conceptos. No te pide que escribas comandos. Pero **los conceptos se entienden 10× mejor cuando los tocás**.

Ejemplo: te van a preguntar "¿qué servicio usás para almacenar archivos estáticos?". Si nunca tocaste S3, vas a memorizar la respuesta. Si creaste un bucket en Floci, le subiste un archivo, le pusiste versioning, le generaste un pre-signed URL y le aplicaste un Object Lock, vas a **saber** la respuesta porque la viviste.

Floci te permite vivir el examen sin gastar un peso.

---

## 7. Qué viene después

En el **módulo 02** vas a:

1. Verificar que tenés Docker instalado.
2. Instalar AWS CLI.
3. Levantar Floci con `docker compose up`.
4. Configurar tus credenciales falsas.
5. Hacer tu primer comando contra Floci.

Después, módulo por módulo, vas a tocar cada servicio.

---

## Quiz del módulo 01

> Respondé mentalmente primero. Las respuestas están al final.

**1.** ¿Cuál es la principal diferencia entre IaaS y PaaS?

a) IaaS es más barato.
b) IaaS te da infraestructura y vos administrás el SO; PaaS te da una plataforma y no te preocupás por el SO.
c) PaaS solo sirve para aplicaciones web.
d) No hay diferencia.

**2.** Según el modelo de responsabilidad compartida, ¿quién es responsable de aplicar parches al sistema operativo de una instancia EC2?

a) AWS.
b) El cliente.
c) Es compartido al 50%.
d) Depende de la región.

**3.** ¿Por qué Floci no requiere credenciales reales de AWS?

a) Porque es un emulador local; las credenciales reales no se validan contra ningún servicio de AWS.
b) Porque genera credenciales automáticamente.
c) Porque AWS las regala.
d) Porque usa una API pública sin autenticación.

**4.** ¿Cuál de los siguientes servicios **NO** está cubierto por Floci?

a) S3.
b) Lambda.
c) EC2.
d) DynamoDB.

**5.** ¿Cuál es el puerto por defecto en el que escucha Floci?

a) 80.
b) 443.
c) 4566.
d) 8080.

---

### Respuestas

1. **b**. IaaS te da infraestructura "cruda" (servidor, red, disco) y vos administrás todo lo de arriba, incluido el SO. PaaS te abstrae el SO y vos solo te ocupás de la aplicación.
2. **b**. En EC2 (IaaS), el cliente es responsable del SO. Si fuera un servicio "managed" como RDS o Lambda, AWS se encarga.
3. **a**. Floci corre en tu máquina y no tiene un servicio central de IAM contra el cual validar credenciales reales. Acepta cualquier string como `aws_access_key_id` y `aws_secret_access_key`.
4. **c**. EC2 no está soportado por Floci (no tiene sentido emular máquinas virtuales completas localmente; para eso usás Docker directamente).
5. **c**. 4566, el mismo puerto que usa LocalStack históricamente, para compatibilidad de configuración.

---

## Resumen

- AWS es la plataforma cloud más grande; tiene más de 200 servicios.
- Usar AWS real cuesta plata y tiene fricciones para aprender.
- Floci es un emulador local de AWS, open-source, gratis y sin auth token.
- Soporta 26 servicios de los más comunes.
- Lo vas a usar como gimnasio para practicar mientras estudiás Cloud Practitioner.

Siguiente: [`02-setup.md`](./02-setup.md).
