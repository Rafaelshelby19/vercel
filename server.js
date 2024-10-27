const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3022;

// Configurar CORS para permitir requisições do frontend específico no Vercel
app.use(cors({
  origin: 'https://dadostest-1h3v.vercel.app', // Domínio do frontend hospedado
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Middleware para parsing de JSON
app.use(express.json());

// Conexão com o MongoDB Atlas
const uri = "mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let client;

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

// Rota OPTIONS para lidar com pré-requisição CORS
app.options('/api/nodes', cors());

// Rota para receber dados do frontend Angular
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

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
