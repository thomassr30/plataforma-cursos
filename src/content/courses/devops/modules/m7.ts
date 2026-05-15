import type { ModuleData } from "@/types/course";

export const m7: ModuleData = {
  slug: "m7",
  number: 7,
  title: "Infraestructura como Código (Terraform)",
  icon: "🏗️",
  intro: "Terraform te permite describir tu infraestructura en archivos de texto (HCL) y aplicarla con un comando. Versionable, auditable, replicable.",
  totalActivities: 3,
  blocks: [
    { kind: "h3", text: "🏗️ Estructura básica" },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>terraform {\n  required_providers {\n    aws = { source = \"hashicorp/aws\", version = \"~> 5.0\" }\n  }\n}\n\nprovider \"aws\" { region = \"us-east-1\" }\n\nresource \"aws_instance\" \"web\" {\n  ami           = \"ami-0c55b159cbfafe1f0\"\n  instance_type = \"t3.micro\"\n  tags = { Name = \"web-server\" }\n}</pre>",
    },
    { kind: "h3", text: "⚙️ Workflow Terraform" },
    {
      kind: "table",
      headers: ["Comando", "Acción"],
      rows: [
        ["terraform init", "Descarga providers, prepara state"],
        ["terraform fmt", "Formatea código"],
        ["terraform validate", "Valida sintaxis"],
        ["terraform plan", "Muestra qué cambios se aplicarían"],
        ["terraform apply", "Aplica los cambios"],
        ["terraform destroy", "Elimina TODO"],
        ["terraform state list", "Lista recursos en el state"],
      ],
    },
    { kind: "h3", text: "📦 Variables y outputs" },
    {
      kind: "info",
      html: "<pre style='font-size:0.85em; white-space:pre-wrap'>variable \"environment\" {\n  type    = string\n  default = \"dev\"\n}\n\noutput \"public_ip\" {\n  value = aws_instance.web.public_ip\n}</pre>",
    },
    { kind: "tip", html: "<strong>💡 State remoto:</strong> NUNCA guardes el state en git. Usa backends remotos (S3 + DynamoDB lock, Terraform Cloud) para trabajar en equipo." },
    {
      kind: "fillBlanks",
      key: "m7_fill",
      items: [
        { text: "Antes de aplicar: terraform ___", answer: "plan", es: "plan" },
        { text: "Para aplicar cambios: terraform ___", answer: "apply", es: "apply" },
        { text: "Para inicializar providers: terraform ___", answer: "init", es: "init" },
        { text: "Cada bloque empieza con 'resource', 'variable', 'output' o '___'", answer: "provider", es: "provider" },
        { text: "Para borrar todo: terraform ___", answer: "destroy", es: "destroy" },
      ],
    },
    {
      kind: "matching",
      key: "m7_matching",
      pairs: [
        { en: "provider", es: "Plugin de la nube" },
        { en: "resource", es: "Recurso a crear" },
        { en: "variable", es: "Entrada parametrizable" },
        { en: "output", es: "Valor a exponer" },
        { en: "module", es: "Paquete reutilizable" },
        { en: "state", es: "Mapeo recursos reales ↔ config" },
      ],
    },
    {
      kind: "quiz",
      key: "m7_quiz",
      questions: [
        { q: "¿Qué lenguaje usa Terraform?", options: ["YAML", "JSON", "HCL", "Python"], correct: 2 },
        { q: "¿Qué comando muestra qué cambiará SIN aplicar?", options: ["terraform apply", "terraform plan", "terraform diff", "terraform show"], correct: 1 },
        { q: "¿Dónde se guarda el state?", options: ["En git", "En un archivo local o backend remoto (S3)", "En la memoria", "En el binario"], correct: 1 },
        { q: "¿Qué es un módulo?", options: ["Un recurso", "Un paquete reutilizable de configuración", "Un proveedor", "Una variable"], correct: 1 },
        { q: "¿Qué herramienta es IaC con playbooks YAML?", options: ["Terraform", "Ansible", "Helm", "Pulumi"], correct: 1 },
      ],
    },
  ],
};
