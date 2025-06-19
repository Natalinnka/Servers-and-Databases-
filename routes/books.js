const express = require('express');
const router = express.Router();
const { books, authors } = require('../data/data');

 
router.get('/', (req, res) => { // Get all books
  try {
    res.status(200).json(books);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/:id', (req, res) => { // Get one book by ID
  try {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).send('Book not found');
    res.status(200).json(book);
    
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


router.post('/', (req, res) => {   //  Add a new book
  try { 
    const { name, price, author_id } = req.body;

    if (!name || !price) return res.status(400).send('Missing name or price');

    const validAuthor = authors.find(a => a.id === author_id);
    const assignedAuthorId = validAuthor ? author_id : 99;

    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    const newBook = { id: newId, name, price, author_id: assignedAuthorId };

    books.push(newBook);
    res.status(201).json(newBook);

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.put('/:id', (req, res) => { // Update a book by ID
  try {
    const id = parseInt(req.params.id);
    const { name, price, author_id } = req.body;

    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).send('Book not found');

    if (name) book.name = name;
    if (price) book.price = price;
    if (author_id) {
      const validAuthor = authors.find(a => a.id === author_id);
      book.author_id = validAuthor ? author_id : 99;
}


    res.status(200).json(book);

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', (req, res) => { // Delete a book by ID
  try { 
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return res.status(404).send('Book not found');

    books.splice(index, 1);
    res.sendStatus(204);

  } catch (error) { 
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
