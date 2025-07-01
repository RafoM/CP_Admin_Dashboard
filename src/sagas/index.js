import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import usersSaga from './usersSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    usersSaga(),
  ]);
}
