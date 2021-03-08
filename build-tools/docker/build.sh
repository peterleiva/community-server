#!/usr/bin/env bash

##
# Build a image using docker
#
# This shell script only define command which are commonly used to build the app
# that's why it also receive others docker arguments trough $@ for further
# options when building the app image
##

##
# Get the absolute path of a given argument ($1)
#
getAbsolutePath() {
	echo "$(
		cd -- "$(dirname "$1")" >/dev/null 2>&1
		pwd -P
	)"
}

# Take build script directory which is where Dockerfile lives to build them
basedir=$(getAbsolutePath $0)
# Project root folder
rootdir=$(getAbsolutePath "$basedir/../../.")

if ! command "$basedir/check-docker.sh" 2>&1; then exit 1; fi

# Docker build variables
Dockerfile="$basedir/Dockerfile"
APP_NAME="community-server"
tag=$APP_NAME

# Information about docker building folders
echo "Project found at $rootdir"
echo "Bulding Dockerfile at $Dockerfile"

# uses rootdir as the docker context
docker build $@ --tag $tag -f $Dockerfile $rootdir

# print a new line
echo
