import { join } from 'path';
import { parseCSV } from "./csvParser";
import { createHttpServer } from './http';
import { CSVRow } from './types';

(async function main() {
  const data = await parseCSV<CSVRow>(join(__dirname, '..', 'data', 'events.csv'));

  const server = createHttpServer(data);

  server.listen(3100, () => {
    console.log('Server listening on port 3100');
  });
})()