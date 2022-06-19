import { NextFunction, Request, Response } from "express";
import { AuthAPIServer } from "client/modules/api/authAPIServer";
import { AxiosResponse } from "axios";
import { TUserModelResponse } from "client/modules/api/profileAPI";
import { HTTP_STATUS } from "server/types";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await AuthAPIServer.getUserDataSSR(req.cookies)
    .then((response) => {
      console.log(req.baseUrl, req.path, "///////////////////");

      req.context.user = response as TUserModelResponse;
      next();
    })
    .catch((error: AxiosResponse) => {
      if (error.status === HTTP_STATUS.UNAUTHORIZED) {
        return res.status(HTTP_STATUS.FORBIDDEN).send(null);
      }
    });
};
