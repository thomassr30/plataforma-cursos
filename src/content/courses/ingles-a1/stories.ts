import type { Story } from "@/types/course";

export const stories: Story[] = [
  {
    title: "Anna's Day",
    level: "Muy fácil",
    text: [
      { en: "Anna", tr: "Anna" }, { en: "is", tr: "es/está" }, { en: "a", tr: "una" }, { en: "student", tr: "estudiante" }, { en: ".", tr: "" },
      { en: "She", tr: "Ella" }, { en: "is", tr: "es" }, { en: "twenty", tr: "veinte" }, { en: "years old", tr: "años" }, { en: ".", tr: "" },
      { en: "Every day", tr: "Cada día" }, { en: "she", tr: "ella" }, { en: "goes", tr: "va" }, { en: "to", tr: "a" }, { en: "university", tr: "universidad" }, { en: ".", tr: "" },
      { en: "She", tr: "Ella" }, { en: "likes", tr: "le gusta" }, { en: "coffee", tr: "café" }, { en: "and", tr: "y" }, { en: "books", tr: "libros" }, { en: ".", tr: "" },
      { en: "In the evening", tr: "Por la tarde" }, { en: ",", tr: "" }, { en: "she", tr: "ella" }, { en: "studies", tr: "estudia" }, { en: "English", tr: "inglés" }, { en: ".", tr: "" },
      { en: "She", tr: "Ella" }, { en: "wants", tr: "quiere" }, { en: "to travel", tr: "viajar" }, { en: "to", tr: "a" }, { en: "London", tr: "Londres" }, { en: ".", tr: "" },
      { en: "Tomorrow", tr: "Mañana" }, { en: "she", tr: "ella" }, { en: "is going to", tr: "va a" }, { en: "meet", tr: "encontrar" }, { en: "her", tr: "su" }, { en: "friend", tr: "amiga" }, { en: "Maria", tr: "Maria" }, { en: ".", tr: "" },
      { en: "They", tr: "Ellas" }, { en: "are going to", tr: "van a" }, { en: "go", tr: "ir" }, { en: "to", tr: "al" }, { en: "the cinema", tr: "cine" }, { en: ".", tr: "" },
    ],
    questions: [
      { q: "How old is Anna?", options: ["15", "20", "25", "30"], correct: 1 },
      { q: "What does Anna like?", options: ["Coffee and books", "Tea and games", "Soccer and music", "Movies and food"], correct: 0 },
      { q: "What is she going to do tomorrow?", options: ["Go to work", "Travel to London", "Meet her friend Maria", "Study English"], correct: 2 },
    ],
  },
  {
    title: "Tom and his Family",
    level: "Fácil",
    text: [
      { en: "Tom", tr: "Tom" }, { en: "is", tr: "es" }, { en: "my", tr: "mi" }, { en: "best friend", tr: "mejor amigo" }, { en: ".", tr: "" },
      { en: "He", tr: "Él" }, { en: "lives", tr: "vive" }, { en: "in", tr: "en" }, { en: "a small", tr: "una pequeña" }, { en: "house", tr: "casa" }, { en: "with", tr: "con" }, { en: "his family", tr: "su familia" }, { en: ".", tr: "" },
      { en: "His father", tr: "Su padre" }, { en: "is", tr: "es" }, { en: "a doctor", tr: "un doctor" }, { en: "and", tr: "y" }, { en: "his mother", tr: "su madre" }, { en: "is", tr: "es" }, { en: "a teacher", tr: "una profesora" }, { en: ".", tr: "" },
      { en: "He has", tr: "Tiene" }, { en: "two sisters", tr: "dos hermanas" }, { en: ".", tr: "" },
      { en: "On weekends", tr: "Los fines de semana" }, { en: "they", tr: "ellos" }, { en: "go", tr: "van" }, { en: "to the park", tr: "al parque" }, { en: ".", tr: "" },
      { en: "Tom", tr: "Tom" }, { en: "loves", tr: "ama" }, { en: "playing football", tr: "jugar al fútbol" }, { en: ".", tr: "" },
      { en: "His sisters", tr: "Sus hermanas" }, { en: "like", tr: "les gusta" }, { en: "dancing", tr: "bailar" }, { en: ".", tr: "" },
      { en: "They", tr: "Ellos" }, { en: "are", tr: "son" }, { en: "a happy", tr: "una feliz" }, { en: "family", tr: "familia" }, { en: ".", tr: "" },
    ],
    questions: [
      { q: "What is Tom's father's job?", options: ["Teacher", "Doctor", "Lawyer", "Engineer"], correct: 1 },
      { q: "How many sisters does Tom have?", options: ["One", "Two", "Three", "None"], correct: 1 },
      { q: "What does Tom love?", options: ["Dancing", "Cooking", "Playing football", "Reading"], correct: 2 },
    ],
  },
  {
    title: "A Day at the Restaurant",
    level: "Intermedio A1",
    text: [
      { en: "Yesterday", tr: "Ayer" }, { en: ",", tr: "" }, { en: "my friend Lucy", tr: "mi amiga Lucy" }, { en: "and I", tr: "y yo" }, { en: "went", tr: "fuimos" }, { en: "to a restaurant", tr: "a un restaurante" }, { en: ".", tr: "" },
      { en: "The waiter", tr: "El camarero" }, { en: "gave", tr: "nos dio" }, { en: "us", tr: "a nosotras" }, { en: "the menu", tr: "el menú" }, { en: ".", tr: "" },
      { en: "I had", tr: "Yo tomé" }, { en: "chicken", tr: "pollo" }, { en: "with", tr: "con" }, { en: "rice", tr: "arroz" }, { en: "and", tr: "y" }, { en: "a glass of water", tr: "un vaso de agua" }, { en: ".", tr: "" },
      { en: "Lucy", tr: "Lucy" }, { en: "had", tr: "tomó" }, { en: "fish", tr: "pescado" }, { en: "with", tr: "con" }, { en: "vegetables", tr: "verduras" }, { en: "and", tr: "y" }, { en: "orange juice", tr: "jugo de naranja" }, { en: ".", tr: "" },
      { en: "For dessert", tr: "De postre" }, { en: ",", tr: "" }, { en: "we ordered", tr: "pedimos" }, { en: "chocolate cake", tr: "pastel de chocolate" }, { en: ".", tr: "" },
      { en: "The food", tr: "La comida" }, { en: "was", tr: "estaba" }, { en: "delicious", tr: "deliciosa" }, { en: "!", tr: "" },
      { en: "The bill", tr: "La cuenta" }, { en: "was", tr: "fue" }, { en: "forty dollars", tr: "cuarenta dólares" }, { en: ".", tr: "" },
      { en: "We left", tr: "Dejamos" }, { en: "a tip", tr: "una propina" }, { en: "for", tr: "para" }, { en: "the waiter", tr: "el camarero" }, { en: ".", tr: "" },
    ],
    questions: [
      { q: "What did the narrator eat?", options: ["Fish with vegetables", "Chicken with rice", "Pizza", "Salad"], correct: 1 },
      { q: "What did they have for dessert?", options: ["Ice cream", "Fruit", "Chocolate cake", "Cookies"], correct: 2 },
      { q: "How much was the bill?", options: ["$20", "$30", "$40", "$50"], correct: 2 },
    ],
  },
];
