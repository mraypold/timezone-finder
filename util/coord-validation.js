'use strict';

module.exports = (function() {
  'use strict';

  /**
   * Returns true if a valid latitude.
   * @param {number} latitude A latitude to validate.
   * @returns {boolean} True if valid, else false.
   */
  const validateLatitude = function(latitude) {
    return latitude >= -90 && latitude <= 90;
  };

  /**
   * Returns true if a valid longitude.
   * @param {number} longitude A longitude to validate.
   * @returns {boolean} True if valid, else false.
   */
  const validateLongitude = function(longitude) {
    return longitude >= -180 && longitude <= 180;
  };

  return {
    validateLatitude: validateLatitude,
    validateLongitude: validateLongitude
  };
}());
