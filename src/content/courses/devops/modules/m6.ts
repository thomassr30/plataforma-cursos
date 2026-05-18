import type { ModuleData } from "@/types/course";

// Kubernetes I - Fundamentos desde cero.
export const m6: ModuleData = {
  slug: "m6",
  number: 6,
  title: "Kubernetes I - Fundamentos desde Cero",
  icon: "K",
  intro:
    "Kubernetes (K8s) es el sistema operativo de la infraestructura moderna: orquesta containers en produccion, los escala, los recupera si caen, los expone al trafico y los actualiza sin downtime. En este modulo arrancamos desde cero: que problema resuelve, como esta construido por dentro, que es un Pod, como se habla con el cluster usando kubectl, y vas a desplegar tu primer Pod a mano.",
  totalActivities: 4,
  blocks: [
    { kind: "h3", text: "PARTE 1 - Por que existe Kubernetes?" },
    {
      kind: "paragraph",
      html:
        "Antes de tocar un solo YAML, hay que entender el <strong>problema</strong>. Los containers (Docker) son geniales para empaquetar apps, pero por si solos no resuelven produccion: quien los reinicia si caen?, quien los escala cuando hay carga?, quien los despliega sin tirar el servicio?, quien enruta el trafico?, quien les inyecta configuracion y secretos?, quien los reparte entre varios servidores?. Hacer todo eso a mano con bash y systemd es <em>posible</em>, pero a partir de 10 containers y 2 servidores se vuelve un infierno operacional.",
    },
    {
      kind: "info",
      html:
        "<strong>Kubernetes</strong> nacio en Google (2014, basado en su sistema interno <em>Borg</em>) precisamente para resolver eso: declaras <em>que</em> queres correr (\"3 replicas de mi app, expuesta en el puerto 80, con esta config\") y K8s se encarga del <em>como</em>: levantarlas, distribuirlas entre maquinas, reiniciarlas si mueren, reemplazarlas en una actualizacion, balancear el trafico, etc.",
    },
    { kind: "h4", text: "Container vs Pod vs VM" },
    {
      kind: "table",
      headers: ["Concepto", "Que incluye", "Aislamiento", "Arranca en"],
      rows: [
        ["Maquina fisica", "Hardware completo", "Total", "Minutos"],
        ["VM (virtual machine)", "OS completo (kernel propio)", "Fuerte (hypervisor)", "Decenas de segundos"],
        ["Container (Docker)", "App + libs (comparte kernel del host)", "Procesos (namespaces + cgroups)", "Milisegundos"],
        ["Pod (Kubernetes)", "1 o mas containers que comparten red y storage", "El de los containers", "Segundos"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>Idea clave</strong>: Kubernetes <em>no</em> reemplaza a Docker, lo <em>orquesta</em>. Docker arma la imagen, Kubernetes decide donde, cuantas y como correrla.",
    },
    { kind: "h4", text: "Lo que K8s te da out-of-the-box" },
    {
      kind: "list",
      items: [
        "<strong>Self-healing</strong>: si un Pod muere, lo levanta de nuevo automaticamente.",
        "<strong>Escalado horizontal</strong>: agregar/quitar replicas con un comando o automaticamente segun CPU/RAM.",
        "<strong>Rolling updates y rollbacks</strong>: actualizar sin downtime y volver atras en segundos si algo rompe.",
        "<strong>Service discovery + load balancing</strong>: tus servicios se descubren entre si por nombre DNS interno.",
        "<strong>Gestion declarativa</strong>: describis el estado deseado, K8s converge hacia el (reconciliation loop).",
        "<strong>Secret y config management</strong>: sin hardcodear passwords ni endpoints en la imagen.",
        "<strong>Storage orquestado</strong>: monta volumenes locales, NFS, EBS, GCE PD, etc., bajo demanda.",
        "<strong>Batch + cron</strong>: tareas puntuales (Jobs) y programadas (CronJobs).",
      ],
    },

    { kind: "h3", text: "PARTE 2 - Arquitectura del cluster" },
    {
      kind: "paragraph",
      html:
        "Un <strong>cluster</strong> de Kubernetes es un grupo de maquinas (fisicas o virtuales) que trabajan en conjunto. Cada maquina se llama <strong>Node</strong>. Los nodos se dividen en dos grupos: los del <strong>Control Plane</strong> (el cerebro) y los <strong>Workers</strong> (donde corren tus apps).",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>CONTROL PLANE\n  kube-apiserver  &lt;-  kubectl, dashboards, CI/CD\n  etcd            (base de datos clave-valor, estado real)\n  kube-scheduler  (decide en que Node va el Pod)\n  kube-controller-manager (reconciliation loops)\n  cloud-controller-manager (opcional, en cloud)\n\nWORKERS (1..N nodes)\n  kubelet      (agente del Node)\n  kube-proxy   (reglas de red para Services)\n  runtime      (containerd / CRI-O)\n  Pods         (tus apps)</pre>",
    },
    { kind: "h4", text: "Componentes del Control Plane" },
    {
      kind: "table",
      headers: ["Componente", "Que hace", "Si se cae..."],
      rows: [
        ["kube-apiserver", "Puerta de entrada del cluster. TODO pasa por aqui (kubectl, otros componentes, controllers). Expone la API REST.", "Nadie puede leer ni cambiar el estado del cluster."],
        ["etcd", "Base de datos distribuida (clave-valor) donde se guarda TODO el estado del cluster. La verdad del cluster.", "Perdida total de configuracion. Por eso siempre se hace backup."],
        ["kube-scheduler", "Decide en que Node va cada Pod nuevo segun recursos, taints, afinidad, etc.", "Los Pods nuevos quedan en estado Pending."],
        ["kube-controller-manager", "Corre los <em>controllers</em>: cada uno vigila un tipo de recurso y empuja al estado real hacia el deseado (loop de reconciliacion).", "Los recursos dejan de auto-corregirse (no se reemplazan Pods caidos, etc.)."],
        ["cloud-controller-manager", "Integra el cluster con APIs del cloud provider: crear LoadBalancers, volumenes, rutas. Solo en clouds.", "Los recursos cloud-dependientes (LBs, PVs) no se crean."],
      ],
    },
    { kind: "h4", text: "Componentes del Worker Node" },
    {
      kind: "table",
      headers: ["Componente", "Que hace"],
      rows: [
        ["kubelet", "Agente que corre en cada Node. Habla con el apiserver, recibe la spec de los Pods que le tocan, le pide al runtime que los levante y reporta su estado."],
        ["kube-proxy", "Maneja las reglas de red (iptables / IPVS / nftables) en el Node para implementar Services y balanceo entre Pods."],
        ["Container Runtime", "El que <em>realmente</em> corre los containers: containerd (mas comun hoy), CRI-O, Docker (legacy). Habla con kubelet via CRI."],
        ["CNI plugin", "Da red a los Pods (IPs, rutas). Ejemplos: Calico, Cilium, Flannel, Weave."],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>Reconciliation loop</strong> = el corazon de K8s. Cada controller compara <em>estado deseado</em> vs <em>estado real</em> y actua para acercarlos. Por eso K8s es <strong>declarativo</strong>: vos no decis crea un Pod, decis quiero 3 Pods con esta imagen y K8s lo mantiene cierto en el tiempo, aunque uno muera, aunque caiga un Node entero.",
    },

    { kind: "h3", text: "PARTE 3 - Tu cluster local en 10 minutos" },
    {
      kind: "paragraph",
      html:
        "Para aprender no necesitas AWS ni un cluster real. Te alcanza con uno local. Tenes varias opciones:",
    },
    {
      kind: "table",
      headers: ["Herramienta", "Pros", "Ideal para"],
      rows: [
        ["<strong>Docker Desktop</strong> + Kubernetes", "Un click, integrado con Docker en Windows/macOS", "Empezar rapido en Windows (lo usamos en el lab final)"],
        ["<strong>kind</strong> (Kubernetes in Docker)", "Crea Nodes como containers, muy rapido", "CI/CD, multi-node local"],
        ["<strong>minikube</strong>", "El clasico, soporta muchos drivers (Docker, KVM, VirtualBox)", "Pruebas con addons (ingress, dashboard)"],
        ["<strong>k3d / k3s</strong>", "K8s ultraliviano (Rancher), ideal para edge/IoT", "Hardware modesto, ARM, Raspberry Pi"],
      ],
    },
    { kind: "h4", text: "Comandos para arrancar (elegi UNO)" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Docker Desktop: Settings -&gt; Kubernetes -&gt; Enable Kubernetes\n\n# kind\nkind create cluster --name lab\nkubectl cluster-info --context kind-lab\n\n# minikube\nminikube start --driver=docker\nminikube status\n\n# k3d\nk3d cluster create lab --servers 1 --agents 2</pre>",
    },
    { kind: "h4", text: "Verificar que todo anda" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>kubectl version --short\nkubectl get nodes\nkubectl get pods -A      # todos los namespaces\nkubectl cluster-info</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>Tip</strong>: instala tambien <code>k9s</code> (TUI para K8s) y <code>kubectx</code>/<code>kubens</code> (cambiar de cluster/namespace). Cambian la vida.",
    },

    { kind: "h3", text: "PARTE 4 - kubectl: tu control remoto del cluster" },
    {
      kind: "paragraph",
      html:
        "<code>kubectl</code> es el CLI oficial. Habla con el <em>apiserver</em> usando el archivo <code>~/.kube/config</code> (kubeconfig), que define <strong>clusters</strong> (URLs y CAs), <strong>users</strong> (credenciales) y <strong>contexts</strong> (combinaciones cluster+user+namespace).",
    },
    {
      kind: "table",
      headers: ["Familia de comandos", "Ejemplo", "Que hace"],
      rows: [
        ["Inspeccion", "kubectl get pods -n default", "Lista recursos (pods, svc, deploy, etc.)"],
        ["Detalle", "kubectl describe pod nginx", "Estado, eventos, condiciones, volumenes"],
        ["Logs", "kubectl logs -f mi-pod -c mi-container", "Stream de stdout/stderr del container"],
        ["Exec", "kubectl exec -it mi-pod -- sh", "Shell dentro del Pod (debug)"],
        ["Port-forward", "kubectl port-forward svc/api 8080:80", "Tunneliza un Service a tu laptop"],
        ["Crear/Aplicar", "kubectl apply -f deploy.yaml", "Crea o actualiza recursos declarativamente"],
        ["Editar en vivo", "kubectl edit deploy/api", "Abre el YAML en tu $EDITOR y aplica al guardar"],
        ["Eliminar", "kubectl delete -f deploy.yaml", "Borra los recursos del YAML"],
        ["Eventos", "kubectl get events --sort-by=.lastTimestamp", "Auditoria reciente del cluster"],
        ["Contextos", "kubectl config use-context prod", "Cambia a otro cluster/namespace"],
        ["Explicar", "kubectl explain pod.spec.containers", "Documentacion de cualquier campo de la API"],
        ["Rollouts", "kubectl rollout status deploy/api", "Estado de despliegues, history, undo"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>Atajos vitales</strong>: <code>kubectl get po</code>, <code>svc</code>, <code>deploy</code>, <code>ns</code>, <code>cm</code>, <code>secret</code>, <code>pv</code>, <code>pvc</code>, <code>sa</code>, <code>ing</code>. Activa autocompletado: <code>source &lt;(kubectl completion bash)</code> (o zsh).",
    },
    { kind: "h4", text: "Namespaces: separar mundos en el mismo cluster" },
    {
      kind: "paragraph",
      html:
        "Un <strong>Namespace</strong> es un espacio logico donde viven recursos. Sirve para separar entornos (dev, stg), equipos, o multi-tenant. Lo que vive en un namespace <em>no</em> ve al de otro salvo por DNS interno o RBAC explicito.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>kubectl get ns                       # listar namespaces\nkubectl create ns dev                # crear uno\nkubectl get pods -n kube-system      # pods del control plane\nkubectl config set-context --current --namespace=dev   # default = dev</pre>",
    },
    {
      kind: "tip",
      html:
        "Algunos recursos son <strong>cluster-scoped</strong> (no viven en namespace): Nodes, PersistentVolumes, StorageClasses, ClusterRoles, Namespaces mismos.",
    },

    { kind: "h3", text: "PARTE 5 - El modelo de objetos de Kubernetes" },
    {
      kind: "paragraph",
      html:
        "Todo en K8s es un <strong>objeto</strong> descrito en YAML/JSON con la misma estructura. Aprendido el patron, aprendiste TODOS los recursos.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: v1            # version de la API\nkind: Pod                 # que tipo de objeto\nmetadata:                 # quien es\n  name: mi-pod\n  namespace: default\n  labels:\n    app: web\n    tier: frontend\n  annotations:\n    owner: \"team-platform\"\nspec:                     # estado deseado\n  containers:\n    - name: nginx\n      image: nginx:1.27\n      ports: [{ containerPort: 80 }]\nstatus:                   # estado real (lo escribe K8s, no vos)\n  phase: Running</pre>",
    },
    { kind: "h4", text: "Labels, Selectors y Annotations" },
    {
      kind: "table",
      headers: ["Mecanismo", "Para que sirve", "Ejemplo"],
      rows: [
        ["Labels", "Identificar y agrupar recursos. Se usan en selectores.", "<code>app=web, env=prod, tier=frontend</code>"],
        ["Selectors", "Buscar recursos por sus labels. Los Services y Deployments lo usan.", "<code>kubectl get pod -l app=web,env!=prod</code>"],
        ["Annotations", "Metadata libre (no usada para seleccion): trazas, build, autor, links.", "<code>kubernetes.io/change-cause</code>, sidecars, autoscaler config"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>Buena practica</strong>: usa las labels recomendadas de Kubernetes: <code>app.kubernetes.io/name</code>, <code>app.kubernetes.io/instance</code>, <code>app.kubernetes.io/version</code>, <code>app.kubernetes.io/component</code>, <code>app.kubernetes.io/part-of</code>, <code>app.kubernetes.io/managed-by</code>.",
    },

    { kind: "h3", text: "PARTE 6 - El Pod, la celula del cluster" },
    {
      kind: "paragraph",
      html:
        "Un <strong>Pod</strong> es la <em>unidad minima</em> que K8s programa. Es 1 o mas containers que comparten <strong>red</strong> (misma IP, mismos puertos, se ven en <code>localhost</code>), <strong>storage</strong> (volumes) y <strong>ciclo de vida</strong>. La mayoria de las veces tendras 1 container por Pod; los Pods multi-container existen para patrones especificos (sidecar, ambassador, adapter).",
    },
    { kind: "h4", text: "Ciclo de vida de un Pod" },
    {
      kind: "table",
      headers: ["Fase", "Significa"],
      rows: [
        ["Pending", "Aceptado por el cluster, pero algun container todavia no esta corriendo (descargando imagen, esperando scheduling)."],
        ["Running", "Asignado a un Node, al menos un container esta corriendo."],
        ["Succeeded", "Todos los containers terminaron con exito (tipico de Jobs)."],
        ["Failed", "Todos los containers terminaron, al menos uno con error."],
        ["Unknown", "No se pudo obtener estado (usualmente Node caido)."],
      ],
    },
    { kind: "h4", text: "Init containers, sidecars y probes" },
    {
      kind: "list",
      items: [
        "<strong>initContainers</strong>: corren ANTES que los containers principales (DB migrations, esperar a un servicio, descargar config).",
        "<strong>Sidecar containers</strong>: corren EN PARALELO al principal (log shipper, proxy mTLS, service mesh proxy).",
        "<strong>livenessProbe</strong>: el container sigue vivo? Si falla, lo reinicia.",
        "<strong>readinessProbe</strong>: esta listo para recibir trafico? Si falla, lo sacan del Service.",
        "<strong>startupProbe</strong>: para apps con arranque lento; mientras esta arrancando, las otras probes no se ejecutan.",
      ],
    },
    { kind: "h4", text: "Tu primer Pod (manifiesto completo, comentado)" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: v1\nkind: Pod\nmetadata:\n  name: web\n  labels: { app: web }\nspec:\n  containers:\n    - name: nginx\n      image: nginx:1.27\n      ports:\n        - containerPort: 80\n      resources:           # cuanta CPU/RAM puede pedir y consumir\n        requests: { cpu: \"50m\", memory: \"64Mi\" }\n        limits:   { cpu: \"200m\", memory: \"128Mi\" }\n      readinessProbe:\n        httpGet: { path: \"/\", port: 80 }\n        initialDelaySeconds: 2\n        periodSeconds: 5\n      livenessProbe:\n        httpGet: { path: \"/\", port: 80 }\n        initialDelaySeconds: 10\n        periodSeconds: 10</pre>",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>kubectl apply -f pod.yaml\nkubectl get pod web -o wide\nkubectl describe pod web\nkubectl port-forward pod/web 8080:80   # abrir http://localhost:8080\nkubectl delete pod web</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>Importante</strong>: en produccion casi NUNCA creas Pods sueltos. Los creas indirectamente via <strong>Deployment</strong> u otro controller. Si matas un Pod suelto, nadie lo reemplaza. Si matas un Pod gestionado por un Deployment, el ReplicaSet lo levanta automaticamente.",
    },

    { kind: "h3", text: "PARTE 7 - Ponete a prueba" },
    {
      kind: "fillBlanks",
      key: "m6_fill",
      items: [
        { text: "Para aplicar un manifiesto usas kubectl ___ -f pod.yaml", answer: "apply", es: "apply" },
        { text: "El componente que decide en que Node corre cada Pod es el kube-___.", answer: "scheduler", es: "scheduler" },
        { text: "La base de datos del cluster es ___.", answer: "etcd", es: "etcd" },
        { text: "La unidad minima ejecutable en K8s se llama ___.", answer: "pod", es: "pod" },
        { text: "El agente del Node que habla con el apiserver es el ___.", answer: "kubelet", es: "kubelet" },
        { text: "Para ver logs en stream se usa kubectl ___ -f mi-pod", answer: "logs", es: "logs" },
        { text: "Un espacio logico para separar recursos es un ___.", answer: "namespace", es: "namespace" },
        { text: "Las probes que indican si un container esta vivo se llaman ___ probes.", answer: "liveness", es: "liveness" },
      ],
    },
    {
      kind: "matching",
      key: "m6_matching",
      pairs: [
        { en: "kube-apiserver", es: "Puerta de entrada del cluster" },
        { en: "etcd", es: "Estado del cluster en clave-valor" },
        { en: "kube-scheduler", es: "Asigna Pods a Nodes" },
        { en: "kubelet", es: "Agente que corre en cada Node" },
        { en: "kube-proxy", es: "Reglas de red para Services" },
        { en: "CNI plugin", es: "Da red e IPs a los Pods" },
        { en: "Pod", es: "Unidad minima ejecutable" },
        { en: "Namespace", es: "Espacio logico de separacion" },
      ],
    },
    {
      kind: "quiz",
      key: "m6_quiz",
      questions: [
        {
          q: "Cual es la unidad minima de despliegue en Kubernetes?",
          options: ["Container", "Pod", "Node", "Deployment"],
          correct: 1,
          explanation: "El Pod envuelve uno o varios containers que comparten red y storage; es lo que K8s realmente programa.",
        },
        {
          q: "Quien guarda el estado del cluster?",
          options: ["kubelet", "etcd", "kube-proxy", "container runtime"],
          correct: 1,
          explanation: "etcd es la base de datos clave-valor donde el apiserver persiste TODO el estado.",
        },
        {
          q: "Quien decide en que Node se ejecuta un Pod?",
          options: ["kube-controller-manager", "kube-scheduler", "kubelet", "CoreDNS"],
          correct: 1,
        },
        {
          q: "Que componente corre EN cada Worker Node y habla con el apiserver?",
          options: ["kube-apiserver", "kubelet", "etcd", "kube-scheduler"],
          correct: 1,
        },
        {
          q: "K8s es declarativo significa que...",
          options: [
            "Hay que decirle paso a paso cada accion",
            "Vos describis el estado deseado y K8s converge hacia el",
            "Solo soporta archivos JSON",
            "No soporta cambios en runtime",
          ],
          correct: 1,
          explanation: "Es la idea del reconciliation loop: comparar deseado vs real y actuar.",
        },
        {
          q: "Para que sirve un Namespace?",
          options: [
            "Cifrar datos sensibles",
            "Separar recursos logicamente (dev/stg/prod, equipos)",
            "Acelerar el scheduling",
            "Reemplazar a los Services",
          ],
          correct: 1,
        },
        {
          q: "Que probe sacaria a un Pod del balanceo si no responde, pero NO lo reinicia?",
          options: ["livenessProbe", "readinessProbe", "startupProbe", "shutdownProbe"],
          correct: 1,
          explanation: "readinessProbe controla si el Pod recibe trafico; livenessProbe es quien reinicia.",
        },
        {
          q: "Cual de estos NO es un recurso namespaced?",
          options: ["Pod", "Service", "Node", "ConfigMap"],
          correct: 2,
          explanation: "Nodes, PersistentVolumes, StorageClasses y ClusterRoles son cluster-scoped.",
        },
        {
          q: "Para que sirven las labels?",
          options: [
            "Encriptar pods",
            "Agrupar e identificar recursos para selectores",
            "Reemplazar a los Namespaces",
            "Definir red de Pods",
          ],
          correct: 1,
        },
        {
          q: "Que comando muestra TODA la documentacion de un campo de la API?",
          options: ["kubectl describe", "kubectl explain", "kubectl get", "kubectl docs"],
          correct: 1,
        },
      ],
    },
  ],
};
