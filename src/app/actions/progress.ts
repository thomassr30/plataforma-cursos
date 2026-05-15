"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function reportActivity(courseSlug: string, moduleSlug: string, activityKey: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: course } = await supabase.from("courses").select("id").eq("slug", courseSlug).single();
  if (!course) return { error: "Course not found" };

  await supabase.from("user_module_progress").upsert(
    {
      user_id: user.id,
      course_id: course.id,
      module_slug: moduleSlug,
      activity_key: activityKey,
    },
    { onConflict: "user_id,course_id,module_slug,activity_key" },
  );

  await supabase.from("user_course_enrollments").upsert(
    { user_id: user.id, course_id: course.id, last_visited_at: new Date().toISOString() },
    { onConflict: "user_id,course_id" },
  );

  await addXP(user.id, course.id, 10);
  revalidatePath(`/cursos/${courseSlug}`);
  return { ok: true };
}

export async function recordQuizAttempt(input: {
  courseSlug: string;
  moduleSlug: string;
  quizType: string;
  score: number;
  total: number;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: course } = await supabase.from("courses").select("id").eq("slug", input.courseSlug).single();
  if (!course) return { error: "Course not found" };

  const passed = input.total > 0 && input.score / input.total >= 0.7;
  const perfect = input.total > 0 && input.score === input.total;

  await supabase.from("user_quiz_attempts").insert({
    user_id: user.id,
    course_id: course.id,
    module_slug: input.moduleSlug,
    quiz_type: input.quizType,
    score: input.score,
    total: input.total,
    passed,
  });

  // Gamification
  const xp = perfect ? 50 : passed ? 20 : 5;
  await addXP(user.id, course.id, xp);
  if (passed || perfect) {
    const { data: game } = await supabase
      .from("user_gamification")
      .select("tests_passed, perfect_tests")
      .eq("user_id", user.id)
      .eq("course_id", course.id)
      .single();
    await supabase.from("user_gamification").update({
      tests_passed: (game?.tests_passed ?? 0) + (passed ? 1 : 0),
      perfect_tests: (game?.perfect_tests ?? 0) + (perfect ? 1 : 0),
      updated_at: new Date().toISOString(),
    }).eq("user_id", user.id).eq("course_id", course.id);
  }
  return { ok: true, passed, perfect };
}

export async function recordMistake(courseSlug: string, mistake: { question: string; options: string[]; correctIdx: number }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: course } = await supabase.from("courses").select("id").eq("slug", courseSlug).single();
  if (!course) return { error: "Course not found" };

  await supabase.from("user_mistakes").insert({
    user_id: user.id,
    course_id: course.id,
    question: mistake.question,
    options: mistake.options,
    correct_idx: mistake.correctIdx,
  });
  return { ok: true };
}

export async function addXP(userId: string, courseId: string, amount: number) {
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data: existing } = await supabase
    .from("user_gamification")
    .select("xp, streak, last_visit_date")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .single();

  if (!existing) {
    await supabase.from("user_gamification").insert({
      user_id: userId,
      course_id: courseId,
      xp: amount,
      level: Math.floor(amount / 100) + 1,
      streak: 1,
      last_visit_date: today,
    });
    return;
  }

  let newStreak = existing.streak ?? 0;
  if (existing.last_visit_date !== today) {
    const lastDate = existing.last_visit_date ? new Date(existing.last_visit_date) : null;
    const diff = lastDate ? Math.round((new Date(today).getTime() - lastDate.getTime()) / 86400000) : null;
    if (diff === 1) newStreak += 1;
    else if (diff !== null && diff > 1) newStreak = 1;
    else newStreak = newStreak || 1;
  }

  const newXP = (existing.xp ?? 0) + amount;
  await supabase.from("user_gamification").update({
    xp: newXP,
    level: Math.floor(newXP / 100) + 1,
    streak: newStreak,
    last_visit_date: today,
    updated_at: new Date().toISOString(),
  }).eq("user_id", userId).eq("course_id", courseId);
}

export async function saveNote(courseSlug: string, scope: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };
  const { data: course } = await supabase.from("courses").select("id").eq("slug", courseSlug).single();
  if (!course) return { error: "Course not found" };
  await supabase.from("user_notes").upsert(
    { user_id: user.id, course_id: course.id, scope, content, updated_at: new Date().toISOString() },
    { onConflict: "user_id,course_id,scope" },
  );
  return { ok: true };
}
