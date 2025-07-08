const { app, sequelize } = require('./app');
const port = process.env.PORT || 3000; //was const port = 3000;

async function init() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');

    if (process.env.TESTING !== 'true') {
      await sequelize.sync();
      console.log('✅ Tables synchronized via Sequelize.');
    }

    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

init();

