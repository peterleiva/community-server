#!/usr/bin/env bash

##
# Build a image using docker
#
# This shell script only define command which are commonly used to build the app
# that's why it also receive others docker arguments trough $@ for further
# options when building the app image
##

docker build $@ --tag community-server .
