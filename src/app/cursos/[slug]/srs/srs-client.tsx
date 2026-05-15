"use client";

import { useEffect, useState } from "react";
import type { GlossaryEntry } from "@/types/course";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { speak } from "@/lib/speak";
import { Volume2 } from "lucide-react";

interface SrsRow { word_key: string; interval_days: number; due_date: string; reps: number; mastered: boolean }

export function SrsClient({ courseSlug, glossary }: { courseSlug: string; glossary: GlossaryEntry[] }) {
  const supabase = createClient();
  const [courseId, setCourseId] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [stats, setStats] = useState({ total: 0, due: 0, mastered: 0 });
  const [queue, setQueue] = useState<GlossaryEntry[]>([]);
  const [current, setCurrent] = useState<GlossaryEntry | null>(null);
  const [showAns, setShowAns] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: c } = await supabase.from("courses").select("id").eq("slug", courseSlug).single();
      const { data: u } = await supabase.auth.getUser();
      if (!c || !u.user) return;
      setCourseId(c.id);
      setUserId(u.user.id);
      const today = new Date().toISOString().slice(0, 10);
      const { data: rows } = await supabase
        .from("user_srs")
        .select("*")
        .eq("user_id", u.user.id)
        .eq("course_id", c.id);
      const map = new Map<string, SrsRow>((rows ?? []).map((r) => [r.word_key, r as SrsRow]));
      let due = 0, mastered = 0;
      glossary.forEach((g) => {
        const r = map.get(g.en);
        if (r?.mastered) mastered++;
        else if (!r || r.due_date <= today) due++;
      });
      setStats({ total: glossary.length, due, mastered });
    })();
  }, [courseSlug, glossary, supabase]);

  async function startSession() {
    if (!userId || !courseId) return;
    const today = new Date().toISOString().slice(0, 10);
    const { data: rows } = await supabase
      .from("user_srs")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId);
    const map = new Map<string, SrsRow>((rows ?? []).map((r) => [r.word_key, r as SrsRow]));
    const dueWords = glossary.filter((g) => {
      const r = map.get(g.en);
      return !r || (!r.mastered && r.due_date <= today);
    }).slice(0, 20);
    const shuffled = [...dueWords].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    setCurrent(shuffled[0] ?? null);
    setShowAns(false);
  }

  async function rate(quality: 0 | 1 | 2 | 3) {
    if (!current || !userId || !courseId) return;
    const { data: existing } = await supabase
      .from("user_srs")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .eq("word_key", current.en)
      .single();
    let interval = existing?.interval_days ?? 0;
    let reps = existing?.reps ?? 0;
    let mastered = false;
    if (quality === 0) { interval = 0; reps = 0; }
    else {
      reps += 1;
      const initial: Record<number, number> = { 1: 1, 2: 3, 3: 7 };
      interval = reps === 1 ? initial[quality] ?? 1 : Math.round((interval || 1) * (quality === 3 ? 2.5 : quality === 2 ? 1.8 : 1.3));
      if (interval >= 30) mastered = true;
    }
    const next = new Date();
    next.setDate(next.getDate() + (interval || 1));
    await supabase.from("user_srs").upsert(
      {
        user_id: userId,
        course_id: courseId,
        word_key: current.en,
        interval_days: interval,
        due_date: next.toISOString().slice(0, 10),
        reps,
        mastered,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,course_id,word_key" },
    );
    const newQueue = queue.slice(1);
    setQueue(newQueue);
    setCurrent(newQueue[0] ?? null);
    setShowAns(false);
  }

  if (!current) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card border rounded-xl p-4 text-center"><div className="text-3xl font-bold">{stats.total}</div><div className="text-xs text-muted-foreground">Total</div></div>
          <div className="bg-card border rounded-xl p-4 text-center"><div className="text-3xl font-bold text-amber-600">{stats.due}</div><div className="text-xs text-muted-foreground">Para hoy</div></div>
          <div className="bg-card border rounded-xl p-4 text-center"><div className="text-3xl font-bold text-success">{stats.mastered}</div><div className="text-xs text-muted-foreground">Dominadas</div></div>
        </div>
        <Button onClick={startSession} size="lg" className="w-full">🎯 Repasar palabras de hoy</Button>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6 text-center space-y-4">
        <div className="text-sm text-muted-foreground">Quedan {queue.length} palabras</div>
        <div className="text-4xl font-bold text-primary">{current.en}</div>
        <Button variant="ghost" size="sm" onClick={() => speak(current.en)}>
          <Volume2 className="w-4 h-4" /> Escuchar
        </Button>
        {showAns ? (
          <>
            <div className="text-2xl text-muted-foreground">{current.es}</div>
            <div className="flex gap-2 justify-center flex-wrap">
              <Button onClick={() => rate(0)} variant="destructive">Otra vez ❌</Button>
              <Button onClick={() => rate(1)} className="bg-orange-500 hover:bg-orange-600">Difícil 😓</Button>
              <Button onClick={() => rate(2)}>Bien 👍</Button>
              <Button onClick={() => rate(3)} variant="success">Fácil 🌟</Button>
            </div>
          </>
        ) : (
          <Button onClick={() => setShowAns(true)}>👁️ Mostrar traducción</Button>
        )}
      </CardContent>
    </Card>
  );
}
