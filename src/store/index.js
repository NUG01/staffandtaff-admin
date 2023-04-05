import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  establishments: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setJobs(state, action) {
      state.jobs = action.payload;
    },
    setEstablishments(state, action) {
      state.establishments = action.payload;
    },
  },
});
const store = configureStore({
  reducer: globalSlice.reducer,
});

export const globalActions = globalSlice.actions;

export default store;
