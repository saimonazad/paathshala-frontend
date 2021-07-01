import { fetchError, fetchStart, fetchSuccess } from "./Common";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";

import {
  CREATE_COURSE_SUCCESS,
  ALL_PERSONAL_COURSE_SUCCESS,
} from "../../../@jumbo/constants/ActionTypes";

//for getting feed posts
export const getAllPersonalCourses = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .get("/course/info?type=own")
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: ALL_PERSONAL_COURSE_SUCCESS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for creating a course
export const createCourse = (courseInfo) => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .post("/course/info/", courseInfo)
      .then((data) => {
        if (data.status === 201) {
          dispatch(fetchSuccess());
          dispatch({ type: CREATE_COURSE_SUCCESS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};
