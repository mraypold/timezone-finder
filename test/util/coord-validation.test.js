const { validateLatitude, validateLongitude } = require('../../util/coord-validation');

describe('Longitude/Latitude Validation', () => {
  describe('Longitude Validation', () => {
    test('Returns true for a correct longitude', () => {
      expect(validateLongitude(30)).toEqual(true);
    });

    test('Returns false for a high longitude', () => {
      expect(validateLongitude(190)).toEqual(false);
    });

    test('Returns false for a low longitude', () => {
      expect(validateLongitude(-190)).toEqual(false);
    });
  });

  describe('Latitude Validation', () => {
    test('Returns true for a correct latitude', () => {
      expect(validateLatitude(30)).toEqual(true);
    });

    test('Returns false for a high latitude', () => {
      expect(validateLatitude(100)).toEqual(false);
    });

    test('Returns false for a low latitude', () => {
      expect(validateLatitude(-100)).toEqual(false);
    });
  });
});
