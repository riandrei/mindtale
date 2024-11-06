import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
  GET_USER_SUCCESS,
  GET_USERS_SUCCESS,
  GET_RANKING_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  CHECK_VERIFICATION_CODE_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  ADMIN_LOGIN_SUCCESS,
  GET_STORIES_STATS_SUCCESS,
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

export const signInWithGoogle = (credential, navigate) => (dispatch) => {
  fetch("http://localhost:3001/api/login/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ credential }),
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

export const signUpWithGoogle = (credential, navigate) => (dispatch) => {
  console.log("ACTION RUNNING");
  fetch("http://localhost:3001/api/signUp/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ credential }),
  }).then((res) => {
    if (res.status === 201) {
      res.json().then((res) => {
        dispatch(signInWithGoogle(credential, navigate));
      });
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

export const submitCompletedStory = (storyId, assesmentScore) => (dispatch) => {
  console.log(storyId, assesmentScore);

  fetch(`http://localhost:3001/api/complete/${storyId}`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ assesmentScore }),
  });
};

export const getRanking = () => (dispatch) => {
  console.log("test");
  fetch(`http://localhost:3001/api/ranking`, {
    method: "GET",
    headers: {
      // Authorization: localStorage.getItem("token"),
    },
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((res) => {
        dispatch({
          type: GET_RANKING_SUCCESS,
          payload: res.ranking,
        });
      });
    }
  });
};

export const forgotPassword = (email) => async (dispatch) => {
  console.log(email);
  try {
    const response = await fetch(`http://localhost:3001/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to send forgot password email");
    }

    const data = await response.json();

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    console.error("Error in forgot password action:", error);

    return false;
  }
};

export const checkVerification =
  (email, verificationCode) => async (dispatch) => {
    console.log(email);
    try {
      const response = await fetch(
        `http://localhost:3001/api/checkVerificationCode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, verificationCode }),
        }
      );

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to check verification code");
      }

      const data = await response.json();

      dispatch({
        type: CHECK_VERIFICATION_CODE_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      console.error("Error in check verification action:", error);

      return false;
    }
  };

export const changePassword = (email, newPassword) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/api/changePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to update password");
    }

    const data = await response.json();

    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    console.error("Error in change password action:", error);

    return false;
  }
};

export const getStoriesStats = () => (dispatch) => {
  fetch("http://localhost:3001/api/stories/stats", {
    method: "GET",
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((res) => {
        dispatch({
          type: GET_STORIES_STATS_SUCCESS,
          payload: res,
        });
      });
    }
  });
};

export const adminLogin = (username, password, navigate) => (dispatch) => {
  console.log(username, password);
  fetch("http://localhost:3001/api/adminLogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((res) => {
        dispatch({
          type: ADMIN_LOGIN_SUCCESS,
          payload: res.userInfo,
        });

        dispatch(getStoriesStats());
      });
    }
  });
};
