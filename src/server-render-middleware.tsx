import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { Root } from './components/Root';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';

function getHtml(reactHtml: string) {

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="shortcut icon" type="image/png" href="/img/favicon.jpg">
      <title>Threee dots</title>
      <link href="/app.css" rel="stylesheet">
  </head>
  <body>
      <div id="root">${reactHtml}</div>

  </body>
  </html>
  `;
}
export default (req: Request, res: Response) => {
  const location = req.url;
  const context: StaticRouterContext = {};
  const jsx = ( <StaticRouter context={context} location={location}> <Root /></StaticRouter>
 );
  //const jsx = (<div>123</div>);
  const reactHtml = renderToString(jsx);
  if (context.url) {
    res.redirect(context.url);
    return;
  }
  res
  .status(context.statusCode || 200)
  .send(getHtml(reactHtml));
};
