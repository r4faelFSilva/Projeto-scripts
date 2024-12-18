const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/AuthController'); // Importa o controller

// Rota GET para a Home
router.get('/', AuthController.renderHome);

// Rotas de login
router.get('/login', AuthController.renderLogin);
router.post('/login', AuthController.handleLogin);

// Rotas de signup
router.get('/signup', AuthController.renderSignup);
router.post('/signup', AuthController.handleSignup);

// Exporta o roteador
module.exports = router;
