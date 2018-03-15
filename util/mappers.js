const moment = require('moment-timezone');

module.exports = {
  /**
   * Adds timezone codes to a all properties for each feature in the feature collection.
   *
   * @param {object[]} features An array of GeoJson features.
   * @param {number} lng The longtitude to append to the response.
   * @param {number} lat The latitude to append to the response.
   * @returns {object} A collection of object literals with renamed properties.
   */
  propertiesMapper: (features, lng, lat) =>
    features.map((feature) => {
      const tz = moment().tz(feature.properties.tzid);

      return {
        code: tz.zoneAbbr(),
        offset: tz.format('Z'),
        offset_seconds: tz.utcOffset() * 60,
        coords: [
          parseFloat(lng),
          parseFloat(lat),
        ],
        timezone: feature.properties.tzid,
        iso: tz.toISOString(),
        iso_day_of_week: tz.isoWeekday(),
        iso_week_of_year: tz.isoWeek(),
        day_of_year: tz.dayOfYear(),
        week_of_year: tz.week(),
        month_of_year: tz.month(),
        year: tz.year(),
        dst: tz.isDST(),
        leap: tz.isLeapYear(),
      };
    }),
};

