import {
  READ_STORY_SUCCESS,
  SUBMIT_USER_CHOICE_SUCCESS,
  GET_ASSESMENT_SUCCESS,
  TRANSLATE_TEXT_SUCCESS,
  RESET_SESSION,
} from "./types";

export const readStory =
  ({ storyId }) =>
  (dispatch) => {
    fetch(`http://localhost:3001/api/sessions/${storyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
        credentials: "include",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          console.log(res);
          dispatch({
            type: READ_STORY_SUCCESS,
            payload: res.content,
          });
        });
      }
    });
  };

export const submitUserChoice =
  ({ userChoice, storyId }) =>
  (dispatch) => {
    console.log(userChoice);
    return fetch(`http://localhost:3001/api/sessions/${storyId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
        credentials: "include",
      },
      body: JSON.stringify({ userChoice }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          console.log(res);
          dispatch({
            type: SUBMIT_USER_CHOICE_SUCCESS,
            payload: res,
          });
          return "success";
        });
      }
    });
  };

export const getAssesment = (storyId) => (dispatch) => {
  fetch(`http://localhost:3001/api/sessions/${storyId}/completed`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
      credentials: "include",
    },
  }).then((res) => {
    console.log(res);
    dispatch({
      type: GET_ASSESMENT_SUCCESS,
      payload: res,
    });
  });
};

export const submitAssesmentScore = (storyId, assesmentScore) => (dispatch) => {
  console.log(assesmentScore);
  fetch(`http://localhost:3001/api/sessions/${storyId}/completed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
      credentials: "include",
    },
    body: JSON.stringify({ assesmentScore }),
  });
};

export const translateText = (text, targetLanguage) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3001/api/translatetext", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
        credentials: "include",
      },
      body: JSON.stringify({ text, targetLanguage }),
    });

    if (!response.ok) {
      throw new Error("Failed to translate text");
    }

    const data = await response.json();
    console.log(data);
    dispatch({
      type: TRANSLATE_TEXT_SUCCESS,
      payload: data,
    });

    return data.translation;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const resetSession = () => (dispatch) => {
  dispatch({
    type: RESET_SESSION,
  });
};
