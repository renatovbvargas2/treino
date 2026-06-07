## Context

O app é estático (HTML/CSS/JS) usado no celular durante o treino. Hoje existe apenas o botão **Iniciar treino**, que pede confirmação de finalização e imediatamente arquiva e limpa a sessão — misturando “terminar” e “iniciar novo” em um único passo. As abas usam **Série A/B**, embora o usuário associe cada rotina a um dia da semana. No mobile, ao interagir com o último exercício, o navegador às vezes exibe um controle de **girar** (rotação de tela), atrapalhando o uso.

Estado atual relevante:
- `js/app.js` — um handler em `#btn-start-workout` com `confirm()` e chamada a `startWorkout`.
- `js/ui.js` — renderiza inputs sempre editáveis; rótulo de progresso usa `Série ${series}`.
- `index.html` — abas com texto "Série A" / "Série B"; sem controle de orientação.

## Goals / Non-Goals

**Goals:**

- Fluxo explícito: **Terminar treino** (congelar + confirmar) → **Iniciar treino** (arquivar + limpar + reabilitar).
- Persistir a fase da sessão no `localStorage` para sobreviver a recarregar a página.
- Rótulos **Sábado** / **Domingo** na UI mantendo `data-series="A"` / `"B"` e chaves internas.
- Reduzir aparição do botão girar via lock de orientação em retrato e medidas complementares.

**Non-Goals:**

- Alterar listas de exercícios ou lógica de sugestões/arquivamento já existente.
- Criar PWA completa (service worker, ícones) — apenas o mínimo para orientação se necessário.
- Suporte garantido de lock de orientação em todos os navegadores (Safari iOS tem limitações).

## Decisions

### 1. Máquina de estados da sessão: `active` | `terminated`

**Decisão:** Adicionar `sessionPhase` ao estado persistido (`treino-app-v1`), com valores `active` (padrão) e `terminated`.

**Rationale:** Permite desabilitar inputs após Terminar, manter valores visíveis, e só permitir Iniciar quando a sessão foi encerrada. Recarregar a página restaura o mesmo comportamento.

**Alternativa considerada:** Flag booleana `workoutFrozen` — equivalente, mas `sessionPhase` deixa espaço para evoluções futuras.

**Comportamento:**
| Fase | Inputs | Abas / nav | Terminar | Iniciar |
|------|--------|------------|----------|---------|
| `active` | habilitados | habilitados | habilitado | desabilitado |
| `terminated` | desabilitados (valores visíveis) | desabilitados | desabilitado | habilitado |

Ao abrir o app com sessão em andamento sem fase salva → `active`. Após **Iniciar treino** → volta a `active` com campos vazios.

### 2. Separar `terminateWorkout` de `startWorkout`

**Decisão:** Nova função `terminateWorkout(state)` em `session.js` que apenas define `sessionPhase = 'terminated'` sem alterar `currentSession.sets`. `startWorkout` continua arquivando e criando sessão vazia, mas só é invocado pelo botão Iniciar quando `sessionPhase === 'terminated'`.

**Rationale:** Terminar não deve limpar nem arquivar — só congela a UI. Iniciar reutiliza a lógica de arquivamento existente.

**Confirmação:** `confirm('Deseja realmente terminar o treino?')` apenas em Terminar. Iniciar não repete confirmação de finalização.

### 3. Desabilitar controles na UI

**Decisão:** `TreinoUI.setSessionPhase(phase)` aplica `disabled` em inputs, abas de série, Anterior/Próximo e botão Terminar/Iniciar conforme a tabela acima. Re-render após mudança de fase.

**Alternativa:** Overlay semântico — rejeitada por complexidade; `disabled` nativo é acessível e simples.

### 4. Rótulos Sábado/Domingo só na apresentação

**Decisão:** Mapa `{ A: 'Sábado', B: 'Domingo' }` em `ui.js` (ou constante compartilhada). `data-series`, `activeSeries` e persistência permanecem `A`/`B`.

**Rationale:** Evita migração de dados no `localStorage`.

### 5. Bloqueio de orientação em retrato

**Decisão:** Abordagem em camadas:
1. Meta tag `<meta name="screen-orientation" content="portrait">` no `index.html`.
2. Em `app.js`, na inicialização, tentar `screen.orientation?.lock?.('portrait')` dentro de `try/catch` (ignorar falha silenciosamente).
3. CSS `@media (orientation: landscape)` com aviso discreto opcional — **não** bloquear uso, apenas reforçar layout retrato-first.

**Alternativa:** `web app manifest` com `"orientation": "portrait"` — útil se o usuário adicionar à tela inicial; incluir `manifest.json` mínimo referenciado no HTML.

**Limitação aceita:** Safari iOS pode não honrar lock sem PWA instalada; meta + CSS reduzem mas não eliminam 100% o botão girar em todos os dispositivos.

## Risks / Trade-offs

- **[Lock de orientação não suportado]** → Mitigação: falha silenciosa; app continua usável em retrato; documentar limitação.
- **[Usuário recarrega em `terminated` e não vê como continuar]** → Mitigação: botão Iniciar visível e habilitado com rótulo claro.
- **[Usuário quer editar após Terminar sem Iniciar]** → Mitigação: fora do escopo; fluxo exige Iniciar para nova sessão; Terminar é irreversível sem recarregar dados manualmente (aceito pelo requisito).
- **[Renomear abas confunde quem busca "Série A" na doc antiga]** → Mitigação: atualizar README e release notes.

## Migration Plan

1. Implementar `sessionPhase` com default `active` em `loadState` / `ensureCurrentSession` para estados antigos sem o campo.
2. Deploy estático no S3 — sem migração de bucket; usuários existentes ganham fase `active` automaticamente.
3. Rollback: reverter arquivos estáticos; campo `sessionPhase` extra é ignorado por versão anterior.

## Open Questions

_(nenhuma — requisitos da issue e comentário do autor são suficientes.)_
