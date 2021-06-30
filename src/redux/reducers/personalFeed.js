import {
  CREATE_POST,
  GET_FEED_POSTS,
  GET_USER_DETAIL,
  UPDATE_POST,
  ALL_PERSONAL_FEEDS_FAIL,
  ALL_PERSONAL_FEEDS_SUCCESS,
  CREATE_PERSONAL_FEEDS_SUCCESS,
} from "../../../@jumbo/constants/ActionTypes";

const INIT_STATE = {
  personalFeedPosts: [],
};

export default function personalFeeds(state = INIT_STATE, action) {
  switch (action.type) {
    case ALL_PERSONAL_FEEDS_SUCCESS: {
      return { ...state, personalFeedPosts: action.payload };
    }
    case CREATE_PERSONAL_FEEDS_SUCCESS: {
      return {
        ...state,
        personalFeedPosts: [action.payload, ...state.personalFeedPosts],
      };
    }
    default:
      return state;
  }
}
