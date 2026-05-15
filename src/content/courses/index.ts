import type { CourseDefinition } from "@/types/course";
import { inglesA1 } from "./ingles-a1";
import { devops } from "./devops";
import { ddd } from "./ddd";

export const courses: Record<string, CourseDefinition> = {
  "ingles-a1": inglesA1,
  "devops": devops,
  "ddd": ddd,
};

export function getCourseBySlug(slug: string) {
  return courses[slug];
}
