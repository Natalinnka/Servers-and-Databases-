const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.findAll({ include: Author });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// GET book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, { include: Author });
    if (!book) return res.status(404).send('Book not found');
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// POST create new book
router.post('/', async (req, res) => {
  try {
    const { name, price, author_id } = req.body;
    if (!name || !price)
      return res.status(400).send('Missing name or price');
    const usedAuthorId = author_id || 999; // 👈 if not sended, it will be 999
    const author = await Author.findByPk(usedAuthorId);
    if (!author) return res.status(404).send('Author not found');

    const newBook = await Book.create({ name, price, author_id: usedAuthorId});

    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


// PUT update book
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');

    const { name, price, author_id } = req.body;

    if (name) book.name = name;
    if (price) book.price = price;

    if (author_id) {
      const author = await Author.findByPk(author_id);
      if (!author) return res.status(404).send('Author not found');
      book.author_id = author_id;
    }

    await book.save();
    res.status(200).json({
      ...book.toJSON(),
      price: parseFloat(book.price)
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// DELETE book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');

    await book.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
