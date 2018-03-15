const { propertiesMapper } = require('../../util/mappers');

let lng;
let lat;
let features;

beforeEach(() => {
  lng = -123.329773;
  lat = 48.407326;

  features = [
    {
      type: 'Feature',
      properties: { tzid: 'America/Vancouver' },
      id: '33',
    },
  ];
});

describe('Mappers', () => {
  describe('propertiesMapper tests', () => {
    test('propertiesMapper maps a given array of geojson features with timezones and offsets', () => {
      const mappedFeatures = propertiesMapper(features, lng, lat);

      const expectedFeature = [{
        code: expect.stringMatching(/PDT|PST/),
        offset: expect.stringMatching(/-08:00|-07:00/),
        offset_seconds: expect.any(Number),
        coords: [
          -123.329773,
          48.407326,
        ],
        timezone: 'America/Vancouver',
        iso: expect.any(String),
        iso_day_of_week: expect.any(Number),
        iso_week_of_year: expect.any(Number),
        day_of_year: expect.any(Number),
        week_of_year: expect.any(Number),
        month_of_year: expect.any(Number),
        year: expect.any(Number),
        dst: expect.any(Boolean),
        leap: expect.any(Boolean),
      }];

      expect(mappedFeatures).toEqual(expect.arrayContaining(expectedFeature));
    });
  });
});
