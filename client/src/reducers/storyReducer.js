import {
  GET_STORIES_SUCCESS,
  GET_REVIEWS_SUCCESS,
  POST_REVIEW_SUCCESS,
  DELETE_REVIEW_SUCCESS,
} from "../actions/types";

const initialState = {
  stories: [],
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
    default:
      return state;
  }
}
