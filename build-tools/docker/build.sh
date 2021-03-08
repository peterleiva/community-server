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

##
# Checks the existance of docker command and if it's running
#
if ! command -v docker &>/dev/null; then
	echo "Docker is not installed."
	echo "Please install docker at https://docs.docker.com/get-started/"
elif ! command docker info &>/dev/null 2>&1; then
	echo "Docker is not running"
else
	# Docker build variables
	Dockerfile="$basedir/Dockerfile"
	APP_NAME="community-server"
	tag=$APP_NAME

	# Information about docker building folders
	echo "Project found at $rootdir"
	echo "Bulding Dockerfile at $Dockerfile"

	# uses rootdir as the docker context
	docker build $@ --tag $tag -f $Dockerfile $rootdir
fi

# print a new line
echo
