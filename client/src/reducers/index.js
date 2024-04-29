import { combineReducers } from "redux";

import authReducer from "./authReducer";
import storyReducer from "./storyReducer";
import sessionReducer from "./sessionReducer";

export default combineReducers({
  auth: authReducer,
  story: storyReducer,
  session: sessionReducer,
});
