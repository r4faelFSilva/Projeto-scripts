exports.renderHome = (req, res) => {
  res.render('home', { title: 'Home - Bora F1' });
};

exports.renderLogin = (req, res) => {
  res.render('login', { title: 'Login - Bora F1' });
};

exports.handleLogin = (req, res) => {
  const { username, password } = req.body;

  // Simulação de validação de login
  if (username === 'admin' && password === '1234') {
    res.send('Login bem-sucedido!');
  } else {
    res.status(401).send('Credenciais inválidas!');
  }
};

exports.renderSignup = (req, res) => {
  res.render('signup', { title: 'Signup - Bora F1' });
};

exports.handleSignup = (req, res) => {
  const { username, email, cpf, password } = req.body;

  // Simulação de criação de usuário
  console.log(`Usuário criado: ${username}, Email: ${email}, CPF: ${cpf}`);
  res.send('Cadastro realizado com sucesso!');
};

const User = require('../models/User');

exports.renderSignup = (req, res) => {
    res.render('signup', { title: 'Cadastro - Bora F1' });
};

exports.handleSignup = async (req, res) => {
    const { username, email, cpf, password } = req.body;

    try {
        await User.create({
            username,
            email,
            cpf,
            password
        });

        res.send('Usuário cadastrado com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).send('Erro ao cadastrar usuário.');
    }
};

const User = require('../models/User');

exports.renderLogin = (req, res) => {
    res.render('login', { title: 'Login - Bora F1' });
};

exports.handleLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuário pelo email
        const user = await User.findOne({ where: { email } });

        // Verificar se o usuário existe e a senha está correta
        if (!user || user.password !== password) {
            return res.status(401).send('Credenciais inválidas! Verifique seu email e senha.');
        }

        res.send(`Login bem-sucedido! Bem-vindo, ${user.username}`);
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).send('Erro interno no servidor.');
    }
};
