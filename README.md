# my-commands
Project to search several types of commands


To commits:
https://www.conventionalcommits.org/en/v1.0.0/

docker run --name mongodb-mycommands -p 27018:27017 -d mongodb/mongodb-community-server:5.0-ubuntu2004

docker run --name mongodb-mycommands_2 -p 27018:27017 -d mongodb/mongodb-community-server:5.0-ubuntu2004

docker cp "C:\Users\ingbr\Desktop\backup_db" mongodb-mycommands:"/home"

mongorestore name_folder

docker build --no-cache -t i-web-app .

docker run `
  -p 3000:3000 `
  --env-file=./.env.development.local `
  --name c-web-app `
  -d `
  i-web-app


docker build --no-cache -t i-web-server .

docker run `
  -p 3020:3020 `
  --env-file=./.env.development.local `
  --name c-web-server `
  -d `
  i-web-server



docker build --no-cache -t i-web-page .

docker run `
  -p 3010:3010 `
  --env-file=./.env.development.local `
  --name c-web-page `
  -d `
  i-web-page


docker compose up -d


-------------------- docker ----------------------
docker images
docker build --no-cache -t i-web-app-node .
docker rmi name-img
docker images | grep name-project

1º Way to pass .env to docker
docker run \
-p 3000:3000 \
--env-file=./.env name-img \
--name name-container\
-d \			// Execute in second plane
-v "route_absolute_of_my_pc":"route_absoulte_of_container"\		# Volúmenes de directorios
name-img

2º 
docker run -e 'APP=3000' -e 'DB=mongo://localhost:27018' name-img

- Finish container
List of contianers that is running
docker ps
docker ps -a  // All containers running and stopped
docker stop id_container
docker rm id_container		// delete a container, --force is optional

# Create a red
docker network create name-network

# List all networks
docker network ls

docker-compose build --no-cache
docker compose up -d