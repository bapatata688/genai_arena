import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const QUESTIONS_PATH = path.resolve(__dirname, '../../src/data/questions.json');

export const DOMAIN_TOLERANCES = {
  'domain-1': { name: 'Dominio 1 (Fundamentos)', minPercent: 28, maxPercent: 33 },
  'domain-2': { name: 'Dominio 2 (Ofertas GCP)', minPercent: 32, maxPercent: 38 },
  'domain-3': { name: 'Dominio 3 (Mejora Modelos)', minPercent: 18, maxPercent: 23 },
  'domain-4': { name: 'Dominio 4 (Estrategias Negocio)', minPercent: 12, maxPercent: 16 }
};

export const MIN_DISTRACTOR_RATIONALE_LENGTH = 25;

/**
 * Validates a single question item against schema and pedagogical invariants.
 * @param {Object} question
 * @param {Set<string>} seenQuestionIds
 * @returns {{ id: string, success: boolean, errors: string[] }}
 */
export function validateSingleQuestion(question, seenQuestionIds = new Set()) {
  const errors = [];

  if (!question.id || typeof question.id !== 'string') {
    errors.push('Falta `id` único de pregunta');
  } else {
    if (seenQuestionIds.has(question.id)) {
      errors.push(`ID de pregunta duplicado: "${question.id}"`);
    } else {
      seenQuestionIds.add(question.id);
    }
  }

  if (!question.domainId || !DOMAIN_TOLERANCES[question.domainId]) {
    errors.push(`\`domainId\` inválido o no reconocido: "${question.domainId}"`);
  }

  if (!question.moduleId || typeof question.moduleId !== 'string') {
    errors.push('Falta `moduleId` asociado');
  }

  if (!['single', 'multi'].includes(question.type)) {
    errors.push(`Tipo de pregunta inválido: "${question.type}". Debe ser "single" o "multi"`);
  }

  if (!question.prompt || typeof question.prompt !== 'string' || question.prompt.trim().length < 20) {
    errors.push('El campo `prompt` está vacío o es demasiado corto (< 20 caracteres)');
  }

  if (!question.overallExplanation || typeof question.overallExplanation !== 'string' || question.overallExplanation.trim().length < 25) {
    errors.push('El campo `overallExplanation` está vacío o es demasiado corto (< 25 caracteres)');
  }

  if (!question.examHeuristic || typeof question.examHeuristic !== 'string' || question.examHeuristic.trim().length < 15) {
    errors.push('El campo `examHeuristic` está vacío o es demasiado corto (< 15 caracteres)');
  }

  // Validate options
  if (!Array.isArray(question.options) || question.options.length < 3) {
    errors.push(`Arreglo de \`options\` inválido o insuficiente (debe tener al menos 3 opciones, actual: ${question.options?.length})`);
  } else {
    const seenOptionIds = new Set();
    let correctCount = 0;

    for (let i = 0; i < question.options.length; i++) {
      const opt = question.options[i];
      const optPrefix = `Opción [${i}] (${opt?.id || 'sin-id'})`;

      if (!opt.id || typeof opt.id !== 'string') {
        errors.push(`${optPrefix}: falta \`id\` único`);
      } else if (seenOptionIds.has(opt.id)) {
        errors.push(`${optPrefix}: ID de opción repetido dentro de la pregunta: "${opt.id}"`);
      } else {
        seenOptionIds.add(opt.id);
      }

      if (!opt.text || typeof opt.text !== 'string' || opt.text.trim().length === 0) {
        errors.push(`${optPrefix}: texto de opción vacío`);
      }

      if (typeof opt.isCorrect !== 'boolean') {
        errors.push(`${optPrefix}: \`isCorrect\` debe ser un valor booleano`);
      } else if (opt.isCorrect) {
        correctCount++;
      }

      // Mandatory distractorRationale with length >= 25 chars
      if (!opt.distractorRationale || typeof opt.distractorRationale !== 'string') {
        errors.push(`${optPrefix}: falta \`distractorRationale\``);
      } else {
        const rationaleLength = opt.distractorRationale.trim().length;
        if (rationaleLength < MIN_DISTRACTOR_RATIONALE_LENGTH) {
          errors.push(
            `${optPrefix}: \`distractorRationale\` demasiado corto (${rationaleLength} caracteres, mínimo obligatorio: ${MIN_DISTRACTOR_RATIONALE_LENGTH})`
          );
        }
      }
    }

    // Invariant: single has exactly 1 isCorrect === true
    if (question.type === 'single' && correctCount !== 1) {
      errors.push(`Pregunta tipo "single" debe tener exactamente 1 opción con isCorrect=true (encontradas: ${correctCount})`);
    }

    // Invariant: multi has >= 2 isCorrect === true
    if (question.type === 'multi' && correctCount < 2) {
      errors.push(`Pregunta tipo "multi" debe tener al menos 2 opciones con isCorrect=true (encontradas: ${correctCount})`);
    }
  }

  return {
    id: question.id || 'desconocida',
    success: errors.length === 0,
    errors
  };
}

