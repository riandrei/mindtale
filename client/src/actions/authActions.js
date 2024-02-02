import { LOGIN_SUCCESS } from "./types";

export const logIn = (email, password) => (dispatch) => {
  console.log(`DDEmail: ${email} Password: ${password}`);

  fetch("http://localhost:3001/api/logIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((user) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: user,
        });
      });
    }
  });
};

export const signUp = (email, password) => (dispatch) => {
  console.log(`Email: ${email} Password: ${password}`);

  fetch("http://localhost:3001/api/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((user) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: user,
        });
      });
    }
  });
};
