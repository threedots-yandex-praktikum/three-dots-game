// import path from 'path';
// import { ChunkExtractor } from '@loadable/server';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { Root } from './components/Root';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store';
//import rootSaga from './store/rootSaga';


function getHtml(reactHtml: string, reduxState = {}) {
  // const scriptTags = chunkExtractor.getScriptTags();
  // const linkTags = chunkExtractor.getLinkTags();
  // const styleTags = chunkExtractor.getStyleTags();
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
      <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
      </script>
      <script>
        if ("serviceWorker" in navigator) {
          window.addEventListener("load", () => {
            navigator.serviceWorker
              .register("./service-worker.js")
              .then((reg) => {
                console.log("СВ зарегистрирован: ", reg);
              })
              .catch((err) => {
                console.error("Регистрация СВ провалилась: ", err);
              });
          });
        }      
      </script>
  </body>
  </html>
  `;
}
export default (req: Request, res: Response) => {
  const location = req.url;
  const context: StaticRouterContext = {};

  function renderApp() { 
    // const statsFile = path.resolve('./dist/loadable-stats.json');
    // const chunkExtractor = new ChunkExtractor({ statsFile });

  //   const jsx = chunkExtractor.collectChunks( 
  //     <ReduxProvider store={store}>
  //       <StaticRouter context={context} location={location}> 
  //         <Root />
  //       </StaticRouter>
  //     </ReduxProvider>,
  
  //  );
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
  }
  // store
  //   .runSaga(rootSaga)
  //   .toPromise()
  //   .then(() => renderApp())
  //   .catch(err => {
  //     throw err;
  //   });
  // const dataRequirements: (Promise<void> | void)[] = [];
  // return Promise.all(dataRequirements).then(() => store.close()).catch(err => { throw err; });
  return renderApp();
};
