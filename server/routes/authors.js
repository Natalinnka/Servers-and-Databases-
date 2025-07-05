const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// GET all authors
router.get('/', async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.status(200).json(authors);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// GET author by ID
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).send('Author not found');
    res.status(200).json(author);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// POST create author
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send('Missing name');

    const newAuthor = await Author.create({ name });
    res.status(201).json(newAuthor);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// PUT update author
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const author = await Author.findByPk(req.params.id);

    if (!author) return res.status(404).send('Author not found');

    if (name) author.name = name;

    await author.save();
    res.status(200).json(author);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// DELETE author
router.delete('/:id', async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).send('Author not found');

    await author.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
