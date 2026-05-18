import type { ModuleData } from "@/types/course";

// Modulo 12 (number=12) - Observabilidad: metricas, logs, traces.
export const m8: ModuleData = {
  slug: "m8",
  number: 12,
  title: "Modulo 12 - Observabilidad: Metricas, Logs y Traces",
  icon: "O",
  intro:
    "Si no podes ver que pasa en produccion, no podes mejorarlo ni arreglarlo. Observabilidad va MUCHO mas alla de 'monitoreo': son los 3 pilares (metricas, logs, traces) + cultura de instrumentacion + dashboards + alertas que activan a la persona correcta + SLOs. En este modulo desde cero: que es cada pilar, las metricas USE y RED, PromQL, dashboards en Grafana, logs estructurados, agregacion centralizada, OpenTelemetry para tracing distribuido, SLO/SLI/SLA y como armar un sistema de alertas que NO te quema en falsos positivos.",
  totalActivities: 5,
  blocks: [
    { kind: "h3", text: "PARTE 1 - Monitoreo vs Observabilidad" },
    {
      kind: "table",
      headers: ["Concepto", "Que es", "Pregunta tipica"],
      rows: [
        ["Monitoreo (tradicional)", "Chequear que ciertas cosas conocidas esten OK (CPU < 80%, ping ok)", "Esto que YA SE que puede fallar, esta fallando?"],
        ["Observabilidad", "Capacidad de hacer preguntas ARBITRARIAS al sistema sin desplegar codigo nuevo", "Que esta pasando que NO me esperaba?"],
      ],
    },
    {
      kind: "info",
      html:
        "<strong>3 pilares de la observabilidad</strong>: metricas (que tan rapido / cuanto), logs (que paso) y traces (por donde paso una request). Cada uno responde una pregunta distinta; necesitas los 3 para tener vista completa.",
    },

    { kind: "h3", text: "PARTE 2 - Los 3 pilares en profundidad" },
    { kind: "h4", text: "Metricas" },
    {
      kind: "list",
      items: [
        "<strong>Que son</strong>: valores numericos en el tiempo (time series). Ej: requests por segundo, latencia p95, uso de RAM.",
        "<strong>Caracteristicas</strong>: agregables, baratos de almacenar, bajos en cardinalidad por defecto.",
        "<strong>Buenos para</strong>: tendencias, alertas, capacidad.",
        "<strong>Malos para</strong>: contestar 'que paso con ESTE usuario en particular'.",
        "<strong>Stack tipico</strong>: Prometheus + Grafana / Datadog / Cloud-native (CloudWatch, Google Cloud Monitoring).",
      ],
    },
    { kind: "h4", text: "Logs" },
    {
      kind: "list",
      items: [
        "<strong>Que son</strong>: eventos textuales con timestamp.",
        "<strong>Caracteristicas</strong>: ricos en detalle, caros en storage si no se controla.",
        "<strong>Estructurados (JSON) &gt;&gt; no-estructurados</strong>: <code>{\"level\":\"error\",\"user_id\":42,\"path\":\"/api/x\"}</code> es buscable; un string libre, no.",
        "<strong>Stack tipico</strong>: Loki + Grafana, ELK (Elasticsearch + Logstash + Kibana), OpenSearch, Datadog Logs, Splunk.",
      ],
    },
    { kind: "h4", text: "Traces" },
    {
      kind: "list",
      items: [
        "<strong>Que son</strong>: el viaje de UNA request a traves de varios microservicios. Cada salto es un 'span'.",
        "<strong>Buenos para</strong>: 'por que esta request tardo 5 segundos? donde se gasto el tiempo?'",
        "<strong>Necesitan instrumentacion</strong>: el codigo emite spans (OpenTelemetry).",
        "<strong>Stack tipico</strong>: OpenTelemetry (OTel) + Jaeger / Tempo / Honeycomb / Datadog APM.",
      ],
    },

    { kind: "h3", text: "PARTE 3 - Metricas USE vs RED (que medir realmente)" },
    {
      kind: "table",
      headers: ["Metodologia", "Para que", "Que mide"],
      rows: [
        ["USE (Brendan Gregg)", "Recursos (CPU, RAM, disco, red)", "Utilization, Saturation, Errors"],
        ["RED (Tom Wilkie)", "Servicios / endpoints", "Rate (req/s), Errors (% fallos), Duration (latencia)"],
        ["Four Golden Signals (Google SRE)", "Servicios", "Latency, Traffic, Errors, Saturation"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>Regla practica</strong>: para cada microservicio, expone como minimo las 3 metricas RED. Para cada host/VM/pod, USE. Para cada bd, query rate + latencias.",
    },

    { kind: "h3", text: "PARTE 4 - Prometheus" },
    {
      kind: "paragraph",
      html:
        "Prometheus es el estandar de facto open-source para metricas en arquitecturas cloud-native. Modelo <strong>pull</strong>: el servidor de Prometheus scrappea endpoints <code>/metrics</code> de tus apps cada N segundos.",
    },
    { kind: "h4", text: "Tipos de metricas" },
    {
      kind: "table",
      headers: ["Tipo", "Para que", "Ejemplo"],
      rows: [
        ["Counter", "Solo sube (resets en restart)", "http_requests_total"],
        ["Gauge", "Sube y baja, valor en el momento", "memory_bytes, queue_size"],
        ["Histogram", "Distribucion (buckets)", "http_request_duration_seconds_bucket"],
        ["Summary", "Cuantiles calculados en cliente", "phi-quantiles (p50, p99)"],
      ],
    },
    { kind: "h4", text: "Formato y exposicion" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># GET http://app:3000/metrics\n# HELP http_requests_total Total de requests\n# TYPE http_requests_total counter\nhttp_requests_total{method=\"GET\",status=\"200\"} 12345\nhttp_requests_total{method=\"GET\",status=\"500\"} 12\nhttp_request_duration_seconds_bucket{le=\"0.1\"} 9000\nhttp_request_duration_seconds_bucket{le=\"0.5\"} 12000\nhttp_request_duration_seconds_bucket{le=\"+Inf\"} 12345</pre>",
    },
    { kind: "h4", text: "PromQL - el lenguaje de consultas" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Requests por segundo del ultimo 5 minutos\nrate(http_requests_total[5m])\n\n# Por endpoint\nsum by (path) (rate(http_requests_total[5m]))\n\n# Error rate (%)\n100 * sum(rate(http_requests_total{status=~\"5..\"}[5m]))\n  / sum(rate(http_requests_total[5m]))\n\n# Latencia p95 (en segundos)\nhistogram_quantile(0.95,\n  sum by (le) (rate(http_request_duration_seconds_bucket[5m]))\n)\n\n# CPU promedio por instancia (ultima muestra)\navg by (instance) (rate(process_cpu_seconds_total[5m]))</pre>",
    },

    { kind: "h3", text: "PARTE 5 - Alerting con Alertmanager" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># prometheus.rules.yml\ngroups:\n  - name: api\n    rules:\n      - alert: HighErrorRate\n        expr: |\n          100 * sum(rate(http_requests_total{status=~\"5..\"}[5m]))\n            / sum(rate(http_requests_total[5m])) &gt; 1\n        for: 10m\n        labels: { severity: page }\n        annotations:\n          summary: \"Error rate &gt; 1% durante 10m\"\n          runbook: \"https://runbooks/empresa/api-errors\"\n      - alert: HighLatency\n        expr: |\n          histogram_quantile(0.95,\n            sum by (le) (rate(http_request_duration_seconds_bucket[5m]))\n          ) &gt; 0.5\n        for: 10m</pre>",
    },
    { kind: "h4", text: "Alertas que NO queman" },
    {
      kind: "list",
      items: [
        "<strong>Cada alerta debe ser accionable</strong>: si la respuesta es 'nada que hacer', borra la alerta.",
        "<strong>for: 10m</strong> evita falsos positivos por picos transitorios.",
        "<strong>Niveles</strong>: page (despierta a alguien) vs ticket (resolvible en horas) vs info (solo dashboard).",
        "<strong>Runbook</strong> obligatorio: cada alerta apunta a doc con pasos para resolver.",
        "<strong>SLO-based alerting</strong>: alerta cuando estas consumiendo el error budget rapido, no por cada error.",
        "<strong>Alert fatigue</strong> mata equipos. Si te despertaron 3 noches y siempre fue 'nada', algo esta mal.",
      ],
    },

    { kind: "h3", text: "PARTE 6 - Grafana: dashboards" },
    {
      kind: "list",
      items: [
        "<strong>Connecta multiples datasources</strong>: Prometheus, Loki, Tempo, MySQL, CloudWatch, etc.",
        "<strong>Dashboards as code</strong>: los podes exportar a JSON, versionar en Git, instalar con Helm.",
        "<strong>Variables</strong> ($env, $service): un solo dashboard que sirve para todos los servicios.",
        "<strong>Annotations</strong>: marca deploys, releases, incidentes en los graficos.",
        "<strong>Plugins</strong>: muchas integraciones (Kubernetes app, OpenTSDB, alertas).",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>Empezar con un buen dashboard</strong>: <em>RED Method dashboard</em> + <em>USE Method dashboard</em> + 1 panel por servicio critico. NO crees 50 paneles que nadie mira.",
    },

    { kind: "h3", text: "PARTE 7 - Logs centralizados" },
    {
      kind: "table",
      headers: ["Stack", "Notas"],
      rows: [
        ["Loki + Promtail + Grafana", "Sistema 'Prometheus-like' para logs; barato en storage, query con LogQL"],
        ["ELK (Elasticsearch + Logstash + Kibana)", "Veterano, rico en features, indexado full-text (caro)"],
        ["OpenSearch", "Fork de Elasticsearch tras cambio de licencia"],
        ["Cloud-native (CloudWatch, Stackdriver, Azure Monitor)", "Integrado, simple, pero locked-in y caro a escala"],
        ["Datadog / NewRelic / Splunk", "SaaS pago; UX excelente, costo importante"],
      ],
    },
    { kind: "h4", text: "Logs estructurados (JSON)" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>// MAL: string libre\nconsole.log(`User ${userId} failed login from ${ip}`);\n\n// BIEN: estructurado\nlog.info({\n  event: \"login_failed\",\n  user_id: userId,\n  ip: ip,\n  reason: \"bad_password\"\n}, \"login failed\");\n\n// Luego en Loki podes\n// {app=\"api\"} | json | event=\"login_failed\" | user_id=42</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>Niveles tipicos</strong>: DEBUG (dev), INFO (eventos normales), WARN (algo raro pero no critico), ERROR (algo fallo), FATAL (caida del servicio). Configura el nivel via variable de entorno.",
    },

    { kind: "h3", text: "PARTE 8 - Distributed tracing y OpenTelemetry" },
    {
      kind: "paragraph",
      html:
        "Cuando una request pasa por 7 microservicios, los logs sueltos no ayudan. Un <strong>trace</strong> conecta los spans de todos los servicios con un mismo <code>trace_id</code>; ves la cascada completa y donde se gasto cada milisegundo.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>// OpenTelemetry SDK (Node) - ejemplo simplificado\nimport { trace } from '@opentelemetry/api';\n\nconst tracer = trace.getTracer('api');\n\nasync function getUser(id: string) {\n  return tracer.startActiveSpan('getUser', async (span) =&gt; {\n    span.setAttribute('user.id', id);\n    try {\n      const user = await db.query(...);\n      return user;\n    } catch (err) {\n      span.recordException(err);\n      span.setStatus({ code: SpanStatusCode.ERROR });\n      throw err;\n    } finally {\n      span.end();\n    }\n  });\n}</pre>",
    },
    {
      kind: "list",
      items: [
        "<strong>OpenTelemetry (OTel)</strong>: estandar vendor-neutral para emitir traces/metrics/logs. Reemplaza a Jaeger client, Zipkin client, OpenTracing.",
        "<strong>Auto-instrumentacion</strong>: para Java/Node/Python suele bastar con un agente; cero codigo.",
        "<strong>Sampling</strong>: no guardes el 100% de los traces a escala (saturas storage). Tail-based sampling = guarda los traces con errores o lentos.",
        "<strong>Context propagation</strong>: el trace_id viaja en headers HTTP (<code>traceparent</code>, W3C TraceContext).",
      ],
    },

    { kind: "h3", text: "PARTE 9 - SLO, SLI, SLA y error budgets" },
    {
      kind: "table",
      headers: ["Termino", "Que es", "Ejemplo"],
      rows: [
        ["SLI (Indicator)", "Lo que medis", "% requests con HTTP 2xx en &lt; 200ms"],
        ["SLO (Objective)", "Meta interna", "99.9% de availability mes a mes"],
        ["SLA (Agreement)", "Contrato externo (cliente)", "99.5% o devolvemos plata"],
        ["Error budget", "Cuanto downtime te 'sobra' segun el SLO", "0.1% = ~43 min/mes para 99.9%"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>SLO &lt; SLA</strong>: tu objetivo interno siempre debe ser MAS estricto que lo contractual. Te da margen.",
    },
    { kind: "h4", text: "Burn rate alerting" },
    {
      kind: "paragraph",
      html:
        "En vez de alertar 'hay 1 error', alertas cuando el error budget se consume rapido: 'a este ritmo en 1 hora me como 5% del budget mensual'. Reduce ruido enormemente.",
    },

    { kind: "h3", text: "PARTE 10 - Patrones avanzados" },
    {
      kind: "list",
      items: [
        "<strong>Correlation IDs</strong>: cada request entrante genera un ID que se propaga a logs/traces/metrics. Te permite tirar de un hilo.",
        "<strong>Logging vs Tracing</strong>: si tu app emite traces ricos, podes reducir logs (menos costo).",
        "<strong>Exemplars</strong>: linkear un punto en un grafico de metricas con un trace puntual.",
        "<strong>Continuous Profiling (Pyroscope, Parca)</strong>: cuarto pilar emergente. Te dice donde se gasta CPU/RAM en codigo.",
        "<strong>eBPF</strong>: instrumentacion del kernel sin tocar codigo (Pixie, Coroot, Cilium).",
        "<strong>RUM (Real User Monitoring)</strong>: instrumentar el navegador del usuario final (Sentry, NewRelic Browser).",
      ],
    },

    { kind: "h3", text: "PARTE 11 - Ejemplo de stack 'starter' (Kubernetes)" },
    {
      kind: "list",
      items: [
        "<strong>kube-prometheus-stack</strong> (Helm): Prometheus + Grafana + Alertmanager + node-exporter + kube-state-metrics, todo dashboard incluido.",
        "<strong>Loki + Promtail</strong>: logs.",
        "<strong>Tempo + OpenTelemetry Collector</strong>: traces.",
        "<strong>Grafana</strong>: UI unica para los 3.",
        "<strong>cert-manager</strong>: TLS automatico.",
        "Total: 1 chart Helm umbrella y tenes observabilidad enterprise-grade en un cluster local.",
      ],
    },

    { kind: "h3", text: "PARTE 12 - Antipatrones" },
    {
      kind: "list",
      items: [
        "<strong>Solo logs sin metricas</strong>: NO podes alertar; siempre llegas tarde.",
        "<strong>Solo metricas sin logs</strong>: cuando algo rompe no podes hacer drill-down.",
        "<strong>Loguear todo</strong> (DEBUG en prod): costo enorme y ruido.",
        "<strong>Cardinalidad infinita</strong>: usar user_id como label en Prometheus = explota el storage.",
        "<strong>Alertas sin runbook</strong>: el on-call se despierta y no sabe que hacer.",
        "<strong>Dashboards de 50 paneles</strong>: nadie los mira; 5 paneles utiles &gt; 50 inutiles.",
        "<strong>No tirar de los logs en CI</strong>: si un test falla en CI, queres los logs ahi mismo, no en otra UI.",
      ],
    },

    { kind: "h3", text: "PARTE 13 - Ponete a prueba" },
    {
      kind: "fillBlanks",
      key: "m8_fill",
      items: [
        { text: "Los 3 pilares de observabilidad son metricas, logs y ___.", answer: "traces", es: "traces" },
        { text: "El lenguaje de consultas de Prometheus se llama ___.", answer: "PromQL", es: "PromQL" },
        { text: "Los logs en JSON se llaman logs ___.", answer: "estructurados", es: "estructurados" },
        { text: "El estandar moderno y vendor-neutral para tracing es ___.", answer: "OpenTelemetry", es: "OpenTelemetry" },
        { text: "El objetivo interno de fiabilidad se llama ___.", answer: "SLO", es: "SLO" },
        { text: "Lo que medis para alimentar el SLO es el ___.", answer: "SLI", es: "SLI" },
        { text: "El contrato con el cliente se llama ___.", answer: "SLA", es: "SLA" },
        { text: "La metrica que solo sube y no baja se llama ___.", answer: "counter", es: "counter" },
        { text: "Las metricas RED son Rate, Errors y ___.", answer: "Duration", es: "Duration" },
        { text: "Para visualizar metricas y logs se usa generalmente ___.", answer: "Grafana", es: "Grafana" },
      ],
    },
    {
      kind: "matching",
      key: "m8_matching",
      pairs: [
        { en: "Counter", es: "Solo sube (req totales)" },
        { en: "Gauge", es: "Sube y baja (RAM)" },
        { en: "Histogram", es: "Distribucion (latencia)" },
        { en: "RED Method", es: "Rate, Errors, Duration" },
        { en: "USE Method", es: "Utilization, Saturation, Errors" },
        { en: "SLI", es: "Lo que medis" },
        { en: "SLO", es: "Tu objetivo interno" },
        { en: "SLA", es: "Contrato con cliente" },
        { en: "Error budget", es: "Cuanto downtime te sobra" },
        { en: "Trace", es: "Viaje de una request entre servicios" },
        { en: "Span", es: "Cada salto del trace" },
        { en: "Prometheus", es: "Metricas time-series open source" },
        { en: "Loki", es: "Logs estilo Prometheus" },
        { en: "OpenTelemetry", es: "Estandar de instrumentacion" },
      ],
    },
    {
      kind: "quiz",
      key: "m8_quiz",
      questions: [
        {
          q: "Que pregunta responden los traces?",
          options: [
            "Cuanto CPU usa el host",
            "Donde se gasto el tiempo de UNA request entre microservicios",
            "Que dijo el log a las 3am",
            "Cual es el SLA",
          ],
          correct: 1,
        },
        {
          q: "Para alertar sobre 1% de errores en 5xx usarias...",
          options: ["Logs sin agregar", "Prometheus + PromQL + Alertmanager", "Solo dashboards", "Traces"],
          correct: 1,
        },
        {
          q: "Cual es la diferencia entre SLO y SLA?",
          options: [
            "Son sinonimos",
            "SLO es objetivo interno; SLA es contrato externo con consecuencias",
            "SLA es mas estricto que SLO",
            "Ninguno se usa en serio",
          ],
          correct: 1,
        },
        {
          q: "Que tipo de metrica usarias para 'cantidad total de requests'?",
          options: ["Gauge", "Counter", "Histogram", "Summary"],
          correct: 1,
        },
        {
          q: "Cardinalidad infinita en Prometheus es...",
          options: [
            "Una feature deseable",
            "Un antipatron (poner user_id como label hace que el storage explote)",
            "El mejor uso de Prometheus",
            "Requerido por OpenTelemetry",
          ],
          correct: 1,
        },
        {
          q: "Que problema resuelve OpenTelemetry?",
          options: [
            "Logs estructurados",
            "Almacenamiento de metricas",
            "Estandarizar la instrumentacion de traces/metrics/logs (vendor-neutral)",
            "Encriptar comunicaciones",
          ],
          correct: 2,
        },
        {
          q: "Que es un error budget?",
          options: [
            "El dinero que gastas en alertas",
            "Cuanto downtime/errores te 'sobran' segun tu SLO",
            "El % de CPU permitido",
            "El presupuesto de CI",
          ],
          correct: 1,
        },
        {
          q: "Cual es el modelo de Prometheus?",
          options: [
            "Push (las apps envian metricas)",
            "Pull (Prometheus scrappea /metrics)",
            "Hibrido",
            "WebSockets",
          ],
          correct: 1,
        },
        {
          q: "Si tu SLO es 99.9% y tu SLA es 99.5%...",
          options: [
            "Esta mal: SLA siempre mas estricto que SLO",
            "Esta bien: SLO mas estricto te da margen ante el cliente",
            "Daria igual",
            "No tiene sentido",
          ],
          correct: 1,
        },
        {
          q: "Que dashboards conviene tener PRIMERO?",
          options: [
            "50 dashboards muy detallados",
            "Uno RED por servicio + uno USE por host, simples y leibles",
            "Solo dashboards de marketing",
            "Ninguno; los logs alcanzan",
          ],
          correct: 1,
        },
        {
          q: "Cual NO es buena practica de alertas?",
          options: [
            "Cada alerta tiene runbook",
            "Niveles (page / ticket / info)",
            "Alertar inmediatamente al primer fallo sin 'for:'",
            "SLO-based alerting (burn rate)",
          ],
          correct: 2,
        },
        {
          q: "Cual es el sucesor open source de Elasticsearch tras el cambio de licencia?",
          options: ["MongoDB", "OpenSearch", "PostgreSQL", "Cassandra"],
          correct: 1,
        },
      ],
    },
  ],
};
