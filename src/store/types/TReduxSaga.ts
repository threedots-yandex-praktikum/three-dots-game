import { Store } from 'redux';
import { SagaMiddleware } from '@redux-saga/core';

export type AppStore = Store & {
    runSaga: SagaMiddleware['run'];
    close: () => void;
};
