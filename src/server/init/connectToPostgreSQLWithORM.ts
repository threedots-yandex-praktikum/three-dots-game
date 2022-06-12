import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Comment } from '../models';


export const connectToPostgreSQLWithORM = () => {
  const sequelizeOptions = {
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialect: 'postgres',
    storage: ':memory:',
  };

  const sequelize = new Sequelize(sequelizeOptions as SequelizeOptions);

  sequelize.addModels([Comment]);

  return Promise.resolve()
    .then(() => sequelize.authenticate())
    .then(() => sequelize.sync())
    .then(() => {
      console.log('соединение с postgreSQL с использованием sequelize установлено');

      return sequelize;
    })
    .catch((error: any) => {
      console.log('не удалось установить соединение с postgreSQL с использованием sequelize');
      throw error;
    });
};
