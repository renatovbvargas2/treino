## Context

Hoje `startWorkout` em `js/session.js` chama `sessionHasData` (qualquer peso ou rep em qualquer série) e, se verdadeiro, copia `session.sets` inteiro para `state.suggestions` e `state.lastCompletedSession`. Uma sessão com poucos campos preenchidos ou com nulls nas demais séries sobrescreve sugestões boas do último treino completo. A UI (`js/ui.js`) lê `state.suggestions` nos labels via `getSuggestionSet`; valores null não aparecem como referência.

## Goals / Non-Goals

**Goals:**

- Arquivar sessão integral (`lastCompletedSession` + `suggestions`) apenas quando o treino da série ativa estiver **completo**.
- Em sessão incompleta, **mesclar** nas `suggestions` somente séries com peso e repetições preenchidos; slots vazios ou só com um campo mantêm a referência anterior.
- Pedir confirmação genérica antes de finalizar o treino em andamento.
- Manter inputs vazios e referência nos labels (comportamento já existente).

**Non-Goals:**

- Bloquear "Iniciar treino" sem confirmação (cancelar deve manter a sessão atual).
- Gravar sugestão para série com apenas peso ou apenas repetições.
- Particionar `suggestions` por série A/B (compartilhamento entre séries permanece).
- Confirmação diferenciada por série além do texto genérico.

## Decisions

### 1. Critério de sessão completa

**Decisão:** `sessionIsComplete(session, exerciseIds)` retorna true somente se, para **cada** `exerciseId` da lista, existirem exatamente 3 séries e em cada série `weight` e `reps` forem números não nulos (não `null`, não `NaN`).

**Implementação:** função em `js/storage.js` (junto a `sessionHasData`) exportada para `session.js`.

### 2. Fluxo em `startWorkout`

**Decisão:**

1. Se `sessionIsComplete(session, exerciseIds)`: `lastCompletedSession` + `suggestions = cloneSets(session.sets)`.
2. Se `sessionHasData` mas **não** completa: `mergeCompleteSetsIntoSuggestions(suggestions, session.sets, exerciseIds)` — não altera `lastCompletedSession`.
3. Sempre criar nova `currentSession` com sets vazios e resetar índice de exercício.

**Critério de série elegível ao merge:** `isSetComplete` — peso **e** repetições preenchidos na mesma série.

### 3. Confirmação ao iniciar

**Decisão:** usar `window.confirm` com mensagem genérica no handler de `#btn-start-workout` em `js/app.js` **antes** de `startWorkout`. Se o usuário cancelar, não alterar estado nem persistir.

**Texto:** pergunta simples se o usuário deseja realmente finalizar o treino (sem detalhar regras de merge ou arquivo).

### 4. Persistência

Sem mudança de schema em `localStorage`. Apenas lógica condicional no arquivamento e merge.

## Risks / Trade-offs

- **[Risco]** `suggestions` compartilhadas entre séries A/B → comportamento esperado; exercícios com mesmo id reutilizam referência.
- **[Risco]** `confirm` nativo é visualmente básico → aceito como trade-off; pode evoluir depois.
- **[Risco]** Treino sem todos os exercícios do programa preenchidos nunca arquiva `lastCompletedSession` → aceito; merge parcial ainda atualiza labels das séries registradas.

## Migration Plan

Deploy como atualização do bundle estático. Usuários com `suggestions` corrompidas recuperam referências ao completar séries ou um treino integral.

## Open Questions

_(nenhuma.)_
