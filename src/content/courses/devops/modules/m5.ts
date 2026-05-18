import type { ModuleData } from "@/types/course";

// Modulo 5 - Linux y Shell Scripting desde cero.
export const m5: ModuleData = {
  slug: "m5",
  number: 5,
  title: "Modulo 5 - Linux y Shell Scripting desde Cero",
  icon: "L",
  intro:
    "Linux corre el 96% de los servidores del mundo y CASI TODOS los containers son Linux. Si haces DevOps, vas a vivir en la terminal: leyendo logs, debuggeando procesos, escribiendo scripts, conectandote por SSH. En este modulo desde lo mas basico (filosofia Unix, estructura de directorios, permisos), pasando por comandos esenciales, manejo de procesos y servicios con systemd, redirecciones y pipes, herramientas de texto (grep/sed/awk), SSH, cron, hasta scripting en bash con debugging.",
  totalActivities: 5,
  blocks: [
    { kind: "h3", text: "PARTE 1 - Filosofia Unix" },
    {
      kind: "paragraph",
      html:
        "Unix se diseño en 1969 con 4 principios que SIGUEN vigentes y por eso todo el ecosistema sigue ahi:",
    },
    {
      kind: "list",
      items: [
        "<strong>Hace una cosa y hacela bien</strong>: cada programa resuelve UNA tarea (ls lista, grep filtra, wc cuenta).",
        "<strong>Programas que trabajan juntos</strong>: los pipes (<code>|</code>) combinan comandos chicos en flujos potentes.",
        "<strong>Texto plano como interfaz universal</strong>: la salida de uno es entrada del siguiente.",
        "<strong>Todo es un archivo</strong>: dispositivos, procesos, configs, sockets... aparecen como archivos en /dev, /proc, /sys.",
      ],
    },

    { kind: "h3", text: "PARTE 2 - Filesystem Hierarchy Standard (donde vive cada cosa)" },
    {
      kind: "table",
      headers: ["Path", "Que contiene"],
      rows: [
        ["/", "Root del sistema"],
        ["/bin /sbin", "Binarios esenciales (ls, cp, mv...)"],
        ["/usr/bin /usr/sbin", "Binarios instalados por paquetes (mayoria de comandos)"],
        ["/etc", "Configuracion del sistema (/etc/nginx, /etc/ssh, /etc/passwd)"],
        ["/var", "Datos variables (logs en /var/log, mail, spool)"],
        ["/var/log", "Logs del sistema y servicios"],
        ["/home/&lt;user&gt;", "Home de cada usuario"],
        ["/root", "Home de root"],
        ["/tmp", "Archivos temporales (se borra al reiniciar)"],
        ["/proc", "Pseudo-FS con info de procesos kernel"],
        ["/sys", "Pseudo-FS con info y control del kernel"],
        ["/dev", "Devices (/dev/null, /dev/sda, /dev/tty)"],
        ["/opt", "Software de terceros instalado manualmente"],
        ["/srv", "Datos servidos por servicios (a veces)"],
      ],
    },

    { kind: "h3", text: "PARTE 3 - Comandos de navegacion y archivos" },
    {
      kind: "table",
      headers: ["Comando", "Que hace"],
      rows: [
        ["pwd", "Print working directory (donde estoy)"],
        ["ls -la", "Listar archivos detallado (incluye ocultos)"],
        ["cd /path", "Cambiar de directorio"],
        ["cd ~ / cd /  cd -", "Home / root / directorio anterior"],
        ["mkdir -p a/b/c", "Crear dirs (anidados si --p)"],
        ["rmdir / rm -rf", "Borrar vacios / recursivo (CUIDADO con -rf /)"],
        ["cp -r src dst", "Copiar recursivo"],
        ["mv src dst", "Mover o renombrar"],
        ["touch archivo", "Crear archivo vacio o actualizar mtime"],
        ["ln -s target link", "Crear symlink"],
        ["find /var -name '*.log' -mtime -7", "Buscar archivos por nombre y tiempo"],
        ["tree -L 2", "Vista en arbol (si esta instalado)"],
        ["du -sh /var/log/*", "Tamaño de cada dir"],
        ["df -h", "Uso de filesystems montados"],
        ["stat archivo", "Info detallada de un archivo (inodo, perms, mtime)"],
      ],
    },

    { kind: "h3", text: "PARTE 4 - Permisos (lo que SIEMPRE preguntan)" },
    {
      kind: "paragraph",
      html:
        "Cada archivo tiene 3 sets de permisos (owner, group, others) con 3 bits (read=4, write=2, execute=1). Se visualizan asi:",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>$ ls -l\n-rwxr-xr-- 1 thomas dev 1234 May 18 12:00 deploy.sh\n[1][2][3][4]\n[1] tipo: - archivo, d dir, l symlink\n[2] rwx para owner (thomas)\n[3] r-x para group (dev)\n[4] r-- para others\n\n# Notacion octal\n# rwx = 7 (4+2+1)\n# r-x = 5 (4+0+1)\n# r-- = 4 (4+0+0)\n# 754 = rwxr-xr--</pre>",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>chmod 755 deploy.sh         # octal\nchmod u+x deploy.sh          # solo owner +execute\nchmod g-w archivo            # quitar write al grupo\nchmod -R 644 ./docs          # recursivo\n\nchown thomas:dev archivo     # cambiar owner:group\nchown -R thomas /opt/app     # recursivo\n\numask 022                    # default mask al crear archivos\n\n# Permisos especiales\n# SUID (4000): correr como owner del archivo. Ej: /usr/bin/passwd\n# SGID (2000): correr como group del archivo / heredar group en dirs\n# Sticky (1000): solo owner puede borrar archivos del dir. Ej: /tmp</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>Nunca</strong> hagas <code>chmod 777</code> 'para que funcione'. Es solucion de pereza y abre el sistema. Aprende cual es el permiso minimo necesario.",
    },

    { kind: "h3", text: "PARTE 5 - Procesos y servicios" },
    {
      kind: "table",
      headers: ["Comando", "Que hace"],
      rows: [
        ["ps aux", "Listar TODOS los procesos"],
        ["ps -ef --forest", "Procesos con jerarquia padre/hijo"],
        ["pgrep nginx / pkill nginx", "Buscar y matar por nombre"],
        ["top / htop / btop", "Monitor interactivo"],
        ["kill -TERM &lt;pid&gt;", "Pedir gracefully (SIGTERM, default)"],
        ["kill -KILL &lt;pid&gt;", "Matar duro (SIGKILL, ultimo recurso)"],
        ["kill -HUP &lt;pid&gt;", "Recargar (SIGHUP, comun en demonios)"],
        ["nohup cmd &amp;", "Correr en background, sobrevive a la sesion"],
        ["jobs / fg / bg", "Gestion de trabajos en background"],
        ["disown -h %1", "Desligar un job del shell"],
        ["lsof -i :80", "Que proceso escucha el puerto 80"],
        ["ss -tuln", "Sockets escuchando (sucesor de netstat)"],
      ],
    },
    { kind: "h4", text: "systemd (el init moderno de Linux)" },
    {
      kind: "table",
      headers: ["Comando", "Que hace"],
      rows: [
        ["systemctl status nginx", "Estado de un servicio"],
        ["systemctl start/stop/restart nginx", "Controlar servicio"],
        ["systemctl enable nginx", "Arrancar al boot"],
        ["systemctl disable nginx", "No arrancar al boot"],
        ["systemctl daemon-reload", "Releer unit files tras cambiarlos"],
        ["journalctl -u nginx -f", "Logs en stream de un servicio"],
        ["journalctl --since '1 hour ago'", "Logs filtrados por tiempo"],
        ["systemctl list-units --failed", "Servicios caidos"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Crear tu propio servicio: /etc/systemd/system/miapp.service\n[Unit]\nDescription=Mi App\nAfter=network.target\n\n[Service]\nType=simple\nUser=thomas\nWorkingDirectory=/opt/miapp\nExecStart=/usr/bin/node /opt/miapp/server.js\nRestart=on-failure\nEnvironment=NODE_ENV=production\n\n[Install]\nWantedBy=multi-user.target\n\n# Activar\nsudo systemctl daemon-reload\nsudo systemctl enable --now miapp</pre>",
    },

    { kind: "h3", text: "PARTE 6 - Streams: stdin, stdout, stderr" },
    {
      kind: "paragraph",
      html:
        "Cada proceso tiene 3 streams: <strong>stdin</strong> (fd 0, entrada), <strong>stdout</strong> (fd 1, salida normal) y <strong>stderr</strong> (fd 2, errores). Aprender a redirigirlos es clave.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>cmd &gt; out.txt           # stdout al archivo (sobreescribe)\ncmd &gt;&gt; out.txt          # stdout al archivo (append)\ncmd 2&gt; err.txt          # stderr al archivo\ncmd &gt; out.txt 2&gt;&amp;1      # ambos al mismo archivo\ncmd &amp;&gt; all.txt          # idem, sintaxis nueva\ncmd &lt; input.txt         # stdin desde archivo\ncmd1 | cmd2             # pipe: stdout de cmd1 -&gt; stdin de cmd2\ncmd1 |&amp; cmd2            # pipe incluyendo stderr\ncmd &gt; /dev/null 2&gt;&amp;1    # descartar TODO output</pre>",
    },

    { kind: "h3", text: "PARTE 7 - Herramientas de texto (las navajas suizas)" },
    {
      kind: "table",
      headers: ["Comando", "Que hace"],
      rows: [
        ["cat archivo", "Mostrar contenido"],
        ["less / more", "Paginar (less = mejor)"],
        ["head -n 20 / tail -n 20", "Primeras / ultimas N lineas"],
        ["tail -f log.txt", "Stream de un log creciendo"],
        ["wc -l archivo", "Contar lineas"],
        ["sort / sort -u / sort -k2 -n", "Ordenar / unicos / por columna numerica"],
        ["uniq -c", "Contar duplicados consecutivos"],
        ["cut -d',' -f2,3 csv", "Extraer columnas"],
        ["tr 'a-z' 'A-Z'", "Sustituir caracteres"],
        ["grep -i 'error' log", "Buscar (i = case insensitive)"],
        ["grep -rn 'TODO' src/", "Recursivo + numero de linea"],
        ["grep -v 'INFO'", "Inverso (lineas que NO matchean)"],
        ["sed 's/old/new/g' file", "Sustituir global"],
        ["sed -i 's/old/new/g' file", "In-place (modifica archivo)"],
        ["awk '{print $1, $3}'", "Procesamiento por columnas"],
        ["awk '$3 > 100 {sum+=$3} END {print sum}'", "Calculos sobre columnas"],
        ["jq '.users[].name' data.json", "Procesar JSON"],
        ["xargs", "Convertir stdin en args para otro comando"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Top 10 IPs en un access log\ncat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head\n\n# Buscar TODOs en codigo, mostrando archivo y linea\ngrep -rn 'TODO' src/ --include='*.ts'\n\n# Renombrar masivo: file_001.txt -> file_001.log\nfor f in file_*.txt; do mv \"$f\" \"${f%.txt}.log\"; done\n\n# Borrar archivos viejos en /var/log\nfind /var/log -name '*.gz' -mtime +30 -delete</pre>",
    },

    { kind: "h3", text: "PARTE 8 - SSH" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Generar par de claves (ed25519 - moderno, evita RSA)\nssh-keygen -t ed25519 -C \"thomas@laptop\"\n\n# Copiar la publica al servidor\nssh-copy-id usuario@servidor.com\n\n# Conectarse\nssh usuario@servidor.com\nssh -p 2222 usuario@servidor.com   # puerto custom\n\n# Configurar accesos rapidos en ~/.ssh/config\nHost prod\n  HostName 1.2.3.4\n  User ubuntu\n  Port 22\n  IdentityFile ~/.ssh/id_ed25519\n# Ahora: ssh prod\n\n# Copiar archivos\nscp archivo.txt usuario@host:/ruta/\nrsync -avz --progress local/ usuario@host:/remoto/\n\n# Tunel local (acceder a Postgres remoto desde localhost:5432)\nssh -L 5432:db-interna:5432 bastion@host\n\n# Tunel reverso (exponer mi puerto en el servidor)\nssh -R 9000:localhost:3000 host</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>Endurecer SSH del servidor</strong>: deshabilita login por password (<code>PasswordAuthentication no</code>), deshabilita root (<code>PermitRootLogin no</code>), cambia el puerto, usa fail2ban. Esta en <code>/etc/ssh/sshd_config</code>.",
    },

    { kind: "h3", text: "PARTE 9 - Cron y systemd timers" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Sintaxis: minuto hora dia mes diasem comando\n# *  *  *  *  *  cmd\n\ncrontab -e            # editar mis tareas cron\ncrontab -l            # listar\n\n# Ejemplos\n0 3 * * *      /usr/local/bin/backup.sh         # todos los dias 3am\n*/5 * * * *    /opt/check.sh                    # cada 5 minutos\n0 0 * * 0      /opt/weekly.sh                   # cada domingo 00:00\n@reboot        /opt/start.sh                    # al boot</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>systemd timers</strong> son una alternativa moderna y mas potente a cron: pueden esperar boot completo, retries, dependencias, journaling integrado. <code>systemctl list-timers</code>.",
    },

    { kind: "h3", text: "PARTE 10 - Scripting en Bash" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>#!/usr/bin/env bash\nset -Eeuo pipefail          # 4 flags que te salvan la vida\n# -E: errores en funciones se propagan\n# -e: salir si algo falla\n# -u: error si usas variable sin definir\n# -o pipefail: error si cualquier paso del pipe falla\n\nIFS=$'\\n\\t'                  # separador interno seguro\n\n# Variables\nNAME=\"thomas\"\necho \"Hola, $NAME\"\n\n# Argumentos\necho \"script: $0 args: $@ count: $#\"\necho \"primer arg: $1\"\n\n# Condicionales\nif [[ -f /etc/passwd ]]; then\n  echo \"existe\"\nelif [[ -d /tmp ]]; then\n  echo \"es dir\"\nelse\n  echo \"nada\"\nfi\n\n# Loops\nfor f in *.log; do\n  echo \"procesando $f\"\ndone\n\nwhile read -r line; do\n  echo \"linea: $line\"\ndone &lt; archivo.txt\n\n# Funciones\nlog() {\n  echo \"[$(date -Iseconds)] $*\"\n}\nlog \"empezando\"\n\n# Heredoc\ncat &lt;&lt;EOF\nMulti\nlinea\nEOF</pre>",
    },
    { kind: "h4", text: "Trap y cleanup" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>tmpdir=$(mktemp -d)\ncleanup() { rm -rf \"$tmpdir\"; }\ntrap cleanup EXIT INT TERM       # se ejecuta SIEMPRE al salir</pre>",
    },
    { kind: "h4", text: "Debugging de scripts" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>bash -x script.sh          # imprime cada comando antes de ejecutarlo\nset -x                      # activa trace desde aqui\nset +x                      # lo apaga\n\nshellcheck script.sh        # linter de bash (instalalo!)</pre>",
    },

    { kind: "h3", text: "PARTE 11 - Diagnostico (cuando algo no anda)" },
    {
      kind: "table",
      headers: ["Problema", "Comando"],
      rows: [
        ["Disco lleno?", "df -h"],
        ["Cual carpeta llena?", "du -sh /* | sort -rh | head"],
        ["RAM disponible?", "free -h"],
        ["Carga del sistema?", "uptime"],
        ["Procesos top consumidores?", "top / htop"],
        ["Que puerto escucha quien?", "ss -tulpn"],
        ["IP de mi maquina?", "ip a"],
        ["Tabla de rutas?", "ip r"],
        ["Conectividad a un host?", "ping host / curl -v host / mtr host"],
        ["DNS?", "dig host / nslookup host"],
        ["Logs del sistema?", "journalctl -xe / tail -f /var/log/syslog"],
        ["Quien edito el archivo?", "stat archivo"],
        ["Mi shell soporta...?", "echo $SHELL / which bash"],
      ],
    },

    { kind: "h3", text: "PARTE 12 - Package managers" },
    {
      kind: "table",
      headers: ["Distro", "Manager", "Comandos clave"],
      rows: [
        ["Ubuntu/Debian", "apt", "apt update / apt install / apt remove / apt list --installed"],
        ["RHEL/Fedora/Rocky", "dnf (sucesor de yum)", "dnf install / dnf update / dnf remove"],
        ["Alpine", "apk", "apk add / apk del / apk update"],
        ["Arch", "pacman", "pacman -S / pacman -R / pacman -Syu"],
        ["macOS", "brew", "brew install / brew upgrade"],
      ],
    },

    { kind: "h3", text: "PARTE 13 - Ponete a prueba" },
    {
      kind: "fillBlanks",
      key: "m5_fill",
      items: [
        { text: "El dir donde viven los archivos de configuracion del sistema es ___.", answer: "/etc", es: "/etc" },
        { text: "Los logs del sistema en systemd se ven con ___.", answer: "journalctl", es: "journalctl" },
        { text: "El comando para cambiar permisos es ___.", answer: "chmod", es: "chmod" },
        { text: "Para cambiar el owner se usa ___.", answer: "chown", es: "chown" },
        { text: "Permiso 755 en octal equivale a rwx___r-x.", answer: "r-x", es: "r-x" },
        { text: "Para redirigir stderr al mismo destino que stdout se usa 2&gt;&amp;___.", answer: "1", es: "1" },
        { text: "El init system moderno de Linux es ___.", answer: "systemd", es: "systemd" },
        { text: "El procesador de JSON en CLI mas usado es ___.", answer: "jq", es: "jq" },
        { text: "Para correr cada noche a las 3am cron usa la expresion '0 ___ * * *'.", answer: "3", es: "3" },
        { text: "Las 4 flags 'safety net' en bash son set -E___uo pipefail.", answer: "e", es: "e" },
      ],
    },
    {
      kind: "matching",
      key: "m5_matching",
      pairs: [
        { en: "grep", es: "Filtrar lineas por patron" },
        { en: "sed", es: "Sustituir texto en streams" },
        { en: "awk", es: "Procesamiento por columnas" },
        { en: "jq", es: "Procesar JSON" },
        { en: "ssh", es: "Shell remota segura" },
        { en: "scp / rsync", es: "Copiar archivos a remoto" },
        { en: "cron", es: "Tareas programadas" },
        { en: "systemd", es: "Init system moderno" },
        { en: "journalctl", es: "Logs de systemd" },
        { en: "chmod 755", es: "rwxr-xr-x" },
        { en: "ss -tulpn", es: "Sockets escuchando" },
        { en: "df -h", es: "Uso de filesystems" },
      ],
    },
    {
      kind: "quiz",
      key: "m5_quiz",
      questions: [
        {
          q: "Donde viven los logs del sistema en distros modernas con systemd?",
          options: ["/var/log/syslog (tradicional) y journald (binario, via journalctl)", "Solo /etc", "/tmp/logs", "No hay logs"],
          correct: 0,
        },
        {
          q: "Que hace chmod +x script.sh?",
          options: ["Borra el archivo", "Agrega permiso de ejecucion al owner/grupo/others", "Lo encripta", "Lo comprime"],
          correct: 1,
        },
        {
          q: "Cual es la senial SIGTERM en kill?",
          options: ["Numero 9", "Numero 15 (default de kill)", "Numero 1", "No existe"],
          correct: 1,
        },
        {
          q: "El comando para ver un log creciendo en vivo es...",
          options: ["cat", "head -f", "tail -f", "less +F"],
          correct: 2,
          explanation: "tail -f es lo clasico; less +F es la variante con paginacion.",
        },
        {
          q: "Para encontrar archivos .log de los ultimos 7 dias:",
          options: [
            "find . -name '*.log' -mtime -7",
            "find . -7days *.log",
            "ls -t *.log | head",
            "grep -r '*.log'",
          ],
          correct: 0,
        },
        {
          q: "Para redirigir TODO output (stdout y stderr) a /dev/null:",
          options: ["cmd &gt; /dev/null", "cmd &gt; /dev/null 2&gt;&amp;1", "cmd 2&gt; null", "cmd | /dev/null"],
          correct: 1,
        },
        {
          q: "Que es shellcheck?",
          options: ["Un shell", "Un linter para scripts bash", "Un debugger", "Un compilador"],
          correct: 1,
        },
        {
          q: "Cron expression '*/15 * * * *' significa...",
          options: ["Una vez al dia a las 15", "Cada 15 minutos", "Cada 15 dias", "A las 15 horas"],
          correct: 1,
        },
        {
          q: "Para tunelizar el puerto remoto 5432 al local 5432:",
          options: [
            "ssh -L 5432:localhost:5432 host",
            "ssh -R 5432:localhost:5432 host",
            "scp -p 5432",
            "rsync 5432",
          ],
          correct: 0,
        },
        {
          q: "Que NO es una mejor practica al armar un script bash?",
          options: [
            "Empezar con set -Eeuo pipefail",
            "Usar trap para cleanup",
            "Hacer chmod 777 al directorio temporal",
            "Pasar shellcheck",
          ],
          correct: 2,
        },
        {
          q: "El package manager de Alpine Linux es...",
          options: ["apt", "dnf", "apk", "pacman"],
          correct: 2,
        },
        {
          q: "Que comando muestra que proceso escucha el puerto 80?",
          options: ["ps aux", "ss -tulpn", "df -h", "free -h"],
          correct: 1,
        },
      ],
    },
  ],
};
