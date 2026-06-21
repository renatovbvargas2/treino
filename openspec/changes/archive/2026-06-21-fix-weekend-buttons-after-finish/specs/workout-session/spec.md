## MODIFIED Requirements

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
