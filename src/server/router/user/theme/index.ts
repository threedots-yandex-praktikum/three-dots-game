import { sendJSONResponse } from "../../constants";
import { NextFunction, Request, Response } from "express";
import { User } from "../../../models";
import { getCandidate } from "../../../middlewares/syncronizeDBMiddleware";

export const getActiveTheme = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, first_name } = req.params;
    const candidate = await getCandidate(parseInt(id), first_name);
    return sendJSONResponse(res, {
      data: candidate?.getDataValue("theme"),
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
