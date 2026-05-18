import type { ModuleData } from "@/types/course";

// Modulo 3 - Docker y containers desde cero.
export const m3: ModuleData = {
  slug: "m3",
  number: 3,
  title: "Modulo 3 - Docker y Containers desde Cero",
  icon: "D",
  intro:
    "Los containers cambiaron la forma en que se desarrolla, prueba y despliega software. Antes: 'funciona en mi maquina' era el mantra de la frustracion. Despues de Docker: la app y TODAS sus dependencias se empaquetan en una unidad reproducible que corre igual en tu laptop, en CI y en produccion. En este modulo entendes que es realmente un container (no es magia, son features del kernel de Linux), aprendes a escribir Dockerfiles eficientes, multi-stage builds, networking, volumenes, Docker Compose, mejores practicas de seguridad y el camino hacia Kubernetes.",
  totalActivities: 5,
  blocks: [
    { kind: "h3", text: "PARTE 1 - Que es un container (no es magia)" },
    {
      kind: "paragraph",
      html:
        "Un <strong>container</strong> es un proceso del kernel de Linux que esta aislado del resto del sistema mediante 2 features: <strong>namespaces</strong> (le hacen ver al proceso que tiene su propio sistema de archivos, su propia red, su propio PID 1) y <strong>cgroups</strong> (le limitan cuanta CPU, RAM, IO puede usar). Lo de 'container' es una metafora: en realidad es solo un proceso muy bien encapsulado.",
    },
    {
      kind: "table",
      headers: ["Aspecto", "VM (virtual machine)", "Container"],
      rows: [
        ["Kernel propio", "Si (1 OS completo por VM)", "No (comparte el del host)"],
        ["Tiempo de arranque", "Decenas de segundos", "Milisegundos"],
        ["Tamaño tipico", "GB", "MB (a veces KB con distroless)"],
        ["Densidad", "Pocas VMs por host", "Cientos de containers por host"],
        ["Aislamiento", "Fuerte (hypervisor)", "Medio (namespaces + cgroups)"],
        ["Caso de uso", "Cargas heterogeneas, OS distintos", "Microservicios, dev consistente"],
      ],
    },
    {
      kind: "info",
      html:
        "<strong>Imagen vs Container</strong>:<br/>" +
        "Una <strong>imagen</strong> es una plantilla inmutable (read-only) con tu app, sus libs y la config para correr. Es como un .iso o una clase en POO.<br/>" +
        "Un <strong>container</strong> es una INSTANCIA en ejecucion de esa imagen. Es como un objeto instanciado de la clase. Podes tener N containers corriendo de la misma imagen.",
    },
    {
      kind: "tip",
      html:
        "<strong>Docker no es el unico container runtime</strong>. Existen <code>containerd</code> (lo que usa Kubernetes por debajo desde 1.24), <code>CRI-O</code>, <code>podman</code> (compatible con Docker, sin daemon). El estandar es OCI (Open Container Initiative).",
    },

    { kind: "h3", text: "PARTE 2 - Instalacion y verificacion" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Linux (Ubuntu/Debian)\ncurl -fsSL https://get.docker.com | sh\nsudo usermod -aG docker $USER         # logout/login para que aplique\n\n# macOS / Windows\n# Instalar Docker Desktop desde docker.com\n\n# Verificar\ndocker --version\ndocker run hello-world                 # bajar y correr la imagen de prueba\ndocker info                            # info del daemon</pre>",
    },

    { kind: "h3", text: "PARTE 3 - Trabajar con imagenes" },
    {
      kind: "table",
      headers: ["Comando", "Que hace"],
      rows: [
        ["docker pull nginx:1.27", "Bajar una imagen del registry"],
        ["docker images", "Listar imagenes locales"],
        ["docker rmi nginx:1.27", "Borrar una imagen"],
        ["docker image prune", "Borrar imagenes sin usar"],
        ["docker build -t miapp:1.0 .", "Construir imagen desde un Dockerfile en el directorio actual"],
        ["docker tag miapp:1.0 user/miapp:1.0", "Renombrar/taggear"],
        ["docker push user/miapp:1.0", "Subir a un registry (Docker Hub, GHCR, ECR...)"],
        ["docker history miapp:1.0", "Ver las capas de una imagen"],
        ["docker inspect miapp:1.0", "Detalle completo (JSON) de la imagen"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>Tags y versionado</strong>: NUNCA uses <code>latest</code> en produccion. Usa tags semanticos (<code>v1.4.2</code>) o el SHA del commit (<code>sha-abc123</code>). El tag <code>latest</code> es un puntero que cambia y rompe builds reproducibles.",
    },

    { kind: "h3", text: "PARTE 4 - Trabajar con containers" },
    {
      kind: "table",
      headers: ["Comando", "Que hace"],
      rows: [
        ["docker run nginx", "Crear y arrancar un container (foreground)"],
        ["docker run -d nginx", "Detached (background)"],
        ["docker run -p 8080:80 nginx", "Mapear puerto host:container"],
        ["docker run -e KEY=val nginx", "Pasar variable de entorno"],
        ["docker run -v $(pwd):/app nginx", "Montar volumen (bind mount)"],
        ["docker run --name web nginx", "Asignar nombre al container"],
        ["docker run --rm nginx", "Borrar el container cuando termina"],
        ["docker ps", "Ver containers corriendo"],
        ["docker ps -a", "Ver TODOS (incluso parados)"],
        ["docker logs -f web", "Stream de logs"],
        ["docker exec -it web sh", "Abrir shell dentro de un container corriendo"],
        ["docker stop web", "Detener (SIGTERM, luego SIGKILL)"],
        ["docker start web", "Volver a arrancar un container parado"],
        ["docker rm web", "Borrar container"],
        ["docker container prune", "Borrar todos los parados"],
        ["docker stats", "CPU/RAM/IO en tiempo real"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Ejemplo completo: Postgres con persistencia\ndocker run -d \\\n  --name pg \\\n  -p 5432:5432 \\\n  -e POSTGRES_PASSWORD=secret \\\n  -e POSTGRES_DB=midb \\\n  -v pgdata:/var/lib/postgresql/data \\\n  postgres:16\n\n# Conectarse a la DB desde el host\npsql -h localhost -U postgres -d midb</pre>",
    },

    { kind: "h3", text: "PARTE 5 - Dockerfile (anatomia completa)" },
    {
      kind: "paragraph",
      html:
        "Un <strong>Dockerfile</strong> es una receta declarativa para construir una imagen. Cada instruccion crea una nueva <strong>capa</strong> (layer) cacheable.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>FROM node:20-alpine          # imagen base\n\nWORKDIR /app                  # dir de trabajo dentro del container\n\nCOPY package*.json ./         # PRIMERO copio solo package.json para cachear npm install\nRUN npm ci --only=production  # instala deps (capa cacheada si package.json no cambio)\n\nCOPY . .                      # ahora copio el resto del codigo\n\nEXPOSE 3000                   # documenta el puerto (no lo abre, eso lo hace -p)\n\nENV NODE_ENV=production\n\nUSER node                     # NO correr como root!\n\nCMD [\"node\", \"server.js\"]     # comando por defecto</pre>",
    },
    {
      kind: "table",
      headers: ["Instruccion", "Para que sirve"],
      rows: [
        ["FROM", "Imagen base (la unica obligatoria)"],
        ["WORKDIR", "Directorio de trabajo dentro del container"],
        ["COPY / ADD", "Copiar archivos del host al container (COPY preferido)"],
        ["RUN", "Ejecutar comando durante el BUILD (crea capa)"],
        ["ENV", "Variable de entorno (build-time y runtime)"],
        ["ARG", "Variable solo durante BUILD"],
        ["EXPOSE", "Documenta puertos (no los abre)"],
        ["USER", "Usuario con el que corre el container"],
        ["VOLUME", "Marca un path como volumen"],
        ["CMD", "Comando por defecto (sobreescribible con docker run)"],
        ["ENTRYPOINT", "Comando fijo, los args de docker run se concatenan"],
        ["HEALTHCHECK", "Endpoint que Docker chequea para saber si el container esta sano"],
      ],
    },

    { kind: "h3", text: "PARTE 6 - Multi-stage builds (la clave para imagenes pequeñas)" },
    {
      kind: "paragraph",
      html:
        "Un multi-stage build te permite usar UNA imagen pesada para compilar (con compiladores, dev deps, etc.) y SOLO copiar el binario o los archivos finales a una imagen liviana. Resultado: imagenes que pesan 50MB en vez de 1.5GB.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Multi-stage Dockerfile para una app Node + frontend\n\n# Stage 1: build\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build       # genera /app/dist\n\n# Stage 2: runtime (mucho mas chico)\nFROM nginx:1.27-alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\nEXPOSE 80\nCMD [\"nginx\", \"-g\", \"daemon off;\"]</pre>",
    },
    { kind: "h4", text: "Distroless: imagenes minimas para produccion" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>FROM golang:1.22 AS builder\nWORKDIR /src\nCOPY . .\nRUN CGO_ENABLED=0 go build -o /app\n\nFROM gcr.io/distroless/static:nonroot\nCOPY --from=builder /app /app\nUSER nonroot:nonroot\nENTRYPOINT [\"/app\"]</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>Distroless</strong> (Google) son imagenes con SOLO tu binario, sin shell, sin gestor de paquetes. Mas seguras (menos superficie de ataque), mas chicas, mas rapidas. Contras: no podes hacer <code>docker exec -it sh</code> para debug.",
    },

    { kind: "h3", text: "PARTE 7 - Volumenes y persistencia" },
    {
      kind: "table",
      headers: ["Tipo", "Donde vive", "Cuando usarlo"],
      rows: [
        ["Volume (named)", "Docker lo gestiona en /var/lib/docker", "Persistencia de datos (DBs, uploads)"],
        ["Bind mount", "Un path del host", "Desarrollo (hot reload), montar configs"],
        ["tmpfs", "RAM del host", "Datos sensibles que NO deben tocar disco"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Named volume (recomendado para datos)\ndocker volume create midata\ndocker run -v midata:/data nginx\ndocker volume ls\ndocker volume inspect midata\n\n# Bind mount (dev)\ndocker run -v $(pwd):/app -v /app/node_modules node:20\n\n# tmpfs\ndocker run --tmpfs /tmp nginx</pre>",
    },

    { kind: "h3", text: "PARTE 8 - Networking" },
    {
      kind: "table",
      headers: ["Driver", "Comportamiento"],
      rows: [
        ["bridge (default)", "Red virtual privada para los containers; comunicacion por nombre si son named"],
        ["host", "El container comparte la red del host (no aislamiento de red)"],
        ["none", "Sin red"],
        ["overlay", "Red entre varios hosts (Swarm o multi-host)"],
        ["macvlan", "El container tiene su propia MAC en la red fisica"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>docker network create lab               # red bridge custom\ndocker run -d --name db --network lab postgres\ndocker run -d --name web --network lab -p 8080:80 nginx\n# Desde web podes hacer 'ping db' o 'psql -h db'</pre>",
    },

    { kind: "h3", text: "PARTE 9 - Docker Compose (multi-container)" },
    {
      kind: "paragraph",
      html:
        "Cuando tu app tiene varios containers (api + db + cache + worker), arrancar cada uno con docker run se vuelve tedioso. <strong>Docker Compose</strong> describe TODO el stack en un YAML y lo levanta con un comando.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># docker-compose.yml\nservices:\n  api:\n    build: ./api\n    ports: [\"3000:3000\"]\n    environment:\n      DATABASE_URL: postgres://postgres:secret@db:5432/midb\n    depends_on:\n      db:\n        condition: service_healthy\n    restart: unless-stopped\n  db:\n    image: postgres:16-alpine\n    volumes: [\"pgdata:/var/lib/postgresql/data\"]\n    environment:\n      POSTGRES_PASSWORD: secret\n      POSTGRES_DB: midb\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]\n      interval: 5s\n  redis:\n    image: redis:7-alpine\n\nvolumes:\n  pgdata:</pre>",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>docker compose up -d            # arrancar todo en background\ndocker compose ps               # estado\ndocker compose logs -f api      # logs en stream\ndocker compose exec api sh      # shell en un servicio\ndocker compose down             # bajar todo\ndocker compose down -v          # bajar + borrar volumenes</pre>",
    },

    { kind: "h3", text: "PARTE 10 - Mejores practicas de Dockerfile" },
    {
      kind: "list",
      items: [
        "<strong>Usa imagenes base oficiales</strong> y especifica version (<code>node:20-alpine</code>, NO <code>node</code>).",
        "<strong>Ordenadas las instrucciones de menos a mas cambiantes</strong>: primero deps, despues codigo. Cachea mejor.",
        "<strong>Usa multi-stage builds</strong> para que tu imagen final NO tenga compiladores, dev deps ni codigo fuente.",
        "<strong>Corre como usuario NO-root</strong> con <code>USER</code>. Defensa en profundidad.",
        "<strong>NO copies .env, secretos ni .git</strong>. Usa <code>.dockerignore</code> para excluirlos.",
        "<strong>Reduce la cantidad de capas RUN</strong> encadenando con <code>&amp;&amp;</code> y limpiando cache en el mismo RUN.",
        "<strong>HEALTHCHECK</strong> para que orquestadores sepan si el container esta sano.",
        "<strong>Usa .dockerignore</strong> (similar al .gitignore) para no copiar node_modules ni .git al build context.",
        "<strong>Usa labels OCI</strong> (<code>org.opencontainers.image.*</code>) para metadata estandar.",
        "<strong>Escanea tus imagenes</strong> con Trivy, Grype, Snyk; integralo en CI.",
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># .dockerignore tipico\nnode_modules\n.git\n.env\n.env.*\nDockerfile*\ndocker-compose*\n*.log\ncoverage\n.idea\n.vscode\ndist\nbuild</pre>",
    },

    { kind: "h3", text: "PARTE 11 - Registries" },
    {
      kind: "table",
      headers: ["Registry", "Notas"],
      rows: [
        ["Docker Hub", "El historico; gratis con limites de rate. Cuenta paga obligatoria para repos privados ilimitados"],
        ["GitHub Container Registry (GHCR)", "Integrado con GitHub Actions, gratis para publicos, ilimitado para privados"],
        ["Amazon ECR", "AWS, integracion con IAM y EKS"],
        ["Google Artifact Registry", "GCP, sucesor de GCR"],
        ["Azure Container Registry (ACR)", "Azure, integracion con AKS"],
        ["Harbor", "Self-hosted enterprise (scan, replicacion, RBAC)"],
        ["Quay.io", "RedHat, escaneo automatico"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Push a GitHub Container Registry\necho $GITHUB_TOKEN | docker login ghcr.io -u USER --password-stdin\ndocker tag miapp:1.0 ghcr.io/USER/miapp:1.0\ndocker push ghcr.io/USER/miapp:1.0</pre>",
    },

    { kind: "h3", text: "PARTE 12 - Seguridad basica de containers" },
    {
      kind: "list",
      items: [
        "<strong>NO corras como root</strong>: <code>USER 1000</code> o <code>USER nonroot</code>",
        "<strong>readOnlyRootFilesystem</strong>: el container no puede modificar su FS (excepto volumes)",
        "<strong>--cap-drop=ALL --cap-add=NET_BIND_SERVICE</strong>: caps de Linux solo las necesarias",
        "<strong>--security-opt no-new-privileges</strong>: bloquea setuid escalation",
        "<strong>--read-only</strong>: FS solo lectura",
        "<strong>Scan periodico</strong>: <code>trivy image miapp:1.0</code>",
        "<strong>SBOM</strong> (Software Bill of Materials) con syft/cosign: saber QUE hay dentro de la imagen",
        "<strong>Sign images</strong> con cosign / sigstore (supply chain)",
      ],
    },

    { kind: "h3", text: "PARTE 13 - De Docker a Kubernetes (puente)" },
    {
      kind: "paragraph",
      html:
        "Docker te permite levantar containers en 1 maquina. Cuando tenes que coordinar containers en 10, 100 o 1000 maquinas, replicar, balancear y reemplazarlos cuando caen, necesitas un orquestador: ahi entra <strong>Kubernetes</strong> (modulos 6-10). Pero la habilidad de escribir buenos Dockerfiles es la base: una imagen mala arruina cualquier orquestacion.",
    },

    { kind: "h3", text: "PARTE 14 - Ponete a prueba" },
    {
      kind: "fillBlanks",
      key: "m3_fill",
      items: [
        { text: "Las 2 features del kernel Linux que aislan containers son namespaces y ___.", answer: "cgroups", es: "cgroups" },
        { text: "Una instancia en ejecucion de una imagen es un ___.", answer: "container", es: "container" },
        { text: "La plantilla read-only desde la que se crea un container es una ___.", answer: "imagen", es: "imagen" },
        { text: "La unica instruccion obligatoria en un Dockerfile es ___.", answer: "FROM", es: "FROM" },
        { text: "Un build que usa varias imagenes intermedias se llama multi-___.", answer: "stage", es: "stage" },
        { text: "Las imagenes minimas de Google sin shell son las ___.", answer: "distroless", es: "distroless" },
        { text: "Para describir un stack multi-container se usa Docker ___.", answer: "Compose", es: "Compose" },
        { text: "Una herramienta para escanear vulnerabilidades en imagenes es ___.", answer: "Trivy", es: "Trivy" },
      ],
    },
    {
      kind: "matching",
      key: "m3_matching",
      pairs: [
        { en: "docker pull", es: "Bajar imagen del registry" },
        { en: "docker build", es: "Construir imagen desde Dockerfile" },
        { en: "docker run", es: "Crear y arrancar container" },
        { en: "docker exec", es: "Ejecutar comando en container vivo" },
        { en: "docker logs", es: "Ver logs del container" },
        { en: "docker compose up", es: "Levantar stack completo" },
        { en: "docker volume", es: "Persistencia gestionada por Docker" },
        { en: "bind mount", es: "Montar path del host" },
        { en: "multi-stage", es: "Imagen final liviana" },
        { en: "distroless", es: "Imagen sin shell ni package manager" },
        { en: "GHCR", es: "Registry de GitHub" },
        { en: "Trivy", es: "Scanner de vulnerabilidades" },
      ],
    },
    {
      kind: "quiz",
      key: "m3_quiz",
      questions: [
        {
          q: "Diferencia clave entre VM y container?",
          options: [
            "Las VMs son mas chicas",
            "Los containers comparten el kernel del host; las VMs tienen su propio kernel",
            "Los containers son menos seguros y mas lentos",
            "No hay diferencia",
          ],
          correct: 1,
        },
        {
          q: "Cual es la unica instruccion obligatoria en un Dockerfile?",
          options: ["COPY", "FROM", "RUN", "CMD"],
          correct: 1,
        },
        {
          q: "Para mapear el puerto 80 del container al 8080 del host:",
          options: ["docker run -p 80:8080", "docker run -p 8080:80", "docker run --port 80", "docker map 80 8080"],
          correct: 1,
          explanation: "El formato es host:container",
        },
        {
          q: "Para ejecutar un comando dentro de un container ya corriendo:",
          options: ["docker run", "docker start", "docker exec", "docker attach"],
          correct: 2,
        },
        {
          q: "Que es un multi-stage build?",
          options: [
            "Construir varias imagenes a la vez",
            "Usar varias imagenes como base intermedias para que la final sea mas chica",
            "Ejecutar el build en CI",
            "Build paralelo",
          ],
          correct: 1,
        },
        {
          q: "Cual NO es una buena practica?",
          options: [
            "Correr como usuario no-root",
            "Usar tags semanticos en lugar de latest",
            "Copiar archivos .env al Dockerfile",
            "Multi-stage builds",
          ],
          correct: 2,
        },
        {
          q: "Para persistir datos de una DB se prefiere...",
          options: ["tmpfs", "named volume", "bind mount al /tmp", "ningun volumen"],
          correct: 1,
        },
        {
          q: "Que herramienta orquesta varios containers desde un YAML?",
          options: ["Docker Hub", "Docker Compose", "Docker Network", "Docker Swarm"],
          correct: 1,
        },
        {
          q: "El driver de red por defecto cuando creas una red custom en Docker es...",
          options: ["host", "bridge", "overlay", "macvlan"],
          correct: 1,
        },
        {
          q: "Que problema resuelve un .dockerignore?",
          options: [
            "Evita usar Docker",
            "Excluye archivos del build context (no se copian al daemon)",
            "Encripta las imagenes",
            "Configura el daemon",
          ],
          correct: 1,
        },
        {
          q: "Cuando NO se debe usar el tag 'latest'?",
          options: [
            "Nunca, siempre conviene usarlo",
            "En desarrollo local solamente",
            "En produccion: rompe builds reproducibles porque cambia con el tiempo",
            "Si tenes mas de 10 imagenes",
          ],
          correct: 2,
        },
        {
          q: "Para escanear vulnerabilidades en una imagen se puede usar...",
          options: ["docker scan-vuln", "Trivy", "docker check", "Compose audit"],
          correct: 1,
        },
      ],
    },
  ],
};
