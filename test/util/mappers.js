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
    it('FeatureCollectionMapper adds timezone code property', () => {
      expect(['PST', 'PDT']).toContain(featuresMapper(features, lng, lat)[0].properties.code);
    });

    it('FeatureCollectionMapper adds coord property', () => {
      expect(featuresMapper(features, lng, lat)[0].properties.coords).toEqual([lng, lat]);
    });

    it('FeatureCollectionMapper removes id property', () => {
      expect(featuresMapper(features, lng, lat)[0].properties.id).toNotExist();
    });

    it('FeatureCollectionMapper removes TZID property', () => {
      expect(featuresMapper(features, lng, lat)[0].properties.TZID).toNotExist();
    });
  });
});
