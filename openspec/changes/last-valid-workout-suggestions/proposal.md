## Why

Ao pressionar **Iniciar treino** com uma sessão anterior parcialmente preenchida, o app arquiva essa sessão incompleta e substitui `suggestions` pelos valores atuais — incluindo campos vazios ou zero — em vez de manter a referência do último treino realmente concluído. Isso faz os labels de sugestão aparecerem vazios ou zerados e prejudica o fluxo na academia. O usuário também precisa de uma confirmação explícita antes de descartar/reiniciar a sessão em andamento.

## What Changes

- Definir quando uma sessão é **válida para arquivo** (todos os exercícios da série ativa com as 3 séries tendo peso e repetições preenchidos).
- Ao iniciar novo treino: arquivar e atualizar sugestões **somente** se a sessão atual for válida; se estiver incompleta, preservar `lastCompletedSession` e `suggestions` existentes.
- Descartar a sessão incompleta ao iniciar novo treino (nova sessão vazia), sem sobrescrever o histórico de referência.
- Exibir **diálogo de confirmação** antes de iniciar novo treino (mensagem clara sobre reinício da sessão atual).
- Cenários de spec atualizados para sessão incompleta e confirmação.

## Capabilities

### New Capabilities

_(nenhuma)_

### Modified Capabilities

- `workout-session`: critério de arquivamento (sessão válida vs incompleta) e confirmação ao iniciar treino.
- `set-logging`: comportamento de referência nos labels quando a sessão anterior não foi arquivada por estar incompleta.

## Impact

- `js/session.js` — lógica de `startWorkout` e helper de sessão válida/completa.
- `js/storage.js` — possível função `sessionIsComplete` (ou em session.js).
- `js/app.js` — confirmação antes de chamar `startWorkout`.
- `index.html` / `js/ui.js` — opcional: modal ou `confirm()` nativo.
- `openspec/specs/workout-session/spec.md` e `openspec/specs/set-logging/spec.md` — deltas na change.
