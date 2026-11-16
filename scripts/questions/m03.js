export const m03Questions = [
  {
    id: 'q-mod-03-01',
    moduleId: 'mod-03-datos-embeddings-seleccion-modelos',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'fundamental',
    prompt: 'Una corporación de seguros médicos almacena en Google Cloud dos tipos de datos: millones de transacciones de facturación organizadas en tablas de BigQuery con esquemas estrictos de clave-valor, y cientos de miles de notas manuscritas digitalizadas de médicos, grabaciones de audio de llamadas de emergencia y pólizas en formato PDF escaneado. ¿Cómo clasifica Google Cloud estos dos activos de datos y qué tecnología es la más apropiada para analizarlos?',
    options: [
      {
        id: 'a',
        text: 'Las facturas son datos estructurados analizados con SQL relacional en BigQuery; las notas y grabaciones son datos no estructurados ideales para procesamiento con Vertex AI Embeddings y modelos multimodales Gemini.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Los datos estructurados residen en tablas tabulares formales analizadas con motores analíticos tradicionales como BigQuery, mientras que los datos no estructurados (texto libre, PDFs, audio, video) requieren el razonamiento y vectorización de modelos de IA Generativa.'
      },
      {
        id: 'b',
        text: 'Ambos tipos de datos son no estructurados y deben convertirse a archivos CSV antes de que cualquier servicio de Google Cloud pueda leerlos.',
        isCorrect: false,
        distractorRationale: 'Distractor conceptual falso. Las tablas de BigQuery son datos estructurados nativos con esquemas formales y no requieren conversión forzada a CSV.'
      },
      {
        id: 'c',
        text: 'Las notas y grabaciones son datos estructurados que deben indexarse con índices B-Tree tradicionales en Cloud SQL.',
        isCorrect: false,
        distractorRationale: 'Distractor de modelado. El texto libre y el audio continuo no poseen esquemas relacionales predecibles; forzarlos en índices B-Tree impide la búsqueda semántica.'
      },
      {
        id: 'd',
        text: 'Los modelos Gemini solo pueden procesar datos estructurados en formato XML y descartan el texto no estructurado.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. La fortaleza fundamental de Gemini y los LLMs modernos es precisamente su capacidad para comprender e interpretar datos no estructurados masivos.'
      }
    ],
    overallExplanation: 'En el panorama empresarial, hasta el 80% de los datos son no estructurados (documentos, imágenes, audios, correos). La IA Generativa y los modelos de embeddings de Google Cloud permiten extraer valor semántico de estos datos no estructurados, complementando las bases de datos analíticas como BigQuery que gestionan datos estructurados tabulares.',
    examHeuristic: 'Tablas/Métricas numéricas = Datos Estructurados (BigQuery/SQL). Textos/Audios/PDFs = Datos No Estructurados (Gemini/Embeddings).'
  },
  {
    id: 'q-mod-03-02',
    moduleId: 'mod-03-datos-embeddings-seleccion-modelos',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Un ingeniero de software que construye un motor de recomendación para un catálogo editorial necesita entender el concepto de "Embeddings Vectoriales" generado por la API `text-embedding-004` de Vertex AI. ¿Cuál es la definición técnica precisa de un embedding vectorial y cómo permite la búsqueda por similitud semántica?',
    options: [
      {
        id: 'a',
        text: 'Es una clave criptográfica MD5 que impide que el texto original sea leído por usuarios sin privilegios de administrador.',
        isCorrect: false,
        distractorRationale: 'Distractor de ciberseguridad. Los hashes MD5 o SHA son funciones unidireccionales de integridad criptográfica, no representaciones de similitud semántica.'
      },
      {
        id: 'b',
        text: 'Es una representación matemática en forma de vector numérico denso en un espacio multidimensional, donde textos con significados conceptuales afines quedan ubicados a corta distancia métrica (e.g. similitud de coseno).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Los embeddings convierten palabras o párrafos en arreglos de números en punto flotante que capturan la semántica profunda; textos con conceptos similares están geométricamente cercanos en el espacio latente.'
      },
      {
        id: 'c',
        text: 'Es un archivo ejecutable binario que corre directamente en el chip de memoria RAM de un teléfono inteligente.',
        isCorrect: false,
        distractorRationale: 'Distractor de arquitectura de software. Un embedding es un vector de datos numéricos (arreglo de floats), no un programa binario ejecutable.'
      },
      {
        id: 'd',
        text: 'Es una tabla relacional normalizada en tercera forma normal (3NF) alojada en Cloud Spanner.',
        isCorrect: false,
        distractorRationale: 'Distractor de bases de datos. Los embeddings son vectores multidimensionales matemáticos, no tablas SQL normalizadas.'
      }
    ],
    overallExplanation: 'Los embeddings vectoriales transforman información de lenguaje natural en coordenadas geométricas dentro de un espacio latente de alta dimensión (ej. 768 dimensiones en `text-embedding-004`). Frases con significado equivalente pero palabras distintas (ej. "tengo fiebre alta" y "mi temperatura corporal está elevada") generan vectores con alta similitud de coseno.',
    examHeuristic: 'Embedding Vectorial = Vector numérico denso en espacio latente donde cercanía geométrica (coseno) = afinidad semántica.'
  },
  {
    id: 'q-mod-03-03',
    moduleId: 'mod-03-datos-embeddings-seleccion-modelos',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Una corporación industrial de defensa requiere implementar un asistente de inspección de maquinaria en submarinos e instalaciones remotas sin conexión a internet y bajo estrictas exigencias legales de no transferir datos fuera de sus propios servidores locales. Al explorar Vertex AI Model Garden, ¿cuál es la mejor opción entre los modelos ofrecidos por Google para este requisito?',
    options: [
      {
        id: 'a',
        text: 'Utilizar exclusivamente Gemini 1.5 Pro a través de la API pública en la nube de Google.',
        isCorrect: false,
        distractorRationale: 'Distractor que ignora las restricciones. Gemini 1.5 Pro es un modelo First-Party propietario servido como API en la nube gestionada de Google Cloud, lo que requiere conectividad a internet e interacción cloud.'
      },
      {
        id: 'b',
        text: 'Descargar y desplegar Gemma 2 (la familia de modelos abiertos y ligeros de Google) en hardware local o clústeres propios del cliente.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Gemma es la familia de modelos abiertos de Google construidos a partir de la misma investigación y tecnología de Gemini; sus pesos están disponibles para ser descargados y ejecutados de forma autónoma en entornos locales desconectados (Edge/Air-gapped).'
      },
      {
        id: 'c',
        text: 'Desplegar Cloud Spanner en modo multirregión con replicación continua a servidores on-premise.',
        isCorrect: false,
        distractorRationale: 'Distractor fuera de tema. Spanner es una base de datos cloud para transacciones relacionales, no un modelo de lenguaje fundacional.'
      },
      {
        id: 'd',
        text: 'Reentrenar la API de Google Search para que funcione dentro de un microcontrolador de 8 bits.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. La Búsqueda de Google no es un modelo descargable ni puede operar en hardware de microcontrolador simple.'
      }
    ],
    overallExplanation: 'Vertex AI Model Garden ofrece tres clases de modelos: First-Party (Gemini, Imagen gestionados por Google), Third-Party (modelos de socios como Anthropic) y Open Models (como Gemma 2 y Llama). Gemma es un modelo abierto diseñado por Google que puede ejecutarse localmente en hardware privado o edge sin depender de la nube de Google.',
    examHeuristic: 'Ejecución local autónoma / Sin conexión / Modelo abierto de Google ➔ Gemma 2 (Model Garden).'
  },
  {
    id: 'q-mod-03-04',
    moduleId: 'mod-03-datos-embeddings-seleccion-modelos',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Un equipo de auditoría legal y de cumplimiento necesita analizar el código fuente completo de un sistema financiero legado compuesto por más de 120,000 líneas de código, junto con los manuales de especificación técnica de 800 páginas. En lugar de dividir los archivos en miles de fragmentos pequeños e implementar una base de datos vectorial con RAG tradicional, el equipo decide inyectar la totalidad del repositorio y los manuales en una única llamada de inferencia. ¿Qué característica arquitectónica de Gemini 1.5 Pro hace viable esta solución?',
    options: [
      {
        id: 'a',
        text: 'Su ventana de contexto ultra larga de hasta 2 millones de tokens.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Gemini 1.5 Pro admite una ventana de contexto de hasta 2 millones de tokens, lo que permite cargar repositorios de código enteros, horas de video o bibliotecas de documentos en memoria sin necesidad de segmentación previa.'
      },
      {
        id: 'b',
        text: 'Su capacidad de conectarse a discos duros mecánicos IDE sin controladores SATA.',
        isCorrect: false,
        distractorRationale: 'Distractor de hardware anticuado. La capacidad de procesamiento de texto no se relaciona con estándares de conectividad de almacenamiento de la década de 1990.'
      },
      {
        id: 'c',
        text: 'El uso obligatorio de un cluster de Cloud Dataproc con Hadoop 1.0.',
        isCorrect: false,
        distractorRationale: 'Distractor de Big Data legado. Gemini 1.5 se consume mediante una API moderna en Vertex AI y no requiere clústeres legados de Hadoop.'
      },
      {
        id: 'd',
        text: 'La reducción automática de la precisión numérica a enteros de 1 bit con pérdida del 90% del vocabulario.',
        isCorrect: false,
        distractorRationale: 'Distractor técnico falso. Gemini 1.5 Pro mantiene alta precisión y fidelidad de razonamiento (técnica "needle-in-a-haystack" cercana al 100% de recuperación) a lo largo de toda su ventana de contexto.'
      }
    ],
    overallExplanation: 'La ventana de contexto de Gemini 1.5 Pro (hasta 2 millones de tokens) redefine la arquitectura de soluciones GenAI: para colecciones de datos finitas (como una base de código completa o un conjunto de pólizas anuales), se puede pasar la totalidad de la información directamente en el prompt, logrando razonamiento holístico sin la complejidad de chunking, embeddings y recuperación vectorial.',
    examHeuristic: 'Análisis de documentos masivos o repositorios enteros en un solo prompt ➔ Ventana de contexto masiva de Gemini 1.5 Pro (hasta 2M tokens).'
  },
  {
    id: 'q-mod-03-05',
    moduleId: 'mod-03-datos-embeddings-seleccion-modelos',
    domainId: 'domain-1',
    type: 'multi',
    difficulty: 'advanced',
    prompt: 'Un arquitecto de soluciones de comercio electrónico diseña la infraestructura de IA para el evento de ventas del "Black Friday", donde se esperan 5,000 consultas por segundo de categorización de productos y traducción rápida de reseñas, y al mismo tiempo se requiere un asistente especializado para resolver disputas legales complejas de garantías comerciales. ¿Cuáles DOS afirmaciones capturan con precisión los trade-offs arquitectónicos entre Gemini 1.5 Flash y Gemini 1.5 Pro? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Gemini 1.5 Flash está optimizado para velocidad extrema, latencia mínima (bajo TTFT) y coste ultra reducido, siendo ideal para tareas de alto volumen como categorización y resumen rápido.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Flash es el modelo ligero de alta velocidad y máxima eficiencia económica de Google, concebido específicamente para procesar cargas de trabajo intensivas a gran escala con presupuestos ajustados.'
      },
      {
        id: 'b',
        text: 'Gemini 1.5 Pro ofrece capacidades superiores de razonamiento complejo, análisis analítico profundo y resolución de problemas difíciles (como auditoría legal o lógica avanzada), justificando un mayor coste por token.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Pro es el modelo de mayor capacidad cognitiva de la familia, diseñado para tareas donde la profundidad del razonamiento y la precisión en problemas intrincados son más prioritarias que el coste unitario.'
      },
      {
        id: 'c',
        text: 'Gemini 1.5 Flash solo admite entradas de texto de hasta 50 palabras y no soporta procesamiento multimodal.',
        isCorrect: false,
        distractorRationale: 'Distractor fáctico falso. Gemini 1.5 Flash es nativamente multimodal (admite texto, audio, imagen y video) y cuenta con una ventana de contexto de 1 millón de tokens.'
      },
      {
        id: 'd',
        text: 'Gemini 1.5 Pro es un modelo de código abierto gratuito que debe ejecutarse en servidores on-premise del cliente.',
        isCorrect: false,
        distractorRationale: 'Distractor de licenciamiento. Gemini 1.5 Pro es un modelo fundacional propietario de Google servido como API gestionada en la nube.'
      },
      {
        id: 'e',
        text: 'Gemini 1.5 Flash genera respuestas aleatorias porque no utiliza matrices de atención.',
        isCorrect: false,
        distractorRationale: 'Distractor técnico absurdo. Flash está basado en la arquitectura Transformer con mecanismos de atención avanzados y destilación eficiente de modelos.'
      }
    ],
    overallExplanation: 'La familia Gemini 1.5 implementa una bifurcación estratégica de modelos: Gemini 1.5 Pro proporciona la máxima potencia de razonamiento y precisión para problemas complejos a un coste por token mayor; Gemini 1.5 Flash ofrece una relación coste-beneficio excepcional, baja latencia y alto throughput para operaciones a escala masiva.',
    examHeuristic: 'Alto volumen + Baja latencia + Menor coste ➔ Gemini 1.5 Flash. Razonamiento profundo + Problemas complejos ➔ Gemini 1.5 Pro.'
  },
  {
    id: 'q-mod-03-06',
    moduleId: 'mod-03-datos-embeddings-seleccion-modelos',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Una cadena de tiendas departamentales desea crear una función de búsqueda visual en su aplicación móvil: el cliente sube la foto de una prenda que vio en la calle o describe con texto libre "vestido veraniego floreado con corte asimétrico", y el sistema debe encontrar las prendas más parecidas en su catálogo multimedia de fotos y videos. ¿Qué servicio de Google Cloud permite proyectar tanto imágenes como texto en el mismo espacio vectorial para calcular similitud directa?',
    options: [
      {
        id: 'a',
        text: 'Vertex AI Multimodal Embeddings API.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. La API de Multimodal Embeddings de Vertex AI proyecta texto, imágenes y video en un único espacio vectorial coordinado, permitiendo comparar directamente un vector derivado de una imagen con un vector generado a partir de una descripción textual.'
      },
      {
        id: 'b',
        text: 'Cloud SQL para PostgreSQL utilizando únicamente índices de clave primaria B-tree.',
        isCorrect: false,
        distractorRationale: 'Distractor de base de datos relacional. Índices B-tree estándar en Cloud SQL solo permiten comparaciones exactas o de rango numérico/alfanumérico, no similitud vectorial multimodal.'
      },
      {
        id: 'c',
        text: 'Google Cloud Translation API para traducir las fotos al idioma inglés.',
        isCorrect: false,
        distractorRationale: 'Distractor de producto incorrecto. Cloud Translation traduce texto entre diferentes lenguajes humanos, no procesa fotografías ni genera embeddings espaciales.'
      },
      {
        id: 'd',
        text: 'Cloud DNS gestionado con balanceo de carga Anycast.',
        isCorrect: false,
        distractorRationale: 'Distractor de redes. Cloud DNS resuelve dominios de internet y carece de relación con análisis semántico o modelos de visión.'
      }
    ],
    overallExplanation: 'La API de Multimodal Embeddings de Vertex AI genera representaciones vectoriales conjuntas donde una imagen y una descripción semántica equivalente comparten un espacio dimensional común. Esto habilita búsquedas de texto a imagen, imagen a imagen, o texto/imagen a catálogo de productos.',
    examHeuristic: 'Búsqueda cruzada de texto a imagen/video en el mismo espacio latente ➔ Vertex AI Multimodal Embeddings API.'
  },
  {
    id: 'q-mod-03-07',
    moduleId: 'mod-03-datos-embeddings-seleccion-modelos',
    domainId: 'domain-1',
    type: 'multi',
    difficulty: 'advanced',
    prompt: 'Un equipo de ingenieros de datos en Vertex AI prepara una base de conocimientos empresariales compuesta por manuales de ingeniería aeronáutica para alimentar un sistema RAG con búsqueda vectorial. ¿Cuáles DOS prácticas de fragmentación (chunking) y preprocesamiento son fundamentales para garantizar que los embeddings vectoriales recuperen información precisa y contextualizada? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Definir un tamaño de fragmento (chunk size) equilibrado con solapamiento (overlap) entre fragmentos contiguos para preservar el contexto en los límites de corte.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Si los fragmentos son demasiado pequeños pierden significado contextual; si son muy grandes diluyen la especificidad semántica. El solapamiento asegura que oraciones divididas en el límite conserven su sentido.'
      },
      {
        id: 'b',
        text: 'Incorporar metadatos relevantes (como título de sección, capítulo, fecha y número de página) adjuntos a cada fragmento antes de indexarlo en la base vectorial.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Los metadatos permiten filtrado híbrido (búsqueda vectorial combinada con filtros booleanos por fecha o sección) y mejoran sustancialmente la precisión y atribución de citas.'
      },
      {
        id: 'c',
        text: 'Eliminar todos los signos de puntuación, números y encabezados del documento para ahorrar espacio en disco.',
        isCorrect: false,
        distractorRationale: 'Distractor de antipatrón. Destruir la puntuación y los encabezados elimina la coherencia semántica y sintáctica esencial para que el modelo de embeddings interprete el texto.'
      },
      {
        id: 'd',
        text: 'Fragmentar el documento carácter por carácter en trozos individuales de un solo byte.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. Un fragmento de un solo carácter carece por completo de significado conceptual y destruye la utilidad de la búsqueda semántica.'
      },
      {
        id: 'e',
        text: 'Guardar todos los documentos en un único archivo de texto continuo de 10 gigabytes sin ningún salto de línea.',
        isCorrect: false,
        distractorRationale: 'Distractor de antipatrón extremo. Un archivo indivisible satura los límites de los modelos de embeddings y hace imposible la recuperación precisa de fragmentos específicos.'
      }
    ],
    overallExplanation: 'Una estrategia exitosa de RAG depende de la calidad del chunking: tamaño adecuado a la semántica del dominio, solapamiento (overlap) para no cortar entidades nombradas o ideas clave a la mitad, y enriquecimiento de cada fragmento con metadatos estructurados que habiliten búsquedas híbridas.',
    examHeuristic: 'Chunking óptimo en RAG = Tamaño semántico balanceado + Overlap en fronteras + Metadatos de sección/origen.'
  },
  {
    id: 'q-mod-03-08',
    moduleId: 'mod-03-datos-embeddings-seleccion-modelos',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Un banco de inversión requiere automatizar el resumen diario de 10,000 llamadas grabadas de clientes. Cada grabación dura entre 3 y 5 minutos. El objetivo es obtener un resumen de tres viñetas por llamada y la clasificación del motivo de la llamada en una de 12 categorías predefinidas. El presupuesto mensual es limitado y se requiere la solución más económica y rápida posible sin perder precisión en el resumen. ¿Qué modelo de Vertex AI Model Garden debe seleccionarse?',
    options: [
      {
        id: 'a',
        text: 'Gemini 1.5 Flash, gracias a su coste por token significativamente menor, procesamiento multimodal nativo de audio y baja latencia de respuesta.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Gemini 1.5 Flash procesa audio directamente de forma multimodal a una fracción del coste de Pro, ofreciendo la velocidad y economía perfectas para tareas de resumen y clasificación de alto volumen.'
      },
      {
        id: 'b',
        text: 'Preentrenar un modelo Transformer de 500 mil millones de parámetros desde cero en un clúster de Cloud TPUs.',
        isCorrect: false,
        distractorRationale: 'Distractor de sobrecoste astronómico. Preentrenar un modelo propio cuesta millones de dólares y es totalmente desproporcionado para una tarea estándar de resumen y categorización.'
      },
      {
        id: 'c',
        text: 'Utilizar un modelo de difusión de imágenes para generar gráficos de barras del tono de voz de cada llamada.',
        isCorrect: false,
        distractorRationale: 'Distractor sin relación. Los modelos de difusión sintetizan imágenes, no procesan audio conversacional ni generan resúmenes textuales estructurados.'
      },
      {
        id: 'd',
        text: 'Desplegar Cloud Spanner con réplicas de lectura en cinco continentes sin modelos de IA.',
        isCorrect: false,
        distractorRationale: 'Distractor de base de datos. Cloud Spanner almacena y consulta registros relacionales pero no resume audio ni realiza inferencias de lenguaje natural.'
      }
    ],
    overallExplanation: 'Para tareas masivas de alto volumen (10,000 audios diarios) donde la tarea es extracción, resumen y clasificación directa, Gemini 1.5 Flash es la elección canónica: procesa audio nativamente sin transcripción previa obligatoria y cuesta hasta un 80% menos que los modelos de mayor capacidad de razonamiento como Gemini 1.5 Pro.',
    examHeuristic: 'Procesamiento masivo de audio/texto de alto volumen con presupuesto ajustado ➔ Gemini 1.5 Flash.'
  }
];
