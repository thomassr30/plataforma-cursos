# Módulo 14 — Proyecto integrador final

> **Objetivo**: armar una aplicación serverless completa que use **todos los servicios del curso** integrados entre sí, deployada con CloudFormation.

Tiempo estimado: 3 a 4 horas. Esto es un mini-proyecto, no un módulo más.

---

## 1. Qué vas a construir

Una **API de procesamiento de pedidos** (estilo e-commerce simplificado) con esta arquitectura:

```
                                          ┌──────────────┐
[Cliente] ──► HTTPS ──► [API Gateway] ──► │   Lambda     │
                                          │   API        │
                                          └──────┬───────┘
                                                 │
                              ┌──────────────────┼──────────────────┐
                              │                  │                  │
                              ▼                  ▼                  ▼
                       ┌────────────┐    ┌────────────┐     ┌────────────┐
                       │ DynamoDB   │    │ SNS topic  │     │   S3       │
                       │ (Pedidos)  │    │ "PedidoCreado"  │ │  (recibos) │
                       └────────────┘    └─────┬──────┘     └────────────┘
                                               │
                              ┌────────────────┼────────────────┐
                              ▼                                 ▼
                       ┌────────────┐                    ┌────────────┐
                       │ SQS:       │                    │ SQS:       │
                       │ cola-email │                    │ cola-stock │
                       └─────┬──────┘                    └─────┬──────┘
                             │                                 │
                             ▼                                 ▼
                       ┌────────────┐                    ┌────────────┐
                       │ Lambda     │                    │ Lambda     │
                       │ "Email"    │                    │ "Stock"    │
                       └────────────┘                    └────────────┘
```

Funcionalidad:

1. **POST /pedidos**: crea un pedido en DynamoDB, sube un recibo a S3, publica el evento en SNS.
2. **GET /pedidos**: lista todos los pedidos.
3. **GET /pedidos/{id}**: trae un pedido.
4. SNS hace **fan-out** a dos colas SQS:
   - **cola-email**: una Lambda lee la cola, simula mandar email.
   - **cola-stock**: otra Lambda lee la cola, simula actualizar stock.

Vas a usar:

- ✅ IAM (roles para las Lambdas).
- ✅ S3 (bucket de recibos).
- ✅ DynamoDB (tabla de pedidos).
- ✅ SQS (dos colas).
- ✅ SNS (topic + subscriptions).
- ✅ Lambda (tres funciones).
- ✅ API Gateway (HTTP API).
- ✅ CloudWatch Logs (automático con Lambda).
- ✅ Secrets Manager (config sensible).
- ✅ CloudFormation (todo declarado en un template).

Es **todo** el curso integrado.

---

## 2. Estructura del proyecto

```
proyecto-final/
├── template.yaml               # CloudFormation template
├── lambdas/
│   ├── api/
│   │   ├── index.js
│   │   └── package.json
│   ├── email/
│   │   ├── index.js
│   │   └── package.json
│   └── stock/
│       ├── index.js
│       └── package.json
├── scripts/
│   ├── deploy.sh
│   └── test.sh
└── README.md
```

---

## 3. Paso 1 — Setup del proyecto

```bash
cd C:/Thomas/Cursos/Cursos-Platform/floci-curso
mkdir -p proyecto-final/lambdas/api proyecto-final/lambdas/email proyecto-final/lambdas/stock proyecto-final/scripts
cd proyecto-final
```

---

## 4. Paso 2 — Lambda de la API

`lambdas/api/package.json`:

```json
{
  "name": "api-lambda",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.600.0",
    "@aws-sdk/lib-dynamodb": "^3.600.0",
    "@aws-sdk/client-s3": "^3.600.0",
    "@aws-sdk/client-sns": "^3.600.0"
  }
}
```

`lambdas/api/index.js`:

