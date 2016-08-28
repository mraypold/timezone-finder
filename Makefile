SHAPEFILE_TARGET = 'http://efele.net/maps/tz/world/tz_world_mp.zip'
ZIP_TARGET = 'timezones.zip'

all: download-timezones unzip-timezones npm-install clean-zip

download-timezones:
	curl -o $(ZIP_TARGET) $(SHAPEFILE_TARGET)
    
unzip-timezones:
	unzip $(ZIP_TARGET)

npm-install:
	npm install

clean-zip:
	rm $(ZIP_TARGET)

clean: clean-zip
	rm -rf 'world'
	rm -rf 'node_modules'