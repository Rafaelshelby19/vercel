const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Corrigindo a string de conexão para usar o MongoDB Atlas com a senha codificada
const mongoURI = 'mongodb+srv://rafaelalexalvesmoura7:Eminem080%40@cluster0.31cwlvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());



const nodeSchema = new mongoose.Schema({
  nodeData: String
});

const Node = mongoose.model('Node', nodeSchema);

app.post('/api/nodes', (req, res) => {
  console.log('Requisição recebida:', req.body); // Log para depuração
  const newNode = new Node(req.body);
  newNode.save()
    .then(savedNode => {
      console.log('Node salvo com sucesso:', savedNode);
      res.status(200).send(savedNode);
    })
    .catch(err => {
      console.error('Erro ao salvar o node:', err);
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
