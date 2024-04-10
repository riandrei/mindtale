import {
  GET_STORIES_SUCCESS,
  GET_REVIEWS_SUCCESS,
  DELETE_REVIEW_SUCCESS,
  POST_REVIEW_SUCCESS,
} from "./types";

export const getStories = () => (dispatch) => {
  fetch("http://localhost:3001/api/stories", {
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
  fetch(`http://localhost:3001/api/stories/${id}/review`, {
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
  fetch(`http://localhost:3001/api/stories/${id}/review`, {
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
  fetch(`http://localhost:3001/api/stories/${storyId}/review`, {
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
