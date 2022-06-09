const { MongoClient } = require('mongodb');
const { secureServer } = require('./dist/server.js');
const { Client } = require('pg');

require('dotenv').config();


const connectToMongoDb = () => {
  const url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
  const client = new MongoClient(url);

  return client
    .connect()
    .then(() => console.log('соединение с mongoDB установлено'))
    .catch(error => {
      console.log('не удалось установить соединение с mongoDB');
      throw error;
    });
};

const connectToPostgreSQL = () => {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRESQL_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRESQL_PORT,
  });

  return client
    .connect()
    .then(() => console.log('соединение с postgreSQL установлено'))
    .catch(error => {
      console.log('не удалось установить соединение с postgreSQL');
      throw error;
    });
};

const launchExpressServer = () => {
  const port = process.env.PORT || 5000;

  secureServer.listen(
    port,
    () => console.log(`Приложение запущено по адресу: https://local.ya-praktikum.tech:${port}`));
};

const handleCommonError = error => {
  console.log('В процессе запуска приложения возникла критическая ошибка');
};

Promise.resolve()
  .then(connectToMongoDb)
  .then(connectToPostgreSQL)
  .then(launchExpressServer)
  .catch(handleCommonError);



