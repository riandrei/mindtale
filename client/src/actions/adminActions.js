import {
  SCHOOL_ADMIN_LOGIN_SUCCESS,
  GET_ALLOWED_STORIES_SUCCESS,
  APPROVE_STORY_SUCCESS,
} from "./types";

export const addAdmin = (formData) => (dispatch) => {
  fetch(`https://api.auth.localhost/api/admin`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
};

export const schoolAdminLogin = (username, password) => (dispatch) => {
  fetch("https://api.auth.localhost/api/schoolAdminLogin", {
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
          type: SCHOOL_ADMIN_LOGIN_SUCCESS,
          payload: res.userInfo,
        });
      });
    }
  });
};

export const getAllowedStories = () => (dispatch) => {
  fetch("https://api.auth.localhost/api/allowedStories", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }).then((res) => {
    console.log(res.status);
    if (res.status === 200 || res.status === 201) {
      res.json().then((res) => {
        dispatch({
          type: GET_ALLOWED_STORIES_SUCCESS,
          payload: res.schoolData,
        });
      });
    }
  });
};

export const approveStory = (storyId) => (dispatch) => {
  fetch(`https://api.auth.localhost/api/approveStory/${storyId}`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((res) => {
        dispatch({ type: APPROVE_STORY_SUCCESS, payload: res.schoolData });
      });
    }
  });
};

export const rejectStory = (storyId) => (dispatch) => {
  fetch(`https://api.auth.localhost/api/rejectStory/${storyId}`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((res) => {
        dispatch({ type: APPROVE_STORY_SUCCESS, payload: res.schoolData });
      });
    }
  });
};
