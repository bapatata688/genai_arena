## 1. Fundamentos Teóricos y Modelo Conceptual / Arquitectónico

### El Desafío Físico del Cómputo de Inteligencia Artificial
El entrenamiento y servicio de inferencia de modelos fundacionales contemporáneos (cuyos parámetros oscilan entre decenas de miles de millones y más de un billón de conexiones sinápticas) representa la carga computacional más demandante en la historia de la informática. 

Las Unidades Centrales de Procesamiento (**CPUs**) de propósito general, diseñadas para ejecutar flujos de control secuenciales complejos con instrucciones ramificadas y jerarquías profundas de memoria caché, resultan físicamente inadecuadas para estas tareas. El cálculo de atención y las capas feed-forward de las redes neuronales consisten esencialmente en **multiplicaciones y acumulaciones matriciales densas (operaciones GEMM - General Matrix Multiply)**, las cuales son masivamente paralelizables por naturaleza.

Para superar los límites de la Ley de Moore y el estrangulamiento térmico de Dennard, la industria cloud adoptó dos arquitecturas de procesamiento acelerado:

1. **Unidades de Procesamiento Gráfico (GPUs):** Originalmente desarrolladas para renderizado vectorial en 3D, fueron reconvertidas para cálculo científico e IA gracias a miles de núcleos SIMD (Single Instruction, Multiple Data) y aceleradores matriciales dedicados (Tensor Cores en GPUs NVIDIA como A100 y H100). Su fortaleza reside en un ecosistema maduro de software propietario (NVIDIA CUDA) y una versatilidad extrema para múltiples tipos de cargas científicas.
2. **Circuitos Integrados de Aplicación Específica (ASICs - TPUs de Google):** Diseñados desde el nivel de silicio por Google exclusivamente para multiplicar tensores con el menor consumo de vatios y el mayor rendimiento por dólar. Las **Unidades de Procesamiento Tensorial (TPU - Tensor Processing Units)** prescinden de circuitos superfluos de gráficos o control general, implementando **Matrices de Multiplicación Sistólica (MXU - Systolic Arrays)** donde los datos fluyen bidireccionalmente a través de una cuadrícula física de unidades aritméticas sin necesidad de leer y escribir repetidamente en registros intermedios, reduciendo drásticamente la latencia de memoria.

### Precisión Aritmética Reducida: De FP32 a bfloat16, int8 y FP8
Tradicionalmente, el cómputo científico operaba en precisión simple de punto flotante de 32 bits (**FP32**). Sin embargo, en el entrenamiento de redes neuronales, se descubrió que los gradientes son notablemente tolerantes al ruido numérico y no demandan la resolución extrema de 32 bits para converger con éxito.

Google revolucionó el hardware de IA al estandarizar el formato **bfloat16 (Brain Floating Point)**:
- Mientras que FP16 convencional reducía tanto el exponente como la mantisa (provocando desbordamientos por debajo o arriba del rango representable: *underflow* y *overflow*), bfloat16 mantiene exactamente el mismo rango dinámico de 8 bits de exponente que FP32, reduciendo únicamente la mantisa a 7 bits.
- Esto permite sustituir FP32 por bfloat16 de manera directa sin requerir ajustes manuales de escalamiento de pérdidas (*loss scaling*), duplicando el rendimiento aritmético y reduciendo a la mitad el tráfico sobre la memoria HBM.
- En fases de inferencia optimizada, silicios como TPU v5e y GPU H100 soportan formatos de cuantización aún más agresivos: **int8 y FP8**, cuadruplicando el throughput y reduciendo el consumo energético en más de un 60%.

### El Portafolio de Silicio Acelerador en Google Cloud
Google Cloud ofrece un portafolio complementario de aceleradores de hardware, permitiendo al arquitecto seleccionar la opción exacta para sus requerimientos técnicos y presupuestarios:

