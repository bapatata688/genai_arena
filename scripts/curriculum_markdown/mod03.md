## 1. Fundamentos Teóricos y Modelo Conceptual / Arquitectónico

### El Ecosistema de Datos en la Era de la Inteligencia Artificial
La efectividad de cualquier sistema de inteligencia artificial descansa sobre la naturaleza y gobernanza de los datos subyacentes. Tradicionalmente, la arquitectura corporativa de información se estructuraba en silos según el grado de formalidad de los esquemas:

1. **Datos Estructurados:** Información organizada con esquemas relacionales predefinidos y tipos de datos estrictos (tablas SQL en Cloud SQL, Spanner, BigQuery, series temporales y hojas de cálculo). Históricamente han sido explotados mediante motores OLAP/OLTP tradicionales y modelos de Machine Learning clásico (regresiones, Gradient Boosted Trees). En Gen AI, los modelos fundacionales no reemplazan a estas bases de datos relacionales, sino que actúan como interfaces cognitivas de lenguaje natural (patrones Text-to-SQL o agentes analíticos).
2. **Datos Semiestructurados:** Registros que carecen de un esquema tabular rígido pero contienen etiquetas semánticas y jerarquías organizadas (documentos JSON, payloads XML, eventos Pub/Sub, archivos YAML, registros NoSQL en Firestore o Bigtable). Los LLMs procesan y generan datos semiestructurados con extraordinaria precisión gracias a directivas de salida estructurada (*structured outputs* con esquemas JSON nativos).
3. **Datos No Estructurados:** Representan más del **80% del patrimonio informativo** de cualquier organización (documentos PDF, transcripciones de llamadas de voz, grabaciones de video, imágenes de diagnóstico, correos electrónicos, contratos legales y repositorios de código). Estos datos son inherentemente ambiguos para los motores de bases de datos tradicionales, pero constituyen el dominio primario de valor donde los modelos generativos y los modelos de embedding despliegan su máxima capacidad analítica y extractiva.

### Espacios Vectoriales, Embeddings y Búsqueda de Similitud Semántica
Un modelo de lenguaje no puede realizar cálculos matemáticos directos sobre cadenas de texto arbitrarias. Para que los conceptos lingüísticos sean computables, se transforman en representaciones numéricas continuas mediante **modelos de embedding** (como la familia `text-embedding-004` de Google Cloud).

Un modelo de embedding proyecta un fragmento de texto arbitrario (una frase, un párrafo o un documento) en un vector denso de punto flotante en un espacio vectorial de alta dimensión:

$$\vec{v} \in \mathbb{R}^D \quad \text{donde típicamente } D \in \{768, 1536, 3072\}$$

La propiedad matemática cardinal de estos espacios latentes es que **la proximidad geométrica refleja la afinidad semántica**. Dos textos con significado equivalente pero redactados con palabras totalmente distintas (por ejemplo: *"guía de vacaciones pagadas"* y *"política de descanso remunerado anual"*) quedan mapeados en coordenadas hiperespaciales prácticamente idénticas.

#### Métricas de Similitud en el Espacio Latente:
- **Similitud Coseno:** Evalúa el coseno del ángulo formado entre dos vectores normalizados, ignorando su magnitud física absoluta. Es la métrica estándar para recuperación semántica de textos:
  $$\cos(\theta) = \frac{\vec{A} \cdot \vec{B}}{\|\vec{A}\| \|\vec{B}\|}$$
  Un valor de $1.0$ representa coincidencia semántica perfecta; $0.0$ indica ortogonalidad (temas independientes); y $-1.0$ refleja oposición diametral.
- **Producto Punto (Dot Product):** Multiplica componente a componente ambos vectores. Cuando los embeddings son previamente normalizados a norma unitaria ($\|\vec{v}\| = 1$), el producto punto equivale exactamente a la similitud coseno, ofreciendo una velocidad computacional superior al evitar divisiones en tiempo de ejecución.
- **Distancia Euclidiana ($L_2$):** Mide la longitud de la línea recta entre dos puntos en el espacio multidimensional. Cuanto menor sea la distancia $d(\vec{A}, \vec{B})$, mayor es la proximidad.

### El Algoritmo de Búsqueda de Vecinos Más Cercanos Aproximados (ANN)
Cuando una organización almacena millones o miles de millones de fragmentos vectorizados, calcular la distancia exhaustiva (fuerza bruta k-NN) contra cada vector del corpus demandaría segundos de latencia y un costo computacional prohibitivo. 

