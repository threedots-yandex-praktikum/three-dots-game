import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';

export async function nonce(_req: Request, res: Response, next: NextFunction) {
  res.locals.nonce = crypto.randomBytes(16).toString('hex');
 
  next();
}