```text
┌────────────────────────────────────────────────────────────────────┐
│      PORTAFOLIO DE SILICIO ACELERADOR DE IA EN GOOGLE CLOUD        │
├──────────────┬──────────────────┬─────────────────┬────────────────┤
│ Acelerador   │ Especialización  │ Rendimiento /   │ Topología Máx. │
│              │ Primaria         │ Perfil Económico│ por Clúster    │
├──────────────┼──────────────────┼─────────────────┼──────────────┤
│ Google Cloud │ Inferencia Efic. │ Hasta 2.5x mejor│ Pods de hasta  │
│ TPU v5e      │ y Fine-Tuning    │ costo/dólar     │ 256 chips con  │
│ (Lite)       │ Medio (LLMs/Gen) │ que TPU v4 ($)  │ interconexión  │
├──────────────┼──────────────────┼─────────────────┼──────────────┤
│ Google Cloud │ Pre-entrenamient.│ Máximo TFLOPS   │ Pods de hasta  │
│ TPU v5p      │ y Modelos Base   │ por chip (459   │ 8,960 chips con│
│ (Performance)│ Masivos (MoE)    │ TFLOPS bfloat16)│ red óptica ICI │
├──────────────┼──────────────────┼─────────────────┼──────────────┤
│ NVIDIA H100  │ Ecosistema CUDA, │ Rendimiento     │ Clústeres GKE  │
│ (80GB HBM3)  │ frameworks no XLA│ extremo en stack│ con GPUDirect  │
│              │ y modelos código │ NVIDIA ($$$)    │ RoCE/Titanium  │
├──────────────┼──────────────────┼─────────────────┼──────────────┤
│ NVIDIA A100  │ Cargas mixtas de │ Excelente ratio │ Clústeres GKE  │
│ (40GB/80GB)  │ ML tradicional,  │ rendimiento/    │ con soporte    │
│              │ inferencia y CV  │ versatilidad    │ Multi-Instance │
└──────────────┴──────────────────┴─────────────────┴──────────────┘
```

### La Filosofía del Google AI Hypercomputer
A escala de decenas de miles de aceleradores, el hardware de silicio aislado representa menos de la mitad de la ecuación de rendimiento. Si un clúster no puede transferir gradientes entre chips a velocidades de terabits o si el almacenamiento satura la entrada/salida (*I/O bottleneck*), los chips más caros permanecen ociosos esperando datos.

El **Google AI Hypercomputer** es una arquitectura integrada a nivel de sistemas compuesta por cuatro pilares sinérgicos:
1. **Silicio Acelerador:** Selección flexible entre familias TPU v4, v5e, v5p y GPUs NVIDIA A100/H100/B200.
2. **Redes Ópticas y Descarga de Red Titanium:** Red física basada en conmutadores de circuitos ópticos (**OCS - Optical Circuit Switches**) y tejido de ultra-ancho de banda **Jupiter**, complementado por tarjetas inteligentes de descarga **Titanium** que liberan al CPU del procesamiento de red y almacenamiento.
3. **Almacenamiento de Alto Rendimiento:** Sistemas de archivos distribuidos optimizados para ingesta continua de datos de entrenamiento: **Cloud Storage FUSE** con almacenamiento en caché local sobre unidades SSD NVMe efímeras, y **Filestore Multishare** para acceso concurrente con latencias sub-milisegundo.
4. **Software Abierto y Compiladores Optimizados:** Soporte nativo para frameworks líderes (JAX, PyTorch, TensorFlow) a través del compilador **XLA (Accelerated Linear Algebra)**, orquestados en contenedores sobre **Google Kubernetes Engine (GKE)** mediante gestores de colas avanzadas como Kueue y Ray.

## 2. Modelos Mentales Visuales en Diagramas ASCII / Unicode

