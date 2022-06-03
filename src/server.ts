import path from "path";
import express from "express";
import compression from "compression";
import "babel-polyfill";
import serverRenderMiddleware from "./server-render-middleware";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app
  .use(compression())
  .use(express.static(path.resolve(__dirname, "../dist")))
  .use(express.static(path.resolve(__dirname, "../static")));

app.get("/*", serverRenderMiddleware);

export { app };
