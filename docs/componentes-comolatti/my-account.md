# My Account

## Overview
___ 
**Ofertas e Comunicação**

- **Menu** - Menu items config
- **Routes** - Routes config

| CSS Handles  |
| ------------ |
| `pageTitle`  |
| `backButton` |
| `heading`    |
| `summary`    |
___ 

# MyAccount - Versão do Portal

## Introdução

MyAccount  um aplicativo canônico incorporado em todas as lojas VTEX. Este aplicativo funciona como um hub de aplicativos, ou seja, é o ponto de entrada para todos os aplicativos que desejam estar disponíveis para os clientes da loja.

O aplicativo é responsável por lidar com os dados pessoais do cliente, como: informações de perfil, senhas, endereços, pedidos e cartões de crédito. Os pedidos e cartões de crédito são responsabilidades de outros dois aplicativos que vêm por padrão com o MyAccount, respectivamente, esses aplicativos são: `vtex.my-orders-app` e `vtex.my-cards`.

## Features

Este aplicativo oferece alguns pontos de extensão para permitir que outros aplicativos personalizem a experiência das lojas conforme necessário.

### Adicionar uma nova página ao My Account

Para adicionar novas páginas ao My Account, seu aplicativo deve definir no arquivo `pages.json` o seguinte ponto de extensão:

```json
{
  "extensions": {
    "my-account-portal/routes/{YOUR_APP}": {
      "component": "ExtensionRouter"
    }
  }
}
```

#### Criando o componente ExtensionRouter

Agora, crie um novo arquivo na raiz da pasta "react" com o nome "ExtensionRouter.js".

```js
import React, { Fragment } from 'react'
import { Route } from 'vtex.my-account-commons/Router'
// Your component pages
import UserSupport from './components/UserSupport'
import UserPoints from './components/UserPoints'

const ExtensionRouter = () => (
  <Fragment>
    {/* This `path` will be added at the end of the URL */}
    <Route path="/support" exact component={UserSupport} />
    <Route path="/points" exact component={UserPoints} />
  </Fragment>
)

export default ExtensionRouter
```

Neste exemplo, você terá duas novas páginas `/account/#/support` e `/account/#/points`, renderizando os componentes UserSupport e UserPoints, respectivamente.

### Menu

Existem duas maneiras de personalizar o menu do My Account:

1. Adicionar links ao topo ou ao final da lista
2. Desativar completamente o menu (DESATIVADO)

