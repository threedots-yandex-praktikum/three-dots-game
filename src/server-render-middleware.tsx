import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { Root } from 'components/Root';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { getInitialState } from 'store/getInitialState';
import { configureStore } from 'store/store';
import rootSaga from 'store/rootSaga';
import {AuthAPIServer} from "modules/api/authAPIServer";
import {setUserAC} from "store/reducers/profileReducer/profileActionCreators";


function getHtml(reactHtml: string, reduxState = {}) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="/app.css" rel="stylesheet">
        <title>Threee dots ssr</title>
  
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
  const context: StaticRouterContext = {};

  if (context.url) {
    res.redirect(context.url);
    return;
  }

  const location = req.url;
  if(location === '/favicon.ico') {
    return res
      .status(204)
      .end();
  }

  const { store } = configureStore(getInitialState(location), location);

  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter context={context} location={location}>
        <Root />
      </StaticRouter>
    </ReduxProvider>
  );

  const cookiesString = Object
    .keys(req.cookies)
    .map(key => `${key}=${req.cookies[key]}`)
    .join('; ');

  return AuthAPIServer
    .getUserDataSSR(cookiesString)
    .then(response => {
      store.dispatch(setUserAC(response));

      return response;
    })
    .then(() => {
      store.runSaga(rootSaga);

      console.log('last then', JSON.stringify(store.getState().profileReducer))

      store.close();

      const reactHtml = renderToString(jsx);
      const html = getHtml(reactHtml, store.getState());
      res
        .status(context.statusCode || 200)
        .send(html);



    });
};
