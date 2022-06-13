import { TContext } from 'server/middlewares/contextMiddleware';

declare global {
  namespace Express {
    interface Request {
      context?: TContext
    }
  }
}
