# Timezone-Finder

[![Build Status](https://travis-ci.org/mraypold/timezone-finder.svg?branch=master)](https://travis-ci.org/mraypold/timezone-finder)

An express.js based microservice to retrieve a timezone for the requested coordinates.

This project is under active development, so expect major API changes over the coming months.

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

This microservice uses an in-memory database generated from a geojson of all timezones that is downloaded from [here](http://efele.net/maps/tz/world/).

Running `make` will download the zipfile, extract the shapefile containing timezones and install all required node modules. Do not use `npm install` as this will not include the necessary geojson. Before running `make`, you should run `nvm use` to set your execution environment to use the same environment of node.js that this service is built with.

### Running

To run in development mode use `npm start`

### Deployment

This repo has been configured to work with pm2, but it should be fairly easy to switch to your preferred process manager.

Install pm2 globally using `npm install pm2 -g`.

The included processes.json defines a basic configuration to start and watch the express application.

Simply run `pm2 start processes.json`.

To stop the express application, run `pm2 stop processes.json`.

You should further harden the application and reverse proxy through nginx (or other webserver) to suite your specific needs.

Further reading:
- [Process managers for Express apps](https://expressjs.com/en/advanced/pm.html)
- [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [Production best practices: performance and reliability](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Setting up Express with nginx and pm2](http://blog.danyll.com/setting-up-express-with-nginx-and-pm2/)

### TODO

- Accept batch requests through POST
- Handle timezones in the ocean.