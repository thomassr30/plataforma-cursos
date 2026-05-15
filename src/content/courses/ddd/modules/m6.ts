import type { ModuleData } from "@/types/course";

export const m6: ModuleData = {
  slug: "m6",
  number: 6,
  title: "Repositories, Services y Domain Events",
  icon: "🔌",
  intro: "Los puentes con el resto del sistema: cómo persistir agregados, dónde poner lógica compartida y cómo comunicar lo que pasó.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "📚 Repository" },
    { kind: "paragraph", html: "Abstracción que da la <strong>ilusión de una colección en memoria</strong> de agregados. El dominio no sabe SQL, MongoDB ni Redis." },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>// Interfaz en el dominio\ninterface OrderRepository {\n  save(order: Order): Promise&lt;void&gt;;\n  findById(id: OrderId): Promise&lt;Order | null&gt;;\n  findByCustomer(customerId: CustomerId): Promise&lt;Order[]&gt;;\n}\n\n// Implementación en infraestructura\nclass PostgresOrderRepository implements OrderRepository { ... }</pre>",
    },
    { kind: "h3", text: "🛠️ Domain Service" },
    {
      kind: "list",
      items: [
        "Lógica que NO pertenece naturalmente a una entidad sola",
        "Es STATELESS",
        "Su nombre proviene del lenguaje ubicuo",
        "Ejemplo: <code>FundsTransferService.transfer(from, to, amount)</code>",
      ],
    },
    { kind: "tip", html: "<strong>💡 Antes de crear un Service:</strong> pregúntate si la lógica puede ir en una de las entidades. Solo úsalo si genuinamente involucra varios agregados o no tiene 'dueño' claro." },
    { kind: "h3", text: "📢 Domain Event" },
    {
      kind: "list",
      items: [
        "Algo importante que <strong>pasó</strong> en el dominio (pasado, inmutable)",
        "Nombre: <code>OrderPlaced</code>, <code>PaymentProcessed</code>, <code>UserRegistered</code>",
        "Lo emite el agregado tras un cambio de estado",
        "Otros agregados / contextos reaccionan SIN acoplamiento directo",
      ],
    },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>class Order {\n  place() {\n    if (this.status !== 'draft') throw new Error('Cannot place');\n    this.status = 'placed';\n    this.events.push(new OrderPlaced(this.id, this.customerId, this.total));\n  }\n}</pre>",
    },
    {
      kind: "matching",
      key: "m6_matching",
      pairs: [
        { en: "Repository", es: "Persistir/recuperar agregados" },
        { en: "Domain Service", es: "Lógica entre varios agregados" },
        { en: "Domain Event", es: "Algo importante que pasó" },
        { en: "Application Service", es: "Orquesta casos de uso" },
        { en: "Factory", es: "Crea agregados complejos" },
        { en: "Specification", es: "Regla reutilizable" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m6_fill",
      items: [
        { text: "Para persistir un agregado usamos un ___", answer: "Repository", es: "Repository" },
        { text: "Los eventos van en pasado: OrderPlaced, PaymentProcessed... son Domain ___", answer: "Events", es: "Events" },
        { text: "Lógica que no encaja en una entidad sola va en un Domain ___", answer: "Service", es: "Service" },
      ],
    },
    {
      kind: "quiz",
      key: "m6_quiz",
      questions: [
        { q: "¿Qué hace un Repository?", options: ["Renderizar UI", "Abstraer la persistencia", "Validar", "Procesar pagos"], correct: 1 },
        { q: "Un Domain Service es:", options: ["Stateful", "Stateless: lógica entre agregados", "Una UI", "Un test"], correct: 1 },
        { q: "Un Domain Event se nombra en:", options: ["Presente continuo", "Pasado: OrderPlaced", "Futuro", "Imperativo"], correct: 1 },
        { q: "¿Quién emite un Domain Event?", options: ["El Controller", "El Agregado tras un cambio de estado", "La BD", "El frontend"], correct: 1 },
        { q: "El Repository debería conocer:", options: ["SQL en el dominio", "El motor de BD: NO. El dominio define la interfaz, infraestructura la implementa", "Solo MongoDB", "Solo PostgreSQL"], correct: 1 },
      ],
    },
  ],
};
