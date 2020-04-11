#!/bin/bash

if [ -z "$1" ]; then
	echo "required param  <docker_image_name> missed"
	exit 1
fi

PRODUCTION_IMAGE=${1}
DEPLOYMENT=opec-proxy
CONTAINER=opec-proxy

kubectl set image deployment/${DEPLOYMENT} ${CONTAINER}=${PRODUCTION_IMAGE}
