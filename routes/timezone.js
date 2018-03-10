const express = require('express');
const latValidate = require('../util/coord-validation').validateLatitude;
const lngValidate = require('../util/coord-validation').validateLongitude;
const { featuresMapper } = require('../util/mappers');
const { propertiesMapper } = require('../util/mappers');

const router = express.Router();

// TODO maybe this should return a promise instead
function queryPoint(req, lng, lat, cb) {
  const point = {
    type: 'Point',
    coordinates: [lng, lat],
  };

  req.timezoneStore.contains(point, cb);
}

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.use((req, res, next) => {
  const lng = req.query.lng;
  const lat = req.query.lat;

  // Return 400 Bad Request if missing longitude or latitude
  if (lng === undefined || lat === undefined) {
    return res.status(400).send('Missing longitude or latitude values');
  }

  // Return 400 Bad Request if malformed longitude or latitude values
  if (!lngValidate(lng) || !latValidate(lat)) {
    return res.status(400).send('Malformed longitude or latitude values');
  }

  return next();
});

/**
 * Returns GeoJSON if the requested coordinates are within a timezone, else a 400 error.
 *
 * Url parameters are lng and lat, representing longitude and latitude.
 * @returns {object} A response object
 */
router.get('/geoJSON', (req, res) => {
  const lng = req.query.lng;
  const lat = req.query.lat;
  const timestamp = req.query.timestamp;

  queryPoint(req, lng, lat, (error, features) => {
    if (error) {
      return res.status(500);
    }

    if (features) {
      // Adds the timezone code and formats the response we are expecting.
      features = featuresMapper(features, lng, lat, timestamp);
    }

    return res.json(features);
  });
});

/**
 * Returns JSON if the requested coordinates are within a timezone, else a 400 error.
 *
 * Url parameters are lng and lat, representing longitude and latitude.
 * @returns {object} A response object
 */
router.get(['/json', '/'], (req, res) => {
  const lng = req.query.lng;
  const lat = req.query.lat;
  const timestamp = req.query.timestamp;

  queryPoint(req, lng, lat, (error, features) => {
    if (error) {
      return res.status(500);
    }

    if (features) {
      // Adds the timezone code and formats the response we are expecting.
      features = propertiesMapper(features, lng, lat, timestamp);
    }

    return res.json(features);
  });
});

module.exports = router;
