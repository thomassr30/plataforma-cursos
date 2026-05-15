import type { ModuleData } from "@/types/course";

export const m4: ModuleData = {
  slug: "m4",
  number: 4,
  title: "CI/CD con GitHub Actions",
  icon: "⚙️",
  intro: "CI/CD automatiza el proceso de probar, construir y desplegar tu código. Vamos a ver cómo se configura con GitHub Actions, la opción más usada hoy.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "⚙️ ¿Qué es CI/CD?" },
    {
      kind: "table",
      headers: ["Sigla", "Significado", "Cuándo se ejecuta"],
      rows: [
        ["CI", "Continuous Integration", "En cada push/PR: lint, test, build"],
        ["CD", "Continuous Delivery", "Tras CI: deploy a staging automático, prod manual"],
        ["CD", "Continuous Deployment", "Tras CI: deploy a producción TOTALMENTE automático"],
      ],
    },
    { kind: "h3", text: "📄 GitHub Actions: estructura" },
    { kind: "paragraph", html: "Los workflows viven en <code>.github/workflows/*.yml</code>. Un workflow tiene <strong>jobs</strong>, cada job tiene <strong>steps</strong>." },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>name: CI\non:\n  push: { branches: [main] }\n  pull_request:\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: '20' }\n      - run: npm ci\n      - run: npm test</pre>",
    },
    { kind: "h3", text: "🚀 Estrategias de deploy" },
    {
      kind: "table",
      headers: ["Estrategia", "Cómo funciona"],
      rows: [
        ["Recreate", "Apaga lo viejo, levanta lo nuevo (downtime)"],
        ["Rolling", "Sustituye instancias gradualmente"],
        ["Blue/Green", "Dos entornos paralelos, switch instantáneo"],
        ["Canary", "Despliega a % de usuarios, valida y escala"],
        ["Feature Flags", "Código va a prod desactivado, activación selectiva"],
      ],
    },
    { kind: "tip", html: "<strong>💡 Pirámide de tests:</strong> muchos unit tests (rápidos), menos integration, pocos e2e. Si tu pipeline tarda > 10 minutos, optimízalo o paralelízalo." },
    {
      kind: "fillBlanks",
      key: "m4_fill",
      items: [
        { text: "Los workflows van en .___/workflows/", answer: "github", es: "github" },
        { text: "Para correr en cada push: ___:", answer: "on", es: "on" },
        { text: "Cada job se ejecuta en un ___", answer: "runner", es: "runner" },
        { text: "Estrategia con dos entornos paralelos: ___/green", answer: "blue", es: "blue" },
        { text: "Despliegue gradual a un % es: ___", answer: "canary", es: "canary" },
      ],
    },
    {
      kind: "drag",
      key: "m4_drag",
      items: [
        { words: ["lint", "test", "build", "deploy"], es: "etapas típicas del pipeline" },
        { words: ["checkout", "setup-node", "install", "test"], es: "steps comunes" },
      ],
    },
    {
      kind: "quiz",
      key: "m4_quiz",
      questions: [
        { q: "¿Qué hace 'actions/checkout@v4'?", options: ["Despliega", "Clona el repo en el runner", "Corre tests", "Sube artefactos"], correct: 1 },
        { q: "¿Qué dispara un workflow?", options: ["jobs", "on", "steps", "runs-on"], correct: 1 },
        { q: "¿Qué estrategia tiene 0 downtime y permite rollback rápido?", options: ["Recreate", "Rolling", "Blue/Green", "Manual"], correct: 2 },
        { q: "¿Para qué sirve Canary?", options: ["Cancelar deploys", "Desplegar a % de usuarios para validar", "Hacer rollback", "Ejecutar tests"], correct: 1 },
        { q: "¿Qué tests deberían ser MÁS?", options: ["E2E", "Integration", "Unit", "Manual"], correct: 2 },
        { q: "¿Qué hace 'runs-on: ubuntu-latest'?", options: ["Especifica el sistema operativo del runner", "Instala Ubuntu", "Selecciona un servidor", "Reinicia el sistema"], correct: 0 },
      ],
    },
  ],
};
