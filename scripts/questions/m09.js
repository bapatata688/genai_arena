export const m09Questions = [
  {
    id: 'q-mod-09-01',
    moduleId: 'mod-09-estrategia-casos-uso-roi',
    domainId: 'domain-4',
    type: 'single',
    difficulty: 'fundamental',
    prompt: 'Google Cloud clasifica las oportunidades de transformación con IA Generativa en cuatro grandes arquetipos de casos de uso: Crear, Resumir, Descubrir y Automatizar. Una empresa aseguradora desea priorizar cuatro iniciativas: (1) Generar borradores de propuestas comerciales personalizadas; (2) Condensar expedientes de siniestros de 60 páginas en una ficha de 3 viñetas; (3) Encontrar precedentes legales relevantes en una base de datos de jurisprudencia; (4) Ejecutar la liquidación de pagos conectando con el sistema bancario. ¿Cuál es el mapeo correcto según la taxonomía oficial de Google Cloud?',
    options: [
      {
        id: 'a',
        text: '(1) Crear, (2) Resumir, (3) Descubrir, (4) Automatizar.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Se alinea de forma impecable con la taxonomía de Google Cloud: Crear (generación de contenido nuevo), Resumir (síntesis y extracción de puntos clave), Descubrir (búsqueda semántica y recuperación de conocimiento) y Automatizar (ejecución de flujos y transacciones con agentes).'
      },
      {
        id: 'b',
        text: '(1) Automatizar, (2) Crear, (3) Resumir, (4) Descubrir.',
        isCorrect: false,
        distractorRationale: 'Distractor desordenado. Asigna la generación de propuestas como automatización y la búsqueda como resumen, distorsionando la taxonomía de Google Cloud.'
      },
      {
        id: 'c',
        text: 'Todas las cuatro iniciativas pertenecen exclusivamente al arquetipo "Crear" porque intervienen computadoras.',
        isCorrect: false,
        distractorRationale: 'Distractor simplista erróneo. Google Cloud define distinciones operativas nítidas entre generar contenido, sintetizarlo, buscarlo y ejecutar acciones transaccionales.'
      },
      {
        id: 'd',
        text: '(1) Descubrir, (2) Descubrir, (3) Descubrir, (4) Descubrir.',
        isCorrect: false,
        distractorRationale: 'Distractor monótono que ignora la diversidad de arquetipos de negocio en la metodología de Google Cloud.'
      }
    ],
    overallExplanation: 'La taxonomía de 4 arquetipos de Google Cloud organiza la adopción estratégica de GenAI: 1. Crear (redacción, imágenes, código), 2. Resumir (minutas de reuniones, expedientes legales), 3. Descubrir (motores de búsqueda semántica, bases de conocimiento) y 4. Automatizar (agentes multi-paso y procesos de negocio de extremo a extremo).',
    examHeuristic: '4 Arquetipos GenAI de Google Cloud: Crear (generar) ➔ Resumir (sintetizar) ➔ Descubrir (buscar) ➔ Automatizar (actuar).'
  },
  {
    id: 'q-mod-09-02',
    moduleId: 'mod-09-estrategia-casos-uso-roi',
    domainId: 'domain-4',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'El Comité de Transformación Digital de un banco multinacional evalúa una lista de 25 ideas de IA generativa propuestas por distintas divisiones. Para optimizar el capital y asegurar victorias tempranas que generen confianza en la organización, el Arquitecto Principal recomienda utilizar la Matriz de Priorización de Casos de Uso (Impacto en Negocio vs Complejidad de Implementación). ¿Qué tipo de iniciativas deben priorizarse como "Victorias Rápidas" (Quick Wins) en la primera fase del programa?',
    options: [
      {
        id: 'a',
        text: 'Iniciativas con Alto Valor de Negocio y Baja Complejidad Técnica (por ejemplo, habilitar búsqueda semántica sobre políticas internas existentes o resumen de llamadas de atención al cliente con Vertex AI Search).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Los Quick Wins combinan un alto retorno de valor empresarial con baja fricción técnica e infraestructura lista (turnkey), generando resultados medibles en semanas que validan la inversión antes de abordar proyectos de alta complejidad.'
      },
      {
        id: 'b',
        text: 'Iniciativas con Bajo Valor de Negocio y Altísima Complejidad Técnica que requieran preentrenar un modelo fundacional propio durante dos años.',
        isCorrect: false,
        distractorRationale: 'Distractor de antipatrón clásico ("hoyo negro de presupuesto"). Abordar proyectos de máxima dificultad y escaso retorno destruye la credibilidad del programa de IA y genera pérdidas financieras masivas.'
      },
      {
        id: 'c',
        text: 'Iniciativas que no tengan ningún usuario objetivo definido ni métricas de éxito.',
        isCorrect: false,
        distractorRationale: 'Distractor de mala gobernanza. Proyectos sin usuarios ni métricas de éxito están destinados al fracaso y no deben priorizarse.'
      },
      {
        id: 'd',
        text: 'Proyectos que requieran reemplazar todos los sistemas bancarios centrales (Core Banking) antes de emitir la primera respuesta de IA.',
        isCorrect: false,
        distractorRationale: 'Distractor de riesgo sistémico excesivo. Reemplazar el core bancario es un proyecto de modernización de años, contrario a una victoria rápida de IA generativa.'
      }
    ],
    overallExplanation: 'La matriz de priorización evalúa dos ejes: Valor de Negocio (ahorro de costes, incremento de ingresos, satisfacción del cliente) frente a Complejidad de Implementación (disponibilidad de datos, integración técnica, riesgo regulatorio). Las organizaciones exitosas inician con Quick Wins (alto valor, baja complejidad) para financiar y aprender antes de escalar a transformaciones complejas.',
    examHeuristic: 'Priorización de Casos de Uso: Iniciar SIEMPRE con Quick Wins (Alto Valor de Negocio + Baja Complejidad Técnica).'
  },
  {
    id: 'q-mod-09-03',
    moduleId: 'mod-09-estrategia-casos-uso-roi',
    domainId: 'domain-4',
    type: 'multi',
    difficulty: 'intermediate',
    prompt: 'El Director de Finanzas (CFO) de una compañía solicita al equipo de IA un modelo financiero formal para evaluar el Retorno de Inversión (ROI) y el Coste Total de Propiedad (TCO) de un nuevo asistente de atención al cliente. Un desarrollador sugiere que el único coste a considerar es la tarifa por millón de tokens consumidos de la API de Vertex AI. ¿Cuáles DOS afirmaciones corrigen esta perspectiva demostrando una estimación holística de TCO y ROI según Google Cloud? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'El TCO debe incluir no solo las tarifas de tokens de la API, sino también los costes de curaduría y limpieza de datos, infraestructura de integración (VPC, APIs backend, almacenamiento en Cloud Storage), licencias de software, monitoreo de observabilidad y mantenimiento continuo de prompts.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. El consumo de tokens suele representar solo una fracción del TCO; la preparación de datos corporativos, la seguridad perimetral, la ingeniería de software y el ciclo de vida de MLOps componen la mayor parte del coste operativo total.'
      },
      {
        id: 'b',
        text: 'El cálculo del ROI debe cuantificar tanto los beneficios cuantitativos directos (reducción del tiempo medio de atención - AHT, disminución de costes de escalamiento) como los beneficios cualitativos de productividad (mayor satisfacción del cliente CSAT, retención de personal y velocidad de respuesta al mercado).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Una evaluación rigurosa de ROI balancea ahorros de costes directos y aumentos de capacidad operativa con la mejora en la experiencia del cliente y la reducción del agotamiento laboral de los agentes.'
      },
      {
        id: 'c',
        text: 'El consumo de tokens de API es el 100% del coste total y los ingenieros de software trabajan sin cobrar salario.',
        isCorrect: false,
        distractorRationale: 'Distractor financiero absurdo. Los costes de capital humano y de integración técnica representan inversiones sustanciales en cualquier proyecto enterprise.'
      },
      {
        id: 'd',
        text: 'El ROI de los proyectos de IA Generativa es imposible de medir y las empresas deben invertir a ciegas sin presupuestos.',
        isCorrect: false,
        distractorRationale: 'Distractor de irresponsabilidad fiscal. La metodología de Google Cloud exige definir métricas cuantitativas de éxito y control estricto de retorno antes de la inversión.'
      },
      {
        id: 'e',
        text: 'El ROI se calcula dividiendo el número de palabras generadas por el voltaje de la fuente eléctrica del servidor.',
        isCorrect: false,
        distractorRationale: 'Distractor sin sentido financiero ni físico.'
      }
    ],
    overallExplanation: 'Un cálculo maduro de TCO en GenAI contempla el ecosistema completo: datos, ingeniería, observabilidad, seguridad y tokens de API. A su vez, el ROI mide la creación real de valor: horas-hombre ahorradas, reducción de tasas de abandono de clientes y aceleración del ciclo de ventas.',
    examHeuristic: 'TCO holístico = Tokens de API + Datos + Integración + MLOps/Personal. ROI = Ahorro de tiempo/costes + Satisfacción (CSAT/AHT).'
  },
  {
    id: 'q-mod-09-04',
    moduleId: 'mod-09-estrategia-casos-uso-roi',
    domainId: 'domain-4',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Un banco comercial automatiza la precalificación de créditos hipotecarios para compra de vivienda. Dado el estricto marco legal contra la discriminación financiera y el riesgo de crédito, el comité de riesgos prohíbe taxativamente que un algoritmo apruebe o rechace de forma autónoma una solicitud sin juicio humano. ¿Qué patrón arquitectónico y operativo de Google Cloud debe implementarse para armonizar la automatización con el cumplimiento regulatorio?',
    options: [
      {
        id: 'a',
        text: 'Human-in-the-Loop (HITL / Humano en el Bucle), donde la IA actúa como asistente analítico que sintetiza los antecedentes y sugiere una recomendación preliminar fundamentada, pero la decisión final vinculante la toma y firma un oficial de crédito humano calificado.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Human-in-the-Loop garantiza rendición de cuentas, supervisión ética y cumplimiento normativo en casos de uso de alto impacto legal y financiero, asegurando que las decisiones críticas estén siempre validadas por criterio humano.'
      },
      {
        id: 'b',
        text: 'Fully Autonomous Execution, apagando todos los accesos de los analistas de crédito y permitiendo que el LLM ejecute las transferencias bancarias de inmediato.',
        isCorrect: false,
        distractorRationale: 'Distractor de riesgo crítico. La autonomía no supervisada en decisiones de crédito de alto riesgo viola las regulaciones bancarias y las directrices de IA Responsable de Google.'
      },
      {
        id: 'c',
        text: 'Sustituir el modelo de IA por una moneda al aire para decidir los préstamos al azar.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo de mala práctica financiera y regulatoria.'
      },
      {
        id: 'd',
        text: 'Hacer que el cliente redacte su propio contrato hipotecario sin revisión legal.',
        isCorrect: false,
        distractorRationale: 'Distractor legal inviable que expone a la institución a litigios masivos.'
      }
    ],
    overallExplanation: 'El principio de "Human-in-the-Loop" (HITL) es indispensable en escenarios de alto riesgo (salud, finanzas, legal): la IA potencia la velocidad del profesional sintetizando información y detectando patrones, pero la responsabilidad ética, legal y la decisión irrevocable recae en el ser humano.',
    examHeuristic: 'Decisiones de alto riesgo / Reguladas / Impacto en personas ➔ Arquitectura Human-in-the-Loop (HITL).'
  },
  {
    id: 'q-mod-09-05',
    moduleId: 'mod-09-estrategia-casos-uso-roi',
    domainId: 'domain-4',
    type: 'multi',
    difficulty: 'intermediate',
    prompt: 'La Dirección Ejecutiva de una empresa de seguros busca garantizar una adopción exitosa y sostenible de las herramientas de IA generativa entre sus 8,000 colaboradores. Saben que muchas implementaciones fracasan no por limitaciones tecnológicas, sino por resistencia al cambio o falta de habilitación de los usuarios. ¿Cuáles DOS iniciativas de gestión del cambio y gobernanza organizacional recomienda Google Cloud para asegurar el éxito del programa? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Crear un Centro de Excelencia en Inteligencia Artificial (AI Center of Excellence - AI CoE) multidisciplinario que reúna líderes de negocio, ingenieros de TI, especialistas de seguridad y asesores legales para coordinar la estrategia, definir estándares y compartir mejores prácticas.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Un AI CoE centraliza la gobernanza, evita la duplicación de esfuerzos aislados en silos departamentales y establece directrices éticas y metodológicas coherentes para toda la empresa.'
      },
      {
        id: 'b',
        text: 'Diseñar programas continuos de capacitación y alfabetización en IA (AI literacy) para empleados de todos los niveles, fomentando una cultura de experimentación responsable y midiendo métricas de adopción activa (como usuarios activos semanales y reducción de tareas repetitivas).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. La capacitación continua y la alfabetización digital desmitifican la IA, reducen la ansiedad laboral por el cambio tecnológico y empoderan a los equipos a integrar herramientas como Gemini en sus flujos diarios de trabajo.'
      },
      {
        id: 'c',
        text: 'Prohibir a los empleados comunicarse entre sí para que nadie hable sobre las herramientas de IA.',
        isCorrect: false,
        distractorRationale: 'Distractor de gestión autoritaria contraproducente. La comunicación abierta y la colaboración son esenciales para la adopción tecnológica.'
      },
      {
        id: 'd',
        text: 'Despedir inmediatamente a cualquier colaborador que solicite capacitación sobre cómo usar Gemini.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo y destructivo para la cultura laboral y retención de talento.'
      },
      {
        id: 'e',
        text: 'Ocultar las herramientas de IA en servidores secretos para que los usuarios no las encuentren.',
        isCorrect: false,
        distractorRationale: 'Distractor de sabotaje al proyecto. El objetivo de una estrategia de adopción es maximizar el uso productivo de las herramientas, no esconderlas.'
      }
    ],
    overallExplanation: 'El éxito de la IA generativa depende en gran medida de la gestión del cambio: el establecimiento de un Centro de Excelencia de IA (AI CoE) proporciona alineación estratégica y gobernanza entre negocio y tecnología, mientras que los programas de formación y alfabetización aceleran la adopción y el valor capturado.',
    examHeuristic: 'Gestión del cambio y adopción organizacional en IA ➔ AI Center of Excellence (AI CoE) + Alfabetización y capacitación continua.'
  }
];
