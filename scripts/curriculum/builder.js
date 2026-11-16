import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MODULES_METADATA } from './metadata.js';
import { REQUIRED_SECTIONS, MIN_CONTENT_LENGTH, MAX_ASCII_LINE_WIDTH } from '../../harness/validators/validate_curriculum.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MD_DIR = path.resolve(__dirname, '../curriculum_markdown');
const OUTPUT_PATH = path.resolve(__dirname, '../../src/data/modules.json');

function validateMarkdownContent(content, moduleId) {
  const errors = [];
  const warnings = [];
  const trimmed = content.trim();

  // 1. Minimum content length floor (>= 8,000 characters)
  if (trimmed.length < MIN_CONTENT_LENGTH) {
    errors.push(`Longitud insuficiente: ${trimmed.length} caracteres (mínimo: ${MIN_CONTENT_LENGTH})`);
  }

  // 2. Validate all 6 canonical sections
  for (const section of REQUIRED_SECTIONS) {
    if (!section.pattern.test(trimmed)) {
      errors.push(`Falta la sección canónica obligatoria: "${section.name}" (patrón: ${section.pattern})`);
    }
  }

  // 3. Validate Unicode box-drawing characters [┌│─┼└]
  if (!/[┌│─┼└]/.test(trimmed)) {
    errors.push('No contiene caracteres Unicode de dibujo de cajas [┌│─┼└]');
  }

  // 4. Validate ASCII/Unicode diagram line width <= 72 columns
  const codeBlockRegex = /```(?:text|ascii)?\r?\n([\s\S]*?)```/g;
  let match;
  let blockCount = 0;
  let diagramLineWidthErrors = 0;

  while ((match = codeBlockRegex.exec(trimmed)) !== null) {
    blockCount++;
    const lines = match[1].split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.length > MAX_ASCII_LINE_WIDTH) {
        diagramLineWidthErrors++;
        if (diagramLineWidthErrors <= 3) {
          errors.push(`Línea ${i + 1} de bloque ${blockCount} excede ${MAX_ASCII_LINE_WIDTH} cols (${line.length} cols): "${line.slice(0, 35)}..."`);
        }
      }
    }
  }

  if (blockCount === 0) {
    warnings.push('No se detectaron bloques de código ```text o ```ascii');
  } else if (diagramLineWidthErrors > 3) {
    errors.push(`... y ${diagramLineWidthErrors - 3} líneas adicionales exceden las ${MAX_ASCII_LINE_WIDTH} columnas.`);
  }

  // 5. Antipattern triad (❌, 🔍, ✅)
  const hasCross = trimmed.includes('❌');
  const hasSearch = trimmed.includes('🔍');
  const hasCheck = trimmed.includes('✅');

  if (!hasCross || !hasSearch || !hasCheck) {
    errors.push(`Debe contener la tríada canónica de antipatrones: ❌=${hasCross}, 🔍=${hasSearch}, ✅=${hasCheck}`);
  }

  return {
    success: errors.length === 0,
    errors,
    warnings,
    charCount: trimmed.length,
    blockCount
  };
}

export function buildCurriculum() {
  console.log('\n======================================================');
  console.log('COMPILADOR DE CURRÍCULUM STAFF: GENAI LEADER ARENA');
  console.log('======================================================\n');

  let hasErrors = false;
  const compiledModules = [];

  for (const meta of MODULES_METADATA) {
    const mdPath = path.join(MD_DIR, meta.file);
    if (!fs.existsSync(mdPath)) {
      console.error(`[ERROR] Archivo Markdown no encontrado: ${mdPath}`);
      hasErrors = true;
      continue;
    }

    const content = fs.readFileSync(mdPath, 'utf-8');
    const val = validateMarkdownContent(content, meta.id);

    if (!val.success) {
      hasErrors = true;
      console.log(`[FAIL] ${meta.id.padEnd(42)} ("${meta.title}")`);
      val.errors.forEach(e => console.log(`       ❌ ${e}`));
    } else {
      console.log(`[PASS] ${meta.id.padEnd(42)}: ${val.charCount} chars, ${val.blockCount} diagramas`);
      val.warnings.forEach(w => console.log(`       ⚠️  ${w}`));
    }

    compiledModules.push({
      id: meta.id,
      domainId: meta.domainId,
      order: meta.order,
      title: meta.title,
      shortTitle: meta.shortTitle,
      description: meta.description,
      learningObjectives: meta.learningObjectives,
      content: content.trim()
    });
  }

  if (hasErrors) {
    console.error('\n❌ COMPILACIÓN ABORTADA DEBIDO A ERRORES.');
    process.exit(1);
  }

  if (compiledModules.length !== 10) {
    console.error(`\n❌ ERROR: Se esperaban 10 módulos, pero hay ${compiledModules.length}`);
    process.exit(1);
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(compiledModules, null, 2), 'utf-8');
  console.log('\n------------------------------------------------------');
  console.log(`ÉXITO: 10/10 Módulos compilados y guardados en:`);
  console.log(`  ${OUTPUT_PATH}`);
  console.log('------------------------------------------------------\n');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  buildCurriculum();
}
