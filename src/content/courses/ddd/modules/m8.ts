import type { ModuleData } from "@/types/course";

export const m8: ModuleData = {
  slug: "m8",
  number: 8,
  title: "Hexagonal / Clean Architecture",
  icon: "🏗️",
  intro: "Las arquitecturas que estructuran proyectos DDD: capas concéntricas donde el dominio es el centro y NO depende de nadie.",
  totalActivities: 2,
  blocks: [
    { kind: "h3", text: "🏗️ Hexagonal Architecture (Ports & Adapters)" },
    { kind: "paragraph", html: "Diseñada por Alistair Cockburn. El <strong>dominio en el centro</strong>, rodeado de <strong>puertos</strong> (interfaces) que el dominio define. Los <strong>adaptadores</strong> implementan esos puertos (web, BD, mensajería, tests)." },
    { kind: "info", html: "Idea clave: tu app debe poder cambiar de BD, framework web o motor de mensajería <strong>sin tocar el dominio</strong>. Si toca el dominio, la dependencia va al revés." },
    { kind: "h3", text: "🧅 Clean Architecture" },
    { kind: "paragraph", html: "Popularizada por Robert C. Martin. Misma idea con más capas:" },
    {
      kind: "list",
      items: [
        "<strong>Entidades</strong> (dominio puro)",
        "<strong>Use Cases</strong> (lógica de aplicación)",
        "<strong>Interface Adapters</strong> (controladores, presentadores, gateways)",
        "<strong>Frameworks & Drivers</strong> (web, BD, UI)",
      ],
    },
    { kind: "tip", html: "<strong>💡 Regla de dependencia:</strong> el código solo puede depender de las capas <strong>más internas</strong>. NUNCA al revés. Si lo necesitas, usa interfaces (Dependency Inversion)." },
    { kind: "h3", text: "📁 Estructura típica de carpetas" },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>src/\n├── domain/            # Entidades, VOs, eventos, repos (interfaces)\n├── application/       # Use cases, command/query handlers, DTOs\n├── infrastructure/    # Implementaciones: PostgresOrderRepo, etc.\n└── interfaces/        # HTTP controllers, GraphQL resolvers, CLI</pre>",
    },
    { kind: "h3", text: "📋 Patrones avanzados" },
    {
      kind: "table",
      headers: ["Patrón", "Para qué"],
      rows: [
        ["Saga / Process Manager", "Coordinar transacciones distribuidas con compensaciones"],
        ["Outbox", "Garantizar entrega de eventos junto a cambios de BD"],
        ["Event Sourcing", "Almacenar el estado como secuencia de eventos"],
        ["Anti-Corruption Layer", "Proteger el modelo al integrarse con sistemas externos"],
        ["Specification", "Reglas de negocio reutilizables y componibles"],
      ],
    },
    {
      kind: "matching",
      key: "m8_matching",
      pairs: [
        { en: "Hexagonal", es: "Ports & Adapters" },
        { en: "Clean Arch", es: "Capas concéntricas (Robert Martin)" },
        { en: "Onion Arch", es: "Jeffrey Palermo" },
        { en: "Port", es: "Interfaz definida por el dominio" },
        { en: "Adapter", es: "Implementación concreta" },
        { en: "Outbox", es: "Entrega confiable de eventos" },
      ],
    },
    {
      kind: "quiz",
      key: "m8_quiz",
      questions: [
        { q: "Hexagonal Architecture también se conoce como:", options: ["MVC", "Ports & Adapters", "Layered", "Onion"], correct: 1 },
        { q: "¿Quién creó Clean Architecture?", options: ["Eric Evans", "Robert C. Martin", "Alistair Cockburn", "Martin Fowler"], correct: 1 },
        { q: "Regla de dependencia:", options: ["UI depende de BD", "Capas externas dependen de internas, NUNCA al revés", "Todo depende de todo", "Sin reglas"], correct: 1 },
        { q: "¿Qué es un Port en Hexagonal?", options: ["Un puerto TCP", "Interfaz que la app expone o consume", "Un endpoint HTTP", "Un Docker port"], correct: 1 },
        { q: "Outbox Pattern asegura:", options: ["Cache rápido", "Entrega confiable de eventos junto con cambios de BD", "Encriptación", "Backup"], correct: 1 },
        { q: "Event Sourcing es:", options: ["Persistir el ESTADO actual", "Persistir el estado como secuencia de eventos", "Logging", "Cache de eventos"], correct: 1 },
      ],
    },
  ],
};
