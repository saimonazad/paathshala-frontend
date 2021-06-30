import {
  CREATE_COMMENT,
  GET_COMMENTS,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  RESET_COMMENTS,
} from "../../../@jumbo/constants/ActionTypes";

const INIT_STATE = {
  comments: [],
};

export default function Comment(state = INIT_STATE, action) {
  switch (action.type) {
    case GET_COMMENTS: {
      return { ...state, comments: action.payload };
    }

    case CREATE_COMMENT: {
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    }
    case RESET_COMMENTS: {
      return {
        comments: [],
      };
    }
    case UPDATE_COMMENT: {
      return {
        ...state,
        comments: state.comments.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    }
    default:
      return state;
  }
}
