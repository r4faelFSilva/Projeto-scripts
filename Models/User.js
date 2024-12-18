//Requerimentos
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const { userInfo } = require("os");

// Define a classe User, que estende a classe Model do Sequelize
class User extends Model {}

// Inicializa o modelo User com os campos e configurações para a tabela
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    } 
  
}, {
  // Configurações adicionais para o modelo
  sequelize,                
  modelName: 'usuarios',    
  timestamps: false          
});

// Exporta o modelo User para ser utilizado em outras partes do aplicativo
module.exports = User;



 