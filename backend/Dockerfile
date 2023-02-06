FROM node:16-alpine

ENV JWT_SECRET=sssshhhh

ENV DEBUG=*

RUN mkdir -p /src

COPY package.json src/package.json

WORKDIR /src

RUN npm install --only=production --silent

COPY . /src

CMD npm start
