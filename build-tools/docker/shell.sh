#!/usr/bin/env bash

###
# Run docker container in shell mode
#

CONTAINER_NAME="community-server"
TAG="latest"
IMAGE="community-server:$TAG"
SHELL="/bin/bash"

# Remove the container with --rm when exists the iteratictive environment
docker run $@ -u root --interactive --tty --rm --name $CONTAINER_NAME $IMAGE $SHELL
