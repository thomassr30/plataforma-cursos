-- =============================================
-- Actualiza el curso DevOps a 11 módulos
-- (añadido el laboratorio práctico de Kubernetes).
-- =============================================

update public.courses
  set total_modules = 11,
      description = 'Curso de DevOps con laboratorio práctico real: Git, Docker, Kubernetes (incluye laboratorio con NestJS + PostgreSQL + MongoDB + MinIO en Windows), CI/CD, IaC, monitoreo, seguridad y cloud. 11 módulos.'
  where slug = 'devops';
