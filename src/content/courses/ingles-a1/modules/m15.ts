import type { ModuleData } from "@/types/course";

export const m15: ModuleData = {
  slug: "m15",
  number: 15,
  title: "Lectura, Escritura y Listening A1",
  icon: "📖",
  intro: "Un examen A1 evalúa CUATRO habilidades. Aquí practicaremos lectura, escritura y listening.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "📖 Lectura: Mi familia" },
    { kind: "info", html: "Hello! My name is Sarah. I am 25 years old and I am from London. My father is a doctor and my mother is a teacher. I have two brothers and one sister. We have a small dog called Max. I love my family very much." },
    {
      kind: "quiz",
      key: "m15_quiz",
      questions: [
        { q: "Sarah is from...", options: ["Paris", "London", "Madrid", "Rome"], correct: 1 },
        { q: "Sarah's father is...", options: ["A teacher", "A doctor", "An engineer", "A waiter"], correct: 1 },
        { q: "Sarah has...", options: ["One brother", "Two brothers", "Three brothers", "No brothers"], correct: 1 },
        { q: "The dog's name is...", options: ["Lucky", "Max", "Rex", "Bobby"], correct: 1 },
        { q: "Sarah is...", options: ["15", "20", "25", "30"], correct: 2 },
      ],
    },
  ],
};
