import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { userTheme } from "../models/user";

export async function getCandidate(id: number, first_name: string) {
  let candidate = await User.findByPk(id);
  if (!candidate) {
    candidate = await User.create({
      id,
      name: first_name,
      theme: userTheme.LIGHT,
    });
  }

  return candidate;
}

export const syncronizeDBMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, first_name } = req.context.user;
    const candidate = await getCandidate(id, first_name);
    req.context.theme = candidate?.getDataValue("theme");
    next();
  } catch (error) {
    console.log(error, "syncronizeDBMiddleware");
    next();
  }
};
