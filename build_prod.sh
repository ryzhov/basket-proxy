#!/bin/bash

. .env

PUSH_TO_REGISTRY=yes
DOCKER_FILE=.docker/prod/Dockerfile
BUILDER_IMAGE_NAME=${APP_NAME}.builder:${APP_VERSION:-local}

echo "version => ${APP_VERSION}, build image => ${BUILDER_IMAGE_NAME}"
docker build --target builder -t ${BUILDER_IMAGE_NAME} -f ${DOCKER_FILE} .
[ $? != 0 ] && echo "build image with target \"builder\" fail, exit." &&  exit 1

export GIT_HASH=`git rev-parse HEAD`
export EXPOSE_PORT
PRODUCTION_IMAGE_NAME=${REGISTRY}/${APP_NAME}:${GIT_HASH:0:16}

echo "build production image => ${PRODUCTION_IMAGE_NAME} EXPOSE_PORT => ${EXPOSE_PORT}"
docker build --build-arg EXPOSE_PORT --build-arg GIT_HASH -t ${PRODUCTION_IMAGE_NAME} -f ${DOCKER_FILE} .
[ $? != 0 ] && echo "build production image fail, exit." &&  exit 1

if [ ${PUSH_TO_REGISTRY} = "yes" ]; then
    echo "push image => ${PRODUCTION_IMAGE_NAME} to registry"
    docker push ${PRODUCTION_IMAGE_NAME}
    [ $? != 0 ] && echo "push production image fail, exit." &&  exit 1
fi

echo ${PRODUCTION_IMAGE_NAME}
