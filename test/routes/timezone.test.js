const request = require('supertest');
const app = require('../../app');

// These are full integration tests
describe('Timezone route', () => {
  beforeAll((done) => {
    setTimeout(() => {
      done(); // A rather crude way of waiting for the timezone repository to load. Still might fail
    }, 4000);
  });

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

    test('Returns 422 when given a malformed longitude param', (done) => {
      const route = encodeURI(`${baseUrl}?lng=-190&lat=48.407326`);
      request(app)
        .get(route)
        .then((response) => {
          expect(response.status).toBe(422);
          expect(response.text).toBe('Malformed longitude or latitude values');
          done();
        });
    });

    test('Returns 422 when given a malformed latitude param', (done) => {
      const route = encodeURI(`${baseUrl}?lng=48.407326&lat=-99`);
      request(app)
        .get(route)
        .then((response) => {
          expect(response.status).toBe(422);
          expect(response.text).toBe('Malformed longitude or latitude values');
          done();
        });
    });

    test('Returns a timezone when given points in a valid timezone for Vancouver', (done) => {
      const route = encodeURI(`${baseUrl}?lat=48.407326&lng=-123.329773`);

      const expectedResponse = {
        data: {
          code: expect.stringMatching(/PDT|PST/),
          offset: expect.stringMatching(/-08:00|-07:00/),
          offset_seconds: expect.any(Number),
          coords: [
            -123.329773,
            48.407326,
          ],
          timezone: 'America/Vancouver',
          iso: expect.any(String),
          iso_day_of_week: expect.any(Number),
          iso_week_of_year: expect.any(Number),
          day_of_year: expect.any(Number),
          week_of_year: expect.any(Number),
          month_of_year: expect.any(Number),
          year: expect.any(Number),
          dst: expect.any(Boolean),
          leap: expect.any(Boolean),
        },
      };

      request(app)
        .get(route)
        .set('Accept', 'application/json')
        .then((response) => {
          expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
          expect(response.status).toBe(200);
          expect(response.body).toEqual(expectedResponse);
          done();
        });
    });

    test('Returns a timezone when given points in a valid timezone for Rio de Janeiro', (done) => {
      const route = encodeURI(`${baseUrl}?lat=-22.970722&lng=-43.182365`);
      const expectedResponse = {
        data: {
          code: expect.any(String),
          offset: expect.any(String),
          offset_seconds: expect.any(Number),
          coords: [
            -43.182365,
            -22.970722,
          ],
          timezone: 'America/Sao_Paulo',
          iso: expect.any(String),
          iso_day_of_week: expect.any(Number),
          iso_week_of_year: expect.any(Number),
          day_of_year: expect.any(Number),
          week_of_year: expect.any(Number),
          month_of_year: expect.any(Number),
          year: expect.any(Number),
          dst: expect.any(Boolean),
          leap: expect.any(Boolean),
        },
      };

      request(app)
        .get(route)
        .set('Accept', 'application/json')
        .then((response) => {
          expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
          expect(response.status).toBe(200);
          expect(response.body).toEqual(expectedResponse);
          done();
        });
    });
  });
});
