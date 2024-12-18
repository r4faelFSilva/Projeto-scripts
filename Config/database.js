const { Sequelize } = require('sequelize');

// Configuração do Sequelize
const sequelize = new Sequelize('banco_f1', 'root', 'senha', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false
});

// Testar conexão
sequelize.authenticate()
    .then(() => console.log('Conexão com o banco de dados estabelecida!'))
    .catch(err => console.error('Erro ao conectar no banco:', err));

module.exports = sequelize;
