import { MongoClient } from 'mongodb';


export const connectToMongoDb = () => {
  const url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
  const client = new MongoClient(url);

  return client
    .connect()
    .then(() => {
      console.log('соединение с mongoDB установлено');

      return client;
    })
    .catch((error: any) => {
      console.log('не удалось установить соединение с mongoDB');
      throw error;
    });
};
