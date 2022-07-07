import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { config } from 'dotenv';
import 'babel-polyfill';
import { FORUM_ROUTE, USER_ROUTE } from 'server/router/constants';
import { forumRouter, userRouter } from 'server/router';
import { serverRenderMiddleware } from 'server/middlewares/serverRenderMiddleware';
import { contextMiddleware } from 'server/middlewares/contextMiddleware';
import bodyParser from 'body-parser';
import { TContext } from 'server/types';
import helmet from 'helmet';
import { nonce } from '../../server/middlewares/nonce';
config();



export const startExpressApp = (context: TContext) => {
  const port = process.env.PORT || 5000;
  const isProduction = process.env.NODE_ENV === 'production';
  const app = express();

  app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cookieParser())
    .use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')))
    .use(express.static(path.resolve(__dirname, '../static')))
    .use(contextMiddleware(context))
    .use(FORUM_ROUTE, forumRouter)
    .use(USER_ROUTE, userRouter)
    .use(nonce)
    .use((req, res, next) => {
      const { nonce } = res.locals;  
      
      helmet({
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'script-src': ["'self'", `'nonce-${nonce}'`, !isProduction ? "'unsafe-eval'" : ''],
            'style-src': ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
            'connect-src': ["'self'", 'localhost'],
            'img-src': ["'self'", 'data:'],
            'object-src': ["'self'"],
          },
        },
      })(req, res, next);
    })
    .get('/*', serverRenderMiddleware);

  app.listen(port, () =>
    console.log(
      `Приложение запущено по адресу: http://localhost:${port}`,
    ),
  );
};
