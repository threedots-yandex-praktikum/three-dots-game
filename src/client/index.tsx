import React from 'react';
import { hydrate } from 'react-dom';
import { Root } from 'client/components/Root/Root';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { ConnectedRouter } from 'connected-react-router';
import { history, store } from 'client/store/store';
import { RootState } from 'client/store/reducers/rootReducer';
import { loadableReady } from '@loadable/component';

// global redeclared types
declare global {
  interface Window {
    __INITIAL_STATE__: RootState;
  }
}

const App = hot(() => {

  return (
    <Root />
  );
});
loadableReady (
  ()=>{
    hydrate(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App/>
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root'),
    );
  },
);


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./serviceWorker.js')
      .then((reg) => {
        console.log('СВ зарегистрирован: ', reg);
      })
      .catch((err) => {
        console.error('Регистрация СВ провалилась: ', err);
      });
  });
}

