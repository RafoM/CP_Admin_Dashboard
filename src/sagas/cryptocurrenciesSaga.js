import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCryptocurrencies,
  createCryptocurrency,
  updateCryptocurrency,
  deleteCryptocurrency,
} from '../services/cryptocurrencies';
import {
  fetchCryptocurrenciesRequest,
  createCryptocurrencyRequest,
  updateCryptocurrencyRequest,
  deleteCryptocurrencyRequest,
  setCryptocurrencies,
  setCryptocurrenciesError,
} from '../redux/slices/cryptocurrenciesSlice';
import { setLoading } from '../redux/slices/uiSlice';

function* handleFetchCryptocurrencies() {
  try {
    yield put(setLoading(true));
    const { data } = yield call(getCryptocurrencies);
    yield put(setCryptocurrencies(data));
  } catch (err) {
    yield put(setCryptocurrenciesError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleCreateCryptocurrency(action) {
  try {
    yield put(setLoading(true));
    yield call(createCryptocurrency, action.payload);
    const { data } = yield call(getCryptocurrencies);
    yield put(setCryptocurrencies(data));
  } catch (err) {
    yield put(setCryptocurrenciesError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleUpdateCryptocurrency(action) {
  try {
    yield put(setLoading(true));
    yield call(updateCryptocurrency, action.payload);
    const { data } = yield call(getCryptocurrencies);
    yield put(setCryptocurrencies(data));
  } catch (err) {
    yield put(setCryptocurrenciesError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleDeleteCryptocurrency(action) {
  try {
    yield put(setLoading(true));
    yield call(deleteCryptocurrency, action.payload);
    const { data } = yield call(getCryptocurrencies);
    yield put(setCryptocurrencies(data));
  } catch (err) {
    yield put(setCryptocurrenciesError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

export default function* cryptocurrenciesSaga() {
  yield takeLatest(fetchCryptocurrenciesRequest.type, handleFetchCryptocurrencies);
  yield takeLatest(createCryptocurrencyRequest.type, handleCreateCryptocurrency);
  yield takeLatest(updateCryptocurrencyRequest.type, handleUpdateCryptocurrency);
  yield takeLatest(deleteCryptocurrencyRequest.type, handleDeleteCryptocurrency);
}
