## ADDED Requirements

### Requirement: Referência preservada com sessão incompleta

Quando o usuário inicia um novo treino sem ter completado todos os campos da sessão anterior, o sistema MUST continuar exibindo nos labels a referência do último treino **completo** arquivado, e MUST manter os inputs vazios para a nova sessão.

#### Scenario: Labels com último treino válido após sessão parcial

- **WHEN** o usuário inicia um novo treino tendo deixado campos vazios na sessão anterior
- **AND** existia um treino completo arquivado anteriormente
- **THEN** os labels de peso e repetições mostram os valores do último treino completo (ex.: "Peso (kg) 33", "Reps 9")
- **AND** os inputs permanecem vazios

#### Scenario: Série sem referência quando nunca houve treino completo

- **WHEN** o usuário inicia um novo treino após sessão incompleta
- **AND** nunca houve um treino completo arquivado para aquela série/exercício
- **THEN** os labels exibem apenas "Peso (kg)" e "Reps" sem valores numéricos adicionais
