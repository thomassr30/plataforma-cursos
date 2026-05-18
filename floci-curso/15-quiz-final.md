# Módulo 15 — Quiz final integrador

> **Objetivo**: validar todo lo que aprendiste durante el curso con preguntas estilo AWS Cloud Practitioner (CLF-C02).

Son **40 preguntas** mezclando todos los servicios y conceptos del curso. Respondé mentalmente o en papel y después chequeá las respuestas al final.

Aprobás si sacás **70% o más** (28 correctas). Por debajo de eso, conviene repasar los módulos donde fallaste.

---

## Preguntas

### Conceptos generales

**1.** ¿Cuál de los siguientes modelos de servicio cloud le da al cliente la mayor responsabilidad sobre el sistema operativo?

a) SaaS
b) PaaS
c) IaaS
d) FaaS

**2.** Según el modelo de responsabilidad compartida de AWS, ¿quién es responsable de la seguridad física del datacenter?

a) El cliente.
b) AWS.
c) El cliente solo si está en us-east-1.
d) Es compartido al 50%.

**3.** Una empresa quiere que sus datos nunca salgan de Brasil por temas regulatorios. ¿Qué concepto de AWS le aplica?

a) Edge locations.
b) Regiones (region selection).
c) Availability Zones.
d) Outposts.

**4.** ¿Cuál es la diferencia entre una Region y una Availability Zone?

a) No hay diferencia.
b) Una Region contiene varias AZs físicamente separadas pero con red rápida entre ellas.
c) Las Regions son más chicas que las AZs.
d) Las AZs están en el espacio.

---

### IAM

**5.** ¿Qué entidad IAM se usa para dar permisos a una Lambda?

a) IAM user con credenciales hardcoded en el código.
b) Un role IAM atachado a la función.
c) MFA.
d) Bucket policy.

**6.** Si un user tiene una policy Allow y otra Deny sobre la misma acción, ¿qué pasa?

a) Allow gana.
b) Deny gana.
c) Error.
d) Se elige aleatoriamente.

**7.** ¿Cuál es la **mejor práctica** para la cuenta root de AWS?

a) Usarla para tareas diarias porque tiene más permisos.
b) Activar MFA y usarla solo para tareas excepcionales; crear users IAM con permisos de admin para el día a día.
c) Borrarla después de crear la cuenta.
d) Compartirla entre miembros del equipo.

**8.** Un equipo necesita que su CI/CD (GitHub Actions) deploye en AWS. ¿Cuál es la **forma recomendada**?

a) Crear un user IAM y poner las access keys como secret de GitHub.
b) Configurar OpenID Connect entre GitHub y AWS, y que GitHub Actions asuma un role con `AssumeRoleWithWebIdentity`.
c) Hacer la cuenta de AWS pública.
d) Compartir la password root.

---

### S3

**9.** ¿Cuál es el tamaño máximo de un objeto en S3?

a) 100 MB
b) 5 GB
c) 5 TB
d) Ilimitado

**10.** Una empresa quiere que un bucket sea legible por el mundo (sitio estático). ¿Qué configura?

a) Hace el bucket "público" en la consola sin más.
b) Crea una bucket policy que permita `s3:GetObject` a `Principal: "*"` sobre `arn:aws:s3:::bucket/*`.
c) Pone los archivos en la carpeta `public/`.
d) Cambia la región.

**11.** ¿Para qué se usa Glacier Deep Archive?

a) Para datos de acceso frecuente.
b) Para datos que casi nunca se leen pero hay que conservar muchos años (compliance), con la menor tarifa de almacenamiento.
c) Para servir CDNs.
d) Para encriptar.

**12.** ¿Qué garantiza el versioning en un bucket de S3?

a) Que cada bucket está versionado.
b) Que las versiones anteriores de un objeto se conservan al sobrescribirlo o "borrarlo".
c) Que el contenido se encripta.
d) Que se replica a otra región.

---

### DynamoDB

**13.** ¿Cuál de estas operaciones es más cara en DynamoDB?

a) GetItem.
b) Query.
c) Scan.
d) PutItem.

