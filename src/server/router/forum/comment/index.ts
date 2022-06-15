import { NextFunction, Request, Response } from 'express';
import { Comment } from 'server/models';
import { sendJSONResponse } from 'server/router/constants';


export const handleGetAllComments = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const comments: Comment[] = await Comment.findAll();
    return sendJSONResponse(
      res,
      {
        data: comments,
      },
    );
  } catch (e) {
    next(e);
  }
};

export const handleGetSingleComment = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: {
        id,
      },
    } = req;

    const comment: Comment | null = await Comment.findOne({
      where: {
        id,
      },
    });
    return sendJSONResponse(
      res,
      {
        data: comment,
      },
    );
  } catch (e) {
    next(e);
  }
};

export const handleCommentCreate = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const comment: Comment | null = await Comment.create(req.body);
    return sendJSONResponse(
      res,
      {
        data: comment,
      },
    );
  } catch (e) {
    next(e);
  }
};

export const handleCommentUpdate = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: {
        id,
      },
    } = req;

    await Comment.update(
      req.body,
      {
        where: { id },
      },
    );

    return sendJSONResponse(
      res,
      {
        data: id,
      },
    );
  } catch (e) {
    next(e);
  }
};

export const handleCommentDelete = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: {
        id,
      },
    } = req;

    await Comment.destroy({
      where: { id },
    });

    return res
      .status(200)
      .send();
  } catch (e) {
    next(e);
  }
};