-- =============================================
-- Añadir categorías a los cursos
-- Ejecuta este SQL en Supabase SQL Editor
-- =============================================

-- 1. Añadir columna category a courses
alter table public.courses
  add column if not exists category text default 'General' not null;

alter table public.courses
  add column if not exists category_slug text default 'general' not null;

alter table public.courses
  add column if not exists category_icon text;

alter table public.courses
  add column if not exists category_order int default 0;

create index if not exists idx_courses_category on public.courses(category_slug);

-- 2. Asignar categorías a los cursos existentes
update public.courses
  set category = 'Idiomas',
      category_slug = 'idiomas',
      category_icon = '🌍',
      category_order = 1
  where slug = 'ingles-a1';

update public.courses
  set category = 'DevOps',
      category_slug = 'devops',
      category_icon = '⚙️',
      category_order = 2
  where slug = 'devops';

update public.courses
  set category = 'Patrones de Diseño',
      category_slug = 'patrones',
      category_icon = '🏛️',
      category_order = 3
  where slug = 'ddd';
