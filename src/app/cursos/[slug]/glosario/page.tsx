import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/content/courses";
import { GlossaryClient } from "./glossary-client";

export default async function GlosarioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">📚 Glosario {course.level}</h1>
      <p className="text-muted-foreground">Más de {course.glossary.length} palabras esenciales. Búscalas en español o inglés.</p>
      <GlossaryClient entries={course.glossary} />
    </div>
  );
}
