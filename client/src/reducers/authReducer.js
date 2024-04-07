import {
  LOGIN_SUCCESS,
  VERIFY_SUCCESS,
  GET_USER_SUCCESS,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      action.redirect("/Homepage");
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case VERIFY_SUCCESS:
      action.redirect("/Homepage");
      return {
        ...state,
        user: {
          ...state.user,
          verified: true,
        },
      };
    case GET_USER_SUCCESS:
      console.log("test");
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    default:
      return state;
  }
}
