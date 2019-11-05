#!/bin/bash

docker-compose stop
docker-compose down

echo 'y' | docker container prune
echo 'y' | docker image prune

sudo chmod 777 -Rf db_data
docker-compose up -d --build
