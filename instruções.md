# Instruções para agentes e colaboradores

Este documento registra duas convenções do CampusGuia que todo agente deve
respeitar ao criar ou editar páginas: o sistema de larguras e o JavaScript
compartilhado. Elas existem desde a revisão estrutural de junho de 2026 e
valem para as 50 páginas do site.

## Larguras (tamanhos de container)

O site usa duas larguras, em todas as seções:

| Elemento | Largura | Onde está definida |
|---|---|---|
| Topbar e menu mobile | **1180px** | `style.css` (`.topbar .wrap`), `intercambio.css` (`--maxw`), `index.html` (`:root` inline) |
| Conteúdo (seções, rodapé, texto) | **960px** | `style.css` (`.container`), `intercambio.css` (`--maxw-content`) |

Regras ao mexer em CSS ou criar páginas:

1. A barra superior é sempre 1180px e o conteúdo é sempre 960px. Não crie
   um terceiro valor e não mude um sem mudar o outro em todos os arquivos,
   porque larguras divergentes entre seções dão sensação de site costurado
   (foi exatamente o problema corrigido em junho de 2026: a seção de
   intercâmbio usava 960px na topbar enquanto o resto do site usava 1180px).
2. No `intercambio.css`, use as variáveis: `var(--maxw)` apenas para topbar
   e menu, `var(--maxw-content)` para todo o resto. Nunca escreva os pixels
   diretamente.
3. Texto corrido tem limites próprios, mais estreitos que o container:
   `.prose` é 720px e `.lead` é 62ch no `intercambio.css`. Para conteúdo
   longo novo, reaproveite essas classes em vez de criar outras.

## JavaScript compartilhado (`assets/js/site.js`)

Todo o comportamento comum do site vive em um único arquivo,
`assets/js/site.js`, carregado com `defer` por todas as páginas. Ele contém
três coisas, todas com proteção contra elementos ausentes, então é seguro em
qualquer página:

1. **`handleNewsletter(e)`**, função global chamada pelos formulários de
   newsletter via `onsubmit="handleNewsletter(event)"`.
2. **Menu mobile**, o hambúrguer da topbar, com troca de ícone e fechamento
   ao clicar fora.
3. **Gaveta de busca mobile**, o botão de lupa que abre o campo de busca em
   telas pequenas.

Regras:

1. **Nunca copie esses comportamentos para dentro de uma página.** Antes da
   unificação havia quatro variantes do mesmo script espalhadas por 44
   arquivos, e corrigir um bug exigia editar todos. Se precisar mudar o
   comportamento do menu, da busca ou da newsletter, edite somente o
   `site.js` e a mudança vale para o site inteiro.
2. JavaScript específico de uma página fica inline, em um `<script>` no fim
   do `<body>`, contendo apenas a lógica própria. Hoje existem dois casos:
   o filtro de categorias em `editais.html` (`filterEditais`) e o contador
   do mini-checklist em `pos.html`. Siga esse modelo para lógica nova.
3. Toda página deve incluir o arquivo no `<head>`, ajustando o caminho
   conforme a profundidade da pasta:

   ```html
   <!-- páginas na raiz -->
   <script src="assets/js/site.js" defer></script>

   <!-- páginas em subpastas (editais/, intercambio/, tecnicas/) -->
   <script src="../assets/js/site.js" defer></script>
   ```

## Cabeçalho padrão para páginas novas

Ao criar uma página, o fim do `<head>` deve ter sempre estas três linhas,
com o prefixo `../` quando a página estiver em subpasta:

```html
<link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png">
<script src="assets/js/site.js" defer></script>
```

Não use favicon de emoji em data URI (era o padrão antigo e foi removido de
todas as páginas). O ícone oficial é o monograma CG em
`assets/icons/favicon.svg`, com a versão PNG de 180px em
`assets/icons/apple-touch-icon.png`.

## Verificação rápida antes de commitar

Três comandos que devem voltar vazios se as convenções foram respeitadas:

```bash
# nenhuma página com favicon antigo em data URI
grep -rln 'rel="icon" href="data:' --include="*.html" .

# nenhuma cópia inline do JS compartilhado
grep -rln 'hamburger.addEventListener\|function handleNewsletter' --include="*.html" .

# nenhuma página sem o site.js
grep -rLn 'assets/js/site.js' --include="*.html" .
```
