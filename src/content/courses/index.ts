import type { CourseDefinition } from "@/types/course";
import { inglesA1 } from "./ingles-a1";

export const courses: Record<string, CourseDefinition> = {
  "ingles-a1": inglesA1,
};

export function getCourseBySlug(slug: string) {
  return courses[slug];
}
