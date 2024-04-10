import { combineReducers } from "redux";

import authReducer from "./authReducer";
import storyReducer from "./storyReducer";

export default combineReducers({
  auth: authReducer,
  story: storyReducer,
});
