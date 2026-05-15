import type { ModuleData } from "@/types/course";

export const m4: ModuleData = {
  slug: "m4",
  number: 4,
  title: "El Verbo TO BE (Ser / Estar)",
  icon: "⚡",
  intro: "El verbo 'to be' es el MÁS importante del inglés. Significa 'ser' y 'estar' al mismo tiempo.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "⚡ Las formas del TO BE" },
    {
      kind: "table",
      headers: ["Pronombre", "To Be", "Contracción", "Ejemplo"],
      rows: [
        ["I", "am", "I'm", "I am happy."],
        ["You", "are", "You're", "You are kind."],
        ["He", "is", "He's", "He is tall."],
        ["She", "is", "She's", "She is smart."],
        ["It", "is", "It's", "It is hot."],
        ["We", "are", "We're", "We are friends."],
        ["They", "are", "They're", "They are here."],
      ],
      speakColIndex: 3,
    },
    { kind: "tip", html: "<strong>💡</strong> Los nativos casi SIEMPRE usan contracciones (I'm, you're, he's). Significan exactamente lo mismo." },
    { kind: "h3", text: "❌ Forma Negativa" },
    { kind: "paragraph", html: "Añade <strong>'not'</strong> después del verbo. Ejemplos: I'm <strong>not</strong> tired. She <strong>isn't</strong> at home. They <strong>aren't</strong> Spanish." },
    { kind: "h3", text: "❓ Forma Interrogativa" },
    { kind: "paragraph", html: "Estructura: <strong>Am/Is/Are + sujeto + complemento + ?</strong>. Ejemplo: Are you tired? — Yes, I am. / No, I'm not." },
    {
      kind: "fillBlanks",
      key: "m4_fill",
      items: [
        { text: "I ___ a student.", answer: "am", es: "Yo soy estudiante" },
        { text: "She ___ from Spain.", answer: "is", es: "Ella es de España" },
        { text: "We ___ happy.", answer: "are", es: "Nosotros estamos felices" },
        { text: "He ___ my brother.", answer: "is", es: "Él es mi hermano" },
        { text: "They ___ at school.", answer: "are", es: "Ellos están en la escuela" },
        { text: "It ___ a beautiful day.", answer: "is", es: "Es un día hermoso" },
      ],
    },
    {
      kind: "drag",
      key: "m4_drag",
      items: [
        { words: ["I", "am", "a", "teacher"], es: "Yo soy profesor" },
        { words: ["She", "is", "my", "sister"], es: "Ella es mi hermana" },
        { words: ["Are", "you", "from", "Spain"], es: "¿Eres de España?" },
        { words: ["They", "are", "not", "here"], es: "Ellos no están aquí" },
      ],
    },
    {
      kind: "quiz",
      key: "m4_quiz",
      questions: [
        { q: "¿Cuál es la forma correcta?", options: ["I is happy", "I am happy", "I are happy", "I be happy"], correct: 1 },
        { q: '¿Cómo se dice "Ella no está en casa"?', options: ["She isn't at home", "She not at home", "She doesn't at home", "She no at home"], correct: 0 },
        { q: "¿Cuál es la pregunta correcta?", options: ["You are tired?", "Are you tired?", "Tired are you?", "You tired?"], correct: 1 },
        { q: '¿Cuál es la respuesta corta correcta a "Is he a doctor?"', options: ["Yes, he is.", "Yes, he be.", "Yes, his.", "Yes, he's."], correct: 0 },
        { q: '¿Cuál es la contracción de "She is not"?', options: ["She'sn't", "Shen't", "She isn't", "Shen't be"], correct: 2 },
        { q: '¿Qué forma de TO BE va con "They"?', options: ["am", "is", "are", "be"], correct: 2 },
      ],
    },
  ],
};
