## Purpose

Defines localStorage persistence and migration of workout data.

## Requirements

### Requirement: Persistência em localStorage

Todos os dados de treino da sessão atual MUST ser salvos no **localStorage** do navegador.

#### Scenario: Recarregar página

- **WHEN** o usuário recarrega a página após registrar pesos e repetições
- **THEN** os valores registrados permanecem visíveis

### Requirement: Lembrar última série ativa

O sistema MUST restaurar a última série selecionada (**A** ou **B**) ao reabrir o aplicativo.

#### Scenario: Reabrir após usar Série B

- **WHEN** o usuário estava na Série B, fecha o navegador e reabre o app
- **THEN** a Série B (ou seus dados) é restaurada conforme estado salvo

### Requirement: Lembrar últimos pesos e repetições

O sistema MUST restaurar os últimos valores de peso e repetições registrados para cada exercício e série da sessão em andamento.

#### Scenario: Continuar treino interrompido

- **WHEN** o usuário retorna sem pressionar "Iniciar treino"
- **THEN** os campos exibem os últimos valores salvos da sessão atual

### Requirement: Lembrar progresso na rotina

O sistema MUST persistir e restaurar a posição de progresso na rotina (ex.: índice ou identificador do exercício em foco).

#### Scenario: Retomar no mesmo exercício

- **WHEN** o usuário estava no terceiro exercício da lista e reabre o app
- **THEN** o app indica ou rola para o exercício onde parou, conforme implementação de UI

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
