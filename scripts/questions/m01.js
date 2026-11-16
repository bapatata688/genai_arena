export const m01Questions = [
  {
    id: 'q-mod-01-01',
    moduleId: 'mod-01-fundamentos-ia-genai',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'fundamental',
    prompt: 'El director de tecnología de una empresa de telecomunicaciones necesita dos soluciones: primero, un sistema que prediga la probabilidad numérica de abandono (churn) de clientes basándose en registros históricos de facturación tabular; segundo, una herramienta capaz de redactar correos electrónicos con ofertas de retención personalizadas para los clientes en riesgo. ¿Qué combinación de enfoques tecnológicos es la adecuada según la taxonomía de Google Cloud?',
    options: [
      {
        id: 'a',
        text: 'Utilizar Inteligencia Artificial Generativa tanto para predecir la probabilidad numérica de abandono como para redactar los correos de retención.',
        isCorrect: false,
        distractorRationale: 'Distractor de sobreingeniería. Los modelos generativos no están optimizados para calcular probabilidades numéricas sobre datos tabulares estructurados; para predecir churn se debe usar ML supervisado tradicional.'
      },
      {
        id: 'b',
        text: 'Utilizar Aprendizaje Automático (ML) tradicional estructurado para la predicción de churn e Inteligencia Artificial Generativa para la redacción de correos.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. El ML tradicional (regresión/árboles de decisión en BigQuery ML o Vertex AI) es óptimo para predecir métricas numéricas sobre datos tabulares, mientras que la IA Generativa (LLMs como Gemini) destaca en la síntesis y creación de contenido no estructurado.'
      },
      {
        id: 'c',
        text: 'Implementar Deep Learning basado en redes convolucionales para predecir el churn y reglas estáticas de software (if/else) para generar el texto.',
        isCorrect: false,
        distractorRationale: 'Distractor arquitectónico. Las redes convolucionales (CNN) están diseñadas para visión computacional, no para datos tabulares, y las reglas estáticas no ofrecen personalización empática ni dinamismo contextual.'
      },
      {
        id: 'd',
        text: 'Entrenar un modelo de difusión multimodal desde cero para ambas tareas en Google Cloud AI Hypercomputer.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. Los modelos de difusión se emplean para síntesis de imágenes y medios continuos, no para predicción de churn tabular ni para redacción de correos corporativos.'
      }
    ],
    overallExplanation: 'La taxonomía fundamental de Google Cloud distingue claramente entre el ML predictivo tradicional (optimizado para patrones numéricos y datos estructurados tabulares) y la IA Generativa (diseñada para crear contenido original y procesar lenguaje natural). Aplicar IA generativa a problemas de regresión tabular es un antipatrón costoso e impreciso.',
    examHeuristic: 'Datos tabulares numéricos ➔ ML Tradicional. Creación/Síntesis de contenido no estructurado ➔ IA Generativa.'
  },
  {
    id: 'q-mod-01-02',
    moduleId: 'mod-01-fundamentos-ia-genai',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Un banco minorista desea automatizar la clasificación de intenciones de soporte al cliente, el resumen de contratos y la traducción de quejas en cinco idiomas. Históricamente, el equipo de ciencia de datos entrenaba y mantenía un modelo de machine learning independiente para cada tarea. ¿Cuál es la principal ventaja técnica y operativa de adoptar un Modelo Fundacional (Foundation Model) como Gemini en lugar de múltiples modelos tradicionales dedicados?',
    options: [
      {
        id: 'a',
        text: 'Los modelos fundacionales requieren que el cliente provea millones de registros etiquetados manualmente antes de poder responder la primera consulta.',
        isCorrect: false,
        distractorRationale: 'Distractor conceptual falso. Los modelos fundacionales ya han sido preentrenados con corpus masivos y ofrecen capacidades zero-shot y few-shot inmediatas sin etiquetado previo masivo por parte del cliente.'
      },
      {
        id: 'b',
        text: 'Un único modelo fundacional preentrenado a gran escala puede adaptarse a múltiples tareas diversas mediante prompts sin necesidad de reentrenar arquitecturas independientes.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. La característica definitoria de los modelos fundacionales es el aprendizaje autosupervisado sobre datos masivos, permitiendo generalización y ejecución de tareas heterogéneas (resumen, clasificación, traducción) con un solo artefacto.'
      },
      {
        id: 'c',
        text: 'Los modelos fundacionales eliminan por completo la latencia de inferencia y garantizan un determinismo matemático del 100% en todas las respuestas.',
        isCorrect: false,
        distractorRationale: 'Distractor técnico. Los LLMs son probabilísticos por naturaleza y la generación autorregresiva de tokens introduce latencia no despreciable en comparación con clasificadores lineales simples.'
      },
      {
        id: 'd',
        text: 'Los modelos fundacionales operan exclusivamente sobre bases de datos relacionales SQL y prescinden del procesamiento de lenguaje natural.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. Los modelos fundacionales procesan primordialmente texto no estructurado, código, imágenes y audio, no esquemas relacionales nativos sin intermediación.'
      }
    ],
    overallExplanation: 'Los modelos fundacionales revolucionan el ciclo de vida de la IA al sustituir el paradigma de "un modelo especializado por cada tarea" por un único modelo centralizado preentrenado capaz de resolver múltiples tareas lingüísticas y multimodales mediante instrucciones (prompting).',
    examHeuristic: 'Modelo Fundacional = Preentrenamiento masivo autosupervisado + Adaptabilidad multi-tarea sin reentrenamiento de base.'
  },
  {
    id: 'q-mod-01-03',
    moduleId: 'mod-01-fundamentos-ia-genai',
    domainId: 'domain-1',
    type: 'multi',
    difficulty: 'intermediate',
    prompt: 'Una plataforma de comercio electrónico global está evaluando el modelo Gemini 1.5 de Google para procesar transmisiones en vivo de subastas, videos de unboxing y preguntas de clientes en voz y texto. El equipo de arquitectura destaca que Gemini fue diseñado con "multimodalidad nativa" desde el inicio. ¿Cuáles DOS afirmaciones describen correctamente la multimodalidad nativa de Gemini frente a arquitecturas ensambladas tradicionales? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Gemini fue preentrenado desde el inicio con diferentes modalidades (texto, código, imágenes, audio y video) de manera conjunta dentro de la misma red neuronal.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. A diferencia de soluciones que concatenan modelos independientes, Gemini fue entrenado nativamente con múltiples modalidades de entrada en su arquitectura unificada.'
      },
      {
        id: 'b',
        text: 'Gemini requiere obligatoriamente convertir el audio y el video a texto plano mediante herramientas externas de transcripción antes de procesar cualquier información semántica.',
        isCorrect: false,
        distractorRationale: 'Distractor de arquitectura legada. El procesamiento en cascada (transcribir audio a texto o usar OCR antes de consultar al LLM) es el enfoque previo que destruye información paralingüística y tonal que Gemini procesa de forma nativa.'
      },
      {
        id: 'c',
        text: 'El modelo es capaz de razonar directamente sobre relaciones temporales y espaciales en video y pistas de audio continuas sin perder matices prosódicos o visuales.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. La multimodalidad nativa permite correlacionar eventos visuales exactos en video con entonaciones de voz y sonidos de fondo sin intermediarios destructivos.'
      },
      {
        id: 'd',
        text: 'La multimodalidad nativa de Gemini permite únicamente la entrada de texto y genera exclusivamente archivos binarios ejecutables para microcontroladores.',
        isCorrect: false,
        distractorRationale: 'Distractor sin sentido. La multimodalidad abarca tanto la comprensión como el razonamiento sobre texto, imagen, audio, video y código.'
      },
      {
        id: 'e',
        text: 'El procesamiento multimodal nativo solo funciona si el cliente entrena su propio modelo con Cloud GPUs locales desconectadas de Vertex AI.',
        isCorrect: false,
        distractorRationale: 'Distractor falso. Gemini está completamente disponible como servicio gestionado a través de Vertex AI API y Google AI Studio sin necesidad de infraestructura gestionada por el cliente.'
      }
    ],
    overallExplanation: 'La multimodalidad nativa de Google Gemini significa que el modelo no fue construido pegando modelos separados (e.g. un transcriptor de voz más un modelo de visión más un LLM de texto), sino que fue preentrenado desde sus cimientos sobre secuencias combinadas de audio, video, imagen, código y texto, permitiéndole comprender sutilezas temporales, acústicas y visuales de manera directa.',
    examHeuristic: 'Multimodalidad Nativa = Preentrenamiento unificado multimodelo desde cero (NO cascada de OCR + ASR + LLM).'
  },
  {
    id: 'q-mod-01-04',
    moduleId: 'mod-01-fundamentos-ia-genai',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'El equipo de marketing de una marca de moda digital requiere una solución en Google Cloud para generar imágenes fotorrealistas de alta resolución de prendas de vestir a partir de descripciones textuales detalladas. ¿Qué familia de modelos generativos y servicio de Google Cloud es la opción recomendada para esta necesidad?',
    options: [
      {
        id: 'a',
        text: 'Modelos de Difusión a través de Imagen 3 en Vertex AI.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Los modelos de difusión (como Imagen 3 de Google) son el estándar de la industria para generar imágenes fotorrealistas mediante el proceso de eliminación iterativa de ruido sobre representaciones latentes.'
      },
      {
        id: 'b',
        text: 'Modelos de Lenguaje Autorregresivos basados exclusivamente en Codey para sintetizar mapas de bits.',
        isCorrect: false,
        distractorRationale: 'Distractor de producto incorrecto. Codey está especializado en generación y completado de código fuente de programación, no en síntesis de imágenes visuales fotorrealistas.'
      },
      {
        id: 'c',
        text: 'Modelos de Aprendizaje por Refuerzo no supervisado alojados en Cloud Spanner.',
        isCorrect: false,
        distractorRationale: 'Distractor arquitectónico. Cloud Spanner es una base de datos relacional distribuida transaccional, no un motor de inferencia de modelos generativos visuales.'
      },
      {
        id: 'd',
        text: 'Modelos lineales generalizados en BigQuery ML para renderizado tridimensional.',
        isCorrect: false,
        distractorRationale: 'Distractor técnico. Los modelos lineales se utilizan para predicción estadística tradicional (regresión y clasificación binaria), no para generación de imágenes fotorrealistas.'
      }
    ],
    overallExplanation: 'Para la síntesis de imágenes a partir de texto (text-to-image), Google Cloud proporciona Imagen 3, el cual está fundamentado en la arquitectura de modelos de difusión. Estos modelos aprenden a revertir un proceso estocástico de adición de ruido para generar imágenes nítidas de alta fidelidad estética y tipográfica.',
    examHeuristic: 'Generación de imágenes fotorrealistas con texto ➔ Modelos de Difusión (Imagen 3 en Vertex AI).'
  },
  {
    id: 'q-mod-01-05',
    moduleId: 'mod-01-fundamentos-ia-genai',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'fundamental',
    prompt: 'Durante una prueba piloto de un asistente virtual interno, un usuario le preguntó al modelo: "¿Cuáles fueron los ingresos del tercer trimestre del año en curso de nuestra división de logística?". El modelo respondió con un párrafo elocuente y bien estructurado que contenía cifras financieras detalladas pero completamente ficticias. ¿Cómo se denomina técnicamente este fenómeno en la IA Generativa y cuál es su causa raíz?',
    options: [
      {
        id: 'a',
        text: 'Falla de hardware en la memoria HBM de las Cloud TPU que provocó pérdida de bits durante la multiplicación de matrices.',
        isCorrect: false,
        distractorRationale: 'Distractor de infraestructura. La invención de datos no se origina en fallas de silicio o memoria de hardware, sino en la naturaleza estadística de los pesos del modelo.'
      },
      {
        id: 'b',
        text: 'Alucinación (Hallucination), provocada por la naturaleza probabilística del LLM al predecir los tokens más verosímiles sin acceso a una fuente de verdad anclada (grounding).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Los LLMs generan texto calculando probabilidades de palabras siguientes basándose en patrones aprendidos, por lo que sin anclaje (Grounding/RAG) en datos corporativos reales pueden generar afirmaciones falsas pero convincentes.'
      },
      {
        id: 'c',
        text: 'Corrupción del índice vectorial en BigQuery Vector Search debido a una tasa de compresión excesiva.',
        isCorrect: false,
        distractorRationale: 'Distractor de base de datos. En el escenario el modelo fue consultado directamente sin mención de RAG o índices vectoriales corruptos.'
      },
      {
        id: 'd',
        text: 'Ataque de denegación de servicio distribuido (DDoS) que alteró el orden de las capas de atención del Transformer.',
        isCorrect: false,
        distractorRationale: 'Distractor de ciberseguridad sin sustento. Los ataques DDoS saturan redes o endpoints, no modifican la arquitectura interna ni la generación de tokens de un LLM.'
      }
    ],
    overallExplanation: 'Las alucinaciones son un comportamiento intrínseco de los modelos autorregresivos: su objetivo matemático es predecir la secuencia de tokens con mayor coherencia estadística y fluidez lingüística, no verificar la veracidad empírica de sus afirmaciones. Para mitigar alucinaciones se requiere Grounding con fuentes fácticas verificables.',
    examHeuristic: 'Datos ficticios con tono seguro = Alucinación ➔ Solución: Grounding con fuentes fácticas (RAG).'
  },
  {
    id: 'q-mod-01-06',
    moduleId: 'mod-01-fundamentos-ia-genai',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'El arquitecto de soluciones de una empresa de servicios financieros debe diseñar un asistente de voz interactivo que atienda llamadas telefónicas entrantes. Para garantizar una experiencia de usuario fluida y natural, el sistema debe comenzar a reproducir la respuesta hablada en menos de 500 milisegundos tras la intervención del cliente. ¿Qué métrica técnica de rendimiento de inferencia es la más crítica para evaluar en este caso?',
    options: [
      {
        id: 'a',
        text: 'Tiempo total de entrenamiento previo (Pre-training Epoch Time).',
        isCorrect: false,
        distractorRationale: 'Distractor de fase de desarrollo. El tiempo de entrenamiento previo se mide en semanas o meses antes del despliegue y no afecta la latencia de respuesta en runtime.'
      },
      {
        id: 'b',
        text: 'Tiempo hasta el primer token (Time to First Token - TTFT) junto con la capacidad de streaming de tokens.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Para sistemas de conversación interactiva y voz en tiempo real, el TTFT determina cuándo comienza a recibirse la respuesta para iniciar la síntesis de audio de inmediato mediante streaming.'
      },
      {
        id: 'c',
        text: 'Tasa de compresión de embeddings en Cloud Storage Coldline.',
        isCorrect: false,
        distractorRationale: 'Distractor de almacenamiento. Coldline es almacenamiento de archivo para datos de acceso poco frecuente, totalmente inadecuado para inferencia de baja latencia.'
      },
      {
        id: 'd',
        text: 'Cantidad total de parámetros flotantes en formato FP64.',
        isCorrect: false,
        distractorRationale: 'Distractor de precisión numérica. La inferencia moderna de LLMs se ejecuta en BF16, FP8 o INT4 en hardware acelerado, y FP64 no es una métrica de latencia conversacional.'
      }
    ],
    overallExplanation: 'En aplicaciones conversacionales interactivas (especialmente agentes de voz), el factor decisivo para la percepción de inmediatez es el Time to First Token (TTFT). Un TTFT bajo, combinado con streaming de tokens hacia el motor de Text-to-Speech, permite que el usuario escuche la respuesta casi instantáneamente.',
    examHeuristic: 'Interacción de voz en tiempo real ➔ Minimizar TTFT (Time to First Token) + Habilitar Streaming.'
  },
  {
    id: 'q-mod-01-07',
    moduleId: 'mod-01-fundamentos-ia-genai',
    domainId: 'domain-1',
    type: 'multi',
    difficulty: 'advanced',
    prompt: 'Un comité de innovación tecnológica analiza su cartera de proyectos para determinar cuáles deben resolverse con Inteligencia Artificial Generativa y cuáles con Aprendizaje Automático Tradicional. ¿Cuáles DOS casos de negocio justifican arquitectónicamente el uso de IA Generativa en lugar de ML clásico? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Detección de fraudes en transacciones de tarjetas de crédito en tiempo real analizando montos, geolocalización y frecuencia mediante árboles de decisión.',
        isCorrect: false,
        distractorRationale: 'Distractor de caso ML clásico. La detección de fraudes sobre tablas transaccionales numéricas de alta velocidad es el escenario canónico para modelos de ML tradicionales (XGBoost, Random Forest).'
      },
      {
        id: 'b',
        text: 'Generación automatizada de borradores de respuestas empáticas y personalizadas a reclamaciones de clientes basándose en el historial de correos no estructurados.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. La redacción de respuestas contextuales con tono empático sobre correspondencia en lenguaje natural es una capacidad distintiva de los LLMs generativos.'
      },
      {
        id: 'c',
        text: 'Estimación del precio óptimo de billetes de avión basándose en elasticidad de precios histórica y demanda estacional en BigQuery.',
        isCorrect: false,
        distractorRationale: 'Distractor de regresión numérica. La optimización de precios dinámicos y elasticidad es un problema cuantitativo de optimización matemática y regresión tabular clásica.'
      },
      {
        id: 'd',
        text: 'Síntesis ejecutiva y extracción estructurada de cláusulas indemnizatorias a partir de cientos de contratos jurídicos no estandarizados en formato PDF.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. La extracción semántica y síntesis de documentos no estructurados con vocabulario complejo exige la comprensión profunda y razonamiento de modelos fundacionales.'
      },
      {
        id: 'e',
        text: 'Clasificación binaria de correos electrónicos entre spam y no spam basada en conteo de palabras clave mediante regresión logística.',
        isCorrect: false,
        distractorRationale: 'Distractor de clasificación básica. Filtros de spam tradicionales con modelos lineales simples o Naive Bayes son más económicos y suficientes sin requerir inferencia de LLM.'
      }
    ],
    overallExplanation: 'La IA Generativa aporta su mayor valor cuando el problema involucra generación de lenguaje original, síntesis de textos no estructurados extensos o razonamiento sobre conceptos complejos. Los problemas con datos tabulares numéricos estructurados (fraude, pricing) deben resolverse con ML analítico tradicional.',
    examHeuristic: 'Crear/Resumir/Sintetizar lenguaje natural ➔ GenAI. Calcular/Optimizar valores numéricos tabulares ➔ ML Tradicional.'
  }
];
