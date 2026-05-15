import type { ModuleData } from "@/types/course";

export const m18: ModuleData = {
  slug: "m18",
  number: 18,
  title: "Pronombres de Objeto y WH-Questions",
  icon: "❓",
  intro: "Domina los pronombres de objeto, posesivos, y todas las preguntas WH-.",
  totalActivities: 4,
  blocks: [
    { kind: "h3", text: "🎯 Pronombres de Objeto" },
    {
      kind: "table",
      headers: ["Sujeto", "Objeto", "Español"],
      rows: [
        ["I", "me", "me/mí"], ["You", "you", "te/ti"],
        ["He", "him", "lo/le (él)"], ["She", "her", "la/le (ella)"],
        ["It", "it", "lo/la"], ["We", "us", "nos"],
        ["They", "them", "los/les"],
      ],
    },
    { kind: "h3", text: "🔑 Pronombres Posesivos" },
    {
      kind: "table",
      headers: ["Adjetivo", "Pronombre"],
      rows: [
        ["my book", "mine"], ["your book", "yours"],
        ["his book", "his"], ["her book", "hers"],
        ["our book", "ours"], ["their book", "theirs"],
      ],
    },
    { kind: "h3", text: "❓ WH-Questions" },
    {
      kind: "table",
      headers: ["WH-word", "Significado"],
      rows: [
        ["What?", "¿Qué?"], ["Who?", "¿Quién?"], ["Where?", "¿Dónde?"],
        ["When?", "¿Cuándo?"], ["Why?", "¿Por qué?"], ["How?", "¿Cómo?"],
        ["Which?", "¿Cuál?"], ["Whose?", "¿De quién?"],
        ["How much?", "¿Cuánto?"], ["How many?", "¿Cuántos?"], ["How old?", "¿Qué edad?"],
      ],
    },
    {
      kind: "matching",
      key: "m18_matching",
      pairs: [
        { en: "I", es: "me" }, { en: "he", es: "him" }, { en: "she", es: "her" },
        { en: "we", es: "us" }, { en: "they", es: "them" }, { en: "you", es: "you" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m18_fill",
      items: [
        { text: "I love my mother. I love ___.", answer: "her", es: "La amo" },
        { text: "Can you help ___? (Tom)", answer: "him", es: "Ayúdalo" },
        { text: "This book is ___. (mío)", answer: "mine", es: "Es mío" },
        { text: "That car is ___. (de ella)", answer: "hers", es: "De ella" },
        { text: "Call ___ tomorrow! (a mí)", answer: "me", es: "¡Llámame!" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m18_wh",
      items: [
        { text: "___ is your name?", answer: "What", es: "¿Cómo te llamas?" },
        { text: "___ do you live?", answer: "Where", es: "¿Dónde vives?" },
        { text: "___ are you so happy?", answer: "Why", es: "¿Por qué tan feliz?" },
        { text: "___ old are you?", answer: "How", es: "¿Cuántos años?" },
        { text: "___ is your birthday?", answer: "When", es: "¿Cuándo cumpleaños?" },
      ],
    },
    {
      kind: "quiz",
      key: "m18_quiz",
      questions: [
        { q: 'Pronombre objeto de "he":', options: ["his", "he", "him", "himself"], correct: 2 },
        { q: 'Pronombre objeto de "they":', options: ["theirs", "their", "they", "them"], correct: 3 },
        { q: "¿Cuál es correcto?", options: ["This book is my", "This book is mine", "This book is me", "This book is I"], correct: 1 },
        { q: "¿De quién es esto? (pregunta)", options: ["Who?", "Whose?", "Whom?", "How?"], correct: 1 },
        { q: "¿Cómo preguntar edad?", options: ["How much?", "How many?", "How old?", "What old?"], correct: 2 },
        { q: "'El libro de Tom' =", options: ["The book of Tom", "Tom book", "Tom's book", "Tom his book"], correct: 2 },
      ],
    },
  ],
};
