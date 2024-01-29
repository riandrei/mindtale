import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

// provides the dispatch and other functions
// const middleWare = [thunk];

// storage for state, middlewares, and reducers
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
