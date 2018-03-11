const moment = require('moment-timezone');

// TODO we really need better tests here

module.exports = {
  /**
   * Adds timezone codes to a all properties for each feature in the feature collection.
   *
   * @param {object[]} features An array of GeoJson features.
   * @param {number} lng The longtitude to append to the response.
   * @param {number} lat The latitude to append to the response.
   * @returns {object} A GeoJSON feature with timezone support and renamed properties.
   */
  featuresMapper: (features, lng, lat, timestamp) => {
    features.map((feature) => {
      const tz = timestamp
        ? moment.tz(`${timestamp}`, 'X', feature.properties.tzid)
        : moment().tz(feature.properties.tzid);

      // Get the timezone abbreviation
      feature.properties.code = tz.zoneAbbr();

      // Get the timezone offset
      feature.properties.offset = tz.format('Z');

      // Get the timezone offset in minutes
      feature.properties.offset_seconds = tz.utcOffset() * 60;

      // Return the original requested coordinates
      feature.properties.coords = [lng, lat];

      // Rename TZID to timezone
      feature.properties.timezone = feature.properties.tzid;
      delete feature.properties.tzid;

      // Remove unnecessary id which is only needed by Terraformer.
      delete feature.id;

      return feature;
    });

    return features;
  },

  /**
   * Adds timezone codes to a all properties for each feature in the feature collection.
   *
   * @param {object[]} features An array of GeoJson features.
   * @param {number} lng The longtitude to append to the response.
   * @param {number} lat The latitude to append to the response.
   * @param {string} timestamp The time for determining daylight savings time
   * @returns {object} A collection of object literals with renamed properties.
   */
  propertiesMapper: (features, lng, lat, timestamp) =>
    features.map((feature) => {
      const tz = timestamp
        ? moment.tz(`${timestamp}`, 'X', feature.properties.tzid)
        : moment().tz(feature.properties.tzid);

      return {
        code: tz.zoneAbbr(),
        offset: tz.format('Z'),
        offset_seconds: tz.utcOffset() * 60,
        coords: [lng, lat],
        timezone: feature.properties.tzid,
      };
    }),
};

