import type { CourseDefinition } from "@/types/course";
import { modules } from "./modules";
import { glossary } from "./glossary";
import { finalExam } from "./final-exam";
import { achievements } from "./achievements";

export const awsCloudPractitioner: CourseDefinition = {
  slug: "aws-cloud-practitioner",
  title: "AWS Certified Cloud Practitioner (CLF-C02)",
  level: "Foundational",
  category: { slug: "cloud", name: "Cloud Certifications", icon: "☁️", order: 4 },
  modules,
  glossary,
  finalExam,
  achievements,
};
