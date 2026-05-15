import type { ModuleData } from "@/types/course";

export const m6: ModuleData = {
  slug: "m6",
  number: 6,
  title: "Posesivos y Demostrativos",
  icon: "🔑",
  intro: "Aprende a expresar posesión (mi, tu, su) y a señalar cosas (este, ese, aquellos).",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "🔑 Adjetivos Posesivos" },
    {
      kind: "table",
      headers: ["Pronombre", "Posesivo", "Español"],
      rows: [
        ["I", "my", "mi"],
        ["You", "your", "tu"],
        ["He", "his", "su (de él)"],
        ["She", "her", "su (de ella)"],
        ["It", "its", "su (de eso)"],
        ["We", "our", "nuestro/a"],
        ["They", "their", "su (de ellos)"],
      ],
    },
    { kind: "tip", html: "<strong>💡 CUIDADO:</strong> 'its' (posesivo) vs 'it's' (it is)." },
    { kind: "h3", text: "👆 Demostrativos" },
    {
      kind: "table",
      headers: ["Inglés", "Español", "Distancia", "Número"],
      rows: [
        ["This", "Este/Esta", "Cerca", "Singular"],
        ["These", "Estos/Estas", "Cerca", "Plural"],
        ["That", "Ese/Esa/Aquel", "Lejos", "Singular"],
        ["Those", "Esos/Esas", "Lejos", "Plural"],
      ],
    },
    {
      kind: "matching",
      key: "m6_matching",
      pairs: [
        { en: "I", es: "my" }, { en: "You", es: "your" }, { en: "He", es: "his" },
        { en: "She", es: "her" }, { en: "We", es: "our" }, { en: "They", es: "their" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m6_fill",
      items: [
        { text: "___ is my house. (cerca, singular)", answer: "This", es: "Esta es mi casa" },
        { text: "___ are my friends. (cerca, plural)", answer: "These", es: "Estos son mis amigos" },
        { text: "___ is your car. (lejos, singular)", answer: "That", es: "Ese es tu coche" },
        { text: "___ are her shoes. (lejos, plural)", answer: "Those", es: "Esos son sus zapatos" },
      ],
    },
    {
      kind: "quiz",
      key: "m6_quiz",
      questions: [
        { q: '¿Qué posesivo va con "she"?', options: ["his", "her", "its", "their"], correct: 1 },
        { q: '¿Cuál es correcto? "___ name is Tom" (él)', options: ["Her", "His", "My", "Its"], correct: 1 },
        { q: '¿Cómo se dice "estos libros"?', options: ["this books", "these books", "that books", "those books"], correct: 1 },
        { q: "¿Cuál señala algo lejano y plural?", options: ["this", "that", "these", "those"], correct: 3 },
        { q: "'___ house is big' (de nosotros)", options: ["My", "Your", "Our", "Their"], correct: 2 },
      ],
    },
  ],
};
