import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { Root } from 'client/components/Root';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { getInitialState } from 'client/store/getInitialState';
import { configureStore } from 'client/store/store';
import rootSaga from 'client/store/rootSaga';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import { AuthAPIServer } from 'client/modules/api/authAPIServer';
import { setUserAC } from 'client/store/reducers/profileReducer/profileActionCreators';
import { TProfileState } from 'client/store/reducers/profileReducer/types';
import { getThemeAC } from '../../client/store/reducers/themeReducer/themeActionCreators';

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
        ${linkTags}
        ${styleTags}
        <title>Threee dots</title>
  
    </head>
    <body>
        <div id="root">${reactHtml}</div>
        ${scriptTags}
        
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
        </script>

    </body>
  </html>
  `;
}
export const serverRenderMiddleware = (req: Request, res: Response) => {
  const context: StaticRouterContext = {};
  const statsFile = path.resolve('./dist/loadable-stats.json');
  const chunkExtractor = new ChunkExtractor({ statsFile, entrypoints: 'app' });
  if (context.url) {
    res.redirect(context.url);
    return;
  }

  const location = req.url;
  if (location === '/favicon.ico') {
    return res
      .status(204)
      .end();
  }

  const { store } = configureStore(getInitialState(location), location);

  const jsx = chunkExtractor.collectChunks(
    <ReduxProvider store={store}>
      <StaticRouter context={context} location={location}>
        <Root />
      </StaticRouter>
    </ReduxProvider>,
  );

  const renderPageCallback = () => {
    store.runSaga(rootSaga);

    store.close();

    const reactHtml = renderToString(jsx);

    const html = getHtml(reactHtml, store.getState(), chunkExtractor);
    res
      .status(context.statusCode || 200)
      .send(html);
  };

  return AuthAPIServer
    .getUserDataSSR(req.cookies)
    .then(response => {
      console.log(response, 'response in ssr middleW 1');
      store.dispatch(getThemeAC(response.id, response.first_name));
      console.log('response in ssr middleW 2');
      return response;
    })
    .then(response => {
      console.log(response, 'setUserAC response in ssr middleW 3');
      store.dispatch(setUserAC(response as TProfileState));
      return response;
    })
    .then(renderPageCallback)
    .catch(renderPageCallback);
};
