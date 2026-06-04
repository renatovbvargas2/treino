## Why

Ao trocar de série (Série A/B) ou focar o primeiro exercício, o conteúdo rola até o topo da viewport mas fica parcialmente escondido atrás da barra de navegação (Anterior / progresso / Próximo). Isso impede ver e editar a primeira série do exercício ativo — um bug de UX visível no uso diário no celular.

## What Changes

- Fixar no topo da tela as abas **Série A** e **Série B** (não rolam com a lista de exercícios).
- Ajustar o empilhamento do cabeçalho fixo (header + abas + barra de progresso) para que nenhum bloco sobreponha o conteúdo rolável.
- Reservar espaço de scroll (`scroll-padding` ou equivalente) para que `scrollIntoView` e o foco no primeiro exercício posicionem o card **abaixo** das barras fixas, não por baixo delas.

## Capabilities

### New Capabilities

_(nenhuma)_

### Modified Capabilities

- `static-app-shell`: exigir barras de navegação (Série A/B e progresso do exercício) fixas no topo e conteúdo rolável sem sobreposição ao rolar ou focar exercícios.

## Impact

- `css/styles.css` — posicionamento sticky/fixed, alturas e `scroll-padding-top` no `html`/`body` ou `.exercise-list`.
- `index.html` — possível agrupamento semântico do chrome fixo (opcional).
- `js/ui.js` — possível ajuste de `scrollIntoView` se CSS sozinho não cobrir todos os casos.
