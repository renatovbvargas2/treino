## 1. Estrutura e shell estático

- [x] 1.1 Criar `index.html` com meta viewport, estrutura principal e links para CSS/JS
- [x] 1.2 Criar `css/styles.css` com layout mobile-first, tipografia e áreas para série A/B e lista de exercícios
- [x] 1.3 Criar módulos JS vazios (`app.js`, `program.js`, `storage.js`, `session.js`, `ui.js`) e carregar em ordem no HTML

## 2. Programa de treino (workout-program)

- [x] 2.1 Definir em `program.js` arrays da Série A e Série B com nomes e slugs estáveis
- [x] 2.2 Implementar toggle ou abas Série A / Série B com persistência da série ativa
- [x] 2.3 Renderizar lista de exercícios da série selecionada em `ui.js`

## 3. Registro de séries (set-logging)

- [x] 3.1 Para cada exercício, renderizar 3 blocos de série com inputs de peso e repetições
- [x] 3.2 Configurar `type`, `inputmode` e estilos de toque (min-height ~44px) nos inputs
- [x] 3.3 Associar valores digitados ao modelo da sessão atual por `exerciseId` e índice de série

## 4. Persistência (local-persistence)

- [x] 4.1 Implementar `storage.js` com chave `treino-app-v1`, leitura/escrita e objeto padrão
- [x] 4.2 Salvar automaticamente (debounce) ao alterar peso ou repetições
- [x] 4.3 Restaurar série ativa, valores da sessão e índice do exercício ao carregar a página
- [x] 4.4 Destacar ou rolar até o exercício salvo no progresso

## 5. Sessão de treino (workout-session)

- [x] 5.1 Adicionar botão **Iniciar treino** na UI principal
- [x] 5.2 Em `session.js`, ao iniciar: arquivar sessão atual em `lastCompletedSession` e popular `suggestions`
- [x] 5.3 Limpar/renovar `currentSession` e pré-preencher campos com valores sugeridos do treino anterior
- [x] 5.4 Garantir que edições durante a sessão atualizam storage sem exigir novo início

## 6. Integração e bootstrap (app.js)

- [x] 6.1 Inicializar app: carregar storage, montar UI, registrar eventos de série, inputs e iniciar treino
- [x] 6.2 Testar fluxo completo no navegador desktop e viewport mobile (DevTools)

## 7. Documentação (project-docs)

- [x] 7.1 Escrever `README.md` com características, rotinas, localStorage, deploy S3 e teste local
- [x] 7.2 Criar `RELEASE_NOTES.md` (ou `CHANGELOG.md`) com entrada **v1.0.0** descrevendo release inicial

## 8. Validação final

- [x] 8.1 Verificar todas as specs em `specs/**/spec.md` contra comportamento implementado
- [x] 8.2 Confirmar que apenas arquivos estáticos são necessários para upload ao bucket S3
