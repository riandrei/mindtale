import { LOGIN_SUCCESS } from "./types";
import { useNavigate } from "react-router-dom";

export const logIn = (email, password, navigate) => (dispatch) => {
  fetch("http://localhost:3001/api/logIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((res) => {
        console.log(res.userInfo);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.userInfo,
          redirect: navigate,
        });
      });
    }
  });
};

export const signUp = (email, password, navigate) => (dispatch) => {
  fetch("http://localhost:3001/api/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.status === 201) {
      dispatch(logIn(email, password, navigate));
    }
  });
};
