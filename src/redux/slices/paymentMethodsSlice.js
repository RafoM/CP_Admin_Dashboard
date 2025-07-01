import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  error: null,
};

const paymentMethodsSlice = createSlice({
  name: 'paymentMethods',
  initialState,
  reducers: {
    fetchPaymentMethodsRequest: () => {},
    createPaymentMethodRequest: (_state, _action) => {},
    updatePaymentMethodRequest: (_state, _action) => {},
    deletePaymentMethodRequest: (_state, _action) => {},
    setPaymentMethods: (state, action) => {
      state.list = action.payload;
    },
    addPaymentMethod: (state, action) => {
      state.list.push(action.payload);
    },
    modifyPaymentMethod: (state, action) => {
      const idx = state.list.findIndex(m => m.id === action.payload.id);
      if (idx !== -1) state.list[idx] = action.payload;
    },
    removePaymentMethod: (state, action) => {
      state.list = state.list.filter(m => m.id !== action.payload);
    },
    setPaymentMethodsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchPaymentMethodsRequest,
  createPaymentMethodRequest,
  updatePaymentMethodRequest,
  deletePaymentMethodRequest,
  setPaymentMethods,
  addPaymentMethod,
  modifyPaymentMethod,
  removePaymentMethod,
  setPaymentMethodsError,
} = paymentMethodsSlice.actions;

export default paymentMethodsSlice.reducer;
