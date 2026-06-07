## ADDED Requirements

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
