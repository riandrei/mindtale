import {
  READ_STORY_SUCCESS,
  SUBMIT_USER_CHOICE_SUCCESS,
} from "../actions/types";

const initialState = {
  history: [],
  choices: [],
  currentNarrative: "",
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case READ_STORY_SUCCESS:
      return {
        history: action.payload.history,
        currentNarrative: action.payload.parsedText.narrator,
        currentChoices: action.payload.parsedText.choices,
      };
    case SUBMIT_USER_CHOICE_SUCCESS:
      return {
        history: action.payload.history,
        currentNarrative: action.payload.parsedText.narrator,
        currentChoices: action.payload.parsedText.choices,
      };
    default:
      return state;
  }
}
