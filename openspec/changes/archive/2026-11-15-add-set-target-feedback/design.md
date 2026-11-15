# Design

## Context

Avaliação derivada dos sets da sessão atual, sem persistência. Função pura em `storage.js` para testabilidade, consumida por `ui.js`.

## Goals / Non-Goals

**Goals:**
- Feedback visual sutil por exercício: verde (pode subir peso), vermelho (reduzir), neutro.
- Avaliação ao vivo sem perder foco do input.

**Non-Goals:**
- Não persistir status (derivado).
- Não considerar `suggestions` (apenas sessão atual).

## Decisions

### 1. Função pura `evaluateSetTarget(sets)`

Retorna `'green' | 'red' | 'neutral'`.

Regras (com base nas 3 primeiras séries):
- Coletar séries concluídas (weight e reps presentes).
- Se nenhuma série concluída → `neutral`.
- Vermelho se qualquer série concluída tiver reps < 12 OU redução de peso entre séries concluídas adjacentes (peso[i+1] < peso[i]).
- Para verde, as 3 primeiras séries devem estar concluídas, com pesos não-decrescentes e reps ≥ 12; e a 4ª série (se existir) concluída com peso ≥ peso da 3ª e reps ≥ 12.
- Se as 3 primeiras atingem a meta mas a 4ª não qualifica (ou não existe) → `neutral`.
- Caso contrário (dados parciais sem falha) → `neutral`.

Observação: vermelho é determinado apenas pelas 3 primeiras séries; a 4ª série nunca causa vermelho.

### 2. Atualização ao vivo

No handler `input` de `ui.js`, após `onSetInput`, obter o cartão `.exercise-card` mais próximo e alternar classes `target-green`/`target-red` (removendo ambas antes) com base em `evaluateSetTarget(getSetsForExercise(...))`. Sem re-render.

### 3. Render

Em `renderExerciseList`, adicionar classe ao cartão conforme status.

### 4. CSS

Variáveis `--target-green-bg`, `--target-green-border`, `--target-red-bg`, `--target-red-border` com tons sutis, e classes `.exercise-card.target-green` / `.target-red`.

## Risks / Trade-offs

- **[Foco do input]** → mitigado por não re-renderizar na digitação.
- **[Falsos positivos de vermelho]** → apenas séries concluídas contam; séries incompletas são neutras.

## Migration Plan

Deploy estático. Sem migração de dados.

## Open Questions

_(nenhuma)_
