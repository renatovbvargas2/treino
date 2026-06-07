(function () {
  const { getExercises } = window.TreinoProgram;
  const { loadState, saveState, ensureCurrentSession } = window.TreinoStorage;
  const { startWorkout, terminateWorkout } = window.TreinoSession;

  try {
    screen.orientation?.lock?.('portrait');
  } catch {
    /* lock indisponível — continua em retrato */
  }

  let state = loadState();
  ensureCurrentSession(state);
  saveState(state);

  window.TreinoUI.init(state);

  document.querySelectorAll('.series-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      if (window.TreinoUI.getState().sessionPhase === 'terminated') return;
      window.TreinoUI.switchSeries(tab.dataset.series);
      state = window.TreinoUI.getState();
    });
  });

  document.getElementById('btn-prev-exercise').addEventListener('click', () => {
    const s = window.TreinoUI.getState();
    if (s.sessionPhase === 'terminated') return;
    const idx = s.seriesProgress[s.activeSeries].exerciseIndex;
    window.TreinoUI.setExerciseIndex(idx - 1);
    state = window.TreinoUI.getState();
  });

  document.getElementById('btn-next-exercise').addEventListener('click', () => {
    const s = window.TreinoUI.getState();
    if (s.sessionPhase === 'terminated') return;
    const idx = s.seriesProgress[s.activeSeries].exerciseIndex;
    window.TreinoUI.setExerciseIndex(idx + 1);
    state = window.TreinoUI.getState();
  });

  document.getElementById('btn-terminate-workout').addEventListener('click', () => {
    const ok = window.confirm('Deseja realmente terminar o treino?');
    if (!ok) return;

    state = window.TreinoUI.getState();
    terminateWorkout(state);
    saveState(state);
    window.TreinoUI.setState(state);
    window.TreinoUI.applySessionPhase();
  });

  document.getElementById('btn-start-workout').addEventListener('click', () => {
    state = window.TreinoUI.getState();
    if (state.sessionPhase !== 'terminated') return;

    const ids = getExercises(state.activeSeries).map((e) => e.id);
    startWorkout(state, ids);
    saveState(state);
    window.TreinoUI.setState(state);
    window.TreinoUI.render();
    window.TreinoUI.applySessionPhase();
    window.TreinoUI.scrollToExercise(0);
  });
})();
