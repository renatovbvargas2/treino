## Requirements

### Requirement: Botão Terminar treino

O sistema MUST exibir um botão **Terminar treino** acessível na interface principal enquanto a sessão estiver na fase ativa.

#### Scenario: Exibir controle de término

- **WHEN** o usuário abre o aplicativo com sessão na fase `active`
- **THEN** o botão "Terminar treino" está visível e habilitado

### Requirement: Confirmar antes de terminar treino

Antes de executar **Terminar treino**, o sistema MUST solicitar confirmação explícita do usuário perguntando se deseja realmente terminar o treino.

#### Scenario: Usuário confirma término

- **WHEN** o usuário pressiona "Terminar treino" e confirma no diálogo
- **THEN** a sessão passa para a fase `terminated`
- **AND** os valores atuais permanecem visíveis nos campos

#### Scenario: Usuário cancela término

- **WHEN** o usuário pressiona "Terminar treino" e cancela no diálogo
- **THEN** a sessão permanece na fase `active` sem alterações

### Requirement: Congelar interface ao terminar

Quando a sessão está na fase `terminated`, o sistema MUST desabilitar edição de peso e repetições, navegação Anterior/Próximo e o botão Terminar treino, mantendo os valores digitados visíveis nos inputs. As abas de série (Sábado/Domingo) MUST permanecer habilitadas para permitir consulta somente leitura entre as duas séries.

#### Scenario: Sessão encerrada com valores preservados

- **WHEN** o usuário termina o treino com sucesso
- **THEN** todos os campos de entrada exibem os valores registrados mas estão desabilitados
- **AND** botões de navegação de exercício (Anterior/Próximo) estão desabilitados
- **AND** o botão "Terminar treino" está desabilitado
- **AND** as abas Sábado e Domingo permanecem habilitadas

#### Scenario: Consultar série encerrada após terminar

- **WHEN** o usuário termina o treino e pressiona a aba da outra série (Sábado ou Domingo)
- **THEN** a interface exibe os exercícios e valores registrados da série selecionada
- **AND** todos os campos de entrada permanecem desabilitados

### Requirement: Persistir fase da sessão

O sistema MUST persistir `sessionPhase` (`active` ou `terminated`) no localStorage junto ao estado da sessão.

#### Scenario: Recarregar após terminar

- **WHEN** o usuário recarrega a página após terminar o treino
- **THEN** a sessão permanece na fase `terminated` com valores visíveis e controles desabilitados

### Requirement: Botão Iniciar treino

O sistema MUST exibir um botão **Iniciar treino** acessível na interface principal. O botão MUST estar **desabilitado** enquanto a sessão estiver na fase `active` e MUST estar **habilitado** somente quando a sessão estiver na fase `terminated`.

#### Scenario: Exibir controle de início após terminar

- **WHEN** o usuário termina o treino e a sessão está na fase `terminated`
- **THEN** o botão "Iniciar treino" está visível e habilitado

#### Scenario: Iniciar indisponível durante edição

- **WHEN** o usuário está registrando o treino na fase `active`
- **THEN** o botão "Iniciar treino" está visível mas desabilitado

### Requirement: Arquivar sessão anterior ao iniciar

Ao pressionar **Iniciar treino** (com sessão na fase `terminated`), o sistema MUST salvar a sessão encerrada como base integral de sugestões (`lastCompletedSession` e `suggestions`) **somente** quando essa sessão estiver **completa** (todos os exercícios da série ativa com as três séries tendo peso e repetições preenchidos). Se a sessão estiver incompleta mas tiver dados, o sistema MUST mesclar nas `suggestions` apenas as séries com peso e repetições preenchidos, MUST preservar referências anteriores nos demais slots e MUST **não** atualizar `lastCompletedSession`. Em todos os casos, a nova sessão MUST iniciar com campos de entrada vazios e a fase MUST voltar para `active`.

#### Scenario: Iniciar novo treino após sessão preenchida

- **WHEN** o usuário pressiona "Iniciar treino" após ter terminado um treino com peso e repetições em todas as séries de todos os exercícios da série ativa
- **THEN** esses valores são arquivados para sugestão e a nova sessão inicia com estado de treino renovado na fase `active`

#### Scenario: Iniciar novo treino com sessão incompleta

- **WHEN** o usuário pressiona "Iniciar treino" após terminar um treino com ao menos um campo vazio em qualquer exercício da série ativa
- **THEN** a nova sessão inicia com campos de entrada vazios na fase `active`
- **AND** `lastCompletedSession` permanece o do último treino completo anterior (se existir)
- **AND** `suggestions` incorporam peso e repetições das séries totalmente preenchidas na sessão que está sendo encerrada
- **AND** slots não preenchidos ou com apenas peso ou apenas repetições mantêm a referência já existente em `suggestions`

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
