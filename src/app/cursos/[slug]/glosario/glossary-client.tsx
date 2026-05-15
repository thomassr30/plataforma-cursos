"use client";

import { useState } from "react";
import type { GlossaryEntry } from "@/types/course";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { speak } from "@/lib/speak";

export function GlossaryClient({ entries }: { entries: GlossaryEntry[] }) {
  const [filter, setFilter] = useState("");
  const f = filter.toLowerCase().trim();
  const filtered = entries.filter(
    (e) =>
      e.en.toLowerCase().includes(f) || e.es.toLowerCase().includes(f) || e.cat.toLowerCase().includes(f),
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="🔍 Buscar palabra en español o inglés..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-md"
      />
      <p className="text-sm text-muted-foreground">{filtered.length} resultados</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((e, i) => (
          <div key={i} className="bg-card border-l-4 border-primary rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="font-bold text-primary">{e.en}</div>
              <Button variant="ghost" size="icon" onClick={() => speak(e.en)}>
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">{e.es}</div>
            <span className="inline-block mt-1 text-xs bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-200 px-2 py-0.5 rounded">
              {e.cat}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
