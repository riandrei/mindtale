import {
  LOGIN_SUCCESS,
  VERIFY_SUCCESS,
  GET_USER_SUCCESS,
  LOGIN_FAIL,
  VERIFY_FAIL,
  GET_USERS_SUCCESS,
  GET_RANKING_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  CHECK_VERIFICATION_CODE_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  users: [],
  ranking: [],
  error: null,
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
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
        user: {},
      };
    case VERIFY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: [...action.payload],
      };
    case GET_RANKING_SUCCESS:
      return {
        ...state,
        ranking: [...action.payload],
      };
    case FORGOT_PASSWORD_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
      };
    case CHECK_VERIFICATION_CODE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
      };
    case CHANGE_PASSWORD_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
      };
    default:
      return state;
  }
}
