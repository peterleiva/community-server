#!/usr/bin/env bash

##
# Build a image using docker
#
# This shell script only define command which are commonly used to build the app
# that's why it also receive others docker arguments trough $@ for further
# options when building the app image
##

getAbsolutePath() {
	echo "$(
		cd -- "$(dirname "$1")" >/dev/null 2>&1
		pwd -P
	)"
}

# take build script directory which is where Dockerfile lives to build them
basedir=$(getAbsolutePath $0)
rootdir=$(getAbsolutePath "$basedir/../../.")

# Docker build variables
APP_NAME="community-server"
Dockerfile="$basedir/Dockerfile"
tag=$APP_NAME

# Information about docker building folders
printf "\n\n"
echo "Bulding Dockerfile at $Dockerfile"
echo "Project at $rootdir"
printf "\n\n"

# uses rootdir as the docker context
docker build $@ --tag $tag -f $Dockerfile $rootdir
