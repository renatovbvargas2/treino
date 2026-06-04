## Requirements

### Requirement: Botão Iniciar treino

O sistema MUST exibir um botão **Iniciar treino** acessível na interface principal.

#### Scenario: Exibir controle de início

- **WHEN** o usuário abre o aplicativo
- **THEN** o botão "Iniciar treino" está visível

### Requirement: Arquivar sessão anterior ao iniciar

Ao pressionar **Iniciar treino**, o sistema MUST salvar os dados da sessão de treino anterior como base para sugestões na próxima sessão.

#### Scenario: Iniciar novo treino após sessão preenchida

- **WHEN** o usuário pressiona "Iniciar treino" após ter registrado valores na sessão atual
- **THEN** esses valores são arquivados para sugestão e a nova sessão inicia com estado de treino renovado

### Requirement: Sugerir valores do treino anterior

Após iniciar um novo treino, o sistema MUST pré-preencher ou sugerir os mesmos pesos e repetições do treino arquivado imediatamente anterior, quando existirem.

#### Scenario: Sugestão após segundo treino

- **WHEN** o usuário inicia um novo treino e havia dados no treino anterior arquivado
- **THEN** os campos de peso e repetições mostram os valores sugeridos do treino anterior (editáveis pelo usuário)

### Requirement: Sessão atual editável

Durante uma sessão em andamento, alterações nos campos MUST atualizar o armazenamento local sem exigir "Iniciar treino".

#### Scenario: Auto-persistência na edição

- **WHEN** o usuário altera peso ou repetições em qualquer série
- **THEN** o localStorage é atualizado para refletir a sessão atual
