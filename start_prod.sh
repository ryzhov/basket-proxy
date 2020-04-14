#!/bin/bash

. .env

LOCAL_PORT=127.0.0.1:3000
CONTAINER_NAME=${APP_NAME}.prod_v${APP_VERSION}

if [ -z "$1" ]; then
	echo "required param  <docker_image_name> missed"
	exit 1
fi

PRODUCTION_IMAGE_NAME=${1}

# -- check for already exist container for this application --
CONTAINER_ID=`docker ps -a -q --filter="name=${CONTAINER_NAME}"`
if [ -n "${CONTAINER_ID}" ]; then
	echo "stop then remove container => `docker container stop ${CONTAINER_ID} && docker container rm ${CONTAINER_ID}`"
fi

echo "start production image => ${PRODUCTION_IMAGE_NAME}"
docker run   -p ${LOCAL_PORT}:${EXPOSE_PORT}/tcp --name ${CONTAINER_NAME} ${PRODUCTION_IMAGE_NAME}
