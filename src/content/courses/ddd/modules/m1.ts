import type { ModuleData } from "@/types/course";

export const m1: ModuleData = {
  slug: "m1",
  number: 1,
  title: "¿Qué es DDD?",
  icon: "💡",
  intro: "Domain-Driven Design es un enfoque para construir software complejo: modelas el código según el negocio, no según la base de datos.",
  totalActivities: 2,
  blocks: [
    { kind: "h3", text: "💡 La idea central" },
    { kind: "paragraph", html: "DDD pone el <strong>dominio del negocio</strong> en el centro. Devs y expertos del negocio colaboran para construir un <strong>modelo</strong> que se refleja directamente en el código." },
    { kind: "info", html: "Acuñado por <strong>Eric Evans</strong> en su libro <em>Domain-Driven Design</em> (2003). Vaughn Vernon lo popularizó con ejemplos prácticos en <em>Implementing DDD</em>." },
    { kind: "h3", text: "📐 Strategic vs Tactical Design" },
    {
      kind: "table",
      headers: ["Nivel", "Qué define", "Conceptos"],
      rows: [
        ["Estratégico", "El TODO y las fronteras", "Subdomains, Bounded Contexts, Context Map, Ubiquitous Language"],
        ["Táctico", "Las piezas dentro de cada contexto", "Entity, Value Object, Aggregate, Repository, Service, Event"],
      ],
    },
    { kind: "h3", text: "🎯 Tipos de subdominios" },
    {
      kind: "list",
      items: [
        "<strong>Core Domain</strong>: el corazón del negocio, donde inviertes el mejor diseño",
        "<strong>Supporting</strong>: necesario pero no diferenciador",
        "<strong>Generic</strong>: resuelto por soluciones existentes (auth, billing, email)",
      ],
    },
    { kind: "tip", html: "<strong>💡 No apliques DDD a todo.</strong> DDD brilla en sistemas COMPLEJOS con reglas de negocio ricas. Para un CRUD simple es overhead." },
    {
      kind: "matching",
      key: "m1_matching",
      pairs: [
        { en: "Core Domain", es: "Lo que diferencia tu negocio" },
        { en: "Supporting", es: "Necesario pero no único" },
        { en: "Generic", es: "Auth, email, billing" },
        { en: "Strategic", es: "Bounded Contexts y lenguaje" },
        { en: "Tactical", es: "Entities, VOs, Aggregates" },
      ],
    },
    {
      kind: "quiz",
      key: "m1_quiz",
      questions: [
        { q: "¿Quién creó DDD?", options: ["Robert C. Martin", "Eric Evans", "Martin Fowler", "Kent Beck"], correct: 1 },
        { q: "¿Cuál es el foco de DDD?", options: ["La base de datos", "El dominio del negocio", "El frontend", "La performance"], correct: 1 },
        { q: "¿Qué es Core Domain?", options: ["Cualquier microservicio", "Lo que diferencia tu negocio", "Una librería externa", "El gateway"], correct: 1 },
        { q: "¿Cuándo NO conviene DDD?", options: ["En negocios complejos", "En CRUDs simples", "Con muchas reglas de negocio", "Con muchos equipos"], correct: 1 },
        { q: "El Strategic Design define:", options: ["Variables", "Bounded Contexts y lenguaje", "Tipos de datos", "Endpoints"], correct: 1 },
      ],
    },
  ],
};
