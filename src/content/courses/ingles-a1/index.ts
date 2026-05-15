import type { CourseDefinition } from "@/types/course";
import { modules } from "./modules";
import { glossary } from "./glossary";
import { stories } from "./stories";
import { finalExam } from "./final-exam";
import { speakPhrases } from "./speak-phrases";
import { achievements } from "./achievements";

export const inglesA1: CourseDefinition = {
  slug: "ingles-a1",
  title: "Inglés A1 — Certificación",
  level: "A1",
  modules,
  glossary,
  stories,
  finalExam,
  speakPhrases,
  achievements,
};
