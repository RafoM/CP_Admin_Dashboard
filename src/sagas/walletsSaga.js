import { call, put, takeLatest } from 'redux-saga/effects';
import { getWallets, generateWallets } from '../services/wallets';
import {
  fetchWalletsRequest,
  createWalletsRequest,
  setWallets,
  setWalletsError,
} from '../redux/slices/walletsSlice';
import { setLoading } from '../redux/slices/uiSlice';

function* handleFetchWallets() {
  try {
    yield put(setLoading(true));
    const { data } = yield call(getWallets);
    yield put(setWallets(data));
  } catch (err) {
    yield put(setWalletsError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleCreateWallets(action) {
  try {
    yield put(setLoading(true));
    yield call(generateWallets, action.payload);
    const { data } = yield call(getWallets);
    yield put(setWallets(data));
  } catch (err) {
    yield put(setWalletsError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

export default function* walletsSaga() {
  yield takeLatest(fetchWalletsRequest.type, handleFetchWallets);
  yield takeLatest(createWalletsRequest.type, handleCreateWallets);
}
