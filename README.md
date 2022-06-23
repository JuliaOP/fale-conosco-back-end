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

# Teste XXXXXXX

Esse teste foid eito balbalbalb

## Dados tecnicos

Esse teste foi realizado utilizando o framework serverless com temple "node Express.js API with DynamoDB"


## Usage

Para fazer deploy da aplicação sera necessario:
* node.js (foi utilizaod no teste a versao [16.15.1LTS](https://nodejs.org/dist/v16.15.1/node-v16.15.1-x64.msi)
* aws account (caso não tenha counta na AWS click [aqui](https://portal.aws.amazon.com/billing/signup) para criar uma conta)
* serverless account (caso não tenha counta do dashboard do serverless framework click [aqui](https://app.serverless.com/) para criar uma conta)

### Deployment

Instale as dependedncias do projeto:

```
npm install
```

and then deploy with:

```
serverless deploy
```

No processo de deploy sera solicitado que se faca login no dashboard do serverless e tambem dentro do dashboard se crie uma libercao na conta da AWS para que o deplopy seja feito.
Com esse passos sendo bem sucessedidos o a seguinte mensagem deve ser exebida:

__OBS__: É possivel Fazer o dedploy localmente caso queira

```bash
Deploying fale-conosco-back-end to stage dev (us-east-1)

✔ Service deployed to stack fale-conosco-back-end-dev (65s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: fale-conosco-back-end-dev-api (1.8 MB)
```

_Note_: Tome cuidado pois dessa forma seu endpoint na AWS esta publicamente exposto.

### Invocation

O endpoint POST https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/users recebe os seguintes parametros ondo os parametros name e email ou phone sao obrigatorios.

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

Caso a chamada do endpoind seja bem sucecedida um uuid sera gerado e staus code 201 (CREATED) sera retornado juntamente com o objeto criado.


```json
{
    "userId": "9bc2e6c9-f61d-41f4-8b1d-ff7670c0574c",
    "name": "Meu nome",
    "phone": "(11) 95290-9943"
}
```

Caso um dos parametros obrigatorio ano seja enviado o seguinte exemplo de erro sera retornado.

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

Uma rota para checagem daos dados foi feita tbm e para testela utilize GET https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/users/:userId
Com isso o seguinte object deve ser retornado

```json
{
  "userId": "9bc2e6c9-f61d-41f4-8b1d-ff7670c0574c",
  "name": "Meu nome",
  "phone": "(11) 95290-9943"
}
```

Caso nao seja encontrado o registro sera retornado o seguinte erro.

```bash
{"error":"Could not find user with provided \"userId\""}
```