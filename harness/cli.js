#!/usr/bin/env node
import { validateCurriculum } from './validators/validate_curriculum.js';
import { validateQuestions } from './validators/validate_questions.js';

const command = process.argv[2] || 'help';

async function run() {
  switch (command) {
    case 'lint-topics': {
      const res = await validateCurriculum();
      process.exit(res.success ? 0 : 1);
      break;
    }

    case 'validate-questions': {
      const res = await validateQuestions();
      process.exit(res.success ? 0 : 1);
      break;
    }

    case 'validate-all': {
      console.log('\n================================================================');
      console.log('EJECUTANDO VALIDACIÓN INTEGRAL DE CALIDAD: GENAI LEADER ARENA');
      console.log('================================================================\n');

      const curResult = await validateCurriculum();
      const qResult = await validateQuestions();

      console.log('\n================================================================');
      console.log('REPORTE CONSOLIDADO DEL QUALITY HARNESS');
      console.log('================================================================');
      console.log(`• Módulos Curriculares : ${curResult.passedCount}/${curResult.totalCount} Aprobados`);
      console.log(`• Preguntas de Examen  : ${qResult.passedCount}/${qResult.totalCount} Aprobadas`);
      console.log('================================================================\n');

      const allSuccess = curResult.success && qResult.success;
      if (!allSuccess) {
        console.error('❌ VALIDACIÓN FALLIDA: Revise los errores detallados arriba.\n');
        process.exit(1);
      }
      console.log('✅ VALIDACIÓN DETERMINISTA EXITOSA (0 Errores)\n');
      process.exit(0);
      break;
    }

    case 'help':
    default: {
      console.log(`
Uso del CLI de Harness para GenAI Leader Arena:
  node harness/cli.js lint-topics              Valida que los módulos cumplan el estándar Staff (6 secciones canónicas, ASCII <= 72 cols, antipatrones, etc.)
  node harness/cli.js validate-questions       Valida banco de preguntas (invariantes single/multi, distractores >= 25 chars, dominios)
  node harness/cli.js validate-all             Ejecuta validación integral de currículum y preguntas
      `);
      process.exit(0);
    }
  }
}

run();
