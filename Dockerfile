FROM node:21-alpine

WORKDIR D:/nodejs-sample-project

COPY package.json D:/nodejs-sample-project

RUN npm install

COPY .  D:/nodejs-sample-project

CMD ["npm", "start"]