```text
┌────────────────────────────────────────────────────────────────────┐
│          ARQUITECTURA INTEGRAL DEL GOOGLE AI HYPERCOMPUTER         │
├────────────────────────────────────────────────────────────────────┤
│ PILAR 4: SOFTWARE Y FRAMEWORKS ABIERTOS                            │
│  • Compilador XLA (Fusión de kernels matriciales en memoria)       │
│  • JAX, PyTorch/XLA, HuggingFace, vLLM, MaxEngine                  │
│  • Orquestación GKE: Kueue (Colas elásticas), Ray Core en GKE     │
├────────────────────────────────────────────────────────────────────┤
│ PILAR 3: ALMACENAMIENTO DE ULTRA-ALTO RENDIMIENTO                  │
│  • Cloud Storage FUSE con Caching en SSDs Locales NVMe             │
│  • Filestore Multishare (Sistemas NFS paralelos de alta velocidad) │
├────────────────────────────────────────────────────────────────────┤
│ PILAR 2: INTERCONEXIÓN ÓPTICA Y DESCARGA DE RED                    │
│  • Optical Circuit Switches (OCS): Conmutación por espejos piezoel.│
│  • Titanium Network Adapters: Cero sobrecarga de CPU en red        │
│  • Red Óptica Jupiter Fabric sin sobresuscripción                  │
├────────────────────────────────────────────────────────────────────┤
│ PILAR 1: SILICIO ACELERADOR DE VANGUARDIA                          │
│  ┌───────────────────────┐ ┌───────────────────────┐ ┌───────────┐ │
│  │ TPU v5e (Costo-Efic.) │ │ TPU v5p (Supercómputo)│ │ NV H100   │ │
│  └───────────────────────┘ └───────────────────────┘ └───────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

```text
┌────────────────────────────────────────────────────────────────────┐
│      TOPOLOGÍA TOROIDAL 3D Y CONMUTACIÓN ÓPTICA OCS EN TPU PODS    │
├────────────────────────────────────────────────────────────────────┤
│ Cada cubo representa un nodo de 4 chips TPU conectados por ICI     │
│                                                                    │
│         ┌───────────┐ ICI Óptico ┌───────────┐                     │
│        /           /│ ═════════►/           /│                     │
│       ┌───────────┐ │          ┌───────────┐ │                     │
│       │  TPU v5p  │ │          │  TPU v5p  │ │                     │
│       │  Nodo A   │─┼──────────│  Nodo B   │─┼──────────┐          │
│       │           │/           │           │/           │          │
│       └───────────┘            └───────────┘            │          │
│             │                        │                  ▼          │
│             │ Interconexión por      │       ┌───────────────────┐ │
│             ▼ Fibras Ópticas Directas▼       │ CONMUTADOR OCS    │ │
│       ┌────────────────────────────────────┐ │ (Reconfigura      │ │
│       │ TEJIDO ÓPTICO JUPITER (OCS)        │ │  topología en ms  │ │
│       │ Espejos microscópicos reconfiguran │ │  si falla un nodo │ │
│       │ haces de luz sin cuellos de botella│ │  sin parar el pod)│ │
│       └────────────────────────────────────┘ └───────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

```text
┌────────────────────────────────────────────────────────────────────┐
│      DYNAMIC WORKLOAD SCHEDULER (DWS): FLEX START vs CALENDAR      │
├────────────────────────────────────────────────────────────────────┤
│ MODO CONVENCIONAL SOBRE-DEMANDA:                                   │
│  • Se solicita capacidad TPU/GPU inmediata.                        │
│  • Si no hay cupo instantáneo, la solicitud es rechazada. Costo 100│
│                                                                    │
│ MODO FLEX START (DYNAMIC WORKLOAD SCHEDULER):                      │
│  • Se define una ventana de espera (ej. "iniciar en próx. 7 días").│
│  • Google Cloud asigna automáticamente los nodos en valles nocturn.│
│  • Garantiza ejecución completa sin interrupciones. Ahorro de $$$. │
│                                                                    │
│ MODO CALENDAR:                                                     │
│  • Reserva capacidad programada para fechas futuras exactas.       │
│  • Ideal para ventanas de entrega de modelos previas a lanzamientos│
└────────────────────────────────────────────────────────────────────┘
```

## 3. Internos del Ecosistema Google Cloud (Under the Hood)

