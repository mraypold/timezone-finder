const { featuresMapper } = require('../../util/mappers');

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
  describe('Feature Collection', () => {
    test('FeatureCollectionMapper adds timezone code property', () => {
      expect(['PST', 'PDT']).toContain(featuresMapper(features, lng, lat)[0].properties.code);
    });

    test('FeatureCollectionMapper adds coord property', () => {
      expect(featuresMapper(features, lng, lat)[0].properties.coords).toEqual([lng, lat]);
    });

    test('FeatureCollectionMapper removes id property', () => {
      expect(featuresMapper(features, lng, lat)[0].properties.id).toBe(undefined);
    });

    test('FeatureCollectionMapper removes TZID property', () => {
      expect(featuresMapper(features, lng, lat)[0].properties.TZID).toBe(undefined);
    });
  });
});
