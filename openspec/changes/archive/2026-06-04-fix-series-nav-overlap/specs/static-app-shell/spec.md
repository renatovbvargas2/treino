## ADDED Requirements

### Requirement: Chrome de navegação fixo no topo

As abas **Série A** / **Série B** e a barra de progresso do exercício (Anterior, rótulo, Próximo) MUST permanecer fixas no topo da viewport durante o scroll da lista de exercícios, empilhadas abaixo do cabeçalho principal sem sobrepor o conteúdo rolável.

#### Scenario: Rolagem da lista com abas visíveis

- **WHEN** o usuário rola a lista de exercícios para baixo
- **THEN** as abas Série A e Série B permanecem visíveis no topo
- **AND** a barra Anterior / rótulo / Próximo permanece visível abaixo das abas

#### Scenario: Primeiro exercício após scroll automático

- **WHEN** o usuário troca para Série A ou B ou o app rola até o exercício ativo (índice 0)
- **THEN** o card do exercício e a linha "Série 1" ficam totalmente visíveis abaixo do chrome fixo, sem ficarem ocultos atrás das barras

#### Scenario: Foco no input do primeiro exercício

- **WHEN** o usuário foca um campo de peso ou repetições no primeiro exercício da série
- **THEN** o navegador posiciona o conteúdo de forma que o campo e o rótulo da série não fiquem cobertos pelas barras fixas