### Conmutadores de Circuitos Ópticos (OCS) y Resiliencia en Clústeres Masivos
En los supercomputadores convencionales para IA basados en redes Ethernet o InfiniBand, la interconexión entre switches de red requiere convertir continuamente señales ópticas que viajan por fibra de vidrio en señales eléctricas para su conmutación digital en chips transceptores, volviéndolas a convertir en señales ópticas. Este ciclo óptico-electrónico-óptico (**O-E-O**) introduce latencia, genera fallos mecánicos y consume megavatios de energía eléctrica.

Google Cloud patentó una arquitectura basada en **Optical Circuit Switches (OCS)** en sus pods de TPU:
- En lugar de conversión electrónica, el conmutador dirige físicamente los haces de luz en el espacio libre mediante una matriz de cientos de **espejos microscópicos móviles gobernados por actuadores piezoeléctricos**.
- Cuando un haz de luz láser ingresa desde una fibra óptica de un chip TPU, un micro-espejo se orienta con precisión nanométrica para reflejar directamente el rayo hacia la fibra óptica de destino.
- Si un chip TPU individual o un rack sufre un desperfecto físico tras 48 horas de cómputo ininterrumpido, el plano de control del OCS reconfigura los espejos en milisegundos para aislar dinámicamente el nodo averiado y suturar la topología de red toroidal 3D circundante, permitiendo que los 8,000+ aceleradores restantes **continúen entrenando sin reiniciar el clúster ni perder el estado del cálculo**.

### El Compilador XLA: Fusión de Operaciones en Silicio
El framework de software no ejecuta instrucciones Python directamente sobre las TPUs. El motor fundamental es **XLA (Accelerated Linear Algebra)**, un compilador de grafos de dominio específico:
- En frameworks tradicionales sin compilación, una operación matemática como $y = \text{ReLU}(W \cdot x + b)$ ejecuta tres pasos secuenciales: multiplica $W \cdot x$ y escribe el resultado intermedio en la memoria DRAM; lee el resultado intermedio, suma $b$ y vuelve a escribir en DRAM; lee nuevamente y aplica la función no lineal de activación $\text{ReLU}$. Esto satura el bus de memoria.
- XLA ejecuta **Kernel Fusion**: compila las tres operaciones matemáticas en un único núcleo de ejecución fusionado que se descarga directamente a las unidades sistólicas de la TPU. El cálculo se resuelve en los registros internos del procesador en un único ciclo de reloj sin accesos redundantes a memoria externa, incrementando la velocidad neta entre un 40% y un 200%.

### Aprovisionamiento Elástico con Dynamic Workload Scheduler (DWS)
El aprovisionamiento de clústeres masivos de GPU H100 y TPU v5p presenta problemas de disponibilidad intermitente en centros de datos debido a la demanda global. Google Cloud introdujo **Dynamic Workload Scheduler (DWS)** en Compute Engine y Vertex AI:
- **Flex Start:** Permite a los clientes encolar trabajos de entrenamiento o ajuste fino por lotes estableciendo una ventana máxima de espera (de horas a días) y una duración de ejecución fija. El orquestador global de Google asigna automáticamente los nodos en cuanto se desocupa un bloque contiguo de aceleradores (por ejemplo, durante la noche o al finalizar la carga de otro cliente), garantizando que el trabajo no sufrirá desalojos (*no preemption*) una vez iniciado y aplicando descuentos financieros sustanciales.

## 4. Patrones de Producción y Casos de Uso Empresariales (Architect Idioms)

### Patrón 1: Inferencia Rentable y Altamente Escalable con TPU v5e en GKE
- **Problema de Negocio:** Una plataforma de tecnología financiera necesita servir inferencias en tiempo real de modelos Gemma 2 27B y adaptadores LoRA para evaluar solicitudes de microcréditos con concurrencias pico de 10,000 transacciones por minuto, requiriendo un costo de infraestructura 40% menor al de instancias GPU tradicionales.
- **Herramientas de Google Cloud:** Google Kubernetes Engine (GKE), Node Pools de TPU v5e (Lite/Economy), compilador XLA, MaxEngine / vLLM, Cloud Monitoring.
- **Flujo Arquitectónico:**
  1. Se aprovisiona un clúster de GKE con un pool de nodos elástico compuesto por máquinas con silicio **TPU v5e**.
  2. Los modelos abiertos Gemma 2 se empaquetan en contenedores OCI utilizando el motor de inferencia optimizado **MaxEngine**, el cual integra optimizaciones nativas de XLA para TPU.
  3. El Horizontal Pod Autoscaler (HPA) de GKE monitorea la longitud de la cola de solicitudes y escala el número de pods de TPU de forma elástica, desactivando nodos durante los periodos nocturnos para reducir el gasto de cómputo a cero.
