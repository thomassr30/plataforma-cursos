"use client";

import type { Block } from "@/types/course";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { speak } from "@/lib/speak";
import { FlashcardsGame } from "./games/flashcards";
import { QuizGame } from "./games/quiz";
import { FillBlanksGame } from "./games/fill-blanks";
import { DragSentenceGame } from "./games/drag-sentence";
import { MatchingGame } from "./games/matching";
import { WritingTask } from "./games/writing-task";

interface Props {
  blocks: Block[];
  onActivityComplete?: (key: string) => void;
  onQuizComplete?: (key: string, result: { correct: number; total: number; passed: boolean }) => void;
}

export function ModuleBlockRenderer({ blocks, onActivityComplete, onQuizComplete }: Props) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => (
        <BlockRender key={i} block={block} onActivityComplete={onActivityComplete} onQuizComplete={onQuizComplete} />
      ))}
    </div>
  );
}

function BlockRender({ block, onActivityComplete, onQuizComplete }: { block: Block; onActivityComplete?: (k: string) => void; onQuizComplete?: (k: string, r: { correct: number; total: number; passed: boolean }) => void }) {
  switch (block.kind) {
    case "info":
      return (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 rounded">
          <span dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    case "tip":
      return (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded">
          <span dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    case "successBox":
      return (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border-l-4 border-emerald-500 rounded">
          <span dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    case "h3":
      return <h3 className="text-xl font-bold text-primary mt-6">{block.text}</h3>;
    case "h4":
      return <h4 className="font-semibold text-lg mt-3">{block.text}</h4>;
    case "paragraph":
      return <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "list":
      return (
        <ul className="list-disc pl-6 space-y-1">
          {block.items.map((it, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: it }} />
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className="bg-primary text-primary-foreground px-3 py-2 text-left">{h}</th>
                ))}
                {block.speakColIndex !== undefined && (
                  <th className="bg-primary text-primary-foreground px-3 py-2 text-left">🔊</th>
                )}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="even:bg-muted/50 border-b">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2">
                      {typeof cell === "string" ? cell : <span dangerouslySetInnerHTML={{ __html: cell.html }} />}
                    </td>
                  ))}
                  {block.speakColIndex !== undefined && (
                    <td className="px-3 py-2">
                      <Button variant="ghost" size="sm" onClick={() => speak(String(row[block.speakColIndex!]))}>
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "vocab":
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {block.items.map((it, i) => (
            <div key={i} className="bg-card border rounded-lg p-3 flex items-center justify-between gap-2">
              <div>
                <div className="font-semibold text-primary">{it.word}</div>
                <div className="text-sm text-muted-foreground">{it.meaning}</div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => speak(it.word)}>
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      );
    case "conversation":
      return (
        <div className="bg-muted/60 rounded-xl p-4 space-y-3">
          {block.lines.map((l, i) => (
            <div key={i} className={`flex gap-3 ${l.side === "B" ? "flex-row-reverse" : ""}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${l.side === "A" ? "bg-primary" : "bg-amber-500"}`}>
                {l.side}
              </div>
              <div className="bg-card rounded-2xl px-4 py-2 shadow-sm max-w-[80%]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>{l.en}</span>
                  <Button variant="ghost" size="sm" onClick={() => speak(l.en)}>
                    <Volume2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="text-xs italic text-muted-foreground mt-1">{l.es}</div>
              </div>
            </div>
          ))}
        </div>
      );
    case "flashcards":
      return (
        <Card>
          <CardContent className="pt-6">
            <FlashcardsGame cards={block.cards} onComplete={() => onActivityComplete?.(block.key)} />
          </CardContent>
        </Card>
      );
    case "quiz":
      return (
        <Card>
          <CardContent className="pt-6">
            <QuizGame
              questions={block.questions}
              onComplete={(r) => {
                onActivityComplete?.(block.key);
                onQuizComplete?.(block.key, r);
              }}
            />
          </CardContent>
        </Card>
      );
    case "fillBlanks":
      return <FillBlanksGame items={block.items} onComplete={() => onActivityComplete?.(block.key)} />;
    case "drag":
      return <DragSentenceGame items={block.items} onComplete={() => onActivityComplete?.(block.key)} />;
    case "matching":
      return <MatchingGame pairs={block.pairs} onComplete={() => onActivityComplete?.(block.key)} />;
    case "writing":
      return (
        <WritingTask
          placeholder={block.placeholder}
          keywords={block.keywords}
          minWords={block.minWords}
          model={block.model}
          onComplete={() => onActivityComplete?.(block.key)}
        />
      );
  }
}
