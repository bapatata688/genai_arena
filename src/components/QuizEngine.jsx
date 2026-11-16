import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  Clock,
  Award,
  AlertTriangle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckSquare,
  Square,
  Radio,
  BookOpen,
  ArrowRight,
  Flag
} from 'lucide-react';

export default function QuizEngine({
  questions = [],
  domains = [],
  modules = [],
  activeDomainId,
  activeModuleId,
  bookmarkedQuestionIds = [],
  moduleProgress = {},
  onToggleBookmarkQuestion,
  onSaveStudyAnswer,
  onRecordExamSession,
  onNavigateToStudyModule
}) {
  // Modo de operación: 'study' (Modo Estudio) | 'mock' (Simulacro de Examen)
  const [engineMode, setEngineMode] = useState('study');

  // ==========================================
  // ESTADO PARA MODO ESTUDIO
  // ==========================================
  const [studyFilterScope, setStudyFilterScope] = useState('module'); // 'module' | 'domain' | 'all' | 'bookmarks'
  const [studyCurrentIndex, setStudyCurrentIndex] = useState(0);
  const [studySelectedOptions, setStudySelectedOptions] = useState([]);
  const [studyIsChecked, setStudyIsChecked] = useState(false);

  // Filtrado de preguntas en Modo Estudio
  const filteredStudyQuestions = useMemo(() => {
    switch (studyFilterScope) {
      case 'module':
        return questions.filter((q) => q.moduleId === activeModuleId);
      case 'domain':
        return questions.filter((q) => q.domainId === activeDomainId);
      case 'bookmarks':
        return questions.filter((q) => bookmarkedQuestionIds.includes(q.id));
      case 'all':
      default:
        return questions;
    }
  }, [questions, activeModuleId, activeDomainId, bookmarkedQuestionIds, studyFilterScope]);

  // Asegurar que el índice actual sea válido
  const currentStudyQuestion = filteredStudyQuestions[studyCurrentIndex] || filteredStudyQuestions[0];

  // Cargar respuesta previa persistida si existe
  useEffect(() => {
    if (!currentStudyQuestion) {
      setStudySelectedOptions([]);
      setStudyIsChecked(false);
      return;
    }
    const modProg = moduleProgress[currentStudyQuestion.moduleId];
    const prevAnswer = modProg?.studyModeAnswers?.[currentStudyQuestion.id];
    if (prevAnswer && prevAnswer.length > 0) {
      setStudySelectedOptions(prevAnswer);
      setStudyIsChecked(true);
    } else {
      setStudySelectedOptions([]);
      setStudyIsChecked(false);
    }
  }, [currentStudyQuestion, moduleProgress]);

  // Selección de opciones en Modo Estudio
  const handleToggleStudyOption = (optionId) => {
    if (studyIsChecked) return; // Bloqueado tras comprobar
    if (currentStudyQuestion.type === 'single') {
      setStudySelectedOptions([optionId]);
    } else {
      setStudySelectedOptions((prev) =>
        prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
      );
    }
  };

  // Comprobar respuesta en Modo Estudio
  const handleCheckStudyAnswer = () => {
    if (studySelectedOptions.length === 0 || !currentStudyQuestion) return;
    setStudyIsChecked(true);
    onSaveStudyAnswer?.(currentStudyQuestion.moduleId, currentStudyQuestion.id, studySelectedOptions);
  };

  // Reintentar pregunta
  const handleRetryStudyAnswer = () => {
    setStudyIsChecked(false);
    setStudySelectedOptions([]);
  };

  // ==========================================
  // ESTADO PARA MODO EXAMEN SIMULADO (MOCK EXAM)
  // ==========================================
  const [mockExamState, setMockExamState] = useState('idle'); // 'idle' | 'running' | 'completed'
  const [mockQuestions, setMockQuestions] = useState([]);
  const [mockCurrentIndex, setMockCurrentIndex] = useState(0);
  const [mockUserAnswers, setMockUserAnswers] = useState({}); // questionId -> optionIds[]
  const [mockFlaggedQuestionIds, setMockFlaggedQuestionIds] = useState([]);
  const [mockRemainingSeconds, setMockRemainingSeconds] = useState(3600); // 60 min default
  const [mockTotalDurationSeconds, setMockTotalDurationSeconds] = useState(3600);
  const [mockExamSessionResult, setMockExamSessionResult] = useState(null);
  const [showConfirmFinishModal, setShowConfirmFinishModal] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'incorrect' | 'flagged'

  // Generar conjunto ponderado de 50 preguntas según las especificaciones del blueprint
  const generateWeightedMockQuestions = useCallback(
    (count = 50) => {
      // 50 preguntas: 15 D1 (~30%), 18 D2 (~35%), 10 D3 (~20%), 7 D4 (~15%)
      const quota = {
        'domain-1': Math.round(count * 0.3),
        'domain-2': Math.round(count * 0.36),
        'domain-3': Math.round(count * 0.2),
        'domain-4': count - Math.round(count * 0.3) - Math.round(count * 0.36) - Math.round(count * 0.2)
      };

      const selected = [];
      domains.forEach((d) => {
        const domainQuestions = questions.filter((q) => q.domainId === d.id);
        const shuffled = [...domainQuestions].sort(() => 0.5 - Math.random());
        const needed = quota[d.id] || Math.floor(count / 4);
        selected.push(...shuffled.slice(0, needed));
      });

      // Mezclar el conjunto final de preguntas seleccionadas
      return selected.sort(() => 0.5 - Math.random());
    },
    [domains, questions]
  );

  // Iniciar simulacro
  const handleStartMockExam = (questionCount = 50, durationMinutes = 60) => {
    let selectedQs = [];
    if (questionCount === 75) {
      selectedQs = [...questions].sort(() => 0.5 - Math.random());
    } else {
      selectedQs = generateWeightedMockQuestions(50);
    }
    const durationSec = durationMinutes * 60;
    setMockQuestions(selectedQs);
    setMockCurrentIndex(0);
    setMockUserAnswers({});
    setMockFlaggedQuestionIds([]);
    setMockRemainingSeconds(durationSec);
    setMockTotalDurationSeconds(durationSec);
    setMockExamSessionResult(null);
    setMockExamState('running');
  };

  // Temporizador regresivo en Modo Examen
  useEffect(() => {
    if (mockExamState !== 'running') return;
    const timer = setInterval(() => {
      setMockRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-finalizar examen cuando el tiempo se agote
          finishMockExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mockExamState]);

  // Selección de opciones en Modo Examen
  const handleToggleMockOption = (questionId, optionId, type) => {
    if (mockExamState !== 'running') return;
    setMockUserAnswers((prev) => {
      const current = prev[questionId] || [];
      if (type === 'single') {
        return { ...prev, [questionId]: [optionId] };
      }
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [questionId]: updated };
    });
  };

  // Alternar bandera de revisión en Modo Examen
  const handleToggleMockFlag = (questionId) => {
    setMockFlaggedQuestionIds((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };

  // Finalizar y calificar el examen
  const finishMockExam = () => {
    setShowConfirmFinishModal(false);
    const timeSpent = mockTotalDurationSeconds - mockRemainingSeconds;
    let correctCount = 0;

    const domainScores = {};
    domains.forEach((d) => {
      domainScores[d.id] = {
        domainId: d.id,
        domainCode: d.code,
        domainTitle: d.title,
        weightPercentage: d.weightPercentage,
        totalQuestions: 0,
        correctQuestions: 0,
        percentage: 0
      };
    });

    mockQuestions.forEach((q) => {
      const userSelected = mockUserAnswers[q.id] || [];
      const correctOptionIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
      const isCorrect =
        userSelected.length === correctOptionIds.length &&
        userSelected.every((id) => correctOptionIds.includes(id));

      if (isCorrect) correctCount += 1;

      if (domainScores[q.domainId]) {
        domainScores[q.domainId].totalQuestions += 1;
        if (isCorrect) domainScores[q.domainId].correctQuestions += 1;
      }
    });

    // Calcular porcentajes por dominio
    Object.keys(domainScores).forEach((dId) => {
      const d = domainScores[dId];
      d.percentage = d.totalQuestions > 0 ? Math.round((d.correctQuestions / d.totalQuestions) * 100) : 0;
    });

    const totalQuestions = mockQuestions.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const passed = percentage >= 70;

    const sessionResult = {
      id: `exam-${Date.now()}`,
      timestamp: Date.now(),
      durationSeconds: mockTotalDurationSeconds,
      timeSpentSeconds: timeSpent,
      totalQuestions,
      score: correctCount,
      percentage,
      passed,
      domainScores,
      answers: mockUserAnswers
    };

    setMockExamSessionResult(sessionResult);
    setMockExamState('completed');
    onRecordExamSession?.(sessionResult);
  };

  // Formato de tiempo MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      {/* Switcher de Modalidad: Estudio vs Examen Simulado */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEngineMode('study')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              engineMode === 'study'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Modo Estudio (Feedback Inmediato)</span>
          </button>

          <button
            onClick={() => setEngineMode('mock')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              engineMode === 'mock'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Simulador Cronometrado (Mock Exam)</span>
          </button>
        </div>

        {engineMode === 'study' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">Filtrar por:</span>
            <select
              value={studyFilterScope}
              onChange={(e) => {
                setStudyFilterScope(e.target.value);
                setStudyCurrentIndex(0);
              }}
              className="bg-slate-900 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="module">Módulo Activo ({questions.filter((q) => q.moduleId === activeModuleId).length} q)</option>
              <option value="domain">Dominio Activo ({questions.filter((q) => q.domainId === activeDomainId).length} q)</option>
              <option value="all">Todo el Banco ({questions.length} preguntas)</option>
              <option value="bookmarks">Favoritas ({bookmarkedQuestionIds.length} q)</option>
            </select>
          </div>
        )}
      </div>

      {/* ===================================================== */}
      {/* VISTA 1: MODO ESTUDIO                                 */}
      {/* ===================================================== */}
      {engineMode === 'study' && (
        <div>
          {filteredStudyQuestions.length === 0 ? (
            <div className="p-12 text-center rounded-xl border border-slate-800 bg-slate-900/60">
              <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-200 mb-1">No hay preguntas para el filtro actual</h3>
              <p className="text-xs text-slate-400">
                Selecciona otro filtro o cambia de módulo para continuar practicando.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Barra de Progreso y Navegación de Estudio */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200">
                    Pregunta {studyCurrentIndex + 1} de {filteredStudyQuestions.length}
                  </span>
                  <span className="text-slate-500 font-mono">({currentStudyQuestion.id})</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={studyCurrentIndex === 0}
                    onClick={() => setStudyCurrentIndex((prev) => Math.max(0, prev - 1))}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Anterior</span>
                  </button>

                  <button
                    disabled={studyCurrentIndex === filteredStudyQuestions.length - 1}
                    onClick={() => setStudyCurrentIndex((prev) => Math.min(filteredStudyQuestions.length - 1, prev + 1))}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition"
                  >
                    <span>Siguiente</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Tarjeta de la Pregunta en Estudio */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
                {/* Meta de la Pregunta */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/80">
                      {currentStudyQuestion.domainId.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {currentStudyQuestion.type === 'single'
                        ? 'Opción Única'
                        : `Selección Múltiple (Elija ${currentStudyQuestion.options.filter((o) => o.isCorrect).length})`}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-amber-400 border border-amber-900/50 capitalize">
                      {currentStudyQuestion.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleBookmarkQuestion?.(currentStudyQuestion.id)}
                    className={`p-1.5 rounded-lg border transition ${
                      bookmarkedQuestionIds.includes(currentStudyQuestion.id)
                        ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                    title="Marcar pregunta para repaso"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarkedQuestionIds.includes(currentStudyQuestion.id) ? 'fill-amber-400' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Enunciado del Escenario */}
                <h3 className="text-sm md:text-base font-medium text-slate-100 leading-relaxed mb-6">
                  {currentStudyQuestion.prompt}
                </h3>

                {/* Lista de Opciones Interactivas */}
                <div className="space-y-3 mb-6">
                  {currentStudyQuestion.options.map((option) => {
                    const isSelected = studySelectedOptions.includes(option.id);
                    const isCorrect = option.isCorrect;

                    let optionStyle = 'border-slate-800 bg-slate-950/70 hover:border-slate-700 text-slate-300';
                    if (studyIsChecked) {
                      if (isCorrect) {
                        optionStyle = 'border-emerald-500/80 bg-emerald-950/30 text-emerald-200';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'border-rose-500/80 bg-rose-950/30 text-rose-200';
                      } else {
                        optionStyle = 'border-slate-800/80 bg-slate-950/40 text-slate-400 opacity-80';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-indigo-500 bg-indigo-950/40 text-indigo-100 shadow-sm shadow-indigo-950';
                    }

                    return (
                      <div
                        key={option.id}
                        onClick={() => handleToggleStudyOption(option.id)}
                        className={`cursor-pointer rounded-xl border p-4 transition flex flex-col gap-2 ${optionStyle}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {currentStudyQuestion.type === 'single' ? (
                              isSelected ? (
                                <Radio className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-slate-600" />
                              )
                            ) : isSelected ? (
                              <CheckSquare className="w-4 h-4 text-indigo-400 fill-indigo-950" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-600" />
                            )}
                          </div>

                          <div className="flex-1">
                            <span className="font-mono font-bold text-xs mr-2 text-slate-400 uppercase">
                              {option.id})
                            </span>
                            <span className="text-xs md:text-sm leading-relaxed">{option.text}</span>
                          </div>

                          {studyIsChecked && (
                            <div>
                              {isCorrect ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                              ) : isSelected ? (
                                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                              ) : null}
                            </div>
                          )}
                        </div>

                        {/* Rationale de Distractor en Modo Comprobado */}
                        {studyIsChecked && option.distractorRationale && (
                          <div
                            className={`mt-2 pt-2 border-t text-xs leading-relaxed ${
                              isCorrect
                                ? 'border-emerald-800/50 text-emerald-300'
                                : isSelected
                                ? 'border-rose-800/50 text-rose-300'
                                : 'border-slate-800 text-slate-400'
                            }`}
                          >
                            <span className="font-semibold mr-1">
                              {isCorrect ? '✅ Justificación Canónica:' : isSelected ? '❌ Análisis del Error:' : 'ℹ️ Por qué es un distractor:'}
                            </span>
                            {option.distractorRationale}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Acciones de Comprobación */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                  <div className="text-xs text-slate-400">
                    {studyIsChecked ? (
                      <span className="text-slate-300">
                        {currentStudyQuestion.options
                          .filter((o) => o.isCorrect)
                          .every((o) => studySelectedOptions.includes(o.id)) &&
                        studySelectedOptions.length === currentStudyQuestion.options.filter((o) => o.isCorrect).length
                          ? '🎉 ¡Acierto registrado en tu telemetría!'
                          : '⚠️ Fallo registrado. Revisa la heurística de examen abajo.'}
                      </span>
                    ) : (
                      <span>
                        {currentStudyQuestion.type === 'single'
                          ? 'Selecciona 1 opción y presiona Comprobar.'
                          : `Selecciona ${currentStudyQuestion.options.filter((o) => o.isCorrect).length} opciones requeridas.`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {studyIsChecked ? (
                      <button
                        onClick={handleRetryStudyAnswer}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reintentar</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleCheckStudyAnswer}
                        disabled={studySelectedOptions.length === 0}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white shadow-md shadow-emerald-950 transition"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Comprobar Respuesta</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Explicación Global y Heurística de Examen */}
                {studyIsChecked && (
                  <div className="mt-6 space-y-4 pt-4 border-t border-slate-800">
                    {/* Explicación Global */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                        <span>Explicación Arquitectónica del Caso</span>
                      </h4>
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                        {currentStudyQuestion.overallExplanation}
                      </p>
                    </div>

                    {/* Heurística de Examen */}
                    <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/70">
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-2">
                        <span>💡 Heurística de Certificación Google Cloud</span>
                      </h4>
                      <p className="text-xs md:text-sm text-amber-200 leading-relaxed font-medium">
                        {currentStudyQuestion.examHeuristic}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================== */}
      {/* VISTA 2: MODO EXAMEN SIMULADO (MOCK EXAM)             */}
      {/* ===================================================== */}
      {engineMode === 'mock' && (
        <div>
          {/* ESTADO 1: PANTALLA INICIAL DEL SIMULACRO */}
          {mockExamState === 'idle' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-950 border border-indigo-700/80 flex items-center justify-center text-indigo-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-100">Simulador Cronometrado de Certificación</h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Google Cloud Certified — Generative AI Leader Practice Exam
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Este simulador replica las condiciones reales del examen oficial de certificación. Las preguntas son
                seleccionadas estocásticamente respetando las ponderaciones matemáticas de los 4 dominios oficiales:
              </p>

              {/* Desglose de Ponderación Oficial */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs">
                {domains.map((d) => (
                  <div key={d.id} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold font-mono text-indigo-400 mr-2">{d.code}</span>
                      <span className="text-slate-300">{d.title}</span>
                    </div>
                    <span className="font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                      {d.weightPercentage}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-indigo-950/30 border border-indigo-800/60 p-4 rounded-xl mb-6 text-xs text-indigo-200 space-y-2">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Condiciones del Examen Oficial:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                  <li>Umbral de aprobación: <strong>70% de aciertos</strong> (35 de 50 preguntas).</li>
                  <li>Temporizador regresivo continuo con entrega automática al expirar.</li>
                  <li>Sin retroalimentación intermedia hasta la entrega final del examen.</li>
                  <li>Diagnóstico integral por dominio con sugerencias de repaso al finalizar.</li>
                </ul>
              </div>

              {/* Botones para Iniciar */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleStartMockExam(50, 60)}
                  className="flex-1 min-w-[220px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-950 transition"
                >
                  <Award className="w-4 h-4" />
                  <span>Iniciar Examen Oficial (50 q · 60 min)</span>
                </button>

                <button
                  onClick={() => handleStartMockExam(75, 90)}
                  className="flex-1 min-w-[220px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition"
                >
                  <Clock className="w-4 h-4 text-sky-400" />
                  <span>Examen Maestro Completo (75 q · 90 min)</span>
                </button>
              </div>
            </div>
          )}

          {/* ESTADO 2: EXAMEN EN CURSO */}
          {mockExamState === 'running' && mockQuestions.length > 0 && (
            <div className="flex flex-col gap-6">
              {/* Barra de Control y Temporizador */}
              <div className="sticky top-16 z-30 flex flex-wrap items-center justify-between gap-3 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 font-mono text-sm px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
                    <Clock
                      className={`w-4 h-4 ${
                        mockRemainingSeconds < 300
                          ? 'text-rose-400 animate-pulse'
                          : mockRemainingSeconds < 600
                          ? 'text-amber-400'
                          : 'text-sky-400'
                      }`}
                    />
                    <span
                      className={`font-bold ${
                        mockRemainingSeconds < 300
                          ? 'text-rose-400'
                          : mockRemainingSeconds < 600
                          ? 'text-amber-400'
                          : 'text-slate-100'
                      }`}
                    >
                      {formatTime(mockRemainingSeconds)}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400">
                    Pregunta <strong className="text-slate-200">{mockCurrentIndex + 1}</strong> de{' '}
                    <strong className="text-slate-200">{mockQuestions.length}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleMockFlag(mockQuestions[mockCurrentIndex].id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      mockFlaggedQuestionIds.includes(mockQuestions[mockCurrentIndex].id)
                        ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>
                      {mockFlaggedQuestionIds.includes(mockQuestions[mockCurrentIndex].id) ? 'Marcada' : 'Marcar para Revisión'}
                    </span>
                  </button>

                  <button
                    onClick={() => setShowConfirmFinishModal(true)}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition"
                  >
                    Finalizar Examen
                  </button>
                </div>
              </div>

              {/* Layout: Panel Central de Pregunta + Cuadrícula Lateral */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Pregunta Activa */}
                <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
                  {(() => {
                    const q = mockQuestions[mockCurrentIndex];
                    const selected = mockUserAnswers[q.id] || [];
                    const isFlagged = mockFlaggedQuestionIds.includes(q.id);

                    return (
                      <div>
                        {/* Cabecera de la Pregunta */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/80">
                              {q.domainId.toUpperCase()}
                            </span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              {q.type === 'single'
                                ? 'Opción Única'
                                : `Selección Múltiple (Elija ${q.options.filter((o) => o.isCorrect).length})`}
                            </span>
                          </div>

                          {isFlagged && (
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/80 flex items-center gap-1">
                              <Flag className="w-3 h-3 fill-amber-400" />
                              <span>Para Revisión</span>
                            </span>
                          )}
                        </div>

                        {/* Enunciado */}
                        <h3 className="text-sm md:text-base font-medium text-slate-100 leading-relaxed mb-6">
                          {q.prompt}
                        </h3>

                        {/* Opciones */}
                        <div className="space-y-3 mb-6">
                          {q.options.map((option) => {
                            const isSelected = selected.includes(option.id);

                            return (
                              <div
                                key={option.id}
                                onClick={() => handleToggleMockOption(q.id, option.id, q.type)}
                                className={`cursor-pointer rounded-xl border p-4 transition flex items-start gap-3 ${
                                  isSelected
                                    ? 'border-indigo-500 bg-indigo-950/40 text-indigo-100 shadow-sm'
                                    : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 text-slate-300'
                                }`}
                              >
                                <div className="mt-0.5">
                                  {q.type === 'single' ? (
                                    isSelected ? (
                                      <Radio className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                                    ) : (
                                      <div className="w-4 h-4 rounded-full border border-slate-600" />
                                    )
                                  ) : isSelected ? (
                                    <CheckSquare className="w-4 h-4 text-indigo-400 fill-indigo-950" />
                                  ) : (
                                    <Square className="w-4 h-4 text-slate-600" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <span className="font-mono font-bold text-xs mr-2 text-slate-400 uppercase">
                                    {option.id})
                                  </span>
                                  <span className="text-xs md:text-sm leading-relaxed">{option.text}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Botones de Navegación Anterior / Siguiente */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                          <button
                            disabled={mockCurrentIndex === 0}
                            onClick={() => setMockCurrentIndex((prev) => Math.max(0, prev - 1))}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition text-xs font-semibold"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Anterior</span>
                          </button>

                          <button
                            disabled={mockCurrentIndex === mockQuestions.length - 1}
                            onClick={() => setMockCurrentIndex((prev) => Math.min(mockQuestions.length - 1, prev + 1))}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition text-xs font-semibold"
                          >
                            <span>Siguiente</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Cuadrícula de Preguntas (Navegación Rápida) */}
                <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Cuadrícula del Examen
                    </h4>
                    <span className="text-xs font-mono text-slate-400">
                      {Object.keys(mockUserAnswers).filter((k) => mockUserAnswers[k]?.length > 0).length} /{' '}
                      {mockQuestions.length}
                    </span>
                  </div>

                  {/* Leyenda */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-indigo-600" />
                      <span>Respondida</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-amber-500" />
                      <span>Marcada</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-slate-800 border border-slate-700" />
                      <span>Sin responder</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded border-2 border-indigo-400" />
                      <span>Actual</span>
                    </div>
                  </div>

                  {/* Matriz de Botones de Salto */}
                  <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 gap-1.5 max-h-[360px] overflow-y-auto p-1">
                    {mockQuestions.map((q, idx) => {
                      const isCurrent = idx === mockCurrentIndex;
                      const hasAnswer = mockUserAnswers[q.id] && mockUserAnswers[q.id].length > 0;
                      const isFlagged = mockFlaggedQuestionIds.includes(q.id);

                      let btnStyle = 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700';
                      if (isFlagged) {
                        btnStyle = 'bg-amber-950 text-amber-300 border-amber-500/80 font-bold';
                      } else if (hasAnswer) {
                        btnStyle = 'bg-indigo-600 text-white border-indigo-500 font-semibold';
                      }

                      return (
                        <button
                          key={q.id}
                          onClick={() => setMockCurrentIndex(idx)}
                          className={`h-8 rounded-lg text-xs font-mono border transition flex items-center justify-center relative ${btnStyle} ${
                            isCurrent ? 'ring-2 ring-indigo-400 ring-offset-1 ring-offset-slate-900 font-black' : ''
                          }`}
                        >
                          {idx + 1}
                          {isFlagged && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ESTADO 3: DIAGNÓSTICO DETALLADO DEL EXAMEN FINALIZADO */}
          {mockExamState === 'completed' && mockExamSessionResult && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 shadow-2xl flex flex-col gap-8">
              {/* Resumen Global del Resultado */}
              <div
                className={`p-6 rounded-2xl border text-center flex flex-col items-center justify-center gap-3 ${
                  mockExamSessionResult.passed
                    ? 'bg-emerald-950/30 border-emerald-500/80'
                    : 'bg-rose-950/30 border-rose-500/80'
                }`}
              >
                <div
                  className={`h-16 w-16 rounded-2xl flex items-center justify-center ${
                    mockExamSessionResult.passed
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500'
                      : 'bg-rose-950 text-rose-400 border border-rose-500'
                  }`}
                >
                  <Award className="w-9 h-9" />
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100">
                  {mockExamSessionResult.passed
                    ? '¡APROBADO! Credencial Google Cloud GenAI Leader'
                    : 'NO APROBADO — Requiere Refuerzo Curricular'}
                </h2>

                <p className="text-xs md:text-sm text-slate-300 max-w-xl">
                  {mockExamSessionResult.passed
                    ? 'Has superado el umbral oficial del 70% de Google Cloud. Tu comprensión conceptual, tecnológica y estratégica se encuentra en nivel de maestría.'
                    : 'El umbral mínimo de certificación es 70%. Consulta el desglose diagnóstico por dominio a continuación para enfocar tu estudio en las áreas críticas.'}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-6 mt-2 font-mono text-sm">
                  <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block font-sans">Puntaje Final</span>
                    <strong className="text-xl text-slate-100">
                      {mockExamSessionResult.score} / {mockExamSessionResult.totalQuestions} ({mockExamSessionResult.percentage}%)
                    </strong>
                  </div>

                  <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block font-sans">Tiempo Invertido</span>
                    <strong className="text-xl text-slate-100">
                      {Math.floor(mockExamSessionResult.timeSpentSeconds / 60)}m {mockExamSessionResult.timeSpentSeconds % 60}s
                    </strong>
                  </div>

                  <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block font-sans">Umbral Oficial</span>
                    <strong className="text-xl text-indigo-400">70% Requerido</strong>
                  </div>
                </div>
              </div>

              {/* Desglose Diagnóstico por Dominio */}
              <div>
                <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  <span>Diagnóstico por Dominio Oficial del Examen</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.values(mockExamSessionResult.domainScores).map((ds) => {
                    const isPassingDomain = ds.percentage >= 70;
                    return (
                      <div
                        key={ds.domainId}
                        className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono font-bold text-xs text-indigo-400">
                              {ds.domainCode} · {ds.weightPercentage}
                            </span>
                            <span
                              className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                                isPassingDomain
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : 'bg-rose-950 text-rose-400 border border-rose-800'
                              }`}
                            >
                              {ds.percentage}% ({ds.correctQuestions}/{ds.totalQuestions})
                            </span>
                          </div>
                          <h4 className="text-xs font-semibold text-slate-200">{ds.domainTitle}</h4>
                        </div>

                        {/* Barra de Progreso */}
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isPassingDomain ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${ds.percentage}%` }}
                          />
                        </div>

                        {/* Recomendación de Repaso si no aprobó */}
                        {!isPassingDomain && (
                          <button
                            onClick={() => {
                              const targetMod = modules.find((m) => m.domainId === ds.domainId);
                              if (targetMod && onNavigateToStudyModule) {
                                onNavigateToStudyModule(targetMod.id);
                              }
                            }}
                            className="text-left text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium transition"
                          >
                            <span>Repasar módulos de este dominio en la Guía</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Revisión Pregunta por Pregunta del Examen */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h3 className="text-base font-bold text-slate-100">
                    Revisión Detallada de Preguntas ({mockQuestions.length})
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Mostrar:</span>
                    <select
                      value={reviewFilter}
                      onChange={(e) => setReviewFilter(e.target.value)}
                      className="bg-slate-900 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 border border-slate-700"
                    >
                      <option value="all">Todas las preguntas</option>
                      <option value="incorrect">Solo respuestas incorrectas</option>
                      <option value="flagged">Solo marcadas para revisión</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockQuestions
                    .filter((q) => {
                      const userSelected = mockUserAnswers[q.id] || [];
                      const correctOptionIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
                      const isCorrect =
                        userSelected.length === correctOptionIds.length &&
                        userSelected.every((id) => correctOptionIds.includes(id));

                      if (reviewFilter === 'incorrect') return !isCorrect;
                      if (reviewFilter === 'flagged') return mockFlaggedQuestionIds.includes(q.id);
                      return true;
                    })
                    .map((q, idx) => {
                      const userSelected = mockUserAnswers[q.id] || [];
                      const correctOptionIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
                      const isCorrect =
                        userSelected.length === correctOptionIds.length &&
                        userSelected.every((id) => correctOptionIds.includes(id));

                      return (
                        <div
                          key={q.id}
                          className={`p-5 rounded-xl border bg-slate-950/60 ${
                            isCorrect ? 'border-slate-800' : 'border-rose-900/60'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-mono text-xs font-bold text-slate-400">
                              #{idx + 1} · {q.id} ({q.domainId.toUpperCase()})
                            </span>
                            <span
                              className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                                isCorrect
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : 'bg-rose-950 text-rose-400 border border-rose-800'
                              }`}
                            >
                              {isCorrect ? 'Correcta' : 'Incorrecta'}
                            </span>
                          </div>

                          <p className="text-xs md:text-sm text-slate-200 font-medium mb-4 leading-relaxed">
                            {q.prompt}
                          </p>

                          <div className="space-y-2 mb-4">
                            {q.options.map((opt) => {
                              const wasSelected = userSelected.includes(opt.id);
                              const isOptCorrect = opt.isCorrect;

                              let optBorder = 'border-slate-800 bg-slate-900/40 text-slate-400';
                              if (isOptCorrect) {
                                optBorder = 'border-emerald-500/80 bg-emerald-950/30 text-emerald-200';
                              } else if (wasSelected) {
                                optBorder = 'border-rose-500/80 bg-rose-950/30 text-rose-200';
                              }

                              return (
                                <div key={opt.id} className={`p-3 rounded-lg border text-xs leading-relaxed ${optBorder}`}>
                                  <div className="flex items-start justify-between gap-2">
                                    <span>
                                      <strong className="font-mono uppercase mr-1">{opt.id})</strong> {opt.text}
                                    </span>
                                    {wasSelected && (
                                      <span className="font-mono text-[10px] uppercase font-bold shrink-0">
                                        (Tu elección)
                                      </span>
                                    )}
                                  </div>
                                  <div className="mt-1 text-[11px] opacity-90">{opt.distractorRationale}</div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Heurística */}
                          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/50 text-[11px] text-amber-200">
                            <strong>💡 Heurística: </strong> {q.examHeuristic}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Botón para Reiniciar o volver a intentar */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setMockExamState('idle')}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
                >
                  Volver al Menú de Exámenes
                </button>
              </div>
            </div>
          )}

          {/* MODAL DE CONFIRMACIÓN DE ENTREGA DE EXAMEN */}
          {showConfirmFinishModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl flex flex-col gap-4">
                <div className="flex items-center gap-3 text-amber-400">
                  <AlertTriangle className="w-6 h-6" />
                  <h3 className="text-base font-bold text-slate-100">¿Deseas finalizar el examen ahora?</h3>
                </div>

                <div className="text-xs text-slate-300 space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                  <p>
                    • Preguntas respondidas:{' '}
                    <strong>
                      {Object.keys(mockUserAnswers).filter((k) => mockUserAnswers[k]?.length > 0).length} /{' '}
                      {mockQuestions.length}
                    </strong>
                  </p>
                  <p>
                    • Preguntas marcadas para revisión: <strong>{mockFlaggedQuestionIds.length}</strong>
                  </p>
                  <p>
                    • Tiempo restante: <strong>{formatTime(mockRemainingSeconds)}</strong>
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowConfirmFinishModal(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                  >
                    Continuar Examen
                  </button>

                  <button
                    onClick={finishMockExam}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition"
                  >
                    Confirmar y Calificar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
