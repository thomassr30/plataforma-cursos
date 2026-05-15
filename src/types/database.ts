// Tipos de la base de datos Supabase
// Si quieres regenerarlos automáticamente: npx supabase gen types typescript --project-id=<id> > database.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          is_active?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      courses: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          level: string | null;
          language: string;
          total_modules: number;
          icon: string | null;
          color_from: string | null;
          color_to: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["courses"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["courses"]["Insert"]>;
      };
      user_course_enrollments: {
        Row: {
          user_id: string;
          course_id: string;
          enrolled_at: string;
          last_visited_at: string | null;
        };
        Insert: { user_id: string; course_id: string; enrolled_at?: string; last_visited_at?: string };
        Update: Partial<Database["public"]["Tables"]["user_course_enrollments"]["Insert"]>;
      };
      user_module_progress: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          module_slug: string;
          activity_key: string;
          completed_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["user_module_progress"]["Row"], "id" | "completed_at"> & {
          id?: string;
          completed_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["user_module_progress"]["Insert"]>;
      };
      user_quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          module_slug: string;
          quiz_type: string;
          score: number;
          total: number;
          percentage: number;
          passed: boolean;
          details: Json | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["user_quiz_attempts"]["Row"], "id" | "percentage" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["user_quiz_attempts"]["Insert"]>;
      };
      user_gamification: {
        Row: {
          user_id: string;
          course_id: string;
          xp: number;
          level: number;
          streak: number;
          last_visit_date: string | null;
          tests_passed: number;
          perfect_tests: number;
          voice_correct: number;
          words_mastered: number;
          final_passed: boolean;
          achievements: string[];
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["user_gamification"]["Row"], "updated_at"> & { updated_at?: string };
        Update: Partial<Database["public"]["Tables"]["user_gamification"]["Insert"]>;
      };
      user_srs: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          word_key: string;
          interval_days: number;
          due_date: string;
          reps: number;
          ease_factor: number;
          mastered: boolean;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["user_srs"]["Row"], "id" | "updated_at"> & {
          id?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["user_srs"]["Insert"]>;
      };
      user_notes: {
        Row: {
          user_id: string;
          course_id: string;
          scope: string;
          content: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["user_notes"]["Row"], "updated_at"> & { updated_at?: string };
        Update: Partial<Database["public"]["Tables"]["user_notes"]["Insert"]>;
      };
      user_mistakes: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          question: string;
          options: Json;
          correct_idx: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["user_mistakes"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["user_mistakes"]["Insert"]>;
      };
    };
  };
}
