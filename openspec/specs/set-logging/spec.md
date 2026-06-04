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
