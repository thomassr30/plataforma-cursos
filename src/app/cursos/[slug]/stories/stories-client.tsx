"use client";

import type { Story } from "@/types/course";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { speak } from "@/lib/speak";
import { QuizGame } from "@/components/games/quiz";

export function StoriesClient({ stories }: { stories: Story[] }) {
  return (
    <div className="space-y-6">
      {stories.map((s, i) => {
        const fullText = s.text.map((t) => t.en).join(" ").replace(/\s+([.,!?])/g, "$1");
        return (
          <Card key={i}>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-primary">📖 {s.title}</h3>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">{s.level}</span>
              </div>
              <div className="leading-loose text-lg">
                {s.text.map((t, j) => (
                  <span key={j}>
                    {t.tr ? (
                      <span title={t.tr} className="border-b border-dashed border-primary cursor-help hover:bg-amber-100">
                        {t.en}
                      </span>
                    ) : (
                      t.en
                    )}{" "}
                  </span>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={() => speak(fullText)}>
                <Volume2 className="w-4 h-4" /> Escuchar la historia completa
              </Button>
              <h4 className="font-semibold mt-4">📝 Preguntas de comprensión:</h4>
              <QuizGame questions={s.questions} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
