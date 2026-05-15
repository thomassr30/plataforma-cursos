import type { ModuleData } from "@/types/course";

export const m9: ModuleData = {
  slug: "m9",
  number: 9,
  title: "CAN / CAN'T (Habilidad)",
  icon: "💪",
  intro: "El verbo 'can' significa 'poder' o 'saber hacer'. ¡Y es IGUAL para todos los pronombres!",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "💪 Estructura" },
    { kind: "paragraph", html: "<strong>I/You/He/She/It/We/They</strong> + <strong>can / can't</strong> + verbo (infinitivo)." },
    { kind: "tip", html: "Después de 'can', el verbo SIEMPRE va en infinitivo. ✅ 'She can dance.' ❌ 'She can dances.'" },
    { kind: "h3", text: "❓ Preguntas" },
    { kind: "paragraph", html: "<strong>Can + sujeto + verbo?</strong> → Yes, I can. / No, I can't." },
    {
      kind: "fillBlanks",
      key: "m9_fill",
      items: [
        { text: "I ___ swim. (sí sé)", answer: "can", es: "Yo sé nadar" },
        { text: "She ___ speak Chinese. (no)", answer: "can't", es: "Ella no sabe chino" },
        { text: "___ you help me?", answer: "Can", es: "¿Puedes ayudarme?" },
        { text: "He ___ play guitar very well.", answer: "can", es: "Él toca guitarra muy bien" },
      ],
    },
    {
      kind: "drag",
      key: "m9_drag",
      items: [
        { words: ["Can", "you", "swim"], es: "¿Sabes nadar?" },
        { words: ["She", "can", "play", "the", "piano"], es: "Ella sabe tocar el piano" },
        { words: ["I", "can", "not", "drive"], es: "No sé conducir" },
      ],
    },
    {
      kind: "quiz",
      key: "m9_quiz",
      questions: [
        { q: "¿Cuál es correcto?", options: ["She can sings", "She cans sing", "She can sing", "She is can sing"], correct: 2 },
        { q: '¿Cómo se dice "No sé nadar"?', options: ["I can't swimming", "I no swim", "I can't swim", "I not can swim"], correct: 2 },
        { q: "¿Cuál es la pregunta correcta?", options: ["You can drive?", "Do you can drive?", "Can you drive?", "Are you can drive?"], correct: 2 },
        { q: '¿Respuesta correcta para "Can you cook?" (sí)', options: ["Yes, I cook.", "Yes, I can.", "Yes, I do.", "Yes, I am."], correct: 1 },
      ],
    },
  ],
};
