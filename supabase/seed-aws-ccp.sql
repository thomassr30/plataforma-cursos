-- =============================================
-- Ejecuta este SQL en Supabase para añadir el
-- curso de AWS Certified Cloud Practitioner (CLF-C02).
-- =============================================

insert into public.courses (
  slug, title, description, level, language, total_modules,
  icon, color_from, color_to, category, category_slug, category_icon, category_order
)
values (
  'aws-cloud-practitioner',
  'AWS Certified Cloud Practitioner (CLF-C02)',
  'Curso completo para aprobar la certificación oficial AWS Certified Cloud Practitioner CLF-C02. 10 módulos con definiciones formales, casos reales, comparaciones, examen final tipo certificación con 50 preguntas y explicaciones detalladas. Listo para 100% en la cert.',
  'Foundational',
  'es',
  10,
  '🟠',
  '#FF9900',
  '#232F3E',
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
