import { fetchError, fetchStart, fetchSuccess } from "./Common";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";

import {
  ALL_ACADEMIC_INFO_FAIL,
  ALL_ACADEMIC_INFO_SUCCESS,
  ALL_BASIC_INFO_FAIL,
  ALL_BASIC_INFO_SUCCESS,
  ALL_WORK_INFO_FAIL,
  ALL_WORK_INFO_SUCCESS,
  CLEAR_ERRORS,
} from "../../../@jumbo/constants/ActionTypes";
//get session
//basic info

export const getBasicInfo = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .get("/users/profile/")
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: ALL_BASIC_INFO_SUCCESS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//work info

export const getWorkInfo = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .get("/users/workinfo/")
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: ALL_WORK_INFO_SUCCESS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//academic info

export const getAcademicInfo = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .get("/users/academic_info/")
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: ALL_ACADEMIC_INFO_SUCCESS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};
