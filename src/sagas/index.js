import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import usersSaga from './usersSaga';
import mnemonicsSaga from './mnemonicsSaga';
import blockchainsSaga from './blockchainsSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    usersSaga(),
    mnemonicsSaga(),
    blockchainsSaga(),
  ]);
}
