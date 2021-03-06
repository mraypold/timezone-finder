const express = require('express');
const cors = require('cors');
const { propertiesMapper } = require('../util/mappers');
const isPointRequest = require('../middleware/isPointRequest');

const router = express.Router();

/**
 * Queries the timezone repository for the given longitude and latitude.
 *
 * @param {object} req A node http request
 * @param {number} lng A longitude
 * @param {number} lat A latitude
 * @param {function} cb The callback to return with and error or geojson features.
 */
function queryPoint(req, lng, lat, cb) {
  const point = {
    type: 'Point',
    coordinates: [lng, lat],
  };

  req.timezoneRepository.contains(point, cb);
}

/**
 * Returns JSON if the requested coordinates are within a timezone, else a 400 error.
 *
 * Url parameters are lng and lat, representing longitude and latitude.
 * @returns {object} A response object
 */
router.get('/', cors(), isPointRequest, (req, res) => {
  const lng = req.query.lng;
  const lat = req.query.lat;

  queryPoint(req, lng, lat, (error, features) => {
    if (error) {
      return res.status(500);
    }

    if (features) {
      // Adds the timezone code and formats the response we are expecting.
      features = propertiesMapper(features, lng, lat);
    }

    return res.json({ data: features[0] });
  });
});

module.exports = router;
