import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import usersSaga from './usersSaga';
import mnemonicsSaga from './mnemonicsSaga';
import blockchainsSaga from './blockchainsSaga';
import cryptocurrenciesSaga from './cryptocurrenciesSaga';
import paymentMethodsSaga from './paymentMethodsSaga';
import walletsSaga from './walletsSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    usersSaga(),
    mnemonicsSaga(),
    blockchainsSaga(),
    cryptocurrenciesSaga(),
    paymentMethodsSaga(),
    walletsSaga(),
  ]);
}
