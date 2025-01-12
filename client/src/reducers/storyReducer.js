import {
  GET_STORIES_SUCCESS,
  GET_REVIEWS_SUCCESS,
  POST_REVIEW_SUCCESS,
  DELETE_REVIEW_SUCCESS,
  GENERATE_COVER_SUCCESS,
  ADD_STORY_SUCCESS,
  DELETE_STORY_SUCCESS,
  GET_ALLOWED_STORIES_SUCCESS,
  APPROVE_STORY_SUCCESS
} from "../actions/types";

const initialState = {
  stories: [],
  allowedStories: [],
  rejectedStories: [],
  generatedCoverURL: null,
};

export default function storyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORIES_SUCCESS:
      return {
        ...state,
        stories: action.payload,
      };
    case GET_REVIEWS_SUCCESS:
      const { id, reviews } = action.payload;
      const stories = state.stories.map((story) => {
        if (story._id === id) {
          return {
            ...story,
            reviews,
          };
        }
        return story;
      });

      return {
        ...state,
        stories,
      };
    case DELETE_REVIEW_SUCCESS:
    case POST_REVIEW_SUCCESS:
      const { _id } = action.payload;

      const updatedStories = state.stories.map((story) =>
        story._id === _id ? { ...action.payload } : story
      );

      return {
        ...state,
        stories: updatedStories,
      };
    case GENERATE_COVER_SUCCESS:
      return {
        ...state,
        generatedCoverURL: action.payload.imgURL,
      };
    case ADD_STORY_SUCCESS:
      return {
        ...state,
        stories: [...state.stories, action.payload.story],
      };
    case DELETE_STORY_SUCCESS:
      return {
        ...state,
        stories: state.stories.filter(
          (story) => story._id !== action.payload.storyId
        ),
      };
    case GET_ALLOWED_STORIES_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        allowedStories: action.payload.approved,
        rejectedStories: action.payload.rejected
      }
    case APPROVE_STORY_SUCCESS:
      return {
        ...state,
        allowedStories: action.payload.approved,
        rejectedStories: action.payload.rejected
      }
    default:
      return state;
  }
}
