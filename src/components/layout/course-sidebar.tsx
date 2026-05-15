"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Book, BookMarked, BarChart3, GraduationCap, Mic, Repeat, RotateCcw, NotebookText, BookOpen } from "lucide-react";

interface Props {
  courseSlug: string;
  modules: { slug: string; number: number; title: string; icon: string }[];
}

export function CourseSidebar({ courseSlug, modules }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <aside className="bg-card border rounded-xl p-3 space-y-1 sticky top-20 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto">
      <NavLink href={`/cursos/${courseSlug}`} icon={<Book className="w-4 h-4" />} label="Inicio del curso" active={pathname === `/cursos/${courseSlug}`} />
      <p className="text-xs text-muted-foreground uppercase tracking-wider px-2 pt-3 pb-1">Módulos</p>
      {modules.map((m) => {
        const href = `/cursos/${courseSlug}/${m.slug}`;
        return (
          <NavLink key={m.slug} href={href} icon={<span>{m.icon}</span>} label={`${m.number}. ${m.title}`} active={isActive(href)} />
        );
      })}
      <p className="text-xs text-muted-foreground uppercase tracking-wider px-2 pt-3 pb-1">Recursos</p>
      <NavLink href={`/cursos/${courseSlug}/glosario`} icon={<BookMarked className="w-4 h-4" />} label="Glosario" active={isActive(`/cursos/${courseSlug}/glosario`)} />
      <NavLink href={`/cursos/${courseSlug}/stats`} icon={<BarChart3 className="w-4 h-4" />} label="Mi progreso" active={isActive(`/cursos/${courseSlug}/stats`)} />
      <NavLink href={`/cursos/${courseSlug}/speak`} icon={<Mic className="w-4 h-4" />} label="Pronunciación" active={isActive(`/cursos/${courseSlug}/speak`)} />
      <NavLink href={`/cursos/${courseSlug}/srs`} icon={<Repeat className="w-4 h-4" />} label="Repaso SRS" active={isActive(`/cursos/${courseSlug}/srs`)} />
      <NavLink href={`/cursos/${courseSlug}/mistakes`} icon={<RotateCcw className="w-4 h-4" />} label="Mis errores" active={isActive(`/cursos/${courseSlug}/mistakes`)} />
      <NavLink href={`/cursos/${courseSlug}/notes`} icon={<NotebookText className="w-4 h-4" />} label="Mis notas" active={isActive(`/cursos/${courseSlug}/notes`)} />
      <NavLink href={`/cursos/${courseSlug}/stories`} icon={<BookOpen className="w-4 h-4" />} label="Cuentos" active={isActive(`/cursos/${courseSlug}/stories`)} />
      <NavLink href={`/cursos/${courseSlug}/final`} icon={<GraduationCap className="w-4 h-4" />} label="Examen final" active={isActive(`/cursos/${courseSlug}/final`)} />
    </aside>
  );
}

function NavLink({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link
      href={href}
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
