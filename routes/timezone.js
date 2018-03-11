const express = require('express');
const cors = require('cors');
const { propertiesMapper } = require('../util/mappers');
const isPointRequest = require('../middleware/isPointRequest');

const router = express.Router();

// TODO maybe this should return a promise instead
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

    // TODO this probably shouldn't be returning an array of features... one timezone
    return res.json({ data: features });
  });
});

module.exports = router;
