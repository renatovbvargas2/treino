## Requirements

### Requirement: Três séries por exercício

Para cada exercício exibido, o sistema MUST oferecer exatamente **3 séries** de registro.

#### Scenario: Exibir campos de série

- **WHEN** um exercício é exibido na tela de treino
- **THEN** o usuário vê três blocos ou linhas de série (série 1, 2 e 3)

### Requirement: Peso e repetições por série

Cada série MUST permitir informar **peso** (valor numérico) e **quantidade de repetições** (valor inteiro ou numérico).

#### Scenario: Registrar peso e reps

- **WHEN** o usuário preenche peso e repetições na série 2 de um exercício
- **THEN** os valores ficam associados à série 2 daquele exercício na sessão atual

### Requirement: Entrada adequada a mobile

Os campos de entrada MUST ser utilizáveis em telas touch (tamanho mínimo de toque e teclado numérico apropriado no celular).

#### Scenario: Abrir app no celular

- **WHEN** o usuário foca o campo de peso ou repetições no celular
- **THEN** o teclado numérico ou decimal é apresentado conforme o tipo do campo

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
