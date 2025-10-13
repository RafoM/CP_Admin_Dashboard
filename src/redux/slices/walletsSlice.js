import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  error: null,
};

const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    fetchWalletsRequest: () => {},
    createWalletsRequest: (_state, _action) => {},
    setWallets: (state, action) => {
      state.list = action.payload;
    },
    setWalletsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchWalletsRequest,
  createWalletsRequest,
  setWallets,
  setWalletsError,
} = walletsSlice.actions;

export default walletsSlice.reducer;
