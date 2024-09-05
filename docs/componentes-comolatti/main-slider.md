---
id: slider-layout
title: Slider Layout
sidebar_label: Slider Layout
---

O Slider Layout é uma solução flexível para criar sliders de blocos no VTEX Store Framework, como um componente de carrossel.

![](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-main-layout-0.png)

> _Para usar o Slider Layout como substituto do [aplicativo Carousel](https://github.com/vtex-apps/carousel), eia a documentação  [Construindo um Carrossel usando o Slider Layout](https://developers.vtex.com/docs/guides/vtex-io-documentation-building-a-carousel-using-main-layout)._

## Integração com o Google Analytics 4

O Slider Layout permite que você integre seu componente com o [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4). 
A integração acontece por meio do evento [`GA4 view_promotion`](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm#view_promotion), que geralmente está associado ao carrossel de banners de promoção exibido pelo Slider Layout.

Ao integrar com o Google Analytics 4, você pode definir o `Product ID` o `Product Name` e a posição da sua promoção no [Site Editor](https://help.vtex.com/en/tutorial/site-editor-overview--299Dbeb9mFczUTyNQ9xPe1) tpara serem exibidos no painel do Google Analytics.

Para configurar isso, vá para o VTEX Admin, acesse **Storefront > Site Editor** e abra as configurações de imagem da promoção interna que você deseja rastrear. Essas configurações são exibidas no lado direito da página.

![ga4-in-site-editor](https://vtexhelp.vtexassets.com/assets/docs/src/gtm-site-editor___bc52365aafad63deb5bfed1d74f307c0.png)

> Para obter mais informações sobre como gerenciar o conteúdo da sua página, leia [Gerenciamento de conteúdo de página e modelo](https://help.vtex.com/en/tutorial/managing-page-and-template-content--3tMbx6HXy4Fy5r9EhboG37).

Após a configuração, o Google Analytics pode rastrear suas promoções internas e gerar relatórios sobre visualizações, cliques, taxa de cliques, conversões e receita.

## Configuração

1. Adicione o aplicativo `main-layout` às dependências do seu tema no arquivo `manifest.json`:

```json
"dependencies": {
  "vtex.main-layout": "0.x"
}
```

Agora, você pode usar todos os blocos exportados pelo aplicativo `main-layout`. Veja a lista completa abaixo:

| Nome do Bloco           | Descrição                                                                                                                                                                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `main-layout`       | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Constrói sliders de blocos para sua loja por meio de seus blocos `children`. |
| `main-layout-group` | Permite que você mantenha um grupo de blocos `main-layout` sincronizados entre si. Para obter mais informações, consulte a seção de configuração avançada abaixo.                                                        |

2. Adicione o bloco `main-layout` ao seu modelo. Por exemplo:

```json
  "main-layout#text-test": {
    "props": {
      "itemsPerPage": {
        "desktop": 1,
        "tablet": 1,
        "phone": 1
      },
      "infinite": true,
      "showNavigationArrows": "desktopOnly",
      "blockClass": "carousel"
    },
    "children": ["rich-text#1", "rich-text#2", "rich-text#3"]
  },

  "rich-text#1": {
    "props": {
      "text": "Test1"
    }
  },
  "rich-text#2": {
    "props": {
      "text": "Test2"
    }
  },
  "rich-text#3": {
    "props": {
      "text": "Test3"
    }
  },
```

| Nome da Propriedade              | Tipo                | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Valor Padrão                          |
| ---------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| `label`                | `string`            | Valor do atributo `aria-label`  a ser usado pelo componente `<Slider/>` ao ser renderizado. O valor do `aria-label` deve informar explicitamente aos usuários o que o elemento HTML inspecionado faz.                                                                                                                                                                                                                                                                                                                                                                                                                                | `slider`                               |
| `showNavigationArrows` | `enum`              | Indica quando as setas de navegação devem ser renderizadas. Valores possíveis são: `mobileOnly`, `desktopOnly`, `always`, ou `never`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `always`                               |
| `showPaginationDots`   | `enum`              | Indica quando os pontos de paginação devem ser renderizados. Valores possíveis são: `mobileOnly`, `desktopOnly`, `always`, ou `never`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `always`                               |
| `infinite`             | `boolean`           | Determina se o slider deve ser infinito  (`true`) ou não (`false`). Quando essa propriedade é definida como  `false`,  o slider terá um fim explícito para os usuários.                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `false`                                |
| `usePagination`        | `boolean`           | Determina se o slider deve usar páginas de slides (`true`) ou não (`false`). Quando essa propriedade é definida como `false`, o slider usará rolagem suave para a navegação dos slides em vez de setas.                                                                                                                                                                                                                                                                                                                                                                                                                    | `true`                                 |
| `itemsPerPage`         | `object`            | O número de itens do slider a serem exibidos em cada tipo de dispositivo. Para mais informações sobre isso, consulte a seção de objetos  `itemsPerPage`  abaixo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `{ desktop: 5, tablet: 3, phone: 1 }`  |
| `navigationStep`       | `number` / `enum`   | O número de itens do slider que devem ser exibidos quando os usuários clicam em uma das setas do slider. Também é possível definir esse valor como `page`, o que significa que o número de itens do slider a serem exibidos quando uma das setas é clicada é igual ao número de itens do slider definidos por página (na propriedade `itemsPerPage`).                                                                                                                                                                                                                                                                                   | `page`                                 |
| `slideTransition`      | `object`            | Controla a animação de transição entre os slides com base em [atributos CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/transition). Para mais informações sobre isso, consulte a seção de objetos `slideTransition` abaixo.                                                                                                                                                                                                                                                                                                                                                                                          | `{ speed: 400, delay: 0, timing: '' }` |
| `autoplay`             | `object`            | Controla o comportamento da função de reprodução automática. Para mais informações sobre isso, consulte a seção de objetos `autoplay` abaixo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `undefined`                            |
| `fullWidth`            | `boolean`           | Determina se os slides devem ocupar a largura total da página, fazendo com que as setas apareçam em cima deles (`true`) ou não (`false`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `true`                                 |
| `arrowSize`            | `number` / `object` | Tamanho das setas do slider (altura e largura) em pixels. Esta é uma propriedade responsiva, o que significa que você pode passar um objeto com valores diferentes para cada ponto de interrupção  (`desktop`, `mobile`, `tablet`, e `phone`).                                                                                                                                                                                                                                                                                                                                                                                                       | `25`                                   |
| `centerMode`           | `enum` / `object`   | Define o posicionamento dos elementos do slider na tela. Valores possíveis são: `center` (elementos são centralizados, permitindo que os usuários vejam um pedaço do slide anterior e do próximo), `to-the-left` (alinha os elementos à esquerda, permitindo que os usuários vejam um pedaço do próximo slide, mas não do anterior) e  `disabled` (desabilita o recurso, renderizando os elementos em toda a tela sem mostrar um pedaço do slide anterior e do próximo). Observação: Esta é uma propriedade responsiva, o que significa que você pode passar um objeto com valores diferentes para cada ponto de interrupção  (`desktop`, `mobile`, `tablet`, and `phone`). | `disabled`                             |
| `centerModeSlidesGap`  | `number`            | Número de pixels entre os slides quando `centerMode` está definido como `center` ou `to-the-left`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `undefined`                            |

- **Objeto `itemsPerPage`**

| PNome da Propriedade | Tipo     | Descrição                                              | Valor Padrão |
| --------- | -------- | -------------------------------------------------------- | ------------- |
| `desktop` | `number` | O número de slides a serem exibidos em dispositivos desktop. | `5`           |
| `tablet`  | `number` | O número de slides a serem exibidos em dispositivos tablet.  | `3`           |
| `phone`   | `number` | O número de slides a serem exibidos em dispositivos móveis.   | `1`           |

- **Objeto `slideTransition`**

| Nome da Propriedade | Tipo     | Descrição                               | Valor Padrão |
| --------- | -------- | ----------------------------------------- | ------------- |
| `speed`   | `number` | Velocidade da transição (em `ms`).               | `400`         |
| `delay`   | `number` | Atraso entre a transição dos slides (em `ms`). | `0`           |
| `timing`  | `string` | Função de temporização.                          | `''`          |

- **`autoplay` object**

| Nome da Propriedade     | Tipo      | Descrição                                                                                                    | Valor Padrão |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------- | ------------- |
| `timeout`     | `number`  | Tempo de espera (em `ms`) entre cada slide.                                                                          | `undefined`   |
| `stopOnHover` | `boolean` | Determina se o recurso de reprodução automática deve ser interrompido quando os usuários passarem o mouse sobre o slider  (`true`) ou não (`false`). | `undefined`   |

## Configuração Avançada

Portanto, o `main-layout-group` sincroniza os slides renderizados por cada bloco `main-layout` declarado nele.

Therefore, the `main-layout-group` não renderiza nenhum componente específico na interface do usuário da loja. É realmente um bloco lógico que só espera receber uma lista de blocos `main-layout` na lista de `children` contendo os blocos `main-layout` desejados que devem ser renderizados. Por exemplo:

```json
{
  "main-layout-group#test": {
    "children": ["main-layout#1", "main-layout#2", "main-layout#3"]
  }
}
```

Abaixo, você pode encontrar um exemplo prático usando três bloco `main-layout` dentro de um `main-layout-group`. Cada `main-layout` recebeu três bloco `rich-text` como `children` para servir como slides individuais:

![main-layout-group demo](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-main-layout-3.gif)

> ⚠️ **\*Todos os blocos `main-layout` declarados no `main-layout-group` devem ter a mesma configuração, ou seja, as mesmas propriedades e valores**. Devido às regras de implementação, eles só podem diferir na lista de blocos `children`. Lembre-se de que declarar blocos `main-layout` com configurações diferentes resultará em comportamento inesperado, levando a erros que **não** são suportados pela equipe do VTEX Store Framework.\*

## Customização

Para aplicar personalizações de CSS a este e outros blocos, siga as instruções fornecidas na receita em [Usando alças de CSS para personalização da loja](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization).

| CSS handles               |
| ------------------------- |
| `paginationDot--isActive` |
| `paginationDot`           |
| `paginationDotsContainer` |
| `slide--firstVisible`     |
| `slide--hidden`           |
| `slide--lastVisible`      |
| `slide--visible`          |
| `slideChildrenContainer`  |
| `slide`                   |
| `sliderArrows`            |
| `sliderLayoutContainer`   |
| `sliderLeftArrow`         |
| `sliderRightArrow`        |
| `sliderTrackContainer`    |
| `sliderTrack`             |

## Repositório

[OBA - Slider-Layout](https://github.com/ObaHortifrutiDeveloper/oba.slider-layout)
