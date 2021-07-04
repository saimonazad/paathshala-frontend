import {
  GET_COURSE_SUCCESS,
  GET_USER_COURSE_SUCCESS,
} from "../../../@jumbo/constants/ActionTypes";

const INIT_STATE = {
  courseInfo: [],
};

export default function getCourse(state = INIT_STATE, action) {
  switch (action.type) {
    case GET_COURSE_SUCCESS: {
      return { courseInfo: action.payload };
    }

    case GET_USER_COURSE_SUCCESS: {
      return { courseInfo: action.payload };
    }

    default:
      return state;
  }
}
