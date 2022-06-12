import { NextFunction, Request, Response, Router } from 'express';
import { sendJSONResponse } from 'server/router/constants';


export const themeRouter = Router();

/*
* здесь задаем миддлвары необходимые для роутера форума
* */
themeRouter.use((req: Request, res: Response, next: NextFunction) => {
  console.log('тестовый мидлвар для темизации');
  next();
});

/*
* далее последовательно описываем все существующие эндпоинты для темизации
* */

themeRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  return sendJSONResponse(
    res,
    {
      message: 'вы запросили /theme',
    },
  );
});
