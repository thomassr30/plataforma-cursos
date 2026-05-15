-- =============================================
-- Ejecuta este SQL en Supabase para añadir el
-- curso de Google Cloud Digital Leader (2026).
-- =============================================

insert into public.courses (
  slug, title, description, level, language, total_modules,
  icon, color_from, color_to, category, category_slug, category_icon, category_order
)
values (
  'gcp-digital-leader',
  'Google Cloud Digital Leader (2026)',
  'Curso completo para aprobar la certificación oficial Google Cloud Digital Leader 2026. 10 módulos, juegos interactivos, examen final cronometrado con 50 preguntas estilo cert, explicaciones detalladas y certificado descargable.',
  'Fundamental',
  'es',
  10,
  '☁️',
  '#4285F4',
  '#34A853',
  'Cloud Certifications',
  'cloud',
  '☁️',
  4
)
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      level = excluded.level,
      total_modules = excluded.total_modules,
      icon = excluded.icon,
      color_from = excluded.color_from,
      color_to = excluded.color_to,
      category = excluded.category,
      category_slug = excluded.category_slug,
      category_icon = excluded.category_icon,
      category_order = excluded.category_order;