```js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { randomUUID } = require("node:crypto");

// Endpoint para que funcione tanto en Floci como en AWS real:
// si la variable FLOCI_ENDPOINT existe, la usamos; si no, default a AWS real.
const config = {
  region: "us-east-1",
  ...(process.env.FLOCI_ENDPOINT && {
    endpoint: process.env.FLOCI_ENDPOINT,
    credentials: { accessKeyId: "test", secretAccessKey: "test" },
    forcePathStyle: true,
  }),
};

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient(config));
const s3 = new S3Client(config);
const sns = new SNSClient(config);

const TABLE = process.env.PEDIDOS_TABLE;
const BUCKET = process.env.RECIBOS_BUCKET;
const TOPIC_ARN = process.env.PEDIDOS_TOPIC_ARN;

function respond(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod;
  const pathId = event.pathParameters?.id;

  try {
    // POST /pedidos
    if (method === "POST" && !pathId) {
      const data = JSON.parse(event.body || "{}");

      if (!data.cliente || !data.items?.length) {
        return respond(400, { error: "Falta cliente o items" });
      }

      const total = data.items.reduce(
        (sum, item) => sum + item.precio * item.cantidad,
        0
      );

      const pedido = {
        id: randomUUID(),
        cliente: data.cliente,
        items: data.items,
        total,
        estado: "creado",
        creadoEn: new Date().toISOString(),
      };

      // 1. Guardar en DynamoDB
      await ddb.send(new PutCommand({ TableName: TABLE, Item: pedido }));

      // 2. Subir recibo a S3
      const recibo = `RECIBO DE PEDIDO
================
ID: ${pedido.id}
Cliente: ${pedido.cliente}
Total: $${pedido.total}
Fecha: ${pedido.creadoEn}

ITEMS:
${pedido.items.map((i) => `  - ${i.nombre} x${i.cantidad} = $${i.precio * i.cantidad}`).join("\n")}
`;

      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: `recibos/${pedido.id}.txt`,
          Body: recibo,
          ContentType: "text/plain",
        })
      );

      // 3. Publicar evento en SNS
      await sns.send(
        new PublishCommand({
          TopicArn: TOPIC_ARN,
          Message: JSON.stringify(pedido),
          Subject: "PedidoCreado",
        })
      );

      return respond(201, pedido);
    }

    // GET /pedidos/{id}
    if (method === "GET" && pathId) {
      const result = await ddb.send(
        new GetCommand({ TableName: TABLE, Key: { id: pathId } })
      );
      if (!result.Item) return respond(404, { error: "pedido no encontrado" });
      return respond(200, result.Item);
    }

    // GET /pedidos
    if (method === "GET" && !pathId) {
      const result = await ddb.send(new ScanCommand({ TableName: TABLE }));
      return respond(200, result.Items || []);
    }

    return respond(405, { error: "método no soportado" });
  } catch (err) {
    console.error(err);
    return respond(500, { error: err.message });
  }
};
```

---

## 5. Paso 3 — Lambda de email

`lambdas/email/package.json`:

```json
{
  "name": "email-lambda",
  "version": "1.0.0",
  "main": "index.js"
}
```

`lambdas/email/index.js`:

```js
exports.handler = async (event) => {
  for (const record of event.Records || []) {
    // El body de SQS contiene un envelope de SNS
    const sqsBody = JSON.parse(record.body);
    const pedido = JSON.parse(sqsBody.Message);

    console.log(JSON.stringify({
      level: "info",
      action: "send-email",
      pedidoId: pedido.id,
      cliente: pedido.cliente,
      total: pedido.total,
      mensaje: `[SIMULADO] Email a ${pedido.cliente} confirmando pedido ${pedido.id}`,
    }));

    // Acá iría llamada real a SendGrid / SES / etc.
  }

  return { batchItemFailures: [] };
};
```

---

## 6. Paso 4 — Lambda de stock

`lambdas/stock/package.json`:

```json
{
  "name": "stock-lambda",
  "version": "1.0.0",
  "main": "index.js"
}
```

`lambdas/stock/index.js`:

```js
exports.handler = async (event) => {
  for (const record of event.Records || []) {
    const sqsBody = JSON.parse(record.body);
    const pedido = JSON.parse(sqsBody.Message);

    for (const item of pedido.items) {
      console.log(JSON.stringify({
        level: "info",
        action: "update-stock",
        pedidoId: pedido.id,
        producto: item.nombre,
        descontado: item.cantidad,
        mensaje: `[SIMULADO] Descontando ${item.cantidad} de ${item.nombre}`,
      }));

      // Acá iría update real en otra tabla de inventario.
    }
  }

  return { batchItemFailures: [] };
};
```

---

## 7. Paso 5 — Template de CloudFormation

