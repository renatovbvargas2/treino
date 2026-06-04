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
  }

  function getSuggestionSet(exerciseId, setIndex) {
    const sug = state.suggestions?.[exerciseId];
    return sug?.[setIndex] ?? null;
  }

  function formatFieldLabel(label, refValue) {
    if (refValue == null) return label;
    return `${label} <span class="label-ref">${refValue}</span>`;
  }

  function hasSetReference(exerciseId, setIndex) {
    const s = getSuggestionSet(exerciseId, setIndex);
    if (!s) return false;
    return s.weight != null || s.reps != null;
  }

  function renderSetRow(exerciseId, setIndex, setData, hasReference) {
    const sug = getSuggestionSet(exerciseId, setIndex);
    const weightVal = setData.weight != null ? setData.weight : '';
    const repsVal = setData.reps != null ? setData.reps : '';
    const suggestedClass = hasReference ? ' is-suggested' : '';
    const weightLabel = formatFieldLabel('Peso (kg)', sug?.weight);
    const repsLabel = formatFieldLabel('Reps', sug?.reps);

    return `
      <div class="set-row${suggestedClass}" data-set-index="${setIndex}">
        <span class="set-label">Série ${setIndex + 1}</span>
        <label class="field">
          <span>${weightLabel}</span>
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
          <span>${repsLabel}</span>
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
            renderSetRow(ex.id, si, setData, hasSetReference(ex.id, si))
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
