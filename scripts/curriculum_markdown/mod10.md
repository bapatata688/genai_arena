## 1. Fundamentos Teóricos y Modelo Conceptual / Arquitectónico

### Los 7 Principios de IA Responsable de Google
La adopción de la Inteligencia Artificial a escala empresarial trasciende las consideraciones de velocidad y costo; exige un compromiso inquebrantable con la ética, la equidad algorítmica y la seguridad humana. En 2018, Google fue pionera en la industria tecnológica global al publicar sus **Principios de IA Responsable (Responsible AI Principles)**, un marco de gobernanza obligatorio que rige el diseño, desarrollo, evaluación y comercialización de cada modelo y producto de inteligencia artificial en Google Cloud:

1. **Ser Socialmente Beneficiosa:** El desarrollo de la IA debe considerar el impacto holístico en la sociedad, ponderando factores económicos, culturales y medioambientales, y priorizando iniciativas que resuelvan desafíos globales sustantivos (salud, clima, productividad).
2. **Evitar Crear o Reforzar Sesgos Injustos:** Los modelos deben evaluarse y calibrarse sistemáticamente para prevenir que reflejen o amplifiquen sesgos históricos perjudiciales basados en raza, género, nacionalidad, orientación sexual, religión o capacidades físicas.
3. **Ser Construida y Probada para la Seguridad:** La arquitectura debe diseñarse bajo principios de defensa en profundidad, aplicando pruebas de resistencia rigurosas (*adversarial testing* y ejercicios de *Red Teaming*) para evitar comportamientos imprevistos o fallas catastróficas.
4. **Ser Responsable ante las Personas (Rendición de Cuentas Humana):** La IA debe operar bajo la supervisión humana (*Human-in-the-Loop*). Las decisiones automatizadas de alto impacto deben proporcionar mecanismos de explicación transparente, auditoría y canales formales de apelación humana.
5. **Incorporar Principios de Privacidad desde el Diseño:** Respeto absoluto a la soberanía de los datos, garantizando consentimiento informado, arquitecturas de anonimización y salvaguardas criptográficas que prevengan la exfiltración de información sensible.
6. **Mantener Altos Estándares de Excelencia Científica:** El rigor metodológico, la validación empírica y la colaboración con la comunidad científica abierta guían la investigación tecnológica.
7. **Estar Disponible para Usos Conformes a Estos Principios:** Limitar la comercialización y despliegue exclusivamente a aplicaciones alineadas con estos preceptos éticos.

#### Las 4 Aplicaciones Prohibidas que Google NUNCA Desarrollará:
Para brindar certidumbre ética y jurídica absoluta, Google definió cuatro "líneas rojas" innegociables donde **prohíbe expresamente el desarrollo o comercialización de tecnologías de IA**:
1. Tecnologías que causen o puedan causar **daño generalizado** o injustificado a personas.
2. **Armas u otras tecnologías** cuyo propósito primario o implementación directa sea causar lesiones, incapacitación o muerte de seres humanos.
3. Tecnologías de recopilación de información destinadas a la **vigilancia masiva que viole normas y tratados internacionales** de derechos humanos.
4. Tecnologías cuyo propósito o efecto directo sea **violar los principios ampliamente aceptados del derecho internacional** y los derechos humanos fundamentales.

### El Marco de IA Segura de Google (SAIF - Secure AI Framework)
A medida que los modelos de lenguaje se integran con bases de datos corporativas y herramientas transaccionales, se convierten en vectores de ataque para nuevas amenazas cibernéticas específicas de IA (inyecciones de prompts directas e indirectas, envenenamiento de datos de entrenamiento, alucinaciones adversariales y extracción de pesos de modelos).

