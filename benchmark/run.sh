#!/bin/bash

# WRK benchmarking script ported from the following gist
# https://gist.github.com/andreas-marschke/d05b47ec7055354786e4

cd "$(dirname "$0")"

for duration in 30s
do
  for connections in 100 200
  do
    for thread in 1 2
    do
      wrk -t$thread -c$connections -d$duration -s ./request.lua http://localhost:3000 >> results.txt
    done
  done
done