Para resolver este desafío a escala de producción, los sistemas modernos emplean algoritmos de **Vecinos Más Cercanos Aproximados (ANN - Approximate Nearest Neighbors)**. El algoritmo particiona y cuantiza el espacio vectorial de forma anticipada mediante estructuras de grafos jerárquicos o cuantización vectorial, sacrificando un porcentaje infinitesimal de precisión teórica (menos del 1-2%) a cambio de reducir la latencia de búsqueda de segundos a **milisegundos**.

### Criterios Multidimensionales para la Selección de Modelos
En la arquitectura de soluciones de Google Cloud, no existe un "modelo único universal". El arquitecto Staff debe seleccionar el modelo óptimo evaluando el triángulo de compromiso fundamental:

1. **Latencia y Nivel de Servicio (SLA):** Tareas en tiempo real que interactúan directamente con un usuario final (autocompletado, agentes de voz, clasificación de tickets) exigen modelos con un *Time-to-First-Token (TTFT)* inferior a 300 ms, como **Gemini 1.5 Flash**. Tareas por lotes o análisis estratégico asíncrono pueden tolerar latencias de varios segundos, habilitando el uso de **Gemini 1.5 Pro**.
2. **Costo por Millón de Tokens y Retorno de Inversión (TCO):** El costo de inferencia varía significativamente entre familias de modelos. Gemini 1.5 Flash ofrece precios por millón de tokens hasta un orden de magnitud más económicos que Gemini 1.5 Pro. Para tareas de alto volumen transaccional diario, sobredimensionar el modelo resulta en una inviabilidad financiera inmediata.
3. **Capacidad de Razonamiento Abstracto y Ventana de Contexto:** Tareas que demandan deducción lógica multi-paso, comprensión profunda de código fuente en múltiples lenguajes o análisis cruzado sobre expedientes de más de 500 páginas justifican plenamente la selección de **Gemini 1.5 Pro con su ventana de hasta 2 millones de tokens**.
4. **Soberanía, Privacidad y Despliegue en el Borde (Edge/On-Prem):** Si la política de la empresa prohíbe la salida de datos a la nube pública bajo regulaciones militares o de defensa extrema, la respuesta no es la API de Gemini, sino desplegar modelos de pesos abiertos de la familia **Gemma 2 (2B, 9B o 27B)** en clústeres propios de Google Kubernetes Engine (GKE) o dispositivos locales mediante ONNX/vLLM.

## 2. Modelos Mentales Visuales en Diagramas ASCII / Unicode

```text
┌────────────────────────────────────────────────────────────────────┐
│      ESPACIO VECTORIAL LATENTE Y SIMILITUD COSENO DE EMBEDDINGS    │
├────────────────────────────────────────────────────────────────────┤
│ Eje Semántico Y (Finanzas)                                         │
│        ▲                                                           │
│        │                                                           │
│        │         • [Vector A: "Préstamo Hipotecario Tasa Fija"]    │
│        │        /                                                  │
│        │       / θ (Ángulo muy pequeño -> cos(θ) ≈ 0.94)           │
│        │      /                                                    │
│        │     • [Vector B: "Crédito de Vivienda Interés Constante"] │
│        │                                                           │
│        │                                                           │
│        │                                                           │
│        │                        • [Vector C: "Receta de Cocina"]   │
│        │                           (Ángulo cercano a 90° ->        │
│        │                            cos(θ) ≈ 0.05, Ortogonal)      │
│        └────────────────────────────────────────────────────────►  │
│                                           Eje Semántico X (Hogar)  │
└────────────────────────────────────────────────────────────────────┘
```

```text
┌────────────────────────────────────────────────────────────────────┐
│      MATRIZ MULTIDIMENSIONAL DE SELECCIÓN DE MODELOS GOOGLE CLOUD  │
├──────────────────┬─────────────────┬────────────────┬──────────────┤
│ Modelo           │ Latencia / TTFT │ Costo Relativo │ Capacidad de │
│                  │                 │ por Token      │ Razonamiento │
├──────────────────┼─────────────────┼────────────────┼──────────────┤
│ Gemini 1.5 Flash │ Ultra Baja      │ Muy Económico  │ Media-Alta   │
│ (Multimodal)     │ (< 300 ms)      │ ($)            │ (General)    │
├──────────────────┼─────────────────┼────────────────┼──────────────┤
│ Gemini 1.5 Pro   │ Media-Baja      │ Moderado       │ Estado del   │
│ (2M Contexto)    │ (1s - 4s)       │ ($$)           │ Arte (SOTA)  │
├──────────────────┼─────────────────┼────────────────┼──────────────┤
│ Gemma 2 (2B/9B)  │ Determinada por │ Costo Fijo por │ Alta en Borde│
│ (Pesos Abiertos) │ hardware local  │ instancia VM   │ / On-Premise │
├──────────────────┼─────────────────┼────────────────┼──────────────┤
│ BigQuery ML /    │ En lotes / SQL  │ Muy Bajo       │ Predictiva   │
│ AutoML Tabular   │ transaccional   │ ($)            │ Clásica      │
└──────────────────┴─────────────────┴────────────────┴──────────────┘
```

