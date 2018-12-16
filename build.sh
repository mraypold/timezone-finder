#!/bin/bash

tag="timezone"

version="latest"
if [ $# -eq 1 ]
  then version="$1"
fi

docker build -t "$tag:$version" .