"use client";

import { useState, useEffect } from "react";
import type { DragSentence } from "@/types/course";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  items: DragSentence[];
  onComplete?: () => void;
}

function shuffle(arr: string[]) {
  let s = [...arr];
  do {
    s = s.sort(() => Math.random() - 0.5);
  } while (s.length > 1 && s.join(" ") === arr.join(" "));
  return s;
}

export function DragSentenceGame({ items, onComplete }: Props) {
  const [arrangements, setArrangements] = useState<string[][]>([]);
  const [selected, setSelected] = useState<{ row: number; idx: number } | null>(null);
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    setArrangements(items.map((it) => shuffle(it.words)));
    setChecked(items.map(() => false));
  }, [items]);

  function clickWord(row: number, idx: number) {
    if (!selected) {
      setSelected({ row, idx });
      return;
    }
    if (selected.row !== row) {
      setSelected({ row, idx });
      return;
    }
    if (selected.idx === idx) {
      setSelected(null);
      return;
    }
    // Swap
    setArrangements((arr) => {
      const next = [...arr];
      const newRow = [...next[row]];
      [newRow[selected.idx], newRow[idx]] = [newRow[idx], newRow[selected.idx]];
      next[row] = newRow;
      return next;
    });
    setSelected(null);
  }

  function check() {
    const newChecked = arrangements.map((row, i) => row.join(" ") === items[i].words.join(" "));
    setChecked(newChecked);
    onComplete?.();
  }

  const allCorrect = checked.every(Boolean);

  return (
    <div className="space-y-4">
      {items.map((it, row) => (
        <div key={row}>
          <p className="font-medium mb-2">
            {row + 1}. Forma: <strong>"{it.es}"</strong>
          </p>
          <div
            className={cn(
              "flex flex-wrap gap-2 min-h-[60px] p-3 rounded-lg border-2 transition-colors",
              !checked[row] && "border-dashed border-input bg-muted/40",
              checked[row] && "border-success bg-success/10",
              checked[row] === false && checked.some(Boolean) && "border-destructive bg-destructive/10",
            )}
          >
            {(arrangements[row] ?? []).map((w, idx) => (
              <button
                key={idx}
                onClick={() => clickWord(row, idx)}
                className={cn(
                  "px-3 py-2 rounded-md border-2 font-semibold transition",
                  "border-primary bg-card text-primary hover:bg-primary/10",
                  selected?.row === row && selected?.idx === idx && "bg-amber-500 text-white border-amber-500 scale-105",
                )}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      ))}
      {!checked.some(Boolean) && (
        <Button onClick={check} variant="success" className="w-full">
          ✅ Comprobar
        </Button>
      )}
      {checked.some(Boolean) && (
        <div className={cn("p-4 rounded-lg text-center font-semibold", allCorrect ? "bg-success/10 text-success" : "bg-amber-100 text-amber-800")}>
          {checked.filter(Boolean).length}/{items.length} oraciones correctas {allCorrect && "🌟"}
        </div>
      )}
    </div>
  );
}
