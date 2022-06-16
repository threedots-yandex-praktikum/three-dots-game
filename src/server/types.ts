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

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500
}
