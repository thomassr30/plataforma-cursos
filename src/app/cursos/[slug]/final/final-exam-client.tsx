"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/types/course";
import { QuizGame } from "@/components/games/quiz";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FinalExamClient({ courseSlug, questions, courseTitle, courseLevel }: { courseSlug: string; questions: QuizQuestion[]; courseTitle: string; courseLevel: string }) {
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<{ score: number; total: number; passed: boolean } | null>(null);
  const [name, setName] = useState("");

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
    ctx.fillText(`CEFR Level ${courseLevel} — Common European Framework`, 700, 880);
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `Certificado_${courseSlug}_${(name || "student").replace(/\s+/g, "_")}.png`;
    a.click();
  }

  if (!started) {
    return <Button onClick={() => setStarted(true)} size="lg">🚀 Empezar el examen</Button>;
  }
  return (
    <div className="space-y-4">
      <QuizGame questions={questions} onComplete={(r) => setResult({ score: r.correct, total: r.total, passed: r.passed })} />
      {result?.passed && (
        <div className="bg-card border rounded-xl p-6 text-center space-y-3">
          <h3 className="text-xl font-bold">🎖️ ¡Aprobado!</h3>
          <p>Ingresa tu nombre y descarga tu certificado.</p>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre completo" className="max-w-xs mx-auto" />
          <Button onClick={generateCertificate}>📥 Descargar certificado</Button>
        </div>
      )}
    </div>
  );
}
