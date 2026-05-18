import type { ModuleData } from "@/types/course";

// Kubernetes V — Seguridad, Helm y Observabilidad.
// RBAC, ServiceAccounts, SecurityContext, Pod Security Standards, Helm, probes, limits, métricas, logs.
export const m6e: ModuleData = {
  slug: "m6e",
  number: 10,
  title: "Kubernetes V — Seguridad, Helm y Observabilidad",
  icon: "🛡️",
  intro:
    "Tenés tus apps corriendo, expuestas, con storage. Ahora viene la parte que separa amateurs de profesionales: ¿quién puede hacer qué en el cluster?, ¿cómo evito que un container hackeado tome el Node?, ¿cómo empaqueto todos mis YAMLs en algo reutilizable y versionado?, ¿cómo veo qué pasa cuando falla en producción a las 3am? RBAC + Pod Security + Helm + métricas/logs/traces. Este módulo cierra el ciclo.",
  totalActivities: 4,
  blocks: [
    // ============================================
    // PARTE 1 — RBAC
    // ============================================
    { kind: "h3", text: "🔑 PARTE 1 — RBAC: ¿quién puede hacer qué?" },
    {
      kind: "paragraph",
      html:
        "<strong>RBAC</strong> (Role-Based Access Control) controla qué acciones (verbs: get/list/create/delete/...) puede realizar cada identidad sobre qué recursos. Hay 4 objetos clave:",
    },
    {
      kind: "table",
      headers: ["Recurso", "Scope", "Qué define"],
      rows: [
        ["Role", "Un namespace", "Conjunto de permisos (verbs sobre recursos)"],
        ["ClusterRole", "Todo el cluster", "Permisos cluster-scoped o reutilizables en varios ns"],
        ["RoleBinding", "Un namespace", "Asigna un Role/ClusterRole a un sujeto"],
        ["ClusterRoleBinding", "Todo el cluster", "Asigna un ClusterRole globalmente"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Role: leer pods y logs en el ns 'dev'\napiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata: { namespace: dev, name: pod-reader }\nrules:\n  - apiGroups: [\"\"]\n    resources: [\"pods\", \"pods/log\"]\n    verbs: [\"get\", \"list\", \"watch\"]\n---\n# Asignárselo a un usuario\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata: { namespace: dev, name: dev-team-can-read }\nsubjects:\n  - kind: User\n    name: \"laura@empresa.com\"\n    apiGroup: rbac.authorization.k8s.io\nroleRef:\n  kind: Role\n  name: pod-reader\n  apiGroup: rbac.authorization.k8s.io</pre>",
    },
    { kind: "h4", text: "👤 ServiceAccount: identidad de los Pods" },
    {
      kind: "paragraph",
      html:
        "Cada Pod corre con una <strong>ServiceAccount</strong> (por defecto <code>default</code>). Si tu app habla con la API de K8s (operadores, dashboards) o con un cloud (IRSA en AWS, Workload Identity en GCP) le asignás una SA con permisos específicos. Principio: <em>least privilege</em>.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: v1\nkind: ServiceAccount\nmetadata: { name: ci-deployer, namespace: dev }\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata: { name: ci-can-deploy, namespace: dev }\nsubjects:\n  - kind: ServiceAccount\n    name: ci-deployer\n    namespace: dev\nroleRef:\n  kind: ClusterRole          # reutilizo un ClusterRole\n  name: edit                 # rol built-in: editar la mayoría de recursos\n  apiGroup: rbac.authorization.k8s.io\n---\n# Pod que la usa\nspec:\n  serviceAccountName: ci-deployer\n  containers: [...]</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Built-in ClusterRoles</strong> útiles: <code>view</code> (read-only), <code>edit</code> (lectura+modificación, no RBAC ni resourcequota), <code>admin</code> (todo en el ns), <code>cluster-admin</code> (Dios, evitalo).",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Auditar permisos: \"¿puedo hacer X?\"\nkubectl auth can-i create deployments -n dev\nkubectl auth can-i delete pods --as=laura@empresa.com -n prod\nkubectl auth can-i \"*\" \"*\" --as=system:serviceaccount:dev:ci-deployer</pre>",
    },

    // ============================================
    // PARTE 2 — SECURITY CONTEXT
    // ============================================
    { kind: "h3", text: "🛡️ PARTE 2 — SecurityContext y Pod Security Standards" },
    {
      kind: "paragraph",
      html:
        "Por defecto un container corre como root y con capacidades de Linux innecesarias. <strong>SecurityContext</strong> te permite endurecerlo a nivel Pod o container.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>spec:\n  securityContext:\n    runAsNonRoot: true\n    runAsUser: 1000\n    runAsGroup: 3000\n    fsGroup: 2000\n    seccompProfile: { type: RuntimeDefault }\n  containers:\n    - name: app\n      image: app:1.0\n      securityContext:\n        allowPrivilegeEscalation: false\n        readOnlyRootFilesystem: true\n        capabilities:\n          drop: [\"ALL\"]\n          add: [\"NET_BIND_SERVICE\"]</pre>",
    },
    { kind: "h4", text: "🏛️ Pod Security Standards (PSS)" },
    {
      kind: "paragraph",
      html:
        "Desde K8s 1.25 hay 3 perfiles oficiales que aplicás a un namespace con labels. Reemplazan al viejo PodSecurityPolicy.",
    },
    {
      kind: "table",
      headers: ["Perfil", "Qué permite"],
      rows: [
        ["privileged", "Sin restricciones (containers privilegiados)"],
        ["baseline", "Bloquea lo más peligroso (hostNetwork, privileged, capabilities raras)"],
        ["restricted", "Hardening fuerte: non-root, readOnlyRoot, drop capabilities, seccomp default"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Forzar 'restricted' en el ns 'prod' (warn en stg)\nkubectl label ns prod \\\n  pod-security.kubernetes.io/enforce=restricted \\\n  pod-security.kubernetes.io/audit=restricted \\\n  pod-security.kubernetes.io/warn=restricted</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Tools que ayudan</strong>: <code>kubescape</code>, <code>trivy</code>, <code>kube-bench</code>, <code>polaris</code> auditan tu cluster contra estándares (CIS, NSA). Corrélos en CI.",
    },

    // ============================================
    // PARTE 3 — PROBES Y LÍMITES
    // ============================================
    { kind: "h3", text: "🩺 PARTE 3 — Probes, recursos y QoS" },
    {
      kind: "table",
      headers: ["Probe", "Para qué"],
      rows: [
        ["startupProbe", "App tarda en arrancar (Java, .NET). Hasta que pase, no se ejecutan las otras."],
        ["readinessProbe", "¿Listo para recibir tráfico? Si falla, sale del Service."],
        ["livenessProbe", "¿Sigue vivo? Si falla N veces, lo reinicia."],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>containers:\n  - name: api\n    image: api:1.0\n    startupProbe:\n      httpGet: { path: /healthz, port: 3000 }\n      failureThreshold: 30\n      periodSeconds: 5\n    readinessProbe:\n      httpGet: { path: /ready, port: 3000 }\n      periodSeconds: 5\n    livenessProbe:\n      httpGet: { path: /healthz, port: 3000 }\n      periodSeconds: 10\n      timeoutSeconds: 2\n      failureThreshold: 3\n    resources:\n      requests: { cpu: \"100m\", memory: \"128Mi\" }   # garantizado\n      limits:   { cpu: \"500m\", memory: \"512Mi\" }   # tope; CPU se throttlea, RAM se OOMkillea</pre>",
    },
    { kind: "h4", text: "📊 QoS class según requests/limits" },
    {
      kind: "table",
      headers: ["Clase", "Cuándo se aplica", "Quién muere primero si falta RAM"],
      rows: [
        ["Guaranteed", "requests == limits para CPU y RAM en TODOS los containers", "Último en morir"],
        ["Burstable", "Tiene requests pero != limits (o sólo uno)", "Intermedio"],
        ["BestEffort", "Sin requests ni limits", "Primero en morir"],
      ],
    },

    // ============================================
    // PARTE 4 — HELM
    // ============================================
    { kind: "h3", text: "⛵ PARTE 4 — Helm: el package manager de K8s" },
    {
      kind: "paragraph",
      html:
        "Mantener decenas de YAMLs a mano (uno por entorno) escala mal. <strong>Helm</strong> los empaqueta en <strong>charts</strong> con plantillas (Go templates) y un <code>values.yaml</code> por entorno. Un <strong>release</strong> es una instalación concreta del chart en un cluster.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>mi-chart/\n├── Chart.yaml          # nombre, versión, deps\n├── values.yaml         # defaults\n├── values-prod.yaml    # overrides por entorno\n├── templates/\n│   ├── deployment.yaml\n│   ├── service.yaml\n│   ├── ingress.yaml\n│   ├── configmap.yaml\n│   └── _helpers.tpl    # funciones reutilizables\n└── charts/             # subcharts (deps)</pre>",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Comandos esenciales\nhelm repo add bitnami https://charts.bitnami.com/bitnami\nhelm search repo postgres\nhelm install pg bitnami/postgresql -n data --create-namespace \\\n  -f values-prod.yaml --set auth.postgresPassword=$PG_PASS\n\nhelm list -A\nhelm status pg -n data\nhelm upgrade pg bitnami/postgresql -n data -f values-prod.yaml\nhelm rollback pg 1 -n data\nhelm uninstall pg -n data\n\n# Tu propio chart\nhelm create mi-app\nhelm lint .\nhelm template release-test . -f values-stg.yaml   # dry-render local\nhelm install dev . -f values-dev.yaml</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Alternativas modernas</strong>: <code>kustomize</code> (built-in en kubectl, sin templating, sólo overlays) y <code>Argo CD</code>/<code>Flux</code> para GitOps (lo que está en Git es lo que vive en el cluster).",
    },

    // ============================================
    // PARTE 5 — OBSERVABILIDAD
    // ============================================
    { kind: "h3", text: "🔭 PARTE 5 — Observabilidad: métricas, logs y traces" },
    {
      kind: "paragraph",
      html:
        "Los 3 pilares: <strong>métricas</strong> (números en el tiempo), <strong>logs</strong> (eventos textuales), <strong>traces</strong> (camino de una request entre servicios). Cada uno responde una pregunta distinta.",
    },
    {
      kind: "table",
      headers: ["Pilar", "Pregunta que responde", "Stack típico en K8s"],
      rows: [
        ["Métricas", "¿Está saludable? ¿Cuánto consume? ¿Está creciendo?", "Prometheus + Grafana"],
        ["Logs", "¿Qué pasó exactamente en ese error?", "Loki / ELK / OpenSearch + Promtail/Fluent Bit"],
        ["Traces", "¿Dónde se gastó el tiempo de esta request?", "OpenTelemetry + Jaeger / Tempo"],
      ],
    },
    { kind: "h4", text: "📈 Métricas: el ecosistema Prometheus" },
    {
      kind: "list",
      items: [
        "<strong>metrics-server</strong>: alimenta <code>kubectl top</code> y el HPA. Casi obligatorio.",
        "<strong>kube-state-metrics</strong>: expone el estado de los recursos K8s como métricas (cuántos Pods Pending, restarts, etc.).",
        "<strong>node-exporter</strong>: métricas del Node (CPU, RAM, disco, red).",
        "<strong>Prometheus Operator</strong> (kube-prometheus-stack): instala Prometheus + Alertmanager + Grafana + dashboards listos.",
        "<strong>ServiceMonitor / PodMonitor</strong>: CRDs para decirle a Prometheus de dónde scrapear.",
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Comandos día a día\nkubectl top nodes\nkubectl top pods -A --sort-by=cpu\nkubectl top pods -A --sort-by=memory</pre>",
    },
    { kind: "h4", text: "📜 Logs centralizados" },
    {
      kind: "paragraph",
      html:
        "Cada container escribe a stdout/stderr; kubelet lo guarda en el Node. Si el Pod muere, los logs se pierden. Solución: un <strong>DaemonSet</strong> con Fluent Bit / Promtail que envía a Loki / Elastic / Cloud (CloudWatch, GCP Logging).",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Logs ad-hoc\nkubectl logs deploy/api\nkubectl logs -f -l app=api --max-log-requests=10\nkubectl logs --previous mi-pod          # logs del container anterior (crash)\nkubectl logs mi-pod -c sidecar          # container específico</pre>",
    },
    { kind: "h4", text: "🔗 Traces y service mesh" },
    {
      kind: "list",
      items: [
        "<strong>OpenTelemetry</strong>: estándar para instrumentar tu código y enviar traces/metrics/logs.",
        "<strong>Jaeger / Tempo</strong>: backend de traces, UI de cascada por request.",
        "<strong>Service Mesh (Istio, Linkerd, Cilium)</strong>: te da tracing, mTLS y métricas L7 sin tocar el código de la app, vía sidecars o eBPF.",
      ],
    },

    // ============================================
    // PARTE 6 — TROUBLESHOOTING DECÁLOGO
    // ============================================
    { kind: "h3", text: "🚑 PARTE 6 — Decálogo de troubleshooting" },
    {
      kind: "list",
      items: [
        "<strong>1.</strong> <code>kubectl describe pod X</code> — eventos al fondo te dicen casi todo.",
        "<strong>2.</strong> <code>kubectl logs X --previous</code> — si crashea en loop, mirá el run anterior.",
        "<strong>3.</strong> ¿ImagePullBackOff? Imagen mal nombrada o registry privado sin imagePullSecret.",
        "<strong>4.</strong> ¿CrashLoopBackOff? La app revienta al arrancar; mirá logs y env vars.",
        "<strong>5.</strong> ¿OOMKilled? Subí <code>resources.limits.memory</code> o arreglá la fuga.",
        "<strong>6.</strong> ¿Pending? <code>describe</code> dice si es scheduling (no hay Node), PVC sin bind, taints.",
        "<strong>7.</strong> ¿Service no responde? Mirá endpoints (selector + labels).",
        "<strong>8.</strong> ¿Ingress 404? <code>describe ingress</code> y log del controller.",
        "<strong>9.</strong> ¿Permisos? <code>kubectl auth can-i ... --as=...</code>.",
        "<strong>10.</strong> Si nada, <code>kubectl get events -A --sort-by=.lastTimestamp | tail -30</code>.",
      ],
    },

    // ============================================
    // PARTE 7 — EJERCICIOS
    // ============================================
    { kind: "h3", text: "✍️ PARTE 7 — Cerrá el módulo con todo" },
    {
      kind: "fillBlanks",
      key: "m6e_fill",
      items: [
        { text: "El sistema de permisos basado en roles se llama ___.", answer: "RBAC", es: "RBAC" },
        { text: "La identidad con la que corre un Pod es una ___.", answer: "ServiceAccount", es: "ServiceAccount" },
        { text: "El package manager de Kubernetes se llama ___.", answer: "Helm", es: "Helm" },
        { text: "La probe que reinicia al container si falla es la ___ probe.", answer: "liveness", es: "liveness" },
        { text: "La probe que saca al Pod del Service si falla es la ___ probe.", answer: "readiness", es: "readiness" },
        { text: "El sistema de métricas más usado se llama ___.", answer: "Prometheus", es: "Prometheus" },
        { text: "El nivel más estricto de Pod Security Standards es ___.", answer: "restricted", es: "restricted" },
        { text: "Un chart instalado en un cluster se llama ___.", answer: "release", es: "release" },
      ],
    },
    {
      kind: "matching",
      key: "m6e_matching",
      pairs: [
        { en: "Role", es: "Permisos en un namespace" },
        { en: "ClusterRole", es: "Permisos a nivel cluster" },
        { en: "RoleBinding", es: "Asocia sujetos a un Role" },
        { en: "ServiceAccount", es: "Identidad de los Pods" },
        { en: "SecurityContext", es: "Hardening del Pod/container" },
        { en: "PSS restricted", es: "Perfil más estricto" },
        { en: "Helm Chart", es: "Paquete reutilizable de manifests" },
        { en: "Helm Release", es: "Instalación concreta del chart" },
        { en: "Prometheus", es: "Métricas time-series" },
        { en: "Loki / ELK", es: "Logs centralizados" },
        { en: "Jaeger / Tempo", es: "Traces distribuidos" },
        { en: "OpenTelemetry", es: "Instrumentación estándar" },
      ],
    },
    {
      kind: "quiz",
      key: "m6e_quiz",
      questions: [
        {
          q: "Querés dar permisos de lectura SOLO en el ns 'dev' a un usuario. Combinación correcta:",
          options: [
            "ClusterRole + ClusterRoleBinding",
            "Role en 'dev' + RoleBinding en 'dev'",
            "Sólo un Secret",
            "Sólo una NetworkPolicy",
          ],
          correct: 1,
        },
        {
          q: "El Pod habla con la API del cluster. ¿Qué le asignás?",
          options: ["Un Secret tipo TLS", "Una ServiceAccount con su RoleBinding", "Un PVC", "Un Ingress"],
          correct: 1,
        },
        {
          q: "Para correr como non-root en el container correcto poner…",
          options: [
            "securityContext.runAsNonRoot=true y runAsUser ≥ 1",
            "Un ConfigMap",
            "kubelet --no-root",
            "Un DaemonSet",
          ],
          correct: 0,
        },
        {
          q: "¿Cuál NO es un perfil de Pod Security Standards?",
          options: ["privileged", "baseline", "restricted", "hardened"],
          correct: 3,
        },
        {
          q: "Para que el HPA funcione, necesitás…",
          options: [
            "Sólo Ingress",
            "metrics-server + resources.requests en los containers",
            "Helm",
            "Una NetworkPolicy",
          ],
          correct: 1,
        },
        {
          q: "Tu Pod muere en loop por OOMKilled. La causa más probable es…",
          options: [
            "Falta de Ingress",
            "Memory limit demasiado bajo o fuga de memoria",
            "RBAC mal configurado",
            "DNS",
          ],
          correct: 1,
        },
        {
          q: "Un release de Helm es…",
          options: [
            "Un YAML",
            "El paquete de templates",
            "Una instalación concreta de un chart en un cluster",
            "Un Ingress",
          ],
          correct: 2,
        },
        {
          q: "Querés tracing distribuido entre microservicios. ¿Stack típico?",
          options: ["Prometheus + Grafana", "OpenTelemetry + Jaeger/Tempo", "Loki + Promtail", "etcd + kubelet"],
          correct: 1,
        },
        {
          q: "Para hacer GitOps (lo que está en Git = lo que vive en el cluster), herramientas comunes son…",
          options: ["Argo CD / Flux", "kubelet / kube-proxy", "etcd / scheduler", "ConfigMap / Secret"],
          correct: 0,
        },
        {
          q: "El primer comando que ejecutás cuando un Pod no arranca es…",
          options: [
            "kubectl delete pod",
            "kubectl describe pod (mirar Events)",
            "kubectl rollout undo",
            "helm uninstall",
          ],
          correct: 1,
        },
      ],
    },
  ],
};
