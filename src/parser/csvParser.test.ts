import { join } from 'node:path';
import { parseCSV } from './csvParser';

describe('csvParser', () => {
  test('should parse a csv file', async () => {
    const path = join(__dirname, '../..', 'data', 'events.csv');

    expect((await parseCSV(path)).length).toBeGreaterThan(0);
  });

  test('should throw an error if the file extension is not .csv', async () => {
    const path = join(__dirname, '../..', 'data', 'events.json');

    await expect(parseCSV(path)).rejects.toThrowError('invalid file extension');
  });
});
