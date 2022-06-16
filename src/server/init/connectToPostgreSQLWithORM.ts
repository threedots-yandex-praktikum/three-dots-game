import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Comment, Topic, User, Reply, Theme, UserThemes, Reaction, CommentReactions } from '../models';


export const connectToPostgreSQLWithORM = () => {
  const sequelizeOptions = {
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialect: 'postgres',
    storage: ':memory:',
    define: {
      freezeTableName: true,
    },
  };

  const client = new Sequelize(sequelizeOptions as SequelizeOptions);

  const closeCb = () => {
    console.log('соединение с postgreSQL с использованием sequelize прекращено');
    client.close.bind(client);
  };

  client.addModels([Comment, User, Topic, Reply, Theme, UserThemes, Reaction, CommentReactions]);

  return Promise.resolve()
    .then(() => client.authenticate())
    .then(() => client.sync())
    .then(() => {
      console.log('соединение с postgreSQL с использованием sequelize установлено');

      return { client, closeCb };
    })
    .catch((error: any) => {
      console.log('не удалось установить соединение с postgreSQL с использованием sequelize');
      throw error;
    });
};
