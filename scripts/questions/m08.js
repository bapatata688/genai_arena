export const m08Questions = [
  {
    id: 'q-mod-08-01',
    moduleId: 'mod-08-grounding-rag-fine-tuning',
    domainId: 'domain-3',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Una agencia de noticias financieras desea que su asistente conversacional responda preguntas sobre eventos corporativos ocurridos hace pocos minutos (como adquisiciones empresariales o anuncios de ganancias trimestrales de empresas públicas) y proporcione enlaces directos a las fuentes web originales para que los periodistas verifiquen la información. Los modelos fundacionales estándar tienen una fecha de corte de conocimiento previa a estos eventos. ¿Qué funcionalidad nativa de Vertex AI resuelve este desafío sin necesidad de construir una base de datos propia?',
    options: [
      {
        id: 'a',
        text: 'Grounding con Google Search (Anclaje con la Búsqueda de Google) en Vertex AI.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Grounding con Google Search permite que Gemini consulte el índice en vivo de la Búsqueda de Google durante la inferencia, inyectando noticias actuales y hechos en tiempo real en el contexto con atribución de enlaces web clickeables.'
      },
      {
        id: 'b',
        text: 'Reentrenar el modelo fundacional Gemini diariamente mediante un clúster de TPU v5p.',
        isCorrect: false,
        distractorRationale: 'Distractor de coste y obsolescencia. Reentrenar un modelo diariamente cuesta millones de dólares, toma horas y aun así no capturaría eventos ocurridos hace escasos minutos.'
      },
      {
        id: 'c',
        text: 'Desactivar los controles de seguridad y pedir al modelo que adivine el futuro.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. Ningún modelo probabilístico puede predecir eventos futuros o noticias no ocurridas sin alucinar.'
      },
      {
        id: 'd',
        text: 'Guardar todas las noticias del mundo en una hoja de Google Sheets pública sin actualizarla.',
        isCorrect: false,
        distractorRationale: 'Distractor inviable. Una hoja de cálculo no actualizada no contiene noticias recientes ni se integra de forma escalable con el motor de inferencia.'
      }
    ],
    overallExplanation: 'Grounding con Google Search en Vertex AI conecta a los modelos Gemini con la base de información más fresca y amplia del mundo. Cuando se formula una pregunta sobre eventos recientes, el modelo emite consultas de búsqueda, recupera fragmentos de la web pública y redacta una respuesta fundamentada con hipervínculos de cita directa.',
    examHeuristic: 'Eventos de última hora / Noticias públicas recientes / Enlaces web de cita directa ➔ Grounding con Google Search.'
  },
  {
    id: 'q-mod-08-02',
    moduleId: 'mod-08-grounding-rag-fine-tuning',
    domainId: 'domain-3',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Una institución financiera internacional necesita implementar un asistente virtual que responda consultas de clientes sobre tasas de interés hipotecarias y reglamentaciones crediticias que se actualizan todos los lunes. La dirección de riesgos exige que cada respuesta incluya una cita verificable al memorándum interno correspondiente y que no existan invenciones fácticas. ¿Cuál es la estrategia recomendada en Google Cloud?',
    options: [
      {
        id: 'a',
        text: 'Realizar un Fine-Tuning supervisado semanal de Gemini 1.5 Flash utilizando los memorándums como conjunto de datos de entrenamiento.',
        isCorrect: false,
        distractorRationale: 'Distractor clásico del examen. El fine-tuning adapta estilo y formato, pero no es apto para información dinámica; reentrenar semanalmente es costoso, no elimina alucinaciones y no proporciona citas directas a párrafos.'
      },
      {
        id: 'b',
        text: 'Implementar Retrieval-Augmented Generation (RAG) mediante Vertex AI Search conectando el repositorio de Cloud Storage donde se alojan los memorándums.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. RAG / Grounding con Vertex AI Search permite consultar fuentes de datos dinámicas en tiempo real, inyecta la información factual en el contexto de Gemini y devuelve atribución exacta de citas a los documentos originales.'
      },
      {
        id: 'c',
        text: 'Aumentar la temperatura del modelo a 1.0 para incentivar al modelo a deducir las tasas actualizadas de forma autónoma.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. Elevar la temperatura aumenta la entropía estocástica y multiplica exponencialmente las alucinaciones.'
      },
      {
        id: 'd',
        text: 'Preentrenar un modelo fundacional propio desde cero en un clúster de TPU v5p para absorber el conocimiento bancario.',
        isCorrect: false,
        distractorRationale: 'Distractor por sobreingeniería y coste desmesurado. Preentrenar un modelo cuesta millones de dólares, toma meses y sufre del mismo problema de obsolescencia en cuanto las tasas cambien la semana siguiente.'
      }
    ],
    overallExplanation: 'Para datos empresariales dinámicos donde se requiere estricta fidelidad fáctica y trazabilidad documental con citas, el patrón arquitectónico canónico es RAG con Vertex AI Search. El fine-tuning no debe emplearse para inyectar conocimiento que varía con frecuencia.',
    examHeuristic: 'Memorándums dinámicos + Citas verificables + Evitar alucinaciones ➔ Vertex AI Search con Grounding (NUNCA Fine-Tuning).'
  },
  {
    id: 'q-mod-08-03',
    moduleId: 'mod-08-grounding-rag-fine-tuning',
    domainId: 'domain-3',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Un hospital universitario desea que Gemini genere informes de alta médica siguiendo estrictamente la jerga clínica, la estructura de secciones y el estilo de redacción protocolar propio de sus especialistas. Tras optimizar los prompts con Few-Shot, notan que para mantener la cadencia y vocabulario médico especializado en todas las consultas necesitan un comportamiento del modelo más profundamente adaptado y predecible, reduciendo además el tamaño del prompt en cada llamada. ¿Cuál es la técnica adecuada en este escenario?',
    options: [
      {
        id: 'a',
        text: 'Supervised Fine-Tuning (SFT / Ajuste Fino Supervisado) de un modelo en Vertex AI utilizando un conjunto curado de ejemplos de historias clínicas y altas médicas.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. El Fine-Tuning supervisado es la técnica adecuada para enseñar al modelo un dialecto especializado, jerga profesional, estilo de marca o formato sintáctico complejo de manera intrínseca en sus pesos adaptados, reduciendo la necesidad de prompts extensos.'
      },
      {
        id: 'b',
        text: 'Grounding con Google Search público para buscar diagnósticos en blogs de internet.',
        isCorrect: false,
        distractorRationale: 'Distractor de riesgo médico y privacidad. Consultar blogs públicos viola la privacidad y no enseña el estilo protocolar interno del hospital.'
      },
      {
        id: 'c',
        text: 'Comprar licencias de software ofimático de consumo individual para los médicos.',
        isCorrect: false,
        distractorRationale: 'Distractor de producto ajeno a la personalización de modelos clínicos en producción.'
      },
      {
        id: 'd',
        text: 'Desactivar todos los filtros de seguridad de Vertex AI para que el modelo redacte sin restricciones.',
        isCorrect: false,
        distractorRationale: 'Distractor peligroso. Eliminar la seguridad incrementa riesgos legales y no adapta el estilo clínico del modelo.'
      }
    ],
    overallExplanation: 'El Fine-Tuning supervisado (SFT) está diseñado específicamente para adaptar el comportamiento, tono, formato y vocabulario especializado del modelo. A diferencia de RAG (que aporta conocimiento fáctico dinámico), el Fine-Tuning modifica los pesos del modelo para que interiorice cómo debe comunicarse y expresarse.',
    examHeuristic: 'Adaptar jerga especializada, estilo de redacción o formato estricto permanente ➔ Supervised Fine-Tuning (SFT).'
  },
  {
    id: 'q-mod-08-04',
    moduleId: 'mod-08-grounding-rag-fine-tuning',
    domainId: 'domain-3',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'El equipo de tecnología de una tienda de comercio electrónico desea resolver un problema recurrente: su catálogo tiene 200,000 productos y los precios y el stock cambian cada hora. Un desarrollador junior propone realizar Fine-Tuning diario al modelo Gemini inyectando las tablas de precios y existencias en el dataset de entrenamiento. ¿Por qué esta propuesta representa un antipatrón arquitectónico crítico en Google Cloud?',
    options: [
      {
        id: 'a',
        text: 'Porque el Fine-Tuning no garantiza la precisión fáctica de datos numéricos dinámicos, es extremadamente costoso y lento para ejecutarse cada hora, no ofrece trazabilidad con citas y el modelo seguirá alucinando precios desactualizados.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Es la trampa clásica de arquitectura: el fine-tuning nunca debe usarse como base de datos dinámica. Para datos que cambian con frecuencia (precios, stock), se debe utilizar RAG o Function Calling hacia la base de datos transaccional.'
      },
      {
        id: 'b',
        text: 'Porque los modelos de Google Cloud solo admiten catálogos de hasta 10 productos.',
        isCorrect: false,
        distractorRationale: 'Distractor fáctico falso. Vertex AI maneja catálogos de millones de productos a través de Vertex AI Search y Vector Search.'
      },
      {
        id: 'c',
        text: 'Porque el Fine-Tuning apaga automáticamente todos los servidores web de la tienda durante el reentrenamiento.',
        isCorrect: false,
        distractorRationale: 'Distractor operativo absurdo. Los pipelines de entrenamiento en Vertex AI se ejecutan de forma aislada sin interrumpir servicios web externos.'
      },
      {
        id: 'd',
        text: 'Porque en Google Cloud está prohibido vender productos por internet.',
        isCorrect: false,
        distractorRationale: 'Distractor ridículo sin relación comercial o técnica.'
      }
    ],
    overallExplanation: 'Antipatrón de oro en el examen: "Usar Fine-Tuning para almacenar hechos cambiantes". Los pesos de una red neuronal son aproximadores estadísticos difusos, no tablas relacionales. Los precios y el inventario en tiempo real deben consultarse mediante RAG o Function Calling a la base de datos corporativa.',
    examHeuristic: 'Trampa del examen: NUNCA usar Fine-Tuning para datos dinámicos, precios o stock ➔ Usar RAG o Function Calling.'
  },
  {
    id: 'q-mod-08-05',
    moduleId: 'mod-08-grounding-rag-fine-tuning',
    domainId: 'domain-3',
    type: 'multi',
    difficulty: 'advanced',
    prompt: 'Al evaluar técnicas de Fine-Tuning en Vertex AI, el equipo de ingeniería opta por Parameter-Efficient Fine-Tuning (PEFT) utilizando el algoritmo LoRA (Low-Rank Adaptation) en lugar de un Full Fine-Tuning de todos los pesos del modelo. ¿Cuáles DOS ventajas técnicas y económicas explican esta decisión arquitectónica? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Reduce drásticamente el consumo de memoria y la cantidad de parámetros entrenables (congelando el modelo base y entrenando matrices de bajo rango), lo que abarata los costes de cómputo en TPUs/GPUs y acelera el tiempo de entrenamiento.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. LoRA congela los miles de millones de parámetros del modelo original y solo actualiza pequeñas matrices adaptadoras intercaladas, disminuyendo el coste y requerimientos de memoria en más del 80%.'
      },
      {
        id: 'b',
        text: 'Mitiga el riesgo de "olvido catastrófico" (catastrophic forgetting), preservando el conocimiento general y razonamiento del modelo fundacional mientras aprende la tarea específica.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Al congelar los pesos preentrenados originales, el modelo no pierde sus habilidades generales lingüísticas ni de sentido común, evitando la degradación típica del full fine-tuning no controlado.'
      },
      {
        id: 'c',
        text: 'LoRA elimina la necesidad de contar con datos de entrenamiento y genera ejemplos falsos automáticamente.',
        isCorrect: false,
        distractorRationale: 'Distractor metodológico. Todo fine-tuning requiere un conjunto de datos curado de alta calidad; LoRA es una técnica de optimización matemática de tensores, no un generador sintético sin supervisión.'
      },
      {
        id: 'd',
        text: 'LoRA convierte el modelo de lenguaje en un circuito electrónico analógico de válvulas de vacío.',
        isCorrect: false,
        distractorRationale: 'Distractor de tecnología anacrónica sin ningún fundamento técnico.'
      },
      {
        id: 'e',
        text: 'Obliga a que el modelo funcione únicamente en modo offline sin conexión a ninguna red.',
        isCorrect: false,
        distractorRationale: 'Distractor de conectividad falso. Los modelos ajustados con PEFT/LoRA se despliegan en endpoints de inferencia estándar en Vertex AI con todas las opciones de red.'
      }
    ],
    overallExplanation: 'PEFT con LoRA es el estándar moderno para adaptar LLMs: congela el modelo base y entrena matrices de bajo rango añadidas a las capas de atención. Esto reduce exponencialmente el consumo de recursos de cómputo, acelera el ciclo de entrenamiento, previene el olvido catastrófico y permite servir múltiples adaptadores ligeros sobre una única instancia del modelo base.',
    examHeuristic: 'PEFT / LoRA = Menor coste/memoria + Entrenamiento rápido + Congela modelo base evitando olvido catastrófico.'
  },
  {
    id: 'q-mod-08-06',
    moduleId: 'mod-08-grounding-rag-fine-tuning',
    domainId: 'domain-3',
    type: 'single',
    difficulty: 'advanced',
    prompt: 'Una corporación de retail a nivel global cuenta con 50 millones de productos y desea implementar una búsqueda vectorial en tiempo real para millones de usuarios concurrentes. Los vectores provienen de `text-embedding-004` (768 dimensiones). Requieren una base de datos vectorial administrada capaz de realizar búsquedas de vecinos más cercanos aproximados (ANN - Approximate Nearest Neighbors) con latencia inferior a 5 milisegundos a escala masiva, utilizando el algoritmo líder ScaNN desarrollado por Google Research. ¿Qué servicio de Vertex AI es el adecuado?',
    options: [
      {
        id: 'a',
        text: 'Vertex AI Vector Search (anteriormente Vertex AI Matching Engine).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Vertex AI Vector Search es la base de datos vectorial de ultra alto rendimiento y baja latencia de Google Cloud; implementa la biblioteca ScaNN (Vector Search con cuantización y árboles de partición espacial) para consultar miles de millones de vectores en milisegundos con alta concurrencia (QPS).'
      },
      {
        id: 'b',
        text: 'Almacenar los vectores en un archivo de texto plano en Google Drive y descargarlo en cada consulta.',
        isCorrect: false,
        distractorRationale: 'Distractor de arquitectura inviable. Descargar un archivo de 50 millones de vectores en cada petición colapsaría el ancho de banda y tardaría minutos en ejecutarse.'
      },
      {
        id: 'c',
        text: 'Cloud Translation API configurada en modo síncrono.',
        isCorrect: false,
        distractorRationale: 'Distractor de servicio no relacionado. Translation API traduce texto, no indexa ni busca vectores en espacios latentes de alta dimensión.'
      },
      {
        id: 'd',
        text: 'Cloud DNS con reenviadores condicionales privados.',
        isCorrect: false,
        distractorRationale: 'Distractor de redes. Los servidores DNS no realizan búsquedas de similitud vectorial de vecinos más cercanos.'
      }
    ],
    overallExplanation: 'Vertex AI Vector Search (Matching Engine) es la tecnología subyacente que potencia las búsquedas a escala de Google (YouTube, Google Play, Search). Está diseñada para indexar desde miles hasta miles de millones de vectores densos y resolver consultas de vecinos más cercanos aproximados (ANN) con latencias de un solo dígito de milisegundos bajo cargas de miles de QPS.',
    examHeuristic: 'Búsqueda vectorial de altísima escala (> millones de vectores) y ultra baja latencia (< 5 ms) ➔ Vertex AI Vector Search.'
  },
  {
    id: 'q-mod-08-07',
    moduleId: 'mod-08-grounding-rag-fine-tuning',
    domainId: 'domain-3',
    type: 'multi',
    difficulty: 'advanced',
    prompt: 'Un equipo de MLOps en una entidad de salud implementa una pipeline RAG con Vertex AI para asistir a médicos en la revisión de protocolos de emergencia. Antes de autorizar su uso clínico, deben implementar un marco sistemático de evaluación de la calidad de RAG. ¿Cuáles DOS métricas son esenciales para evaluar cuantitativamente que el sistema no alucine y que la información recuperada sea la adecuada? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Tasa de fundamentación (Groundedness / Faithfulness): evalúa si todas las afirmaciones contenidas en la respuesta generada por el LLM se pueden deducir y comprobar directamente a partir de los documentos recuperados.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Groundedness es la métrica reina para prevenir alucinaciones en RAG: garantiza que el modelo no introduzca datos de su memoria previa que no estén respaldados por el contexto provisto.'
      },
      {
        id: 'b',
        text: 'Relevancia del contexto (Context Relevance): mide qué porcentaje del contenido recuperado de la base de datos es verdaderamente pertinente a la pregunta formulada, penalizando fragmentos con información irrelevante o ruido.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Context Relevance evalúa la efectividad de la fase de recuperación de información (retriever): inyectar fragmentos irrelevantes confunde al LLM y desperdicia tokens de la ventana de contexto.'
      },
      {
        id: 'c',
        text: 'Velocidad de rotación de las aspas del ventilador del servidor del cliente.',
        isCorrect: false,
        distractorRationale: 'Distractor electromecánico sin sentido. Las métricas de ventiladores no evalúan la coherencia ni la fidelidad de los modelos de IA.'
      },
      {
        id: 'd',
        text: 'Cantidad de correos electrónicos no leídos en la bandeja de entrada del administrador.',
        isCorrect: false,
        distractorRationale: 'Distractor administrativo sin relación con la precisión clínica o evaluación de pipelines RAG.'
      },
      {
        id: 'e',
        text: 'Distancia física en kilómetros entre el hospital y la sede central de Google en Mountain View.',
        isCorrect: false,
        distractorRationale: 'Distractor geográfico absurdo. La distancia física no determina la exactitud semántica del sistema RAG.'
      }
    ],
    overallExplanation: 'La evaluación formal de RAG se sustenta en la tríada de métricas: 1. Context Relevance (¿los fragmentos recuperados son pertinentes a la pregunta?), 2. Groundedness / Faithfulness (¿la respuesta del modelo se basa al 100% en los fragmentos?), y 3. Answer Relevance (¿la respuesta responde directamente a la necesidad del usuario?).',
    examHeuristic: 'Métricas críticas de RAG: Context Relevance (calidad del recuperador) + Groundedness (cero afirmaciones no respaldadas).'
  },
  {
    id: 'q-mod-08-08',
    moduleId: 'mod-08-grounding-rag-fine-tuning',
    domainId: 'domain-3',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Tras entrenar un modelo fundacional o realizar un ajuste fino supervisado, los ingenieros de Google Cloud aplican técnicas de alineación como Reinforcement Learning from Human Feedback (RLHF) y Direct Preference Optimization (DPO). ¿Cuál es el objetivo primordial de estas técnicas de alineación con preferencias humanas?',
    options: [
      {
        id: 'a',
        text: 'Alinear las respuestas del modelo con valores éticos, seguridad, utilidad y preferencias humanas, reduciendo respuestas tóxicas, sesgadas o evasivas mediante la comparación de pares de respuestas preferidas y rechazadas.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. RLHF y DPO orientan el modelo para que sus respuestas no solo sean gramaticalmente correctas, sino también serviciales, seguras y alineadas con las expectativas y directrices éticas humanas mediante retroalimentación de pares ordenados.'
      },
      {
        id: 'b',
        text: 'Reemplazar los procesadores de la computadora por baterías de litio.',
        isCorrect: false,
        distractorRationale: 'Distractor de hardware eléctrico. Las técnicas de alineación son algoritmos de aprendizaje de software y matemáticas de optimización, no componentes energéticos.'
      },
      {
        id: 'c',
        text: 'Eliminar el idioma español del vocabulario del modelo para que solo hable lenguajes binarios.',
        isCorrect: false,
        distractorRationale: 'Distractor lingüístico destructivo falso. La alineación busca que el modelo se comunique mejor en lenguaje humano natural.'
      },
      {
        id: 'd',
        text: 'Aumentar la latencia de respuesta para que los usuarios no utilicen el servicio con demasiada frecuencia.',
        isCorrect: false,
        distractorRationale: 'Distractor de degradación intencional absurdo. El objetivo de la optimización en producción es siempre minimizar la latencia y maximizar la satisfacción del usuario.'
      }
    ],
    overallExplanation: 'RLHF (Aprendizaje por Refuerzo con Retroalimentación Humana) y DPO (Optimización Directa de Preferencias) constituyen la etapa final de alineación: convierten un modelo que simplemente predice el siguiente token en un asistente útil, seguro y respetuoso con las directrices humanas, mitigando respuestas hostiles o peligrosas.',
    examHeuristic: 'Alineación de modelos con valores humanos y mitigación de respuestas dañinas ➔ RLHF / DPO.'
  }
];
