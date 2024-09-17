const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;  // Porta do servidor

// String de conexão para o MongoDB Atlas
const mongoURI = 'mongodb+srv://rafaelalexalvesmourass:Eminem080%40@cluster0.xfxk9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conectar ao MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('Conectado ao MongoDB Atlas com sucesso'))
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB Atlas:', err.message);
    console.error('Detalhes do erro:', err);
  });

// Definir schema e modelo
const nodeSchema = new mongoose.Schema({
  nodeData: String
}); 

const Node = mongoose.model('Node', nodeSchema);  // Modelo para a coleção

// Rota para salvar um novo Node no banco de dados
app.post('/api/nodes', (req, res) => {
  console.log('Requisição recebida:', req.body);
  const newNode = new Node(req.body);
  newNode.save()
    .then(savedNode => {
      console.log('Node salvo com sucesso:', savedNode);
      res.status(200).send({ message: 'Node salvo com sucesso!', data: savedNode });
    })
    .catch(err => {
      console.error('Erro ao salvar o node:', err);
      res.status(500).send({ message: 'Erro ao salvar o node.', error: err });
    });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

