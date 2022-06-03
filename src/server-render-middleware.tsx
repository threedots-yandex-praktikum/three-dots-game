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
import { UserController } from './controllers/UserController';
import routes from './routes';
import { isFunction as _isFunction } from 'lodash'
import _identity from 'lodash/identity';

import { loginOnServerAC } from './store/reducers/authReducer/authActionCreators';


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
  const context: StaticRouterContext = {};

  if (context.url) {
    res.redirect(context.url);
    return;
  }

  const location = req.url;

  const { store } = configureStore(getInitialState(location), location);
  const reduxState = store.getState();

  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter context={context} location={location}>
        <Root />
      </StaticRouter>
    </ReduxProvider>
  );

  /*
  * запускаем сагу и формируем разметку приложения
  * */
  store.runSaga(rootSaga);

  const reactHtml = renderToString(jsx);
  const html = getHtml(reactHtml, reduxState);
  res
    .status(context.statusCode || 200)
    .send(html);

  /*
  * получаем и выполняем необходимые для текущей страницы приложения асинхронные действия, на этом этапе вызываются
  * запросы данных и укладываются в стор.
  * Когда все необходимые запросы выполнены - мидлвар отдает страницу браузеру
  * */
  const getUserDataCallback = () => {
    const cookie = JSON.stringify(req.cookies)
    console.log(cookie, 'cookies');
    store.dispatch(loginOnServerAC(cookie, _identity))

  }
  const asyncActionsPromisesArray = [
    UserController.fetchAndSetSignedUserData(getUserDataCallback),
    ...routes
      .map(({ fetchData }) => _isFunction(fetchData) ? fetchData(store.dispatch) : Promise.resolve())
  ];

  return Promise.all(asyncActionsPromisesArray)
    .then(() => {
      store.close();
    });
}; 
