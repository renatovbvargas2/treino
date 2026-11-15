# Contributing

## Adding a feature

1. Read `docs/architecture.md`, `docs/data-model.md` and `docs/state-machine.md`.
2. If it changes persisted data, add migration in `normalizeState()` (`storage.js`) and document in `docs/data-model.md`.
3. If it changes session lifecycle, update `docs/state-machine.md`.
4. Prefer centralizing constants (e.g. `SET_COUNT`) in `program.js`.
5. Keep changes consistent with existing module responsibilities (no logic in `ui.js` that belongs to `session.js`).

## OpenSpec workflow

This repo uses OpenSpec (`openspec/`). For behavior changes, prefer creating a change (`openspec new change <name>`), writing proposal/design/specs/tasks, implementing, then archiving (`openspec archive <name> -y`). Doc-only changes can be committed directly.

## Testing

Run the smoke tests:

```bash
npm test
```

Tests live in `tests/run.js` (Node, no dependencies). They load the IIFE modules via `eval` and exercise `storage.js`/`session.js` logic. Add a test for any new migration, completeness rule or archiving behavior.

## Gotchas

See `docs/architecture.md` → "Gotchas". In particular, avoid relying on the absence of sets for a series (viewing a series in `terminated` phase creates empty sets), and remember `startWorkout` evaluates both series against the same session.

## Commit style

Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, etc. Include the OpenSpec change name when applicable.
