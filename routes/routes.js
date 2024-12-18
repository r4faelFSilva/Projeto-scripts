const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/AuthController'); // Importa o controller

// Rota GET para a Home
router.get('/', AuthController.renderHome);

// Rota GET para a página de login
router.get('/login', AuthController.renderLogin);

// Rota POST para processar o login
router.post('/login', AuthController.handleLogin);

// Rota GET para a página de signup
router.get('/signup', AuthController.renderSignup);

// Rota POST para processar o signup
router.post('/signup', AuthController.handleSignup);

module.exports = router;
