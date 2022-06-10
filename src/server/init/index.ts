import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import path from "path";
import https from "https";
import fs from "fs";

import 'babel-polyfill';
import { MongoClient } from 'mongodb';
import { Client, ClientConfig }  from 'pg';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { config } from 'dotenv';
import serverRenderMiddleware from "../middlewares/server-render-middleware";


config();

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
  } as ClientConfig);

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

const startExpressApp = () => {
  const port = process.env.PORT || 5000;

  const app = express();

  app
    .use(cookieParser())
    .use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')))
    .use(express.static(path.resolve(__dirname, '../static')));


  app.get('/*', serverRenderMiddleware);


  const secureServer = https.createServer(
    {
      key: fs.readFileSync('./server.key'),
      cert: fs.readFileSync('./server.cert'),
    },
    app,
  );

  secureServer.listen(
    port,
    () => console.log(`Приложение запущено по адресу: https://local.ya-praktikum.tech:${port}`));
};

const handleCommonError = (error: any) => {
  console.log('В процессе запуска приложения возникла критическая ошибка');
};

export const startServer = () => {
  return Promise.resolve()
    .then(connectToMongoDb)
    .then(connectToPostgreSQL)
    .then(connectToPostgreSQLWithORM)
    .then(startExpressApp)
    .catch(handleCommonError);
};





