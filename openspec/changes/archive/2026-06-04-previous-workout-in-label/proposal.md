## Why

Hoje, ao iniciar um novo treino, peso e repetições do treino anterior aparecem pré-preenchidos nos inputs. Isso mistura referência do último treino com o que o usuário está registrando agora e dificulta ver de relance onde parou sem confundir com valores já digitados na sessão atual. O usuário precisa de referência visível no label e campos vazios para registrar apenas o que fez neste treino.

## What Changes

- Exibir valores do treino anterior ao lado do label de cada campo (ex.: `Peso (kg) 33`, `Reps 9`), não no `value` do input.
- Manter inputs de peso e repetições vazios ao iniciar nova sessão (quando só há sugestão do treino arquivado).
- Ajustar fluxo de "Iniciar treino" para não copiar sugestões para os dados da sessão atual — sugestões permanecem apenas como referência na UI.
- Atualizar destaque visual (`is-suggested`) ou equivalente para refletir referência no label, não pré-preenchimento.
- Atualizar requisitos em spec que hoje exigem pré-preenchimento nos campos.

## Capabilities

### New Capabilities

_(nenhuma — mudança de comportamento em capacidades existentes)_

### Modified Capabilities

- `workout-session`: requisito de sugerir valores do treino anterior passa a exigir referência no label e sessão com campos vazios.
- `set-logging`: acrescentar requisito de exibição da referência do treino anterior no label e inputs vazios para nova entrada.

## Impact

- `js/session.js` — `buildSetsFromSuggestions` deve iniciar séries vazias em vez de copiar peso/reps.
- `js/ui.js` — `renderSetRow` monta labels com referência; inputs sem valor de sugestão.
- `css/styles.css` — possível ajuste de estilo para valor de referência no label (ex. cor secundária).
- `openspec/specs/workout-session/spec.md` e `openspec/specs/set-logging/spec.md` — deltas na change.