```text
┌────────────────────────────────────────────────────────────────────┐
│       FLUJO DE EMBEDDING, INDEXACIÓN Y BÚSQUEDA VECTORIAL ANN      │
├────────────────────────────────────────────────────────────────────┤
│ Ingesta: Documentos PDF Corporativos en Cloud Storage              │
│                               │                                    │
│                               ▼                                    │
│ [Fragmentación Semántica / Chunking: 500 tokens con 10% overlap]   │
│                               │                                    │
│                               ▼                                    │
│ [Modelo text-embedding-004: Inferencia en Vertex AI]               │
│                               │                                    │
│                               ▼ Vector denso: [0.021, -0.154, ...] │
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ VERTEX AI VECTOR SEARCH (Motor de Búsqueda ANN con ScaNN)      │ │
│ │  • Cuantización Vectorial Anisotrópica en Memoria RAM          │ │
│ │  • Indexación de miles de millones de vectores en milisegundos │ │
│ └────────────────────────────────┬───────────────────────────────┘ │
│                                  │                                 │
│ Consulta del Usuario ────────────┘                                 │
│ "Cobertura de maternidad" ──► Similitud Coseno ──► Chunks Top-K    │
└────────────────────────────────────────────────────────────────────┘
```

## 3. Internos del Ecosistema Google Cloud (Under the Hood)

### El Motor de Búsqueda Vectorial ScaNN en Vertex AI Vector Search
**Vertex AI Vector Search** (anteriormente conocido como *Vertex Matching Engine*) es la base de datos vectorial administrada de ultra alto rendimiento desarrollada por Google Cloud. No utiliza librerías genéricas de código abierto (como FAISS básico o HNSW estándar); en su núcleo opera **ScaNN (Scalable Nearest Neighbors)**, una innovación de Google Research galardonada internacionalmente:

- **Cuantización Vectorial Anisotrópica (*Anisotropic Vector Quantization*):** A diferencia de la cuantización estándar que penaliza por igual cualquier error de distancia euclidiana, la cuantización anisotrópica penaliza específicamente los errores de cuantización que alteran el *producto interno* en la dirección paralela a los vectores originales. Esto preserva con exactitud el ordenamiento de los candidatos más relevantes incluso tras comprimir drásticamente los vectores en memoria.
- **Rendimiento a Escala Masiva:** Puede buscar entre más de mil millones de vectores de 768 dimensiones con una latencia percentil 95 (**p95**) de menos de **2 a 5 milisegundos**, sosteniendo una precisión de recuperación (*recall*) superior al 95%.
- **Filtrado Concurrente con Metadatos:** Permite asociar metadatos estructurados (como `id_empresa`, `departamento`, `nivel_confidencialidad` o `año_fiscal`) a cada vector denso, aplicando filtros booleanos en memoria antes de evaluar la similitud semántica sin degradar la latencia.

### Especialización de Tareas con `text-embedding-004`
El modelo de embeddings insignia de Google Cloud, `text-embedding-004`, introduce un parámetro arquitectónico clave denominado **`task_type`**. En lugar de generar un vector genérico ciego, el modelo adapta sus pesos de atención en función del propósito funcional de la operación:

1. `RETRIEVAL_DOCUMENT`: Optimiza el vector para representar un fragmento de texto estático almacenado en la base de conocimientos.
2. `RETRIEVAL_QUERY`: Optimiza el vector para representar una consulta concisa formulada por un usuario final. Mapear la consulta y el documento con tipos de tarea complementarios maximiza drásticamente la precisión del ordenamiento semántico.
3. `SEMANTIC_SIMILARITY`: Diseñado para comparar la equivalencia de dos textos independientes (ej. deduplicación de tickets).
4. `CLASSIFICATION`: Estructura los vectores para facilitar la separación de clases lineales en modelos predictivos tradicionales downstream.
5. `CLUSTERING`: Optimiza la cohesión intra-grupo para tareas de agrupación no supervisada.

