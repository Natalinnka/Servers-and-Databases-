const request = require('supertest');
const app = require('../../server');

describe('Books API', () => {
  it('should get all books', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a book by ID', async () => {
    const response = await request(app).get('/books/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Sherlock Holmes');
  });

  it('should return 404 for a non-existing book', async () => {
    const response = await request(app).get('/books/999');
    expect(response.status).toBe(404);
  });

  it('should add a new book', async () => {
    const newBook = { name: '1984', price: 9.99, author_id: 3 };
    const response = await request(app).post('/books').send(newBook);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', '1984');
  });

  it('should assign anonymous author if author_id is missing', async () => {
    const newBook = { name: 'Nameless Book', price: 10.99 };
    const response = await request(app).post('/books').send(newBook);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'Nameless Book');
    expect(response.body).toHaveProperty('author_id', 99);
  });


  it('should update an existing book by ID', async () => {
    const updatedBook = { name: 'Sherlock Holmes Updated', price: 21.99, author_id: 1 };
    const response = await request(app).put('/books/1').send(updatedBook);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Sherlock Holmes Updated');
    expect(response.body).toHaveProperty('price', 21.99);
  });

  it('should return 404 when trying to update a non-existent book', async () => {
    const updatedBook = { name: 'Non-existing book', price: 21.99, author_id: 444 };
    const response = await request(app).put('/books/999').send(updatedBook);
    expect(response.status).toBe(404);
  });

  it('should delete an existing book by ID', async () => {
    const response = await request(app).delete('/books/1');
    expect(response.status).toBe(204);
  });

  it('should return 404 when trying to delete a non-existent book', async () => {
    const response = await request(app).delete('/books/999');
    expect(response.status).toBe(404);
  });
});
