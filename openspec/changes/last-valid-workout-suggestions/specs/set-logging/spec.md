## ADDED Requirements

### Requirement: Referência nos labels após sessão parcial

Quando o usuário inicia um novo treino sem ter completado toda a sessão anterior, o sistema MUST manter os inputs vazios na nova sessão e MUST exibir nos labels as referências resultantes do merge: séries com peso e repetições informados na sessão encerrada mostram esses valores; demais slots mostram a referência anterior em `suggestions`, inclusive do último treino completo arquivado quando existir.

#### Scenario: Labels com séries registradas na sessão parcial

- **WHEN** o usuário inicia um novo treino após preencher peso e repetições em uma ou mais séries (mas não em toda a sessão)
- **THEN** os labels dessas séries mostram os valores registrados (ex.: "Peso (kg) 50", "Reps 10")
- **AND** os inputs permanecem vazios

#### Scenario: Labels com último treino completo nos slots restantes

- **WHEN** o usuário inicia um novo treino após sessão incompleta
- **AND** existia referência anterior em `suggestions` para séries não totalmente preenchidas na sessão encerrada
- **THEN** os labels desses slots continuam exibindo a referência anterior (ex.: "Peso (kg) 33", "Reps 9")
- **AND** os inputs permanecem vazios

#### Scenario: Série com apenas peso ou apenas repetições

- **WHEN** o usuário encerrou a sessão com peso preenchido e repetições vazias (ou o inverso) em uma série
- **THEN** essa série não atualiza a referência nos labels com os valores parciais
- **AND** o slot mantém a referência anterior em `suggestions`, se houver

#### Scenario: Série sem referência quando nunca houve treino completo

- **WHEN** o usuário inicia um novo treino após sessão incompleta
- **AND** não há referência em `suggestions` para aquela série
- **THEN** os labels exibem apenas "Peso (kg)" e "Reps" sem valores numéricos adicionais
