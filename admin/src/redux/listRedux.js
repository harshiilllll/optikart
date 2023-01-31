import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: {
    lists: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getListsStart(state) {
      state.error = false;
      state.isFetching = true;
    },
    getListsSuccess(state, action) {
      state.error = false;
      state.isFetching = false;
      state.lists = action.payload;
    },
    getListsFailure(state) {
      state.error = true;
      state.isFetching = false;
    },

    //ADD
    addListStart(state) {
      state.error = false;
      state.isFetching = true;
    },
    addListSuccess(state, action) {
      state.lists.push(action.payload);
      state.isFetching = false;
      state.error = false;
    },
    addListFailure(state) {
      state.error = true;
      state.isFetching = false;
    },

    //DELETE
    deleteListStart(state) {
      state.error = false;
      state.isFetching = true;
    },
    deleteListSuccess(state, action) {
      const newLists = state.lists.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        lists: newLists,
        isFetching: false,
        error: false,
      };
    },
    deleteListFailure(state) {
      state.error = true;
      state.isFetching = false;
    },

    //UPDATE
    updateListStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    updateListSuccess(state, action) {
      state.isFetching = false;
      state.lists[
        state.lists.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.updatedlist;
    },
    updateListFailure(state) {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getListsFailure,
  getListsStart,
  getListsSuccess,
  deleteListStart,
  deleteListSuccess,
  deleteListFailure,
  addListStart,
  addListSuccess,
  addListFailure,
  updateListStart,
  updateListSuccess,
  updateListFailure,
} = listSlice.actions;

export default listSlice.reducer;
