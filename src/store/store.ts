import { applyMiddleware, createStore, compose } from 'redux';
import {createRootReducer} from './reducers/rootReducer';
import createSagaMiddleware, {END} from 'redux-saga';
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppStore } from './types/TReduxSaga';
import {createBrowserHistory, createMemoryHistory} from "history";
import rootSaga from "store/rootSaga";


export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export function configureStore(initialState: any, url = '/') {
  const history = isServer
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  const sagaMiddleware = createSagaMiddleware();
  const reactRouterMiddleware = routerMiddleware(history);

  const middlewares = applyMiddleware(reactRouterMiddleware, sagaMiddleware);

  const store = createStore(
    createRootReducer(history),
    initialState,
    isServer ?
      compose(middlewares) :
      composeWithDevTools(middlewares),
  ) as AppStore;

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  if (!isServer) {
    sagaMiddleware.run(rootSaga);
  }

  return { store, history };
}

const { store, history } = configureStore(window.__INITIAL_STATE__);

export type AppDispatch = typeof store.dispatch;

export { store, history };
