import { NextFunction, Request, Response, Router } from 'express';
import { sendJSONResponse } from 'server/router/constants';
import { User } from 'server/models/';


export const userRouter = Router();


userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User | null = await User.create({
      ...req.body,
    });
    
    return sendJSONResponse(
      res,
      {
        data: user,
      },
    );
  } catch (e) {
    next(e);
  }
});


