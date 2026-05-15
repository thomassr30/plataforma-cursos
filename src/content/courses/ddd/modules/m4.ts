import type { ModuleData } from "@/types/course";

export const m4: ModuleData = {
  slug: "m4",
  number: 4,
  title: "Entities y Value Objects",
  icon: "🧱",
  intro: "Los bloques fundamentales del Tactical Design. Saber distinguir cuándo algo es Entity vs Value Object es CLAVE.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "🧱 Entity (Entidad)" },
    {
      kind: "list",
      items: [
        "Tiene <strong>identidad única</strong> (un ID) que persiste en el tiempo",
        "Sus atributos pueden cambiar; la identidad NO",
        "Se compara por ID, no por atributos",
        "Ejemplos: <code>User</code>, <code>Order</code>, <code>Product</code>",
      ],
    },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>class Order {\n  constructor(public readonly id: OrderId, private items: LineItem[]) {}\n  addItem(item: LineItem) { /* ... */ }\n  equals(other: Order) { return this.id.equals(other.id); }\n}</pre>",
    },
    { kind: "h3", text: "💎 Value Object (Objeto de Valor)" },
    {
      kind: "list",
      items: [
        "Sin identidad: se define por sus <strong>atributos</strong>",
        "<strong>Inmutable</strong>: cualquier cambio crea uno nuevo",
        "Se compara por VALOR, no por referencia",
        "Ejemplos: <code>Money</code>, <code>Address</code>, <code>Email</code>, <code>DateRange</code>",
      ],
    },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>class Money {\n  constructor(public readonly amount: number, public readonly currency: string) {}\n  add(other: Money) {\n    if (other.currency !== this.currency) throw new Error('Currency mismatch');\n    return new Money(this.amount + other.amount, this.currency);\n  }\n  equals(other: Money) {\n    return this.amount === other.amount && this.currency === other.currency;\n  }\n}</pre>",
    },
    { kind: "tip", html: "<strong>💡 Regla práctica:</strong> ¿Si dos instancias tienen los mismos atributos, son intercambiables? Sí → Value Object. ¿Importa CUÁL específicamente es? → Entity." },
    { kind: "h3", text: "🎯 Ejemplos para decidir" },
    {
      kind: "table",
      headers: ["Concepto", "Entity o VO", "Por qué"],
      rows: [
        ["Customer", "Entity", "Cada cliente es único, importa CUÁL"],
        ["Money", "VO", "Dos billetes de $100 son intercambiables"],
        ["Address", "VO", "Dos direcciones idénticas son la misma"],
        ["Order", "Entity", "Cada pedido es único"],
        ["Date", "VO", "Igual fecha = igual valor"],
        ["Account", "Entity", "Tiene historia única"],
      ],
    },
    {
      kind: "fillBlanks",
      key: "m4_fill",
      items: [
        { text: "Una clase con identidad única es una ___", answer: "Entity", es: "Entity" },
        { text: "Una clase inmutable comparada por valor es un Value ___", answer: "Object", es: "Object" },
        { text: "Money es un Value ___ porque dos iguales son intercambiables.", answer: "Object", es: "Object" },
        { text: "User es una ___ porque importa CUÁL específicamente es.", answer: "Entity", es: "Entity" },
      ],
    },
    {
      kind: "matching",
      key: "m4_matching",
      pairs: [
        { en: "Order", es: "Entity (identidad única)" },
        { en: "Money", es: "Value Object (inmutable)" },
        { en: "Address", es: "Value Object" },
        { en: "User", es: "Entity" },
        { en: "Date Range", es: "Value Object" },
        { en: "Product", es: "Entity" },
      ],
    },
    {
      kind: "quiz",
      key: "m4_quiz",
      questions: [
        { q: "Una Entity se identifica por:", options: ["Sus atributos", "Su ID único", "Su tamaño", "Su tipo"], correct: 1 },
        { q: "Un Value Object es:", options: ["Mutable con ID", "Inmutable sin identidad propia", "Una clase abstracta", "Una tabla"], correct: 1 },
        { q: "Address es típicamente:", options: ["Entity", "Value Object", "Aggregate Root", "Service"], correct: 1 },
        { q: "¿Money con $100 USD == otro Money con $100 USD?", options: ["No, son objetos distintos", "Sí, valor igual = valor igual (VO)", "Depende del compilador", "Solo si tienen mismo ID"], correct: 1 },
        { q: "¿Si modifico un Value Object?", options: ["Lo muto in-place", "Creo uno nuevo (inmutable)", "Lanzo excepción", "Es undefined behavior"], correct: 1 },
        { q: "User en un sistema de banca es:", options: ["Value Object", "Entity (importa CUÁL)", "Aggregate", "Service"], correct: 1 },
      ],
    },
  ],
};
