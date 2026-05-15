"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Book, BookMarked, BarChart3, GraduationCap, Mic, Repeat, RotateCcw, NotebookText, BookOpen,
  Flame, Star, Trophy, CheckCircle2, Circle, Menu, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  courseSlug: string;
  modules: { slug: string; number: number; title: string; icon: string; totalActivities: number }[];
  hasSpeak: boolean;
  hasStories: boolean;
  stats: { xp: number; level: number; streak: number; overallPct: number };
  moduleProgress: Record<string, number>; // moduleSlug → activitiesCompleted
}

export function CourseSidebar({ courseSlug, modules, hasSpeak, hasStories, stats, moduleProgress }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  const sidebarContent = (
    <>
      {/* Stats header */}
      <div className="bg-gradient-to-br from-primary to-purple-600 text-white rounded-xl p-4 mb-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-orange-200">
              <Flame className="w-4 h-4" />
            </div>
            <div className="text-lg font-bold">{stats.streak}</div>
            <div className="text-[10px] opacity-80">días</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-yellow-200">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="text-lg font-bold">{stats.xp}</div>
            <div className="text-[10px] opacity-80">XP</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-amber-200">
              <Star className="w-4 h-4" />
            </div>
            <div className="text-lg font-bold">{stats.level}</div>
            <div className="text-[10px] opacity-80">Nivel</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-[11px] mb-1 opacity-90">
            <span>Progreso del curso</span>
            <span className="font-semibold">{stats.overallPct}%</span>
          </div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white transition-all" style={{ width: `${stats.overallPct}%` }} />
          </div>
        </div>
      </div>

      <NavLink href={`/cursos/${courseSlug}`} icon={<Book className="w-4 h-4" />} label="Inicio del curso" active={pathname === `/cursos/${courseSlug}`} onNavigate={() => setMobileOpen(false)} />

      <p className="text-xs text-muted-foreground uppercase tracking-wider px-2 pt-3 pb-1">Módulos</p>
      {modules.map((m) => {
        const href = `/cursos/${courseSlug}/${m.slug}`;
        const done = moduleProgress[m.slug] ?? 0;
        const completed = m.totalActivities > 0 && done >= m.totalActivities;
        const partial = done > 0 && !completed;
        return (
          <Link
            key={m.slug}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors group",
              isActive(href) ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <span className="shrink-0 text-base">{m.icon}</span>
            <span className="truncate flex-1">{m.number}. {m.title}</span>
            {completed ? (
              <CheckCircle2 className={cn("w-4 h-4 shrink-0", isActive(href) ? "text-white" : "text-emerald-500")} />
            ) : partial ? (
              <span
                className={cn("shrink-0 text-[10px] font-bold rounded-full px-1.5 py-0.5", isActive(href) ? "bg-white/20" : "bg-amber-100 text-amber-700")}
                title={`${done}/${m.totalActivities} actividades`}
              >
                {done}/{m.totalActivities}
              </span>
            ) : (
              <Circle className={cn("w-4 h-4 shrink-0 opacity-30", isActive(href) ? "text-white" : "")} />
            )}
          </Link>
        );
      })}

      <p className="text-xs text-muted-foreground uppercase tracking-wider px-2 pt-3 pb-1">Recursos</p>
      <NavLink href={`/cursos/${courseSlug}/glosario`} icon={<BookMarked className="w-4 h-4" />} label="Glosario" active={isActive(`/cursos/${courseSlug}/glosario`)} onNavigate={() => setMobileOpen(false)} />
      <NavLink href={`/cursos/${courseSlug}/stats`} icon={<BarChart3 className="w-4 h-4" />} label="Mi progreso" active={isActive(`/cursos/${courseSlug}/stats`)} onNavigate={() => setMobileOpen(false)} />
      {hasSpeak && <NavLink href={`/cursos/${courseSlug}/speak`} icon={<Mic className="w-4 h-4" />} label="Pronunciación" active={isActive(`/cursos/${courseSlug}/speak`)} onNavigate={() => setMobileOpen(false)} />}
      <NavLink href={`/cursos/${courseSlug}/srs`} icon={<Repeat className="w-4 h-4" />} label="Repaso SRS" active={isActive(`/cursos/${courseSlug}/srs`)} onNavigate={() => setMobileOpen(false)} />
      <NavLink href={`/cursos/${courseSlug}/mistakes`} icon={<RotateCcw className="w-4 h-4" />} label="Mis errores" active={isActive(`/cursos/${courseSlug}/mistakes`)} onNavigate={() => setMobileOpen(false)} />
      <NavLink href={`/cursos/${courseSlug}/notes`} icon={<NotebookText className="w-4 h-4" />} label="Mis notas" active={isActive(`/cursos/${courseSlug}/notes`)} onNavigate={() => setMobileOpen(false)} />
      {hasStories && <NavLink href={`/cursos/${courseSlug}/stories`} icon={<BookOpen className="w-4 h-4" />} label="Cuentos" active={isActive(`/cursos/${courseSlug}/stories`)} onNavigate={() => setMobileOpen(false)} />}
      <NavLink href={`/cursos/${courseSlug}/final`} icon={<GraduationCap className="w-4 h-4" />} label="Examen final" active={isActive(`/cursos/${courseSlug}/final`)} onNavigate={() => setMobileOpen(false)} />
    </>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden flex items-center justify-between mb-3">
        <Button onClick={() => setMobileOpen(true)} variant="outline" size="sm">
          <Menu className="w-4 h-4" /> Menú del curso
        </Button>
        <div className="flex items-center gap-2 text-sm">
          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded font-medium flex items-center gap-1">
            <Flame className="w-3 h-3" /> {stats.streak}
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-medium flex items-center gap-1">
            <Trophy className="w-3 h-3" /> {stats.xp}
          </span>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block bg-card border rounded-xl p-3 space-y-1 sticky top-20 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <aside
            className="absolute left-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-card p-3 space-y-1 overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-2">
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

function NavLink({ href, icon, label, active, onNavigate }: { href: string; icon: React.ReactNode; label: string; active: boolean; onNavigate?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
        active ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </Link>
  );
}
