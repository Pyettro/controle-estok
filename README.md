# Controle de Estoque Grupo06 — Iteração 2

Aplicação web desenvolvida em React + Vite para apoiar o Grupo06 na gestão de estoque com autenticação simulada, dashboards, cadastro de produtos, movimentações e relatórios. Esta versão corresponde à Iteração 2 e está pronta para execução local ou publicação em qualquer provedor de hospedagem de SPAs.

## Tecnologias principais

- React 18 com TypeScript
- Vite 5
- Tailwind CSS + shadcn/ui
- React Router DOM
- TanStack Query

## Pré-requisitos

- **Node.js** 18 LTS ou superior (recomendo instalar via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- **npm** 10 ou superior (já acompanha a instalação do Node)
- Git para clonar o repositório

Verifique as versões:

```sh
node -v
npm -v
```

## Como executar no computador pessoal

1. Clone o repositório:
   ```sh
   git clone https://github.com/Pyettro/controle-estok.git
   cd controle-estok/controle-estok
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```
4. Abra o endereço informado pelo Vite (por padrão http://localhost:5173) no navegador.

> Não há variáveis de ambiente obrigatórias nesta iteração. Toda a camada de dados usa mocks locais.

## Scripts disponíveis

- `npm run dev` — sobe o ambiente de desenvolvimento com hot-reload.
- `npm run build` — gera a build de produção dentro de `dist`.
- `npm run preview` — executa localmente a build já gerada para validação.
- `npm run lint` — roda o ESLint nos arquivos TypeScript/TSX.

## Estrutura relevante

- `src/pages` — telas da aplicação (Login, Dashboard, Produtos, Movimentações, Relatórios e 404).
- `src/components` — componentes reutilizáveis e wrappers do shadcn/ui.
- `src/lib` e `src/hooks` — utilitários, toasts e integrações.

## Como publicar em produção

1. Gere a build otimizada: `npm run build`.
2. Faça o deploy do conteúdo da pasta `dist` em um provedor como Vercel, Netlify, Render ou GitHub Pages.
3. Caso utilize domínio próprio, aponte seus registros DNS para o provedor escolhido.

Com esses passos, qualquer desenvolvedor consegue reproduzir e evoluir a Iteração 2 do Controle de Estoque Grupo06.
