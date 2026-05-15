import type { ModuleData } from "@/types/course";

export const m8: ModuleData = {
  slug: "m8",
  number: 8,
  title: "Preposiciones de Lugar y Tiempo",
  icon: "📍",
  intro: "Las preposiciones son palabras como 'en', 'sobre', 'debajo'. Te enseño cómo decir DÓNDE y CUÁNDO.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "📍 Preposiciones de Lugar" },
    {
      kind: "table",
      headers: ["Inglés", "Español", "Ejemplo"],
      rows: [
        ["in", "en, dentro", "The book is in the box"],
        ["on", "sobre, encima", "The cat is on the chair"],
        ["under", "debajo", "The dog is under the table"],
        ["next to", "al lado de", "Maria is next to John"],
        ["between", "entre dos", "Bank between school and park"],
        ["in front of", "delante de", "Car in front of house"],
        ["behind", "detrás de", "Garden behind house"],
        ["near", "cerca de", "I live near the park"],
      ],
    },
    { kind: "h3", text: "⏰ Preposiciones de Tiempo" },
    { kind: "paragraph", html: "<strong>at</strong> horas (at 7), <strong>on</strong> días (on Monday), <strong>in</strong> meses/años (in May, in 2025)." },
    {
      kind: "fillBlanks",
      key: "m8_fill",
      items: [
        { text: "My class starts ___ 8 o'clock.", answer: "at", es: "A las 8" },
        { text: "I was born ___ 1995.", answer: "in", es: "Nací en 1995" },
        { text: "My birthday is ___ Monday.", answer: "on", es: "Es el lunes" },
        { text: "We have lunch ___ noon.", answer: "at", es: "Al mediodía" },
        { text: "School starts ___ September.", answer: "in", es: "En septiembre" },
      ],
    },
    {
      kind: "matching",
      key: "m8_matching",
      pairs: [
        { en: "between", es: "entre" }, { en: "under", es: "debajo" },
        { en: "next to", es: "al lado de" }, { en: "behind", es: "detrás" },
        { en: "in front of", es: "delante de" }, { en: "near", es: "cerca de" },
      ],
    },
    {
      kind: "quiz",
      key: "m8_quiz",
      questions: [
        { q: "'I work ___ 9 AM'", options: ["at", "in", "on", "to"], correct: 0 },
        { q: "'She comes ___ Monday'", options: ["at", "in", "on", "to"], correct: 2 },
        { q: "'I was born ___ 2000'", options: ["at", "in", "on", "to"], correct: 1 },
        { q: "'The cat is ___ the table' (sobre)", options: ["in", "under", "on", "at"], correct: 2 },
        { q: "'The bank is ___ the school and the park'", options: ["between", "under", "next", "behind"], correct: 0 },
      ],
    },
  ],
};
