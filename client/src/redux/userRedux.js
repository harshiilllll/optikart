import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart(state) {
      state.isFetching = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isFetching = false;
    },
    loginFaliure(state) {
      state.isFetching = false;
      state.error = true;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFaliure, logout } =
  userSlice.actions;

export default userSlice.reducer;
