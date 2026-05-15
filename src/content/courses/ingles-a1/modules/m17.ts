import type { ModuleData } from "@/types/course";

export const m17: ModuleData = {
  slug: "m17",
  number: 17,
  title: "La Hora, Ordinales y Fechas",
  icon: "🕐",
  intro: "Saber decir la hora y la fecha es OBLIGATORIO en cualquier examen A1.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "🕐 La Hora" },
    {
      kind: "table",
      headers: ["Hora", "Cómo se dice"],
      rows: [
        ["3:00", "It's three o'clock"],
        ["3:15", "Quarter past three / Three fifteen"],
        ["3:30", "Half past three"],
        ["3:45", "Quarter to four"],
        ["12:00 PM", "Noon / Midday"],
        ["12:00 AM", "Midnight"],
      ],
    },
    { kind: "tip", html: "<strong>past</strong> (minutos < 30), <strong>to</strong> (minutos > 30). Quarter = 15, Half = 30." },
    { kind: "h3", text: "🥇 Ordinales" },
    {
      kind: "table",
      headers: ["#", "Inglés"],
      rows: [
        ["1°", "first (1st)"], ["2°", "second (2nd)"], ["3°", "third (3rd)"],
        ["5°", "fifth (5th)"], ["9°", "ninth (9th)"], ["12°", "twelfth (12th)"],
        ["20°", "twentieth (20th)"], ["21°", "twenty-first (21st)"],
      ],
    },
    {
      kind: "flashcards",
      key: "m17_flashcards",
      cards: [
        { en: "1st = first", es: "primero" },
        { en: "2nd = second", es: "segundo" },
        { en: "3rd = third", es: "tercero" },
        { en: "5th = fifth", es: "quinto" },
        { en: "9th = ninth", es: "noveno" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m17_fill",
      items: [
        { text: "It's ___ past three. (3:30)", answer: "half", es: "Tres y media" },
        { text: "It's quarter ___ ten. (9:45)", answer: "to", es: "Diez menos cuarto" },
        { text: "My birthday is ___ March 15th.", answer: "on", es: "El 15 de marzo" },
        { text: "I was born ___ 1995.", answer: "in", es: "En 1995" },
      ],
    },
    {
      kind: "matching",
      key: "m17_matching",
      pairs: [
        { en: "1st", es: "first" }, { en: "2nd", es: "second" },
        { en: "3rd", es: "third" }, { en: "5th", es: "fifth" },
        { en: "12th", es: "twelfth" }, { en: "20th", es: "twentieth" },
      ],
    },
    {
      kind: "quiz",
      key: "m17_quiz",
      questions: [
        { q: '¿Cómo se dice "3:15"?', options: ["Three fifteen / Quarter past three", "Quarter to three", "Half past three", "Three quarter"], correct: 0 },
        { q: '¿Cómo se dice "7:45"?', options: ["Quarter past seven", "Quarter to eight", "Half past seven", "Seven quarter"], correct: 1 },
        { q: '¿Cuál es el ordinal de "3"?', options: ["threeth", "three", "third", "thirth"], correct: 2 },
        { q: '¿Cuál es el ordinal de "5"?', options: ["fiveth", "fifth", "five", "fivth"], correct: 1 },
        { q: "¿Cuál es 12 PM?", options: ["midnight", "noon/midday", "morning", "evening"], correct: 1 },
      ],
    },
  ],
};
