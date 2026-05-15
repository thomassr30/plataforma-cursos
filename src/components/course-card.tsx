import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Star, BookOpen, ArrowRight } from "lucide-react";
import type { Database } from "@/types/database";

type Course = Database["public"]["Tables"]["courses"]["Row"];

interface Props {
  course: Course;
  isEnrolled: boolean;
  gamification: { xp: number; level: number; streak: number } | null;
}

export function CourseCard({ course, isEnrolled, gamification }: Props) {
  const gradient = `linear-gradient(135deg, ${course.color_from ?? "#2563eb"}, ${course.color_to ?? "#7c3aed"})`;
  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="h-32 flex items-center justify-center text-6xl text-white" style={{ background: gradient }}>
        {course.icon ?? "📚"}
      </div>
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl">{course.title}</CardTitle>
          {course.level && (
            <span className="text-xs font-bold bg-accent text-accent-foreground px-2 py-1 rounded">{course.level}</span>
          )}
        </div>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" /> {course.total_modules} módulos
          </span>
          {gamification && (
            <>
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-500" /> {gamification.streak}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" /> Nivel {gamification.level}
              </span>
            </>
          )}
        </div>
        <Button asChild className="w-full">
          <Link href={`/cursos/${course.slug}`}>
            {isEnrolled ? "Continuar" : "Empezar curso"} <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
