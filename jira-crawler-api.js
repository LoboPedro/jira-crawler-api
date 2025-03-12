require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path')

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

let db;
let client;

async function connectMongo() {
  try {
    client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db(dbName);
    console.log(`Conectado ao banco ${dbName}`);
  } catch (err) {
    console.error(`Erro ao conectar ao  ${dbName}:\n`, err);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log(`Conexão com  ${dbName} fechada.`);
  }
  process.exit(0);
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/db/jql', async (req, res) => {
  try {
    const keys = Object.keys(req.body); 
    if (keys.length === 0) {
      return res.status(400).json({ erro: "Nenhum dado enviado." });
    }

    const jql_name = keys[0]; 
    const jql_value = req.body[jql_name];

    if (!jql_name || !jql_value) {
      return res.status(400).json({ erro: "Os campos são obrigatórios" });
    }

    const document = { [jql_name]: jql_value };
    const collection = db.collection("jira_jql");
    const result = await collection.insertOne(document);
    res.status(201).json({ sucesso: 'JQL cadastrada com sucesso', insertedId: result.insertedId, document });

  } catch (error) {
    console.error('Erro ao inserir JQL:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

app.listen(port, async () => {
  await connectMongo();
  console.log(`Servidor rodando em http://localhost:${port}`);
});