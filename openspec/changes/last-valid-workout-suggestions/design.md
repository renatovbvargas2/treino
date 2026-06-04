## Context

Hoje `startWorkout` em `js/session.js` chama `sessionHasData` (qualquer peso ou rep em qualquer série) e, se verdadeiro, copia `session.sets` para `state.suggestions` e `state.lastCompletedSession`. Uma sessão com poucos campos preenchidos ou com nulls nas demais séries sobrescreve sugestões boas do último treino completo. A UI (`js/ui.js`) lê `state.suggestions` nos labels via `getSuggestionSet`; valores null não aparecem como referência.

## Goals / Non-Goals

**Goals:**

- Preservar `suggestions` e `lastCompletedSession` do último treino **completo** quando o usuário inicia novo treino com sessão incompleta.
- Arquivar sessão atual apenas quando todos os exercícios da série ativa tiverem as 3 séries com peso e repetições preenchidos.
- Pedir confirmação antes de executar o reinício da sessão.
- Manter inputs vazios e referência nos labels (comportamento já existente).

**Non-Goals:**

- Bloquear "Iniciar treino" sem confirmação (cancelar deve manter a sessão atual).
- Mesclar dados parciais da sessão incompleta nas sugestões.
- Confirmação diferenciada por série A/B além do texto genérico de reinício.

## Decisions

### 1. Critério de sessão completa

**Decisão:** `sessionIsComplete(session, exerciseIds)` retorna true somente se, para **cada** `exerciseId` da lista, existirem exatamente 3 séries e em cada série `weight` e `reps` forem números não nulos (não `null`, não `NaN`).

**Alternativa:** exigir apenas séries com algum dado — rejeitada porque deixaria referências parciais e não corresponde a "treino válido".

**Implementação:** função em `js/storage.js` (junto a `sessionHasData`) exportada para `session.js`.

### 2. Fluxo em `startWorkout`

**Decisão:**

1. Se `sessionIsComplete(session, exerciseIds)`: arquivar como hoje (`lastCompletedSession`, `suggestions = cloneSets(session.sets)`).
2. Se `sessionHasData` mas **não** completa: **não** alterar `lastCompletedSession` nem `suggestions`.
3. Sempre criar nova `currentSession` com sets vazios e resetar índice de exercício.

**Alternativa:** salvar sessão incompleta em outro campo para retomar — fora do escopo; usuário pediu descartar referência ruim, não retomar rascunho.

### 3. Confirmação ao iniciar

**Decisão:** usar `window.confirm` com mensagem em português no handler de `#btn-start-workout` em `js/app.js` **antes** de `startWorkout`. Se o usuário cancelar, não alterar estado nem persistir.

**Alternativa:** modal customizado em HTML/CSS — mais trabalho; `confirm` é suficiente para app estático mobile-first e acessível.

**Texto sugerido:** informar que um novo treino será iniciado, que a sessão atual será reiniciada, e que referências anteriores permanecem se o treino atual não estava completo.

### 4. Persistência

Sem mudança de schema em `localStorage`. Apenas lógica condicional no arquivamento.

## Risks / Trade-offs

- **[Risco]** Usuário espera que dados parciais virem sugestão → **Mitigação:** spec e mensagem de confirmação deixam claro que só treino completo atualiza referência.
- **[Risco]** `confirm` nativo é visualmente básico → aceito como trade-off; pode evoluir depois.
- **[Risco]** Exercícios novos no programa sem entrada na sessão contam como incompletos → correto: até preencher todos, não arquiva.

## Migration Plan

Deploy como atualização do bundle estático. Usuários com `suggestions` já corrompidos por sessão incompleta recuperam comportamento correto no próximo "Iniciar treino" completo; não é necessária migração de dados.

## Open Questions

_(nenhuma — critério de completude e confirmação alinhados com o pedido do usuário.)_
