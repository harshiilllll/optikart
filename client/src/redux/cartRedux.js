import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    totalPrice: 0,
    error: false,
    isFetching: false,
  },
  reducers: {
    addProduct(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.quantity += 1;
      state.products.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeProduct(state, action) {
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload.id),
        1
      );
      state.quantity -= 1;
      state.totalPrice -= action.payload.price * action.payload.quantity;
    },

    getCartStart(state) {
      state.error = false;
      state.isFetching = true;
    },
    getCartSuccess(state, action) {
      state.quantity = action.payload.quantity;
      state.totalPrice = action.payload.totalPrice;
      state.products = action.payload.products;
      state.isFetching = false;
      state.error = false;
    },
    getCartFailure(state) {
      state.error = true;
      state.isFetching = false;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  getCartStart,
  getCartFailure,
  getCartSuccess,
} = cartSlice.actions;

export default cartSlice.reducer;
