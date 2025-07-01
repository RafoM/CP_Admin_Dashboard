import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersRequest: () => {},
    setUsers: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { fetchUsersRequest, setUsers } = usersSlice.actions;

export default usersSlice.reducer;