Inspirado en marcos consolidados de ciberseguridad como el marco del NIST, Google publicó el **Secure AI Framework (SAIF)**, estructurado en seis pilares fundamentales:
1. **Expandir las Bases de Ciberseguridad Tradicionales:** Proteger los clústeres de IA aplicando higiene rigurosa de infraestructura (parcheo de vulnerabilidades, segmentación de red con VPC-SC, cifrado CMEK y autenticación de privilegios mínimos con Cloud IAM).
2. **Desarrollar Capacidades de Detección y Respuesta Adaptadas a IA:** Monitorear telemetría contextual para identificar anomalías en prompts y patrones de exfiltración de datos en tiempo real mediante Cloud Monitoring y Security Command Center.
3. **Automatizar Defensas para Mitigar Amenazas a la Velocidad de la Máquina:** Incorporar salvaguardas automatizadas que neutralicen intentos de *Prompt Injection* antes de que el token sea procesado por el modelo.
4. **Armonizar la Seguridad de la Plataforma:** Estandarizar controles de seguridad a lo largo de toda la organización para evitar configuraciones erróneas en silos departamentales.
5. **Adaptar los Controles a los Procesos de Negocio:** Diseñar la seguridad como un facilitador de la agilidad corporativa, sin imponer fricciones innecesarias a la innovación.
6. **Contextualizar los Riesgos en las Cargas de Trabajo de IA:** Modelar amenazas específicas considerando la sensibilidad de los datos y el nivel de autonomía transaccional otorgado a los agentes.

### Soberanía y Privacidad de Datos: El Compromiso de Cero Retención
El pilar jurídico de Google Cloud establece un compromiso contractual transparente:
- **Tus Datos son Tuyos:** Los prompts, los documentos de contexto, el código fuente y las respuestas generadas en **Vertex AI** y **Gemini for Google Workspace** **NUNCA se utilizan para entrenar los modelos públicos de Google**.
- **Zero Data Retention (ZDR):** En servicios de inferencia calificados, los datos de la solicitud residen únicamente en memoria RAM volátil durante el tiempo milimétrico que toma calcular los tokens de salida, purgándose inmediatamente al concluir la respuesta.
- **Aislamiento Criptográfico:** Cada cliente opera dentro de su propio tenant lógico aislado, con soporte para perímetros de red **VPC Service Controls** y cifrado mediante claves gestionadas por el cliente (**CMEK**) en Cloud KMS.

### La Doble Indemnización de Propiedad Intelectual (IP Indemnification)
Para eliminar el riesgo de incertidumbre legal que frena la adopción en juntas directivas, Google Cloud implementó una **política pionera de indemnización de propiedad intelectual en dos niveles**:

1. **Nivel 1: Indemnización por Datos de Entrenamiento (Training Data Indemnification):**
   - Protege legal y financieramente al cliente ante demandas de terceros que aleguen que los modelos fundacionales de Google (familia Gemini, Imagen, etc.) fueron entrenados utilizando material protegido por derechos de autor sin autorización.
2. **Nivel 2: Indemnización por Salida Generada (Generated Output Indemnification):**
   - Protege al cliente si un tercero lo demanda alegando que el texto, imagen o código generado por los servicios cubiertos de Google Cloud infringe sus derechos de autor.
   - *Condición de Aplicación de Buena Fe:* La indemnización aplica plenamente siempre que el cliente utilice los **filtros de seguridad nativos** de la plataforma y no intente de forma deliberada generar contenido idéntico para plagiar una obra preexistente mediante inyecciones adversariales.

## 2. Modelos Mentales Visuales en Diagramas ASCII / Unicode

```text
┌────────────────────────────────────────────────────────────────────┐
│      MARCO SAIF: DEFENSA EN PROFUNDIDAD PARA SISTEMAS DE IA        │
├────────────────────────────────────────────────────────────────────┤
│ 1. HIGIENE DE RED Y PRIVACIDAD DE DATOS (Capa Base)                │
│    • Perímetro VPC Service Controls (Cero fuga hacia Internet)     │
│    • Enmascaramiento de PII con Sensitive Data Protection (DLP)    │
│    • Cifrado en reposo con Cloud KMS (Claves del Cliente - CMEK)   │
├────────────────────────────────────────────────────────────────────┤
│ 2. CONTROL DE ENTRADA Y SANITIZACIÓN DE PROMPTS                    │
│    • Detección automatizada de Prompt Injection Directo e Indirecto│
│    • Reglas de inspección de capa de aplicación con Cloud Armor    │
├────────────────────────────────────────────────────────────────────┤
│ 3. INFERENCIA AISLADA Y FILTROS DE SEGURIDAD (Vertex AI)           │
│    • Filtros de Daño: Acoso, Odio, Contenido Sexual, Peligroso     │
│    • Atributos de Seguridad: Umbrales configurables (Block Some)   │
│    • Compromiso Contractual: CERO uso de datos para entrenar       │
├────────────────────────────────────────────────────────────────────┤
│ 4. TRAZABILIDAD Y COBERTURA LEGAL                                  │
│    • Marcas de agua invisibles SynthID (Procedencia verificable)   │
│    • Política de Doble Indemnización de Derechos de Autor (PI)     │
└────────────────────────────────────────────────────────────────────┘
```

