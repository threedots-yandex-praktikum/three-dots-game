import path from 'path';
import express from 'express';
import compression from 'compression';
import 'babel-polyfill';
import serverRenderMiddleware from './server-render-middleware';
import cookieParserMiddleware from 'cookie-parser';

const cookieParser: express.RequestHandler = cookieParserMiddleware();
const middlewares: Array<express.RequestHandler | express.ErrorRequestHandler> = [
  cookieParser,
];
const app = express();
app.use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')))
    .use(express.static(path.resolve(__dirname, '../static')));

app.get('/*', middlewares, serverRenderMiddleware);

export { app };