É **highly recommended** que você siga a primeira opção. A segunda opção fará com que seu menu fique fora das atualizações futuras e não criará links automaticamente com outros aplicativos que estendem o My Account, como My Subscriptions, My Cards e [Crédito ao Cliente](https://github.com/vtex/customer-credit). Além disso, esse método não é suportado na versão 1 do My Account, portanto, não faça nada de louco aqui, esta não é uma solução à prova de futuro!

#### Adicionar links ao topo ou ao final da lista

Para adicionar links ao final do menu, adicione ao seu `pages.json`:

```json
{
  "extensions": {
    "my-account-portal/menu-links-after/{YOUR_APP}": {
      "component": "ExtensionLinks"
    }
  }
}
```

Para adicionar links ao topo:

```json
{
  "extensions": {
    "my-account-portal/menu-links-before/{YOUR_APP}": {
      "component": "ExtensionLinks"
    }
  }
}
```

##### Criando o componente ExtensionLinks

Este ponto de extensão receberá uma prop chamada `render`. Você **deve** chamá-lo com um array de objetos com as propriedades `name` e `path`. T Isso criará o link com base no `name` e `path` fornecidos.

Exemplo de implementação de ExtensionLinks:

```jsx
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'

const ExtensionLinks = ({ render, intl }) => {
  return render([
    {
      name: intl.formatMessage({ id: 'userPoints.link' }),
      path: '/points',
    },
    {
      name: intl.formatMessage({ id: 'userSupport.link' }),
      path: '/support',
    },
  ])
}

ExtensionLinks.propTypes = {
  render: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(ExtensionLinks)
```

##### Implementando seu próprio Menu

Primeiro, certifique-se de usar o `react-router-dom` que exportamos em `vtex.my-account-commons`.

Use o componente `Link` de `react-router-dom` (consulte [documentação do Link do React Router](https://reacttraining.com/react-router/web/api/Link)) para criar links para outras páginas.

Você também pode envolver seu componente com `withRouter` (consulte [documentação do `withRouter` do React Router](https://reacttraining.com/react-router/web/api/withRouter)), para que você possa marcar um link como ativo.

Confira o exemplo de implementação de um menu personalizado:

```js
import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'vtex.my-account-commons/Router'

function CustomMenu(props) {
  return (
    <div>
      <h4>Custom Menu</h4>
      <Link to="/profile">
        <span
          className={`bl bw2 ${
            props.location.pathname.indexOf('profile') === -1
              ? 'c-muted-1 b--transparent'
              : 'c-on-base b b--action-primary'
          }`}>
          Personal data
        </span>
      </Link>
      <br />
      <Link to="/address">
        <span
          className={`bl bw2 ${
            props.location.pathname.indexOf('address') === -1
              ? 'c-muted-1 b--transparent'
              : 'c-on-base b b--action-primary'
          }`}>
          Address
        </span>
      </Link>
    </div>
  )
}

CustomMenu.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default withRouter(CustomMenu)
```

##### Adicione uma extensão ao `pages.json`

Agora adicione este componente React ao diretório raiz do seu aplicativo e faça referência a ele no `pages.json` do seu aplicativo, da seguinte forma:

```json
{
  "extensions": {
    "my-account-portal/menu/customMenu": {
      "component": "CustomMenu"
    }
  }
}
```

Observe que o nome `CustomMenu` é o nome do arquivo do componente React.

##### Alterando as configurações do ponto de extensão

1. Abra o administrador do Storefront (`/admin/cms/storefront`).
2. Acesse a página My Account
3. Clique no ponto de extensão "My Account - Menu" no menu Componentes do Storefront
4. O campo "Ponto de Extensão do Menu" fará com que o My Account carregue o seguinte ponto de extensão: "my-account-portal/menu/". Portanto, adicione o valor `customMenu`, isso fará com que ele carregue a extensão "my-account-portal/menu/customMenu" definida no `pages.json`.
5. Salve as configurações.

Agora, sua loja renderizará o menu personalizado em vez do menu padrão do My Account. É importante reconhecer que isso torna seu menu completamente independente e fora das atualizações futuras.*

##### Definindo a página inicial padrão do My Account

Após [criar uma nova página](#adding-a-new-page-to-my-acccount), você pode definir o caminho padrão que será renderizado quando o usuário abrir a URL `/account/`.

1. Abra o administrador do Storefront (`/admin/cms/storefront`).
2. Acesse a página My Account
3. Clique no ponto de extensão "My Account - Home" no menu Componentes do Storefront
4. Preencha o campo "Caminho padrão do My Account" com o novo caminho

Seguindo os exemplos anteriores, poderíamos preenchê-lo com "/points", para abrir a página UserPoints.

### Exibição de informações pessoais

Dentro da página de Perfil, logo acima do botão `edit`, existe outro ponto de extensão, com o ID `my-account-portal/profile/display`.  Este ponto de extensão é destinado a lojas que coletam dados personalizados de seus clientes (como a cor do cabelo ou o nome do animal de estimação). Este ponto de extensão permite que seu componente exiba essas informações sem quebrar o layout da página.

**Uso:** Seu componente não deve renderizar nada: você simplesmente chamará a prop `render` com os dados apropriados e eles serão exibidos juntamente com as informações padrão do usuário. Você deve passar um array de objetos contendo as propriedades `label` e `value`. `label` é o nome do campo que você deseja exibir (como `Hair color`) e `value` é o valor desse campo (como `brown`). Lembre-se de que você deve executar qualquer pré-processamento necessário em seus dados, como mascarar ou localizar seus textos. Além disso, cabe a você buscar os dados de onde quer que eles estejam.

**Exemplo**

```js
const BeautyData = ({ render }) => {
  return render([
    {
      label: 'Hair color',
      value: 'Red',
    },
    {
      label: 'Skin color',
      value: 'White',
    },
  ])
}
```

### Editar informações pessoais

Se você pretende exibir dados personalizados dentro do perfil do seu cliente, provavelmente deseja editar essas informações também. O último ponto de extensão, `my-account/profile/input`, permite fazer isso. Ele colocará qualquer conteúdo que você desejar dentro do formulário de edição de perfil, logo acima do botão 'alternar campos comerciais', e também usará funções fornecidas por você para validar e enviar esse conteúdo.

**Uso:** Seu componente pode renderizar componentes de formulário, textos ou qualquer outra coisa desejada. Recomendamos seguir o Styleguide da VTEX ou suas próprias diretrizes de design para evitar quebrar o estilo do restante do formulário. Você também receberá duas props, `registerValidator` e `registerSubmitter`. Conforme seus nomes sugerem, você deve usá-los para registrar suas funções de validação e envio com o componente principal. Você deve usar `componentDidMount` para fazer isso. Dessa forma, quando o usuário clicar em 'Enviar', sua função de validação será chamada. Em seguida, esperamos que você valide todos os campos e exiba mensagens ao usuário, se necessário. Se algo estiver inválido, sua função deve retornar `false` ara interromper o processo de envio e retornar `true` caso contrário. A função pode retornar diretamente o valor booleano ou uma `Promise` que será resolvida com o valor booleano apropriado. Quando toda a validação for concluída, o formulário entrará no estado de envio. Agora ele enviará as informações padrão do perfil para os bancos de dados da VTEX e chamará sua função de envio para que você possa fazer o mesmo. Não coloque interações do usuário ou qualquer coisa relacionada dentro dessa função além do envio, pois o aplicativo retornará à página de exibição assim que todas as funções de envio terminarem de executar e qualquer coisa que você exibir provavelmente não será notada pelo usuário.

**Exemplo**

```js
class FavColor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: '',
      error: null,
    }
  }

  componentDidMount() {
    this.props.registerValidator(this.validate)
    this.props.registerSubmitter(this.submit)
  }

  onChange = e => {
    this.setState({ color: e.target.value })
  }

  validate = () => {
    const { color } = this.state
    this.setState({ error: null })
    if (color !== 'yellow') {
      this.setState({ error: 'Your favorite color must be yellow.' })
      return false
    }
    return true
  }

  submit = () => {
    console.log('Success! Your information is saved.')
  }

  render() {
    const { error, color } = this.state
    return (
      <div className="mb8">
        <Input
          name="color"
          label="Favorite Color"
          value={color}
          errorMessage={error}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
```

### Exemplo

Você pode ver esses recursos em ação executando `vtex link` na pasta `my-account-extension-example`.


## Referência

[Vtex - My Account](https://github.com/vtex-apps/my-account)

## Repositório

[OBA - My Account](https://github.com/ObaHortifrutiDeveloper/oba.my-account)
