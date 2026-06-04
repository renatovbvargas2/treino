(function (global) {
  const {
    emptySets,
    sessionHasData,
    sessionIsComplete,
    mergeCompleteSetsIntoSuggestions,
    ensureCurrentSession,
  } = global.TreinoStorage;

  function cloneSets(sets) {
    const cloned = {};
    for (const [id, arr] of Object.entries(sets || {})) {
      cloned[id] = arr.map((s) => ({
        weight: s.weight != null ? s.weight : null,
        reps: s.reps != null ? s.reps : null,
      }));
    }
    return cloned;
  }

  function buildEmptySetsForExercises(exerciseIds) {
    const sets = {};
    for (const id of exerciseIds) {
      sets[id] = emptySets();
    }
    return sets;
  }

  function startWorkout(state, exerciseIds) {
    const session = state.currentSession;

    if (session) {
      if (sessionIsComplete(session, exerciseIds)) {
        state.lastCompletedSession = {
          ...session,
          completedAt: new Date().toISOString(),
        };
        state.suggestions = cloneSets(session.sets);
      } else if (sessionHasData(session)) {
        state.suggestions = mergeCompleteSetsIntoSuggestions(
          state.suggestions,
          session.sets,
          exerciseIds
        );
      }
    }

    const series = state.activeSeries;
    state.currentSession = {
      startedAt: new Date().toISOString(),
      series,
      exerciseIndex: 0,
      sets: buildEmptySetsForExercises(exerciseIds),
    };
    state.seriesProgress[series].exerciseIndex = 0;

    return state;
  }

  global.TreinoSession = {
    startWorkout,
    ensureCurrentSession,
  };
})(window);
