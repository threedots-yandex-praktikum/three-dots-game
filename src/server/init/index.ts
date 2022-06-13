import { connectToPostgreSQL } from './connectToPostgreSQL';
import { connectToPostgreSQLWithORM } from './connectToPostgreSQLWithORM';
import { connectToMongoDb } from './connectToMongoDB';
import { startExpressApp } from './startExpressApp';
import { TContext } from 'server/types';


const connectionCloseCbArray: unknown[] = [];

export const startServer = async() => {
  try {
    const {
      client: mongoClient,
      closeCb: mongoCloseCb,
    } = await connectToMongoDb();
    connectionCloseCbArray.push(mongoCloseCb);

    const {
      client: pgClient,
      closeCb: pgCloseCb,
    } = await connectToPostgreSQL();
    connectionCloseCbArray.push(pgCloseCb);

    const {
      client: sequelize,
      closeCb: sequelizeCloseCb,
    } = await connectToPostgreSQLWithORM();
    connectionCloseCbArray.push(sequelizeCloseCb);

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

  /*
  * закрываем все установленные соединения
  * */
  connectionCloseCbArray.forEach(closeCb => {
    return (closeCb as () => void)();
  });

  console.log('В процессе запуска приложения возникла критическая ошибка', error);
};


