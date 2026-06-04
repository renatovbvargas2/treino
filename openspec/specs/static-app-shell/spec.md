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
