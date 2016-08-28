# Timezone-Finder

[![Build Status](https://travis-ci.org/mraypold/timezone-finder.svg?branch=master)](https://travis-ci.org/mraypold/timezone-finder)

An express.js based microservice to retrieve a GeoJSON representation (timezone code/name + polygon) of a timezone using the requested coordinate(s) this is simple to deploy.

This project is under active development, so expect major API changes over the comming months.

### Examples

To retrieve the timezone for the coordinates associated with Victoria BC, Canada:

Request:
```GET /timezone?lat=48.407326&lng=-123.329773```

Response:
```json
      { 
        "type": "Feature",
        "geometry": {
            "type": "MultiPolygon", 
            "coordinates": [...]
            },
        "properties": {
            "timezone": "America/Vancouver",
            "code": "PDT",
            "coords": [48.407326, -123.329773]
            }
       }
```

### Installation

This microservice uses an in-memory database generated from a shapefile of all timezones that is downloaded from [here](http://efele.net/maps/tz/world/).

Running `make` will download the zipfile, extract the shapefile containing timezones and install all required node modules. Do not use `npm install` as this will not include the necessary shapefile. 

### Running

To run in development mode use `npm start`

This application makes use of the cluster module, so an express instance will be started for each CPU core on the machine.

You may find it convenient to disable clustering when debugging.
 
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
- Provide option to only return timezone name and code instead of a full GeoJSON.
- Handle timezones in the ocean.