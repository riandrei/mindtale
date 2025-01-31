import {
  GET_STORIES_SUCCESS,
  GET_REVIEWS_SUCCESS,
  DELETE_REVIEW_SUCCESS,
  POST_REVIEW_SUCCESS,
  GENERATE_COVER_SUCCESS,
  ADD_STORY_SUCCESS,
  DELETE_STORY_SUCCESS,
} from "./types";

export const getStories = () => (dispatch) => {
  fetch("https://api.auth.localhost/api/stories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    credentials: "include",
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((res) => {
        dispatch({
          type: GET_STORIES_SUCCESS,
          payload: res.stories,
        });
      });
    }
  });
};

export const getAllStories = () => (dispatch) => {
  fetch("https://api.auth.localhost/api/allStories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((res) => {
        dispatch({
          type: GET_STORIES_SUCCESS,
          payload: res.stories,
        });
      });
    }
  });
};

export const postReview = (id, reviewStar, reviewText) => (dispatch) => {
  fetch(`https://api.auth.localhost/api/stories/${id}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    credentials: "include",
    body: JSON.stringify({ reviewStar, reviewText }),
  }).then((res) => {
    if (res.status === 200) {
      res.json().then(({ story }) => {
        console.log(story);
        dispatch({
          type: POST_REVIEW_SUCCESS,
          payload: story,
        });
      });
    }
  });
};

export const getReviews = (id) => (dispatch) => {
  fetch(`https://api.auth.localhost/api/stories/${id}/review`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (res.status === 200) {
      res.json().then(({ reviews }) => {
        dispatch({
          type: GET_REVIEWS_SUCCESS,
          payload: { reviews, id },
        });
      });
    }
  });
};

export const deleteReview = (storyId) => (dispatch) => {
  fetch(`https://api.auth.localhost/api/stories/${storyId}/review`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    credentials: "include",
  }).then((res) => {
    if (res.status === 200) {
      res.json().then(({ story }) => {
        dispatch({
          type: DELETE_REVIEW_SUCCESS,
          payload: story,
        });
      });
    }
  });
};

export const generateStoryCover = (title, genre) => (dispatch) => {
  console.log(title, genre);
  fetch(`https://api.auth.localhost/api/stories/cover`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, genre }),
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((response) => {
        console.log(response);
        dispatch({ type: GENERATE_COVER_SUCCESS, payload: response });
      });
    }
  });
};

export const addStory = (formData) => (dispatch) => {
  console.log(formData);

  fetch(`https://api.auth.localhost/api/stories`, {
    method: "POST",
    body: formData,
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((response) => {
        console.log(response);
        dispatch({ type: ADD_STORY_SUCCESS, payload: response });
      });
    }
  });
};

export const deleteStory = (id) => (dispatch) => {
  fetch(`https://api.auth.localhost/api/stories/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((response) => {
        console.log(response);
        dispatch({ type: DELETE_STORY_SUCCESS, payload: response });
      });
    }
  });
};
