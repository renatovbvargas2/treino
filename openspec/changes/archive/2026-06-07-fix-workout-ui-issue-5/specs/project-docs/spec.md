## MODIFIED Requirements

### Requirement: README do projeto

O repositório MUST incluir um **README.md** descrevendo o propósito do app, rotinas Sábado/Domingo (Série A/B), uso de localStorage, requisitos de deploy no S3 e instruções básicas para rodar localmente.

#### Scenario: Novo contribuidor ou usuário

- **WHEN** alguém abre o repositório no GitHub
- **THEN** o README explica o que o projeto faz e como publicar ou testar

### Requirement: Atualizar release notes em mudanças futuras

Cada entrega versionada significativa MUST adicionar uma entrada nas release notes descrevendo o que mudou, incluindo nesta entrega: botão Terminar treino, fluxo separado de Iniciar treino, rótulos Sábado/Domingo e bloqueio de orientação em retrato.

#### Scenario: Correção ou feature posterior

- **WHEN** uma nova versão é publicada no GitHub
- **THEN** a nova versão aparece documentada no arquivo de release notes
