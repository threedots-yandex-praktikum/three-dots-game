import { NextFunction, Request, Response } from 'express';
import { Reaction } from 'server/models';
import { sendJSONResponse } from 'server/router/constants';


export const handleGetAllReactions = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const reactions: Reaction[] = await Reaction.findAll();
    return sendJSONResponse(
      res,
      {
        data: reactions,
      },
    );
  } catch (e) {
    next(e);
  }
};

export const handleGetSingleReaction = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: {
        id,
      },
    } = req;

    const reaction: Reaction | null = await Reaction.findOne({
      where: {
        id,
      },
    });
    return sendJSONResponse(
      res,
      {
        data: reaction,
      },
    );
  } catch (e) {
    next(e);
  }
};

export const handleReactionCreate = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const reaction: Reaction | null = await Reaction.create(req.body);
    return sendJSONResponse(
      res,
      {
        data: reaction,
      },
    );
  } catch (e) {
    next(e);
  }
};

export const handleReactionUpdate = async(req: Request, res: Response, next: NextFunction) => {
  res
    .status(404)
    .send();
};

export const handleReactionDelete = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: {
        id,
      },
    } = req;

    await Reaction.destroy({
      where: { id },
    });

    return res
      .status(200)
      .send();
  } catch (e) {
    next(e);
  }
};
