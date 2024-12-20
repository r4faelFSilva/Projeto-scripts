import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { testaCPF } from '../Public/Js/signup.js'; // Import the CPF validation function

class AuthController {
  static async userLogin(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.render('login', { error: 'Invalid username or password.' });
      }

      res.redirect('/home');
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).render('login', { error: 'Internal server error.' });
    }
  }

  static async cadastrarUser(req, res) {
    const { username, email, cpf, password, confirmPassword } = req.body;

    // Validate CPF
    if (!testaCPF(cpf)) {
      return res.render('signup', { error: 'Invalid CPF.' });
    }

    // Validate password
    if (password !== confirmPassword) {
      return res.render('signup', { error: 'Passwords do not match.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      await User.create({
        username,
        email,
        cpf,
        password: hashedPassword,
      });

      res.redirect('/login');
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.render('signup', { error: `The ${error.fields} is already in use.` });
      }
      console.error('Error during user registration:', error);
      res.status(500).render('signup', { error: 'Error during user registration.' });
    }
  }
}

export default AuthController;