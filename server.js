const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/nodesDB')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

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

