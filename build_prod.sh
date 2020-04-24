#!/bin/bash

. .env

PUSH_TO_REGISTRY=yes
DEPLOY=yes
DOCKER_FILE=.docker/prod/Dockerfile
BUILDER_IMAGE_NAME=${APP_NAME}.builder:${APP_VERSION:-local}
DEPLOYMENT=opec-proxy
CONTAINER=opec-proxy

echo "version => ${APP_VERSION}, build image => ${BUILDER_IMAGE_NAME}"
docker build --target builder -t ${BUILDER_IMAGE_NAME} -f ${DOCKER_FILE} .
[ $? != 0 ] && echo "build image with target \"builder\" fail, exit." &&  exit 1

GIT_HASH=`git rev-parse HEAD`
PRODUCTION_IMAGE_NAME=${REGISTRY}/${APP_NAME}:${GIT_HASH:0:16}

export EXPOSE_PORT GIT_HASH

echo "build production image => ${PRODUCTION_IMAGE_NAME} EXPOSE_PORT => ${EXPOSE_PORT}"
docker build --build-arg EXPOSE_PORT --build-arg GIT_HASH -t ${PRODUCTION_IMAGE_NAME} -f ${DOCKER_FILE} .
[ $? != 0 ] && echo "build production image fail, exit." &&  exit 1

if [ ${PUSH_TO_REGISTRY} = "yes" ]; then
    echo "push image => ${PRODUCTION_IMAGE_NAME} to registry"
    docker push ${PRODUCTION_IMAGE_NAME}
    [ $? != 0 ] && echo "push production image fail, exit." &&  exit 1
    if [ ${DEPLOY} = "yes" ]; then
        echo "deploy => ${PRODUCTION_IMAGE_NAME} DEPLOYMENT => ${DEPLOYMENT} CONTAINER => ${CONTAINER}"
        kubectl set image deployment/${DEPLOYMENT} ${CONTAINER}=${PRODUCTION_IMAGE_NAME}
    fi
fi

echo ${PRODUCTION_IMAGE_NAME}
