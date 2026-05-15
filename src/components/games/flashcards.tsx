"use client";

import { useState } from "react";
import type { Flashcard } from "@/types/course";
import { Button } from "@/components/ui/button";
import { speak } from "@/lib/speak";
import { Volume2 } from "lucide-react";

interface Props {
  cards: Flashcard[];
  onComplete?: () => void;
}

export function FlashcardsGame({ cards, onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);

  const card = cards[idx];

  function next() {
    if (idx < cards.length - 1) {
      setIdx(idx + 1);
      setFlipped(false);
      if (idx + 1 === cards.length - 1 && !done) {
        setDone(true);
        onComplete?.();
      }
    }
  }
  function prev() {
    if (idx > 0) {
      setIdx(idx - 1);
      setFlipped(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <button
        onClick={() => setFlipped(!flipped)}
        className="relative w-80 h-52 [perspective:1000px] focus:outline-none"
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold rounded-2xl shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white [backface-visibility:hidden]">
            {card.en}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-xl font-medium rounded-2xl shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div>{card.es}</div>
            {card.phon && <div className="text-sm italic mt-2 opacity-90">{card.phon}</div>}
          </div>
        </div>
      </button>
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={prev} disabled={idx === 0}>
          ⬅️ Anterior
        </Button>
        <Button variant="ghost" size="sm" onClick={() => speak(card.en)}>
          <Volume2 className="w-4 h-4" /> Escuchar
        </Button>
        <span className="text-sm text-muted-foreground font-medium">
          {idx + 1} / {cards.length}
        </span>
        <Button variant="outline" onClick={next} disabled={idx === cards.length - 1}>
          Siguiente ➡️
        </Button>
      </div>
    </div>
  );
}
