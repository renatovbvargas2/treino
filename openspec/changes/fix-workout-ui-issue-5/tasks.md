## 1. Orientação em retrato (issue: botão girar)

- [ ] 1.1 Adicionar meta tag de orientação retrato e `manifest.json` mínimo com `"orientation": "portrait"` em `index.html`
- [ ] 1.2 Em `js/app.js`, tentar `screen.orientation.lock('portrait')` na inicialização com `try/catch` silencioso

## 2. Fase da sessão e encerramento

- [ ] 2.1 Adicionar `sessionPhase` (`active` | `terminated`) em `js/storage.js` com default `active` para estados legados
- [ ] 2.2 Implementar `terminateWorkout(state)` em `js/session.js` que define fase `terminated` sem limpar `currentSession.sets`
- [ ] 2.3 Garantir que `startWorkout` redefine `sessionPhase` para `active` ao criar nova sessão

## 3. Interface: Terminar e Iniciar

- [ ] 3.1 Adicionar botão `#btn-terminate-workout` ("Terminar treino") no header de `index.html` ao lado de Iniciar
- [ ] 3.2 Em `js/ui.js`, implementar `setSessionPhase` / `applySessionPhase` que habilita ou desabilita inputs, abas, nav e botões conforme fase
- [ ] 3.3 Em `js/app.js`, handler de Terminar com `confirm()` e chamada a `terminateWorkout`; handler de Iniciar chama `startWorkout` apenas quando fase é `terminated` (sem confirm de finalização)
- [ ] 3.4 Estilos em `css/styles.css` para botões desabilitados e inputs readonly na fase `terminated`

## 4. Renomear abas Sábado / Domingo

- [ ] 4.1 Alterar texto das abas em `index.html` para **Sábado** e **Domingo** (manter `data-series="A"` / `"B"`)
- [ ] 4.2 Atualizar `formatProgressLabel` em `js/ui.js` para exibir "Sábado" ou "Domingo" em vez de "Série A/B"
- [ ] 4.3 Atualizar `aria-label` da navegação de abas para refletir os novos nomes

## 5. Documentação

- [ ] 5.1 Atualizar `README.md` com rótulos Sábado/Domingo e fluxo Terminar → Iniciar
- [ ] 5.2 Adicionar entrada em `RELEASE_NOTES.md` para a nova versão com as três correções da issue #5
