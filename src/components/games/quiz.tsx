"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { QuizQuestion } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Lightbulb, ExternalLink } from "lucide-react";

interface Props {
  questions: QuizQuestion[];
  onComplete?: (result: { correct: number; total: number; passed: boolean; mistakes: QuizQuestion[] }) => void;
}

export function QuizGame({ questions, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null);

  function select(qi: number, oi: number) {
    if (checked) return;
    setAnswers((a) => ({ ...a, [qi]: oi }));
  }

  function check() {
    const unanswered = questions.filter((_, i) => answers[i] === undefined).length;
    if (unanswered > 0 && !confirm(`Tienes ${unanswered} pregunta(s) sin responder. ¿Comprobar igual?`)) return;
    let correct = 0;
    const mistakes: QuizQuestion[] = [];
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
      else mistakes.push(q);
    });
    setChecked(true);
    setResult({ correct, total: questions.length });
    const passed = correct / questions.length >= 0.7;
    onComplete?.({ correct, total: questions.length, passed, mistakes });
  }

  return (
    <div className="space-y-4">
      {questions.map((q, qi) => (
        <motion.div
          key={qi}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: qi * 0.04, duration: 0.25 }}
        >
          <Card>
            <CardContent className="pt-6 space-y-3">
              <div className="font-semibold">
                {qi + 1}. {q.q}
              </div>
              <div className="grid gap-2">
                {q.options.map((opt, oi) => {
                  const selected = answers[qi] === oi;
                  const isCorrect = checked && oi === q.correct;
                  const isWrong = checked && selected && oi !== q.correct;
                  return (
                    <button
                      key={oi}
                      onClick={() => select(qi, oi)}
                      disabled={checked}
                      className={cn(
                        "relative pl-12 pr-4 py-3 text-left rounded-lg border-2 transition",
                        "before:content-[''] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2",
                        "before:w-5 before:h-5 before:rounded-full before:border-2",
                        !checked && !selected && "border-input bg-card hover:bg-accent/50 before:border-muted-foreground",
                        !checked && selected && "border-primary bg-primary/10 font-semibold before:bg-primary before:border-primary before:shadow-[inset_0_0_0_4px_white]",
                        isCorrect && "border-success bg-success/10 text-success before:bg-success before:border-success before:content-['✓'] before:flex before:items-center before:justify-center before:text-white before:text-xs before:font-bold",
                        isWrong && "border-destructive bg-destructive/10 text-destructive before:bg-destructive before:border-destructive before:content-['✗'] before:flex before:items-center before:justify-center before:text-white before:text-xs before:font-bold",
                      )}
                    >
                      {opt}
                      {checked && selected && <span className="ml-2 text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">👈 Tu respuesta</span>}
                      {checked && !selected && isCorrect && <span className="ml-2 text-xs font-bold bg-success/20 text-success px-2 py-0.5 rounded">✓ Correcta</span>}
                    </button>
                  );
                })}
              </div>
              <AnimatePresence>
                {checked && q.explanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 rounded text-sm"
                  >
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                      <div className="flex-1">
                        <strong className="text-blue-700 dark:text-blue-300">Explicación:</strong>
                        <p className="mt-1">{q.explanation}</p>
                        {q.reference && (
                          <a
                            href={q.reference}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600 hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" /> Ver documentación oficial
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      {!checked && (
        <Button onClick={check} variant="success" size="lg" className="w-full">
          ✅ Comprobar respuestas
        </Button>
      )}
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
          className={cn(
            "p-6 rounded-xl text-white text-center shadow-lg",
            result.correct / result.total >= 0.7 ? "bg-gradient-to-r from-emerald-500 to-emerald-600" : "bg-gradient-to-r from-red-500 to-red-600",
          )}
        >
          <h3 className="text-xl font-bold">
            {result.correct / result.total >= 0.7 ? "¡Excelente trabajo! 🎉" : "Casi lo logras 💪"}
          </h3>
          <div className="text-4xl font-bold my-2">
            {result.correct}/{result.total}
          </div>
          <p>{Math.round((result.correct / result.total) * 100)}%</p>
        </motion.div>
      )}
    </div>
  );
}
