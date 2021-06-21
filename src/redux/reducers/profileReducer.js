import {
  ALL_ACADEMIC_INFO_FAIL,
  ALL_ACADEMIC_INFO_SUCCESS,
  ALL_BASIC_INFO_FAIL,
  ALL_BASIC_INFO_SUCCESS,
  ALL_WORK_INFO_FAIL,
  ALL_WORK_INFO_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/profileInfo";

//basic info reducer

export const basicInfoReducer = (state = { basicInfo: [] }, action) => {
  switch (action.type) {
    case ALL_BASIC_INFO_SUCCESS:
      return {
        basicInfo: action.payload,
      };
    case ALL_BASIC_INFO_FAIL:
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

//work info reducer

export const workInfoReducer = (state = { workInfo: [] }, action) => {
  switch (action.type) {
    case ALL_WORK_INFO_SUCCESS:
      return {
        workInfo: action.payload,
      };
    case ALL_WORK_INFO_FAIL:
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

//academic info reducer

export const academicInfoReducer = (state = { academicInfo: [] }, action) => {
  switch (action.type) {
    case ALL_ACADEMIC_INFO_SUCCESS:
      return {
        academicInfo: action.payload,
      };
    case ALL_ACADEMIC_INFO_FAIL:
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
