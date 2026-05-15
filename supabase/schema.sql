-- =============================================
-- Cursos Platform - Schema completo Supabase
-- Ejecuta este SQL en Supabase SQL Editor
-- =============================================

-- Extensions
create extension if not exists "uuid-ossp";

-- =============================================
-- Tabla: profiles (extiende auth.users)
-- =============================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Profiles: own profile select" on public.profiles
  for select using (auth.uid() = id);
create policy "Profiles: own profile update" on public.profiles
  for update using (auth.uid() = id);
create policy "Profiles: own profile insert" on public.profiles
  for insert with check (auth.uid() = id);

-- Trigger: crear profile cuando se registra un usuario
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================
-- Tabla: courses (catalogo de cursos disponibles)
-- =============================================
create table if not exists public.courses (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  level text,
  language text default 'es',
  total_modules int default 0,
  icon text,
  color_from text,
  color_to text,
  is_active boolean default true,
  created_at timestamptz default now() not null
);

alter table public.courses enable row level security;
create policy "Courses: read for authenticated" on public.courses
  for select using (auth.role() = 'authenticated');

-- =============================================
-- Tabla: user_course_enrollments
-- =============================================
create table if not exists public.user_course_enrollments (
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  enrolled_at timestamptz default now() not null,
  last_visited_at timestamptz default now(),
  primary key (user_id, course_id)
);

alter table public.user_course_enrollments enable row level security;
create policy "Enrollments: own select" on public.user_course_enrollments
  for select using (auth.uid() = user_id);
create policy "Enrollments: own insert" on public.user_course_enrollments
  for insert with check (auth.uid() = user_id);
create policy "Enrollments: own update" on public.user_course_enrollments
  for update using (auth.uid() = user_id);
create policy "Enrollments: own delete" on public.user_course_enrollments
  for delete using (auth.uid() = user_id);

-- =============================================
-- Tabla: user_module_progress
-- =============================================
create table if not exists public.user_module_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  module_slug text not null,
  activity_key text not null,
  completed_at timestamptz default now(),
  unique (user_id, course_id, module_slug, activity_key)
);

create index if not exists idx_module_progress_user_course on public.user_module_progress(user_id, course_id);

alter table public.user_module_progress enable row level security;
create policy "Module progress: own select" on public.user_module_progress
  for select using (auth.uid() = user_id);
create policy "Module progress: own insert" on public.user_module_progress
  for insert with check (auth.uid() = user_id);
create policy "Module progress: own delete" on public.user_module_progress
  for delete using (auth.uid() = user_id);

-- =============================================
-- Tabla: user_quiz_attempts (registro de intentos)
-- =============================================
create table if not exists public.user_quiz_attempts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  module_slug text not null,
  quiz_type text not null,
  score int not null,
  total int not null,
  percentage int generated always as (case when total = 0 then 0 else (score * 100 / total) end) stored,
  passed boolean default false,
  details jsonb,
  created_at timestamptz default now() not null
);

create index if not exists idx_quiz_user_course on public.user_quiz_attempts(user_id, course_id);

alter table public.user_quiz_attempts enable row level security;
create policy "Quiz attempts: own select" on public.user_quiz_attempts
  for select using (auth.uid() = user_id);
create policy "Quiz attempts: own insert" on public.user_quiz_attempts
  for insert with check (auth.uid() = user_id);

-- =============================================
-- Tabla: user_gamification (XP, racha, achievements por curso)
-- =============================================
create table if not exists public.user_gamification (
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  xp int default 0 not null,
  level int default 1 not null,
  streak int default 0 not null,
  last_visit_date date,
  tests_passed int default 0,
  perfect_tests int default 0,
  voice_correct int default 0,
  words_mastered int default 0,
  final_passed boolean default false,
  achievements text[] default '{}',
  updated_at timestamptz default now(),
  primary key (user_id, course_id)
);

alter table public.user_gamification enable row level security;
create policy "Gamification: own select" on public.user_gamification
  for select using (auth.uid() = user_id);
create policy "Gamification: own upsert" on public.user_gamification
  for insert with check (auth.uid() = user_id);
create policy "Gamification: own update" on public.user_gamification
  for update using (auth.uid() = user_id);

-- =============================================
-- Tabla: user_srs (Spaced Repetition por palabra)
-- =============================================
create table if not exists public.user_srs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  word_key text not null,
  interval_days int default 0,
  due_date date default current_date,
  reps int default 0,
  ease_factor numeric(3,2) default 2.5,
  mastered boolean default false,
  updated_at timestamptz default now(),
  unique (user_id, course_id, word_key)
);

create index if not exists idx_srs_user_course_due on public.user_srs(user_id, course_id, due_date) where not mastered;

alter table public.user_srs enable row level security;
create policy "SRS: own select" on public.user_srs
  for select using (auth.uid() = user_id);
create policy "SRS: own upsert" on public.user_srs
  for insert with check (auth.uid() = user_id);
create policy "SRS: own update" on public.user_srs
  for update using (auth.uid() = user_id);

-- =============================================
-- Tabla: user_notes (notas por módulo)
-- =============================================
create table if not exists public.user_notes (
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  scope text not null,
  content text default '',
  updated_at timestamptz default now(),
  primary key (user_id, course_id, scope)
);

alter table public.user_notes enable row level security;
create policy "Notes: own select" on public.user_notes
  for select using (auth.uid() = user_id);
create policy "Notes: own upsert" on public.user_notes
  for insert with check (auth.uid() = user_id);
create policy "Notes: own update" on public.user_notes
  for update using (auth.uid() = user_id);

-- =============================================
-- Tabla: user_mistakes
-- =============================================
create table if not exists public.user_mistakes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  question text not null,
  options jsonb not null,
  correct_idx int not null,
  created_at timestamptz default now()
);

create index if not exists idx_mistakes_user_course on public.user_mistakes(user_id, course_id);

alter table public.user_mistakes enable row level security;
create policy "Mistakes: own select" on public.user_mistakes
  for select using (auth.uid() = user_id);
create policy "Mistakes: own insert" on public.user_mistakes
  for insert with check (auth.uid() = user_id);
create policy "Mistakes: own delete" on public.user_mistakes
  for delete using (auth.uid() = user_id);

-- =============================================
-- Seed: insertar curso de Inglés A1
-- =============================================
insert into public.courses (slug, title, description, level, language, total_modules, icon, color_from, color_to)
values
  ('ingles-a1', 'Inglés A1 — Certificación', 'Curso completo de inglés A1 con 19 módulos, juegos interactivos, reconocimiento de voz y certificación final.', 'A1', 'es', 19, '📘', '#2563eb', '#7c3aed')
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      total_modules = excluded.total_modules,
      icon = excluded.icon,
      color_from = excluded.color_from,
      color_to = excluded.color_to;
