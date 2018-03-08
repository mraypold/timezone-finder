const expect = require('expect');
const latValidate = require('../../util/coord-validation').validateLatitude;
const lonValidate = require('../../util/coord-validation').validateLongitude;

describe('Longitude/Latitude Validation', () => {
  describe('Longitude Validation', () => {
    it('Returns true for a correct longitude', () => {
      expect(lonValidate(30)).toEqual(true);
    });

    it('Returns false for a high longitude', () => {
      expect(lonValidate(190)).toEqual(false);
    });

    it('Returns false for a low longitude', () => {
      expect(lonValidate(-190)).toEqual(false);
    });
  });

  describe('Latitude Validation', () => {
    it('Returns true for a correct latitude', () => {
      expect(latValidate(30)).toEqual(true);
    });

    it('Returns false for a high latitude', () => {
      expect(latValidate(100)).toEqual(false);
    });

    it('Returns false for a low latitude', () => {
      expect(latValidate(-100)).toEqual(false);
    });
  });
});
