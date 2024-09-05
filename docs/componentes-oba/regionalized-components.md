---
id: regionalized-components
title: Regionalized Components
sidebar_label: Regionalized Components
---

## Introdução

Este repositório apresenta a funcionalidade de componentes regionalizados para o site, que têm como objetivo melhorar a visibilidade dos produtos disponíveis na loja mais próxima, auxiliando os usuários na compra dos itens mais adequados às suas necessidades.

Esse repositório conta com dois componentes principais sendo eles o Buy Button ou Botão Comprar e o Modal CEP.

## Buy Button / Botão Comprar

### Descrição
Esses componentes serão usados no processo de regionalização...
Toda vez que o usuário acessar a loja, ele será apresentado com produtos e seus respectivos preços. Quando um código postal for inserido, a regionalização será realizada, de modo que os produtos apresentados serão da loja da região correspondente ao código postal.
___ 
### Componentes no Botão de Compra
- `Buy-Button` (adicionar produto ao carrinho)
- `Region-Button` (abrir modal para inserir código postal)
___
### Integração com sua loja

No tema da sua loja, adicione este aplicativo como uma dependência no arquivo manifest.json:
- `"obahortifruti.regionalization-components": "0.x"`.



Incluindo este bloco em prateleiras (shelfs) e na página de produtos:
- `region-buy-button`

## Customização

| CSS Handles                     |
| ------------------------------- |
| containerRegionBuyButton        |
| regionAddPostalCodeButton       |
___

## Modal CEP

## Customização

| CSS Handles                     |
| ------------------------------- |
| containerRegionModalCep         |
| containerInputCep               |
| containerInvalidRegion          |
| containerAvalaibleRegion        |
| regionTitle                     |
| regionSubTitle                  |
| regionTryAnotherRegionText      |
| regionInputCep                  |
| regionButtonSendCep             |
| regionLinkSearchCep             |
| regionButtonCloseModal          |
| deliverInAddressContainer       |
| deliverInTitle                  |
| deliverInLinkChangeCep          |
| deliverInCepText                |
| deliverInStreetText             |
| deliverInDistrictText           |
| avalaibleRegionButtonBack       |
| avalaibleRegionButtonSend       |
| invalidRegionButtonAnotherCep   |


## Repositório

[OBA - Regionalization Components](https://github.com/ObaHortifrutiDeveloper/oba.regionalization-components)