- **Trade-offs:**
  - *Ventajas:* Entrega la mejor relación de rendimiento por dólar del mercado para inferencia de modelos medianos y adaptación LoRA.
  - *Desventajas:* Requiere empaquetar y validar las dependencias en contenedores compatibles con XLA y el runtime de TPU.

### Patrón 2: Programación de Ajuste Fino Masivo por Lotes con Dynamic Workload Scheduler (Flex Start)
- **Problema de Negocio:** Una compañía de entretenimiento digital genera semanalmente nuevas recomendaciones personalizadas ajustando modelos de lenguaje sobre historiales de visualización de millones de usuarios. El entrenamiento no es urgente y puede completarse en cualquier momento durante el fin de semana.
- **Herramientas de Google Cloud:** Vertex AI Custom Training, Dynamic Workload Scheduler (DWS) en modo Flex Start, Cloud Storage, TPU v5e / TPU v5p.
- **Flujo Arquitectónico:**
  1. La canalización semanal de Cloud Composer prepara el dataset curado y lo almacena en Cloud Storage.
  2. En lugar de solicitar instancias TPU de entrega inmediata a tarifa plena, el job de entrenamiento se envía a Vertex AI configurando **Dynamic Workload Scheduler con Flex Start** y una ventana de tolerancia de 36 horas.
  3. El scheduler de Google Cloud asigna automáticamente una partición de TPU v5e durante un valle de demanda en el centro de datos, ejecuta el reentrenamiento en 4 horas sin riesgo de interrupción y libera los recursos al concluir.
- **Trade-offs:**
  - *Ventajas:* Reduce los costos presupuestarios de cómputo en hasta un 40% frente a instancias dedicadas sobre-demanda.
  - *Desventajas:* El inicio del procesamiento no es determinista en el tiempo; no es apto para incidentes en caliente o SLAs de negocio que exijan ejecución inmediata.

### Patrón 3: Pipeline de Entrenamiento Extremo sin Cuellos de Botella de I/O con Cloud Storage FUSE y Red Jupiter
- **Problema de Negocio:** Un laboratorio farmacéutico internacional entrena un modelo fundacional multimodal para predicción de plegamiento de proteínas analizando 15 terabytes de imágenes microscópicas y estructuras moleculares distribuidas en 20 millones de archivos pequeños en Cloud Storage. El clúster de aceleradores sufre de inanición de datos (*starvation*), operando a menos del 30% de capacidad porque el CPU pasa la mayor parte del tiempo descargando archivos.
- **Herramientas de Google Cloud:** Google AI Hypercomputer en GKE, Cloud Storage FUSE con almacenamiento en caché local SSD NVMe, Red Jupiter, TPU v5p.
- **Flujo Arquitectónico:**
  1. Los datos moleculares residen centralizados en Google Cloud Storage.
  2. En el clúster de GKE sobre AI Hypercomputer, los pods de TPU v5p montan el bucket directamente en el sistema de archivos Linux mediante el controlador CSI de **Cloud Storage FUSE**.
  3. Se habilita el almacenamiento en caché local sobre los discos SSD locales de alta velocidad acoplados al nodo físico. Tras la primera lectura a través del tejido de 400 Gbps de la red **Jupiter**, los datos quedan cacheados localmente en el nodo, permitiendo que las siguientes épocas de entrenamiento alcancen un 98% de saturación continua de las unidades sistólicas de las TPUs.
