---
id: wish-list-custom-event
title: Wish List - Custom Event
sidebar_label: Wish List - Custom Event
---


Projetado para lojas **B2C**, o aplicativo Lista de Desejos adiciona um ícone de coração às prateleiras digitais e às páginas de detalhes do produto, permitindo que os usuários adicionem seus produtos desejados a uma lista de desejos.

![wishlist-list](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-wish-list-0.png)<br/> _Exemplo de ícones de coração em uma prateleira._

![wish-list-pdp](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-wish-list-1.png) _ Exemplo de um ícone de coração em uma página de detalhes do produto._

Além disso, ele gera uma nova rota chamada `/wishlist` no menu "Minha Conta", criando uma página com os itens que os usuários adicionaram à lista de desejos.

![wishlist-my-account](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-wish-list-2.png) _Exemplo de uma página de lista de desejos._

## Configuração da wishlist

1. [Instale](https://developers.vtex.com/docs/guides/vtex-io-documentation-installing-an-app/) o aplicativo Lista de Desejos na conta VTEX desejada executando `vtex install vtex.wish-list` no seu terminal.
2. Abra o diretório do aplicativo Tema da Loja no editor de código.
3. Adicione o aplicativo Lista de Desejos ao arquivo `manifest.json` do seu tema dentro de **peerDependencies** conforme mostrado abaixo:

```diff
 "peerDependencies": {
+  "vtex.wish-list": "1.x"
 }
```

> ℹ️ _O aplicativo Lista de Desejos pode exportar dois blocos de tema ao ser adicionado como uma dependência: `add-to-list-btn` e `list-context.wishlist`.  Eles são responsáveis por adicionar o ícone de coração a outros blocos de tema e fornecer dados do produto para construir o `/wishlist`,  que também é compartilhado com a página "Minha Conta"._

4. Adicione o bloco `add-to-list-btn` na lista de blocos filhos do template `store.product`. Por exemplo:

```diff
{
  "store.product": {
    "children": [
      "product-name",
      "product-reviews",
+      "add-to-list-btn"
    ]
  },
```

5. Declare o bloco `add-to-list-btn` como filho dos [`product-summary.shelf` blocks](https://developers.vtex.com/docs/guides/vtex-product-summary/) no seu tema. Por exemplo:

```diff
  "product-summary.shelf": {
    "children": [
+     "add-to-list-btn",
      "product-summary-name",
      "product-rating-inline",
      "product-summary-price",
      "add-to-cart-button"
    ]
  }
```

> ℹ️ _A nova rota chamada `/wishlist`, que cria a página personalizada Lista de Desejos contendo os produtos adicionados à lista de desejos, já tem um modelo padrão e é renderizada no menu "Minha Conta". Nenhuma ação adicional é necessária. No entanto, você pode **personalizar a página Lista de Desejos sobrescrevendo o modelo**. Para fazer isso, você deve criar um novo modelo conforme desejar. Veja mais detalhes na seção **Configurações avançadas** abaixo._

## Configurações avançadas

A arquitetura do aplicativo Lista de Desejos permite personalizar a página `/wishlist` usando outros blocos. Atualmente, a implementação padrão é a seguinte:

`store.wishlist` para a rota `/wishlist` e `my-account-page.wishlist-page` juntamente com `my-account-link.wishlist-link` para a seção de Lista de Desejos em "Minha Conta".

**wishlist.jsonc**

```json
{
  "my-account-link.wishlist-link": {
    "props": {
      "label": "My Wishlist"
    }
  },
  "my-account-page.wishlist-page": {
    "props": {
      "title": "Wishlist"
    },
    "children": ["list-context.wishlist"]
  },
  "store.wishlist": {
    "blocks": ["flex-layout.row#top", "list-context.wishlist"]
  },
  "flex-layout.row#top": {
    "children": ["flex-layout.col#title"]
  },
  "flex-layout.col#title": {
    "children": ["rich-text#title"],
    "props": {
      "blockClass": "titleWishlist",
      "preventVerticalStretch": true
    }
  },
  "rich-text#title": {
    "props": {
      "text": "### Wishlist"
    }
  },
  "list-context.wishlist": {
    "blocks": ["product-summary.shelf#wishlist"],
    "children": ["slider-layout#wishlist"]
  },
  "product-summary.shelf#wishlist": {
    "children": [
      "add-to-list-btn",
      "product-summary-image",
      "product-summary-name",
      "product-summary-space",
      "product-summary-price",
      "add-to-cart-button"
    ]
  },
  "slider-layout#wishlist": {
    "props": {
      "itemsPerPage": {
        "desktop": 5,
        "tablet": 3,
        "phone": 1
      },
      "showNavigationArrows": "desktopOnly",
      "showPaginationDots": "always",
      "infinite": false,
      "fullWidth": true,
      "blockClass": "shelf"
    }
  }
}
```

Adicione o arquivo `plugins.json` à pasta `/store/` do seu tema. Isso adicionará a Lista de Desejos à "Minha Conta".

**plugins.json**

```json
{
  "my-account-pages > my-account-page": "my-account-page.wishlist-page",
  "my-account-menu > my-account-link": "my-account-link.wishlist-link"
}
```

Por "implementação padrão", queremos dizer que, ao instalar o aplicativo Lista de Desejos em sua loja, você está usando o código `json` acima nos bastidores para construir o novo modelo de página (`/wishlist`), como mostrado na terceira imagem exibida acima.

Portanto, para personalizar a configuração da página `/wishlist`, você precisa:

1. Criar um arquivo `wishlist.jsonc` em `store/blocks`.
2. Criar um arquivo `plugins.json` em `store/`.
3. Copiar o código acima, colá-lo no novo arquivo e alterá-lo conforme desejar.
4. Fazer o deploy das suas alterações.

Se você quiser configurar o layout sem a dependência `slider-layout`, você pode usar o `list-context-renderer` para envolver o `product-summary.shelf`. Saiba mais [aqui](https://github.com/vtex-apps/list-context#list-context-renderer).

#### Propriedades `my-account-link.wishlist-link`

| Nome da Propriedade |   Tipo   |                      Descrição                      | Valor Padrão |
|:---------:|:--------:|:-----------------------------------------------------:|:-------------:|
|  `label`  | `string` | Altera o rótulo do menu da seção na página "Minha Conta" |  `Wishlist`   |

## Usos

Existem algumas URLs para ler, pesquisar e alterar dados do aplicativo:

Para ler o esquema do aplicativo Lista de Desejos:

```
curl --request GET \
     --url 'https://{{accountName}}.vtexcommercestable.com.br/api/dataentities/wishlist/schemas/wishlist' \
     --header 'VtexIdClientAutCookie: {authToken}' \
```

Para OBTER todos os dados da lista de desejos:

```
curl --request GET \
     --url 'https://{environment}--{accountName}.myvtex.com/_v/wishlist/export-lists' \
     --header 'VtexIdClientAutCookie: {authToken}' \
```

Para pesquisar uma lista de desejos pelo email do usuário:

```
curl --request GET \
     --url 'https://{{accountName}}.vtexcommercestable.com.br/api/dataentities/wishlist/search?' \
     --header 'VtexIdClientAutCookie: {authToken}' \
```

Para PATCH uma lista de desejos no Master Data:

```
curl --request PATCH \
     --url 'https://{{accountName}}.vtexcommercestable.com.br/api/dataentities/wishlist/documents' \
     --header 'VtexIdClientAutCookie: {authToken}' \
     --data '
        [
            "Email",
            "Name",
            .
            .
            .
            "IsPublic",
        ]
     '
```

Para EXCLUIR uma lista de desejos do Master Data:

```
curl --request DELETE \
     --url 'https://{{accountName}}.vtexcommercestable.com.br/api/dataentities/wishlist/documents/{documentId}' \
     --header 'VtexIdClientAutCookie: {authToken}' \
```

## URL personalizada para mensagens de aviso

Para alterar o link da mensagem de aviso:

```json
{
  "add-to-list-btn#myButton": {
    "props": {
      "toastURL": "/wishlist"
    }
  }
}
```

| Nome da Propriedade  |   Tipo   |              Descrição              |     Valor Padrão     |
|:----------:|:--------:|:-------------------------------------:|:---------------------:|
| `toastURL` | `string` | Altera o link da mensagem de aviso | `/account/#wishlist'` |

## Visualização personalizada para wishlist vazias

Para mostrar uma visualização personalizada se nenhum produto tiver sido adicionado à lista de desejos:

```diff
{
  "list-context.wishlist": {
+    "blocks": ["wishlist-empty-list", "product-summary.shelf#wishlist"],
    "children": ["slider-layout#wishlist"],
    "props": {
      "showViewEmptyList": true
    }
  },
  "wishlist-empty-list": {
    "children": [
      "rich-text#description"
    ]
  },
  "rich-text#description": {
    "props": {
      "text": "### There are no products",
      "textAlignment": "CENTER",
      "textPosition": "CENTER",
      "font": "t-heading-2"
    }
  },
}
```

#### Propriedades `list-context.wishlist`

|      Nome da Propriedade      |   Tipo    |                           Descrição                            | Valor Padrão |
|:-------------------:|:---------:|:----------------------------------------------------------------:|:-------------:|
| `showViewEmptyList` | `boolean` | Mostra uma visualização personalizada se nenhum produto tiver sido adicionado à wishlist |    `false`    |

## Customização

Para aplicar personalizações de CSS a este e outros blocos, siga as instruções em [Usando alças de CSS para personalização da loja](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization).

| CSS handles             |
| ----------------------- |
| `columnText`            |
| `columnThumb`           |
| `linkText`              |
| `linkThumb`             |
| `listItemsContainer`    |
| `listName`              |
| `listTab`               |
| `productDescription`    |
| `productItemRow`        |
| `productTitle`          |
| `thumb`                 |
| `wishlistContainer`     |
| `wishlistIcon`          |
| `wishlistIconContainer` |
| `emptyMessage`          |

## Referência

[Vtex - Wishlist](https://github.com/vtex-apps/wish-list)

## Repositório

[OBA - Wish List - Event](https://github.com/ObaHortifrutiDeveloper/oba.wishlist-event)
