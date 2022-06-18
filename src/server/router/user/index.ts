import { NextFunction, Request, Response, Router } from "express";
import { sendJSONResponse, THEME_ROUTE } from "server/router/constants";
import { User } from "server/models/";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { changeActiveTheme, getActiveTheme } from "./theme";

export const userRouter = Router();
userRouter.use(authMiddleware);

userRouter.get(THEME_ROUTE, getActiveTheme);
userRouter.put(THEME_ROUTE, changeActiveTheme);

userRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: User | null = await User.create({
        ...req.body,
      });

      return sendJSONResponse(res, {
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }
);
