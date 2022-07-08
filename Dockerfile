FROM node:16.14.0

WORKDIR /var/www

COPY . .

RUN npm install && npm run build

EXPOSE 5000

CMD npm run start:server

CMD npm run seed

CMD npm run start:webpack
