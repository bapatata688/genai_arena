import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { m01Questions } from './questions/m01.js';
import { m02Questions } from './questions/m02.js';
import { m03Questions } from './questions/m03.js';
import { m04Questions } from './questions/m04.js';
import { m05Questions } from './questions/m05.js';
import { m06Questions } from './questions/m06.js';
import { m07Questions } from './questions/m07.js';
import { m08Questions } from './questions/m08.js';
import { m09Questions } from './questions/m09.js';
import { m10Questions } from './questions/m10.js';

import { validateQuestions } from '../harness/validators/validate_questions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TARGET_PATH = path.resolve(__dirname, '../src/data/questions.json');

const EXPECTED_MODULE_COUNTS = {
  'mod-01-fundamentos-ia-genai': 7,
  'mod-02-ciclo-vida-arquitectura-4-capas': 8,
  'mod-03-datos-embeddings-seleccion-modelos': 8,
  'mod-04-infraestructura-tpu-gpu-hypercomputer': 8,
  'mod-05-productividad-workspace-notebooklm': 9,
  'mod-06-plataformas-vertex-search-agentes': 9,
  'mod-07-prompt-engineering-parametros-control': 8,
  'mod-08-grounding-rag-fine-tuning': 8,
  'mod-09-estrategia-casos-uso-roi': 5,
  'mod-10-gobernanza-saif-ia-responsable-ip': 5
};

const allQuestions = [
  ...m01Questions,
  ...m02Questions,
  ...m03Questions,
  ...m04Questions,
  ...m05Questions,
  ...m06Questions,
  ...m07Questions,
  ...m08Questions,
  ...m09Questions,
  ...m10Questions
];

console.log(`[INFO] Compilando banco de preguntas... Total recolectadas: ${allQuestions.length}`);

// Validar recuentos por módulo
const moduleCounts = {};
for (const q of allQuestions) {
  moduleCounts[q.moduleId] = (moduleCounts[q.moduleId] || 0) + 1;
}

let countErrors = 0;
for (const [modId, expected] of Object.entries(EXPECTED_MODULE_COUNTS)) {
  const actual = moduleCounts[modId] || 0;
  if (actual !== expected) {
    console.error(`[ERROR] Módulo ${modId}: se esperaban ${expected} preguntas, se encontraron ${actual}`);
    countErrors++;
  } else {
    console.log(`  ✅ ${modId.padEnd(48)}: ${actual}/${expected}`);
  }
}

if (countErrors > 0) {
  console.error(`[FATAL] Error en la distribución de módulos. Abortando escritura.`);
  process.exit(1);
}

// Escribir archivo JSON formateado con 2 espacios
fs.writeFileSync(TARGET_PATH, JSON.stringify(allQuestions, null, 2), 'utf-8');
console.log(`\n[SUCCESS] Archivo escrito exitosamente en: ${TARGET_PATH}`);

// Ejecutar validador oficial del harness
console.log('\n[INFO] Ejecutando validación oficial con harness/validators/validate_questions.js...');
const res = await validateQuestions(TARGET_PATH);

if (!res.success) {
  console.error('\n[FATAL] La validación de preguntas falló con errores:');
  res.errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log('\n[SUCCESS] ¡Todas las 75 preguntas superaron el harness de calidad al 100%!');
  process.exit(0);
}
