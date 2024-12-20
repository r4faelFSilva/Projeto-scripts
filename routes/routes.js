import express from 'express';
import AuthController from '../Controller/AuthController.js'

const router = express.Router();

// Authentication Routes
router.get('/login', (req, res) => res.render('login'));
router.post('/login', AuthController.userLogin);

// Signup Routes
router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', AuthController.cadastrarUser);
// Home Route
router.get('/home', (req, res) => res.render('home'));
router.get('/', (req, res) => res.render('home'));

export default router;