## 4. Patrones de Producción y Casos de Uso Empresariales (Architect Idioms)

### Patrón 1: Enrutamiento Semántico Jerárquico (Tiered Cascading / Model Gateway)
- **Problema de Negocio:** Una institución financiera recibe 2 millones de consultas conversacionales al día en su aplicación móvil. El 80% son preguntas directas y de baja complejidad (ej. consulta de saldo, ubicación de sucursales o estado de transferencias), mientras que el 20% involucra reclamos complejos con interpretación de políticas crediticias. Enviar todas las consultas a Gemini 1.5 Pro generaría un sobrecosto de más de $150,000 USD mensuales; enviar todo a un modelo básico provocaría respuestas erróneas en los casos difíciles.
- **Herramientas de Google Cloud:** Cloud Run, Gemini 1.5 Flash, Gemini 1.5 Pro, Cloud Trace.
- **Flujo Arquitectónico:**
  1. La consulta del cliente ingresa a un microservicio liviano desplegado en Cloud Run que actúa como *Model Gateway*.
  2. Gemini 1.5 Flash evalúa en menos de 100 milisegundos la complejidad y clasificación de la intención del usuario.
  3. Si la intención es rutinaria, Gemini 1.5 Flash genera la respuesta final de forma autónoma.
  4. Si detecta disputas complejas, terminología jurídica o incertidumbre semántica, escala transparentemente la consulta completa hacia Gemini 1.5 Pro.
- **Trade-offs:**
  - *Ventajas:* Reduce la factura global de tokens en un 72% y asegura tiempos de respuesta sub-segundo para la vasta mayoría de usuarios finales.
  - *Desventajas:* Añade una llamada inicial de inferencia para los casos complejos, sumando aproximadamente 100 ms a la latencia total de esa fracción de peticiones.

### Patrón 2: Búsqueda Semántica a Escala con Embeddings y ScaNN en Vertex AI Vector Search
- **Problema de Negocio:** Una firma multinacional de auditoría jurídica necesita indexar más de 50 millones de resoluciones jurisprudenciales y dictámenes fiscales para permitir que sus asociados encuentren precedentes legales pertinentes a partir de descripciones conceptuales en lenguaje natural, garantizando latencias inferiores a 200 ms.
- **Herramientas de Google Cloud:** `text-embedding-004`, Vertex AI Vector Search (algoritmo ScaNN), Cloud Storage, BigQuery.
- **Flujo Arquitectónico:**
  1. Los fallos judiciales se procesan en lotes mediante una tubería de Cloud Dataflow que invoca `text-embedding-004` con `task_type: "RETRIEVAL_DOCUMENT"`.
  2. Los vectores densos generados se indexan en **Vertex AI Vector Search** con cuantización anisotrópica ScaNN y metadatos de año y tribunal.
  3. Cuando el abogado formula una consulta, un microservicio genera el embedding de la pregunta con `task_type: "RETRIEVAL_QUERY"`, ejecuta una búsqueda ANN en Vector Search filtrando por jurisdicción y devuelve los 10 precedentes más análogos en menos de 10 milisegundos.
- **Trade-offs:**
  - *Ventajas:* Capacidad de búsqueda instantánea sobre decenas de millones de registros sin fallar por discrepancias de vocabulario literal.
  - *Desventajas:* Requiere recomputar y sincronizar embeddings cuando se actualizan o modifican sustancialmente los documentos indexados.

### Patrón 3: Interfaz de Lenguaje Natural a Datos Estructurados (Text-to-SQL con BigQuery)
- **Problema de Negocio:** Los directores regionales de ventas de una cadena minorista necesitan formular preguntas complejas sobre inventarios y facturación diaria en BigQuery (ej. *"¿Cuáles fueron los tres productos con mayor margen en la región norte durante el último trimestre comparado con el anterior?"*) sin depender de analistas de BI dedicados para escribir consultas SQL.
- **Herramientas de Google Cloud:** Gemini 1.5 Pro en Vertex AI, BigQuery (`INFORMATION_SCHEMA`), Cloud IAM, Cloud Run.
- **Flujo Arquitectónico:**
  1. El usuario introduce su requerimiento en lenguaje natural en el portal ejecutivo.
  2. Cloud Run inyecta en el prompt de Gemini 1.5 Pro el esquema DDL formal de las vistas autorizadas de BigQuery junto con directivas de sistema de solo lectura y 3 ejemplos canónicos de consultas previas (few-shot).
  3. Gemini 1.5 Pro genera la consulta SQL dialecto GoogleSQL válida; el backend valida que la sentencia comience estrictamente con `SELECT` (bloqueando cualquier operación `INSERT`, `UPDATE` o `DROP`) y la ejecuta en BigQuery bajo una cuenta de servicio de privilegios mínimos.
  4. Los datos tabulares resultantes se remiten al modelo para formatear un resumen ejecutivo explicativo con viñetas claras.
