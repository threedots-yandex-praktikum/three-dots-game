const { MongoClient } = require('mongodb');
const { secureServer } = require('./dist/server.js');

require('dotenv').config();

console.log('mongo host', process.env.MONGO_HOST);
console.log('mongo password', process.env.MONGO_PASSWORD);

const port = process.env.PORT || 5000;

const url = `mongodb://${process.env.MONGO_HOST}:27017`;

const dbName = 'test-db';
const client = new MongoClient(url);

client
  .connect()
  .then(() => {

    const db = client.db(dbName);
    console.log('mongo db is ready: ' + db)

    secureServer.listen(port, () => {
      console.log(
        'Application is started on https://local.ya-praktikum.tech',
        port,
      );
    });
  })
  .catch(error => {
    console.log('mongo connection lost');
    throw error;
  })


