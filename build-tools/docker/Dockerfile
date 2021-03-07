ARG NODE_VERSION=14.16.0
ARG NODE_ENV=production

# Node lts/fermium version as the base image
FROM node:$NODE_VERSION

# NODE_ENV can be passed as argument to build the app as dev or prod
# Run docker in production mode
ENV NODE_ENV=$NODE_ENV

RUN bash -c 'echo \"Building in $NODE_ENV\"'

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
