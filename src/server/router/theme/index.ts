import { Router } from 'express';
import { sendJSONResponse } from "server/router/constants";


export const themeRouter = new Router();

/*
* здесь задаем миддлвары необходимые для роутера форума
* */
themeRouter.use((req, res, next) => {
  console.log('тестовый мидлвар для темизации');
  next();
});

/*
* далее последовательно описываем все существующие эндпоинты для темизации
* */

themeRouter.get('/', (req, res) => {
  return sendJSONResponse(
    res,
    {
      message: 'вы запросили /theme',
    },
  );
});
