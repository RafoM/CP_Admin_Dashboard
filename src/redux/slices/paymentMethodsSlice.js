import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  error: null,
};

const paymentMethodsSlice = createSlice({
  name: 'paymentMethods',
  initialState,
  reducers: {
    fetchPaymentMethodsRequest: (_state, _action) => {},
    setPaymentMethods: (state, action) => {
      state.list = action.payload;
    },
    setPaymentMethodsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchPaymentMethodsRequest,
  setPaymentMethods,
  setPaymentMethodsError,
} = paymentMethodsSlice.actions;

export default paymentMethodsSlice.reducer;
