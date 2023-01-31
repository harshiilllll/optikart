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
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
} from "./productRedux";
import {
  deleteCustomerFailure,
  deleteCustomerStart,
  deleteCustomerSuccess,
  getCustomersFailure,
  getCustomersStart,
  getCustomersSuccess,
} from "./customerRedux";
import {
  addListFailure,
  addListStart,
  addListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  updateListFailure,
  updateListStart,
  updateListSuccess,
} from "./listRedux";

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

//Update product
export const updateProduct = async (id, updatedProduct, dispatch) => {
  dispatch(updateProductStart());
  try {
    await axios.put("/products/" + id, updatedProduct, {
      headers: {
        token:
          "Bearer " +
          JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
            .accessToken,
      },
    });
    dispatch(updateProductSuccess({ id, updatedProduct }));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

//Get customers
export const getCustomers = async (dispatch) => {
  dispatch(getCustomersStart());
  try {
    const res = await axios.get("/users", {
      headers: {
        token:
          "Bearer " +
          JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
            .accessToken,
      },
    });
    dispatch(getCustomersSuccess(res.data));
  } catch (error) {
    dispatch(getCustomersFailure());
  }
};

//Delete customer
export const deleteCustomer = async (id, dispatch) => {
  dispatch(deleteCustomerStart());
  try {
    await axios.delete("/users/" + id, {
      headers: {
        token:
          "Bearer " +
          JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
            .accessToken,
      },
    });
    dispatch(deleteCustomerSuccess(id));
  } catch (error) {
    dispatch(deleteCustomerFailure());
  }
};

//GET LISTS
export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get("/lists", {
      headers: {
        token:
          "Bearer " +
          JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
            .accessToken,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (error) {
    dispatch(getListsFailure());
  }
};

//CREATE LIST
export const addList = async (content, dispatch) => {
  dispatch(addListStart());
  try {
    const res = await axios.post("/lists", content, {
      headers: {
        token:
          "Bearer " +
          JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
            .accessToken,
      },
    });
    dispatch(addListSuccess(res.data));
  } catch (error) {
    dispatch(addListFailure());
  }
};

//Update List
export const updateList = async (id, updatedList, dispatch) => {
  dispatch(updateListStart());
  try {
    await axios.put("/lists/" + id, updatedList, {
      headers: {
        token:
          "Bearer " +
          JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
            .accessToken,
      },
    });
    dispatch(updateListSuccess({ id, updatedList }));
  } catch (error) {
    dispatch(updateListFailure());
  }
};

//Delete List
export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  try {
    await axios.delete("/lists/" + id, {
      headers: {
        token:
          "Bearer " +
          JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
            .accessToken,
      },
    });
    dispatch(deleteListSuccess(id));
  } catch (error) {
    dispatch(deleteListFailure());
  }
};
