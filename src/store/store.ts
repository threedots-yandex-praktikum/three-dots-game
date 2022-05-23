import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers/rootReducer';
import createSagaMiddleware, { END } from 'redux-saga';
import rootSaga from './rootSaga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppStore } from './types/TReduxSaga';
const sagaMiddleware = createSagaMiddleware();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const isServer = !(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);
const store = createStore(
  rootReducer,
  isServer ? compose(applyMiddleware(sagaMiddleware)) : composeWithDevTools(applyMiddleware(sagaMiddleware)),
) as AppStore;

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);

if (!isServer) {
  sagaMiddleware.run(rootSaga);
}
export { store };
