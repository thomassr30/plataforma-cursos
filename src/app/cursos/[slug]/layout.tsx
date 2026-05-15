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

  return (
    <div className="min-h-screen bg-muted/40">
      <DashboardHeader profile={profile ?? { full_name: null, avatar_url: null, email: user.email ?? "" }} />
      <div className="container py-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <CourseSidebar
          courseSlug={slug}
          modules={course.modules.map((m) => ({ slug: m.slug, number: m.number, title: m.title, icon: m.icon }))}
        />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
