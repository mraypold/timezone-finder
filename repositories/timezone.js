const { GeoStore } = require('terraformer-geostore');
const { RTree } = require('terraformer-rtree');
const { Memory } = require('terraformer-geostore-memory');
const timezones = require('../data/timezones.json');

/**
 * Creates a new store for handling quering GeoJson collections.
 */
const store = new GeoStore({
  store: new Memory(),
  index: new RTree(),
});

/**
 * Adds an id property to each feature in the featureCollection.
 *
 * Terraformer GeoStore expects an id property for each feature in the feature collection.
 * @param {object} collection
 * @return {object} The modified collection
 */
function addIdToFeatureCollection(collection) {
  let id = 0;

  collection.features.map((feature) => {
    feature.id = (id += 1).toString(); // Terraformer library throws errors if id is a number.
    return feature;
  });

  return collection;
}

/**
 * Inserts a GeoJson object into the Terraformer memory store if it exists.
 *
 * @param {object} collection A GeoJson collection read from the shapefile.
 * @return {undefined}
 */
function addShapefileCollectionToStore(collection) {
  const collectionWithId = addIdToFeatureCollection(collection);

  store.add(collectionWithId, (err, res) => {
    if (err) {
      console.error('Unable to load the timezone repositry GeoJSON!');
      console.error(err);
      process.exit(1);
    }

    if (res) {
      console.info('Loaded the timezone repository.');
    }
  });
}

addShapefileCollectionToStore(timezones);

module.exports = store;
