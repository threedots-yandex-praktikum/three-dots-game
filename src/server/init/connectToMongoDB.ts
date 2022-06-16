import { MongoClient } from 'mongodb';


export const connectToMongoDb = () => {
  const url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
  const client = new MongoClient(url);

  const closeCb = () => {
    console.log('соединение с mongoDB прекращено');
    client.close.bind(client);
  };

  return client
    .connect()
    .then(() => {
      console.log('соединение с mongoDB установлено');

      return { client, closeCb };
    })
    .catch((error: any) => {
      console.log('не удалось установить соединение с mongoDB');
      throw error;
    });
};
