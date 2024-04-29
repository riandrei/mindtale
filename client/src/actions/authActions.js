import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
  GET_USER_SUCCESS,
} from "./types";

export const logIn = (email, password, navigate) => (dispatch) => {
  console.log("this working?");
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
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.userInfo,
          redirect: navigate,
        });
      });
    } else {
      if (res.status === 401) {
        res.json().then((res) => {
          dispatch({
            type: LOGIN_FAIL,
            payload: res.error,
          });
          console.log(res.error);
        });
      }
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

export const verifyAccount = (code, email, navigate) => (dispatch) => {
  console.log(email, code);

  fetch("http://localhost:3001/api/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ code, email }),
  }).then((res) => {
    if (res.status === 200) {
      dispatch({
        type: VERIFY_SUCCESS,
        redirect: navigate,
      });
    }

    if (res.status === 400) {
      res.json().then((res) => {
        dispatch({
          type: VERIFY_FAIL,
          payload: res.error,
        });
      });
    }
  });
};

export const getUser = () => (dispatch) => {
  fetch("http://localhost:3001/api/user", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }).then((res) => {
    console.log(res.status);
    if (res.status === 200) {
      res.json().then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: res.userInfo,
        });
      });
    }
  });
};

export const toggleBookmark = (token, storyId) => (dispatch) => {
  fetch(`http://localhost:3001/api/bookmark/${storyId}`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 200) {
      dispatch(getUser());
    }
  });
};

export const addVisited = (storyId) => (dispatch) => {
  fetch(`http://localhost:3001/api/visited/${storyId}`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }).then((res) => {
    if (res.status === 200) {
      return;
    }
  });
};
