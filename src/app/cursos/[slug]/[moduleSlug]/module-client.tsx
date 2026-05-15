"use client";

import type { ModuleData } from "@/types/course";
import { ModuleBlockRenderer } from "@/components/module-block-renderer";
import { Progress } from "@/components/ui/progress";
import { useReportActivity, useRecordQuiz, useRecordMistake, useModuleProgress } from "@/hooks/use-course-progress";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export function ModuleClient({ courseSlug, moduleData }: { courseSlug: string; moduleData: ModuleData }) {
  const [userId, setUserId] = useState<string>();
  const [courseId, setCourseId] = useState<string>();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id));
    supabase
      .from("courses")
      .select("id")
      .eq("slug", courseSlug)
      .single()
      .then(({ data }) => setCourseId(data?.id));
  }, [courseSlug]);

  const { data: progress } = useModuleProgress(courseId, userId, moduleData.slug);
  const reportActivity = useReportActivity(courseSlug, moduleData.slug);
  const recordQuiz = useRecordQuiz(courseSlug);
  const recordMistake = useRecordMistake(courseSlug);

  const done = new Set((progress ?? []).map((p) => p.activity_key));
  const pct = moduleData.totalActivities > 0 ? (done.size / moduleData.totalActivities) * 100 : 0;

  return (
    <>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-5 rounded-xl border">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-primary">📊 Tu avance en este módulo</span>
          <span className="text-sm text-muted-foreground font-medium">
            {done.size}/{moduleData.totalActivities} actividades ({Math.round(pct)}%)
          </span>
        </div>
        <Progress value={pct} className="h-4" />
      </div>

      <ModuleBlockRenderer
        blocks={moduleData.blocks}
        onActivityComplete={(key) => {
          reportActivity.mutate(key, {
            onSuccess: () => {
              if (!done.has(key)) toast.success("+10 XP — Actividad completada");
            },
          });
        }}
        onQuizComplete={(key, result) => {
          recordQuiz.mutate(
            { moduleSlug: moduleData.slug, quizType: key, score: result.correct, total: result.total },
            {
              onSuccess: (r) => {
                if (r?.passed) toast.success("+20 XP — Test aprobado");
                if (r?.perfect) toast.success("+50 XP — ¡Perfecto! 🎯");
              },
            },
          );
          // Guardar las preguntas falladas
          const block = moduleData.blocks.find((b) => b.kind === "quiz" && b.key === key);
          if (block?.kind === "quiz") {
            block.questions.forEach((q, i) => {
              if (i < result.total && result.correct < result.total) {
                // No tenemos info granular de qué se falló desde aquí — el componente Quiz envía via mistakes prop
              }
            });
          }
        }}
      />
    </>
  );
}
