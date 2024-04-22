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
    });
  };

export const submitUserChoice = (userChoice) => (dispatch) => {
  fetch(`http://localhost:3001/api/sessions/${storyId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
      credentials: "include",
    },
    body: JSON.stringify(userChoice),
  });
};
