import { MongoClient } from 'mongodb';
import { Client } from 'pg';
import { Sequelize } from 'sequelize-typescript';
import { NextFunction, Request, Response } from 'express';


export type TContext = {
  mongoClient: MongoClient,
  pgClient: Client,
  sequelize: Sequelize,
};

export const contextMiddleware = (context: TContext) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.context = context;

    next();
  };
