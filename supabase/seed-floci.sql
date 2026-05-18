-- =============================================
-- Ejecuta este SQL en Supabase para añadir el
-- curso de Floci · AWS Local con Docker.
-- =============================================

insert into public.courses (
  slug, title, description, level, language, total_modules,
  icon, color_from, color_to, category, category_slug, category_icon, category_order
)
values (
  'floci',
  'Floci · AWS Local con Docker',
  'Curso práctico para aprender AWS usando Floci, un emulador local open-source. 15 módulos con teoría AWS, laboratorios AWS CLI, ejemplos en Node.js y quizzes integrados. Complemento perfecto del Cloud Practitioner sin gastar dinero en AWS real. Cubre IAM, S3, DynamoDB, SQS, SNS, Lambda, API Gateway, RDS, KMS, CloudWatch y CloudFormation, más un proyecto integrador serverless completo.',
  'Foundational',
  'es',
  15,
  '☁️',
  '#06B6D4',
  '#1E40AF',
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
      category_order = excluded.category_order,
      is_active = true;
