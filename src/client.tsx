import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from 'components/Root/Root';
import { loadableReady } from '@loadable/component';
import 'babel-polyfill';
import { Router } from 'react-router-dom';
import { createBrowserHistory, createMemoryHistory } from 'history';

const isServer = !(
  typeof window !== 'undefined' &&
  window.document
);
const history = !isServer
? createBrowserHistory()
: createMemoryHistory();
loadableReady(() => {
  ReactDOM.hydrate((
    <Router history={history}><Root /></Router>
  
  ), document.getElementById('root'));
});


