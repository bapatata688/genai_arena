export const m06Questions = [
  {
    id: 'q-mod-06-01',
    moduleId: 'mod-06-plataformas-vertex-search-agentes',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Una corporación de servicios financieros necesita habilitar un motor de búsqueda semántica interna sobre 500,000 políticas de crédito, circulares normativas y contratos almacenados en formato PDF en Google Cloud Storage. El equipo técnico carece de especialistas en bases de datos vectoriales y dispone de solo dos semanas para poner en marcha la solución. Desean un servicio totalmente gestionado que maneje automáticamente la ingesta de documentos, la fragmentación (chunking), la generación de embeddings, la indexación y la síntesis de respuestas con citas directas. ¿Qué servicio de Google Cloud es la opción recomendada?',
    options: [
      {
        id: 'a',
        text: 'Vertex AI Search (anteriormente Enterprise Search en Gen AI App Builder).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Vertex AI Search es la solución llave en mano (turnkey) de Google Cloud para búsqueda semántica empresarial y RAG totalmente administrado: ingesta documentos desde Cloud Storage, genera embeddings automáticamente, indexa vectores y devuelve respuestas sintetizadas con citas verificables sin requerir desarrollo de infraestructura vectorial a medida.'
      },
      {
        id: 'b',
        text: 'Desarrollar un motor de búsqueda desde cero en lenguaje C sobre máquinas virtuales sin discos persistentes.',
        isCorrect: false,
        distractorRationale: 'Distractor de sobreingeniería masiva. Construir un motor de recuperación semántica vectorial desde cero tomaría meses de desarrollo de un equipo de ingenieros especializados y viola el requisito de despliegue en dos semanas.'
      },
      {
        id: 'c',
        text: 'Google Cloud Translation API para traducir los PDFs al código Morse.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. La API de traducción no es un motor de búsqueda ni de RAG empresarial.'
      },
      {
        id: 'd',
        text: 'Desplegar Cloud DNS con enrutamiento geográfico para distribuir consultas web.',
        isCorrect: false,
        distractorRationale: 'Distractor de redes. Cloud DNS resuelve dominios en internet y carece de funcionalidades de búsqueda de texto o inteligencia artificial.'
      }
    ],
    overallExplanation: 'Vertex AI Search proporciona capacidades de "Turnkey RAG": permite a cualquier organización conectar almacenes de datos (Cloud Storage, BigQuery, sitios web, Salesforce, Jira) y obtener inmediatamente un motor de búsqueda cognitiva con relevancia de Google, resúmenes automáticos y citas a fuentes documentales sin necesidad de gestionar pipelines de embeddings ni bases vectoriales manuales.',
    examHeuristic: 'Buscador semántico empresarial gestionado con citas y cero gestión de infraestructura ➔ Vertex AI Search.'
  },
  {
    id: 'q-mod-06-02',
    moduleId: 'mod-06-plataformas-vertex-search-agentes',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Una aerolínea comercial desea crear un agente conversacional para su aplicación móvil que pueda mantener diálogos naturales con los pasajeros, responder preguntas frecuentes sobre políticas de equipaje consultando manuales internos, y al mismo tiempo ejecutar flujos guiados deterministas para cambios de asientos y reservas de vuelos. ¿Qué plataforma de Google Cloud combina agentes conversacionales generativos con flujos estructurados?',
    options: [
      {
        id: 'a',
        text: 'Vertex AI Conversation (integrado con Dialogflow CX y Vertex AI Search).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Vertex AI Conversation une la potencia generativa de los LLMs (para preguntas abiertas basadas en documentos con Vertex AI Search) con la robustez y control de flujos conversacionales deterministas de Dialogflow CX (para transacciones críticas de negocio como cambios de vuelo).'
      },
      {
        id: 'b',
        text: 'Cloud Filestore configurado con protocolo NFSv3.',
        isCorrect: false,
        distractorRationale: 'Distractor de almacenamiento compartido. Filestore es un almacenamiento en red de archivos para servidores Linux, no un agente conversacional interactivo.'
      },
      {
        id: 'c',
        text: 'Cloud Run Functions que responda únicamente con mensajes de error 404.',
        isCorrect: false,
        distractorRationale: 'Distractor destructivo. Responder errores 404 rompe la experiencia de usuario y no provee capacidades conversacionales.'
      },
      {
        id: 'd',
        text: 'Google Play Protect para escanear virus en los dispositivos de los pasajeros.',
        isCorrect: false,
        distractorRationale: 'Distractor de ciberseguridad móvil. Play Protect analiza malware en Android y carece de relación con asistentes de atención al cliente de aerolíneas.'
      }
    ],
    overallExplanation: 'Vertex AI Conversation combina lo mejor de dos mundos: la flexibilidad de la IA Generativa anclada a documentos corporativos para responder consultas no estructuradas, junto con el control estricto de flujos de estado y llamadas a APIs de Dialogflow CX para ejecutar transacciones comerciales reguladas.',
    examHeuristic: 'Chatbot conversacional híbrido (Flujos guiados transaccionales + Respuestas generativas documentales) ➔ Vertex AI Conversation.'
  },
  {
    id: 'q-mod-06-03',
    moduleId: 'mod-06-plataformas-vertex-search-agentes',
    domainId: 'domain-2',
    type: 'multi',
    difficulty: 'intermediate',
    prompt: 'Una empresa de servicios profesionales desea unificar la búsqueda de conocimientos corporativos dispersos en múltiples repositorios heterogéneos mediante Vertex AI Search. ¿Cuáles DOS fuentes de datos admite Vertex AI Search mediante conectores nativos y configuraciones gestionadas directas? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Almacenes de documentos no estructurados en Google Cloud Storage (como archivos PDF, HTML, TXT o DOCX) y sitios web públicos rastreados por URL.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Vertex AI Search soporta nativamente la ingesta de documentos en Cloud Storage y la indexación de páginas web públicas con rastreo web automático gestionado por Google.'
      },
      {
        id: 'b',
        text: 'Sistemas SaaS empresariales de terceros como Salesforce, Jira, Confluence y Google Drive mediante conectores integrados de Vertex AI Search.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Google Cloud provee conectores administrados de primera clase para indexar conocimiento empresarial alojado en herramientas colaborativas como Jira, Confluence, Salesforce y Google Workspace/Drive.'
      },
      {
        id: 'c',
        text: 'Disquetes magnéticos de 5.25 pulgadas conectados a computadoras de escritorio en la sede del cliente.',
        isCorrect: false,
        distractorRationale: 'Distractor de medios físicos arcaicos. Los conectores en la nube no pueden leer medios magnéticos analógicos desconectados de internet.'
      },
      {
        id: 'd',
        text: 'Líneas telefónicas de voz analógicas sin digitalización de audio.',
        isCorrect: false,
        distractorRationale: 'Distractor de telecomunicaciones antiguas. La ingesta de datos requiere datos digitales accesibles por API o protocolos de almacenamiento en la nube.'
      },
      {
        id: 'e',
        text: 'Archivos temporales en la papelera de reciclaje de sistemas operativos apagados.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. La indexación se efectúa sobre repositorios activos y estructurados, no sobre registros efímeros inaccesibles.'
      }
    ],
    overallExplanation: 'Vertex AI Search ofrece gran versatilidad de ingesta: conecta datos no estructurados en Cloud Storage, datos estructurados en BigQuery, sitios web corporativos y suites SaaS líderes como Google Drive, Salesforce, Jira y Confluence, consolidando un buscador unificado sin fricciones de integración.',
    examHeuristic: 'Fuentes de Vertex AI Search: Cloud Storage + Sitios Web + BigQuery + Conectores SaaS (Jira, Confluence, Salesforce, Drive).'
  },
  {
    id: 'q-mod-06-04',
    moduleId: 'mod-06-plataformas-vertex-search-agentes',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Un desarrollador construye un asistente para compras de comercio electrónico con Gemini 1.5 en Vertex AI. Cuando un cliente pregunta: "¿Tienen zapatillas deportivas modelo Pegasus talla 42 en la tienda de Madrid?", el modelo no debe inventar la respuesta ni adivinar el stock. ¿Cómo funciona el mecanismo de Function Calling (Llamada a Funciones / Tool Use) en Gemini para resolver esta interacción de manera determinista?',
    options: [
      {
        id: 'a',
        text: 'El desarrollador describe la función `consultar_stock(modelo, talla, tienda)` con un esquema JSON; el modelo analiza el prompt, detecta que necesita esa función y genera una llamada estructurada en JSON con los argumentos exactos; la aplicación cliente ejecuta la API real y devuelve el resultado al modelo para que redacte la respuesta final.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. En Function Calling, el LLM nunca ejecuta código directamente ni accede a la base de datos por sí mismo; en su lugar, actúa como un planificador que interpreta el lenguaje natural, extrae los parámetros correctos y solicita a la aplicación cliente ejecutar la función externa antes de sintetizar la respuesta final.'
      },
      {
        id: 'b',
        text: 'Gemini reescribe los pesos de la base de datos relacional del cliente utilizando comandos SQL de superusuario generados al azar.',
        isCorrect: false,
        distractorRationale: 'Distractor de grave peligro de corrupción de datos. Los modelos de lenguaje no tienen acceso directo a nivel de superusuario para alterar bases de datos arbitrariamente.'
      },
      {
        id: 'c',
        text: 'El modelo apaga el servidor web del comercio para evitar que otros usuarios compren la zapatilla.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. La llamada a funciones es un protocolo de integración de APIs de software, no una denegación de servicio.'
      },
      {
        id: 'd',
        text: 'El desarrollador debe reentrenar Gemini cada vez que un cliente realiza una consulta de stock.',
        isCorrect: false,
        distractorRationale: 'Distractor de sobrecoste imposible. La información dinámica se obtiene en tiempo real mediante APIs con Function Calling, nunca reentrenando el modelo fundacional.'
      }
    ],
    overallExplanation: 'Function Calling en Google Gemini convierte al LLM en un motor de razonamiento capaz de conectarse con el mundo exterior: dada una especificación de herramientas (tools), el modelo detecta cuándo utilizarlas, formatea los argumentos en un objeto JSON estructurado y espera la respuesta del sistema antes de comunicarse con el usuario, asegurando fidelidad transaccional.',
    examHeuristic: 'Function Calling = El modelo detecta intención + Devuelve JSON con parámetros ➔ Tu app llama a la API real ➔ El modelo responde.'
  },
  {
    id: 'q-mod-06-05',
    moduleId: 'mod-06-plataformas-vertex-search-agentes',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'advanced',
    prompt: 'Un equipo de arquitectura diseña un agente autónomo complejo que utiliza el framework LangChain en Python para orquestar un proceso de 7 pasos: consultar tres APIs bancarias, validar la solvencia crediticia con un árbol de decisión, generar una propuesta y registrar la transacción. Desean desplegar y gestionar este agente en un entorno nativo de Google Cloud totalmente administrado, con soporte de ejecución de código en Python, gestión de sesiones y observabilidad integrada. ¿Qué servicio de Vertex AI está diseñado específicamente para este propósito?',
    options: [
      {
        id: 'a',
        text: 'Vertex AI Reasoning Engine.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Vertex AI Reasoning Engine es el servicio administrado de Google Cloud para construir, probar y desplegar agentes complejos basados en frameworks populares (como LangChain, LlamaIndex o AutoGen), gestionando la ejecución del código en Python, el estado de sesión y la orquestación multi-paso en producción.'
      },
      {
        id: 'b',
        text: 'Cloud Storage Nearline configurado con ciclo de vida de borrado en 24 horas.',
        isCorrect: false,
        distractorRationale: 'Distractor de almacenamiento temporal. Nearline almacena objetos binarios estáticos; carece de entornos de ejecución de código en Python y orquestación de agentes.'
      },
      {
        id: 'c',
        text: 'Google Cloud Memorystore for Memcached sin persistencia.',
        isCorrect: false,
        distractorRationale: 'Distractor de caché en memoria simple. Memcached es un almacén de valores clave volátiles, no un motor de razonamiento y ejecución de agentes de IA.'
      },
      {
        id: 'd',
        text: 'Cloud DNS con resolución de nombres inversa para direcciones IPv6.',
        isCorrect: false,
        distractorRationale: 'Distractor de redes. Los servidores DNS resuelven nombres de dominio, no ejecutan lógica de agentes de lenguaje natural.'
      }
    ],
    overallExplanation: 'Vertex AI Reasoning Engine proporciona un puente entre los frameworks de agentes de código abierto (LangChain, LlamaIndex) y la nube empresarial de Google: empaqueta la lógica de la aplicación en Python, la despliega en microservicios seguros y escalables, y gestiona la interacción con los modelos fundacionales de Gemini y las herramientas corporativas.',
    examHeuristic: 'Despliegue administrado de agentes basados en código Python (LangChain/LlamaIndex) ➔ Vertex AI Reasoning Engine.'
  },
  {
    id: 'q-mod-06-06',
    moduleId: 'mod-06-plataformas-vertex-search-agentes',
    domainId: 'domain-2',
    type: 'multi',
    difficulty: 'intermediate',
    prompt: 'Un arquitecto de Google Cloud debe asesorar a un cliente sobre cuándo implementar Vertex AI Search frente a cuándo construir un Agente Autónomo con Vertex AI Agent Builder / Reasoning Engine. ¿Cuáles DOS criterios representan la diferenciación arquitectónica correcta entre ambos servicios? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Vertex AI Search es la opción óptima cuando el objetivo principal es recuperar, buscar y resumir información factual proveniente de documentos y fuentes de datos estáticas o periódicas (Turnkey RAG).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Vertex AI Search está especializado en responder preguntas basadas en datos documentales con búsqueda semántica y citas verificables sin lógica transaccional compleja.'
      },
      {
        id: 'b',
        text: 'Vertex AI Agent Builder / Reasoning Engine es necesario cuando la solución requiere ejecutar acciones transaccionales en sistemas externos, coordinar flujos multi-paso, planificar tareas complejas (patrón ReAct) y tomar decisiones condicionales.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Los agentes autónomos van más allá de la lectura pasiva: pueden modificar registros, invocar APIs transaccionales, recordar el estado de la conversación y encadenar herramientas de forma dinámica.'
      },
      {
        id: 'c',
        text: 'Vertex AI Search solo puede buscar palabras individuales de hasta 3 letras y no comprende preguntas completas.',
        isCorrect: false,
        distractorRationale: 'Distractor técnico falso. Vertex AI Search utiliza el motor semántico de Google que procesa lenguaje natural complejo, preguntas abiertas y relaciones conceptuales profundas.'
      },
      {
        id: 'd',
        text: 'Los Agentes Autónomos no admiten el uso de modelos de lenguaje y funcionan exclusivamente con ficheros de texto plano.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. Los agentes autónomos se sustentan precisamente en las capacidades de razonamiento, extracción e inferencia de los LLMs más avanzados como Gemini 1.5 Pro.'
      },
      {
        id: 'e',
        text: 'Vertex AI Search requiere que el cliente compre servidores físicos y los instale en su oficina.',
        isCorrect: false,
        distractorRationale: 'Distractor de hardware. Vertex AI Search es un servicio completamente administrado en la nube pública de Google Cloud (Serverless).'
      }
    ],
    overallExplanation: 'La regla de decisión arquitectónica es: si el caso de uso es informativo (buscar respuestas, sintetizar documentos, citar fuentes), Vertex AI Search es la solución más rápida y robusta. Si el caso de uso requiere actuar (ejecutar compras, modificar bases de datos, interactuar con múltiples APIs en cadena), se requiere un Agente con Vertex AI Agent Builder / Reasoning Engine.',
    examHeuristic: 'Recuperar información factual con citas ➔ Vertex AI Search. Tomar acciones y orquestar flujos multi-paso ➔ Agentes con Reasoning Engine.'
  },
  {
    id: 'q-mod-06-07',
    moduleId: 'mod-06-plataformas-vertex-search-agentes',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Una empresa de telecomunicaciones desea que su asistente conversacional desarrollado en Vertex AI pueda consultar el estado de facturación de los clientes y activar nuevos planes móviles en su sistema CRM backend. El sistema CRM expone sus servicios mediante una API REST documentada con el estándar OpenAPI (Swagger). ¿Qué componente de Vertex AI permite conectar de forma directa y declarativa el modelo de IA con esta API REST externa utilizando dicha especificación?',
    options: [
      {
        id: 'a',
        text: 'Vertex AI Extensions (Extensiones de Vertex AI).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Vertex AI Extensions permite registrar especificaciones OpenAPI para conectar de manera segura y estandarizada los modelos Gemini con servicios externos (APIs REST corporativas, bases de datos o servicios de Google Cloud) sin requerir código de integración intermedio complejo.'
      },
      {
        id: 'b',
        text: 'Cloud CDN configurado con almacenamiento en caché estático perimetral.',
        isCorrect: false,
        distractorRationale: 'Distractor de entrega de contenido. Cloud CDN acelera la entrega de activos web estáticos (imágenes, CSS) pero no conecta LLMs con APIs REST mediante especificaciones OpenAPI.'
      },
      {
        id: 'c',
        text: 'Google Cloud Armor con reglas de limitación de tasa Layer 7.',
        isCorrect: false,
        distractorRationale: 'Distractor de seguridad de red. Cloud Armor es un Web Application Firewall (WAF) que protege aplicaciones contra ataques DDoS y de inyección web, no conecta LLMs con herramientas.'
      },
      {
        id: 'd',
        text: 'Modificar manualmente los cables de red de la sede corporativa.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo de infraestructura física que carece de relación con especificaciones OpenAPI.'
      }
    ],
    overallExplanation: 'Vertex AI Extensions estandariza cómo los modelos de Gemini interactúan con el mundo exterior: al proporcionar un archivo de especificación OpenAPI, el modelo comprende automáticamente las rutas, los parámetros de entrada requeridos y las respuestas de la API REST, habilitando extensiones como Vertex AI Code Interpreter o APIs privadas de negocio.',
    examHeuristic: 'Conectar Gemini con APIs REST mediante especificaciones OpenAPI ➔ Vertex AI Extensions.'
  },
  {
    id: 'q-mod-06-08',
    moduleId: 'mod-06-plataformas-vertex-search-agentes',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'advanced',
    prompt: 'En una corporación multinacional, empleados de diferentes áreas (finanzas, recursos humanos, ingeniería y legal) utilizan un buscador corporativo unificado construido con Vertex AI Search. Las políticas de seguridad exigen estrictamente que los empleados de ingeniería no puedan ver resúmenes ni fragmentos de contratos ejecutivos confidenciales ni registros salariales a los que no tienen autorización en el directorio corporativo. ¿Qué funcionalidad de Vertex AI Search garantiza este control de acceso granular por usuario?',
    options: [
      {
        id: 'a',
        text: 'Listas de control de acceso a nivel de usuario y grupo (ACLs - Access Control Lists) sincronizadas con el proveedor de identidades corporativo (IAM / Cloud Identity).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Vertex AI Search soporta filtrado por ACLs a nivel de documento: cada usuario recibe únicamente respuestas, fragmentos y citas generados a partir de los documentos sobre los cuales posee permisos explícitos de lectura en el directorio corporativo.'
      },
      {
        id: 'b',
        text: 'Confiar en que los ingenieros prometan por escrito no escribir términos financieros en el cuadro de búsqueda.',
        isCorrect: false,
        distractorRationale: 'Distractor de control administrativo ingenuo. La seguridad basada en promesas de buena fe viola todas las directrices de ciberseguridad y auditoría empresarial.'
      },
      {
        id: 'c',
        text: 'Eliminar todos los contratos confidenciales de la base de datos de la empresa para que nadie los lea.',
        isCorrect: false,
        distractorRationale: 'Distractor destructivo. Destruir los activos corporativos legítimos imposibilita el trabajo del área legal y financiera.'
      },
      {
        id: 'd',
        text: 'Cifrar la pantalla del monitor del empleado con un filtro de privacidad plástico polarizado.',
        isCorrect: false,
        distractorRationale: 'Distractor de seguridad física periférica. Un filtro de plástico en la pantalla no impide que el motor de búsqueda en la nube devuelva información no autorizada en el payload de la API.'
      }
    ],
    overallExplanation: 'El soporte de Access Control Lists (ACLs) en Vertex AI Search es crítico para implementaciones enterprise: asegura que el motor de RAG no filtre información sensible a empleados sin privilegios. El filtrado de permisos ocurre tanto en la fase de recuperación de fragmentos como en la generación de la respuesta sintetizada.',
    examHeuristic: 'Privacidad documental por usuario en buscador empresarial ➔ Vertex AI Search con ACLs por usuario/grupo.'
  },
  {
    id: 'q-mod-06-09',
    moduleId: 'mod-06-plataformas-vertex-search-agentes',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'advanced',
    prompt: 'Un equipo de evaluación de calidad en Google Cloud audita el rendimiento de un motor de búsqueda y generación implementado con Vertex AI Search. Necesitan medir específicamente dos aspectos: primero, si los fragmentos de texto devueltos por el motor de búsqueda son pertinentes a la consulta del usuario; segundo, si la respuesta textual final generada por Gemini está estrictamente respaldada por dichos fragmentos sin contener datos inventados. ¿Qué par de métricas estándar de evaluación de RAG refleja estas dos dimensiones?',
    options: [
      {
        id: 'a',
        text: 'Relevancia del contexto (Context Relevance / NDCG) para la recuperación, y Tasa de fundamentación (Groundedness / Faithfulness) para la generación.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Context Relevance mide la pertinencia de los fragmentos recuperados respecto a la consulta original (eliminando ruido irrelevante), mientras que Groundedness / Faithfulness evalúa cuantitativamente que cada afirmación de la respuesta generada esté sustentada en el contexto provisto sin alucinaciones.'
      },
      {
        id: 'b',
        text: 'Voltaje eléctrico de la fuente de poder y revoluciones por minuto del disco rígido.',
        isCorrect: false,
        distractorRationale: 'Distractor de métricas de hardware electromecánico sin relación con la precisión semántica ni la fidelidad de la IA.'
      },
      {
        id: 'c',
        text: 'Número de clics del ratón por segundo ejecutados por el usuario final.',
        isCorrect: false,
        distractorRationale: 'Distractor de telemetría de interfaz de usuario. No mide la fidelidad del texto generado ni la relevancia de los documentos recuperados.'
      },
      {
        id: 'd',
        text: 'Cantidad de líneas de código escritas en lenguaje HTML en la página de inicio.',
        isCorrect: false,
        distractorRationale: 'Distractor de desarrollo web irrelevante para la evaluación de RAG.'
      }
    ],
    overallExplanation: 'La evaluación formal de sistemas RAG (como Vertex AI Search) se bifurca en: 1. Calidad de la Recuperación (Retrieval Quality): evaluada con Context Relevance, Mean Reciprocal Rank (MRR) y NDCG; y 2. Calidad de la Generación (Generation Quality): evaluada con Groundedness (ausencia de afirmaciones inventadas) y Answer Relevance (adecuación a la intención del usuario).',
    examHeuristic: 'Evaluación de RAG: Relevancia del Contexto (Recuperación precisa) + Groundedness/Fidelidad (Cero alucinaciones en la generación).'
  }
];
