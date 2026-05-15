import type { ModuleData } from "@/types/course";

export const m5: ModuleData = {
  slug: "m5",
  number: 5,
  title: "Aggregates y Aggregate Root",
  icon: "🏛️",
  intro: "Un Aggregate es un cluster de entidades + value objects tratado como UNA UNIDAD. La Aggregate Root es la única puerta de entrada.",
  totalActivities: 2,
  blocks: [
    { kind: "h3", text: "🏛️ ¿Por qué necesitamos Aggregates?" },
    { kind: "paragraph", html: "Imagina un <code>Order</code> con varios <code>LineItem</code>s. Si cualquiera puede modificar los items directamente, ¿quién garantiza que el total cuadra, que no hay items duplicados, que no se pasan del stock? La <strong>Aggregate Root</strong> lo garantiza." },
    { kind: "h3", text: "📐 Reglas de los Aggregates" },
    {
      kind: "list",
      items: [
        "Solo se accede al agregado por su <strong>Root</strong> (raíz)",
        "Los demás objetos del agregado son privados",
        "Las <strong>invariantes</strong> (reglas) siempre se cumplen tras cualquier operación",
        "Los agregados se referencian entre sí <strong>por ID</strong>, no por referencia directa",
        "Cada transacción afecta a UN solo agregado (consistencia fuerte)",
      ],
    },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>class Order { // Aggregate Root\n  private items: LineItem[] = [];\n  constructor(public readonly id: OrderId, public readonly customerId: CustomerId) {}\n\n  addItem(product: ProductSnapshot, qty: number) {\n    if (qty <= 0) throw new Error('qty must be > 0');\n    if (this.items.length >= 50) throw new Error('Too many items');\n    this.items.push(new LineItem(product, qty));\n  }\n\n  get total(): Money { /* suma de items */ }\n}</pre>",
    },
    { kind: "h3", text: "📏 Tamaño del agregado" },
    {
      kind: "list",
      items: [
        "<strong>Pequeños</strong> mejor que grandes: mejor performance, menos contención",
        "Pregunta clave: <em>¿qué necesita ser consistente al instante?</em> eso va junto",
        "<strong>Eventual consistency</strong> entre agregados es OK",
      ],
    },
    { kind: "tip", html: "<strong>💡 Regla:</strong> Si dos cosas pueden estar 'desincronizadas un momentito' sin causar problemas → agregados separados. Si DEBEN ser consistentes en el mismo instante → mismo agregado." },
    {
      kind: "fillBlanks",
      key: "m5_fill",
      items: [
        { text: "La única entrada al agregado es la ___", answer: "Root", es: "Root" },
        { text: "Los agregados se referencian por ___", answer: "ID", es: "ID" },
        { text: "Una regla que SIEMPRE debe cumplirse es una ___", answer: "invariante", es: "invariante" },
        { text: "Una transacción cambia ___ agregado(s).", answer: "un", es: "un" },
      ],
    },
    {
      kind: "quiz",
      key: "m5_quiz",
      questions: [
        { q: "¿Quién garantiza las invariantes?", options: ["La base de datos", "El Aggregate Root", "El repositorio", "El servicio"], correct: 1 },
        { q: "¿Cómo se referencian agregados entre sí?", options: ["Por referencia directa", "Por ID", "Por nombre", "No se pueden"], correct: 1 },
        { q: "¿Una transacción debe afectar?", options: ["Muchos agregados a la vez", "Idealmente UN solo agregado", "Solo Value Objects", "Solo entidades"], correct: 1 },
        { q: "¿Los Aggregates conviene que sean?", options: ["Lo más grande posible", "Lo más pequeños posible manteniendo invariantes", "Solo de un campo", "Solo entities sin VOs"], correct: 1 },
        { q: "¿Una invariante de Order podría ser?", options: ["Total >= 0", "Máximo 50 items", "Customer válido", "Todas las anteriores"], correct: 3 },
      ],
    },
  ],
};
