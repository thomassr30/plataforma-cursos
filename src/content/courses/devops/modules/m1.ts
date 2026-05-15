import type { ModuleData } from "@/types/course";

export const m1: ModuleData = {
  slug: "m1",
  number: 1,
  title: "Introducción a DevOps",
  icon: "🚀",
  intro: "DevOps no es una herramienta: es una CULTURA que une desarrollo (Dev) y operaciones (Ops) para entregar software más rápido y con mejor calidad.",
  totalActivities: 2,
  blocks: [
    { kind: "h3", text: "🚀 ¿Qué es DevOps?" },
    { kind: "paragraph", html: "DevOps es la unión de <strong>personas, procesos y herramientas</strong> para entregar valor al usuario final de forma continua. Rompe el muro tradicional entre quienes <strong>desarrollan</strong> el software y quienes lo <strong>operan</strong> en producción." },
    { kind: "h3", text: "📐 Los 5 pilares (CALMS)" },
    {
      kind: "table",
      headers: ["Letra", "Pilar", "Descripción"],
      rows: [
        ["C", "Culture", "Colaboración entre equipos, blameless post-mortems"],
        ["A", "Automation", "Automatizar todo lo posible: tests, builds, deploys, infra"],
        ["L", "Lean", "Reducir desperdicios, ciclos cortos, feedback rápido"],
        ["M", "Measurement", "Medir todo: deploys, errores, performance, satisfacción"],
        ["S", "Sharing", "Compartir conocimiento, herramientas y responsabilidades"],
      ],
    },
    { kind: "h3", text: "🎯 Beneficios" },
    {
      kind: "list",
      items: [
        "<strong>Despliegues más frecuentes</strong> (de semanas a varias veces al día)",
        "<strong>Menor tiempo de recuperación</strong> ante fallos (MTTR)",
        "<strong>Mejor calidad</strong>: detectar bugs antes",
        "<strong>Mayor satisfacción</strong> del equipo y del usuario",
      ],
    },
    { kind: "h3", text: "🛠️ Herramientas típicas del ecosistema" },
    {
      kind: "vocab",
      items: [
        { word: "Git", meaning: "Control de versiones" },
        { word: "Docker", meaning: "Contenedores" },
        { word: "Kubernetes", meaning: "Orquestación" },
        { word: "Terraform", meaning: "IaC" },
        { word: "Ansible", meaning: "Configuración" },
        { word: "Jenkins/GitHub Actions", meaning: "CI/CD" },
        { word: "Prometheus", meaning: "Monitoreo" },
        { word: "Grafana", meaning: "Dashboards" },
      ],
    },
    { kind: "tip", html: "<strong>💡 Mito:</strong> DevOps NO es 'que el dev también haga ops'. Es trabajar juntos, compartir herramientas y eliminar silos." },
    {
      kind: "matching",
      key: "m1_matching",
      pairs: [
        { en: "CI", es: "Integración Continua" },
        { en: "CD", es: "Entrega/Despliegue Continuo" },
        { en: "IaC", es: "Infraestructura como Código" },
        { en: "SRE", es: "Ingeniería de Fiabilidad" },
        { en: "MTTR", es: "Tiempo medio de recuperación" },
        { en: "GitOps", es: "Git como fuente de verdad" },
      ],
    },
    {
      kind: "quiz",
      key: "m1_quiz",
      questions: [
        { q: "¿Qué representa la 'C' en CALMS?", options: ["Code", "Culture", "Continuous", "Cloud"], correct: 1 },
        { q: "¿Qué NO es DevOps?", options: ["Una cultura", "Una herramienta específica", "Un conjunto de prácticas", "Una forma de trabajar"], correct: 1 },
        { q: "¿Cuál es un beneficio principal de DevOps?", options: ["Más reuniones", "Despliegues más frecuentes y confiables", "Eliminar developers", "Eliminar QA"], correct: 1 },
        { q: "MTTR significa:", options: ["Mean Time To Recovery", "Many Tools To Run", "Master The Tech Right", "Mean Tasks Tested Repeatedly"], correct: 0 },
        { q: "¿Qué herramienta es para CI/CD?", options: ["Docker", "GitHub Actions", "Grafana", "Terraform"], correct: 1 },
      ],
    },
  ],
};
