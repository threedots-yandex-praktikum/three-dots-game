import { Request, Response, Router } from 'express';
import {
  COMMENT_SUB_ROUTE,
  COMMENT_WITH_ID_SUB_ROUTE,
  sendJSONResponse,
  TOPIC_SUB_ROUTE,
} from 'server/router/constants';
import {
  handleCommentCreate,
  handleCommentDelete,
  handleCommentUpdate,
  handleGetAllComments,
  handleGetSingleComment,
} from './comment';
import { authMiddleware } from 'server/middlewares/authMiddleware';


export const forumRouter = Router();

/*
* здесь задаем миддлвары необходимые только для роутера форума
* */
forumRouter.use(authMiddleware);

forumRouter.get('/', (req: Request, res: Response) => {
  return sendJSONResponse(
    res,
    {
      message: 'вы запросили /forum',
    },
  );
});

forumRouter.get(`${TOPIC_SUB_ROUTE}/:topic_id`, (req: Request, res: Response) => {
  const {
    params: {
      topic_id,
    },
  } = req;

  return sendJSONResponse(
    res,
    {
      message: `вы запросили /forum/:${topic_id}`,
    },
  );
});

/*
* CRUD API для модели комментария
* */
forumRouter.get(COMMENT_SUB_ROUTE, handleGetAllComments);
forumRouter.get(COMMENT_WITH_ID_SUB_ROUTE, handleGetSingleComment);
forumRouter.post(COMMENT_SUB_ROUTE, handleCommentCreate);
forumRouter.put(COMMENT_WITH_ID_SUB_ROUTE, handleCommentUpdate);
forumRouter.delete(COMMENT_WITH_ID_SUB_ROUTE, handleCommentDelete);
