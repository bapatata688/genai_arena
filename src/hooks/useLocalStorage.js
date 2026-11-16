import { useState, useEffect, useCallback } from 'react';

export const STORAGE_KEY = 'genai_leader_arena_state_v1';

export const DEFAULT_USER_STATE = {
  version: 1,
  activeDomainId: 'domain-1',
  activeModuleId: 'mod-01-fundamentos-ia-genai',
  activeViewMode: 'study', // 'study' | 'quiz' | 'dashboard'
  bookmarkedQuestionIds: [],
  moduleProgress: {},
  examSessions: []
};

/**
 * Carga el estado persistido desde localStorage de forma segura.
 * Si ocurre un error de deserialización o la versión no coincide, retorna el estado por defecto.
 */
export function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_USER_STATE;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.version === 1) {
      return {
        ...DEFAULT_USER_STATE,
        ...parsed,
        moduleProgress: parsed.moduleProgress || {},
        bookmarkedQuestionIds: Array.isArray(parsed.bookmarkedQuestionIds) ? parsed.bookmarkedQuestionIds : [],
        examSessions: Array.isArray(parsed.examSessions) ? parsed.examSessions : []
      };
    }
    return DEFAULT_USER_STATE;
  } catch (err) {
    console.warn('Error al leer de localStorage, restaurando estado por defecto:', err);
    return DEFAULT_USER_STATE;
  }
}

/**
 * Guarda el estado en localStorage de forma segura.
 */
export function savePersistedState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Error al persistir estado en localStorage:', err);
  }
}

/**
 * Hook reactivo para el estado global de GenAI Leader Arena.
 */
export function useLocalStorage() {
  const [state, setState] = useState(() => loadPersistedState());

  useEffect(() => {
    savePersistedState(state);
  }, [state]);

  const setActiveDomainId = useCallback((domainId) => {
    setState((prev) => ({
      ...prev,
      activeDomainId: domainId
    }));
  }, []);

  const setActiveModuleId = useCallback((moduleId) => {
    setState((prev) => ({
      ...prev,
      activeModuleId: moduleId
    }));
  }, []);

  const setActiveViewMode = useCallback((viewMode) => {
    setState((prev) => ({
      ...prev,
      activeViewMode: viewMode
    }));
  }, []);

  const toggleModuleRead = useCallback((moduleId) => {
    setState((prev) => {
      const current = prev.moduleProgress[moduleId] || {
        isRead: false,
        bookmarked: false,
        studyModeAnswers: {},
        masteryPercentage: 0
      };
      const isReadNow = !current.isRead;
      return {
        ...prev,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: {
            ...current,
            isRead: isReadNow,
            readTimestamp: isReadNow ? Date.now() : undefined
          }
        }
      };
    });
  }, []);

  const toggleModuleBookmark = useCallback((moduleId) => {
    setState((prev) => {
      const current = prev.moduleProgress[moduleId] || {
        isRead: false,
        bookmarked: false,
        studyModeAnswers: {},
        masteryPercentage: 0
      };
      return {
        ...prev,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: {
            ...current,
            bookmarked: !current.bookmarked
          }
        }
      };
    });
  }, []);

  const toggleQuestionBookmark = useCallback((questionId) => {
    setState((prev) => {
      const exists = prev.bookmarkedQuestionIds.includes(questionId);
      const updated = exists
        ? prev.bookmarkedQuestionIds.filter((id) => id !== questionId)
        : [...prev.bookmarkedQuestionIds, questionId];
      return {
        ...prev,
        bookmarkedQuestionIds: updated
      };
    });
  }, []);

  const saveStudyAnswer = useCallback((moduleId, questionId, selectedOptionIds) => {
    setState((prev) => {
      const currentMod = prev.moduleProgress[moduleId] || {
        isRead: false,
        bookmarked: false,
        studyModeAnswers: {},
        masteryPercentage: 0
      };
      return {
        ...prev,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: {
            ...currentMod,
            studyModeAnswers: {
              ...currentMod.studyModeAnswers,
              [questionId]: selectedOptionIds
            }
          }
        }
      };
    });
  }, []);

  const recordExamSession = useCallback((sessionData) => {
    setState((prev) => ({
      ...prev,
      examSessions: [sessionData, ...prev.examSessions]
    }));
  }, []);

  const exportStateToJson = useCallback(() => {
    try {
      const jsonStr = JSON.stringify(state, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `genai_leader_arena_backup_${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return { success: true };
    } catch (err) {
      console.error('Error al exportar JSON:', err);
      return { success: false, error: err.message };
    }
  }, [state]);

  const importStateFromJson = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || parsed.version !== 1) {
        return {
          success: false,
          message: 'Versión o formato inválido. El archivo debe contener "version": 1.'
        };
      }
      const validatedState = {
        ...DEFAULT_USER_STATE,
        ...parsed,
        moduleProgress: parsed.moduleProgress && typeof parsed.moduleProgress === 'object' ? parsed.moduleProgress : {},
        bookmarkedQuestionIds: Array.isArray(parsed.bookmarkedQuestionIds) ? parsed.bookmarkedQuestionIds : [],
        examSessions: Array.isArray(parsed.examSessions) ? parsed.examSessions : []
      };
      setState(validatedState);
      savePersistedState(validatedState);
      return {
        success: true,
        message: 'Progreso y métricas restaurados exitosamente.'
      };
    } catch (err) {
      return {
        success: false,
        message: `Error de sintaxis JSON: ${err.message}`
      };
    }
  }, []);

  const resetState = useCallback(() => {
    setState(DEFAULT_USER_STATE);
    savePersistedState(DEFAULT_USER_STATE);
  }, []);

  return {
    state,
    setState,
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
  };
}
