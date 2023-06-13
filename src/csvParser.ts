import { parse } from '@fast-csv/parse';
import { createReadStream } from 'fs';

export async function parseCSV<T extends Record<string, any>>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath, { encoding: 'utf8' }).pipe(parse({ headers: true, delimiter: ',' }));

    const data: T[] = [];

    stream.on('error', error => reject(error));
    stream.on('data', row => data.push(row));
    stream.on('end', () => resolve(data));
  })
  
 
}
