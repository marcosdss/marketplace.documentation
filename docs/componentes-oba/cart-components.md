---
id: cart-components
title: Cart Components
sidebar_label: Cart Components
---

## Oba - Cart/Minicart

Esse aplicativo, tem como objetivo organizar a lista de produtos presentes no Minicart e no Cart do nosso site.
Atualmente estamos utilizando na loja o `minicart.V2` nativo Vtex.

<img src="https://obahortifruti.vtexassets.com/arquivos/cart.jpg" alt="drawing" width="500"/>
<img src="https://obahortifruti.vtexassets.com/arquivos/minicart.jpg" alt="drawing" height="300"/>

## Integração com sua loja

1. No seu tema de loja, adicione este aplicativo como uma dependência no arquivo manifest.json: `"obahortifruti.cart-components": "0.x"`.

2. Este aplicativo utiliza os seguintes blocos:
  - `product-list.cart-category-items` -É usado para manipular os itens na lista e deve ser passado como filho para o componente `product-list-wrapper`, nativo da VTEX. Este componente aceita apenas os seguintes blocos como filhos: `"product-list-content-desktop"` e `"product-list-content-mobile"`, que também são nativos da VTEX.

  - `cart-category-filter` - Estes são os botões de filtragem por categoria.

  - `remove-all-button` - Botão para remover todos os produtos.

  - `cart-context` - Contexto do carrinho, caso você precise trazer um componente para fora do resumo.

  - `product-list.custom-filter-minicart` - Filtro de categoria para o Minicarrinho. Ele aceita apenas `product-list-content-mobile` como filho.

  - `info-free-shipping` - Informação sobre frete grátis.

## Customização

| CSS Handles                     |
| ------------------------------- |
| cartDepartmentTitle             |
| cartDepartmentProductsContainer |
| cartDepartmentQuantity          |
| cartDepartmentDrawerButton      |
| cartCategoryContainer           |
| cartCategoryButtonWrapper       |
| cartCategoryButtonContainer     |
| cartCategoryButton              |
| cartCategoryName                |
| cartCategoryQuantity            |
| cartCategorySelected            |
| cartCategoryBadgeSelected       |
| QuantityContainer               |
| QuantityText                    |
| departmentButton                |
| departmentTitle                 |
| customMiniCart                  |
| MenuDepartmentContainer         |
| departmentTitle                 |
| customProductListContainer      |
| containerValueFreeShipping      |
| paragraphFreeShipping           |
| infoValueFreeShipping           |

## Repositório

[OBA - Cart Components](https://github.com/ObaHortifrutiDeveloper/oba.cart-components)
