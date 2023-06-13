import haversine from 'haversine';
import { CSV, CSVRow } from '../types';

interface Filter {
  lat: number;
  lon: number;
  name: string;
}

interface Result extends Filter {
  impressions: number;
  clicks: number;
}

function isInRange(row: CSVRow, filter: Filter) {
  return haversine(
    { latitude: +row.lat, longitude: +row.lon },
    { latitude: filter.lat, longitude: filter.lon },
    { unit: 'meter', threshold: 500 }
  );
}

export function search(data: CSV, filters: Filter[]) {
  const result: Result[] = [];

  for (let i = 0; i < filters.length; i++) {
    result[i] = Object.assign(filters[i], { impressions: 0, clicks: 0 });
  }

  const dataLength = data.length;
  const filterLength = filters.length;
  for (let i = 0; i < dataLength; i++) {
    const value = data[i];

    for (let j = 0; j < filterLength; j++) {
      if (isInRange(value, filters[j])) {
        if (value.event_type === 'imp') {
          result[j].impressions++;
        }

        if (value.event_type === 'click') {
          result[j].clicks++;
        }
      }
    }
  }

  return result;
}
