import type { ModuleData } from "@/types/course";

export const m10: ModuleData = {
  slug: "m10",
  number: 10,
  title: "Deploy en la Nube (AWS, Vercel, Railway)",
  icon: "☁️",
  intro: "Cómo desplegar tu app en proveedores cloud reales. Veremos las opciones más populares y cuándo usar cada una.",
  totalActivities: 2,
  blocks: [
    { kind: "h3", text: "☁️ Categorías de servicios" },
    {
      kind: "table",
      headers: ["Modelo", "Tú gestionas", "Proveedor gestiona", "Ejemplos"],
      rows: [
        ["IaaS", "OS, runtime, app", "Hardware, red", "AWS EC2, GCP Compute"],
        ["PaaS", "Solo tu app", "Todo lo demás", "Heroku, Railway, Render"],
        ["Containers (CaaS)", "Imagen, config", "Kubernetes, runtime", "ECS, EKS, GKE"],
        ["Serverless (FaaS)", "Tu función", "TODO lo demás", "AWS Lambda, Vercel Functions"],
        ["Edge", "Tu función", "Red global de PoPs", "Cloudflare Workers, Vercel Edge"],
      ],
    },
    { kind: "h3", text: "📐 AWS: servicios clave" },
    {
      kind: "vocab",
      items: [
        { word: "EC2", meaning: "Servidores virtuales" },
        { word: "S3", meaning: "Almacenamiento de objetos" },
        { word: "RDS", meaning: "Bases de datos gestionadas" },
        { word: "Lambda", meaning: "Funciones serverless" },
        { word: "VPC", meaning: "Red privada virtual" },
        { word: "Route 53", meaning: "DNS" },
        { word: "CloudFront", meaning: "CDN" },
        { word: "IAM", meaning: "Identidad y acceso" },
        { word: "EKS", meaning: "Kubernetes gestionado" },
      ],
    },
    { kind: "h3", text: "🚀 Cuándo usar Vercel vs AWS vs Railway" },
    {
      kind: "table",
      headers: ["Caso", "Mejor opción"],
      rows: [
        ["App Next.js/React, sin servidor propio", "Vercel"],
        ["Stack completo con BD y workers", "Railway / Render"],
        ["Alta escala, mucho control, multi-región", "AWS"],
        ["MVP/prototipo rápido", "Vercel o Railway"],
        ["Workloads críticos con compliance", "AWS / GCP / Azure"],
      ],
    },
    { kind: "tip", html: "<strong>💡 12-Factor App</strong> (12factor.net): los 12 principios para construir apps cloud-ready. Config en variables de entorno, logs como streams, stateless processes... léelo." },
    { kind: "h3", text: "💰 Costos: lo más caro" },
    {
      kind: "list",
      items: [
        "<strong>Tráfico saliente</strong> (egress): a menudo el mayor costo oculto",
        "<strong>Instancias siempre encendidas</strong>: usa autoscaling y spot instances",
        "<strong>NAT Gateway</strong> en AWS: muy caro, evítalo si puedes",
        "<strong>Storage no comprimido / sin lifecycle</strong>: archiva con S3 Glacier",
      ],
    },
    {
      kind: "matching",
      key: "m10_matching",
      pairs: [
        { en: "Vercel", es: "Mejor para Next.js" },
        { en: "Railway", es: "Stack completo simple" },
        { en: "AWS EC2", es: "Servidor virtual flexible" },
        { en: "AWS Lambda", es: "Función serverless" },
        { en: "Cloudflare Workers", es: "Edge functions globales" },
        { en: "S3", es: "Almacenamiento de objetos" },
      ],
    },
    {
      kind: "quiz",
      key: "m10_quiz",
      questions: [
        { q: "¿Cuál es PaaS?", options: ["AWS EC2", "Heroku/Railway", "AWS Lambda", "Cloudflare Workers"], correct: 1 },
        { q: "¿Qué servicio de AWS es serverless?", options: ["EC2", "RDS", "Lambda", "S3"], correct: 2 },
        { q: "¿Qué hace CloudFront?", options: ["Base de datos", "CDN para acelerar contenido", "DNS", "Storage"], correct: 1 },
        { q: "¿Vercel está optimizado para?", options: ["Java EE", "Next.js / React", "Mainframes", "Solo backend"], correct: 1 },
        { q: "Costo cloud sorpresivamente alto:", options: ["RAM", "Egress (tráfico saliente)", "Logs", "Variables de entorno"], correct: 1 },
        { q: "12-Factor recomienda:", options: ["Config en archivos JSON commiteados", "Config en variables de entorno", "Config hardcoded", "Sin config"], correct: 1 },
      ],
    },
  ],
};
