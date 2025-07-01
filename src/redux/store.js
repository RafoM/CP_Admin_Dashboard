import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import usersReducer from './slices/usersSlice';
import mnemonicsReducer from './slices/mnemonicsSlice';
import blockchainsReducer from './slices/blockchainsSlice';
import cryptocurrenciesReducer from './slices/cryptocurrenciesSlice';
import paymentMethodsReducer from './slices/paymentMethodsSlice';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    users: usersReducer,
    mnemonics: mnemonicsReducer,
    blockchains: blockchainsReducer,
    cryptocurrencies: cryptocurrenciesReducer,
    paymentMethods: paymentMethodsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
