const express = require('express');
const path = require('path');
const bodyParser = require('express').urlencoded;

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

// Middleware para servir arquivos estáticos e parsear formulários
app.use(express.static(path.join(__dirname, 'Public')));
app.use(bodyParser({ extended: true }));

// Importar as rotas
const routes = require('./routes/routes');
app.use('/', routes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
