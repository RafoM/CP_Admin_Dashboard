import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getBlockchains,
  createBlockchain,
  updateBlockchain,
  deleteBlockchain,
} from '../services/blockchains';
import {
  fetchBlockchainsRequest,
  createBlockchainRequest,
  updateBlockchainRequest,
  deleteBlockchainRequest,
  setBlockchains,
  addBlockchain,
  modifyBlockchain,
  removeBlockchain,
  setBlockchainsError,
} from '../redux/slices/blockchainsSlice';
import { setLoading } from '../redux/slices/uiSlice';

function* handleFetchBlockchains() {
  try {
    yield put(setLoading(true));
    const { data } = yield call(getBlockchains);
    yield put(setBlockchains(data));
  } catch (err) {
    yield put(setBlockchainsError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleCreateBlockchain(action) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(createBlockchain, action.payload);
    yield put(addBlockchain(data));
  } catch (err) {
    yield put(setBlockchainsError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleUpdateBlockchain(action) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(updateBlockchain, action.payload);
    yield put(modifyBlockchain(data));
  } catch (err) {
    yield put(setBlockchainsError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleDeleteBlockchain(action) {
  try {
    yield put(setLoading(true));
    yield call(deleteBlockchain, action.payload);
    yield put(removeBlockchain(action.payload));
  } catch (err) {
    yield put(setBlockchainsError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

export default function* blockchainsSaga() {
  yield takeLatest(fetchBlockchainsRequest.type, handleFetchBlockchains);
  yield takeLatest(createBlockchainRequest.type, handleCreateBlockchain);
  yield takeLatest(updateBlockchainRequest.type, handleUpdateBlockchain);
  yield takeLatest(deleteBlockchainRequest.type, handleDeleteBlockchain);
}
