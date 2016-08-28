'use strict';

const expect = require('expect');
const featuresMapper = require('../../util/mappers').featuresMapper;

let lng;
let lat;
let features;

beforeEach(function() {
  lng = -123.329773;
  lat = 48.407326;

  features = [
    {
      type: "Feature",
      properties: { TZID: 'America/Vancouver' },
      id: '33'
    }
  ];
});

describe('Mappers', function() {

  describe('Feature Collection', function() {
    it('FeatureCollectionMapper adds timezone code property', function() {
      expect(featuresMapper(features, lng, lat)[0].properties.code).toEqual("PDT");
    });

    it('FeatureCollectionMapper adds coord property', function() {
      expect(featuresMapper(features, lng, lat)[0].properties.coords).toEqual([lng, lat]);
    });

    it('FeatureCollectionMapper removes id property', function() {
      expect(featuresMapper(features, lng, lat)[0].properties.id).toNotExist();
    });

    it('FeatureCollectionMapper removes TZID property', function() {
      expect(featuresMapper(features, lng, lat)[0].properties.TZID).toNotExist();
    });
  });

});
