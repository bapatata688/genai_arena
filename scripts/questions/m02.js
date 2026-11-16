export const m02Questions = [
  {
    id: 'q-mod-02-01',
    moduleId: 'mod-02-ciclo-vida-arquitectura-4-capas',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'fundamental',
    prompt: 'Google Cloud estructura su oferta tecnológica de Inteligencia Artificial Generativa en un marco conceptual de cuatro capas interconectadas. Un arquitecto empresarial necesita clasificar adecuadamente los siguientes productos: Cloud TPU v5e, Gemini 1.5 Pro, Vertex AI Search & Conversation, y Gemini for Google Workspace. ¿Cuál es la asignación correcta de cada producto en la arquitectura de 4 capas de Google Cloud?',
    options: [
      {
        id: 'a',
        text: 'Cloud TPU v5e en Capa 1 (Infraestructura); Gemini 1.5 Pro en Capa 2 (Modelos Fundacionales); Vertex AI Search & Conversation en Capa 3 (Plataformas y Herramientas); Gemini for Google Workspace en Capa 4 (Soluciones y Aplicaciones).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Sigue con total precisión la jerarquía oficial de 4 capas: 1. Infraestructura de cómputo, 2. Modelos fundacionales, 3. Plataformas y herramientas de desarrollo empresarial, y 4. Aplicaciones y soluciones orientadas al usuario final.'
      },
      {
        id: 'b',
        text: 'Cloud TPU v5e en Capa 4 (Aplicaciones); Gemini 1.5 Pro en Capa 3 (Herramientas); Vertex AI Search & Conversation en Capa 2 (Modelos); Gemini for Google Workspace en Capa 1 (Infraestructura).',
        isCorrect: false,
        distractorRationale: 'Distractor invertido. Coloca la infraestructura de hardware como aplicación de usuario final y las aplicaciones SaaS como infraestructura física.'
      },
      {
        id: 'c',
        text: 'Cloud TPU v5e y Gemini 1.5 Pro en Capa 1; Vertex AI Search & Conversation y Gemini for Google Workspace en Capa 2, dejando las capas 3 y 4 desocupadas.',
        isCorrect: false,
        distractorRationale: 'Distractor simplista erróneo. Google Cloud define cuatro capas explícitas y no agrupa hardware y modelos de lenguaje en el mismo nivel de abstracción.'
      },
      {
        id: 'd',
        text: 'Gemini for Google Workspace en Capa 1 (Infraestructura) porque corre directamente en los servidores de correo de la organización.',
        isCorrect: false,
        distractorRationale: 'Distractor conceptual falso. Workspace es un software como servicio (SaaS) en la capa de aplicaciones de usuario final (Capa 4), no infraestructura de bajo nivel.'
      }
    ],
    overallExplanation: 'La arquitectura en 4 capas de Google Cloud GenAI comprende: Capa 1 - Infraestructura (TPUs, GPUs, AI Hypercomputer); Capa 2 - Modelos Fundacionales (Gemini, Imagen, Codey, modelos abiertos); Capa 3 - Plataformas y Herramientas (Vertex AI Studio, Agent Builder, Search & Conversation); Capa 4 - Soluciones y Aplicaciones (Gemini for Workspace, NotebookLM, Gemini Code Assist).',
    examHeuristic: '4 Capas GCP: 1. Infraestructura ➔ 2. Modelos Fundacionales ➔ 3. Plataformas/Herramientas ➔ 4. Soluciones de Usuario.'
  },
  {
    id: 'q-mod-02-02',
    moduleId: 'mod-02-ciclo-vida-arquitectura-4-capas',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Un equipo de desarrollo de software utilizó Google AI Studio para crear rápidamente un prototipo de clasificador de tickets de soporte técnico mediante una API Key. Tras validar el éxito del caso de uso, el comité de arquitectura exige migrar el proyecto a Vertex AI antes de su despliegue en producción. ¿Cuál es el motivo técnico y de gobernanza fundamental para esta migración obligatoria?',
    options: [
      {
        id: 'a',
        text: 'Google AI Studio cobra tres veces más caro por millón de tokens que Vertex AI para los mismos modelos.',
        isCorrect: false,
        distractorRationale: 'Distractor financiero falso. Las tarifas de consumo por token de los modelos Gemini son consistentes y transparentes; la diferencia entre ambos entornos radica en la gobernanza y seguridad empresarial, no en márgenes de sobreprecio abusivos.'
      },
      {
        id: 'b',
        text: 'Vertex AI ofrece controles de seguridad empresarial como autenticación IAM con cuentas de servicio, soporte de VPC Service Controls, cifrado con claves administradas por el cliente (CMEK) y cumplimiento de acuerdos de nivel de servicio (SLA).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Google AI Studio es un entorno ágil de prototipado para desarrolladores con API Keys simples, mientras que Vertex AI es la plataforma cloud enterprise con gobernanza estricta, aislamiento de red, IAM corporativo y trazabilidad requerida en producción.'
      },
      {
        id: 'c',
        text: 'Los modelos Gemini 1.5 Pro y Flash no están disponibles en Google AI Studio y solo pueden ejecutarse en Vertex AI.',
        isCorrect: false,
        distractorRationale: 'Distractor fáctico incorrecto. Toda la familia de modelos Gemini se publica de forma inmediata tanto en Google AI Studio como en Vertex AI.'
      },
      {
        id: 'd',
        text: 'Google AI Studio requiere instalar servidores físicos on-premise en el centro de datos del cliente.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. Google AI Studio es una interfaz web basada en navegador 100% gestionada en la nube por Google.'
      }
    ],
    overallExplanation: 'Google AI Studio es el punto de partida más rápido para prototipar y experimentar con Gemini mediante claves de API directas. Sin embargo, para cargas de producción empresarial, las organizaciones deben desplegar a través de Vertex AI para beneficiarse de la infraestructura de Google Cloud: roles de IAM granulares, VPC Service Controls, claves CMEK, auditoría con Cloud Logging y SLAs contractuales.',
    examHeuristic: 'Prototipado rápido con API Key ➔ Google AI Studio. Producción con IAM, VPC-SC, CMEK y SLA ➔ Vertex AI.'
  },
  {
    id: 'q-mod-02-03',
    moduleId: 'mod-02-ciclo-vida-arquitectura-4-capas',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Al implementar un proyecto de Inteligencia Artificial Generativa en una corporación multinacional, el equipo de entrega debe seguir una metodología ordenada para garantizar el retorno de inversión y mitigar riesgos. ¿Cuál es la secuencia lógica de fases del ciclo de vida de desarrollo de soluciones GenAI recomendado por Google Cloud?',
    options: [
      {
        id: 'a',
        text: '1. Comprar aceleradores TPU v5p ➔ 2. Preentrenar un modelo fundacional ➔ 3. Diseñar la interfaz de usuario ➔ 4. Buscar un caso de uso de negocio.',
        isCorrect: false,
        distractorRationale: 'Distractor de antipatrón severo. Invertir en cómputo antes de identificar un caso de negocio con viabilidad comprobada es la principal causa de despilfarro financiero en proyectos de IA.'
      },
      {
        id: 'b',
        text: '1. Descubrimiento y evaluación de viabilidad del caso de uso ➔ 2. Prototipado y experimentación con prompts ➔ 3. Selección y adaptación del modelo (Prompting/RAG/Tuning) ➔ 4. Evaluación rigurosa y Red Teaming ➔ 5. Despliegue, monitoreo y gobernanza en producción.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Representa el ciclo de vida canónico de Google Cloud: iniciar por el valor de negocio, prototipar rápido, adaptar el modelo con el menor esfuerzo requerido, evaluar seguridad/precisión sistemáticamente y operar en producción con gobernanza continua.'
      },
      {
        id: 'c',
        text: '1. Realizar Fine-Tuning con todos los datos de la empresa ➔ 2. Pasar a producción inmediatamente ➔ 3. Evaluar si el modelo alucina después del lanzamiento.',
        isCorrect: false,
        distractorRationale: 'Distractor temerario. Desplegar a producción sin evaluación previa ni mitigación de riesgos de seguridad es una violación crítica de gobernanza de software.'
      },
      {
        id: 'd',
        text: '1. Escribir código en C++ para microcontroladores ➔ 2. Contratar lingüistas para reescribir el diccionario ➔ 3. Configurar BigQuery.',
        isCorrect: false,
        distractorRationale: 'Distractor desconectado. No guarda ninguna relación con el ciclo de vida metodológico de adopción de IA Generativa en Google Cloud.'
      }
    ],
    overallExplanation: 'El ciclo de vida de Google Cloud para GenAI enfatiza una progresión disciplinada: comenzar con la definición clara del problema y viabilidad, validar hipótesis en prototipado rápido con prompt engineering, aplicar técnicas de menor a mayor complejidad (Prompt ➔ RAG ➔ Tuning), evaluar rigurosamente con métricas de seguridad y fidelidad fáctica, y finalmente desplegar con observabilidad y gobernanza continua.',
    examHeuristic: 'Ciclo de vida GenAI: Viabilidad ➔ Prototipo ➔ Adaptación (Prompt/RAG/Tune) ➔ Evaluación/Seguridad ➔ Producción gobernada.'
  },
  {
    id: 'q-mod-02-04',
    moduleId: 'mod-02-ciclo-vida-arquitectura-4-capas',
    domainId: 'domain-1',
    type: 'multi',
    difficulty: 'intermediate',
    prompt: 'Una empresa aseguradora desea incorporar capacidades de IA generativa tanto para mejorar la productividad diaria de sus empleados administrativos como para que los desarrolladores construyan un buscador semántico de pólizas internas. ¿Cuáles DOS afirmaciones distinguen correctamente las ofertas de la Capa 3 (Plataformas y Herramientas) frente a la Capa 4 (Soluciones y Aplicaciones)? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Gemini for Google Workspace y NotebookLM pertenecen a la Capa 4 porque son aplicaciones de software listas para usar orientadas directamente al usuario final sin necesidad de escribir código.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. La Capa 4 engloba soluciones SaaS de productividad integral que los usuarios finales consumen directamente desde sus navegadores y clientes de correo.'
      },
      {
        id: 'b',
        text: 'Vertex AI Search & Conversation y Vertex AI Model Garden pertenecen a la Capa 3 porque proporcionan servicios de plataforma y APIs para que ingenieros de software construyan soluciones personalizadas.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. La Capa 3 está diseñada específicamente para desarrolladores y arquitectos que necesitan construir, personalizar, indexar y orquestar componentes de IA sobre sus propias aplicaciones.'
      },
      {
        id: 'c',
        text: 'La Capa 3 consiste exclusivamente en hardware físico como servidores de rack y cables de fibra óptica de la red Jupiter.',
        isCorrect: false,
        distractorRationale: 'Distractor de capa. Los componentes físicos de silicio y centros de datos pertenecen a la Capa 1 (Infraestructura), no a la Capa 3 de plataformas y herramientas.'
      },
      {
        id: 'd',
        text: 'Gemini 1.5 Pro pertenece a la Capa 4 porque puede ser utilizado por cualquier usuario sin una cuenta de Google Cloud.',
        isCorrect: false,
        distractorRationale: 'Distractor de producto. Gemini 1.5 Pro es un modelo fundacional que se ubica en la Capa 2 (Modelos Fundacionales), el cual sirve como motor base para las capas superiores.'
      },
      {
        id: 'e',
        text: 'Las aplicaciones de la Capa 4 requieren que la empresa reentrene diariamente un clúster de Cloud TPUs para funcionar.',
        isCorrect: false,
        distractorRationale: 'Distractor técnico absurdo. Las soluciones de la Capa 4 son servicios completamente gestionados por Google Cloud que no requieren ningún entrenamiento ni gestión de infraestructura por parte del cliente.'
      }
    ],
    overallExplanation: 'La Capa 3 (Plataformas y Herramientas) provee servicios de desarrollo como Vertex AI Studio, Model Garden y Search & Conversation para crear aplicaciones corporativas a medida. La Capa 4 (Soluciones y Aplicaciones) ofrece herramientas preempaquetadas listas para el consumo de usuarios finales, como Gemini for Workspace y NotebookLM.',
    examHeuristic: 'Capa 3 = Desarrollar sobre APIs/Plataformas (Vertex AI). Capa 4 = Consumo directo por usuarios finales (Workspace, NotebookLM).'
  },
  {
    id: 'q-mod-02-05',
    moduleId: 'mod-02-ciclo-vida-arquitectura-4-capas',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'advanced',
    prompt: 'Antes de lanzar un asistente conversacional de atención al cliente que proporciona asesoramiento sobre productos financieros, el equipo de seguridad de Google Cloud realiza una sesión de "Red Teaming" (equipo rojo). ¿Cuál es el propósito primordial de esta práctica en la fase de evaluación del ciclo de vida?',
    options: [
      {
        id: 'a',
        text: 'Optimizar el código fuente en JavaScript para que la interfaz cargue más rápido en dispositivos móviles.',
        isCorrect: false,
        distractorRationale: 'Distractor de desarrollo frontend. El Red Teaming es un proceso de auditoría y ciberseguridad centrado en vulnerabilidades de IA, no en optimización de rendimiento de renderizado web.'
      },
      {
        id: 'b',
        text: 'Simular ataques adversarios intencionados (como inyecciones de prompts, jailbreaking y extracción de datos confidenciales) para identificar brechas de seguridad y comportamientos no deseados del modelo antes de su exposición a clientes reales.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. El Red Teaming evalúa la resiliencia del sistema de IA frente a intentos maliciosos de eludir directrices de seguridad, provocar alucinaciones o revelar secretos comerciales y datos protegidos.'
      },
      {
        id: 'c',
        text: 'Reemplazar los procesadores TPU por GPUs para verificar la compatibilidad de controladores.',
        isCorrect: false,
        distractorRationale: 'Distractor de infraestructura. El Red Teaming evalúa la seguridad lógica y semántica del comportamiento del modelo, no la compatibilidad de controladores de silicio.'
      },
      {
        id: 'd',
        text: 'Verificar que la factura mensual de Google Cloud no supere el umbral del presupuesto asignado.',
        isCorrect: false,
        distractorRationale: 'Distractor de FinOps. La gestión de presupuestos y alertas de facturación corresponde a Cloud Billing, no al equipo de evaluación de seguridad Red Teaming.'
      }
    ],
    overallExplanation: 'El Red Teaming en IA Generativa consiste en emular la perspectiva de un atacante para descubrir fallas éticas, de alineación o de seguridad (jailbreaking, prompt injection, filtración de datos sensibles). Es un paso no negociable en el ciclo de vida de Google Cloud antes de desplegar aplicaciones críticas a producción.',
    examHeuristic: 'Red Teaming = Simulación de ataques adversarios (Jailbreaks/Inyecciones) para validar seguridad antes de producción.'
  },
  {
    id: 'q-mod-02-06',
    moduleId: 'mod-02-ciclo-vida-arquitectura-4-capas',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Un equipo de ingeniería de datos en una empresa de logística desea estructurar sus flujos de trabajo de IA generativa con prácticas sólidas de MLOps. Diseñan y perfeccionan prompts complejos en Vertex AI Studio que luego deben ser desplegados en pipelines automatizados de CI/CD. ¿Qué componente de Vertex AI permite registrar, versionar y gobernar estos artefactos y modelos para mantener trazabilidad completa?',
    options: [
      {
        id: 'a',
        text: 'Vertex AI Model Registry y Prompt Management.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Vertex AI Model Registry centraliza el ciclo de vida, versionado y gobernanza de modelos, mientras que las herramientas de gestión de prompts de Vertex AI permiten guardar, comparar y versionar plantillas de prompts de manera reproducible.'
      },
      {
        id: 'b',
        text: 'Cloud DNS con registros de tipo TXT para almacenar las instrucciones de los prompts.',
        isCorrect: false,
        distractorRationale: 'Distractor arquitectónico absurdo. Cloud DNS es un sistema de resolución de nombres de dominio de red y nunca debe emplearse como almacén de versiones de software o prompts.'
      },
      {
        id: 'c',
        text: 'Cloud Memorystore for Redis configurado en modo volátil sin persistencia en disco.',
        isCorrect: false,
        distractorRationale: 'Distractor de almacenamiento volátil. Memorystore es una caché en memoria de alta velocidad; si se reinicia la instancia se perderían todas las versiones de los modelos y prompts.'
      },
      {
        id: 'd',
        text: 'Google Sheets compartido públicamente con permisos de edición para cualquier persona con el enlace.',
        isCorrect: false,
        distractorRationale: 'Distractor de grave vulnerabilidad de seguridad. Gestionar versiones de código y prompts en hojas de cálculo públicas viola todos los estándares de gobernanza y protección de datos corporativos.'
      }
    ],
    overallExplanation: 'Vertex AI Model Registry junto con las capacidades de gestión de prompts de Vertex AI brindan trazabilidad de extremo a extremo: permiten versionar artefactos, asociar evaluaciones métricas a cada versión, asignar etiquetas de estado (desarrollo, staging, producción) e integrarse con pipelines automatizados.',
    examHeuristic: 'Versionado, gobernanza y despliegue formal de artefactos GenAI ➔ Vertex AI Model Registry.'
  },
  {
    id: 'q-mod-02-07',
    moduleId: 'mod-02-ciclo-vida-arquitectura-4-capas',
    domainId: 'domain-1',
    type: 'multi',
    difficulty: 'advanced',
    prompt: 'Una entidad gubernamental que maneja registros de identidad de ciudadanos necesita consumir las APIs de Gemini en Vertex AI. La reglamentación exige que ninguna comunicación viaje por Internet pública y que los datos sensibles no puedan ser filtrados a proyectos externos no autorizados. ¿Cuáles DOS mecanismos de red y seguridad de Google Cloud deben implementarse para cumplir con este mandato? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'VPC Service Controls (VPC-SC) para establecer un perímetro de seguridad estricto que evite la exfiltración de datos sensibles fuera del proyecto autorizado.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. VPC Service Controls aísla los recursos y APIs de Google Cloud dentro de un perímetro corporativo cifrado, bloqueando accesos no autorizados e intentos de exfiltración hacia el exterior.'
      },
      {
        id: 'b',
        text: 'Private Service Connect (PSC) o Google Cloud Private Google Access para permitir que las instancias internas accedan a las APIs de Vertex AI sin direcciones IP públicas.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Private Google Access y PSC posibilitan que las máquinas virtuales y contenedores en redes VPC se conecten a las APIs de Vertex AI utilizando exclusivamente rutas privadas internas de Google.'
      },
      {
        id: 'c',
        text: 'Publicar el token de autenticación de la cuenta de servicio en el código frontend de una página web pública.',
        isCorrect: false,
        distractorRationale: 'Distractor flagrante de filtración de credenciales. Revelar credenciales de cuentas de servicio en clientes frontend expone todo el proyecto a robo de datos inmediato.'
      },
      {
        id: 'd',
        text: 'Desactivar el protocolo TLS/SSL en todas las conexiones para mejorar la velocidad de transmisión de datos sensibles.',
        isCorrect: false,
        distractorRationale: 'Distractor de inseguridad severa. Desactivar el cifrado en tránsito violaría normativas gubernamentales y permitiría la intercepción no autorizada del tráfico.'
      },
      {
        id: 'e',
        text: 'Conectar las APIs de Vertex AI a través de un proxy no autenticado alojado en un servidor web gratuito.',
        isCorrect: false,
        distractorRationale: 'Distractor de alto riesgo. Enrutar datos confidenciales por proxies desconocidos sin cifrado ni autenticación constituye una fuga masiva de datos regulados.'
      }
    ],
    overallExplanation: 'Para entornos regulados en Google Cloud, la combinación estándar de oro es VPC Service Controls (que delimita el perímetro de seguridad contra exfiltración hacia otros tenants o internet) junto con Private Service Connect / Private Google Access (que elimina la necesidad de IPs públicas y mantiene el tráfico 100% dentro del backbone privado de Google).',
    examHeuristic: 'Seguridad estricta en Vertex AI: VPC Service Controls (Prevenir exfiltración) + Conectividad Privada (Cero IPs públicas).'
  },
  {
    id: 'q-mod-02-08',
    moduleId: 'mod-02-ciclo-vida-arquitectura-4-capas',
    domainId: 'domain-1',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'El CTO de una empresa de comercio minorista propone inmediatamente reentrenar y realizar un fine-tuning completo a un modelo fundacional para responder consultas de atención al cliente sobre políticas de devolución y garantías. El Arquitecto Principal de Google Cloud advierte que este enfoque contradice el principio de adaptación progresiva y mínima complejidad. ¿Cuál es el orden recomendado de técnicas de menor a mayor esfuerzo y coste que debe seguir el equipo?',
    options: [
      {
        id: 'a',
        text: '1. Preentrenamiento desde cero ➔ 2. Fine-Tuning supervisado ➔ 3. RAG ➔ 4. Prompt Engineering.',
        isCorrect: false,
        distractorRationale: 'Distractor totalmente inverso. Comenzar con la técnica más costosa y arriesgada (preentrenamiento de millones de dólares) es el mayor error de arquitectura en proyectos GenAI.'
      },
      {
        id: 'b',
        text: '1. Prompt Engineering (instrucciones claras y few-shot) ➔ 2. Grounding / RAG con Vertex AI Search ➔ 3. Fine-Tuning supervisado (PEFT/LoRA) si se requiere adaptar formato/estilo específico.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. La regla de oro arquitectónica de Google Cloud es agotar primero la optimización de prompts (cero coste de infraestructura), incorporar RAG para datos dinámicos/privados, y recurrir al Fine-Tuning únicamente cuando las opciones anteriores no satisfagan los requisitos de tono o formato especializado.'
      },
      {
        id: 'c',
        text: '1. Desactivar los filtros de seguridad de Vertex AI ➔ 2. Comprar licencias de software propietario on-premise.',
        isCorrect: false,
        distractorRationale: 'Distractor de seguridad erróneo. Desactivar la seguridad no forma parte de ninguna metodología de adaptación técnica y genera riesgos inaceptables.'
      },
      {
        id: 'd',
        text: '1. RAG obligatorio sin probar ningún prompt ➔ 2. Reescribir el kernel del sistema operativo Linux.',
        isCorrect: false,
        distractorRationale: 'Distractor desconectado. Probar prompts con el modelo base es siempre el paso cero antes de invertir en indexación y canalizaciones de datos RAG.'
      }
    ],
    overallExplanation: 'La escalera de personalización en Google Cloud GenAI establece un camino ordenado: 1. Prompt Engineering (optimizar directrices y ejemplos en el contexto), 2. RAG / Grounding (conectar conocimiento corporativo factual en tiempo real), 3. Fine-Tuning (adaptar comportamiento estilístico o léxico complejo), y finalmente 4. Preentrenamiento (solo para casos de uso hiper-especializados a nivel de investigación de vanguardia).',
    examHeuristic: 'Escalera de Personalización: Prompt Engineering ➔ Grounding / RAG ➔ Fine-Tuning (de menor a mayor esfuerzo/coste).'
  }
];
