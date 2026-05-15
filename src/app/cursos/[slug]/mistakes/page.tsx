import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCourseBySlug } from "@/content/courses";
import { MistakesClient } from "./mistakes-client";

export default async function MistakesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) notFound();

  const { data: dbCourse } = await supabase.from("courses").select("id").eq("slug", slug).single();
  if (!dbCourse) notFound();

  const { data: mistakes } = await supabase
    .from("user_mistakes")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", dbCourse.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">🔄 Repasar mis Errores</h1>
      <p className="text-muted-foreground">"Solo aprendemos cuando entendemos por qué nos equivocamos."</p>
      <MistakesClient courseSlug={slug} initial={(mistakes ?? []).map((m) => ({ id: m.id, question: m.question, options: m.options as string[], correctIdx: m.correct_idx }))} />
    </div>
  );
}
