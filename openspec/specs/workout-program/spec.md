## Requirements

### Requirement: Série A com lista fixa de exercícios

O sistema MUST exibir a rotina **Série A** (aba **Sábado** na interface) com os exercícios, nesta ordem: Supino reto, Voador frente, Voador costas, Remada, Barra Graviton, Paralela Graviton, Elevação de ombro máquina, Bíceps Scott, Extensora, Panturrilha.

#### Scenario: Usuário seleciona Sábado

- **WHEN** o usuário escolhe a aba **Sábado** na interface
- **THEN** a lista de exercícios da Série A é exibida na ordem definida

### Requirement: Série B com lista fixa de exercícios

O sistema MUST exibir a rotina **Série B** (aba **Domingo** na interface) com os exercícios, nesta ordem: Supino reto, Voador frente, Voador costas, Remada, Barra Graviton, Paralela Graviton, Elevação de ombro máquina, Bíceps Scott, Flexora, Abdutora, Adutora.

#### Scenario: Usuário seleciona Domingo

- **WHEN** o usuário escolhe a aba **Domingo** na interface
- **THEN** a lista de exercícios da Série B é exibida na ordem definida

### Requirement: Identificador estável por exercício

Cada exercício MUST ter um identificador estável (slug) usado internamente para persistência, independente da série em que aparece.

#### Scenario: Mesmo exercício em A e B

- **WHEN** "Supino reto" aparece na Série A e na Série B
- **THEN** o mesmo identificador de exercício é usado para armazenar histórico desse movimento