**14.** Si tu tabla tiene clave compuesta `user_id` (partition) + `timestamp` (sort), ¿cómo traés todos los registros de un usuario eficientemente?

a) Scan con filtro.
b) Query por `user_id`.
c) GetItem.
d) No se puede.

**15.** ¿Cuándo elegirías DynamoDB sobre RDS?

a) Cuando necesitás joins entre 5 tablas.
b) Cuando necesitás latencias predecibles de milisegundos a escala masiva, con patrones de acceso conocidos.
c) Cuando solo querés guardar archivos.
d) Cuando necesitás un schema rígido.

---

### SQS y SNS

**16.** ¿Cuál es la diferencia principal entre SQS Standard y SQS FIFO?

a) FIFO es gratis.
b) FIFO garantiza orden estricto y exactly-once; Standard es best-effort y at-least-once.
c) Standard solo está en us-east-1.
d) No hay diferencia.

**17.** ¿Qué es el "fan-out" pattern en AWS?

a) Un patrón de UI.
b) Un topic SNS que tiene varias colas SQS subscriptas, cada una para un procesamiento independiente del mismo evento.
c) Lambda invocando a sí misma.
d) DynamoDB con GSIs.

**18.** Un mensaje en SQS se lee pero su consumer crashea sin borrarlo. ¿Qué pasa?

a) Se pierde.
b) Después del visibility timeout, vuelve a estar visible y otro consumer puede leerlo.
c) Se duplica para siempre.
d) SQS manda un email.

**19.** ¿Cuál es el caso de uso típico de una Dead Letter Queue (DLQ)?

a) Encolar mensajes urgentes.
b) Recibir mensajes que fallaron N veces, para investigarlos sin que bloqueen el resto.
c) Borrar mensajes viejos.
d) Encriptar mensajes.

---

### Lambda

**20.** ¿Cuál es el tiempo máximo de ejecución de una Lambda?

a) 30 segundos.
b) 5 minutos.
c) 15 minutos.
d) Sin límite.

**21.** ¿Qué es un cold start?

a) Cuando la Lambda falla.
b) La invocación que arranca un nuevo entorno de ejecución desde cero — más lenta que las invocaciones subsiguientes (warm starts).
c) Una Lambda que corre de noche.
d) Una Lambda que se cae.

**22.** Para mitigar cold starts en producción, ¿qué se usa?

a) Provisioned Concurrency.
b) Aumentar el timeout.
c) Cambiar la región.
d) Borrar el role.

**23.** ¿Cuál es la forma correcta de darle a una Lambda permiso para leer una tabla DynamoDB?

a) Hardcodear credenciales en el código.
b) Crear un IAM role para la Lambda con una policy que permita `dynamodb:GetItem` sobre esa tabla.
c) Hacer la tabla pública.
d) Crear un usuario IAM nuevo.

---

### API Gateway

**24.** ¿Cuál es la diferencia entre REST API y HTTP API en API Gateway?

a) HTTP API es más simple y ~70% más barata; REST API tiene más features.
b) No hay diferencia.
c) REST API es más nueva.
d) HTTP API solo soporta GET.

**25.** ¿Por qué API Gateway necesita una permission en la Lambda que invoca?

a) Para encriptar.
b) Para que la Lambda autorice a API Gateway específicamente — los permisos en Lambda son resource-based.
c) Para acelerar el deploy.
d) No hace falta.

**26.** ¿Cuál es la forma recomendada de autenticar requests en una HTTP API moderna?

a) Hacer la API pública.
b) JWT authorizer apuntando a un issuer OIDC (Cognito, Auth0, etc.).
c) Validar la IP.
d) Token hardcoded.

---

### RDS

**27.** Una app necesita guardar datos relacionales con joins frecuentes. ¿Qué servicio recomendarías?

a) DynamoDB.
b) RDS o Aurora.
c) S3.
d) SQS.

**28.** ¿Para qué sirve Multi-AZ en RDS?

a) Para distribuir lectura.
b) Para alta disponibilidad: réplica síncrona en otra AZ con failover automático.
c) Para reducir costos.
d) Para encriptar.

**29.** ¿Cuál es la diferencia entre Multi-AZ y Read Replicas?

