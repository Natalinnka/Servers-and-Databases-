const request = require('supertest');
const app = require('../../server'); // Make sure your Express app is exported from this file

describe('Root Route', () => {
    it('should return current time as string', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(typeof response.text).toBe('string');
        expect(response.text).toMatch(/^Connected: /);
        const timePart = response.text.replace('Connected: ', '');
        expect(new Date(timePart).toString()).not.toBe('Invalid Date');
    });
});
