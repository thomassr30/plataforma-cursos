import type { ModuleData } from "@/types/course";

export const m2: ModuleData = {
  slug: "m2",
  number: 2,
  title: "Ubiquitous Language",
  icon: "🗣️",
  intro: "El Lenguaje Ubicuo es el VOCABULARIO COMPARTIDO entre desarrolladores y expertos del negocio. Sin esto, no hay DDD.",
  totalActivities: 2,
  blocks: [
    { kind: "h3", text: "🗣️ La esencia" },
    { kind: "paragraph", html: "Si el negocio dice <strong>'devolución'</strong>, el código tiene <code>Refund</code>, las tests dicen <code>shouldProcessRefund</code> y la BD tiene una tabla <code>refunds</code>. <strong>No traduzcas: usa el mismo término.</strong>" },
    { kind: "h3", text: "❌ Sin Ubiquitous Language" },
    {
      kind: "info",
      html: "Experto del negocio: 'Cuando el cliente devuelve un producto, debemos reembolsarle el dinero.'<br/><br/>Código: <code>class TransactionReverser { void reverse(int customerId) }</code><br/><br/>👎 El código no refleja el negocio. Los nombres son técnicos. Cada cambio requiere traducción mental.",
    },
    { kind: "h3", text: "✅ Con Ubiquitous Language" },
    {
      kind: "successBox",
      html: "Experto: 'Cuando el cliente devuelve un producto, lo reembolsamos.'<br/><br/>Código: <code>class RefundService { void issueRefund(Customer customer, Product product) }</code><br/><br/>👍 Los nombres son iguales. Cambios del negocio se reflejan directos.",
    },
    { kind: "h3", text: "📝 Cómo construirlo" },
    {
      kind: "list",
      items: [
        "Habla con expertos del dominio frecuentemente",
        "Anota los términos exactos que usan ellos",
        "<strong>Event Storming</strong>: técnica colaborativa con post-its para descubrir eventos del negocio",
        "Crea un glosario vivo del proyecto",
        "Refactoriza cuando un nuevo término aparece",
      ],
    },
    { kind: "tip", html: "<strong>💡 Cada Bounded Context tiene SU PROPIO lenguaje.</strong> 'Customer' en Ventas no es el mismo 'Customer' en Soporte. Son modelos diferentes con el mismo nombre — y está bien." },
    {
      kind: "fillBlanks",
      key: "m2_fill",
      items: [
        { text: "El lenguaje compartido entre devs y negocio se llama Ubiquitous ___", answer: "Language", es: "Language" },
        { text: "La técnica colaborativa con post-its es Event ___", answer: "Storming", es: "Storming" },
        { text: "Cada Bounded Context tiene su propio ___", answer: "lenguaje", es: "lenguaje" },
      ],
    },
    {
      kind: "quiz",
      key: "m2_quiz",
      questions: [
        { q: "¿Qué es Ubiquitous Language?", options: ["Inglés en todo el código", "Vocabulario común entre devs y negocio", "Un patrón de programación", "Una clase abstracta"], correct: 1 },
        { q: "¿En cuántos Bounded Contexts puede existir un término distinto?", options: ["Solo uno", "Tantos como contextos haya", "Máximo dos", "Ninguno"], correct: 1 },
        { q: "¿Qué técnica ayuda a descubrir el lenguaje?", options: ["TDD", "Event Storming", "Pair programming", "Code review"], correct: 1 },
        { q: "¿Quién decide los términos?", options: ["Los devs solos", "Los stakeholders + devs juntos", "El PM", "El cliente final"], correct: 1 },
        { q: "¿Si el negocio dice 'Pedido' y el código dice 'Order'?", options: ["Da igual", "Mal: deberían ser idénticos", "Mejor en inglés siempre", "Mejor en español siempre"], correct: 1 },
      ],
    },
  ],
};
