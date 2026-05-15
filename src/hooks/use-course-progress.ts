"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { reportActivity, recordQuizAttempt, recordMistake } from "@/app/actions/progress";

export function useGamification(courseId: string | undefined, userId: string | undefined) {
  return useQuery({
    queryKey: ["gamification", courseId, userId],
    queryFn: async () => {
      if (!courseId || !userId) return null;
      const supabase = createClient();
      const { data } = await supabase
        .from("user_gamification")
        .select("*")
        .eq("user_id", userId)
        .eq("course_id", courseId)
        .single();
      return data;
    },
    enabled: !!courseId && !!userId,
  });
}

export function useModuleProgress(courseId: string | undefined, userId: string | undefined, moduleSlug: string) {
  return useQuery({
    queryKey: ["moduleProgress", courseId, userId, moduleSlug],
    queryFn: async () => {
      if (!courseId || !userId) return [] as { activity_key: string }[];
      const supabase = createClient();
      const { data } = await supabase
        .from("user_module_progress")
        .select("activity_key")
        .eq("user_id", userId)
        .eq("course_id", courseId)
        .eq("module_slug", moduleSlug);
      return (data ?? []) as { activity_key: string }[];
    },
    enabled: !!courseId && !!userId,
  });
}

export function useReportActivity(courseSlug: string, moduleSlug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (activityKey: string) => reportActivity(courseSlug, moduleSlug, activityKey),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["moduleProgress"] });
      qc.invalidateQueries({ queryKey: ["gamification"] });
    },
  });
}

export function useRecordQuiz(courseSlug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { moduleSlug: string; quizType: string; score: number; total: number }) =>
      recordQuizAttempt({ courseSlug, ...input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gamification"] });
    },
  });
}

export function useRecordMistake(courseSlug: string) {
  return useMutation({
    mutationFn: async (m: { question: string; options: string[]; correctIdx: number }) =>
      recordMistake(courseSlug, m),
  });
}
