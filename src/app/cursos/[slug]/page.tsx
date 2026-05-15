import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/content/courses";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function CourseHomePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-5 sm:p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{course.title}</h1>
        <p className="opacity-90 max-w-2xl text-sm sm:text-base">
          Curso interactivo de nivel {course.level}. {course.modules.length} módulos, juegos, ejercicios,
          repetición espaciada, exámenes y certificado final.
        </p>
        <Button asChild className="mt-4 bg-white text-primary hover:bg-white/90">
          <Link href={`/cursos/${slug}/${course.modules[0].slug}`}>
            Empezar por el Módulo 1 <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold">Módulos del curso</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {course.modules.map((m) => (
          <Card key={m.slug} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">{m.icon}</div>
                <div>
                  <CardDescription className="text-xs">Módulo {m.number}</CardDescription>
                  <CardTitle className="text-base">{m.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{m.intro}</p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={`/cursos/${slug}/${m.slug}`}>
                  Abrir módulo <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
