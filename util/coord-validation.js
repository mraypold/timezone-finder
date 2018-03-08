module.exports = {
  /**
   * Returns true if a valid latitude.
   * @param {number} latitude A latitude to validate.
   * @returns {boolean} True if valid, else false.
   */
  validateLatitude: latitude => latitude >= -90 && latitude <= 90,

  /**
   * Returns true if a valid longitude.
   * @param {number} longitude A longitude to validate.
   * @returns {boolean} True if valid, else false.
   */
  validateLongitude: longitude => longitude >= -180 && longitude <= 180,
};
