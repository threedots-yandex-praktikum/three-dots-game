import React from 'react';
import { hydrate } from 'react-dom';
import { Root } from 'components/Root/Root';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { ConnectedRouter } from 'connected-react-router';
import { history, store } from 'store/store';
import { RootState } from 'store/reducers/rootReducer';


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

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);



