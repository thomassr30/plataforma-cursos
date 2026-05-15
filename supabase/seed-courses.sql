-- =============================================
-- Ejecuta este SQL en Supabase para añadir los
-- cursos nuevos (DevOps y DDD) al catálogo,
-- ya organizados por categoría.
-- =============================================

insert into public.courses (slug, title, description, level, language, total_modules, icon, color_from, color_to, category, category_slug, category_icon, category_order)
values
  ('devops', 'DevOps — Curso Completo', 'Curso de DevOps: Git, Docker, Kubernetes, CI/CD, IaC, monitoreo, seguridad y cloud. 10 módulos con juegos, quizzes y certificación.', 'Intermedio', 'es', 10, '🚀', '#10b981', '#0891b2', 'DevOps', 'devops', '⚙️', 2),
  ('ddd', 'Domain-Driven Design', 'Domain-Driven Design completo: Strategic + Tactical Design, Bounded Contexts, Aggregates, Hexagonal/Clean Architecture. 8 módulos con ejemplos prácticos.', 'Avanzado', 'es', 8, '🏛️', '#f59e0b', '#dc2626', 'Patrones de Diseño', 'patrones', '🏛️', 3)
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
