'use strict';

var express = require('express');
var router = express.Router();
const latValidate = require('../util/coord-validation').validateLatitude;
const lngValidate = require('../util/coord-validation').validateLongitude;
const featuresMapper = require('../util/mappers').featuresMapper;

/**
 * Returns GeoJSON if the requested coordinates are within a timezone, else a 400 error.
 *
 * Url parameters are lng and lat, representing longitude and latitude.
 * @returns {object} A response object
 */
router.get('/', function(req, res, next) {
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

  const point = {
    "type": "Point",
    "coordinates": [lng, lat]
  };

  req.timezoneStore.contains(point, function(error, features) {

    if (error) {
      return res.status(500);
    }

    if (features) {
      // Adds the timezone code and formats the response we are expecting.
      features = featuresMapper(features, lng, lat);
    }

    res.json(features);
  });

});

module.exports = router;
