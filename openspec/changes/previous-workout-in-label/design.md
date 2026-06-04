## Context

O app de treino arquiva a sessão anterior em `state.suggestions` ao pressionar **Iniciar treino** (`session.js`). Hoje `buildSetsFromSuggestions` copia peso e reps para `currentSession.sets`, e `ui.js` renderiza esses valores nos inputs (`value="${weightVal}"`). A classe `is-suggested` destaca linhas cujo conteúdo da sessão coincide com a sugestão.

O pedido é separar **referência** (último treino) de **entrada atual** (campos vazios até o usuário digitar).

## Goals / Non-Goals

**Goals:**

- Labels exibem referência do treino anterior quando existir (ex. `Peso (kg) 33`, `Reps 9`).
- Inputs permanecem vazios na nova sessão até entrada do usuário.
- Persistência continua gravando apenas o que o usuário digitou na sessão atual.
- Arquivamento ao **Iniciar treino** permanece inalterado.

**Non-Goals:**

- Alterar programa de exercícios, abas A/B ou navegação entre exercícios.
- Mostrar histórico além do treino imediatamente anterior.
- Auto-preencher ao focar ou botão "usar valor anterior".

## Decisions

### 1. Sessão nova inicia com séries vazias

`buildSetsFromSuggestions` passa a retornar `emptySets()` para todos os exercícios, independentemente de `state.suggestions`. As sugestões ficam só em `state.suggestions` para a UI.

**Alternativa rejeitada:** manter cópia na sessão e limpar só na renderização — duplicaria fonte de verdade e poderia persistir valores fantasma no localStorage.

### 2. Referência no `<span>` do label, não no input

`renderSetRow` lê `state.suggestions[exerciseId][setIndex]` para montar o texto do label. Formato: `Peso (kg)` + espaço + valor quando `weight != null`; idem para `Reps`. Sem sugestão, label permanece só `Peso (kg)` / `Reps`.

Inputs usam apenas `setData` da sessão atual (vazio após iniciar treino).

### 3. Destaque visual por presença de sugestão

Substituir `isSetSuggested` (comparação sessão vs sugestão) por indicador de que existe referência arquivada para aquela série (ex. `suggestions[exerciseId][setIndex]` com pelo menos um valor). Mantém fundo `is-suggested` como pista de "há referência do treino passado", não de "campo pré-preenchido".

**Alternativa rejeitada:** remover destaque — perde affordance visual já existente.

### 4. Remover lógica que limpa `is-suggested` ao digitar

`onSetInput` hoje remove `is-suggested` do card ao editar; com destaque baseado só em sugestão arquivada, a classe pode permanecer estável na linha ou ser recalculada no próximo render sem remoção manual no DOM.

## Risks / Trade-offs

- **[Risco] Usuário confunde número no label com valor já salvo** → Mitigação: inputs vazios e estilo visual distinto para o trecho numérico no label (ex. classe `.label-ref`).
- **[Risco] Sessão em andamento com dados parciais antes de "Iniciar treino"** → Comportamento inalterado: labels só mostram referência de `suggestions`; valores parciais continuam nos inputs da sessão atual.
- **[Trade-off] Mais um passo cognitivo** → Usuário precisa digitar tudo de novo; aceito pelo requisito explícito de saber "onde parou" sem misturar com entrada nova.

## Migration Plan

1. Implementar mudanças em `session.js` e `ui.js`.
2. Ajustar CSS para referência no label.
3. Usuários com sessão já pré-preenchida no localStorage: na próxima vez que pressionarem **Iniciar treino**, nova sessão já nasce vazia; dados antigos na sessão atual permanecem até arquivar.

Rollback: reverter commits; sem migração de schema.

## Open Questions

_(nenhuma — requisito do usuário é explícito sobre formato do label e inputs vazios)_
