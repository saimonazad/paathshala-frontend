import {
  CREATE_POST,
  GET_FEED_POSTS,
  GET_USER_DETAIL,
  UPDATE_POST,
  ALL_PERSONAL_FEEDS_FAIL,
  ALL_PERSONAL_FEEDS_SUCCESS,
  CREATE_PERSONAL_FEEDS_SUCCESS,
  ALL_COURSE_FEEDS_SUCCESS,
  CREATE_COURSE_FEEDS_SUCCESS,
} from "../../../@jumbo/constants/ActionTypes";

const INIT_STATE = {
  courseFeedPosts: [],
};

export default function courseFeeds(state = INIT_STATE, action) {
  switch (action.type) {
    case ALL_COURSE_FEEDS_SUCCESS: {
      return { ...state, courseFeedPosts: action.payload };
    }
    case CREATE_COURSE_FEEDS_SUCCESS: {
      return {
        ...state,
        courseFeedPosts: [action.payload, ...state.courseFeedPosts],
      };
    }
    default:
      return state;
  }
}
