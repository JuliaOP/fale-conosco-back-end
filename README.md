<!--
title: 'Serverless Framework Node Express API service backed by DynamoDB on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API service backed by DynamoDB running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Teste BEMOL Digital

Esse teste consiste em uma solução para a Criação de Contas de Usuário, dentro do sistema __FaleConosco__, um canal digital para interação com os clientes.



## Dados tecnicos

### Front-End
O front-end para este teste foi implementado utilizando o Framework Flutter, sobre a linguagem Dart. Temos o __app mobile FaleConosco__, cuja instalação e utilização será descrita mais abaixo. 


O formulário para registro da conta do usuário conta com os seguintes campos:
* Nome
* Email
* Telefone
* CPF/CNPJ
* Campos de Endereço

Nestes temos os campos __Nome__ e __Email__ ou __Telefone__ como campos obrigatórios.

Os campos de __Endereço__ contam com autopreenchimento pela utilização da API __ViaCep__ ao informar primeiramente o Cep.

Temos a biblioteca __Dio__ para acessar os serviços. Para conectar o serviço de registro do usuário, temos uma tela final para a entrada do __endpoint__ específico, como medida provisória para bom funcionamento da feature.

Para utilizar o aplicativo, basta baixar no aparelho Android a [faleConosco.apk](https://drive.google.com/file/d/18KA7afOsmQwpi76jzC-pE4sZN3xbshGj/view?usp=sharing), disponibilizada no Google Drive.

O repositório público do aplicativo pode ser acessado no [GitHub](https://github.com/JuliaOP/fale_conosco).

### Back-End

O back-end para este teste foi implementado utilizando o Framework Serverless com template "Node Express.js API with DynamoDB".


## Usage

Para fazer deploy da aplicação sera necessário:
* node.js (foi utilizado no teste a versão [16.15.1LTS](https://nodejs.org/dist/v16.15.1/node-v16.15.1-x64.msi)
* aws account (caso não tenha conta na AWS, [clique aqui](https://portal.aws.amazon.com/billing/signup) para criar uma conta)
* serverless account (caso não tenha conta do Dashboard do Serverless Framework, [clique aqui](https://app.serverless.com/) para criar uma conta)

### Deployment

Instale as dependências do projeto:

```
npm install
```

e faça o deploy:

```
serverless deploy
```

No processo de deploy será solicitado que se faça login no Dashboard do Serverless e também que dentro do Dashboard se crie uma liberação na conta da AWS para que o deploy seja feito.
Com esses passos sendo bem sucedidos a seguinte mensagem deve ser exibida:

__OBS__: É possível fazer o deploy localmente caso queira

```bash
Deploying fale-conosco-back-end to stage dev (us-east-1)

✔ Service deployed to stack fale-conosco-back-end-dev (65s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: fale-conosco-back-end-dev-api (1.8 MB)
```

_Note_: Tome cuidado pois dessa forma seu endpoint na AWS está publicamente exposto.

### Invocation

O endpoint POST https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/users recebe os seguintes parâmetros onde os parâmetros __name__ e __email__ ou __phone__ são obrigatórios.

```json
{
  "address": {
      "zip": {"type": "string"},
      "street": {"type": "string"},
      "complement": {"type": "string"},
      "neighborhood": {"type": "string"},
      "city": {"type": "string"},
      "state": {"type": "string"},
      "number": {"type": "string"},
  },
  "name": {"type": "string"},
  "credential": {"type": "string"},
  "email": {"type": "string"},
  "phone": {"type": "string"},
}
```

Caso a chamada do endpoind seja bem sucedida um __uuid__ será gerado e status code 201 (CREATED) será retornado juntamente com o objeto criado.


```json
{
    "userId": "9bc2e6c9-f61d-41f4-8b1d-ff7670c0574c",
    "name": "Meu nome",
    "phone": "(11) 95290-9943"
}
```

Caso um dos parâmetros obrigatórios não seja enviado, o seguinte exemplo de erro será retornado:

```json
{
  "error": [
    {
      "instancePath": "",
      "schemaPath": "#/then/required",
      "keyword": "required",
      "params": {
        "missingProperty": "phone"
      },
      "message": "must have required property 'phone'"
    }
  ]
}
```

Uma rota para checagem dos dados foi implementada e para testá-la utilize GET https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/users/:userId
Com isso, o seguinte objeto deve ser retornado:

```json
{
  "userId": "9bc2e6c9-f61d-41f4-8b1d-ff7670c0574c",
  "name": "Meu nome",
  "phone": "(11) 95290-9943"
}
```

Caso nao seja encontrado o registro, será retornado o seguinte erro:

```bash
{"error":"Could not find user with provided \"userId\""}
```