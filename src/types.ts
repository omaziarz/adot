type event_type = 'imp' | 'click';
export interface CSVRow {
  lat: string;
  lon: string;
  event_type: event_type;
}

export type CSV = CSVRow[];
