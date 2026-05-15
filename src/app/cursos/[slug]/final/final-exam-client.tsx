"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { QuizQuestion } from "@/types/course";
import { QuizGame } from "@/components/games/quiz";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Trophy, AlertTriangle } from "lucide-react";

interface Props {
  courseSlug: string;
  questions: QuizQuestion[];
  courseTitle: string;
  courseLevel: string;
}

export function FinalExamClient({ courseSlug, questions, courseTitle, courseLevel }: Props) {
  const [mode, setMode] = useState<"intro" | "practice" | "exam">("intro");
  const [result, setResult] = useState<{ score: number; total: number; passed: boolean } | null>(null);
  const [name, setName] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [examStartedAt, setExamStartedAt] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (mode === "exam" && timeLeft !== null && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    if (timeLeft === 0 && mode === "exam" && !result) {
      // Auto-submit when time expires
      alert("⏰ Tiempo agotado. Se enviará el examen automáticamente.");
      const btn = document.querySelector("[data-final-submit]") as HTMLButtonElement | null;
      btn?.click();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [mode, timeLeft, result]);

  function startPractice() {
    setMode("practice");
    setResult(null);
  }

  function startExam() {
    setMode("exam");
    setResult(null);
    setTimeLeft(90 * 60); // 90 minutos
    setExamStartedAt(Date.now());
  }

  function generateCertificate() {
    const canvas = document.createElement("canvas");
    canvas.width = 1400;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createLinearGradient(0, 0, 1400, 1000);
    grad.addColorStop(0, "#f0f9ff");
    grad.addColorStop(1, "#e0e7ff");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1400, 1000);
    ctx.strokeStyle = "#7c3aed";
    ctx.lineWidth = 16;
    ctx.strokeRect(30, 30, 1340, 940);
    ctx.fillStyle = "#7c3aed";
    ctx.font = "bold 64px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("CERTIFICATE", 700, 200);
    ctx.font = "italic 32px Georgia";
    ctx.fillStyle = "#1e293b";
    ctx.fillText(`of Achievement — ${courseTitle}`, 700, 250);
    ctx.font = "28px Georgia";
    ctx.fillStyle = "#475569";
    ctx.fillText("This certificate is proudly presented to", 700, 380);
    ctx.font = "bold 56px Georgia";
    ctx.fillStyle = "#1e293b";
    ctx.fillText(name || "Student", 700, 470);
    ctx.font = "24px Georgia";
    ctx.fillStyle = "#334155";
    ctx.fillText(`for completing the course with a score of`, 700, 600);
    ctx.font = "bold 72px Georgia";
    ctx.fillStyle = "#10b981";
    ctx.fillText(`${Math.round(((result?.score ?? 0) / (result?.total ?? 1)) * 100)}%`, 700, 700);
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    ctx.font = "22px Georgia";
    ctx.fillStyle = "#64748b";
    ctx.fillText("Date: " + today, 700, 830);
    ctx.font = "italic 20px Georgia";
    ctx.fillText(`Level ${courseLevel}`, 700, 880);
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `Certificado_${courseSlug}_${(name || "student").replace(/\s+/g, "_")}.png`;
    a.click();
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  if (mode === "intro") {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={startPractice}>
            <CardContent className="pt-6 space-y-3 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Trophy className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg">Modo Práctica</h3>
              <p className="text-sm text-muted-foreground">Sin límite de tiempo. Ves explicaciones detalladas tras comprobar.</p>
              <Button onClick={startPractice} className="w-full">Empezar práctica</Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-amber-300" onClick={startExam}>
            <CardContent className="pt-6 space-y-3 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg">Modo Examen Real</h3>
              <p className="text-sm text-muted-foreground">
                <strong>90 minutos</strong> cronometrados. Simula la experiencia oficial.
              </p>
              <Button onClick={startExam} className="w-full bg-amber-500 hover:bg-amber-600">⏱️ Empezar examen</Button>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded text-sm flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-600 shrink-0" />
          <span>
            El <strong>Modo Examen Real</strong> activa un cronómetro de 90 minutos. Se enviará automáticamente al expirar. Necesitas <strong>70%</strong> para aprobar.
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {mode === "exam" && timeLeft !== null && !result && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`sticky top-20 z-30 p-3 rounded-lg shadow-md font-mono text-lg font-bold text-center ${
              timeLeft < 300
                ? "bg-destructive text-destructive-foreground"
                : timeLeft < 900
                ? "bg-amber-500 text-white"
                : "bg-primary text-primary-foreground"
            }`}
          >
            <Clock className="w-5 h-5 inline mr-2" />
            Tiempo restante: {formatTime(timeLeft)}
          </motion.div>
        )}
      </AnimatePresence>

      <QuizGame
        questions={questions}
        onComplete={(r) => {
          setResult({ score: r.correct, total: r.total, passed: r.passed });
          if (timerRef.current) clearTimeout(timerRef.current);
        }}
      />

      <AnimatePresence>
        {result?.passed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <Card>
              <CardContent className="pt-6 text-center space-y-3">
                <div className="text-5xl">🎖️</div>
                <h3 className="text-xl font-bold">¡Aprobado!</h3>
                {mode === "exam" && examStartedAt && (
                  <p className="text-sm text-muted-foreground">
                    Tiempo empleado: {formatTime(Math.floor((Date.now() - examStartedAt) / 1000))}
                  </p>
                )}
                <p>Ingresa tu nombre y descarga tu certificado.</p>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="max-w-xs mx-auto"
                />
                <Button onClick={generateCertificate}>📥 Descargar certificado</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
