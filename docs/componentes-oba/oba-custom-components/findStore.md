---
id: findStore
title: Find Store
sidebar_label: Find Store
---

## Introdução
Este componente tem como objetivo listar as lojas próximas ao CEP ou endereço inserido no campo de busca, oferecendo também a opção de utilizar a localização atual do usuário.

Ao selecionar uma das lojas listadas no menu lateral, o usuário é direcionado para a posição geográfica correspondente à loja, com base nas informações cadastradas para aquela loja específica.

### Funcionamento Técnico
O componente inicia importando as bibliotecas do Google Maps:
```jsx title="react/components/FindStore/index.tsx"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
```

Em seguida, são definidos os estados e seus valores padrões:
```jsx title="react/components/FindStore/index.tsx"
const [map, setMap]: any = React.useState(null)
const [cep, setCep]: any = useState('');
const [markers, setMarkers]: any = useState([]);
const [activeMarker, setActiveMarker]: any = useState(null);
const [centerPosition, setCenterPosition]: any = useState({ lat: -23.5502, lng: -46.63617 });
```

Ao pressionar o botão "Atualizar" após inserir um CEP ou endereço, a seguinte função é acionada:
```jsx title="react/components/FindStore/index.tsx"
const onSubmitForm = (e: { preventDefault: () => void; }) => {
  e.preventDefault();

  const isValidBRZip = (zip: string) => /^\d{5}-\d{3}$/.test(zip);
  
  if (!isValidBRZip(cep)) {
    let url = `+${cep}&key=${active}`;
    updateFind(url);
  } 
  const txtFormated = cep.replace("-", "").trim();
  fetch(`https://viacep.com.br/ws/${txtFormated}/json/`)
  .then(response => response.json())
  .then(res => {
    let url = `+${res.logradouro},+${res.localidade},+${res.uf}&key=${active}`;
    updateFind(url);
  });
}
```
Após verificar se os dados correspondem a um CEP ou endereço, a função envia uma URL para a função `updateFind()`, que, por sua vez, realiza a seguinte operação:
```jsx title="react/components/FindStore/index.tsx"
const updateFind = (url: RequestInfo | URL) => {
  let urlMap = `https://maps.googleapis.com/maps/api/geocode/json?address=`

  fetch( urlMap + url as string, { method: 'POST' })
    .then(response => response.json())
    .then(res => {
      if (res.status === "OK") {
        setCenterPosition(res.results[0].geometry.location);
        map.panTo(res.results[0].geometry.location);
        fetchData(res.results[0].geometry.location.lat, res.results[0].geometry.location.lng);
      } else if (res.status === "ZERO_RESULTS") {
        alert('Nenhuma unidade encontrada')
      }
    })
}
```
Este processo envia a URL para a API do Google Maps, redirecionando o mapa para a localização consultada.

### Menu lateral de lojas
A lista de lojas é carregada a partir de uma constante que realiza uma consulta na rota VTEX `/_v/oba/get-closest-stores`, passando os valores de latitude e longitude armazenados no estado `centerPosition`. Após a obtenção dos dados, o estado markers é populado da seguinte forma:
```jsx title="react/components/FindStore/index.tsx"
const fetchData = async (
    lat = centerPosition.lat,
    lng = centerPosition.lng
  ) => {
    const url = `/_v/oba/get-closest-stores?lat=${lat}&lon=${lng}`;
    /* lat: -23.5502, lng: -46.63617 */
    fetch( url )
      .then(response => response.json())
      .then((result) => {
        const dataFormated = result.map((element: { name: string | any[]; }) => {
          const nameSlited = element.name.slice(5);
          return {
            nameFormated: nameSlited,
            hideItem: false,
            ...element,
          }
        });
        setMarkers(dataFormated);
      });

  };
```
O estado markers é então utilizado no render:
```jsx title="react/components/FindStore/index.tsx"
<div className={styles.findStoreSidebar}>
  {(markers.length > 0) ? (
    <div className={styles.findStoreSidebarList}>
      {markers.map((item: any, index: any) => ())}
    </div>
  )}
</div>
```
Cada loja é renderizada com base nos dados de markers, e ao clicar em uma loja, o mapa é redirecionado para a sua localização:
```jsx title="react/components/FindStore/index.tsx"
<div className={styles.findStoreSidebarList}>
    {markers.map((item: any, index: any) => (
      <div 
        key={item}
        onClick={() => {
          map.panTo({ lat: item.lat, lng: item.lon });
        setActiveMarker(index);
    }}}
></div>
```
### Rota Closest Stores (/_v/oba/get-closest-stores)
Essa rota corresponde a um componente chamado `oba.delivery-map` dentro de `Custom Components`. Esta rota recebe as coordenadas de latitude e longitude definidas no estado `centerPosition` e realiza uma requisição GET para uma rota externa à VTEX:
```jsx title="react/components/FindStore/index.tsx"
let url = 'https://obaecommerce.hubin.io/iomanager/api/flows/execute/route/store-finder/stores-list'
url += `?lat=${getQueryVariable(qs, 'lat')}&lon=${getQueryVariable(qs, 'lon')}`

const stores = await axios.get(url, {
  headers: {
    'x-wevo-access-token': appSettings.WevoAccessToken,
  },
  httpsAgent,
})
```
### Erros
Foi identificado um cenário em que há uma demora na renderização do mapa nas Workspaces ou a renderização não ocorre, possivelmente devido a um token que precisa ser passado ou liberado na Wevo.

```
{ code: 3014, message: 'Expired token.' }
```