/**
 * Validates the entire questions bank in src/data/questions.json.
 * @param {string} [customPath]
 * @returns {Promise<{ success: boolean, passedCount: number, totalCount: number, reports: Array<any>, errors: string[] }>}
 */
export async function validateQuestions(customPath) {
  const filePath = customPath || QUESTIONS_PATH;

  console.log('\n======================================================');
  console.log('VALIDANDO BANCO DE PREGUNTAS: GENAI LEADER ARENA');
  console.log(`Archivo objetivo: ${filePath}`);
  console.log('======================================================\n');

  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] Archivo no encontrado: ${filePath}`);
    return {
      success: false,
      passedCount: 0,
      totalCount: 0,
      reports: [],
      errors: [`Archivo no encontrado: ${filePath}`]
    };
  }

  let rawData;
  try {
    rawData = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    return {
      success: false,
      passedCount: 0,
      totalCount: 0,
      reports: [],
      errors: [`Error leyendo archivo: ${err.message}`]
    };
  }

  let questions;
  try {
    questions = JSON.parse(rawData);
  } catch (err) {
    console.error(`[ERROR] JSON malformado en ${filePath}: ${err.message}`);
    return {
      success: false,
      passedCount: 0,
      totalCount: 0,
      reports: [],
      errors: [`JSON malformado: ${err.message}`]
    };
  }

  if (!Array.isArray(questions)) {
    return {
      success: false,
      passedCount: 0,
      totalCount: 0,
      reports: [],
      errors: ['El contenido de questions.json debe ser un array de preguntas']
    };
  }

  // Handle M1 scaffolding empty state / starter stub
  if (questions.length === 0) {
    console.log('[INFO] src/data/questions.json está en estado de andamiaje M1 (0 preguntas cargadas).');
    console.log('[INFO] El banco completo de 75 preguntas se incorporará en M3.');
    console.log('------------------------------------------------------');
    console.log('Resumen Preguntas: 0/0 validadas (Andamiaje M1 limpio)');
    console.log('------------------------------------------------------\n');
    return {
      success: true,
      passedCount: 0,
      totalCount: 0,
      reports: [],
      errors: []
    };
  }

  let passedCount = 0;
  const reports = [];
  const globalErrors = [];
  const seenQuestionIds = new Set();
  const domainCounts = {
    'domain-1': 0,
    'domain-2': 0,
    'domain-3': 0,
    'domain-4': 0
  };

  for (const q of questions) {
    const report = validateSingleQuestion(q, seenQuestionIds);
    reports.push(report);

    if (report.success) {
      passedCount++;
      if (domainCounts[q.domainId] !== undefined) {
        domainCounts[q.domainId]++;
      }
    } else {
      console.log(`[FAIL] Pregunta "${report.id}":`);
      report.errors.forEach(e => console.log(`       ❌ ${e}`));
      globalErrors.push(...report.errors.map(e => `[${report.id}] ${e}`));
    }
  }

  // Validate domain distribution tolerances if bank has questions
  console.log('\n--- DISTRIBUCIÓN POR DOMINIO ---');
  for (const [domId, meta] of Object.entries(DOMAIN_TOLERANCES)) {
    const count = domainCounts[domId] || 0;
    const percentage = Number(((count / questions.length) * 100).toFixed(1));
    const inRange = percentage >= meta.minPercent && percentage <= meta.maxPercent;

    const statusTag = inRange ? '✅' : '⚠️';
    console.log(
      `${statusTag} ${meta.name.padEnd(32)}: ${count} preguntas (${percentage}%) [Tolerancia: ${meta.minPercent}% - ${meta.maxPercent}%]`
    );

    // Only strictly enforce distribution if questions bank is near complete (>= 50 questions)
    if (questions.length >= 50 && !inRange) {
      const err = `Distribución fuera de tolerancia para ${meta.name}: ${percentage}% (esperado: ${meta.minPercent}% - ${meta.maxPercent}%)`;
      globalErrors.push(err);
      console.log(`       ❌ ${err}`);
    }
  }

  console.log('\n------------------------------------------------------');
  console.log(`Resumen Preguntas: ${passedCount}/${questions.length} APROBADAS (${globalErrors.length} errores)`);
  console.log('------------------------------------------------------\n');

  return {
    success: globalErrors.length === 0,
    passedCount,
    totalCount: questions.length,
    domainCounts,
    reports,
    errors: globalErrors
  };
}

// Allow direct CLI invocation: node harness/validators/validate_questions.js
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  validateQuestions().then((res) => {
    process.exit(res.success ? 0 : 1);
  });
}
