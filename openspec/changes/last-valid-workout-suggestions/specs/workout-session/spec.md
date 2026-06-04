## MODIFIED Requirements

### Requirement: Arquivar sessão anterior ao iniciar

Ao pressionar **Iniciar treino**, o sistema MUST salvar os dados da sessão de treino anterior como base para sugestões na próxima sessão **somente** quando essa sessão estiver **completa** (todos os exercícios da série ativa com as três séries tendo peso e repetições preenchidos). Se a sessão anterior tiver qualquer campo de peso ou repetições vazio para algum exercício da série, o sistema MUST **não** substituir o histórico de sugestões já arquivado e MUST iniciar a nova sessão com campos vazios.

#### Scenario: Iniciar novo treino após sessão preenchida

- **WHEN** o usuário pressiona "Iniciar treino" após ter registrado peso e repetições em todas as séries de todos os exercícios da série ativa
- **THEN** esses valores são arquivados para sugestão e a nova sessão inicia com estado de treino renovado

#### Scenario: Iniciar novo treino com sessão incompleta

- **WHEN** o usuário pressiona "Iniciar treino" e a sessão atual tem ao menos um campo de peso ou repetições vazio em qualquer exercício da série ativa
- **THEN** a nova sessão inicia com campos de entrada vazios
- **AND** `suggestions` e o treino arquivado para referência permanecem os do último treino completo anterior (se existirem)

## ADDED Requirements

### Requirement: Confirmar antes de iniciar novo treino

Antes de executar **Iniciar treino**, o sistema MUST solicitar confirmação explícita do usuário com uma mensagem que indique que um novo treino será iniciado e que a sessão em andamento será reiniciada.

#### Scenario: Usuário confirma início

- **WHEN** o usuário pressiona "Iniciar treino" e confirma no diálogo
- **THEN** o fluxo de novo treino é executado conforme as regras de arquivamento e sessão vazia

#### Scenario: Usuário cancela início

- **WHEN** o usuário pressiona "Iniciar treino" e cancela no diálogo
- **THEN** a sessão atual e as sugestões arquivadas permanecem inalteradas
- **AND** nenhum novo estado de sessão é criado
