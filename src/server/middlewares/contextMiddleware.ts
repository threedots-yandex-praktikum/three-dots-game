import { NextFunction, Request, Response } from 'express';
import { TContext } from 'server/types';

export const contextMiddleware =
  (context: TContext) => (req: Request, res: Response, next: NextFunction) => {
    req.context = context;

    next();
  };
