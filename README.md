# Cursos Platform — Plataforma de Cursos Interactivos

Plataforma multi-curso construida con **Next.js 15**, **Supabase**, **TanStack Query**, **Zustand**, **React Hook Form + Zod** y **shadcn/ui**.

## 🎯 Features

- 🔐 Autenticación con **Google OAuth** vía Supabase Auth
- 📚 Dashboard con múltiples cursos, cada uno con su propio espacio
- 🎮 Juegos interactivos: flashcards, quizzes, drag & drop, completar espacios, conectar palabras
- 🎤 Reconocimiento de voz para practicar pronunciación
- 🔁 Repetición espaciada (SRS) tipo Anki para vocabulario
- 🏆 Gamificación con XP, niveles, rachas diarias y logros
- 📊 Dashboard de progreso personal con métricas por módulo
- 📝 Bloc de notas personal por módulo
- 📖 Cuentos graduados con traducción al pasar el ratón
- 🔄 Lista de errores guardados para repasar
- 🎓 Examen final con certificado PNG descargable
- ☁️ Todo el progreso sincronizado en la nube — accede desde cualquier dispositivo

## 🏗️ Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router, Server Components) |
| Lenguaje | TypeScript |
| UI | shadcn/ui + Tailwind CSS |
| Auth + DB | Supabase (Postgres + Auth) |
| Estado servidor | TanStack Query v5 |
| Estado cliente | Zustand |
| Formularios | React Hook Form + Zod |
| Notificaciones | Sonner |
| Iconos | Lucide |
| Deploy | Vercel |

## 🚀 Setup local

### 1. Clona y prepara el repo

```bash
git clone <your-repo>
cd cursos-platform
pnpm install   # o npm install / yarn
```

### 2. Configura Supabase

1. Crea un proyecto en https://supabase.com
2. Ve a **SQL Editor** y ejecuta el contenido completo de `supabase/schema.sql`
3. Activa Google OAuth:
   - **Authentication → Providers → Google → Enable**
   - Configura **Client ID** y **Client Secret** desde Google Cloud Console
   - Añade la **Redirect URL** que Supabase te muestre a tu OAuth Client de Google
4. En **Authentication → URL Configuration**:
   - Site URL: `http://localhost:3000` (dev) / `https://tu-dominio.vercel.app` (prod)
   - Redirect URLs: añade ambas con `/auth/callback`

### 3. Variables de entorno

Copia `.env.example` → `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."  # solo en server
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Arranca

```bash
pnpm dev
```

Abre `http://localhost:3000`.

## 📂 Estructura

```
src/
├── app/
│   ├── auth/login          # Login con Google
│   ├── auth/callback       # Callback OAuth
│   ├── dashboard           # Lista de cursos
│   ├── cursos/[slug]       # Curso específico
│   │   ├── [moduleSlug]    # Módulo del curso
│   │   ├── glosario        # Glosario
│   │   ├── speak           # Pronunciación
│   │   ├── srs             # Repaso espaciado
│   │   ├── stats           # Estadísticas
│   │   ├── notes           # Notas
│   │   ├── stories         # Cuentos
│   │   ├── mistakes        # Repasar errores
│   │   └── final           # Examen final
│   └── actions             # Server Actions
├── components/
│   ├── games/              # Componentes de juegos
│   ├── ui/                 # shadcn/ui primitives
│   ├── layout/             # Header, sidebar
│   └── module-block-renderer.tsx
├── content/
│   └── courses/
│       └── ingles-a1/      # Datos del curso (modules, glossary, etc.)
├── hooks/                  # TanStack Query hooks
├── lib/
│   ├── supabase/           # Clientes Supabase
│   ├── speak.ts            # Web Speech API helpers
│   └── utils.ts
├── stores/                 # Zustand stores
└── types/                  # Tipos TypeScript
```

## 🗄️ Modelo de datos

| Tabla | Descripción |
|-------|-------------|
| `profiles` | Perfil del usuario (se crea automático tras OAuth) |
| `courses` | Catálogo de cursos disponibles |
| `user_course_enrollments` | Cursos en los que está inscrito el usuario |
| `user_module_progress` | Actividades completadas por módulo |
| `user_quiz_attempts` | Histórico de intentos de tests |
| `user_gamification` | XP, nivel, racha, logros por curso |
| `user_srs` | Datos de repetición espaciada por palabra |
| `user_notes` | Notas personales por módulo |
| `user_mistakes` | Errores guardados para repaso |

Todas las tablas tienen **Row Level Security (RLS)** activado: cada usuario solo ve sus propios datos.

## 🚢 Deploy a Vercel

1. Conecta tu repo en https://vercel.com
2. Añade las variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_APP_URL`)
3. Importante: en Supabase, añade tu URL de producción de Vercel a:
   - **Authentication → URL Configuration → Site URL**
   - **Authentication → URL Configuration → Redirect URLs** (con `/auth/callback`)
4. Deploy ✨

## ➕ Cómo añadir un curso nuevo

1. Crea una carpeta en `src/content/courses/<slug>/` con la misma estructura que `ingles-a1`:
   - `index.ts` — el `CourseDefinition`
   - `modules.ts` + `modules/m1.ts...` — los módulos
   - `glossary.ts`, `stories.ts`, `final-exam.ts`, `speak-phrases.ts`, `achievements.ts`
2. Añádelo al map de `src/content/courses/index.ts`
3. Inserta el curso en la tabla `courses` de Supabase (SQL Editor):

```sql
insert into public.courses (slug, title, description, level, total_modules, icon, color_from, color_to)
values ('mi-curso', 'Mi Curso', 'Descripción...', 'A1', 10, '📚', '#2563eb', '#7c3aed');
```

¡Listo! Aparecerá en el dashboard de los usuarios.

## 📦 Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor dev con Turbopack |
| `pnpm build` | Build de producción |
| `pnpm start` | Servidor producción |
| `pnpm lint` | Linter |
| `pnpm type-check` | Verifica tipos TS |

## 🔧 Pendiente / próximos pasos

- [ ] Tests E2E con Playwright
- [ ] Modo claro/oscuro toggle
- [ ] Internacionalización (i18n)
- [ ] Más cursos (DevOps, Inglés A2, etc.)
- [ ] Notificaciones email para rachas perdidas
- [ ] Sistema de comentarios/preguntas por módulo
