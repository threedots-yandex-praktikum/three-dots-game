import { NextFunction, Request, Response } from 'express';
import { sendJSONResponse } from 'server/router/constants';
import { topicStatus } from 'server/models/topic';
import { Comment, User, Topic } from 'server/models/';


export const handleTopicGetRequests = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      query: {
        topicId,
      },
    } = req;

    if(topicId) {
      return handleGetSingleTopic(req, res, next);
    }

    return handleGetAllTopics(req, res, next);

  } catch (e) {
    next(e);
  }
};

export const handleGetAllTopics = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const topic: Topic[] = await Topic
      .findAll({
        where: {
          status: topicStatus.OPEN,
        },
        include: [
          User,
          {
            model: Comment,
            where: {
              parentId: null,
            },
            order: [['createdAt', 'DESC']],
            limit: 1,
            include: [
              {
                model: User,
                attributes: ['name'],
              },
            ],
          },
        ],
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

export const handleGetSingleTopic = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { id },
    } = req;

    const topic: Topic | null = await Topic.findOne({
      include: [
        {
          model: Comment,
          attributes: ['id', 'message'],
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
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

export const handleTopicCreate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const topic: Topic | null = await Topic.create({
      userId: req.context.user.id,
      name: req.body.name,
      status: topicStatus.OPEN,
    });

    await Comment.create({
      userId: req.context.user.id,
      topicId: Number(topic.getDataValue('id')),
      parentId: null,
      message: req.body.message,
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

export const handleTopicUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      body: {
        topicId,
      },
    } = req;

    await Topic.update(
      {
        status: topicStatus.CLOSED,
      },
      {
        where: { id: topicId },
      },
    );

    return sendJSONResponse(
      res,
      {
        data: topicId,
      },
    );
  } catch (e) {
    next(e);
  }
};

export const handleTopicDelete = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { id },
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
