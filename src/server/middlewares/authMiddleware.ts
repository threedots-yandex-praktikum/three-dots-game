import { NextFunction, Request, Response } from 'express';
import { AuthAPIServer } from 'client/modules/api/authAPIServer';
import { AxiosResponse } from 'axios';
import { TUserModelResponse } from 'client/modules/api/profileAPI';


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  await AuthAPIServer
    .getUserDataSSR(req.cookies)
    .then(response => {
      req.context.user = response as TUserModelResponse;

      next();
    })
    .catch((error: AxiosResponse) => {
      if(error.status === 401) {
        return res
          .status(403)
          .send(null);
      }
    });
};
