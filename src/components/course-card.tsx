"use client";

import Link from "next/link";
import { motion } from "motion/react";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="overflow-hidden flex flex-col h-full transition-shadow hover:shadow-lg">
        <div
          className="h-32 flex items-center justify-center text-6xl text-white relative overflow-hidden"
          style={{ background: gradient }}
        >
          <motion.span
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.15, rotate: 5 }}
          >
            {course.icon ?? "📚"}
          </motion.span>
          {course.category && course.category !== "General" && (
            <span className="absolute top-2 left-2 text-[10px] sm:text-xs font-semibold bg-white/20 backdrop-blur text-white px-2 py-1 rounded-full">
              {course.category_icon ? `${course.category_icon} ` : ""}
              {course.category}
            </span>
          )}
        </div>
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-base sm:text-xl">{course.title}</CardTitle>
            {course.level && (
              <span className="text-xs font-bold bg-accent text-accent-foreground px-2 py-1 rounded shrink-0">
                {course.level}
              </span>
            )}
          </div>
          <CardDescription className="line-clamp-2">{course.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
          <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
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
          <Button asChild className="w-full group">
            <Link href={`/cursos/${course.slug}`}>
              {isEnrolled ? "Continuar" : "Empezar curso"}{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
