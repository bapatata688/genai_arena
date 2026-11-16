export const m04Questions = [
  {
    id: 'q-mod-04-01',
    moduleId: 'mod-04-infraestructura-tpu-gpu-hypercomputer',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'El Director de Infraestructura de una empresa de investigación en IA evalúa migrar sus clústeres de supercómputo a Google Cloud para entrenar modelos fundacionales multimodales. Google Cloud propone su arquitectura "AI Hypercomputer". ¿Cuál es la definición conceptual y técnica precisa de AI Hypercomputer?',
    options: [
      {
        id: 'a',
        text: 'Un único servidor monolítico con 1,000 núcleos de CPU x86 conectados por cables de cobre estándar.',
        isCorrect: false,
        distractorRationale: 'Distractor de arquitectura de servidor clásica. Los modelos de IA modernos no se entrenan en servidores monolíticos de CPU tradicionales, sino en clústeres masivos de aceleradores especializados.'
      },
      {
        id: 'b',
        text: 'Un sistema integral de supercómputo co-diseñado que unifica hardware acelerador de alto rendimiento (TPUs/GPUs), almacenamiento optimizado para IA, redes de ultra bajo retardo (Jupiter con OCS) y software de orquestación abierto (JAX, PyTorch, Ray, Slurm y GKE).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. AI Hypercomputer es el enfoque de Google Cloud donde el silicio, el almacenamiento, la interconexión de red óptica y el software de orquestación están optimizados conjuntamente para eliminar cuellos de botella en entrenamiento e inferencia masiva.'
      },
      {
        id: 'c',
        text: 'Un emulador de software que simula chips de IA sobre máquinas virtuales básicas de bajo coste.',
        isCorrect: false,
        distractorRationale: 'Distractor técnico absurdo. La emulación por software no proporciona los FLOPS físicos ni el ancho de banda necesario para cargas de trabajo de IA a gran escala.'
      },
      {
        id: 'd',
        text: 'Un acuerdo comercial de licencias para utilizar software de hojas de cálculo en la nube.',
        isCorrect: false,
        distractorRationale: 'Distractor administrativo sin relación. AI Hypercomputer es una solución de infraestructura de hardware y sistemas distribuidos, no un paquete de ofimática.'
      }
    ],
    overallExplanation: 'Google Cloud AI Hypercomputer aborda la computación de IA como un sistema completo: hardware acelerador (TPU v5e/v5p, NVIDIA H100), red Jupiter de alta velocidad con conmutación óptica de circuitos (OCS), almacenamiento de alta tasa de transferencia (Cloud Storage FUSE, Parallelstore) y ecosistemas de software (JAX, PyTorch, GKE, Slurm).',
    examHeuristic: 'AI Hypercomputer = Co-diseño holístico: Silicio (TPU/GPU) + Redes OCS + Almacenamiento + Software/Orquestación.'
  },
  {
    id: 'q-mod-04-02',
    moduleId: 'mod-04-infraestructura-tpu-gpu-hypercomputer',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Un laboratorio de inteligencia artificial necesita tomar dos decisiones de infraestructura: primero, elegir el chip más económico y eficiente energéticamente para servir inferencia continua de modelos medianos a millones de usuarios; segundo, seleccionar el acelerador de máxima potencia de cálculo FLOPS y ancho de banda de interconexión (ICI) para el preentrenamiento masivo de un LLM de 500 mil millones de parámetros. ¿Qué combinación de Cloud TPUs de Google Cloud es la recomendada?',
    options: [
      {
        id: 'a',
        text: 'Cloud TPU v5e para la inferencia y entrenamiento eficiente de modelos medianos, y Cloud TPU v5p para el preentrenamiento a escala extrema del LLM masivo.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. TPU v5e (donde la "e" representa Efficiency) está diseñado para maximizar el rendimiento por dólar en inferencia y modelos medianos; TPU v5p (donde la "p" representa Performance) ofrece más del doble de FLOPS y la mayor densidad de red ICI para modelos gigantescos.'
      },
      {
        id: 'b',
        text: 'Cloud TPU v1 para el preentrenamiento masivo y Cloud TPU v5p para servir inferencia ligera.',
        isCorrect: false,
        distractorRationale: 'Distractor histórico obsoleto. TPU v1 fue lanzado en 2015 exclusivamente para inferencia en centros de datos internos de Google y no tiene capacidad para preentrenar LLMs modernos.'
      },
      {
        id: 'c',
        text: 'Cloud TPU v5p para ambas cargas obligatoriamente, ya que TPU v5e no admite inferencia de ningún tipo.',
        isCorrect: false,
        distractorRationale: 'Distractor técnico falso. TPU v5e fue diseñado específicamente con inferencia y entrenamiento costo-eficiente en mente, admitiendo pods de hasta 256 chips con excelente rentabilidad.'
      },
      {
        id: 'd',
        text: 'Desactivar los aceleradores y utilizar procesadores de teléfonos móviles conectados por Wi-Fi.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. Carece totalmente de sentido técnico para el entrenamiento o inferencia empresarial de modelos de lenguaje.'
      }
    ],
    overallExplanation: 'En el portafolio de silicio de Google Cloud: TPU v5e destaca en rentabilidad (cost-efficiency) para inferencia de alto rendimiento y entrenamiento mediano (hasta 256 chips en un pod). TPU v5p es el buque insignia de máximo rendimiento (performance), con hasta 8,960 chips en un único pod con interconexión óptica ICI de 4.8 Tbps para los modelos más avanzados.',
    examHeuristic: 'TPU v5e = Eficiencia de costes e Inferencia masiva. TPU v5p = Máximo rendimiento FLOPS para LLMs gigantes.'
  },
  {
    id: 'q-mod-04-03',
    moduleId: 'mod-04-infraestructura-tpu-gpu-hypercomputer',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Una startup de bioinformática ha desarrollado durante años un motor de plegamiento de proteínas escrito en C++ con extensiones propietarias fuertemente dependientes del ecosistema de controladores CUDA de NVIDIA. Al migrar a Google Cloud, el equipo necesita ejecutar este código de inmediato sin tener que reescribir sus algoritmos en JAX o PyTorch/XLA. ¿Qué acelerador de hardware en Google Cloud deben aprovisionar?',
    options: [
      {
        id: 'a',
        text: 'NVIDIA Cloud GPUs (como NVIDIA H100 o A100 Tensor Core GPUs).',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Las GPUs NVIDIA en Compute Engine y Vertex AI son totalmente compatibles con el stack nativo de software y controladores CUDA de NVIDIA, permitiendo ejecutar código propietario sin requerir refactorización a XLA o JAX.'
      },
      {
        id: 'b',
        text: 'Cloud TPU v4 Pods en modo multi-slice.',
        isCorrect: false,
        distractorRationale: 'Distractor de incompatibilidad de software. Las Cloud TPUs requieren el compilador XLA (a través de JAX, PyTorch/XLA o TensorFlow) y no ejecutan kernels de bajo nivel escritos directamente en CUDA de NVIDIA.'
      },
      {
        id: 'c',
        text: 'Servidores de almacenamiento Cloud Storage Nearline.',
        isCorrect: false,
        distractorRationale: 'Distractor de almacenamiento. Cloud Storage almacena objetos binarios estáticos; no procesa código ni dispone de chips aceleradores para computación.'
      },
      {
        id: 'd',
        text: 'Módulos de seguridad de hardware Cloud HSM.',
        isCorrect: false,
        distractorRationale: 'Distractor de seguridad criptográfica. Cloud HSM custodia claves criptográficas FIPS 140-2 Nivel 3, no ejecuta código de bioinformática ni modelos de IA.'
      }
    ],
    overallExplanation: 'La regla de decisión entre GPUs y TPUs en Google Cloud se basa tanto en la economía como en el ecosistema de software: si el equipo depende de kernels CUDA propietarios o bibliotecas de terceros fuertemente acopladas al silicio de NVIDIA, se seleccionan GPUs NVIDIA (H100, A100). Si el código está en frameworks como JAX, PyTorch o TensorFlow optimizables con XLA, las Cloud TPUs ofrecen una ventaja líder en rendimiento por dólar y escalabilidad.',
    examHeuristic: 'Dependencia estricta de CUDA / Código propietario NVIDIA ➔ Cloud GPUs (H100/A100). Frameworks abiertos (JAX/PyTorch/XLA) ➔ Cloud TPUs.'
  },
  {
    id: 'q-mod-04-04',
    moduleId: 'mod-04-infraestructura-tpu-gpu-hypercomputer',
    domainId: 'domain-2',
    type: 'multi',
    difficulty: 'advanced',
    prompt: 'Un equipo de ingeniería de plataformas en Google Cloud gestiona un clúster de Google Kubernetes Engine (GKE) utilizado por decenas de científicos de datos para entrenar modelos de IA distribuida. El equipo necesita optimizar el uso de los costosos aceleradores (TPUs y GPUs) y garantizar que los trabajos batch de gran envergadura no se queden sin recursos de forma desordenada. ¿Cuáles DOS características de GKE y del ecosistema de IA de Google Cloud resuelven directamente estos desafíos? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'GKE Kueue, un sistema de gestión y encolamiento inteligente de trabajos por lotes que admite prioridades, cuotas justas (fair-sharing) y préstamo de recursos de aceleradores entre equipos.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Kueue es el orquestador de colas nativo de Kubernetes co-desarrollado por Google para coordinar trabajos de entrenamiento de IA en clústeres multi-tenant de GKE sin colisiones de cuotas.'
      },
      {
        id: 'b',
        text: 'Soporte nativo en GKE para aprovisionar y escalar automáticamente cortes de TPU (TPU slices) y nodos con GPUs NVIDIA utilizando Node Auto-Provisioning.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. GKE integra controladores profundos para gestionar el ciclo de vida de pods de TPU multirebanada y clústeres de GPUs elásticas, aprovisionando nodos según la demanda exacta de los pods.'
      },
      {
        id: 'c',
        text: 'GKE elimina la necesidad de contenedores y compila el código en cintas magnéticas analógicas.',
        isCorrect: false,
        distractorRationale: 'Distractor de tecnología anacrónica. GKE es un orquestador moderno de contenedores OCI/Docker y opera sobre infraestructura de virtualización de vanguardia.'
      },
      {
        id: 'd',
        text: 'Desactivar el escalador automático de clúster para que todos los nodos queden encendidos al 100% las 24 horas del día sin importar si hay trabajos en cola.',
        isCorrect: false,
        distractorRationale: 'Distractor de despilfarro financiero. Mantener aceleradores costosos encendidos permanentemente sin uso genera gastos desmesurados en lugar de optimización.'
      },
      {
        id: 'e',
        text: 'Forzar a los científicos de datos a compartir una única máquina virtual básica sin tarjetas aceleradoras.',
        isCorrect: false,
        distractorRationale: 'Distractor inviable. Una máquina virtual sin aceleradores no puede satisfacer las necesidades de entrenamiento de IA distribuida de múltiples equipos.'
      }
    ],
    overallExplanation: 'Google Cloud lidera la orquestación de IA en contenedores mediante GKE: integra GKE Kueue para encolar y arbitrar el acceso equitativo a aceleradores costosos (GPUs/TPUs) y cuenta con Node Auto-Provisioning para escalar automáticamente la infraestructura de aceleradores cuando se envían trabajos distribuidos (con frameworks como Ray o PyTorch Job).',
    examHeuristic: 'Orquestación de aceleradores en GKE: GKE Kueue (gestión de colas batch multi-tenant) + Auto-escalado dinámico de TPU slices/GPUs.'
  },
  {
    id: 'q-mod-04-05',
    moduleId: 'mod-04-infraestructura-tpu-gpu-hypercomputer',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'advanced',
    prompt: 'Durante el preentrenamiento de un modelo de billones de parámetros que lleva tres semanas ejecutándose en miles de chips Cloud TPU, un conmutador de red o chip individual sufre una degradación de hardware. En centros de datos convencionales, esto obligaría a reiniciar todo el clúster perdiendo días de cómputo. ¿Qué innovación de red óptica implementada en la infraestructura Jupiter de Google Cloud permite aislar el nodo fallido y reconfigurar la topología de la red sin detener el entrenamiento?',
    options: [
      {
        id: 'a',
        text: 'Optical Circuit Switching (OCS) gestionado dinámicamente por software.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. La tecnología OCS (Conmutación Óptica de Circuitos) de Google permite redirigir haces de luz mediante micromirrors ópticos para reconfigurar la topología del clúster al vuelo, rodeando componentes defectuosos en segundos sin reiniciar la infraestructura.'
      },
      {
        id: 'b',
        text: 'Reemplazar manualmente los cables coaxiales de cobre mientras el clúster está energizado.',
        isCorrect: false,
        distractorRationale: 'Distractor de operaciones manuales. La intervención manual física no escala en supercomputadores de miles de nodos y provocaría caídas de enlace inaceptables.'
      },
      {
        id: 'c',
        text: 'Enviar las matrices de pesos a un servidor FTP público en la internet abierta.',
        isCorrect: false,
        distractorRationale: 'Distractor de vulnerabilidad extrema. Exfiltrar pesos por FTP público destruiría la propiedad intelectual y violaría todas las políticas de seguridad.'
      },
      {
        id: 'd',
        text: 'Aumentar la velocidad de los ventiladores de la sala de servidores para enfriar la red.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. La refrigeración por ventiladores no repara fallas de topología de red ni reconfigura la conmutación de paquetes.'
      }
    ],
    overallExplanation: 'Los conmutadores ópticos de circuito (OCS - Optical Circuit Switches) desarrollados por Google conectan los pods de TPU a través de haces de luz reflejados en espejos microscópicos. Esta tecnología permite modificar la topología de interconexión en tiempo real, garantizando resiliencia frente a fallos de hardware y facilitando el mantenimiento no disruptivo de supercómputo.',
    examHeuristic: 'Resiliencia y reconfiguración dinámica de red en supercómputo TPU ➔ OCS (Optical Circuit Switching) en red Jupiter.'
  },
  {
    id: 'q-mod-04-06',
    moduleId: 'mod-04-infraestructura-tpu-gpu-hypercomputer',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Un equipo de ciencia de datos que entrena un modelo de visión por computadora nota que las GPUs NVIDIA H100 permanecen ociosas el 45% del tiempo esperando que los terabytes de imágenes se descarguen desde Cloud Storage hacia la memoria de la máquina virtual. ¿Qué solución de almacenamiento y acceso a datos de Google Cloud está optimizada para eliminar este cuello de botella de I/O en pipelines de entrenamiento de IA?',
    options: [
      {
        id: 'a',
        text: 'Cloud Storage FUSE con almacenamiento en caché local habilitado en discos SSD NVMe locales.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Cloud Storage FUSE permite montar buckets de objetos como sistemas de archivos locales POSIX, y al activar el almacenamiento en caché en SSDs locales NVMe de ultra alta velocidad, los datos se entregan a la GPU al ritmo de lectura del bus PCIe sin retrasos de red.'
      },
      {
        id: 'b',
        text: 'Descargar manualmente los archivos uno a uno mediante la consola web de Google Cloud durante el entrenamiento.',
        isCorrect: false,
        distractorRationale: 'Distractor manual inviable. La descarga manual mediante navegador es imposible para terabytes de datos de entrenamiento continuo.'
      },
      {
        id: 'c',
        text: 'Almacenar todas las imágenes en Cloud Storage Archive para reducir el coste de almacenamiento.',
        isCorrect: false,
        distractorRationale: 'Distractor de peor rendimiento. Storage Archive está diseñado para datos históricos a los que se accede menos de una vez al año, con altas penalizaciones de latencia y costes de recuperación por lectura continua.'
      },
      {
        id: 'd',
        text: 'Imprimir las imágenes en papel y utilizar la cámara web del servidor para escanearlas.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo sin ningún sentido técnico en arquitectura de sistemas.'
      }
    ],
    overallExplanation: 'El cuello de botella de "hambre de datos" (I/O starvation) ocurre cuando los aceleradores modernos procesan tensores más rápido de lo que el almacenamiento puede entregarlos. Google Cloud Storage FUSE con caching de lectura local en SSDs permite transmitir datasets masivos a velocidad nativa de archivo POSIX, maximizando el aprovechamiento del hardware acelerador.',
    examHeuristic: 'Alto rendimiento de I/O para alimentar GPUs/TPUs desde Cloud Storage ➔ Cloud Storage FUSE + Caching en SSDs locales.'
  },
  {
    id: 'q-mod-04-07',
    moduleId: 'mod-04-infraestructura-tpu-gpu-hypercomputer',
    domainId: 'domain-2',
    type: 'multi',
    difficulty: 'intermediate',
    prompt: 'El Comité de Sostenibilidad y Responsabilidad Corporativa (ESG) de un conglomerado internacional exige evaluar el impacto ambiental del entrenamiento de grandes modelos de IA antes de aprobar el presupuesto cloud. ¿Cuáles DOS prácticas y ventajas de diseño de infraestructura de Google Cloud destacan en eficiencia energética y sostenibilidad para cargas de IA a gran escala? (Seleccione DOS opciones).',
    options: [
      {
        id: 'a',
        text: 'Uso pionero de refrigeración líquida directa al chip (direct-to-chip liquid cooling) en clústeres de Cloud TPU para disipar el calor eficientemente con mucho menor gasto energético que el aire acondicionado tradicional.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Google implementa refrigeración líquida directa sobre el silicio de sus Cloud TPUs desde hace varias generaciones, reduciendo drásticamente la energía necesaria para la climatización del centro de datos.'
      },
      {
        id: 'b',
        text: 'Centros de datos con métricas de PUE (Power Usage Effectiveness) líderes en la industria y el compromiso corporativo de operar con energía libre de carbono (Carbon-Free Energy - CFE) 24/7 para 2030.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. Google Cloud publica índices PUE promedio de ~1.10 (frente al promedio de la industria de ~1.5) y proporciona la herramienta Carbon Footprint para que los clientes midan y minimicen sus emisiones asociadas a cómputo de IA.'
      },
      {
        id: 'c',
        text: 'Google Cloud apaga completamente todos los servidores de centros de datos cuando el sol se oculta.',
        isCorrect: false,
        distractorRationale: 'Distractor absurdo. La nube opera de forma ininterrumpida las 24 horas del día, los 7 días de la semana, mediante contratos de energía eólica, solar y fuentes libres de carbono emparejadas por hora.'
      },
      {
        id: 'd',
        text: 'El entrenamiento de modelos en Google Cloud no consume electricidad porque funciona exclusivamente con energía geotérmica lunar.',
        isCorrect: false,
        distractorRationale: 'Distractor de ciencia ficción sin base científica ni tecnológica.'
      },
      {
        id: 'e',
        text: 'Google Cloud prohíbe el uso de métricas de medición energética en los proyectos de clientes.',
        isCorrect: false,
        distractorRationale: 'Distractor fáctico falso. Google Cloud provee de forma gratuita la suite Google Cloud Carbon Footprint integrada en la consola para auditar emisiones por servicio y región.'
      }
    ],
    overallExplanation: 'La infraestructura de IA de Google Cloud lidera la sostenibilidad global: refrigeración líquida directa al chip en sus pods de TPUs, centros de datos con PUE excepcional (~1.10) y la meta de operar con energía libre de carbono 24/7 en cada red eléctrica para 2030, permitiendo a los clientes entrenar IA con la menor huella de carbono del mercado.',
    examHeuristic: 'Sostenibilidad de IA en Google Cloud: Refrigeración líquida directa al chip en TPUs + PUE líder en centros de datos + CFE 24/7.'
  },
  {
    id: 'q-mod-04-08',
    moduleId: 'mod-04-infraestructura-tpu-gpu-hypercomputer',
    domainId: 'domain-2',
    type: 'single',
    difficulty: 'intermediate',
    prompt: 'Una empresa de retail necesita desplegar en producción cientos de microservicios de inferencia de visión artificial y modelos de generación de imágenes de catálogo (con Imagen y Stable Diffusion). Requieren aceleradores en Vertex AI Prediction que ofrezcan alta eficiencia energética, excelente soporte de instrucciones FP8/INT8 y el menor coste por hora posible para cargas de trabajo de inferencia continua. ¿Qué acelerador GPU de Google Cloud es el más adecuado?',
    options: [
      {
        id: 'a',
        text: 'NVIDIA L4 Tensor Core GPU.',
        isCorrect: true,
        distractorRationale: 'Opción correcta. La GPU NVIDIA L4 (basada en la arquitectura Ada Lovelace) es el acelerador universal de Google Cloud optimizado para inferencia eficiente, procesamiento de video y cargas generativas con un coste por hora y consumo eléctrico muy reducidos en comparación con H100.'
      },
      {
        id: 'b',
        text: 'NVIDIA H100 SXM5 conectada en pods de 256 aceleradores.',
        isCorrect: false,
        distractorRationale: 'Distractor de sobrecoste. H100 es una GPU de gama ultra alta diseñada para preentrenamiento a escala extrema y LLMs masivos, resultando innecesariamente costosa para inferencia visual estándar de bajo consumo.'
      },
      {
        id: 'c',
        text: 'Unidades de disquete magnético de 3.5 pulgadas con interfaz USB.',
        isCorrect: false,
        distractorRationale: 'Distractor de almacenamiento antiguo sin capacidad de cálculo numérico.'
      },
      {
        id: 'd',
        text: 'Servidores de Cloud Logging configurados en modo de retención de 30 días.',
        isCorrect: false,
        distractorRationale: 'Distractor de observabilidad. Cloud Logging almacena registros de eventos del sistema y no ejecuta modelos de inferencia visual.'
      }
    ],
    overallExplanation: 'NVIDIA L4 en Google Cloud es el caballo de batalla para inferencia de IA moderna: ofrece hasta 2.5 veces el rendimiento de inferencia de la generación anterior (T4) a una fracción del consumo de energía y coste de las GPUs de entrenamiento pesado como H100, siendo la opción predilecta para modelos de visión, audio y difusión en producción.',
    examHeuristic: 'Inferencia de visión/video y modelos generativos costo-eficiente ➔ NVIDIA L4 GPU.'
  }
];
