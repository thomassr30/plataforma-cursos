import type { ModuleData } from "@/types/course";

export const m9: ModuleData = {
  slug: "m9",
  number: 9,
  title: "DevSecOps: Seguridad en DevOps",
  icon: "🔒",
  intro: "Integrar la seguridad en cada paso del ciclo. 'Shift left': detectar vulnerabilidades lo antes posible, no en producción.",
  totalActivities: 2,
  blocks: [
    { kind: "h3", text: "🔒 Principios" },
    {
      kind: "list",
      items: [
        "<strong>Least privilege</strong>: mínimo permiso necesario, siempre",
        "<strong>Defense in depth</strong>: capas de seguridad (red, app, datos)",
        "<strong>Zero Trust</strong>: nunca confíes, siempre verifica",
        "<strong>Shift left</strong>: seguridad desde el desarrollo, no al final",
        "<strong>Immutable infra</strong>: no parchees, reemplaza",
      ],
    },
    { kind: "h3", text: "🛡️ Áreas clave" },
    {
      kind: "table",
      headers: ["Área", "Qué proteges", "Herramientas"],
      rows: [
        ["Secrets", "Passwords, tokens, keys", "Vault, AWS Secrets Manager"],
        ["SAST", "Código fuente", "SonarQube, Semgrep, CodeQL"],
        ["DAST", "App corriendo", "OWASP ZAP, Burp"],
        ["SCA", "Dependencias", "Snyk, Dependabot"],
        ["Image scan", "Imágenes Docker", "Trivy, Clair"],
        ["IAM", "Identidad y acceso", "AWS IAM, RBAC k8s"],
      ],
    },
    { kind: "h3", text: "🔑 Gestión de secrets" },
    {
      kind: "list",
      items: [
        "❌ <strong>NUNCA</strong> commitees secrets a git",
        "✅ Usa <code>.env.local</code> y añádelo a <code>.gitignore</code>",
        "✅ En CI/CD usa <strong>secrets de la plataforma</strong> (GitHub Secrets, etc.)",
        "✅ En k8s usa <strong>Secret</strong> (o mejor, External Secrets + Vault)",
        "✅ Rota credenciales regularmente",
      ],
    },
    { kind: "tip", html: "<strong>💡 Si un secret se filtra:</strong> rotarlo INMEDIATAMENTE. Asumir que fue comprometido. Limpiar el historial de git con BFG o git-filter-repo (y aún así rotar)." },
    {
      kind: "matching",
      key: "m9_matching",
      pairs: [
        { en: "SAST", es: "Análisis estático del código" },
        { en: "DAST", es: "Análisis dinámico de la app" },
        { en: "SCA", es: "Análisis de dependencias" },
        { en: "RBAC", es: "Control por roles" },
        { en: "Vault", es: "Gestor de secrets" },
        { en: "Trivy", es: "Scanner de imágenes" },
      ],
    },
    {
      kind: "quiz",
      key: "m9_quiz",
      questions: [
        { q: "¿Qué significa 'shift left' en seguridad?", options: ["Mover servidores a la izquierda", "Detectar problemas lo antes posible en el ciclo", "Ignorar errores", "Solo escanear en producción"], correct: 1 },
        { q: "¿Qué hace SAST?", options: ["Escanea apps en ejecución", "Analiza el código fuente estáticamente", "Audita la red", "Encripta datos"], correct: 1 },
        { q: "¿Dónde NUNCA debe ir un secret?", options: ["Vault", "En una variable de entorno", "En git", "En GitHub Secrets"], correct: 2 },
        { q: "¿Qué es 'least privilege'?", options: ["Dar todos los permisos", "Dar el mínimo permiso necesario", "Negar todo siempre", "Bloquear usuarios"], correct: 1 },
        { q: "¿Qué herramienta gestiona secrets en empresas?", options: ["HashiCorp Vault", "Notepad", "Excel", "Git"], correct: 0 },
      ],
    },
  ],
};
