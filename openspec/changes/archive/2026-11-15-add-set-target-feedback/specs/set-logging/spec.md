# Spec Delta

## ADDED Requirements

### Requirement: Feedback de meta por exercício

O sistema MUST exibir, por exercício, um destaque visual sutil indicando se o usuário atingiu a meta do treino (3 séries com peso não-decrescente e pelo menos 12 repetições em cada): verde quando, além disso, a 4ª série for concluída com peso igual ou maior e pelo menos 12 repetições (sinalizando que pode aumentar o peso); vermelho quando as 3 primeiras séries não atingirem a meta (peso reduzido em alguma série ou menos de 12 repetições); neutro nos demais casos. O feedback MUST ser atualizado ao vivo durante a digitação e persistir na fase encerrada.

#### Scenario: Meta atingida com 4ª série qualificada

- **WHEN** um exercício tem 3 séries concluídas com pesos não-decrescentes e pelo menos 12 repetições cada, e a 4ª série concluída com peso igual ou maior e pelo menos 12 repetições
- **THEN** o cartão do exercício recebe destaque sutil em verde

#### Scenario: Meta não atingida por repetições

- **WHEN** um exercício tem ao menos uma das 3 primeiras séries concluída com menos de 12 repetições
- **THEN** o cartão do exercício recebe destaque sutil em vermelho

#### Scenario: Meta não atingida por redução de peso

- **WHEN** um exercício tem peso reduzido em uma série posterior entre as 3 primeiras
- **THEN** o cartão do exercício recebe destaque sutil em vermelho

#### Scenario: Dados parciais

- **WHEN** um exercício tem menos de 3 séries concluídas e nenhuma falha nas séries concluídas
- **THEN** o cartão do exercício permanece neutro (sem destaque)

#### Scenario: 3 séries atingem meta mas 4ª não qualifica

- **WHEN** um exercício tem 3 séries que atingem a meta mas a 4ª série não está concluída ou não qualifica
- **THEN** o cartão do exercício permanece neutro (sem verde)
