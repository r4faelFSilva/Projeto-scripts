exports.loginPage = (req, res) => {
    res.render('login', { title: 'F1 Login' });
  };
  
  exports.handleLogin = (req, res) => {
    const { username, password } = req.body;
  
    // Simulação de validação
    if (username === 'admin' && password === '1234') {
      return res.send('Login bem-sucedido!');
    }
  
    res.status(401).send('Credenciais inválidas.');
  };
  