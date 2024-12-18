const express = require('express');
const path = require('path');
const bodyParser = require('express').urlencoded;
const routes = require('./routes/routes'); // Caminho correto para o arquivo routes.js

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

// Middleware
app.use(express.static(path.join(__dirname, 'Public')));
app.use(bodyParser({ extended: true }));

// Usa as rotas
app.use('/', routes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