`template.yaml`:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: API de pedidos serverless completa - proyecto final del curso de Floci

Parameters:
  AppName:
    Type: String
    Default: pedidos

Resources:
  # --- DynamoDB ---
  PedidosTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Sub "${AppName}-pedidos"
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH

  # --- S3 ---
  RecibosBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub "${AppName}-recibos"

  # --- SNS Topic ---
  PedidosTopic:
    Type: AWS::SNS::Topic
    Properties:
      TopicName: !Sub "${AppName}-eventos"

  # --- SQS: cola email ---
  EmailQueue:
    Type: AWS::SQS::Queue
    Properties:
      QueueName: !Sub "${AppName}-cola-email"
      VisibilityTimeout: 60

  EmailSubscription:
    Type: AWS::SNS::Subscription
    Properties:
      TopicArn: !Ref PedidosTopic
      Protocol: sqs
      Endpoint: !GetAtt EmailQueue.Arn

  EmailQueuePolicy:
    Type: AWS::SQS::QueuePolicy
    Properties:
      Queues:
        - !Ref EmailQueue
      PolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Principal: "*"
            Action: SQS:SendMessage
            Resource: !GetAtt EmailQueue.Arn

  # --- SQS: cola stock ---
  StockQueue:
    Type: AWS::SQS::Queue
    Properties:
      QueueName: !Sub "${AppName}-cola-stock"
      VisibilityTimeout: 60

  StockSubscription:
    Type: AWS::SNS::Subscription
    Properties:
      TopicArn: !Ref PedidosTopic
      Protocol: sqs
      Endpoint: !GetAtt StockQueue.Arn

  StockQueuePolicy:
    Type: AWS::SQS::QueuePolicy
    Properties:
      Queues:
        - !Ref StockQueue
      PolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Principal: "*"
            Action: SQS:SendMessage
            Resource: !GetAtt StockQueue.Arn

  # --- IAM role para la Lambda de API ---
  ApiLambdaRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: !Sub "${AppName}-api-role"
      AssumeRolePolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
        - arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess
        - arn:aws:iam::aws:policy/AmazonS3FullAccess
        - arn:aws:iam::aws:policy/AmazonSNSFullAccess

  # --- IAM role para los workers ---
  WorkerLambdaRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: !Sub "${AppName}-worker-role"
      AssumeRolePolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
        - arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole

Outputs:
  PedidosTable:
    Value: !Ref PedidosTable
  RecibosBucket:
    Value: !Ref RecibosBucket
  PedidosTopicArn:
    Value: !Ref PedidosTopic
  EmailQueueArn:
    Value: !GetAtt EmailQueue.Arn
  EmailQueueUrl:
    Value: !Ref EmailQueue
  StockQueueArn:
    Value: !GetAtt StockQueue.Arn
  StockQueueUrl:
    Value: !Ref StockQueue
  ApiRoleArn:
    Value: !GetAtt ApiLambdaRole.Arn
  WorkerRoleArn:
    Value: !GetAtt WorkerLambdaRole.Arn
```

> 💡 Decidí **no** poner las Lambdas ni la API en el CloudFormation, porque empacar las Lambdas zip dentro de un template tiene fricciones (en AWS real se usa SAM o un bucket de artifacts). Para mantener este proyecto local-friendly, hacemos infra base con CloudFormation y Lambdas + API con CLI.

---

## 8. Paso 6 — Script de deploy

`scripts/deploy.sh`:

```bash
#!/usr/bin/env bash
set -e

STACK_NAME=pedidos-stack
APP_NAME=pedidos

echo "==> 1/5: Desplegando infraestructura base con CloudFormation"
aws cloudformation deploy \
  --stack-name $STACK_NAME \
  --template-file template.yaml \
  --parameter-overrides AppName=$APP_NAME \
  --capabilities CAPABILITY_NAMED_IAM

