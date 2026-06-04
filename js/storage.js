(function (global) {
  const STORAGE_KEY = 'treino-app-v1';
  const SET_COUNT = 3;

  function emptySets() {
    return Array.from({ length: SET_COUNT }, () => ({ weight: null, reps: null }));
  }

  function defaultState() {
    return {
      activeSeries: 'A',
      seriesProgress: {
        A: { exerciseIndex: 0 },
        B: { exerciseIndex: 0 },
      },
      currentSession: null,
      lastCompletedSession: null,
      suggestions: {},
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return { ...defaultState(), ...parsed };
    } catch {
      return defaultState();
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function ensureCurrentSession(state) {
    if (!state.currentSession) {
      state.currentSession = {
        startedAt: new Date().toISOString(),
        series: state.activeSeries,
        exerciseIndex: state.seriesProgress[state.activeSeries].exerciseIndex,
        sets: {},
      };
    }
    return state.currentSession;
  }

  function getSetsForExercise(state, exerciseId) {
    const session = ensureCurrentSession(state);
    if (!session.sets[exerciseId]) {
      session.sets[exerciseId] = emptySets();
    }
    return session.sets[exerciseId];
  }

  function sessionHasData(session) {
    if (!session || !session.sets) return false;
    return Object.values(session.sets).some((sets) =>
      sets.some((s) => s.weight != null || s.reps != null)
    );
  }

  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  global.TreinoStorage = {
    STORAGE_KEY,
    SET_COUNT,
    emptySets,
    defaultState,
    loadState,
    saveState,
    ensureCurrentSession,
    getSetsForExercise,
    sessionHasData,
    debounce,
  };
})(window);
