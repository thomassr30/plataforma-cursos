import type { ModuleData } from "@/types/course";

export const m16: ModuleData = {
  slug: "m16",
  number: 16,
  title: "Errores Comunes y Tips de Examen",
  icon: "⚠️",
  intro: "Los 20 errores más comunes de hispanohablantes en inglés. Domínalos y subirás de nivel.",
  totalActivities: 1,
  blocks: [
    { kind: "h3", text: "🚫 Top errores comunes" },
    {
      kind: "table",
      headers: ["❌ Error", "✅ Correcto"],
      rows: [
        ["I have 25 years", "I am 25 years old"],
        ["She have a car", "She has a car"],
        ["He don't like it", "He doesn't like it"],
        ["I am agree", "I agree"],
        ["Where you are from?", "Where are you from?"],
        ["I can to swim", "I can swim"],
        ["The childrens are here", "The children are here"],
        ["I'm boring (aburrido)", "I'm bored"],
        ["It depends of you", "It depends on you"],
        ["I went to home", "I went home"],
        ["I didn't went", "I didn't go"],
        ["How much years?", "How old?"],
      ],
    },
    {
      kind: "quiz",
      key: "m16_quiz",
      questions: [
        { q: "¿Cuál es CORRECTO?", options: ["I have 25 years", "I am 25 years", "I am 25 years old", "I have 25 years old"], correct: 2 },
        { q: "¿Cuál es CORRECTO?", options: ["She have a car", "She has a car", "She haves a car", "She having a car"], correct: 1 },
        { q: "¿Cuál es CORRECTO?", options: ["He don't like it", "He doesn't likes it", "He doesn't like it", "He no like it"], correct: 2 },
        { q: "¿Cuál es CORRECTO?", options: ["I am agree", "I agree", "I am agreeing", "I agreed with"], correct: 1 },
        { q: "¿Cuál es CORRECTO?", options: ["Where you are from?", "Where are you from?", "Where from you are?", "From where you are?"], correct: 1 },
        { q: "¿Cuál es CORRECTO?", options: ["I can to swim", "I can swim", "I can swimming", "I can swims"], correct: 1 },
        { q: "¿Cuál es CORRECTO?", options: ["I'm boring (estoy aburrido)", "I'm bored (estoy aburrido)", "I'm boredly", "I'm boring me"], correct: 1 },
        { q: "¿Cuál es CORRECTO?", options: ["I didn't went", "I didn't go", "I didn't went there", "I no went"], correct: 1 },
      ],
    },
  ],
};
