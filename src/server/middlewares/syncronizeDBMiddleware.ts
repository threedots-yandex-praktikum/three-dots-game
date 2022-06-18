import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { userTheme } from "../models/user";

export const syncronizeDBMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, first_name } = req.context.user;
  const candidate = await User.findOne({
    where: {
      id,
    },
  });
  console.log("candidate-------------", candidate);

  if (!candidate) {
    User.create({
      id,
      name: first_name,
      theme: userTheme.LIGHT,
    });
  }
  next();
};
