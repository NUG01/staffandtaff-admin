import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  subscriptions: [],
  jobs: [],
  establishments: [],
  users: [],
  loggedUser: null
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setSubscriptions(state, action) {
      state.jobs = action.payload;
    },
    setJobs(state, action) {
      state.jobs = action.payload;
    },
    setEstablishments(state, action) {
      state.establishments = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setLoggedUser(state, action) {
      state.loggedUser = action.payload;
    },
  },
});
const store = configureStore({
  reducer: globalSlice.reducer,
});

export const globalActions = globalSlice.actions;

export default store;
