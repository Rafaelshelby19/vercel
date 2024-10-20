const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3004;

// Middleware para parsing e CORS
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB Atlas
const uri = "mongodb+srv://rafaelalexalvesmoura7:Eminem080%40@cluster0.31cwlvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let client;

async function connectToMongo() {
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    // Conectar ao MongoDB
    await client.connect();
    console.log("Conectado ao MongoDB Atlas!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB Atlas:", error);
  }
}

connectToMongo(); // Conectar uma vez ao iniciar o servidor

// Rota para receber dados do frontend Angular
app.post('/api/nodes', async (req, res) => {
  try {
    console.log("Requisição recebida do frontend:", req.body); // Log de dados recebidos

    const db = client.db("meuBanco"); // Substitua pelo nome do seu banco de dados
    const collection = db.collection("minhaColecao"); // Substitua pelo nome da sua coleção
    
    // Inserir dados no MongoDB
    const result = await collection.insertOne(req.body);
    
    // Enviar resposta de sucesso para o Angular
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
