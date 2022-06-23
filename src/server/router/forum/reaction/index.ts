import { NextFunction, Request, Response } from 'express';
import {CommentReactions, Reaction} from 'server/models';
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

export const handlePostRequests = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: {
        commentId,
      },
    } = req;

    return commentId ?
      handleCommentReactionCreate(req, res, next) :
      handleReactionCreate(req, res, next);

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


export const handleCommentReactionCreate = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: {
        commentId,
        reactionCode,
      },
    } = req;

    const reaction: Reaction | null = await Reaction.findOne({
      where: {
        code: reactionCode,
      },
    });

    if(!reaction) {
      return sendJSONResponse(
        res,
        {
          data: {},
        },
      );
    }

    const {
      context: {
        user: {
          id,
        },
      },
    } = req;

    const commentReactionToCreateData = {
      userId: id,
      commentId,
      reactionId: reaction.getDataValue('id'),
    };

    const commentReaction: CommentReactions | null = await CommentReactions.create(commentReactionToCreateData);
    return sendJSONResponse(
      res,
      {
        data: commentReaction,
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
