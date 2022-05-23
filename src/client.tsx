import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from 'components/Root/Root';
import { loadableReady } from '@loadable/component';
import 'babel-polyfill';
import { Router } from 'react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { State } from './store/types/TState';

// global redeclared types
declare global {
  interface Window {
    __INITIAL_STATE__: State;
  }
}
const isServer = !(
  typeof window !== 'undefined' &&
  window.document
);
const history = !isServer
? createBrowserHistory()
: createMemoryHistory({ initialEntries: ['/'] });
loadableReady(() => {
  ReactDOM.hydrate((
    <Router history={history}><Root /></Router>
  
  ), document.getElementById('root'));
});


