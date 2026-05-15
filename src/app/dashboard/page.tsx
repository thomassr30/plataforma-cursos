import { createClient } from "@/lib/supabase/server";
import { CourseCard } from "@/components/course-card";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: courses }, { data: enrollments }, { data: gamification }] = await Promise.all([
    supabase.from("courses").select("*").eq("is_active", true).order("created_at"),
    supabase.from("user_course_enrollments").select("course_id, last_visited_at").eq("user_id", user!.id),
    supabase.from("user_gamification").select("course_id, xp, level, streak").eq("user_id", user!.id),
  ]);

  const enrolledMap = new Map((enrollments ?? []).map((e) => [e.course_id, e]));
  const gameMap = new Map((gamification ?? []).map((g) => [g.course_id, g]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mis Cursos</h1>
        <p className="text-muted-foreground">Elige un curso y continúa donde lo dejaste.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(courses ?? []).map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isEnrolled={enrolledMap.has(course.id)}
            gamification={gameMap.get(course.id) ?? null}
          />
        ))}
      </div>
      {(courses ?? []).length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay cursos disponibles todavía.</p>
        </div>
      )}
    </div>
  );
}