```text
┌────────────────────────────────────────────────────────────────────┐
│      LOS 7 PRINCIPIOS DE IA RESPONSABLE vs 4 PROHIBICIONES         │
├────────────────────────────────────┬───────────────────────────────┤
│ 7 PRINCIPIOS DE IA RESPONSABLE     │ 4 APLICACIONES PROHIBIDAS     │
├────────────────────────────────────┼───────────────────────────────┤
│ 1. Socialmente beneficiosa         │ 1. Tecnologías que causen     │
│ 2. Evitar sesgos injustos          │    daño generalizado          │
│ 3. Construida para la seguridad    │ 2. Armas o daño físico        │
│ 4. Responsable ante las personas   │    directo a personas         │
│ 5. Privacidad desde el diseño      │ 3. Vigilancia masiva contraria│
│ 6. Excelencia científica           │    a normas internacionales   │
│ 7. Usos conformes a principios     │ 4. Violación del derecho      │
│                                    │    internacional o DDHH       │
└────────────────────────────────────┴───────────────────────────────┘
```

```text
┌────────────────────────────────────────────────────────────────────┐
│      POLÍTICA DE DOBLE INDEMNIZACIÓN DE DERECHOS DE AUTOR (IP)     │
├────────────────────────────────────────────────────────────────────┤
│ NIVEL 1: DATOS DE ENTRENAMIENTO (TRAINING DATA INDEMNIFICATION)    │
│  • Cobertura: Demandas que aleguen que Google usó material con     │
│    copyright para pre-entrenar los modelos fundacionales.          │
│  • Protección: Google asume la defensa legal y responsabilidades.  │
│                                                                    │
│ NIVEL 2: SALIDA GENERADA (GENERATED OUTPUT INDEMNIFICATION)        │
│  • Cobertura: Demandas que aleguen que el texto o imagen generado  │
│    por el cliente en Gemini/Imagen infringe derechos de autor.     │
│  • Condición: Uso responsable sin desactivar filtros ni buscar     │
│    plagiar obras deliberadamente mediante inyecciones.             │
└────────────────────────────────────────────────────────────────────┘
```

## 3. Internos del Ecosistema Google Cloud (Under the Hood)

### Atributos de Seguridad y Filtros de Daño en Vertex AI
Cada invocación a los modelos Gemini e Imagen en Vertex AI transita obligatoriamente por una capa especializada de evaluación de seguridad previa a la entrega de la respuesta:

- **Cuatro Categorías de Daño:**
  1. *Hate Speech (Incitación al Odio):* Contenido discriminatorio por identidad, origen o creencias.
  2. *Harassment (Acoso):* Contenido intimidatorio, denigratorio o persecutorio.
  3. *Sexually Explicit (Contenido Sexualmente Explícito):* Material pornográfico o no apto.
  4. *Dangerous Content (Contenido Peligroso):* Instrucciones para fabricar explosivos, cometer delitos, autolesiones o vulnerar sistemas cibernéticos.
- **Cuatro Umbrales Configurables de Bloqueo:**
  - `BLOCK_NONE`: No bloquea ningún contenido en esa categoría (requiere aprobación especial para análisis forense o ciberseguridad).
  - `BLOCK_FEW`: Bloquea únicamente contenido de probabilidad y severidad sumamente altas.
  - `BLOCK_SOME` (Estándar por Defecto): Bloquea contenido con probabilidad media o alta de daño.
  - `BLOCK_MOST`: Política ultra-estricta orientada a aplicaciones infantiles o de máxima sensibilidad.
- **Metadatos de Auditoría:** Si una consulta es bloqueada, la API no arroja un error 500; devuelve un código `finish_reason: "SAFETY"` acompañado de la estructura `safetyRatings` detallando la probabilidad y severidad calculada en cada categoría.

### Marcas de Agua Digitales con SynthID
Para garantizar la trazabilidad de contenidos sintéticos y combatir la desinformación digital, Google Cloud desarrolló **SynthID**:
- En modelos visuales (**Imagen 3**), SynthID incrusta una marca de agua digital matemática imperceptible para el ojo humano directamente en los coeficientes de frecuencia del espacio latente durante el proceso inverso de difusión.
- La marca de agua sobrevive a transformaciones destructivas comunes como compresión agresiva JPEG, recortes de encuadre, escalado, cambios de contraste o filtros de color.
- Permite a las organizaciones verificar con certeza matemática la autenticidad y procedencia de cualquier activo visual generado por su plataforma, satisfaciendo directivas internacionales de procedencia de contenidos (como los estándares C2PA).

