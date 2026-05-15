import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCourseBySlug } from "@/content/courses";
import { NotesClient } from "./notes-client";

export default async function NotesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) notFound();
  const { data: dbCourse } = await supabase.from("courses").select("id").eq("slug", slug).single();
  if (!dbCourse) notFound();
  const { data: notes } = await supabase
    .from("user_notes")
    .select("scope, content")
    .eq("user_id", user.id)
    .eq("course_id", dbCourse.id);

  const notesMap: Record<string, string> = { general: "" };
  course.modules.forEach((m) => (notesMap[m.slug] = ""));
  (notes ?? []).forEach((n) => (notesMap[n.scope] = n.content));

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">📝 Mis Notas</h1>
      <p className="text-muted-foreground">Tus notas se guardan automáticamente. Una hoja por módulo + una general.</p>
      <NotesClient courseSlug={slug} modules={course.modules.map((m) => ({ slug: m.slug, label: `${m.icon} Módulo ${m.number}: ${m.title}` }))} initial={notesMap} />
    </div>
  );
}
