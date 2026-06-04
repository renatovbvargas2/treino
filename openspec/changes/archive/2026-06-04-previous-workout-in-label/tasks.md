## 1. Sessão e dados

- [x] 1.1 Alterar `buildSetsFromSuggestions` em `js/session.js` para iniciar todas as séries com `emptySets()`, sem copiar peso/reps de `state.suggestions`
- [x] 1.2 Confirmar que **Iniciar treino** ainda arquiva `currentSession.sets` em `state.suggestions` quando a sessão tem dados

## 2. Interface

- [x] 2.1 Em `renderSetRow` (`js/ui.js`), montar labels com referência de `state.suggestions` (ex. `Peso (kg) 33`, `Reps 9`) quando existir valor arquivado
- [x] 2.2 Garantir que inputs usem apenas valores da sessão atual (`setData`), ficando vazios após novo treino
- [x] 2.3 Substituir `isSetSuggested` por lógica que destaca linha quando há referência arquivada na série; remover remoção manual de `is-suggested` em `onSetInput` se redundante

## 3. Estilo e verificação

- [x] 3.1 Adicionar estilo em `css/styles.css` para o trecho numérico no label (ex. `.label-ref`) para diferenciar referência de entrada
- [x] 3.2 Testar manualmente: primeiro treino (sem referência), segundo treino (labels com valores, inputs vazios), digitar e recarregar página (persistência só da entrada nova)
