import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "list",
  initialState: {
    orders: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getOrdersStart(state) {
      state.error = false;
      state.isFetching = true;
    },
    getOrdersSuccess(state, action) {
      state.error = false;
      state.isFetching = false;
      state.orders = action.payload;
    },
    getOrdersFailure(state) {
      state.error = true;
      state.isFetching = false;
    },
  },
});

export const { getOrdersStart, getOrdersSuccess, getOrdersFailure } =
  orderSlice.actions;

export default orderSlice.reducer;
