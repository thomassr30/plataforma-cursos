"use client";

import { useState } from "react";
import type { SpeakPhrase } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Volume2 } from "lucide-react";
import { speak, levenshtein } from "@/lib/speak";

export function SpeakClient({ phrases }: { courseSlug: string; phrases: SpeakPhrase[] }) {
  const [idx, setIdx] = useState(0);
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState<null | { score: number; said: string; analysis: { w: string; ok: boolean }[]; extras: string[] }>(null);

  const phrase = phrases[idx];

  function record() {
    const SR: typeof window.SpeechRecognition | undefined =
      // @ts-expect-error vendor
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.");
      return;
    }
    const r = new SR();
    r.lang = "en-US";
    r.maxAlternatives = 3;
    setRecording(true);
    setResult(null);
    r.start();
    r.onresult = (ev: SpeechRecognitionEvent) => {
      const said = ev.results[0][0].transcript.toLowerCase().replace(/[.,!?]/g, "");
      compare(said);
    };
    r.onerror = () => { setRecording(false); };
    r.onend = () => setRecording(false);
  }

  function compare(said: string) {
    const target = phrase.en.toLowerCase().replace(/[.,!?]/g, "");
    const targetWords = target.split(/\s+/);
    const heardWords = said.split(/\s+/);
    const heardSet = new Set(heardWords);
    let okCount = 0;
    const analysis = targetWords.map((w) => {
      if (heardSet.has(w)) { okCount++; return { w, ok: true }; }
      const similar = heardWords.find((h) => h.length >= 3 && (h.includes(w) || w.includes(h) || levenshtein(h, w) <= 1));
      if (similar) { okCount += 0.7; return { w, ok: true }; }
      return { w, ok: false };
    });
    const extras = heardWords.filter((h) => !targetWords.includes(h));
    const score = Math.round((okCount / targetWords.length) * 100);
    setResult({ score, said, analysis, extras });
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="text-sm text-muted-foreground text-center">Frase {idx + 1} de {phrases.length}</div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">{phrase.en}</div>
          <div className="text-muted-foreground italic">{phrase.es}</div>
          <Button variant="ghost" size="sm" onClick={() => speak(phrase.en)} className="mt-2">
            <Volume2 className="w-4 h-4" /> Escuchar modelo
          </Button>
        </div>
        <div className="flex justify-center">
          <Button onClick={record} disabled={recording} size="lg" variant="destructive">
            <Mic className="w-5 h-5" /> {recording ? "🔴 Escuchando..." : "Grabar mi pronunciación"}
          </Button>
        </div>
        {result && (
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-center text-3xl font-bold mb-2" style={{ color: result.score >= 80 ? "#10b981" : result.score >= 50 ? "#f59e0b" : "#ef4444" }}>
              {result.score}%
            </div>
            <div className="text-sm mb-2"><strong>Escuché:</strong> "{result.said}"</div>
            <div className="flex flex-wrap gap-1 mb-2">
              {result.analysis.map((a, i) => (
                <span key={i} className={`px-2 py-1 rounded text-sm font-medium ${a.ok ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                  {a.w}
                </span>
              ))}
            </div>
            {result.extras.length > 0 && (
              <div className="text-xs text-muted-foreground">Extras: {result.extras.join(", ")}</div>
            )}
          </div>
        )}
        <div className="flex justify-between gap-2 pt-2">
          <Button variant="outline" disabled={idx === 0} onClick={() => { setIdx(idx - 1); setResult(null); }}>
            ⬅️ Anterior
          </Button>
          <Button variant="outline" disabled={idx === phrases.length - 1} onClick={() => { setIdx(idx + 1); setResult(null); }}>
            Siguiente ➡️
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
