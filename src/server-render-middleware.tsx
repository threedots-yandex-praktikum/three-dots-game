import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { Root } from 'components/Root';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { getInitialState } from 'store/getInitialState';
import { configureStore } from 'store/store';


function getHtml(reactHtml: string, reduxState = {}) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/img/favicon.jpg">
        <link href="/app.css" rel="stylesheet">
        <title>Threee dots</title>
  
    </head>
    <body>
        <div id="root">${reactHtml}</div>
        <script src="/app.js"></script>
        <script src="/vendors.js"></script>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
        </script>
    </body>
  </html>
  `;
}
export default (req: Request, res: Response) => {
  const location = req.url;
  const context: StaticRouterContext = {};
  const { store } = configureStore(getInitialState(location), location);

  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter context={context} location={location}>
        <Root />
      </StaticRouter>
    </ReduxProvider>
  );

  const reactHtml = renderToString(jsx);
  const reduxState = store.getState();

  if (context.url) {
    res.redirect(context.url);
    return;
  }

  res
    .status(context.statusCode || 200)
    .send(getHtml(reactHtml, reduxState));

};
