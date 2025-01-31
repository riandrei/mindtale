import {
  LOGIN_SUCCESS,
  VERIFY_SUCCESS,
  GET_USER_SUCCESS,
  LOGIN_FAIL,
  VERIFY_FAIL,
  GET_USERS_SUCCESS,
  GET_RANKING_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  CHECK_VERIFICATION_CODE_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  ADMIN_LOGIN_SUCCESS,
  GET_STORIES_STATS_SUCCESS,
  SUBMIT_USER_DATA_SUCCESS,
  SUBMIT_USER_PREFERENCE_SUCCESS,
  SCHOOL_ADMIN_LOGIN_SUCCESS,
  GET_WORD_STATS_SUCCESS,
  SUBMIT_COMPREHENSION_SCORE_SUCCESS,
  SUBMIT_WORD_READING_SCORE_SUCCESS,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  users: [],
  ranking: [],
  isAdmin: false,
  isSchoolAdmin: false,
  error: null,
  averageScores: [],
  bookmarkCounts: [],
  visitCounts: [],
  wordsStats: [],
  philIRI: {
    pretest: {
      wordReadingScore: null,
      comprehensionScore: null,
    },
    posttest: {
      wordReadingScore: null,
      comprehensionScore: null,
    },
  },
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      action.redirect("/Homepage");
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case VERIFY_SUCCESS:
      action.redirect("/UserDetails");
      return {
        ...state,
        user: {
          ...state.user,
          verified: true,
        },
      };
    case GET_USER_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
        user: {},
      };
    case VERIFY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: [...action.payload],
      };
    case GET_RANKING_SUCCESS:
      return {
        ...state,
        ranking: [...action.payload],
      };
    case FORGOT_PASSWORD_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
      };
    case CHECK_VERIFICATION_CODE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
      };
    case CHANGE_PASSWORD_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isAdmin: true,
      };
    case GET_STORIES_STATS_SUCCESS:
      return {
        ...state,
        averageScores: action.payload.averageScores,
        bookmarkCounts: action.payload.bookmarkCounts,
        visitCounts: action.payload.visitCounts,
      };
    case SUBMIT_USER_DATA_SUCCESS:
      console.log(action);
      action.redirect("/StoryPreference");
      return {
        ...state,
      };
    case SUBMIT_USER_PREFERENCE_SUCCESS:
      action.redirect("/Homepage");
      return {
        ...state,
      };
    case SCHOOL_ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isSchoolAdmin: true,
      };
    case GET_WORD_STATS_SUCCESS:
      return {
        ...state,
        wordsStats: action.payload,
      };
    case SUBMIT_COMPREHENSION_SCORE_SUCCESS:
      console.log(action.payload);
      if (action.comprehensionType === "pretest") {
        return {
          ...state,
          philIRI: {
            ...state.philIRI,
            pretest: {
              ...state.philIRI.pretest,
              comprehensionScore: action.payload,
            },
          },
        };
      } else {
        return {
          ...state,
          philIRI: {
            ...state.philIRI,
            posttest: {
              ...state.philIRI.posttest,
              comprehensionScore: action.payload,
            },
          },
        };
      }
    case SUBMIT_WORD_READING_SCORE_SUCCESS:
      console.log(action.payload);
      if (action.wordReadingType === "pretest") {
        return {
          ...state,
          philIRI: {
            ...state.philIRI,
            pretest: {
              ...state.philIRI.pretest,
              wordReadingScore: action.payload,
            },
          },
        };
      } else {
        return {
          ...state,
          philIRI: {
            ...state.philIRI,
            posttest: {
              ...state.philIRI.posttest,
              wordReadingScore: action.payload,
            },
          },
        };
      }
    default:
      return state;
  }
}
