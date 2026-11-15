# Proposal

## Why

O app registra séries, mas não dá feedback sobre se o usuário atingiu o alvo do treino (3 séries com peso não-decrescente e ≥12 reps). O usuário quer um destaque sutil por exercício indicando se deve subir (verde) ou reduzir (vermelho) o peso na próxima vez.

## What Changes

- Adicionar função pura de avaliação de meta por exercício em `js/storage.js` (`evaluateSetTarget(sets)`), testável.
- Aplicar classes CSS sutis no cartão do exercício (`target-green` / `target-red`) durante render e ao vivo no input.
- Adicionar variáveis CSS de cor para verde/vermelho sutis.
- Atualizar documentação.

## Capabilities

### New Capabilities

_(nenhuma)_

### Modified Capabilities

- `set-logging`: adicionar requisito de feedback de meta por exercício (verde/vermelho/neutro).

## Impact

- `js/storage.js` — nova função `evaluateSetTarget`
- `js/ui.js` — aplicar classes no cartão; atualizar status no input
- `css/styles.css` — classes e variáveis de cor
- `tests/run.js` — testes da função de avaliação
- `openspec/specs/set-logging/spec.md`
