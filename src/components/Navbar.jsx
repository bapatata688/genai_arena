import React from 'react';
import { Sparkles, BookOpen, CheckSquare, BarChart3, Download, CheckCircle2 } from 'lucide-react';

export default function Navbar({
  domains = [],
  modules = [],
  questions = [],
  activeDomainId,
  activeModuleId,
  activeViewMode,
  moduleProgress = {},
  onSelectDomain,
  onSelectModule,
  onSelectViewMode,
  onExportBackup
}) {
  const currentDomain = domains.find((d) => d.id === activeDomainId) || domains[0];
  const domainModules = modules.filter((m) => m.domainId === currentDomain?.id);

  // Calcular métricas globales genuinas
  const totalModules = modules.length;
  const readModulesCount = modules.filter((m) => moduleProgress[m.id]?.isRead).length;
  const modulesReadPercentage = totalModules > 0 ? Math.round((readModulesCount / totalModules) * 100) : 0;

  // Preguntas dominadas en modo estudio
  let masteredQuestionsCount = 0;
  questions.forEach((q) => {
    const modProg = moduleProgress[q.moduleId];
    if (modProg && modProg.studyModeAnswers && modProg.studyModeAnswers[q.id]) {
      const selected = modProg.studyModeAnswers[q.id];
      const correctOptionIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
      const isCorrect =
        selected.length === correctOptionIds.length &&
        selected.every((id) => correctOptionIds.includes(id));
      if (isCorrect) masteredQuestionsCount += 1;
    }
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md select-none">
      {/* Barra Superior Principal */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Marca & Identidad */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-950/90 border border-indigo-700/60 flex items-center justify-center text-indigo-400 shadow-sm shadow-indigo-950">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base md:text-lg tracking-wider bg-gradient-to-r from-indigo-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
                GENAI LEADER ARENA
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/80 font-semibold tracking-wide">
                STAFF DRILLS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Google Cloud Certified — Generative AI Leader
            </p>
          </div>
        </div>

        {/* Selector de Modo de Vista */}
        <div className="flex items-center bg-slate-950/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => onSelectViewMode('study')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeViewMode === 'study'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-900/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Guía de Estudio Teórico y Arquitectónico"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guía de Estudio</span>
          </button>

          <button
            onClick={() => onSelectViewMode('quiz')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeViewMode === 'quiz'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-900/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Simulador de Examen (Modo Estudio y Modo Examen)"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Simulador de Examen</span>
          </button>

          <button
            onClick={() => onSelectViewMode('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeViewMode === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-900/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Dashboard de Métricas, Telemetría y Backup"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
        </div>

        {/* Métricas Globales y Acciones */}
        <div className="flex items-center gap-2.5">
          {/* Indicador de Lectura y Dominio */}
          <div
            onClick={() => onSelectViewMode('dashboard')}
            className="cursor-pointer flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 text-xs text-slate-300 transition"
            title="Ver telemetría detallada en el Dashboard"
          >
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-mono text-slate-200">
                {readModulesCount}/{totalModules}
              </span>
              <span className="text-[10px] text-slate-400 hidden lg:inline">leídos ({modulesReadPercentage}%)</span>
            </div>
            <div className="h-3 w-px bg-slate-700 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-slate-200">
                {masteredQuestionsCount}/{questions.length}
              </span>
              <span className="text-[10px] text-slate-400 hidden lg:inline">dominadas</span>
            </div>
          </div>

          {/* Botón Backup Rápido */}
          <button
            onClick={onExportBackup}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Exportar respaldo de progreso en archivo JSON"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden md:inline">Backup</span>
          </button>
        </div>
      </div>

      {/* Sub-barra de Navegación Curricular (Dominios y Módulos) */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Pills de Dominios */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-[11px] font-medium text-slate-400 mr-1 hidden sm:inline">Dominio:</span>
            {domains.map((domain) => {
              const isActive = domain.id === activeDomainId;
              return (
                <button
                  key={domain.id}
                  onClick={() => {
                    onSelectDomain(domain.id);
                    // Si el módulo actual no pertenece al nuevo dominio, seleccionar el primero del nuevo dominio
                    const firstMod = modules.find((m) => m.domainId === domain.id);
                    if (firstMod && !domain.moduleIds.includes(activeModuleId)) {
                      onSelectModule(firstMod.id);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/80 shadow-xs'
                      : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                  title={`${domain.title} (${domain.weightPercentage} del examen)`}
                >
                  <span className="font-bold">{domain.code}</span>
                  <span className="text-[10px] opacity-75 font-sans">({domain.weightPercentage})</span>
                </button>
              );
            })}
          </div>

          {/* Selector de Módulo del Dominio Activo */}
          <div className="flex items-center gap-2">
            <label htmlFor="module-select" className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
              Módulo:
            </label>
            <select
              id="module-select"
              value={activeModuleId || ''}
              onChange={(e) => onSelectModule(e.target.value)}
              className="bg-slate-900 text-slate-200 text-xs rounded-lg px-2.5 py-1 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 max-w-[280px] sm:max-w-[400px] truncate"
            >
              {domainModules.map((mod) => {
                const isRead = moduleProgress[mod.id]?.isRead;
                return (
                  <option key={mod.id} value={mod.id}>
                    {isRead ? '✓ ' : ''}M0{mod.order}: {mod.shortTitle || mod.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
