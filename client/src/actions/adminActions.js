import { SCHOOL_ADMIN_LOGIN_SUCCESS, GET_ALLOWED_STORIES_SUCCESS, APPROVE_STORY_SUCCESS } from "./types"

export const addAdmin = (formData) => (dispatch) => {
    console.log('test')
    console.log(formData)
    fetch(`http://localhost:3001/api/admin`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      })
    //   .then((res) => {
    //     if(res.status === 200) {
    //       dispatch({ type: ADD_ADMIN_SUCCESS })
    //     }
    //   })
}

export const schoolAdminLogin = (username, password) => (dispatch) => {
  fetch("http://localhost:3001/api/schoolAdminLogin", {
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

        // dispatch(getStoriesStats());
      });
    }
  });
};

export const getAllowedStories = () => (dispatch) => {
  fetch("http://localhost:3001/api/allowedStories", {
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
}

export const approveStory = (storyId) => (dispatch) => {
  fetch(`http://localhost:3001/api/approveStory/${storyId}`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }).then((res) => {
    if(res.status === 200) {
      res.json().then((res) => {
        dispatch({type: APPROVE_STORY_SUCCESS, payload: res.schoolData})
      })
    }
  })
}


export const rejectStory = (storyId) => (dispatch) => {
  fetch(`http://localhost:3001/api/rejectStory/${storyId}`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }).then((res) => {
    if(res.status === 200) {
      res.json().then((res) => {
        dispatch({type: APPROVE_STORY_SUCCESS, payload: res.schoolData})
      })
    }
  })
}