import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_RESET,
  CREATE_COMMENT_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/allComments";

//create comment reducer

export const createCommentReducer = (state = { comment: {} }, action) => {
  switch (action.type) {
    case CREATE_COMMENT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        comment: action.payload.comment,
      };
    case CREATE_COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_COMMENT_RESET:
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
