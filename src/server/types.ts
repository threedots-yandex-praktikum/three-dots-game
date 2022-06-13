import { MongoClient } from 'mongodb';
import { Client } from 'pg';
import { Sequelize } from 'sequelize-typescript';
import { TUserModelResponse } from 'client/modules/api/profileAPI';


export type TContext = {
  mongoClient: MongoClient,
  pgClient: Client,
  sequelize: Sequelize,
  user: TUserModelResponse,
};
