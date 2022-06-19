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

    console.log(candidate, "------user");

    return sendJSONResponse(res, {
      data: candidate?.theme,
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
    console.log(req.body, " req.body;");
    console.log(id, " id;");

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
