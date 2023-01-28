import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    brandName: "",
    brandTagline: "",
    brandEmail: "",
    brandNumber: "",
    about: "",
    address: "",
    isFetching: false,
    error: false,
  },
  reducers: {
    getSettingsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getSettingsSuccess(state, action) {
      const {
        brandName,
        brandTagline,
        brandEmail,
        brandNumber,
        about,
        address,
      } = action.payload[0];
      state.isFetching = false;
      state.error = false;
      state.brandName = brandName;
      state.brandEmail = brandEmail;
      state.brandTagline = brandTagline;
      state.brandNumber = brandNumber;
      state.about = about;
      state.address = address;
    },
    getSettingsFaliure(state) {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getSettingsStart, getSettingsSuccess, getSettingsFaliure } =
  settingsSlice.actions;

export default settingsSlice.reducer;
