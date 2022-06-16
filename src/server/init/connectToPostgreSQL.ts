import { Client, ClientConfig } from 'pg';


/*
* по идее, мы используем в проекте sequelize и pgClient нам не нужен, но т.к. в примерах в теории
* было предложение попробовать потестить SQL запросы через этот клиент, я решил на всякий случай
* его тоже подключить, чтобы можно было при желании на чистом sql через этот клиент позапрашивать,
* ну и просто для теста, как все работает
* */
export const connectToPostgreSQL = () => {
  const client = new Client({
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  } as ClientConfig);

  const closeCb = () => {
    console.log('соединение с postgreSQL прекращено');
    client.end.bind(client);
  };

  return client
    .connect()
    .then(() => {
      console.log('соединение с postgreSQL установлено');

      return { client, closeCb };
    })
    .catch((error: any) => {
      console.log('не удалось установить соединение с postgreSQL');
      throw error;
    });
};
