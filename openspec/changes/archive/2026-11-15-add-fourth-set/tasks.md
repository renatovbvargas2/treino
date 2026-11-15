# Tasks

## 1. Core Implementation

- [x] 1.1 Atualizar `SET_COUNT` para 4 em `js/program.js` (`TreinoProgram.SET_COUNT`) e verificar que `ui.js` renderiza 4 linhas por exercício
- [x] 1.2 Centralizar `SET_COUNT` em `js/storage.js` consumindo `global.TreinoProgram.SET_COUNT` (remover constante local) e verificar `emptySets` retorna 4
- [x] 1.3 Implementar `normalizeState(state)` em `js/storage.js` que faz padding de arrays com menos de 4 entradas em `currentSession.sets`, `suggestions` e `lastCompletedSession.sets`, e chamá-la em `loadState` antes do retorno; verificar com estado antigo (3 séries) que valores são preservados e 4ª série vazia é adicionada

## 2. Verificação

- [x] 2.1 Abrir o app com localStorage vazio e confirmar que cada exercício exibe 4 séries
- [x] 2.2 Simular estado antigo (3 séries) no localStorage, recarregar e confirmar que valores existentes permanecem e 4ª série aparece vazia
- [x] 2.3 Terminar e iniciar treino com 4 séries preenchidas e confirmar arquivamento; com 3 séries preenchidas confirmar merge parcial

## 3. Documentação

- [x] 3.1 Atualizar `README.md` (menção a 4 séries por exercício) e verificar consistência com specs
- [x] 3.2 Atualizar specs principais (`set-logging`, `workout-session`, `local-persistence`) via archive do OpenSpec

## Workflow follow-up

- Archive the change after implementation and verification are complete.
- Verify the archived result.
