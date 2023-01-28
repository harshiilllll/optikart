import axios from "axios";
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
    const res = await axios.get("/settings", {
      headers: {
        token:
          "Bearer " +
          JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
            .accessToken,
      },
    });
    dispatch(getSettingsSuccess(res.data));
  } catch (error) {
    dispatch(getSettingsFaliure());
  }
};