- **Trade-offs:**
  - *Ventajas:* Democratiza el acceso al almacén de datos empresarial con cero esfuerzo manual de programación para los directores.
  - *Desventajas:* Requiere limitar estrictamente las cuotas de procesamiento de bytes en BigQuery para evitar consultas accidentales que escaneen tablas de petabytes sin particionamiento.

### Patrón 4: Deduplicación y Agrupamiento Semántico de Catálogos Masivos en BigQuery con Vertex AI Embeddings
- **Problema de Negocio:** Una plataforma de comercio electrónico fusiona los catálogos de cuatro empresas adquiridas, acumulando más de 10 millones de publicaciones de productos con descripciones desordenadas y títulos heterogéneos que generan duplicados masivos y canibalización de precios.
- **Herramientas de Google Cloud:** BigQuery ML (función `ML.GENERATE_EMBEDDING`), Vertex AI `text-embedding-004`, BigQuery K-Means Clustering.
- **Flujo Arquitectónico:**
  1. Los títulos y descripciones de productos almacenados en BigQuery se procesan directamente mediante SQL invocando la función nativa `ML.GENERATE_EMBEDDING` conectada al endpoint de `text-embedding-004` en Vertex AI.
  2. Los vectores resultantes de 768 dimensiones se almacenan en una columna de tipo `ARRAY<FLOAT64>` dentro de la propia tabla de BigQuery.
  3. Se ejecuta un modelo de agrupamiento `CREATE MODEL ... OPTIONS(model_type='kmeans')` sobre las representaciones vectoriales para consolidar automáticamente variantes del mismo producto bajo un único identificador maestro sin intervención manual.
- **Trade-offs:**
  - *Ventajas:* Ejecución 100% serverless dentro de la infraestructura analítica de BigQuery sin extraer datos hacia servidores externos de Python.
  - *Desventajas:* Costo de inferencia inicial por la generación masiva de embeddings sobre la totalidad del catálogo existente.

## 5. Antipatrones Reales de Adopción y Escenarios de Falla (Root Cause Analysis)

### ❌ Antipatrón 1: Búsqueda Semántica Mediante Similitud Léxica de Palabras Clave (Regex / LIKE)
- 🔍 **Por qué falla:** Los desarrolladores intentan implementar asistentes corporativos sobre bases de datos SQL relacionales utilizando búsquedas de cadenas tradicionales (`WHERE documento LIKE '%renuncia%'` o índices de texto invertidos tipo BM25/Lucene puro). Este enfoque falla estrepitosamente ante la polisemia y sinonimia del lenguaje natural: si el usuario busca *"abandono voluntario del puesto"*, *"dimisión"* o *"rescisión de contrato por mutuo acuerdo"*, la consulta arroja cero coincidencias, generando frustración en el usuario y reportes de "sistema defectuoso".
- ✅ **Arquitectura Correcta:** Transformar el corpus a representaciones vectoriales densas con **Vertex AI Embeddings (`text-embedding-004`)** y ejecutar búsquedas por similitud semántica en **Vertex AI Vector Search**. Si se requiere preservar también la precisión de términos exactos (ej. números de parte o códigos de error específicos), implementar una **búsqueda híbrida** (híbrido denso-vectorial + léxico disperso) administrada en **Vertex AI Search**.

### ❌ Antipatrón 2: Inyectar Volcados Masivos de Tablas Relacionales Directamente en el Contexto del LLM
- 🔍 **Por qué falla:** Al intentar responder preguntas financieras sobre un almacén de datos corporativo, el equipo de ingeniería extrae cientos de miles de filas tabulares en formato CSV o JSON crudo y las pega íntegras en el prompt de Gemini aprovechando su ventana de contexto de 2M tokens. Esta arquitectura genera tres fallas críticas:
  1. Los LLMs son procesadores de patrones lingüísticos probabilísticos, no motores matemáticos relacionales; al calcular sumatorias o promedios sobre miles de líneas sufren de imprecisiones numéricas y alucinaciones estadísticas.
  2. El costo por consulta se multiplica desproporcionadamente al procesar millones de tokens de entrada en cada interacción.
  3. La latencia se degrada sustancialmente al requerir un escaneo atencional masivo innecesario.
