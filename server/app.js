const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { endPointNotFound } = require('./utils/middlewares');
require('dotenv').config();

const app = express();
const sequelize = require('./config/db');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const index = require('./routes/index');
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');

app.use('/', index);
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);

// Unknown endpoint
app.use(endPointNotFound);

module.exports = { app, sequelize };


