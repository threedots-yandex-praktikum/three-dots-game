import { sendJSONResponse } from "../../constants";
import { NextFunction, Request, Response } from "express";
import { User } from "../../../models";

export const getActiveTheme = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.context.user;

    const user: User | null = await User.findOne({
      where: {
        id,
      },
    });

    return sendJSONResponse(res, {
      data: user?.theme,
    });
  } catch (e) {
    next(e);
  }
};

export const changeActiveTheme = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.context.user;
    const { theme } = req.body;

    await User.update(
      { theme },
      {
        where: { id },
      }
    );

    return sendJSONResponse(res, {
      data: theme,
    });
  } catch (e) {
    next(e);
  }
};
