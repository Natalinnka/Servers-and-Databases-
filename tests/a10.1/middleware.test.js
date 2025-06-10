const request = require('supertest');
const app = require('../../server');


describe('Middleware and Error Handling', () => {
  it('should use the logger middleware', async () => {
    let logOutput = '';
    const originalStdoutWrite = process.stdout.write.bind(process.stdout);

    // Redirect Morgan's output to a string
    process.stdout.write = (chunk) => {
      logOutput += chunk;
      return true;
    };
    const response = await request(app).get('/books');

    process.stdout.write = originalStdoutWrite;
    console.log(JSON.stringify(logOutput));

    expect(logOutput.startsWith('\u001b[0mGET /books \u001b[32m200\u001b[0m')).toBe(true);

  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
  });
});
