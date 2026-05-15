import type { ModuleData } from "@/types/course";

export const m3: ModuleData = {
  slug: "m3",
  number: 3,
  title: "Bounded Contexts y Context Map",
  icon: "🗺️",
  intro: "Bounded Context = frontera donde un modelo de dominio tiene un significado coherente. Es el concepto MÁS importante del Strategic Design.",
  totalActivities: 2,
  blocks: [
    { kind: "h3", text: "🗺️ El problema sin Bounded Contexts" },
    { kind: "paragraph", html: "Una clase 'Customer' que intenta servir a Ventas, Soporte, Facturación y Logística termina siendo un Frankenstein con 80 campos y nadie sabe qué significa cada uno. Solución: <strong>un Customer por contexto</strong>." },
    { kind: "h3", text: "📍 Patrones de Context Map" },
    {
      kind: "table",
      headers: ["Relación", "Descripción"],
      rows: [
        ["Partnership", "Dos equipos cooperan estrechamente"],
        ["Shared Kernel", "Comparten un subset del modelo (con cuidado)"],
        ["Customer / Supplier", "Upstream sirve a downstream"],
        ["Conformist", "Downstream se adapta sin negociar"],
        ["Anti-Corruption Layer", "Traduce activamente para no contaminar el modelo propio"],
        ["Open Host Service", "API pública estable"],
        ["Published Language", "Vocabulario publicado para integraciones"],
        ["Separate Ways", "Sin integración, evolución independiente"],
        ["Big Ball of Mud", "Sin fronteras claras (a evitar)"],
      ],
    },
    { kind: "tip", html: "<strong>💡 Bounded Context ≠ microservicio</strong>. Un BC puede ser un módulo en un monolito modular, varios servicios, o uno. La frontera es CONCEPTUAL." },
    { kind: "h3", text: "🎯 Cómo identificarlos" },
    {
      kind: "list",
      items: [
        "¿Diferentes equipos / departamentos lo usan?",
        "¿El mismo concepto significa cosas distintas?",
        "¿Hay un vocabulario propio en esa área?",
        "¿Las reglas de negocio cambian a otro ritmo?",
      ],
    },
    {
      kind: "matching",
      key: "m3_matching",
      pairs: [
        { en: "Bounded Context", es: "Frontera de un modelo" },
        { en: "Context Map", es: "Relaciones entre BCs" },
        { en: "ACL", es: "Traductor entre contextos" },
        { en: "Shared Kernel", es: "Subset compartido" },
        { en: "Conformist", es: "Se adapta sin negociar" },
        { en: "Published Language", es: "Vocabulario público estable" },
      ],
    },
    {
      kind: "quiz",
      key: "m3_quiz",
      questions: [
        { q: "¿Qué define un Bounded Context?", options: ["Un microservicio", "La frontera donde un modelo es coherente", "Un módulo de código", "Una base de datos"], correct: 1 },
        { q: "¿Bounded Context = microservicio?", options: ["Sí, siempre", "No, BC es conceptual, puede ser parte de un monolito modular", "Solo si usas Kubernetes", "Solo en cloud"], correct: 1 },
        { q: "¿Qué hace un ACL?", options: ["Validar autenticación", "Traducir entre dos BCs distintos", "Routear HTTP", "Encriptar datos"], correct: 1 },
        { q: "¿Cuál es 'a evitar'?", options: ["Bounded Contexts claros", "Big Ball of Mud (sin fronteras)", "Context Map", "ACL"], correct: 1 },
        { q: "Si 'Customer' en Ventas y en Soporte difieren:", options: ["Hay un bug", "Son modelos distintos en BCs distintos: está bien", "Hay que unificarlos siempre", "Falta normalización"], correct: 1 },
      ],
    },
  ],
};
