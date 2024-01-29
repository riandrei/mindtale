import { LOGIN_SUCCESS } from "./types";

export const logIn = (email, password) => (dispatch) => {
  console.log(`DDEmail: ${email} Password: ${password}`);

  fetch("http://localhost:3001/api/signIn", {
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
