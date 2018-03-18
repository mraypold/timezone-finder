-- Benchmarks the timezone-finder application
-- Call with wrk -t12 -c400 -d30s -s ./request.lua http://localhost:3000
-- Alternatively just call run.sh

function randomLatitude()
  return math.random(90, -90);
end

function randomLongitude()
  return math.random(180, -180);
end

request = function()
  lat = randomLatitude()
  lng = randomLongitude()
  path = "/timezone?lat=" .. lat .. "&lng=" .. lng
  return wrk.format("GET", path)
end
