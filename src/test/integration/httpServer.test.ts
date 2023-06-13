import { createHttpServer } from '../../http';

describe('httpServer', () => {
  test('should start an http server', () => {
    const server = createHttpServer([]);

    server.listen(3000);

    expect(server.listening).toBe(true);

    server.close();
  });

  test('should return a 404 if the route does not exist', async () => {
    const server = createHttpServer([]);

    server.listen(3000);

    const response = await fetch('http://localhost:3000/invalid-route');

    expect(response.status).toBe(404);

    server.close();
  });

  test('should return 200 when calling POST /poi with valid body', async () => {
    const server = createHttpServer([]);

    server.listen(3000);

    const response = await fetch('http://localhost:3000/poi', {
      method: 'POST',
      body: JSON.stringify({
        name: 'test',
        lat: 1,
        lon: 1,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.status).toBe(200);

    server.close();
  });
});
