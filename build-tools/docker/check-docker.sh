#!/usr/bin/env bash

##
# Checks the existance of docker command and if it's running
#
if ! command -v docker &>/dev/null; then
	echo "Docker is not installed."
	echo "Please install docker at https://docs.docker.com/get-started/"
	exit 1
elif ! command docker info &>/dev/null 2>&1; then
	echo "Docker is not running"
	exit 1
fi
