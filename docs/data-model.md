# Data model (localStorage)

Storage key: `treino-app-v1`. Value is a JSON object.

## State shape

```json
{
  "activeSeries": "A" | "B",
  "sessionPhase": "active" | "terminated",
  "seriesProgress": {
    "A": { "exerciseIndex": 0 },
    "B": { "exerciseIndex": 0 }
  },
  "currentSession": {
    "startedAt": "ISO-8601",
    "series": "A" | "B",
    "exerciseIndex": 0,
    "sets": {
      "<exercise-slug>": [
        { "weight": number | null, "reps": number | null }
      ]
    }
  } | null,
  "lastCompletedSession": { "...session..." , "completedAt": "ISO-8601" } | null,
  "suggestions": {
    "<exercise-slug>": [
      { "weight": number | null, "reps": number | null }
    ]
  }
}
```

- Each exercise's sets array has exactly `SET_COUNT` (4) entries.
- `suggestions` holds the previous workout's values, shown as labels next to inputs (inputs stay empty on a new session).

## Migration

When the app loads a persisted state with fewer than `SET_COUNT` entries per exercise, `normalizeState()` pads the missing entries with `{ weight: null, reps: null }` in `currentSession.sets`, `suggestions`, and `lastCompletedSession.sets`. The key is **not** bumped; migration is idempotent and preserves existing values.

## Completeness

`sessionIsComplete(session, exerciseIds)` returns true only when every listed exercise has at least `SET_COUNT` sets and all of them are complete (weight and reps present and numeric).

## Adding a new field

1. Add it to `defaultState()` in `storage.js`.
2. Spread-merge in `loadState()` already overlays saved data on defaults, but add explicit handling if the field needs migration.
3. Persist via `saveState()` (already called by `app.js`).
4. Document here.
