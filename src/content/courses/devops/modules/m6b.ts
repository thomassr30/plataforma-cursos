import type { ModuleData } from "@/types/course";

// Kubernetes II — Workloads (controllers que gestionan Pods).
// Deployment, ReplicaSet, DaemonSet, StatefulSet, Job, CronJob, HPA.
export const m6b: ModuleData = {
  slug: "m6b",
  number: 7,
  title: "Kubernetes II — Workloads: Deployments, StatefulSets, Jobs y Autoscaling",
  icon: "🚀",
  intro:
    "Los Pods son la célula, pero en producción no creás Pods sueltos: usás controllers que los crean, replican y reemplazan automáticamente. Aquí dominás Deployments (rolling updates, rollbacks), DaemonSets, StatefulSets (para bases de datos), Jobs/CronJobs (tareas batch) y el Horizontal Pod Autoscaler. Cada workload tiene su uso específico — saber cuál elegir es el 80% del trabajo.",
  totalActivities: 4,
  blocks: [
    // ============================================
    // PARTE 1 — ¿POR QUÉ NO CREAMOS PODS SUELTOS?
    // ============================================
    { kind: "h3", text: "🧠 PARTE 1 — Workloads: qué son y por qué importan" },
    {
      kind: "paragraph",
      html:
        "Un <strong>Workload</strong> en K8s es cualquier <em>controller</em> que gestiona Pods por vos: los crea, los multiplica, los reemplaza si caen, los rota cuando hay updates. Si creás un Pod a mano (<code>kind: Pod</code>) y muere, NADIE lo levanta. Los workloads existen para garantizarte el estado deseado en el tiempo.",
    },
    {
      kind: "table",
      headers: ["Workload", "Cuándo usarlo", "Identidad de Pods", "Storage"],
      rows: [
        ["Deployment", "Apps stateless (APIs, frontends, workers)", "Intercambiables (nombres aleatorios)", "Volúmenes efímeros o compartidos"],
        ["ReplicaSet", "Bajo el capó del Deployment", "Igual que Deployment", "Igual"],
        ["DaemonSet", "Un Pod por Node (log shipper, monitoreo, CNI)", "Pegado al Node", "Suele montar hostPath"],
        ["StatefulSet", "Apps stateful (DBs, Kafka, ElasticSearch)", "Estable y ordenada (pod-0, pod-1)", "PVC por réplica"],
        ["Job", "Tareas que terminan (migraciones, batch)", "N/A — corre hasta éxito", "Opcional"],
        ["CronJob", "Tareas programadas", "Genera Jobs", "Igual que Job"],
      ],
    },

    // ============================================
    // PARTE 2 — DEPLOYMENT (EL REY)
    // ============================================
    { kind: "h3", text: "🛠️ PARTE 2 — Deployment: el caballo de batalla" },
    {
      kind: "paragraph",
      html:
        "El <strong>Deployment</strong> es el workload que vas a usar el 80% del tiempo. Por dentro crea un <strong>ReplicaSet</strong> que crea los Pods. Vos gestionás el Deployment, no los Pods ni el RS.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>" +
        "  Deployment  ──crea──►  ReplicaSet v1  ──crea──►  Pod-aaa, Pod-bbb, Pod-ccc\n" +
        "      │\n" +
        "  (al cambiar imagen)\n" +
        "      ▼\n" +
        "  ReplicaSet v2  ──crea──►  Pod-xxx, Pod-yyy, Pod-zzz   (RS v1 escala a 0)\n" +
        "</pre>",
    },
    { kind: "h4", text: "📝 Deployment YAML comentado" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: api\n  labels: { app: api }\nspec:\n  replicas: 3                   # cuántos Pods quiero\n  revisionHistoryLimit: 10      # cuántos ReplicaSets viejos guardar (para rollback)\n  strategy:\n    type: RollingUpdate         # o Recreate\n    rollingUpdate:\n      maxUnavailable: 1         # cuántos pueden estar abajo durante el rollout\n      maxSurge: 1               # cuántos extras puede crear durante el rollout\n  selector:\n    matchLabels: { app: api }   # debe matchear template.metadata.labels\n  template:                     # plantilla del Pod\n    metadata:\n      labels: { app: api }\n    spec:\n      containers:\n        - name: api\n          image: ghcr.io/empresa/api:1.4.0\n          ports: [{ containerPort: 3000 }]\n          env:\n            - name: NODE_ENV\n              value: production\n          resources:\n            requests: { cpu: \"100m\", memory: \"128Mi\" }\n            limits:   { cpu: \"500m\", memory: \"512Mi\" }\n          readinessProbe:\n            httpGet: { path: \"/health\", port: 3000 }\n            periodSeconds: 5\n          livenessProbe:\n            httpGet: { path: \"/health\", port: 3000 }\n            periodSeconds: 10</pre>",
    },
    { kind: "h4", text: "🔄 Estrategias de update" },
    {
      kind: "table",
      headers: ["Estrategia", "Cómo funciona", "Pros / Contras"],
      rows: [
        ["RollingUpdate (default)", "Reemplaza Pods de a poco respetando maxUnavailable/maxSurge", "✅ Sin downtime. ❌ Conviven 2 versiones durante el rollout."],
        ["Recreate", "Mata TODOS los Pods y luego crea los nuevos", "✅ No conviven versiones. ❌ Downtime."],
      ],
    },
    { kind: "h4", text: "🎯 Comandos clave de un Deployment" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Aplicar y vigilar\nkubectl apply -f api.yaml\nkubectl rollout status deploy/api\nkubectl get deploy,rs,pod -l app=api\n\n# Cambiar imagen sin tocar YAML (no recomendado en prod, pero útil en dev)\nkubectl set image deploy/api api=ghcr.io/empresa/api:1.5.0\n\n# Historial de revisiones y diff\nkubectl rollout history deploy/api\nkubectl rollout history deploy/api --revision=3\n\n# Rollback a la revisión anterior (o a una específica)\nkubectl rollout undo deploy/api\nkubectl rollout undo deploy/api --to-revision=2\n\n# Pausar / reanudar un rollout en curso\nkubectl rollout pause deploy/api\nkubectl rollout resume deploy/api\n\n# Escalar manualmente\nkubectl scale deploy/api --replicas=5</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Anota el motivo del cambio</strong>: usá <code>kubernetes.io/change-cause</code> en una annotation o el flag <code>--record</code> (deprecated) para que <code>rollout history</code> muestre por qué cambiaste algo.",
    },

    // ============================================
    // PARTE 3 — DaemonSet
    // ============================================
    { kind: "h3", text: "🛡️ PARTE 3 — DaemonSet: un Pod por Node" },
    {
      kind: "paragraph",
      html:
        "Un <strong>DaemonSet</strong> garantiza que un Pod corra en CADA Node (o en un subconjunto seleccionado por labels). Cuando entra un Node nuevo, le pone su Pod automáticamente. Casos típicos:",
    },
    {
      kind: "list",
      items: [
        "<strong>Log shippers</strong>: Fluent Bit, Fluentd, Promtail recolectando logs del Node.",
        "<strong>Métricas de Node</strong>: node-exporter, cAdvisor.",
        "<strong>Agentes de seguridad</strong>: Falco, antivirus.",
        "<strong>CNI / kube-proxy</strong>: muchos componentes del propio cluster.",
        "<strong>Storage agents</strong>: drivers CSI distribuidos.",
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: apps/v1\nkind: DaemonSet\nmetadata:\n  name: node-exporter\nspec:\n  selector:\n    matchLabels: { app: node-exporter }\n  template:\n    metadata:\n      labels: { app: node-exporter }\n    spec:\n      hostNetwork: true\n      tolerations:\n        - operator: \"Exists\"        # corre incluso en Nodes con taints\n      containers:\n        - name: exporter\n          image: prom/node-exporter:v1.8.2\n          ports: [{ containerPort: 9100 }]</pre>",
    },

    // ============================================
    // PARTE 4 — StatefulSet
    // ============================================
    { kind: "h3", text: "🗄️ PARTE 4 — StatefulSet: para apps con identidad" },
    {
      kind: "paragraph",
      html:
        "Cuando tu app necesita <strong>identidad estable</strong> (mismo nombre de Pod, misma IP DNS, mismo volumen <em>aunque se reinicie</em>), usás un <strong>StatefulSet</strong>. Es lo que necesitan bases de datos, brokers, sistemas de quorum.",
    },
    {
      kind: "table",
      headers: ["Característica", "Deployment", "StatefulSet"],
      rows: [
        ["Nombres de Pods", "api-7b8c-xyz (aleatorio)", "db-0, db-1, db-2 (ordenados)"],
        ["DNS por Pod", "No", "<code>db-0.db.ns.svc.cluster.local</code>"],
        ["Orden de arranque", "Paralelo", "Secuencial (0 → 1 → 2)"],
        ["Storage por Pod", "Compartido o efímero", "PVC propio y persistente"],
        ["Caso típico", "API REST, frontend, worker", "PostgreSQL, MongoDB, Kafka, etcd"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: postgres\nspec:\n  serviceName: postgres        # Headless Service (clusterIP: None) — requerido\n  replicas: 3\n  selector:\n    matchLabels: { app: postgres }\n  template:\n    metadata:\n      labels: { app: postgres }\n    spec:\n      containers:\n        - name: postgres\n          image: postgres:16\n          env:\n            - { name: POSTGRES_PASSWORD, value: \"changeme\" }\n          ports: [{ containerPort: 5432 }]\n          volumeMounts:\n            - { name: data, mountPath: /var/lib/postgresql/data }\n  volumeClaimTemplates:        # un PVC POR Pod (postgres-0, postgres-1, ...)\n    - metadata: { name: data }\n      spec:\n        accessModes: [\"ReadWriteOnce\"]\n        resources: { requests: { storage: 10Gi } }</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>⚠️ Stateful no es magia</strong>: el StatefulSet te da identidad y storage, pero <em>NO</em> hace replicación de datos. Si necesitás HA real (failover), igual te toca configurar la app (Patroni, replicaset de Mongo, etc.) — o usar un Operator que lo haga por vos (CrunchyData, Strimzi).",
    },

    // ============================================
    // PARTE 5 — Job y CronJob
    // ============================================
    { kind: "h3", text: "⏱️ PARTE 5 — Job y CronJob: trabajos batch" },
    {
      kind: "paragraph",
      html:
        "Un <strong>Job</strong> es un Pod que se ejecuta hasta finalizar con éxito. Sirve para tareas que NO son servicios: migraciones, generar reportes, importar datos.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: batch/v1\nkind: Job\nmetadata: { name: migrate-db }\nspec:\n  backoffLimit: 4              # reintentos máximos si falla\n  ttlSecondsAfterFinished: 600 # se limpia solo a los 10 min\n  template:\n    spec:\n      restartPolicy: OnFailure\n      containers:\n        - name: migrator\n          image: ghcr.io/empresa/migrator:1.0\n          command: [\"npm\", \"run\", \"migrate\"]</pre>",
    },
    { kind: "h4", text: "🗓️ CronJob: Job programado" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: batch/v1\nkind: CronJob\nmetadata: { name: backup-nightly }\nspec:\n  schedule: \"0 3 * * *\"            # cron estándar: todos los días a las 3am\n  successfulJobsHistoryLimit: 3\n  failedJobsHistoryLimit: 1\n  concurrencyPolicy: Forbid        # no permitir solapamiento\n  jobTemplate:\n    spec:\n      template:\n        spec:\n          restartPolicy: OnFailure\n          containers:\n            - name: backup\n              image: ghcr.io/empresa/backup:1.2\n              args: [\"--bucket\", \"s3://backups\"]</pre>",
    },
    {
      kind: "table",
      headers: ["concurrencyPolicy", "Comportamiento"],
      rows: [
        ["Allow (default)", "Pueden correr varios Jobs a la vez"],
        ["Forbid", "Si el anterior aún corre, se cancela el nuevo"],
        ["Replace", "Si el anterior aún corre, se mata y arranca el nuevo"],
      ],
    },

    // ============================================
    // PARTE 6 — HPA Y AUTOSCALING
    // ============================================
    { kind: "h3", text: "📈 PARTE 6 — Horizontal Pod Autoscaler (HPA)" },
    {
      kind: "paragraph",
      html:
        "El <strong>HPA</strong> ajusta automáticamente el número de réplicas de un Deployment/StatefulSet según CPU, RAM o métricas custom. Requiere tener <strong>metrics-server</strong> instalado en el cluster.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata: { name: api-hpa }\nspec:\n  scaleTargetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: api\n  minReplicas: 2\n  maxReplicas: 20\n  metrics:\n    - type: Resource\n      resource:\n        name: cpu\n        target: { type: Utilization, averageUtilization: 70 }\n    - type: Resource\n      resource:\n        name: memory\n        target: { type: Utilization, averageUtilization: 80 }\n  behavior:\n    scaleDown:\n      stabilizationWindowSeconds: 300   # no bajar antes de 5min\n    scaleUp:\n      stabilizationWindowSeconds: 0     # subir inmediato</pre>",
    },
    { kind: "h4", text: "⚙️ Hermanos del HPA" },
    {
      kind: "table",
      headers: ["Autoscaler", "Qué escala"],
      rows: [
        ["HPA (Horizontal Pod Autoscaler)", "Número de réplicas de Pods"],
        ["VPA (Vertical Pod Autoscaler)", "Recursos (CPU/RAM) asignados a cada Pod"],
        ["Cluster Autoscaler", "Cantidad de Nodes (agrega/quita máquinas)"],
        ["KEDA", "Escala por eventos (Kafka lag, SQS, cron, etc.)"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>⚠️ Para que el HPA funcione</strong> los containers DEBEN tener <code>resources.requests</code> definidos, si no, K8s no puede calcular porcentajes de utilización.",
    },

    // ============================================
    // PARTE 7 — RESILIENCIA
    // ============================================
    { kind: "h3", text: "🛡️ PARTE 7 — PodDisruptionBudget y afinidad" },
    {
      kind: "paragraph",
      html:
        "Un <strong>PodDisruptionBudget (PDB)</strong> protege tu app durante <em>disrupciones voluntarias</em> (drenar un Node, upgrade del cluster). Define cuántas réplicas DEBEN seguir vivas.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: policy/v1\nkind: PodDisruptionBudget\nmetadata: { name: api-pdb }\nspec:\n  minAvailable: 2          # también podés usar maxUnavailable\n  selector:\n    matchLabels: { app: api }</pre>",
    },
    {
      kind: "paragraph",
      html:
        "<strong>Afinidad y anti-afinidad</strong> te dejan controlar dónde se colocan los Pods: \"que las réplicas no estén en el mismo Node\", \"corré cerca del cache\", \"sólo en Nodes con GPU\".",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>spec:\n  affinity:\n    podAntiAffinity:\n      preferredDuringSchedulingIgnoredDuringExecution:\n        - weight: 100\n          podAffinityTerm:\n            labelSelector:\n              matchLabels: { app: api }\n            topologyKey: \"kubernetes.io/hostname\"\n  tolerations:\n    - key: \"gpu\"\n      operator: \"Equal\"\n      value: \"true\"\n      effect: \"NoSchedule\"\n  nodeSelector:\n    disktype: ssd</pre>",
    },

    // ============================================
    // PARTE 8 — EJERCICIOS
    // ============================================
    { kind: "h3", text: "✍️ PARTE 8 — Practicá lo que aprendiste" },
    {
      kind: "fillBlanks",
      key: "m6b_fill",
      items: [
        { text: "El controller que crea un ReplicaSet por debajo se llama ___.", answer: "deployment", es: "deployment" },
        { text: "Para apps con identidad estable y storage propio se usa un ___.", answer: "statefulset", es: "statefulset" },
        { text: "Una tarea programada periódicamente es un ___.", answer: "cronjob", es: "cronjob" },
        { text: "Para correr un Pod en cada Node usás un ___.", answer: "daemonset", es: "daemonset" },
        { text: "El autoscaler que cambia el número de réplicas se abrevia ___.", answer: "hpa", es: "hpa" },
        { text: "Para volver atrás a la versión anterior: kubectl rollout ___ deploy/api", answer: "undo", es: "undo" },
        { text: "Estrategia que mata todos los Pods antes de crear los nuevos: ___.", answer: "recreate", es: "recreate" },
        { text: "El recurso que protege contra disrupciones voluntarias se llama ___.", answer: "pdb", es: "pdb" },
      ],
    },
    {
      kind: "matching",
      key: "m6b_matching",
      pairs: [
        { en: "Deployment", es: "Apps stateless con rolling update" },
        { en: "StatefulSet", es: "Bases de datos, pods ordenados" },
        { en: "DaemonSet", es: "Un Pod por Node" },
        { en: "Job", es: "Tarea que termina" },
        { en: "CronJob", es: "Tarea programada" },
        { en: "HPA", es: "Escala réplicas por CPU/RAM" },
        { en: "VPA", es: "Ajusta recursos del Pod" },
        { en: "Cluster Autoscaler", es: "Agrega o quita Nodes" },
        { en: "KEDA", es: "Escalado por eventos externos" },
        { en: "PDB", es: "Protección durante drenar Nodes" },
      ],
    },
    {
      kind: "quiz",
      key: "m6b_quiz",
      questions: [
        {
          q: "Tu app es una API REST con 3 réplicas idénticas. ¿Qué workload usás?",
          options: ["StatefulSet", "Deployment", "DaemonSet", "Job"],
          correct: 1,
        },
        {
          q: "Querés correr un agente de logs en TODOS los Nodes. ¿Qué workload?",
          options: ["Deployment con replicas=N", "DaemonSet", "StatefulSet", "CronJob"],
          correct: 1,
        },
        {
          q: "Tu DB necesita que el Pod siempre se llame igual y conserve sus datos. ¿Qué workload?",
          options: ["Deployment", "StatefulSet", "Job", "DaemonSet"],
          correct: 1,
        },
        {
          q: "Necesitás generar un reporte una vez por noche. ¿Qué workload?",
          options: ["Deployment", "CronJob", "DaemonSet", "StatefulSet"],
          correct: 1,
        },
        {
          q: "El HPA necesita ABSOLUTAMENTE…",
          options: [
            "Una NetworkPolicy",
            "metrics-server y resources.requests en los containers",
            "Un Ingress configurado",
            "Que el cluster sea EKS",
          ],
          correct: 1,
        },
        {
          q: "RollingUpdate con maxSurge=1 y maxUnavailable=0 sobre 3 réplicas significa…",
          options: [
            "Tira todos y crea los nuevos",
            "Siempre habrá entre 3 y 4 Pods durante el rollout, sin downtime",
            "Sólo actualiza 1 Pod al mes",
            "Reinicia el Node",
          ],
          correct: 1,
        },
        {
          q: "¿Cuál NO es una concurrencyPolicy válida en CronJob?",
          options: ["Allow", "Forbid", "Replace", "Cancel"],
          correct: 3,
        },
        {
          q: "Un PDB con minAvailable=2 y 3 réplicas, durante un drenado de Nodes…",
          options: [
            "Permite tirar 0 Pods",
            "Permite tirar 1 Pod a la vez (manteniendo 2 vivos)",
            "Permite tirar los 3",
            "No tiene efecto sin Ingress",
          ],
          correct: 1,
        },
        {
          q: "Para que las 3 réplicas de tu Deployment se distribuyan en Nodes distintos usás…",
          options: ["podAntiAffinity con topologyKey hostname", "nodeSelector solo", "StatefulSet", "DaemonSet"],
          correct: 0,
        },
        {
          q: "Por dentro un Deployment crea un…",
          options: ["Pod directamente", "ReplicaSet que crea los Pods", "DaemonSet", "Job"],
          correct: 1,
        },
      ],
    },
  ],
};
