# Design

## Context

App estático (HTML/CSS/JS) com estado em `localStorage` (chave `treino-app-v1`). `SET_COUNT` está duplicado em `js/program.js` (exportado via `TreinoProgram`) e `js/storage.js` (local). Séries são arrays de `{ weight, reps }` por exercício. Completude é verificada por `sessionIsComplete(session, exerciseIds)` comparando `sets.length >= SET_COUNT` e todas as séries completas.

## Goals / Non-Goals

**Goals:**
- Elevar o número de séries de 3 para 4 em todos os exercícios.
- Preservar valores existentes (peso/reps) e referências (`suggestions`) de usuários com dados antigos.
- Centralizar `SET_COUNT` para evitar drift.

**Non-Goals:**
- Não alterar o número de exercícios nem a estrutura de persistência além do padding.
- Não migrar a chave de storage (mantém `treino-app-v1`).
- Não adicionar configuração por usuário.

## Decisions

### 1. Constante centralizada

`SET_COUNT` passa a ser definido apenas em `js/program.js` (`TreinoProgram.SET_COUNT = 4`) e consumido em `js/storage.js` via `global.TreinoProgram.SET_COUNT` no IIFE. `ui.js` já consome de `TreinoProgram`.

**Alternativa:** manter duplicado — rejeitada pelo risco de drift (já ocorreu conceitualmente).

### 2. Migração por padding em `loadState`

Uma função `normalizeState(state)` percorre:
- `state.currentSession.sets[id]` → pad para `SET_COUNT`.
- `state.suggestions[id]` → pad.
- `state.lastCompletedSession.sets[id]` → pad.

Padding adiciona `{ weight: null, reps: null }`. Idempotente (só pad se `length < SET_COUNT`). Executada dentro de `loadState` antes do retorno, e o `app.js` já chama `saveState(state)` após `ensureCurrentSession`, persistindo a migração.

**Alternativa:** bump de chave (`treino-app-v2`) com leitura da v1 — rejeitada por fragmentar dados e exigir lógica de fallback; padding in-place é mais simples e preserva tudo.

### 3. Completude com 4 séries

`sessionIsComplete` já usa `SET_COUNT`, então passa a exigir 4. Sessões migradas (4ª série vazia) tornam-se "incompletas" e, ao iniciar novo treino, têm apenas séries completas mescladas em `suggestions` (comportamento existente de `mergeCompleteSetsIntoSuggestions`).

### 4. Renderização

`ui.js` já itera `sets` (array) e usa `SET_COUNT` importado; com `SET_COUNT=4` e arrays migrados/padded, renderiza 4 linhas automaticamente. Nenhuma mudança estrutural necessária além da constante.

## Risks / Trade-offs

- **[Dados muito antigos sem campo `sets`]** → `normalizeState` deve checar existência antes de percorrer; `defaultState` merge cobre campos ausentes.
- **[lastCompletedSession com 3 séries completas vira "incompleto" se reavaliado]** → aceito; a referência já está em `suggestions`; não reavaliar arquivos antigos como completos é coerente com a nova regra.
- **[Usuário com sessão ativa de 3 séries]** → migração pad adiciona 4ª vazia; ao continuar, preenche a 4ª normalmente.

## Migration Plan

1. Deploy estático dos arquivos atualizados.
2. No primeiro carregamento, `loadState` migra automaticamente e `app.js` persiste.
3. Rollback: reverter commits; dados migrados (com 4ª série) permanecem, mas o app antigo ignora a 4ª série (lê apenas 3) — sem perda das 3 primeiras.

## Open Questions

_(nenhuma)_
