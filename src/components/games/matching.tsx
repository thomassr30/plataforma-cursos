"use client";

import { useState, useEffect } from "react";
import type { MatchingPair } from "@/types/course";
import { cn } from "@/lib/utils";

interface Props {
  pairs: MatchingPair[];
  onComplete?: () => void;
}

export function MatchingGame({ pairs, onComplete }: Props) {
  const [rightOrder, setRightOrder] = useState<MatchingPair[]>([]);
  const [selectedL, setSelectedL] = useState<number | null>(null);
  const [selectedR, setSelectedR] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<{ l: number; r: number } | null>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setRightOrder([...pairs].sort(() => Math.random() - 0.5));
    setMatched(new Set());
    setSelectedL(null);
    setSelectedR(null);
  }, [pairs]);

  function findIdInRight(originalIdx: number) {
    return rightOrder.findIndex((p) => p.es === pairs[originalIdx].es);
  }

  function clickLeft(i: number) {
    if (locked || matched.has(i)) return;
    setSelectedL(i === selectedL ? null : i);
  }
  function clickRight(j: number) {
    if (locked) return;
    const origIdx = pairs.findIndex((p) => p.es === rightOrder[j].es);
    if (matched.has(origIdx)) return;
    if (selectedL === null) {
      setSelectedR(j === selectedR ? null : j);
      return;
    }
    // Try match
    if (selectedL === origIdx) {
      const next = new Set(matched);
      next.add(origIdx);
      setMatched(next);
      setSelectedL(null);
      setSelectedR(null);
      if (next.size === pairs.length) onComplete?.();
    } else {
      setWrong({ l: selectedL, r: j });
      setLocked(true);
      setTimeout(() => {
        setWrong(null);
        setSelectedL(null);
        setSelectedR(null);
        setLocked(false);
      }, 800);
    }
  }

  return (
    <div>
      <p className="text-center text-sm text-muted-foreground mb-3">
        Empareja: {matched.size}/{pairs.length}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {pairs.map((p, i) => {
            const isMatched = matched.has(i);
            const isSel = selectedL === i;
            const isWrong = wrong?.l === i;
            return (
              <button
                key={i}
                onClick={() => clickLeft(i)}
                disabled={isMatched}
                className={cn(
                  "w-full p-3 rounded-lg border-2 font-medium transition text-center",
                  !isMatched && !isSel && "border-input bg-card hover:border-primary",
                  isSel && "border-primary bg-primary text-primary-foreground",
                  isMatched && "border-success bg-success text-success-foreground opacity-80 cursor-default",
                  isWrong && "border-destructive bg-destructive/10 animate-shake",
                )}
              >
                {p.en}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {rightOrder.map((p, j) => {
            const origIdx = pairs.findIndex((x) => x.es === p.es);
            const isMatched = matched.has(origIdx);
            const isSel = selectedR === j;
            const isWrong = wrong?.r === j;
            return (
              <button
                key={j}
                onClick={() => clickRight(j)}
                disabled={isMatched}
                className={cn(
                  "w-full p-3 rounded-lg border-2 font-medium transition text-center",
                  !isMatched && !isSel && "border-input bg-card hover:border-primary",
                  isSel && "border-primary bg-primary text-primary-foreground",
                  isMatched && "border-success bg-success text-success-foreground opacity-80 cursor-default",
                  isWrong && "border-destructive bg-destructive/10 animate-shake",
                )}
              >
                {p.es}
              </button>
            );
          })}
        </div>
      </div>
      {matched.size === pairs.length && (
        <div className="mt-4 p-4 rounded-lg bg-success/10 text-success font-semibold text-center">
          ¡Excelente! 🎉 Has emparejado todas las palabras.
        </div>
      )}
    </div>
  );
}
