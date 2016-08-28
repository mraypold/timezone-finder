'use strict';

const expect = require('expect');
const latValidate = require('../../util/coord-validation').validateLatitude;
const lonValidate = require('../../util/coord-validation').validateLongitude;

describe('Longitude/Latitude Validation', function() {

  describe('Longitude Validation', function() {
    it('Returns true for a correct longitude', function() {
      expect(lonValidate(30)).toEqual(true);
    });

    it('Returns false for a high longitude', function() {
      expect(lonValidate(190)).toEqual(false);
    });

    it('Returns false for a low longitude', function() {
      expect(lonValidate(-190)).toEqual(false);
    });
  });

  describe('Latitude Validation', function() {
    it('Returns true for a correct latitude', function() {
      expect(latValidate(30)).toEqual(true);
    });

    it('Returns false for a high latitude', function() {
      expect(latValidate(100)).toEqual(false);
    });

    it('Returns false for a low latitude', function() {
      expect(latValidate(-100)).toEqual(false);
    });
  });

});
