import { call, put, takeLatest } from 'redux-saga/effects';
import { getPaymentMethods } from '../services/paymentMethods';
import {
  fetchPaymentMethodsRequest,
  setPaymentMethods,
  setPaymentMethodsError,
} from '../redux/slices/paymentMethodsSlice';
import { setLoading } from '../redux/slices/uiSlice';

function* handleFetchPaymentMethods(action) {
  try {
    yield put(setLoading(true));
    const params = {};
    const { blockchainId, cryptoId, status } = action.payload || {};
    if (blockchainId) params.blockchainId = blockchainId;
    if (cryptoId) params.cryptoId = cryptoId;
    if (status) params.status = status;
    const { data } = yield call(getPaymentMethods, params);
    yield put(setPaymentMethods(data));
  } catch (err) {
    yield put(setPaymentMethodsError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

export default function* paymentMethodsSaga() {
  yield takeLatest(fetchPaymentMethodsRequest.type, handleFetchPaymentMethods);
}
