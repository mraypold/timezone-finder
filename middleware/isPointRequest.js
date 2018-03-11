const { validateLatitude } = require('../util/coord-validation');
const { validateLongitude } = require('../util/coord-validation');

/**
 * Returns a 400 error if the given req does not contain a latitude or longitude.
 * Returns a 422 error if the latitude or longitude are malformed.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
module.exports = ((req, res, next) => {
  const lng = req.query.lng;
  const lat = req.query.lat;

  // Return 400 Bad Request if missing longitude or latitude
  if (lng === undefined || lat === undefined) {
    return res.status(400).send('Missing longitude or latitude values');
  }

  // Return 422 Bad Request if malformed longitude or latitude values
  if (!validateLongitude(lng) || !validateLatitude(lat)) {
    return res.status(422).send('Malformed longitude or latitude values');
  }

  return next();
});
