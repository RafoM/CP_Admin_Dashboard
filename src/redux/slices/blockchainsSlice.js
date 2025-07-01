import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  error: null,
};

const blockchainsSlice = createSlice({
  name: 'blockchains',
  initialState,
  reducers: {
    fetchBlockchainsRequest: () => {},
    createBlockchainRequest: (_state, _action) => {},
    updateBlockchainRequest: (_state, _action) => {},
    deleteBlockchainRequest: (_state, _action) => {},
    setBlockchains: (state, action) => {
      state.list = action.payload;
    },
    addBlockchain: (state, action) => {
      state.list.push(action.payload);
    },
    modifyBlockchain: (state, action) => {
      const idx = state.list.findIndex(b => b.id === action.payload.id);
      if (idx !== -1) state.list[idx] = action.payload;
    },
    removeBlockchain: (state, action) => {
      state.list = state.list.filter(b => b.id !== action.payload);
    },
    setBlockchainsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchBlockchainsRequest,
  createBlockchainRequest,
  updateBlockchainRequest,
  deleteBlockchainRequest,
  setBlockchains,
  addBlockchain,
  modifyBlockchain,
  removeBlockchain,
  setBlockchainsError,
} = blockchainsSlice.actions;

export default blockchainsSlice.reducer;
