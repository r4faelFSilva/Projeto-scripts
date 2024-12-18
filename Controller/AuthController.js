const User = require('../models/User');

// Rendezirar página Home
exports.renderHome = (req, res) => {
    res.render('home', { title: 'Home - Bora F1' });
};

// Renderizar página de Login
exports.renderLogin = (req, res) => {
    res.render('login', { title: 'Login - Bora F1' });
};

// Processar Login
exports.handleLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuário pelo email no banco
        const user = await User.findOne({ where: { email } });

        // Verificar credenciais
        if (!user || user.password !== password) {
            return res.status(401).send('Credenciais inválidas! Verifique seu email e senha.');
        }

        res.send(`Login bem-sucedido! Bem-vindo, ${user.username}`);
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).send('Erro interno no servidor.');
    }
};

// Renderizar página de Signup
exports.renderSignup = (req, res) => {
    res.render('signup', { title: 'Signup - Bora F1' });
};

// Processar Signup
exports.handleSignup = async (req, res) => {
    const { username, email, cpf, password } = req.body;

    try {
        // Criar usuário no banco de dados
        await User.create({
            username,
            email,
            cpf,
            password,
        });

        res.send('Usuário cadastrado com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).send('Erro ao cadastrar usuário.');
    }
};
