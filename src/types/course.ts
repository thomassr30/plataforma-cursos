// =============================================
// Tipos del contenido educativo de un curso
// =============================================

export type QuizQuestion = {
  q: string;
  options: string[];
  correct: number; // índice de la respuesta correcta
};

export type Flashcard = {
  en: string;
  es: string;
  phon?: string;
};

export type FillBlank = {
  text: string; // usa ___ donde va el hueco
  answer: string;
  es: string;
};

export type DragSentence = {
  words: string[]; // orden correcto
  es: string;
};

export type MatchingPair = {
  en: string;
  es: string;
};

export type ConversationLine = {
  side: "A" | "B";
  en: string;
  es: string;
};

export type VocabItem = {
  word: string;
  meaning: string;
};

export type TableRow = (string | { html: string })[];

export type Block =
  | { kind: "info"; html: string }
  | { kind: "tip"; html: string }
  | { kind: "successBox"; html: string }
  | { kind: "h3"; text: string }
  | { kind: "h4"; text: string }
  | { kind: "paragraph"; html: string }
  | { kind: "list"; items: string[] }
  | { kind: "table"; headers: string[]; rows: TableRow[]; speakColIndex?: number }
  | { kind: "vocab"; items: VocabItem[] }
  | { kind: "conversation"; lines: ConversationLine[] }
  | { kind: "flashcards"; key: string; cards: Flashcard[] }
  | { kind: "quiz"; key: string; questions: QuizQuestion[] }
  | { kind: "fillBlanks"; key: string; items: FillBlank[] }
  | { kind: "drag"; key: string; items: DragSentence[] }
  | { kind: "matching"; key: string; pairs: MatchingPair[] }
  | { kind: "writing"; key: string; placeholder: string; keywords: string[]; minWords: number; model: string };

export type ModuleData = {
  slug: string; // ej. "m1"
  number: number;
  title: string;
  icon: string;
  intro: string;
  totalActivities: number;
  blocks: Block[];
};

export type GlossaryEntry = {
  en: string;
  es: string;
  cat: string;
};

export type SpeakPhrase = { en: string; es: string };

export type Achievement = {
  id: string;
  icon: string;
  name: string;
  desc: string;
  threshold: { type: "xp" | "streak" | "tests" | "perfect" | "voice" | "words" | "modules" | "final"; value: number };
};

export type StoryWord = { en: string; tr: string };
export type Story = {
  title: string;
  level: string;
  text: StoryWord[];
  questions: QuizQuestion[];
};

export type CourseCategory = {
  slug: string;
  name: string;
  icon?: string;
  order: number;
};

export type CourseDefinition = {
  slug: string;
  title: string;
  level: string;
  category?: CourseCategory;
  modules: ModuleData[];
  glossary: GlossaryEntry[];
  stories?: Story[]; // opcional (cursos técnicos pueden no tener cuentos)
  finalExam: QuizQuestion[];
  speakPhrases?: SpeakPhrase[]; // opcional (solo cursos de idiomas)
  achievements: Achievement[];
};
