import { NextFunction, Request, Response } from 'express';
import { Topic } from 'server/models';
import { sendJSONResponse } from 'server/router/constants';


export const handleGetAllTopics = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const topic: Topic[] = await Topic.findAll();
    
    return sendJSONResponse(
      res,
      {
        data: topic,
      },
    );
  } catch (e) {
    next(e);
  }
};

export const handleGetSingleTopic = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: {
        id,
      },
    } = req;

    const topic: Topic | null = await Topic.findOne({
      where: {
        id,
      },
    });
    return sendJSONResponse(
      res,
      {
        data: topic,
      },
    );
  } catch (e) {
    next(e);
  }
};

export const handleTopicCreate = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const topic: Topic | null = await Topic.create(req.body);
    
    return sendJSONResponse(
      res,
      {
        data: topic,
      },
    );
  } catch (e) {
    next(e);
  }
};

export const handleTopicUpdate = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: {
        id,
      },
    } = req;

    await Topic.update(
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

export const handleTopicDelete = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: {
        id,
      },
    } = req;

    await Topic.destroy({
      where: { id },
    });
    
    return sendJSONResponse(
      res,
      {
        data: 'ok',
      },
    );
  } catch (e) {
    next(e);
  }
};
