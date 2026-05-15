import type { ModuleData } from "@/types/course";

export const m6: ModuleData = {
  slug: "m6",
  number: 6,
  title: "Kubernetes Básico",
  icon: "☸️",
  intro: "Kubernetes (k8s) orquesta tus containers en producción: los escala, los recupera si caen, los expone al tráfico.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "☸️ Conceptos clave" },
    {
      kind: "table",
      headers: ["Recurso", "Qué es"],
      rows: [
        ["Pod", "Unidad mínima ejecutable (1 o más containers)"],
        ["Deployment", "Gestiona réplicas de pods + estrategia de actualización"],
        ["Service", "Exposición estable de pods (ClusterIP, NodePort, LoadBalancer)"],
        ["Ingress", "Enrutamiento HTTP externo"],
        ["ConfigMap", "Configuración como pares clave/valor"],
        ["Secret", "Datos sensibles (passwords, tokens)"],
        ["Namespace", "Espacio lógico para separar recursos"],
        ["Job/CronJob", "Tareas puntuales o programadas"],
      ],
    },
    { kind: "h3", text: "📝 Deployment YAML" },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 3\n  selector:\n    matchLabels: { app: web }\n  template:\n    metadata:\n      labels: { app: web }\n    spec:\n      containers:\n        - name: app\n          image: myapp:v1\n          ports: [{ containerPort: 3000 }]</pre>",
    },
    { kind: "h3", text: "🔧 Comandos kubectl" },
    {
      kind: "table",
      headers: ["Comando", "Acción"],
      rows: [
        ["kubectl apply -f file.yaml", "Aplicar recursos"],
        ["kubectl get pods", "Listar pods"],
        ["kubectl get all", "Listar todo"],
        ["kubectl describe pod nombre", "Detalle de un pod"],
        ["kubectl logs nombre", "Ver logs"],
        ["kubectl exec -it pod -- sh", "Entrar al pod"],
        ["kubectl delete -f file.yaml", "Borrar recursos"],
        ["kubectl rollout status deploy/web", "Estado del despliegue"],
        ["kubectl rollout undo deploy/web", "Rollback"],
      ],
    },
    { kind: "tip", html: "<strong>💡 Helm</strong> es como npm/pip para Kubernetes: empaqueta tus recursos en <em>charts</em> reutilizables con valores configurables." },
    {
      kind: "fillBlanks",
      key: "m6_fill",
      items: [
        { text: "kubectl ___ -f deploy.yaml aplica un recurso.", answer: "apply", es: "apply" },
        { text: "kubectl ___ pods lista pods.", answer: "get", es: "get" },
        { text: "Para ver logs: kubectl ___ pod-name", answer: "logs", es: "logs" },
        { text: "Para rollback: kubectl rollout ___ deploy/web", answer: "undo", es: "undo" },
        { text: "La unidad mínima es un ___", answer: "pod", es: "pod" },
      ],
    },
    {
      kind: "matching",
      key: "m6_matching",
      pairs: [
        { en: "Pod", es: "Unidad mínima ejecutable" },
        { en: "Deployment", es: "Réplicas + estrategia" },
        { en: "Service", es: "Endpoint estable" },
        { en: "Ingress", es: "Enrutamiento HTTP" },
        { en: "ConfigMap", es: "Config no sensible" },
        { en: "Secret", es: "Datos sensibles" },
      ],
    },
    {
      kind: "quiz",
      key: "m6_quiz",
      questions: [
        { q: "¿Cuál es la unidad mínima en k8s?", options: ["Container", "Pod", "Node", "Cluster"], correct: 1 },
        { q: "¿Qué recurso expone pods de forma estable?", options: ["Deployment", "Service", "Ingress", "ConfigMap"], correct: 1 },
        { q: "¿Qué hace 'kubectl apply -f'?", options: ["Borra", "Aplica recursos definidos", "Visualiza", "Lista"], correct: 1 },
        { q: "¿Para datos sensibles usamos?", options: ["ConfigMap", "Secret", "Volume", "Ingress"], correct: 1 },
        { q: "¿Para qué sirve un namespace?", options: ["Separar recursos lógicamente", "Almacenar config", "Encriptar datos", "Solo en producción"], correct: 0 },
        { q: "¿Qué es Helm?", options: ["Una nube", "Gestor de paquetes para k8s", "Un cluster", "Un proxy"], correct: 1 },
      ],
    },
  ],
};
