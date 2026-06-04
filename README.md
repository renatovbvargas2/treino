# Treino Academia

Aplicação estática (HTML, CSS e JavaScript) para registrar treinos de academia no celular. Os dados ficam no **localStorage** do navegador — sem servidor nem conta.

## Características

- **Série A** e **Série B** com 10 exercícios cada (listas fixas)
- **3 séries** por exercício, com campos de **peso (kg)** e **repetições**
- Persistência automática no navegador
- Lembra a última série (A/B), o exercício em foco e os valores digitados
- Botão **Iniciar treino**: arquiva o treino anterior e sugere os mesmos pesos/reps na próxima sessão
- Layout **responsivo**, pensado para uso no celular

## Rotinas

### Série A

Supino reto, Voador frente, Voador costas, Remada, Barra Graviton, Paralela Graviton, Elevação de ombro máquina, Bíceps Scott, Extensora, Panturrilha.

### Série B

Supino reto, Voador costas, Remada, Barra Graviton, Paralela Graviton, Elevação de ombro máquina, Bíceps Scott, Flexora, Abdutora, Adutora.

## Estrutura do projeto

```
index.html
css/styles.css
js/
  program.js   # exercícios e séries
  storage.js   # localStorage (chave treino-app-v1)
  session.js   # iniciar treino / sugestões
  ui.js        # interface
  app.js       # inicialização
```

## Testar localmente

Com Python 3:

```bash
python -m http.server 8080
```

Abra `http://localhost:8080` no navegador ou no celular (mesma rede).

Também é possível usar qualquer servidor estático (`npx serve`, Live Server no VS Code, etc.).

## Deploy no Amazon S3

1. Crie um bucket e habilite **Static website hosting** (ou use CloudFront).
2. Envie todos os arquivos (`index.html`, `css/`, `js/`) mantendo a estrutura de pastas.
3. Defina `index.html` como documento padrão.
4. Configure `Content-Type` corretos (`text/html`, `text/css`, `application/javascript`).
5. Acesse a URL do site no celular e adicione à tela inicial, se quiser.

**Importante:** os dados do treino ficam só no dispositivo. Limpar cache/dados do navegador apaga o histórico.

## localStorage

Chave: `treino-app-v1`

Armazena série ativa, sessão atual, última sessão concluída e sugestões para o próximo treino.

## Licença

Uso pessoal do autor do repositório.
