## Context

Aplicação greenfield: página estática para treino de academia, usada principalmente no celular, publicada em bucket S3. Sem backend; todo estado no `localStorage`. Rotinas A e B com exercícios fixos definidos pelo usuário. Cada exercício tem 3 séries com peso e repetições.

## Goals / Non-Goals

**Goals:**

- SPA leve em HTML/CSS/JS vanilla (sem bundler obrigatório) para deploy simples no S3.
- UX mobile-first: inputs grandes, toque fácil, layout responsivo.
- Modelo de dados versionado em JSON no `localStorage` para rotina ativa, progresso da sessão e histórico para sugestões.
- Botão "Iniciar treino" que salva snapshot da sessão anterior e reinicia UI com valores sugeridos.
- README e release notes na raiz do repositório.

**Non-Goals:**

- Contas de usuário, sincronização em nuvem ou PWA offline avançado (opcional futuro).
- Edição da lista de exercícios pelo usuário.
- Backend, API ou banco de dados.
- Frameworks pesados (React, etc.) na v1.

## Decisions

### 1. Estrutura de arquivos

```
index.html          # shell e meta viewport
css/styles.css      # layout responsivo, tema claro
js/
  app.js            # bootstrap, roteamento simples por "view"
  program.js        # definição Series A/B (arrays constantes)
  storage.js        # get/set, migração de schema v1
  session.js        # iniciar treino, arquivar, sugestões
  ui.js             # render exercícios, inputs, eventos
```

**Rationale:** Separação clara; upload direto ao S3 sem build step.

**Alternativa considerada:** Single-file HTML — rejeitada por manutenção difícil com 10 exercícios por série × 3 séries.

### 2. Modelo de dados (`localStorage` key: `treino-app-v1`)

```json
{
  "activeSeries": "A" | "B",
  "currentSession": {
    "startedAt": "ISO-8601",
    "series": "A" | "B",
    "exerciseIndex": 0,
    "sets": { "<exerciseId>": [{ "weight": null, "reps": null }, ...] }
  },
  "lastCompletedSession": { /* mesmo shape + completedAt */ },
  "suggestions": { "<exerciseId>": [{ "weight", "reps" }, ...] }
}
```

- `exerciseId`: slug estável (`supino-reto`, etc.) derivado do nome.
- Ao **Iniciar treino**: copiar `currentSession` → `lastCompletedSession` (se houver dados), limpar `currentSession`, preencher `suggestions` a partir da sessão arquivada, resetar índices.
- Auto-save em `input`/`change` debounced (~300ms).

**Rationale:** Um único objeto facilita backup manual e evolução de schema.

### 3. Navegação e lembrança de progresso

- Abas ou toggle **Série A** / **Série B**; troca persiste `activeSeries`.
- Lista vertical de exercícios; destaque no `exerciseIndex` salvo.
- Opcional: botões "anterior/próximo exercício" para reduzir scroll no celular.

**Rationale:** Atende "lembrar última série" e posição no treino.

### 4. UI e responsividade

- CSS: `flex`/`grid`, `rem` + `clamp()` para tipografia, `min-height: 44px` em controles (acessibilidade toque).
- Inputs `type="number"` com `inputmode="decimal"` (peso) e `numeric` (reps).
- Meta viewport e teste em larguras 320px–768px+.

### 5. Deploy S3

- Arquivos estáticos na raiz ou prefixo `app/`; `Content-Type` correto; opcional `index.html` como default root object.
- Cache: CSS/JS com hash opcional em versões futuras; v1 sem hash.

### 6. Documentação

- `README.md`: descrição, rotinas, localStorage, deploy S3, uso no celular.
- `RELEASE_NOTES.md` (ou `CHANGELOG.md`): entrada inicial v1.0.0 com escopo da primeira release.

## Risks / Trade-offs

| Risco | Mitigação |
|-------|-----------|
| Limite de quota do `localStorage` (~5MB) | Payload pequeno; apenas última sessão completa + sessão atual |
| Perda de dados ao limpar cache do navegador | Documentar no README; export manual futuro (non-goal v1) |
| Dados presos em um dispositivo | Aceito por design; sem sync |
| Typo em nomes de exercícios fixos | Constantes centralizadas em `program.js` |

## Migration Plan

1. Implementar arquivos estáticos localmente; validar no celular via servidor estático ou abrir arquivo.
2. Upload para bucket S3; habilitar website hosting ou CloudFront.
3. Tag `v1.0.0` no GitHub com release notes.

**Rollback:** Reverter upload S3 para versão anterior dos arquivos; dados permanecem no dispositivo.

## Open Questions

- Nenhum bloqueador crítico. Opcional pós-v1: tema escuro, export JSON do histórico.
