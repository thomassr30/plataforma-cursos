"use client";

import { useState } from "react";
import type { FillBlank } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  items: FillBlank[];
  onComplete?: () => void;
}

export function FillBlanksGame({ items, onComplete }: Props) {
  const [values, setValues] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  function check() {
    setChecked(true);
    onComplete?.();
  }

  const allCorrect =
    checked && items.every((it, i) => (values[i] ?? "").trim().toLowerCase() === it.answer.toLowerCase());

  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const parts = it.text.split("___");
        const userAnswer = (values[i] ?? "").trim().toLowerCase();
        const correct = it.answer.toLowerCase();
        const ok = checked && userAnswer === correct;
        const bad = checked && userAnswer !== correct;
        return (
          <Card key={i}>
            <CardContent className="pt-4 flex items-center gap-2 flex-wrap">
              <span>{parts[0]}</span>
              <input
                value={values[i] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [i]: e.target.value }))}
                disabled={checked}
                className={cn(
                  "border-b-2 px-2 py-1 outline-none bg-transparent min-w-[100px] text-center font-medium",
                  !checked && "border-primary focus:border-amber-500",
                  ok && "border-success text-success",
                  bad && "border-destructive text-destructive",
                )}
              />
              <span>{parts[1] ?? ""}</span>
              <span className="ml-auto text-sm italic text-muted-foreground">({it.es})</span>
              {bad && <span className="text-xs text-success font-semibold ml-2">Correcta: {it.answer}</span>}
            </CardContent>
          </Card>
        );
      })}
      {!checked && (
        <Button onClick={check} variant="success" className="w-full">
          ✅ Comprobar
        </Button>
      )}
      {checked && (
        <div className={cn("p-4 rounded-lg text-center font-semibold", allCorrect ? "bg-success/10 text-success" : "bg-amber-100 text-amber-800")}>
          {allCorrect ? "¡Perfecto! 🎉" : "Revisa las respuestas marcadas en rojo."}
        </div>
      )}
    </div>
  );
}
