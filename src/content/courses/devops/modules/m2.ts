import type { ModuleData } from "@/types/course";

// Modulo 2 - Git y control de versiones desde cero.
export const m2: ModuleData = {
  slug: "m2",
  number: 2,
  title: "Modulo 2 - Git desde Cero hasta Avanzado",
  icon: "G",
  intro:
    "Git es el sistema de control de versiones distribuido mas usado del mundo y la base sobre la que se construye TODO lo demas en DevOps (CI/CD, GitOps, code review, releases). Si no dominas Git, todo lo demas se vuelve fragil. En este modulo arrancamos desde cero (que es un VCS, instalacion, configuracion) y llegamos hasta merge vs rebase, conflictos, undo seguro, GitFlow, PRs, y los comandos que se usan en empresa todos los dias.",
  totalActivities: 5,
  blocks: [
    { kind: "h3", text: "PARTE 1 - Que es un sistema de control de versiones" },
    {
      kind: "paragraph",
      html:
        "Un <strong>Version Control System (VCS)</strong> guarda la historia de cambios de un proyecto: quien cambio que, cuando y por que. Permite volver atras, comparar versiones, trabajar en paralelo sin pisarse, y combinar el trabajo de varias personas.",
    },
    {
      kind: "table",
      headers: ["Tipo", "Como funciona", "Ejemplos"],
      rows: [
        ["Local", "Toda la historia en tu maquina (en archivos)", "RCS, SCCS (años 70-80)"],
        ["Centralizado", "Servidor central guarda la historia, clientes piden checkout", "SVN, CVS, Perforce"],
        ["Distribuido (DVCS)", "Cada clon es una copia completa del repo (full mirror)", "<strong>Git</strong>, Mercurial"],
      ],
    },
    {
      kind: "info",
      html:
        "<strong>Git nacio en 2005</strong>. Linus Torvalds lo creo en 10 dias porque BitKeeper (el VCS que usaban para Linux kernel) dejo de ser gratis. Lo diseño para ser <em>rapido, distribuido, integro y para grandes proyectos</em>. Hoy lo usa el 95% de los proyectos open source y la inmensa mayoria de empresas.",
    },
    {
      kind: "tip",
      html:
        "<strong>Git != GitHub</strong>. Git es el programa local (CLI). GitHub/GitLab/Bitbucket son <em>plataformas</em> que hospedan repos remotos y agregan PRs, issues, CI/CD, etc. Podes usar Git sin GitHub perfectamente.",
    },

    { kind: "h3", text: "PARTE 2 - Instalacion y primera configuracion" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Linux\nsudo apt install git           # Debian/Ubuntu\nsudo dnf install git           # Fedora\n\n# macOS\nbrew install git\n\n# Windows\nwinget install Git.Git\n# o bajar de https://git-scm.com\n\ngit --version                  # debe responder con la version</pre>",
    },
    { kind: "h4", text: "Configurar tu identidad (una vez)" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>git config --global user.name \"Tu Nombre\"\ngit config --global user.email \"tu@email.com\"\ngit config --global init.defaultBranch main\ngit config --global pull.rebase false       # comportamiento por defecto del pull\ngit config --global core.editor \"code --wait\"\ngit config --list                            # ver toda la config</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>SSH vs HTTPS</strong>: para conectarte a GitHub/GitLab, usa SSH (mejor para uso diario). Generas la clave con <code>ssh-keygen -t ed25519 -C \"tu@email.com\"</code> y pegas el .pub en Settings &gt; SSH keys.",
    },

    { kind: "h3", text: "PARTE 3 - Los 3 estados (lo mas importante de Git)" },
    {
      kind: "paragraph",
      html:
        "Esto es el modelo mental clave. Cuando algo no funciona en Git, casi siempre es porque confundis donde estan los archivos.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>  WORKING DIRECTORY        STAGING AREA (INDEX)         REPOSITORY (.git/)\n   (tus archivos)            (lo que esta listo            (historia commiteada)\n        |                     para commitear)                     ^\n        |   git add archivo         |                             |\n        +-------------------------->|     git commit -m \"msg\"      |\n                                    +----------------------------->+\n\n     git restore archivo       git restore --staged       git reset --hard HEAD\n     (descarta cambios         (saca del staging,         (descarta TODO local\n      en working dir)           queda en working)          y vuelve al ultimo commit)</pre>",
    },
    {
      kind: "table",
      headers: ["Estado", "Que contiene", "Comando para inspeccionar"],
      rows: [
        ["Untracked", "Archivos nuevos que Git aun no sigue", "git status"],
        ["Modified", "Archivos seguidos con cambios sin stage", "git diff"],
        ["Staged", "Cambios listos para el proximo commit", "git diff --staged"],
        ["Committed", "Cambios guardados en la historia", "git log"],
      ],
    },

    { kind: "h3", text: "PARTE 4 - Comandos core (los que vas a usar todos los dias)" },
    {
      kind: "table",
      headers: ["Comando", "Que hace"],
      rows: [
        ["git init", "Crear un repo nuevo en la carpeta actual"],
        ["git clone &lt;url&gt;", "Clonar un repo remoto"],
        ["git status", "Ver que cambio (working / staged)"],
        ["git add &lt;archivo&gt;", "Agregar un archivo al staging"],
        ["git add .", "Agregar TODO lo modificado al staging"],
        ["git commit -m \"msg\"", "Commitear lo que esta en staging"],
        ["git commit -am \"msg\"", "Add + commit en un paso (solo archivos ya tracked)"],
        ["git log", "Ver historia"],
        ["git log --oneline --graph --all", "Historia compacta y visual"],
        ["git diff", "Ver cambios sin stage"],
        ["git diff --staged", "Ver cambios en staging"],
        ["git show &lt;commit&gt;", "Ver detalle de un commit"],
        ["git branch", "Listar ramas"],
        ["git branch &lt;nombre&gt;", "Crear rama"],
        ["git switch &lt;rama&gt;", "Cambiar de rama (moderno)"],
        ["git switch -c &lt;rama&gt;", "Crear y cambiar"],
        ["git checkout &lt;rama&gt;", "Cambiar de rama (clasico)"],
        ["git merge &lt;rama&gt;", "Fusionar rama en la actual"],
        ["git pull", "Traer cambios del remoto y mergear"],
        ["git push", "Subir commits al remoto"],
        ["git fetch", "Bajar refs del remoto sin mergear"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Flujo basico de un dia\ngit pull --rebase origin main\ngit switch -c feature/login\n# ... codeas ...\ngit add .\ngit status                          # revisa antes de commitear\ngit commit -m \"feat: add login form validation\"\ngit push -u origin feature/login    # primera vez con -u\n# en GitHub abris un Pull Request</pre>",
    },

    { kind: "h3", text: "PARTE 5 - Branches: trabajar en paralelo" },
    {
      kind: "paragraph",
      html:
        "Una <strong>rama</strong> es un puntero movil a un commit. Crear una rama es BARATO (no copia archivos). Usalas para todo: cada feature, cada fix, cada experimento.",
    },
    {
      kind: "table",
      headers: ["Tipo de rama", "Convencion", "Vida"],
      rows: [
        ["main / master", "Codigo estable, deployable", "Permanente"],
        ["develop", "Integracion antes de release (GitFlow)", "Permanente"],
        ["feature/*", "Nueva funcionalidad", "Corta (dias)"],
        ["fix/*", "Bug fix", "Corta"],
        ["hotfix/*", "Fix urgente de prod", "Corta"],
        ["release/*", "Preparar una version", "Corta"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>Conventional Commits</strong>: usa prefijos en mensajes - <code>feat:</code>, <code>fix:</code>, <code>chore:</code>, <code>docs:</code>, <code>refactor:</code>, <code>test:</code>. Permite changelogs automaticos y versionado semantico (semver).",
    },

    { kind: "h3", text: "PARTE 6 - Merge vs Rebase (el debate eterno)" },
    {
      kind: "paragraph",
      html:
        "Cuando integras cambios de una rama a otra hay dos estrategias:",
    },
    {
      kind: "table",
      headers: ["Estrategia", "Como funciona", "Pros", "Contras"],
      rows: [
        ["merge", "Crea un 'merge commit' que une las 2 historias", "Conserva el historial real", "Historia 'parece arbol' (mas ruido)"],
        ["rebase", "Reaplica tus commits SOBRE la otra rama, reescribiendo SHAs", "Historia lineal, limpia", "Reescribe historia (peligroso si compartiste)"],
        ["squash merge", "Combina todos los commits de la rama en uno solo al mergear", "Cada PR = 1 commit", "Perdes la historia interna del feature"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Merge clasico\ngit switch main\ngit merge feature/login\n\n# Rebase de tu feature contra main (limpiar tu historia antes de PR)\ngit switch feature/login\ngit rebase main\n# si hay conflictos: resolves, git add ., git rebase --continue\n\n# Rebase interactivo (squash de tus propios commits)\ngit rebase -i HEAD~5\n# en el editor: cambias 'pick' por 'squash' o 'fixup'</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>Regla de oro</strong>: NUNCA rebases ramas que ya compartiste publicamente. Rebase OK en tu propia rama feature antes del PR; merge para integrar al main.",
    },

    { kind: "h3", text: "PARTE 7 - Conflictos: como resolverlos sin perder horas" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>git merge feature/x\n# CONFLICT (content): Merge conflict in app.ts\n# Automatic merge failed; fix conflicts and then commit the result.\n\n# Git marca los conflictos asi en app.ts:\n# &lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD\n# tu version (main)\n# =======\n# version de la otra rama\n# &gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/x\n\n# Editas a mano o con tu editor (VSCode tiene UI). Luego:\ngit add app.ts\ngit commit               # crea el merge commit (mensaje pre-rellenado)\n\n# Si te arrepentis:\ngit merge --abort        # vuelve al estado pre-merge</pre>",
    },
    {
      kind: "list",
      items: [
        "Usa VSCode / IntelliJ / Sublime Merge - la UI grafica de conflictos ahorra MUCHO tiempo.",
        "<code>git rerere</code> graba como resolviste un conflicto y lo aplica automaticamente la proxima vez.",
        "Si el merge es enorme y caotico: <code>git merge --abort</code> y pensa otra estrategia (rebase, partir en commits chicos).",
      ],
    },

    { kind: "h3", text: "PARTE 8 - Deshacer cosas SIN romper todo" },
    {
      kind: "table",
      headers: ["Necesito...", "Comando", "Peligro"],
      rows: [
        ["Descartar cambios sin stage de UN archivo", "git restore archivo.ts", "Pierde cambios locales del archivo"],
        ["Descartar TODO lo que esta sin stage", "git restore .", "Peligroso, pierde todo lo del working"],
        ["Sacar del staging (mantener cambios)", "git restore --staged archivo.ts", "Seguro"],
        ["Cambiar mensaje del ultimo commit", "git commit --amend -m \"nuevo\"", "Si ya pusheaste, force-push"],
        ["Agregar mas cambios al ultimo commit", "git add . && git commit --amend --no-edit", "Igual que arriba"],
        ["Volver al estado del ultimo commit (HARD)", "git reset --hard HEAD", "PIERDE cambios no commiteados"],
        ["Revertir un commit ya pusheado (crear commit inverso)", "git revert &lt;sha&gt;", "Seguro, no reescribe historia"],
        ["Recuperar un commit 'perdido'", "git reflog && git reset --hard &lt;sha&gt;", "Seguro hasta los 90 dias de reflog"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>git reflog</strong> es tu paracaidas. Guarda TODO movimiento de HEAD aunque parezca borrado. Antes de aceptar que 'perdiste el trabajo', revisalo siempre.",
    },

    { kind: "h3", text: "PARTE 9 - Remotos y colaboracion" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>git remote -v                              # listar remotos\ngit remote add origin git@github.com:user/repo.git\ngit remote add upstream git@github.com:org/repo.git   # fork pattern\n\ngit fetch origin                            # baja refs sin mergear\ngit pull origin main                        # fetch + merge\ngit pull --rebase origin main               # fetch + rebase (preferible)\n\ngit push origin feature/login               # subir rama\ngit push --force-with-lease                 # force-push seguro (despues de rebase)</pre>",
    },
    { kind: "h4", text: "Workflow tipico: Fork + Pull Request" },
    {
      kind: "list",
      items: [
        "Forkeas el repo en GitHub",
        "Clonas tu fork: <code>git clone git@github.com:tu-user/repo.git</code>",
        "Agregas el upstream: <code>git remote add upstream git@github.com:org/repo.git</code>",
        "Creas una rama feature, codeas, commit, push",
        "Abris Pull Request en GitHub apuntando a la rama del upstream",
        "Otros revisan, comentan, pedis cambios, hacen merge",
        "Borras tu rama local: <code>git branch -d feature/login</code>",
      ],
    },

    { kind: "h3", text: "PARTE 10 - Modelos de branching" },
    {
      kind: "table",
      headers: ["Modelo", "Cuando usarlo"],
      rows: [
        ["<strong>Trunk-Based Development</strong>", "Ramas cortisimas (horas), todo va a main. CI muy estricto. Ideal para CD y equipos maduros."],
        ["<strong>GitHub Flow</strong>", "main siempre deployable. Cada feature en rama, PR a main. Bueno para web y SaaS."],
        ["<strong>GitFlow</strong>", "main + develop + release/* + hotfix/*. Bueno para software con releases versionadas y soporte de versiones viejas."],
        ["<strong>Release Flow</strong> (Microsoft)", "main + branches release/X.Y. Ideal para productos con varias versiones en mantenimiento."],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>Recomendacion 2025</strong>: para SaaS / web apps, usa <strong>Trunk-Based</strong> o <strong>GitHub Flow</strong>. GitFlow es excesivo para la mayoria de productos modernos.",
    },

    { kind: "h3", text: "PARTE 11 - Comandos avanzados que te salvan la vida" },
    {
      kind: "table",
      headers: ["Comando", "Para que sirve"],
      rows: [
        ["git stash", "Guardar cambios sin commit para hacer otra cosa"],
        ["git stash pop", "Recuperar el ultimo stash"],
        ["git stash list", "Ver todos los stashes"],
        ["git cherry-pick &lt;sha&gt;", "Traer un commit puntual de otra rama"],
        ["git bisect", "Busqueda binaria para encontrar el commit que rompio algo"],
        ["git blame archivo.ts", "Quien escribio cada linea"],
        ["git tag -a v1.2.0 -m \"release\"", "Marcar un commit como version"],
        ["git push --tags", "Subir tags al remoto"],
        ["git worktree add ../sister-dir feature/x", "Tener varias ramas en directorios paralelos"],
        ["git submodule add &lt;url&gt;", "Incrustar otro repo como dependencia"],
        ["git sparse-checkout", "Clonar solo parte de un monorepo grande"],
        ["git clean -fd", "Borrar untracked (CUIDADO)"],
      ],
    },

    { kind: "h3", text: "PARTE 12 - .gitignore y archivos que NO van" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># .gitignore tipico de Node\nnode_modules/\ndist/\n.env\n.env.local\n*.log\n.DS_Store\ncoverage/\n.idea/\n.vscode/\n*.tsbuildinfo</pre>",
    },
    {
      kind: "tip",
      html:
        "Si ya commiteaste algo que NO deberia estar en el repo (ej: .env con passwords), agregarlo al .gitignore NO lo borra del historial. Necesitas <code>git filter-repo</code> o BFG Repo-Cleaner. Y MEJOR aun: rota los secretos expuestos inmediatamente.",
    },

    { kind: "h3", text: "PARTE 13 - Probate" },
    {
      kind: "fillBlanks",
      key: "m2_fill",
      items: [
        { text: "Para crear un repo nuevo se usa git ___.", answer: "init", es: "init" },
        { text: "El area intermedia entre working y repository se llama ___.", answer: "staging", es: "staging" },
        { text: "Para integrar reescribiendo historia se usa ___.", answer: "rebase", es: "rebase" },
        { text: "Para crear un commit que deshace otro se usa git ___.", answer: "revert", es: "revert" },
        { text: "El comando que muestra TODOS los movimientos de HEAD es git ___.", answer: "reflog", es: "reflog" },
        { text: "Para guardar cambios temporalmente sin commit se usa git ___.", answer: "stash", es: "stash" },
        { text: "Para encontrar el commit que rompio algo via busqueda binaria: git ___.", answer: "bisect", es: "bisect" },
        { text: "El convencion de commit que usa prefijos feat:/fix:/chore: se llama ___ Commits.", answer: "Conventional", es: "Conventional" },
      ],
    },
    {
      kind: "matching",
      key: "m2_matching",
      pairs: [
        { en: "git init", es: "Crear repo nuevo" },
        { en: "git clone", es: "Copiar repo remoto" },
        { en: "git add", es: "Mover a staging" },
        { en: "git commit", es: "Guardar en historia" },
        { en: "git push", es: "Subir al remoto" },
        { en: "git pull", es: "Fetch + merge" },
        { en: "git fetch", es: "Bajar sin mergear" },
        { en: "git merge", es: "Crear merge commit" },
        { en: "git rebase", es: "Reaplicar commits sobre otra base" },
        { en: "git revert", es: "Crear commit inverso" },
        { en: "git reset --hard", es: "Descartar TODO local" },
        { en: "git stash", es: "Guardar cambios temporal" },
        { en: "git cherry-pick", es: "Traer commit puntual de otra rama" },
        { en: "git bisect", es: "Busqueda binaria de commit roto" },
      ],
    },
    {
      kind: "quiz",
      key: "m2_quiz",
      questions: [
        {
          q: "Que es Git?",
          options: [
            "Una plataforma web para hosting de codigo",
            "Un sistema de control de versiones distribuido",
            "Un editor de codigo",
            "Un lenguaje de programacion",
          ],
          correct: 1,
        },
        {
          q: "Diferencia clave entre Git y GitHub:",
          options: [
            "Son lo mismo",
            "Git es la herramienta local, GitHub es la plataforma web que aloja repos",
            "Git no permite remotos, GitHub si",
            "GitHub es opensource, Git no",
          ],
          correct: 1,
        },
        {
          q: "Como muevo un archivo modificado al staging area?",
          options: ["git commit", "git add", "git push", "git stash"],
          correct: 1,
        },
        {
          q: "Cual NO es uno de los 3 estados principales de Git?",
          options: ["Working directory", "Staging area", "Cloud sync", "Repository"],
          correct: 2,
        },
        {
          q: "Que hace 'git revert &lt;sha&gt;'?",
          options: [
            "Borra el commit del historial",
            "Crea un nuevo commit que deshace los cambios del commit indicado",
            "Reescribe la historia",
            "Crea una rama",
          ],
          correct: 1,
          explanation: "revert es seguro porque no reescribe historia; ideal para arreglar commits ya pusheados.",
        },
        {
          q: "Cuando NO conviene usar rebase?",
          options: [
            "En tu rama local antes de PR",
            "En tu rama feature antes de mergear",
            "En una rama ya compartida con otros developers",
            "Para limpiar commits chiquitos en uno",
          ],
          correct: 2,
          explanation: "Rebase reescribe SHAs; si otros ya bajaron esa rama, les vas a romper la historia.",
        },
        {
          q: "Para descartar cambios sin stage de un archivo:",
          options: ["git reset hard", "git restore archivo", "git rm archivo", "git delete archivo"],
          correct: 1,
        },
        {
          q: "git stash sirve para...",
          options: [
            "Borrar commits viejos",
            "Guardar cambios temporalmente sin commit, para volver despues",
            "Crear un fork del repo",
            "Generar un release",
          ],
          correct: 1,
        },
        {
          q: "git bisect te ayuda a...",
          options: [
            "Crear ramas mas chicas",
            "Encontrar el commit que introdujo un bug via busqueda binaria",
            "Mergear 2 ramas",
            "Resolver conflictos automaticamente",
          ],
          correct: 1,
        },
        {
          q: "Que es Conventional Commits?",
          options: [
            "Una herramienta de Git",
            "Una convencion de mensajes con prefijos como feat:, fix:, chore:",
            "Un GUI para Git",
            "Un sistema de tickets",
          ],
          correct: 1,
        },
        {
          q: "Para clonar un repo remoto se usa...",
          options: ["git pull", "git fork", "git clone", "git fetch"],
          correct: 2,
        },
        {
          q: "Para integrar 2 ramas creando un commit nuevo usas...",
          options: ["git rebase", "git merge", "git stash", "git cherry-pick"],
          correct: 1,
        },
      ],
    },
  ],
};