- **Trade-offs:**
  - *Ventajas:* Erradica por completo el tiempo de inactividad de los aceleradores por transferencia de archivos sin necesidad de replicar manualmente terabytes en discos persistentes costosos.
  - *Desventajas:* Requiere reservar espacio de almacenamiento efímero en SSDs locales para la memoria caché.

### Patrón 4: Orquestación de Cargas Heterogéneas GPU/TPU con Kueue y Ray en GKE
- **Problema de Negocio:** Una corporación automotriz cuenta con diversos equipos de IA: un equipo de visión computacional que utiliza librerías propietarias de CUDA sobre GPUs NVIDIA H100, y un equipo de procesamiento de lenguaje natural que optimiza LLMs sobre Google TPUs. Administrar dos infraestructuras aisladas genera silos y desperdicio presupuestario.
- **Herramientas de Google Cloud:** Google Kubernetes Engine (GKE), Kueue (gestor de colas de batch), Ray en Vertex AI / GKE, GPUs NVIDIA H100, TPUs v5e.
- **Flujo Arquitectónico:**
  1. Se consolida un clúster unificado de GKE gobernado por **Kueue**, el controlador de código abierto de Kubernetes diseñado para la gestión de colas de trabajos por lotes de IA.
  2. Los científicos de datos envían sus scripts utilizando el framework distribuido **Ray**.
  3. Kueue analiza las especificaciones del trabajo: si el contenedor requiere bibliotecas de CUDA, lo enruta a la cola de nodos con **NVIDIA H100**; si el script está escrito en JAX o PyTorch/XLA, lo asigna a la cola de **TPU v5e**, maximizando la utilización promedio de ambos aceleradores al 90%+.
- **Trade-offs:**
  - *Ventajas:* Gobernanza centralizada de todo el presupuesto de cómputo de la empresa, compartiendo cuotas elásticas entre departamentos.
  - *Desventajas:* Mayor complejidad de administración de clústeres y monitoreo en GKE.

## 5. Antipatrones Reales de Adopción y Escenarios de Falla (Root Cause Analysis)

### ❌ Antipatrón 1: Alquilar Instancias de GPU de Última Generación para Inferencia Ligera
- 🔍 **Por qué falla:** Mantener clústeres de máquinas virtuales en Compute Engine con aceleradores de máxima gama (como NVIDIA H100 o TPU v5p) encendidos 24 horas al día, 7 días a la semana, para atender un chatbot corporativo que recibe 20 consultas por minuto en promedio. Debido a la baja concurrencia, los aceleradores operan a menos del 3% de su capacidad aritmética real, generando una factura fija de más de $25,000 USD mensuales de infraestructura ociosa que no aporta valor al negocio.
- ✅ **Arquitectura Correcta:** Para cargas de inferencia con demanda variable, consumir directamente las **APIs administradas y serverless de Gemini en Vertex AI**, donde se factura exclusivamente por volumen de tokens procesados y la infraestructura escala elásticamente a cero cuando no hay tráfico. Si por requisitos de privacidad o soberanía se exige servir un modelo abierto propio (ej. Gemma 2), desplegarlo en **Cloud Run o GKE con TPU v5e** activando autoescalado horizontal de pods.

### ❌ Antipatrón 2: Entrenar Modelos en Aceleradores Monolíticos sin Estrategia de Checkpointing Distribuido en Red Óptica
- 🔍 **Por qué falla:** Equipos de ingeniería lanzan un trabajo de pre-entrenamiento o fine-tuning masivo de 5 días de duración en un clúster de decenas de nodos aceleradores sin instrumentar una estrategia asíncrona de puntos de control (*checkpoints*). Tras 92 horas de cómputo continuo, un corte de fibra o una anomalía térmica en un rack interrumpe el proceso; al no existir checkpoints intermedios guardados fuera del nodo, todo el cómputo previo se destruye, desperdiciando cientos de miles de dólares en presupuesto irrecuperable.
- ✅ **Arquitectura Correcta:** Diseñar las cargas de entrenamiento sobre la arquitectura **AI Hypercomputer en GKE**. Instrumentar guardado periódico y asíncrono de *checkpoints* en **Google Cloud Storage** utilizando Cloud Storage FUSE con transferencias multihilo que no congelen el ciclo de entrenamiento, complementado con la resiliencia nativa de los **conmutadores OCS** que permiten reconectar la topología de red sin detener el resto del clúster ante fallos locales.

