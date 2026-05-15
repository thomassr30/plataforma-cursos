import type { ModuleData } from "@/types/course";

export const m7: ModuleData = {
  slug: "m7",
  number: 7,
  title: "Application Layer y Use Cases",
  icon: "🎯",
  intro: "Encima del dominio va la capa de aplicación: orquesta los casos de uso pero NO contiene lógica de negocio.",
  totalActivities: 2,
  blocks: [
    { kind: "h3", text: "🎯 Application Service vs Domain Service" },
    {
      kind: "table",
      headers: ["Application Service", "Domain Service"],
      rows: [
        ["Orquesta el caso de uso", "Lógica de dominio entre agregados"],
        ["Conoce transacciones, eventos, infraestructura", "Solo conoce dominio"],
        ["Nombre: <code>PlaceOrderUseCase</code>", "Nombre: <code>FundsTransferService</code>"],
        ["DTOs de entrada/salida", "Trabaja con entidades del dominio"],
      ],
    },
    { kind: "h3", text: "📐 Ejemplo de Use Case" },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>class PlaceOrderUseCase {\n  constructor(\n    private orders: OrderRepository,\n    private customers: CustomerRepository,\n    private eventBus: EventBus,\n  ) {}\n\n  async execute(cmd: PlaceOrderCommand): Promise&lt;OrderDTO&gt; {\n    const customer = await this.customers.findById(cmd.customerId);\n    if (!customer) throw new Error('Customer not found');\n\n    const order = Order.create(customer.id, cmd.items);\n    await this.orders.save(order);\n    await this.eventBus.publish(order.pullEvents());\n\n    return OrderDTO.from(order);\n  }\n}</pre>",
    },
    { kind: "h3", text: "📨 Command vs Query" },
    {
      kind: "table",
      headers: ["Command", "Query"],
      rows: [
        ["Cambia el estado", "Solo lee"],
        ["No devuelve datos (o solo confirmación)", "Devuelve datos"],
        ["<code>PlaceOrderCommand</code>", "<code>GetOrdersByCustomer</code>"],
        ["Pasa por el modelo de dominio", "Puede saltarse el modelo (read model)"],
      ],
    },
    { kind: "h3", text: "⚡ CQRS" },
    { kind: "paragraph", html: "<strong>CQRS</strong> (Command Query Responsibility Segregation): separa las clases que <strong>escriben</strong> de las que <strong>leen</strong>. Útil cuando lecturas y escrituras tienen necesidades MUY distintas (performance, modelo, escala)." },
    { kind: "tip", html: "<strong>💡 Cuándo usar CQRS:</strong> dominio complejo + lecturas muy distintas + necesitas escalar lecturas. Si tu app es CRUD, CQRS es overkill." },
    {
      kind: "fillBlanks",
      key: "m7_fill",
      items: [
        { text: "Una intención de cambiar el estado es un ___", answer: "Command", es: "Command" },
        { text: "Una lectura sin cambiar estado es una ___", answer: "Query", es: "Query" },
        { text: "Separar lecturas de escrituras es el patrón ___", answer: "CQRS", es: "CQRS" },
        { text: "Para transportar datos entre capas usamos ___", answer: "DTO", es: "DTO" },
      ],
    },
    {
      kind: "quiz",
      key: "m7_quiz",
      questions: [
        { q: "Un Application Service debe contener:", options: ["Lógica de negocio compleja", "Orquestación, sin lógica de dominio", "Solo SQL", "Solo HTML"], correct: 1 },
        { q: "Un Command es:", options: ["Una lectura", "Una intención de cambiar el estado", "Un evento", "Una respuesta"], correct: 1 },
        { q: "CQRS significa:", options: ["Common Query Response Spec", "Command Query Responsibility Segregation", "Centralized Query Response System", "Cache Query Response Service"], correct: 1 },
        { q: "Un DTO sirve para:", options: ["Lógica de negocio", "Transportar datos entre capas", "Validar BD", "Renderizar UI"], correct: 1 },
        { q: "Use Case = ?", options: ["Una clase abstracta", "Una intención del usuario (Crear pedido, etc.)", "Una BD", "Una vista"], correct: 1 },
      ],
    },
  ],
};
