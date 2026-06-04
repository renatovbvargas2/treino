(function () {
  const { getExercises } = window.TreinoProgram;
  const { loadState, saveState, ensureCurrentSession } = window.TreinoStorage;
  const { startWorkout } = window.TreinoSession;

  let state = loadState();
  ensureCurrentSession(state);
  saveState(state);

  window.TreinoUI.init(state);

  document.querySelectorAll('.series-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      window.TreinoUI.switchSeries(tab.dataset.series);
      state = window.TreinoUI.getState();
    });
  });

  document.getElementById('btn-prev-exercise').addEventListener('click', () => {
    const s = window.TreinoUI.getState();
    const idx = s.seriesProgress[s.activeSeries].exerciseIndex;
    window.TreinoUI.setExerciseIndex(idx - 1);
    state = window.TreinoUI.getState();
  });

  document.getElementById('btn-next-exercise').addEventListener('click', () => {
    const s = window.TreinoUI.getState();
    const idx = s.seriesProgress[s.activeSeries].exerciseIndex;
    window.TreinoUI.setExerciseIndex(idx + 1);
    state = window.TreinoUI.getState();
  });

  document.getElementById('btn-start-workout').addEventListener('click', () => {
    state = window.TreinoUI.getState();
    const ids = getExercises(state.activeSeries).map((e) => e.id);
    startWorkout(state, ids);
    saveState(state);
    window.TreinoUI.setState(state);
    window.TreinoUI.render();
    window.TreinoUI.scrollToExercise(0);
  });
})();
