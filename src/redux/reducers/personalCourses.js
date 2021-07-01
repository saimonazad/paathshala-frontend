import {
  CREATE_COURSE_SUCCESS,
  ALL_PERSONAL_COURSE_SUCCESS,
} from "../../../@jumbo/constants/ActionTypes";

const INIT_STATE = {
  personalCourses: [],
};

export default function personalCourses(state = INIT_STATE, action) {
  switch (action.type) {
    case ALL_PERSONAL_COURSE_SUCCESS: {
      return { ...state, personalCourses: action.payload };
    }
    case CREATE_COURSE_SUCCESS: {
      return {
        ...state,
        personalCourses: [action.payload, ...state.personalCourses],
      };
    }
    default:
      return state;
  }
}
