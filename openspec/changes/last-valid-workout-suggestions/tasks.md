## 1. Sessão completa e arquivamento

- [x] 1.1 Implementar `sessionIsComplete(session, exerciseIds)` em `js/storage.js` (todas as séries de todos os exercícios com peso e reps preenchidos)
- [x] 1.2 Exportar `sessionIsComplete` no objeto `TreinoStorage`
- [x] 1.3 Alterar `startWorkout` em `js/session.js` para arquivar `lastCompletedSession` e `suggestions` apenas quando `sessionIsComplete` for true

## 2. Confirmação ao iniciar treino

- [x] 2.1 Adicionar `window.confirm` no clique de `#btn-start-workout` em `js/app.js` com mensagem em português sobre reinício da sessão
- [x] 2.2 Garantir que cancelar no diálogo não chama `startWorkout`, `saveState` nem `render`

## 3. Verificação manual

- [x] 3.1 Testar: treino completo → iniciar novo → labels mostram valores arquivados e inputs vazios
- [x] 3.2 Testar: treino parcial → iniciar novo (confirmar) → labels mantêm último treino completo, não zeros/vazios indevidos
- [x] 3.3 Testar: cancelar confirmação → sessão atual intacta
