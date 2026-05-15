import type { ModuleData } from "@/types/course";

export const m9: ModuleData = {
  slug: "m9",
  number: 9,
  title: "Operaciones, SRE y Migraciones",
  icon: "📈",
  intro:
    "Operar una app en cloud es muy distinto a operarla on-prem. Aquí veremos Cloud Operations Suite (logging, monitoring, tracing), el enfoque SRE de Google (SLOs, error budgets), DevOps nativo (Cloud Build) y las herramientas de migración.",
  totalActivities: 3,
  blocks: [
    // ============================================
    // SECCIÓN 1: Cloud Operations Suite
    // ============================================
    { kind: "h3", text: "📊 1. Cloud Operations Suite (antes Stackdriver)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Cloud Operations Suite es la familia de servicios de <strong>observabilidad</strong> de GCP. Cubre los 3 pilares: <strong>logs</strong>, <strong>métricas</strong> y <strong>traces</strong>.",
    },
    {
      kind: "table",
      headers: ["Servicio", "Para qué"],
      rows: [
        ["Cloud Logging", "Centralizar y analizar logs estructurados"],
        ["Cloud Monitoring", "Métricas, dashboards y alertas"],
        ["Cloud Trace", "Distributed tracing: seguir requests entre servicios"],
        ["Cloud Profiler", "Profiling de CPU y memoria en producción"],
        ["Error Reporting", "Agrupa y notifica errores"],
        ["Service Monitoring", "SLOs y SLIs de servicios"],
      ],
    },

    // ============================================
    // SECCIÓN 2: SRE
    // ============================================
    { kind: "h3", text: "🎯 2. Site Reliability Engineering (SRE)" },
    {
      kind: "info",
      html:
        "<strong>SRE</strong> es el enfoque de Google para operar sistemas <strong>confiables a escala</strong>. Nació en Google en 2003 (Ben Treynor). Aplica ingeniería al trabajo de operaciones: automatización, métricas, blameless post-mortems.",
    },
    { kind: "h4", text: "Los 4 conceptos CRÍTICOS para examen" },
    {
      kind: "table",
      headers: ["Concepto", "Definición", "Ejemplo"],
      rows: [
        ["SLI (Service Level Indicator)", "Métrica que MIDES", "Latencia, tasa de error, throughput"],
        ["SLO (Service Level Objective)", "OBJETIVO interno para los SLIs", "99.9% requests <200ms en 30 días"],
        ["SLA (Service Level Agreement)", "ACUERDO contractual con el cliente", "99.95% uptime, sino refund"],
        ["Error Budget", "100% - SLO. Cuántas fallas te puedes permitir.", "Si SLO=99.9%, error budget=0.1% (43.2 min/mes)"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Diferencia clave:</strong><br/>" +
        "• <strong>SLA</strong> es <em>contrato externo</em> (con consecuencias legales)<br/>" +
        "• <strong>SLO</strong> es <em>compromiso interno</em> (usualmente más estricto que el SLA)<br/>" +
        "• <strong>SLI</strong> es lo que <em>mides</em>",
    },
    { kind: "h4", text: "Filosofía SRE" },
    {
      kind: "list",
      items: [
        "<strong>Embracing risk</strong>: no buscar 100% (es imposible y caro). Aceptar el error budget.",
        "<strong>Toil reduction</strong>: automatizar trabajo repetitivo manual",
        "<strong>Blameless post-mortems</strong>: aprender de incidentes sin culpar",
        "<strong>Eliminating toil</strong>: si el error budget se agota, paramos nuevas features y mejoramos estabilidad",
        "<strong>Capacity planning</strong>: anticipar crecimiento",
      ],
    },

    // ============================================
    // SECCIÓN 3: DevOps Nativo
    // ============================================
    { kind: "h3", text: "🚢 3. DevOps Nativo en GCP" },
    {
      kind: "table",
      headers: ["Servicio", "Para qué"],
      rows: [
        ["Cloud Build", "CI/CD administrado: builds, tests, deploys"],
        ["Artifact Registry", "Repositorio universal de artefactos (containers, paquetes)"],
        ["Cloud Source Repositories", "Git privado administrado"],
        ["Cloud Deploy", "Continuous Delivery con strategies y aprobaciones"],
        ["Container Analysis", "Escaneo de vulnerabilidades en imágenes Docker"],
        ["Binary Authorization", "Solo deploys de imágenes confiables y verificadas"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Flujo típico CI/CD en GCP:</strong><br/>" +
        "1. Push a Git (GitHub, Cloud Source Repos)<br/>" +
        "2. <strong>Cloud Build</strong> ejecuta lint, tests, builds<br/>" +
        "3. <strong>Container Analysis</strong> escanea vulnerabilidades<br/>" +
        "4. Imagen va a <strong>Artifact Registry</strong><br/>" +
        "5. <strong>Cloud Deploy</strong> hace promoción staging → prod con aprobaciones<br/>" +
        "6. <strong>Binary Authorization</strong> verifica que solo se desplieguen imágenes firmadas",
    },

    // ============================================
    // SECCIÓN 4: Migraciones
    // ============================================
    { kind: "h3", text: "🚚 4. Migraciones a GCP" },
    { kind: "h4", text: "Herramientas de migración" },
    {
      kind: "table",
      headers: ["Servicio", "Para qué"],
      rows: [
        ["Migrate to Virtual Machines", "Mover VMs (VMware, AWS, Azure) a Compute Engine"],
        ["Migrate to Containers", "Convertir apps en VMs → containers para GKE"],
        ["Database Migration Service (DMS)", "Migrar BDs (MySQL, PostgreSQL, Oracle) a Cloud SQL/AlloyDB"],
        ["Datastream", "CDC continuo desde BDs operacionales a BigQuery"],
        ["BigQuery Data Transfer Service", "Cargar datos a BQ desde SaaS (Salesforce, YouTube, Google Ads)"],
        ["Storage Transfer Service", "Transferir archivos desde otras nubes a Cloud Storage"],
        ["Transfer Appliance", "Dispositivo FÍSICO para mover petabytes (cuando internet no alcanza)"],
        ["BigQuery Migration Service", "Migrar warehouses (Teradata, Snowflake, Redshift)"],
      ],
    },
    { kind: "h4", text: "¿Cuándo Transfer Appliance vs Online?" },
    {
      kind: "tip",
      html:
        "<strong>💡 Regla:</strong> si la transferencia online tardaría más que enviar el disco físico → Transfer Appliance. Por ejemplo, mover 1 PB con un link de 1 Gbps tarda ~100 días. Un Transfer Appliance lo hace en una semana.",
    },

    // ============================================
    // SECCIÓN 5: Patrones de migración (recordatorio)
    // ============================================
    { kind: "h3", text: "🛣️ 5. Las 5 Rs (recordatorio del Módulo 2)" },
    {
      kind: "table",
      headers: ["Estrategia", "Esfuerzo", "Beneficio cloud"],
      rows: [
        ["Rehost (Lift & Shift)", "Bajo", "Mínimo"],
        ["Replatform (Improve & Move)", "Bajo-Medio", "Medio"],
        ["Repurchase (Drop & Shop a SaaS)", "Variable", "Alto"],
        ["Refactor (Rip & Replace)", "Alto", "Máximo"],
        ["Retire", "Bajo", "Ahorro inmediato"],
      ],
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m9_matching",
      pairs: [
        { en: "Cloud Logging", es: "Logs centralizados" },
        { en: "Cloud Monitoring", es: "Métricas y alertas" },
        { en: "Cloud Trace", es: "Tracing distribuido" },
        { en: "SLI", es: "Lo que mides" },
        { en: "SLO", es: "Objetivo interno" },
        { en: "SLA", es: "Contrato externo" },
        { en: "Error Budget", es: "100% - SLO" },
        { en: "Cloud Build", es: "CI/CD administrado" },
        { en: "Artifact Registry", es: "Repos universal de artefactos" },
        { en: "Transfer Appliance", es: "Dispositivo físico para PB" },
      ],
    },

    // ============================================
    // QUIZ FINAL
    // ============================================
    {
      kind: "quiz",
      key: "m9_quiz",
      questions: [
        {
          q: "¿Quién define el SLA?",
          options: ["Solo SRE", "El proveedor con compromiso contractual al cliente", "Es lo mismo que SLI", "El admin de la app"],
          correct: 1,
          explanation:
            "SLA = Service Level Agreement: acuerdo contractual con consecuencias legales si no se cumple. El SLO es interno y el SLI lo que mides.",
        },
        {
          q: "Si tu SLO es 99.9% uptime, tu error budget mensual es aprox:",
          options: ["1 segundo", "5 horas", "43.2 minutos", "8 horas"],
          correct: 2,
          explanation:
            "100% - 99.9% = 0.1%. 0.1% de un mes (30 días) = 43.2 minutos. Cuando consumes ese budget, tienes que parar lanzamientos y enfocar en estabilidad.",
        },
        {
          q: "Para tracing distribuido entre microservicios:",
          options: ["Cloud Logging", "Cloud Monitoring", "Cloud Trace", "Cloud Profiler"],
          correct: 2,
          explanation:
            "Cloud Trace sigue una request a través de todos los servicios para identificar dónde está la latencia.",
        },
        {
          q: "Para CI/CD nativo en GCP:",
          options: ["Cloud Build", "Cloud Logging", "Cloud Run solo", "BigQuery"],
          correct: 0,
          explanation:
            "Cloud Build es el CI/CD administrado de GCP. Soporta builds, tests, deploys con triggers desde Git.",
        },
        {
          q: "Para mover 500 TB desde on-prem cuando el internet no alcanza:",
          options: ["Storage Transfer online", "Transfer Appliance (físico)", "Cloud VPN", "Solo gsutil"],
          correct: 1,
          explanation:
            "Transfer Appliance es un dispositivo físico que Google envía. Lo llenas con tus datos y lo devuelves. Ideal para volúmenes muy grandes.",
        },
        {
          q: "Para replicar continuamente cambios de una BD on-prem a BigQuery:",
          options: ["Manual export", "Datastream (CDC)", "Cloud SQL solo", "Compute Engine"],
          correct: 1,
          explanation:
            "Datastream hace CDC (Change Data Capture): captura cambios en BDs y los replica continuamente. Ideal para mantener BQ actualizado en near real-time.",
        },
        {
          q: "Para migrar una BD on-prem MySQL a Cloud SQL con mínima interrupción:",
          options: [
            "Manual dump y restore",
            "Database Migration Service (DMS)",
            "Cloud Functions",
            "Transfer Appliance",
          ],
          correct: 1,
          explanation:
            "DMS replica continuamente la BD origen a la destino. Cuando estés listo, haces el switch con mínimo downtime. Soporta MySQL, PostgreSQL, Oracle, SQL Server.",
        },
        {
          q: "Para que solo imágenes Docker FIRMADAS se desplieguen en producción:",
          options: ["IAM", "Binary Authorization", "Cloud Logging", "Container Analysis"],
          correct: 1,
          explanation:
            "Binary Authorization garantiza que solo containers que cumplen políticas (firmados, escaneados, aprobados) se desplieguen.",
        },
        {
          q: "Una organización tiene logs muy ruidosos. ¿Cómo gestiona alertas inteligentemente?",
          options: [
            "Alertar por cada log",
            "Cloud Monitoring con SLOs y políticas inteligentes",
            "Ignorar todo",
            "Solo Cloud Build",
          ],
          correct: 1,
          explanation:
            "Cloud Monitoring permite definir SLOs y alertar solo cuando se quema el error budget. Evita fatiga de alertas y enfoca en lo crítico.",
        },
        {
          q: "Para profiling de CPU/memoria de apps en producción:",
          options: ["Cloud Logging", "Cloud Trace", "Cloud Profiler", "Error Reporting"],
          correct: 2,
          explanation:
            "Cloud Profiler analiza uso de CPU y memoria en producción con overhead mínimo. Identifica hotspots de código.",
        },
      ],
    },
  ],
};
