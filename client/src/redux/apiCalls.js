import axios from "axios";
import { getCartFailure, getCartStart, getCartSuccess } from "./cartRedux";
import {
  getSettingsFaliure,
  getSettingsStart,
  getSettingsSuccess,
} from "./settingsRedux";
import { loginFaliure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFaliure());
  }
};

export const getSettings = async (dispatch) => {
  dispatch(getSettingsStart());
  try {
    const res = await axios.get("/settings");
    dispatch(getSettingsSuccess(res.data));
  } catch (error) {
    dispatch(getSettingsFaliure());
  }
};

export const getCart = async (dispatch, userId) => {
  dispatch(getCartStart());
  try {
    const res = await axios.get("/carts/find/" + userId);
    dispatch(getCartSuccess(res.data));
  } catch (error) {
    dispatch(getCartFailure());
  }
};
