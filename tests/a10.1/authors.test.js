const request = require('supertest');
const app = require('../../server');

describe('Authors API', () => {
  it('should get all authors', async () => {
    const response = await request(app).get('/authors');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get an author by ID', async () => {
    const response = await request(app).get('/authors/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Arthur Conan Doyle');
  });

  it('should return 404 for a non-existing author', async () => {
    const response = await request(app).get('/authors/999');
    expect(response.status).toBe(404);
  });

  it('should add a new author', async () => {
    const newAuthor = { name: 'George Orwell' };
    const response = await request(app).post('/authors').send(newAuthor);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'George Orwell');
  });

  it('should update an existing author by ID', async () => {
    const updatedAuthor = { name: 'Arthur Conan Doyle Updated' };
    const response = await request(app).put('/authors/1').send(updatedAuthor);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Arthur Conan Doyle Updated');
  });

  it('should return 404 when trying to update a non-existent author', async () => {
    const updatedAuthor = { name: 'Arthur Conan Doyle Updated' };
    const response = await request(app).put('/authors/999').send(updatedAuthor);
    expect(response.status).toBe(404);
  });


  it('should delete an existing author by ID', async () => {
    const response = await request(app).delete('/authors/1');
    expect(response.status).toBe(204);
  });

  it('should return 404 when trying to delete a non-existent author', async () => {
    const response = await request(app).delete('/authors/999');
    expect(response.status).toBe(404);
  });

});
