const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta 'src'
app.use(express.static(path.join(__dirname, 'src')));

// Rota inicial para redirecionar à home
app.get('/', (req, res) => {
  res.redirect('/components/home/home.html');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

/css/home
/css/login