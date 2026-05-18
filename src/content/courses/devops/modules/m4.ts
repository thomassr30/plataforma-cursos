import type { ModuleData } from "@/types/course";

// Modulo 4 - CI/CD con GitHub Actions desde cero.
export const m4: ModuleData = {
  slug: "m4",
  number: 4,
  title: "Modulo 4 - CI/CD con GitHub Actions desde Cero",
  icon: "C",
  intro:
    "CI/CD automatiza lo que separa a un equipo lento de uno rapido: probar, construir, empaquetar y desplegar el codigo. En este modulo arrancamos desde la teoria (que es Integracion Continua y que es Continuous Delivery vs Continuous Deployment), aprendemos la anatomia de un workflow de GitHub Actions, jobs, steps, runners, matrices, secrets, environments, artifacts, caching, reusable workflows, y deploy seguro a cloud via OIDC. Al final vas a poder armar pipelines reales que corren tests, construyen imagenes Docker y deployan a produccion.",
  totalActivities: 5,
  blocks: [
    { kind: "h3", text: "PARTE 1 - CI/CD: que significa cada letra" },
    {
      kind: "table",
      headers: ["Sigla", "Significado", "Que automatiza"],
      rows: [
        ["CI", "Continuous Integration", "Cada push corre lint + tests + build automaticamente"],
        ["CD", "Continuous Delivery", "Cada commit que pasa CI queda LISTO para deploy (boton humano)"],
        ["CD", "Continuous Deployment", "Cada commit que pasa CI se deploya AUTOMATICO a prod"],
      ],
    },
    {
      kind: "info",
      html:
        "<strong>Diferencia clave</strong>: Continuous Delivery requiere que un humano apriete 'deploy'. Continuous Deployment es 100% automatico. Ambos comparten la misma sigla CD; el contexto desambigua.",
    },
    { kind: "h4", text: "Por que es importante CI/CD" },
    {
      kind: "list",
      items: [
        "<strong>Feedback rapido</strong>: los bugs se detectan minutos despues del commit, no en QA semanas despues.",
        "<strong>Reduce el miedo a deployar</strong>: si tenes 100 tests y pasan, deployar es seguro.",
        "<strong>Ramas chicas, integradas seguido</strong>: evita 'merge hells' tipicos de ramas que viven meses.",
        "<strong>Reversiones rapidas</strong>: si rompiste prod, un rollback toma segundos.",
        "<strong>Auditoria</strong>: queda registro de TODO lo que se construyo y deployo.",
      ],
    },

    { kind: "h3", text: "PARTE 2 - Plataformas de CI/CD" },
    {
      kind: "table",
      headers: ["Plataforma", "Notas"],
      rows: [
        ["<strong>GitHub Actions</strong>", "Integrado a GitHub, gratis hasta 2000 min/mes en publicos. Lo usamos en este modulo."],
        ["GitLab CI", "Integrado a GitLab, .gitlab-ci.yml. Muy potente, autohospedable"],
        ["CircleCI", "SaaS veterano, configuracion YAML"],
        ["Bitbucket Pipelines", "Para repos de Bitbucket"],
        ["Jenkins", "El clasico open source autohospedable. Plugins infinitos pero configuracion compleja"],
        ["Buildkite / Drone / TeamCity / Azure DevOps", "Otras alternativas serias"],
        ["Tekton / Argo Workflows", "CI/CD nativo de Kubernetes, declarativo"],
      ],
    },

    { kind: "h3", text: "PARTE 3 - Anatomia de un workflow de GitHub Actions" },
    {
      kind: "paragraph",
      html:
        "Los workflows viven en <code>.github/workflows/*.yml</code>. Cada uno es disparado por <strong>eventos</strong> (push, PR, schedule, manual...), define <strong>jobs</strong> que corren en <strong>runners</strong>, y cada job tiene <strong>steps</strong>.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># .github/workflows/ci.yml\nname: CI\n\non:                                  # eventos que disparan el workflow\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n  workflow_dispatch:                 # boton manual\n\njobs:\n  test:\n    runs-on: ubuntu-latest          # runner\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: \"20\"\n          cache: \"npm\"\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test -- --coverage\n      - uses: actions/upload-artifact@v4\n        with:\n          name: coverage\n          path: coverage/</pre>",
    },
    {
      kind: "table",
      headers: ["Concepto", "Que es"],
      rows: [
        ["workflow", "Un archivo YAML completo en .github/workflows/"],
        ["event", "Lo que dispara el workflow (push, pull_request, schedule, workflow_dispatch...)"],
        ["job", "Un conjunto de steps que corren en el mismo runner; jobs corren en paralelo por default"],
        ["step", "Una accion individual dentro de un job (run o uses)"],
        ["runner", "La maquina que ejecuta el job (ubuntu-latest, windows-latest, macos-latest, self-hosted)"],
        ["action", "Bloque reutilizable (uses: owner/name@version). Hay miles publicas en GH Marketplace"],
        ["context", "Variables disponibles: github.*, env.*, secrets.*, vars.*, matrix.*, runner.*"],
      ],
    },

    { kind: "h3", text: "PARTE 4 - Eventos que disparan workflows" },
    {
      kind: "table",
      headers: ["Evento", "Cuando dispara"],
      rows: [
        ["push", "Al pushear a ciertas ramas/tags"],
        ["pull_request", "Al abrir/actualizar un PR (con filtros)"],
        ["pull_request_target", "Como pull_request pero con permisos del repo base (cuidado)"],
        ["schedule", "Cron (UTC). Ej: cada noche corre tests E2E"],
        ["workflow_dispatch", "Manual desde la UI o gh CLI, con inputs"],
        ["workflow_call", "Llamado por otro workflow (reusable workflows)"],
        ["release", "Al crear/editar/borrar un release"],
        ["issues / issue_comment", "Eventos de issues"],
        ["repository_dispatch", "Llamado por API externa"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>on:\n  push:\n    branches: [main, \"release/**\"]\n    paths-ignore: [\"docs/**\", \"*.md\"]\n    tags: [\"v*\"]\n  schedule:\n    - cron: \"0 3 * * *\"            # cada noche a las 3am UTC\n  workflow_dispatch:\n    inputs:\n      environment:\n        description: \"Entorno\"\n        required: true\n        default: \"staging\"\n        type: choice\n        options: [staging, production]</pre>",
    },

    { kind: "h3", text: "PARTE 5 - Matrices y paralelismo" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>jobs:\n  test:\n    runs-on: ${{ matrix.os }}\n    strategy:\n      fail-fast: false\n      matrix:\n        os: [ubuntu-latest, macos-latest, windows-latest]\n        node: [\"18\", \"20\", \"22\"]\n        exclude:\n          - os: windows-latest\n            node: \"18\"\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: ${{ matrix.node }} }\n      - run: npm ci && npm test</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>fail-fast: false</strong> hace que si una combinacion falla, las demas sigan corriendo. Util para ver TODOS los fallos a la vez.",
    },

    { kind: "h3", text: "PARTE 6 - Secrets y variables" },
    {
      kind: "table",
      headers: ["Tipo", "Como se crea", "Acceso desde workflow"],
      rows: [
        ["Repository secret", "Settings - Secrets and variables - Actions", "secrets.MI_TOKEN"],
        ["Environment secret", "Atado a un environment (prod, staging)", "secrets.MI_TOKEN (con environment: prod)"],
        ["Organization secret", "Compartido entre todos los repos de la org", "secrets.MI_TOKEN"],
        ["Repository variable (no sensible)", "Igual que secret pero NO se oculta en logs", "vars.MI_VAR"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>steps:\n  - name: Deploy\n    env:\n      DATABASE_URL: ${{ secrets.DATABASE_URL }}\n      LOG_LEVEL: ${{ vars.LOG_LEVEL }}\n    run: |\n      echo \"Deploying with level=$LOG_LEVEL\"\n      ./scripts/deploy.sh</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>Nunca</strong> imprimas secrets en logs. GitHub los oculta con *** pero si los procesas (base64, hash, slice), el resultado SI se ve.",
    },

    { kind: "h3", text: "PARTE 7 - Environments: gates para prod" },
    {
      kind: "paragraph",
      html:
        "Los <strong>environments</strong> de GitHub permiten requerir aprobacion manual, esperar un tiempo, o restringir branches que pueden deployar. Ideal para 'production': nadie deploya ahi sin aprobacion.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>jobs:\n  deploy-prod:\n    runs-on: ubuntu-latest\n    environment:\n      name: production\n      url: https://app.midominio.com\n    steps:\n      - uses: actions/checkout@v4\n      - run: ./deploy.sh</pre>",
    },

    { kind: "h3", text: "PARTE 8 - Artifacts y caching" },
    {
      kind: "table",
      headers: ["Mecanismo", "Para que sirve"],
      rows: [
        ["actions/upload-artifact", "Subir archivos del runner a GH (binarios, reportes, coverage). Disponible 90 dias"],
        ["actions/download-artifact", "Bajar un artifact en otro job/workflow"],
        ["actions/cache", "Cachear deps entre runs (node_modules, ~/.m2, target/, .next/cache)"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>- uses: actions/cache@v4\n  with:\n    path: |\n      ~/.npm\n      node_modules\n    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}\n    restore-keys: |\n      ${{ runner.os }}-node-</pre>",
    },

    { kind: "h3", text: "PARTE 9 - Build de imagen Docker en CI" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>jobs:\n  build:\n    runs-on: ubuntu-latest\n    permissions:\n      contents: read\n      packages: write\n    steps:\n      - uses: actions/checkout@v4\n      - uses: docker/setup-buildx-action@v3\n      - uses: docker/login-action@v3\n        with:\n          registry: ghcr.io\n          username: ${{ github.actor }}\n          password: ${{ secrets.GITHUB_TOKEN }}\n      - id: meta\n        uses: docker/metadata-action@v5\n        with:\n          images: ghcr.io/${{ github.repository }}\n          tags: |\n            type=sha,prefix=\n            type=ref,event=branch\n            type=semver,pattern={{version}}\n      - uses: docker/build-push-action@v5\n        with:\n          context: .\n          push: true\n          tags: ${{ steps.meta.outputs.tags }}\n          labels: ${{ steps.meta.outputs.labels }}\n          cache-from: type=gha\n          cache-to: type=gha,mode=max</pre>",
    },

    { kind: "h3", text: "PARTE 10 - Deploy seguro a AWS via OIDC (sin secretos largo plazo)" },
    {
      kind: "paragraph",
      html:
        "Antes: guardabas AWS access keys en secrets. Riesgo: si se filtran, comprometes la cuenta. Hoy: GitHub Actions se autentica con AWS via OIDC, recibe credenciales temporales (15 minutos), no hay que rotar nada.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>jobs:\n  deploy:\n    runs-on: ubuntu-latest\n    permissions:\n      id-token: write          # necesario para OIDC\n      contents: read\n    steps:\n      - uses: actions/checkout@v4\n      - uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: arn:aws:iam::123456789:role/github-deploy\n          aws-region: us-east-1\n      - run: aws s3 sync ./dist s3://mi-bucket --delete</pre>",
    },

    { kind: "h3", text: "PARTE 11 - Reusable workflows y composite actions" },
    {
      kind: "table",
      headers: ["Patron", "Cuando usarlo"],
      rows: [
        ["Composite action (action.yml)", "Encapsular varios steps en una accion local. Reutilizar en el mismo repo o publicar"],
        ["Reusable workflow (workflow_call)", "Compartir un workflow ENTERO entre repos de la org"],
        ["Matrix + strategy", "Multiplicar el mismo job con distintos inputs"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># .github/workflows/reusable-deploy.yml\non:\n  workflow_call:\n    inputs:\n      env: { required: true, type: string }\n    secrets:\n      AWS_ROLE: { required: true }\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps: [...]\n\n# uso desde otro workflow\njobs:\n  call:\n    uses: ./.github/workflows/reusable-deploy.yml\n    with: { env: production }\n    secrets:\n      AWS_ROLE: ${{ secrets.AWS_ROLE }}</pre>",
    },

    { kind: "h3", text: "PARTE 12 - Estrategias de deploy" },
    {
      kind: "table",
      headers: ["Estrategia", "Como funciona", "Cuando"],
      rows: [
        ["Recreate", "Mata todo y arranca nuevo", "Apps internas con downtime aceptable"],
        ["Rolling", "Reemplaza Pods/instancias de a poco", "Default; sin downtime"],
        ["Blue/Green", "Dos entornos idem; switch DNS/LB al nuevo cuando esta listo", "Rollback instantaneo"],
        ["Canary", "% del trafico al nuevo, observas metricas, vas subiendo", "Servicios criticos, alto trafico"],
        ["Feature flag", "Codigo ya deployado, prendido solo para % usuarios", "A/B testing, experimentos"],
      ],
    },

    { kind: "h3", text: "PARTE 13 - Mejores practicas de CI/CD" },
    {
      kind: "list",
      items: [
        "<strong>Pipeline rapido</strong>: meta-objetivo bajo 10 minutos. Si tarda mas, los devs dejan de mirarlo.",
        "<strong>Fail fast</strong>: pone lint y tests unitarios PRIMERO, e2e despues.",
        "<strong>1 artefacto, varios entornos</strong>: build una sola vez, deployalo a dev, staging, prod. NO buildees por entorno.",
        "<strong>Pin de versiones de actions</strong>: <code>actions/checkout@v4</code> o mejor con SHA pinneado para seguridad.",
        "<strong>concurrency</strong>: cancela runs viejos en la misma rama si hay uno nuevo.",
        "<strong>Solo lo necesario en permissions</strong>: por default <code>contents: read</code>, agrega writes solo en el job que los necesita.",
        "<strong>OIDC en lugar de keys</strong> para cloud.",
        "<strong>Status checks obligatorios</strong> en branch protection: no se mergea a main si CI no paso verde.",
        "<strong>Notificaciones</strong>: Slack/Discord al equipo si el deploy fallo.",
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>concurrency:\n  group: ${{ github.workflow }}-${{ github.ref }}\n  cancel-in-progress: true</pre>",
    },

    { kind: "h3", text: "PARTE 14 - Ponete a prueba" },
    {
      kind: "fillBlanks",
      key: "m4_fill",
      items: [
        { text: "Integracion Continua se abrevia ___.", answer: "CI", es: "CI" },
        { text: "La VARIANTE de CD que requiere aprobacion humana se llama Continuous ___.", answer: "Delivery", es: "Delivery" },
        { text: "Un workflow vive en .github/___/", answer: "workflows", es: "workflows" },
        { text: "La maquina donde corre un job se llama ___.", answer: "runner", es: "runner" },
        { text: "Para que un workflow se dispare por boton manual se usa workflow____.", answer: "dispatch", es: "dispatch" },
        { text: "Para autenticar a AWS sin credenciales fijas se usa ___.", answer: "OIDC", es: "OIDC" },
        { text: "La estrategia de deploy que mantiene 2 entornos paralelos y switchea trafico se llama ___/Green.", answer: "Blue", es: "Blue" },
        { text: "La estrategia donde % del trafico va a la nueva version gradualmente es ___.", answer: "Canary", es: "Canary" },
      ],
    },
    {
      kind: "matching",
      key: "m4_matching",
      pairs: [
        { en: "workflow", es: "Archivo YAML completo" },
        { en: "job", es: "Conjunto de steps en un runner" },
        { en: "step", es: "Una accion individual" },
        { en: "action", es: "Bloque reutilizable (uses)" },
        { en: "runner", es: "Maquina ejecutora" },
        { en: "secret", es: "Variable sensible (oculta en logs)" },
        { en: "environment", es: "Gate con aprobacion humana" },
        { en: "artifact", es: "Archivo producido por un workflow" },
        { en: "cache", es: "Acelerar runs reutilizando deps" },
        { en: "matrix", es: "Multiplicar job con distintos inputs" },
        { en: "OIDC", es: "Auth a cloud sin keys" },
        { en: "concurrency", es: "Cancela runs viejos en la misma rama" },
      ],
    },
    {
      kind: "quiz",
      key: "m4_quiz",
      questions: [
        {
          q: "Continuous Deployment se diferencia de Continuous Delivery en que...",
          options: [
            "Deployment requiere aprobacion humana; Delivery es automatico",
            "Deployment es automatico hasta prod; Delivery deja un boton manual",
            "Son lo mismo",
            "Delivery no usa CI",
          ],
          correct: 1,
        },
        {
          q: "Donde viven los workflows de GitHub Actions?",
          options: [
            ".github/workflows/*.yml",
            "/etc/github/actions",
            "raiz del repo (workflow.yml)",
            "Settings - Actions",
          ],
          correct: 0,
        },
        {
          q: "Cual de estos NO es un evento de Actions?",
          options: ["push", "pull_request", "git_commit", "schedule"],
          correct: 2,
        },
        {
          q: "Para autenticar a AWS sin guardar access keys se usa...",
          options: ["Personal Access Token", "OIDC", "Basic Auth", "API key estatica"],
          correct: 1,
        },
        {
          q: "Una matriz [linux,macos] x [node18,node20] genera...",
          options: ["1 job", "2 jobs", "4 jobs", "Depende del runner"],
          correct: 2,
        },
        {
          q: "Para que sirve actions/cache@v4?",
          options: [
            "Borra logs",
            "Cachea dependencias entre runs para acelerar",
            "Almacena imagenes",
            "Encripta secrets",
          ],
          correct: 1,
        },
        {
          q: "Que hace concurrency con cancel-in-progress: true?",
          options: [
            "Corre todo en paralelo siempre",
            "Cancela runs viejos del mismo grupo cuando llega uno nuevo",
            "Acelera el job",
            "No tiene efecto",
          ],
          correct: 1,
        },
        {
          q: "Una estrategia de deploy donde % del trafico va al nuevo:",
          options: ["Recreate", "Rolling", "Blue/Green", "Canary"],
          correct: 3,
        },
        {
          q: "Cual es buena practica?",
          options: [
            "Guardar AWS keys en repository secrets para siempre",
            "Build una vez, deployar el MISMO artefacto a stg y prod",
            "Imprimir secrets en logs para debug",
            "Disparar el workflow solo cada noche",
          ],
          correct: 1,
        },
        {
          q: "Como se pide aprobacion humana antes de deploy a prod?",
          options: [
            "Usando 'environment' con required reviewers",
            "Poniendo un sleep de 24h",
            "Comentando el job",
            "No se puede",
          ],
          correct: 0,
        },
        {
          q: "Que es un reusable workflow?",
          options: [
            "Un workflow que corre 2 veces",
            "Un workflow llamado desde otro via 'workflow_call'",
            "Un workflow sin steps",
            "Un workflow privado",
          ],
          correct: 1,
        },
        {
          q: "Para construir y pushear una imagen Docker en CI usas...",
          options: [
            "actions/setup-node",
            "docker/build-push-action + docker/login-action",
            "github/dockerize",
            "actions/upload-artifact",
          ],
          correct: 1,
        },
      ],
    },
  ],
};
