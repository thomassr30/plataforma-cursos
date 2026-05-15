import type { ModuleData } from "@/types/course";

export const m8: ModuleData = {
  slug: "m8",
  number: 8,
  title: "Monitoreo y Observabilidad",
  icon: "📊",
  intro: "Si no lo mides, no lo puedes mejorar. Observabilidad = métricas + logs + traces. Vamos a ver las herramientas clave.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "📊 Los 3 pilares" },
    {
      kind: "table",
      headers: ["Pilar", "Qué responde", "Herramienta típica"],
      rows: [
        ["Métricas", "¿Qué tan rápido? ¿Cuánto?", "Prometheus"],
        ["Logs", "¿Qué pasó? (texto)", "ELK / Loki"],
        ["Traces", "¿Por dónde pasó la request?", "Jaeger / Tempo"],
      ],
    },
    { kind: "h3", text: "📈 Métricas: USE y RED" },
    { kind: "paragraph", html: "<strong>USE</strong> (para recursos): Utilization, Saturation, Errors. <strong>RED</strong> (para servicios): Rate, Errors, Duration. Son los principios de qué medir." },
    { kind: "h3", text: "🎯 SLO, SLA, SLI" },
    {
      kind: "table",
      headers: ["Sigla", "Qué es"],
      rows: [
        ["SLI", "Service Level Indicator: lo que mides (latencia, errores)"],
        ["SLO", "Service Level Objective: el objetivo interno (99.9% uptime)"],
        ["SLA", "Service Level Agreement: el compromiso con el cliente (con penalización)"],
        ["Error budget", "100% - SLO. Cuántos errores te permites en el periodo"],
      ],
    },
    { kind: "h3", text: "🛠️ Stack típico" },
    {
      kind: "vocab",
      items: [
        { word: "Prometheus", meaning: "Métricas (pull-based)" },
        { word: "Grafana", meaning: "Dashboards" },
        { word: "Alertmanager", meaning: "Alertas con routing" },
        { word: "Loki", meaning: "Logs estilo Prometheus" },
        { word: "Tempo / Jaeger", meaning: "Distributed tracing" },
        { word: "OpenTelemetry", meaning: "Estándar de instrumentación" },
      ],
    },
    { kind: "tip", html: "<strong>💡 Alerta sobre síntomas, no causas.</strong> Alerta cuando los usuarios sufren (alta latencia, errores), no por cada CPU al 90%. Eso lleva a fatiga de alertas." },
    {
      kind: "fillBlanks",
      key: "m8_fill",
      items: [
        { text: "Para métricas usamos: ___", answer: "Prometheus", es: "Prometheus" },
        { text: "Para dashboards usamos: ___", answer: "Grafana", es: "Grafana" },
        { text: "El objetivo interno se llama ___", answer: "SLO", es: "SLO" },
        { text: "El compromiso con el cliente se llama ___", answer: "SLA", es: "SLA" },
        { text: "El indicador medido es el ___", answer: "SLI", es: "SLI" },
      ],
    },
    {
      kind: "matching",
      key: "m8_matching",
      pairs: [
        { en: "Métricas", es: "Prometheus" },
        { en: "Logs", es: "ELK / Loki" },
        { en: "Traces", es: "Jaeger / Tempo" },
        { en: "Dashboards", es: "Grafana" },
        { en: "Alertas", es: "Alertmanager" },
        { en: "Instrumentación", es: "OpenTelemetry" },
      ],
    },
    {
      kind: "quiz",
      key: "m8_quiz",
      questions: [
        { q: "Los 3 pilares de observabilidad son:", options: ["CPU/RAM/Disco", "Métricas/Logs/Traces", "Frontend/Backend/DB", "Dev/Test/Prod"], correct: 1 },
        { q: "¿Qué representa SLO?", options: ["Compromiso con cliente", "Objetivo interno de fiabilidad", "Indicador medido", "Acuerdo legal"], correct: 1 },
        { q: "¿Qué herramienta es para tracing distribuido?", options: ["Prometheus", "Grafana", "Jaeger", "Alertmanager"], correct: 2 },
        { q: "RED es para:", options: ["Recursos", "Servicios (Rate, Errors, Duration)", "Bases de datos", "Networking"], correct: 1 },
        { q: "¿Qué es un error budget?", options: ["Presupuesto monetario", "Cantidad permitida de errores (100%-SLO)", "Número de bugs", "Tickets sin resolver"], correct: 1 },
      ],
    },
  ],
};
