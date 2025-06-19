const express = require('express');
const router = express.Router();

// access to authors array
const { authors } = require('../data/data');

// GET /all authors
router.get('/', (req, res) => {
  try {
    res.status(200).json(authors);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// GET /authors/:id
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const author = authors.find(a => a.id === id);
    if (!author) return res.status(404).send('Author not found');
    res.status(200).json(author);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// POST /authors 
router.post('/', (req, res) => {
  try {
     const { name, books: bookTitles = [] } = req.body; 

    if (!name || !bookTitles) return res.status(400).send('Missing name or books');

    const newId = authors.length > 0 ? Math.max(...authors.map(a => a.id)) + 1 : 1;
    const newAuthor = {
      id: newId,
      name,
      books: bookTitles,
    };

    authors.push(newAuthor);
    res.status(201).json(newAuthor);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// PUT /authors/:id
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, books: bookTitles } = req.body;

    const author = authors.find(a => a.id === id);
    if (!author) return res.status(404).send('Author not found');

    if (name) author.name = name;
    if (bookTitles) author.books = bookTitles;

    res.status(200).json(author);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// DELETE /authors/:id
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = authors.findIndex(a => a.id === id);
    if (index === -1) return res.status(404).send('Author not found');

    authors.splice(index, 1);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});




/* TODO: End */
module.exports = router;