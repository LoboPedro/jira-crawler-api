# API de JQL Personalizada

API foi desenvolvida em Node.js utilizando MongoDB para gerenciar e armazenar JQLs do Jira em banco. O principal objetivo dessa API é permitir a inserção de JQLs personalizadas para facilitar consultas programadas.

## Requisitos

Antes de rodar o projeto, você precisa ter os seguintes itens instalados:

- Node.js (versão >= 14)
- MongoDB (ou uma instância MongoDB acessível)


Além disso, você deve criar um arquivo `.env` com as variáveis de ambiente necessárias para a conexão ao banco de dados MongoDB. O arquivo `.env` deve conter:

```ini
MONGO_URL=mongodb://<usuario>:<senha>@<host>:<porta>
DB_NAME=<nome_do_banco>
PORT=3000
```

## Como Rodar o Projeto
1. Clone o Repositório
```sh
git clone https://github.com/LoboPedro/jira-crawler.git
cd jira-crawler
```

2. Instale as Dependências
```sh
npm install
```

3. Inicie o Servidor
```sh
npm jira-crawler-api
```
O servidor estará disponível em http://localhost:3000.

## Endpoints
POST `/api/db/jql`

Este endpoint permite a inserção de JQLs personalizadas no banco de dados MongoDB.

#### Corpo da Requisição
A requisição deve ser enviada no formato JSON, onde a chave é o nome da JQL e o valor é a estrutura da JQL.

Exemplo de requisição:

```json
{
  "Nome da JQL": "Estrutura da JQL"
}
```
Respostas
- 200 OK: Caso a JQL seja cadastrada com sucesso.

Exemplo de resposta:

```json
{
  "sucesso": "JQL cadastrada com sucesso",
  "insertedId": "605c72ef1532074160e0b3c4",
  "document": {
    "Nome da JQL": "Estrutura da JQL"
  }
}
```
- 400 Bad Request: Caso os campos obrigatórios não sejam fornecidos ou se o corpo da requisição estiver vazio.

Exemplo de resposta:

```json
{
  "erro": "Os campos são obrigatórios"
}
```
- 500 Internal Server Error: Caso ocorra um erro ao tentar inserir a JQL no banco de dados.

Exemplo de resposta:

```json
{
  "erro": "Erro interno do servidor"
}
```
## Variáveis de Ambiente
- MONGO_URL: URL de conexão com o MongoDB.
- DB_NAME: Nome do banco de dados MongoDB.
- PORT: Porta para rodar o servidor (opcional, o padrão é 3000).