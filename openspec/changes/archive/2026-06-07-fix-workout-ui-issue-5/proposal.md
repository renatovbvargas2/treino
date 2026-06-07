## Why

A issue [#5](https://github.com/renatovbvargas2/treino/issues/5) reporta três problemas de UX no uso diário no celular: um botão indesejado de **girar** a tela que aparece intermitentemente, ausência de um fluxo claro para **terminar** o treino sem já iniciar outro, e rótulos **Série A/B** que não refletem os dias reais de treino (sábado e domingo).

## What Changes

- Bloquear ou desencorajar rotação de tela na página para evitar o botão **girar** do navegador no celular.
- Adicionar botão **Terminar treino** com confirmação: congela a sessão, mantém valores visíveis nos campos, desabilita inputs e navegação, e habilita **Iniciar treino**.
- Separar **Iniciar treino** de **Terminar treino**: Iniciar arquiva a sessão encerrada, limpa os campos para nova entrada e reabilita os controles (sem pedir confirmação de finalização — isso fica em Terminar).
- Renomear abas **Série A** → **Sábado** e **Série B** → **Domingo** na interface (identificadores internos A/B permanecem inalterados).

## Capabilities

### New Capabilities

_(nenhuma)_

### Modified Capabilities

- `static-app-shell`: travar orientação em retrato e evitar UI de rotação indesejada no mobile.
- `workout-session`: fluxo em duas etapas (Terminar → Iniciar) com estados de sessão ativa e encerrada.
- `workout-program`: rótulos de abas e textos de progresso exibem Sábado/Domingo em vez de Série A/B.
- `project-docs`: README e release notes refletem os novos rótulos e botões.

## Impact

- `index.html` — novo botão Terminar treino, rótulos Sábado/Domingo, meta/manifest de orientação.
- `css/styles.css` — estilos para controles desabilitados no estado encerrado.
- `js/storage.js` — persistir fase da sessão (`active` / `terminated`).
- `js/session.js` — função para encerrar sessão sem iniciar nova; `startWorkout` só após Terminar.
- `js/ui.js` — habilitar/desabilitar controles conforme fase; rótulos Sábado/Domingo no progresso.
- `js/app.js` — handlers separados para Terminar e Iniciar; tentativa de lock de orientação.
- `README.md`, `RELEASE_NOTES.md` — documentação atualizada.
