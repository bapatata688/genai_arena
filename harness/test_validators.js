import { validateSingleModule } from './validators/validate_curriculum.js';
import { validateSingleQuestion } from './validators/validate_questions.js';

console.log('=== PRUEBAS UNITARIAS DEL DETERMINISTIC QUALITY HARNESS ===\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✅ [PASS] ${testName}`);
  } else {
    console.error(`❌ [FAIL] ${testName}`);
  }
}

// -------------------------------------------------------------
// Test 1: Módulo sintético válido
// -------------------------------------------------------------
const validModuleContent = `
## 1. Fundamentos Teóricos y Modelo Conceptual / Arquitectónico
${'Definición formal y análisis matemático exhaustivo de los espacios latentes y modelos fundacionales. '.repeat(50)}

## 2. Modelos Mentales Visuales en Diagramas ASCII / Unicode
\`\`\`text
┌─────────────────────────────────────────────────────────────┐
│                    MODELO MENTAL VÁLIDO                     │
│ 1. Ingesta ───► 2. Tokenización ───► 3. Inferencia          │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## 3. Internos del Ecosistema Google Cloud (Under the Hood)
${'Análisis a bajo nivel de la arquitectura TPU v5p y el silicio acelerador con matrices MXU. '.repeat(30)}

## 4. Patrones de Producción y Casos de Uso Empresariales (Architect Idioms)
${'Patrones de producción empresariales conectando Vertex AI Search y Cloud Storage. '.repeat(30)}

## 5. Antipatrones Reales de Adopción y Escenarios de Falla (Root Cause Analysis)
❌ Antipatrón 1: Fine-Tuning para datos dinámicos.
🔍 Por qué falla: El conocimiento se congela al entrenar y produce alucinaciones.
✅ Arquitectura Correcta: Implementar RAG con Vertex AI Search.

## 6. Heurísticas Avanzadas y Trampas del Examen (Google Cloud Exam Playbook)
💡 Regla de Oro: Siempre preferir RAG para datos que cambian frecuentemente.
${'Examen playbook y descarte de distractores técnicos para la certificación. '.repeat(30)}
`;

const validModule = {
  id: 'mod-01-fundamentos-ia-genai',
  domainId: 'domain-1',
  title: 'Módulo de Prueba Válido',
  content: validModuleContent
};

const validModuleReport = validateSingleModule(validModule);
assert(validModuleReport.success, 'Módulo válido pasa todas las validaciones');

// -------------------------------------------------------------
// Test 2: Módulo que excede 72 columnas en diagrama ASCII
// -------------------------------------------------------------
const wideDiagramContent = validModuleContent.replace(
  '│ 1. Ingesta ───► 2. Tokenización ───► 3. Inferencia          │',
  '│ 1. Ingesta ───► 2. Tokenización ───► 3. Inferencia super ultra larga que excede las 72 columnas permitidas │'
);

const wideDiagramModule = {
  ...validModule,
  content: wideDiagramContent
};
const wideReport = validateSingleModule(wideDiagramModule);
assert(!wideReport.success && wideReport.errors.some(e => e.includes('72 columnas')), 'Diagrama ASCII > 72 columnas es rechazado');

// -------------------------------------------------------------
// Test 3: Módulo con sección faltante
// -------------------------------------------------------------
const missingSectionContent = validModuleContent.replace('## 4. Patrones de Producción', '## 4. Otros temas');
const missingSectionModule = {
  ...validModule,
  content: missingSectionContent
};
const missingSectionReport = validateSingleModule(missingSectionModule);
assert(!missingSectionReport.success && missingSectionReport.errors.some(e => e.includes('Patrones de Producción')), 'Falta de sección canónica es detectada');

// -------------------------------------------------------------
// Test 4: Módulo con longitud insuficiente (< 8,000 chars)
// -------------------------------------------------------------
const shortModule = {
  id: 'mod-short',
  domainId: 'domain-1',
  title: 'Módulo Corto',
  content: `
## 1. Fundamentos Teóricos
Texto corto.
## 2. Modelos Mentales Visuales
\`\`\`text
┌─────────┐
│ Diagram │
└─────────┘
\`\`\`
## 3. Internos del Ecosistema Google Cloud
GCP.
## 4. Patrones de Producción
Patrones.
## 5. Antipatrones Reales
❌ Falla 🔍 Por qué ✅ Solución
## 6. Heurísticas Avanzadas
Heurística.
`
};
const shortReport = validateSingleModule(shortModule);
assert(!shortReport.success && shortReport.errors.some(e => e.includes('Profundidad insuficiente')), 'Módulo con < 8,000 chars es rechazado');

