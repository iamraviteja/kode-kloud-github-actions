FROM node:20-alpine3.19

WORKDIR /usr/app

COPY package*.json /usr/app/

RUN npm install

COPY . .

ENV MONGO_URI=${MONGO_URI}
ENV MONGO_USERNAME=${MONGO_USERNAME}
ENV MONGO_PASSWORD=${MONGO_PASSWORD}

EXPOSE 3000

CMD [ "npm", "start" ]