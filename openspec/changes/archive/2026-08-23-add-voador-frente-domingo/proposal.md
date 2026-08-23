## Why

O exercício **Voador frente** está presente apenas no treino de Sábado (Série A). O usuário quer treinar as partes **superiores** nos dois dias da semana, alternando apenas a parte **inferior** entre sábado e domingo. Adicionar Voador frente à Série B (Domingo) permite essa alternância.

## What Changes

- Inserir `voador-frente` no array `SERIES_B_IDS` em `js/program.js`, na posição 2 (logo após `supino-reto`)
- Atualizar a documentação das rotinas no `README.md` e na spec `workout-program`

## Capabilities

### New Capabilities

_(nenhuma)_

### Modified Capabilities

- `workout-program`: requisito da Série B passa a incluir Voador frente como segundo exercício, resultando em 11 exercícios (vs 10 atuais)

## Impact

- `js/program.js` — inserção de um elemento no array `SERIES_B_IDS`
- `README.md` — atualizar lista de exercícios do Domingo
- `openspec/specs/workout-program/spec.md` — atualizar spec da Série B
- Sem alteração em `storage.js`, `session.js` ou `ui.js` (lógica é agnóstica à lista de exercícios)
