FROM node:9.10.0

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8090

CMD [ "npm", "run", "start" ]
