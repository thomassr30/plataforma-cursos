import type { ModuleData } from "@/types/course";

export const m10: ModuleData = {
  slug: "m10",
  number: 10,
  title: "Presente Continuo y Vocabulario",
  icon: "🎯",
  intro: "El presente continuo es para acciones que ocurren AHORA MISMO. Estructura: am/is/are + verbo-ing.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "🎯 Estructura" },
    {
      kind: "table",
      headers: ["Pronombre", "To Be", "Ejemplo"],
      rows: [
        ["I", "am", "I am eating."],
        ["You / We / They", "are", "You are reading."],
        ["He / She / It", "is", "She is sleeping."],
      ],
    },
    { kind: "h3", text: "📝 Reglas del -ing" },
    {
      kind: "table",
      headers: ["Regla", "Ejemplo"],
      rows: [
        ["General: + ing", "play → playing"],
        ["Termina en 'e': quitar e + ing", "write → writing"],
        ["CVC corto: doble consonante", "run → running, swim → swimming"],
      ],
    },
    {
      kind: "fillBlanks",
      key: "m10_fill",
      items: [
        { text: "I am ___ (read) a book.", answer: "reading", es: "Estoy leyendo" },
        { text: "She is ___ (write) an email.", answer: "writing", es: "Está escribiendo" },
        { text: "They are ___ (run) in the park.", answer: "running", es: "Están corriendo" },
        { text: "He is ___ (eat) pizza.", answer: "eating", es: "Está comiendo" },
        { text: "The baby is ___ (sleep).", answer: "sleeping", es: "El bebé duerme" },
      ],
    },
    {
      kind: "matching",
      key: "m10_matching",
      pairs: [
        { en: "father", es: "padre" }, { en: "sister", es: "hermana" },
        { en: "grandmother", es: "abuela" }, { en: "cousin", es: "primo/a" },
        { en: "wife", es: "esposa" }, { en: "son", es: "hijo" },
      ],
    },
    {
      kind: "quiz",
      key: "m10_quiz",
      questions: [
        { q: "¿Cuál es correcto?", options: ["I am eat", "I am eating", "I eating", "I eats"], correct: 1 },
        { q: '¿Cómo se forma -ing con "run"?', options: ["runing", "runeing", "running", "runnings"], correct: 2 },
        { q: '¿Cómo se forma -ing con "write"?', options: ["writeing", "writing", "writting", "writeings"], correct: 1 },
        { q: "'¿Está él trabajando?'", options: ["Does he working?", "Is he working?", "He is work?", "Working he is?"], correct: 1 },
      ],
    },
  ],
};
