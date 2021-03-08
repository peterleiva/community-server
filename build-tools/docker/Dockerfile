ARG NODE_VERSION=14.16.0

# NODE_ENV can be passed as argument to build the app as dev or prod
ARG NODE_ENV=production

# Node lts/fermium version as the base image
FROM node:$NODE_VERSION

ENV NODE_ENV=$NODE_ENV

RUN bash -c 'echo \"Building in $NODE_ENV\"'

# import public key used by apt to verify mongodb and mongodb repo
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc \
	| apt-key add - && \
	apt-get install -y gnupg && \
	wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc \ 
	| apt-key add - && \
	echo "deb https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" \
	| tee /etc/apt/sources.list.d/mongodb-org-4.4.list

# Install mongodb and expose its default port
RUN apt-get update &&  apt-get install -y build-essential && \
	apt-get install -y mongodb

# Run mongodb and expose its port
RUN service mongodb restart
EXPOSE 27017

ENV APP_NAME=community-server

# Set user and group specific to the application
RUN addgroup $APP_NAME && \
	adduser --ingroup $APP_NAME --home /home/$APP_NAME $APP_NAME 

# Defines the app workdir and the user for so on
WORKDIR /home/$APP_NAME
USER $APP_NAME

# Install the application
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .

EXPOSE 3000/tcp

# Build and set app permissions to be acessed only by the user $APP_NAME
RUN npm run build && \
	chgrp -R $APP_NAME dist && \
	chmod -R 700 dist

# Bootstrap the application
CMD [ "npm start" ]
