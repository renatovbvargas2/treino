## Why

A issue [#8](https://github.com/renatovbvargas2/treino/issues/8) reporta que as abas **Sábado** e **Domingo** ficam desabilitadas após **Terminar treino**, impedindo o usuário de alternar entre os dois dias para consultar os valores registrados na sessão encerrada. O congelamento da interface deve preservar a edição bloqueada, mas a navegação entre séries continua sendo necessária para revisar o treino completo do fim de semana.

## What Changes

- Manter abas **Sábado** e **Domingo** habilitadas na fase `terminated`, permitindo alternar a série exibida em modo somente leitura.
- Continuar desabilitando edição de peso/repetições, navegação Anterior/Próximo e botão **Terminar treino** na fase encerrada.
- Remover o bloqueio de clique nas abas em `js/app.js` quando a sessão está encerrada.

## Capabilities

### New Capabilities

_(nenhuma)_

### Modified Capabilities

- `workout-session`: requisito de congelamento da interface — abas Sábado/Domingo permanecem habilitadas para consulta; demais controles de edição e navegação seguem desabilitados.

## Impact

- `js/ui.js` — `applySessionPhase` não desabilita `.series-tab` na fase `terminated`.
- `js/app.js` — handler de clique nas abas permite `switchSeries` quando encerrado.
- `openspec/specs/workout-session/spec.md` — atualizar cenário de sessão encerrada.