a) Multi-AZ es para HA (failover); Read Replicas es para distribuir carga de lectura.
b) Son sinónimos.
c) Read Replicas solo en us-east-1.
d) Multi-AZ no existe.

---

### KMS / Secrets Manager

**30.** Una app necesita guardar la password de la DB. ¿Dónde?

a) En el código.
b) En Secrets Manager.
c) En S3 público.
d) En la wiki del equipo.

**31.** ¿Qué es envelope encryption?

a) Encriptar dos veces seguidas.
b) Encriptar los datos con una "data key" simétrica local, y guardar esa data key encriptada con la KMS key maestra — útil para datos grandes.
c) Encriptar emails.
d) Encriptar solo el sobre.

---

### CloudWatch

**32.** ¿Cómo escribe logs una Lambda en CloudWatch?

a) Hay que llamar a una API explícitamente.
b) `console.log` (y similares) van automáticamente, mientras el role tenga el permiso `AWSLambdaBasicExecutionRole`.
c) No escribe en CloudWatch.
d) Solo si activás un flag especial.

**33.** ¿Qué es un metric filter?

a) Una alarma.
b) Una regla que cuenta cuántos log events matchean un patrón y los expone como métrica.
c) Un tipo de log group.
d) Una bucket policy.

**34.** Para alertar cuando hay muchos errores, ¿qué se arma?

a) Una cola SQS.
b) Metric filter + alarm + SNS topic (que después puede mandar a email, PagerDuty, etc.).
c) Una tabla DynamoDB.
d) Un bucket de S3.

---

### CloudFormation

**35.** ¿Qué es Infrastructure as Code?

a) Programación de UIs.
b) Describir la infraestructura en archivos declarativos versionables y reproducibles.
c) Hardware programable.
d) Lo mismo que Docker.

**36.** ¿Qué pasa si CloudFormation falla a mitad de un deploy?

a) Tenés que limpiar a mano.
b) Hace rollback automático al estado anterior.
c) AWS te cobra el doble.
d) Los recursos quedan colgados.

**37.** ¿Cuál es la diferencia entre `!Ref` y `!GetAtt`?

a) Son lo mismo.
b) `!Ref` da el nombre/ID principal del recurso; `!GetAtt` da atributos específicos como ARN o endpoint.
c) `!GetAtt` solo sirve con S3.
d) `!Ref` está deprecado.

---

### Floci-specific

**38.** ¿Cuál es el endpoint por defecto al que apuntás el AWS CLI para que use Floci?

a) `http://localhost:80`
b) `http://localhost:4566`
c) `http://localhost:8080`
d) `https://floci.amazonaws.com`

**39.** Cuando una Lambda dentro de Floci necesita hablar con otro servicio Floci, el endpoint correcto es:

a) `http://localhost:4566` (igual que desde el host).
b) `http://host.docker.internal:4566` o el nombre del servicio en docker-compose — porque `localhost` desde dentro del contenedor de la Lambda es el contenedor mismo.
c) `https://aws.amazon.com`
d) `http://127.0.0.1`

**40.** ¿Cuál de estos servicios **NO** está cubierto por Floci?

a) S3.
b) Lambda.
c) EC2.
d) DynamoDB.

---

## Respuestas

