import { TContext } from 'server/middlewares/connectionsModdleware';

declare global {
  namespace Express {
    interface Request {
      context?: TContext
    }
  }
}