## 4. Patrones de Producción y Casos de Uso Empresariales (Architect Idioms)

### Patrón 1: Sanitización y Enmascaramiento de PII con Sensitive Data Protection (Cloud DLP)
- **Problema de Negocio:** Una aseguradora de salud atiende reclamos médicos a través de un asistente en Vertex AI. La regulación HIPAA y las leyes locales de protección de datos personales prohíben estrictamente que nombres de pacientes, números de seguridad social o historiales clínicos identificables sean expuestos en sistemas no segregados.
- **Herramientas de Google Cloud:** Sensitive Data Protection (Cloud DLP), Cloud Run, Cloud Pub/Sub, Gemini en Vertex AI.
- **Flujo Arquitectónico:**
  1. El cliente envía la descripción del reclamo médico a una pasarela en Cloud Run.
  2. Antes de invocar a Gemini, Cloud Run transmite el texto crudo a la API de **Sensitive Data Protection (Cloud DLP)**.
  3. Cloud DLP inspecciona el texto mediante detectores de infotipos (*infoTypes*) predefinidos y reemplaza los datos personales por tokens criptográficos reversibles de sustitución: *"El paciente [PERSON_NAME_1] con seguro [ID_POLICY_1] presentó fractura..."*.
  4. El texto anonimizado se remite a Gemini 1.5 Flash para clasificar la cobertura médica.
  5. Cloud Run re-identifica los campos necesarios al enviar la confirmación final al paciente, manteniendo los logs de auditoría 100% despersonalizados.
- **Trade-offs:**
  - *Ventajas:* Cumplimiento total de regulaciones internacionales de privacidad y prevención absoluta de fugas de datos identificables.
  - *Desventajas:* Añade una latencia de procesamiento de 30 a 60 milisegundos previa a la llamada de inferencia.

### Patrón 2: Aprobación Humana (Human-in-the-Loop) para Respuestas de Alto Impacto Financiero o Clínico
- **Problema de Negocio:** Un sistema automatizado en una entidad bancaria analiza solicitudes de refinanciamiento de deuda hipotecaria. Aunque el modelo fundacional razona con alta precisión, emitir un rechazo crediticio formal o perdonar intereses sin supervisión humana viola las normativas de la comisión bancaria.
- **Herramientas de Google Cloud:** Vertex AI Agent Builder, Cloud Tasks, Cloud Run, BigQuery, Cloud Audit Logs.
- **Flujo Arquitectónico:**
  1. El agente en Vertex AI procesa el expediente financiero y genera una recomendación preliminar estructurada con su debida justificación.
  2. El backend evalúa la criticidad de la acción: si implica una condonación mayor a $5,000 USD, **no envía la respuesta al cliente final**.
  3. El caso se encola automáticamente en **Cloud Tasks** y se presenta en la consola de trabajo de un oficial de crédito colegiado.
  4. El oficial revisa el borrador del modelo, lo aprueba o modifica, y firma electrónicamente la decisión. La acción se registra inmutablemente en **Cloud Audit Logs** y se notifica al usuario.
- **Trade-offs:**
  - *Ventajas:* Cumplimiento estricto de la exigencia de responsabilidad humana de los Principios de IA de Google y eliminación de riesgos legales por decisiones automatizadas.
  - *Desventajas:* El tiempo de entrega de la respuesta queda supeditado a la disponibilidad del especialista humano.

### Patrón 3: Blindaje Perimetral SAIF contra Inyección de Prompts y Exfiltración de Datos
- **Problema de Negocio:** Una corporación del sector defensa implementa una base de conocimientos técnica sobre Vertex AI. Actores maliciosos intentan ejecutar inyecciones de prompts indirectas introduciendo instrucciones ocultas en documentos subidos para forzar al modelo a enviar datos confidenciales a servidores externos.
- **Herramientas de Google Cloud:** VPC Service Controls, Cloud Armor, Vertex AI Safety Filters, Security Command Center.
- **Flujo Arquitectónico:**
  1. Todo el entorno de Vertex AI y Cloud Storage se confina dentro de un perímetro seguro de **VPC Service Controls**.
  2. Se prohíbe todo el tráfico hacia la Internet pública; las conexiones se encauzan mediante **Private Service Connect**.
  3. Las peticiones externas transitan por **Cloud Armor** con reglas de inspección profunda para descartar patrones comunes de inyección de prompts y caracteres de escape maliciosos.
  4. Las respuestas generadas por Gemini se evalúan contra los **Safety Filters** en Vertex AI; ante cualquier intento de fuga de tokens o comportamiento anómalo, se dispara un incidente en **Security Command Center**.
