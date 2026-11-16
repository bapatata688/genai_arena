import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { REQUIRED_SECTIONS, MIN_CONTENT_LENGTH, MAX_ASCII_LINE_WIDTH } from '../harness/validators/validate_curriculum.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function testMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const trimmed = content.trim();
  const errors = [];
  const warnings = [];

  console.log(`\nValidando archivo: ${filePath} (${trimmed.length} caracteres)`);

  if (trimmed.length < MIN_CONTENT_LENGTH) {
    errors.push(`Longitud insuficiente: ${trimmed.length} < ${MIN_CONTENT_LENGTH}`);
  }

  for (const s of REQUIRED_SECTIONS) {
    if (!s.pattern.test(trimmed)) {
      errors.push(`Falta sección obligatoria: ${s.name} (${s.pattern})`);
    }
  }

  if (!/[┌│─┼└]/.test(trimmed)) {
    errors.push('No contiene caracteres Unicode de dibujo de cajas [┌│─┼└]');
  }

  const codeBlockRegex = /```(?:text|ascii)?\r?\n([\s\S]*?)```/g;
  let match;
  let count = 0;
  while ((match = codeBlockRegex.exec(trimmed)) !== null) {
    count++;
    const lines = match[1].split(/\r?\n/);
    lines.forEach((l, idx) => {
      if (l.length > MAX_ASCII_LINE_WIDTH) {
        errors.push(`Línea ${idx + 1} de bloque ${count} excede ${MAX_ASCII_LINE_WIDTH} (${l.length} cols): "${l}"`);
      }
    });
  }

  if (count === 0) {
    warnings.push('No se detectaron bloques ```text o ```ascii');
  }

  const hasCross = trimmed.includes('❌');
  const hasSearch = trimmed.includes('🔍');
  const hasCheck = trimmed.includes('✅');
  if (!hasCross || !hasSearch || !hasCheck) {
    errors.push(`Falta tríada de antipatrones: ❌=${hasCross}, 🔍=${hasSearch}, ✅=${hasCheck}`);
  }

  if (errors.length === 0) {
    console.log(`[PASS] ${path.basename(filePath)} es VÁLIDO. ${count} bloques de código probados.`);
    warnings.forEach(w => console.log(`  [WARN] ${w}`));
    return true;
  } else {
    console.error(`[FAIL] ${path.basename(filePath)} TIENE ERRORES:`);
    errors.forEach(e => console.error(`  - ${e}`));
    return false;
  }
}

if (process.argv[2]) {
  const target = path.resolve(process.cwd(), process.argv[2]);
  const ok = testMarkdownFile(target);
  process.exit(ok ? 0 : 1);
}
