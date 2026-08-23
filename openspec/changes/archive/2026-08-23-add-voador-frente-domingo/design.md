## Context

O app de treino usa arrays constantes em `js/program.js` para definir os exercícios de cada série. A Série A (Sábado) tem 10 exercícios, a Série B (Domingo) tem 10 exercícios. O exercício `voador-frente` já existe no mapa `EXERCISES` com id e nome definidos, sendo usado pela Série A.

O sistema de sugestões usa o ID do exercício como chave (`suggestions[exerciseId]`), não exercício+série. Exercícios que aparecem em ambas as séries compartilham o mesmo histórico de sugestões.

## Goals / Non-Goals

**Goals:**

- Adicionar Voador frente como segundo exercício da Série B (logo após Supino reto)
- Manter a ordem relativa dos exercícios superiores consistente entre Série A e B
- Atualizar documentação para refletir a nova lista

**Non-Goals:**

- Alterar lógica de sugestões, arquivamento ou persistência
- Modificar a Série A
- Criar isolamento de sugestões por série (exercício + dia)
- Alterar schema do localStorage

## Decisions

### 1. Inserção no array SERIES_B_IDS

**Decisão:** Inserir `'voador-frente'` na posição 1 do array (após `'supino-reto'`), resultando em 11 exercícios na Série B.

**Rationale:** Mantém a ordem lógica: Supino reto → Voador frente → Voador costas, idêntica à Série A. O exercício já está no mapa `EXERCISES`, sem necessidade de novo slug.

**Alternativa considerada:** Inserir em outra posição — rejeitada porque quebra a consistência de ordem entre as duas séries.

### 2. Sem alteração em sugestões

**Decisão:** Manter o modelo de sugestões existente (chave = exerciseId). Voador frente em Domingo usa a mesma referência de Voador frente em Sábado.

**Rationale:** Para o caso de uso atual (mesmo treino superior nos dois dias), compartilhar sugestões é o comportamento desejado. Não há necessidade de complicar o modelo.

**Alternativa considerada:** Criar chave `exerciseId + series` — rejeitada por complexidade desnecessária e risco de quebrar dados existentes.

### 3. Série B com 11 exercícios

**Decisão:** Aceitar assimetria entre Série A (10) e Série B (11).

**Rationale:** Não há restrição de tamanho igual no código. A verificação `sessionIsComplete` itera sobre os IDs da série ativa, funcionando independentemente do tamanho.

## Risks / Trade-offs

- **[Sugestão compartilhada pode confundir]** → Mitigação: comportamento alinhado à intenção do usuário (mesmo treino superior); inputs ficam vazios na nova sessão, referência é só no label.
- **[Série B mais longa]** → Aceito: diferença de 1 exercício é trivial no tempo de treino.
- **[Dados existentes não têm voador-frente nos sets de Série B]** → Mitigação: `getSetsForExercise` cria `emptySets()` automaticamente para exercício ausente na sessão.

## Migration Plan

- Deploy estático — sem migração de dados
- Usuários com sessão em andamento na Série B: ao recarregar, o novo exercício aparece com séries vazias
- Rollback: reverter o commit em `program.js`

## Open Questions

_(nenhuma — requisito da issue #10 é claro)_
