FROM ubuntu:18.04

RUN apt-get update && apt-get upgrade -y
RUN apt-get install nodejs npm -y
RUN apt-get clean
RUN mkdir -p /home/node/app/node_modules && chown -R root:root /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER root

RUN npm install

COPY --chown=root:root . .

EXPOSE 8080

CMD [ "node", "App.js" ]
