SHAPEFILE_TARGET = 'http://efele.net/maps/tz/world/tz_world_mp.zip'
ZIP_TARGET = 'timezones.zip'

all: download-timezones unzip-timezones install clean-zip lint test

download-timezones:
	curl -o $(ZIP_TARGET) $(SHAPEFILE_TARGET)

unzip-timezones:
	unzip $(ZIP_TARGET)

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
	rm $(ZIP_TARGET)

clean: clean-zip
	rm -rf 'world'
	rm -rf 'node_modules'