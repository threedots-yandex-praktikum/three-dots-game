const { MongoClient } = require('mongodb');
const { secureServer } = require('./dist/server.js');
require('dotenv').config();


const port = process.env.PORT || 5000;

const url = `mongodb://${process.env.MONGO_HOST}:27017`;

const dbName = process.env.MONGO_DB_NAME;
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


