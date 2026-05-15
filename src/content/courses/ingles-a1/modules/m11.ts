import type { ModuleData } from "@/types/course";

export const m11: ModuleData = {
  slug: "m11",
  number: 11,
  title: "Pasado Simple",
  icon: "⏪",
  intro: "El Pasado Simple es para cosas que YA pasaron: ayer, la semana pasada, en 1995.",
  totalActivities: 4,
  blocks: [
    { kind: "h3", text: "⏪ Pasado de TO BE: was / were" },
    { kind: "paragraph", html: "<strong>was</strong>: I, he, she, it. <strong>were</strong>: you, we, they. Negativo: wasn't, weren't." },
    { kind: "h3", text: "📝 Verbos Regulares (+ed)" },
    { kind: "paragraph", html: "<strong>+ed</strong> (work→worked), <strong>+d</strong> (live→lived), <strong>y→ied</strong> (study→studied), <strong>doblar consonante</strong> (stop→stopped)." },
    { kind: "h3", text: "⚡ Verbos Irregulares" },
    {
      kind: "table",
      headers: ["Infinitivo", "Pasado", "Significado"],
      rows: [
        ["go", "went", "ir"], ["have", "had", "tener"], ["do", "did", "hacer"],
        ["see", "saw", "ver"], ["eat", "ate", "comer"], ["buy", "bought", "comprar"],
        ["take", "took", "tomar"], ["come", "came", "venir"], ["get", "got", "obtener"],
      ],
    },
    { kind: "tip", html: "Negativo: <strong>didn't + verbo en infinitivo</strong> (I didn't go, NO 'I didn't went')." },
    {
      kind: "flashcards",
      key: "m11_flashcards",
      cards: [
        { en: "go → went", es: "ir → fui", phon: "gou-uent" },
        { en: "eat → ate", es: "comer → comí", phon: "it-eit" },
        { en: "see → saw", es: "ver → vi", phon: "si-so" },
        { en: "have → had", es: "tener → tuve", phon: "hav-had" },
        { en: "buy → bought", es: "comprar → compré", phon: "bai-bot" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m11_fill",
      items: [
        { text: "Yesterday I ___ (watch) a movie.", answer: "watched", es: "Vi una película" },
        { text: "She ___ (go) to Paris last year.", answer: "went", es: "Fue a París" },
        { text: "They ___ (be) at school.", answer: "were", es: "Estaban en escuela" },
        { text: "I ___ (eat) pizza.", answer: "ate", es: "Comí pizza" },
        { text: "We ___ (have) a great time.", answer: "had", es: "Lo pasamos bien" },
      ],
    },
    {
      kind: "drag",
      key: "m11_drag",
      items: [
        { words: ["I", "went", "to", "the", "park", "yesterday"], es: "Fui al parque ayer" },
        { words: ["She", "did", "not", "call", "me"], es: "Ella no me llamó" },
        { words: ["They", "were", "very", "happy"], es: "Estaban muy felices" },
      ],
    },
    {
      kind: "quiz",
      key: "m11_quiz",
      questions: [
        { q: '¿Cuál es el pasado de "go"?', options: ["goed", "went", "goes", "gone"], correct: 1 },
        { q: '¿Cuál es el pasado de "buy"?', options: ["buyed", "bought", "buys", "buying"], correct: 1 },
        { q: "¿Cuál es correcto?", options: ["I didn't went", "I didn't go", "I didn't goed", "I no go"], correct: 1 },
        { q: '¿Pasado de TO BE para "they"?', options: ["was", "were", "is", "are"], correct: 1 },
        { q: "¿Cómo se forma una pregunta en pasado?", options: ["Did you went?", "Did you go?", "You go?", "Did go you?"], correct: 1 },
      ],
    },
  ],
};
