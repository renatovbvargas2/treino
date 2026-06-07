# Treino Academia

Aplicação estática (HTML, CSS e JavaScript) para registrar treinos de academia no celular. Os dados ficam no **localStorage** do navegador — sem servidor nem conta.

## Características

- **Sábado** (Série A) e **Domingo** (Série B) com 10 exercícios cada (listas fixas)
- **3 séries** por exercício, com campos de **peso (kg)** e **repetições**
- Persistência automática no navegador
- Lembra a última série (A/B), o exercício em foco e os valores digitados
- Botão **Terminar treino**: confirma, congela a sessão e mantém os valores visíveis nos campos
- Botão **Iniciar treino**: disponível após terminar — arquiva o treino anterior, limpa os campos e inicia nova sessão
- Orientação preferencial em **retrato** no celular (reduz o botão “girar” do navegador)
- Layout **responsivo**, pensado para uso no celular

## Fluxo de treino

1. Registre peso e repetições durante a sessão (**fase ativa**).
2. Pressione **Terminar treino** e confirme — a interface congela, mas os valores permanecem visíveis.
3. Pressione **Iniciar treino** para arquivar (quando aplicável) e começar uma sessão nova com campos vazios.

## Rotinas

### Sábado (Série A)

Supino reto, Voador frente, Voador costas, Remada, Barra Graviton, Paralela Graviton, Elevação de ombro máquina, Bíceps Scott, Extensora, Panturrilha.

### Domingo (Série B)

Supino reto, Voador costas, Remada, Barra Graviton, Paralela Graviton, Elevação de ombro máquina, Bíceps Scott, Flexora, Abdutora, Adutora.

## Estrutura do projeto

```
index.html
manifest.json
css/styles.css
js/
  program.js   # exercícios e séries
  storage.js   # localStorage (chave treino-app-v1)
  session.js   # terminar / iniciar treino / sugestões
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
2. Envie todos os arquivos (`index.html`, `manifest.json`, `css/`, `js/`) mantendo a estrutura de pastas.
3. Defina `index.html` como documento padrão.
4. Configure `Content-Type` corretos (`text/html`, `text/css`, `application/javascript`, `application/manifest+json`).
5. Acesse a URL do site no celular e adicione à tela inicial, se quiser.

**Importante:** os dados do treino ficam só no dispositivo. Limpar cache/dados do navegador apaga o histórico.

## localStorage

Chave: `treino-app-v1`

Armazena série ativa, fase da sessão (`active` / `terminated`), sessão atual, última sessão concluída e sugestões para o próximo treino.

## Licença

Uso pessoal do autor do repositório.
