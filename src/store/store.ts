import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export { store };
