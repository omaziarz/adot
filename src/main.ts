import { join } from 'path';
import { createHttpServer } from './http';
import { parseCSV } from './parser/csvParser';
import { CSVRow } from './types';

(async function main() {
  try {
    const data = await parseCSV<CSVRow>(join(__dirname, '..', 'data', 'events.csv'));

    const server = createHttpServer(data);

    server.listen(3100, () => {
      console.log('Server listening on port 3100');
    });
  } catch (e) {
    console.error(e);
  }
})();
