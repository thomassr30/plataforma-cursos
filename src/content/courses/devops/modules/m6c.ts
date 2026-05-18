import type { ModuleData } from "@/types/course";

// Kubernetes III — Networking: Services, Ingress, NetworkPolicies, DNS.
export const m6c: ModuleData = {
  slug: "m6c",
  number: 8,
  title: "Kubernetes III — Networking: Services, Ingress y NetworkPolicies",
  icon: "🌐",
  intro:
    "Tus Pods se mueven, mueren y reaparecen con IPs distintas — entonces ¿cómo se hablan entre sí?, ¿cómo expongo una API al mundo?, ¿cómo evito que un microservicio comprometido vea al resto? Acá entran los Services (descubrimiento + balanceo), Ingress (HTTP routing externo), CoreDNS (resolución por nombre) y NetworkPolicies (firewall L3/L4 del cluster).",
  totalActivities: 4,
  blocks: [
    // ============================================
    // PARTE 1 — MODELO DE RED DE K8s
    // ============================================
    { kind: "h3", text: "📡 PARTE 1 — El modelo de red de Kubernetes" },
    {
      kind: "paragraph",
      html:
        "K8s impone <strong>4 reglas</strong> que tu plugin de red (CNI) debe cumplir: cada Pod tiene su propia IP, todos los Pods pueden hablarse entre sí sin NAT, todos los Nodes pueden ver a todos los Pods sin NAT, y la IP que se ve desde adentro es la misma que la que ven desde afuera del Pod. Esto se llama el <strong>flat network model</strong>.",
    },
    {
      kind: "list",
      items: [
        "<strong>Pod IP</strong>: única en el cluster, asignada por el CNI (Calico, Cilium, Flannel...).",
        "<strong>Node IP</strong>: la IP de la máquina (Worker).",
        "<strong>Service IP (ClusterIP)</strong>: IP virtual, NO está en ningún Pod ni Node — la implementa <em>kube-proxy</em> con iptables/IPVS/eBPF.",
        "<strong>External IP</strong>: la que ven desde Internet (LoadBalancer o NodePort).",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 ¿Por qué Services?</strong> Los Pods cambian de IP cada vez que se reinician. Hablar Pod a Pod directamente sería inestable. Un Service es un <em>endpoint estable</em> que balancea entre los Pods detrás.",
    },

    // ============================================
    // PARTE 2 — TIPOS DE SERVICE
    // ============================================
    { kind: "h3", text: "🔌 PARTE 2 — Tipos de Service" },
    {
      kind: "table",
      headers: ["Tipo", "Para qué", "Acceso desde…"],
      rows: [
        ["ClusterIP (default)", "Comunicación interna entre microservicios", "Sólo desde dentro del cluster"],
        ["NodePort", "Exponer en un puerto alto (30000-32767) de cada Node", "Cualquiera que llegue a un Node:puerto"],
        ["LoadBalancer", "Pide al cloud (AWS/GCP/Azure) crear un LB externo", "Internet, vía IP/DNS pública"],
        ["ExternalName", "Alias DNS a un servicio externo (sin proxy)", "DNS interno apunta a externo"],
        ["Headless (clusterIP: None)", "Sin VIP — DNS resuelve a las IPs de los Pods", "DBs, StatefulSets, descubrimiento custom"],
      ],
    },
    { kind: "h4", text: "📝 ClusterIP Service" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: v1\nkind: Service\nmetadata:\n  name: api-svc\nspec:\n  type: ClusterIP\n  selector: { app: api }       # matchea Pods con label app=api\n  ports:\n    - name: http\n      port: 80                 # el puerto del Service\n      targetPort: 3000         # el puerto del container\n      protocol: TCP</pre>",
    },
    {
      kind: "paragraph",
      html:
        "Una vez creado, dentro del cluster cualquiera puede llamarlo por nombre DNS:<br/>" +
        "<code>http://api-svc</code> (mismo namespace)<br/>" +
        "<code>http://api-svc.production.svc.cluster.local</code> (FQDN, otro namespace)",
    },
    { kind: "h4", text: "📝 NodePort Service" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: v1\nkind: Service\nmetadata: { name: api-np }\nspec:\n  type: NodePort\n  selector: { app: api }\n  ports:\n    - port: 80\n      targetPort: 3000\n      nodePort: 30080         # opcional; si no lo ponés K8s elige uno libre</pre>",
    },
    { kind: "h4", text: "📝 LoadBalancer Service (en cloud)" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: v1\nkind: Service\nmetadata:\n  name: api-lb\n  annotations:\n    service.beta.kubernetes.io/aws-load-balancer-type: \"nlb\"\nspec:\n  type: LoadBalancer\n  selector: { app: api }\n  ports:\n    - port: 80\n      targetPort: 3000</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>⚠️ Costo</strong>: cada Service <code>type: LoadBalancer</code> en AWS/GCP/Azure crea un LB real, y cada LB cobra por hora. Por eso en producción casi siempre se usa <strong>1 LB + Ingress</strong> y todos los servicios web cuelgan de ese Ingress.",
    },

    // ============================================
    // PARTE 3 — ENDPOINTS / ENDPOINTSLICES
    // ============================================
    { kind: "h3", text: "🧬 PARTE 3 — ¿Cómo sabe el Service qué Pods balancear?" },
    {
      kind: "paragraph",
      html:
        "Cuando creás un Service con <code>selector</code>, K8s mantiene automáticamente un objeto <strong>Endpoints</strong> (legacy) o <strong>EndpointSlice</strong> (moderno) con la lista de IPs:puerto de los Pods que matchean. kube-proxy lee esa lista y arma las reglas de balanceo en cada Node.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>kubectl get endpoints api-svc\nkubectl get endpointslices -l kubernetes.io/service-name=api-svc</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Service sin selector</strong> = vos manejás los Endpoints a mano. Útil para apuntar a una DB externa, otro cluster, una IP fija.",
    },

    // ============================================
    // PARTE 4 — DNS INTERNO
    // ============================================
    { kind: "h3", text: "🧭 PARTE 4 — DNS interno (CoreDNS)" },
    {
      kind: "paragraph",
      html:
        "K8s corre <strong>CoreDNS</strong> como un Deployment en <code>kube-system</code>. Cada Pod recibe ese DNS automáticamente en su <code>/etc/resolv.conf</code>. Las reglas son simples:",
    },
    {
      kind: "table",
      headers: ["Nombre", "Resuelve a"],
      rows: [
        ["<code>api</code> (mismo namespace)", "ClusterIP del Service <em>api</em>"],
        ["<code>api.dev</code>", "Service <em>api</em> en namespace <em>dev</em>"],
        ["<code>api.dev.svc.cluster.local</code>", "FQDN completo"],
        ["<code>db-0.db.dev.svc.cluster.local</code>", "Pod específico de un StatefulSet con Headless Service"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Debug rápido desde un Pod\nkubectl run debug --rm -it --image=nicolaka/netshoot -- bash\n# dentro:\nnslookup api\ndig api.production.svc.cluster.local\ncurl http://api/health</pre>",
    },

    // ============================================
    // PARTE 5 — INGRESS
    // ============================================
    { kind: "h3", text: "🚪 PARTE 5 — Ingress: HTTP routing al mundo" },
    {
      kind: "paragraph",
      html:
        "Un <strong>Ingress</strong> es una regla de routing HTTP/HTTPS L7 (por dominio y path) que dirige tráfico externo a Services internos. NO funciona solo: necesita un <strong>Ingress Controller</strong> (NGINX, Traefik, HAProxy, ALB Controller, Cilium) corriendo en el cluster que lo implemente.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>" +
        "          Internet\n" +
        "             │\n" +
        "             ▼\n" +
        "      LoadBalancer (1 único, en cloud)\n" +
        "             │\n" +
        "             ▼\n" +
        "      [Ingress Controller Pods] ← lee objetos Ingress\n" +
        "             │\n" +
        "    ┌────────┼────────┐\n" +
        "    ▼        ▼        ▼\n" +
        "  api-svc  web-svc  blog-svc   (cada uno con sus Pods detrás)\n" +
        "</pre>",
    },
    { kind: "h4", text: "📝 Ingress YAML completo" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: app-ingress\n  annotations:\n    nginx.ingress.kubernetes.io/rewrite-target: /\n    cert-manager.io/cluster-issuer: letsencrypt-prod\nspec:\n  ingressClassName: nginx\n  tls:\n    - hosts: [\"app.midominio.com\"]\n      secretName: app-tls\n  rules:\n    - host: app.midominio.com\n      http:\n        paths:\n          - path: /api\n            pathType: Prefix\n            backend:\n              service: { name: api-svc, port: { number: 80 } }\n          - path: /\n            pathType: Prefix\n            backend:\n              service: { name: web-svc, port: { number: 80 } }</pre>",
    },
    { kind: "h4", text: "🧰 Ingress Controllers populares" },
    {
      kind: "table",
      headers: ["Controller", "Ideal para"],
      rows: [
        ["ingress-nginx", "El más común; estable y bien documentado"],
        ["Traefik", "Configuración dinámica, dashboard incluido"],
        ["HAProxy Ingress", "Performance crítica, L4/L7"],
        ["AWS Load Balancer Controller", "Crea ALBs nativos en AWS"],
        ["Cilium / Istio / Gateway API", "Service mesh, mTLS, observabilidad"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Gateway API</strong> es la nueva spec que reemplaza a Ingress. Más expresiva, multi-tenant, y separa roles (operador del cluster vs. dev). Si arrancás un proyecto greenfield grande en 2025, evaluala.",
    },

    // ============================================
    // PARTE 6 — NETWORKPOLICIES
    // ============================================
    { kind: "h3", text: "🛡️ PARTE 6 — NetworkPolicies: firewall del cluster" },
    {
      kind: "paragraph",
      html:
        "Por defecto en K8s <strong>cualquier Pod puede hablar con cualquier Pod</strong>. Eso es genial para desarrollar y un desastre para seguridad. Las <strong>NetworkPolicies</strong> definen reglas L3/L4 (IP/puerto) de quién puede hablarle a quién. Requieren un CNI que las soporte (Calico, Cilium, Weave; flannel <em>no</em>).",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Ejemplo: la DB sólo acepta tráfico desde el namespace 'app' y desde Pods app=api\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: db-allow-api\n  namespace: data\nspec:\n  podSelector:\n    matchLabels: { app: postgres }\n  policyTypes: [\"Ingress\"]\n  ingress:\n    - from:\n        - namespaceSelector:\n            matchLabels: { name: app }\n          podSelector:\n            matchLabels: { app: api }\n      ports:\n        - protocol: TCP\n          port: 5432</pre>",
    },
    { kind: "h4", text: "🔒 El patrón 'deny-all' por defecto" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Deniega TODO el tráfico de entrada en el namespace, luego abrís excepciones\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: default-deny-ingress\n  namespace: app\nspec:\n  podSelector: {}              # aplica a TODOS los Pods del ns\n  policyTypes: [\"Ingress\"]</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>⚠️ Cuidado</strong>: NetworkPolicies son <em>aditivas</em> — si una regla permite tráfico, ese tráfico se permite, no podés tener una regla que \"deniegue\". Para denegar, simplemente no permitís.",
    },

    // ============================================
    // PARTE 7 — DEBUG DE NETWORKING
    // ============================================
    { kind: "h3", text: "🔧 PARTE 7 — Troubleshooting de red" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Ver que el Service exista y tenga endpoints\nkubectl get svc api-svc\nkubectl get endpoints api-svc      # ¿hay IPs aquí?\n\n# Comprobar matchings de labels\nkubectl get pods --show-labels\nkubectl get pod -l app=api\n\n# Probar DNS y conectividad desde un Pod\nkubectl run net --rm -it --image=nicolaka/netshoot -- bash\nnslookup api-svc\ncurl -v http://api-svc/health\n\n# Ver eventos del Ingress\nkubectl describe ingress app-ingress\nkubectl logs -n ingress-nginx deploy/ingress-nginx-controller</pre>",
    },
    {
      kind: "list",
      items: [
        "<strong>¿Endpoints vacíos?</strong> El selector del Service no matchea ninguna label de Pods.",
        "<strong>¿Connection refused?</strong> El container no escucha en el targetPort declarado.",
        "<strong>¿404 desde Ingress?</strong> Falta el <code>host</code>, <code>path</code> incorrecto, o el Service backend no existe.",
        "<strong>¿DNS no resuelve?</strong> CoreDNS caído o el Pod no tiene <code>/etc/resolv.conf</code> correcto.",
        "<strong>¿Pod no se conecta a la DB?</strong> Mirá si hay una NetworkPolicy bloqueándolo.",
      ],
    },

    // ============================================
    // PARTE 8 — EJERCICIOS
    // ============================================
    { kind: "h3", text: "✍️ PARTE 8 — Probate" },
    {
      kind: "fillBlanks",
      key: "m6c_fill",
      items: [
        { text: "El tipo de Service por defecto es ___.", answer: "ClusterIP", es: "ClusterIP" },
        { text: "Para exponer en un puerto alto en cada Node se usa ___.", answer: "NodePort", es: "NodePort" },
        { text: "El componente que implementa las reglas de Service en cada Node es kube-___.", answer: "proxy", es: "proxy" },
        { text: "Las reglas HTTP L7 por dominio y path se definen con un ___.", answer: "Ingress", es: "Ingress" },
        { text: "El DNS interno del cluster lo corre ___.", answer: "CoreDNS", es: "CoreDNS" },
        { text: "Un Service sin clusterIP (clusterIP: None) se llama ___.", answer: "Headless", es: "Headless" },
        { text: "Las reglas L3/L4 de firewall en K8s son ___.", answer: "NetworkPolicies", es: "NetworkPolicies" },
        { text: "El nuevo estándar que reemplaza a Ingress se llama ___ API.", answer: "Gateway", es: "Gateway" },
      ],
    },
    {
      kind: "matching",
      key: "m6c_matching",
      pairs: [
        { en: "ClusterIP", es: "Solo accesible dentro del cluster" },
        { en: "NodePort", es: "Puerto alto en cada Node" },
        { en: "LoadBalancer", es: "LB externo del cloud" },
        { en: "ExternalName", es: "Alias DNS a servicio externo" },
        { en: "Headless Service", es: "DNS resuelve a IPs de Pods" },
        { en: "Ingress", es: "Routing HTTP por host/path" },
        { en: "NetworkPolicy", es: "Firewall L3/L4" },
        { en: "CoreDNS", es: "DNS interno del cluster" },
        { en: "EndpointSlice", es: "Lista de Pods detrás de un Service" },
        { en: "kube-proxy", es: "Programa iptables/IPVS por Service" },
      ],
    },
    {
      kind: "quiz",
      key: "m6c_quiz",
      questions: [
        {
          q: "Necesitás que un microservicio interno hable con tu API. ¿Qué Service?",
          options: ["ClusterIP", "LoadBalancer", "NodePort", "ExternalName"],
          correct: 0,
        },
        {
          q: "Querés exponer tu app en internet vía cloud LB. ¿Qué tipo?",
          options: ["ClusterIP", "NodePort", "LoadBalancer", "Headless"],
          correct: 2,
        },
        {
          q: "Para hacer routing HTTP a varios servicios desde un solo LB usás…",
          options: ["Un Service NodePort", "Un Ingress + Ingress Controller", "kube-proxy", "ConfigMap"],
          correct: 1,
        },
        {
          q: "Tu Service no balancea tráfico. ¿Qué chequeás primero?",
          options: [
            "Que existan endpoints (selector matchea Pods)",
            "El log de etcd",
            "El número de Nodes",
            "El kubelet",
          ],
          correct: 0,
        },
        {
          q: "Una NetworkPolicy con podSelector: {} y policyTypes: [Ingress] hace…",
          options: [
            "Deniega TODO el ingress en ese namespace",
            "Permite TODO el ingress",
            "Borra los Pods",
            "Nada, está vacía",
          ],
          correct: 0,
        },
        {
          q: "¿Qué nombre DNS resuelve un Service 'api' en namespace 'prod' desde otro namespace?",
          options: ["api", "prod.api", "api.prod", "api.prod.svc.cluster.local"],
          correct: 3,
          explanation: "También funciona 'api.prod' por la búsqueda del search domain.",
        },
        {
          q: "Headless Service significa…",
          options: [
            "Sin balanceo, DNS resuelve a las IPs de los Pods individuales",
            "Sin Pods detrás",
            "Sin endpoints",
            "Sólo para Nodes",
          ],
          correct: 0,
        },
        {
          q: "¿Qué componente implementa, en cada Node, las reglas de un Service?",
          options: ["kube-apiserver", "kube-proxy", "CoreDNS", "kubelet"],
          correct: 1,
        },
        {
          q: "Las NetworkPolicies requieren…",
          options: [
            "Que el cluster sea EKS",
            "Que el CNI las soporte (Calico, Cilium, etc.)",
            "Tener Ingress instalado",
            "Un Operator",
          ],
          correct: 1,
        },
        {
          q: "Estás en cloud y querés un solo punto de entrada para 10 microservicios HTTP. La forma más barata es…",
          options: [
            "10 Services type: LoadBalancer",
            "1 LoadBalancer + Ingress + 10 Services ClusterIP",
            "10 NodePorts abiertos",
            "ExternalName para cada uno",
          ],
          correct: 1,
        },
      ],
    },
  ],
};
