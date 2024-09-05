---
id: sku-management
title: Subida em Massa
sidebar_label: Sku Management
---

Este documento fornece uma visão geral do código `SkuManagementUpload`, que é um componente React utilizado para upload em massa de complementos para SKUs.

### Sumário

- [Introdução](#introdução)
- [Visão Geral](#visão-geral)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Uso](#uso)
- [Componentes](#componentes)
- [Hooks Personalizados](#hooks-personalizados)
- [Conclusão](#conclusão)

### 1. Introdução

O componente `SkuManagementUpload` é utilizado para realizar o upload em massa de complementos para SKUs em uma aplicação React. Ele permite que o usuário selecione um arquivo XLS ou XLSX contendo os dados dos complementos, os quais serão enviados para a API de gerenciamento de SKUs.

### 2. Visão Geral

Este componente consiste em uma página que inclui um cabeçalho, uma seção de upload de arquivo, uma seção de progresso de envio, e uma seção de exibição dos resultados do envio. Ele utiliza o `vtex.styleguide` para componentes visuais e a biblioteca `xlsx` para manipulação de arquivos Excel.

### 3. Funcionalidades Principais

- Permite ao usuário selecionar um arquivo XLS ou XLSX contendo os dados dos complementos.
- Divide os dados do arquivo em lotes de até 50 itens e os envia para a API de gerenciamento de SKUs em paralelo, utilizando um sistema de fila para controle do envio.
- Exibe o progresso do envio, mostrando o número de lotes na fila, o número de lotes processados e se o envio está em andamento.

### 4. Uso

Após o processamento dos dados pela API, o componente renderiza os resultados em lotes de até 50 itens. As informações são exibidas em uma tabela, onde cada linha corresponde a um item do lote, contendo as seguintes propriedades:

#### Propriedades

| Propriedade         | Tipo   | Descrição                 
| ------------------- | ------ | ------------------------- 
| SkuId               | String | Identificador do SKU      
| ParentSkuId         | String | Identificador do SKU pai  
| ComplementTypeId    | String | Identificador do Tipo de Complemento 
| Message             | String | Mensagem                  


- **SkuId**: Identificador do SKU.
- **ParentSkuId**: Identificador do SKU pai.
- **ComplementTypeId**: Identificador do Tipo de Complemento.
- **Message**: Mensagem correspondente ao processamento do item.

#### As mensagens de retorno da API podem incluir

Por exemplo:

| SkuId   | ParentSkuId | ComplementTypeId | Message                   |
|---------|-------------|------------------|--------------------------|
| 1  | 1| 3                | Complemento Cadastrado   |
| 2  | 2| 3                | Este sku já possui esse complemento |
| 3  | 3| 3                | Conflito                 |
| 4  | 4| 3                | skuId é obrigatório      |
| 5  | 5| 3                | Complemento Cadastrado   |

#### Frontend

O arquivo `SkuManagementUpload.tsx` é responsável pelo frontend da funcionalidade de upload em massa de complementos para SKUs. Aqui está um resumo do que acontece:

1. O usuário seleciona um arquivo que contém os dados dos complementos para SKUs.
2. O arquivo é dividido em partes, cada uma contendo até 12 itens, para facilitar o processamento.
3. É feita uma chamada para um hook personalizado de fila de processos, que controla o envio dos dados em lotes para a API.

#### Backend

O backend consiste em um endpoint que recebe os dados enviados pelo frontend e os processa, interagindo com a API para realizar as operações necessárias. Aqui está o que acontece no backend:

1. Quando o endpoint `getSkuList` recebe uma requisição POST, ele verifica se o método é permitido. Caso contrário, retorna um erro.
2. Em seguida, os dados do corpo da requisição são recuperados e passados para um cliente chamado `InsertSkuClient`.
3. O `InsertSkuClient` interage com a API, realizando as seguintes operações:
   - Verifica se os complementos já existem para os SKUs fornecidos e, se existirem, remove os complementos antigos.
   - Adiciona os novos complementos para os SKUs.
4. O cliente retorna uma resposta indicando o sucesso ou falha da operação, juntamente com mensagens relevantes.

<br />

```js 
await this.http.post(
  '/api/catalog/pvt/skucomplement',
  {
    "ParentSkuId": 1,
    "SkuId": 2,
    "ComplementTypeId": 2
  },
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
)
```

[Para Criar complemento de SKU](https://developers.vtex.com/docs/api-reference/catalog-api#post-/api/catalog/pvt/skucomplement)

```js 
await this.http.get(
  `/api/catalog/pvt/stockkeepingunit/${ParentSkuId}/complement`,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
)
```

[Obtenha complemento de SKU por ID de complemento de SKU](https://developers.vtex.com/docs/api-reference/catalog-api#get-/api/catalog/pvt/skucomplement/-skuComplementId-)

```js 
await this.http.delete(`/api/catalog/pvt/skucomplement/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
```

[Excluir complemento de SKU por ID de complemento de SKU](https://developers.vtex.com/docs/api-reference/catalog-api#delete-/api/catalog/pvt/skucomplement/-skuComplementId-)



Referência: https://developers.vtex.com/docs/api-reference/catalog-api#post-/api/catalog/pvt/skucomplement
