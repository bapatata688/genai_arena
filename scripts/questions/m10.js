export const m10Questions = [
  {
    id: 'q-mod-10-01',
    moduleId: 'mod-10-gobernanza-saif-ia-responsable-ip',
    domainId: 'domain-4',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'El equipo de recursos humanos de una multinacional implementa una solución en Vertex AI para filtrar y clasificar currículums de candidatos a puestos de liderazgo. Durante las pruebas de auditoría algorítmica, descubren que el modelo califica sistemáticamente más bajo a postulantes de ciertos géneros o grupos étnicos debido a patrones históricos desiguales en las muestras de entrenamiento pasadas. ¿Cuál de los 7 Principios de IA Responsable de Google obliga a intervenir para auditar y corregir activamente esta disparidad?',
    options: [
      {
        id: 'a',
        text: 'Principio 2: Evitar crear o reforzar sesgos injustos (Avoid creating or reinforcing unfair bias).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. El Principio 2 de IA Responsable de Google compromete a la organización a diseñar algoritmos y conjuntos de datos que no perpetúen prejuicios injustos relacionados con raza, género, nacionalidad o cualquier condición protegida, exigiendo auditorías continuas de equidad (Fairness).'
      },
      {
        id: 'b',
        text: 'Principio de optimización de ingresos por publicidad a corto plazo.',
        isCorrect: false,
        distractorRationale: 'Distractor ético falso. Google no incluye la monetización publicitaria como principio ético rector de IA Responsable.'
      },
      {
        id: 'c',
        text: 'Obligación de acelerar la velocidad del procesador ignorando los resultados.',
        isCorrect: false,
        distractorRationale: 'Distractor técnico absurdo. La velocidad de hardware nunca debe anteponerse a la equidad y derechos de las personas.'
      },
      {
        id: 'd',
        text: 'Eliminar el departamento de recursos humanos para no registrar quejas.',
        isCorrect: false,
        distractorRationale: 'Distractor destructivo que atenta contra la gobernanza y la ley laboral.'
      }
    ],
    overallExplanation: 'Los 7 Principios de IA Responsable de Google fueron pioneros en la industria (2018). El Principio 2 ("Evitar crear o reforzar sesgos injustos") instruye explícitamente auditar y mitigar sesgos en los datos de entrenamiento y las representaciones algorítmicas, especialmente en decisiones que afectan la vida y oportunidades laborales de las personas.',
    examHeuristic: 'Mitigar discriminación y sesgos en datos de entrenamiento o modelos ➔ Principio 2: Evitar crear o reforzar sesgos injustos.'
  },
  {
    id: 'q-mod-10-02',
    moduleId: 'mod-10-gobernanza-saif-ia-responsable-ip',
    domainId: 'domain-4',
    type: 'multi',
    difficulty: 'advanced',
    prompt: 'El Director de Seguridad de la Información (CISO) de una compañía médica evalúa adoptar Vertex AI para analizar expedientes clínicos de pacientes. Antes de firmar el contrato, solicita garantías formales de cumplimiento normativo y privacidad de datos. ¿Cuáles DOS afirmaciones representan garantías arquitectónicas y contractuales reales de Google Cloud? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Los datos clínicos, prompts y respuestas procesados a través de Vertex AI nunca se utilizan para entrenar o mejorar los modelos fundacionales de Google.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Es un compromiso contractual fundamental de Google Cloud para clientes corporativos de Vertex AI y Workspace: los datos de los clientes pertenecen exclusivamente a ellos y no entrenan modelos públicos.'
      },
      {
        id: 'b',
        text: 'Google Cloud comparte automáticamente los embeddings vectoriales generados con otros clientes del mismo sector de salud para abaratar el cómputo.',
        isCorrect: false,
        distractorRationale: 'Distractor flagrante. Todos los índices y datos están aislados estrictamente por tenant y protegidos por IAM del cliente.'
      },
      {
        id: 'c',
        text: 'El tráfico hacia las APIs de Vertex AI puede confinarse estrictamente dentro de un perímetro de red privado utilizando VPC Service Controls.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. VPC Service Controls previene la exfiltración de datos no autorizada a redes públicas o cuentas externas, aislando la solución en el perímetro de seguridad corporativo.'
      },
      {
        id: 'd',
        text: 'Google Cloud desactiva todas las claves de cifrado en reposo para permitir que los auditores externos lean los registros en texto claro.',
        isCorrect: false,
        distractorRationale: 'Distractor por violación de seguridad. Google cifra todos los datos por defecto y soporta Customer-Managed Encryption Keys (CMEK).'
      },
      {
        id: 'e',
        text: 'Los modelos de Vertex AI publican automáticamente los expedientes médicos en redes sociales públicas.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo de violación de confidencialidad.'
      }
    ],
    overallExplanation: 'Google Cloud garantiza contractualmente el aislamiento de datos corporativos (cero entrenamiento con datos de clientes) y provee controles de red empresariales mediante VPC Service Controls y cifrado con soporte CMEK.',
    examHeuristic: 'Privacidad empresarial en GCP ➔ Los datos del cliente NUNCA entrenan modelos de Google + VPC Service Controls asegura el perímetro.'
  },
  {
    id: 'q-mod-10-03',
    moduleId: 'mod-10-gobernanza-saif-ia-responsable-ip',
    domainId: 'domain-4',
    type: 'single',
    difficulty: 'advanced',
    prompt: 'Para ayudar a las organizaciones a proteger sus sistemas de inteligencia artificial frente a nuevas amenazas de ciberseguridad (como envenenamiento de datasets de entrenamiento, ataques de inversión de modelos, extracción de parámetros e inyecciones adversarias de prompts), Google diseñó y publicó un marco conceptual y operativo de referencia. ¿Cómo se denomina este estándar de seguridad para IA de Google?',
    options: [
      {
        id: 'a',
        text: 'Secure AI Framework (SAIF / Marco de IA Segura).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. SAIF (Secure AI Framework) es el marco público desarrollado por Google que adapta las mejores prácticas de ciberseguridad convencional al ecosistema de IA, guiando a las empresas en la protección integral de modelos, datos, canalizaciones y entornos de inferencia.'
      },
      {
        id: 'b',
        text: 'Protocolo de Seguridad WEP para redes inalámbricas domésticas.',
        isCorrect: false,
        distractorRationale: 'Distractor de redes inalámbricas obsoleto de la década de 1990.'
      },
      {
        id: 'c',
        text: 'Manual de usuario de impresoras matriciales de impacto.',
        isCorrect: false,
        distractorRationale: 'Distractor de oficina anticuado sin relación con seguridad de inteligencia artificial.'
      },
      {
        id: 'd',
        text: 'Filtro de correo no deseado para cuentas gratuitas de correo web.',
        isCorrect: false,
        distractorRationale: 'Distractor de producto básico de correo sin el alcance holístico de un marco de seguridad de IA.'
      }
    ],
    overallExplanation: 'Google Secure AI Framework (SAIF) establece seis elementos clave: ampliar los fundamentos de seguridad tradicionales al espacio de IA, automatizar defensas para responder al ritmo de las amenazas, armonizar controles a nivel de plataforma, contextualizar la postura de seguridad y evaluar continuamente los sistemas contra ataques adversarios.',
    examHeuristic: 'Marco integral de ciberseguridad de Google para proteger sistemas de IA ➔ Secure AI Framework (SAIF).'
  },
  {
    id: 'q-mod-10-04',
    moduleId: 'mod-10-gobernanza-saif-ia-responsable-ip',
    domainId: 'domain-4',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'El departamento legal de una agencia de diseño y marketing expresa preocupación por el riesgo de demandas judiciales de derechos de autor si utilizan Imagen 3 y Gemini en Vertex AI para generar contenido publicitario para sus clientes corporativos. ¿Cuál es el compromiso de protección jurídica que ofrece Google Cloud a través de su política de "Generative AI Intellectual Property Indemnification"?',
    options: [
      {
        id: 'a',
        text: 'Una cobertura de indemnización dual de propiedad intelectual que protege al cliente tanto frente a reclamaciones por el uso de los datos de entrenamiento empleados por Google para crear el modelo, como frente a demandas de infracción de copyright derivadas del contenido generado (generated output), siempre que el cliente haya utilizado los filtros de seguridad y no haya intentado infringir intencionadamente derechos de terceros.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Google Cloud proporciona un respaldo contractual pionero de doble indemnización de PI: asume la responsabilidad legal por los datos de preentrenamiento y defiende/indemniza al cliente por el contenido generado si cumple con el uso responsable de la plataforma.'
      },
      {
        id: 'b',
        text: 'Google exige que el cliente pague una fianza de 10 millones de dólares antes de generar cualquier texto o imagen.',
        isCorrect: false,
        distractorRationale: 'Distractor legal falso y punitivo. Google Cloud no cobra fianzas a los clientes para usar sus modelos generativos.'
      },
      {
        id: 'c',
        text: 'Google no asume ninguna responsabilidad y traslada el 100% de los costes legales al cliente en todos los casos sin excepción.',
        isCorrect: false,
        distractorRationale: 'Distractor de política restrictiva falsa. Google Cloud ofrece indemnización formal explícita en sus términos de servicio de IA generativa.'
      },
      {
        id: 'd',
        text: 'La política de indemnización solo aplica si el cliente imprime todos los resultados en hojas de papel membretado.',
        isCorrect: false,
        distractorRationale: 'Distractor ridículo de formato físico sin validez contractual.'
      }
    ],
    overallExplanation: 'La política de Indemnización de Propiedad Intelectual de IA Generativa de Google Cloud es un diferenciador de confianza empresarial: cubre tanto posibles infracciones en los datos de entrenamiento de Google como reclamaciones de terceros sobre el contenido generado por los clientes con servicios como Vertex AI y Workspace, brindando certidumbre jurídica.',
    examHeuristic: 'Protección legal contra demandas de copyright por contenido generado ➔ Doble Indemnización de PI de Google Cloud (Training Data + Generated Output).'
  },
  {
    id: 'q-mod-10-05',
    moduleId: 'mod-10-gobernanza-saif-ia-responsable-ip',
    domainId: 'domain-4',
    type: 'multi',
    difficulty: 'intermediate',
    prompt: 'Al desplegar Gemini en Vertex AI, el administrador de la solución accede a la configuración de "Safety Filters" (Filtros de Seguridad) para ajustar los umbrales de moderación antes de que el modelo responda a los usuarios. ¿Cuáles DOS afirmaciones describen correctamente el funcionamiento y configuración de estos filtros de seguridad en Vertex AI? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Permiten calibrar umbrales de probabilidad de daño para cuatro categorías críticas de contenido: Discurso de odio (Hate Speech), Contenido explícito / sexual (Sexually Explicit), Acoso (Harassment) y Contenido peligroso / violencia (Dangerous Content).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Vertex AI categoriza el riesgo en esas cuatro dimensiones fundamentales y evalúa la probabilidad de daño de los prompts entrantes y las respuestas generadas.'
      },
      {
        id: 'b',
        text: 'Ofrecen niveles configurables de severidad de bloqueo (como Block Few, Block Some, Block Most o Block None para casos de uso corporativo específicos auditados), permitiendo a las organizaciones equilibrar la seguridad con la necesidad de procesar terminología médica o legal legítima.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Los umbrales de bloqueo son graduables para evitar falsos positivos en contextos especializados (ej. un hospital que necesita analizar expedientes médicos con descripciones anatómicas sin que sean censuradas erróneamente).'
      },
      {
        id: 'c',
        text: 'Los filtros de seguridad solo funcionan si la computadora del usuario tiene instalada una tarjeta gráfica de videojuegos.',
        isCorrect: false,
        distractorRationale: 'Distractor de hardware local. Los filtros de seguridad de Vertex AI se ejecutan del lado del servidor en la infraestructura cloud de Google.'
      },
      {
        id: 'd',
        text: 'Desactivar los filtros de seguridad borra permanentemente todos los proyectos de Google Cloud de la empresa.',
        isCorrect: false,
        distractorRationale: 'Distractor alarmista falso. Ajustar umbrales de seguridad no ejecuta borrados de proyectos.'
      },
      {
        id: 'e',
        text: 'Los filtros de seguridad únicamente bloquean preguntas que contengan más de cinco vocales en la misma palabra.',
        isCorrect: false,
        distractorRationale: 'Distractor lingüístico arbitrario sin ningún fundamento de moderación de contenido.'
      }
    ],
    overallExplanation: 'Los Safety Filters de Vertex AI operan como salvaguardas bidireccionales (analizan tanto el prompt del usuario como la respuesta del modelo). Clasifican el contenido en cuatro categorías principales (odio, acoso, explícito, peligroso) y permiten a las empresas ajustar los umbrales de tolerancia según la naturaleza y requerimientos de su industria.',
    examHeuristic: 'Filtros de Seguridad en Vertex AI: 4 categorías (Odio, Acoso, Explícito, Peligroso) + Umbrales graduables (Block Most/Some/Few/None).'
  }
];
