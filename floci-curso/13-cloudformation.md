# Módulo 13 — CloudFormation (Infrastructure as Code)

> **Objetivo**: entender qué es Infrastructure as Code, escribir templates YAML que describen recursos AWS, y deployar/desplegar stacks completos en Floci.

Tiempo estimado: 1.5 a 2 horas. Es el módulo previo al proyecto final.

---

## 1. ¿Qué es CloudFormation?

**AWS CloudFormation** es el servicio nativo de AWS para **Infrastructure as Code (IaC)**. En lugar de crear recursos uno por uno con el CLI o la consola, **describís** la infraestructura completa en un archivo YAML (o JSON), y CloudFormation se encarga de:

- Crear los recursos en el orden correcto.
- Mantener el estado (qué existe y qué no).
- Actualizar lo que cambió cuando modificás el template.
- Borrar todo cuando borrás el stack.

### ¿Por qué IaC?

1. **Reproducibilidad**: levantar exactamente la misma infra en otra región/cuenta con un comando.
2. **Versionado**: tu infra está en git, podés ver el historial, hacer code review.
3. **Documentación**: el template es la documentación.
4. **Rollback**: si algo falla en un deploy, CloudFormation revierte automáticamente.
5. **Less drift**: las cosas que se crean a mano se desvían del estado declarado.

### Alternativas a CloudFormation

- **Terraform**: el más popular fuera de AWS. Multi-cloud. Sintaxis HCL.
- **AWS CDK**: escribís infra en TypeScript/Python/Java, genera CloudFormation por debajo.
- **AWS SAM**: extensión de CloudFormation específica para serverless. Más conciso.
- **Pulumi**: como CDK pero multi-cloud.

CloudFormation es **AWS-only** y muchas veces más verboso que Terraform/CDK. Pero entender CloudFormation te da la base para entender los otros (CDK y SAM generan CloudFormation).

---

## 2. Conceptos clave

### 2.1 — Template

El archivo YAML/JSON con la descripción. Estructura:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Descripción humana del stack
Parameters:        # inputs configurables
  ...
Resources:         # lo importante: qué recursos crear
  ...
Outputs:           # qué exponer después de crear
  ...
```

### 2.2 — Stack

Una **instancia desplegada** de un template. Si tu template describe "un bucket + una Lambda", cada deploy de ese template crea un stack con esos recursos.

### 2.3 — Resources

Cada recurso tiene un **logical ID** (el nombre que vos le ponés en el template) y un **tipo** (`AWS::S3::Bucket`, `AWS::Lambda::Function`, etcétera).

```yaml
Resources:
  MiBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: mi-bucket-cf-curso
```

### 2.4 — Parameters

Inputs al template, configurables al momento de crear el stack.

```yaml
Parameters:
  EnvironmentName:
    Type: String
    Default: dev
    AllowedValues: [dev, staging, prod]
```

Después los usás en los recursos con `!Ref EnvironmentName`.

### 2.5 — Intrinsic functions

CloudFormation tiene funciones built-in para referenciar cosas:

- `!Ref MiBucket`: devuelve el nombre o ID del recurso.
- `!GetAtt MiBucket.Arn`: devuelve un atributo específico.
- `!Sub "${EnvironmentName}-bucket"`: substitución de variables.
- `!Join [",", [a, b, c]]`: concatenar.
- `!If [Condition, ValIfTrue, ValIfFalse]`: condicionales.

### 2.6 — Outputs

Valores que el stack expone para que vos (u otros stacks) los consulten.

```yaml
Outputs:
  BucketName:
    Description: Nombre del bucket creado
    Value: !Ref MiBucket
    Export:
      Name: !Sub "${AWS::StackName}-BucketName"
```

### 2.7 — Change sets

Antes de aplicar un cambio, CloudFormation puede mostrarte un **change set**: qué va a crear, qué va a modificar, qué va a borrar. Te da la oportunidad de revisar antes de aplicar.

### 2.8 — Rollback

Si una operación falla a mitad de un deploy, CloudFormation revierte automáticamente al estado anterior. Esto es una **gran** ventaja vs scripts manuales.

### 2.9 — Drift detection

CloudFormation puede detectar si alguien cambió un recurso a mano (out-of-band) y se desvió del estado declarado.

---

## 3. Cómo lo emula Floci

Floci implementa **12 operaciones de CloudFormation**:

- ✅ Create / update / delete stack.
- ✅ Describe stacks, resources, events.
- ✅ Change sets.
- ✅ Validación básica de templates.

Limitaciones:

- ❌ Soporte de tipos de recurso limitado a lo que Floci emula (no podés crear EC2 desde un template, por ejemplo).
- ❌ Drift detection limitada.
- ❌ Algunas intrinsic functions complejas pueden no estar 100%.

---

## 4. Laboratorio práctico

### Lab 1 — Un stack mínimo: solo un bucket S3

`stack-bucket.yaml`:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Un bucket S3 simple

Resources:
  MiBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: bucket-cf-curso

Outputs:
  BucketName:
    Value: !Ref MiBucket
    Description: Nombre del bucket creado
```

