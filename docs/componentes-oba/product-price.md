---
id: product-price
title: Product Price
sidebar_label: Product Price
---

## Visão Geral
O componente "Product Price" é usado para exibir informações de preços de produtos em uma loja VTEX. Ele permite renderizar diferentes tipos de preços, como preços de venda, preços de lista, preços com desconto, preços parcelados e muito mais.

### Instalação
Para instalar o componente, você pode usar o comando `yarn install` ou `npm install` no diretório do seu projeto.

### Uso
Para adicionar os blocos de preço do produto ao seu tema, você precisa declará-los como filhos do bloco `product-summary.shelf` exportado pelo aplicativo [Product Summary](https://vtex.io/docs/components/content-blocks/vtex.product-summary@2.52.3), ou declará-los no template de Produto (`store.product`) do seu tema.

Lembre-se de que esses blocos requerem um contexto de Produto para funcionar corretamente. Portanto, ao declará-los como filhos do `product-summary.shelf`, certifique-se de que eles estejam em um template de loja onde esse contexto esteja disponível.

Por exemplo:

```json
"shelf#home": {
  "blocks": ["product-summary.shelf"]
},

"product-summary.shelf": {
  "children": [
    "product-list-price",
    "product-selling-price#summary",
    "product-price-savings",
    "product-installments"
  ]
},
```

Exceto pelo `product-price-suspense`, cada bloco neste aplicativo possui apenas três propriedades em comum:

| Nome da Propriedade   | Tipo       | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Valor Padrão |
| ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `markers`    | `[string]` | IDs que você define para identificar a mensagem renderizada pelo bloco e personalizá-la usando o Editor do Site no Admin. Saiba como usá-los lendo a documentação em [Usando a Propriedade Markers para personalizar a mensagem de um bloco](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-the-markers-prop-to-customize-a-blocks-message). Note que a mensagem de um bloco pode ser personalizada usando a propriedade `message` no código-fonte do Tema da Loja. | `[]`          |
| `blockClass` | `string`   | ID do bloco que você define para ser usado em  [personalizações de CSS](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization#using-the-blockclass-property).                                                                                                                                                                                                                                                         | `undefined`   |
| `message`    | `string`   | Define o texto padrão do bloco, ou seja, a mensagem do bloco. Se você usar o Editor do Site no Admin, também poderá definir a mensagem de texto que um bloco exibirá na interface do usuário.                                                                                                                                                                                                                                                                                | `undefined`   |

Por exemplo:

```json
"product-selling-price#summary": {
  "props": {
    "markers": [
      "highlight"
    ],
    "blockClass": "summary",
    "message": "Selling price: {sellingPriceValue}"
  }
},
```

O bloco `product-price-savings` possui duas propriedades adicionais:

| Nome da Propriedade           | Tipo                  | Descrição                                                                                                                                                               | Valor Padrão |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `percentageStyle`   | `locale` or `compact` | Defina como `compact` para remover o espaço em branco entre o número e o sinal de porcentagem. Ele usa o padrão fornecido pelo local atual como padrão.                        | `locale`      |
| `minimumPercentage` | `number`              | Defina o valor mínimo para a exibição do valor da porcentagem. Se não estiver configurado, ele será sempre exibido. Exemplo: `10` significa que economias até 10% não serão exibidas. | `0`           |

Os seguintes blocos possuem uma propriedade adicional: `product-list-price`, `product-selling-price`, `product-spot-price`, `product-spot-price-savings`, `product-price-savings`, `product-list-price-range`, and `product-selling-price-range`. A propriedade é:

|  Nome da Propriedade   |   Tipo    |                       Descrição                       | Valor Padrão |
|:------------:|:---------:|:-------------------------------------------------------:|:-------------:|
| `alwaysShow` | `boolean` | Renderiza o bloco mesmo quando o produto não está disponível. |    `false`    |

Por exemplo:

```json
"product-selling-price#summary": {
  "props": {
    "alwaysShow": true
  }
},
```

O bloco `product-installments-list` possui duas propriedades adicionais:

| Nome da Propriedade            | Tipo       | Descrição                                                                                                                                                                                                                                                                                                           | Valor Padrão |
| -------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `paymentSystemName`  | `string`   | Permite filtrar as opções de parcelamento listadas por um sistema de pagamento específico. Se não for passado, os parcelamentos do sistema de pagamento com mais opções de parcelamento serão renderizados.                                                                                                               | `undefined`   |
| `installmentsToShow` | `number[]` | Determina as opções de parcelamento a serem exibidas para o usuário com base no número de parcelas. Por exemplo, se `[1, 3]` for passado como valor para essa propriedade, somente as opções de parcelamento com `NumberOfInstallments` igual a 1 e 3 serão renderizadas. Se nenhum valor for passado, todas as opções serão renderizadas. | `undefined`   |

O bloco `product-installments` também possui duas propriedades adicionais:

| Nome da Propriedade                  | Tipo                                                            | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                             | Valor Padrão  |
| -------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `installmentsCriteria`     | `max-quantity` or `max-quantity-without-interest`               | Quando definido como `max-quantity`, o bloco renderiza o plano de parcelamento com o maior número de parcelas. Quando definido como `max-quantity-without-interest`, o bloco renderiza o plano de parcelamento com o maior número de parcelas e **sem juros**. Observe que, se essa propriedade for definida como `max-quantity-without-interest` e nenhum plano de parcelamento corresponder ao critério 'sem juros', o componente usará o comportamento padrão. | `max-quantity` |
| `installmentOptionsFilter` | `{ paymentSystemName?: string, installmentsQuantity?: number }` | Permite definir duas regras de filtragem que reduzirão os possíveis planos de parcelamento que o componente pode renderizar.                                                                                                                                                                                                                                                                                                                                 | `undefined`    |

Se você estiver usando a funcionalidade de preço assíncrono, pode aproveitar o `product-price-suspense` e suas propriedades:

| Nome da Propriedade  |  Tipo   |                            Descrição                             |    Valor Padrão    |
|:----------:|:-------:|:------------------------------------------------------------------:|:-------------------:|
| `Fallback` | `block` | Nome do bloco que será renderizado quando o preço estiver carregando. | `rich-text#loading` |

Por exemplo:

```json
{
  "rich-text#loading": {
    "props": {
      "text": "Loading..."
    }
  },
  "product-price-suspense": {
    "props": {
      "Fallback": "rich-text#loading"
    },
    "children": [
      "product-list-price#summary",
      "flex-layout.row#selling-price-savings",
      "product-installments#summary",
      "add-to-cart-button"
    ]
  },
  "product-summary.shelf": {
    "children": [
      "stack-layout#prodsum",
      "product-summary-name",
      "product-rating-inline",
      "product-summary-space",
      "product-price-suspense"
    ]
  }
}
```

### Props

Agora, você pode usar todos os blocos exportados pelo aplicativo `product-price`. Veja a lista completa abaixo:

| Nome do Bloco                       | Descrição                                                                                                                                                                                  |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `product-list-price`             | Renderiza o preço de lista do produto. Este bloco não será renderizado se for igual ou menor que o preço de venda do produto.                                                                     |
| `product-selling-price`          | Renderiza o preço de venda do produto.                                                                                                                                                           |
| `product-spot-price`             | Renderiza o preço à vista do produto (se for igual ao preço de venda, o bloco não será renderizado). Este bloco encontra o preço à vista procurando pelo preço mais baixo de todas as opções de parcelamento. |
| `product-installments`           | Renderiza o parcelamento do produto. Se houver mais de uma opção disponível, a que tiver o maior número de parcelas será exibida por padrão.                                        |
| `product-installments-list`      | Renderiza todos os parcelamentos do sistema de pagamento com mais opções de parcelamento por padrão.                                                                                             |
| `product-installments-list-item` | Renderiza uma opção de parcelamento do `product-installments-list-item.`                                                                                                                     |
| `product-price-savings`          | Renderiza a economia de preço do produto, se houver. Pode mostrar a porcentagem de desconto ou o valor total da economia.                                                                 |
| `product-spot-price-savings`     | Renderiza a economia de preço à vista do produto, se houver. Pode mostrar a porcentagem de desconto ou o valor total da economia.                                                            |
| `product-list-price-range`       | Renderiza a faixa de preços de lista do produto. Segue a mesma lógica aplicada ao `ListPrice`:  se o valor for igual ao preço de venda do produto, este bloco não será renderizado.                       |
| `product-selling-price-range`    | Esta é a faixa de preços de venda do produto.                                                                                                                                                     |
| `product-seller-name`            | Renderiza o nome do vendedor do produto.                                                                                                                                                      |
| `product-price-suspense`         | Renderiza um componente de fallback quando o preço está carregando e o bloco filho quando não está carregando. Este bloco é útil quando a loja trabalha com preços assíncronos.                     |

Todos os blocos listados acima utilizam dados de product price obtidos no catálogo da loja. Para saber mais, leia a [Visão geral do módulo de preços](https://help.vtex.com/tracks/precos-101--6f8pwCns3PJHqMvQSugNfP).


### Customização

Para aplicar personalizações CSS neste e em outros blocos, siga as instruções apresentadas na receita sobre [Usando handles CSS para personalizações de loja](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization).

| CSS handles                            |
| -------------------------------------- |
| `installmentValue`                     |
| `installmentsListContainer`            |
| `installmentsNumber`                   |
| `installmentsTotalValue`               |
| `installments`                         |
| `interestRate`                         |
| `listPrice'`                           |
| `listPrice--isUnavailable`             |
| `listPriceRangeMaxValue`               |
| `listPriceRangeMaxWithTax`             |
| `listPriceRangeMinValue`               |
| `listPriceRangeMinWithTax`             |
| `listPriceRangeUniqueValue`            |
| `listPriceRangeUniqueWithTax`          |
| `listPriceRange`                       |
| `listPriceRange--isUnavailable`        |
| `listPriceValue`                       |
| `listPriceWithTax`                     |
| `newPriceValue`                        |
| `newSpotPriceValue`                    |
| `paymentSystemName`                    |
| `previousPriceValue`                   |
| `savingsPercentage`                    |
| `savingsValue`                         |
| `savingsWithTax`                       |
| `savings`                              |
| `savings--isUnavailable`               |
| `sellerName`                           |
| `sellerNameContainer`                  |
| `sellerNameContainer--isDefaultSeller` |
| `sellingPrice--hasListPrice`           |
| `sellingPrice--isUnavailable`          |
| `sellingPriceRangeMaxValue`            |
| `sellingPriceRangeMaxWithTax`          |
| `sellingPriceRangeMinValue`            |
| `sellingPriceRangeMinWithTax`          |
| `sellingPriceRangeUniqueValue`         |
| `sellingPriceRangeUniqueWithTax`       |
| `sellingPriceRange`                    |
| `sellingPriceRange--isUnavailable`     |
| `sellingPriceRange--hasListPrice`      |
| `sellingPriceValue`                    |
| `sellingPriceWithTax`                  |
| `sellingPrice`                         |
| `spotPriceSavingsPercentage`           |
| `spotPriceSavingsValue`                |
| `spotPriceSavingsWithTax`              |
| `spotPriceSavings`                     |
| `spotPriceSavings--isUnavailable`      |
| `spotPriceValue`                       |
| `spotPrice`                            |
| `spotPrice--isUnavailable`             |
| `taxPercentage`                        |


### Fontes

Saiba mais sobre esse componente consultando a [documentação oficial vtex](https://github.com/vtex-apps/product-price).

## Repositório

[OBA - Product Price](https://github.com/ObaHortifrutiDeveloper/oba.product-price)
