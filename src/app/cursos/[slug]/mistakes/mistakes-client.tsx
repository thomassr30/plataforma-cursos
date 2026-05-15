"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface Mistake { id: string; question: string; options: string[]; correctIdx: number }

export function MistakesClient({ courseSlug, initial }: { courseSlug: string; initial: Mistake[] }) {
  const [mistakes, setMistakes] = useState(initial);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  if (mistakes.length === 0) {
    return <div className="bg-success/10 text-success rounded-lg p-6 text-center font-semibold">🎉 ¡No tienes errores guardados!</div>;
  }

  const current = mistakes[idx];
  if (!current) return null;

  async function check() {
    setChecked(true);
    if (selected === current.correctIdx) {
      const supabase = createClient();
      await supabase.from("user_mistakes").delete().eq("id", current.id);
      setMistakes(mistakes.filter((m) => m.id !== current.id));
      toast.success("¡Bien! Error eliminado +10 XP");
    }
    setTimeout(() => {
      setIdx(idx);
      setSelected(null);
      setChecked(false);
    }, 1500);
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Pregunta {idx + 1} de {mistakes.length}</p>
      <Card>
        <CardContent className="pt-6 space-y-3">
          <p className="font-semibold">{current.question}</p>
          <div className="grid gap-2">
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                disabled={checked}
                className={`p-3 rounded-lg border-2 text-left ${
                  selected === i && !checked ? "border-primary bg-primary/10" :
                  checked && i === current.correctIdx ? "border-success bg-success/10" :
                  checked && i === selected ? "border-destructive bg-destructive/10" :
                  "border-input"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={check} disabled={checked || selected === null} variant="success">✅ Comprobar</Button>
            <Button onClick={() => { setIdx(Math.min(idx + 1, mistakes.length - 1)); setSelected(null); setChecked(false); }} variant="outline">Siguiente ➡️</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
