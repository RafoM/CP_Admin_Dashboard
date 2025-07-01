import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../services/api';
import { loginRequest, loginSuccess, registerRequest } from '../redux/slices/authSlice';
import { setLoading } from '../redux/slices/uiSlice';

function* handleLogin(action) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(api.post, '/login', action.payload);
    yield put(loginSuccess(data));
  } catch (err) {
    console.error(err);
  } finally {
    yield put(setLoading(false));
  }
}

function* handleRegister(action) {
  try {
    yield put(setLoading(true));
    yield call(api.post, '/register', action.payload);
  } catch (err) {
    console.error(err);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
}
