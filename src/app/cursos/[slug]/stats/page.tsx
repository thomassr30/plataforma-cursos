import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCourseBySlug } from "@/content/courses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default async function StatsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) notFound();

  const { data: dbCourse } = await supabase.from("courses").select("id").eq("slug", slug).single();
  if (!dbCourse) notFound();

  const [{ data: game }, { data: progressRows }, { data: mistakesCount }] = await Promise.all([
    supabase.from("user_gamification").select("*").eq("user_id", user.id).eq("course_id", dbCourse.id).single(),
    supabase.from("user_module_progress").select("module_slug, activity_key").eq("user_id", user.id).eq("course_id", dbCourse.id),
    supabase.from("user_mistakes").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("course_id", dbCourse.id),
  ]);

  const moduleProgressMap = new Map<string, Set<string>>();
  (progressRows ?? []).forEach((r) => {
    if (!moduleProgressMap.has(r.module_slug)) moduleProgressMap.set(r.module_slug, new Set());
    moduleProgressMap.get(r.module_slug)!.add(r.activity_key);
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">🏆 Mi Progreso</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatBox label="XP" value={game?.xp ?? 0} />
        <StatBox label="Nivel" value={game?.level ?? 1} />
        <StatBox label="Racha (días)" value={game?.streak ?? 0} />
        <StatBox label="Tests aprobados" value={game?.tests_passed ?? 0} />
        <StatBox label="Tests perfectos" value={game?.perfect_tests ?? 0} />
        <StatBox label="Voz correcta" value={game?.voice_correct ?? 0} />
        <StatBox label="Palabras dominadas" value={game?.words_mastered ?? 0} />
        <StatBox label="Errores guardados" value={(mistakesCount as unknown as { count?: number })?.count ?? 0} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>📈 Avance por módulo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {course.modules.map((m) => {
            const done = moduleProgressMap.get(m.slug)?.size ?? 0;
            const pct = m.totalActivities > 0 ? (done / m.totalActivities) * 100 : 0;
            return (
              <div key={m.slug}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">
                    {m.icon} Módulo {m.number}: {m.title}
                  </span>
                  <span className="text-muted-foreground">
                    {done}/{m.totalActivities} ({Math.round(pct)}%)
                  </span>
                </div>
                <Progress value={pct} />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🎖️ Logros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {course.achievements.map((a) => {
              const unlocked = (game?.achievements ?? []).includes(a.id);
              return (
                <div
                  key={a.id}
                  className={`p-4 rounded-xl border-2 text-center transition ${
                    unlocked ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30" : "border-input bg-muted/40 opacity-50"
                  }`}
                >
                  <div className="text-3xl mb-1">{a.icon}</div>
                  <div className="font-semibold text-sm">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.desc}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-card border rounded-xl p-4 text-center shadow-sm">
      <div className="text-3xl font-bold text-primary">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
