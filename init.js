const { sequelize } = require('./models');

(async () => {
  try {
    await sequelize.sync({ alter: true }); // Use `force: true` to drop tables and recreate
    console.log('Database synchronized successfully!');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
})();