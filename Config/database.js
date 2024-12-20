import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('userTable', 'user', 'user', {
  dialect: 'sqlite',
  storage: './boraf1DB.sqlite', // Use 'storage' instead of 'host'
});

// Export the sequelize instance to be used in other parts of the application
export default sequelize;