### ❌ Antipatrón 3: Confundir TPU v5e (Inferencia/PEFT) con TPU v5p (Pre-entrenamiento de Vanguardia)
- 🔍 **Por qué falla:** Los equipos de infraestructura seleccionan variantes de silicio basándose únicamente en la marca "TPU" sin comprender su especialización arquitectónica. Aprovisionar pods de **TPU v5p** de máximo rendimiento para tareas rutinarias de inferencia o ajuste fino de adaptadores LoRA multiplica innecesariamente el costo por hora por un factor de 3x a 4x. Por el contrario, intentar pre-entrenar un modelo fundacional de cientos de miles de millones de parámetros con Mixture-of-Experts en clústeres de **TPU v5e** provoca cuellos de botella severos debido al menor ancho de banda de memoria (HBM) y a los límites de interconexión física entre chips.
- ✅ **Arquitectura Correcta:** Segmentar estrictamente la política de silicio de la organización:
  - Asignar **TPU v5e** como el acelerador estándar para **inferencia en producción**, evaluación de modelos y **ajuste fino eficiente (PEFT / LoRA)**, priorizando el rendimiento por dólar.
  - Reservar **TPU v5p** exclusivamente para iniciativas de **pre-entrenamiento masivo**, entrenamiento de modelos de frontera desde cero o fine-tuning completo (*Full Fine-Tuning*) de modelos con más de 70B de parámetros.

## 6. Heurísticas Avanzadas y Trampas del Examen (Google Cloud Exam Playbook)

### Heurísticas de Decisión Rápida
- 💡 **Regla de Oro 1:** Si una pregunta del examen plantea "maximizar el rendimiento por dólar en cargas de inferencia o ajuste fino eficiente (PEFT) de modelos abiertos como Gemma", la opción correcta es **Google Cloud TPU v5e**.
- 💡 **Regla de Oro 2:** Si el escenario exige "máximo rendimiento aritmético por chip y escalabilidad en pods de miles de aceleradores para pre-entrenamiento de modelos fundacionales masivos", la respuesta es **Google Cloud TPU v5p**.
- 💡 **Regla de Oro 3:** Si la empresa ya cuenta con una base de código fuertemente dependiente de librerías propietarias de **NVIDIA CUDA** o extensiones C++ que no pueden migrarse fácilmente al compilador XLA, la infraestructura recomendada son las **GPUs NVIDIA (A100 / H100) en GKE o Compute Engine**.
- 💡 **Regla de Oro 4:** Para "reducir los costos de cómputo en trabajos de entrenamiento por lotes que pueden ejecutarse de manera asíncrona dentro de una ventana de varios días", la técnica es **Dynamic Workload Scheduler (DWS) en modo Flex Start**.

### Trampas Clásicas del Examen
- ⚠️ **Trampa de Examen:** Asumir que las TPUs de Google son siempre más caras que las GPUs. Las TPUs v5e fueron concebidas específicamente para abaratar drásticamente los costos de inferencia y ajuste fino, superando habitualmente a las GPUs equivalentes en métricas de coste/rendimiento.
- ⚠️ **Trampa de Examen:** Opciones que sugieran utilizar CPUs tradicionales para entrenar modelos de lenguaje grandes. Las CPUs pueden servir inferencia ultraligera en escenarios muy restringidos, pero el examen penaliza cualquier arquitectura que proponga entrenamiento de LLMs en CPUs.
- ⚠️ **Trampa de Examen:** Confundir la función de los conmutadores ópticos (OCS). Los OCS no aumentan la memoria RAM de los chips; su propósito exclusivo es reconfigurar dinámicamente la **topología de red física óptica (ICI)** para aislar aceleradores defectuosos sin reiniciar el entrenamiento del pod completo.
