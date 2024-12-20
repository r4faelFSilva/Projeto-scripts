import express from 'express';
import path from 'path';
import routes from './routes/routes.js';
import sequelize from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3040;

// Sync database
sequelize.sync().then(() => {
  console.log('Database connected successfully.');
});

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

// Serve static files
app.use(express.static(path.join(path.resolve(), 'public')));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use routes
app.use('/', routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});