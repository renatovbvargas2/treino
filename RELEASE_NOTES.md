# Release Notes

## v1.2.0 — 2026-08-23

### Adicionado

- **Voador frente** adicionado à Série B (Domingo) como segundo exercício, resultando em 11 exercícios no treino de domingo

### Issue

Feature da [#10](https://github.com/renatovbvargas2/treino/issues/10): adicionar Voador frente ao treino de Domingo.

## v1.1.1 — 2026-06-21

### Corrigido

- Abas **Sábado** e **Domingo** permanecem habilitadas após **Terminar treino**, permitindo consultar o treino concluído de cada dia em modo somente leitura
- Referências do treino anterior nos labels preservadas ao **Iniciar treino** mesmo após alternar abas na fase encerrada

### Issue

Correção da [#8](https://github.com/renatovbvargas2/treino/issues/8): abas de fim de semana desabilitadas ao finalizar treino.

## v1.1.0 — 2026-06-07

### Adicionado

- Botão **Terminar treino** com confirmação: congela a sessão mantendo valores visíveis
- Fluxo em duas etapas: **Terminar treino** → **Iniciar treino** (Iniciar só após terminar)
- Fase de sessão persistida (`active` / `terminated`) no `localStorage`
- Bloqueio de orientação em retrato (meta tag, `manifest.json` e tentativa de `screen.orientation.lock`)
- Abas renomeadas para **Sábado** e **Domingo** (identificadores internos A/B inalterados)

### Alterado

- **Iniciar treino** não pede mais confirmação de finalização (confirmação movida para Terminar)
- Rótulo de progresso exibe Sábado/Domingo em vez de Série A/B
- Controles desabilitados na fase encerrada (inputs, abas, navegação)

### Corrigido

- Rejeição assíncrona de `screen.orientation.lock` tratada silenciosamente (evita unhandled promise rejection no console)

### Issue

Correções da [#5](https://github.com/renatovbvargas2/treino/issues/5): botão girar no celular, fluxo de término de treino e rótulos por dia da semana.

## v1.0.0 — 2026-06-04

### Adicionado

- App estático de treino de academia (HTML, CSS, JavaScript)
- Rotinas fixas **Série A** e **Série B** (10 exercícios cada)
- Registro de peso e repetições em 3 séries por exercício
- Persistência em `localStorage` (chave `treino-app-v1`)
- Lembrança da série ativa, exercício em foco e valores da sessão
- Botão **Iniciar treino** com arquivamento da sessão anterior e sugestão de valores
- Interface responsiva para celular
- `README.md` com instruções de uso e deploy no S3

### Deploy

Arquivos estáticos prontos para upload em bucket S3 (sem build).
