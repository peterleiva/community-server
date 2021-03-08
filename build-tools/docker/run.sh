#!/usr/bin/env bash

##
# Start a docker container using the build image constructed with ./build.sh
#

if ! command "$(dirname "$0")/check-docker.sh" 2>&1; then exit 1; fi

CONTAINER_NAME="community-server"
PORT="5000"
TAG="community-server"

docker run $@ --rm --name=$CONTAINER_NAME -p $PORT:3000 $TAG
