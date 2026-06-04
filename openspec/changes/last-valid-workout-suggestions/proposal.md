## Why

Ao pressionar **Iniciar treino** com uma sessão anterior parcialmente preenchida, o app substituía `suggestions` pelo estado inteiro da sessão atual — incluindo campos vazios — e apagava referências úteis do último treino. O usuário precisa que séries realmente registradas (peso e repetições) entrem nas sugestões, que o restante preserve o último treino completo arquivado, e de uma confirmação simples antes de encerrar o treino em andamento.

## What Changes

- Definir quando uma sessão é **completa** para arquivo integral (todos os exercícios da série ativa com as 3 séries tendo peso e repetições).
- Sessão **completa**: arquivar em `lastCompletedSession` e substituir `suggestions` pelo treino atual.
- Sessão **incompleta** com dados: mesclar nas `suggestions` apenas séries com peso e repetições preenchidos; demais slots mantêm referências anteriores; `lastCompletedSession` não é alterado.
- Nova sessão sempre inicia com inputs vazios; referência continua nos labels.
- **Diálogo de confirmação** genérico perguntando se o usuário deseja finalizar o treino.

## Capabilities

### New Capabilities

_(nenhuma)_

### Modified Capabilities

- `workout-session`: arquivamento completo vs merge parcial e confirmação ao finalizar treino.
- `set-logging`: referência nos labels após sessão parcial (merge + último treino completo).

## Impact

- `js/session.js` — `startWorkout` com ramos completo / merge parcial.
- `js/storage.js` — `sessionIsComplete`, `mergeCompleteSetsIntoSuggestions`.
- `js/app.js` — confirmação antes de `startWorkout`.
- `openspec/specs/workout-session/spec.md` e `openspec/specs/set-logging/spec.md` — deltas na change.
