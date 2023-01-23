import axios from "axios";
import { loginFaliure, loginStart, loginSuccess } from "./userRedux";
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productRedux";

//Login
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFaliure());
  }
};

//Fetch products
export const getProducts = async (dispatch) => {
  dispatch(getProductsStart());
  try {
    const res = await axios.get("/products", {
      headers: {
        token:
          "Bearer " +
          JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
            .accessToken,
      },
    });
    dispatch(getProductsSuccess(res.data));
  } catch (error) {
    dispatch(getProductsFailure());
  }
};

//Add product
export const addProducts = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await axios.post("/products", product, {
      headers: {
        token:
          "Bearer " +
          JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
            .accessToken,
      },
    });
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};

//Delete product
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await axios.delete("/products/" + id, {
      headers: {
        token:
          "Bearer " +
          JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
            .accessToken,
      },
    });
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};
