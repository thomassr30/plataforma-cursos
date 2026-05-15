import type { ModuleData } from "@/types/course";

export const m14: ModuleData = {
  slug: "m14",
  number: 14,
  title: "Vocabulario Temático Ampliado",
  icon: "🌍",
  intro: "Cubrimos todos los temas que necesitas dominar: cuerpo, ropa, clima, profesiones, transporte.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "👤 El Cuerpo Humano" },
    {
      kind: "vocab",
      items: [
        { word: "head", meaning: "cabeza" }, { word: "eyes", meaning: "ojos" },
        { word: "nose", meaning: "nariz" }, { word: "mouth", meaning: "boca" },
        { word: "hand", meaning: "mano" }, { word: "foot", meaning: "pie" },
        { word: "arm", meaning: "brazo" }, { word: "leg", meaning: "pierna" },
      ],
    },
    { kind: "h3", text: "🌤️ Clima y Estaciones" },
    {
      kind: "vocab",
      items: [
        { word: "sunny", meaning: "soleado" }, { word: "cloudy", meaning: "nublado" },
        { word: "rainy", meaning: "lluvioso" }, { word: "windy", meaning: "ventoso" },
        { word: "spring", meaning: "primavera" }, { word: "summer", meaning: "verano" },
        { word: "autumn/fall", meaning: "otoño" }, { word: "winter", meaning: "invierno" },
      ],
    },
    { kind: "h3", text: "💼 Profesiones" },
    {
      kind: "vocab",
      items: [
        { word: "teacher", meaning: "profesor" }, { word: "doctor", meaning: "médico" },
        { word: "engineer", meaning: "ingeniero" }, { word: "lawyer", meaning: "abogado" },
        { word: "firefighter", meaning: "bombero" }, { word: "chef", meaning: "cocinero" },
      ],
    },
    {
      kind: "flashcards",
      key: "m14_flashcards",
      cards: [
        { en: "head", es: "cabeza" }, { en: "eyes", es: "ojos" }, { en: "mouth", es: "boca" },
        { en: "hand", es: "mano" }, { en: "foot", es: "pie" }, { en: "arm", es: "brazo" },
      ],
    },
    {
      kind: "matching",
      key: "m14_matching",
      pairs: [
        { en: "teacher", es: "profesor" }, { en: "doctor", es: "médico" },
        { en: "firefighter", es: "bombero" }, { en: "engineer", es: "ingeniero" },
        { en: "waiter", es: "mesero" }, { en: "farmer", es: "granjero" },
      ],
    },
    {
      kind: "quiz",
      key: "m14_quiz",
      questions: [
        { q: '¿Cómo se dice "ojos"?', options: ["eyes", "ears", "noses", "heads"], correct: 0 },
        { q: "¿Qué llevas cuando hace frío?", options: ["shorts", "coat", "swimsuit", "sandals"], correct: 1 },
        { q: "¿Qué estación es muy fría?", options: ["summer", "spring", "winter", "autumn"], correct: 2 },
        { q: "¿Qué profesión cura?", options: ["teacher", "lawyer", "doctor", "farmer"], correct: 2 },
        { q: "¿Cómo se va en autobús?", options: ["by foot", "by bus", "on bus", "in bus"], correct: 1 },
        { q: "¿Cómo se dice 'Hace sol'?", options: ["It is rainy", "It is sunny", "It is windy", "It is cold"], correct: 1 },
      ],
    },
  ],
};
