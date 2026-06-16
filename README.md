# LinguaNEX

Protótipo funcional de plataforma gamificada para estudo de idiomas com estética cyberpunk/neon, inspirado na atmosfera da referência visual fornecida.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Framer Motion

## O que já está implementado

- Dashboard principal com XP, nível, streak, moedas, gems e idioma ativo
- Seleção de idioma entre Japonês e Chinês
- Estrutura modular pronta para expansão futura
- Trilha de aprendizado com desbloqueio progressivo
- Tela de lição funcional com:
  - quiz de tradução
  - escuta com Web Speech API
  - memória
  - desenho em canvas
  - desafio rápido com tempo
- Tela de resultado
- Tela de perfil
- Tela de recompensas e badges
- Persistência local com `localStorage`
- Uso totalmente local no navegador do seu MacBook, sem backend

## Como executar

```bash
npm install
npm run dev
```

Abra no navegador:

`npm run dev` abre o Vite em `http://127.0.0.1:5173/` por padrao.

Observações:

- o app roda 100% localmente no navegador do seu Mac
- progresso, XP, moedas e desbloqueios ficam salvos apenas no `localStorage`
- esta versão já inicia com perfil zerado, como primeiro acesso

## Build de produção

```bash
npm run build
```

Para visualizar a build localmente:

```bash
npm run preview
```

O preview do Vite usa `http://127.0.0.1:4173/` por padrão.

## Deploy no GitHub Pages

O repositório já está preparado para publicar no GitHub Pages via GitHub Actions.

Depois do push:

1. abra `Settings > Pages`
2. em `Build and deployment`, selecione `GitHub Actions`
3. aguarde o workflow `Deploy GitHub Pages` concluir

URL esperada deste projeto:

`https://deimona7x.github.io/LinguaNEX/`

## Estrutura principal

- `src/data/languages.ts`: idiomas, unidades, lições e exercícios
- `src/context/AppStateContext.tsx`: progresso, XP, desbloqueios e navegação
- `src/screens/`: telas principais
- `src/components/`: componentes reutilizáveis

## Próximos passos naturais

- adicionar login/backend
- salvar desenho por tentativa
- ranking e missões reais por calendário
- novos idiomas como Inglês, Espanhol e Coreano
