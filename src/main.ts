import { join } from 'path';
import { createHttpServer } from './http';
import { parseCSV } from './parser/csvParser';
import { CSVRow } from './types';

const PORT = process.env.PORT ? +process.env.PORT : 3000;

(async function main() {
  try {
    const data = await parseCSV<CSVRow>(join(__dirname, '..', 'data', 'events.csv'));

    const server = createHttpServer(data);

    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
})();
