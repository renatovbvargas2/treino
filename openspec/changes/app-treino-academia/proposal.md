## Why

Registrar treino de academia no celular, sem app nativo nem backend, exige uma página estática simples que persista séries, pesos e repetições entre sessões. Hoje não há um lugar único para seguir as rotinas A e B com histórico local e sugestões do último treino.

## What Changes

- Criar aplicação estática (HTML, CSS, JavaScript) hospedável em bucket S3 da AWS.
- Interface responsiva, otimizada para uso no celular.
- Duas rotinas fixas: **Série A** (10 exercícios) e **Série B** (10 exercícios), conforme lista definida.
- Cada exercício com **3 séries**, campos para **peso** e **repetições** por série.
- Persistência em **localStorage**: última série ativa (A ou B), últimos valores registrados e estado da sessão.
- Botão **Iniciar treino** que arquiva o treino anterior e pré-preenche sugestões (mesmos pesos/reps) na próxima sessão.
- Lembrar em qual série (A/B) e em qual exercício/série o usuário parou.
- **README** com características e instruções do projeto (GitHub).
- **Release notes** documentando alterações por versão.

## Capabilities

### New Capabilities

- `workout-program`: Definição das rotinas Série A e Série B com lista fixa de exercícios e navegação entre elas.
- `set-logging`: Registro de peso e repetições em até 3 séries por exercício, com validação de entrada adequada a mobile.
- `local-persistence`: Armazenamento e recuperação de dados no localStorage (histórico, última série, últimos valores).
- `workout-session`: Fluxo de iniciar treino, arquivar sessão anterior para sugestões e retomar progresso.
- `static-app-shell`: Layout responsivo, assets estáticos e estrutura pronta para deploy em S3.
- `project-docs`: README do repositório e arquivo de release notes.

### Modified Capabilities

<!-- Nenhuma spec existente no repositório -->

## Impact

- Novo projeto front-end estático na raiz do repositório (HTML/CSS/JS), sem dependências de servidor.
- Deploy via upload para S3; dados ficam apenas no dispositivo do usuário (localStorage).
- Repositório GitHub com documentação (`README.md`, release notes).
