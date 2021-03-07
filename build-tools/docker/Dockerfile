# Node lts/fermium as the base image
FROM node:14.16.0

# NODE_ENV can be passed as argument to build the app as dev or prod
ARG NODE_ENV=production
# Run docker in production mode
ENV NODE_ENV=$NODE_ENV

RUN bash -c 'echo \"Building in $NODE_ENV\"'

ENV APP_NAME=community-server

RUN addgroup $APP_NAME && \
	adduser --ingroup $APP_NAME --home /home/$APP_NAME $APP_NAME 

WORKDIR /home/$APP_NAME

USER $APP_NAME

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

ENV PORT=80

EXPOSE 80

# set apps permissions
RUN npm run build && \
	chgrp -R $APP_NAME dist && \
	chmod -R 600 dist && npm run start



