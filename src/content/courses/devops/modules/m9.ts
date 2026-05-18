import type { ModuleData } from "@/types/course";

// Modulo 13 (number=13) - DevSecOps.
export const m9: ModuleData = {
  slug: "m9",
  number: 13,
  title: "Modulo 13 - DevSecOps: Seguridad en el ciclo DevOps",
  icon: "S",
  intro:
    "Seguridad no es un firewall que se compra al final del proyecto: es algo que se construye en cada etapa del ciclo (shift-left). DevSecOps integra controles de seguridad automatizados en el codigo, en los containers, en la infra, en CI/CD, en runtime. En este modulo arrancamos desde cero: que es shift-left, OWASP Top 10, tipos de scanning (SAST/DAST/SCA/IaC), gestion de secretos, scanning de imagenes Docker, supply chain (SBOM, sign images), runtime security, y un mapa de herramientas que se usan en empresa todos los dias.",
  totalActivities: 5,
  blocks: [
    { kind: "h3", text: "PARTE 1 - Que es DevSecOps" },
    {
      kind: "paragraph",
      html:
        "DevSecOps = DevOps + Seguridad integrada desde el primer commit. El concepto clave es <strong>shift-left</strong>: mover los controles de seguridad lo MAS al principio del ciclo posible. Detectar una vulnerabilidad en el commit es 100x mas barato que detectarla en produccion.",
    },
    {
      kind: "table",
      headers: ["Antes (seguridad al final)", "DevSecOps (shift-left)"],
      rows: [
        ["El equipo SecOps audita 1 vez al año", "Cada PR pasa por escaners automaticos"],
        ["Las vulnerabilidades salen a la luz en pentests", "Las CVEs se detectan en el build"],
        ["Seguridad bloquea releases", "Seguridad provee tooling self-service"],
        ["Mentalidad: 'no, no podes deployar eso'", "Mentalidad: 'si, deployalo, pero pasa estos 5 checks'"],
      ],
    },

    { kind: "h3", text: "PARTE 2 - Triada CIA y modelo de amenazas" },
    {
      kind: "table",
      headers: ["Letra", "Que protege"],
      rows: [
        ["C - Confidentiality", "Que solo los autorizados vean los datos (encryption, RBAC, TLS)"],
        ["I - Integrity", "Que los datos no se modifiquen sin autorizacion (hashing, signatures, audit logs)"],
        ["A - Availability", "Que el servicio este disponible cuando se necesita (HA, backups, DDoS protection)"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>STRIDE</strong> es un framework para modelar amenazas: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege. Para cada componente de tu sistema, te preguntas cual de estos aplica.",
    },

    { kind: "h3", text: "PARTE 3 - OWASP Top 10 (lo que mas ataca)" },
    {
      kind: "table",
      headers: ["#", "Vulnerabilidad (2021)", "Defensa basica"],
      rows: [
        ["1", "Broken Access Control", "Tests de autorizacion; RBAC; default-deny"],
        ["2", "Cryptographic Failures", "TLS 1.3; no MD5/SHA1; vault para keys"],
        ["3", "Injection (SQL, command, LDAP)", "Parametrized queries; ORM; validar input"],
        ["4", "Insecure Design", "Threat modeling desde diseño; secure by default"],
        ["5", "Security Misconfiguration", "Hardening baselines; scanners de config"],
        ["6", "Vulnerable / Outdated Components", "Dependabot; SCA; actualizar deps"],
        ["7", "Identification and Auth Failures", "MFA; password hashing (bcrypt/argon2); rate limit"],
        ["8", "Software and Data Integrity Failures", "Sign artifacts; verify SBOMs; supply chain"],
        ["9", "Security Logging and Monitoring Failures", "Loggea logins, cambios sensibles; SIEM"],
        ["10", "Server-Side Request Forgery (SSRF)", "Whitelist destinos; block metadata IP"],
      ],
    },

    { kind: "h3", text: "PARTE 4 - Tipos de scanning" },
    {
      kind: "table",
      headers: ["Tipo", "Que escanea", "Cuando corre", "Ejemplos"],
      rows: [
        ["SAST (Static App Security Testing)", "Tu codigo fuente", "En CI / IDE", "Semgrep, SonarQube, CodeQL, Checkmarx"],
        ["DAST (Dynamic App Security Testing)", "La app corriendo (black-box)", "En staging", "OWASP ZAP, Burp, Nuclei"],
        ["SCA (Software Composition Analysis)", "Dependencias de terceros", "En CI", "Dependabot, Renovate, Snyk, Trivy"],
        ["IaC scanning", "Tus archivos Terraform/CloudFormation/K8s", "En CI", "tfsec, Checkov, KICS, Kubesec"],
        ["Container image scanning", "Imagenes Docker (CVEs, configs)", "En CI / registry", "Trivy, Grype, Clair, Snyk Container"],
        ["Secret scanning", "Codigo y commits buscando credenciales", "En CI, git hooks", "gitleaks, truffleHog, GitHub secret scanning"],
        ["RASP", "Runtime - dentro del proceso", "En produccion", "Contrast, Sqreen"],
      ],
    },

    { kind: "h3", text: "PARTE 5 - Gestion de secretos" },
    {
      kind: "list",
      items: [
        "<strong>NUNCA</strong> commitees passwords, tokens, llaves privadas. <code>.env</code> al .gitignore SIEMPRE.",
        "Si ya se commiteo: rota el secreto INMEDIATAMENTE y limpia el historial con <code>git filter-repo</code> o BFG.",
        "<strong>Vault de secretos</strong> en produccion: HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager, Azure Key Vault.",
        "<strong>Sealed Secrets</strong> (Bitnami): podes commitear el ciphertext en Git, solo el cluster lo descifra.",
        "<strong>SOPS + age/PGP</strong>: cifra YAMLs antes del commit.",
        "<strong>External Secrets Operator</strong> (Kubernetes): trae secretos de Vault/AWS/GCP y los expone como Secret nativo.",
        "<strong>Rotacion</strong> periodica obligatoria (90 dias) y <strong>auditoria</strong> de accesos.",
        "<strong>Least privilege</strong>: cada secret accesible solo por quien lo necesita.",
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Detectar secretos accidentalmente commiteados\ngitleaks detect --source . --verbose\ntrufflehog filesystem --directory .\n\n# Pre-commit hook (.pre-commit-config.yaml)\nrepos:\n  - repo: https://github.com/gitleaks/gitleaks\n    rev: v8.18.0\n    hooks:\n      - id: gitleaks</pre>",
    },

    { kind: "h3", text: "PARTE 6 - Seguridad en CI/CD pipelines" },
    {
      kind: "list",
      items: [
        "<strong>Permisos minimos</strong>: el GITHUB_TOKEN por default deberia ser <code>read</code>; abrir <code>write</code> solo donde haga falta.",
        "<strong>OIDC</strong> a clouds en vez de keys estaticas (cubierto en Modulo 4).",
        "<strong>Pin de actions a SHA</strong>: <code>actions/checkout@a1b2c3...</code> en vez de <code>@v4</code>. Evita ataques tipo 'tag overwrite'.",
        "<strong>Branch protection rules</strong>: requiere PRs, status checks verdes, review, signed commits.",
        "<strong>Untrusted PRs (forks)</strong>: NO ejecutar workflows con permisos sensibles desde forks sin aprobacion.",
        "<strong>SBOM en cada build</strong> con syft o syft-via-trivy.",
        "<strong>Signar artifacts</strong> con cosign / sigstore.",
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># En GitHub Actions, principio de minimo privilegio\nperms:\n  contents: read           # default seguro\n# y solo donde haga falta:\n  packages: write\n  id-token: write          # OIDC</pre>",
    },

    { kind: "h3", text: "PARTE 7 - Container security" },
    {
      kind: "list",
      items: [
        "<strong>Base images chicas</strong>: alpine, distroless. Menos superficie = menos CVEs.",
        "<strong>USER nonroot</strong>: NUNCA corras como root dentro del container.",
        "<strong>Readonly root filesystem</strong>: si la app no necesita escribir, marca el FS readonly.",
        "<strong>Drop capabilities</strong>: <code>--cap-drop=ALL --cap-add=NET_BIND_SERVICE</code>.",
        "<strong>no-new-privileges</strong>: bloquea setuid escalation.",
        "<strong>Sin shell, sin package manager</strong> en distroless: menos para atacar.",
        "<strong>Scan en CI y registry</strong>: <code>trivy image miapp:1.0</code>; fail si hay vulnerabilidad critica.",
        "<strong>Pin imagenes por digest</strong>: <code>nginx@sha256:abc...</code> en lugar de <code>nginx:1.27</code>.",
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Trivy en CI\ntrivy image --severity HIGH,CRITICAL --exit-code 1 ghcr.io/empresa/api:${SHA}\n\n# Generar SBOM\nsyft ghcr.io/empresa/api:${SHA} -o spdx-json &gt; sbom.json\n\n# Firmar imagen\ncosign sign --key cosign.key ghcr.io/empresa/api:${SHA}\n\n# Verificar firma\ncosign verify --key cosign.pub ghcr.io/empresa/api:${SHA}</pre>",
    },

    { kind: "h3", text: "PARTE 8 - Supply chain security" },
    {
      kind: "paragraph",
      html:
        "Tu app es solo el 5% del codigo que se ejecuta; el resto son dependencias. Si una de ellas esta comprometida (caso SolarWinds, log4shell, xz-utils 2024), vos estas comprometido. La <strong>supply chain security</strong> ataca este problema.",
    },
    {
      kind: "list",
      items: [
        "<strong>SBOM (Software Bill of Materials)</strong>: lista de TODOS los paquetes con versiones que vienen en tu artefacto. Formatos: SPDX, CycloneDX.",
        "<strong>Verificar firmas</strong>: usa cosign para firmar imagenes y verificar antes de deploy.",
        "<strong>SLSA framework</strong>: niveles 1-4 de garantia sobre la cadena de build.",
        "<strong>In-toto attestations</strong>: pruebas criptograficas de que el artefacto se construyo de cierta manera.",
        "<strong>Dependency pinning</strong>: lockfiles (package-lock.json, requirements.txt, go.sum) con SHAs.",
        "<strong>Renovate / Dependabot</strong>: PRs automaticos de updates, con changelog.",
      ],
    },

    { kind: "h3", text: "PARTE 9 - Kubernetes security" },
    {
      kind: "list",
      items: [
        "<strong>RBAC estricto</strong>: nadie deberia tener cluster-admin en prod.",
        "<strong>Pod Security Standards (restricted)</strong> en namespaces de prod.",
        "<strong>NetworkPolicies default-deny</strong> + permitir solo lo necesario.",
        "<strong>Image policies</strong>: kyverno, OPA Gatekeeper bloquean imagenes sin firma o desde registries no permitidos.",
        "<strong>Falco / Tetragon</strong>: detectan comportamiento sospechoso en runtime (shell en container, escapes, etc.).",
        "<strong>Secrets cifrados en etcd</strong> con KMS provider.",
        "<strong>Service Mesh (Istio, Linkerd)</strong>: mTLS automatico entre microservicios.",
        "<strong>Backups y disaster recovery</strong>: Velero para snapshots del cluster.",
      ],
    },

    { kind: "h3", text: "PARTE 10 - Compliance y auditoria" },
    {
      kind: "table",
      headers: ["Estandar", "Que cubre"],
      rows: [
        ["ISO 27001", "Gestion general de seguridad de la informacion"],
        ["SOC 2", "Controles para SaaS B2B (US)"],
        ["PCI-DSS", "Si manejas tarjetas de credito"],
        ["HIPAA", "Datos de salud (US)"],
        ["GDPR", "Datos personales en EU (privacy)"],
        ["CIS Benchmarks", "Hardening guides especificos (Linux, K8s, Docker)"],
        ["NIST 800-53 / 800-190", "Marcos del gobierno US"],
      ],
    },

    { kind: "h3", text: "PARTE 11 - Mapa de herramientas DevSecOps" },
    {
      kind: "vocab",
      items: [
        { word: "Semgrep / CodeQL / SonarQube", meaning: "SAST" },
        { word: "Trivy / Grype / Snyk", meaning: "SCA + container scanning" },
        { word: "tfsec / Checkov / KICS", meaning: "IaC scanning" },
        { word: "OWASP ZAP / Nuclei", meaning: "DAST" },
        { word: "gitleaks / truffleHog", meaning: "Secret scanning" },
        { word: "HashiCorp Vault / AWS SM / Sealed Secrets", meaning: "Secrets management" },
        { word: "cosign / sigstore / SLSA", meaning: "Supply chain (sign + verify)" },
        { word: "syft", meaning: "Generar SBOMs" },
        { word: "Falco / Tetragon", meaning: "Runtime security en K8s" },
        { word: "OPA Gatekeeper / Kyverno", meaning: "Policy as code en K8s" },
        { word: "Velero", meaning: "Backup/restore de K8s" },
        { word: "Dependabot / Renovate", meaning: "Updates automaticos de deps" },
      ],
    },

    { kind: "h3", text: "PARTE 12 - Cultura: blameless culture + bug bounty" },
    {
      kind: "list",
      items: [
        "<strong>Blameless post-mortems</strong>: si hubo un incidente de seguridad, la causa es sistemica. Aprender, no culpar.",
        "<strong>Bug bounty programs</strong>: pagar a investigadores externos por reportar vulnerabilidades (HackerOne, Bugcrowd).",
        "<strong>Security champions</strong>: en cada equipo, una persona que es el 'nexo' con SecOps.",
        "<strong>Red team / Blue team / Purple team</strong>: ejercicios de ataque y defensa internos.",
        "<strong>Security training continuo</strong>: cursos cortos, simulaciones de phishing.",
        "<strong>Defense in depth</strong>: nunca confies en una sola capa. Si el firewall falla, que la app tenga input validation. Si la app falla, que el WAF detecte. Etc.",
      ],
    },

    { kind: "h3", text: "PARTE 13 - Ponete a prueba" },
    {
      kind: "fillBlanks",
      key: "m9_fill",
      items: [
        { text: "Mover los controles de seguridad al inicio del ciclo se llama shift-___.", answer: "left", es: "left" },
        { text: "El scanning de codigo fuente se llama ___.", answer: "SAST", es: "SAST" },
        { text: "El scanning de la app corriendo (black-box) se llama ___.", answer: "DAST", es: "DAST" },
        { text: "El scanning de dependencias de terceros se llama ___.", answer: "SCA", es: "SCA" },
        { text: "La triada de seguridad clasica es Confidentiality, Integrity y ___.", answer: "Availability", es: "Availability" },
        { text: "Un SBOM es un Software ___ of Materials.", answer: "Bill", es: "Bill" },
        { text: "La herramienta de scanning de imagenes mas popular en open source es ___.", answer: "Trivy", es: "Trivy" },
        { text: "Para firmar imagenes Docker se usa ___.", answer: "cosign", es: "cosign" },
        { text: "El antipatron de hardcodear credenciales en codigo se detecta con secret ___.", answer: "scanning", es: "scanning" },
        { text: "La autenticacion de GitHub Actions hacia AWS sin keys se llama ___.", answer: "OIDC", es: "OIDC" },
      ],
    },
    {
      kind: "matching",
      key: "m9_matching",
      pairs: [
        { en: "SAST", es: "Scan de codigo fuente" },
        { en: "DAST", es: "Scan de app corriendo" },
        { en: "SCA", es: "Scan de dependencias" },
        { en: "IaC scanning", es: "Scan de TF/CloudFormation/K8s" },
        { en: "Container scanning", es: "Scan de imagenes Docker" },
        { en: "Secret scanning", es: "Buscar credenciales en codigo" },
        { en: "SBOM", es: "Inventario de paquetes en un build" },
        { en: "cosign", es: "Firmar y verificar imagenes" },
        { en: "Vault / SM", es: "Almacen seguro de secretos" },
        { en: "Falco / Tetragon", es: "Runtime security K8s" },
        { en: "OPA / Kyverno", es: "Policy-as-code" },
        { en: "OWASP Top 10", es: "Top vulnerabilidades web" },
      ],
    },
    {
      kind: "quiz",
      key: "m9_quiz",
      questions: [
        {
          q: "Que es shift-left en seguridad?",
          options: [
            "Hacer scan despues del deploy",
            "Mover los controles al inicio del ciclo (en el codigo y CI)",
            "Empujar el equipo a la izquierda en el organigrama",
            "Una libreria",
          ],
          correct: 1,
        },
        {
          q: "Para escanear vulnerabilidades en imagenes Docker se usa...",
          options: ["Semgrep", "Trivy", "OWASP ZAP", "OPA"],
          correct: 1,
        },
        {
          q: "Si commiteas un AWS access key, lo primero que haces es...",
          options: [
            "Borrar el commit y olvidarte",
            "Rotar (invalidar y crear nueva) inmediatamente",
            "Agregar al .gitignore",
            "Esperar 24h",
          ],
          correct: 1,
          explanation: "Borrar el commit no borra del historial (y bots scrappean GH en minutos). Rotar es lo primero, despues limpia el historial.",
        },
        {
          q: "Que NO es una buena practica de container security?",
          options: [
            "USER nonroot",
            "Imagen distroless",
            "Correr como root con cap-add ALL",
            "Pinear por digest (sha256)",
          ],
          correct: 2,
        },
        {
          q: "Un SBOM sirve para...",
          options: [
            "Encriptar la imagen",
            "Tener inventario verificable de TODOS los componentes del artifact",
            "Mejorar performance",
            "Generar logs",
          ],
          correct: 1,
        },
        {
          q: "Para policy-as-code en Kubernetes se usa...",
          options: [
            "Prometheus",
            "OPA Gatekeeper o Kyverno",
            "Falco",
            "Trivy",
          ],
          correct: 1,
        },
        {
          q: "DAST se diferencia de SAST en que...",
          options: [
            "DAST escanea codigo fuente; SAST escanea la app corriendo",
            "DAST escanea la app corriendo; SAST escanea codigo fuente",
            "Son sinonimos",
            "DAST es solo para Java",
          ],
          correct: 1,
        },
        {
          q: "OWASP Top 10 numero 1 (2021) es...",
          options: ["Injection", "Broken Access Control", "XSS", "SSRF"],
          correct: 1,
        },
        {
          q: "Para detectar comportamiento sospechoso en runtime en containers se usa...",
          options: ["Trivy", "Falco / Tetragon", "Semgrep", "Vault"],
          correct: 1,
        },
        {
          q: "Que problema resuelve OIDC en CI/CD a la nube?",
          options: [
            "Acelera los runs",
            "Permite autenticarse sin guardar credenciales estaticas",
            "Encripta los logs",
            "Crea SBOMs",
          ],
          correct: 1,
        },
        {
          q: "Defense in depth significa...",
          options: [
            "Una sola capa muy fuerte",
            "Multiples capas defensivas; si una falla otras cubren",
            "Solo proteger en runtime",
            "Apagar la red",
          ],
          correct: 1,
        },
        {
          q: "Cual NO es un estandar de compliance?",
          options: ["ISO 27001", "SOC 2", "GDPR", "ICMP"],
          correct: 3,
          explanation: "ICMP es un protocolo de red (ping), no un estandar de seguridad.",
        },
      ],
    },
  ],
};
