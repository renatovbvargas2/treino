(function (global) {
  const {
    emptySets,
    sessionIsComplete,
    mergeCompleteSetsIntoSuggestions,
    ensureCurrentSession,
  } = global.TreinoStorage;

  function cloneSetEntry(set) {
    return {
      weight: set?.weight != null ? set.weight : null,
      reps: set?.reps != null ? set.reps : null,
    };
  }

  function buildEmptySetsForExercises(exerciseIds) {
    const sets = {};
    for (const id of exerciseIds) {
      sets[id] = emptySets();
    }
    return sets;
  }

  function copyExerciseSetsToSuggestions(state, session, exerciseIds) {
    if (!state.suggestions) state.suggestions = {};
    for (const id of exerciseIds) {
      if (session.sets?.[id]) {
        state.suggestions[id] = session.sets[id].map(cloneSetEntry);
      }
    }
  }

  function sessionHasDataForExercises(session, exerciseIds) {
    if (!session?.sets) return false;
    return exerciseIds.some((id) => {
      const sets = session.sets[id];
      if (!sets) return false;
      return sets.some((s) => s.weight != null || s.reps != null);
    });
  }

  function terminateWorkout(state) {
    state.sessionPhase = 'terminated';
    return state;
  }

  function startWorkout(state, exerciseIds) {
    const session = state.currentSession;
    const { getExercises } = global.TreinoProgram;

    if (session) {
      for (const seriesKey of ['A', 'B']) {
        const seriesIds = getExercises(seriesKey).map((e) => e.id);
        if (sessionIsComplete(session, seriesIds)) {
          state.lastCompletedSession = {
            ...session,
            completedAt: new Date().toISOString(),
          };
          copyExerciseSetsToSuggestions(state, session, seriesIds);
        } else if (sessionHasDataForExercises(session, seriesIds)) {
          state.suggestions = mergeCompleteSetsIntoSuggestions(
            state.suggestions,
            session.sets,
            seriesIds
          );
        }
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
    state.sessionPhase = 'active';

    return state;
  }

  global.TreinoSession = {
    terminateWorkout,
    startWorkout,
    ensureCurrentSession,
  };
})(window);
