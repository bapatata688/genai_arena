export const MODULES_METADATA = [
  {
    id: "mod-01-fundamentos-ia-genai",
    domainId: "domain-1",
    order: 1,
    file: "mod01.md",
    title: "Taxonomía de la Inteligencia Artificial, Aprendizaje Automático y Modelos Fundacionales",
    shortTitle: "Taxonomía IA & Modelos Fundacionales",
    description: "Desglose taxonómico formal desde la Inteligencia Artificial tradicional hasta el Deep Learning y la IA Generativa. Análisis matemático y conceptual de los Modelos Fundacionales (Foundation Models), Grandes Modelos de Lenguaje (LLMs), Modelos Multimodales Nativos (texto, imagen, audio, video) y Modelos de Difusión. Comprensión del funcionamiento interno de tokens, vocabulario, probabilidades de transición y ventanas de contexto masivas.",
    learningObjectives: [
      "Diferenciar con precisión formal y de negocio entre IA tradicional, Machine Learning predictivo, Deep Learning y arquitecturas generativas basadas en Transformers.",
      "Dominar la mecánica de tokenización, cálculo de probabilidad autoregresiva y la importancia operativa de las ventanas de contexto extensas (de 32k a 2M+ tokens en Gemini).",
      "Distinguir las capacidades y trade-offs entre modelos unimodales (LLMs puros), modelos de difusión (generación de imagen/video) y modelos multimodales nativos."
    ]
  },
  {
    id: "mod-02-ciclo-vida-arquitectura-4-capas",
    domainId: "domain-1",
    order: 2,
    file: "mod02.md",
    title: "Ciclo de Vida de ML/GenAI y la Arquitectura Tecnológica en 4 Capas",
    shortTitle: "Ciclo de Vida ML & Arquitectura 4 Capas",
    description: "Exploración de las fases del ciclo de vida integral de Machine Learning aplicado a Gen AI: ingesta de datos, preparación y limpieza, pre-entrenamiento, ajuste fino (fine-tuning), despliegue de inferencia y gobernanza continua. Descomposición del stack tecnológico de IA Generativa en las 4 capas de Google Cloud: Capa 1 (Infraestructura de Aceleración de Cómputo), Capa 2 (Plataformas y MLOps), Capa 3 (Modelos Fundacionales y Ecosistema) y Capa 4 (Aplicaciones y Agentes de Solución).",
    learningObjectives: [
      "Mapear cada etapa del ciclo de vida del ML con los servicios y herramientas correspondientes dentro de Google Cloud.",
      "Analizar el modelo mental de las 4 capas de IA Generativa y posicionar con exactitud cualquier componente o iniciativa tecnológica dentro de dicha arquitectura.",
      "Comprender los diferentes paradigmas de aprendizaje: Supervisado, No Supervisado y Aprendizaje por Refuerzo con Retroalimentación Humana (RLHF)."
    ]
  },
  {
    id: "mod-03-datos-embeddings-seleccion-modelos",
    domainId: "domain-1",
    order: 3,
    file: "mod03.md",
    title: "Tipología de Datos, Embeddings y Criterios de Selección de Modelos",
    shortTitle: "Datos, Embeddings & Selección de Modelos",
    description: "Análisis del papel de los datos en la era de la IA Generativa: datos estructurados versus datos no estructurados. Fundamentos matemáticos de los espacios vectoriales de alta dimensión (embeddings) y búsqueda de similitud semántica. Criterios rigurosos de selección de modelos basados en un balance multidimensional: modalidad requerida, tamaño de ventana de contexto, latencia esperada, costo por millón de tokens, requisitos de soberanía de datos y capacidades de personalización.",
    learningObjectives: [
      "Evaluar el impacto de la calidad, accesibilidad y gobernanza de datos en el rendimiento de los modelos generativos.",
      "Comprender cómo los modelos de embedding transforman datos no estructurados en representaciones vectoriales densas para tareas de recuperación semántica.",
      "Aplicar una matriz de decisión arquitectónica rigurosa para seleccionar entre modelos ultra-ligeros (Flash/Nano) vs modelos de razonamiento profundo (Pro/Ultra) optimizando el TCO y el SLA del negocio."
    ]
  },
  {
    id: "mod-04-infraestructura-tpu-gpu-hypercomputer",
    domainId: "domain-2",
    order: 4,
    file: "mod04.md",
    title: "Infraestructura de Cómputo de IA: TPUs, GPUs y el Google AI Hypercomputer",
    shortTitle: "Infraestructura TPU/GPU & AI Hypercomputer",
    description: "Examen de la infraestructura de hardware y redes de clase mundial diseñada por Google Cloud para cargas de trabajo de IA. Comparativa técnica y económica entre las Unidades de Procesamiento Tensorial de Google (TPU v4, TPU v5e, TPU v5p) y las Unidades de Procesamiento Gráfico de NVIDIA (A100, H100). Fundamentos de la arquitectura Google AI Hypercomputer: integración holística entre silicio acelerador, redes de baja latencia (Titanium, Jupiter), compilador optimizado XLA/JAX y modelos de consumo elástico (Dynamic Workload Scheduler).",
    learningObjectives: [
      "Identificar las fortalezas relativas de las arquitecturas TPU frente a GPU y determinar el escenario óptimo para cada una (ej. TPU v5e para inferencia económica y fine-tuning medio vs TPU v5p / H100 para entrenamiento masivo).",
      "Comprender los componentes y la propuesta de valor del AI Hypercomputer para maximizar el rendimiento por dólar y la utilización efectiva de hardware.",
      "Distinguir las consideraciones de escala, topología de interconexión y resiliencia en clústeres masivos de entrenamiento de IA en Google Cloud."
    ]
  },
  {
    id: "mod-05-productividad-workspace-notebooklm",
    domainId: "domain-2",
    order: 5,
    file: "mod05.md",
    title: "Productividad Empresarial y Soluciones Preconstruidas: Gemini Workspace, NotebookLM y Gemini Advanced",
    shortTitle: "Productividad Workspace & NotebookLM",
    description: "Exploración exhaustiva de las soluciones de productividad potenciadas por IA que no requieren desarrollo de software a medida. Integración de Gemini para Google Workspace a lo largo de la suite ofimática: side panels en Gmail, Docs, Sheets, Slides y Meet; automatización de borradores, extracción de datos tabulares, generación de presentaciones y resúmenes de reuniones en tiempo real. Uso corporativo de NotebookLM como entorno de investigación fundamentado en fuentes documentales privadas con generación de resúmenes estructurados y Audio Overviews. Capacidades de Gemini Advanced y creación de asistentes personalizados (\"Gems\").",
    learningObjectives: [
      "Reconocer los casos de uso donde las herramientas SaaS preconstruidas de Google resuelven la necesidad de negocio sin incurrir en costos de desarrollo de software ni infraestructura MLOps.",
      "Conocer las características de privacidad y aislamiento de datos de Gemini para Google Workspace (los datos corporativos nunca salen del perímetro de Workspace ni entrenan modelos públicos).",
      "Evaluar el valor de NotebookLM frente a herramientas de búsqueda convencionales para análisis de documentos técnicos, contratos y literatura de investigación."
    ]
  },
  {
    id: "mod-06-plataformas-vertex-search-agentes",
    domainId: "domain-2",
    order: 6,
    file: "mod06.md",
    title: "Plataformas de Desarrollo, Búsqueda Empresarial y Agentes de IA: Vertex AI, Model Garden y Search & Conversation",
    shortTitle: "Vertex AI, Search & Agentes Autónomos",
    description: "Inmersión en el ecosistema para desarrolladores y arquitectos de Google Cloud. Diferenciación operativa y de gobernanza entre Google AI Studio (entorno sandbox ágil para prototipado rápido) y Vertex AI (plataforma enterprise con IAM, VPC-SC, CMEK y SLAs). Exploración de Vertex AI Model Garden: modelos propietarios de Google, pesos abiertos (Gemma, Llama, Mistral) y modelos de terceros (Anthropic Claude). Arquitectura de Vertex AI Search & Conversation para búsqueda corporativa con citas y agentes conversacionales. Introducción a Vertex AI Reasoning Engine y frameworks agénticos para orquestación de herramientas autónomas.",
    learningObjectives: [
      "Decidir cuándo utilizar Google AI Studio para validación de concepto y cómo realizar la transición ordenada hacia Vertex AI en producción empresarial.",
      "Navegar y aprovechar Model Garden para seleccionar, probar y desplegar modelos fundacionales según requisitos de licencia, costo y capacidades multimodales.",
      "Diseñar arquitecturas de agentes autónomos y asistentes de atención al cliente utilizando Vertex AI Search & Conversation y Dialogflow CX, conectando LLMs con APIs empresariales mediante llamadas a funciones (function calling)."
    ]
  },
  {
    id: "mod-07-prompt-engineering-parametros-control",
    domainId: "domain-3",
    order: 7,
    file: "mod07.md",
    title: "Ingeniería de Prompts, Estrategias de Inferencia y Parámetros de Control",
    shortTitle: "Prompt Engineering & Parámetros de Inferencia",
    description: "Técnicas avanzadas de formulación de directivas textuales para maximizar la precisión, consistencia y formato del output sin modificar los pesos del modelo. Análisis de patrones fundamentales: Zero-shot, One-shot, Few-shot prompting y System Instructions. Técnicas de razonamiento guiado: Chain-of-Thought (CoT), Step-Back prompting, Least-to-Most y frameworks interactivos ReAct (Reason + Act). Calibración matemática y efecto operativo de los parámetros de muestreo: Temperatura (determinismo vs creatividad), Top-P (muestreo de núcleo), Top-K (vocabulario truncado) y penalizaciones por frecuencia/presencia.",
    learningObjectives: [
      "Diseñar prompts de nivel empresarial utilizando instrucciones de sistema claras, delimitadores sintácticos y ejemplos representativos (few-shot) para fijar esquemas estructurados (JSON/XML).",
      "Aplicar Chain-of-Thought y técnicas de razonamiento explícito para problemas lógicos complejos, auditorías financieras y flujos de decisión secuenciales.",
      "Calibrar con precisión los hiperparámetros de inferencia (Temperature, Top-P, Top-K) según el caso de uso (cero temperatura para extracción legal y factual; alta temperatura para ideación creativa y marketing)."
    ]
  },
  {
    id: "mod-08-grounding-rag-fine-tuning",
    domainId: "domain-3",
    order: 8,
    file: "mod08.md",
    title: "Mitigación de Limitaciones, Grounding (RAG) y Estrategias de Personalización (Fine-Tuning)",
    shortTitle: "Grounding, RAG & Fine-Tuning de Modelos",
    description: "Diagnóstico y superación de las limitaciones inherentes a los modelos fundacionales: alucinaciones, cortes de conocimiento temporal (knowledge cutoffs), fuga de contexto y sesgos estocásticos. Matriz de decisión arquitectónica definitiva entre: Prompting, Grounding con Google Search, Grounding con datos privados de la empresa (Retrieval-Augmented Generation / RAG en Vertex AI Search o Vector Search) y Ajuste Fino de Modelos (Fine-Tuning supervisado, Parameter-Efficient Fine-Tuning / PEFT con LoRA, y RLHF). Monitoreo continuo de calidad, evaluación con Vertex AI Model Evaluation y flujos de supervisión humana (Human-in-the-Loop).",
    learningObjectives: [
      "Identificar la causa raíz de una alucinación o respuesta incorrecta y aplicar la intervención arquitectónica adecuada con el menor costo y complejidad técnica posible.",
      "Explicar cómo el Grounding conecta el razonamiento del LLM con fuentes de verdad verificables, habilitando respuestas con citas a nivel de párrafo y verificación de hechos en tiempo real.",
      "Dominar los criterios de decisión para justificar Fine-Tuning (cambio de estilo, vocabulario muy especializado, formato sintáctico ultra-estricto) frente a RAG (datos dinámicos que cambian con frecuencia y necesidad de auditoría de fuentes)."
    ]
  },
  {
    id: "mod-09-estrategia-casos-uso-roi",
    domainId: "domain-4",
    order: 9,
    file: "mod09.md",
    title: "Estrategia Empresarial, Priorización de Casos de Uso y Medición de ROI",
    shortTitle: "Estrategia de Adopción, Casos de Uso & ROI",
    description: "Metodología para liderar la transformación digital con Gen AI en la empresa. Clasificación funcional de casos de uso mediante la taxonomía canónica de Google: Generación/Creación, Resumen/Síntesis, Descubrimiento/Búsqueda y Automatización de Procesos. Matriz de priorización de iniciativas basada en dos ejes: Impacto en el Negocio vs Viabilidad Técnica y Riesgo Organizacional. Definición de la ecuación de Retorno de Inversión (ROI): medición de beneficios cuantitativos duros y beneficios estratégicos cualitativos. Fases de adopción: desde el descubrimiento y pruebas de concepto (PoC) hasta el Producto Mínimo Viable (MVP) y el escalado productivo.",
    learningObjectives: [
      "Clasificar cualquier requerimiento corporativo dentro de los 4 pilares de casos de uso de Gen AI (Crear, Resumir, Descubrir, Automatizar).",
      "Construir un caso de negocio riguroso y priorizar la cartera de proyectos de IA evitando el \"PoC Hell\" y enfocando recursos en victorias tempranas (quick wins).",
      "Formular métricas clave de rendimiento (KPIs) y modelos de cálculo de ROI y TCO para proyectos de IA en la nube."
    ]
  },
  {
    id: "mod-10-gobernanza-saif-ia-responsable-ip",
    domainId: "domain-4",
    order: 10,
    file: "mod10.md",
    title: "Gobernanza, IA Responsable, Marco SAIF y Protección Legal de Propiedad Intelectual",
    shortTitle: "Gobernanza, Marco SAIF & IA Responsable",
    description: "Fundamentos éticos, de seguridad y cumplimiento legal para el despliegue de IA a escala empresarial. Los 7 Principios de IA Responsable de Google y las 4 aplicaciones que Google no desarrollará (armas, vigilancia contraria a derechos humanos, daño injustificado). Arquitectura del Marco de IA Segura de Google (SAIF - Secure AI Framework): mitigación de amenazas emergentes (prompt injection directo e indirecto, jailbreaks, data poisoning, exfiltración de datos). Políticas de soberanía de datos en Google Cloud: Zero Data Retention, aislamiento de tenant y la garantía de que los datos de clientes nunca entrenan modelos base. Análisis de la política de indemnización de propiedad intelectual (IP) de Google en dos niveles: indemnización por datos de entrenamiento e indemnización por salida generada en servicios calificados. Estrategias de gestión del cambio cultural y capacitación de la fuerza laboral.",
    learningObjectives: [
      "Evaluar iniciativas de IA contra los Principios de IA Responsable de Google para prevenir sesgos perjudiciales, discriminación y fallas de seguridad.",
      "Aplicar los 6 pilares de SAIF para blindar arquitecturas de Gen AI contra vulnerabilidades y ciberataques específicos de modelos de lenguaje.",
      "Comprender los alcances, condiciones y excepciones de la política de indemnización por derechos de autor de Google para brindar certidumbre legal a los tomadores de decisiones."
    ]
  }
];
