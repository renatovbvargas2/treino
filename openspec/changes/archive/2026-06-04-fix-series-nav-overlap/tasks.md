## 1. CSS — chrome fixo

- [x] 1.1 Tornar `.series-tabs` sticky com `top` abaixo do header, fundo sólido e `z-index` adequado
- [x] 1.2 Ajustar `.progress-nav` `top` para empilhar abaixo de header + abas (não usar `4.5rem` fixo isolado)
- [x] 1.3 Definir `scroll-padding-top` em `html` (e opcionalmente `scroll-margin-top` em `.exercise-card`) para compensar a altura total do chrome

## 2. Verificação manual

- [x] 2.1 Trocar Série A/B e confirmar que Série 1 do exercício 1 fica visível
- [x] 2.2 Rolar a lista e confirmar que abas e barra de progresso não rolam
- [x] 2.3 Focar input no primeiro exercício e confirmar que não fica atrás das barras
- [x] 2.4 Testar em viewport estreita (~320px) com header em wrap

## 3. JavaScript (somente se necessário)

- [x] 3.1 Se `scroll-padding` não resolver todos os casos, ajustar `scrollToExercise` em `js/ui.js` (ex.: `scroll-margin` via classe ou offset) sem alterar lógica de negócio — não necessário; CSS cobre os casos testados
