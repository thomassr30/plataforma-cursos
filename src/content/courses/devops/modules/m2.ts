import type { ModuleData } from "@/types/course";

export const m2: ModuleData = {
  slug: "m2",
  number: 2,
  title: "Control de Versiones con Git",
  icon: "🌿",
  intro: "Git es la herramienta más usada del mundo para versionar código. Sin Git, no hay DevOps. Aprende los comandos esenciales y los flujos de trabajo más usados.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "📦 Comandos básicos" },
    {
      kind: "table",
      headers: ["Comando", "Descripción"],
      rows: [
        ["git init", "Inicializa un nuevo repositorio"],
        ["git clone <url>", "Clona un repositorio remoto"],
        ["git status", "Muestra el estado del working directory"],
        ["git add <archivo>", "Agrega cambios al staging area"],
        ["git commit -m 'mensaje'", "Confirma cambios al historial"],
        ["git push origin <rama>", "Sube cambios al remoto"],
        ["git pull", "Trae y fusiona cambios del remoto"],
        ["git log", "Muestra el historial de commits"],
      ],
    },
    { kind: "h3", text: "🌿 Ramas (Branches)" },
    {
      kind: "table",
      headers: ["Comando", "Acción"],
      rows: [
        ["git branch", "Lista las ramas locales"],
        ["git branch <nombre>", "Crea una nueva rama"],
        ["git checkout <nombre> / git switch <nombre>", "Cambia de rama"],
        ["git checkout -b <nombre>", "Crea y cambia en un paso"],
        ["git merge <rama>", "Fusiona la rama actual con otra"],
        ["git rebase <rama>", "Reaplica commits encima de otra base"],
        ["git branch -d <nombre>", "Borra una rama local"],
      ],
    },
    { kind: "tip", html: "<strong>💡 Merge vs Rebase:</strong> Merge preserva el historial con un commit de fusión. Rebase reescribe la historia para hacerla lineal. <strong>Nunca rebases ramas compartidas.</strong>" },
    { kind: "h3", text: "🔄 Git Flow vs Trunk-Based" },
    { kind: "paragraph", html: "<strong>Git Flow</strong>: ramas <code>main</code>, <code>develop</code>, <code>feature/*</code>, <code>release/*</code>, <code>hotfix/*</code>. Complejo pero ordenado. <strong>Trunk-Based</strong>: todos commit a <code>main</code>, feature flags, deploys continuos. Más rápido y moderno." },
    {
      kind: "fillBlanks",
      key: "m2_fill",
      items: [
        { text: "git ___ inicia un nuevo repositorio.", answer: "init", es: "init" },
        { text: "git ___ -m 'mensaje' confirma cambios.", answer: "commit", es: "commit" },
        { text: "git ___ origin main sube cambios al remoto.", answer: "push", es: "push" },
        { text: "git ___ -b nueva crea y cambia a una rama.", answer: "checkout", es: "checkout" },
        { text: "Para fusionar usamos git ___ rama.", answer: "merge", es: "merge" },
        { text: "git ___ muestra el historial.", answer: "log", es: "log" },
      ],
    },
    {
      kind: "drag",
      key: "m2_drag",
      items: [
        { words: ["git", "add", ".", "&&", "git", "commit", "-m", "fix"], es: "agregar todo y commit" },
        { words: ["git", "checkout", "-b", "feature/login"], es: "crear rama feature/login" },
        { words: ["git", "push", "origin", "main"], es: "subir a remoto main" },
      ],
    },
    {
      kind: "quiz",
      key: "m2_quiz",
      questions: [
        { q: "¿Qué comando inicia un repo nuevo?", options: ["git start", "git init", "git create", "git new"], correct: 1 },
        { q: "¿Qué comando muestra cambios pendientes?", options: ["git status", "git changes", "git diff staged", "git review"], correct: 0 },
        { q: "¿Cómo creas y cambias de rama en un paso?", options: ["git branch -c", "git checkout -b", "git switch -n", "git new -b"], correct: 1 },
        { q: "¿Qué hace 'git rebase'?", options: ["Borra commits", "Reescribe historial reaplicando commits", "Crea ramas", "Sube al remoto"], correct: 1 },
        { q: "¿Qué comando trae cambios del remoto?", options: ["git fetch", "git pull", "git get", "git download"], correct: 1 },
        { q: "¿Qué archivo NO debe ir al repo?", options: [".gitignore", "node_modules/", "README.md", "package.json"], correct: 1 },
        { q: "¿Qué es un PR?", options: ["Push Request", "Pull Request: solicitud de revisión y merge", "Project Repository", "Public Release"], correct: 1 },
      ],
    },
  ],
};
