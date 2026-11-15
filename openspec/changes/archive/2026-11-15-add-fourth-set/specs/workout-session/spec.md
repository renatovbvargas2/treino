# Spec Delta

## MODIFIED Requirements

### Requirement: Arquivar sessão anterior ao iniciar

Ao pressionar **Iniciar treino** (com sessão na fase `terminated`), o sistema MUST salvar a sessão encerrada como base integral de sugestões (`lastCompletedSession` e `suggestions`) **somente** quando essa sessão estiver **completa** (todos os exercícios da série ativa com as quatro séries tendo peso e repetições preenchidos). Se a sessão estiver incompleta mas tiver dados, o sistema MUST mesclar nas `suggestions` apenas as séries com peso e repetições preenchidos, MUST preservar referências anteriores nos demais slots e MUST **não** atualizar `lastCompletedSession`. Em todos os casos, a nova sessão MUST iniciar com campos de entrada vazios e a fase MUST voltar para `active`.

#### Scenario: Iniciar novo treino após sessão preenchida

- **WHEN** o usuário pressiona "Iniciar treino" após ter terminado um treino com peso e repetições em todas as séries de todos os exercícios da série ativa
- **THEN** esses valores são arquivados para sugestão e a nova sessão inicia com estado de treino renovado na fase `active`

#### Scenario: Iniciar novo treino com sessão incompleta

- **WHEN** o usuário pressiona "Iniciar treino" após terminar um treino com ao menos um campo vazio em qualquer exercício da série ativa
- **THEN** a nova sessão inicia com campos de entrada vazios na fase `active`
- **AND** `lastCompletedSession` permanece o do último treino completo anterior (se existir)
- **AND** `suggestions` incorporam peso e repetições das séries totalmente preenchidas na sessão que está sendo encerrada
- **AND** slots não preenchidos ou com apenas peso ou apenas repetições mantêm a referência já existente em `suggestions`
