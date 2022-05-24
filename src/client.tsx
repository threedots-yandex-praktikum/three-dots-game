import React from 'react';
import { hydrate } from 'react-dom';
import { Root } from 'components/Root/Root';
import 'babel-polyfill';
import { Router } from 'react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { State } from './store/types/TState';
import { Provider } from 'react-redux';
import { store, isServer } from './store/store';
import { hot } from 'react-hot-loader/root';
// global redeclared types
declare global {
  interface Window {
    __INITIAL_STATE__: State;
  }
}

const history = !isServer
? createBrowserHistory()
: createMemoryHistory({ initialEntries: ['/'] });

const App = hot(() => {
  return (
    <Root />    
  );
});
hydrate((
  <Provider store={store}>
    <Router history={history}> <App />  </Router>
  </Provider>
  ), document.getElementById('root'));



