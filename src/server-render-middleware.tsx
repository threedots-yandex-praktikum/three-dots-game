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
import path from 'path';
import { ChunkExtractor } from '@loadable/server';

function getHtml(reactHtml: string, reduxState = {}, chunkExtractor: ChunkExtractor) {
  const scriptTags = chunkExtractor.getScriptTags();
  const linkTags = chunkExtractor.getLinkTags();
  const styleTags = chunkExtractor.getStyleTags();
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/img/favicon.jpg">
        ${linkTags}
        ${styleTags}
        <title>Threee dots</title>
  
    </head>
    <body>
        <div id="root">${reactHtml}</div>
        ${scriptTags}
       
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
  const statsFile = path.resolve('./dist/loadable-stats.json');
  const chunkExtractor = new ChunkExtractor({ statsFile });
  if (context.url) {
    res.redirect(context.url);
    return;
  }

  const location = req.url;

  const { store } = configureStore(getInitialState(location), location);
  const reduxState = store.getState();

  const jsx = chunkExtractor.collectChunks(
    <ReduxProvider store={store}>
      <StaticRouter context={context} location={location}>
        <Root />
      </StaticRouter>
    </ReduxProvider>,
  );

  /*
  * запускаем сагу и формируем разметку приложения
  * */
  store.runSaga(rootSaga);

  const reactHtml = renderToString(jsx);
  const html = getHtml(reactHtml, reduxState, chunkExtractor);
  res
    .status(context.statusCode || 200)
    .send(html);

  /*
  * получаем и выполняем необходимые для текущей страницы приложения асинхронные действия, на этом этапе вызываются
  * запросы данных и укладываются в стор.
  * Когда все необходимые запросы выполнены - мидлвар отдает страницу браузеру
  * */
  // const asyncActionsPromisesArray = [
  //   UserController.fetchAndSetSignedUserData(undefined, store.dispatch),
  //   ...routes
  //     .map(({ fetchData }) => _isFunction(fetchData) ? fetchData(store.dispatch) : Promise.resolve())
  // ];
  //
  // return Promise.all(asyncActionsPromisesArray)
  //   .then(() => {
  //     store.close();
  //   });
};