- **Trade-offs:**
  - *Ventajas:* Seguridad multicapa de grado militar conforme a los seis pilares de SAIF, previniendo exfiltración de información clasificada.
  - *Desventajas:* Mayor rigidez y complejidad en la configuración de redes y reglas de acceso privado.

### Patrón 4: Aplicación y Cumplimiento de Cláusulas de Indemnización de Propiedad Intelectual con SynthID
- **Problema de Negocio:** Una agencia global de publicidad utiliza Imagen 3 y Gemini en Vertex AI para generar activos publicitarios de marcas de consumo masivo, requiriendo certeza jurídica de que sus clientes estarán protegidos legalmente ante demandas por presunta infracción de derechos de autor.
- **Herramientas de Google Cloud:** Vertex AI Model Garden, Imagen 3, Gemini 1.5 Pro, SynthID, Cloud Logging.
- **Flujo Arquitectónico:**
  1. El equipo de arquitectura establece una política formal que restringe la generación de contenidos comerciales exclusivamente a modelos calificados para indemnización en **Vertex AI Model Garden** (Gemini e Imagen 3).
  2. El pipeline activa la incrustación mandatoria de marcas de agua digitales **SynthID** en todas las imágenes sintetizadas.
  3. Se prohíbe explícitamente en las System Instructions el intento deliberado de solicitar réplicas de personajes con copyright existente, manteniendo activos los filtros de seguridad estándar (`BLOCK_SOME`).
  4. Si un tercero presenta una reclamación judicial por derechos de autor, la corporación aporta los registros inmutables de **Cloud Logging** que demuestran que el contenido fue generado en un servicio elegible bajo las condiciones contractuales de buena fe de la política de doble indemnización de Google Cloud.
- **Trade-offs:**
  - *Ventajas:* Protección financiera y respaldo legal directo de Google ante litigios de propiedad intelectual en activos generados.
  - *Desventajas:* Exige disciplina operativa para no eludir los filtros de seguridad ni promover prácticas de plagio intencionado.

## 5. Antipatrones Reales de Adopción y Escenarios de Falla (Root Cause Analysis)

### ❌ Antipatrón 1: Desactivar los Filtros de Seguridad para Evitar Rechazos en Consultas
- 🔍 **Por qué falla:** Ante quejas ocasionales de usuarios porque una consulta legítima fue bloqueada por un falso positivo de los filtros de seguridad en Vertex AI, los desarrolladores configuran todos los umbrales de seguridad en `BLOCK_NONE` en el entorno de producción. Esta decisión temeraria abre la puerta a que usuarios maliciosos utilicen el sistema corporativo para generar contenido difamatorio, instrucciones de ciberataques o material de odio, generando una crisis de reputación masiva en redes sociales. Además, desactivar los filtros de seguridad anula de inmediato la cobertura de la cláusula de indemnización de salida generada de Google Cloud.
- ✅ **Arquitectura Correcta:** Mantener siempre activos los filtros de seguridad en el nivel adecuado del negocio (`BLOCK_SOME` o `BLOCK_FEW`). Si se presentan falsos positivos en casos técnicos legítimos (por ejemplo, en un manual médico sobre enfermedades venéreas), diseñar **prompts de sistema estructurados** que especifiquen el contexto educativo o científico de la interacción, guiando al modelo para abordar la materia con sobriedad profesional sin desactivar la protección global del sistema.

