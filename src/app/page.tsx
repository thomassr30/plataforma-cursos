import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="bg-primary text-primary-foreground w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl">
            <GraduationCap className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Cursos Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          Plataforma de cursos interactivos con seguimiento de progreso, gamificación y certificación.
          Aprende a tu ritmo, donde sea que estés.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild size="lg">
            <Link href="/auth/login">Iniciar sesión</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/auth/login">Crear cuenta</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4 pt-12">
          <FeatureCard icon="🎯" title="Aprende con propósito" desc="Cursos completos con módulos progresivos." />
          <FeatureCard icon="🏆" title="Gamificación" desc="XP, rachas, logros y certificados." />
          <FeatureCard icon="☁️" title="Online siempre" desc="Tu progreso sincronizado en la nube." />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