# Outputs
PEDIDOS_TABLE=$(aws cloudformation describe-stacks --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`PedidosTable`].OutputValue' --output text)
RECIBOS_BUCKET=$(aws cloudformation describe-stacks --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`RecibosBucket`].OutputValue' --output text)
TOPIC_ARN=$(aws cloudformation describe-stacks --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`PedidosTopicArn`].OutputValue' --output text)
EMAIL_QUEUE_ARN=$(aws cloudformation describe-stacks --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`EmailQueueArn`].OutputValue' --output text)
STOCK_QUEUE_ARN=$(aws cloudformation describe-stacks --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`StockQueueArn`].OutputValue' --output text)
API_ROLE=$(aws cloudformation describe-stacks --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`ApiRoleArn`].OutputValue' --output text)
WORKER_ROLE=$(aws cloudformation describe-stacks --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`WorkerRoleArn`].OutputValue' --output text)

echo "==> 2/5: Empaquetando y deployando lambda-api"
pushd lambdas/api > /dev/null
npm install --omit=dev > /dev/null
zip -qr function.zip .
popd > /dev/null

aws lambda create-function \
  --function-name $APP_NAME-api \
  --runtime nodejs20.x \
  --role "$API_ROLE" \
  --handler index.handler \
  --zip-file fileb://lambdas/api/function.zip \
  --environment "Variables={
    PEDIDOS_TABLE=$PEDIDOS_TABLE,
    RECIBOS_BUCKET=$RECIBOS_BUCKET,
    PEDIDOS_TOPIC_ARN=$TOPIC_ARN,
    FLOCI_ENDPOINT=http://host.docker.internal:4566
  }" 2>/dev/null || \
  aws lambda update-function-code \
    --function-name $APP_NAME-api \
    --zip-file fileb://lambdas/api/function.zip > /dev/null

echo "==> 3/5: Empaquetando y deployando lambda-email"
pushd lambdas/email > /dev/null
zip -qr function.zip .
popd > /dev/null

aws lambda create-function \
  --function-name $APP_NAME-email \
  --runtime nodejs20.x \
  --role "$WORKER_ROLE" \
  --handler index.handler \
  --zip-file fileb://lambdas/email/function.zip 2>/dev/null || \
  aws lambda update-function-code \
    --function-name $APP_NAME-email \
    --zip-file fileb://lambdas/email/function.zip > /dev/null

aws lambda create-event-source-mapping \
  --function-name $APP_NAME-email \
  --event-source-arn "$EMAIL_QUEUE_ARN" \
  --batch-size 5 2>/dev/null || true

echo "==> 4/5: Empaquetando y deployando lambda-stock"
pushd lambdas/stock > /dev/null
zip -qr function.zip .
popd > /dev/null

aws lambda create-function \
  --function-name $APP_NAME-stock \
  --runtime nodejs20.x \
  --role "$WORKER_ROLE" \
  --handler index.handler \
  --zip-file fileb://lambdas/stock/function.zip 2>/dev/null || \
  aws lambda update-function-code \
    --function-name $APP_NAME-stock \
    --zip-file fileb://lambdas/stock/function.zip > /dev/null

aws lambda create-event-source-mapping \
  --function-name $APP_NAME-stock \
  --event-source-arn "$STOCK_QUEUE_ARN" \
  --batch-size 5 2>/dev/null || true

echo "==> 5/5: Creando HTTP API"
API_ID=$(aws apigatewayv2 create-api \
  --name $APP_NAME-api \
  --protocol-type HTTP \
  --target "arn:aws:lambda:us-east-1:000000000000:function:$APP_NAME-api" \
  --query ApiId --output text 2>/dev/null) || \
  API_ID=$(aws apigatewayv2 get-apis --query "Items[?Name=='$APP_NAME-api'].ApiId" --output text)

