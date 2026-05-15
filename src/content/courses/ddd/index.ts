import type { CourseDefinition } from "@/types/course";
import { modules } from "./modules";
import { glossary } from "./glossary";
import { finalExam } from "./final-exam";
import { achievements } from "./achievements";

export const ddd: CourseDefinition = {
  slug: "ddd",
  title: "Domain-Driven Design",
  level: "Avanzado",
  category: { slug: "patrones", name: "Patrones de Diseño", icon: "🏛️", order: 3 },
  modules,
  glossary,
  finalExam,
  achievements,
};
