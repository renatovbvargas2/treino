## 1. Abas habilitadas na fase encerrada

- [x] 1.1 Em `js/ui.js`, remover desabilitação de `.series-tab` em `applySessionPhase` quando `sessionPhase === 'terminated'`
- [x] 1.2 Em `js/app.js`, remover o `return` antecipado no handler de clique das abas quando a sessão está encerrada

## 2. Verificação manual

- [x] 2.1 Terminar treino com dados em Sábado e alternar para Domingo — valores exibidos, inputs desabilitados
- [x] 2.2 Confirmar que Anterior/Próximo, Terminar e inputs permanecem desabilitados após terminar
- [x] 2.3 Recarregar página na fase `terminated` e verificar que abas continuam habilitadas

## 3. Documentação

- [x] 3.1 Adicionar entrada em `RELEASE_NOTES.md` referenciando a correção da issue #8
