## ADDED Requirements

### Requirement: Referência do treino anterior no label

Quando existir treino anterior arquivado para a série, o sistema MUST mostrar peso e repetições daquele treino no texto do label do campo, e MUST manter o input correspondente vazio até o usuário informar um valor na sessão atual.

#### Scenario: Label com referência e input vazio

- **WHEN** o usuário visualiza uma série com dados arquivados do treino anterior
- **THEN** o label de peso exibe "Peso (kg)" seguido do valor arquivado quando houver peso
- **AND** o label de repetições exibe "Reps" seguido do valor arquivado quando houver repetições
- **AND** os inputs de peso e repetições não exibem valor pré-preenchido da referência

#### Scenario: Série sem referência anterior

- **WHEN** não há dados arquivados para aquela série
- **THEN** os labels exibem apenas "Peso (kg)" e "Reps" sem valores numéricos adicionais
