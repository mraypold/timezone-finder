const shapefile = require('shapefile');
const GeoStore = require('terraformer-geostore').GeoStore;
const RTree = require('terraformer-rtree').RTree;
const GeostoreMemory = require('terraformer-geostore-memory').Memory;

/**
 * Creates a new store for handling quering GeoJson collections.
 */
let store = new GeoStore({
  store: new GeostoreMemory(),
  index: new RTree()
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

  collection.features.map(feature => {
    feature.id = (id++).toString(); // Terraformer library throws errors if id is a number.
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
 * @param {object} error The error encountered when parsing the shapefile
 * @param {object} collection A GeoJson collection read from the shapefile.
 * @return {undefined}
 */
function addShapefileCollectionToStore(error, collection) { // TODO handle error here.
  const collectionWithId = addIdToFeatureCollection(collection);
  addCollectionToStore(collectionWithId);
}

shapefile.read('./world/tz_world_mp.shp', addShapefileCollectionToStore);

module.exports = store;