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
  SUBMIT_USER_DATA_SUCCESS,
  SUBMIT_USER_PREFERENCE_SUCCESS,
  GET_WORD_STATS_SUCCESS,
  SUBMIT_WORD_READING_SCORE_SUCCESS,
  SUBMIT_COMPREHENSION_SCORE_SUCCESS,
} from "./types";

const baseURL = import.meta.env.VITE_API_URL;

export const logIn = (email, password, navigate) => (dispatch) => {
  fetch(`/api/logIn`, {
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
  fetch(`/api/signUp`, {
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
  fetch(`/api/login/google`, {
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
  fetch(`/api/signUp/google`, {
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
  fetch(`/api/verify`, {
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
  fetch(`/api/user`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }).then((res) => {
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
  fetch(`/api/bookmark/${storyId}`, {
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
  fetch(`/api/visited/${storyId}`, {
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
  fetch(`/api/users`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((res) => {
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: res.users,
        });
      });
    }
  });
};

export const updateUser = (formData) => (dispatch) => {
  fetch(`/api/user`, {
    method: "PUT",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    credentials: "include",
    body: formData,
  });
};

export const submitUserData = (formData, navigate) => (dispatch) => {
  fetch(`/api/userData`, {
    method: "PUT",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    credentials: "include",
    body: formData,
  }).then((res) => {
    if (res.status === 200) {
      dispatch({ type: SUBMIT_USER_DATA_SUCCESS, redirect: navigate });
    }
  });
};

export const submitUserPreference =
  (userPreference, navigate) => (dispatch) => {
    fetch(`/api/userPreference`, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userPreference }),
    }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: SUBMIT_USER_PREFERENCE_SUCCESS, redirect: navigate });
      }
    });
  };

export const addFriend = (friendId) => (dispatch) => {
  fetch(`/api/friend/${friendId}`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export const acceptFriendRequest = (friendId) => (dispatch) => {
  fetch(`/api/accept/${friendId}`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export const rejectFriendRequest = (friendId) => (dispatch) => {
  fetch(`/api/decline/${friendId}`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export const submitCompletedStory = (storyId, assesmentScore) => (dispatch) => {
  fetch(`/api/complete/${storyId}`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ assesmentScore }),
  });
};

export const getRanking = () => (dispatch) => {
  fetch(`/api/ranking`, {
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
  try {
    const response = await fetch(`/api/forgot`, {
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
    try {
      const response = await fetch(`/api/checkVerificationCode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verificationCode }),
      });

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
    const response = await fetch(`/api/changePassword`, {
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
  fetch(`/api/stories/stats`, {
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
  fetch(`/api/adminLogin`, {
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

export const getWordsStats = () => (dispatch) => {
  fetch(`/api/wordStats`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((res) => {
        dispatch({ type: GET_WORD_STATS_SUCCESS, payload: res.userWordsData });
      });
    }
  });
};

export const submitWordInteraction = (word) => (dispatch) => {
  fetch(`/api/wordInteraction`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ word }),
  });
};

export const submitWordReadingScore =
  (passage, audioData, wordReadingType) => (dispatch) => {
    fetch(`/api/wordReadingScore`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ passage, audioData, wordReadingType }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          dispatch({
            type: SUBMIT_WORD_READING_SCORE_SUCCESS,
            wordReadingType,
            payload: res.wordReadingScore,
          });
        });
      }
    });
  };

export const submitComprehensionScore =
  (questions, answers, comprehensionType) => (dispatch) => {
    fetch(`/api/comprehensionScore`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ answers, questions, comprehensionType }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          dispatch({
            type: SUBMIT_COMPREHENSION_SCORE_SUCCESS,
            comprehensionType,
            payload: res.correctAnswers,
          });
        });
      }
    });
  };

export const getPHILIRIResults = () => (dispatch) => {
  fetch(`/api/philIRI`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
