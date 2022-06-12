import { Client, ClientConfig } from 'pg';

export const connectToPostgreSQL = () => {
  const client = new Client({
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  } as ClientConfig);

  return client
    .connect()
    .then(() => {
      console.log('соединение с postgreSQL установлено');

      return client;
    })
    .catch((error: any) => {
      console.log('не удалось установить соединение с postgreSQL');
      throw error;
    });
};
