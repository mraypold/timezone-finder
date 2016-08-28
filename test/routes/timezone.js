'use strict';

const expect = require('expect');
const request = require('supertest');
const app = require('../../app');

// These are full integration tests
describe('Timezone route', function() {

  describe('index (/)', function() {
    const baseUrl = '/timezone';

    it('Returns 400 when missing a longitude param', function(done) {
      const route = encodeURI(baseUrl + '?lat=48.407326');
      request(app)
        .get(route)
        .expect(400, 'Missing longitude or latitude values', done);
    });

    it('Returns 400 when missing a latitude param', function(done) {
      const route = encodeURI(baseUrl + '?lng=-123.329773');
      request(app)
        .get(route)
        .expect(400, 'Missing longitude or latitude values', done);
    });

    it('Returns 400 when given a malformed longitude param', function(done) {
      const route = encodeURI(baseUrl + '?lng=-190&lat=48.407326');
      request(app)
        .get(route)
        .expect(400, 'Malformed longitude or latitude values', done);
    });

    it('Returns 400 when given a malformed latitude param', function(done) {
      const route = encodeURI(baseUrl + '?lng=48.407326&lat=-99');
      request(app)
        .get(route)
        .expect(400, 'Malformed longitude or latitude values', done);
    });

    it('Returns a timezone when given points in a valid timezone', function(done) {
      const route = encodeURI(baseUrl + '?lat=48.407326&lng=-123.329773');
      request(app)
        .get(route)
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done)
    });
  })

});