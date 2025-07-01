import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../services/api';
import { fetchUsersRequest, setUsers } from '../redux/slices/usersSlice';
import { setLoading } from '../redux/slices/uiSlice';

function* handleFetchUsers() {
  try {
    yield put(setLoading(true));
    const { data } = yield call(api.get, '/users');
    yield put(setUsers(data));
  } catch (err) {
    console.error(err);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* usersSaga() {
  yield takeLatest(fetchUsersRequest.type, handleFetchUsers);
}
