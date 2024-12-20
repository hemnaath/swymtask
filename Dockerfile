FROM node:21-alpine

WORKDIR ./

COPY package.json ./

RUN npm install

COPY .  ./

CMD ["npm", "start"]