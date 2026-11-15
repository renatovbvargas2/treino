# Spec Delta

## ADDED Requirements

### Requirement: Migração de dados de 3 para 4 séries sem perda

Quando o app carregar um estado persistido com séries contendo menos de 4 entradas por exercício, o sistema MUST preencher (pad) as séries faltantes com `{ weight: null, reps: null }` na sessão atual, em `suggestions` e em `lastCompletedSession`, preservando os valores já registrados nas séries existentes. A migração MUST ser idempotente e MUST manter a chave de storage `treino-app-v1`.

#### Scenario: Usuário com 3 séries salvas

- **WHEN** o app carrega um estado com sessão atual contendo 3 séries preenchidas por exercício
- **THEN** a 4ª série é adicionada vazia
- **AND** os valores das 3 séries existentes permanecem inalterados

#### Scenario: Migração de suggestions e lastCompletedSession

- **WHEN** o app carrega um estado com `suggestions` ou `lastCompletedSession` contendo 3 séries por exercício
- **THEN** a 4ª série é adicionada vazia nesses objetos
- **AND** as referências existentes das 3 séries são preservadas

#### Scenario: Migração idempotente

- **WHEN** o app carrega um estado já migrado (4 séries)
- **THEN** nenhuma alteração é feita nas séries existentes
