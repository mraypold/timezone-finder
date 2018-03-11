const shapefile = require('shapefile');
const { GeoStore } = require('terraformer-geostore');
const { RTree } = require('terraformer-rtree');
const { Memory } = require('terraformer-geostore-memory');

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
 * Adds a GeoJson feature collection to the Terraformer memory store.
 *
 * @param {object} collection A GeoJson feature collection.
 * @returns {undefined}
 */
function addCollectionToStore(collection) {
  store.add(collection); // if we fail to read the shapfile, shutdown the server TODO
}

/**
 * Inserts a GeoJson object into the Terraformer memory store if it exists.
 *
 * @param {object} collection A GeoJson collection read from the shapefile.
 * @return {undefined}
 */
function addShapefileCollectionToStore(collection) {
  const collectionWithId = addIdToFeatureCollection(collection);
  addCollectionToStore(collectionWithId);
}

shapefile
  .read('./world/tz_world_mp.shp')
  .then(response => addShapefileCollectionToStore(response))
  .catch((err) => {
    console.error('Unable to load the shapefile into the geostore');
    console.error(err);
    process.exit(1);
  });

module.exports = store;
