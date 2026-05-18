# Curso completo de Floci — AWS local sin pagar nada

Este curso te enseña a usar **Floci**, un emulador local de AWS open-source, para practicar y trabajar con los servicios de AWS sin necesidad de una cuenta de AWS, sin sorpresas en la factura, y sin depender de conexión a internet.

Está diseñado como **complemento del curso de AWS Cloud Practitioner (CLF-C02)**: cada módulo cubre un servicio o concepto que aparece en el examen oficial, pero acá lo vas a tocar con las manos en tu propia máquina.

---

## ¿Para quién es este curso?

Para vos si:

- Estás estudiando AWS Cloud Practitioner y querés **practicar de verdad**, no solo leer slides.
- Sabés **Node.js** (los ejemplos de código en SDK usan Node, no Python).
- Tenés **Docker** instalado y entendés los conceptos básicos (qué es una imagen, qué es un contenedor, `docker compose up`).
- **No** querés meter tu tarjeta de crédito en AWS todavía, o no querés arriesgarte a olvidar un recurso encendido.

## Lo que NO es este curso

- No reemplaza al curso oficial de Cloud Practitioner. Lo complementa.
- No cubre los servicios de AWS que Floci **no** emula (por ejemplo, EC2, VPC, Route 53, CloudFront, IAM Identity Center, etc.).
- No es un curso de Docker ni de Linux.

---

## Servicios cubiertos

| Servicio AWS              | Para qué sirve                                       | Módulo |
|---------------------------|------------------------------------------------------|--------|
| IAM                       | Identidades, permisos, políticas                     | 03     |
| S3                        | Almacenamiento de objetos                            | 04     |
| DynamoDB                  | Base de datos NoSQL                                  | 05     |
| SQS                       | Colas de mensajes                                    | 06     |
| SNS                       | Notificaciones / pub-sub                             | 07     |
| Lambda                    | Funciones serverless                                 | 08     |
| API Gateway               | Exponer APIs HTTP/REST                               | 09     |
| RDS                       | Base de datos relacional (PostgreSQL / MySQL)        | 10     |
| KMS + Secrets Manager     | Encriptación y secretos                              | 11     |
| CloudWatch Logs           | Logging centralizado                                 | 12     |
| CloudFormation            | Infrastructure as Code                               | 13     |

---

## Estructura del curso

```
floci-curso/
├── README.md                   <- estás acá
├── docker-compose.yml          <- el Floci base que vas a usar en todos los módulos
├── 01-introduccion.md
├── 02-setup.md
├── 03-iam.md
├── 04-s3.md
├── 05-dynamodb.md
├── 06-sqs.md
├── 07-sns.md
├── 08-lambda.md
├── 09-api-gateway.md
├── 10-rds.md
├── 11-kms-secrets.md
├── 12-cloudwatch.md
├── 13-cloudformation.md
├── 14-proyecto-final.md
└── 15-quiz-final.md
```

## Cómo está armado cada módulo

Todos los módulos siguen la misma estructura:

1. **Qué es este servicio en AWS** — la teoría que te van a tomar en el examen.
2. **Conceptos clave** — vocabulario que tenés que saber.
3. **Cómo lo emula Floci** — qué soporta, qué no, diferencias con AWS real.
4. **Laboratorio práctico** — comandos AWS CLI listos para correr contra Floci.
5. **Bonus Node.js** — cuando aplica, un ejemplo con AWS SDK v3 para Node.
6. **Quiz** — preguntas estilo Cloud Practitioner con respuestas explicadas al pie.
7. **Resumen y siguiente módulo**.

---

## Orden recomendado

Hacelos en orden. Cada módulo asume que terminaste los anteriores:

1. **Módulo 01** y **02** son obligatorios — sin Floci corriendo no podés hacer nada.
2. **Módulo 03 (IAM)** es base conceptual para todo lo que viene.
3. Después podés ir más libre, pero el módulo **08 (Lambda)** asume que ya viste **04 (S3)**, **05 (DynamoDB)** y **06 (SQS)**.
4. El módulo **14** integra todo en un proyecto real.

---

## Tiempo estimado

- **Total**: 25 a 35 horas (depende de cuánto te detengas en los labs).
- **Por módulo**: entre 1 y 3 horas.

No es una carrera. Si un concepto no te queda claro, paralo, anotalo, googlealo, volvé.

---

## Convenciones del curso

- **Bloques de código** marcados con `bash` son para tu terminal.
- **Bloques de código** marcados con `js` son ejemplos de Node.js que podés correr con `node archivo.js`.
- **Bloques de código** marcados con `yaml` son archivos de configuración (`docker-compose.yml`, CloudFormation, etc).
- Cuando veas `# 👉` es una nota importante.
- Cuando veas `# ⚠️` es algo que puede romper el lab si no lo respetás.
- Cuando veas `# 💡` es un tip o atajo.

---

## Diferencias entre Floci y AWS real

Floci es un **emulador**, no AWS. Algunas cosas que tenés que tener en mente desde ya:

| Tema             | AWS real                                    | Floci                                          |
|------------------|---------------------------------------------|------------------------------------------------|
| Credenciales     | Reales, con cuenta y facturación            | Cualquier cosa: `test` / `test` funciona       |
| Endpoint         | `https://s3.us-east-1.amazonaws.com`, etc.  | `http://localhost:4566` para todo              |
| Region           | Importa para latencia y disponibilidad      | Cualquier región sirve, no afecta nada         |
| Costo            | Variable, hay que vigilarlo                 | $0                                             |
| Performance      | Producción                                  | Limitado por tu máquina                        |
| HA / Multi-AZ    | Sí                                          | No (es un solo contenedor)                     |
| Persistencia     | Eternamente                                 | Depende de cómo configures el volumen          |
| Networking       | VPCs, security groups, NACLs                | No aplica (todo es localhost)                  |

Esto significa que **lo que aprendas acá te sirve para entender los conceptos y practicar los comandos**, pero ciertos aspectos (red, IAM real, alta disponibilidad, costos) solo los vas a tocar en AWS real.

---

## Empezamos

Cuando estés listo, abrí [`01-introduccion.md`](./01-introduccion.md).
