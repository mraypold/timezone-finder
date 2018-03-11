const middleware = require('../../middleware/isPointRequest');

describe('isPointRequest middleware tests', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      query: {
        lng: undefined,
        lat: undefined,
      },
    };

    res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    next = jest.fn();
  });

  test('isPointRequest returns 400 if lng is undefined', () => {
    middleware(req, res, next);

    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith('Missing longitude or latitude values');
  });

  test('isPointRequest returns 400 if lat is undefined', () => {
    middleware(req, res, next);

    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith('Missing longitude or latitude values');
  });

  test('isPointRequest returns 422 if lat is malformed', () => {
    req = {
      query: {
        lng: 190,
        lat: 45,
      },
    };

    middleware(req, res, next);

    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(422);
    expect(res.send).toBeCalledWith('Malformed longitude or latitude values');
  });

  test('isPointRequest returns 422 if lat is malformed', () => {
    req = {
      query: {
        lng: 90,
        lat: 190,
      },
    };

    middleware(req, res, next);

    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(422);
    expect(res.send).toBeCalledWith('Malformed longitude or latitude values');
  });

  test('isPointRequest calls next when both lat and lng are valid', () => {
    req = {
      query: {
        lng: 145,
        lat: 45,
      },
    };

    middleware(req, res, next);

    expect(next).toBeCalled();
    expect(res.status).not.toBeCalled();
    expect(res.send).not.toBeCalled();
  });
});
