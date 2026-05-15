import type { ModuleData } from "@/types/course";

export const m1: ModuleData = {
  slug: "m1",
  number: 1,
  title: "El Alfabeto y los Números",
  icon: "📘",
  intro: "¡Vamos a empezar por lo más básico: las letras y los números. Sin esto no podrás deletrear tu nombre ni dar tu número de teléfono!",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "🔤 El Alfabeto Inglés (26 letras)" },
    { kind: "paragraph", html: "El alfabeto inglés tiene <strong>26 letras</strong>, igual que el español, pero la <strong>ñ</strong> no existe. Lo importante es la <strong>pronunciación</strong>." },
    {
      kind: "table",
      headers: ["Letra", "Pronunciación"],
      rows: [
        ["A", "ei"], ["B", "bi"], ["C", "si"], ["D", "di"], ["E", "i"], ["F", "ef"], ["G", "dyi"],
        ["H", "eich"], ["I", "ai"], ["J", "yei"], ["K", "kei"], ["L", "el"], ["M", "em"], ["N", "en"],
        ["O", "ou"], ["P", "pi"], ["Q", "kiu"], ["R", "ar"], ["S", "es"], ["T", "ti"], ["U", "iu"],
        ["V", "vi"], ["W", "dáblyu"], ["X", "eks"], ["Y", "uái"], ["Z", "zi"],
      ],
      speakColIndex: 0,
    },
    { kind: "tip", html: "<strong>💡 Tip:</strong> Las letras más difíciles para hispanohablantes son: A (ei), E (i), I (ai), J (yei), R (ar), W (dáblyu), Y (uái)." },
    { kind: "h3", text: "🔢 Los Números del 0 al 20" },
    {
      kind: "table",
      headers: ["#", "Inglés", "Pronunciación"],
      rows: [
        ["0", "zero", "zírou"], ["1", "one", "uán"], ["2", "two", "tu"], ["3", "three", "zri"],
        ["4", "four", "for"], ["5", "five", "faiv"], ["6", "six", "siks"], ["7", "seven", "seven"],
        ["8", "eight", "eit"], ["9", "nine", "nain"], ["10", "ten", "ten"],
        ["11", "eleven", "iléven"], ["12", "twelve", "tuelv"], ["13", "thirteen", "zertín"],
        ["14", "fourteen", "fortín"], ["15", "fifteen", "fiftín"], ["16", "sixteen", "sikstín"],
        ["17", "seventeen", "seventín"], ["18", "eighteen", "eitín"], ["19", "nineteen", "naintín"], ["20", "twenty", "tuénti"],
      ],
      speakColIndex: 1,
    },
    { kind: "h4", text: "Decenas (20-100)" },
    {
      kind: "table",
      headers: ["#", "Inglés"],
      rows: [
        ["20", "twenty"], ["30", "thirty"], ["40", "forty"], ["50", "fifty"],
        ["60", "sixty"], ["70", "seventy"], ["80", "eighty"], ["90", "ninety"], ["100", "one hundred"],
      ],
      speakColIndex: 1,
    },
    { kind: "tip", html: "<strong>💡 ¡Atención!</strong> En inglés los números compuestos se escriben con guion: <strong>twenty-one</strong> (21), <strong>ninety-nine</strong> (99)." },
    { kind: "h3", text: "💬 Conversación: Dando tu número" },
    {
      kind: "conversation",
      lines: [
        { side: "A", en: "What's your phone number?", es: "¿Cuál es tu número de teléfono?" },
        { side: "B", en: "My number is five-five-five, two-one-three-four.", es: "Mi número es 555-2134." },
        { side: "A", en: "How do you spell your name?", es: "¿Cómo se deletrea tu nombre?" },
        { side: "B", en: "A-N-N-A. Anna.", es: "A-N-N-A. Anna." },
      ],
    },
    {
      kind: "flashcards",
      key: "m1_flashcards",
      cards: [
        { en: "1", es: "one", phon: "uán" }, { en: "5", es: "five", phon: "faiv" },
        { en: "10", es: "ten", phon: "ten" }, { en: "15", es: "fifteen", phon: "fiftín" },
        { en: "20", es: "twenty", phon: "tuénti" }, { en: "30", es: "thirty", phon: "zérti" },
        { en: "50", es: "fifty", phon: "fífti" }, { en: "100", es: "one hundred", phon: "uán jándred" },
      ],
    },
    {
      kind: "matching",
      key: "m1_matching",
      pairs: [
        { en: "twelve", es: "12" }, { en: "twenty", es: "20" }, { en: "fifteen", es: "15" },
        { en: "fifty", es: "50" }, { en: "ninety", es: "90" }, { en: "seventeen", es: "17" },
      ],
    },
    {
      kind: "quiz",
      key: "m1_quiz",
      questions: [
        { q: '¿Cómo se dice "5" en inglés?', options: ["Four", "Five", "Fifteen", "Fifty"], correct: 1 },
        { q: "¿Cómo se escribe el número 13?", options: ["Thirty", "Thirteen", "Three", "Thirteenth"], correct: 1 },
        { q: '¿Cuál es la pronunciación correcta de la letra "H"?', options: ["ji", "eich", "ach", "je"], correct: 1 },
        { q: '¿Qué número es "ninety"?', options: ["9", "19", "90", "99"], correct: 2 },
        { q: '¿Cómo se escribe "21" en inglés?', options: ["twenty one", "twenty-one", "twentyone", "two-one"], correct: 1 },
        { q: '¿Qué letra suena "ai"?', options: ["A", "E", "I", "Y"], correct: 2 },
      ],
    },
  ],
};