// -------------------------------------------------------------
// Test 5: Pregunta 'single' válida
// -------------------------------------------------------------
const validQuestion = {
  id: 'q-test-01',
  moduleId: 'mod-01-fundamentos-ia-genai',
  domainId: 'domain-1',
  type: 'single',
  prompt: 'Una corporación necesita conectar datos dinámicos a Gemini con citas fácticas verídicas. ¿Cuál es el patrón recomendado?',
  options: [
    { id: 'a', text: 'Vertex AI Search con Grounding', isCorrect: true, distractorRationale: 'Opción correcta. Grounding con Vertex AI Search inyecta hechos reales y citas comprobables.' },
    { id: 'b', text: 'Fine-tuning semanal de Gemini', isCorrect: false, distractorRationale: 'Distractor. Fine-tuning adapta estilo pero no es apto para datos que cambian frecuentemente.' },
    { id: 'c', text: 'Aumentar temperatura a 1.0', isCorrect: false, distractorRationale: 'Distractor flagrante. Elevar la temperatura incrementa las alucinaciones en lugar de mitigarlas.' }
  ],
  overallExplanation: 'RAG y Grounding con Vertex AI Search es la solución canónica para datos dinámicos empresariales.',
  examHeuristic: 'Datos dinámicos con citas obligatorias ➔ Grounding con Vertex AI Search.'
};

const qReport1 = validateSingleQuestion(validQuestion, new Set());
assert(qReport1.success, 'Pregunta "single" válida pasa la validación');

// -------------------------------------------------------------
// Test 6: Invariante single: rechazar si hay 2 correctas
// -------------------------------------------------------------
const invalidSingle = {
  ...validQuestion,
  options: [
    { ...validQuestion.options[0], isCorrect: true },
    { ...validQuestion.options[1], isCorrect: true },
    { ...validQuestion.options[2], isCorrect: false }
  ]
};
const qReport2 = validateSingleQuestion(invalidSingle, new Set());
assert(!qReport2.success && qReport2.errors.some(e => e.includes('single')), 'Pregunta "single" con 2 opciones correctas es rechazada');

// -------------------------------------------------------------
// Test 7: Invariante distractorRationale: rechazar si es < 25 chars
// -------------------------------------------------------------
const shortRationaleQuestion = {
  ...validQuestion,
  options: [
    { ...validQuestion.options[0] },
    { ...validQuestion.options[1], distractorRationale: 'Es falso.' },
    { ...validQuestion.options[2] }
  ]
};
const qReport3 = validateSingleQuestion(shortRationaleQuestion, new Set());
assert(!qReport3.success && qReport3.errors.some(e => e.includes('demasiado corto')), 'Opción con distractorRationale < 25 chars es rechazada');

// -------------------------------------------------------------
// Test 8: Invariante multi: válida con 2 correctas
// -------------------------------------------------------------
const validMulti = {
  ...validQuestion,
  id: 'q-test-02',
  type: 'multi',
  options: [
    { id: 'a', text: 'Opción 1 correcta', isCorrect: true, distractorRationale: 'Justificación válida de la primera respuesta correcta según la arquitectura.' },
    { id: 'b', text: 'Opción 2 correcta', isCorrect: true, distractorRationale: 'Justificación válida de la segunda respuesta correcta según la arquitectura.' },
    { id: 'c', text: 'Opción 3 distractor', isCorrect: false, distractorRationale: 'Distractor técnico bien argumentado explicando por qué no aplica en este caso.' }
  ]
};
const qReport4 = validateSingleQuestion(validMulti, new Set());
assert(qReport4.success, 'Pregunta "multi" con 2 opciones correctas pasa la validación');

console.log(`\n=============================================================`);
console.log(`RESULTADO DE TESTS DEL HARNESS: ${passedTests}/${totalTests} APROBADOS`);
console.log(`=============================================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
