import type { ModuleData } from "@/types/course";

export const m3: ModuleData = {
  slug: "m3",
  number: 3,
  title: "Modernización de Compute: VMs, Containers y Serverless",
  icon: "💻",
  intro:
    "El compute es el corazón de cualquier app. Google Cloud ofrece 5 servicios principales — Compute Engine, App Engine, Cloud Run, Cloud Functions y GKE. Saber CUÁNDO usar cada uno es probablemente el tema más preguntado en el examen. Este módulo te lo deja claro.",
  totalActivities: 4,
  blocks: [
    // ============================================
    // SECCIÓN 0: Vista general
    // ============================================
    { kind: "h3", text: "🗺️ 0. Mapa de servicios de compute en GCP" },
    {
      kind: "table",
      headers: ["Servicio", "Modelo", "Gestión", "Caso típico"],
      rows: [
        ["Compute Engine", "IaaS / VMs", "Más manual", "Control total, GPU, OS específico, sole-tenant"],
        ["App Engine", "PaaS", "Alta automatización", "Apps web/API con auto-scale, sin gestionar infra"],
        ["Cloud Run", "Containers serverless", "Total automatización", "Containers HTTP pay-per-request"],
        ["Cloud Functions", "FaaS event-driven", "Total automatización", "Funciones que reaccionan a eventos"],
        ["GKE", "Kubernetes administrado", "Media (Autopilot menos)", "Microservicios, portabilidad K8s"],
      ],
    },

    // ============================================
    // SECCIÓN 1: Compute Engine
    // ============================================
    { kind: "h3", text: "🖥️ 1. Compute Engine — VMs (IaaS)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Compute Engine es el servicio IaaS de Google Cloud que provee <strong>máquinas virtuales</strong> de alto rendimiento. Eliges OS, tamaño, almacenamiento, red, y tú gestionas todo lo de arriba (parches, runtime, app).",
    },
    { kind: "h4", text: "Tipos de máquina (Machine Types)" },
    {
      kind: "table",
      headers: ["Familia", "Optimizada para", "Casos"],
      rows: [
        ["E2", "General, económica", "Web servers, dev/test, apps internas"],
        ["N2 / N2D / N1", "General, balance", "Cargas medianas, BD pequeñas"],
        ["C3 / C2", "Compute intensivo", "HPC, scientific computing, gaming"],
        ["M3 / M2 / M1", "Memoria intensiva", "BD in-memory, SAP HANA"],
        ["A2 / G2", "GPU para ML/HPC", "Entrenamiento de modelos, rendering"],
        ["T2D / T2A", "Cargas escalables (AMD/ARM)", "Web servers, microservicios"],
      ],
    },
    { kind: "h4", text: "Custom Machine Types" },
    {
      kind: "paragraph",
      html:
        "Si los predefinidos no encajan, puedes <strong>personalizar CPUs y RAM</strong>. Pagas solo por lo configurado. Ideal cuando tu app tiene perfil de uso atípico.",
    },
    { kind: "h4", text: "Discos y storage" },
    {
      kind: "list",
      items: [
        "<strong>Persistent Disk (PD)</strong>: discos virtuales persistentes. Tipos: Standard (HDD), Balanced (SSD), SSD (rápido), Extreme (ultrarrápido)",
        "<strong>Local SSD</strong>: muy rápido pero <strong>efímero</strong> (se pierde al apagar la VM)",
        "<strong>Hyperdisk</strong>: nueva generación de disks con IOPS y throughput configurables independientemente",
      ],
    },
    { kind: "h4", text: "Opciones especiales" },
    {
      kind: "table",
      headers: ["Opción", "Para qué"],
      rows: [
        ["Sole-tenant Nodes", "Servidor físico DEDICADO (no compartido). Para licencias por HW, compliance estricto"],
        ["Spot VMs", "Hasta 91% off, GCP puede terminarlas. Para batch tolerante"],
        ["Preemptible VMs (legacy)", "Predecesor de Spot, máx 24h"],
        ["Confidential VMs", "Encriptación incluso en USO (RAM cifrada con AMD SEV/Intel TDX)"],
        ["Shielded VMs", "Vetted boot integrity (Secure Boot, vTPM, integrity monitoring)"],
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo usar Compute Engine:</strong><br/>" +
        "• Necesitas control total del OS<br/>" +
        "• Software legacy que no encaja en PaaS<br/>" +
        "• Cargas con GPU/TPU o requisitos especiales<br/>" +
        "• Compliance con sole-tenant<br/>" +
        "• BD auto-gestionada (cuando Cloud SQL no encaja)",
    },
    {
      kind: "tip",
      html:
        "<strong>❌ Cuándo NO usar Compute Engine:</strong><br/>" +
        "• Tu app es web/API estándar (mejor PaaS o Cloud Run)<br/>" +
        "• No quieres parchear, escalar, monitorear manualmente<br/>" +
        "• Tu carga es event-driven (mejor Cloud Functions)",
    },

    // ============================================
    // SECCIÓN 2: App Engine
    // ============================================
    { kind: "h3", text: "🌐 2. App Engine (PaaS)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> App Engine es PaaS para apps web y APIs. Tú subes el código, Google se encarga del runtime, escalado, parches y deploy. Existe desde 2008 (uno de los primeros PaaS del mundo).",
    },
    { kind: "h4", text: "Standard vs Flexible" },
    {
      kind: "table",
      headers: ["Característica", "Standard", "Flexible"],
      rows: [
        ["Tipo de runtime", "Sandboxed, lenguajes específicos", "Containers Docker custom"],
        ["Lenguajes soportados", "Python, Java, Node.js, PHP, Go, Ruby, .NET", "Cualquiera (es Docker)"],
        ["Escala a 0", "✅ Sí", "❌ No (mínimo 1 instancia)"],
        ["Cold start", "Muy rápido (milisegundos)", "Más lento (segundos)"],
        ["Costo idle", "$0 si no hay tráfico", "Siempre hay instancia mínima"],
        ["Acceso a SSH", "❌ No", "✅ Sí"],
        ["Casos típicos", "APIs, apps web ligeras", "Apps con dependencias custom"],
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo usar App Engine Standard:</strong><br/>" +
        "• App web tradicional en runtime soportado<br/>" +
        "• Tráfico muy variable, necesitas escala a 0<br/>" +
        "• Quieres mínima gestión",
    },

    // ============================================
    // SECCIÓN 3: Cloud Run
    // ============================================
    { kind: "h3", text: "⚡ 3. Cloud Run (Container Serverless)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Cloud Run ejecuta <strong>containers Docker</strong> de forma serverless. Despliegas una imagen, defines límites de CPU/RAM, y Google escala automáticamente desde 0 hasta miles de instancias. Pagas solo por el tiempo que tu container procesa requests.",
    },
    { kind: "h4", text: "Características clave" },
    {
      kind: "list",
      items: [
        "<strong>Cualquier lenguaje</strong>: si corre en un container, corre en Cloud Run",
        "<strong>Escala a 0</strong>: si no hay tráfico, no pagas nada",
        "<strong>Auto-scale</strong> en segundos a miles de instancias",
        "<strong>HTTP/HTTPS y gRPC</strong> nativos",
        "<strong>Custom domains</strong> con SSL automático",
        "<strong>Stateless</strong> por diseño (almacena estado en BD/cache externo)",
        "Basado en <strong>Knative</strong> (open standard portable)",
      ],
    },
    { kind: "h4", text: "Cloud Run Services vs Cloud Run Jobs" },
    {
      kind: "table",
      headers: ["Tipo", "Para qué"],
      rows: [
        ["Services", "Aplicaciones que reciben requests HTTP/gRPC continuamente"],
        ["Jobs", "Tareas finitas (batch, scripts, procesamiento): se lanzan, hacen el trabajo y terminan"],
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo usar Cloud Run:</strong><br/>" +
        "• Tienes un container HTTP/gRPC<br/>" +
        "• Tráfico variable, quieres pay-per-request<br/>" +
        "• Quieres portabilidad (Knative funciona también en GKE)<br/>" +
        "• Microservicios independientes<br/>" +
        "• Webhooks, APIs, backends de móviles",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Cloud Run vs App Engine Standard:</strong> Cloud Run te da más flexibilidad (cualquier lenguaje vía container) pero App Engine Standard tiene cold starts más rápidos y se integra mejor con el ecosistema App Engine. La industria está migrando a Cloud Run.",
    },

    // ============================================
    // SECCIÓN 4: Cloud Functions
    // ============================================
    { kind: "h3", text: "🔧 4. Cloud Functions (FaaS event-driven)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Cloud Functions ejecuta <strong>pequeñas funciones</strong> en respuesta a eventos. No gestionas servidores ni containers — escribes una función, defines el trigger, y Google la ejecuta cuando ocurre el evento.",
    },
    { kind: "h4", text: "Triggers comunes" },
    {
      kind: "table",
      headers: ["Trigger", "Caso típico"],
      rows: [
        ["HTTP", "API endpoint simple, webhook"],
        ["Pub/Sub", "Procesar mensajes asíncronos"],
        ["Cloud Storage", "Cuando se sube un archivo (ej. generar thumbnail)"],
        ["Firestore", "Cuando un documento cambia"],
        ["Cloud Scheduler", "Tareas programadas (cron)"],
        ["Eventarc", "Cualquier evento de GCP"],
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo usar Cloud Functions:</strong><br/>" +
        "• Función pequeña que reacciona a un evento<br/>" +
        "• Glue code para integrar servicios<br/>" +
        "• Webhooks de terceros<br/>" +
        "• Procesamiento ligero de archivos (resize, parse)<br/>" +
        "• Cron jobs simples",
    },
    {
      kind: "tip",
      html:
        "<strong>❌ Cuándo NO usar Cloud Functions:</strong><br/>" +
        "• Cargas de larga duración (timeout máximo)<br/>" +
        "• Apps complejas con muchos endpoints (mejor Cloud Run)<br/>" +
        "• Cargas con muchas dependencias o stateful",
    },

    // ============================================
    // SECCIÓN 5: GKE
    // ============================================
    { kind: "h3", text: "☸️ 5. Google Kubernetes Engine (GKE)" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> GKE es Kubernetes <strong>administrado</strong> por Google. Si ya conoces K8s, GKE te elimina la complejidad de configurar y operar el cluster (control plane, upgrades, security patches).",
    },
    { kind: "h4", text: "GKE Standard vs GKE Autopilot" },
    {
      kind: "table",
      headers: ["Característica", "Standard", "Autopilot"],
      rows: [
        ["Quién gestiona los nodos", "Tú", "Google"],
        ["Pricing", "Por nodo (VM)", "Por pod (recursos pedidos)"],
        ["Flexibilidad", "Alta (custom node pools)", "Más limitada"],
        ["Esfuerzo operativo", "Medio-alto", "Mínimo"],
        ["Caso típico", "Cluster grande con configuración custom", "Equipos que solo quieren correr workloads"],
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo usar GKE:</strong><br/>" +
        "• Tu equipo ya conoce Kubernetes<br/>" +
        "• Microservicios complejos con orquestación<br/>" +
        "• Necesitas portabilidad (K8s funciona en cualquier nube)<br/>" +
        "• Necesitas configuración fina de networking, storage, autoscaling<br/>" +
        "• Mezcla de workloads (web + batch + ML)",
    },
    {
      kind: "tip",
      html:
        "<strong>❌ Cuándo NO usar GKE:</strong><br/>" +
        "• Tu app es una sola web simple (overkill, usa Cloud Run)<br/>" +
        "• Tu equipo NO conoce K8s (curva de aprendizaje grande)<br/>" +
        "• Quieres mínima gestión (usa Cloud Run o App Engine)",
    },

    // ============================================
    // SECCIÓN 6: Anthos
    // ============================================
    { kind: "h3", text: "🌐 6. Anthos: Kubernetes híbrido y multi-cloud" },
    {
      kind: "paragraph",
      html:
        "<strong>Anthos</strong> extiende GKE para que corras workloads consistentemente en GCP, on-premise (Anthos on bare metal, Anthos on VMware) y otras nubes (Anthos on AWS, Anthos on Azure). Es la respuesta de Google para empresas que quieren <strong>flexibilidad multi-cloud</strong>.",
    },
    {
      kind: "info",
      html:
        "<strong>Componentes de Anthos:</strong><br/>" +
        "• <strong>Anthos GKE</strong>: K8s en cualquier entorno<br/>" +
        "• <strong>Anthos Config Management</strong>: GitOps + policy enforcement<br/>" +
        "• <strong>Anthos Service Mesh</strong>: basado en Istio, seguridad y observabilidad<br/>" +
        "• <strong>Migrate to Containers</strong>: convertir VMs a containers",
    },

    // ============================================
    // SECCIÓN 7: Tabla de decisión final
    // ============================================
    { kind: "h3", text: "🎯 7. Guía RÁPIDA de decisión" },
    {
      kind: "info",
      html:
        "<strong>Pregúntate en este orden:</strong><br/><br/>" +
        "1️⃣ ¿Es una función pequeña que reacciona a evento? → <strong>Cloud Functions</strong><br/>" +
        "2️⃣ ¿Tienes un container HTTP y quieres pay-per-request? → <strong>Cloud Run</strong><br/>" +
        "3️⃣ ¿App web/API en runtime estándar? → <strong>App Engine Standard</strong><br/>" +
        "4️⃣ ¿Microservicios complejos con K8s? → <strong>GKE</strong><br/>" +
        "5️⃣ ¿Necesitas control de OS, GPU, sole-tenant? → <strong>Compute Engine</strong><br/>" +
        "6️⃣ ¿Quieres multi-cloud / híbrido consistente? → <strong>Anthos</strong>",
    },

    // ============================================
    // SECCIÓN 8: Pricing comparativo
    // ============================================
    { kind: "h3", text: "💵 8. Modelo de pricing comparativo" },
    {
      kind: "table",
      headers: ["Servicio", "Cómo cobra"],
      rows: [
        ["Compute Engine", "Por segundo de VM encendida (con SUDs/CUDs)"],
        ["App Engine Standard", "Por instancia-hora (escala a 0)"],
        ["Cloud Run", "Por CPU/RAM/request mientras procesa (escala a 0)"],
        ["Cloud Functions", "Por invocación + tiempo de ejecución + recursos"],
        ["GKE Standard", "Por nodos (VMs) + tarifa fija por cluster"],
        ["GKE Autopilot", "Por recursos pedidos por pod"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Servicios que escalan a 0:</strong> Cloud Run, App Engine Standard, Cloud Functions, GKE Autopilot (en algunos modos). Estos son la opción más económica para cargas variables.",
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m3_matching",
      pairs: [
        { en: "Compute Engine", es: "VMs IaaS, control total" },
        { en: "App Engine Standard", es: "PaaS escala a 0, runtime sandboxed" },
        { en: "Cloud Run", es: "Container serverless HTTP" },
        { en: "Cloud Functions", es: "FaaS event-driven" },
        { en: "GKE Autopilot", es: "K8s sin gestionar nodos" },
        { en: "Anthos", es: "K8s híbrido y multi-cloud" },
        { en: "Sole-tenant", es: "Servidor físico dedicado" },
        { en: "Spot VMs", es: "Hasta 91% off, terminables" },
      ],
    },
    {
      kind: "fillBlanks",
      key: "m3_fill",
      items: [
        { text: "Container HTTP serverless: ___ ___", answer: "Cloud Run", es: "Cloud Run" },
        { text: "FaaS event-driven: Cloud ___", answer: "Functions", es: "Functions" },
        { text: "K8s gestionado: ___", answer: "GKE", es: "GKE" },
        { text: "VMs IaaS: Compute ___", answer: "Engine", es: "Engine" },
        { text: "Multi-cloud K8s consistente: ___", answer: "Anthos", es: "Anthos" },
        { text: "VMs muy baratas y terminables: ___ VMs", answer: "Spot", es: "Spot" },
      ],
    },

    // ============================================
    // QUIZ FINAL DEL MÓDULO
    // ============================================
    {
      kind: "quiz",
      key: "m3_quiz",
      questions: [
        {
          q: "Una empresa quiere correr su API HTTP en un container Docker. Tráfico muy variable, debe escalar a 0 cuando no hay requests. ¿Mejor servicio?",
          options: ["Compute Engine", "Cloud Run", "GKE Standard", "App Engine Flexible"],
          correct: 1,
          explanation:
            "Cloud Run cumple los 3 requisitos: corre containers, pay-per-request, escala a 0. App Engine Flex NO escala a 0. GKE necesita gestión adicional.",
        },
        {
          q: "Necesitas Windows Server con una licencia que exige hardware dedicado:",
          options: ["Cloud Run", "App Engine", "Compute Engine + Sole-tenant Nodes", "Cloud Functions"],
          correct: 2,
          explanation:
            "Sole-tenant Nodes ofrecen un servidor físico dedicado (no compartido), ideal para licencias por hardware o compliance que exija aislamiento físico.",
        },
        {
          q: "Una pequeña función que debe ejecutarse cada vez que se sube un archivo a Cloud Storage:",
          options: ["Compute Engine", "App Engine", "Cloud Functions (trigger Storage)", "GKE"],
          correct: 2,
          explanation:
            "Cloud Functions con trigger de Cloud Storage es el patrón clásico event-driven. Sin servidores que gestionar, escala automáticamente.",
        },
        {
          q: "Tu equipo experto en Kubernetes quiere microservicios con control total del cluster:",
          options: ["GKE Standard", "Cloud Run", "App Engine", "Cloud Functions"],
          correct: 0,
          explanation:
            "GKE Standard da control total sobre el cluster (node pools, networking, etc.). Ideal para equipos con expertise en K8s.",
        },
        {
          q: "GKE Autopilot se diferencia de Standard en que:",
          options: [
            "No usa containers",
            "Google gestiona los nodos por ti, cobro por pod",
            "Solo corre en us-east",
            "No tiene autoscaling",
          ],
          correct: 1,
          explanation:
            "En Autopilot, Google gestiona los nodos. Tú solo defines workloads y pagas por recursos pedidos por pod. Menos flexibilidad pero menos gestión.",
        },
        {
          q: "App Engine Flexible se diferencia de Standard principalmente en:",
          options: [
            "Solo Standard tiene auto-scale",
            "Flexible NO escala a 0 (mínimo 1 instancia)",
            "Standard usa containers",
            "Flexible es más caro siempre",
          ],
          correct: 1,
          explanation:
            "Standard escala a 0 (no pagas idle). Flexible siempre tiene mínimo 1 instancia. Flexible usa containers Docker custom; Standard usa sandboxed runtimes.",
        },
        {
          q: "Para una carga de batch que tolera interrupciones y quieres ahorrar al máximo:",
          options: ["VMs estándar", "Sole-tenant", "Spot VMs (hasta 91% off)", "Premium tier"],
          correct: 2,
          explanation:
            "Spot VMs son hasta 91% más baratas. GCP puede terminarlas con poco aviso, pero para batch tolerante a interrupciones es ideal.",
        },
        {
          q: "Confidential VMs ofrecen:",
          options: [
            "Mayor velocidad",
            "Encriptación EN USO (RAM cifrada con AMD SEV / Intel TDX)",
            "Mejor red",
            "Solo en US",
          ],
          correct: 1,
          explanation:
            "Las Confidential VMs encriptan la memoria RAM con tecnología de CPU (AMD SEV, Intel TDX), protegiendo datos incluso de un atacante con acceso al host.",
        },
        {
          q: "Para apps Kubernetes que deben correr ON-PREM y en GCP consistentemente:",
          options: ["Solo GKE", "Anthos", "Cloud Run", "App Engine"],
          correct: 1,
          explanation:
            "Anthos extiende GKE a on-prem (bare metal, VMware) y a otras nubes (AWS, Azure). Es la solución para escenarios híbridos/multi-cloud K8s.",
        },
        {
          q: "Una startup con webapp en Python con tráfico esporádico y quieren mínima gestión:",
          options: [
            "GKE Standard",
            "Compute Engine + nginx",
            "App Engine Standard o Cloud Run",
            "Solo on-prem",
          ],
          correct: 2,
          explanation:
            "App Engine Standard o Cloud Run son ideales: escala a 0 (no pagas idle), runtime Python sin gestionar OS, deploys muy simples.",
        },
        {
          q: "Servicios que escalan a 0:",
          options: ["Solo Compute Engine", "Cloud Run, App Engine Standard, Cloud Functions", "Solo GKE", "Ninguno"],
          correct: 1,
          explanation:
            "Cloud Run, App Engine Standard y Cloud Functions escalan a 0 (no pagas idle). Compute Engine NO escala a 0; pagas mientras está encendida.",
        },
        {
          q: "Quieres usar GPUs para entrenamiento de ML pero no quieres gestionar K8s:",
          options: [
            "Compute Engine con GPU",
            "Cloud Run",
            "App Engine Standard",
            "Cloud Functions",
          ],
          correct: 0,
          explanation:
            "Compute Engine soporta GPUs (familia A2/G2). Si quieres ML más alto nivel, también puedes usar Vertex AI Custom Training (que corre sobre la misma infra).",
        },
      ],
    },
  ],
};
