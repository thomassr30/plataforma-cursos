import type { ModuleData } from "@/types/course";

// Modulo 1 - Introduccion a DevOps desde cero.
export const m1: ModuleData = {
  slug: "m1",
  number: 1,
  title: "Modulo 1 - Introduccion a DevOps desde Cero",
  icon: "D",
  intro:
    "DevOps NO es una herramienta ni un cargo: es una cultura, un conjunto de practicas y un modelo de organizacion que une desarrollo (Dev) y operaciones (Ops) para entregar software mas rapido, con mejor calidad y mas estabilidad. En este modulo vamos desde el origen del termino (de donde sale, que problema resolvio), pasamos por los principios CALMS, el ciclo de vida, las metricas DORA que miden si lo estas haciendo bien, los antipatrones tipicos, los roles que existen, y el mapa completo de herramientas que vas a ver en los proximos modulos.",
  totalActivities: 5,
  blocks: [
    { kind: "h3", text: "PARTE 1 - Por que existe DevOps?" },
    {
      kind: "paragraph",
      html:
        "Antes de DevOps, el mundo se dividia en dos tribus enfrentadas. Los <strong>developers</strong> escribian codigo y queria entregar features rapido. Los de <strong>operaciones</strong> mantenian la infraestructura y querian estabilidad. El problema: lo que para Dev era 'terminado' (en mi maquina anda), para Ops era 'apenas empieza' (hay que desplegarlo, monitorearlo, recuperarlo si cae, escalarlo). Resultado: lanzamientos cada 6 meses, fines de semana de pesadilla, dedos apuntando entre equipos, miedo a desplegar.",
    },
    {
      kind: "info",
      html:
        "<strong>2008-2009 - El nacimiento</strong>: Patrick Debois (consultor belga) y Andrew Shafer (Reductive Labs / Puppet) acuñaron el termino <em>devops</em> en conferencias. En 2009, John Allspaw y Paul Hammond dieron la charla legendaria '10+ Deploys per Day at Flickr', mostrando que se podia desplegar muchas veces al dia SIN romper nada. Ese fue el punto de quiebre.",
    },
    {
      kind: "table",
      headers: ["Era", "Cadencia tipica de deploy", "Quien rompia las cosas", "Quien arreglaba"],
      rows: [
        ["Pre-DevOps (waterfall)", "Cada 3-6 meses", "Dev (lo decia Ops)", "Ops (peleando con Dev)"],
        ["DevOps temprano (2010-15)", "Diario / semanal", "Equipo completo", "Equipo completo"],
        ["DevOps moderno (hoy)", "Decenas/cientos por dia", "Es esperable, se compensa", "Automatizacion + on-call rotativo"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>El libro fundacional</strong>: <em>The Phoenix Project</em> (Gene Kim, 2013) es una novela donde un IT manager rescata a una empresa aplicando principios DevOps. Si lo lees una sola vez en tu vida, entendes el 'por que' mejor que con 10 cursos.",
    },

    { kind: "h3", text: "PARTE 2 - Que NO es DevOps (mitos comunes)" },
    {
      kind: "list",
      items: [
        "<strong>NO es 'un dev que tambien hace ops'</strong>. Eso es un fullstack desgraciado. DevOps es colaboracion, no doble carga.",
        "<strong>NO es solo herramientas</strong>. Comprarte Jenkins y Kubernetes no te hace DevOps si la cultura no cambia.",
        "<strong>NO es un cargo aislado</strong>. 'Soy el DevOps del equipo' es un anti-patron: vuelve a crear silos.",
        "<strong>NO es SRE</strong>. Site Reliability Engineering (Google) es una implementacion concreta y mas rigurosa de DevOps. Son primos, no gemelos.",
        "<strong>NO termina cuando se hace deploy</strong>. Observabilidad, alertas, feedback de produccion son parte del ciclo.",
        "<strong>NO es solo para startups</strong>. Bancos, gobierno, telcos: hoy todos hacen DevOps (a su ritmo).",
      ],
    },

    { kind: "h3", text: "PARTE 3 - Los 5 pilares CALMS (en serio)" },
    {
      kind: "paragraph",
      html:
        "CALMS es el acronimo que define los pilares de DevOps. La mayoria de cursos lo mencionan en una linea; aca vamos campo por campo.",
    },
    { kind: "h4", text: "C - Culture (la mas dificil)" },
    {
      kind: "paragraph",
      html:
        "Es el pilar mas importante y el unico que no podes comprar. Significa: <strong>blameless post-mortems</strong> (cuando algo falla, se busca la causa sistemica, no culpables), confianza entre equipos, ownership compartido del software 'desde el commit hasta el log de prod', psicological safety para reportar problemas sin miedo.",
    },
    { kind: "h4", text: "A - Automation (la palanca)" },
    {
      kind: "paragraph",
      html:
        "Automatizar TODO lo repetitivo: tests, builds, deploys, provisioning de infra, rotacion de secretos, reportes. La regla: si un humano lo hace mas de 3 veces, automatizalo. Esto NO es lujo: cuando desplegas 50 veces al dia, hacerlo a mano es imposible.",
    },
    { kind: "h4", text: "L - Lean (sacar el desperdicio)" },
    {
      kind: "paragraph",
      html:
        "Filosofia tomada del Toyota Production System. Reducir lotes (mas commits chicos en vez de uno gigante), eliminar handoffs largos entre equipos, limitar el trabajo en progreso (WIP), entregar valor frecuentemente. Lead time chico = ciclos de feedback chicos = aprendizaje rapido.",
    },
    { kind: "h4", text: "M - Measurement (sin medir no hay mejora)" },
    {
      kind: "paragraph",
      html:
        "Si no medis, no podes mejorar. Las 4 metricas DORA (proxima parte) son el estandar de oro. Tambien: tiempo de build, % de tests rotos, MTTR, costo por deploy, NPS interno del equipo.",
    },
    { kind: "h4", text: "S - Sharing (compartir es romper silos)" },
    {
      kind: "paragraph",
      html:
        "Documentar runbooks, post-mortems abiertos, dashboards visibles, on-call rotativo, internal tech talks. Cuando una persona se va de vacaciones nada se rompe porque el conocimiento esta distribuido.",
    },
    {
      kind: "table",
      headers: ["Letra", "Pilar", "Indicador concreto de salud"],
      rows: [
        ["C", "Culture", "Hay post-mortems escritos en los ultimos 3 meses? Son blameless?"],
        ["A", "Automation", "% de deploys hechos por humano vs pipeline?"],
        ["L", "Lean", "Tamaño promedio de PR (lineas)? Tiempo desde commit a prod?"],
        ["M", "Measurement", "Tenes dashboard publico con las 4 metricas DORA?"],
        ["S", "Sharing", "Existe documentacion / runbooks accesibles a todo el equipo?"],
      ],
    },

    { kind: "h3", text: "PARTE 4 - Las 4 metricas DORA (la regla)" },
    {
      kind: "paragraph",
      html:
        "El equipo <strong>DORA</strong> (DevOps Research and Assessment, Google) lleva mas de una decada estudiando que separa a los equipos de elite de los demas. Identificaron 4 metricas con correlacion fuerte con performance del negocio:",
    },
    {
      kind: "table",
      headers: ["Metrica", "Que mide", "Elite", "Alto", "Medio", "Bajo"],
      rows: [
        ["Deployment Frequency", "Frecuencia de deploy a prod", "On-demand (multiples por dia)", "Diario - semanal", "Semanal - mensual", "Mensual - 6 meses"],
        ["Lead Time for Changes", "Tiempo desde commit a prod", "< 1 hora", "1 dia - 1 semana", "1 semana - 1 mes", "1 - 6 meses"],
        ["Change Failure Rate", "% de deploys que rompen prod", "0-15%", "16-30%", "16-30%", "16-30%"],
        ["MTTR / Time to Restore", "Tiempo en restaurar servicio", "< 1 hora", "< 1 dia", "1 dia - 1 semana", "1 semana - 1 mes"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>Insight clave del reporte DORA</strong>: los equipos de elite NO sacrifican estabilidad por velocidad. Tienen <em>las dos cosas</em>. Y la palanca para conseguirlo es la automatizacion + cultura, no 'mas testing manual'.",
    },

    { kind: "h3", text: "PARTE 5 - El ciclo de vida (el infinito)" },
    {
      kind: "paragraph",
      html:
        "El simbolo clasico de DevOps es un infinito (∞) porque NO es un proceso lineal: es un loop continuo. Cada fase alimenta a la siguiente y todo el sistema mejora con cada vuelta.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>    PLAN -> CODE -> BUILD -> TEST -> RELEASE -> DEPLOY -> OPERATE -> MONITOR\n     ^                                                                |\n     |________________________________________________________________|\n                     (feedback continuo)</pre>",
    },
    {
      kind: "table",
      headers: ["Fase", "Que pasa aqui", "Herramientas tipicas"],
      rows: [
        ["Plan", "Definir requerimientos, dividir en tareas, priorizar backlog", "Jira, Linear, GitHub Projects, Asana"],
        ["Code", "Escribir codigo, commits, code review, branching", "Git, VSCode, GitHub/GitLab/Bitbucket"],
        ["Build", "Compilar, construir artefactos (binarios, imagenes Docker)", "Maven, npm, Docker, Gradle, esbuild"],
        ["Test", "Tests unitarios, integracion, e2e, calidad, seguridad", "Jest, Pytest, Cypress, SonarQube, Trivy"],
        ["Release", "Empaquetar y versionar para deploy", "Helm, GitHub Releases, JFrog, Nexus"],
        ["Deploy", "Llevar el artefacto a un entorno (stg, prod)", "ArgoCD, Spinnaker, GitHub Actions, Jenkins"],
        ["Operate", "Mantener el servicio vivo en produccion", "Kubernetes, Terraform, Ansible, AWS/GCP/Azure"],
        ["Monitor", "Observar, alertar, recolectar feedback", "Prometheus, Grafana, Datadog, Sentry, NewRelic"],
      ],
    },

    { kind: "h3", text: "PARTE 6 - Antipatrones que matan equipos" },
    {
      kind: "list",
      items: [
        "<strong>'El DevOps del equipo'</strong>: una sola persona dueña de toda la infra. Bus factor = 1. Cuando renuncia, el equipo queda paralizado.",
        "<strong>Hero culture</strong>: el mismo dev arregla todas las incidencias a las 3 AM. Se quema, se va, no queda conocimiento documentado.",
        "<strong>Deploys solo los viernes</strong>: queres tener miedo el fin de semana? Justamente. Deploys diarios, chicos y reversibles.",
        "<strong>Tests manuales como ultima linea de defensa</strong>: si las pruebas son lentas y manuales, el deploy es lento y manual. Automatiza.",
        "<strong>Configuracion en archivos commiteados con passwords en plaintext</strong>: peligrosamente comun. Usa Secrets, Vault, SOPS.",
        "<strong>'Funciona en mi maquina'</strong>: por eso existen los containers. No hay excusa.",
        "<strong>Sin observabilidad</strong>: deploy a ciegas, te enteras de los problemas por Twitter del cliente.",
        "<strong>Comunicacion solo en reuniones</strong>: documentacion en cabezas, no en wikis. Asincronico > sincronico.",
      ],
    },

    { kind: "h3", text: "PARTE 7 - Roles y formas de organizarse" },
    {
      kind: "paragraph",
      html:
        "DevOps no fija una estructura, pero hay varios modelos comunes:",
    },
    {
      kind: "table",
      headers: ["Modelo", "Como funciona", "Cuando elegirlo"],
      rows: [
        ["Equipos product-aligned (recomendado)", "Cada equipo es full-stack: dev + ops + qa + sec. Dueño end-to-end de su producto.", "Productos independientes, empresas medianas/grandes con autonomia"],
        ["Plataforma interna (Platform Team)", "Un equipo construye una plataforma self-service que el resto consume (golden paths, IaC modules, CI templates).", "Cuando se necesita estandarizar 10+ equipos"],
        ["SRE (Google style)", "Equipo separado con foco en confiabilidad, comparte responsabilidad de prod con devs via SLO/error budget.", "Servicios de alta escala, mision critica"],
        ["DevOps Engineer (cargo individual)", "Una persona que ayuda a varios equipos con CI/CD, infra, monitoring.", "Etapa temprana, startup, transicion"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>Lectura recomendada</strong>: <em>Team Topologies</em> (Manuel Pais & Matthew Skelton). Define 4 tipos de equipos (stream-aligned, platform, enabling, complicated-subsystem) y como interactuan. Es el manual actual de como organizar equipos de software.",
    },

    { kind: "h3", text: "PARTE 8 - Mapa de herramientas (lo que veras en los proximos modulos)" },
    {
      kind: "vocab",
      items: [
        { word: "Git / GitHub / GitLab", meaning: "Control de versiones - Modulo 2" },
        { word: "Docker / containerd", meaning: "Containers - Modulo 3" },
        { word: "GitHub Actions / GitLab CI / Jenkins", meaning: "CI/CD - Modulo 4" },
        { word: "Bash / Linux", meaning: "Sistema operativo y scripting - Modulo 5" },
        { word: "Kubernetes / Helm", meaning: "Orquestacion - Modulos 6-10" },
        { word: "Terraform / Pulumi / Ansible", meaning: "Infrastructure as Code - Modulo 11" },
        { word: "Prometheus / Grafana / Loki / Jaeger", meaning: "Observabilidad - Modulo 12" },
        { word: "Trivy / SonarQube / Snyk / Vault", meaning: "DevSecOps - Modulo 13" },
        { word: "AWS / GCP / Azure / Vercel", meaning: "Cloud - Modulo 14" },
      ],
    },

    { kind: "h3", text: "PARTE 9 - Ponete a prueba" },
    {
      kind: "fillBlanks",
      key: "m1_fill",
      items: [
        { text: "El acronimo de los 5 pilares DevOps es ___.", answer: "CALMS", es: "CALMS" },
        { text: "La metrica DORA que mide cuanto tarda un commit en llegar a prod se llama ___ time for changes.", answer: "lead", es: "lead" },
        { text: "El % de deploys que rompen produccion se llama ___ failure rate.", answer: "change", es: "change" },
        { text: "El tiempo en restaurar servicio tras un incidente se mide con ___ (acronimo).", answer: "MTTR", es: "MTTR" },
        { text: "Un post-mortem ___ no busca culpables sino causa sistemica.", answer: "blameless", es: "blameless" },
        { text: "La novela fundacional del movimiento se llama The ___ Project.", answer: "Phoenix", es: "Phoenix" },
        { text: "El equipo que construye plataforma self-service se llama ___ team.", answer: "platform", es: "platform" },
        { text: "Site Reliability Engineering se abrevia ___.", answer: "SRE", es: "SRE" },
      ],
    },
    {
      kind: "matching",
      key: "m1_matching",
      pairs: [
        { en: "C en CALMS", es: "Culture" },
        { en: "A en CALMS", es: "Automation" },
        { en: "L en CALMS", es: "Lean" },
        { en: "M en CALMS", es: "Measurement" },
        { en: "S en CALMS", es: "Sharing" },
        { en: "Deployment Frequency", es: "Cuantos deploys por dia" },
        { en: "Lead Time", es: "Tiempo commit a prod" },
        { en: "Change Failure Rate", es: "% de deploys que rompen" },
        { en: "MTTR", es: "Tiempo en restaurar" },
        { en: "SRE", es: "Implementacion DevOps de Google" },
      ],
    },
    {
      kind: "quiz",
      key: "m1_quiz",
      questions: [
        {
          q: "Cual es el pilar de CALMS mas dificil de cambiar?",
          options: ["Automation", "Culture", "Measurement", "Lean"],
          correct: 1,
          explanation: "Cultura es lo unico que NO podes comprar. Las herramientas se compran en un dia; cambiar la forma de trabajar de un equipo lleva meses o años.",
        },
        {
          q: "Cual de estas NO es una metrica DORA?",
          options: ["Deployment Frequency", "Lead Time for Changes", "Number of Engineers", "MTTR"],
          correct: 2,
        },
        {
          q: "Que significa 'blameless post-mortem'?",
          options: [
            "Que nadie se entera del incidente",
            "Que se busca la causa sistemica sin culpar personas",
            "Que no hay documento escrito",
            "Que solo participa management",
          ],
          correct: 1,
        },
        {
          q: "Un equipo deploya cada 2 meses. Segun DORA es...",
          options: ["Elite", "Alto", "Medio", "Bajo"],
          correct: 3,
        },
        {
          q: "Cual es un anti-patron DevOps?",
          options: [
            "Deploys diarios chicos",
            "Tests automatizados",
            "Una sola persona dueña de toda la infra",
            "Post-mortems documentados",
          ],
          correct: 2,
          explanation: "Bus factor = 1 es un riesgo enorme. El conocimiento debe estar distribuido.",
        },
        {
          q: "El libro fundacional del movimiento DevOps es...",
          options: ["Clean Code", "The Phoenix Project", "The Mythical Man-Month", "Design Patterns"],
          correct: 1,
        },
        {
          q: "Que mide la metrica 'Lead Time for Changes'?",
          options: [
            "Cantidad de bugs por sprint",
            "Tiempo desde que un commit entra hasta que esta en produccion",
            "Numero de developers en el equipo",
            "Costo del cloud por mes",
          ],
          correct: 1,
        },
        {
          q: "Por que NO desplegar solo los viernes?",
          options: [
            "Porque los viernes hay menos personal disponible para responder problemas",
            "Porque los servidores estan apagados",
            "Porque Git no funciona los viernes",
            "Es un mito sin fundamento",
          ],
          correct: 0,
        },
        {
          q: "Cual de estos es un buen indicador de la salud DevOps de un equipo?",
          options: [
            "Cantidad de standups por semana",
            "Tiempo desde commit a produccion",
            "Cantidad de mails diarios",
            "Numero de reuniones de planning",
          ],
          correct: 1,
        },
        {
          q: "SRE significa...",
          options: [
            "Software Release Engineering",
            "Site Reliability Engineering",
            "Server Restoration Engineer",
            "System Recovery Expert",
          ],
          correct: 1,
        },
        {
          q: "El simbolo del ciclo DevOps es un infinito porque...",
          options: [
            "Hay infinitas herramientas",
            "El proceso es continuo, no lineal: monitor alimenta plan",
            "Es un capricho de marketing",
            "Significa que nunca termina el sprint",
          ],
          correct: 1,
        },
        {
          q: "Que es un 'Platform Team'?",
          options: [
            "El equipo que mantiene la pagina web",
            "Un equipo que construye plataforma interna self-service para otros equipos",
            "El equipo de marketing tecnico",
            "Otro nombre para QA",
          ],
          correct: 1,
        },
      ],
    },
  ],
};
