import React, { useState, useRef } from 'react';
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  Award,
  Download,
  Upload,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  Bookmark,
  CheckSquare,
  Square,
  FileText
} from 'lucide-react';

export default function Dashboard({
  domains = [],
  modules = [],
  questions = [],
  state,
  onToggleModuleRead,
  onToggleModuleBookmark,
  onNavigateToModule,
  onExportJson,
  onImportJson,
  onResetState
}) {
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null); // { type: 'success' | 'error', text: string }
  const fileInputRef = useRef(null);

  const moduleProgress = state.moduleProgress || {};
  const examSessions = state.examSessions || [];
  const bookmarkedCount = (state.bookmarkedQuestionIds || []).length;

  // 1. Métricas de Módulos
  const totalModules = modules.length;
  const readModulesCount = modules.filter((m) => moduleProgress[m.id]?.isRead).length;
  const modulesReadPercentage = totalModules > 0 ? Math.round((readModulesCount / totalModules) * 100) : 0;

  // 2. Preguntas Dominadas en Modo Estudio
  let masteredQuestionsCount = 0;
  const moduleMasteryMap = {}; // moduleId -> { total: number, mastered: number }
  modules.forEach((m) => {
    moduleMasteryMap[m.id] = { total: 0, mastered: 0 };
  });

  questions.forEach((q) => {
    if (moduleMasteryMap[q.moduleId]) {
      moduleMasteryMap[q.moduleId].total += 1;
    }
    const modProg = moduleProgress[q.moduleId];
    if (modProg && modProg.studyModeAnswers && modProg.studyModeAnswers[q.id]) {
      const selected = modProg.studyModeAnswers[q.id];
      const correctOptionIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
      const isCorrect =
        selected.length === correctOptionIds.length &&
        selected.every((id) => correctOptionIds.includes(id));
      if (isCorrect) {
        masteredQuestionsCount += 1;
        if (moduleMasteryMap[q.moduleId]) {
          moduleMasteryMap[q.moduleId].mastered += 1;
        }
      }
    }
  });

  const questionMasteryPercentage =
    questions.length > 0 ? Math.round((masteredQuestionsCount / questions.length) * 100) : 0;

  // 3. Métricas de Exámenes
  const totalExams = examSessions.length;
  const passedExams = examSessions.filter((s) => s.passed).length;
  const avgExamScore =
    totalExams > 0
      ? Math.round(examSessions.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / totalExams)
      : null;
  const bestExamScore =
    totalExams > 0 ? Math.max(...examSessions.map((s) => s.percentage || 0)) : null;

  // 4. Cálculo del Índice de Preparación Global (Readiness Score)
  let readinessScore = 0;
  if (totalExams > 0 && avgExamScore !== null) {
    readinessScore = Math.round(
      modulesReadPercentage * 0.35 + questionMasteryPercentage * 0.35 + avgExamScore * 0.3
    );
  } else {
    readinessScore = Math.round(modulesReadPercentage * 0.5 + questionMasteryPercentage * 0.5);
  }

  const getPassingProbability = (score) => {
    if (score >= 85) return { label: 'Muy Alta (>90%)', color: 'text-emerald-400', badgeBg: 'bg-emerald-950/60 border-emerald-800' };
    if (score >= 70) return { label: 'Alta (75% - 90%)', color: 'text-teal-400', badgeBg: 'bg-teal-950/60 border-teal-800' };
    if (score >= 50) return { label: 'Media (50% - 75%)', color: 'text-amber-400', badgeBg: 'bg-amber-950/60 border-amber-800' };
    return { label: 'Baja (<50%) · Requiere mayor preparación', color: 'text-rose-400', badgeBg: 'bg-rose-950/60 border-rose-800' };
  };

  const prob = getPassingProbability(readinessScore);

  // Manejo de importación JSON
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const result = onImportJson?.(content);
        if (result?.success) {
          setFeedbackMessage({ type: 'success', text: result.message });
        } else {
          setFeedbackMessage({ type: 'error', text: result?.message || 'Error al importar archivo.' });
        }
      }
    };
    reader.onerror = () => {
      setFeedbackMessage({ type: 'error', text: 'Error de lectura de archivo en el navegador.' });
    };
    reader.readAsText(file);
    // Limpiar input para permitir re-selección
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
      {/* Encabezado del Dashboard */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-indigo-400" />
            <span>Telemetría de Preparación & Dashboard</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Métricas integrales de cobertura curricular, maestría de preguntas y simulacros cronometrados.
          </p>
        </div>

        {/* Acciones de Respaldo Rápido */}
        <div className="flex items-center gap-2">
          <button
            onClick={onExportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Exportar archivo JSON con el progreso"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span>Exportar Backup (JSON)</span>
          </button>

          <label className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition">
            <Upload className="w-3.5 h-3.5 text-sky-400" />
            <span>Restaurar (JSON)</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Alerta de Notificación de Importación / Acción */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-medium ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-300'
              : 'bg-rose-950/60 border-rose-500/80 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedbackMessage.text}</span>
          </div>
          <button
            onClick={() => setFeedbackMessage(null)}
            className="text-xs font-bold px-2 py-0.5 rounded hover:bg-black/30"
          >
            ✕
          </button>
        </div>
      )}

      {/* KPI Cards Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Índice de Preparación Global */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Índice de Preparación</span>
            <Award className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-100 font-mono">{readinessScore}%</span>
            <span className="text-xs text-slate-400">Score Global</span>
          </div>
          <div className={`text-[11px] font-semibold px-2 py-1 rounded-md border ${prob.badgeBg} ${prob.color}`}>
            Probabilidad de Aprobación: {prob.label}
          </div>
        </div>

        {/* Cobertura de Módulos */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Módulos Leídos</span>
            <BookOpen className="w-4 h-4 text-sky-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-100 font-mono">
              {readModulesCount} / {totalModules}
            </span>
            <span className="text-xs text-slate-400">({modulesReadPercentage}%)</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-500"
              style={{ width: `${modulesReadPercentage}%` }}
            />
          </div>
        </div>

        {/* Maestría en Modo Estudio */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Preguntas Dominadas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-100 font-mono">
              {masteredQuestionsCount} / {questions.length}
            </span>
            <span className="text-xs text-slate-400">({questionMasteryPercentage}%)</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mb-2">
            Marcadas para repaso: <span className="text-amber-400 font-bold">{bookmarkedCount}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${questionMasteryPercentage}%` }}
            />
          </div>
        </div>

        {/* Desempeño en Simulacros */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Simulacros Oficiales</span>
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-100 font-mono">
              {totalExams > 0 ? `${avgExamScore}%` : 'N/A'}
            </span>
            <span className="text-xs text-slate-400">
              {totalExams > 0 ? `Promedio (${totalExams} sesiones)` : 'Sin intentos'}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {totalExams > 0
              ? `Aprobados: ${passedExams}/${totalExams} · Mejor: ${bestExamScore}%`
              : 'Realiza tu primer mock exam'}
          </div>
        </div>
      </div>

      {/* Maestría por Dominio Oficial */}
      <div>
        <h2 className="text-base font-bold text-slate-100 mb-3 flex items-center gap-2">
          <span>Desglose de Maestría por Dominio Oficial</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {domains.map((domain) => {
            const domainMods = modules.filter((m) => m.domainId === domain.id);
            const domainReadCount = domainMods.filter((m) => moduleProgress[m.id]?.isRead).length;
            const domainReadPct =
              domainMods.length > 0 ? Math.round((domainReadCount / domainMods.length) * 100) : 0;

            const domainQuestions = questions.filter((q) => q.domainId === domain.id);
            let domainMasteredCount = 0;
            domainQuestions.forEach((q) => {
              const answers = moduleProgress[q.moduleId]?.studyModeAnswers?.[q.id];
              if (answers && answers.length > 0) {
                const correctIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
                if (answers.length === correctIds.length && answers.every((id) => correctIds.includes(id))) {
                  domainMasteredCount += 1;
                }
              }
            });
            const domainMasteryPct =
              domainQuestions.length > 0
                ? Math.round((domainMasteredCount / domainQuestions.length) * 100)
                : 0;

            return (
              <div
                key={domain.id}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-xs text-indigo-400">
                      {domain.code} · {domain.title}
                    </span>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                      {domain.weightPercentage}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{domain.description}</p>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Progreso de Lectura */}
                  <div>
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span>Lectura de Módulos</span>
                      <span className="font-mono">
                        {domainReadCount}/{domainMods.length} ({domainReadPct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-sky-500 rounded-full"
                        style={{ width: `${domainReadPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Maestría de Preguntas */}
                  <div>
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span>Preguntas Dominadas</span>
                      <span className="font-mono">
                        {domainMasteredCount}/{domainQuestions.length} ({domainMasteryPct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${domainMasteryPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lista de Verificación Curricular (10 Módulos) */}
      <div>
        <h2 className="text-base font-bold text-slate-100 mb-3 flex items-center justify-between">
          <span>Lista de Verificación Curricular (10 Módulos Staff)</span>
          <span className="text-xs font-mono text-slate-400">
            {readModulesCount} de {totalModules} completados
          </span>
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-inner">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 w-10 text-center">Estado</th>
                <th className="px-3 py-3 w-14">Fav</th>
                <th className="px-3 py-3 w-16">Dominio</th>
                <th className="px-4 py-3">Módulo Curricular</th>
                <th className="px-4 py-3 text-center">Preguntas Dominadas</th>
                <th className="px-4 py-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {modules.map((mod) => {
                const isRead = Boolean(moduleProgress[mod.id]?.isRead);
                const isBookmarked = Boolean(moduleProgress[mod.id]?.bookmarked);
                const mastery = moduleMasteryMap[mod.id] || { total: 0, mastered: 0 };
                const domain = domains.find((d) => d.id === mod.domainId);

                return (
                  <tr key={mod.id} className="hover:bg-slate-800/40 transition">
                    {/* Checkbox Leído */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => onToggleModuleRead?.(mod.id)}
                        className="cursor-pointer"
                        title={isRead ? 'Marcar como no leído' : 'Marcar como leído'}
                      >
                        {isRead ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600 hover:text-slate-400" />
                        )}
                      </button>
                    </td>

                    {/* Bookmark */}
                    <td className="px-3 py-3">
                      <button
                        onClick={() => onToggleModuleBookmark?.(mod.id)}
                        className="cursor-pointer"
                        title="Alternar favorito"
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            isBookmarked ? 'text-amber-400 fill-amber-400' : 'text-slate-600 hover:text-slate-400'
                          }`}
                        />
                      </button>
                    </td>

                    {/* Código Dominio */}
                    <td className="px-3 py-3 font-mono font-bold text-indigo-400">
                      {domain?.code || 'D?'}
                    </td>

                    {/* Título del Módulo */}
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-200">
                        M{mod.order < 10 ? `0${mod.order}` : mod.order}: {mod.shortTitle || mod.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{mod.description}</div>
                    </td>

                    {/* Preguntas Dominadas */}
                    <td className="px-4 py-3 text-center font-mono">
                      <span className={mastery.mastered === mastery.total && mastery.total > 0 ? 'text-emerald-400 font-bold' : ''}>
                        {mastery.mastered} / {mastery.total}
                      </span>
                    </td>

                    {/* Botón Ir a Guía */}
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onNavigateToModule?.(mod.id)}
                        className="flex items-center gap-1 ml-auto px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                      >
                        <span>Estudiar</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historial de Simulacros Cronometrados */}
      <div>
        <h2 className="text-base font-bold text-slate-100 mb-3 flex items-center justify-between">
          <span>Historial de Sesiones de Examen Cronometrado</span>
          <span className="text-xs font-mono text-slate-400">{examSessions.length} registros</span>
        </h2>

        {examSessions.length === 0 ? (
          <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/60 text-center">
            <Award className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">
              Aún no has completado ningún simulacro cronometrado. Dirígete a la pestaña{' '}
              <strong>Simulador de Examen</strong> para realizar tu primera prueba.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-inner">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Fecha y Hora</th>
                  <th className="px-4 py-3 text-center">Puntaje</th>
                  <th className="px-4 py-3 text-center">Porcentaje</th>
                  <th className="px-4 py-3 text-center">Resultado</th>
                  <th className="px-4 py-3 text-center">Tiempo</th>
                  <th className="px-4 py-3">Rendimiento por Dominio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
                {examSessions.map((session) => {
                  const dateStr = new Date(session.timestamp).toLocaleString();
                  const timeSpentMins = Math.floor((session.timeSpentSeconds || 0) / 60);
                  const timeSpentSecs = (session.timeSpentSeconds || 0) % 60;

                  return (
                    <tr key={session.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3 font-sans text-slate-300">{dateStr}</td>
                      <td className="px-4 py-3 text-center font-bold text-slate-100">
                        {session.score} / {session.totalQuestions}
                      </td>
                      <td className="px-4 py-3 text-center font-bold">
                        <span className={session.passed ? 'text-emerald-400' : 'text-rose-400'}>
                          {session.percentage}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded-full ${
                            session.passed
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-rose-950 text-rose-400 border border-rose-800'
                          }`}
                        >
                          {session.passed ? 'APROBADO' : 'NO APROBADO'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-slate-400">
                        {timeSpentMins}m {timeSpentSecs}s
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-[11px]">
                        {session.domainScores
                          ? Object.values(session.domainScores)
                              .map((ds) => `${ds.domainCode || ds.domainId}: ${ds.percentage}%`)
                              .join(' | ')
                          : 'N/A'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Centro de Gestión de Datos & Reset */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-200">Gestión de Datos y Respaldo</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Tus datos se almacenan exclusivamente en tu navegador (LocalStorage). Puedes respaldar o restablecer tu progreso en cualquier momento.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowResetConfirmModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-rose-950/60 hover:bg-rose-950 text-rose-400 border border-rose-800/80 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Progreso de Fábrica</span>
          </button>
        </div>
      </div>

      {/* Modal de Confirmación de Reinicio */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-100">¿Restablecer todo el progreso?</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Esta acción eliminará todos los registros de lectura, respuestas del modo estudio, preguntas favoritas y el historial de simulacros cronometrados. Esta operación no se puede deshacer a menos que tengas un respaldo JSON exportado.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirmModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  setShowResetConfirmModal(false);
                  onResetState?.();
                  setFeedbackMessage({
                    type: 'success',
                    text: 'Se ha restablecido el estado a los valores por defecto.'
                  });
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-sm transition"
              >
                Sí, Reiniciar Todo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
