FROM node:13

WORKDIR /app

COPY  package.json /app

RUN npm install

COPY . .

EXPOSE 3000

cmd ["npm" , "start"]