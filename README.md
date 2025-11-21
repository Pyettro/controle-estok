# Controle de Estoque — Iteração 2

Aplicação web em React + Vite para gestão de estoque com autenticação simulada, cadastro de produtos, movimentações, relatórios e dashboards. Usa shadcn-ui e React Query.

## Acesso rápido
- **Aplicação (GitHub Pages)**: https://pyettro.github.io/controle-estok/
- **Demonstração em vídeo**: https://youtu.be/CoKFgtrEoWI

## Autores
- Aline Pelegrino Soglia
- Barbara Miranda Nalon
- Gusthavo Ramos de Paula
- Pyettro Ziroldo
- Talita Ozaki Bearzotti

## Tecnologias principais
- React 18 + TypeScript
- Vite 5 (build ajustado para GitHub Pages em `docs/`)
- Tailwind CSS + shadcn/ui
- React Router (HashRouter)
- TanStack Query

## Pré-requisitos
- **Node.js** 18 LTS ou superior (recomendado via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- **npm** 10 ou superior (acompanha o Node)
- Git para clonar o repositório

Verifique as versões:
```sh
node -v
npm -v
```

## Como rodar localmente

1. Clone o repositório:
   ```sh
   git clone https://github.com/Pyettro/controle-estok.git
   cd controle-estok
   ```
2. Instale as dependências:
   ```sh
   npm ci
   ```
3. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```
4. Abra o endereço informado pelo Vite (por padrão http://localhost:5173) no navegador.

> Não há variáveis de ambiente obrigatórias nesta iteração. A camada de dados usa mocks locais; se desejar apontar para uma API, defina `VITE_API_URL` em `.env`.

## Scripts disponíveis

- `npm run dev` — sobe o ambiente de desenvolvimento com hot-reload.
- `npm run build` — gera a build de produção dentro de `docs/` (pronta para GitHub Pages).
- `npm run preview` — executa localmente a build já gerada para validação.
- `npm run lint` — roda o ESLint nos arquivos TypeScript/TSX.

## Estrutura relevante

- `src/pages` — telas da aplicação (Login, Dashboard, Produtos, Movimentações, Relatórios e 404).
- `src/components` — componentes reutilizáveis e wrappers do shadcn/ui.
- `src/lib` e `src/hooks` — utilitários, toasts e integrações.

## Como publicar em produção

### GitHub Pages (configuração atual)
- URL pública: https://pyettro.github.io/controle-estok/
- Branch: `main`
- Pasta publicada: `docs/` (gerada por `npm run build`)
- Workflow: `.github/workflows/pages.yml` (Actions → Deploy static site to GitHub Pages)

### Outros provedores
1. Gere a build otimizada: `npm run build`.
2. Publique o conteúdo da pasta `docs/` em Vercel, Netlify, Render ou outro host de SPA.
3. Para domínio próprio, aponte os registros DNS conforme o provedor.
