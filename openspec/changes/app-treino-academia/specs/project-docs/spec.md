## ADDED Requirements

### Requirement: README do projeto

O repositório MUST incluir um **README.md** descrevendo o propósito do app, rotinas A/B, uso de localStorage, requisitos de deploy no S3 e instruções básicas para rodar localmente.

#### Scenario: Novo contribuidor ou usuário

- **WHEN** alguém abre o repositório no GitHub
- **THEN** o README explica o que o projeto faz e como publicar ou testar

### Requirement: Release notes

O repositório MUST incluir um arquivo de **release notes** (por exemplo `RELEASE_NOTES.md` ou `CHANGELOG.md`) listando alterações por versão.

#### Scenario: Primeira release

- **WHEN** a versão inicial é entregue
- **THEN** o arquivo de release notes contém pelo menos a entrada da v1.0.0 com o escopo inicial

### Requirement: Atualizar release notes em mudanças futuras

Cada entrega versionada significativa MUST adicionar uma entrada nas release notes descrevendo o que mudou.

#### Scenario: Correção ou feature posterior

- **WHEN** uma nova versão é publicada no GitHub
- **THEN** a nova versão aparece documentada no arquivo de release notes