Desplegar:

```bash
aws cloudformation create-stack \
  --stack-name mi-primer-stack \
  --template-body file://stack-bucket.yaml
```

Verificá:

```bash
aws cloudformation describe-stacks --stack-name mi-primer-stack
aws cloudformation describe-stack-resources --stack-name mi-primer-stack
aws s3 ls
```

### Lab 2 — Outputs

```bash
aws cloudformation describe-stacks \
  --stack-name mi-primer-stack \
  --query 'Stacks[0].Outputs'
```

### Lab 3 — Actualizar el stack

Modificá `stack-bucket.yaml` para agregar versioning al bucket:

```yaml
AWSTemplateFormatVersion: '2010-09-09'

Resources:
  MiBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: bucket-cf-curso
      VersioningConfiguration:
        Status: Enabled

Outputs:
  BucketName:
    Value: !Ref MiBucket
```

Update:

```bash
aws cloudformation update-stack \
  --stack-name mi-primer-stack \
  --template-body file://stack-bucket.yaml
```

Verificar que ahora tiene versioning:

```bash
aws s3api get-bucket-versioning --bucket bucket-cf-curso
```

### Lab 4 — Borrar el stack

```bash
aws cloudformation delete-stack --stack-name mi-primer-stack
```

CloudFormation borra todos los recursos del stack en el orden correcto.

### Lab 5 — Stack más complejo: SQS + SNS + subscription

`stack-mensajeria.yaml`:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Topic SNS con una cola SQS subscripta

Parameters:
  AppName:
    Type: String
    Default: miapp

Resources:
  EventosTopic:
    Type: AWS::SNS::Topic
    Properties:
      TopicName: !Sub "${AppName}-eventos"

  ProcesadorQueue:
    Type: AWS::SQS::Queue
    Properties:
      QueueName: !Sub "${AppName}-procesador"
      VisibilityTimeout: 60

  ProcesadorSubscription:
    Type: AWS::SNS::Subscription
    Properties:
      TopicArn: !Ref EventosTopic
      Protocol: sqs
      Endpoint: !GetAtt ProcesadorQueue.Arn

  # Permiso para que SNS pueda escribir en la cola
  QueuePolicy:
    Type: AWS::SQS::QueuePolicy
    Properties:
      Queues:
        - !Ref ProcesadorQueue
      PolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Principal: "*"
            Action: SQS:SendMessage
            Resource: !GetAtt ProcesadorQueue.Arn
            Condition:
              ArnEquals:
                aws:SourceArn: !Ref EventosTopic

Outputs:
  TopicArn:
    Value: !Ref EventosTopic
  QueueUrl:
    Value: !Ref ProcesadorQueue
  QueueArn:
    Value: !GetAtt ProcesadorQueue.Arn
```

Deploy:

```bash
aws cloudformation create-stack \
  --stack-name mensajeria \
  --template-body file://stack-mensajeria.yaml
```

Esperá unos segundos y verificá:

```bash
aws cloudformation describe-stacks --stack-name mensajeria --query 'Stacks[0].Outputs'
aws sns list-topics
aws sqs list-queues
```

Probá que el fan-out funciona:

```bash
TOPIC_ARN=$(aws cloudformation describe-stacks --stack-name mensajeria \
  --query 'Stacks[0].Outputs[?OutputKey==`TopicArn`].OutputValue' --output text)

QUEUE_URL=$(aws cloudformation describe-stacks --stack-name mensajeria \
  --query 'Stacks[0].Outputs[?OutputKey==`QueueUrl`].OutputValue' --output text)

aws sns publish --topic-arn "$TOPIC_ARN" --message "Hola CloudFormation"

aws sqs receive-message --queue-url "$QUEUE_URL"
```

### Lab 6 — Stack con DynamoDB y parámetro

`stack-ddb.yaml`:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Tabla DynamoDB parametrizada

Parameters:
  Ambiente:
    Type: String
    Default: dev
    AllowedValues: [dev, staging, prod]
  NombreTabla:
    Type: String
    Default: Productos

Resources:
  TablaProductos:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Sub "${NombreTabla}-${Ambiente}"
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
        - AttributeName: categoria
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
      GlobalSecondaryIndexes:
        - IndexName: PorCategoria
          KeySchema:
            - AttributeName: categoria
              KeyType: HASH
          Projection:
            ProjectionType: ALL

Outputs:
  TableName:
    Value: !Ref TablaProductos
  TableArn:
    Value: !GetAtt TablaProductos.Arn
```

Deploy con parámetros:

```bash
aws cloudformation create-stack \
  --stack-name productos-dev \
  --template-body file://stack-ddb.yaml \
  --parameters \
    ParameterKey=Ambiente,ParameterValue=dev \
    ParameterKey=NombreTabla,ParameterValue=Productos
```

```bash
aws dynamodb list-tables
# Deberías ver "Productos-dev"
```

### Lab 7 — Limpieza

