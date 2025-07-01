import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} from '../services/paymentMethods';
import {
  fetchPaymentMethodsRequest,
  createPaymentMethodRequest,
  updatePaymentMethodRequest,
  deletePaymentMethodRequest,
  setPaymentMethods,
  addPaymentMethod,
  modifyPaymentMethod,
  removePaymentMethod,
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

function* handleCreatePaymentMethod(action) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(createPaymentMethod, action.payload);
    yield put(addPaymentMethod(data));
  } catch (err) {
    yield put(setPaymentMethodsError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleUpdatePaymentMethod(action) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(updatePaymentMethod, action.payload);
    yield put(modifyPaymentMethod(data));
  } catch (err) {
    yield put(setPaymentMethodsError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleDeletePaymentMethod(action) {
  try {
    yield put(setLoading(true));
    yield call(deletePaymentMethod, action.payload);
    yield put(removePaymentMethod(action.payload));
  } catch (err) {
    yield put(setPaymentMethodsError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

export default function* paymentMethodsSaga() {
  yield takeLatest(fetchPaymentMethodsRequest.type, handleFetchPaymentMethods);
  yield takeLatest(createPaymentMethodRequest.type, handleCreatePaymentMethod);
  yield takeLatest(updatePaymentMethodRequest.type, handleUpdatePaymentMethod);
  yield takeLatest(deletePaymentMethodRequest.type, handleDeletePaymentMethod);
}
