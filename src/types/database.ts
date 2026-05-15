// Tipos explícitos de Supabase (sin self-references para evitar `never` en build)

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
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
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
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          level?: string | null;
          language?: string;
          total_modules?: number;
          icon?: string | null;
          color_from?: string | null;
          color_to?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          level?: string | null;
          language?: string;
          total_modules?: number;
          icon?: string | null;
          color_from?: string | null;
          color_to?: string | null;
          is_active?: boolean;
        };
      };
      user_course_enrollments: {
        Row: {
          user_id: string;
          course_id: string;
          enrolled_at: string;
          last_visited_at: string | null;
        };
        Insert: {
          user_id: string;
          course_id: string;
          enrolled_at?: string;
          last_visited_at?: string | null;
        };
        Update: {
          user_id?: string;
          course_id?: string;
          enrolled_at?: string;
          last_visited_at?: string | null;
        };
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
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          module_slug: string;
          activity_key: string;
          completed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          module_slug?: string;
          activity_key?: string;
          completed_at?: string;
        };
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
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          module_slug: string;
          quiz_type: string;
          score: number;
          total: number;
          passed?: boolean;
          details?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          module_slug?: string;
          quiz_type?: string;
          score?: number;
          total?: number;
          passed?: boolean;
          details?: Json | null;
        };
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
        Insert: {
          user_id: string;
          course_id: string;
          xp?: number;
          level?: number;
          streak?: number;
          last_visit_date?: string | null;
          tests_passed?: number;
          perfect_tests?: number;
          voice_correct?: number;
          words_mastered?: number;
          final_passed?: boolean;
          achievements?: string[];
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          course_id?: string;
          xp?: number;
          level?: number;
          streak?: number;
          last_visit_date?: string | null;
          tests_passed?: number;
          perfect_tests?: number;
          voice_correct?: number;
          words_mastered?: number;
          final_passed?: boolean;
          achievements?: string[];
          updated_at?: string;
        };
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
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          word_key: string;
          interval_days?: number;
          due_date?: string;
          reps?: number;
          ease_factor?: number;
          mastered?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          word_key?: string;
          interval_days?: number;
          due_date?: string;
          reps?: number;
          ease_factor?: number;
          mastered?: boolean;
          updated_at?: string;
        };
      };
      user_notes: {
        Row: {
          user_id: string;
          course_id: string;
          scope: string;
          content: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          course_id: string;
          scope: string;
          content?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          course_id?: string;
          scope?: string;
          content?: string;
          updated_at?: string;
        };
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
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          question: string;
          options: Json;
          correct_idx: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          question?: string;
          options?: Json;
          correct_idx?: number;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
