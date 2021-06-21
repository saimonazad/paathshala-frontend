import {
  ALL_FEEDS_FAIL,
  ALL_FEEDS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_FEED_FAIL,
  CREATE_FEED_SUCCESS,
  CREATE_FEED_RESET,
} from "../constants/allFeeds";

//All Feeds reducer

export const allFeedsReducer = (state = { feeds: [] }, action) => {
  switch (action.type) {
    case ALL_FEEDS_SUCCESS:
      return {
        // feedsCount: action.payload.feedsCount,
        // feedsPerPage: action.payload.feedsPerPage,
        // filteredFeedsCount: action.payload.filteredFeedsCount,
        feeds: action.payload,
      };
    case ALL_FEEDS_FAIL:
      return {
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//create Feed reducer

export const createFeedReducer = (state = { feed: {} }, action) => {
  switch (action.type) {
    case CREATE_FEED_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        feed: action.payload.feed,
      };
    case CREATE_FEED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_FEED_RESET:
      return {
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
