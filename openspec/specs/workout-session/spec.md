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

Após iniciar um novo treino, o sistema MUST exibir os pesos e repetições do treino arquivado imediatamente anterior como referência ao lado dos labels dos campos (quando existirem), e MUST iniciar a sessão atual com campos de entrada vazios para peso e repetições.

#### Scenario: Referência após segundo treino

- **WHEN** o usuário inicia um novo treino e havia dados no treino anterior arquivado
- **THEN** os labels mostram os valores de referência do treino anterior (ex.: "Peso (kg) 33", "Reps 9")
- **AND** os inputs de peso e repetições permanecem vazios até o usuário digitar

#### Scenario: Registrar apenas entrada nova

- **WHEN** o usuário preenche peso ou repetições após iniciar o treino com referência nos labels
- **THEN** apenas os valores digitados são persistidos na sessão atual

### Requirement: Sessão atual editável

Durante uma sessão em andamento, alterações nos campos MUST atualizar o armazenamento local sem exigir "Iniciar treino".

#### Scenario: Auto-persistência na edição

- **WHEN** o usuário altera peso ou repetições em qualquer série
- **THEN** o localStorage é atualizado para refletir a sessão atual
