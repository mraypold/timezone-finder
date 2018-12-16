# ----------------------------------------------------
#
# Stage 0 downloads and unzips the timezone assets
#
# ----------------------------------------------------
FROM alpine

WORKDIR /var/timezone/

RUN apk add curl

RUN curl -Lo timezones.geojson.zip https://github.com/evansiroky/timezone-boundary-builder/releases/download/2017c/timezones.geojson.zip
RUN unzip timezones.geojson.zip
RUN mkdir ./data/
RUN mv ./dist/combined.json ./data/timezones.json

# ----------------------------------------------------
#
# Stage 1 installs the production npm dependencies
#
# ----------------------------------------------------
FROM node:10-alpine

WORKDIR /var/timezone/

COPY package.json .
COPY package-lock.json .

RUN npm install --production

# ----------------------------------------------------
#
# Stage 2 runs the microservice
#
# ----------------------------------------------------
FROM node:10-alpine

WORKDIR /var/timezone/

COPY --from=0 /var/timezone/data/timezones.json ./data/timezones.json
COPY --from=1 /var/timezone/node_modules node_modules
COPY . .

CMD [ "npm", "start" ]