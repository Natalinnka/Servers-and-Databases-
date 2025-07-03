const request = require('supertest');
const app = require('../../server');
const sequelize  = require('../../config/db');

const Author = require('../../models/Author');
const Book = require('../../models/Book');

beforeAll(async () => {
    await sequelize.sync({ force: true });
    await Author.create({ id: 999, name: 'Anonymous' });
});

afterAll(async () => {
    await sequelize.truncate({ cascade: true });
    await sequelize.close();
});

describe('Sequelize-backed Author & Book routes (no in-memory data allowed)', () => {
    // ─── AUTHORS ────────────────────────────────────────
    it('POST /authors and GET /authors/:id should use DB, not arrays', async () => {
        const createRes = await request(app).post('/authors').send({ name: 'Test Author' });
        expect(createRes.status).toBe(201);
        expect(createRes.body).toHaveProperty('name', 'Test Author');

        const getRes = await request(app).get(`/authors/${createRes.body.id}`);
        expect(getRes.status).toBe(200);
        expect(getRes.body.name).toBe('Test Author');
    });

    it('PUT /authors/:id should persist changes in the DB', async () => {
        const author = await Author.create({ name: 'Temporary Name' });

        const updateRes = await request(app).put(`/authors/${author.id}`).send({ name: 'Updated Name' });
        expect(updateRes.status).toBe(200);
        expect(updateRes.body.name).toBe('Updated Name');

        const refetch = await Author.findByPk(author.id);
        expect(refetch.name).toBe('Updated Name');
    });

    it('DELETE /authors/:id should remove from DB', async () => {
        const author = await Author.create({ name: 'Will Be Deleted' });

        const deleteRes = await request(app).delete(`/authors/${author.id}`);
        expect(deleteRes.status).toBe(204);

        const refetch = await Author.findByPk(author.id);
        expect(refetch).toBeNull();
    });

    // ─── BOOKS ──────────────────────────────────────────
    it('POST /books creates and GET /books/:id retrieves from DB', async () => {
        const author = await Author.create({ name: 'Book Author' });

        const createRes = await request(app).post('/books').send({
            name: 'Sequelize Book',
            price: 10.0,
            author_id: author.id
        });

        expect(createRes.status).toBe(201);
        expect(createRes.body.name).toBe('Sequelize Book');

        const getRes = await request(app).get(`/books/${createRes.body.id}`);
        expect(getRes.status).toBe(200);
        expect(getRes.body.name).toBe('Sequelize Book');
    });

    it('POST /books without author_id defaults to Anonymous (id 999)', async () => {
        const res = await request(app).post('/books').send({
            name: 'Nameless Sequelize Book',
            price: 12.5
        });

        expect(res.status).toBe(201);
        expect(res.body.author_id).toBe(999);
    });

    it('PUT /books/:id persists price update in DB', async () => {
        const author = await Author.create({ name: 'Updater' });
        const book = await Book.create({ name: 'Original', price: 5.0, author_id: author.id });

        const res = await request(app).put(`/books/${book.id}`).send({ price: 8.0 });
        expect(res.status).toBe(200);
        expect(res.body.price).toBe(8.0);

        const refetch = await Book.findByPk(book.id);
        expect(refetch.price).toBe(8.0);
    });

    it('DELETE /books/:id removes book from DB', async () => {
        const author = await Author.create({ name: 'Deleter' });
        const book = await Book.create({ name: 'Trash Book', price: 6.0, author_id: author.id });

        const res = await request(app).delete(`/books/${book.id}`);
        expect(res.status).toBe(204);

        const refetch = await Book.findByPk(book.id);
        expect(refetch).toBeNull();
    });
});
