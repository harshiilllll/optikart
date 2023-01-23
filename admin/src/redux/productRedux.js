import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getProductsStart(state) {
      state.error = false;
      state.isFetching = true;
    },
    getProductsSuccess(state, action) {
      state.error = false;
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductsFailure(state) {
      state.error = true;
      state.isFetching = false;
    },

    //ADD
    addProductStart(state) {
      state.error = false;
      state.isFetching = true;
    },
    addProductSuccess(state, action) {
      state.products.push(action.payload);
      state.isFetching = false;
      state.error = false;
    },
    addProductFailure(state) {
      state.error = true;
      state.isFetching = false;
    },

    //DELETE
    deleteProductStart(state) {
      state.error = false;
      state.isFetching = true;
    },
    deleteProductSuccess(state, action) {
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
      state.isFetching = false;
      state.error = false;
    },
    deleteProductFailure(state) {
      state.error = true;
      state.isFetching = false;
    },
  },
});

export const {
  getProductsFailure,
  getProductsStart,
  getProductsSuccess,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
