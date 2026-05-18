import type { ModuleData } from "@/types/course";

// Modulo 14 (number=14) - Cloud Computing.
export const m10: ModuleData = {
  slug: "m10",
  number: 14,
  title: "Modulo 14 - Cloud Computing: AWS, GCP, Azure y Edge",
  icon: "C",
  intro:
    "El cloud es el sustrato de DevOps moderno. Ya no comprás servidores: alquilas capacidad por hora, en otra region en 1 click, con APIs que Terraform consume. En este modulo de cero a avanzado: que es realmente cloud computing, los 5 modelos (IaaS / PaaS / CaaS / FaaS / Edge), los 3 grandes (AWS, GCP, Azure) con sus servicios clave, networking en la nube, multi-AZ y multi-region, costo y FinOps, well-architected, cuando elegir cada provider y por que el lock-in importa.",
  totalActivities: 5,
  blocks: [
    { kind: "h3", text: "PARTE 1 - Que es el cloud (y que NO es)" },
    {
      kind: "paragraph",
      html:
        "El cloud es alquilar computo, almacenamiento y servicios bajo demanda, a traves de APIs, pagando por uso. La definicion NIST tiene 5 caracteristicas: <strong>on-demand self-service</strong>, <strong>broad network access</strong>, <strong>resource pooling</strong>, <strong>rapid elasticity</strong> y <strong>measured service</strong>.",
    },
    {
      kind: "table",
      headers: ["Tipo", "Quien lo opera", "Ejemplos"],
      rows: [
        ["Public Cloud", "Multi-tenant, operado por proveedor", "AWS, GCP, Azure, OCI"],
        ["Private Cloud", "Single-tenant, on-prem o hosted", "VMware, OpenStack en el DC propio"],
        ["Hybrid Cloud", "Mezcla on-prem + public", "Outposts, Anthos, Arc"],
        ["Multi-Cloud", "Varios providers a la vez", "AWS + GCP + Azure simultaneo"],
        ["Edge", "Computo cerca del usuario final", "Cloudflare, Fastly, AWS Wavelength"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>Mito</strong>: 'el cloud es siempre mas barato'. NO. Para cargas constantes y predecibles, on-prem puede ser cheaper. El cloud brilla en elasticidad, time-to-market y servicios gestionados.",
    },

    { kind: "h3", text: "PARTE 2 - Los 5 modelos de servicio" },
    {
      kind: "table",
      headers: ["Modelo", "Tu gestionas", "Proveedor gestiona", "Ejemplos"],
      rows: [
        ["IaaS (Infrastructure)", "OS, runtime, app", "Hardware, red, hypervisor", "AWS EC2, GCP Compute Engine, Azure VM"],
        ["PaaS (Platform)", "Solo tu app", "Todo lo demas", "Heroku, Railway, Render, App Engine, Vercel"],
        ["CaaS (Containers)", "Imagen + config", "Kubernetes, scheduler", "AWS ECS/EKS, GKE, AKS"],
        ["FaaS (Functions)", "Tu funcion", "TODO lo demas (incluso scaling)", "AWS Lambda, GCP Functions, Cloudflare Workers"],
        ["SaaS (Software)", "Solo configuracion", "Toda la app", "Gmail, Salesforce, Slack"],
        ["Edge", "Tu funcion", "Red global de PoPs", "Cloudflare Workers, Vercel Edge, Fastly Compute@Edge"],
      ],
    },

    { kind: "h3", text: "PARTE 3 - AWS: servicios clave" },
    {
      kind: "table",
      headers: ["Categoria", "Servicio", "Que es"],
      rows: [
        ["Compute", "EC2", "Servidores virtuales (IaaS)"],
        ["Compute", "Lambda", "Funciones serverless (FaaS)"],
        ["Compute", "Fargate", "Containers sin gestionar servidores"],
        ["Compute", "ECS / EKS", "Orquestadores de containers (Docker / Kubernetes)"],
        ["Storage", "S3", "Object storage (archivos, backups, websites estaticos)"],
        ["Storage", "EBS / EFS", "Block storage / file storage para EC2"],
        ["Database", "RDS", "Bases relacionales gestionadas (MySQL, Postgres, MSSQL, Oracle)"],
        ["Database", "DynamoDB", "NoSQL key-value de baja latencia"],
        ["Database", "Aurora", "MySQL/Postgres-compatible distribuido"],
        ["Network", "VPC", "Red privada virtual"],
        ["Network", "Route 53", "DNS"],
        ["Network", "CloudFront", "CDN global"],
        ["Network", "API Gateway", "Frontend para APIs"],
        ["Identity", "IAM", "Identidades, roles, permisos"],
        ["Identity", "Cognito", "Auth para apps end-user"],
        ["Messaging", "SQS / SNS / EventBridge", "Colas / topics / event bus"],
        ["Container Registry", "ECR", "Docker registry privado"],
        ["Monitoring", "CloudWatch", "Metrics, logs, alarms"],
        ["DevOps", "CodePipeline / CodeBuild / CodeDeploy", "CI/CD nativo"],
        ["Security", "Secrets Manager / KMS", "Secrets + claves criptograficas"],
      ],
    },

    { kind: "h3", text: "PARTE 4 - GCP: servicios clave" },
    {
      kind: "table",
      headers: ["Categoria", "Servicio AWS-equivalente"],
      rows: [
        ["Compute Engine", "EC2"],
        ["Cloud Run", "Containers serverless (mejor que Fargate para muchos casos)"],
        ["Cloud Functions", "Lambda"],
        ["GKE", "EKS (pero historicamente mas maduro)"],
        ["Cloud Storage", "S3"],
        ["Cloud SQL", "RDS"],
        ["BigQuery", "Redshift/Athena (DW de analytics)"],
        ["Firestore", "DynamoDB (NoSQL)"],
        ["Spanner", "RDS-compatible globalmente distribuido (unico)"],
        ["Pub/Sub", "SNS/SQS hibrido"],
        ["IAM", "IAM"],
        ["Cloud CDN", "CloudFront"],
        ["Cloud DNS", "Route 53"],
        ["Artifact Registry", "ECR"],
        ["Cloud Monitoring/Logging", "CloudWatch"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>GCP brilla en</strong>: BigQuery (analytics), Spanner (DB global), GKE (K8s donde nacio Borg), data/ML (Vertex AI). Es la nube preferida del mundo data.",
    },

    { kind: "h3", text: "PARTE 5 - Azure: servicios clave" },
    {
      kind: "table",
      headers: ["Categoria", "Servicio"],
      rows: [
        ["VMs", "Azure Virtual Machines"],
        ["Containers", "AKS (Kubernetes), Container Apps (serverless)"],
        ["Serverless", "Azure Functions"],
        ["Storage", "Blob Storage (objects), Azure Files, Disks"],
        ["DB", "Azure SQL, Cosmos DB (multi-modelo global)"],
        ["DevOps", "Azure DevOps (Pipelines, Boards, Repos)"],
        ["AI", "Azure OpenAI Service (modelos de OpenAI hosted)"],
        ["Identity", "Entra ID (ex Azure AD)"],
        ["Network", "Virtual Network, Azure DNS, Front Door"],
        ["Hybrid", "Azure Arc (gestionar recursos on-prem)"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>Azure brilla en</strong>: entornos Windows/Microsoft (AD, Office, SQL Server), hybrid cloud (Arc), y desde 2023 en AI (acceso a modelos OpenAI con datos privados).",
    },

    { kind: "h3", text: "PARTE 6 - Networking en cloud" },
    {
      kind: "list",
      items: [
        "<strong>VPC / VNet</strong>: tu red privada en el cloud, con subnets, route tables, internet gateways.",
        "<strong>Subnets publicas</strong> (con internet gateway) vs <strong>privadas</strong> (sin acceso directo a internet).",
        "<strong>NAT Gateway</strong>: permite a las privadas iniciar conexiones salientes a internet. <strong>CUIDADO: caro en AWS.</strong>",
        "<strong>VPC Peering</strong>: conectar 2 VPCs (intra-region) para hablar via private IP.",
        "<strong>Transit Gateway</strong> (AWS): hub para conectar muchas VPCs.",
        "<strong>Direct Connect / Cloud Interconnect / ExpressRoute</strong>: fibra dedicada entre tu DC y el cloud.",
        "<strong>VPN</strong>: site-to-site para conectar oficinas con la nube.",
        "<strong>PrivateLink / Private Service Connect</strong>: exponer servicios sin pasar por internet.",
        "<strong>Multi-AZ</strong>: replicas en distintos datacenters de la misma region (alta disponibilidad).",
        "<strong>Multi-region</strong>: replicas en distintos continentes (disaster recovery, latencia global).",
      ],
    },

    { kind: "h3", text: "PARTE 7 - Cuando elegir cada provider" },
    {
      kind: "table",
      headers: ["Caso", "Mejor opcion"],
      rows: [
        ["App Next.js / React, sin tocar servidor", "Vercel"],
        ["Stack completo con DB + workers, despliegue simple", "Railway / Render / Fly.io"],
        ["Alta escala, mucho control, multi-region", "AWS o GCP"],
        ["Workloads criticos con compliance", "AWS / GCP / Azure (todas certificadas)"],
        ["Entorno corporativo Microsoft", "Azure"],
        ["Heavy analytics / data warehouse", "GCP BigQuery"],
        ["Aplicaciones globales con baja latencia", "Cloudflare Workers / Fastly / Vercel Edge"],
        ["AI con modelos OpenAI", "Azure OpenAI Service"],
        ["MVP rapido / prototipo", "Vercel / Railway"],
        ["Cargas predecibles y constantes", "Considera on-prem o reserved instances"],
      ],
    },

    { kind: "h3", text: "PARTE 8 - Costo y FinOps" },
    {
      kind: "list",
      items: [
        "<strong>Tag TODO</strong>: Project, Env, Owner, CostCenter. Sin tags no podes saber quien gasta que.",
        "<strong>El egress (trafico saliente) es el costo oculto</strong>. Mover datos FUERA del cloud cuesta caro.",
        "<strong>NAT Gateway en AWS</strong>: $33/mes por GW + $0.045/GB. Multi-AZ son varios. Cuida esto.",
        "<strong>Storage sin lifecycle</strong>: el bucket que crece 1TB/mes y nunca se limpia se come la factura. Configura S3 lifecycle a Glacier / Deep Archive.",
        "<strong>Reserved Instances / Savings Plans / Committed Use</strong>: descuento de 30-70% si te comprometes a 1 o 3 años.",
        "<strong>Spot Instances</strong>: VMs que pueden cortarse, pero -70% en costo. Ideal para batch, CI runners, jobs tolerantes.",
        "<strong>Autoscaling</strong>: apaga lo que no usas (DBs dev de noche, runners on-demand).",
        "<strong>Right-sizing</strong>: la mayoria de cargas pueden vivir con 1/2 del CPU/RAM que les estas dando.",
        "<strong>FinOps</strong>: practica de financial operations, reune Finance + Eng + Product para optimizar costo cloud sin matar velocidad.",
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Herramientas\nAWS Cost Explorer / Trusted Advisor\nGCP Recommender\nAzure Cost Management\nKubecost (K8s)\nInfracost (en CI: muestra costo de cambios de Terraform)\nCloudability / Vantage / Spot.io  (third party)</pre>",
    },

    { kind: "h3", text: "PARTE 9 - Well-Architected Framework" },
    {
      kind: "paragraph",
      html:
        "AWS publico su <strong>Well-Architected Framework</strong> con 6 pilares; GCP y Azure tienen equivalentes. Es la guia mas usada en empresa.",
    },
    {
      kind: "table",
      headers: ["Pilar", "Pregunta clave"],
      rows: [
        ["Operational Excellence", "Como mejoras y operas eficazmente?"],
        ["Security", "Como proteges la informacion?"],
        ["Reliability", "Como te recuperas de fallas?"],
        ["Performance Efficiency", "Como usas recursos eficientemente?"],
        ["Cost Optimization", "Como minimizas el costo sin perder valor?"],
        ["Sustainability", "Como minimizas el impacto ambiental?"],
      ],
    },

    { kind: "h3", text: "PARTE 10 - 12-Factor App (la biblia de apps cloud-native)" },
    {
      kind: "list",
      items: [
        "1. <strong>Codebase</strong>: un repo, muchos deploys.",
        "2. <strong>Dependencies</strong>: declaradas e isoladas (package.json, requirements.txt).",
        "3. <strong>Config</strong>: en variables de entorno, NO en archivos commiteados.",
        "4. <strong>Backing services</strong>: tratar DB / queue / cache como resources atachables (cambias la URL).",
        "5. <strong>Build, release, run</strong>: separar estrictamente.",
        "6. <strong>Processes</strong>: stateless, share-nothing.",
        "7. <strong>Port binding</strong>: la app expone HTTP en un puerto, ella misma.",
        "8. <strong>Concurrency</strong>: escalar via procesos/replicas.",
        "9. <strong>Disposability</strong>: arranque rapido, shutdown graceful.",
        "10. <strong>Dev/prod parity</strong>: minimizar diferencias.",
        "11. <strong>Logs</strong>: como streams a stdout (no archivos).",
        "12. <strong>Admin processes</strong>: migrations, scripts como procesos one-off.",
      ],
    },

    { kind: "h3", text: "PARTE 11 - Lock-in: el dilema" },
    {
      kind: "paragraph",
      html:
        "Cuanto mas managed services usas (Lambda, BigQuery, Cosmos DB), mas atado quedas al provider. Cuanto mas portatil (Kubernetes, Postgres comun, S3-compatible), mas libre pero menos productivo de inicio. NO es blanco/negro: el equilibrio sano es usar servicios gestionados que aceleran (RDS, gestion de redes) y mantener portatil lo critico (codigo de app, datos).",
    },

    { kind: "h3", text: "PARTE 12 - Edge computing" },
    {
      kind: "list",
      items: [
        "<strong>Edge functions</strong>: corren en cientos de PoPs (puntos de presencia) cerca del usuario.",
        "<strong>Latencia mínima</strong>: ~10-50ms en lugar de 100-300ms a una region central.",
        "<strong>Limitaciones</strong>: tiempo de CPU acotado, no podes correr cualquier lenguaje, no hay disco.",
        "<strong>Casos ideales</strong>: auth, A/B testing, geo-redirects, personalizacion, cache de borde, API gateway.",
        "<strong>Players principales</strong>: Cloudflare Workers, Vercel Edge Functions, Fastly Compute@Edge, AWS CloudFront Functions / Lambda@Edge.",
      ],
    },

    { kind: "h3", text: "PARTE 13 - Ponete a prueba" },
    {
      kind: "fillBlanks",
      key: "m10_fill",
      items: [
        { text: "El modelo donde alquilas servidores virtuales se llama ___.", answer: "IaaS", es: "IaaS" },
        { text: "El modelo donde solo escribis funciones (Lambda) se llama ___.", answer: "FaaS", es: "FaaS" },
        { text: "El servicio de object storage de AWS se llama ___.", answer: "S3", es: "S3" },
        { text: "El servicio de funciones serverless de AWS es ___.", answer: "Lambda", es: "Lambda" },
        { text: "El DNS gestionado de AWS se llama Route ___.", answer: "53", es: "53" },
        { text: "El servicio de Kubernetes gestionado en AWS es ___.", answer: "EKS", es: "EKS" },
        { text: "El equivalente de S3 en GCP es Cloud ___.", answer: "Storage", es: "Storage" },
        { text: "Las VMs que pueden ser interrumpidas pero cuestan -70% se llaman ___ instances.", answer: "spot", es: "spot" },
        { text: "Las VMs reservadas por 1-3 años con descuento se llaman ___ instances.", answer: "reserved", es: "reserved" },
        { text: "La filosofia de 12 principios para apps cloud-native se llama ___-Factor App.", answer: "12", es: "12" },
        { text: "La nube preferida para entornos Microsoft es ___.", answer: "Azure", es: "Azure" },
        { text: "La practica que une finanzas + ingenieria para optimizar costo cloud se llama ___.", answer: "FinOps", es: "FinOps" },
      ],
    },
    {
      kind: "matching",
      key: "m10_matching",
      pairs: [
        { en: "IaaS", es: "VMs (EC2)" },
        { en: "PaaS", es: "Plataforma (Heroku, App Engine)" },
        { en: "CaaS", es: "Containers gestionados (EKS, GKE)" },
        { en: "FaaS", es: "Funciones (Lambda)" },
        { en: "SaaS", es: "Software hosted (Gmail)" },
        { en: "S3", es: "Object storage AWS" },
        { en: "EC2", es: "Servidor virtual AWS" },
        { en: "RDS", es: "DB relacional gestionada" },
        { en: "Lambda", es: "Funcion serverless" },
        { en: "BigQuery", es: "Data warehouse GCP" },
        { en: "Spanner", es: "DB SQL global de GCP" },
        { en: "Cosmos DB", es: "DB multi-modelo global de Azure" },
        { en: "Cloud Run", es: "Containers serverless en GCP" },
        { en: "Cloudflare Workers", es: "Edge functions" },
      ],
    },
    {
      kind: "quiz",
      key: "m10_quiz",
      questions: [
        {
          q: "Cual modelo te permite escribir SOLO una funcion?",
          options: ["IaaS", "PaaS", "CaaS", "FaaS"],
          correct: 3,
        },
        {
          q: "AWS Lambda + S3 + DynamoDB es un stack tipo...",
          options: ["IaaS", "Serverless", "Bare metal", "On-prem"],
          correct: 1,
        },
        {
          q: "Costo oculto que mas sorprende en cloud bills:",
          options: ["RAM", "Egress (trafico saliente)", "Logs", "Variables de entorno"],
          correct: 1,
        },
        {
          q: "Spot Instances son ideales para...",
          options: [
            "Bases de datos en prod",
            "Cargas tolerantes a interrupciones (batch, CI runners)",
            "Pagos online",
            "DNS",
          ],
          correct: 1,
        },
        {
          q: "Cuando NO conviene la nube?",
          options: [
            "Cargas elasticas",
            "Cargas constantes/predecibles donde on-prem amortiza",
            "MVP",
            "Multi-region",
          ],
          correct: 1,
        },
        {
          q: "BigQuery es el servicio estrella de...",
          options: ["AWS", "GCP", "Azure", "Oracle Cloud"],
          correct: 1,
        },
        {
          q: "12-Factor recomienda...",
          options: [
            "Config hardcodeada en codigo",
            "Config en variables de entorno",
            "12 reuniones por sprint",
            "12 commits diarios",
          ],
          correct: 1,
        },
        {
          q: "Multi-AZ se diferencia de multi-region en que...",
          options: [
            "Son lo mismo",
            "Multi-AZ = distintos datacenters de la misma region; multi-region = otra geografia",
            "Multi-AZ es mas caro",
            "Multi-AZ no existe en AWS",
          ],
          correct: 1,
        },
        {
          q: "El servicio de Kubernetes gestionado de GCP es...",
          options: ["EKS", "AKS", "GKE", "OKE"],
          correct: 2,
        },
        {
          q: "Edge functions como Cloudflare Workers se distinguen porque...",
          options: [
            "Corren en una sola region",
            "Corren cerca del usuario en cientos de PoPs globales",
            "Son lentas",
            "Solo funcionan en JavaScript? Si",
          ],
          correct: 1,
        },
        {
          q: "Para reducir lock-in conviene...",
          options: [
            "Usar el maximo de servicios proprietary",
            "Apoyarse en estandares portables (containers, Postgres comun) cuando sea factible",
            "No usar cloud",
            "Ignorar el problema",
          ],
          correct: 1,
        },
        {
          q: "Que herramienta te muestra el costo estimado de un cambio Terraform en el PR?",
          options: ["Trivy", "Infracost", "Helm", "Falco"],
          correct: 1,
        },
      ],
    },
  ],
};
