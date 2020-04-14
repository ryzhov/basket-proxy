#!/bin/bash

. .env

if [ -z "$1" ]; then
	echo "required param for docker-compose missed allow => {build|up|...}"
	exit 1
fi

echo "APP_NAME => ${APP_NAME}, version => ${APP_VERSION}"
docker-compose $1 $2 $3
