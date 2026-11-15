// Minimal Node-based smoke tests for storage/session logic.
// Run: node tests/run.js
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

function setup() {
  const store = {};
  const localStorage = {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { for (const k in store) delete store[k]; },
  };
  const window = { localStorage };
  global.window = window;
  global.localStorage = localStorage;
  // load modules
  eval(fs.readFileSync(path.join(root, 'js', 'program.js'), 'utf8'));
  eval(fs.readFileSync(path.join(root, 'js', 'storage.js'), 'utf8'));
  eval(fs.readFileSync(path.join(root, 'js', 'session.js'), 'utf8'));
  return { store, localStorage, window, S: window.TreinoStorage, Session: window.TreinoSession, Program: window.TreinoProgram };
}

let passed = 0, failed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log('PASS', name);
  } catch (e) {
    failed++;
    console.log('FAIL', name, '-', e.message);
  }
}
function eq(a, b, msg) {
  if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(msg || `expected ${JSON.stringify(b)} got ${JSON.stringify(a)}`);
}
function truthy(v, msg) { if (!v) throw new Error(msg || 'expected truthy'); }
function falsy(v, msg) { if (v) throw new Error(msg || 'expected falsy'); }

const { store, localStorage, S, Session, Program } = setup();
const ids = Program.getExercises('A').map((e) => e.id);

test('emptySets has SET_COUNT (4) entries', () => {
  eq(S.emptySets().length, 4);
});

test('migration pads 3->4 preserving values', () => {
  const old = {
    activeSeries: 'A', sessionPhase: 'active',
    seriesProgress: { A: { exerciseIndex: 0 }, B: { exerciseIndex: 0 } },
    currentSession: { startedAt: 'x', series: 'A', exerciseIndex: 0, sets: {
      'supino-reto': [{ weight: 50, reps: 10 }, { weight: 55, reps: 8 }, { weight: 60, reps: 6 }],
    } },
    suggestions: { 'supino-reto': [{ weight: 30, reps: 15 }, { weight: 35, reps: 12 }, { weight: 40, reps: 10 }] },
    lastCompletedSession: null,
  };
  localStorage.clear();
  localStorage.setItem(S.STORAGE_KEY, JSON.stringify(old));
  const loaded = S.loadState();
  eq(loaded.currentSession.sets['supino-reto'].length, 4);
  eq(loaded.currentSession.sets['supino-reto'][0], { weight: 50, reps: 10 });
  eq(loaded.currentSession.sets['supino-reto'][3], { weight: null, reps: null });
  eq(loaded.suggestions['supino-reto'].length, 4);
  eq(loaded.suggestions['supino-reto'][2], { weight: 40, reps: 10 });
});

test('migration is idempotent', () => {
  const state = S.defaultState();
  state.currentSession = { startedAt: 'x', series: 'A', exerciseIndex: 0, sets: { 'supino-reto': S.emptySets() } };
  const before = JSON.stringify(state);
  const after = S.normalizeState(state);
  eq(JSON.stringify(after), before);
});

test('sessionIsComplete requires all 4 sets', () => {
  const three = { sets: { 'supino-reto': [{ weight: 1, reps: 1 }, { weight: 1, reps: 1 }, { weight: 1, reps: 1 }] } };
  falsy(S.sessionIsComplete(three, ['supino-reto']));
  const four = { sets: { 'supino-reto': [{ weight: 1, reps: 1 }, { weight: 1, reps: 1 }, { weight: 1, reps: 1 }, { weight: 1, reps: 1 }] } };
  truthy(S.sessionIsComplete(four, ['supino-reto']));
});

test('mergeCompleteSetsIntoSuggestions preserves previous refs for incomplete slots', () => {
  const prev = [{ weight: 100, reps: 20 }, { weight: 101, reps: 21 }, { weight: 102, reps: 22 }, { weight: 103, reps: 23 }];
  const suggestions = { 'supino-reto': prev.map((x) => ({ ...x })) };
  const sessionSets = { 'supino-reto': [{ weight: 10, reps: 5 }, { weight: 11, reps: 6 }, { weight: null, reps: null }, { weight: 13, reps: 8 }] };
  const merged = S.mergeCompleteSetsIntoSuggestions(suggestions, sessionSets, ['supino-reto']);
  // slots 0,1,3 complete -> updated; slot2 incomplete -> keeps prev
  eq(merged['supino-reto'][0], { weight: 10, reps: 5 });
  eq(merged['supino-reto'][2], { weight: 102, reps: 22 });
});

test('startWorkout archives complete session and empties new session', () => {
  const state = S.defaultState();
  state.currentSession = { startedAt: 'x', series: 'A', exerciseIndex: 0, sets: {} };
  for (const id of ids) {
    state.currentSession.sets[id] = [{ weight: 1, reps: 1 }, { weight: 1, reps: 1 }, { weight: 1, reps: 1 }, { weight: 1, reps: 1 }];
  }
  state.sessionPhase = 'terminated';
  const after = Session.startWorkout(state, ids);
  eq(after.sessionPhase, 'active');
  truthy(after.lastCompletedSession);
  eq(after.lastCompletedSession.sets[ids[0]].length, 4);
  truthy(after.currentSession.sets[ids[0]].every((s) => s.weight == null && s.reps == null));
});

test('startWorkout partial does not update lastCompletedSession', () => {
  const state = S.defaultState();
  state.lastCompletedSession = { startedAt: 'prev', series: 'A', exerciseIndex: 0, sets: {} };
  state.currentSession = { startedAt: 'x', series: 'A', exerciseIndex: 0, sets: {} };
  for (const id of ids) state.currentSession.sets[id] = S.emptySets();
  // fill only first exercise fully
  for (let i = 0; i < 4; i++) state.currentSession.sets[ids[0]][i] = { weight: 10 + i, reps: 5 + i };
  state.sessionPhase = 'terminated';
  const after = Session.startWorkout(state, ids);
  eq(after.lastCompletedSession.startedAt, 'prev');
  eq(after.suggestions[ids[0]][0], { weight: 10, reps: 5 });
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
