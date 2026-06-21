## Context

Na issue [#5](https://github.com/renatovbvargas2/treino/issues/5), o fluxo **Terminar treino** congelou toda a interface na fase `terminated`, incluindo as abas **Sábado** e **Domingo**. A issue [#8](https://github.com/renatovbvargas2/treino/issues/8) reporta que isso impede consultar o treino concluído do outro dia do fim de semana sem iniciar uma nova sessão.

Estado atual relevante:
- `js/ui.js` — `applySessionPhase()` desabilita `.series-tab` quando `sessionPhase === 'terminated'`.
- `js/app.js` — handler de clique nas abas retorna cedo se a sessão está encerrada, bloqueando `switchSeries`.
- `switchSeries()` já persiste e re-renderiza a série ativa; inputs são desabilitados novamente após `render()` via `applySessionPhase()`.

## Goals / Non-Goals

**Goals:**

- Manter abas Sábado/Domingo clicáveis na fase `terminated` para alternar a visualização somente leitura entre as duas séries.
- Preservar congelamento de edição (inputs), navegação Anterior/Próximo e botão Terminar treino.
- Atualizar spec `workout-session` para refletir o comportamento esperado.

**Non-Goals:**

- Habilitar navegação Anterior/Próximo ou edição após terminar.
- Alterar lógica de arquivamento, sugestões ou persistência de `sessionPhase`.
- Mudanças visuais nas abas além de permanecerem habilitadas (sem novo estado visual dedicado).

## Decisions

### 1. Abas de série como exceção ao congelamento

**Decisão:** Na fase `terminated`, abas `.series-tab` permanecem habilitadas; inputs, Anterior/Próximo e Terminar continuam desabilitados.

**Rationale:** O usuário precisa alternar entre Sábado e Domingo para revisar valores registrados em cada dia. Desabilitar abas trata consulta como edição, o que não é o caso — inputs já estão `disabled`/`readOnly`.

**Alternativa considerada:** Manter abas desabilitadas e usar navegação Anterior/Próximo habilitada — rejeitada porque o pedido é especificamente sobre as abas de dia.

### 2. Remover guarda no handler de clique em `app.js`

**Decisão:** Eliminar o `return` antecipado no listener de `.series-tab` quando `sessionPhase === 'terminated'`, permitindo `switchSeries`.

**Rationale:** `switchSeries` não altera dados de série — apenas troca `activeSeries`, re-renderiza e mantém inputs desabilitados. O guarda era redundante com `tab.disabled = true` e duplicava a restrição.

### 3. Sem alteração em `switchSeries`

**Decisão:** Reutilizar `switchSeries` existente sem verificação extra de fase.

**Rationale:** A função já atualiza estado, persiste e chama `render()`, que reaplica `applySessionPhase()`. Não há risco de edição acidental porque inputs ficam desabilitados após cada render.

## Risks / Trade-offs

- **[Usuário confunde aba habilitada com edição permitida]** → Mitigação: inputs permanecem desabilitados e visualmente readonly; comportamento alinhado ao spec.
- **[Troca de aba persiste `activeSeries` na sessão encerrada]** → Aceito: reflete qual dia o usuário estava consultando ao recarregar; consistente com fase `active`.

## Migration Plan

1. Ajustar `applySessionPhase` e handler de abas.
2. Deploy estático — sem migração de dados; `sessionPhase` e séries já persistidos.
3. Rollback: reverter os dois arquivos JS.

## Open Questions

_(nenhuma — requisito da issue #8 é claro.)_
