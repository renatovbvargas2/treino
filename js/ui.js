(function (global) {
  const { getExercises, SET_COUNT } = global.TreinoProgram;
  const {
    saveState,
    getSetsForExercise,
    debounce,
    ensureCurrentSession,
  } = global.TreinoStorage;

  let state = null;
  let persistDebounced = null;

  function formatProgressLabel(series, index, total) {
    return `Exercício ${index + 1} de ${total} (Série ${series})`;
  }

  function scrollToExercise(index) {
    requestAnimationFrame(() => {
      const el = document.getElementById(`exercise-${index}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  function persist() {
    saveState(state);
  }

  function setExerciseIndex(index) {
    const exercises = getExercises(state.activeSeries);
    const clamped = Math.max(0, Math.min(index, exercises.length - 1));
    state.seriesProgress[state.activeSeries].exerciseIndex = clamped;
    ensureCurrentSession(state).exerciseIndex = clamped;
    persist();
    render();
    scrollToExercise(clamped);
  }

  function switchSeries(series) {
    if (state.activeSeries === series) return;
    state.activeSeries = series;
    ensureCurrentSession(state).series = series;
    const idx = state.seriesProgress[series].exerciseIndex;
    ensureCurrentSession(state).exerciseIndex = idx;
    persist();
    render();
    scrollToExercise(idx);
  }

  function onSetInput(exerciseId, setIndex, field, value) {
    const sets = getSetsForExercise(state, exerciseId);
    const parsed =
      value === '' || value == null
        ? null
        : field === 'weight'
          ? parseFloat(value)
          : parseInt(value, 10);
    sets[setIndex][field] = parsed == null || Number.isNaN(parsed) ? null : parsed;
    persistDebounced();
    const card = document.querySelector(`[data-exercise-id="${exerciseId}"]`);
    if (card) card.classList.remove('is-suggested');
  }

  function renderSetRow(exerciseId, setIndex, setData, isSuggested) {
    const weightVal = setData.weight != null ? setData.weight : '';
    const repsVal = setData.reps != null ? setData.reps : '';
    const suggestedClass = isSuggested ? ' is-suggested' : '';

    return `
      <div class="set-row${suggestedClass}" data-set-index="${setIndex}">
        <span class="set-label">Série ${setIndex + 1}</span>
        <label class="field">
          <span>Peso (kg)</span>
          <input
            type="number"
            inputmode="decimal"
            step="0.5"
            min="0"
            class="input-touch"
            data-exercise-id="${exerciseId}"
            data-set-index="${setIndex}"
            data-field="weight"
            value="${weightVal}"
            placeholder="—"
          >
        </label>
        <label class="field">
          <span>Reps</span>
          <input
            type="number"
            inputmode="numeric"
            step="1"
            min="0"
            class="input-touch"
            data-exercise-id="${exerciseId}"
            data-set-index="${setIndex}"
            data-field="reps"
            value="${repsVal}"
            placeholder="—"
          >
        </label>
      </div>
    `;
  }

  function isSetSuggested(exerciseId, setIndex, setData) {
    const sug = state.suggestions[exerciseId];
    if (!sug || !sug[setIndex]) return false;
    const s = sug[setIndex];
    return (
      setData.weight === s.weight &&
      setData.reps === s.reps &&
      (setData.weight != null || setData.reps != null)
    );
  }

  function renderExerciseList() {
    const list = document.getElementById('exercise-list');
    const series = state.activeSeries;
    const exercises = getExercises(series);
    const activeIndex = state.seriesProgress[series].exerciseIndex;

    list.innerHTML = exercises
      .map((ex, index) => {
        const sets = getSetsForExercise(state, ex.id);
        const isActive = index === activeIndex;
        const setsHtml = sets
          .map((setData, si) =>
            renderSetRow(ex.id, si, setData, isSetSuggested(ex.id, si, setData))
          )
          .join('');

        return `
          <article
            id="exercise-${index}"
            class="exercise-card${isActive ? ' is-active' : ''}"
            data-exercise-id="${ex.id}"
            data-exercise-index="${index}"
          >
            <h2 class="exercise-name">${ex.name}</h2>
            <div class="sets-grid">${setsHtml}</div>
          </article>
        `;
      })
      .join('');

    document.getElementById('progress-label').textContent = formatProgressLabel(
      series,
      activeIndex,
      exercises.length
    );

    document.querySelectorAll('.series-tab').forEach((tab) => {
      const isActive = tab.dataset.series === series;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function bindInputsOnce() {
    const list = document.getElementById('exercise-list');
    if (list.dataset.bound === 'true') return;
    list.dataset.bound = 'true';

    list.addEventListener('input', (e) => {
      const input = e.target;
      if (!input.matches('input[data-exercise-id]')) return;
      onSetInput(
        input.dataset.exerciseId,
        parseInt(input.dataset.setIndex, 10),
        input.dataset.field,
        input.value
      );
    });

    list.addEventListener('focusin', (e) => {
      const input = e.target;
      if (!input.matches('input[data-exercise-id]')) return;
      const card = input.closest('.exercise-card');
      if (!card) return;
      const index = parseInt(card.dataset.exerciseIndex, 10);
      if (index !== state.seriesProgress[state.activeSeries].exerciseIndex) {
        setExerciseIndex(index);
      }
    });
  }

  function render() {
    renderExerciseList();
  }

  function init(appState) {
    state = appState;
    persistDebounced = debounce(persist, 300);
    bindInputsOnce();
    render();
    const idx = state.seriesProgress[state.activeSeries].exerciseIndex;
    scrollToExercise(idx);
  }

  function getState() {
    return state;
  }

  function setState(next) {
    state = next;
  }

  global.TreinoUI = {
    init,
    render,
    getState,
    setState,
    switchSeries,
    setExerciseIndex,
    persist,
    scrollToExercise,
  };
})(window);
