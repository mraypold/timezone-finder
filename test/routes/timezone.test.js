const request = require('supertest');
const app = require('../../app');

// These are full integration tests
describe('Timezone route', () => {
  describe('index (/)', () => {
    const baseUrl = '/timezone';

    test('Returns 400 when missing a longitude param', (done) => {
      const route = encodeURI(`${baseUrl}?lat=48.407326`);
      request(app)
        .get(route)
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.text).toBe('Missing longitude or latitude values');
          done();
        });
    });

    test('Returns 400 when missing a latitude param', (done) => {
      const route = encodeURI(`${baseUrl}?lng=-123.329773`);
      request(app)
        .get(route)
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.text).toBe('Missing longitude or latitude values');
          done();
        });
    });

    test('Returns 400 when given a malformed longitude param', (done) => {
      const route = encodeURI(`${baseUrl}?lng=-190&lat=48.407326`);
      request(app)
        .get(route)
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.text).toBe('Malformed longitude or latitude values');
          done();
        });
    });

    test('Returns 400 when given a malformed latitude param', (done) => {
      const route = encodeURI(`${baseUrl}?lng=48.407326&lat=-99`);
      request(app)
        .get(route)
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.text).toBe('Malformed longitude or latitude values');
          done();
        });
    });

    test('Returns a timezone when given points in a valid timezone', (done) => {
      const route = encodeURI(`${baseUrl}?lat=48.407326&lng=-123.329773`);

      const expectedResponseBody = [
        {
          code: 'PST',
          offset: '-08:00',
          offset_seconds: -28800,
          coords: [
            '-123.329773',
            '48.407326',
          ],
          timezone: 'America/Vancouver',
        },
      ];

      request(app)
        .get(route)
        .set('Accept', 'application/json')
        .then((response) => {
          expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
          expect(response.status).toBe(200);
          expect(response.body).toBe(expectedResponseBody);
          done();
        });
    });

    // TODO tests for the ocean and other areas
  });
});
