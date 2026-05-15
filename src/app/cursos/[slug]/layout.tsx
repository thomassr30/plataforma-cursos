import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { CourseSidebar } from "@/components/layout/course-sidebar";
import { getCourseBySlug } from "@/content/courses";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, email, is_active")
    .eq("id", user.id)
    .single();

  if (!profile?.is_active) {
    await supabase.auth.signOut();
    redirect("/auth/pending");
  }

  const { data: dbCourse } = await supabase.from("courses").select("id").eq("slug", slug).single();

  if (dbCourse) {
    await supabase
      .from("user_course_enrollments")
      .upsert(
        { user_id: user.id, course_id: dbCourse.id, last_visited_at: new Date().toISOString() },
        { onConflict: "user_id,course_id" },
      );
  }

  // Fetch progress and gamification stats
  const [{ data: progressRows }, { data: game }] = await Promise.all([
    dbCourse
      ? supabase
          .from("user_module_progress")
          .select("module_slug, activity_key")
          .eq("user_id", user.id)
          .eq("course_id", dbCourse.id)
      : Promise.resolve({ data: [] }),
    dbCourse
      ? supabase
          .from("user_gamification")
          .select("xp, level, streak")
          .eq("user_id", user.id)
          .eq("course_id", dbCourse.id)
          .single()
      : Promise.resolve({ data: null }),
  ]);

  const moduleProgress: Record<string, number> = {};
  const moduleSets = new Map<string, Set<string>>();
  (progressRows ?? []).forEach((r) => {
    if (!moduleSets.has(r.module_slug)) moduleSets.set(r.module_slug, new Set());
    moduleSets.get(r.module_slug)!.add(r.activity_key);
  });
  moduleSets.forEach((set, slug) => {
    moduleProgress[slug] = set.size;
  });

  // Overall % across all modules
  const totalActivities = course.modules.reduce((sum, m) => sum + m.totalActivities, 0);
  const doneActivities = course.modules.reduce((sum, m) => sum + Math.min(moduleProgress[m.slug] ?? 0, m.totalActivities), 0);
  const overallPct = totalActivities > 0 ? Math.round((doneActivities / totalActivities) * 100) : 0;

  const stats = {
    xp: game?.xp ?? 0,
    level: game?.level ?? 1,
    streak: game?.streak ?? 0,
    overallPct,
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <DashboardHeader profile={profile ?? { full_name: null, avatar_url: null, email: user.email ?? "" }} />
      <div className="container py-4 lg:py-6 grid gap-4 lg:gap-6 lg:grid-cols-[280px_1fr]">
        <CourseSidebar
          courseSlug={slug}
          modules={course.modules.map((m) => ({
            slug: m.slug,
            number: m.number,
            title: m.title,
            icon: m.icon,
            totalActivities: m.totalActivities,
          }))}
          hasSpeak={(course.speakPhrases?.length ?? 0) > 0}
          hasStories={(course.stories?.length ?? 0) > 0}
          stats={stats}
          moduleProgress={moduleProgress}
        />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
