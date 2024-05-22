import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
  GET_USER_SUCCESS,
  GET_USERS_SUCCESS,
} from "./types";

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
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.users,
      });
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

export const getUsers = () => (dispatch) => {
  fetch(`http://localhost:3001/api/users`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((res) => {
        console.log(res.users);
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: res.users,
        });
      });
    }
  });
};

export const updateUser = (formData) => (dispatch) => {
  console.log(formData);
  fetch(`http://localhost:3001/api/user`, {
    method: "PUT",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    credentials: "include",
    body: formData,
  });
};

export const addFriend = (friendId) => (dispatch) => {
  console.log(friendId);
  fetch(`http://localhost:3001/api/friend/${friendId}`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export const acceptFriendRequest = (friendId) => (dispatch) => {
  fetch(`http://localhost:3001/api/accept/${friendId}`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export const rejectFriendRequest = (friendId) => (dispatch) => {
  fetch(`http://localhost:3001/api/decline/${friendId}`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