### ❌ Antipatrón 2: Creer Erróneamente que Google Utiliza Datos o Prompts Empresariales para Entrenar Modelos Públicos
- 🔍 **Por qué falla:** Los directivos o comités de seguridad corporativa confunden las políticas de los servicios gratuitos de consumo personal en Internet con los contratos comerciales de Google Cloud empresarial. Bajo este malentendido, paralizan proyectos estratégicos de alto valor o emprenden costosos desarrollos de centros de datos on-premise bajo el supuesto falso de que "subir los datos a Vertex AI permitirá que Google entrene a Gemini con los secretos comerciales de la empresa". Esta desconfianza infundada atrasa la competitividad de la organización en años frente a sus rivales de mercado.
- ✅ **Arquitectura Correcta:** Respaldarse formalmente en el **Compromiso Contractual de Privacidad de Google Cloud**: los contratos comerciales de Google Cloud y Google Workspace estipulan con fuerza de ley vinculante que los datos del cliente, los prompts de entrada y las respuestas generadas **pertenecen exclusivamente al cliente, residen aislados dentro de su tenant corporativo y jamás se utilizan para entrenar los modelos fundacionales públicos de Google**.

### ❌ Antipatrón 3: Modificar Intencionalmente Salidas para Provocar Infracciones de Copyright Perdiendo la Cobertura de Indemnización
- 🔍 **Por qué falla:** Un equipo de marketing o desarrollo intenta probar los límites legales forzando al modelo mediante técnicas de inyección adversariales a replicar exactamente el logotipo o personaje protegido por derechos de autor de un competidor reconocido, comercializando posteriormente el activo en una campaña pública. Cuando el titular de los derechos interpone una demanda millonaria por plagio intencionado, la empresa solicita el amparo de la política de indemnización de Google; sin embargo, al comprobarse en los registros de auditoría que el usuario eludió deliberadamente los términos de servicio para copiar una obra ajena, la indemnización queda invalidada y la empresa debe asumir el costo total del litigio.
- ✅ **Arquitectura Correcta:** Adoptar una cultura de gobernanza ética y cumplimiento legal estricto. Mantener activos los filtros de seguridad de Vertex AI, incorporar directivas deontológicas en las System Instructions que prohíban la réplica deliberada de marcas registradas ajenas, auditar la autenticidad de los activos mediante marcas de agua digitales **SynthID** y preservar los registros de auditoría de Cloud Logging para acreditar el uso de buena fe.

## 6. Heurísticas Avanzadas y Trampas del Examen (Google Cloud Exam Playbook)

### Heurísticas de Decisión Rápida
- 💡 **Regla de Oro 1:** Si una pregunta del examen plantea si "los datos de la empresa procesados en Vertex AI o Gemini for Google Workspace se utilizarán para mejorar los modelos públicos de Google", la respuesta es un **NO categórico e innegociable: Google Cloud nunca entrena modelos públicos con datos o prompts del cliente**.
- 💡 **Regla de Oro 2:** La protección jurídica que ampara al cliente ante demandas de terceros por infracción de derechos de autor se denomina **Política de Doble Indemnización de Propiedad Intelectual (Training Data + Generated Output Indemnification)**.
- 💡 **Regla de Oro 3:** El marco metodológico oficial de ciberseguridad para diseñar, evaluar y proteger sistemas de IA en Google Cloud es **SAIF (Secure AI Framework)**.
- 💡 **Regla de Oro 4:** Para "detectar y enmascarar automáticamente números de seguridad social, tarjetas de crédito y datos personales antes de enviar prompts a Vertex AI", el servicio canónico es **Sensitive Data Protection (Cloud DLP)**.

### Trampas Clásicas del Examen
- ⚠️ **Trampa de Examen:** Asumir que la política de indemnización de propiedad intelectual de salida generada de Google cubre cualquier uso indiscriminado. La indemnización exige que el cliente haya actuado de buena fe, manteniendo activos los filtros de seguridad y sin haber intentado generar plagio intencionado mediante ingeniería adversaria de prompts.
- ⚠️ **Trampa de Examen:** Opciones que propongan desactivar los filtros de seguridad en Vertex AI como solución estándar para evitar que el modelo rechace responder a ciertas preguntas de los clientes. El examen penaliza severamente desactivar los filtros de seguridad; la solución arquitectónica correcta es ajustar los prompts del sistema para clarificar el contexto legítimo.
- ⚠️ **Trampa de Examen:** Confundir los 7 Principios de IA Responsable con las 4 Aplicaciones Prohibidas. Recuerda que las 4 prohibiciones son tajantes (daño generalizado, armas, vigilancia masiva violatoria de DDHH y transgresión del derecho internacional); Google jamás desarrollará proyectos en esas cuatro áreas bajo ninguna circunstancia.
