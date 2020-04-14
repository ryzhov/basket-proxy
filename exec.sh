#!/bin/bash

. .env

DOCKER_PARAMS=""
COMMAND=sh
CONTAINER_NAME=${APP_NAME}.${APP_ENV}_v${APP_VERSION:-local}

if [ ${APP_ENV} == "dev" ]; then 
    USER=`whoami`
	DOCKER_PARAMS="-u ${USER}"
    COMMAND=bash
fi

docker exec -it ${DOCKER_PARAMS} ${CONTAINER_NAME} ${COMMAND}
