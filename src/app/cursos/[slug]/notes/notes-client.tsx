"use client";

import { useState, useEffect, useRef } from "react";
import { saveNote } from "@/app/actions/progress";

export function NotesClient({ courseSlug, modules, initial }: { courseSlug: string; modules: { slug: string; label: string }[]; initial: Record<string, string> }) {
  const [scope, setScope] = useState("general");
  const [notes, setNotes] = useState(initial);
  const [status, setStatus] = useState("💾 Listo");
  const timer = useRef<NodeJS.Timeout | null>(null);

  function onChange(v: string) {
    setNotes((n) => ({ ...n, [scope]: v }));
    setStatus("✏️ Guardando...");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      await saveNote(courseSlug, scope, v);
      setStatus("✅ Guardado · " + new Date().toLocaleTimeString());
    }, 800);
  }

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <div className="space-y-3">
      <select value={scope} onChange={(e) => setScope(e.target.value)} className="w-full p-2 rounded-lg border-2 border-input bg-background">
        <option value="general">📌 Notas Generales</option>
        {modules.map((m) => <option key={m.slug} value={m.slug}>{m.label}</option>)}
      </select>
      <textarea
        value={notes[scope] ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={12}
        className="w-full p-3 rounded-lg border-2 border-input bg-background"
        placeholder="Escribe tus notas, dudas, ejemplos..."
      />
      <p className="text-xs text-muted-foreground">{status}</p>
    </div>
  );
}
