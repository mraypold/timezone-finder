GEOJSON_TARGET = 'https://github.com/evansiroky/timezone-boundary-builder/releases/download/2017c/timezones.geojson.zip'
ZIP_TARGET = 'timezones.geojson.zip'

all: download-timezones unzip-timezones clean-zip install lint test

download-timezones:
	curl -Lo $(ZIP_TARGET) $(GEOJSON_TARGET)

unzip-timezones:
	unzip $(ZIP_TARGET)
	mv dist/combined.json data/timezones.json

.PHONY: install
install:
	npm install

.PHONY: lint
lint:
	npm run lint

.PHONY: test
test: install lint
	npm run test

clean-zip:
	rm -f $(ZIP_TARGET)
	rm -rf dist/

.PHONY: benchmark
benchmark:
	./benchmark/run.sh

clean: clean-zip
	rm -f data/timezones.json
	rm -rf node_modules