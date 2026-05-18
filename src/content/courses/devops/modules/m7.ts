import type { ModuleData } from "@/types/course";

// Modulo 11 (number=11) - Terraform e Infraestructura como Codigo desde cero.
export const m7: ModuleData = {
  slug: "m7",
  number: 11,
  title: "Modulo 11 - Infraestructura como Codigo con Terraform",
  icon: "T",
  intro:
    "Mantener infraestructura a click en una consola web es lento, no auditable, no reproducible y un infierno cuando hay que recrearla. Con Infrastructure as Code (IaC) describis TODA tu nube (servidores, redes, DBs, IAM, DNS, certs) en archivos versionados; Terraform los aplica y mantiene un 'state' de lo real. Cuando algo cambia, hay diff. Cuando alguien rompe algo en la consola, terraform detecta el drift. En este modulo arrancas desde cero: que es IaC, instalacion, HCL, providers, variables, outputs, state remoto, modules, workspaces, plan/apply/destroy, mejores practicas y patrones reales.",
  totalActivities: 5,
  blocks: [
    { kind: "h3", text: "PARTE 1 - Que es IaC y por que importa" },
    {
      kind: "paragraph",
      html:
        "<strong>Infrastructure as Code</strong>: declarar tu infraestructura en archivos de texto versionados con Git, en vez de a click en consolas web. Beneficios:",
    },
    {
      kind: "list",
      items: [
        "<strong>Reproducible</strong>: una sola fuente de verdad. Lo de stg y prod es lo mismo (cambian variables).",
        "<strong>Auditable</strong>: cada cambio es un PR; pull requests sobre infra.",
        "<strong>Reversible</strong>: <code>git revert</code> + <code>terraform apply</code> y volves atras.",
        "<strong>Compartible</strong>: modulos como paquetes; otros equipos los reutilizan.",
        "<strong>Documentacion viva</strong>: el codigo ES la documentacion (con README al lado).",
        "<strong>Costo controlado</strong>: ves cuanto infra creas antes de crearla.",
      ],
    },
    { kind: "h4", text: "IaC vs Config Management" },
    {
      kind: "table",
      headers: ["Categoria", "Que hace", "Herramientas tipicas"],
      rows: [
        ["Provisioning / IaC", "Crear infra (VMs, redes, DBs, LBs)", "Terraform, Pulumi, CloudFormation, OpenTofu"],
        ["Config Management", "Configurar lo que YA esta dentro de un server (paquetes, usuarios, archivos)", "Ansible, Chef, Puppet, Salt"],
        ["Orquestacion containers", "Correr containers a escala", "Kubernetes, Nomad"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>OpenTofu</strong> es un fork open source de Terraform creado en 2023 cuando HashiCorp cambio la licencia (BSL). Comandos y HCL casi identicos. Si te preocupa la licencia, usalo.",
    },

    { kind: "h3", text: "PARTE 2 - Como funciona Terraform" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>      [tus .tf]                  [providers (AWS, GCP, GitHub...)]\n          |                                  ^\n          |  terraform plan                   |\n          v                                   v\n     [state file]  &lt;----compare----  [real infra (cloud APIs)]\n          |\n          |  terraform apply\n          v\n     [crea/modifica/destruye recursos]</pre>",
    },
    {
      kind: "list",
      items: [
        "Escribes archivos <code>.tf</code> en HCL (HashiCorp Config Language).",
        "<code>terraform init</code> descarga providers y configura el state backend.",
        "<code>terraform plan</code> compara codigo vs state vs realidad y muestra el diff.",
        "<code>terraform apply</code> ejecuta el plan.",
        "El <strong>state file</strong> (terraform.tfstate) guarda el mapeo entre tu codigo y la infra real.",
      ],
    },

    { kind: "h3", text: "PARTE 3 - Instalacion y primer hello-world" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># macOS\nbrew tap hashicorp/tap\nbrew install hashicorp/tap/terraform\n\n# Linux\nwget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg\necho \"deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main\" | sudo tee /etc/apt/sources.list.d/hashicorp.list\nsudo apt update &amp;&amp; sudo apt install terraform\n\nterraform version</pre>",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># main.tf - primer recurso\nterraform {\n  required_version = \"&gt;= 1.6\"\n  required_providers {\n    aws = { source = \"hashicorp/aws\", version = \"~&gt; 5.0\" }\n  }\n}\n\nprovider \"aws\" {\n  region = \"us-east-1\"\n}\n\nresource \"aws_s3_bucket\" \"sitio\" {\n  bucket = \"mi-bucket-unico-12345\"\n  tags = {\n    Project = \"demo\"\n    Owner   = \"thomas\"\n  }\n}\n\noutput \"bucket_arn\" {\n  value = aws_s3_bucket.sitio.arn\n}</pre>",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>terraform init           # descarga el provider\nterraform fmt            # formatea\nterraform validate       # valida sintaxis\nterraform plan           # muestra que va a hacer\nterraform apply          # ejecuta (pide confirmacion)\nterraform show           # ver el state\nterraform destroy        # borrar TODO lo creado por esta config</pre>",
    },

    { kind: "h3", text: "PARTE 4 - HCL: la sintaxis" },
    {
      kind: "table",
      headers: ["Bloque", "Para que"],
      rows: [
        ["terraform { }", "Config de Terraform (version, providers, backend)"],
        ["provider \"x\" { }", "Configurar un provider (region, profile)"],
        ["resource \"tipo\" \"nombre\" { }", "Crear un recurso real (la mayor parte)"],
        ["data \"tipo\" \"nombre\" { }", "LEER datos de algo que YA existe"],
        ["variable \"x\" { }", "Input parametrico"],
        ["output \"x\" { value = ... }", "Output al terminar el apply"],
        ["locals { }", "Variables internas / valores computados"],
        ["module \"x\" { source = ... }", "Reutilizar otro bloque de TF"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>variable \"region\" {\n  description = \"AWS region\"\n  type        = string\n  default     = \"us-east-1\"\n}\n\nvariable \"tags\" {\n  type = map(string)\n  default = {\n    Project = \"demo\"\n  }\n}\n\nvariable \"subnets\" {\n  type = list(string)\n}\n\nlocals {\n  name_prefix = \"app-${var.region}\"\n  common_tags = merge(var.tags, { managed_by = \"terraform\" })\n}\n\nresource \"aws_s3_bucket\" \"this\" {\n  bucket = \"${local.name_prefix}-data\"\n  tags   = local.common_tags\n}\n\noutput \"bucket\" {\n  value     = aws_s3_bucket.this.bucket\n  sensitive = false\n}</pre>",
    },

    { kind: "h3", text: "PARTE 5 - Variables (de donde vienen los valores)" },
    {
      kind: "paragraph",
      html: "Las variables se pueden setear desde distintas fuentes. Precedencia (de menor a mayor):",
    },
    {
      kind: "list",
      items: [
        "Default en el bloque <code>variable</code>",
        "Archivo <code>terraform.tfvars</code> o <code>*.auto.tfvars</code>",
        "Variables de entorno <code>TF_VAR_nombre</code>",
        "Flag <code>-var 'nombre=valor'</code> en el CLI",
        "Flag <code>-var-file=ruta.tfvars</code>",
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># prod.tfvars\nregion = \"us-east-1\"\nsubnets = [\"10.0.1.0/24\", \"10.0.2.0/24\"]\ntags = {\n  Project = \"plataforma\"\n  Env     = \"prod\"\n}\n\n# uso\nterraform apply -var-file=prod.tfvars</pre>",
    },

    { kind: "h3", text: "PARTE 6 - State: el corazon de Terraform" },
    {
      kind: "paragraph",
      html:
        "El <strong>state</strong> es el mapeo entre tu codigo y los recursos reales. Sin state, Terraform no sabria que cambio entre runs. Por defecto vive en <code>terraform.tfstate</code> local. <strong>En equipo NUNCA debe estar local</strong>: usalo en backend remoto con locking.",
    },
    {
      kind: "table",
      headers: ["Backend", "Pros"],
      rows: [
        ["S3 + DynamoDB", "AWS, locking via DynamoDB, encryption, versionado"],
        ["GCS", "Google Cloud, simple"],
        ["Azure Storage", "Azure, locking nativo"],
        ["Terraform Cloud / HCP Terraform", "Hosted; UI, RBAC, policy, runs remotos"],
        ["Consul / etcd", "Self-hosted"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Backend S3 con lock DynamoDB\nterraform {\n  backend \"s3\" {\n    bucket         = \"empresa-tfstate\"\n    key            = \"plataforma/prod/terraform.tfstate\"\n    region         = \"us-east-1\"\n    dynamodb_table = \"terraform-locks\"\n    encrypt        = true\n  }\n}</pre>",
    },
    {
      kind: "tip",
      html:
        "<strong>El state puede tener secretos</strong> (passwords, tokens). Protegelo: encryption at rest, RBAC estricto, NUNCA lo commitees al repo. Por eso <code>.gitignore</code> debe incluir <code>*.tfstate*</code> y <code>.terraform/</code>.",
    },
    { kind: "h4", text: "Comandos de manejo de state" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>terraform state list                       # listar recursos en state\nterraform state show aws_s3_bucket.this    # detalle\nterraform state mv addr1 addr2             # renombrar (sin recrear)\nterraform state rm aws_s3_bucket.this      # sacar del state (no destruye!)\nterraform import aws_s3_bucket.this nombre # importar infra existente al state</pre>",
    },

    { kind: "h3", text: "PARTE 7 - Modules: la unidad de reutilizacion" },
    {
      kind: "paragraph",
      html:
        "Un <strong>module</strong> es un conjunto de archivos .tf que se puede llamar desde otro modulo con inputs y outputs. Es como una funcion en programacion. Hay miles publicos en el Terraform Registry.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># Llamar un modulo publico\nmodule \"vpc\" {\n  source  = \"terraform-aws-modules/vpc/aws\"\n  version = \"~&gt; 5.0\"\n\n  name            = \"prod-vpc\"\n  cidr            = \"10.0.0.0/16\"\n  azs             = [\"us-east-1a\", \"us-east-1b\"]\n  private_subnets = [\"10.0.1.0/24\", \"10.0.2.0/24\"]\n  public_subnets  = [\"10.0.101.0/24\", \"10.0.102.0/24\"]\n  enable_nat_gateway = true\n}\n\noutput \"vpc_id\" {\n  value = module.vpc.vpc_id\n}</pre>",
    },
    { kind: "h4", text: "Crear tu propio modulo" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>modules/s3-bucket/\n  main.tf       # resource aws_s3_bucket ...\n  variables.tf  # variable \"name\", \"tags\"\n  outputs.tf    # output \"arn\"\n  README.md\n\n# Usarlo\nmodule \"data\" {\n  source = \"./modules/s3-bucket\"\n  name   = \"empresa-data\"\n  tags   = local.tags\n}</pre>",
    },

    { kind: "h3", text: "PARTE 8 - Workspaces y entornos" },
    {
      kind: "paragraph",
      html:
        "Para manejar dev/stg/prod hay 2 patrones:",
    },
    {
      kind: "list",
      items: [
        "<strong>Workspaces</strong>: misma config, distinto state por workspace. <code>terraform workspace new prod</code>. Simple pero acopla codigo y entornos.",
        "<strong>Directorios separados</strong>: <code>environments/dev/</code>, <code>environments/prod/</code> cada uno con su backend y variables. Mejor para infra critica.",
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>terraform workspace new dev\nterraform workspace new prod\nterraform workspace list\nterraform workspace select prod\nterraform.workspace      # se puede usar como variable</pre>",
    },

    { kind: "h3", text: "PARTE 9 - Ejemplo real: VPC + EC2 + S3 + ALB" },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>terraform {\n  required_version = \"&gt;= 1.6\"\n  required_providers {\n    aws = { source = \"hashicorp/aws\", version = \"~&gt; 5.0\" }\n  }\n  backend \"s3\" {\n    bucket = \"empresa-tfstate\"\n    key    = \"plataforma/${terraform.workspace}/terraform.tfstate\"\n    region = \"us-east-1\"\n    dynamodb_table = \"terraform-locks\"\n  }\n}\n\nprovider \"aws\" { region = var.region }\n\nmodule \"vpc\" {\n  source = \"terraform-aws-modules/vpc/aws\"\n  version = \"~&gt; 5.0\"\n  name   = \"vpc-${var.env}\"\n  cidr   = \"10.0.0.0/16\"\n  azs    = [\"${var.region}a\", \"${var.region}b\"]\n  private_subnets = [\"10.0.1.0/24\", \"10.0.2.0/24\"]\n  public_subnets  = [\"10.0.101.0/24\", \"10.0.102.0/24\"]\n  enable_nat_gateway = true\n}\n\nresource \"aws_security_group\" \"web\" {\n  name   = \"web-${var.env}\"\n  vpc_id = module.vpc.vpc_id\n  ingress {\n    from_port   = 443\n    to_port     = 443\n    protocol    = \"tcp\"\n    cidr_blocks = [\"0.0.0.0/0\"]\n  }\n  egress {\n    from_port = 0\n    to_port = 0\n    protocol = \"-1\"\n    cidr_blocks = [\"0.0.0.0/0\"]\n  }\n}\n\nresource \"aws_s3_bucket\" \"assets\" {\n  bucket = \"empresa-assets-${var.env}\"\n}</pre>",
    },

    { kind: "h3", text: "PARTE 10 - Meta-argumentos y flujo de control" },
    {
      kind: "table",
      headers: ["Meta-arg", "Que hace"],
      rows: [
        ["count = N", "Crear N copias del recurso"],
        ["for_each = toset/map", "Crear una copia por elemento (preferido sobre count)"],
        ["depends_on = [otro]", "Forzar dependencia explicita"],
        ["lifecycle { create_before_destroy = true }", "Crear el nuevo antes de destruir el viejo"],
        ["lifecycle { prevent_destroy = true }", "Bloquear destroy de recursos criticos"],
        ["lifecycle { ignore_changes = [tags] }", "Ignorar drift en ciertos campos"],
        ["provisioner \"local-exec\"", "Correr scripts (ultimo recurso; preferi data sources)"],
      ],
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'># for_each con mapa\nresource \"aws_s3_bucket\" \"sites\" {\n  for_each = {\n    blog  = { region = \"us-east-1\" }\n    media = { region = \"us-west-2\" }\n  }\n  bucket = \"empresa-${each.key}\"\n}\n\n# referencia\naws_s3_bucket.sites[\"blog\"].arn</pre>",
    },

    { kind: "h3", text: "PARTE 11 - Drift detection y refresh" },
    {
      kind: "paragraph",
      html:
        "Cuando alguien edita algo en la consola del cloud por fuera de Terraform, hay <strong>drift</strong> (deriva). <code>terraform plan</code> lo detecta y te muestra que esta distinto.",
    },
    {
      kind: "info",
      html:
        "<pre style='font-size:0.85em; white-space:pre-wrap'>terraform plan -refresh-only        # solo refrescar state desde la realidad\nterraform apply -refresh-only       # commitear ese refresh</pre>",
    },

    { kind: "h3", text: "PARTE 12 - Mejores practicas y antipatrones" },
    {
      kind: "list",
      items: [
        "<strong>State remoto siempre</strong> con locking. NUNCA local en equipo.",
        "<strong>NO commitees .tfstate, .terraform/, *.tfvars con secretos</strong>. Usa .gitignore.",
        "<strong>terraform fmt</strong> + <strong>tflint</strong> + <strong>tfsec</strong> en CI.",
        "<strong>Modulos chicos y reusables</strong> en vez de monolitos de 5000 lineas.",
        "<strong>Pin de versiones</strong> de Terraform y providers (<code>required_version</code>, <code>version</code> en providers).",
        "<strong>Tags consistentes</strong>: Project, Env, Owner, ManagedBy=terraform. Te salva en facturas y limpieza.",
        "<strong>Separar entornos en directorios</strong> o workspaces; NUNCA mezclar en mismo state.",
        "<strong>Tests con Terratest o terraform test</strong> en CI para modulos criticos.",
        "<strong>Atlantis / Terraform Cloud / Spacelift</strong> para automatizar plans en PRs.",
      ],
    },

    { kind: "h3", text: "PARTE 13 - Alternativas" },
    {
      kind: "table",
      headers: ["Herramienta", "Caracteristica"],
      rows: [
        ["Pulumi", "IaC con lenguajes reales (Python, TS, Go, .NET). Type-safety, loops, abstracciones de codigo"],
        ["AWS CDK / CDKTF", "CDK = nativo AWS (genera CloudFormation); CDKTF = CDK que genera Terraform"],
        ["CloudFormation", "Nativo AWS; YAML/JSON; no multi-cloud"],
        ["Ansible", "Mas para config-mgmt que provisioning, pero puede ambas"],
        ["Crossplane", "IaC declarado dentro de Kubernetes (CRDs)"],
      ],
    },

    { kind: "h3", text: "PARTE 14 - Ponete a prueba" },
    {
      kind: "fillBlanks",
      key: "m7_fill",
      items: [
        { text: "El lenguaje declarativo de Terraform se llama ___.", answer: "HCL", es: "HCL" },
        { text: "El archivo que mapea codigo a infra real se llama ___.", answer: "state", es: "state" },
        { text: "El comando que muestra el diff sin aplicar es terraform ___.", answer: "plan", es: "plan" },
        { text: "Para descargar providers se usa terraform ___.", answer: "init", es: "init" },
        { text: "Un conjunto reutilizable de codigo TF se llama ___.", answer: "module", es: "module" },
        { text: "El fork open source de Terraform creado en 2023 se llama Open___.", answer: "Tofu", es: "Tofu" },
        { text: "Cuando alguien edita algo a mano y desincroniza el state se llama ___.", answer: "drift", es: "drift" },
        { text: "El backend mas comun en AWS combina S3 con ___ para locking.", answer: "DynamoDB", es: "DynamoDB" },
      ],
    },
    {
      kind: "matching",
      key: "m7_matching",
      pairs: [
        { en: "terraform init", es: "Descargar providers" },
        { en: "terraform plan", es: "Mostrar diff" },
        { en: "terraform apply", es: "Ejecutar cambios" },
        { en: "terraform destroy", es: "Borrar todo lo gestionado" },
        { en: "resource", es: "Recurso real a crear" },
        { en: "data", es: "Leer algo que ya existe" },
        { en: "module", es: "Codigo reusable" },
        { en: "variable / locals", es: "Inputs y valores computados" },
        { en: "state", es: "Mapeo codigo - infra" },
        { en: "drift", es: "Cambio fuera de TF" },
        { en: "for_each", es: "Crear N recursos por mapa" },
        { en: "lifecycle prevent_destroy", es: "Bloquear borrado accidental" },
      ],
    },
    {
      kind: "quiz",
      key: "m7_quiz",
      questions: [
        {
          q: "Para que sirve el state de Terraform?",
          options: [
            "Para auditar usuarios",
            "Para mapear el codigo a los recursos reales y detectar cambios",
            "Para guardar logs",
            "No tiene proposito",
          ],
          correct: 1,
        },
        {
          q: "Donde NO debe vivir el state en un equipo?",
          options: [
            "En S3 con DynamoDB lock",
            "En Terraform Cloud",
            "Localmente en la maquina del dev (terraform.tfstate)",
            "En GCS",
          ],
          correct: 2,
        },
        {
          q: "El comando que muestra el diff antes de aplicar es...",
          options: ["terraform check", "terraform plan", "terraform diff", "terraform validate"],
          correct: 1,
        },
        {
          q: "Que es 'drift' en Terraform?",
          options: [
            "Una funcion del provider",
            "Diferencia entre el state y la infra real (cambios fuera de TF)",
            "Un error de sintaxis",
            "Un tipo de recurso",
          ],
          correct: 1,
        },
        {
          q: "Para importar infra existente al state se usa...",
          options: ["terraform copy", "terraform import", "terraform load", "terraform attach"],
          correct: 1,
        },
        {
          q: "Si pones lifecycle { prevent_destroy = true } y haces destroy...",
          options: [
            "El recurso se destruye igual",
            "Terraform falla y no permite destruirlo",
            "Se ignora la flag",
            "Solo aplica en AWS",
          ],
          correct: 1,
        },
        {
          q: "Que diferencia hay entre 'resource' y 'data'?",
          options: [
            "Ninguna",
            "resource crea infra; data SOLO lee infra existente",
            "data es mas lento",
            "resource es para AWS, data para GCP",
          ],
          correct: 1,
        },
        {
          q: "El meta-argumento preferido a 'count' (porque indexa por key) es...",
          options: ["for_each", "depends_on", "lifecycle", "provider"],
          correct: 0,
        },
        {
          q: "OpenTofu es...",
          options: [
            "Un IDE de Terraform",
            "Un fork open source de Terraform",
            "Un provider de Azure",
            "Una nube nueva",
          ],
          correct: 1,
        },
        {
          q: "Cual NO es buena practica?",
          options: [
            "State remoto con locking",
            "Tags consistentes (Project, Env, Owner)",
            "Commitear *.tfstate al repo",
            "Pin de versiones de providers",
          ],
          correct: 2,
        },
        {
          q: "Para reutilizar codigo en otro proyecto se usa...",
          options: ["resource", "module", "data", "locals"],
          correct: 1,
        },
        {
          q: "Pulumi se diferencia de Terraform en que...",
          options: [
            "Usa YAML",
            "Permite escribir IaC en lenguajes reales (Python, TS, Go)",
            "Solo soporta AWS",
            "No tiene state",
          ],
          correct: 1,
        },
      ],
    },
  ],
};
