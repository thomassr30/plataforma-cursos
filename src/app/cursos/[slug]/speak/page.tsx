import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/content/courses";
import { SpeakClient } from "./speak-client";

export default async function SpeakPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">🎤 Práctica de Pronunciación</h1>
      <p className="text-muted-foreground">Lee la frase, pulsa "Grabar" y di la frase en voz alta. Recibirás feedback palabra por palabra.</p>
      <SpeakClient courseSlug={slug} phrases={course.speakPhrases} />
    </div>
  );
}
