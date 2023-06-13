import { createServer } from 'node:http';
import { search } from './search/search';
import { CSV } from './types';

export function createHttpServer(data: CSV) {
  return createServer((req, res) => {
    if (req.url === '/poi' || req.method === 'POST') {
      const body: any[] = [];
      req.on('data', chunk => {
        body.push(chunk);
      });

      req.on('end', () => {
        const bodyJson = JSON.parse(Buffer.concat(body).toString());

        console.log(bodyJson);

        const result = search(data, bodyJson);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      });

      req.on('error', err => {
        console.log(err);
        res.statusCode = 500;
        res.end();
      });
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
}
