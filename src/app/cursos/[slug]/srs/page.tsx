import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/content/courses";
import { SrsClient } from "./srs-client";

export default async function SrsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">🔁 Repaso Inteligente (SRS)</h1>
      <p className="text-muted-foreground">Repetición espaciada: las palabras que dominas aparecen menos, las que fallas vuelven pronto.</p>
      <SrsClient courseSlug={slug} glossary={course.glossary} />
    </div>
  );
}
