import type { ModuleData } from "@/types/course";

export const m19: ModuleData = {
  slug: "m19",
  number: 19,
  title: "Situaciones Reales",
  icon: "🌎",
  intro: "Aplica todo lo aprendido a situaciones de la vida real: restaurante, médico, compras, viajes.",
  totalActivities: 1,
  blocks: [
    { kind: "h3", text: "🍽️ En el Restaurante" },
    {
      kind: "vocab",
      items: [
        { word: "menu", meaning: "menú" }, { word: "waiter", meaning: "mesero" },
        { word: "bill / check", meaning: "cuenta" }, { word: "tip", meaning: "propina" },
        { word: "main course", meaning: "plato principal" }, { word: "dessert", meaning: "postre" },
      ],
    },
    { kind: "h3", text: "🏥 En el Médico" },
    {
      kind: "vocab",
      items: [
        { word: "headache", meaning: "dolor de cabeza" }, { word: "stomachache", meaning: "dolor de estómago" },
        { word: "fever", meaning: "fiebre" }, { word: "medicine", meaning: "medicina" },
        { word: "prescription", meaning: "receta" }, { word: "pharmacy", meaning: "farmacia" },
      ],
    },
    { kind: "h3", text: "🛍️ De Compras" },
    {
      kind: "vocab",
      items: [
        { word: "size", meaning: "talla" }, { word: "fitting room", meaning: "probador" },
        { word: "discount", meaning: "descuento" }, { word: "sale", meaning: "rebaja" },
        { word: "receipt", meaning: "recibo" },
      ],
    },
    { kind: "h3", text: "✈️ Aeropuerto y Hotel" },
    {
      kind: "vocab",
      items: [
        { word: "check-in", meaning: "facturación" }, { word: "boarding pass", meaning: "tarjeta de embarque" },
        { word: "luggage", meaning: "equipaje" }, { word: "flight", meaning: "vuelo" },
        { word: "single room", meaning: "habitación individual" }, { word: "double room", meaning: "habitación doble" },
      ],
    },
    {
      kind: "quiz",
      key: "m19_quiz",
      questions: [
        { q: "¿Cómo pides el menú?", options: ["Give me the menu", "Can I see the menu, please?", "Menu now", "Menu for me"], correct: 1 },
        { q: "¿Cómo dices 'Me duele la cabeza'?", options: ["My head hurt", "I am headache", "I have a headache", "My head pain"], correct: 2 },
        { q: "¿Cómo preguntas el precio?", options: ["How many is?", "How much is this?", "What price?", "How money?"], correct: 1 },
        { q: "¿Qué es 'boarding pass'?", options: ["Pasaporte", "Tarjeta de embarque", "Equipaje", "Boleto tren"], correct: 1 },
        { q: "¿Cómo pides la cuenta?", options: ["Bill, please", "The bill, please", "Pay now", "Money now"], correct: 1 },
        { q: "'Single room' significa:", options: ["Grande", "Doble", "Individual", "Con balcón"], correct: 2 },
        { q: "¿Cómo dices 'tengo fiebre'?", options: ["I am fever", "I have fever", "I have a fever", "I feel fever"], correct: 2 },
      ],
    },
  ],
};
