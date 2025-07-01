import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  error: null,
};

const cryptocurrenciesSlice = createSlice({
  name: 'cryptocurrencies',
  initialState,
  reducers: {
    fetchCryptocurrenciesRequest: () => {},
    createCryptocurrencyRequest: (_state, _action) => {},
    updateCryptocurrencyRequest: (_state, _action) => {},
    deleteCryptocurrencyRequest: (_state, _action) => {},
    setCryptocurrencies: (state, action) => {
      state.list = action.payload;
    },
    addCryptocurrency: (state, action) => {
      state.list.push(action.payload);
    },
    modifyCryptocurrency: (state, action) => {
      const idx = state.list.findIndex(c => c.id === action.payload.id);
      if (idx !== -1) state.list[idx] = action.payload;
    },
    removeCryptocurrency: (state, action) => {
      state.list = state.list.filter(c => c.id !== action.payload);
    },
    setCryptocurrenciesError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchCryptocurrenciesRequest,
  createCryptocurrencyRequest,
  updateCryptocurrencyRequest,
  deleteCryptocurrencyRequest,
  setCryptocurrencies,
  addCryptocurrency,
  modifyCryptocurrency,
  removeCryptocurrency,
  setCryptocurrenciesError,
} = cryptocurrenciesSlice.actions;

export default cryptocurrenciesSlice.reducer;
