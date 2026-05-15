import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseBySlug } from "@/content/courses";
import { ModuleClient } from "./module-client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string; moduleSlug: string }>;
}) {
  const { slug, moduleSlug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  const moduleData = course.modules.find((m) => m.slug === moduleSlug);
  if (!moduleData) notFound();

  const idx = course.modules.findIndex((m) => m.slug === moduleSlug);
  const prev = idx > 0 ? course.modules[idx - 1] : null;
  const next = idx < course.modules.length - 1 ? course.modules[idx + 1] : null;

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/cursos/${slug}`} className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver al curso
        </Link>
        <h1 className="text-3xl font-bold mt-2 flex items-center gap-3">
          <span>{moduleData.icon}</span>
          Módulo {moduleData.number}: {moduleData.title}
        </h1>
        <p className="text-muted-foreground mt-1">{moduleData.intro}</p>
      </div>

      <ModuleClient courseSlug={slug} moduleData={moduleData} />

      <div className="flex justify-between gap-2 flex-wrap pt-6 border-t">
        {prev ? (
          <Button asChild variant="outline">
            <Link href={`/cursos/${slug}/${prev.slug}`}>
              <ArrowLeft className="w-4 h-4" /> Módulo {prev.number}
            </Link>
          </Button>
        ) : (
          <div />
        )}
        {next && (
          <Button asChild>
            <Link href={`/cursos/${slug}/${next.slug}`}>
              Módulo {next.number} <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