```bash
aws cloudformation delete-stack --stack-name productos-dev
aws cloudformation delete-stack --stack-name mensajeria
```

---

## 5. AWS SAM (mención breve)

Para proyectos serverless (Lambda + API Gateway + DynamoDB), AWS SAM es una extensión que reduce el boilerplate. Un template SAM mínimo:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Resources:
  MiAPI:
    Type: AWS::Serverless::Function
    Properties:
      Runtime: nodejs20.x
      CodeUri: ./src
      Handler: index.handler
      Events:
        Api:
          Type: HttpApi
          Properties:
            Path: /hello
            Method: GET
```

Con `sam deploy` te crea Lambda + role + API Gateway + permisos. Floci tiene compatibilidad parcial con SAM (lo que termina siendo CloudFormation por debajo).

---

## 6. Buenas prácticas

- **Separar templates por dominio**: no metas todo en un mega-stack. Un stack para networking, otro para datos, otro para compute.
- **Usar parámetros** para diferencias entre ambientes (dev/prod), no copiar-pegar templates.
- **Outputs con `Export`** para compartir valores entre stacks (con `Fn::ImportValue`).
- **`DeletionPolicy: Retain`** en recursos críticos (DynamoDB tables, S3 buckets) para que no se borren por accidente al borrar el stack.
- **Tags**: agregar tags a todos los recursos (Owner, Environment, Project) para gestión de costos y organización.

---

## 7. Diferencias clave con AWS real

| Aspecto                       | AWS real                     | Floci                            |
|-------------------------------|------------------------------|----------------------------------|
| Recursos soportados           | Todos los servicios AWS      | Solo los que Floci emula         |
| Drift detection               | Real                         | Limitada                         |
| StackSets (multi-cuenta)      | Disponible                   | No aplica                        |
| Custom resources con Lambda   | Funcionan                    | Limitado                         |
| Rollback automático           | Confiable                    | Generalmente funciona            |

---

## Quiz del módulo 13

**1.** ¿Qué es Infrastructure as Code?

a) Programación de la interfaz de usuario.
b) Describir la infraestructura en archivos versionables que se pueden reproducir y modificar declarativamente.
c) Hardware que corre código.
d) Otro nombre para Docker.

**2.** ¿Qué pasa si una operación de CloudFormation falla a mitad?

a) Tenés que limpiar a mano.
b) CloudFormation hace rollback automático al estado anterior.
c) AWS te cobra el doble.
d) Pierdes todos tus recursos.

**3.** ¿Cuál es la diferencia entre `!Ref` y `!GetAtt`?

a) Son sinónimos.
b) `!Ref` devuelve el ID/nombre del recurso; `!GetAtt` devuelve atributos específicos (como ARN, endpoint).
c) `!GetAtt` solo funciona con S3.
d) `!Ref` es más nuevo.

**4.** ¿Cuál es la ventaja principal de un change set?

a) Acelera el deploy.
b) Te muestra qué va a cambiar antes de aplicar, evitando sorpresas.
c) Reduce el costo.
d) Crea backups.

**5.** Para deployar exactamente la misma infra en dev y prod con diferencias mínimas, ¿qué usás?

a) Dos templates totalmente separados.
b) Un solo template con `Parameters` y desplegás cada ambiente como un stack distinto.
c) Crear todo a mano.
d) Solo CloudFormation no lo permite, tenés que usar Terraform.

**6.** ¿Qué hace `DeletionPolicy: Retain` en un recurso?

a) Lo borra inmediatamente.
b) Hace que el recurso **no** se borre cuando se borra el stack — útil para datos críticos.
c) Lo encripta.
d) Lo hace público.

**7.** ¿Cuál es la diferencia entre CloudFormation y SAM?

a) Son la misma cosa.
b) SAM es una extensión de CloudFormation específica para serverless, con sintaxis más concisa.
c) SAM es de otra empresa.
d) CloudFormation es serverless.

---

### Respuestas

1. **b**. IaC = infraestructura descrita en texto, versionable, reproducible.
2. **b**. Rollback automático — una ventaja enorme vs scripts manuales.
3. **b**. `!Ref` da identificador principal; `!GetAtt` da atributos específicos.
4. **b**. Change set = preview de cambios. Esencial en producción.
5. **b**. Parámetros + un mismo template, varios stacks.
6. **b**. `Retain` deja el recurso aunque el stack se borre. Ideal para DynamoDB con datos reales.
7. **b**. SAM = sugar syntax sobre CloudFormation para serverless.

---

## Resumen

- CloudFormation = IaC nativa de AWS.
- Templates YAML/JSON describen recursos; CloudFormation los crea, actualiza y borra.
- Stacks = instancias del template.
- Beneficios: reproducibilidad, versionado, rollback automático, documentación viva.
- Intrinsic functions: `!Ref`, `!GetAtt`, `!Sub`, `!Join`, `!If`.
- **SAM** y **CDK** son alternativas más cómodas que generan CloudFormation por debajo.

Siguiente: [`14-proyecto-final.md`](./14-proyecto-final.md).
