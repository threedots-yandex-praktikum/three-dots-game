import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { userTheme } from "../models/user";

export async function getCandidate(id: number, first_name: string) {
  let candidate = await User.findByPk(id);
  console.log(
    candidate,
    "-------------candidate    2--------------",
    candidate?.id
  );

  if (!candidate) {
    // console.log(candidate, "-------------candidate 123 123 123--------------");

    candidate = await User.create({
      id,
      name: first_name,
      theme: userTheme.LIGHT,
    });
    // console.log(candidate, "-------------candidate--------------");
  }

  return candidate;
}

export const syncronizeDBMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(
      "syncronizeDBMiddleware syncronizeDBMiddleware syncronizeDBMiddleware"
    );

    const { id, first_name } = req.context.user;
    await getCandidate(id, first_name);

    next();
  } catch (error) {
    console.log(error, "syncronizeDBMiddleware");
  }
};
