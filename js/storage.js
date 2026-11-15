(function (global) {
  const STORAGE_KEY = 'treino-app-v1';
  const SET_COUNT = global.TreinoProgram.SET_COUNT;

  function emptySets() {
    return Array.from({ length: SET_COUNT }, () => ({ weight: null, reps: null }));
  }

  function defaultState() {
    return {
      activeSeries: 'A',
      sessionPhase: 'active',
      seriesProgress: {
        A: { exerciseIndex: 0 },
        B: { exerciseIndex: 0 },
      },
      currentSession: null,
      lastCompletedSession: null,
      suggestions: {},
    };
  }

  function padSetArray(arr) {
    if (!Array.isArray(arr)) return arr;
    while (arr.length < SET_COUNT) {
      arr.push({ weight: null, reps: null });
    }
    return arr;
  }

  /** Migrate persisted state to the current SET_COUNT by padding sets arrays. Idempotent. */
  function normalizeState(state) {
    if (!state || typeof state !== 'object') return state;
    if (state.currentSession && state.currentSession.sets) {
      for (const id of Object.keys(state.currentSession.sets)) {
        padSetArray(state.currentSession.sets[id]);
      }
    }
    if (state.suggestions && typeof state.suggestions === 'object') {
      for (const id of Object.keys(state.suggestions)) {
        padSetArray(state.suggestions[id]);
      }
    }
    if (state.lastCompletedSession && state.lastCompletedSession.sets) {
      for (const id of Object.keys(state.lastCompletedSession.sets)) {
        padSetArray(state.lastCompletedSession.sets[id]);
      }
    }
    return state;
  }

  /** Load (and migrate) state from localStorage. */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const state = { ...defaultState(), ...parsed };
      return normalizeState(state);
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

  function isSetComplete(set) {
    const w = set?.weight;
    const r = set?.reps;
    return w != null && !Number.isNaN(w) && r != null && !Number.isNaN(r);
  }

  /** True only if every listed exercise has SET_COUNT complete sets (weight + reps). */
  function sessionIsComplete(session, exerciseIds) {
    if (!session?.sets || !exerciseIds?.length) return false;
    return exerciseIds.every((id) => {
      const sets = session.sets[id];
      if (!sets || sets.length < SET_COUNT) return false;
      return sets.slice(0, SET_COUNT).every(isSetComplete);
    });
  }

  function cloneSetEntry(set) {
    return {
      weight: set?.weight != null ? set.weight : null,
      reps: set?.reps != null ? set.reps : null,
    };
  }

  function mergeCompleteSetsIntoSuggestions(suggestions, sessionSets, exerciseIds) {
    const merged = {};
    for (const [id, arr] of Object.entries(suggestions || {})) {
      merged[id] = arr.map(cloneSetEntry);
    }
    for (const id of exerciseIds) {
      const fromSession = sessionSets?.[id];
      if (!fromSession) continue;
      if (!merged[id]) merged[id] = emptySets();
      for (let i = 0; i < SET_COUNT; i++) {
        const s = fromSession[i];
        if (isSetComplete(s)) {
          merged[id][i] = cloneSetEntry(s);
        }
      }
    }
    return merged;
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
    sessionIsComplete,
    mergeCompleteSetsIntoSuggestions,
    normalizeState,
    debounce,
  };
})(window);
