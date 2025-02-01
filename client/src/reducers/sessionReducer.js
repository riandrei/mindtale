import {
  GET_ASSESMENT_SUCCESS,
  READ_STORY_SUCCESS,
  SUBMIT_USER_CHOICE_SUCCESS,
  TRANSLATE_TEXT_SUCCESS,
  RESET_SESSION,
  TRANSLATE_WORD_SUCCESS,
} from "../actions/types";

const initialState = {
  history: [],
  choices: [],
  currentNarrative: "",
  isEnd: false,
  assesment: {},
  translatedText: "",
  translatedWord: "",
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case READ_STORY_SUCCESS:
      return {
        history: action.payload.history,
        currentNarrative: action.payload.parsedText.narrator,
        currentChoices: action.payload.parsedText.actions,
        scenarioHistory: action.payload.scenarioHistory,
        isEnd: action.payload.parsedText.isEnd,
        assesment: action.payload.assesment,
      };
    case SUBMIT_USER_CHOICE_SUCCESS:
      return {
        history: action.payload.history,
        currentNarrative: action.payload.parsedText.narrator,
        currentChoices: action.payload.parsedText.actions,
        scenarioHistory: action.payload.scenarioHistory,
        isEnd: action.payload.parsedText.isEnd,
        assesment: action.payload.assesment,
      };
    case GET_ASSESMENT_SUCCESS:
      return {
        ...initialState,
        assesment: action.payload.assesment,
      };
    case TRANSLATE_TEXT_SUCCESS:
      return {
        ...state,
        translatedText: action.payload.translatedText,
      };
    case TRANSLATE_WORD_SUCCESS:
      return {
        ...state,
        translatedWord: action.payload.translation,
      };
    case RESET_SESSION:
      return initialState;
    default:
      return state;
  }
}
