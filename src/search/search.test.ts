import { CSV } from '../types';
import { search } from './search';

describe('search', () => {
  test('should return incremented impressions and clicks when filter coordinates are close', () => {
    const filters = [
      {
        lat: 48.924444659009424,
        lon: 2.360107222611704,
        name: 'Stade de France',
      },
    ];

    const data = [
      {
        lat: '48.926385855626506',
        lon: '2.3617728742924573',
        event_type: 'imp',
      },
      {
        lat: '48.92351303109413',
        lon: '2.35552145760203',
        event_type: 'click',
      },
    ] satisfies CSV;

    const result = search(data, filters);

    const expectedResult = result;
    result[0].impressions = 1;
    result[0].clicks = 1;

    expect(result).toEqual(expectedResult);
  }),
    test('should return 0 impressions and clicks when filter coordinates are 500m+ away', () => {
      const filters = [
        {
          lat: 48.86071671456969,
          lon: 2.2950322812135218,
          name: 'Tour Eiffel',
        },
      ];

      const data = [
        {
          lat: '48.926385855626506',
          lon: '2.3617728742924573',
          event_type: 'imp',
        },
        {
          lat: '48.92351303109413',
          lon: '2.35552145760203',
          event_type: 'click',
        },
      ] satisfies CSV;

      const result = search(data, filters);

      const expectedResult = result;
      result[0].impressions = 0;
      result[0].clicks = 0;

      expect(result).toEqual(expectedResult);
    }),
    test('should return 0 impressions and clicks data is empty', () => {
      const filters = [
        {
          lat: 48.86071671456969,
          lon: 2.2950322812135218,
          name: 'Tour Eiffel',
        },
      ];

      const data = [] satisfies CSV;

      const result = search(data, filters);

      const expectedResult = result;
      result[0].impressions = 0;
      result[0].clicks = 0;

      expect(result).toEqual(expectedResult);
    });
});
