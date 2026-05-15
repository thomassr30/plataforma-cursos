import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/content/courses";
import { FinalExamClient } from "./final-exam-client";

export default async function FinalExamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">🎓 Examen Final de Certificación</h1>
      <p className="text-muted-foreground">{course.finalExam.length} preguntas. Necesitas 70% para aprobar y obtener tu certificado.</p>
      <FinalExamClient courseSlug={slug} questions={course.finalExam} courseTitle={course.title} courseLevel={course.level} />
    </div>
  );
}
