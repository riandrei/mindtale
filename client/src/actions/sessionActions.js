import { READ_STORY_SUCCESS, SUBMIT_USER_CHOICE_SUCCESS } from "./types";

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
            payload: res,
          });
        });
      }
    });
  };

export const submitUserChoice =
  ({ userChoice, storyId }) =>
  (dispatch) => {
    console.log(userChoice);
    fetch(`http://localhost:3001/api/sessions/${storyId}`, {
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
        });
      }
    });
  };
