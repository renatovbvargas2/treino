# Proposal

## Why

O app registra atualmente **3 séries** por exercício. O usuário quer uma **4ª série** em todos os exercícios (Sábado e Domingo) para ampliar o volume de treino, **sem perder os valores já registrados** (peso/reps) nas séries existentes e as referências do treino anterior.

## What Changes

- Alterar `SET_COUNT` de 3 para 4 em `js/program.js` e `js/storage.js` (centralizando em `TreinoProgram`).
- Atualizar `emptySets`, `sessionIsComplete`, `mergeCompleteSetsIntoSuggestions` e a renderização em `js/ui.js` para 4 séries.
- **Migração in-place** no `loadState`: arrays de séries com menos de 4 entradas (sessão atual, `suggestions`, `lastCompletedSession`) são preenchidos com séries vazias `{ weight: null, reps: null }`, preservando valores existentes. Chave `treino-app-v1` mantida.
- Critério de sessão completa passa a exigir as **4 séries** preenchidas (peso e reps) em todos os exercícios da série ativa.
- Atualizar documentação (`README.md`) e specs afetadas.

## Capabilities

### New Capabilities

_(nenhuma)_

### Modified Capabilities

- `set-logging`: requisito de "3 séries por exercício" passa a 4 séries.
- `workout-session`: critério de arquivamento/completude passa a exigir 4 séries preenchidas.
- `local-persistence`: adicionar requisito de migração de dados de 3 para 4 séries sem perda de histórico.

## Impact

- `js/program.js` — `SET_COUNT: 4`
- `js/storage.js` — `SET_COUNT` consumido de `TreinoProgram`, migração em `loadState`
- `js/ui.js` — renderização de 4 linhas por exercício (já usa `SET_COUNT`)
- `js/session.js` — usa `SET_COUNT` via storage (sem mudança de lógica)
- `README.md` — menção a 4 séries
- `openspec/specs/set-logging/spec.md`, `workout-session/spec.md`, `local-persistence/spec.md`
- Sem mudança de chave de storage; dados existentes migrados automaticamente
