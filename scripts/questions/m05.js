export const m05Questions = [
  {
    id: 'q-mod-05-01',
    moduleId: 'mod-05-productividad-workspace-notebooklm',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'fundamental',
    prompt: 'El equipo de recursos humanos de una empresa internacional necesita redactar un comunicado formal anunciando una nueva política de trabajo híbrido. La responsable del área redactó un borrador preliminar en Google Docs pero desea cambiar el tono a más formal y ejecutivo, corregir la claridad y sintetizar los puntos clave para un correo masivo en Gmail. ¿Qué funcionalidad de Gemini for Google Workspace está diseñada para esta tarea?',
    options: [
      {
        id: 'a',
        text: '"Help me write" (Ayúdame a escribir) integrado nativamente en Google Docs y Gmail.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. "Help me write" en Google Docs y Gmail permite generar borradores desde cero, así como reformular, acortar, expandir y ajustar el tono (formal, informal) de textos existentes con un solo clic.'
      },
      {
        id: 'b',
        text: 'Cloud TPU v5p Pods aprovisionados mediante Google Kubernetes Engine.',
        isCorrect: false,
        distractorRationale: 'Distractor de sobreingeniería. Los pods de TPU son infraestructura de supercómputo para entrenar grandes modelos, no herramientas de usuario final para redacción ofimática.'
      },
      {
        id: 'c',
        text: 'Vertex AI Feature Store para consultar variables numéricas en línea.',
        isCorrect: false,
        distractorRationale: 'Distractor de ML tradicional. Feature Store almacena y sirve características numéricas para modelos predictivos tabulares, no procesa documentos de Workspace.'
      },
      {
        id: 'd',
        text: 'Un script de Google Apps Script que ejecute un clasificador Bayesiano local.',
        isCorrect: false,
        distractorRationale: 'Distractor técnico inferior. Apps Script requiere programación manual y no ofrece las capacidades generativas de lenguaje natural nativas de Gemini.'
      }
    ],
    overallExplanation: 'Gemini for Google Workspace integra la función "Help me write" en Docs y Gmail: ayuda a redactar comunicaciones desde una breve descripción inicial o a pulir borradores ajustando tono (formal, casual), longitud (resumir, expandir) y estilo lingüístico de forma inmediata.',
    examHeuristic: 'Redacción, ajuste de tono y síntesis en Docs/Gmail ➔ "Help me write" en Gemini for Workspace.'
  },
  {
    id: 'q-mod-05-02',
    moduleId: 'mod-05-productividad-workspace-notebooklm',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'fundamental',
    prompt: 'En una empresa de consultoría estratégica, los directores pasan horas tomando apuntes manualmente en reuniones virtuales con clientes para luego enviar actas con los acuerdos tomados. La dirección de operaciones desea automatizar este proceso para que nadie tenga que tomar notas y todos puedan concentrarse plenamente en la discusión. ¿Qué función de Gemini for Google Workspace en Google Meet resuelve esta necesidad?',
    options: [
      {
        id: 'a',
        text: '"Take notes for me" (Toma notas por mí) en Google Meet.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. "Take notes for me" en Google Meet transcribe la reunión, captura puntos de debate clave y sintetiza automáticamente una minuta con compromisos de acción (action items) en un Google Doc compartido al finalizar la llamada.'
      },
      {
        id: 'b',
        text: 'Configurar un bucket de Cloud Storage con retención inmutable WORM.',
        isCorrect: false,
        distractorRationale: 'Distractor de almacenamiento legal. Los buckets WORM protegen archivos contra borrado accidental o manipulación, pero no transcriben audio ni generan resúmenes ejecutivos.'
      },
      {
        id: 'c',
        text: 'Desplegar un clúster de BigQuery con particiones horarias sobre el video de la reunión.',
        isCorrect: false,
        distractorRationale: 'Distractor de base de datos analítica. BigQuery es un almacén de datos SQL estructurado y no transcribe reuniones interactivas en Google Meet.'
      },
      {
        id: 'd',
        text: 'Pedir al cliente que repita cada frase dos veces para asegurar que quede grabada.',
        isCorrect: false,
        distractorRationale: 'Distractor de proceso manual ineficiente. Degrada severamente la relación con el cliente y carece de automatización tecnológica.'
      }
    ],
    overallExplanation: '"Take notes for me" en Google Meet libera a los participantes de la carga de tomar notas manuales: sintetiza los temas abordados, extrae compromisos y envía un documento estructurado a todos los asistentes tras la sesión, además de ofrecer subtitulado traducido en tiempo real en decenas de idiomas.',
    examHeuristic: 'Minutas automáticas y resumen de compromisos en videollamadas ➔ "Take notes for me" en Google Meet.'
  },
  {
    id: 'q-mod-05-03',
    moduleId: 'mod-05-productividad-workspace-notebooklm',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'El Oficial de Seguridad de la Información (CISO) de un banco privado expresa su preocupación ante la adopción corporativa de Gemini for Google Workspace, temiendo que los datos confidenciales contenidos en los correos de Gmail, documentos de Docs y análisis financieros en Sheets sean utilizados por Google para reentrenar sus modelos públicos de IA. ¿Cuál es la garantía contractual y de gobernanza formal que ofrece Google Workspace?',
    options: [
      {
        id: 'a',
        text: 'Google utiliza los correos de los clientes únicamente durante los fines de semana para optimizar los pesos globales del modelo.',
        isCorrect: false,
        distractorRationale: 'Distractor flagrante falso. Google Cloud y Workspace garantizan que los datos empresariales jamás se utilizan para entrenar modelos públicos bajo ninguna circunstancia de horario.'
      },
      {
        id: 'b',
        text: 'Los datos corporativos, contenidos de correos, documentos y prompts en Google Workspace pertenecen exclusivamente al cliente y NUNCA se utilizan para entrenar los modelos fundacionales de Google ni se comparten con terceros.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Es el principio rector de privacidad empresarial de Google Cloud: los datos de los clientes están estrictamente aislados en su tenant, protegidos por cifrado y controles de acceso, y no alimentan los modelos de IA de Google sin autorización.'
      },
      {
        id: 'c',
        text: 'Para proteger los datos, la empresa debe desconectar sus computadoras de la red eléctrica al terminar la jornada laboral.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo de seguridad física ingenua. La protección de datos empresariales en Workspace es contractual, lógica y criptográfica en la nube.'
      },
      {
        id: 'd',
        text: 'Google comparte las hojas de cálculo de los clientes únicamente con agencias de publicidad autorizadas.',
        isCorrect: false,
        distractorRationale: 'Distractor calumnioso. Google Workspace Enterprise no vende datos de clientes ni los comparte con redes publicitarias de ningún tipo.'
      }
    ],
    overallExplanation: 'La política de privacidad de Google para Gemini en Workspace es explícita y vinculante: los datos del cliente (textos, archivos, llamadas) permanecen en el perímetro privado de la organización, nunca se emplean para entrenar modelos fundacionales de Google, no son accesibles por otros clientes ni por anunciantes, y cumplen rigurosos estándares de cumplimiento (ISO 27001, SOC 2, HIPAA).',
    examHeuristic: 'Privacidad en Workspace: Tus datos son tus datos. NUNCA entrenan modelos de Google ni se comparten.'
  },
  {
    id: 'q-mod-05-04',
    moduleId: 'mod-05-productividad-workspace-notebooklm',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Un equipo de investigadores médicos dispone de 40 artículos científicos recientes en formato PDF sobre una terapia oncológica. Necesitan una herramienta que sintetice los hallazgos cruzados, responda preguntas complejas sobre dosis y efectos secundarios, y proporcione citas textuales exactas al número de página de cada estudio sin inventar ningún dato externo ni buscar en la web abierta. ¿Qué producto de Google Cloud impulsado por Gemini 1.5 es la solución ideal?',
    options: [
      {
        id: 'a',
        text: 'NotebookLM.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. NotebookLM es un asistente de investigación personalizado basado en Gemini que opera bajo una arquitectura de "anclaje estricto" (source-grounded): responde basándose exclusivamente en los documentos subidos por el usuario y añade citas directas a párrafos y páginas específicas.'
      },
      {
        id: 'b',
        text: 'Google Maps Platform con API de Directions.',
        isCorrect: false,
        distractorRationale: 'Distractor de mapas. Google Maps calcula rutas de transporte y geolocalización, careciendo de capacidades de análisis de literatura médica.'
      },
      {
        id: 'c',
        text: 'Cloud Pub/Sub en modo de suscripción pull de alto rendimiento.',
        isCorrect: false,
        distractorRationale: 'Distractor de mensajería asíncrona. Pub/Sub es un bus de eventos entre sistemas distribuidos, no un motor de síntesis de documentos científicos.'
      },
      {
        id: 'd',
        text: 'Un chatbot de reglas basado en expresiones regulares de texto.',
        isCorrect: false,
        distractorRationale: 'Distractor limitado. Expresiones regulares simples no pueden realizar síntesis semántica cruzada ni razonamiento conceptual entre decenas de artículos médicos.'
      }
    ],
    overallExplanation: 'NotebookLM redefine los cuadernos de notas: al subir fuentes (PDFs, Google Docs, enlaces, notas de texto), el sistema crea un modelo mental privado que responde preguntas, extrae resúmenes y genera guías de estudio basándose estrictamente en dichas fuentes, con citas verificables directas que eliminan las alucinaciones externas.',
    examHeuristic: 'Cuaderno de notas + Anclaje exclusivo en documentos del usuario + Citas a fuentes ➔ NotebookLM.'
  },
  {
    id: 'q-mod-05-05',
    moduleId: 'mod-05-productividad-workspace-notebooklm',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'fundamental',
    prompt: 'Un director financiero que viaja frecuentemente no tiene tiempo para leer un informe de auditoría de 150 páginas antes de su próxima junta de consejo. Decide utilizar una función innovadora de NotebookLM que convierte automáticamente los documentos cargados en una conversación dinámica y amena en formato de audio, donde dos presentadores de IA debaten los puntos clave, analizan las conclusiones y explican los tecnicismos basándose exclusivamente en el informe. ¿Cómo se denomina esta funcionalidad?',
    options: [
      {
        id: 'a',
        text: 'Audio Overview (Resumen de Audio).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. "Audio Overview" en NotebookLM genera una discusión auditiva generativa estilo podcast entre dos anfitriones de IA que sintetizan, contrastan y explican los documentos de referencia cargados por el usuario.'
      },
      {
        id: 'b',
        text: 'Cloud Speech-to-Text en streaming continuo.',
        isCorrect: false,
        distractorRationale: 'Distractor de transcriptor inverso. Speech-to-Text convierte voz humana hablada en texto escrito, no sintetiza debates conversacionales entre dos voces de IA a partir de documentos.'
      },
      {
        id: 'c',
        text: 'Audiobook comercial descargado de Google Play Books.',
        isCorrect: false,
        distractorRationale: 'Distractor comercial. Los audiolibros de Play Books son narraciones comerciales pregrabadas de libros publicados, no síntesis generativas de documentos corporativos privados.'
      },
      {
        id: 'd',
        text: 'Transmisión de radio FM analógica en onda corta.',
        isCorrect: false,
        distractorRationale: 'Distractor de telecomunicaciones anacrónico sin ninguna relación con la IA generativa.'
      }
    ],
    overallExplanation: 'Audio Overview es una función destacada de NotebookLM que transforma fuentes complejas en una conversación de audio profunda y natural entre dos hosts generados por IA. Permite a los profesionales absorber información crítica durante desplazamientos con un nivel de síntesis y dinamismo conversacional sorprendente.',
    examHeuristic: 'Discusión en audio estilo podcast sobre documentos subidos por el usuario ➔ NotebookLM Audio Overview.'
  },
  {
    id: 'q-mod-05-06',
    moduleId: 'mod-05-productividad-workspace-notebooklm',
    domainId: 'domain-2',
    type: 'multi',
    difficulty: 'intermediate',
    prompt: 'Un gerente de proyectos en una empresa de logística utiliza Google Sheets para coordinar el lanzamiento de una nueva flota de vehículos eléctricos. Desea acelerar la gestión de tareas y la organización de la información utilizando las capacidades de Gemini for Google Workspace. ¿Cuáles DOS acciones pueden ejecutarse mediante "Help me organize" y las funciones de IA integradas en Google Sheets? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Generar automáticamente plantillas de tablas completas y estructuradas con columnas relevantes, tareas, estados y fechas estimadas a partir de una descripción en lenguaje natural.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. "Help me organize" en Google Sheets crea esquemas de seguimiento y tablas operativas completas para eventos, cronogramas de proyectos o control de inventarios con solo describir el objetivo.'
      },
      {
        id: 'b',
        text: 'Clasificar y categorizar semánticamente comentarios no estructurados de texto libre (por ejemplo, agrupar opiniones de clientes en temas de interés) mediante capacidades de comprensión del lenguaje.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Gemini en Sheets permite aplicar lógica semántica para etiquetar, clasificar y enriquecer registros no estructurados en las celdas sin tener que redactar fórmulas complejas de texto.'
      },
      {
        id: 'c',
        text: 'Reemplazar el sistema de frenos mecánicos de los vehículos eléctricos a través de una fórmula de celda.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. El software de ofimática en la nube no interactúa mecánicamente con componentes de hardware automotriz físico.'
      },
      {
        id: 'd',
        text: 'Minar criptomonedas en segundo plano utilizando las funciones matemáticas de la hoja.',
        isCorrect: false,
        distractorRationale: 'Distractor prohibido por las condiciones de servicio de Google Cloud y ajeno a la gestión de datos.'
      },
      {
        id: 'e',
        text: 'Eliminar automáticamente todos los archivos de Google Drive de la organización si una tarea se atrasa un día.',
        isCorrect: false,
        distractorRationale: 'Distractor destructivo. Gemini no ejecuta acciones destructivas desproporcionadas sobre la infraestructura corporativa.'
      }
    ],
    overallExplanation: 'Gemini en Google Sheets potencia el análisis y la estructuración de datos: "Help me organize" diseña tablas de seguimiento y presupuestos a medida desde un prompt textual, y las herramientas de IA asisten en la categorización y enriquecimiento de comentarios en texto no estructurado.',
    examHeuristic: 'Estructuración de plantillas de proyectos y categorización semántica en hojas de cálculo ➔ "Help me organize" en Google Sheets.'
  },
  {
    id: 'q-mod-05-07',
    moduleId: 'mod-05-productividad-workspace-notebooklm',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'fundamental',
    prompt: 'El equipo de ventas de una compañía de energías renovables prepara una presentación en Google Slides para convencer a inversores. Necesitan imágenes visuales impactantes de granjas solares integradas con turbinas eólicas en un entorno montañoso al atardecer, pero no encuentran ninguna fotografía adecuada en su banco de imágenes corporativo ni desean adquirir licencias comerciales externas. ¿Qué capacidad de Gemini for Workspace en Google Slides les permite resolver esta necesidad?',
    options: [
      {
        id: 'a',
        text: 'Generar imágenes originales personalizadas directamente dentro de la diapositiva a partir de una descripción textual detallada (Create images with Gemini).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. En Google Slides, la integración de Gemini permite generar imágenes originales con múltiples estilos artísticos (fotografía, ilustración, renderizado 3D) mediante descripciones textuales simples para enriquecer las diapositivas.'
      },
      {
        id: 'b',
        text: 'Conectar un cable HDMI directamente al proyector de la sala de conferencias.',
        isCorrect: false,
        distractorRationale: 'Distractor de conectividad física. Un cable de video no genera imágenes sintéticas mediante IA generativa.'
      },
      {
        id: 'c',
        text: 'Desplegar un clúster de Cloud Dataproc para renderizar animaciones vectoriales por lotes.',
        isCorrect: false,
        distractorRationale: 'Distractor de procesamiento batch. Dataproc es para procesamiento masivo de datos con Apache Spark/Hadoop, no para crear imágenes interactivas en diapositivas.'
      },
      {
        id: 'd',
        text: 'Escanear una fotografía antigua impresa utilizando un fax conectado a la red telefónica.',
        isCorrect: false,
        distractorRationale: 'Distractor de tecnología de oficina obsoleta que no genera nuevo contenido visual.'
      }
    ],
    overallExplanation: 'En Google Slides, Gemini permite crear imágenes originales al instante impulsadas por modelos de difusión visual (Imagen). Los usuarios redactan un prompt describiendo la escena y el estilo deseado y reciben múltiples opciones visuales para insertar directamente en su presentación.',
    examHeuristic: 'Generación directa de imágenes originales para presentaciones ➔ "Create images with Gemini" en Google Slides.'
  },
  {
    id: 'q-mod-05-08',
    moduleId: 'mod-05-productividad-workspace-notebooklm',
    domainId: 'domain-2',
    type: 'multi',
    difficulty: 'intermediate',
    prompt: 'El Comité de Arquitectura de una empresa global debe decidir qué solución adoptar para dos iniciativas diferentes: por un lado, potenciar la productividad ofimática cotidiana de 5,000 empleados administrativos en redacción y análisis de hojas de cálculo; por otro lado, construir una aplicación web propietaria de autoservicio que consulte catálogos de inventario en bases de datos PostgreSQL privadas y ejecute transacciones con APIs ERP. ¿Cuáles DOS afirmaciones representan la elección arquitectónica adecuada entre Gemini for Workspace y Vertex AI? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Adoptar Gemini for Google Workspace para los empleados administrativos, ya que es una solución SaaS preconstruida que no requiere desarrollo de software, mantenimiento de código ni infraestructura adicional.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Gemini for Workspace es la solución ideal lista para usar para la suite ofimática diaria (Docs, Sheets, Gmail, Meet) con adopción inmediata para el personal.'
      },
      {
        id: 'b',
        text: 'Utilizar la plataforma Vertex AI (Search, Conversation o Agent Builder) para la aplicación web de inventario, ya que proporciona APIs personalizables, orquestación de llamadas a funciones (tool calling) y conexión segura con bases de datos y sistemas ERP corporativos.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Cuando se requiere integración con sistemas transaccionales backend propietarios, llamadas a APIs y lógica de negocio a medida, Vertex AI es la plataforma diseñada para ingenieros y arquitectos.'
      },
      {
        id: 'c',
        text: 'Intentar reprogramar Google Docs para que actúe como un motor de base de datos relacional y servidor web transaccional de alta concurrencia.',
        isCorrect: false,
        distractorRationale: 'Distractor de antipatrón severo. Google Docs es un procesador de textos para usuarios, no un motor de bases de datos backend de alta disponibilidad.'
      },
      {
        id: 'd',
        text: 'Descartar ambas opciones y obligar a todos los empleados a redactar sus correos en tarjetas perforadas de cartón.',
        isCorrect: false,
        distractorRationale: 'Distractor humorístico anacrónico sin validez en un examen de arquitectura tecnológica moderna.'
      },
      {
        id: 'e',
        text: 'Instalar Vertex AI en una memoria USB para que los empleados la lleven a sus hogares.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. Vertex AI es un servicio gestionado en la nube que se consume mediante APIs autenticadas en Google Cloud, no un programa portátil en memorias USB.'
      }
    ],
    overallExplanation: 'La frontera de decisión es nítida: si la necesidad es productividad personal y ofimática dentro del flujo de trabajo habitual (correos, documentos, hojas de cálculo, reuniones), la respuesta es Gemini for Workspace. Si la necesidad involucra aplicaciones a medida con integración a bases de datos privadas, APIs transaccionales y orquestación con agentes, la respuesta es Vertex AI.',
    examHeuristic: 'Productividad ofimática diaria para usuarios ➔ Gemini for Workspace. Aplicaciones a medida integradas con APIs/BD ➔ Vertex AI.'
  },
  {
    id: 'q-mod-05-09',
    moduleId: 'mod-05-productividad-workspace-notebooklm',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'El departamento de compras de una empresa multinacional con 10,000 empleados evalúa si los trabajadores pueden simplemente contratar cuentas individuales de Google One AI Premium con sus tarjetas corporativas en lugar de contratar licencias de Gemini for Google Workspace Enterprise. ¿Cuál es la principal razón por la que el CISO y el equipo legal deben rechazar las suscripciones individuales de consumo para uso corporativo?',
    options: [
      {
        id: 'a',
        text: 'Las suscripciones de consumo carecen de gobernanza corporativa centralizada, no se integran con la consola de administración de Workspace, no respetan las políticas de retención y prevención de pérdida de datos (DLP) ni ofrecen los acuerdos contractuales empresariales de privacidad y cumplimiento regulatorio.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Las cuentas de consumidor (Google One AI Premium) son acuerdos individuales entre Google y una persona particular; las empresas requieren Gemini for Workspace Enterprise para contar con control administrativo centralizado, auditoría, cumplimiento de normativas (SOC2, HIPAA, GDPR) y garantías de protección de propiedad intelectual.'
      },
      {
        id: 'b',
        text: 'Google One AI Premium no permite el uso de teclados de computadora y solo funciona mediante comandos de voz en teléfonos antiguos.',
        isCorrect: false,
        distractorRationale: 'Distractor de interfaz falso. Google One AI Premium funciona perfectamente en navegadores web de escritorio y dispositivos móviles modernos.'
      },
      {
        id: 'c',
        text: 'Gemini for Workspace Enterprise es completamente gratuito para todas las empresas del mundo sin límite de usuarios.',
        isCorrect: false,
        distractorRationale: 'Distractor comercial falso. Workspace Enterprise es un servicio comercial de suscripción con licenciamiento formal por usuario.'
      },
      {
        id: 'd',
        text: 'Los modelos de Google One AI Premium responden en latín antiguo en lugar de idiomas modernos.',
        isCorrect: false,
        distractorRationale: 'Distractor lingüístico absurdo sin fundamento.'
      }
    ],
    overallExplanation: 'El fenómeno de "Shadow AI" (empleados usando herramientas de IA de consumo no gestionadas) expone a la empresa a graves brechas de seguridad. Gemini for Workspace Enterprise otorga al administrador de TI el control completo sobre las políticas de seguridad, auditoría en Cloud Logging, prevención de fuga de datos (DLP) y respaldo contractual corporativo.',
    examHeuristic: 'Uso corporativo regulado con DLP, consola central e IAM ➔ Gemini for Workspace Enterprise (NUNCA cuentas de consumo individuales).'
  }
];
