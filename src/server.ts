import path from 'path';
import express from 'express';
import compression from 'compression';
import 'babel-polyfill';
import serverRenderMiddleware from './server-render-middleware';
import cookieParser from 'cookie-parser';
import https from 'https';
import fs from 'fs';

const app = express();
app.use(cookieParser());
app
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../static')));

app.get('/*', serverRenderMiddleware);

const secureServer = https.createServer(
  {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert'),
  },
  app,
);

export { app, secureServer };
