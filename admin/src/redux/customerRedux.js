import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    isFetching: false,
    errors: false,
  },
  reducers: {
    //GET
    getCustomersStart(state) {
      state.isFetching = true;
      state.errors = false;
    },
    getCustomersSuccess(state, action) {
      state.isFetching = false;
      state.errors = false;
      state.customers = action.payload;
    },
    getCustomersFailure(state) {
      state.isFetching = false;
      state.errors = true;
    },

    //DELETE
    deleteCustomerStart(state) {
      state.errors = false;
      state.isFetching = true;
    },
    deleteCustomerSuccess(state, action) {
      state.customers.splice(
        state.customers.findIndex((item) => item._id === action.payload),
        1
      );
      state.isFetching = false;
      state.errors = false;
    },
    deleteCustomerFailure(state) {
      state.errors = true;
      state.isFetching = false;
    },
  },
});

export const {
  getCustomersSuccess,
  getCustomersStart,
  getCustomersFailure,
  deleteCustomerStart,
  deleteCustomerSuccess,
  deleteCustomerFailure,
} = customerSlice.actions;

export default customerSlice.reducer;
