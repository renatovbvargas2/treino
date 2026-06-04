## Context

O app usa três faixas no topo: `app-header` (sticky, `top: 0`), `series-tabs` (fluxo normal, rola com a página) e `progress-nav` (sticky com `top: 4.5rem` fixo). Ao trocar série ou focar um input, `TreinoUI.scrollToExercise` chama `scrollIntoView({ block: 'start' })`, alinhando o card ao topo da viewport — mas a barra de progresso (e, após fixar as abas, todo o chrome) cobre a primeira linha de séries.

Não há build step; a correção é só CSS com possível ajuste mínimo em JS.

## Goals / Non-Goals

**Goals:**

- Série A / Série B permanecem visíveis ao rolar a lista de exercícios.
- Barra Anterior / rótulo / Próximo permanece visível e alinhada abaixo das abas.
- Primeiro exercício ativo e sua Série 1 ficam totalmente visíveis após scroll automático ou foco.

**Non-Goals:**

- Redesenho visual das abas ou do header.
- Alterar lógica de persistência, programa de exercícios ou sessão.
- Suporte a navegadores sem `position: sticky` ou `scroll-padding`.

## Decisions

### 1. Chrome fixo com `position: sticky` em cascata

**Escolha:** Manter `sticky` no header, abas e `progress-nav`, com `top` calculado em camadas (header → tabs → progress) em vez de um único `position: fixed` + JS para medir altura.

**Rationale:** Já usado no header; evita reflow por `ResizeObserver` e funciona em mobile Safari com `z-index` e fundo sólido (`background: var(--surface)`).

**Alternativa descartada:** `fixed` + `padding-top` via variável CSS setada em JS — mais preciso em teoria, mas desnecessário para três blocos de altura estável.

### 2. Offset de scroll via `scroll-padding-top` no `html`

**Escolha:** Definir `scroll-padding-top` (e opcionalmente `scroll-margin-top` nos `.exercise-card`) igual à soma aproximada das alturas do chrome fixo (~9–10rem, refinável em CSS).

**Rationale:** `scrollIntoView` e foco respeitam `scroll-padding` nativamente; não exige trocar `block: 'start'` por cálculo manual em `ui.js`.

**Alternativa descartada:** Só mudar `scrollIntoView` para `block: 'center'` — melhora parcialmente mas não garante alinhamento consistente com barras de altura variável (wrap do header).

### 3. Empilhamento `z-index`

**Escolha:** header `z-index: 10`, series-tabs `9`, progress-nav `8` (ou tabs e progress ambos `9` com ordem DOM).

**Rationale:** Evita sombra/borda da lista passando por cima do chrome ao rolar.

## Risks / Trade-offs

- **[Altura do header em wrap]** → Usar `top` em `rem` conservador ou agrupar header + tabs em um wrapper sticky único se testes em telas estreitas falharem.
- **[Safe area iOS]** → Manter `env(safe-area-inset-top)` no padding do header se notch cobrir abas (verificar em dispositivo real).
- **[Valor fixo de scroll-padding]** → Se alturas mudarem no CSS futuro, atualizar o mesmo token/rem no `scroll-padding-top`.

## Migration Plan

Deploy como qualquer alteração estática: substituir `css/styles.css` (e eventual `index.html`/`ui.js`) no S3. Sem migração de dados. Rollback = reverter o commit.

## Open Questions

_(nenhuma — escopo fechado no layout)_