- ✅ **Arquitectura Correcta:** Aplicar el patrón **Text-to-SQL**. El modelo fundacional debe recibir únicamente el **esquema semántico y DDL de la base de datos** para traducir la pregunta del usuario a una consulta analítica SQL dialecto BigQuery. La ejecución matemática exacta y agregación masiva se delega al motor columnar de **BigQuery**, devolviendo al LLM únicamente la fila consolidada final (ej. 3 números) para su redacción ejecutiva.

### ❌ Antipatrón 3: Seleccionar Modelos Exclusivamente por Tamaño Bruto sin Considerar Latencia ni TCO
- 🔍 **Por qué falla:** Asignar por defecto el modelo más potente del catálogo (Gemini 1.5 Pro) a la totalidad de las llamadas del sistema de la empresa bajo el supuesto simplista de que "siempre entregará mejores resultados". En flujos transaccionales de alta frecuencia (como extraer números telefónicos de correos entrantes, clasificar tickets de atención o transcribir intenciones de un menú IVR), el modelo grande eleva la latencia de 200 ms a más de 3 segundos y encarece la factura mensual de tokens en cientos de miles de dólares, provocando el colapso del presupuesto operativo y cuellos de botella de concurrencia.
- ✅ **Arquitectura Correcta:** Diseñar una arquitectura desacoplada basada en una **matriz de selección estricta**:
  - Utilizar **Gemini 1.5 Flash** para tareas de alta concurrencia, extracción estructurada, clasificación y enriquecimiento en tiempo real.
  - Reservar **Gemini 1.5 Pro** exclusivamente para tareas que requieran razonamiento abstracto profundo, resolución de ambigüedad jurídica, análisis de código complejo o ventanas masivas de millones de tokens.
  - Utilizar **modelos predictivos clásicos (BigQuery ML / AutoML)** cuando el problema consista en predecir un valor numérico o una probabilidad tabular a partir de datos estructurados.

## 6. Heurísticas Avanzadas y Trampas del Examen (Google Cloud Exam Playbook)

### Heurísticas de Decisión Rápida
- 💡 **Regla de Oro 1:** Si una pregunta exige "clasificar millones de comentarios de clientes diariamente con el menor costo por millón de tokens y latencia inferior a medio segundo", la respuesta correcta es **Gemini 1.5 Flash**.
- 💡 **Regla de Oro 2:** Si el caso requiere "buscar documentos por su significado conceptual tolerando sinónimos y lenguaje coloquial sobre miles de millones de vectores", la solución es **Vertex AI Vector Search con el algoritmo ScaNN**.
- 💡 **Regla de Oro 3:** Para "predecir la probabilidad de fraude en transacciones financieras sobre tablas estructuradas de BigQuery", no recomiendes un LLM; la herramienta canónica de Google Cloud es **BigQuery ML o AutoML Tabular**.
- 💡 **Regla de Oro 4:** Cuando configures `text-embedding-004` para un sistema de recuperación documental, asegúrate de asignar `task_type: "RETRIEVAL_DOCUMENT"` a los fragmentos indexados y `task_type: "RETRIEVAL_QUERY"` a las preguntas de los usuarios.

### Trampas Clásicas del Examen
- ⚠️ **Trampa de Examen:** Opciones que propongan "realizar Fine-Tuning de Gemini para que aprenda a calcular la suma de ingresos de una tabla de 10 millones de filas". Los LLMs no deben aprender datos estáticos vía fine-tuning ni deben usarse para calcular agregaciones tabulares masivas; la respuesta correcta siempre conecta el LLM con **BigQuery mediante Text-to-SQL**.
- ⚠️ **Trampa de Examen:** Asumir que la búsqueda vectorial reemplaza por completo a las bases de datos relacionales. Vector Search es un índice de proximidad semántica para datos no estructurados; las transacciones financieras y la consistencia ACID requieren almacenes relacionales como **AlloyDB, Spanner o Cloud SQL**.
- ⚠️ **Trampa de Examen:** Confundir similitud léxica con similitud semántica. Si el escenario menciona que los usuarios "no encuentran información porque usan términos diferentes a los del manual", descarta opciones que sugieran añadir índices LIKE o expresiones regulares en Cloud SQL; la solución exige **embeddings y búsqueda semántica en Vertex AI**.
