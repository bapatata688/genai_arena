import React from 'react';
import domains from './data/domains.json';
import modules from './data/modules.json';
import questions from './data/questions.json';

import { useLocalStorage } from './hooks/useLocalStorage';
import Navbar from './components/Navbar';
import StudyGuide from './components/StudyGuide';
import QuizEngine from './components/QuizEngine';
import Dashboard from './components/Dashboard';

export default function App() {
  const {
    state,
    setActiveDomainId,
    setActiveModuleId,
    setActiveViewMode,
    toggleModuleRead,
    toggleModuleBookmark,
    toggleQuestionBookmark,
    saveStudyAnswer,
    recordExamSession,
    exportStateToJson,
    importStateFromJson,
    resetState
  } = useLocalStorage();

  // Módulo y dominio activos con fallback defensivo
  const currentModule = modules.find((m) => m.id === state.activeModuleId) || modules[0];
  const currentDomain = domains.find((d) => d.id === (currentModule?.domainId || state.activeDomainId)) || domains[0];

  // Manejar selección de módulo y sincronización de dominio
  const handleSelectModule = (moduleId) => {
    setActiveModuleId(moduleId);
    const mod = modules.find((m) => m.id === moduleId);
    if (mod && mod.domainId !== state.activeDomainId) {
      setActiveDomainId(mod.domainId);
    }
  };

  // Manejar selección de dominio y selección automática del primer módulo de ese dominio
  const handleSelectDomain = (domainId) => {
    setActiveDomainId(domainId);
    const domainMods = modules.filter((m) => m.domainId === domainId);
    if (domainMods.length > 0 && !domainMods.some((m) => m.id === state.activeModuleId)) {
      setActiveModuleId(domainMods[0].id);
    }
  };

  // Navegar desde StudyGuide al QuizEngine para practicar el módulo
  const handleStartQuizForModule = (moduleId) => {
    handleSelectModule(moduleId);
    setActiveViewMode('quiz');
  };

  // Navegar desde QuizEngine o Dashboard hacia la Guía de Estudio
  const handleNavigateToStudyModule = (moduleId) => {
    handleSelectModule(moduleId);
    setActiveViewMode('study');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Barra de Navegación Superior Sticky */}
      <Navbar
        domains={domains}
        modules={modules}
        questions={questions}
        activeDomainId={state.activeDomainId}
        activeModuleId={state.activeModuleId}
        activeViewMode={state.activeViewMode}
        moduleProgress={state.moduleProgress}
        onSelectDomain={handleSelectDomain}
        onSelectModule={handleSelectModule}
        onSelectViewMode={setActiveViewMode}
        onExportBackup={exportStateToJson}
      />

      {/* Contenedor Principal de la Vista Activa */}
      <main className="flex-1 w-full pb-12">
        {state.activeViewMode === 'study' && (
          <StudyGuide
            currentModule={currentModule}
            currentDomain={currentDomain}
            allModules={modules}
            isRead={Boolean(state.moduleProgress?.[currentModule.id]?.isRead)}
            isBookmarked={Boolean(state.moduleProgress?.[currentModule.id]?.bookmarked)}
            onToggleRead={toggleModuleRead}
            onToggleBookmark={toggleModuleBookmark}
            onNavigateModule={handleSelectModule}
            onStartQuiz={handleStartQuizForModule}
          />
        )}

        {state.activeViewMode === 'quiz' && (
          <QuizEngine
            questions={questions}
            domains={domains}
            modules={modules}
            activeDomainId={state.activeDomainId}
            activeModuleId={state.activeModuleId}
            bookmarkedQuestionIds={state.bookmarkedQuestionIds}
            moduleProgress={state.moduleProgress}
            onToggleBookmarkQuestion={toggleQuestionBookmark}
            onSaveStudyAnswer={saveStudyAnswer}
            onRecordExamSession={recordExamSession}
            onNavigateToStudyModule={handleNavigateToStudyModule}
          />
        )}

        {state.activeViewMode === 'dashboard' && (
          <Dashboard
            domains={domains}
            modules={modules}
            questions={questions}
            state={state}
            onToggleModuleRead={toggleModuleRead}
            onToggleModuleBookmark={toggleModuleBookmark}
            onNavigateToModule={handleNavigateToStudyModule}
            onExportJson={exportStateToJson}
            onImportJson={importStateFromJson}
            onResetState={resetState}
          />
        )}
      </main>

      {/* Pie de Página Institucional */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-400">GENAI LEADER ARENA</span> · Plataforma 100% Estática sin Servidor
          </div>
          <div>
            Preparación Oficial para <strong className="text-slate-400">Google Cloud Certified — Generative AI Leader</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
