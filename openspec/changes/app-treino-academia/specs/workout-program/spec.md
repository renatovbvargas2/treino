## ADDED Requirements

### Requirement: Série A com lista fixa de exercícios

O sistema MUST exibir a rotina **Série A** com os exercícios, nesta ordem: Supino reto, Voador frente, Voador costas, Remada, Barra Graviton, Paralela Graviton, Elevação de ombro máquina, Bíceps Scott, Extensora, Panturrilha.

#### Scenario: Usuário seleciona Série A

- **WHEN** o usuário escolhe a Série A na interface
- **THEN** a lista de exercícios da Série A é exibida na ordem definida

### Requirement: Série B com lista fixa de exercícios

O sistema MUST exibir a rotina **Série B** com os exercícios, nesta ordem: Supino reto, Voador costas, Remada, Barra Graviton, Paralela Graviton, Elevação de ombro máquina, Bíceps Scott, Flexora, Abdutora, Adutora.

#### Scenario: Usuário seleciona Série B

- **WHEN** o usuário escolhe a Série B na interface
- **THEN** a lista de exercícios da Série B é exibida na ordem definida

### Requirement: Identificador estável por exercício

Cada exercício MUST ter um identificador estável (slug) usado internamente para persistência, independente da série em que aparece.

#### Scenario: Mesmo exercício em A e B

- **WHEN** "Supino reto" aparece na Série A e na Série B
- **THEN** o mesmo identificador de exercício é usado para armazenar histórico desse movimento
