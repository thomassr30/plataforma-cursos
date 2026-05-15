import type { ModuleData } from "@/types/course";

export const m6: ModuleData = {
  slug: "m6",
  number: 6,
  title: "Inteligencia Artificial y Machine Learning",
  icon: "🤖",
  intro:
    "Google ha sido pionero en IA por décadas (TensorFlow, BERT, Transformers, Gemini nacieron aquí). En GCP, la oferta de IA cubre todo el espectro: desde APIs pre-entrenadas listas para usar hasta entrenamiento de modelos custom con TPUs. Vamos a entender cuándo usar cada herramienta.",
  totalActivities: 3,
  blocks: [
    // ============================================
    // SECCIÓN 1: Niveles de abstracción
    // ============================================
    { kind: "h3", text: "🎚️ 1. Los 4 niveles de abstracción de IA en GCP" },
    {
      kind: "paragraph",
      html:
        "Una pregunta típica del examen es <em>'¿qué servicio de IA debe usar esta empresa?'</em>. La respuesta depende de <strong>cuánto control y skill</strong> tiene el equipo. De más simple a más avanzado:",
    },
    {
      kind: "table",
      headers: ["Nivel", "Quién lo usa", "Servicio en GCP"],
      rows: [
        ["1. APIs pre-entrenadas", "Cualquier desarrollador", "Vision AI, Speech-to-Text, Translation, Document AI..."],
        ["2. AutoML (low/no code)", "Analistas sin ML profundo", "Vertex AI AutoML (Vision/NLP/Tabular)"],
        ["3. Modelos foundation", "Devs que usan LLMs", "Gemini API, Model Garden"],
        ["4. Custom training", "Data scientists / ML engineers", "Vertex AI Custom Training, Workbench, Pipelines"],
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 Regla del examen:</strong> Si la empresa <em>'no tiene equipo de ML'</em> o <em>'es un caso común (visión, voz, NLP)'</em> → ve hacia APIs pre-entrenadas. Si dice <em>'datos custom y quiere modelo propio sin código'</em> → AutoML. Si dice <em>'data scientists con modelos custom'</em> → Vertex AI completo.",
    },

    // ============================================
    // SECCIÓN 2: APIs pre-entrenadas
    // ============================================
    { kind: "h3", text: "🚀 2. APIs pre-entrenadas (lo más rápido)" },
    {
      kind: "info",
      html:
        "Google ofrece <strong>APIs ya entrenadas</strong> en datasets masivos. Solo llamas la API y obtienes resultados. No entrenas ni mantienes el modelo.",
    },
    {
      kind: "table",
      headers: ["API", "Para qué", "Casos típicos"],
      rows: [
        ["Vision AI", "Análisis de imágenes", "Detectar objetos, OCR, etiquetar, caras, productos similares"],
        ["Speech-to-Text", "Transcribir audio a texto", "Call centers, subtítulos, comandos por voz"],
        ["Text-to-Speech", "Generar voz natural", "Apps con voz, IVR, lectura automática"],
        ["Translation AI", "Traducir entre idiomas", "Apps multilingües, contenido global"],
        ["Natural Language", "Análisis de texto", "Sentiment, entidades, sintaxis, clasificación"],
        ["Document AI", "Extraer datos de docs", "Facturas, contratos, formularios"],
        ["Video Intelligence", "Análisis de video", "Etiquetar escenas, detectar objetos, OCR en video"],
        ["Dialogflow", "Chatbots conversacionales", "Atención al cliente, asistentes"],
        ["Contact Center AI", "IA para call centers", "Agentes virtuales, asistencia a agentes humanos"],
        ["Recommendations AI", "Recomendaciones de productos", "E-commerce, contenido"],
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Ventaja:</strong> sin datos propios, sin equipo ML, sin infraestructura. Resultados de nivel Google en minutos.",
    },

    // ============================================
    // SECCIÓN 3: Vertex AI
    // ============================================
    { kind: "h3", text: "🌟 3. Vertex AI: la plataforma unificada de ML" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> Vertex AI es la plataforma <strong>end-to-end</strong> de Google para todo el ciclo de ML: explorar datos, entrenar, desplegar, monitorear, gobernar. Unifica todas las herramientas de ML que antes estaban dispersas (AI Platform, AutoML, etc.).",
    },
    { kind: "h4", text: "Componentes de Vertex AI" },
    {
      kind: "table",
      headers: ["Componente", "Para qué"],
      rows: [
        ["Workbench", "Notebooks Jupyter administrados con GPUs/TPUs"],
        ["AutoML", "Entrena modelos sin código (Vision, NLP, Tabular, Forecasting)"],
        ["Custom Training", "Entrenamiento con tu código (PyTorch, TensorFlow, etc.)"],
        ["Model Registry", "Versiona y gobierna modelos"],
        ["Endpoints", "Despliega modelos con auto-scaling"],
        ["Batch Prediction", "Predicciones en lote (no en tiempo real)"],
        ["Pipelines", "Orquestación de pipelines ML reproducibles"],
        ["Feature Store", "Almacena y comparte features entre modelos"],
        ["Model Monitoring", "Detecta drift y skew en producción"],
        ["Explainable AI", "Interpretabilidad: ¿por qué el modelo decidió esto?"],
        ["Model Garden", "Catálogo de modelos foundation (Gemini, Llama, etc.)"],
      ],
    },

    // ============================================
    // SECCIÓN 4: AutoML
    // ============================================
    { kind: "h3", text: "🎨 4. AutoML: entrenar sin código" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> AutoML te permite entrenar modelos <strong>custom</strong> con tus datos, <strong>sin escribir código</strong>. Google se encarga del feature engineering, selección de algoritmo, hiperparámetros, etc.",
    },
    {
      kind: "list",
      items: [
        "<strong>AutoML Vision</strong>: clasificar imágenes, detectar objetos",
        "<strong>AutoML Natural Language</strong>: clasificar texto, sentiment, extraer entidades",
        "<strong>AutoML Tabular</strong>: predicciones sobre datos estructurados",
        "<strong>AutoML Forecasting</strong>: predicción de series temporales",
        "<strong>AutoML Video</strong>: clasificar y reconocer en video",
      ],
    },
    {
      kind: "successBox",
      html:
        "<strong>✅ Cuándo usar AutoML:</strong><br/>" +
        "• Tienes datos propios pero NO equipo de ML<br/>" +
        "• Quieres modelos custom sin programar<br/>" +
        "• Necesitas resultado rápido",
    },

    // ============================================
    // SECCIÓN 5: Gemini
    // ============================================
    { kind: "h3", text: "✨ 5. Gemini: los LLMs de Google" },
    {
      kind: "info",
      html:
        "<strong>Gemini</strong> es la familia de modelos foundation <strong>multimodal</strong> de Google (texto, imagen, audio, video, código). Lanzados en 2023, son los LLMs propios de Google que compiten con GPT-4, Claude.",
    },
    {
      kind: "list",
      items: [
        "<strong>Gemini Pro</strong>: balance velocidad/calidad",
        "<strong>Gemini Flash</strong>: ultra rápido y económico",
        "<strong>Gemini Ultra/Advanced</strong>: máximo rendimiento",
        "<strong>Gemini Nano</strong>: corre on-device (móviles)",
        "Accesibles vía <strong>Vertex AI Gemini API</strong> (empresa) o <strong>Google AI Studio</strong> (dev)",
      ],
    },
    { kind: "h4", text: "Casos típicos con Gemini" },
    {
      kind: "list",
      items: [
        "<strong>Resumen de documentos</strong> y extracción de info",
        "<strong>Chatbots avanzados</strong> que entienden contexto largo",
        "<strong>Generación de código</strong> y completado",
        "<strong>Análisis multimodal</strong> (entender imagen + texto juntos)",
        "<strong>Búsqueda semántica</strong>",
      ],
    },
    {
      kind: "tip",
      html:
        "<strong>💡 RAG (Retrieval-Augmented Generation):</strong> patrón donde combinas un LLM con tus datos propios (vector search). Disponible en Vertex AI Search and Conversation.",
    },

    // ============================================
    // SECCIÓN 6: BigQuery ML
    // ============================================
    { kind: "h3", text: "💾 6. BigQuery ML: ML con SQL" },
    {
      kind: "info",
      html:
        "<strong>Definición:</strong> BigQuery ML te permite crear y consultar modelos ML directamente con <strong>SQL</strong> dentro de BigQuery. Ideal para analistas SQL sin formación profunda en ML.",
    },
    {
      kind: "list",
      items: [
        "Modelos soportados: regresión lineal/logística, k-means, time series (ARIMA), random forests, boosted trees, matrix factorization, deep networks",
        "Importar modelos TensorFlow desde Vertex AI",
        "Datos quedan en BigQuery (no se mueven)",
        "Ideal para analistas que ya viven en BigQuery",
      ],
    },

    // ============================================
    // SECCIÓN 7: Tabla de decisión final
    // ============================================
    { kind: "h3", text: "🎯 7. Guía de decisión: ¿qué herramienta de IA uso?" },
    {
      kind: "table",
      headers: ["Necesidad", "Herramienta"],
      rows: [
        ["Transcribir audio a texto", "Speech-to-Text API"],
        ["Extraer datos de facturas", "Document AI"],
        ["Detectar objetos en imágenes", "Vision AI"],
        ["Traducir entre idiomas", "Translation AI"],
        ["Chatbot conversacional", "Dialogflow CX / Contact Center AI"],
        ["Clasificar imágenes con datos propios sin código", "AutoML Vision"],
        ["Predicción tabular sin código", "AutoML Tabular"],
        ["Entrenar modelo custom (PyTorch/TF)", "Vertex AI Custom Training"],
        ["LLM conversacional avanzado", "Vertex AI Gemini API"],
        ["ML sobre datos en BigQuery", "BigQuery ML"],
        ["Monitorear drift de modelo en producción", "Vertex AI Model Monitoring"],
      ],
    },

    // ============================================
    // SECCIÓN 8: Casos reales
    // ============================================
    { kind: "h3", text: "📚 8. Casos reales de uso" },
    {
      kind: "info",
      html:
        "<strong>Spotify</strong>: usa Vertex AI para recomendaciones personalizadas y descubrimiento.<br/><br/>" +
        "<strong>Wendy's</strong>: usa Gemini para automatizar drive-thrus (orden por voz).<br/><br/>" +
        "<strong>UPS</strong>: usa Vision AI para análisis de paquetes y optimización de rutas.<br/><br/>" +
        "<strong>Mercado Libre</strong>: usa BigQuery + Vertex AI para detección de fraude y personalización.",
    },

    // ============================================
    // JUEGOS
    // ============================================
    {
      kind: "matching",
      key: "m6_matching",
      pairs: [
        { en: "Vertex AI", es: "Plataforma ML end-to-end" },
        { en: "AutoML", es: "Entrenar sin código" },
        { en: "Gemini", es: "LLM multimodal de Google" },
        { en: "BigQuery ML", es: "ML con SQL sobre BigQuery" },
        { en: "Vision AI", es: "API de análisis de imágenes" },
        { en: "Document AI", es: "Extraer info de PDFs/facturas" },
        { en: "Dialogflow", es: "Chatbots conversacionales" },
        { en: "Model Monitoring", es: "Detectar drift en producción" },
      ],
    },

    // ============================================
    // QUIZ FINAL
    // ============================================
    {
      kind: "quiz",
      key: "m6_quiz",
      questions: [
        {
          q: "Empresa sin equipo de ML quiere transcribir llamadas de soporte:",
          options: ["Entrenar modelo desde cero", "Speech-to-Text API", "AutoML Custom", "Compute Engine + Whisper"],
          correct: 1,
          explanation:
            "Speech-to-Text es API pre-entrenada. No requiere skills de ML ni datos propios. Resultados inmediatos.",
        },
        {
          q: "Analista SQL quiere predecir churn con datos en BigQuery:",
          options: ["Vertex AI Custom Training", "BigQuery ML", "Python en Compute Engine", "Cloud Functions"],
          correct: 1,
          explanation:
            "BigQuery ML permite entrenar modelos con SQL sin mover datos. Perfecto para analistas que ya viven en BQ.",
        },
        {
          q: "Extraer información estructurada de facturas escaneadas:",
          options: ["Vision AI", "Document AI", "Translation API", "BigQuery"],
          correct: 1,
          explanation:
            "Document AI está especializado en documentos (facturas, formularios, contratos), no solo en imágenes generales.",
        },
        {
          q: "Empresa con data scientists quiere entrenar modelos custom con PyTorch:",
          options: ["AutoML", "APIs pre-entrenadas", "Vertex AI Custom Training", "Dialogflow"],
          correct: 2,
          explanation:
            "Vertex AI Custom Training soporta frameworks (PyTorch, TensorFlow, scikit-learn) y entrenamiento distribuido con GPUs/TPUs.",
        },
        {
          q: "Para construir un chatbot empresarial avanzado:",
          options: ["Vision AI", "Dialogflow CX", "Translation", "Compute Engine"],
          correct: 1,
          explanation:
            "Dialogflow CX es la plataforma enterprise de agentes conversacionales: flujos complejos, integraciones, multi-canal.",
        },
        {
          q: "Para entrenar un clasificador de productos con tus imágenes, sin código:",
          options: ["Vertex AI Custom", "AutoML Vision", "BigQuery ML", "Document AI"],
          correct: 1,
          explanation:
            "AutoML Vision te permite subir imágenes etiquetadas y entrenar un modelo custom sin código. Google se encarga del resto.",
        },
        {
          q: "Para usar el modelo LLM de Google en una app empresarial:",
          options: ["BigQuery", "Vertex AI Gemini API", "Cloud SQL", "Looker"],
          correct: 1,
          explanation:
            "Vertex AI Gemini API expone los modelos Gemini de Google para uso empresarial con SLA y seguridad.",
        },
        {
          q: "Después de desplegar un modelo, las predicciones empeoran porque los datos cambiaron. ¿Servicio?",
          options: [
            "Cloud Monitoring solo",
            "Vertex AI Model Monitoring",
            "BigQuery",
            "Cloud Logging",
          ],
          correct: 1,
          explanation:
            "Vertex AI Model Monitoring detecta drift (cambio en distribución) y skew (diferencia entre training y producción) en modelos.",
        },
        {
          q: "Caso de uso típico de RAG (Retrieval-Augmented Generation):",
          options: [
            "Detectar objetos",
            "Chatbot que responde sobre documentos propios usando un LLM",
            "Transcribir audio",
            "Traducir",
          ],
          correct: 1,
          explanation:
            "RAG combina un LLM con búsqueda vectorial sobre tus datos propios. Patrón clásico: chatbot empresarial que conoce los manuales internos.",
        },
        {
          q: "Para predicciones en BATCH sobre millones de filas (no necesitas latencia baja):",
          options: ["Endpoint en tiempo real", "Vertex AI Batch Prediction", "Cloud Run", "Compute Engine"],
          correct: 1,
          explanation:
            "Vertex AI Batch Prediction es para predicciones offline en grandes volúmenes. Más barato que mantener endpoints siempre encendidos.",
        },
      ],
    },
  ],
};
