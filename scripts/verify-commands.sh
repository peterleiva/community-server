#!/usr/bin/env sh
##
# Auxilar script to check when CLI is installed
#
# Check arguments if each on of them is executable and return error (1) when
# they don't exists
#
##

failed=FALSE

for script; do
	if ! type $script &>/dev/null; then
		failed=TRUE
		echo "Please install '$script' to proceed"
	fi
done

if [ failed = TRUE ]; then exit 1; fi