aws lambda add-permission \
  --function-name $APP_NAME-api \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-1:000000000000:$API_ID/*/*" 2>/dev/null || true

echo ""
echo "==> Deploy completo"
echo "API ID: $API_ID"
echo "Base URL: http://localhost:4566/_aws/execute-api/$API_ID"
```

Para correrlo:

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

> 💡 Si vas a Windows con PowerShell, podés correrlo en Git Bash o WSL.

---

## 9. Paso 7 — Script de prueba

`scripts/test.sh`:

```bash
#!/usr/bin/env bash
set -e

API_ID=$(aws apigatewayv2 get-apis --query "Items[?Name=='pedidos-api'].ApiId" --output text)
BASE="http://localhost:4566/_aws/execute-api/$API_ID"

echo "==> Crear pedido"
PEDIDO=$(curl -s -X POST "$BASE/pedidos" \
  -H "Content-Type: application/json" \
  -d '{
    "cliente": "Thomas",
    "items": [
      {"nombre": "Teclado", "cantidad": 1, "precio": 120},
      {"nombre": "Mouse", "cantidad": 2, "precio": 30}
    ]
  }')
echo "$PEDIDO" | python3 -m json.tool

PEDIDO_ID=$(echo "$PEDIDO" | python3 -c "import sys,json;print(json.load(sys.stdin)['id'])")
echo ""
echo "Pedido ID: $PEDIDO_ID"

sleep 3

echo ""
echo "==> Verificar en DynamoDB"
aws dynamodb get-item \
  --table-name pedidos-pedidos \
  --key "{\"id\": {\"S\": \"$PEDIDO_ID\"}}"

echo ""
echo "==> Verificar recibo en S3"
aws s3 cp s3://pedidos-recibos/recibos/$PEDIDO_ID.txt -

echo ""
echo "==> Logs de la Lambda de email"
aws logs tail /aws/lambda/pedidos-email --since 1m

echo ""
echo "==> Logs de la Lambda de stock"
aws logs tail /aws/lambda/pedidos-stock --since 1m

echo ""
echo "==> Listar pedidos"
curl -s "$BASE/pedidos" | python3 -m json.tool
```

---

## 10. Paso 8 — Checklist de verificación

Después del deploy, asegurate de que:

- [ ] El stack se creó: `aws cloudformation describe-stacks --stack-name pedidos-stack`
- [ ] La tabla DynamoDB existe: `aws dynamodb describe-table --table-name pedidos-pedidos`
- [ ] El bucket S3 existe: `aws s3 ls`
- [ ] El topic SNS existe: `aws sns list-topics`
- [ ] Las dos colas SQS existen y están subscriptas al topic: `aws sns list-subscriptions-by-topic --topic-arn <ARN>`
- [ ] Las tres Lambdas existen: `aws lambda list-functions`
- [ ] Las event source mappings existen: `aws lambda list-event-source-mappings`
- [ ] La HTTP API responde: probar con `curl`.

---

## 11. Paso 9 — Limpieza

```bash
# Borrar Lambdas
aws lambda delete-function --function-name pedidos-api
aws lambda delete-function --function-name pedidos-email
aws lambda delete-function --function-name pedidos-stock

# Borrar event source mappings
aws lambda list-event-source-mappings --query 'EventSourceMappings[].UUID' --output text | \
  xargs -I {} aws lambda delete-event-source-mapping --uuid {}

# Borrar HTTP API
API_ID=$(aws apigatewayv2 get-apis --query "Items[?Name=='pedidos-api'].ApiId" --output text)
aws apigatewayv2 delete-api --api-id "$API_ID"

# Borrar contenido del bucket (CloudFormation no borra buckets con contenido)
aws s3 rm s3://pedidos-recibos --recursive

# Borrar el stack
aws cloudformation delete-stack --stack-name pedidos-stack
```

---

## 12. Ideas para extender (challenges)

Si terminaste el proyecto y querés practicar más, ideas:

1. **Agregar autenticación** con Cognito JWT.
2. **Agregar una DLQ** a las colas para mensajes problemáticos.
3. **Agregar un cron** que limpia pedidos viejos (con EventBridge Scheduler).
4. **Reemplazar S3 por RDS** para guardar recibos como filas en una tabla.
5. **Agregar Step Functions** para coordinar un flujo más complejo (pago → stock → envío).
6. **Agregar KMS** para encriptar los datos sensibles.
7. **Usar SAM** en lugar de plain CloudFormation para reducir boilerplate.

---

## 13. Lo que practicaste

Acabás de pasar por **todos los conceptos clave** del Cloud Practitioner y ver cómo se integran:

- IAM roles para permisos por servicio.
- S3 para storage.
- DynamoDB para datos NoSQL.
- SNS + SQS para fan-out async.
- Lambda como compute.
- API Gateway como front HTTP.
- CloudWatch Logs automáticos.
- CloudFormation para todo declarativo y reproducible.

Si esto lo tenés claro, el examen va a ser mucho más fácil — la diferencia entre **estudiar AWS** y **vivir AWS**.

---

## Próximo paso

Andá al [`15-quiz-final.md`](./15-quiz-final.md) para el quiz final integrador del curso.
