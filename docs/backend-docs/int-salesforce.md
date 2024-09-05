# Integrações Sales Force


Dashboard de Integração do Sales Force
O dashboard de integração com o grafana pode ser acessado através do link abaixo.

https://oba-grafana.azurewebsites.net/d/li_fGsB4z/integracoes-salesforce?orgId=1&refresh=5s

O Servidor que contém as aplicações sendo executadas tem o endereço abaixo.
IP: 20.226.116.27:3389

As aplicações em Node necessitam de conexão com a VPN, as aplicações em .Net não tem essa necessidade.
* Serviços Migração-SF é node
* SALESFORCE é o .Net

Status de Integração: É possível verificar o status de integração no link abaixo.
https://oba-grafana.azurewebsites.net/d/li_fGsB4z/integracoes-salesforce?orgId=1&refresh=5s
Quando o mesmo atinge 100% significa que pode ter um problema com a integração e ela está demorando.

Quando parar integração.
* Verificar no servidor se está com a VPN executando.
* Verificar se os serviços estão iniciados.

# Instalação da aplicação em nodejs
Pré-requisitos:
Instalar o Oracle client versão 10.2
Instalar o Nodejs

1. Efetuar um git clone do repositório.
1. Alterar no .env o caminho do oracle client, por ex.
**DB_ORACLE_ORACLECLIENT="C:\oracle\instantclient_10_2"**
1. Instalar as dependências com o nodejs, algumas não estãono arquivo do package.json e dão erro, portanto executar na ordem descrita a seguir.
* npm install
* npm install rimraf
* npm install tsc
* npm install typescript
* npm install oracledb




# Verificar a quantidade integrada no SalesForce de clientes por data
```
SELECT 
    A.DTCAD,
    COUNT(A.DTCAD) AS N
FROM
(
    SELECT 
    CONVERT(DATE, DATA_CADASTRO_CBQ) AS DTCAD
    FROM DEX_CONTACTS
    WHERE
        DATA_CADASTRO_CBQ >= '2023-07-30'
        --Substituir pela data inicial que quer buscar
) A
GROUP BY A.DTCAD
```


# Principais problemas na integração.
### Falha ao integrar dados
* Verificar a VPN no servidor se está executando.
* Verificar se os serviços foram iniciados.
* Parar o serviço, aguardar alguns segundos e iniciar novamente.

### Falha ao criar o job no SalesForce
* Verificar todos os jobs daquele mesmo tipo com o Get All Jobs, se algum job antigo está com o state Active.
1. Caso esteja, faça uma chamada para Patch Abort Job
1. Depois faça uma chamada para Patch Close Job
1. Pare o serviço e inicie novamente

### Registros não integrados de datas anteriores
* É necessário rodar o job manualmente, colocando na query desde que data você quer rodar.