import type { ModuleData } from "@/types/course";

// Kubernetes IV — Storage y Configuración.
// Volumes, PV, PVC, StorageClass, ConfigMap, Secret.
export const m6d: ModuleData = {
  slug: "m6d",
  number: 9,
  title: "Kubernetes IV — Storage y Configuración: Volumes, PVC, ConfigMaps y Secrets",
  icon: "💾",
  intro:
    "Los Pods son efímeros: cuando mueren, su sistema de archivos se va con ellos. Para apps que necesitan persistencia (bases de datos, uploads, caches grandes) K8s tiene un sistema potente y desacoplado: Volumes, PersistentVolumes, PersistentVolumeClaims y StorageClasses. Y para no hardcodear configuración o secretos en las imágenes, usás ConfigMaps y Secrets. En este módulo dominás todo eso.",
  totalActivities: 4,
  blocks: [
    // ============================================
    // PARTE 1 — VOLUMES (DENTRO DEL POD)
    // ============================================
    { kind: "h3", text: "📦 PARTE 1 — Volumes: persistencia dentro del Pod" },
    {
      kind: "paragraph",
      html:
        "Un <strong>Volume</strong> en K8s vive en el spec del Pod y le da a uno o varios containers un directorio compartido. A diferencia del filesystem efímero del container, el Volume sobrevive a reinicios del container (no del Pod entero, salvo que sea persistente).",
    },
    {
      kind: "table",
      headers: ["Tipo de Volume", "Cuándo usarlo"],
      rows: [
        ["emptyDir", "Compartir archivos entre containers del mismo Pod, scratch space, cache temporal"],
        ["hostPath", "Montar un path del Node (logs, sockets de Docker, certs). ⚠️ acopla al Node"],
        ["configMap / secret", "Inyectar config/secretos como archivos"],
        ["downwardAPI", "Inyectar metadata del Pod (nombre, labels, IP) como archivos"],
        ["projected", "Combinar varios sources (cm + secret + saToken) en un solo path"],
        ["persistentVolumeClaim", "Almacenamiento persistente, ligado a una PV"],
        ["csi", "Storage providers (EBS, GCE PD, Azure Disk, Ceph, Longhorn, etc.)"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># emptyDir compartido entre 2 containers del Pod\napiVersion: v1\nkind: Pod\nmetadata: { name: shared }\nspec:\n  containers:\n    - name: writer\n      image: busybox\n      command: [\"sh\",\"-c\",\"echo hola &gt; /data/saludo && sleep 3600\"]\n      volumeMounts: [{ name: cache, mountPath: /data }]\n    - name: reader\n      image: busybox\n      command: [\"sh\",\"-c\",\"sleep 5 && cat /data/saludo && sleep 3600\"]\n      volumeMounts: [{ name: cache, mountPath: /data }]\n  volumes:\n    - name: cache\n      emptyDir: {}</pre>",
    },

    // ============================================
    // PARTE 2 — PV / PVC / STORAGECLASS
    // ============================================
    { kind: "h3", text: "🗃️ PARTE 2 — PersistentVolume + PVC + StorageClass" },
    {
      kind: "paragraph",
      html:
        "El equipo de la app NO debería preocuparse por <em>dónde</em> está el disco. Sólo dice \"quiero 10Gi, RWO, rápido\". El equipo de infra (o el cloud) provee discos reales. K8s desacopla esto con 3 piezas:",
    },
    {
      kind: "table",
      headers: ["Recurso", "Quién lo crea", "Qué representa"],
      rows: [
        ["StorageClass", "Admin del cluster", "Una 'familia' de almacenamiento (gp3 en AWS, standard en GKE, etc.) con su provisioner"],
        ["PersistentVolume (PV)", "Admin o auto (dynamic provisioning)", "Una pieza concreta de almacenamiento (un disco)"],
        ["PersistentVolumeClaim (PVC)", "El developer / app", "\"Pido 10Gi RWO de esta StorageClass\""],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>" +
        "        Dev escribe          Admin define           Cloud/CSI provee\n" +
        "       PVC: 10Gi RWO   →   StorageClass gp3   →   PV creado dinámicamente\n" +
        "             │                                       │\n" +
        "             └──── K8s hace el binding ──────────────┘\n" +
        "             │\n" +
        "             ▼\n" +
        "          Pod monta el PVC en /var/lib/postgresql/data\n" +
        "</pre>",
    },
    { kind: "h4", text: "🎛️ Access Modes (importantísimo)" },
    {
      kind: "table",
      headers: ["Modo", "Qué permite", "Quién lo soporta"],
      rows: [
        ["ReadWriteOnce (RWO)", "1 Node escribe; otros no", "EBS, GCE PD, Azure Disk (block storage)"],
        ["ReadOnlyMany (ROX)", "Muchos Nodes leen, ninguno escribe", "NFS, ciertos CSI"],
        ["ReadWriteMany (RWX)", "Muchos Nodes escriben simultáneamente", "NFS, EFS, CephFS, Azure Files"],
        ["ReadWriteOncePod (RWOP)", "Sólo 1 Pod escribe (K8s 1.27+)", "Soporte por CSI"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>⚠️ El bug más común</strong>: pedís RWX pero tu StorageClass es block storage (EBS) → el Pod queda en Pending. RWX necesita filesystem distribuido (EFS, NFS, CephFS).",
    },
    { kind: "h4", text: "📝 Ejemplo end-to-end" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>---\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata: { name: gp3 }\nprovisioner: ebs.csi.aws.com\nparameters: { type: gp3, fsType: ext4 }\nreclaimPolicy: Delete\nvolumeBindingMode: WaitForFirstConsumer    # espera al Pod para elegir AZ\n---\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata: { name: pg-data }\nspec:\n  accessModes: [\"ReadWriteOnce\"]\n  storageClassName: gp3\n  resources:\n    requests: { storage: 20Gi }\n---\napiVersion: v1\nkind: Pod\nmetadata: { name: pg }\nspec:\n  containers:\n    - name: pg\n      image: postgres:16\n      env: [{ name: POSTGRES_PASSWORD, value: \"changeme\" }]\n      volumeMounts:\n        - { name: data, mountPath: /var/lib/postgresql/data }\n  volumes:\n    - name: data\n      persistentVolumeClaim: { claimName: pg-data }</pre>",
    },
    { kind: "h4", text: "♻️ Reclaim policies" },
    {
      kind: "table",
      headers: ["reclaimPolicy", "Qué pasa cuando borrás el PVC"],
      rows: [
        ["Retain", "El PV queda con los datos; lo limpiás vos a mano. Más seguro."],
        ["Delete", "Se borra el PV y el disco subyacente. Más cómodo."],
        ["Recycle", "Legacy, no lo uses."],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Snapshots</strong>: si el driver CSI lo soporta, podés crear <code>VolumeSnapshot</code> objects para respaldar PVCs.",
    },

    // ============================================
    // PARTE 3 — CONFIGMAPS
    // ============================================
    { kind: "h3", text: "🧾 PARTE 3 — ConfigMap: configuración no sensible" },
    {
      kind: "paragraph",
      html:
        "Un <strong>ConfigMap</strong> guarda pares clave-valor o archivos enteros (hasta ~1MB) y los inyecta a los containers como <strong>variables de entorno</strong> o como <strong>archivos montados</strong>. NUNCA pongas secretos acá (no se cifran).",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Crear desde la CLI\nkubectl create configmap app-config --from-literal=LOG_LEVEL=info --from-literal=PORT=3000\nkubectl create configmap app-files --from-file=./nginx.conf --from-file=./robots.txt</pre>",
    },
    { kind: "h4", text: "📝 Crear desde YAML" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: v1\nkind: ConfigMap\nmetadata: { name: app-config }\ndata:\n  LOG_LEVEL: \"info\"\n  PORT: \"3000\"\n  nginx.conf: |\n    server {\n      listen 80;\n      location / { root /usr/share/nginx/html; }\n    }</pre>",
    },
    { kind: "h4", text: "📥 Cómo lo consume el Pod" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>spec:\n  containers:\n    - name: api\n      image: api:1.0\n      # Modo 1: variables sueltas\n      env:\n        - name: PORT\n          valueFrom:\n            configMapKeyRef: { name: app-config, key: PORT }\n      # Modo 2: TODAS las claves como envs\n      envFrom:\n        - configMapRef: { name: app-config }\n      # Modo 3: como archivos\n      volumeMounts:\n        - { name: cm, mountPath: /etc/nginx/conf.d }\n  volumes:\n    - name: cm\n      configMap:\n        name: app-config\n        items:\n          - { key: nginx.conf, path: default.conf }</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>⚠️ Heads up</strong>: si actualizás un ConfigMap, los Pods que lo consumen como <em>env</em> NO ven el cambio hasta que se reinician. Los que lo consumen como <em>archivo</em> sí (auto-update tras unos segundos). Tools como <code>stakater/Reloader</code> reinician Pods al cambiar CMs.",
    },

    // ============================================
    // PARTE 4 — SECRETS
    // ============================================
    { kind: "h3", text: "🔐 PARTE 4 — Secrets: datos sensibles" },
    {
      kind: "paragraph",
      html:
        "Un <strong>Secret</strong> es como un ConfigMap pero diseñado para datos sensibles: passwords, tokens, certs. Los valores se almacenan en base64 (NO cifrado por defecto en etcd; activá <em>encryption at rest</em>). El acceso se controla con RBAC.",
    },
    {
      kind: "table",
      headers: ["type", "Para qué"],
      rows: [
        ["Opaque (default)", "Datos genéricos"],
        ["kubernetes.io/dockerconfigjson", "Credenciales de registry privado (imagePullSecrets)"],
        ["kubernetes.io/tls", "Certificado + clave para TLS"],
        ["kubernetes.io/service-account-token", "Token de ServiceAccount (auto)"],
        ["kubernetes.io/basic-auth", "Usuario/password"],
        ["kubernetes.io/ssh-auth", "Clave SSH privada"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Crear desde la CLI\nkubectl create secret generic db --from-literal=POSTGRES_PASSWORD=s3cret\nkubectl create secret tls web-tls --cert=./tls.crt --key=./tls.key\nkubectl create secret docker-registry ghcr-cred \\\n  --docker-server=ghcr.io --docker-username=USER --docker-password=TOKEN</pre>",
    },
    { kind: "h4", text: "📝 Secret YAML y consumo" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>apiVersion: v1\nkind: Secret\nmetadata: { name: db }\ntype: Opaque\nstringData:                       # NO hay que base64 manual: K8s lo codifica\n  POSTGRES_PASSWORD: \"s3cret\"\n---\napiVersion: v1\nkind: Pod\nmetadata: { name: pg }\nspec:\n  imagePullSecrets:\n    - name: ghcr-cred\n  containers:\n    - name: pg\n      image: postgres:16\n      env:\n        - name: POSTGRES_PASSWORD\n          valueFrom:\n            secretKeyRef: { name: db, key: POSTGRES_PASSWORD }</pre>",
    },
    { kind: "h4", text: "🔒 Cómo proteger Secrets en serio" },
    {
      kind: "list",
      items: [
        "<strong>Encryption at rest</strong> de etcd (KMS provider): cifrá los Secrets en el disco.",
        "<strong>RBAC estricto</strong>: nadie debería poder <code>kubectl get secret</code> en producción.",
        "<strong>Sealed Secrets</strong> (Bitnami): podés commitear el cipher en Git, sólo el cluster lo descifra.",
        "<strong>External Secrets Operator</strong>: lee de AWS Secrets Manager, HashiCorp Vault, GCP SM, Azure Key Vault.",
        "<strong>SOPS + age/PGP</strong>: cifrá YAMLs antes de commitearlos.",
        "<strong>Rotación</strong>: nunca dejes credenciales vivas para siempre.",
      ],
    },

    // ============================================
    // PARTE 5 — PATRONES PRÁCTICOS
    // ============================================
    { kind: "h3", text: "🧩 PARTE 5 — Patrones que vas a usar todos los días" },
    {
      kind: "list",
      items: [
        "<strong>App + DB</strong>: Deployment de la app con env desde ConfigMap (URL, puerto) y password desde Secret.",
        "<strong>NGINX con config custom</strong>: ConfigMap montado como volume en <code>/etc/nginx/conf.d</code>.",
        "<strong>Certificados TLS</strong>: cert-manager crea Secrets tipo kubernetes.io/tls; Ingress los referencia.",
        "<strong>Cache compartida entre containers</strong>: emptyDir entre app y sidecar.",
        "<strong>Logs hacia el Node</strong>: hostPath bajo <code>/var/log/apps</code> (¡atención al cleanup!).",
        "<strong>Storage persistente para DB</strong>: PVC ligado a StorageClass del cloud (gp3 / pd-ssd).",
        "<strong>Backups</strong>: VolumeSnapshot + CronJob que copia a S3.",
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Operación: ver qué PVCs hay y cuál es su PV\nkubectl get pvc -A\nkubectl get pv\n# Inspeccionar volúmenes montados de un Pod\nkubectl describe pod mi-pod | grep -A5 \"Volumes\"\n# Ver tamaño usado dentro del Pod\nkubectl exec mi-pod -- df -h</pre>",
    },

    // ============================================
    // PARTE 6 — EJERCICIOS
    // ============================================
    { kind: "h3", text: "✍️ PARTE 6 — Tu turno" },
    {
      kind: "fillBlanks",
      key: "m6d_fill",
      items: [
        { text: "El recurso donde el dev pide almacenamiento se llama ___.", answer: "PVC", es: "PVC" },
        { text: "El recurso real (el disco) en K8s se llama ___.", answer: "PV", es: "PV" },
        { text: "La 'familia' de almacenamiento que define el provisioner es la ___.", answer: "StorageClass", es: "StorageClass" },
        { text: "El access mode que permite 1 sólo Node escribiendo es ___.", answer: "ReadWriteOnce", es: "ReadWriteOnce" },
        { text: "Para configuración no sensible se usa un ___.", answer: "ConfigMap", es: "ConfigMap" },
        { text: "Para datos sensibles (password, tokens) se usa un ___.", answer: "Secret", es: "Secret" },
        { text: "El tipo de Secret para registries privados es kubernetes.io/___.", answer: "dockerconfigjson", es: "dockerconfigjson" },
        { text: "El volume efímero entre containers del mismo Pod es ___.", answer: "emptyDir", es: "emptyDir" },
      ],
    },
    {
      kind: "matching",
      key: "m6d_matching",
      pairs: [
        { en: "emptyDir", es: "Scratch space compartido en el Pod" },
        { en: "hostPath", es: "Path del Node (acopla al Node)" },
        { en: "PVC", es: "Solicitud de almacenamiento" },
        { en: "PV", es: "Pieza concreta de storage" },
        { en: "StorageClass", es: "Define provisioner y parámetros" },
        { en: "RWO", es: "Un Node escribe, otros no" },
        { en: "RWX", es: "Muchos Nodes escriben (NFS/EFS)" },
        { en: "ConfigMap", es: "Configuración no sensible" },
        { en: "Secret", es: "Datos sensibles, base64 en etcd" },
        { en: "VolumeSnapshot", es: "Backup point-in-time del PVC" },
      ],
    },
    {
      kind: "quiz",
      key: "m6d_quiz",
      questions: [
        {
          q: "Tu Pod necesita almacenar datos que sobrevivan a reinicios. ¿Qué usás?",
          options: ["emptyDir", "ConfigMap", "PVC + PV", "hostPath"],
          correct: 2,
        },
        {
          q: "El developer pide storage con un objeto llamado…",
          options: ["StorageClass", "PV", "PVC", "Volume"],
          correct: 2,
        },
        {
          q: "Tu PVC pide RWX pero está pendiente para siempre. La causa más probable es…",
          options: [
            "La SC es block storage (no soporta RWX)",
            "Falta un Service",
            "Falta NetworkPolicy",
            "El Pod no tiene resources",
          ],
          correct: 0,
        },
        {
          q: "Una Secret se codifica en…",
          options: ["AES-256 automáticamente", "Base64 (no es cifrado)", "Texto plano sin codificar", "SHA-256"],
          correct: 1,
          explanation: "Por defecto Secrets están en base64. Necesitás encryption-at-rest de etcd para cifrarlos.",
        },
        {
          q: "Para credenciales de un registry privado el tipo de Secret correcto es…",
          options: [
            "Opaque",
            "kubernetes.io/dockerconfigjson",
            "kubernetes.io/tls",
            "kubernetes.io/basic-auth",
          ],
          correct: 1,
        },
        {
          q: "Cambiaste un ConfigMap, pero los Pods que lo usan como env NO ven el cambio. ¿Por qué?",
          options: [
            "Sólo se propaga cuando reiniciás los Pods",
            "El ConfigMap es read-only",
            "Faltaba un Service",
            "etcd lo bloquea",
          ],
          correct: 0,
        },
        {
          q: "reclaimPolicy: Delete significa que al borrar el PVC…",
          options: [
            "Se conservan los datos",
            "Se borra el PV y el disco subyacente",
            "Se borra el Pod",
            "Se desconecta del cluster",
          ],
          correct: 1,
        },
        {
          q: "Una StorageClass con volumeBindingMode: WaitForFirstConsumer…",
          options: [
            "Crea el PV antes que el Pod",
            "Espera a que un Pod use el PVC para elegir AZ/Node",
            "No crea PVs",
            "Sólo en NFS",
          ],
          correct: 1,
        },
        {
          q: "Quiero commitear secretos cifrados en Git. ¿Herramienta apropiada?",
          options: ["ConfigMap", "Sealed Secrets / SOPS / External Secrets", "HostPath", "PV"],
          correct: 1,
        },
        {
          q: "¿Qué montaje permite a 2 containers del MISMO Pod compartir archivos rápidamente?",
          options: ["PVC RWO", "emptyDir", "hostPath", "ConfigMap"],
          correct: 1,
        },
      ],
    },
  ],
};
