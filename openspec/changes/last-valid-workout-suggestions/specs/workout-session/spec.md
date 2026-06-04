## MODIFIED Requirements

### Requirement: Arquivar sessão anterior ao iniciar

Ao pressionar **Iniciar treino**, o sistema MUST salvar a sessão anterior como base integral de sugestões (`lastCompletedSession` e `suggestions`) **somente** quando essa sessão estiver **completa** (todos os exercícios da série ativa com as três séries tendo peso e repetições preenchidos). Se a sessão estiver incompleta mas tiver dados, o sistema MUST mesclar nas `suggestions` apenas as séries com peso e repetições preenchidos, MUST preservar referências anteriores nos demais slots e MUST **não** atualizar `lastCompletedSession`. Em todos os casos, a nova sessão MUST iniciar com campos de entrada vazios.

#### Scenario: Iniciar novo treino após sessão preenchida

- **WHEN** o usuário pressiona "Iniciar treino" após ter registrado peso e repetições em todas as séries de todos os exercícios da série ativa
- **THEN** esses valores são arquivados para sugestão e a nova sessão inicia com estado de treino renovado

#### Scenario: Iniciar novo treino com sessão incompleta

- **WHEN** o usuário pressiona "Iniciar treino" e a sessão atual tem ao menos um campo vazio em qualquer exercício da série ativa
- **THEN** a nova sessão inicia com campos de entrada vazios
- **AND** `lastCompletedSession` permanece o do último treino completo anterior (se existir)
- **AND** `suggestions` incorporam peso e repetições das séries totalmente preenchidas na sessão que está sendo encerrada
- **AND** slots não preenchidos ou com apenas peso ou apenas repetições mantêm a referência já existente em `suggestions`

## ADDED Requirements

### Requirement: Confirmar antes de iniciar novo treino

Antes de executar **Iniciar treino**, o sistema MUST solicitar confirmação explícita do usuário perguntando se deseja realmente finalizar o treino.

#### Scenario: Usuário confirma início

- **WHEN** o usuário pressiona "Iniciar treino" e confirma no diálogo
- **THEN** o fluxo de novo treino é executado conforme as regras de arquivamento e sessão vazia

#### Scenario: Usuário cancela início

- **WHEN** o usuário pressiona "Iniciar treino" e cancela no diálogo
- **THEN** a sessão atual e as sugestões arquivadas permanecem inalteradas
- **AND** nenhum novo estado de sessão é criado
