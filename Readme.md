# Timezone-Finder

[![Build Status](https://travis-ci.org/mraypold/timezone-finder.svg?branch=master)](https://travis-ci.org/mraypold/timezone-finder)

An slow and non-hardened express.js based microservice to retrieve a timezone for the requested coordinates.

### Examples

To retrieve the timezone for the coordinates associated with Victoria BC, Canada:

Request:
```GET /timezone?lat=48.407326&lng=-123.329773```

Response:
```json
{
    "data": {
        "code": "PDT",
        "offset": "-07:00",
        "offset_seconds": -25200,
        "coords": [
            -123.329773,
            48.407326
        ],
        "timezone": "America/Vancouver",
        "iso": "2018-03-15T21:34:11.403Z",
        "iso_day_of_week": 4,
        "iso_week_of_year": 11,
        "day_of_year": 74,
        "week_of_year": 11,
        "month_of_year": 2,
        "year": 2018,
        "dst": true,
        "leap": false
    }
}
```

### Installation

Install node version manager and then run `nvm use` to use same version of node.js that this application was developed on.

Running `make` will download the zipfile, extract the shapefile containing timezones and install all required node modules. Do not use `npm install` as this will not include the necessary geojson.

### Running

To run in development mode use `nvm use` and then`npm start`

### Deployment

A multistage Dockerfile has been included so that the application can be more easily packaged for deployment.

Running `./build.sh` will containerize the express application with a `timezone:latest` docker image. You may optionally pass a version number to `build.sh`, such that the generated tag will be `timezone:<version>`.

Then run `docker run -p 3000:3000 timezone:latest`.

### Exposed Environment Variables

- `PORT` is the port that the application will be served on.

### Some Notes on Performance

This microservice is slow! You have been warned.

Initial profiling reveals that this is due `terraformer-geostore` package, which shouldn't be unexpected as spatial calculations are quite intensive and node.js isn't suited for this type of computation.

I'm currently investigating using [rbush](https://github.com/mourner/rbush) instead of terraform, which appears to be faster. If all else fails I may switch to spatialite and include the sqlite database in the docker container.

### Known Problems

- The application cannot return timezones when given a coordinate in the ocean.
