const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const morgan = require('morgan');
const { endPointNotFound } = require('./utils/middlewares');

// add necessary imports below: Morgan and endPointNotFound

// Enable CORS for all routes and methods
app.use(cors());
// Middleware to parse JSON bodies
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

async function init() { // async for future additions below
  if (require.main === module) {
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  }
}

init();
