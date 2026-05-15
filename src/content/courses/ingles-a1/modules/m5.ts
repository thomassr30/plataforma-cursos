import type { ModuleData } from "@/types/course";

export const m5: ModuleData = {
  slug: "m5",
  number: 5,
  title: "Artículos y Sustantivos",
  icon: "📑",
  intro: "Los artículos (a, an, the) son palabras pequeñas pero MUY importantes.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "📄 A / AN / THE" },
    { kind: "paragraph", html: "<strong>A</strong> antes de consonante (a book). <strong>AN</strong> antes de vocal (an apple). <strong>THE</strong> = el/la/los/las (específico)." },
    { kind: "tip", html: "Es el SONIDO, no la letra: 'an hour' (h muda), 'a university' (suena 'yu')." },
    { kind: "h3", text: "📚 Plurales" },
    {
      kind: "table",
      headers: ["Regla", "Singular", "Plural"],
      rows: [
        ["+ s general", "book, car", "books, cars"],
        ["+ es (s,sh,ch,x,o)", "bus, watch, potato", "buses, watches, potatoes"],
        ["consonante + y → ies", "baby, city", "babies, cities"],
        ["f/fe → ves", "leaf, knife", "leaves, knives"],
        ["irregulares", "man, child, foot", "men, children, feet"],
      ],
    },
    {
      kind: "flashcards",
      key: "m5_flashcards",
      cards: [
        { en: "a book", es: "un libro", phon: "a buk" },
        { en: "an apple", es: "una manzana", phon: "an ápol" },
        { en: "an umbrella", es: "un paraguas", phon: "an ambréla" },
        { en: "children", es: "niños", phon: "chíldren" },
        { en: "people", es: "personas", phon: "pípol" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m5_fill",
      items: [
        { text: "I have ___ apple.", answer: "an", es: "Tengo una manzana" },
        { text: "She is ___ teacher.", answer: "a", es: "Ella es profesora" },
        { text: "It is ___ honest answer.", answer: "an", es: "Es una respuesta honesta" },
        { text: "I work in ___ university.", answer: "a", es: "Trabajo en una universidad" },
      ],
    },
    {
      kind: "quiz",
      key: "m5_quiz",
      questions: [
        { q: '¿Cuál es el plural de "child"?', options: ["childs", "children", "childes", "childies"], correct: 1 },
        { q: '¿Cuál es el plural de "city"?', options: ["citys", "cityes", "cities", "citties"], correct: 2 },
        { q: "¿Cuál es correcto?", options: ["a elephant", "an elephant", "the a elephant", "elephant a"], correct: 1 },
        { q: '¿Cuál es el plural de "man"?', options: ["mans", "mens", "men", "manes"], correct: 2 },
        { q: "¿Cuál es correcto?", options: ["an hour", "a hour", "the hour", "hour"], correct: 0 },
      ],
    },
  ],
};
