import type { Achievement } from "@/types/course";

export const achievements: Achievement[] = [
  { id: "first_quiz", icon: "🎯", name: "Primer Test", desc: "Aprueba tu primer test", threshold: { type: "tests", value: 1 } },
  { id: "perfect_quiz", icon: "💯", name: "Perfecto", desc: "Obtén 100% en un test", threshold: { type: "perfect", value: 1 } },
  { id: "streak_3", icon: "🔥", name: "En racha", desc: "3 días seguidos", threshold: { type: "streak", value: 3 } },
  { id: "streak_7", icon: "🌟", name: "Semana brillante", desc: "7 días seguidos", threshold: { type: "streak", value: 7 } },
  { id: "streak_30", icon: "👑", name: "Mes constante", desc: "30 días seguidos", threshold: { type: "streak", value: 30 } },
  { id: "xp_100", icon: "⭐", name: "Nivel 2", desc: "Llega a 100 XP", threshold: { type: "xp", value: 100 } },
  { id: "xp_500", icon: "🚀", name: "Nivel 6", desc: "Llega a 500 XP", threshold: { type: "xp", value: 500 } },
  { id: "xp_1000", icon: "🏆", name: "Mil XP", desc: "Llega a 1000 XP", threshold: { type: "xp", value: 1000 } },
  { id: "modules_5", icon: "📚", name: "Estudiante", desc: "5 módulos completos", threshold: { type: "modules", value: 5 } },
  { id: "modules_10", icon: "🎓", name: "Avanzado", desc: "10 módulos completos", threshold: { type: "modules", value: 10 } },
  { id: "modules_all", icon: "🏅", name: "Completista", desc: "19 módulos completos", threshold: { type: "modules", value: 19 } },
  { id: "voice_master", icon: "🎤", name: "Pronunciación", desc: "10 frases pronunciadas bien", threshold: { type: "voice", value: 10 } },
  { id: "srs_50", icon: "🧠", name: "Memoria", desc: "50 palabras dominadas", threshold: { type: "words", value: 50 } },
  { id: "final_passed", icon: "🎖️", name: "Certificado A1", desc: "Aprueba el examen final", threshold: { type: "final", value: 1 } },
];
