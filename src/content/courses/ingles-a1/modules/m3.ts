import type { ModuleData } from "@/types/course";

export const m3: ModuleData = {
  slug: "m3",
  number: 3,
  title: "Pronombres Personales",
  icon: "👤",
  intro: "Los pronombres son palabras que reemplazan al nombre de una persona o cosa. Son la BASE de cualquier oración en inglés.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "🧑 Los Pronombres Personales" },
    {
      kind: "table",
      headers: ["Inglés", "Español", "Cuándo se usa"],
      rows: [
        ["I", "Yo", "Para hablar de ti mismo"],
        ["You", "Tú / Usted / Vosotros", "Singular y plural"],
        ["He", "Él", "Para un hombre o niño"],
        ["She", "Ella", "Para una mujer o niña"],
        ["It", "Eso / Ello", "Para objetos, animales, ideas"],
        ["We", "Nosotros", "Tú y yo / Tú y otros"],
        ["They", "Ellos / Ellas", "Personas (plural)"],
      ],
      speakColIndex: 0,
    },
    { kind: "tip", html: "<strong>💡 IMPORTANTE:</strong> 'I' siempre se escribe con MAYÚSCULA, esté donde esté en la oración." },
    { kind: "h3", text: "📚 Ejemplos con cada pronombre" },
    {
      kind: "table",
      headers: ["Pronombre", "Ejemplo", "Traducción"],
      rows: [
        ["I", "I am a student.", "Yo soy estudiante."],
        ["You", "You are my friend.", "Tú eres mi amigo."],
        ["He", "He is a doctor.", "Él es médico."],
        ["She", "She is my sister.", "Ella es mi hermana."],
        ["It", "It is a cat.", "Es un gato."],
        ["We", "We are happy.", "Nosotros estamos felices."],
        ["They", "They are at home.", "Ellos están en casa."],
      ],
      speakColIndex: 1,
    },
    {
      kind: "flashcards",
      key: "m3_flashcards",
      cards: [
        { en: "I", es: "Yo", phon: "ai" }, { en: "You", es: "Tú / Ustedes", phon: "yu" },
        { en: "He", es: "Él", phon: "ji" }, { en: "She", es: "Ella", phon: "shi" },
        { en: "It", es: "Eso (cosa/animal)", phon: "it" }, { en: "We", es: "Nosotros", phon: "uí" },
        { en: "They", es: "Ellos / Ellas", phon: "déi" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m3_fill",
      items: [
        { text: "___ am a student.", answer: "I", es: "Yo soy estudiante" },
        { text: "___ is my brother.", answer: "He", es: "Él es mi hermano" },
        { text: "___ is my sister.", answer: "She", es: "Ella es mi hermana" },
        { text: "___ are doctors.", answer: "They", es: "Ellos son doctores" },
        { text: "___ is a dog.", answer: "It", es: "Es un perro" },
        { text: "___ are friends.", answer: "We", es: "Nosotros somos amigos" },
      ],
    },
    {
      kind: "quiz",
      key: "m3_quiz",
      questions: [
        { q: '¿Qué pronombre uso para "Mary"?', options: ["He", "She", "It", "They"], correct: 1 },
        { q: "¿Qué pronombre uso para un perro?", options: ["He", "She", "It", "We"], correct: 2 },
        { q: '¿Qué pronombre uso para "John and Peter"?', options: ["He", "We", "You", "They"], correct: 3 },
        { q: "¿Qué pronombre uso para hablar de mí?", options: ["You", "I", "We", "He"], correct: 1 },
        { q: '¿Qué significa "We"?', options: ["Tú", "Nosotros", "Ellos", "Yo"], correct: 1 },
        { q: "¿Cómo se escribe correctamente?", options: ["i am happy", "I am happy", "I Am Happy", "i Am happy"], correct: 1 },
      ],
    },
  ],
};
