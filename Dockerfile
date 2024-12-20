FROM node:21-alpine

WORKDIR nodejs-sample-project

COPY package.json nodejs-sample-project

RUN npm install

COPY .  nodejs-sample-project

CMD ["npm", "start"]