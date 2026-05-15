import type { ModuleData } from "@/types/course";

export const m13: ModuleData = {
  slug: "m13",
  number: 13,
  title: "Like/Love + Imperativos + Going to",
  icon: "❤️",
  intro: "Aprende a hablar de gustos, dar órdenes, y hablar de planes futuros.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "❤️ Like / Love / Hate + ing" },
    { kind: "paragraph", html: "Con sustantivo: 'I like pizza'. Con verbo: 'I like <strong>swimming</strong>' (-ing)." },
    { kind: "h3", text: "📢 Imperativos" },
    { kind: "paragraph", html: "Afirmativo: <strong>Open</strong> the door. Negativo: <strong>Don't run</strong>." },
    { kind: "h3", text: "🍽️ I'd like" },
    { kind: "paragraph", html: "<strong>I'd like</strong> = quisiera. 'I'd like a coffee, please.'" },
    { kind: "h3", text: "🔮 Going to (Futuro)" },
    { kind: "paragraph", html: "<strong>be + going to + verbo</strong>. 'I am going to study tonight.' (plan)" },
    {
      kind: "flashcards",
      key: "m13_flashcards",
      cards: [
        { en: "I love swimming", es: "Me encanta nadar" },
        { en: "I'd like a coffee", es: "Quisiera un café" },
        { en: "I'm going to study", es: "Voy a estudiar" },
        { en: "Don't worry", es: "No te preocupes" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m13_fill",
      items: [
        { text: "I like ___ (read) books.", answer: "reading", es: "Me gusta leer" },
        { text: "I'd ___ a tea, please.", answer: "like", es: "Quisiera un té" },
        { text: "I'm going ___ visit my mom.", answer: "to", es: "Voy a visitar" },
        { text: "___ talk during the exam!", answer: "Don't", es: "¡No hables!" },
      ],
    },
    {
      kind: "quiz",
      key: "m13_quiz",
      questions: [
        { q: "¿Cuál es correcto?", options: ["I like swim", "I like swimming", "I like to swimming", "I am like swim"], correct: 1 },
        { q: "¿Cómo pides educadamente un café?", options: ["I want coffee", "Give me coffee", "I'd like a coffee, please", "I like coffee"], correct: 2 },
        { q: "¿Cuál es un imperativo negativo?", options: ["No talk", "Not talk", "Don't talk", "You don't talk"], correct: 2 },
        { q: "¿Cuál expresa un plan futuro?", options: ["I want to study", "I am going to study", "I study", "I studied"], correct: 1 },
      ],
    },
  ],
};
