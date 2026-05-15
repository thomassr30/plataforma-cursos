"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  placeholder: string;
  keywords: string[];
  minWords: number;
  model: string;
  onComplete?: () => void;
}

export function WritingTask({ placeholder, keywords, minWords, model, onComplete }: Props) {
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<null | { score: number; words: number; foundKws: string[]; issues: string[] }>(null);
  const [showModel, setShowModel] = useState(false);

  function check() {
    const lower = text.toLowerCase();
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const foundKws = keywords.filter((k) => lower.includes(k.toLowerCase()));
    const issues: string[] = [];
    if (text.trim() && text.trim()[0] !== text.trim()[0].toUpperCase()) issues.push("Empieza con mayúscula.");
    if (/\bi\b/.test(text)) issues.push("El pronombre 'I' va en mayúscula.");
    if (/\bi have \d+ years?\b/i.test(text)) issues.push("Edad: 'I am X years old' (no 'I have X years').");
    if (/\b(he|she|it) (have|don't)\b/i.test(text)) issues.push("Con he/she/it usa 'has' o 'doesn't'.");
    if (text.trim() && !/[.!?]$/.test(text.trim())) issues.push("Termina con punto, exclamación o interrogación.");
    const wordScore = words >= minWords ? 5 : Math.round((words / minWords) * 5);
    const kwScore = Math.min(5, foundKws.length);
    const grammarScore = Math.max(0, 5 - issues.length);
    const score = wordScore + kwScore + grammarScore;
    setFeedback({ score, words, foundKws, issues });
    if (score >= 10) onComplete?.();
  }

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg border-2 border-input bg-background text-sm resize-y focus:outline-none focus:border-primary"
      />
      <div className="flex gap-2 flex-wrap">
        <Button onClick={check} variant="success">
          ✅ Comprobar mi escritura
        </Button>
        <Button onClick={() => setShowModel(!showModel)} variant="outline">
          {showModel ? "Ocultar" : "📝 Ver modelo del profesor"}
        </Button>
      </div>
      {showModel && (
        <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
          <strong>Modelo:</strong>
          <p className="mt-2 whitespace-pre-line">{model}</p>
        </div>
      )}
      {feedback && (
        <div className={cn("p-4 rounded-lg space-y-2", feedback.score >= 10 ? "bg-success/10 border border-success" : "bg-amber-100 border border-amber-300")}>
          <strong>{feedback.score >= 10 ? "¡Buen trabajo! 🎉" : "Sigue practicando 💪"}</strong>
          <p className="text-sm">
            📏 Palabras: <strong>{feedback.words}</strong> / {minWords} mínimo
          </p>
          <p className="text-sm">
            ✅ Palabras clave: {feedback.foundKws.length}/{keywords.length} ({feedback.foundKws.join(", ") || "ninguna"})
          </p>
          <p className="text-sm">
            📊 Puntuación: <strong>{feedback.score}/15</strong>
          </p>
          {feedback.issues.length > 0 && (
            <div>
              <strong>🔍 Errores:</strong>
              <ul className="list-disc pl-6 text-sm">
                {feedback.issues.map((iss, i) => (
                  <li key={i}>{iss}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
