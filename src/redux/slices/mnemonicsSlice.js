import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  error: null,
};

const mnemonicsSlice = createSlice({
  name: 'mnemonics',
  initialState,
  reducers: {
    fetchMnemonicsRequest: () => {},
    createMnemonicRequest: (_state, _action) => {},
    setMnemonics: (state, action) => {
      state.list = action.payload;
    },
    addMnemonic: (state, action) => {
      state.list.push(action.payload);
    },
    setMnemonicsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchMnemonicsRequest,
  createMnemonicRequest,
  setMnemonics,
  addMnemonic,
  setMnemonicsError,
} = mnemonicsSlice.actions;

export default mnemonicsSlice.reducer;
