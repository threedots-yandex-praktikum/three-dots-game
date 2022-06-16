import { NextFunction, Request, Response, Router } from 'express';
import { sendJSONResponse } from 'server/router/constants';
import { Theme } from 'server/models/';


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


themeRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const theme: Theme | null = await Theme.create({
      ...req.body,
    });
    
    return sendJSONResponse(
      res,
      {
        data: theme,
      },
    );
  } catch (e) {
    next(e);
  }
});
