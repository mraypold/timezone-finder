const expect = require('expect');
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
      properties: { TZID: 'America/Vancouver' },
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
      expect(featuresMapper(features, lng, lat)[0].properties.id).toNotExist();
    });

    test('FeatureCollectionMapper removes TZID property', () => {
      expect(featuresMapper(features, lng, lat)[0].properties.TZID).toNotExist();
    });
  });
});
