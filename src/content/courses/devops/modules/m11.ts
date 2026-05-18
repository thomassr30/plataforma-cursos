import type { ModuleData } from "@/types/course";

// Laboratorio práctico: app real con Kubernetes local en Windows
// Backend 1 (Tareas) → NestJS + PostgreSQL (Prisma)
// Backend 2 (Imágenes) → NestJS + MongoDB (Mongoose) + MinIO
// Orquestador → Docker Desktop con Kubernetes habilitado
export const m11: ModuleData = {
  slug: "m11",
  number: 11,
  title: "🧪 Laboratorio Práctico: App Real con Kubernetes en Windows",
  icon: "🧪",
  intro:
    "En este laboratorio MASIVO vamos a montar una app REAL completa en Kubernetes local: frontend en Angular 21, 2 backends en NestJS (uno con PostgreSQL para tareas y otro con MongoDB + MinIO para imágenes), todo orquestado con K8s en Docker Desktop. Desde cero, paso a paso. Al terminar entenderás Pods, Deployments, Services, ConfigMaps, Secrets, PVC, StatefulSets, Ingress, frontend SPA en NGINX, y cómo todo se conecta.",
  totalActivities: 5,
  blocks: [
    // ============================================
    // INTRO Y ARQUITECTURA
    // ============================================
    { kind: "h3", text: "🎯 ¿Qué vamos a construir?" },
    {
      kind: "info",
      html:
        "<strong>App de gestión de tareas con imágenes</strong>:<br/><br/>" +
        "🅰️ <strong>Frontend (Angular 21)</strong>: SPA donde el usuario gestiona tareas y sube imágenes<br/>" +
        "📝 <strong>Backend 1 (Tareas API)</strong>: NestJS + PostgreSQL → CRUD de tareas<br/>" +
        "🖼️ <strong>Backend 2 (Imágenes API)</strong>: NestJS + MongoDB + MinIO → subir/cambiar/borrar imágenes de tareas<br/>" +
        "🗄️ <strong>PostgreSQL</strong>: persistencia de las tareas<br/>" +
        "🍃 <strong>MongoDB</strong>: metadatos de las imágenes (nombre, tamaño, tarea_id, fecha)<br/>" +
        "📦 <strong>MinIO</strong>: storage S3-compatible local para los archivos físicos<br/>" +
        "☸️ <strong>Kubernetes</strong>: orquesta todo<br/>" +
        "🚪 <strong>NGINX Ingress</strong>: enruta el tráfico HTTP a frontend y APIs",
    },
    { kind: "h4", text: "Diagrama de arquitectura" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>" +
        "                          [ NGINX Ingress ]\n" +
        "                                |\n" +
        "         +----------------------+----------------------+\n" +
        "         |                      |                      |\n" +
        "  [ Frontend (Svc) ]    [ Tareas API (Svc) ]    [ Imágenes API (Svc) ]\n" +
        "  Angular + NGINX       replicas: 2             replicas: 2\n" +
        "                            |                      |\n" +
        "                            v                      v\n" +
        "                  [ PostgreSQL (StatefulSet) ]  [ MongoDB (StatefulSet) ]\n" +
        "                                                   |\n" +
        "                                                   v\n" +
        "                                          [ MinIO (Deployment) ]\n" +
        "                                                   |\n" +
        "                                                   v\n" +
        "                                          [ PVC (storage físico) ]\n" +
        "</pre>",
    },

    // ============================================
    // PARTE 1: PREREQUISITOS
    // ============================================
    { kind: "h3", text: "🔧 PARTE 1: Prerequisitos e Instalación en Windows" },
    { kind: "h4", text: "1.1 Instalar WSL 2 (Windows Subsystem for Linux)" },
    {
      kind: "paragraph",
      html:
        "Docker Desktop requiere WSL2 para correr Linux containers. Abre <strong>PowerShell como Administrador</strong> y ejecuta:",
    },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>wsl --install\nwsl --set-default-version 2</pre>",
    },
    {
      kind: "tip",
      html: "Si te pide reiniciar, hazlo. Luego abre la app Ubuntu desde el menú inicio para configurar tu usuario WSL.",
    },
    { kind: "h4", text: "1.2 Instalar Docker Desktop" },
    {
      kind: "list",
      items: [
        "Descarga desde: <code>https://www.docker.com/products/docker-desktop/</code>",
        "Instalador → <strong>Use WSL 2 instead of Hyper-V</strong> (marcado)",
        "Tras instalación, reinicia",
        "Abre Docker Desktop. Espera a que diga 'Docker is running'",
      ],
    },
    { kind: "h4", text: "1.3 Habilitar Kubernetes en Docker Desktop" },
    {
      kind: "list",
      items: [
        "Docker Desktop → ⚙️ <strong>Settings</strong> → <strong>Kubernetes</strong>",
        "✅ Marca <strong>Enable Kubernetes</strong>",
        "Click <strong>Apply & Restart</strong>",
        "Espera 2-3 minutos (descarga las imágenes y crea el cluster)",
        "Verás un círculo verde junto a 'Kubernetes is running' abajo a la izquierda",
      ],
    },
    { kind: "h4", text: "1.4 Verificar instalación" },
    {
      kind: "paragraph",
      html: "Abre <strong>PowerShell</strong> (no admin) y ejecuta:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Verificar Docker\ndocker --version\ndocker ps\n\n# Verificar kubectl (viene con Docker Desktop)\nkubectl version --client\nkubectl get nodes\n\n# Deberías ver algo como:\n# NAME             STATUS   ROLES           AGE   VERSION\n# docker-desktop   Ready    control-plane   2m    v1.30.x</pre>",
    },
    { kind: "h4", text: "1.5 Instalar Node.js (LTS)" },
    {
      kind: "list",
      items: [
        "Descarga desde <code>https://nodejs.org/</code> (versión <strong>LTS</strong>)",
        "Instalador → Next, Next, Install (todo por defecto)",
        "Verifica: <code>node -v</code> y <code>npm -v</code>",
      ],
    },
    { kind: "h4", text: "1.6 Instalar NestJS y Angular CLI globalmente" },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>npm install -g @nestjs/cli\nnest --version\n\nnpm install -g @angular/cli@21\nng version</pre>",
    },
    { kind: "h4", text: "1.7 Instalar herramientas auxiliares" },
    {
      kind: "list",
      items: [
        "<strong>VS Code</strong>: editor de código (<code>https://code.visualstudio.com</code>)",
        "<strong>Postman o Thunder Client</strong> (extensión VS Code): probar APIs",
        "<strong>Lens</strong> o <strong>k9s</strong> (opcional): UI para K8s",
      ],
    },
    { kind: "h4", text: "1.8 Instalar NGINX Ingress Controller" },
    {
      kind: "paragraph",
      html: "El Ingress es el 'portero' que enruta tráfico HTTP en K8s. Lo necesitamos para acceder a las APIs:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.2/deploy/static/provider/cloud/deploy.yaml\n\n# Verificar (espera 1 min):\nkubectl get pods -n ingress-nginx\n\n# Debe estar Running\n# ingress-nginx-controller-...   1/1   Running</pre>",
    },

    // ============================================
    // PARTE 2: CONCEPTOS BÁSICOS K8S
    // ============================================
    { kind: "h3", text: "📚 PARTE 2: Conceptos Esenciales de Kubernetes" },
    {
      kind: "table",
      headers: ["Recurso", "Para qué sirve"],
      rows: [
        ["Pod", "La unidad MÍNIMA. Uno o más containers que comparten red y storage."],
        ["Deployment", "Define replicas de Pods + estrategia de actualización (rolling update)."],
        ["StatefulSet", "Como Deployment pero con identidad estable y storage persistente. Ideal para bases de datos."],
        ["Service", "Endpoint estable. Expone Pods (ClusterIP interno, NodePort externo, LoadBalancer cloud)."],
        ["Ingress", "Reglas HTTP/HTTPS para enrutar tráfico externo a Services."],
        ["ConfigMap", "Configuración (variables NO sensibles) como pares clave/valor."],
        ["Secret", "Datos SENSIBLES (passwords, tokens) encriptados en base64."],
        ["PersistentVolume (PV)", "Disco físico provisionado en el cluster."],
        ["PersistentVolumeClaim (PVC)", "Solicitud de un PV por parte de un Pod."],
        ["Namespace", "Espacio lógico para separar recursos."],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Regla general:</strong><br/>" +
        "• Backend stateless (NestJS) → <strong>Deployment</strong><br/>" +
        "• Base de datos (PostgreSQL, MongoDB) → <strong>StatefulSet</strong><br/>" +
        "• Acceso externo HTTP → <strong>Ingress</strong> + <strong>Service</strong><br/>" +
        "• Config no sensible → <strong>ConfigMap</strong><br/>" +
        "• Passwords/tokens → <strong>Secret</strong><br/>" +
        "• Storage persistente → <strong>PVC</strong>",
    },

    // ============================================
    // PARTE 3: BACKEND 1 - TAREAS API
    // ============================================
    { kind: "h3", text: "📝 PARTE 3: Backend 1 - Tareas API (NestJS + PostgreSQL)" },
    { kind: "h4", text: "3.1 Crear estructura de carpetas" },
    {
      kind: "paragraph",
      html: "Crea una carpeta raíz y dentro las carpetas por servicio:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>mkdir C:\\Lab-K8s\ncd C:\\Lab-K8s\nmkdir tareas-api\nmkdir imagenes-api\nmkdir frontend\nmkdir k8s</pre>",
    },
    { kind: "h4", text: "3.2 Generar proyecto NestJS" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>cd C:\\Lab-K8s\\tareas-api\nnest new . --skip-git --package-manager npm\n# Cuando pregunte 'Which package manager would you like to use?' → npm\n# Espera a que instale...</pre>",
    },
    { kind: "h4", text: "3.3 Instalar Prisma + cliente PostgreSQL" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>npm install prisma --save-dev\nnpm install @prisma/client\nnpx prisma init</pre>",
    },
    { kind: "h4", text: "3.4 Definir el schema de Prisma" },
    {
      kind: "paragraph",
      html: "Edita <code>prisma/schema.prisma</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>generator client {\n  provider = \"prisma-client-js\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel Task {\n  id          String   @id @default(uuid())\n  title       String\n  description String?\n  done        Boolean  @default(false)\n  imageId     String?  // referencia opcional a la imagen en MongoDB\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n}</pre>",
    },
    { kind: "h4", text: "3.5 Crear el módulo de tareas" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>nest g module tasks\nnest g controller tasks\nnest g service tasks</pre>",
    },
    { kind: "h4", text: "3.6 Código: src/prisma/prisma.service.ts" },
    {
      kind: "paragraph",
      html: "Crea la carpeta <code>src/prisma</code> y dentro el archivo <code>prisma.service.ts</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Injectable, OnModuleInit } from '@nestjs/common';\nimport { PrismaClient } from '@prisma/client';\n\n@Injectable()\nexport class PrismaService extends PrismaClient implements OnModuleInit {\n  async onModuleInit() {\n    await this.$connect();\n  }\n}</pre>",
    },
    { kind: "h4", text: "3.7 Código: src/tasks/tasks.service.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Injectable, NotFoundException } from '@nestjs/common';\nimport { PrismaService } from '../prisma/prisma.service';\n\n@Injectable()\nexport class TasksService {\n  constructor(private prisma: PrismaService) {}\n\n  async findAll() {\n    return this.prisma.task.findMany({ orderBy: { createdAt: 'desc' } });\n  }\n\n  async findOne(id: string) {\n    const task = await this.prisma.task.findUnique({ where: { id } });\n    if (!task) throw new NotFoundException(`Task ${id} not found`);\n    return task;\n  }\n\n  async create(data: { title: string; description?: string; imageId?: string }) {\n    return this.prisma.task.create({ data });\n  }\n\n  async update(id: string, data: any) {\n    await this.findOne(id);\n    return this.prisma.task.update({ where: { id }, data });\n  }\n\n  async remove(id: string) {\n    await this.findOne(id);\n    return this.prisma.task.delete({ where: { id } });\n  }\n}</pre>",
    },
    { kind: "h4", text: "3.8 Código: src/tasks/tasks.controller.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';\nimport { TasksService } from './tasks.service';\n\n@Controller('tasks')\nexport class TasksController {\n  constructor(private readonly tasksService: TasksService) {}\n\n  @Get()\n  findAll() {\n    return this.tasksService.findAll();\n  }\n\n  @Get(':id')\n  findOne(@Param('id') id: string) {\n    return this.tasksService.findOne(id);\n  }\n\n  @Post()\n  create(@Body() body: { title: string; description?: string; imageId?: string }) {\n    return this.tasksService.create(body);\n  }\n\n  @Patch(':id')\n  update(@Param('id') id: string, @Body() body: any) {\n    return this.tasksService.update(id, body);\n  }\n\n  @Delete(':id')\n  remove(@Param('id') id: string) {\n    return this.tasksService.remove(id);\n  }\n}</pre>",
    },
    { kind: "h4", text: "3.9 Código: src/tasks/tasks.module.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Module } from '@nestjs/common';\nimport { TasksController } from './tasks.controller';\nimport { TasksService } from './tasks.service';\nimport { PrismaService } from '../prisma/prisma.service';\n\n@Module({\n  controllers: [TasksController],\n  providers: [TasksService, PrismaService],\n})\nexport class TasksModule {}</pre>",
    },
    { kind: "h4", text: "3.10 Código: src/app.module.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Module } from '@nestjs/common';\nimport { TasksModule } from './tasks/tasks.module';\n\n@Module({\n  imports: [TasksModule],\n})\nexport class AppModule {}</pre>",
    },
    { kind: "h4", text: "3.11 Código: src/main.ts (ajustar puerto)" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { NestFactory } from '@nestjs/core';\nimport { AppModule } from './app.module';\n\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n  app.enableCors();\n  app.setGlobalPrefix('api');\n  await app.listen(process.env.PORT || 3000);\n  console.log(`🚀 Tareas API escuchando en puerto ${process.env.PORT || 3000}`);\n}\nbootstrap();</pre>",
    },
    { kind: "h4", text: "3.12 Probar localmente (opcional, antes de Docker)" },
    {
      kind: "paragraph",
      html: "Para probar local primero, necesitas PostgreSQL corriendo. Más adelante todo va en K8s; este paso es opcional.",
    },

    // ============================================
    // PARTE 4: BACKEND 2 - IMÁGENES API
    // ============================================
    { kind: "h3", text: "🖼️ PARTE 4: Backend 2 - Imágenes API (NestJS + MongoDB + MinIO)" },
    { kind: "h4", text: "4.1 Generar proyecto" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>cd C:\\Lab-K8s\\imagenes-api\nnest new . --skip-git --package-manager npm</pre>",
    },
    { kind: "h4", text: "4.2 Instalar dependencias" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>npm install @nestjs/mongoose mongoose\nnpm install minio\nnpm install @nestjs/platform-express\nnpm install -D @types/multer</pre>",
    },
    { kind: "h4", text: "4.3 Código: src/images/image.schema.ts" },
    {
      kind: "paragraph",
      html: "Crea la carpeta <code>src/images</code> y dentro <code>image.schema.ts</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';\nimport { Document } from 'mongoose';\n\n@Schema({ timestamps: true })\nexport class Image extends Document {\n  @Prop({ required: true })\n  objectKey: string;\n\n  @Prop({ required: true })\n  filename: string;\n\n  @Prop({ required: true })\n  mimeType: string;\n\n  @Prop({ required: true })\n  size: number;\n\n  @Prop()\n  taskId: string;\n}\n\nexport const ImageSchema = SchemaFactory.createForClass(Image);</pre>",
    },
    { kind: "h4", text: "4.4 Código: src/minio/minio.service.ts" },
    {
      kind: "paragraph",
      html: "Crea la carpeta <code>src/minio</code> y dentro <code>minio.service.ts</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Injectable, OnModuleInit } from '@nestjs/common';\nimport * as Minio from 'minio';\n\n@Injectable()\nexport class MinioService implements OnModuleInit {\n  private client: Minio.Client;\n  private bucket = process.env.MINIO_BUCKET || 'images';\n\n  async onModuleInit() {\n    this.client = new Minio.Client({\n      endPoint: process.env.MINIO_ENDPOINT || 'localhost',\n      port: parseInt(process.env.MINIO_PORT || '9000'),\n      useSSL: false,\n      accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',\n      secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',\n    });\n\n    // Crear bucket si no existe\n    const exists = await this.client.bucketExists(this.bucket).catch(() => false);\n    if (!exists) {\n      await this.client.makeBucket(this.bucket, 'us-east-1');\n      console.log(`✅ Bucket '${this.bucket}' creado`);\n    }\n  }\n\n  async uploadObject(key: string, buffer: Buffer, mimeType: string) {\n    await this.client.putObject(this.bucket, key, buffer, buffer.length, {\n      'Content-Type': mimeType,\n    });\n  }\n\n  async deleteObject(key: string) {\n    await this.client.removeObject(this.bucket, key);\n  }\n\n  async getPresignedUrl(key: string, expirySeconds = 3600): Promise&lt;string&gt; {\n    return this.client.presignedGetObject(this.bucket, key, expirySeconds);\n  }\n}</pre>",
    },
    { kind: "h4", text: "4.5 Código: src/minio/minio.module.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Module } from '@nestjs/common';\nimport { MinioService } from './minio.service';\n\n@Module({\n  providers: [MinioService],\n  exports: [MinioService],\n})\nexport class MinioModule {}</pre>",
    },
    { kind: "h4", text: "4.6 Código: src/images/images.service.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Injectable, NotFoundException } from '@nestjs/common';\nimport { InjectModel } from '@nestjs/mongoose';\nimport { Model } from 'mongoose';\nimport { v4 as uuidv4 } from 'uuid';\nimport { Image } from './image.schema';\nimport { MinioService } from '../minio/minio.service';\n\n@Injectable()\nexport class ImagesService {\n  constructor(\n    @InjectModel(Image.name) private imageModel: Model&lt;Image&gt;,\n    private minio: MinioService,\n  ) {}\n\n  async upload(file: Express.Multer.File, taskId?: string) {\n    const objectKey = `${uuidv4()}-${file.originalname}`;\n    await this.minio.uploadObject(objectKey, file.buffer, file.mimetype);\n    const image = await this.imageModel.create({\n      objectKey,\n      filename: file.originalname,\n      mimeType: file.mimetype,\n      size: file.size,\n      taskId,\n    });\n    return image;\n  }\n\n  async findAll() {\n    return this.imageModel.find().sort({ createdAt: -1 }).limit(50);\n  }\n\n  async findOne(id: string) {\n    const image = await this.imageModel.findById(id);\n    if (!image) throw new NotFoundException(`Image ${id} not found`);\n    return image;\n  }\n\n  async getUrl(id: string) {\n    const image = await this.findOne(id);\n    const url = await this.minio.getPresignedUrl(image.objectKey);\n    return { url };\n  }\n\n  async replace(id: string, file: Express.Multer.File) {\n    const image = await this.findOne(id);\n    await this.minio.deleteObject(image.objectKey);\n    const newKey = `${uuidv4()}-${file.originalname}`;\n    await this.minio.uploadObject(newKey, file.buffer, file.mimetype);\n    image.objectKey = newKey;\n    image.filename = file.originalname;\n    image.mimeType = file.mimetype;\n    image.size = file.size;\n    await image.save();\n    return image;\n  }\n\n  async remove(id: string) {\n    const image = await this.findOne(id);\n    await this.minio.deleteObject(image.objectKey);\n    await image.deleteOne();\n    return { deleted: true };\n  }\n}</pre>",
    },
    { kind: "h4", text: "4.7 Código: src/images/images.controller.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import {\n  Body, Controller, Delete, Get, Param, Post, Put,\n  UploadedFile, UseInterceptors,\n} from '@nestjs/common';\nimport { FileInterceptor } from '@nestjs/platform-express';\nimport { ImagesService } from './images.service';\n\n@Controller('images')\nexport class ImagesController {\n  constructor(private readonly imagesService: ImagesService) {}\n\n  @Post('upload')\n  @UseInterceptors(FileInterceptor('file'))\n  upload(\n    @UploadedFile() file: Express.Multer.File,\n    @Body('taskId') taskId?: string,\n  ) {\n    return this.imagesService.upload(file, taskId);\n  }\n\n  @Get()\n  findAll() {\n    return this.imagesService.findAll();\n  }\n\n  @Get(':id')\n  findOne(@Param('id') id: string) {\n    return this.imagesService.findOne(id);\n  }\n\n  @Get(':id/url')\n  getUrl(@Param('id') id: string) {\n    return this.imagesService.getUrl(id);\n  }\n\n  @Put(':id')\n  @UseInterceptors(FileInterceptor('file'))\n  replace(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {\n    return this.imagesService.replace(id, file);\n  }\n\n  @Delete(':id')\n  remove(@Param('id') id: string) {\n    return this.imagesService.remove(id);\n  }\n}</pre>",
    },
    { kind: "h4", text: "4.8 Código: src/images/images.module.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Module } from '@nestjs/common';\nimport { MongooseModule } from '@nestjs/mongoose';\nimport { ImagesController } from './images.controller';\nimport { ImagesService } from './images.service';\nimport { Image, ImageSchema } from './image.schema';\nimport { MinioModule } from '../minio/minio.module';\n\n@Module({\n  imports: [\n    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),\n    MinioModule,\n  ],\n  controllers: [ImagesController],\n  providers: [ImagesService],\n})\nexport class ImagesModule {}</pre>",
    },
    { kind: "h4", text: "4.9 Código: src/app.module.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Module } from '@nestjs/common';\nimport { MongooseModule } from '@nestjs/mongoose';\nimport { ImagesModule } from './images/images.module';\n\n@Module({\n  imports: [\n    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/images'),\n    ImagesModule,\n  ],\n})\nexport class AppModule {}</pre>",
    },
    { kind: "h4", text: "4.10 Instalar uuid" },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>npm install uuid\nnpm install -D @types/uuid</pre>",
    },
    { kind: "h4", text: "4.11 main.ts (puerto 3001)" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { NestFactory } from '@nestjs/core';\nimport { AppModule } from './app.module';\n\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n  app.enableCors();\n  app.setGlobalPrefix('api');\n  await app.listen(process.env.PORT || 3000);\n  console.log(`🖼️ Imágenes API escuchando en puerto ${process.env.PORT || 3000}`);\n}\nbootstrap();</pre>",
    },

    // ============================================
    // PARTE 4.5: FRONTEND ANGULAR 21
    // ============================================
    { kind: "h3", text: "🅰️ PARTE 4.5: Frontend Angular 21 (SPA) con Signal Forms" },
    {
      kind: "paragraph",
      html:
        "Construiremos una SPA en <strong>Angular 21</strong> usando lo más moderno del framework: <strong>standalone components</strong>, <strong>signals</strong> para el estado, <strong>Signal Forms</strong> (la nueva API de formularios reactivos basada en signals) y <strong>control flow nativo</strong> (<code>@if</code>, <code>@for</code>).",
    },
    { kind: "h4", text: "4.5.1 Generar proyecto Angular" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>cd C:\\Lab-K8s\\frontend\nng new lab-app --routing=true --style=scss --skip-git --ssr=false\n# Cuando pregunte 'Which stylesheet format' → SCSS\n# 'Do you want to enable Server-Side Rendering (SSR)' → No\n\ncd lab-app</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 ¿Por qué SSR desactivado?</strong> Para K8s nos conviene una SPA estática servida por NGINX. SSR requiere Node.js corriendo y complica el deploy. Para este lab SPA es lo correcto.",
    },
    { kind: "h4", text: "4.5.2 Estructura de archivos que crearemos" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>frontend/lab-app/\n├── src/\n│   ├── environments/\n│   │   ├── environment.ts\n│   │   └── environment.prod.ts\n│   ├── app/\n│   │   ├── app.component.ts\n│   │   ├── app.config.ts\n│   │   ├── app.routes.ts\n│   │   ├── services/\n│   │   │   ├── tasks.service.ts\n│   │   │   └── images.service.ts\n│   │   └── pages/\n│   │       └── tasks/\n│   │           └── tasks.component.ts\n├── nginx.conf\n└── Dockerfile</pre>",
    },
    { kind: "h4", text: "4.5.3 Crear environments" },
    {
      kind: "paragraph",
      html: "Crea la carpeta <code>src/environments</code>. Archivo <code>src/environments/environment.ts</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>export const environment = {\n  production: false,\n  tareasApi: '/api/tasks',\n  imagenesApi: '/api/images',\n};</pre>",
    },
    {
      kind: "paragraph",
      html: "Archivo <code>src/environments/environment.prod.ts</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>export const environment = {\n  production: true,\n  tareasApi: '/api/tasks',\n  imagenesApi: '/api/images',\n};</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡</strong> Como Ingress sirve frontend y APIs bajo el mismo dominio (<code>lab.localhost</code>), usamos rutas relativas <code>/api/...</code>. <strong>Cero problemas de CORS.</strong>",
    },
    { kind: "h4", text: "4.5.4 Configurar HttpClient: src/app/app.config.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';\nimport { provideRouter } from '@angular/router';\nimport { provideHttpClient } from '@angular/common/http';\n\nimport { routes } from './app.routes';\n\nexport const appConfig: ApplicationConfig = {\n  providers: [\n    provideZoneChangeDetection({ eventCoalescing: true }),\n    provideRouter(routes),\n    provideHttpClient(),\n  ],\n};</pre>",
    },
    { kind: "h4", text: "4.5.5 Tipos compartidos: src/app/models/task.model.ts" },
    {
      kind: "paragraph",
      html: "Crea la carpeta <code>src/app/models</code> y dentro:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>export interface Task {\n  id: string;\n  title: string;\n  description?: string;\n  done: boolean;\n  imageId?: string;\n  createdAt: string;\n  updatedAt: string;\n}\n\nexport interface ImageMeta {\n  _id: string;\n  objectKey: string;\n  filename: string;\n  mimeType: string;\n  size: number;\n  taskId?: string;\n}</pre>",
    },
    { kind: "h4", text: "4.5.6 Tasks Service: src/app/services/tasks.service.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Injectable, inject } from '@angular/core';\nimport { HttpClient } from '@angular/common/http';\nimport { Observable } from 'rxjs';\nimport { environment } from '../../environments/environment';\nimport { Task } from '../models/task.model';\n\n@Injectable({ providedIn: 'root' })\nexport class TasksService {\n  private http = inject(HttpClient);\n  private api = environment.tareasApi;\n\n  list(): Observable&lt;Task[]&gt; {\n    return this.http.get&lt;Task[]&gt;(this.api);\n  }\n\n  create(data: Partial&lt;Task&gt;): Observable&lt;Task&gt; {\n    return this.http.post&lt;Task&gt;(this.api, data);\n  }\n\n  update(id: string, data: Partial&lt;Task&gt;): Observable&lt;Task&gt; {\n    return this.http.patch&lt;Task&gt;(`${this.api}/${id}`, data);\n  }\n\n  remove(id: string): Observable&lt;Task&gt; {\n    return this.http.delete&lt;Task&gt;(`${this.api}/${id}`);\n  }\n}</pre>",
    },
    { kind: "h4", text: "4.5.7 Images Service: src/app/services/images.service.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Injectable, inject } from '@angular/core';\nimport { HttpClient } from '@angular/common/http';\nimport { Observable } from 'rxjs';\nimport { environment } from '../../environments/environment';\nimport { ImageMeta } from '../models/task.model';\n\n@Injectable({ providedIn: 'root' })\nexport class ImagesService {\n  private http = inject(HttpClient);\n  private api = environment.imagenesApi;\n\n  upload(file: File, taskId?: string): Observable&lt;ImageMeta&gt; {\n    const fd = new FormData();\n    fd.append('file', file);\n    if (taskId) fd.append('taskId', taskId);\n    return this.http.post&lt;ImageMeta&gt;(`${this.api}/upload`, fd);\n  }\n\n  getUrl(id: string): Observable&lt;{ url: string }&gt; {\n    return this.http.get&lt;{ url: string }&gt;(`${this.api}/${id}/url`);\n  }\n\n  replace(id: string, file: File): Observable&lt;ImageMeta&gt; {\n    const fd = new FormData();\n    fd.append('file', file);\n    return this.http.put&lt;ImageMeta&gt;(`${this.api}/${id}`, fd);\n  }\n\n  remove(id: string): Observable&lt;{ deleted: boolean }&gt; {\n    return this.http.delete&lt;{ deleted: boolean }&gt;(`${this.api}/${id}`);\n  }\n}</pre>",
    },
    { kind: "h4", text: "4.5.8 Generar componente Tasks" },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>ng generate component pages/tasks --standalone</pre>",
    },
    { kind: "h4", text: "4.5.9 Signal Forms — la nueva API de formularios de Angular 21" },
    {
      kind: "paragraph",
      html:
        "Angular 21 introduce <strong>Signal Forms</strong>: una API de formularios construida sobre signals, completamente reactiva, type-safe y sin <code>ngModel</code> ni <code>FormBuilder</code>. El estado del formulario ES un signal, los validadores son funciones puras, y los errores se actualizan automáticamente.",
    },
    {
      kind: "list",
      items: [
        "🟢 <strong>Modelo único:</strong> el formulario se construye desde un <code>signal()</code> con los datos.",
        "🟢 <strong>Validación declarativa:</strong> <code>required()</code>, <code>minLength()</code>, <code>email()</code>, <code>customError()</code> dentro de un schema.",
        "🟢 <strong>Type-safe:</strong> TypeScript infiere los nombres de los campos.",
        "🟢 <strong>Sin módulos:</strong> solo importas <code>Control</code> en el component, no más <code>FormsModule</code> ni <code>ReactiveFormsModule</code>.",
        "🟢 <strong>Acceso al estado:</strong> <code>form.title().valid()</code>, <code>.errors()</code>, <code>.touched()</code>, <code>.dirty()</code> — todos signals.",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 ¿Qué cambia respecto a Reactive Forms?</strong> Antes hacías <code>new FormGroup({ title: new FormControl('', [Validators.required]) })</code>. Ahora: <code>form(signal({title: ''}), (f) =&gt; required(f.title))</code>. Mucho más declarativo y reactivo.",
    },
    { kind: "h4", text: "4.5.10 Tasks Component con Signal Forms: src/app/pages/tasks/tasks.component.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Component, inject, signal, OnInit } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { form, Control, required, minLength } from '@angular/forms/signals';\nimport { TasksService } from '../../services/tasks.service';\nimport { ImagesService } from '../../services/images.service';\nimport { Task } from '../../models/task.model';\n\ninterface NewTaskModel {\n  title: string;\n  description: string;\n}\n\n@Component({\n  selector: 'app-tasks',\n  standalone: true,\n  imports: [CommonModule, Control],\n  templateUrl: './tasks.component.html',\n  styleUrl: './tasks.component.scss',\n})\nexport class TasksComponent implements OnInit {\n  private tasksSvc = inject(TasksService);\n  private imagesSvc = inject(ImagesService);\n\n  // Estado reactivo\n  tasks = signal&lt;Task[]&gt;([]);\n  imageUrls = signal&lt;Record&lt;string, string&gt;&gt;({});\n  loading = signal(false);\n\n  // 🆕 Signal Forms — el modelo es un signal\n  protected readonly newTaskModel = signal&lt;NewTaskModel&gt;({\n    title: '',\n    description: '',\n  });\n\n  // 🆕 Form schema con validadores declarativos\n  protected readonly newTaskForm = form(this.newTaskModel, (f) =&gt; {\n    required(f.title, { message: 'El título es obligatorio' });\n    minLength(f.title, 3, { message: 'Mínimo 3 caracteres' });\n  });\n\n  ngOnInit() { this.load(); }\n\n  load() {\n    this.loading.set(true);\n    this.tasksSvc.list().subscribe({\n      next: (rows) =&gt; {\n        this.tasks.set(rows);\n        rows.forEach((t) =&gt; {\n          if (t.imageId) {\n            this.imagesSvc.getUrl(t.imageId).subscribe(({ url }) =&gt;\n              this.imageUrls.update((m) =&gt; ({ ...m, [t.id]: url }))\n            );\n          }\n        });\n      },\n      complete: () =&gt; this.loading.set(false),\n    });\n  }\n\n  add() {\n    // ✅ Validación reactiva: el form sabe si es válido\n    if (this.newTaskForm().invalid()) {\n      // Marca todos los campos como touched para mostrar errores\n      this.newTaskForm().markAllAsTouched();\n      return;\n    }\n\n    const data = this.newTaskModel();\n    this.tasksSvc.create({ title: data.title.trim(), description: data.description }).subscribe(() =&gt; {\n      // Reset del signal del modelo\n      this.newTaskModel.set({ title: '', description: '' });\n      this.newTaskForm().reset();\n      this.load();\n    });\n  }\n\n  toggle(t: Task) {\n    this.tasksSvc.update(t.id, { done: !t.done }).subscribe(() =&gt; this.load());\n  }\n\n  remove(t: Task) {\n    if (!confirm(`¿Eliminar '${t.title}'?`)) return;\n    this.tasksSvc.remove(t.id).subscribe(() =&gt; this.load());\n  }\n\n  uploadImage(t: Task, event: Event) {\n    const file = (event.target as HTMLInputElement).files?.[0];\n    if (!file) return;\n    this.imagesSvc.upload(file, t.id).subscribe((img) =&gt; {\n      this.tasksSvc.update(t.id, { imageId: img._id }).subscribe(() =&gt; this.load());\n    });\n  }\n}</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>🔍 Anatomía del Signal Form:</strong><br/>" +
        "• <code>newTaskModel</code> = signal con los datos (la fuente de verdad).<br/>" +
        "• <code>form(model, schema)</code> = crea el formulario y lo enlaza al signal.<br/>" +
        "• <code>required(f.title, {...})</code> = validador declarativo con mensaje custom.<br/>" +
        "• <code>this.newTaskForm()</code> = signal: devuelve el estado del form (<code>.valid()</code>, <code>.invalid()</code>, <code>.touched()</code>).<br/>" +
        "• <code>this.newTaskForm.title</code> = signal del campo: <code>.value()</code>, <code>.errors()</code>, <code>.touched()</code>.",
    },
    { kind: "h4", text: "4.5.11 Tasks Template con Signal Forms: src/app/pages/tasks/tasks.component.html" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>&lt;div class=\"container\"&gt;\n  &lt;h1&gt;📋 Mis Tareas&lt;/h1&gt;\n\n  &lt;!-- 🆕 Signal Forms: form sin ngModel, usamos [control] --&gt;\n  &lt;form (ngSubmit)=\"add()\" class=\"new-form\"&gt;\n    &lt;div class=\"field\"&gt;\n      &lt;input\n        [control]=\"newTaskForm.title\"\n        placeholder=\"Título\"\n        [class.has-error]=\"newTaskForm.title().touched() &amp;&amp; newTaskForm.title().invalid()\"\n      /&gt;\n      &#64;if (newTaskForm.title().touched() &amp;&amp; newTaskForm.title().errors().length) {\n        &lt;small class=\"error-msg\"&gt;{{ newTaskForm.title().errors()[0].message }}&lt;/small&gt;\n      }\n    &lt;/div&gt;\n\n    &lt;div class=\"field\"&gt;\n      &lt;input [control]=\"newTaskForm.description\" placeholder=\"Descripción\" /&gt;\n    &lt;/div&gt;\n\n    &lt;button type=\"submit\" [disabled]=\"newTaskForm().invalid()\"&gt;➕ Agregar&lt;/button&gt;\n  &lt;/form&gt;\n\n  &#64;if (loading()) {\n    &lt;p&gt;Cargando...&lt;/p&gt;\n  }\n\n  &lt;div class=\"tasks\"&gt;\n    &#64;for (t of tasks(); track t.id) {\n      &lt;article [class.done]=\"t.done\"&gt;\n        &lt;div class=\"row\"&gt;\n          &lt;input type=\"checkbox\" [checked]=\"t.done\" (change)=\"toggle(t)\" /&gt;\n          &lt;div&gt;\n            &lt;h3&gt;{{ t.title }}&lt;/h3&gt;\n            &lt;p&gt;{{ t.description }}&lt;/p&gt;\n          &lt;/div&gt;\n          &lt;button (click)=\"remove(t)\"&gt;🗑️&lt;/button&gt;\n        &lt;/div&gt;\n\n        &#64;if (imageUrls()[t.id]) {\n          &lt;img [src]=\"imageUrls()[t.id]\" alt=\"task image\" /&gt;\n        }\n\n        &lt;label class=\"upload-btn\"&gt;\n          📎 {{ t.imageId ? 'Cambiar imagen' : 'Subir imagen' }}\n          &lt;input type=\"file\" accept=\"image/*\" (change)=\"uploadImage(t, $event)\" hidden /&gt;\n        &lt;/label&gt;\n      &lt;/article&gt;\n    }\n  &lt;/div&gt;\n&lt;/div&gt;</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>🆕 Lo nuevo del template:</strong><br/>" +
        "• <code>[control]=\"newTaskForm.title\"</code> — enlaza el input al campo (reemplaza <code>[(ngModel)]</code>).<br/>" +
        "• <code>newTaskForm.title().touched()</code> y <code>.errors()</code> — signals: el template se re-renderiza al cambiar.<br/>" +
        "• <code>[disabled]=\"newTaskForm().invalid()\"</code> — botón deshabilitado si el form es inválido.<br/>" +
        "• Usamos <strong>control flow nativo</strong> (<code>&#64;if</code>, <code>&#64;for</code>) en lugar de <code>*ngIf</code> / <code>*ngFor</code>: más rápido y type-safe.",
    },
    { kind: "h4", text: "4.5.12 Tasks Styles: src/app/pages/tasks/tasks.component.scss" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>.container {\n  max-width: 800px;\n  margin: 2rem auto;\n  padding: 1rem;\n  font-family: system-ui, sans-serif;\n}\n\nh1 { margin-bottom: 1.5rem; }\n\n.new-form {\n  display: flex; gap: 8px; margin-bottom: 2rem; align-items: flex-start;\n\n  .field {\n    flex: 1; display: flex; flex-direction: column; gap: 4px;\n  }\n\n  input {\n    width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 8px;\n    transition: border-color 0.2s;\n    &.has-error { border-color: #dc2626; }\n    &:focus { outline: none; border-color: #2563eb; }\n  }\n\n  .error-msg {\n    color: #dc2626; font-size: 0.8rem; padding-left: 4px;\n  }\n\n  button {\n    padding: 10px 18px; border: none; border-radius: 8px;\n    background: #2563eb; color: #fff; font-weight: 600; cursor: pointer;\n    &:disabled { background: #94a3b8; cursor: not-allowed; }\n  }\n}\n\n.tasks { display: grid; gap: 12px; }\n\narticle {\n  background: #fff; border: 1px solid #e2e8f0; border-radius: 12px;\n  padding: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);\n  &.done { opacity: 0.6; h3 { text-decoration: line-through; } }\n}\n\n.row { display: flex; align-items: center; gap: 12px;\n  input[type=checkbox] { width: 20px; height: 20px; }\n  div { flex: 1; }\n  h3 { margin: 0; }\n  p { margin: 4px 0 0; color: #64748b; font-size: 0.9rem; }\n  button { background: transparent; border: none; cursor: pointer; font-size: 1.2rem; }\n}\n\nimg { max-width: 200px; border-radius: 8px; margin: 10px 0; display: block; }\n\n.upload-btn {\n  display: inline-block; margin-top: 6px; cursor: pointer;\n  background: #f1f5f9; padding: 6px 12px; border-radius: 6px;\n  font-size: 0.85rem;\n}</pre>",
    },
    { kind: "h4", text: "4.5.13 Rutas: src/app/app.routes.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Routes } from '@angular/router';\nimport { TasksComponent } from './pages/tasks/tasks.component';\n\nexport const routes: Routes = [\n  { path: '', component: TasksComponent },\n  { path: '**', redirectTo: '' },\n];</pre>",
    },
    { kind: "h4", text: "4.5.14 App Root: src/app/app.component.ts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>import { Component } from '@angular/core';\nimport { RouterOutlet } from '@angular/router';\n\n@Component({\n  selector: 'app-root',\n  standalone: true,\n  imports: [RouterOutlet],\n  template: `&lt;router-outlet /&gt;`,\n})\nexport class AppComponent {}</pre>",
    },
    { kind: "h4", text: "4.5.15 Probar local (opcional)" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Si quieres probar la UI local antes de K8s:\nng serve\n# Abre http://localhost:4200\n# (los APIs estarán caídos hasta que despleguemos K8s)</pre>",
    },

    // ============================================
    // PARTE 5: DOCKERIZAR
    // ============================================
    { kind: "h3", text: "🐳 PARTE 5: Dockerizar los 3 servicios" },
    {
      kind: "paragraph",
      html:
        "Cada servicio (tareas-api, imagenes-api, frontend) tendrá su propio Dockerfile. Para el frontend Angular usaremos un build <strong>multi-etapa</strong>: primero compilamos con Node y luego servimos los estáticos con NGINX.",
    },
    { kind: "h4", text: "5.1 Dockerfile para tareas-api" },
    {
      kind: "paragraph",
      html: "Crea <code>C:\\Lab-K8s\\tareas-api\\Dockerfile</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Etapa 1: build\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nCOPY prisma ./prisma\nRUN npm ci\nCOPY . .\nRUN npx prisma generate\nRUN npm run build\n\n# Etapa 2: runtime\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nCOPY prisma ./prisma\nRUN npm ci --omit=dev\nRUN npx prisma generate\nCOPY --from=builder /app/dist ./dist\nEXPOSE 3000\nCMD [\"sh\", \"-c\", \"npx prisma migrate deploy &amp;&amp; node dist/main\"]</pre>",
    },
    { kind: "h4", text: "5.2 Dockerfile para imagenes-api" },
    {
      kind: "paragraph",
      html: "Crea <code>C:\\Lab-K8s\\imagenes-api\\Dockerfile</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY --from=builder /app/dist ./dist\nEXPOSE 3000\nCMD [\"node\", \"dist/main\"]</pre>",
    },
    { kind: "h4", text: "5.3 nginx.conf para el frontend (SPA + proxy)" },
    {
      kind: "paragraph",
      html:
        "El frontend es una SPA: NGINX debe servir <code>index.html</code> para cualquier ruta desconocida (fallback de routing Angular). Crea <code>C:\\Lab-K8s\\frontend\\lab-app\\nginx.conf</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>server {\n  listen 80;\n  server_name _;\n  root /usr/share/nginx/html;\n  index index.html;\n\n  # Cache agresivo para assets con hash\n  location ~* \\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|ico)$ {\n    expires 30d;\n    add_header Cache-Control \"public, max-age=2592000, immutable\";\n    try_files $uri =404;\n  }\n\n  # SPA fallback: cualquier ruta no encontrada → index.html\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n}</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 ¿Por qué el SPA fallback?</strong> Angular maneja rutas client-side. Si el usuario recarga en <code>/tareas/123</code>, NGINX debe devolver <code>index.html</code> para que Angular pueda parsear la URL. Sin esta regla obtendrías 404.",
    },
    { kind: "h4", text: "5.4 Dockerfile para frontend (multi-etapa)" },
    {
      kind: "paragraph",
      html: "Crea <code>C:\\Lab-K8s\\frontend\\lab-app\\Dockerfile</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Etapa 1: build de Angular\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\n# Build de producción\nRUN npm run build -- --configuration production\n\n# Etapa 2: servir estáticos con NGINX\nFROM nginx:alpine\n# Borra config default de NGINX\nRUN rm /etc/nginx/conf.d/default.conf\n# Copia nuestra config\nCOPY nginx.conf /etc/nginx/conf.d/default.conf\n# Copia los estáticos compilados\n# Angular 17+ deja el output en dist/&lt;proyecto&gt;/browser\nCOPY --from=builder /app/dist/lab-app/browser /usr/share/nginx/html\nEXPOSE 80\nCMD [\"nginx\", \"-g\", \"daemon off;\"]</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>⚠️ Output path del build.</strong> Angular 17+ genera los archivos en <code>dist/&lt;nombre-proyecto&gt;/browser</code>. Verifica con <code>ls dist</code> tras correr <code>npm run build</code> que la ruta sea correcta. Si tu proyecto se llama distinto, ajusta el <code>COPY --from=builder</code>.",
    },
    { kind: "h4", text: "5.5 Construir las 3 imágenes" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>cd C:\\Lab-K8s\\tareas-api\ndocker build -t tareas-api:v1 .\n\ncd C:\\Lab-K8s\\imagenes-api\ndocker build -t imagenes-api:v1 .\n\ncd C:\\Lab-K8s\\frontend\\lab-app\ndocker build -t lab-frontend:v1 .\n\n# Verificar las 3\ndocker images | findstr /R \"tareas-api imagenes-api lab-frontend\"</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 ¿Por qué imágenes locales?</strong> Docker Desktop comparte su daemon de Docker con Kubernetes. Las imágenes construidas aquí están disponibles directamente para los pods sin necesidad de subirlas a un registry.",
    },

    // ============================================
    // PARTE 6: MANIFESTS KUBERNETES
    // ============================================
    { kind: "h3", text: "📄 PARTE 6: Manifests YAML de Kubernetes" },
    { kind: "paragraph", html: "Vamos a crear todos los YAMLs dentro de <code>C:\\Lab-K8s\\k8s\\</code>." },
    { kind: "h4", text: "6.1 Namespace" },
    {
      kind: "paragraph",
      html: "<code>k8s/00-namespace.yaml</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: v1\nkind: Namespace\nmetadata:\n  name: lab-app</pre>",
    },
    { kind: "h4", text: "6.2 PostgreSQL: Secret + StatefulSet + Service" },
    {
      kind: "paragraph",
      html: "<code>k8s/10-postgres.yaml</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: v1\nkind: Secret\nmetadata:\n  name: postgres-secret\n  namespace: lab-app\ntype: Opaque\nstringData:\n  POSTGRES_USER: tareasuser\n  POSTGRES_PASSWORD: tareaspass\n  POSTGRES_DB: tareasdb\n---\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: postgres\n  namespace: lab-app\nspec:\n  serviceName: postgres\n  replicas: 1\n  selector:\n    matchLabels:\n      app: postgres\n  template:\n    metadata:\n      labels:\n        app: postgres\n    spec:\n      containers:\n        - name: postgres\n          image: postgres:16-alpine\n          ports:\n            - containerPort: 5432\n          envFrom:\n            - secretRef:\n                name: postgres-secret\n          volumeMounts:\n            - name: data\n              mountPath: /var/lib/postgresql/data\n  volumeClaimTemplates:\n    - metadata:\n        name: data\n      spec:\n        accessModes: [\"ReadWriteOnce\"]\n        resources:\n          requests:\n            storage: 1Gi\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: postgres\n  namespace: lab-app\nspec:\n  clusterIP: None\n  selector:\n    app: postgres\n  ports:\n    - port: 5432</pre>",
    },
    { kind: "h4", text: "6.3 MongoDB: Secret + StatefulSet + Service" },
    {
      kind: "paragraph",
      html: "<code>k8s/11-mongo.yaml</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: v1\nkind: Secret\nmetadata:\n  name: mongo-secret\n  namespace: lab-app\ntype: Opaque\nstringData:\n  MONGO_INITDB_ROOT_USERNAME: imguser\n  MONGO_INITDB_ROOT_PASSWORD: imgpass\n---\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: mongo\n  namespace: lab-app\nspec:\n  serviceName: mongo\n  replicas: 1\n  selector:\n    matchLabels:\n      app: mongo\n  template:\n    metadata:\n      labels:\n        app: mongo\n    spec:\n      containers:\n        - name: mongo\n          image: mongo:7\n          ports:\n            - containerPort: 27017\n          envFrom:\n            - secretRef:\n                name: mongo-secret\n          volumeMounts:\n            - name: data\n              mountPath: /data/db\n  volumeClaimTemplates:\n    - metadata:\n        name: data\n      spec:\n        accessModes: [\"ReadWriteOnce\"]\n        resources:\n          requests:\n            storage: 1Gi\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: mongo\n  namespace: lab-app\nspec:\n  clusterIP: None\n  selector:\n    app: mongo\n  ports:\n    - port: 27017</pre>",
    },
    { kind: "h4", text: "6.4 MinIO: Secret + PVC + Deployment + Service" },
    {
      kind: "paragraph",
      html: "<code>k8s/12-minio.yaml</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: v1\nkind: Secret\nmetadata:\n  name: minio-secret\n  namespace: lab-app\ntype: Opaque\nstringData:\n  MINIO_ROOT_USER: minioadmin\n  MINIO_ROOT_PASSWORD: minioadmin\n---\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: minio-pvc\n  namespace: lab-app\nspec:\n  accessModes: [\"ReadWriteOnce\"]\n  resources:\n    requests:\n      storage: 2Gi\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: minio\n  namespace: lab-app\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: minio\n  template:\n    metadata:\n      labels:\n        app: minio\n    spec:\n      containers:\n        - name: minio\n          image: minio/minio:latest\n          args: [\"server\", \"/data\", \"--console-address\", \":9001\"]\n          ports:\n            - containerPort: 9000\n              name: api\n            - containerPort: 9001\n              name: console\n          envFrom:\n            - secretRef:\n                name: minio-secret\n          volumeMounts:\n            - name: data\n              mountPath: /data\n      volumes:\n        - name: data\n          persistentVolumeClaim:\n            claimName: minio-pvc\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: minio\n  namespace: lab-app\nspec:\n  selector:\n    app: minio\n  ports:\n    - name: api\n      port: 9000\n      targetPort: 9000\n    - name: console\n      port: 9001\n      targetPort: 9001</pre>",
    },
    { kind: "h4", text: "6.5 Tareas API: ConfigMap + Secret + Deployment + Service" },
    {
      kind: "paragraph",
      html: "<code>k8s/20-tareas-api.yaml</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: v1\nkind: Secret\nmetadata:\n  name: tareas-api-secret\n  namespace: lab-app\ntype: Opaque\nstringData:\n  DATABASE_URL: \"postgresql://tareasuser:tareaspass@postgres:5432/tareasdb?schema=public\"\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: tareas-api\n  namespace: lab-app\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: tareas-api\n  template:\n    metadata:\n      labels:\n        app: tareas-api\n    spec:\n      containers:\n        - name: tareas-api\n          image: tareas-api:v1\n          imagePullPolicy: IfNotPresent\n          ports:\n            - containerPort: 3000\n          env:\n            - name: PORT\n              value: \"3000\"\n          envFrom:\n            - secretRef:\n                name: tareas-api-secret\n          readinessProbe:\n            httpGet:\n              path: /api/tasks\n              port: 3000\n            initialDelaySeconds: 10\n            periodSeconds: 5\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: tareas-api\n  namespace: lab-app\nspec:\n  selector:\n    app: tareas-api\n  ports:\n    - port: 80\n      targetPort: 3000</pre>",
    },
    { kind: "h4", text: "6.6 Imágenes API: Secret + Deployment + Service" },
    {
      kind: "paragraph",
      html: "<code>k8s/21-imagenes-api.yaml</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: v1\nkind: Secret\nmetadata:\n  name: imagenes-api-secret\n  namespace: lab-app\ntype: Opaque\nstringData:\n  MONGO_URL: \"mongodb://imguser:imgpass@mongo:27017/images?authSource=admin\"\n  MINIO_ENDPOINT: \"minio\"\n  MINIO_PORT: \"9000\"\n  MINIO_ACCESS_KEY: \"minioadmin\"\n  MINIO_SECRET_KEY: \"minioadmin\"\n  MINIO_BUCKET: \"images\"\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: imagenes-api\n  namespace: lab-app\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: imagenes-api\n  template:\n    metadata:\n      labels:\n        app: imagenes-api\n    spec:\n      containers:\n        - name: imagenes-api\n          image: imagenes-api:v1\n          imagePullPolicy: IfNotPresent\n          ports:\n            - containerPort: 3000\n          env:\n            - name: PORT\n              value: \"3000\"\n          envFrom:\n            - secretRef:\n                name: imagenes-api-secret\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: imagenes-api\n  namespace: lab-app\nspec:\n  selector:\n    app: imagenes-api\n  ports:\n    - port: 80\n      targetPort: 3000</pre>",
    },
    { kind: "h4", text: "6.7 Frontend Angular: Deployment + Service" },
    {
      kind: "paragraph",
      html: "<code>k8s/22-frontend.yaml</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: lab-frontend\n  namespace: lab-app\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: lab-frontend\n  template:\n    metadata:\n      labels:\n        app: lab-frontend\n    spec:\n      containers:\n        - name: lab-frontend\n          image: lab-frontend:v1\n          imagePullPolicy: IfNotPresent\n          ports:\n            - containerPort: 80\n          readinessProbe:\n            httpGet:\n              path: /\n              port: 80\n            initialDelaySeconds: 5\n            periodSeconds: 5\n          resources:\n            requests:\n              cpu: \"50m\"\n              memory: \"64Mi\"\n            limits:\n              cpu: \"200m\"\n              memory: \"128Mi\"\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: lab-frontend\n  namespace: lab-app\nspec:\n  selector:\n    app: lab-frontend\n  ports:\n    - port: 80\n      targetPort: 80</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 ¿Por qué 2 réplicas también para el frontend?</strong> Aunque sea estático, queremos alta disponibilidad: si un pod muere, el otro sigue sirviendo. Como NGINX consume muy poca RAM (~50Mi cada uno), no es caro.",
    },
    { kind: "h4", text: "6.8 Ingress (enrutamiento HTTP)" },
    {
      kind: "paragraph",
      html:
        "El Ingress es el <strong>punto único de entrada</strong>. Enruta: <code>/api/tasks</code> → tareas-api, <code>/api/images</code> → imagenes-api, <code>/minio</code> → consola MinIO, y <strong><code>/</code> → frontend Angular</strong> (debe ir al final como <em>catch-all</em>). <code>k8s/30-ingress.yaml</code>:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: lab-ingress\n  namespace: lab-app\nspec:\n  ingressClassName: nginx\n  rules:\n    - host: lab.localhost\n      http:\n        paths:\n          # APIs primero (más específicas)\n          - path: /api/tasks\n            pathType: Prefix\n            backend:\n              service:\n                name: tareas-api\n                port:\n                  number: 80\n          - path: /api/images\n            pathType: Prefix\n            backend:\n              service:\n                name: imagenes-api\n                port:\n                  number: 80\n          - path: /minio\n            pathType: Prefix\n            backend:\n              service:\n                name: minio\n                port:\n                  number: 9001\n          # Frontend al final (catch-all)\n          - path: /\n            pathType: Prefix\n            backend:\n              service:\n                name: lab-frontend\n                port:\n                  number: 80</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>⚠️ Orden de los paths.</strong> Aunque NGINX Ingress hace match por especificidad, conviene declarar primero las rutas <code>/api/...</code> y <code>/minio</code> y dejar <code>/</code> al final. Así el frontend captura todo lo demás (rutas Angular). <strong>Quitamos</strong> también la anotación <code>rewrite-target: /</code> porque las APIs ya esperan <code>/api/tasks</code> completo y reescribir rompería el routing de NestJS.",
    },

    // ============================================
    // PARTE 7: DEPLOY
    // ============================================
    { kind: "h3", text: "🚀 PARTE 7: Desplegar todo (ORDEN IMPORTA)" },
    { kind: "h4", text: "7.1 Aplicar todo en orden" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>cd C:\\Lab-K8s\\k8s\n\n# 1. Namespace\nkubectl apply -f 00-namespace.yaml\n\n# 2. Bases de datos y storage\nkubectl apply -f 10-postgres.yaml\nkubectl apply -f 11-mongo.yaml\nkubectl apply -f 12-minio.yaml\n\n# Espera ~30s a que las BDs estén listas\nkubectl get pods -n lab-app -w\n# Cuando veas postgres-0, mongo-0, minio-... todas Running, Ctrl+C\n\n# 3. APIs (necesitan que las BDs estén Ready)\nkubectl apply -f 20-tareas-api.yaml\nkubectl apply -f 21-imagenes-api.yaml\n\n# 4. Frontend Angular (sirve la UI)\nkubectl apply -f 22-frontend.yaml\n\n# 5. Ingress (lo último: necesita que los Services existan)\nkubectl apply -f 30-ingress.yaml\n\n# Verificar todo\nkubectl get all -n lab-app\nkubectl get ingress -n lab-app\n\n# Esperar a que los pods estén Ready\nkubectl wait --for=condition=ready pod --all -n lab-app --timeout=120s</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 ¿Por qué este orden?</strong> Las BDs primero (tienen StatefulSets que tardan más). Después las APIs (que dependen de las BDs). El frontend no depende de nada para arrancar (es solo NGINX). Y el Ingress al final porque necesita que los Services ya existan para resolverlos.",
    },
    { kind: "h4", text: "7.2 Agregar lab.localhost al hosts (Windows)" },
    {
      kind: "paragraph",
      html: "Abre <strong>Notepad como Administrador</strong> y edita <code>C:\\Windows\\System32\\drivers\\etc\\hosts</code>. Agrega al final:",
    },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>127.0.0.1 lab.localhost</pre>",
    },

    // ============================================
    // PARTE 8: TESTING
    // ============================================
    { kind: "h3", text: "🧪 PARTE 8: Probar la app" },
    { kind: "h4", text: "8.1 Abrir la UI en el navegador 🎉" },
    {
      kind: "paragraph",
      html:
        "Esta es la prueba <strong>más importante</strong>: abre tu navegador en <a href='http://lab.localhost' target='_blank'>http://lab.localhost</a>. Deberías ver la SPA de Angular con el formulario de tareas.",
    },
    {
      kind: "list",
      items: [
        "✅ Crea una tarea desde el formulario (título + descripción)",
        "✅ Marca como completada con el checkbox",
        "✅ Sube una imagen con el botón 📎 — la imagen se guarda en MinIO y se asocia a la tarea",
        "✅ Recarga la página: las tareas y la imagen persisten (PostgreSQL + MongoDB + MinIO funcionando)",
        "✅ Elimina una tarea con 🗑️",
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>🎉 Si todo funciona, ¡acabas de operar una app real en Kubernetes!</strong> El frontend (NGINX) llamó al backend (NestJS), que guardó datos en PostgreSQL y MongoDB, y subió archivos a MinIO. Todo el tráfico pasó por el Ingress NGINX. 💪",
    },
    { kind: "h4", text: "8.2 Probar APIs sin la UI (PowerShell)" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Crear una tarea\n$body = @{ title = 'Mi primera tarea'; description = 'Hello K8s!' } | ConvertTo-Json\nInvoke-RestMethod -Uri http://lab.localhost/api/tasks -Method Post -Body $body -ContentType 'application/json'\n\n# O con curl si tienes curl.exe\ncurl -X POST http://lab.localhost/api/tasks -H \"Content-Type: application/json\" -d '{\"title\":\"Tarea 1\"}'</pre>",
    },
    { kind: "h4", text: "8.3 Listar tareas" },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>Invoke-RestMethod http://lab.localhost/api/tasks</pre>",
    },
    { kind: "h4", text: "8.4 Subir imagen (sin UI)" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Usa Postman / Thunder Client:\n# POST http://lab.localhost/api/images/upload\n# Body: form-data\n#   field 'file' tipo File con tu imagen\n#   field 'taskId' (opcional) con el ID de tarea\n\n# Con PowerShell + curl:\ncurl -X POST http://lab.localhost/api/images/upload -F \"file=@C:\\Users\\Tu\\Pictures\\test.png\"</pre>",
    },
    { kind: "h4", text: "8.5 Ver consola MinIO" },
    {
      kind: "paragraph",
      html: "Acceder al panel de MinIO con port-forward (más fácil que ingress para el panel):",
    },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>kubectl port-forward -n lab-app svc/minio 9001:9001\n# Abre http://localhost:9001\n# Login: minioadmin / minioadmin</pre>",
    },

    // ============================================
    // PARTE 9: TROUBLESHOOTING
    // ============================================
    { kind: "h3", text: "🔧 PARTE 9: Troubleshooting común" },
    { kind: "h4", text: "Pods en estado Pending o ImagePullBackOff" },
    {
      kind: "list",
      items: [
        "<code>kubectl describe pod &lt;nombre&gt; -n lab-app</code> → ver eventos al final",
        "Si dice 'ErrImagePull' → verifica que <code>docker images</code> muestre <code>tareas-api:v1</code>",
        "Asegúrate de tener <code>imagePullPolicy: IfNotPresent</code>",
      ],
    },
    { kind: "h4", text: "Pod CrashLoopBackOff" },
    {
      kind: "list",
      items: [
        "<code>kubectl logs &lt;pod&gt; -n lab-app</code> → ver el error",
        "<code>kubectl logs &lt;pod&gt; -n lab-app --previous</code> → logs del crash anterior",
        "Causa típica: BD no accesible, env vars mal, migración Prisma falló",
      ],
    },
    { kind: "h4", text: "Conectar al Pod para debug" },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>kubectl exec -it &lt;pod&gt; -n lab-app -- sh</pre>",
    },
    { kind: "h4", text: "Ver eventos del namespace" },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>kubectl get events -n lab-app --sort-by='.lastTimestamp'</pre>",
    },
    { kind: "h4", text: "Frontend Angular: página en blanco o 404 al recargar" },
    {
      kind: "list",
      items: [
        "<strong>Página en blanco:</strong> abre DevTools → Network. Si los <code>.js</code> dan 404, el <code>COPY --from=builder /app/dist/lab-app/browser</code> apunta a una ruta equivocada. Entra al pod con <code>kubectl exec</code> y verifica <code>ls /usr/share/nginx/html</code>.",
        "<strong>404 al recargar una ruta:</strong> falta el <code>try_files $uri $uri/ /index.html;</code> en <code>nginx.conf</code>. Revisa que el ConfigMap/Dockerfile lo incluyó.",
        "<strong>Llamadas a <code>/api/...</code> dan 404:</strong> el Ingress está mal o falta la regla. <code>kubectl describe ingress lab-ingress -n lab-app</code> y verifica las rules.",
        "<strong>Llamadas a <code>/api/...</code> dan CORS:</strong> NO debería pasar (mismo dominio). Si pasa, revisa que el frontend usa rutas relativas <code>/api/tasks</code> y no <code>http://localhost:3000/...</code>.",
      ],
    },
    { kind: "h4", text: "Reconstruir solo el frontend tras cambios" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># 1. Rebuild de la imagen\ncd C:\\Lab-K8s\\frontend\\lab-app\ndocker build -t lab-frontend:v1 .\n\n# 2. Forzar a K8s a recrear los pods (mismo tag, nueva imagen)\nkubectl rollout restart deployment/lab-frontend -n lab-app\n\n# 3. Esperar\nkubectl rollout status deployment/lab-frontend -n lab-app</pre>",
    },

    // ============================================
    // PARTE 10: LIMPIEZA
    // ============================================
    { kind: "h3", text: "🧹 PARTE 10: Limpieza" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Borrar todo el namespace (todo lo de adentro)\nkubectl delete namespace lab-app\n\n# Verificar\nkubectl get all -n lab-app\n# Error from server (NotFound) → todo borrado ✅\n\n# Borrar imágenes Docker locales (opcional)\ndocker rmi tareas-api:v1 imagenes-api:v1 lab-frontend:v1</pre>",
    },

    // ============================================
    // CIERRE
    // ============================================
    { kind: "h3", text: "🎓 ¡Felicidades!" },
    {
      kind: "successBox",
      html:
        "Acabas de desplegar una <strong>aplicación real en Kubernetes</strong> con todo el stack moderno:<br/>" +
        "✅ Frontend Angular 21 (SPA) servido por NGINX<br/>" +
        "✅ 2 backends NestJS<br/>" +
        "✅ PostgreSQL + MongoDB en StatefulSets<br/>" +
        "✅ MinIO como S3 local con PVC<br/>" +
        "✅ Secrets para credenciales<br/>" +
        "✅ Service discovery (los pods se hablan por nombre DNS)<br/>" +
        "✅ Ingress con NGINX para HTTP routing (frontend + APIs en mismo dominio = cero CORS)<br/>" +
        "✅ Readiness probes<br/>" +
        "✅ Múltiples replicas (HA) en frontend y APIs<br/>" +
        "✅ Build multi-etapa (Node → NGINX) para frontend optimizado<br/><br/>" +
        "Este patrón es <strong>idéntico</strong> a lo que harías en GKE, EKS o AKS — la única diferencia es el cluster donde se aplica.",
    },

    // ============================================
    // QUIZ
    // ============================================
    {
      kind: "quiz",
      key: "m11_quiz",
      questions: [
        {
          q: "¿Por qué PostgreSQL y MongoDB son StatefulSets y no Deployments?",
          options: [
            "Son lo mismo",
            "StatefulSet garantiza identidad estable y storage persistente — necesario para BDs",
            "Deployment no soporta containers Docker",
            "Por velocidad",
          ],
          correct: 1,
          explanation:
            "StatefulSet asigna nombres estables (postgres-0) y volúmenes persistentes únicos a cada réplica. Deployments son para apps stateless donde las réplicas son intercambiables.",
        },
        {
          q: "¿Para qué sirve un Service en Kubernetes?",
          options: [
            "Es un container",
            "Provee un endpoint estable (DNS interno) y balanceo entre los Pods de un Deployment",
            "Es un volumen",
            "Es una imagen Docker",
          ],
          correct: 1,
          explanation:
            "Los Pods son efímeros (sus IPs cambian). El Service da un nombre DNS estable (ej. 'postgres') y balancea el tráfico entre los Pods que coincidan con su selector.",
        },
        {
          q: "Diferencia entre ConfigMap y Secret:",
          options: [
            "Son lo mismo",
            "ConfigMap es config no sensible; Secret es para datos sensibles (passwords, tokens) encriptados",
            "Secret es más rápido",
            "ConfigMap es solo para Linux",
          ],
          correct: 1,
          explanation:
            "ConfigMap guarda configuración pública (URLs, flags). Secret guarda credenciales en base64 con encriptación en etcd y se pueden montar como variables de entorno o archivos.",
        },
        {
          q: "¿Qué hace 'imagePullPolicy: IfNotPresent'?",
          options: [
            "Siempre descarga la imagen del registry",
            "Solo descarga si NO existe localmente",
            "Nunca descarga",
            "Borra la imagen",
          ],
          correct: 1,
          explanation:
            "IfNotPresent: usa la imagen local si existe; sino la descarga. Útil cuando construyes imágenes localmente con Docker Desktop (no hace falta subirlas a registry).",
        },
        {
          q: "¿Para qué sirve un PersistentVolumeClaim (PVC)?",
          options: [
            "Es una IP",
            "Solicita un volumen persistente al cluster (storage que sobrevive al reinicio del Pod)",
            "Configura DNS",
            "Es una credencial",
          ],
          correct: 1,
          explanation:
            "El PVC es la 'petición' de storage de un Pod. Kubernetes asigna o crea un PersistentVolume que cumple los requisitos. El Pod monta el PVC como filesystem.",
        },
        {
          q: "¿Para qué sirve el Ingress?",
          options: [
            "Es un Pod",
            "Define reglas HTTP/HTTPS para enrutar tráfico externo a Services internos",
            "Es una BD",
            "Es un Secret",
          ],
          correct: 1,
          explanation:
            "Ingress permite exponer múltiples Services bajo un solo punto de entrada con routing por host/path. Necesita un Ingress Controller (NGINX, Traefik) para funcionar.",
        },
        {
          q: "¿Por qué tenemos 2 replicas de los backends API pero solo 1 de las BDs?",
          options: [
            "Las BDs no soportan replicas",
            "Los backends son stateless (se pueden duplicar); las BDs son stateful y requieren configuración especial para HA real",
            "Es aleatorio",
            "Por costo",
          ],
          correct: 1,
          explanation:
            "Apps stateless se replican fácilmente (cada réplica es idéntica). Para BDs hay que configurar replicación, election de primary, etc. En este lab usamos 1 réplica de BD para simplificar.",
        },
        {
          q: "Si el pod muestra 'CrashLoopBackOff', ¿qué comando ver primero?",
          options: [
            "kubectl describe service",
            "kubectl logs <pod> -n <namespace>",
            "docker ps",
            "kubectl apply",
          ],
          correct: 1,
          explanation:
            "Primero ver los logs del Pod. Si necesitas los logs del CRASH anterior usa --previous. Después usa describe para ver eventos.",
        },
        {
          q: "¿Cómo se conectan los pods entre sí en el mismo namespace?",
          options: [
            "Por IP fija",
            "Por nombre DNS del Service (ej. 'postgres' resuelve al ClusterIP)",
            "Por puerto solo",
            "No se pueden conectar",
          ],
          correct: 1,
          explanation:
            "K8s tiene DNS interno (CoreDNS). El nombre del Service es resoluble dentro del namespace. Para otro namespace: 'service.namespace.svc.cluster.local'.",
        },
        {
          q: "Una vez aplicaste los manifests con 'kubectl apply', cómo borras TODO el lab:",
          options: [
            "Reiniciar Docker Desktop",
            "kubectl delete namespace lab-app",
            "Eliminar imágenes Docker",
            "Apagar Windows",
          ],
          correct: 1,
          explanation:
            "Borrar el namespace elimina TODOS los recursos dentro (Pods, Services, PVCs, Secrets, Deployments). Es la forma más rápida de limpiar.",
        },
        {
          q: "¿Por qué el Dockerfile del frontend Angular usa build multi-etapa (Node + NGINX)?",
          options: [
            "Por moda",
            "Para compilar con Node y servir los estáticos resultantes con una imagen mínima de NGINX (sin Node en producción)",
            "Porque Angular no funciona en Docker",
            "Para soportar SSR",
          ],
          correct: 1,
          explanation:
            "Multi-etapa: la etapa 'builder' tiene Node + toda la toolchain (>1GB), pero la imagen final solo contiene NGINX + los estáticos compilados (~30MB). Menos superficie de ataque, menos peso, menos consumo de RAM.",
        },
        {
          q: "¿Por qué el frontend Angular llama a '/api/tasks' (ruta relativa) en lugar de 'http://tareas-api/api/tasks'?",
          options: [
            "Por costumbre",
            "Porque el Ingress sirve frontend y APIs bajo el mismo dominio: rutas relativas = sin problemas de CORS y portable entre entornos",
            "Angular no soporta URLs absolutas",
            "Por velocidad",
          ],
          correct: 1,
          explanation:
            "Al estar el frontend y las APIs detrás del mismo Ingress (lab.localhost), las llamadas mismo-origen no requieren CORS. Además, la app funciona igual en dev, staging y prod sin tocar el código (solo cambia lo que el Ingress enruta).",
        },
        {
          q: "En Angular 21 Signal Forms, ¿cómo se crea un formulario reactivo a partir de un modelo?",
          options: [
            "new FormGroup({ ... })",
            "form(signal({ title: '' }), (f) => { required(f.title); })",
            "FormBuilder.group({ ... })",
            "new FormControl()",
          ],
          correct: 1,
          explanation:
            "Signal Forms parte de un signal con el modelo y un schema con validadores declarativos. El estado del form ES el signal: cambia el signal → cambia el form. Adiós a FormGroup/FormBuilder.",
        },
        {
          q: "En el template Angular, ¿cómo se enlaza un input a un campo de Signal Forms?",
          options: [
            "[(ngModel)]=\"campo\"",
            "[formControlName]=\"'campo'\"",
            "[control]=\"miForm.campo\"",
            "[value]=\"campo()\"",
          ],
          correct: 2,
          explanation:
            "Signal Forms introduce la directiva [control]. Recibe el field directo (sin paréntesis): [control]=\"miForm.campo\". El acceso al estado se hace con miForm.campo().value(), .errors(), .touched(), etc.",
        },
        {
          q: "En el nginx.conf del frontend SPA, ¿qué hace 'try_files $uri $uri/ /index.html;'?",
          options: [
            "Cachea los archivos",
            "Si el archivo solicitado no existe, devuelve index.html para que Angular Router maneje la ruta (SPA fallback)",
            "Bloquea rutas inválidas",
            "Compila TypeScript",
          ],
          correct: 1,
          explanation:
            "Esencial para SPAs: si el usuario recarga en '/tareas/123', NGINX no tiene ese archivo, así que devuelve index.html. Angular arranca, lee la URL del navegador y muestra la pantalla correcta. Sin esto, F5 da 404.",
        },
      ],
    },
  ],
};
