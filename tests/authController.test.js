// tests/authController.test.js
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import { testaCPF } from '../Public/Js/signup.js';
import AuthController from '../Controller/AuthController.js';
import User from '../models/User.js';

jest.mock('bcryptjs');
jest.mock('../Public/Js/signup.js');
jest.mock('../models/User.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.post('/login', AuthController.userLogin);
app.post('/signup', AuthController.cadastrarUser);

describe('AuthController', () => {
  describe('userLogin', () => {
    it('should successfully log in a user with valid credentials', async () => {
      User.findOne.mockResolvedValue({ username: 'testuser', password: 'hashedpassword' });
      bcrypt.compareSync.mockReturnValue(true);

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'password' });

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe('/home');
    });

    it('should return an error for invalid credentials', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/login')
        .send({ username: 'wronguser', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.text).toContain('Invalid username or password.');
    });
  });

  describe('cadastrarUser', () => {
    it('should successfully register a user with valid data', async () => {
      testaCPF.mockReturnValue(true);
      bcrypt.hashSync.mockReturnValue('hashedpassword');
      User.create.mockResolvedValue({});

      const response = await request(app)
        .post('/signup')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          cpf: '12345678909',
          password: 'password',
          confirmPassword: 'password',
        });

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe('/login');
    });

    it('should return an error for invalid CPF', async () => {
      testaCPF.mockReturnValue(false);

      const response = await request(app)
        .post('/signup')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          cpf: 'invalidcpf',
          password: 'password',
          confirmPassword: 'password',
        });

      expect(response.status).toBe(200);
      expect(response.text).toContain('Invalid CPF.');
    });

    it('should return an error for non-matching passwords', async () => {
      testaCPF.mockReturnValue(true);

      const response = await request(app)
        .post('/signup')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          cpf: '12345678909',
          password: 'password1',
          confirmPassword: 'password2',
        });

      expect(response.status).toBe(200);
      expect(response.text).toContain('Passwords do not match.');
    });

    it('should handle SequelizeUniqueConstraintError', async () => {
      testaCPF.mockReturnValue(true);
      bcrypt.hashSync.mockReturnValue('hashedpassword');
      User.create.mockRejectedValue({ name: 'SequelizeUniqueConstraintError', fields: 'username' });

      const response = await request(app)
        .post('/signup')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          cpf: '12345678909',
          password: 'password',
          confirmPassword: 'password',
        });

      expect(response.status).toBe(200);
      expect(response.text).toContain('The username is already in use.');
    });
  });
});