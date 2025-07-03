const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const morgan = require('morgan');
const { endPointNotFound } = require('./utils/middlewares');
require('dotenv').config();

//  Add Sequelize
const sequelize = require('./config/db');

// Enable CORS for all routes and methods
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const index = require('./routes/index');
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');

app.use('/', index)
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);

app.use(endPointNotFound);

module.exports = app;

async function init() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');

    if (process.env.TESTING !== 'true') {
      await sequelize.sync({ force: true }); 
      if (require.main === module) {
        console.log('✅ Tables synchronized via Sequelize.');
      }
    }

    if (require.main === module) {
      app.listen(port, () => {
        console.log(`🚀 Server is running at http://localhost:${port}`);
      });
    }
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

init();
