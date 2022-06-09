const { MongoClient } = require('mongodb');
const { secureServer } = require('./dist/server.js');
const { Client } = require('pg');
const { Sequelize, SequelizeOptions } = require('sequelize-typescript');
require('dotenv').config();


const connectToMongoDb = () => {
  const url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
  const client = new MongoClient(url);

  return client
    .connect()
    .then(() => console.log('соединение с mongoDB установлено'))
    .catch((error: any) => {
      console.log('не удалось установить соединение с mongoDB');
      throw error;
    });
};

const connectToPostgreSQL = () => {
  const client = new Client({
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  return client
    .connect()
    .then(() => console.log('соединение с postgreSQL установлено'))
    .catch((error: any) => {
      console.log('не удалось установить соединение с postgreSQL');
      throw error;
    });
};

const connectToPostgreSQLWithORM = () => {
  const sequelizeOptions = {
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialect: 'postgres',
  };

  const sequelize = new Sequelize(sequelizeOptions as SequelizeOptions);

  return Promise.resolve()
    .then(() => sequelize.authenticate())
    .then(() => sequelize.sync())
    .then(() => console.log('соединение с postgreSQL с использованием sequelize установлено'))
    .catch((error: any) => {
      console.log('не удалось установить соединение с postgreSQL с использованием sequelize');
      throw error;
    });
};

const launchExpressServer = () => {
  const port = process.env.PORT || 5000;

  secureServer.listen(
    port,
    () => console.log(`Приложение запущено по адресу: https://local.ya-praktikum.tech:${port}`));
};

const handleCommonError = (error: any) => {
  console.log('В процессе запуска приложения возникла критическая ошибка');
};

Promise.resolve()
  .then(connectToMongoDb)
  .then(connectToPostgreSQL)
  .then(connectToPostgreSQLWithORM)
  .then(launchExpressServer)
  .catch(handleCommonError);