| Pregunta | Respuesta | Concepto |
|----------|-----------|----------|
| 1 | **c** | IaaS te da la infraestructura cruda; vos manejás el SO. PaaS abstrae el SO. SaaS es app lista. FaaS es funciones (Lambda). |
| 2 | **b** | Seguridad **DE** la nube → AWS. Seguridad **EN** la nube → cliente. Datacenter físico es AWS. |
| 3 | **b** | Las Regions definen dónde viven los datos físicamente. Soberanía/residencia de datos. |
| 4 | **b** | Region = grupo de AZs físicamente separadas pero con red rápida (RTT < 2 ms típicamente). |
| 5 | **b** | Roles, **nunca** credenciales hardcoded. |
| 6 | **b** | Deny gana siempre. |
| 7 | **b** | Root solo para tareas excepcionales + MFA obligatorio. |
| 8 | **b** | OIDC + AssumeRoleWithWebIdentity. Sin credenciales long-lived en secrets de CI. |
| 9 | **c** | 5 TB por objeto. |
| 10 | **b** | Bucket policy con `Principal: "*"` y `s3:GetObject`. |
| 11 | **b** | Deep Archive = el más barato, ideal para compliance / archivos legales. |
| 12 | **b** | Versioning conserva todas las versiones del objeto. |
| 13 | **c** | Scan recorre toda la tabla. |
| 14 | **b** | Query por partition key es eficiente; trae todos los items con esa partition. |
| 15 | **b** | DynamoDB para escala masiva con patrones de acceso conocidos. |
| 16 | **b** | FIFO = orden + exactly-once. Standard = best-effort + at-least-once. |
| 17 | **b** | Fan-out: 1 publish a SNS → varias colas SQS independientes. |
| 18 | **b** | Visibility timeout permite reintento automático si el consumer falla. |
| 19 | **b** | DLQ = mensajes problemáticos aislados, para investigar sin bloquear. |
| 20 | **c** | 15 minutos máximo. |
| 21 | **b** | Cold start = primera invocación desde cero. |
| 22 | **a** | Provisioned Concurrency mantiene N entornos calientes 24/7. |
| 23 | **b** | Role con policy de DynamoDB. |
| 24 | **a** | HTTP API simple y barato; REST API tiene features avanzadas. |
| 25 | **b** | Lambda usa resource-based policy; API Gateway debe estar autorizada. |
| 26 | **b** | JWT authorizer con OIDC. |
| 27 | **b** | RDS / Aurora para SQL con joins. |
| 28 | **b** | Multi-AZ = HA con failover. No es para leer. |
| 29 | **a** | Multi-AZ = HA. Read Replicas = escalar lectura. |
| 30 | **b** | Secrets Manager. |
| 31 | **b** | Envelope encryption: data key local + KMS key maestra. |
| 32 | **b** | `console.log` → CloudWatch automático. |
| 33 | **b** | Metric filter cuenta matches y los expone como métrica. |
| 34 | **b** | Metric filter + alarm + SNS = pipeline canónico de alertas. |
| 35 | **b** | IaC = infra declarativa, versionable, reproducible. |
| 36 | **b** | Rollback automático. |
| 37 | **b** | `!Ref` → identificador principal; `!GetAtt` → atributos específicos. |
| 38 | **b** | 4566. |
| 39 | **b** | Adentro de Lambda en Floci, `localhost` es el contenedor; usar `host.docker.internal`. |
| 40 | **c** | EC2 no está soportado. Para máquinas virtuales completas, usás Docker directo. |

---

## Auto-evaluación

Contá tus aciertos:

| Aciertos | Resultado                                                                |
|----------|--------------------------------------------------------------------------|
| 36-40    | 🎯 Excelente. Estás listo para el examen Cloud Practitioner.             |
| 28-35    | ✅ Aprobado. Repasá los conceptos donde fallaste antes del examen.       |
| 20-27    | ⚠️ Repasar. Tomate un par de días para reforzar.                         |
| < 20     | 🔄 Volvé a hacer los módulos con calma, especialmente los que más fallaste. |

---

## Cómo seguir

Llegaste al final del curso. A esta altura ya:

- Tenés una buena base teórica del Cloud Practitioner.
- Sabés tocar los servicios con AWS CLI.
- Podés armar arquitecturas serverless integradas (proyecto final).
- Entendés IaC con CloudFormation.

**Siguientes pasos sugeridos**:

1. **Rendí el examen Cloud Practitioner** si lo querés certificar.
2. Probá hacer el proyecto final en **AWS real** (con free tier — cuidado con los costos).
3. Aprendé **Terraform** o **AWS CDK** — son alternativas a CloudFormation que se usan más en la industria.
4. Profundizá en un servicio específico (la doc oficial de AWS es excelente para esto).
5. Considerá el siguiente nivel: **AWS Solutions Architect Associate** (mucho más técnico).

---

## Devolución del curso

Si encontrás errores en el material, comandos que no funcionan en tu versión de Floci, o cosas que se podrían mejorar, anotalas. Es un curso vivo y siempre se puede mejorar.

Felicitaciones por llegar hasta acá. ☁️
