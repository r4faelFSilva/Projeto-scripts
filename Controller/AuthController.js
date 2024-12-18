const usuario = require("../Models/User");

// Rendezirar página Home
exports.renderHome = (req, res) => {
  res.render("home", { title: "Home - Bora F1" });
};

// Renderizar página de Login
exports.renderLogin = (req, res) => {
  res.render("login", { title: "Login - Bora F1" });
};

// Processar Login


// Renderizar página de Signup
exports.renderSignup = (req, res) => {
  res.render("signup", { title: "Signup - Bora F1" });
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

    res.send("Usuário cadastrado com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).send("Erro ao cadastrar usuário.");
  }
};



exports.handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar usuário pelo email no banco
    const User = await usuario.findOne({ where: { username } });

    // Verificar credenciais
    if (!User || User.password !== password) {
      return res.status(401).send("Credenciais inválidas! Verifique seu email e senha.");
    }

    res.redirect('/home');
  } catch (error) {
    console.error("Erro ao fazer login:", error );
    res.status(500).send("Erro interno no servidor.", );
  }
};