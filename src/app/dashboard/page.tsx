import { createClient } from "@/lib/supabase/server";
import { CourseCard } from "@/components/course-card";
import type { Database } from "@/types/database";

type Course = Database["public"]["Tables"]["courses"]["Row"];

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: courses }, { data: enrollments }, { data: gamification }] = await Promise.all([
    supabase
      .from("courses")
      .select("*")
      .eq("is_active", true)
      .order("category_order", { ascending: true })
      .order("created_at", { ascending: true }),
    supabase.from("user_course_enrollments").select("course_id, last_visited_at").eq("user_id", user!.id),
    supabase.from("user_gamification").select("course_id, xp, level, streak").eq("user_id", user!.id),
  ]);

  const enrolledMap = new Map((enrollments ?? []).map((e) => [e.course_id, e]));
  const gameMap = new Map((gamification ?? []).map((g) => [g.course_id, g]));

  // Group courses by category preserving order
  const grouped = new Map<string, { meta: { name: string; icon: string | null; order: number; slug: string }; items: Course[] }>();
  (courses ?? []).forEach((c) => {
    const key = c.category_slug ?? "general";
    if (!grouped.has(key)) {
      grouped.set(key, {
        meta: { name: c.category ?? "General", icon: c.category_icon, order: c.category_order ?? 0, slug: key },
        items: [],
      });
    }
    grouped.get(key)!.items.push(c);
  });

  const orderedCategories = [...grouped.values()].sort((a, b) => a.meta.order - b.meta.order);

  return (
    <div className="space-y-6 sm:space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Mis Cursos</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Elige una categoría y comienza a aprender.</p>
      </div>

      {orderedCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay cursos disponibles todavía.</p>
        </div>
      )}

      {orderedCategories.map((cat) => (
        <section key={cat.meta.slug} className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3">
            {cat.meta.icon && (
              <span className="text-2xl sm:text-3xl" aria-hidden>
                {cat.meta.icon}
              </span>
            )}
            <div>
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight">{cat.meta.name}</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {cat.items.length} {cat.items.length === 1 ? "curso" : "cursos"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {cat.items.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={enrolledMap.has(course.id)}
                gamification={gameMap.get(course.id) ?? null}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
