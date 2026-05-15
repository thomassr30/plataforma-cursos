import type { CourseDefinition } from "@/types/course";
import { modules } from "./modules";
import { glossary } from "./glossary";
import { finalExam } from "./final-exam";
import { achievements } from "./achievements";

export const gcpDigitalLeader: CourseDefinition = {
  slug: "gcp-digital-leader",
  title: "Google Cloud Digital Leader (2026)",
  level: "Fundamental",
  category: { slug: "cloud", name: "Cloud Certifications", icon: "☁️", order: 4 },
  modules,
  glossary,
  finalExam,
  achievements,
};
