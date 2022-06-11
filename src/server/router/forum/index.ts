import {Request, Response, NextFunction, Router} from 'express';
import {sendJSONResponse} from "server/router/constants";


export const forumRouter = new Router();

/*
* здесь задаем миддлвары необходимые для роутера форума
* */
forumRouter.use((req: Request, res: Response, next: NextFunction) => {
  console.log('тестовый мидлвар для форума');
  next();
});

/*
* далее последовательно описываем все существующие эндпоинты для форума, обработчики лучше выносить в отдельные функции,
* но здесь для простоты оставил оформление обработчика прямо в аргументах вызова get
* */

forumRouter.get('/', (req: Request, res: Response) => {
  return sendJSONResponse(
    res,
    {
      message: 'вы запросили /forum',
    },
  );
});

forumRouter.get('/:topic_id', (req: Request, res: Response) => {
  const {
    params: {
      topic_id,
    },
  } = req;

  console.log('запрошенный идентификатор топика: ', topic_id);

  return sendJSONResponse(
    res,
    {
      message: 'вы запросили /forum/:topic_id',
    },
  );
});
