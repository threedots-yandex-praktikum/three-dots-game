import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
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
import { nonce } from 'server/middlewares/nonce';
import https from 'https';
import fs from 'fs';
import {
  GEOAPIFY_HOST,
  GOOGLE_APIS_FONTS_HOST,
  GSTATIC_FONTS_HOST,
  YANDEX_CLOUD_HOST,
  YANDEX_PRAKTIKUM_TECH_HOST
} from "client/modules/api/httpTransport/constants";


config();

const CSP_RELATED_SELF_STRING = "'self'";

export const startExpressApp = (context: TContext) => {
  const port = process.env.PORT || 5000;
  const isProduction = process.env.NODE_ENV === 'production';
  const app = express();

  app.use(cors({
    origin: YANDEX_CLOUD_HOST,
    credentials: true,
  }));

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
          directives: {
            defaultSrc: ["'none'"],
            'script-src': [CSP_RELATED_SELF_STRING, `'nonce-${nonce}'`, !isProduction ? "'unsafe-eval'" : ''],
            'style-src': [CSP_RELATED_SELF_STRING, "'unsafe-inline'", GOOGLE_APIS_FONTS_HOST],
            fontSrc: [CSP_RELATED_SELF_STRING, GSTATIC_FONTS_HOST, GOOGLE_APIS_FONTS_HOST],
            'connect-src': [CSP_RELATED_SELF_STRING, GOOGLE_APIS_FONTS_HOST, GSTATIC_FONTS_HOST, YANDEX_PRAKTIKUM_TECH_HOST, GEOAPIFY_HOST],
            'img-src': [CSP_RELATED_SELF_STRING, 'data:', YANDEX_PRAKTIKUM_TECH_HOST],
            'worker-src': [CSP_RELATED_SELF_STRING],
          },
        },
      })(req, res, next);
    })
    .get('/*', serverRenderMiddleware);


  const server = isProduction ? https.createServer(
    {
      key: fs.readFileSync('./server.key'),
      cert: fs.readFileSync('./server.cert'),
    },
      app,
    ) : app;

  server.listen(port, () => {
    if (!isProduction) {
      console.log(
        `Приложение запущено по адресу: https://local.${YANDEX_PRAKTIKUM_TECH_HOST}:${port}`,
      );
    }
  },

  );
};
