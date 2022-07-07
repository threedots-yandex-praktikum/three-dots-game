import express from 'express';
import path from 'path';
import https from 'https';
import fs from 'fs';
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

config();

export const startExpressApp = (context: TContext) => {
  const port = process.env.PORT || 5000;

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
    .get('/*', serverRenderMiddleware);

  const secureServer = https.createServer(
    {
      key: fs.readFileSync('./server.key'),
      cert: fs.readFileSync('./server.cert'),
    },
    app,
  );

  secureServer.listen(port, () =>
    console.log(
      `Приложение запущено по адресу: https://localhost:${port}`,
    ),
  );
};
