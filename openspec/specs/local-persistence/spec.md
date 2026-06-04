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
