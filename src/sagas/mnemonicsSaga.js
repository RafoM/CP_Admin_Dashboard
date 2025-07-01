import { call, put, takeLatest } from 'redux-saga/effects';
import { getMnemonics, createMnemonic } from '../services/mnemonics';
import {
  fetchMnemonicsRequest,
  createMnemonicRequest,
  setMnemonics,
  addMnemonic,
  setMnemonicsError,
} from '../redux/slices/mnemonicsSlice';
import { setLoading } from '../redux/slices/uiSlice';

function* handleFetchMnemonics() {
  try {
    yield put(setLoading(true));
    const { data } = yield call(getMnemonics);
    yield put(setMnemonics(data));
  } catch (err) {
    yield put(setMnemonicsError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleCreateMnemonic(action) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(createMnemonic, action.payload);
    yield put(addMnemonic(data));
  } catch (err) {
    yield put(setMnemonicsError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

export default function* mnemonicsSaga() {
  yield takeLatest(fetchMnemonicsRequest.type, handleFetchMnemonics);
  yield takeLatest(createMnemonicRequest.type, handleCreateMnemonic);
}
