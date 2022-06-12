import { TContext } from 'server/middlewares/connectionsModdleware';
import { connectToPostgreSQL } from './connectToPostgreSQL';
import { connectToPostgreSQLWithORM } from './connectToPostgreSQLWithORM';
import { connectToMongoDb } from './connectToMongoDB';
import { startExpressApp } from './startExpressApp';


export const startServer = async() => {
  try {
    const mongoClient = await connectToMongoDb();
    const pgClient = await connectToPostgreSQL();
    const sequelize = await connectToPostgreSQLWithORM();

    const context = {
      mongoClient,
      pgClient,
      sequelize,
    };

    return startExpressApp(context as TContext);
  } catch(e: unknown) {
    handleCommonError(e);
  }
};

const handleCommonError = (error: unknown) => {
  console.log('В процессе запуска приложения возникла критическая ошибка');
};


