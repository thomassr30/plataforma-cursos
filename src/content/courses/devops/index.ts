import type { CourseDefinition } from "@/types/course";
import { modules } from "./modules";
import { glossary } from "./glossary";
import { finalExam } from "./final-exam";
import { achievements } from "./achievements";

export const devops: CourseDefinition = {
  slug: "devops",
  title: "DevOps — Curso Completo",
  level: "Intermedio",
  category: { slug: "devops", name: "DevOps", icon: "⚙️", order: 2 },
  modules,
  glossary,
  finalExam,
  achievements,
};
