---
id: cross-selling
title: Cross Selling
sidebar_label: Cross Selling
---
## Modelo de Aplicativo React

Modelo de Aplicativo React para o VTEX IO.

[![Version](https://img.shields.io/badge/version-0.0.0-blue)](https://github.com/ACCT-global/template.react-app/releases) [![VTEX IO](https://img.shields.io/badge/VTEX%20IO-f71963.svg?logo=vtex&logoColor=white)](https://developers.vtex.com/vtex-developer-docs/docs/welcome) [![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://pt-br.reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![ESLint](https://img.shields.io/badge/ESLint-4B3263?logo=eslint&logoColor=white)](https://eslint.org/) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-ff69b4.svg?logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org/en/v1.0.0/) [![Prettier](https://img.shields.io/badge/Prettier-c596c7?logo=prettier&logoColor=white)](https://prettier.io/) [![Jest](https://img.shields.io/badge/-Jest%2FVTEX%20Test%20Tools-%23C21325?logo=jest&logoColor=white)](https://github.com/vtex/test-tools) [![Node](https://img.shields.io/node/v/husky)](https://nodejs.org/en/)

## Começando

Instale todas as dependências com:

```bash
yarn install && cd react && yarn install
```

## Testes Unitários

Você pode criar testes com o [VTEX Test Tools](https://github.com/vtex/test-tools) e executar com:

- `yarn test`: Executar testes unitários.
- `yarn test:coverage`: Executar testes unitários e gerar informações de cobertura de teste e exibi-las no console. Veja [Jest --coverage](https://jestjs.io/docs/cli#--coverageboolean).
- `yarn test:watch`: Observar arquivos de teste para alterações e executar novamente os testes relacionados aos arquivos alterados. Veja [Jest --watch](https://jestjs.io/docs/cli#--watch).

## Git Commit

### Commits Convencionais / Conventional Commits

Este repositório utiliza [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) para uma melhor padronização dos commits.

A mensagem do commit deve seguir a seguinte estrutura:

```text
<type>[escopo opcional]: <description>

[corpo opcional]

[footer(s) opcional(is)]
```

Exemplos:

```text
feat: adicionar calculadora de frete
chore(release): 1.0.0
```

Os tipos comuns de acordo com a [convenção Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines) podem ser:

- **build**: Mudanças que afetam o sistema de compilação ou dependências externas (exemplos de escopo: gulp, broccoli, npm).
- **chore**: Outras mudanças que não modificam arquivos de origem ou de teste.
- **ci**: Mudanças em nossos arquivos e scripts de configuração de CI (exemplos de escopo: Travis, Circle, BrowserStack, SauceLabs).
- **docs**: Mudanças apenas na documentação.
- **feat**: Uma nova funcionalidade.
- **fix**: Uma correção de bug.
- **perf**: Uma mudança de código que melhora o desempenho.
- **refactor**: Uma mudança de código que não corrige um bug nem adiciona uma funcionalidade.
- **revert**: Reverte um commit anterior.
- **style**: Mudanças que não afetam o significado do código (espaços em branco, formatação, ponto e vírgula ausente, etc).
- **test**: Adição de testes ausentes ou correção de testes existentes.

### Commitizen

Você pode usar a interface de linha de comando [Commitizen](https://commitizen-tools.github.io/commitizen) para criar Conventional Commits:

```bash
yarn commit
```

![image](https://user-images.githubusercontent.com/101892002/209986018-000ba5ac-5ed6-4fe1-8974-408492a1642a.png)

## Scripts

- `yarn commit`: Uma interface de linha de comando que utiliza o Commitizen para automatizar commits. Veja [Commitlint](https://github.com/commitizen/cz-cli)
- `yarn format`: Formata arquivos TypeScript e JSON usando o [Prettier](https://prettier.io/).
- `yarn lint`: Executa lint em arquivos TypeScript com o [Eslint](https://eslint.org/).
- `yarn lint:fix`: Executa lint em arquivos TypeScript e corrige automaticamente, quando possível.
- `yarn test`: Executa testes unitários usando [VTEX Test Tools](https://github.com/vtex/test-tools).
- `yarn test:coverage`: Executa testes unitários e gera informações de cobertura de teste e exibi-las no console. Veja [Jest --coverage](https://jestjs.io/docs/cli#--coverageboolean)
- `yarn test:watch`: Observa arquivos de teste para alterações e executa novamente os testes relacionados aos arquivos alterados. Veja [Jest --watch](https://jestjs.io/docs/cli#--watch)

## Repositório

[OBA - Cross Selling](https://github.com/ObaHortifrutiDeveloper/oba.cross-selling-shelf)
