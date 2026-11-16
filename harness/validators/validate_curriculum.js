import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MODULES_PATH = path.resolve(__dirname, '../../src/data/modules.json');

export const REQUIRED_SECTIONS = [
  { id: 1, pattern: /##\s*1\.\s*Fundamentos\s+Teóricos/i, name: "1. Fundamentos Teóricos y Modelo Conceptual / Arquitectónico" },
  { id: 2, pattern: /##\s*2\.\s*Modelos\s+Mentales\s+Visuales/i, name: "2. Modelos Mentales Visuales en Diagramas ASCII / Unicode" },
  { id: 3, pattern: /##\s*3\.\s*Internos\s+del\s+Ecosistema\s+Google\s+Cloud/i, name: "3. Internos del Ecosistema Google Cloud (Under the Hood)" },
  { id: 4, pattern: /##\s*4\.\s*Patrones\s+de\s+Producción/i, name: "4. Patrones de Producción y Casos de Uso Empresariales (Architect Idioms)" },
  { id: 5, pattern: /##\s*5\.\s*Antipatrones\s+Reales/i, name: "5. Antipatrones Reales de Adopción y Escenarios de Falla (Root Cause Analysis)" },
  { id: 6, pattern: /##\s*6\.\s*Heurísticas\s+Avanzadas/i, name: "6. Heurísticas Avanzadas y Trampas del Examen (Google Cloud Exam Playbook)" }
];

export const MIN_CONTENT_LENGTH = 8000;
export const MAX_ASCII_LINE_WIDTH = 72;

/**
 * Validates an individual module object against all curriculum quality invariants.
 * @param {Object} module 
 * @returns {{ id: string, title: string, success: boolean, errors: string[], warnings: string[] }}
 */
export function validateSingleModule(module) {
  const errors = [];
  const warnings = [];

  if (!module.id || typeof module.id !== 'string') {
    errors.push('Falta `id` de módulo válido');
  }
  if (!module.title || typeof module.title !== 'string') {
    errors.push('Falta `title` de módulo');
  }
  if (!module.domainId || typeof module.domainId !== 'string') {
    errors.push('Falta `domainId` de módulo');
  }

  // Extract full markdown content string
  let fullContent = '';
  if (typeof module.content === 'string') {
    fullContent = module.content;
  } else if (module.content && typeof module.content === 'object') {
    fullContent = Object.values(module.content).join('\n\n');
  } else if (typeof module.guide === 'string') {
    fullContent = module.guide;
  }

  const trimmedContent = fullContent.trim();
  const contentLength = trimmedContent.length;

  // 1. Minimum content length floor (>= 8,000 characters)
  if (contentLength < MIN_CONTENT_LENGTH) {
    errors.push(`Profundidad insuficiente: el contenido tiene ${contentLength} caracteres (mínimo requerido: ${MIN_CONTENT_LENGTH})`);
  }

  // 2. Validate all 6 canonical sections
  for (const section of REQUIRED_SECTIONS) {
    if (!section.pattern.test(trimmedContent)) {
      errors.push(`Falta la sección canónica obligatoria: "${section.name}" (patrón: ${section.pattern})`);
    }
  }

  // 3. Validate presence of Unicode box-drawing diagram ([┌│─┼└])
  const hasBoxDrawing = /[┌│─┼└]/.test(trimmedContent);
  if (!hasBoxDrawing) {
    errors.push('No contiene caracteres Unicode de dibujo de cajas [┌│─┼└] para diagramas visuales');
  }

  // 4. Validate ASCII/Unicode diagram line width <= 72 columns
  const codeBlockRegex = /```(?:text|ascii)?\r?\n([\s\S]*?)```/g;
  let match;
  let diagramFound = false;
  let diagramLineWidthErrors = 0;

  while ((match = codeBlockRegex.exec(trimmedContent)) !== null) {
    diagramFound = true;
    const blockContent = match[1];
    const lines = blockContent.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.length > MAX_ASCII_LINE_WIDTH) {
        diagramLineWidthErrors++;
        if (diagramLineWidthErrors <= 3) {
          errors.push(`Línea ${i + 1} del diagrama excede ${MAX_ASCII_LINE_WIDTH} columnas (${line.length} cols): "${line.slice(0, 30)}..."`);
        }
      }
    }
  }

  if (!diagramFound) {
    warnings.push('No se detectaron bloques de código dedicados ```text o ```ascii');
  } else if (diagramLineWidthErrors > 3) {
    errors.push(`... y ${diagramLineWidthErrors - 3} líneas adicionales exceden las ${MAX_ASCII_LINE_WIDTH} columnas.`);
  }

  // 5. Validate Section 5 contains failure antipattern triad (❌, 🔍, ✅)
  const hasCross = trimmedContent.includes('❌');
  const hasSearch = trimmedContent.includes('🔍');
  const hasCheck = trimmedContent.includes('✅');

  if (!hasCross || !hasSearch || !hasCheck) {
    errors.push(
      `La Sección 5 debe contener la tríada canónica de antipatrones (❌, 🔍, ✅). ` +
      `Encontrados: ❌=${hasCross}, 🔍=${hasSearch}, ✅=${hasCheck}`
    );
  }

  return {
    id: module.id || 'unknown',
    title: module.title || 'Sin Título',
    success: errors.length === 0,
    errors,
    warnings,
    charCount: contentLength
  };
}

/**
 * Validates the entire curriculum dataset in src/data/modules.json.
 * @param {string} [customPath]
 * @returns {Promise<{ success: boolean, passedCount: number, totalCount: number, reports: Array<any>, errors: string[] }>}
 */
export async function validateCurriculum(customPath) {
  const filePath = customPath || MODULES_PATH;

  console.log('\n======================================================');
  console.log('VALIDANDO CURRÍCULUM STAFF: GENAI LEADER ARENA');
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

  let modules;
  try {
    modules = JSON.parse(rawData);
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

  if (!Array.isArray(modules)) {
    return {
      success: false,
      passedCount: 0,
      totalCount: 0,
      reports: [],
      errors: ['El contenido de modules.json debe ser un array de módulos']
    };
  }

  // Handle M1 scaffolding empty state / starter stub
  if (modules.length === 0) {
    console.log('[INFO] src/data/modules.json está en estado de andamiaje M1 (0 módulos cargados).');
    console.log('[INFO] La autoría curricular completa de los 10 módulos se realizará en M2.');
    console.log('------------------------------------------------------');
    console.log('Resumen Currículum: 0/0 módulos (Andamiaje M1 limpio)');
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

  for (const mod of modules) {
    const report = validateSingleModule(mod);
    reports.push(report);

    if (report.success) {
      passedCount++;
      console.log(`[PASS] ${report.id.padEnd(35)}: "${report.title}" (${report.charCount} chars)`);
      report.warnings.forEach(w => console.log(`       ⚠️  ${w}`));
    } else {
      console.log(`[FAIL] ${report.id.padEnd(35)}: "${report.title}"`);
      report.errors.forEach(e => console.log(`       ❌ ${e}`));
      globalErrors.push(...report.errors.map(e => `[${report.id}] ${e}`));
    }
  }

  console.log('\n------------------------------------------------------');
  console.log(`Resumen Currículum: ${passedCount}/${modules.length} APROBADOS (${globalErrors.length} errores)`);
  console.log('------------------------------------------------------\n');

  return {
    success: globalErrors.length === 0,
    passedCount,
    totalCount: modules.length,
    reports,
    errors: globalErrors
  };
}

// Allow direct CLI invocation: node harness/validators/validate_curriculum.js
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  validateCurriculum().then((res) => {
    process.exit(res.success ? 0 : 1);
  });
}
