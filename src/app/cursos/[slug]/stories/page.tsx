import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/content/courses";
import { StoriesClient } from "./stories-client";

export default async function StoriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  if (!course.stories || course.stories.length === 0) notFound();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">📖 Cuentos</h1>
      <p className="text-muted-foreground">Lectura graduada. Pasa el ratón sobre las palabras subrayadas para ver la traducción.</p>
      <StoriesClient stories={course.stories} />
    </div>
  );
}
