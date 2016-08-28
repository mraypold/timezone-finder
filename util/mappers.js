'use strict';

const moment = require('moment-timezone');

module.exports = (function() {
  'use strict';

  /**
   * Adds timezone codes to a all properties for each feature in the feature collection.
   *
   * @param {object[]} features An array of GeoJson features.
   * @param {number} lng The longtitude to append to the response.
   * @param {number} lat The latitude to append to the response.
   * @returns {object} A GeoJSON feature with timezone support and renamed properties.
   */
  const featuresMapper = function(features, lng, lat) {
    features.map(feature => {

      // Get the timezone abbreviation
      feature.properties.code = moment().tz(feature.properties.TZID).zoneAbbr();

      // Return the original requested coordinates
      feature.properties.coords = [lng, lat];

      // Rename TZID to timezone
      feature.properties.timezone = feature.properties.TZID;
      delete feature.properties.TZID;

      // Remove unnecessary id which is only needed by Terraformer.
      delete feature.id;
    });

    return features;
  };

  return {
    featuresMapper: featuresMapper
  };
}());
