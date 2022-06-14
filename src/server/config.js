require('dotenv').config();


module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRESQL_HOST,
    dialect: 'postgres',
  },
};
