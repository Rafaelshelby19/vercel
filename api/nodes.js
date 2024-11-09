const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');

// Criar o aplicativo Express
const app = express();
const port = 3024;

// Configuração do MongoDB
const uri = "mongodb+srv://rafaelalexalvesmoura7:Eminem080%40@cluster0.31cwlvw.mongodb.net/?retryWrites=true&w=majority";


let client;

// Conexão com o MongoDB Atlas
async function connectToMongo() {
  try {
    client = new MongoClient(uri, {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
    });
    await client.connect();
    console.log("Conectado ao MongoDB Atlas!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB Atlas:", error);
  }
}

connectToMongo();

// Configuração do CORS para permitir requisições de qualquer origem
app.use(cors({
  origin: 'https://node.t.vercel.app',  // Permite requisições de qualquer origem (você pode restringir conforme necessário)
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Middleware para parsing de JSON
app.use(express.json());

// Rota para receber dados do frontend (POST)
app.post('/api/nodes', async (req, res) => {
  try {
    console.log("Requisição recebida do frontend:", req.body);

    const db = client.db("meuBanco"); // Substitua pelo seu banco de dados
    const collection = db.collection("minhaColecao"); // Substitua pela sua coleção

    const result = await collection.insertOne(req.body);
    
    res.status(200).json({
      message: 'Dados inseridos com sucesso!',
      data: result
    });
  } catch (error) {
    console.error("Erro ao conectar ou inserir no MongoDB:", error);
    res.status(500).json({
      message: 'Erro ao conectar ou inserir no MongoDB',
      error: error.message
    });
  }
});

// Função para exportar o Express no formato serverless (Vercel)
module.exports = app;
