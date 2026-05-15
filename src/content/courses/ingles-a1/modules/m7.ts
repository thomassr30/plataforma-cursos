import type { ModuleData } from "@/types/course";

export const m7: ModuleData = {
  slug: "m7",
  number: 7,
  title: "Presente Simple",
  icon: "🔄",
  intro: "El presente simple es para rutinas, hábitos y cosas que son siempre verdad.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "✅ Forma Afirmativa" },
    { kind: "paragraph", html: "<strong>Sujeto + verbo</strong>. Con <strong>HE/SHE/IT</strong>, el verbo lleva <strong>'s'</strong> al final." },
    {
      kind: "table",
      headers: ["Pronombre", "Ejemplo"],
      rows: [
        ["I / You / We / They", "I work."],
        ["He / She / It", "She works."],
      ],
    },
    { kind: "h3", text: "❌ Forma Negativa" },
    { kind: "paragraph", html: "<strong>don't / doesn't + verbo (infinitivo)</strong>. He <strong>doesn't</strong> like fish." },
    { kind: "tip", html: "Con 'doesn't', el verbo NO lleva 's'. ✅ 'She doesn't like'. ❌ 'She doesn't likes'." },
    { kind: "h3", text: "⏰ Adverbios de Frecuencia" },
    {
      kind: "table",
      headers: ["Inglés", "Español", "%"],
      rows: [
        ["always", "siempre", "100%"],
        ["usually", "usualmente", "80%"],
        ["often", "a menudo", "60%"],
        ["sometimes", "a veces", "40%"],
        ["rarely", "raramente", "10%"],
        ["never", "nunca", "0%"],
      ],
    },
    {
      kind: "fillBlanks",
      key: "m7_fill",
      items: [
        { text: "She ___ (work) in a bank.", answer: "works", es: "Ella trabaja en un banco" },
        { text: "He ___ (study) every day.", answer: "studies", es: "Él estudia todos los días" },
        { text: "Anna ___ (have) a car.", answer: "has", es: "Anna tiene un coche" },
        { text: "It ___ (go) very fast.", answer: "goes", es: "Va muy rápido" },
        { text: "My sister ___ (watch) TV at night.", answer: "watches", es: "Mi hermana ve TV de noche" },
      ],
    },
    {
      kind: "drag",
      key: "m7_drag",
      items: [
        { words: ["I", "always", "drink", "coffee"], es: "Yo siempre tomo café" },
        { words: ["She", "does", "not", "like", "fish"], es: "A ella no le gusta el pescado" },
        { words: ["Do", "you", "speak", "English"], es: "¿Hablas inglés?" },
      ],
    },
    {
      kind: "quiz",
      key: "m7_quiz",
      questions: [
        { q: "¿Cuál es correcto?", options: ["He work", "He works", "He working", "He is work"], correct: 1 },
        { q: '¿Cómo se forma la negación con "she"?', options: ["She not like", "She don't like", "She doesn't like", "She isn't like"], correct: 2 },
        { q: "¿Cuál es la pregunta correcta?", options: ["You speak English?", "Do you speak English?", "Does you speak English?", "Are you speak English?"], correct: 1 },
        { q: '¿Cuál es la conjugación de "study" para he/she/it?', options: ["studys", "studies", "studyes", "studyed"], correct: 1 },
        { q: '¿Qué adverbio significa "siempre"?', options: ["never", "always", "sometimes", "often"], correct: 1 },
      ],
    },
  ],
};
