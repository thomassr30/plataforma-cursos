import type { ModuleData } from "@/types/course";

export const m12: ModuleData = {
  slug: "m12",
  number: 12,
  title: "There is/are + Cuantificadores",
  icon: "🏠",
  intro: "Aprende a decir que existen cosas ('hay') y a hablar de cantidades (mucho, poco, algunos).",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "🏠 There is / There are" },
    { kind: "paragraph", html: "'<strong>There is</strong>' = hay (singular). '<strong>There are</strong>' = hay (plural). Negativo: isn't/aren't." },
    { kind: "h3", text: "🔢 Cuantificadores" },
    {
      kind: "table",
      headers: ["Cuantificador", "Uso", "Ejemplo"],
      rows: [
        ["some", "Afirmativas", "I have some friends"],
        ["any", "Negativas y preguntas", "Do you have any sugar?"],
        ["many", "Muchos (contables)", "Many cars"],
        ["much", "Mucho (incontables)", "Much money"],
        ["a lot of", "Muchos/mucho", "A lot of friends"],
        ["a few", "Unos pocos (contables)", "A few books"],
        ["a little", "Un poco (incontables)", "A little water"],
      ],
    },
    { kind: "h3", text: "❓ How much / How many" },
    { kind: "paragraph", html: "<strong>How many</strong> + contables. <strong>How much</strong> + incontables o precios." },
    {
      kind: "fillBlanks",
      key: "m12_fill",
      items: [
        { text: "There is ___ milk in the fridge.", answer: "some", es: "Hay leche" },
        { text: "There isn't ___ sugar.", answer: "any", es: "No hay azúcar" },
        { text: "How ___ apples are there?", answer: "many", es: "¿Cuántas manzanas?" },
        { text: "How ___ water do you drink?", answer: "much", es: "¿Cuánta agua?" },
      ],
    },
    {
      kind: "drag",
      key: "m12_drag",
      items: [
        { words: ["There", "is", "a", "cat", "on", "the", "sofa"], es: "Hay un gato en el sofá" },
        { words: ["There", "are", "many", "people", "here"], es: "Hay mucha gente aquí" },
        { words: ["Is", "there", "any", "milk"], es: "¿Hay leche?" },
      ],
    },
    {
      kind: "quiz",
      key: "m12_quiz",
      questions: [
        { q: "'___ a book on the desk'", options: ["There is", "There are", "There be", "There has"], correct: 0 },
        { q: "'___ many children in the park'", options: ["There is", "There are", "There has", "It is"], correct: 1 },
        { q: '¿Cuándo usar "much"?', options: ["Solo en preguntas", "Con contables", "Con incontables", "Solo con personas"], correct: 2 },
        { q: "¿Cuál es correcto?", options: ["I don't have some money", "I don't have any money", "I don't has any money", "I no have money"], correct: 1 },
        { q: "¿Cómo preguntas el precio?", options: ["How many is?", "How much is it?", "How is it much?", "How money?"], correct: 1 },
      ],
    },
  ],
};
