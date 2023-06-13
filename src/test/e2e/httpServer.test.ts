import { createHttpServer } from '../../http';
import { parseCSV } from '../../parser/csvParser';
import { CSVRow } from '../../types';

describe('httpServer e2e', () => {
  test('should start an http server', async () => {
    const data = await parseCSV<CSVRow>('data/events.csv');

    const server = createHttpServer(data);

    server.listen(3000);

    expect(server.listening).toBe(true);

    server.close();
  });

  test('should return a 404 if the route does not exist', async () => {
    const data = await parseCSV<CSVRow>('data/events.csv');

    const server = createHttpServer(data);

    server.listen(3000);

    const response = await fetch('http://localhost:3000/invalid-route');

    expect(response.status).toBe(404);

    server.close();
  });

  test('should return 200 when calling POST /poi with valid body', async () => {
    const data = await parseCSV<CSVRow>('data/events.csv');

    const server = createHttpServer(data);

    server.listen(3000);

    const response = await fetch('http://localhost:3000/poi', {
      method: 'POST',
      body: JSON.stringify([
        {
          lat: 48.86,
          lon: 2.35,
          name: 'Chatelet',
        },
        {
          lat: 48.8759992,
          lon: 2.3481253,
          name: 'Arc de triomphe',
        },
      ]),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.status).toBe(200);
    expect((await response.json()).length).toBe(2);

    server.close();
  });
});
