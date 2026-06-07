## Requirements

### Requirement: Stack estática HTML CSS JavaScript

O aplicativo MUST ser implementado apenas com **HTML**, **CSS** e **JavaScript**, sem servidor de aplicação.

#### Scenario: Hospedagem em S3

- **WHEN** os arquivos são publicados em um bucket S3 como site estático
- **THEN** o aplicativo carrega e funciona apenas com recursos estáticos

### Requirement: Layout responsivo

A interface MUST adaptar-se a diferentes larguras de tela, incluindo smartphones.

#### Scenario: Visualização em 320px

- **WHEN** a viewport tem largura de 320px ou superior típica de celular
- **THEN** o conteúdo permanece legível, sem scroll horizontal obrigatório para controles principais

### Requirement: Compatibilidade com dispositivos modernos

O app MUST funcionar nos navegadores mobile e desktop modernos (Chrome, Safari, Firefox, Edge) suportando localStorage.

#### Scenario: Uso no celular do usuário

- **WHEN** o usuário abre o link do S3 no navegador do celular
- **THEN** pode registrar treino e persistir dados localmente

### Requirement: Orientação fixa em retrato

O aplicativo MUST tentar manter a orientação da tela em **retrato** no mobile para evitar o controle indesejado de rotação ("girar") do navegador durante o uso do treino.

#### Scenario: Carregamento no celular

- **WHEN** o usuário abre o aplicativo no navegador mobile
- **THEN** o app declara preferência por orientação retrato (meta tag e/ou manifest)
- **AND** tenta aplicar lock de orientação em retrato quando a API do navegador permitir, sem impedir o uso se o lock falhar

#### Scenario: Lock indisponível

- **WHEN** o navegador não suporta ou rejeita o lock de orientação
- **THEN** o aplicativo continua funcionando normalmente em retrato
- **AND** nenhum erro visível é exibido ao usuário

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
