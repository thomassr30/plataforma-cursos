import type { ModuleData } from "@/types/course";

export const m2: ModuleData = {
  slug: "m2",
  number: 2,
  title: "Transformación Digital con Google Cloud",
  icon: "🚀",
  intro:
    "La transformación digital es uno de los temas MÁS preguntados en el examen. No es 'usar tecnología': es cambiar cómo opera el negocio. Aquí veremos qué la motiva, los retos reales, las 4 capacidades clave de una empresa digital, los frameworks (5 Rs de migración) y casos reales.",
  totalActivities: 3,
  blocks: [
    // ============================================
    // SECCIÓN 1: Definición de Transformación Digital
    // ============================================
    { kind: "h3", text: "📖 1. ¿Qué es la Transformación Digital?" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> La Transformación Digital es el proceso de <strong>cambiar fundamentalmente cómo opera una organización</strong>, usando tecnología digital para crear nuevos productos, mejorar la experiencia de cliente, optimizar operaciones internas y habilitar nuevos modelos de negocio.<br/><br/>" +
        "<strong>NO es</strong>: <em>'migrar las VMs a la nube'</em> o <em>'comprar más software'</em>. Esa es solo modernización tecnológica.<br/>" +
        "<strong>SÍ es</strong>: repensar procesos, cultura, modelos de negocio y aprovechar datos e IA para crear ventaja competitiva.",
    },
    { kind: "h4", text: "Las 3 dimensiones de la transformación digital" },
    {
      kind: "table",
      headers: ["Dimensión", "Ejemplo", "Tecnología clave"],
      rows: [
        ["Experiencia de Cliente (CX)", "Personalización en tiempo real, omnicanal", "Vertex AI, BigQuery, Dialogflow"],
        ["Operaciones internas", "Automatización de procesos, predictive maintenance", "BigQuery, Vision AI, Dataflow"],
        ["Modelo de Negocio", "Pasar de venta única a suscripción, datos como producto", "Plataforma cloud completa"],
      ],
    },

    // ============================================
    // SECCIÓN 2: Drivers / Motivaciones
    // ============================================
    { kind: "h3", text: "🎯 2. ¿Por qué las empresas se transforman? (Drivers)" },
    {
      kind: "list",
      items: [
        "<strong>Expectativas del cliente</strong>: los usuarios esperan experiencias <em>tipo Netflix/Amazon</em>. Si tu app es lenta o impersonal, se van.",
        "<strong>Competencia disruptiva</strong>: nativos digitales (Uber vs taxis, Netflix vs Blockbuster, Airbnb vs hoteles). Si no te transformas, te disrumpen.",
        "<strong>Presión de costos</strong>: hay que hacer más con menos. Cloud reduce costo de infra y automatiza operaciones.",
        "<strong>Innovación con datos</strong>: los datos son <em>el nuevo petróleo</em>. Quien los aprovecha gana.",
        "<strong>Velocidad (Time-to-Market)</strong>: lanzar una feature en semanas, no años.",
        "<strong>Talento</strong>: los mejores ingenieros prefieren trabajar con stack moderno y cloud.",
      ],
    },
    {
      kind: "info",
      html:
        "<strong>📊 Dato real:</strong> Según McKinsey, las empresas que adoptan cloud aceleradamente <strong>crecen 1.5x más rápido</strong> que sus pares, lanzan features <strong>3x más rápido</strong> y reducen TCO <strong>30-50%</strong> en plazos de 3-5 años.",
    },

    // ============================================
    // SECCIÓN 3: Retos y Soluciones en GCP
    // ============================================
    { kind: "h3", text: "🚧 3. Retos comunes y cómo Google Cloud los aborda" },
    {
      kind: "table",
      headers: ["Reto", "Por qué duele", "Solución en GCP"],
      rows: [
        ["Sistemas legacy", "Difíciles de evolucionar, frágiles, caros de operar", "Migrate to Containers, GKE, Anthos para modernización gradual"],
        ["Silos de datos", "Datos en BDs y archivos sin integrar; cada equipo ve algo distinto", "BigQuery como warehouse unificado + Dataplex para governance"],
        ["Lentitud para innovar", "Provisión y deploys toman semanas", "Serverless (Cloud Run, Functions), CI/CD nativo (Cloud Build, Cloud Deploy)"],
        ["Skill gap", "Equipos no saben de cloud, ML, DevOps modernos", "Cursos gratuitos en Google Cloud Skills Boost, partners, soporte"],
        ["Compliance y seguridad", "Reglamentaciones estrictas (GDPR, HIPAA, PCI)", "Security Command Center, CMEK, VPC SC, certificaciones globales"],
        ["Costos imprevisibles", "Facturas cloud que sorprenden", "Budgets, Alerts, Recommender, CUDs"],
        ["Resistencia cultural", "'Siempre lo hicimos así'", "Necesita liderazgo, comunicación y upskilling — no es solo tecnología"],
      ],
    },

    // ============================================
    // SECCIÓN 4: Las 4 capacidades de una empresa digital
    // ============================================
    { kind: "h3", text: "🏗️ 4. Las 4 capacidades de una empresa digital" },
    {
      kind: "paragraph",
      html:
        "Google identifica 4 capacidades que toda empresa digital debe construir. Estas suelen aparecer en el examen como <em>'¿qué necesita esta empresa para transformarse?'</em>",
    },
    {
      kind: "table",
      headers: ["Capacidad", "Qué significa", "Servicios clave"],
      rows: [
        [
          "Aprovechar datos",
          "Datos centralizados, análisis en tiempo real, decisiones basadas en datos, ML en cada proceso",
          "BigQuery, Looker, Dataflow, Pub/Sub, Vertex AI",
        ],
        [
          "Acelerar el desarrollo",
          "CI/CD, microservicios, contenedores, deploys frecuentes",
          "Cloud Build, GKE, Cloud Run, Cloud Deploy, Artifact Registry",
        ],
        [
          "Escalar globalmente",
          "Operar para usuarios en cualquier parte, con baja latencia",
          "Red global, multi-region, Cloud CDN, Cloud Load Balancing global",
        ],
        [
          "Operar confiablemente",
          "SRE, observabilidad, seguridad nativa, automatización",
          "Cloud Operations Suite, Security Command Center, IAM, Cloud Armor",
        ],
      ],
    },

    // ============================================
    // SECCIÓN 5: Las 5 Rs de la migración
    // ============================================
    { kind: "h3", text: "🛣️ 5. Las 5 Rs: estrategias de migración" },
    {
      kind: "paragraph",
      html:
        "Cuando una empresa decide migrar a la nube, NO todo se trata igual. Cada workload puede seguir una de 5 rutas. Esta clasificación SALE en el examen casi seguro.",
    },
    {
      kind: "table",
      headers: ["Estrategia", "Otro nombre", "Qué hace", "Esfuerzo", "Beneficio cloud"],
      rows: [
        [
          "1. Rehost",
          "Lift & Shift",
          "Mover tal cual, sin cambios",
          "Muy bajo",
          "Mínimo (solo OpEx, capacidad bajo demanda)",
        ],
        [
          "2. Replatform",
          "Improve & Move",
          "Pequeñas optimizaciones al migrar (ej. usar Cloud SQL en vez de tu MySQL)",
          "Bajo",
          "Medio",
        ],
        [
          "3. Repurchase",
          "Drop & Shop",
          "Reemplazar por un SaaS equivalente (ej. dejar tu CRM custom y usar Salesforce)",
          "Variable",
          "Alto si encaja el SaaS",
        ],
        [
          "4. Refactor / Re-architect",
          "Rip & Replace",
          "Reescribir cloud-native: microservicios, serverless, etc.",
          "Alto",
          "Máximo",
        ],
        ["5. Retire", "—", "Eliminar lo que ya no se usa (¡siempre revisa primero!)", "Bajo", "Ahorro inmediato"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Mnemónico de las 5 Rs:</strong> <em>'Rehost, Replatform, Repurchase, Refactor, Retire'</em>. Algunas versiones añaden una 6ª: <strong>Retain</strong> (mantener on-prem, ej. mainframes críticos por ahora).",
    },
    {
      kind: "successBox",
      html:
        "<strong>🎯 Caso típico en examen:</strong><br/>" +
        "<em>'Una empresa quiere migrar rápido para liberar el datacenter actual.'</em> → <strong>Rehost</strong>.<br/>" +
        "<em>'Quieren modernizar a microservicios para escalar globalmente.'</em> → <strong>Refactor</strong>.<br/>" +
        "<em>'Tienen 50 apps internas; algunas pueden reemplazarse por SaaS.'</em> → <strong>Repurchase</strong>.",
    },

    // ============================================
    // SECCIÓN 6: Cloud Adoption Framework
    // ============================================
    { kind: "h3", text: "🧭 6. Google Cloud Adoption Framework" },
    {
      kind: "paragraph",
      html:
        "Google ofrece un framework de 4 áreas y 3 fases para planificar la adopción cloud. Es útil para guiar la conversación con stakeholders.",
    },
    { kind: "h4", text: "Las 4 áreas (capabilities)" },
    {
      kind: "list",
      items: [
        "<strong>Learn</strong>: skills del equipo, capacidad de aprendizaje continuo",
        "<strong>Lead</strong>: soporte de liderazgo, sponsorship, presupuesto",
        "<strong>Scale</strong>: capacidad operativa, automatización",
        "<strong>Secure</strong>: postura de seguridad y compliance",
      ],
    },
    { kind: "h4", text: "Las 3 fases (maturity)" },
    {
      kind: "table",
      headers: ["Fase", "Descripción"],
      rows: [
        ["Tactical", "Apps individuales en cloud, sin estrategia global. Inicio."],
        ["Strategic", "Plan empresarial de adopción. Equipos coordinados."],
        ["Transformational", "Cloud-first. Cultura digital. Innovación continua."],
      ],
    },

    // ============================================
    // SECCIÓN 7: Caso de Estudio
    // ============================================
    { kind: "h3", text: "📚 7. Caso de estudio: Retail Tradicional → Digital" },
    {
      kind: "info",
      html:
        "<strong>Empresa:</strong> Retailer regional con 50 tiendas, e-commerce básico, BD on-prem.<br/><br/>" +
        "<strong>Problemas:</strong><br/>" +
        "• Web se cae en Black Friday<br/>" +
        "• No saben qué productos recomendar<br/>" +
        "• Inventario desincronizado entre tiendas y e-commerce<br/>" +
        "• Reportes semanales (no en tiempo real)<br/><br/>" +
        "<strong>Solución con Google Cloud:</strong><br/>" +
        "• <strong>Catálogo y carrito en Cloud Spanner</strong>: BD global, escala automática<br/>" +
        "• <strong>Frontend en Cloud Run</strong>: auto-escala desde 0 a miles en segundos<br/>" +
        "• <strong>Inventario sincronizado con Pub/Sub</strong>: eventos en tiempo real<br/>" +
        "• <strong>Recomendaciones con Vertex AI</strong>: modelo entrenado en compras históricas<br/>" +
        "• <strong>Analytics en BigQuery</strong>: dashboards en Looker para C-level en tiempo real<br/>" +
        "• <strong>Cloud Armor</strong>: protección DDoS y WAF<br/><br/>" +
        "<strong>Resultado:</strong> Black Friday sin caídas, +35% en ventas por recomendaciones, decisiones diarias basadas en datos.",
    },

    // ============================================
    // SECCIÓN 8: Cultura y liderazgo
    // ============================================
    { kind: "h3", text: "👥 8. Cultura: la parte que NADIE quiere abordar" },
    {
      kind: "info",
      html:
        "El 70% de las transformaciones digitales fallan. ¿Por qué? <strong>NO es la tecnología, es la cultura.</strong>",
    },
    {
      kind: "list",
      items: [
        "<strong>Liderazgo desde C-level</strong>: sin sponsorship, muere",
        "<strong>Mindset experimental</strong>: aceptar fallar rápido y aprender",
        "<strong>Upskilling continuo</strong>: el equipo debe seguir aprendiendo (Skills Boost, partners)",
        "<strong>Equipos cross-funcionales</strong>: dev + ops + business + data juntos",
        "<strong>Métricas centradas en negocio</strong>: no solo 'uptime', también 'time-to-market', NPS, revenue impact",
      ],
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m2_matching",
      pairs: [
        { en: "Rehost", es: "Lift & Shift: mover sin cambios" },
        { en: "Replatform", es: "Improve & Move: pequeños cambios" },
        { en: "Repurchase", es: "Reemplazar por SaaS equivalente" },
        { en: "Refactor", es: "Rip & Replace: reescribir cloud-native" },
        { en: "Retire", es: "Eliminar lo que no se usa" },
        { en: "Retain", es: "Mantener on-prem por ahora" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m2_fill",
      items: [
        { text: "Lift & Shift = ___", answer: "Rehost", es: "Rehost" },
        { text: "Reescribir cloud-native = ___", answer: "Refactor", es: "Refactor" },
        { text: "Reemplazar por SaaS = ___", answer: "Repurchase", es: "Repurchase" },
        { text: "Una de las 4 capacidades digitales: aprovechar ___", answer: "datos", es: "datos" },
        { text: "Solución de Google para gestión multi-cloud: ___", answer: "Anthos", es: "Anthos" },
      ],
    },

    // ============================================
    // QUIZ FINAL DEL MÓDULO
    // ============================================
    {
      kind: "quiz",
      key: "m2_quiz",
      questions: [
        {
          q: "La transformación digital es PRINCIPALMENTE:",
          options: [
            "Comprar más software",
            "Cambiar cómo opera la organización usando tecnología",
            "Migrar todas las VMs a la nube",
            "Implementar microservicios",
          ],
          correct: 1,
          explanation:
            "La transformación digital es cambio organizacional + cultural + tecnológico. La migración cloud es solo una pieza del puzzle.",
        },
        {
          q: "Un banco tradicional quiere migrar 200 apps. ¿Qué enfoque conviene?",
          options: [
            "Refactorizar todas a microservicios",
            "Aplicar las 5 Rs según cada app",
            "Solo Lift & Shift",
            "Mantener todo on-prem",
          ],
          correct: 1,
          explanation:
            "Cada app es distinta. Algunas se Rehost (legacy crítico), otras Refactor (core competitive), otras Repurchase (no-core), otras Retire (no usadas). NO hay solución única.",
        },
        {
          q: "Una empresa quiere aprovechar sus datos pero están en silos. ¿Qué primera acción?",
          options: [
            "Comprar más servidores",
            "Unificar en un data warehouse como BigQuery + governance con Dataplex",
            "Eliminar los datos",
            "Solo poner Looker encima",
          ],
          correct: 1,
          explanation:
            "Primero hay que unificar (BigQuery), luego gobernar (Dataplex/Data Catalog). Looker es para visualizar, viene después.",
        },
        {
          q: "El framework de adopción de Google tiene cuántas áreas?",
          options: ["2 (técnica y de negocio)", "4 (Learn, Lead, Scale, Secure)", "6", "10"],
          correct: 1,
          explanation: "Las 4 áreas son: Learn (skills), Lead (liderazgo), Scale (operaciones), Secure (seguridad).",
        },
        {
          q: "Una empresa con un legacy mainframe crítico que no quiere migrar todavía:",
          options: ["Rehost obligatorio", "Refactor inmediato", "Retain (mantener por ahora)", "Retire"],
          correct: 2,
          explanation:
            "Retain (también llamado 'Revisit') significa mantener el workload on-prem mientras se planifica una migración futura. Es válido cuando hay riesgos altos.",
        },
        {
          q: "El 70% de las transformaciones digitales fallan principalmente por:",
          options: ["Tecnología inadecuada", "Cultura y gestión del cambio", "Falta de presupuesto", "Mala elección de cloud"],
          correct: 1,
          explanation:
            "La causa #1 documentada es la resistencia cultural y falta de liderazgo. La tecnología es la parte 'fácil'.",
        },
        {
          q: "Una empresa retail quiere recomendaciones personalizadas. ¿Servicio?",
          options: ["Cloud SQL solo", "Vertex AI (con su data en BigQuery)", "Cloud DNS", "Cloud Functions sola"],
          correct: 1,
          explanation:
            "Vertex AI entrena y despliega modelos de recomendación. BigQuery tiene los datos históricos. Es la combinación clásica.",
        },
        {
          q: "Una de las 4 capacidades de una empresa digital es:",
          options: [
            "Aprovechar datos",
            "Acelerar desarrollo",
            "Escalar globalmente",
            "Todas las anteriores",
          ],
          correct: 3,
          explanation:
            "Las 4 son: aprovechar datos, acelerar desarrollo, escalar globalmente y operar confiablemente. Todas son necesarias.",
        },
        {
          q: "Una transformación 'Repurchase' significa:",
          options: [
            "Comprar más infra",
            "Reemplazar tu app por una equivalente en SaaS",
            "Renegociar contratos",
            "Apagar el servicio",
          ],
          correct: 1,
          explanation:
            "Repurchase = Drop & Shop. Dejas tu app custom y compras un SaaS que hace lo mismo (ej. dejar tu CRM y usar Salesforce).",
        },
        {
          q: "Anthos sirve principalmente para:",
          options: [
            "Solo Compute Engine",
            "Gestionar workloads Kubernetes consistentemente en GCP, on-prem y otras nubes",
            "Solo BigQuery",
            "Bases de datos",
          ],
          correct: 1,
          explanation:
            "Anthos extiende GKE para escenarios híbridos y multi-cloud. Es clave para empresas que necesitan flexibilidad.",
        },
      ],
    },
  ],
};
