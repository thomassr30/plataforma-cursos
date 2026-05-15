import type { CourseDefinition } from "@/types/course";
import { inglesA1 } from "./ingles-a1";
import { devops } from "./devops";
import { ddd } from "./ddd";
import { gcpDigitalLeader } from "./gcp-digital-leader";
import { awsCloudPractitioner } from "./aws-cloud-practitioner";

export const courses: Record<string, CourseDefinition> = {
  "ingles-a1": inglesA1,
  "devops": devops,
  "ddd": ddd,
  "gcp-digital-leader": gcpDigitalLeader,
  "aws-cloud-practitioner": awsCloudPractitioner,
};

export function getCourseBySlug(slug: string) {
  return courses[slug];
}
