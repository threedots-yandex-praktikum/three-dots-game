import { NextFunction, Request, Response } from 'express';
import { Reply } from 'server/models';
import { sendJSONResponse } from 'server/router/constants';


export const handleGetAllReplies = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const replies: Reply[] = await Reply.findAll();
    return sendJSONResponse(
      res,
      {
        data: replies,
      },
    );
  } catch (e) {
    next(e);
  }
};

export const handleGetSingleReply = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: {
        id,
      },
    } = req;

    const reply: Reply | null = await Reply.findOne({
      where: {
        id,
      },
    });
    return sendJSONResponse(
      res,
      {
        data: reply,
      },
    );
  } catch (e) {
    next(e);
  }
};

export const handleReplyCreate = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const reply: Reply | null = await Reply.create(req.body);
    return sendJSONResponse(
      res,
      {
        data: reply,
      },
    );
  } catch (e) {
    next(e);
  }
};

export const handleReplyUpdate = async(req: Request, res: Response, next: NextFunction) => {
  res
    .status(404)
    .send();
};

export const handleReplyDelete = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: {
        id,
      },
    } = req;

    await Reply.destroy({
      where: { id },
    });

    return res
      .status(200)
      .send();
  } catch (e) {
    next(e);
  }
};
