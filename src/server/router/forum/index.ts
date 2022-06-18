import { Router } from "express";
import {
  COMMENT_SUB_ROUTE,
  COMMENT_WITH_ID_SUB_ROUTE,
  REACTION_SUB_ROUTE,
  REACTION_WITH_ID_SUB_ROUTE,
  TOPIC_SUB_ROUTE,
  TOPIC_WITH_ID_SUB_ROUTE,
} from "server/router/constants";
import {
  handleCommentCreate,
  handleCommentDelete,
  handleCommentUpdate,
  handleGetAllComments,
  handleGetSingleComment,
} from "./comment";
import {
  handleGetAllTopics,
  handleGetSingleTopic,
  handleTopicCreate,
  handleTopicDelete,
  handleTopicUpdate,
} from "./topic";
import { authMiddleware } from "server/middlewares/authMiddleware";
import {
  handleGetAllReactions,
  handleGetSingleReaction,
  handleReactionCreate,
  handleReactionDelete,
  handleReactionUpdate,
} from "server/router/forum/reaction";
import { syncronizeDBMiddleware } from "../../middlewares/syncronizeDBMiddleware";

export const forumRouter = Router();

/*
 * здесь задаем миддлвары необходимые только для роутера форума
 * */
forumRouter.use(authMiddleware);
forumRouter.use(syncronizeDBMiddleware);

/*
 * CRUD API для модели комментария
 * */
forumRouter.get(COMMENT_SUB_ROUTE, handleGetAllComments);
forumRouter.get(COMMENT_WITH_ID_SUB_ROUTE, handleGetSingleComment);
forumRouter.post(COMMENT_SUB_ROUTE, handleCommentCreate);
forumRouter.put(COMMENT_WITH_ID_SUB_ROUTE, handleCommentUpdate);
forumRouter.delete(COMMENT_WITH_ID_SUB_ROUTE, handleCommentDelete);

/*
 * CRUD API для модели реакции
 * */
forumRouter.get(REACTION_SUB_ROUTE, handleGetAllReactions);
forumRouter.get(REACTION_WITH_ID_SUB_ROUTE, handleGetSingleReaction);
forumRouter.post(REACTION_SUB_ROUTE, handleReactionCreate);
forumRouter.put(REACTION_WITH_ID_SUB_ROUTE, handleReactionUpdate);
forumRouter.delete(REACTION_WITH_ID_SUB_ROUTE, handleReactionDelete);

/*
 * CRUD API для модели топиков
 * */
forumRouter.get(TOPIC_SUB_ROUTE, handleGetAllTopics);
forumRouter.get(TOPIC_WITH_ID_SUB_ROUTE, handleGetSingleTopic);
forumRouter.post(TOPIC_SUB_ROUTE, handleTopicCreate);
forumRouter.put(TOPIC_WITH_ID_SUB_ROUTE, handleTopicUpdate);
forumRouter.delete(TOPIC_WITH_ID_SUB_ROUTE, handleTopicDelete);
