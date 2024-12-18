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
