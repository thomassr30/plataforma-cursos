import type { ModuleData } from "@/types/course";

export const m11: ModuleData = {
  slug: "m11",
  number: 11,
  title: "KMS y Secrets Manager",
  icon: "🔑",
  intro:
    "KMS administra claves de encriptación; Secrets Manager guarda secretos con rotación automática; Parameter Store es el almacén de configuración. Tres servicios complementarios para no hardcodear secretos.",
  totalActivities: 2,
  blocks: [
    // 1. KMS
    { kind: "h3", text: "🔐 1. ¿Qué es KMS?" },
    {
      kind: "info",
      html:
        "<strong>AWS Key Management Service</strong> administra claves de encriptación. Casi todos los servicios AWS (S3, EBS, RDS, DynamoDB, Secrets Manager) lo usan para encriptar datos en reposo.<br/><br/>" +
        "Ventajas:" +
        "<ul><li>Las claves <strong>nunca salen de KMS</strong></li>" +
        "<li><strong>Rotación automática</strong></li>" +
        "<li>Auditoría con CloudTrail</li>" +
        "<li>Integración nativa con servicios AWS</li></ul>",
    },

    // 2. Tipos de claves
    { kind: "h3", text: "🗝️ 2. Tipos de KMS keys" },
    {
      kind: "table",
      headers: ["Tipo", "Quién la administra", "Cuándo"],
      rows: [
        ["AWS owned", "AWS (invisible)", "Default cuando el servicio dice 'encriptar'"],
        ["AWS managed", "AWS (visible)", "Default con más visibilidad"],
        ["Customer managed", "Cliente", "Control total, rotación a demanda, audit"],
      ],
    },
    {
      kind: "info",
      html:
        "<strong>Symmetric (AES-256):</strong> misma clave encrypt y decrypt. Nunca sale de KMS. El default y más común.<br/>" +
        "<strong>Asymmetric (RSA, ECC):</strong> par pública/privada. Útil para firmas o cuando un cliente externo necesita encriptar para vos.",
    },

    // 3. Envelope encryption
    { kind: "h3", text: "✉️ 3. Envelope Encryption (concepto clave)" },
    {
      kind: "info",
      html:
        "KMS está diseñada para datos chicos (≤ 4 KB). Para datos grandes (un archivo de 1 GB) se usa <strong>envelope encryption</strong>:" +
        "<ol><li>KMS genera una <strong>data key</strong> simétrica</li>" +
        "<li>La data key encripta tu archivo localmente</li>" +
        "<li>KMS te devuelve la data key encriptada con la KMS key maestra</li>" +
        "<li>Guardás: archivo encriptado + data key encriptada</li>" +
        "<li>Para desencriptar: pedís a KMS que desencripte la data key, después usás la data key plana localmente</li></ol>" +
        "Ventaja: rapidez (AES local) + seguridad (clave maestra nunca sale).",
    },

    // 4. Secrets Manager
    { kind: "h3", text: "🤐 4. Secrets Manager" },
    {
      kind: "info",
      html:
        "Lugar correcto para guardar <strong>secretos</strong> (passwords, API keys, tokens, connection strings). Encripta con KMS automáticamente. Soporta <strong>rotación automática</strong> con una Lambda rotator. Integración nativa con RDS, Aurora, Redshift.",
    },

    // 5. Secrets Manager vs Parameter Store
    { kind: "h3", text: "🆚 5. Secrets Manager vs Parameter Store (examen)" },
    {
      kind: "table",
      headers: ["Caso", "Solución"],
      rows: [
        ["Password de RDS", "Secrets Manager (con rotación)"],
        ["API key de servicio externo", "Secrets Manager"],
        ["URL de servicio interno", "Parameter Store (no es secreto)"],
        ["Feature flag", "Parameter Store"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Diferencias clave:</strong> Parameter Store es más barato (gratis hasta cierto límite), simple, sin rotación. Secrets Manager paga, con rotación automática.",
    },

    // 6. Lab CLI - KMS
    { kind: "h3", text: "🧪 6. Lab: KMS" },
    {
      kind: "info",
      html:
        "<pre><code># Crear key + alias\n" +
        "KEY_ID=$(aws kms create-key \\\n" +
        "  --query 'KeyMetadata.KeyId' --output text)\n\n" +
        "aws kms create-alias \\\n" +
        "  --alias-name alias/mi-clave \\\n" +
        "  --target-key-id $KEY_ID\n\n" +
        "# Encriptar\n" +
        "aws kms encrypt \\\n" +
        "  --key-id alias/mi-clave \\\n" +
        "  --plaintext 'Hola secreto' \\\n" +
        "  --query CiphertextBlob --output text\n\n" +
        "# Generar data key (para envelope encryption)\n" +
        "aws kms generate-data-key \\\n" +
        "  --key-id alias/mi-clave \\\n" +
        "  --key-spec AES_256</code></pre>",
    },

    // 7. Lab CLI - Secrets Manager
    { kind: "h3", text: "🧪 7. Lab: Secrets Manager" },
    {
      kind: "info",
      html:
        "<pre><code># Crear secreto\n" +
        "aws secretsmanager create-secret \\\n" +
        "  --name miapp/db/password \\\n" +
        "  --secret-string '{\"username\":\"admin\",\"password\":\"super-secret\"}'\n\n" +
        "# Leer\n" +
        "aws secretsmanager get-secret-value \\\n" +
        "  --secret-id miapp/db/password\n\n" +
        "# Actualizar (crea nueva versión)\n" +
        "aws secretsmanager put-secret-value \\\n" +
        "  --secret-id miapp/db/password \\\n" +
        "  --secret-string '{\"username\":\"admin\",\"password\":\"nuevo\"}'</code></pre>",
    },

    // 8. Floci específico
    { kind: "h3", text: "⚠️ 8. Floci vs AWS real" },
    {
      kind: "info",
      html:
        "En Floci la <strong>encriptación es nominal</strong>: las APIs aceptan los algoritmos pero el cifrado no es criptográficamente seguro. Sirve para practicar la sintaxis. Tampoco se ejecuta la rotación automática real de Secrets Manager.",
    },

    // Quiz
    { kind: "h3", text: "🎯 Test del módulo 11" },
    {
      kind: "quiz",
      key: "m11_quiz",
      questions: [
        {
          q: "¿Qué es envelope encryption?",
          options: [
            "Encriptar dos veces seguidas",
            "Encriptar los datos con una data key local y guardar esa data key encriptada con la KMS key maestra",
            "Usar dos KMS keys",
            "Encriptar solo el sobre",
          ],
          correct: 1,
          explanation:
            "Envelope encryption: data key local encripta el archivo, KMS encripta la data key. Sortea el límite de 4 KB y mantiene la clave maestra nunca sale.",
        },
        {
          q: "Diferencia entre Secrets Manager y Parameter Store:",
          options: [
            "Parameter Store es más caro",
            "Secrets Manager tiene rotación automática integrada; Parameter Store no",
            "Solo Secrets Manager funciona en multi-AZ",
            "No hay diferencia",
          ],
          correct: 1,
          explanation: "Rotación es la diferencia clave. Secrets Manager también es más caro.",
        },
        {
          q: "Forma recomendada de guardar la password de la DB que usa una Lambda:",
          options: [
            "En el código",
            "Env var de la Lambda",
            "Secrets Manager, leyéndola en runtime",
            "Archivo secrets.txt en S3 público",
          ],
          correct: 2,
          explanation: "Secrets Manager es la respuesta canónica.",
        },
        {
          q: "Si una KMS key rota automáticamente:",
          options: [
            "Los datos viejos quedan ilegibles",
            "AWS re-encripta todo automáticamente",
            "La key vieja sigue desencriptando lo viejo; la nueva encripta lo nuevo",
            "La rotación rompe la app",
          ],
          correct: 2,
          explanation: "Rotación no rompe nada. Las claves anteriores quedan disponibles para desencriptar.",
        },
        {
          q: "Cuándo usás Parameter Store en lugar de Secrets Manager:",
          options: [
            "Para passwords",
            "Para configuración no sensible (URLs, feature flags), sin necesidad de rotación",
            "Para datos médicos",
            "Para API keys externas",
          ],
          correct: 1,
          explanation: "Parameter Store para config simple. Secrets Manager para secretos con rotación.",
        },
      ],
    },
  ],
};
