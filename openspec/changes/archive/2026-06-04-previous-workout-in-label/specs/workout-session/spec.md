## MODIFIED Requirements

### Requirement: Sugerir valores do treino anterior

Após iniciar um novo treino, o sistema MUST exibir os pesos e repetições do treino arquivado imediatamente anterior como referência ao lado dos labels dos campos (quando existirem), e MUST iniciar a sessão atual com campos de entrada vazios para peso e repetições.

#### Scenario: Referência após segundo treino

- **WHEN** o usuário inicia um novo treino e havia dados no treino anterior arquivado
- **THEN** os labels mostram os valores de referência do treino anterior (ex.: "Peso (kg) 33", "Reps 9")
- **AND** os inputs de peso e repetições permanecem vazios até o usuário digitar

#### Scenario: Registrar apenas entrada nova

- **WHEN** o usuário preenche peso ou repetições após iniciar o treino com referência nos labels
- **THEN** apenas os valores digitados são persistidos na sessão atual
